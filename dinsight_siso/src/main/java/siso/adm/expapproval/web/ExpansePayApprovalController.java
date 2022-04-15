package siso.adm.expapproval.web;

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
import siso.adm.expapproval.service.ExpansePayApprovalService;
import siso.adm.expapproval.service.ExpansePayApprovalVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.admin.service.ExpanseAdminVO;
import siso.exp.approval.service.ApprovalService;
import siso.exp.approval.service.ApprovalVO;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ExpansePayApprovalController.java
 * @Description : ExpansePayApprovalController Class
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
public class ExpansePayApprovalController {	
	
	/** ExpansePayApprovalService */
	@Autowired
	private ExpansePayApprovalService expansePayApprovalService;
	
	/** PaymentService */
	@Autowired
	private PaymentService paymentService;
	
	/** ApprovalService */
	@Autowired
	private ApprovalService approvalService;
		
	@Autowired
	private SpringPageInitService springPageInitService;
	
	private LoginVO loginVO;
	
	//private static final Logger logger = LoggerFactory.getLogger(ExpansePayApprovalController.class);
	
	/**
	 * 페이지로딩
	 * @param model
	 * @return "/adm/expapproval/expansePayApproval"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/expapproval/expansePayApproval")
	public String expansePayApprovalHtml(@ModelAttribute("searchVO") ExpansePayApprovalVO searchVO, HttpServletRequest request, ModelMap model) throws Exception {
		String pageUrl = "/adm/expapproval/expansePayApproval";
	
		try {
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_expanse_year().equals("")) defaultExpanseYear = searchVO.getSh_expanse_year();
			if(!searchVO.getSh_expanse_month().equals("")) defaultExpanseMonth = searchVO.getSh_expanse_month();
			
			searchVO.setSh_expanse_year(defaultExpanseYear);
			searchVO.setSh_expanse_month(defaultExpanseMonth);
			
			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);
			
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
	
	    return pageUrl;
	}
	
	
	/**
	 * 부서 직원 리스트, 경비 마일리지 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/expapproval/approvalListAjax")
	public void selectApprovalList(@ModelAttribute("searchVO") ExpansePayApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서정보
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		//부서직원 조회
		List<ExpansePayApprovalVO> divisionUserList = expansePayApprovalService.selectDivisionUserList(searchVO);
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		ExpanseAdminVO inputVO = new ExpanseAdminVO();
		
		inputVO.setCreator(login_id);
		inputVO.setExpanse_year(searchVO.getSh_expanse_year());
		inputVO.setExpanse_month(searchVO.getSh_expanse_month());
		//inputVO.setStatus_cd("703");
				
		//경비 조회
		List<ExpanseAdminVO> userExList = expansePayApprovalService.selectExpansePayList(inputVO);
		
		//마일리지 조회
		List<ExpanseAdminVO> userExMList = expansePayApprovalService.selectExpansePayMileageList(inputVO);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("divisionList", divisionList);
		map.put("divisionUserList", divisionUserList);
		map.put("userExList", userExList);
		map.put("userExMList", userExMList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 지급 경비승인(회수)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/adm/expapproval/payApprovalCancel")
	@ResponseBody
	public void payApprovalCancel(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {	
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setSource_object_id(String.valueOf(searchVO.getExpanse_monthly_id()));
		searchVO.setModifier(login_id);
		searchVO.setStatus_cd("1701"); //대기코드
		searchVO.setApproval_id(searchVO.getApproval_id());
		searchVO.setExpanse_appoint_cd("02");
		
		//결재 승인정보 승인으로 변경(tb_approval_node)
		//approvalService.updateApprovalNodeOwner(searchVO); //수신자
		approvalService.updateApprovalNodeCreator(searchVO); //최종승인자
		
		//승인중 코드로 변경
		searchVO.setStatus_cd(Globals.EXP_APP_ING_STATUS_CD);
		
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
	 * 지급 경비승인(승인)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/adm/expapproval/payApprovalPermit")
	@ResponseBody
	public void payApprovalPermit(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {	
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setSource_object_id(String.valueOf(searchVO.getExpanse_monthly_id()));
		searchVO.setModifier(login_id);
		searchVO.setStatus_cd("1702"); //승인코드
		
		//결재 승인정보 승인으로 변경(tb_approval_node)
		approvalService.updateApprovalNodeOwner(searchVO); //수신자
		
		//지급승인 코드로 변경
		searchVO.setStatus_cd(Globals.EXP_PAY_OK_STATUS_CD);
		
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
		
}
