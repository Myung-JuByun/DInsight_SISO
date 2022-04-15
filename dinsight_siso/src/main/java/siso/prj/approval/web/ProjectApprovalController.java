package siso.prj.approval.web;

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
import siso.exp.admin.service.ExpanseAdminService;
import siso.exp.admin.service.ExpanseAdminVO;
import siso.exp.approval.service.ApprovalService;
import siso.exp.approval.service.ApprovalVO;
import siso.prj.approval.service.ProjectApprovalService;
import siso.prj.approval.service.ProjectApprovalVO;
import siso.prj.report.service.ProjectReportVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * @Class Name : ProjectApprovalController.java
 * @Description : ProjectApprovalController Class
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
public class ProjectApprovalController {
	
	/** ProjectApprovalService */
	@Autowired
	private ProjectApprovalService projectApprovalService;
	
	/** ApprovalService */
	@Autowired
	private ApprovalService approvalService;
	
	/** ExpanseAdminService */
	@Autowired
	private ExpanseAdminService expanseAdminService;

	@Autowired
	protected SpringPageInitService springPageInitService;	
    
    /** EgovMessageSource */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
        
    private LoginVO loginVO;
    
	//private static final Logger logger = LoggerFactory.getLogger(ExpanseController.class);
    
    /**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/prj/approval/projectApproval"
	 * @exception Exception
	 */
    @RequestMapping(value = "/prj/approval/projectApproval")
	public String projectApprovalURL(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
    	String pageUrl = "/prj/approval/projectApproval";
		
		//디폴트 년 설정
		Calendar calendar = Calendar.getInstance();
		
		//기본 년월
		String defaultExpanseYear = Integer.toString(calendar.get(Calendar.YEAR));
		String defaultExpanseMonth =  String.format("%02d",calendar.get(Calendar.MONTH)+1);
		String defaultExpanseWeek  = Integer.toString(calendar.get(Calendar.WEEK_OF_MONTH));
		
		//년월 검색 유무 확인후 기본 년월 값 저장
		if(!searchVO.getSh_expanse_year().equals("")) defaultExpanseYear = searchVO.getSh_expanse_year();
		if(!searchVO.getSh_expanse_month().equals("")) defaultExpanseMonth = searchVO.getSh_expanse_month();
		if(!searchVO.getSh_expanse_week().equals("")) defaultExpanseWeek = searchVO.getSh_expanse_week();
		
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
		searchVO.setSh_expanse_week(defaultExpanseWeek);
		
		//검색조건을 vo에 담는다.
		model.addAttribute("params", searchVO);
		
		return pageUrl;
	}
	
	/**
	 * MH승인 조회
	 * @param searchVO - 조회할 정보가 담긴 ApprovalVO
	 * @param model
	 * @param response
	 * @return "/prj/approval/projectApprovalList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/approval/projectApprovalList")
	public void projectApprovalList(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
		searchVO.setSource_type_cd("03");
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		//승인상태 검색
		inputVo.setGroup_id("103");
		List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);			
		//MH승인 조회
		List<ApprovalVO> approvalList = approvalService.selectProjectApprovalList(searchVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("statusList", statusList);
		map.put("approvalList", approvalList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * MH 승인/반려 상세보기
	 * @param searchVO - 조회할 정보가 담긴 ApprovalVO
	 * @param model
	 * @param response
	 * @return "/prj/approval/projectApprovalList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/approval/projectApprovalView")
	public void projectApprovalView(@ModelAttribute("searchVO") ProjectApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//MH승인 조회
			List<ProjectReportVO> mhList = projectApprovalService.projectApprovalView(searchVO);
			
			ExpanseAdminVO expanseAdminVO = new ExpanseAdminVO();
			
			//결재라인 조회
			expanseAdminVO.setExpanse_year(searchVO.getSh_expanse_year());
			expanseAdminVO.setExpanse_month(searchVO.getSh_expanse_month());
			expanseAdminVO.setApproval_week(searchVO.getSh_expanse_week());
			expanseAdminVO.setCreator(Integer.parseInt(searchVO.getSh_user_id()));
			expanseAdminVO.setSource_type_cd("03");
			expanseAdminVO.setSource_object_id(searchVO.getSource_object_id());
			
			List<ExpanseAdminVO> paymentLineList = expanseAdminService.expansePrintPayment(expanseAdminVO);
			
			//근태상황
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
						
			inputVo.setGroup_id("113");		
			List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			//
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("mhList", mhList);
			map.put("paymentLineList", paymentLineList);
			map.put("statusList", statusList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
		
		} catch(Exception ex) {
			ex.printStackTrace();
			
			//str_resData = "fail";
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * MH 승인
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/prj/approval/projectApprovalPermit")
	@ResponseBody
	public void projectApprovalPermit(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
			int login_id       =  loginVO.getUser_id();
	
			searchVO.setSource_type_cd("03");
			searchVO.setNode_id(searchVO.getNode_id());
			searchVO.setSource_object_id(searchVO.getSource_object_id());
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
			
			//MH주별 승인정보 승인으로 변경(tb_project_weekly)
			projectApprovalService.updateProjectWeekly(searchVO);
			
			//MH 정보 승인으로 변경(tb_project_commute)
			projectApprovalService.updateProjectCommute(searchVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			ex.printStackTrace();
			
			//str_resData = "fail";
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * MH 반려
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/prj/approval/projectAapprovalCancel")
	@ResponseBody
	public void projectAapprovalCancel(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {	
		
		String str_resData = "";
		
		try {
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
			
			//MH주별 승인정보 승인으로 변경(tb_project_weekly)
			projectApprovalService.updateProjectWeekly(searchVO);
			
			//MH 정보 승인으로 변경(tb_project_commute)
			projectApprovalService.updateProjectCommute(searchVO);
			
			//////////////////////////////////////////////////////////
			//반려 처리후 기존데이터를 새로 입력해준다.		
			//제출코드
			searchVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
			
			//개인경비 정보 수정
			projectApprovalService.projectCommuteCopyInsert(searchVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			ex.printStackTrace();
			
			//str_resData = "fail";
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
}
