package siso.sas.approval.web;

import java.io.PrintWriter;
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
import siso.exp.approval.service.ApprovalVO;
import siso.sas.approval.service.ProductSalesApprovalService;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProductSalesApprovalController.java
 * @Description : ProductSalesApprovalController Class
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
public class ProductSalesApprovalController {
	
	@Autowired	
	ProductSalesApprovalService productSalesApprovalService;	
		
	@Autowired
	SpringPageInitService springPageInitService;
		
	@Autowired
    SpringCmmUseService springCmmUseService;
	LoginVO loginVO;
	
	/**
	 * 페이지 접속
	 * @param model
	 * @param request
	 * @return "/sas/approval/productSalesApproval"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/approval/productSalesApproval")
	public String productSalesApprovalHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sas/approval/productSalesApproval";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}
	
	/**
	 * 메인리스트(검색)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/sas/approval/prdSalesApprovalSearch"
	 * @exception Exception
	 */
	@RequestMapping("/sas/approval/prdSalesApprovalSearch")
	public void productSalesApprovalSearch(HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//공통
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
			//승인상태 검색
			inputVo.setGroup_id("103");
			List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("statusList", statusList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 메인리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/sas/approval/prdSalesApprovalList"
	 * @exception Exception
	 */
	@RequestMapping("/sas/approval/prdSalesApprovalList")
	public void prdSalesApprovalList(@ModelAttribute("searchVO") ApprovalVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//회원정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
			int login_id       =  loginVO.getUser_id();
					
			searchVO.setCreator(login_id);		
			searchVO.setSh_expanse_year(searchVO.getSh_expanse_year());		
			searchVO.setSh_expanse_month(searchVO.getSh_expanse_month());
			searchVO.setSh_status_cd(searchVO.getSh_status_cd());
			searchVO.setSource_type_cd("04");
			
			//매입/매출승인 조회
			List<ApprovalVO> prdSalesApprovalList = productSalesApprovalService.prdSalesApprovalList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("prdSalesApprovalList", prdSalesApprovalList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매입/매출 품의서 제출(승인)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/approval/prdSalesApprovalPermit")
	@ResponseBody
	public void prdSalesApprovalPermit(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		String str_resData = "";
		searchVO.setCreator(login_id);
		
		try {
			productSalesApprovalService.prdSalesApprovalPermit(searchVO);
			str_resData = "success";
			
		} catch(Exception ex){
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매입/매출 품의서 제출(반려)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/approval/prdSalesApprovalCancel")
	@ResponseBody
	public void prdSalesApprovalCancle(@ModelAttribute("searchVO") ApprovalVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		String str_resData = "";
		searchVO.setCreator(login_id);
		
		try {
			productSalesApprovalService.prdSalesApprovalCancle(searchVO);
			str_resData = "success";
			
		} catch(Exception ex){
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}	
}
