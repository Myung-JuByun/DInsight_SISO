package siso.exp.approval.web;

import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.approval.service.ApprovalService;
import siso.exp.approval.service.ApprovalVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * @Class Name : ApprovalController.java
 * @Description : ApprovalController Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
//@SessionAttributes(types = ExpanseAdminVO.class)
public class ApprovalController {
	
	/** ApprovalService */
	@Autowired
	private ApprovalService approvalService;	
	
	@Autowired
	protected SpringPageInitService springPageInitService;	
    
    @Autowired
    protected SpringCmmUseService springCmmUseService;
	
    private LoginVO loginVO;    
    
    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/exp/approval/approval"
	 * @exception Exception
	 */
    @RequestMapping(value = "/exp/approval/approval")
	public String selectApproval(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
    	String pageUrl = "/exp/approval/approval";
		
		//디폴트 년 설정
		Calendar calendar = Calendar.getInstance();
		
		//기본 년월
		String defaultExpanseYear = Integer.toString(calendar.get(Calendar.YEAR));
		String defaultExpanseMonth =  String.format("%02d",calendar.get(Calendar.MONTH)+1);
		
		//년월 검색 유무 확인후 기본 년월 값 저장
		if(!searchVO.getSh_expanse_year().equals("")) defaultExpanseYear = searchVO.getSh_expanse_year();
		if(!searchVO.getSh_expanse_month().equals("")) defaultExpanseMonth = searchVO.getSh_expanse_month();
		
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		//월검색
		inputVo.setGroup_id("124");
		List<CmmnDetailCode> monthList = springCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("monthList", monthList);
		
		//승인상태 검색
		inputVo.setGroup_id("103");
		List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("statusList", statusList);
		
		searchVO.setSh_expanse_year(defaultExpanseYear);
		searchVO.setSh_expanse_month(defaultExpanseMonth);
		
		//검색조건을 vo에 담는다.
		model.addAttribute("params", searchVO);
		
		return pageUrl;
	}
	
	/**
	 * 경비승인 조회
	 * @param searchVO - 조회할 정보가 담긴 ApprovalVO
	 * @param model
	 * @param response
	 * @return "/exp/approval/approvalList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/approval/approvalList")
	public void selectApprovalList(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);		
		searchVO.setSh_expanse_year(searchVO.getSh_expanse_year());		
		searchVO.setSh_expanse_month(searchVO.getSh_expanse_month());
		searchVO.setSh_status_cd(searchVO.getSh_status_cd());
		searchVO.setSource_type_cd("01");
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();

		//승인상태 검색
		inputVo.setGroup_id("103");
		List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);		
		//경비승인 조회
		List<ApprovalVO> userList = approvalService.selectApprovalList(searchVO);		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("statusList", statusList);
		map.put("userList", userList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 경비승인(승인)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/approval/approvalPermit")
	@ResponseBody
	public void approvalPermit(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {	
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();

		searchVO.setSource_type_cd("01");
		searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setSource_object_id(searchVO.getSource_object_id());
		//searchVO.setCreator(searchVO.getCreator());
		searchVO.setModifier(login_id);
		searchVO.setStatus_cd("1702"); //승인코드
		searchVO.setApproval_id(searchVO.getApproval_id());
		searchVO.setFinal_expanse_appoint(searchVO.getFinal_expanse_appoint());
		searchVO.setExpanse_appoint_cd("00");
		
		//결재 승인정보 승인으로 변경(tb_approval_node)
		approvalService.updateApprovalNodeOwner(searchVO); //승인자
		approvalService.updateApprovalNodeCreator(searchVO); //기안자
		
		//최종승인자 : 1, 일반승인(검토)자 : 0
		if(searchVO.getFinal_expanse_appoint().equals("1")) {
			searchVO.setStatus_cd(Globals.EXP_APP_OK_STATUS_CD);
		} else {
			searchVO.setStatus_cd(Globals.EXP_APP_ING_STATUS_CD);
		}
		
		//개인경비 달별 승인정보 승인으로 변경(tb_expanse_monthly)
		approvalService.updateExpanseMonthly(searchVO);
		
		//개인경비 정보 승인으로 변경(tb_expanse)
		approvalService.updateExpanse(searchVO);
		
		//마일리지 정보 승인으로 변경(tb_expanse)
		approvalService.updateExpanseMileage(searchVO);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();

	}
	
	/**
	 * 경비승인(반려)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/approval/approvalCancel")
	@ResponseBody
	public void approvalCancel(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {	
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//////////////////////////////////////////////////////////
		//반려처리
		searchVO.setSource_object_id(searchVO.getSource_object_id());
		searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setStatus_cd("1703"); //반려코드
		searchVO.setApproval_id(searchVO.getApproval_id());
		searchVO.setCreator(searchVO.getCreator());
		searchVO.setModifier(login_id);
		searchVO.setExpanse_appoint_cd("00");
		
		//결재 승인정보 반려로 변경(tb_approval_node)
		approvalService.updateApprovalNodeOwner(searchVO); //승인자
		approvalService.updateApprovalNodeCreator(searchVO); //기안자
		
		//반려코드
		searchVO.setStatus_cd(Globals.EXP_APP_CANCEL_STATUS_CD);
		
		//개인경비 달별 승인정보 승인으로 변경(tb_expanse_monthly)
		approvalService.updateExpanseMonthly(searchVO);
		
		//개인경비 정보 승인으로 변경(tb_expanse)
		approvalService.updateExpanse(searchVO);
		
		//마일리지 정보 승인으로 변경(tb_expanse)
		approvalService.updateExpanseMileage(searchVO);
		
		//////////////////////////////////////////////////////////
		//반려 처리후 기존데이터를 새로 입력해준다.
		searchVO.setSource_type_cd("01");		
		searchVO.setApproval_year(searchVO.getApproval_year());
		searchVO.setApproval_month(searchVO.getApproval_month());
		
		//제출코드
		searchVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
		
		//개인경비 달별 승인정보 저장
		//String monthlyId = approvalService.expanseMonthlyInsert(searchVO);
		
		//searchVO.setExpanse_monthly_id(monthlyId);
		
		//개인경비 정보 수정
		approvalService.expanseCopyInsert(searchVO);
		
		//마일리지 정보 수정
		approvalService.expanseMileageCopyInsert(searchVO);
		
		//String approval_name = searchVO.getApproval_year() + "년 " + searchVO.getApproval_month() + "월 경비지급요청서";
		
		//searchVO.setApproval_name(approval_name);
		//searchVO.setSource_object_id(monthlyId);
		
		//결재 요청서 저장
		//String approvalId = approvalService.expanseApprovalInsert(searchVO);
		
		//searchVO.setApproval_id(approvalId);
		
		//결재 승인정보 저장
		//approvalService.expanseApprovalNodeInsert(searchVO);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();

	}
	
}
