package siso.sas.product.web;

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
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.admin.service.ExpanseAdminService;
import siso.exp.admin.service.ExpanseAdminVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sas.product.service.ProductSalesService;
import siso.sas.product.service.ProductSalesVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProductSalesController.java
 * @Description : ProductSalesController Class
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
public class ProductSalesController {

	/** ProductSalesService */
	@Autowired
	private ProductSalesService productSalesService;
	
	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;
	
	/** expanseAdminService */
	@Autowired
	private ExpanseAdminService expanseAdminService;
		
	/** EgovPageInitService */
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	/** EgovMessageSource */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
		
	//private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);
	
	/**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/sam/pcode/projectCode"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/productSalesAdmin")
	public String productSalesURL(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sas/product/productSalesAdmin";
		
		try {
		
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_product_sales_year().equals("")) defaultExpanseYear = searchVO.getSh_product_sales_year();
			if(!searchVO.getSh_product_sales_month().equals("")) defaultExpanseMonth = searchVO.getSh_product_sales_month();
			
			searchVO.setSh_product_sales_year(defaultExpanseYear);
			searchVO.setSh_product_sales_month(defaultExpanseMonth);
			
			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);
			
			//좌측, 우측 메뉴정보
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
		
		return pageUrl;
	}
	
	/**
	 * 매출품의 리스트 출력
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sas/product/productSalesList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/productSalesList")
	public void productSalesList(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//회원정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       	=	loginVO.getUser_id();
			String chk_grant=loginVO.getGrant_id();
			
			//자신이 속한 상위부서 전체 또는 자신이 관리하는 모든 하위부서 전체
			if(chk_grant.indexOf("2") < 0){
				List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);			
				searchVO.setDivision_child_list(divisionChild);
			}
			
			//리스트
			List<ProductSalesVO> salesList = productSalesService.productSalesList(searchVO);
			
			//결재선리스트
			ExpanseAdminVO expanseAdminVO = new ExpanseAdminVO();
			expanseAdminVO.setCreator(login_id);
			expanseAdminVO.setSource_type_cd("04");
			String paymentView = expanseAdminService.selectExpansePaymentView(expanseAdminVO);
			
			ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
			
			//결제조건
			inputVO.setGroup_id("145");		
			List<CmmnDetailCode> etcList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//구분
			inputVO.setGroup_id("146");		
			List<CmmnDetailCode> conferkindList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//brand
			inputVO.setGroup_id("117");		
			List<CmmnDetailCode> brandList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//결제조건
			inputVO.setGroup_id("141");		
			List<CmmnDetailCode> purchasePayList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//수기전자
			inputVO.setGroup_id("125");		
			List<CmmnDetailCode> methodList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("salesList", salesList);
			map.put("paymentList", paymentView);
			map.put("brandList", brandList);
			map.put("etcList", etcList);
			map.put("conferkindList", conferkindList);
			map.put("purchasePayList", purchasePayList);
			map.put("methodList", methodList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
	    
		} catch(Exception ex) {			
			str_resData = "fail";			
		}		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 *  매출품의 팝업
	 * @return "/sas/product/productSalesPop"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/productSalesPop")
	public String productSalesHTML() throws Exception {
		
		String pageUrl = "/sas/product/productSalesPop";
		
		return pageUrl;
	}
	
	/**
	 * 매출품의 상세 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sas/product/productSalesDetailList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/productSalesDetail")
	public void productSalesDetail(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//리스트
			List<ProductSalesVO> salesDetailList = productSalesService.productSalesDetail(searchVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("salesDetailList", salesDetailList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
		    
		} catch(Exception ex) {
			
			str_resData = "fail";
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 상세보기
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sas/product/productSalesView"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/productSalesView")
	public void productSalesView(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {			
			ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
			
			//결제조건
			inputVO.setGroup_id("141");
			List<CmmnDetailCode> purchasePayList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//매출품의 리스트
			List<ProductSalesVO> productList = productSalesService.productSalesConferView(searchVO);
			
			//매출 및 매입내역 리스트 ds
			searchVO.setChang_yn("0");
			List<ProductSalesVO> dsRecordList = productSalesService.productDSSalesRecordView(searchVO);
			
			//매출 및 매입내역 리스트 alc
			searchVO.setChang_yn("1");
			List<ProductSalesVO> alcRecordList = productSalesService.productDSSalesRecordView(searchVO);
			
			//매출 및 매입내역 리스트
			List<ProductSalesVO> recordList = productSalesService.productSalesRecordView(searchVO);
			
			//매출 세금계산서 리스트
			searchVO.setChecked("1");
			List<ProductSalesVO> invoiceSaleList = productSalesService.productSalesInvoiceView(searchVO);
			
			//매입 세금계산서 리스트
			searchVO.setChecked("2");
			List<ProductSalesVO> invoiceBuyList = productSalesService.productSalesInvoiceView(searchVO);
			
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("purchasePayList", purchasePayList);
			map.put("productList", productList);
			map.put("dsRecordList", dsRecordList);
			map.put("alcRecordList", alcRecordList);
			map.put("recordList", recordList);
			map.put("invoiceSaleList", invoiceSaleList);
			map.put("invoiceBuyList", invoiceBuyList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
		    
		} catch(Exception ex) {
			
			str_resData = "fail";
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 *  매출품의 매입/매출/선PO 확인
	 * @return "/sas/product/productSalesPop"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/product/selectCheckKind")
	public void selectCheckKind(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {			
			String kind_gb = productSalesService.selectCheckKind(searchVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("checkKindGbList", kind_gb);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
		    
		} catch(Exception ex) {			
			str_resData = "fail";			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesSave")
	@ResponseBody
	public void productSalesSave(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {		
		String str_resData 			=	"";		
		try {		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			int login_id       		=	loginVO.getUser_id();
			
			//매출품의서 저장
			searchVO.setCreator(login_id);			
			productSalesService.productSalesConferInsert(searchVO, loginVO);
			
			int confer_id = searchVO.getSales_confer_id();
			
			str_resData = String.valueOf(confer_id);
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesConferDel")
	@ResponseBody
	public void productSalesConferDel(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData = "";
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			
			searchVO.setModifier(login_id);
			
			//삭제
			productSalesService.productSalesConferDel(searchVO);
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 매출 및 매입내역 삭제 - ALC/DS
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productDSSalesRecordDel")
	@ResponseBody
	public void productDSSalesRecordDel(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData = "";
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			int sales_record_ds_id	=	searchVO.getSales_record_ds_id();
			String chang_yn				=	searchVO.getChang_yn();			
			
			searchVO.setModifier(login_id);
			searchVO.setSales_record_ds_id(sales_record_ds_id);
			searchVO.setChang_yn(chang_yn);
			//삭제
			productSalesService.productDSSalesRecordDel(searchVO);
			
			if(chang_yn.equals("1")){
				//이력삭제
				productSalesService.productAlcSalesRecordHistoryDel(searchVO);
			}
			
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}

	/**
	 * 매출품의 변경 매출/매입  삭제 - ALC history
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productAlcSalesRecordHistoryDel")
	@ResponseBody
	public void productAlcSalesRecordHistoryDel(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData = "";
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			int sales_record_ds_id	=	searchVO.getChg_sales_record_ds_id();
			
			searchVO.setModifier(login_id);
			searchVO.setSales_record_ds_id(sales_record_ds_id);			
			//삭제
			productSalesService.productAlcSalesRecordHistoryDel(searchVO);
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 매출 및 매입내역 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesRecordDel")
	@ResponseBody
	public void productSalesRecordDel(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData = "";
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			String sales_record_id	=	searchVO.getSales_record_id();
			
			searchVO.setModifier(login_id);
			searchVO.setSales_record_id(sales_record_id);
			
			//삭제
			productSalesService.productSalesRecordDel(searchVO);
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 매출품의 매출/매입 세금계산서 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesInvoiceDel")
	@ResponseBody
	public void productSalesInvoiceDel(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData = "";
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			searchVO.setModifier(login_id);
			//삭제
			productSalesService.productSalesInvoiceDel(searchVO);
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 메인리스트 -  제품 카테고리 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/sas/product/salesProductCategorySearchAjax"
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesAlcSearch")	
	public void productSalesAlcSearch(@ModelAttribute("searchVO") ProductSalesVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		String str_resData = "";
		try {
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//설치사 조회
			
			List<ProductSalesVO> alcList = productSalesService.productSalesAlcSearch(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcList", alcList);
			
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
	 * 메인리스트 -  제품 카테고리 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/sas/product/salesProductCategorySearchAjax"
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/salesProductCategorySearchAjax")	
	public void salesProductCategorySearchAjax(@ModelAttribute("searchVO") ProductSalesVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		String str_resData = "";
		try {
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//설치사 조회
			List<AlcAdminVO> selectSalesProductCategorySearch = springCmmUseService.selectSalesProductCategorySearch(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("selectSalesProductCategorySearch", selectSalesProductCategorySearch);
			
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
	 * 매출품의 제출
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesFinalSubmit")
	@ResponseBody
	public void productSalesFinalSubmit(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {		
		String str_resData 			=	"";		
		try {		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			int login_id       		=	loginVO.getUser_id();
			
			//매출품의서 저장
			searchVO.setCreator(login_id);
			
			productSalesService.productSalesFinalSubmit(searchVO, loginVO);			
			str_resData = "success";
		} catch(Exception ex) {
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * CheckContract
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/product/productSalesCheckContract")
	public void productSalesCheckContract(@ModelAttribute("searchVO") ProductSalesVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {		
		String str_resData = "";		
		try {			
			//리스트
			List<ProductSalesVO> salesCheckList = productSalesService.selectCheckContract(searchVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("salesCheckList", salesCheckList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);		    
		} catch(Exception ex) {
			str_resData = "fail";			
		}		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
}
