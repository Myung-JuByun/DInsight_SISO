package siso.adm.support.web;

import java.io.PrintWriter;
import java.util.ArrayList;
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
import siso.adm.support.service.SupportAdminService;
import siso.adm.support.service.SupportPurchaseSalesVO;
import siso.adm.support.service.SupportPurchaseVO;
import siso.adm.support.service.SupportSalesItemNameVO;
import siso.adm.support.service.SupportSalesVO;
import siso.adm.user.service.UserAdminVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.excel.ExcelUpload;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : UserAdminController.java
 * @Description : UserAdminController Class
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
public class SupportAdminController {

	@Autowired
	protected SpringPageInitService springPageInitService;
		
	@Autowired
    protected SpringCmmUseService springCmmUseService;
        
	@Autowired
    protected SupportAdminService supportadminService;
    
    private ExcelUpload excelupload;
	private LoginVO loginVO;
	
	//private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

	/**
	 * 페이지로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/adm/user/userAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/supportPurchaseList")
	public String purchaseList(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/adm/support/purchaseList";			
					
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		return pageUrl;
	}
	
	/**
	 * 페이지로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/adm/user/userAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/supportSalesList")
	public String salesList(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/adm/support/salesList";			
					
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		return pageUrl;
	}
	
	/**
	 * 페이지로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/adm/user/userAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/supportPurchaseSalesStatus")
	public String purchaseSalesStatus(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/adm/support/purchaseSalesStatus";			
					
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		return pageUrl;
	}
	
	/**
	 * 매입 업로드
	 * @param supportAdminVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/purchaseExceluploadAjax")
	public void purchaseExceluploadAjax(@ModelAttribute("supportPurchaseVO") SupportPurchaseVO supportPurchaseVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {
		
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseVO.setCreator(login_id);
		supportPurchaseVO.setModifier(login_id);
		
		
		String[] exKeys = { "purchase_day", "purchase_project_code", "purchase_staff_name", "creditor_name", "item_name", "debtor_name", "purchase_supply_price", "purchase_tax", "purchase_total_price" };
		ArrayList<List<Map<String, Object>>> resultUploadList = new ArrayList<List<Map<String, Object>>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		try{
			System.out.println("엑셀Read");
			resultUploadList = excelupload.excelUpload(request, 3, exKeys);
			resultList = resultUploadList.get(0);
			System.out.println(resultList);
			
			supportPurchaseVO.setPurchaseList(resultList);
			System.out.println("DBStart=======");
			supportadminService.purchaseExcelupload(supportPurchaseVO);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultList);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매입 업로드
	 * @param supportAdminVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/purchaseSelectAjax")
	public void purchaseSelectAjax(@ModelAttribute("supportPurchaseVO") SupportPurchaseVO supportPurchaseVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {
		
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseVO.setCreator(login_id);
		supportPurchaseVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			List<SupportPurchaseVO> resultList = supportadminService.purchaseSelect(supportPurchaseVO);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultList);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출 조회
	 * @param supportAdminVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/salesSelectAjax")
	public void salesSelectAjax(@ModelAttribute("supportSalesVO") SupportSalesVO supportSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {
		
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportSalesVO.setCreator(login_id);
		supportSalesVO.setModifier(login_id);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try{
			System.out.println("DBStart=======");
			List<SupportSalesVO> resultList = supportadminService.salesSelect(supportSalesVO);
			List<SupportSalesItemNameVO> item_div_list = supportadminService.item_div_name(supportSalesVO);
			
			resultMap.put("salesList", resultList);
			resultMap.put("item_div_list", item_div_list);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultMap);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	
	/**
	 * 매출 업로드
	 * @param supportAdminVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/salesExceluploadAjax")
	public void salesExceluploadAjax(@ModelAttribute("supportSalesVO") SupportSalesVO supportSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {
		
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportSalesVO.setCreator(login_id);
		supportSalesVO.setModifier(login_id);
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String[] exKeys = {"sales_day", "sales_project_code", "sales_staff_name", "sales_client_name", "item_name", "item_div_name", "sales_supply_price", "sales_tax", "sales_total_price", "sales_GP" };
		ArrayList<List<Map<String, Object>>> resultUploadList = new ArrayList<List<Map<String, Object>>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		try{
			System.out.println("엑셀Read");
			resultUploadList = excelupload.excelUpload(request, 3, exKeys);
			resultList = resultUploadList.get(0);
			System.out.println(resultList);
			
			supportSalesVO.setSalesList(resultList);
			
			System.out.println("DBStart=======");
			supportadminService.salesExcelupload(supportSalesVO);
			System.out.println("DBEnd=======");
			
			List<SupportSalesItemNameVO> item_div_list = supportadminService.item_div_name(supportSalesVO);
			resultMap.put("salesList", resultList);
			resultMap.put("item_div_list", item_div_list);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultMap);
		    	
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매입매출현황
	 * @param supportAdminVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/purchaseSalesStatusSelectAjax")
	public void purchaseSalesStatusSelect(@ModelAttribute("supportPurchaseSalesVO") SupportPurchaseSalesVO supportPurchaseSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {
		
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseSalesVO.setCreator(login_id);
		supportPurchaseSalesVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			List<SupportPurchaseSalesVO> resultList = supportadminService.purchaseSalesStatus(supportPurchaseSalesVO);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultList);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
	
	@RequestMapping(value = "/adm/salesStatusAjax")
    public void salesStatus(@ModelAttribute("supportSalesVO") SupportSalesVO supportSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception{
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportSalesVO.setCreator(login_id);
		supportSalesVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			List<SupportSalesVO> resultList = supportadminService.salesStatus(supportSalesVO);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultList);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
    };    
    /**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @RequestMapping(value = "/adm/purchaseStatusAjax")
    public void purchaseStatus(@ModelAttribute("supportPurchaseVO") SupportPurchaseVO supportPurchaseVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception{
    	
    	String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseVO.setCreator(login_id);
		supportPurchaseVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			List<SupportPurchaseVO> resultList = supportadminService.purchaseStatus(supportPurchaseVO);
			System.out.println("DBEnd=======");
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultList);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
    	
    };
    
    /**
	 * 매출현황팝업
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @RequestMapping(value = "/adm/salesPurchaseStatusPopAjax")
    public void salesStatusPop(@ModelAttribute("supportPurchaseSalesVO") SupportPurchaseSalesVO supportPurchaseSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception{
    	
    	String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseSalesVO.setCreator(login_id);
		supportPurchaseSalesVO.setModifier(login_id);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try{
			System.out.println("DBStart=======");
			List<SupportSalesVO> salesList = supportadminService.salesStatusPop(supportPurchaseSalesVO);
			List<SupportPurchaseVO> purchaseList = supportadminService.purchaseStatusPop(supportPurchaseSalesVO);
			System.out.println("DBEnd=======");
			
			resultMap.put("salesResult", salesList);
			resultMap.put("purchaseResult", purchaseList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(resultMap);
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
    };
    
    /**
	 * 매출삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @RequestMapping(value = "/adm/salesDeleteAjax")
    public void salesDelete(@ModelAttribute("supportSalesVO") SupportSalesVO supportSalesVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest reques) throws Exception{
    	
    	String str_resData = "success";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportSalesVO.setCreator(login_id);
		supportSalesVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			supportadminService.salesDelete(supportSalesVO);
			System.out.println("DBEnd=======");
			
		    
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
    };
    
    /**
	 * 매입삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @RequestMapping(value = "/adm/purchaseDeleteAjax")
    public void purchaseDelete(@ModelAttribute("supportPurchaseVO") SupportPurchaseVO supportPurchaseVO
			, ModelMap model
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception{
    	
    	String str_resData = "success";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		supportPurchaseVO.setCreator(login_id);
		supportPurchaseVO.setModifier(login_id);
		
		try{
			System.out.println("DBStart=======");
			supportadminService.purchaseDelete(supportPurchaseVO);
			System.out.println("DBEnd=======");
			
		}catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
    };
}