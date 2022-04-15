package siso.cop.web;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringFileMngUtil;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.cop.service.CustomerInfoVO;
import siso.cop.service.CustomerSearchVO;
import siso.cop.service.CustomerService;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ExpanseController.java
 * @Description : EgovSample Controller Class
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
@SessionAttributes(types = CustomerInfoVO.class)
public class CustomerAdminController {
	
	/** EgovSampleService */
	@Autowired
	private CustomerService customerService;

	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected SpringCmmUseService springCmmUseService;
	
	@Autowired
	protected PaymentService paymentService;
	
	@Autowired
	protected DefaultBeanValidator beanValidator;
	
	private SpringFileMngUtil fileUtil;	
	private LoginVO loginVO;
	
	public static final int MYSQL_DUPLICATE_PK = 1062;
	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/cop/selectCustomerList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/cop/customerAdmin")
	public String selectSampleList(@ModelAttribute("searchVO") CustomerSearchVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/cop/customerAdmin";
		
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		/** 좌측, 우측 메뉴정보 */
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		/** 업태
		inputVo.setGroupId("107");
		List<CmmnDetailCode> conditionList = egovCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("conditionList", conditionList);*/
		
		/** 업종 
		inputVo.setGroupId("108");
		List<CmmnDetailCode> categoryList = egovCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("categoryList", categoryList);*/
		
		/** pageing */
		//searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
		//searchVO.setPageSize(propertiesService.getInt("pageSize"));
		///searchVO.setPageUnit(searchVO.getPageUnit());
		///searchVO.setPageSize(searchVO.getPageSize());
		//searchVO.setPageUnit(10);
		//searchVO.setPageSize(5);
		///searchVO.setPageingYn("Y");

		/** pageing setting 
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<CustomerInfoVO> customerList = customerService.selectCustomerList(searchVO);
		model.addAttribute("resultList", customerList);

		int totCnt = customerService.selectCustomerListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);*/
		
		return pageUrl;
	}
	
	@RequestMapping(value = "/cop/customerAdminAjax")
	@ResponseBody
	public void selectSampleListAjax(@ModelAttribute("searchVO") CustomerSearchVO searchVO, 
			HttpServletResponse response, ModelMap model, HttpServletRequest request) throws Exception {
		
				
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		

		/** 관리자일경우 전체 고객사 리스트가 보여야함.
		String chk_grant=loginVO.getGrant_id();
		
		if(chk_grant.indexOf("2") < 0 && chk_grant.indexOf("7") < 0){
			List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);		
			searchVO.setDivision_child_list(divisionChild);
		} */		
		
		/** 업태 
		inputVo.setGroupId("107");
		List<CmmnDetailCode> conditionList = egovCmmUseService.selectCmnCodeCombo(inputVo);*/
		/** 업종 
		inputVo.setGroupId("108");
		List<CmmnDetailCode> categoryList = egovCmmUseService.selectCmnCodeCombo(inputVo);*/
		
		/** 리스트 */
		List<CustomerInfoVO> customerList = customerService.selectCustomerList(searchVO);
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		//resultMap.put("conditionList", conditionList);
		//resultMap.put("categoryList", categoryList);
		resultMap.put("customerList", customerList);
		
		
		ObjectMapper om = new ObjectMapper();
	    String str_resData = om.writeValueAsString(resultMap);
	    
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();     

	}
	
	/**
	 * 고객사를 추가한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/cop/deleteCustomerAdmin"
	 * @exception Exception
	 */
	 @RequestMapping(value = "/cop/insertCustomerAdmin")
	 @ResponseBody
	 public void CustomerInsert(@ModelAttribute("searchVO") CustomerSearchVO searchVO
		 , CustomerInfoVO customerInfoVO, BindingResult bindingResult
		 , Model model, SessionStatus status
		 , HttpServletResponse response) throws Exception {
		
		// Server-Side Validation
		beanValidator.validate(customerInfoVO, bindingResult);
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		String resultMsg = "success";
		String company_name ="";
		String chairman ="";
		String business_category ="";
		String business_condition ="";
		String company_reg_number ="";
		String corporate_number ="";
		String phone_number ="";
		String address ="";
				
		for (int cnt = 0; cnt < customerInfoVO.getIn_company_name().length; cnt++) {
			
			customerInfoVO.setCreator(login_id);
			
			company_name = customerInfoVO.getIn_company_name()[cnt];
			chairman = customerInfoVO.getIn_chairman()[cnt];
			business_category = customerInfoVO.getIn_business_category()[cnt];
			business_condition = customerInfoVO.getIn_business_condition()[cnt];
			company_reg_number = customerInfoVO.getIn_company_reg_number()[cnt];
			corporate_number = customerInfoVO.getIn_corporate_number()[cnt];
			phone_number = customerInfoVO.getIn_phone_number()[cnt];
			address = customerInfoVO.getIn_address()[cnt];
			
			customerInfoVO.setCompany_name(company_name);
			customerInfoVO.setChairman(chairman);
			customerInfoVO.setBusiness_category(business_category);
			customerInfoVO.setBusiness_condition(business_condition);
			customerInfoVO.setCompany_reg_number(company_reg_number);
			customerInfoVO.setCorporate_number(corporate_number);
			customerInfoVO.setPhone_number(phone_number);
			customerInfoVO.setAddress(address);
			
			try{
			    //code that throws sql exception
				customerService.insertCustomerAdmin(customerInfoVO);
			} catch(SQLException e){
				if(e.getErrorCode() == MYSQL_DUPLICATE_PK ){
			        //duplicate primary key 
					resultMsg = "duplicate";
					response.setContentType("text/html; charset=utf-8");
			    	 PrintWriter pw = response.getWriter();
			    	 pw.print(resultMsg);
			    	 pw.flush();
			    }
			}
			status.setComplete();
		}
					
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(resultMsg);
    	 pw.flush();    
	}
	
	/**
	 * 고객사를 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/cop/deleteCustomerAdmin"
	 * @exception Exception
	 */
	@RequestMapping("/cop/deleteCustomerAdmin")
	@ResponseBody
	public void CustomerDel(@ModelAttribute("searchVO") CustomerSearchVO searchVO
			, CustomerInfoVO customerInfoVO
			, SessionStatus status
			, HttpServletResponse response) throws Exception {			
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		int company_id = 0;
		String resultCode = "0";
		
		for (int cnt = 0; cnt < searchVO.getCompany_id().length; cnt++) {
			company_id = searchVO.getCompany_id()[cnt];			
			customerInfoVO.setCompany_id(company_id);
			customerInfoVO.setDeleteYn("1");
			customerInfoVO.setModifier(login_id);
			
			resultCode = customerService.deleteCustomerAdmin(customerInfoVO);
			status.setComplete();
		}
		
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 
    	 if("0".equals(resultCode)){
    		 pw.print("success");
    	 }else{
    		 pw.print(resultCode);
    	 }
    	 
    	 pw.flush();    
	}
	
	/**
	 * 업로드파일을 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/cop/deleteUploadfile"
	 * @exception Exception	
	 */
	@RequestMapping(value = "/cop/deleteUploadfile")
	@ResponseBody
	public void deleteUploadfile(@ModelAttribute("searchVO") CustomerSearchVO searchVO, CustomerInfoVO customerInfoVO
			, SessionStatus status , HttpServletResponse response) throws Exception {
		 response.setContentType("text/html; charset=utf-8");
		 		 
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		 		
		 //int login_id       =  loginVO.getUserId();
		 int company_id = 0;
		 String resultCode = "0";
		 
		 try {
			 
			 for (int cnt = 0; cnt < searchVO.getCompany_id().length; cnt++) {
				 company_id = searchVO.getCompany_id()[cnt];
				 customerInfoVO.setCompany_id(company_id);
				 resultCode = customerService.deleteUploadfile(customerInfoVO);
				 status.setComplete();
			 }
			 
			 response.setContentType("text/html; charset=utf-8");
			 PrintWriter pw = response.getWriter();
			 
			 if("0".equals(resultCode))
				 pw.print("success");
			 else
				 pw.print(resultCode);			 
			 
			 pw.flush(); 
		 } catch(Exception e) {
			 e.printStackTrace();
		 }
	}
	
	
	/**
	 * 고객사 담당자를 추가한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/cop/deleteCustomerAdmin"
	 * @exception Exception
	 */
	 @SuppressWarnings("rawtypes")
	 @RequestMapping(value = "/cop/insertCustomerSub")
	 @ResponseBody
	 public void CustomerSubInsert(@ModelAttribute("searchVO") CustomerSearchVO searchVO
			 , CustomerInfoVO customerInfoVO
			 , BindingResult bindingResult
			 , Model model, SessionStatus status
			 , HttpServletResponse response
			 , HttpServletRequest request) throws Exception {
		 
		 try {
			 	//Server-Side Validation		 
				beanValidator.validate(customerInfoVO, bindingResult);
				loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
				
				int login_id       =  loginVO.getUser_id();
				String grant_id		=	loginVO.getGrant_id();				
				String operation_cd = "";
				
				//담당영업
				//부서장, 임원
				if(grant_id.indexOf("4") >= 0 || grant_id.indexOf("5") >= 0) {
					operation_cd = loginVO.getLast_division_cd();
				} else {
					//영업, 일반, 관리자, 오퍼레이터, 팀장
					operation_cd = loginVO.getOperation_cd();			
				}
				
				if (SpringStringUtil.isEmpty(operation_cd))
					operation_cd = loginVO.getLast_division_cd();				
				
				int company_id = 0;
				String company_name ="";
				String chairman ="";
				String business_category ="";
				String business_condition ="";
				String company_reg_number ="";
				String corporate_number ="";
				String phone_number ="";
				String main_fax ="";
				String address ="";
				String insertFlag = "0";
				String charger_yn = "";
				String company_yn = "";
				int null_company_id = 0;
				String company_eng ="";				
				String sales_customer ="";
				String site_id ="";
				String company_reg_check ="";
				String address_eng ="";
				String etc = "";
				
				customerInfoVO.setCreator(login_id);
				customerInfoVO.setModifier(login_id);				
				company_id = searchVO.getPop_company_id();				
				
				company_name = SpringStringUtil.convertFormData(searchVO.getCompany_name());
				chairman = SpringStringUtil.convertFormData(searchVO.getChairman());
				business_category = SpringStringUtil.convertFormData(searchVO.getBusiness_category());
				business_condition = SpringStringUtil.convertFormData(searchVO.getBusiness_condition());
				company_reg_number = searchVO.getCompany_reg_number();
				corporate_number = searchVO.getCorporate_number();
				phone_number = searchVO.getPhone_number();
				address = SpringStringUtil.convertFormData(searchVO.getAddress());
				charger_yn = searchVO.getCharger_yn();
				company_yn = searchVO.getCompany_yn();
				company_eng = searchVO.getCompany_eng();
				sales_customer = SpringStringUtil.convertFormData(searchVO.getSales_customer());
				site_id = searchVO.getSite_id();
				company_reg_check = searchVO.getCompany_reg_check();
				address_eng = searchVO.getAddress_eng();
				main_fax = searchVO.getMain_fax();
				etc = SpringStringUtil.convertFormData(searchVO.getEtc());
				
				if("".equals(company_name) || company_name == null){
					insertFlag = "1"; 
				}else{					
					//파일 업로드
				    MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest)request;
				    Map<String, MultipartFile> files = mptRequest.getFileMap();
				    Iterator<Entry<String, MultipartFile>> fileIter = files.entrySet().iterator();
				    
				    while (fileIter.hasNext()) {
				        Entry<String, MultipartFile> entry = fileIter.next();
				        MultipartFile mFile = entry.getValue();
				
				    if (mFile.getSize() > 0) {
					    	 HashMap _map = fileUtil.uploadFile(mFile, "customer");
					    	//아래 코드 대신에 데이터베이스에 저장하기 위해서 Map에 담는 코드를 넣으면 된다.
					        System.out.println("[ "+Globals.FILE_PATH+" : "+_map.get(Globals.FILE_PATH)+" ]");
						    System.out.println("[ "+Globals.FILE_SIZE+" : "+_map.get(Globals.FILE_SIZE)+" ]");
						    System.out.println("[ "+Globals.ORIGIN_FILE_NM+" : "+_map.get(Globals.ORIGIN_FILE_NM)+" ]");
						    System.out.println("[ "+Globals.UPLOAD_FILE_NM+" : "+_map.get(Globals.UPLOAD_FILE_NM)+" ]");
						    System.out.println("[ "+Globals.FILE_EXT+" : "+_map.get(Globals.FILE_EXT)+" ]");
						    customerInfoVO.setCompany_file_id((String)_map.get(Globals.UPLOAD_FILE_NM));
						    customerInfoVO.setCompany_file_path((String)_map.get(Globals.FILE_PATH));
						    customerInfoVO.setCompany_file_name((String)_map.get(Globals.ORIGIN_FILE_NM));
						    
				    	}
				    }
				    				    
					customerInfoVO.setCompany_id(company_id);
					customerInfoVO.setCompany_name(company_name);
					customerInfoVO.setChairman(chairman);
					customerInfoVO.setBusiness_category(business_category);
					customerInfoVO.setBusiness_condition(business_condition);
					customerInfoVO.setCompany_reg_number(company_reg_number);
					customerInfoVO.setCorporate_number(corporate_number);
					customerInfoVO.setPhone_number(phone_number);
					customerInfoVO.setAddress(address);
					customerInfoVO.setCharger_yn(charger_yn);
					customerInfoVO.setCompany_yn(company_yn);
					customerInfoVO.setCompany_eng(company_eng);
					customerInfoVO.setAddress_eng(address_eng);
					customerInfoVO.setSales_customer(sales_customer);
					customerInfoVO.setSite_id(site_id);
					customerInfoVO.setCompany_reg_check(company_reg_check);
					customerInfoVO.setMain_fax(main_fax);
					customerInfoVO.setOperation_cd(operation_cd);
					customerInfoVO.setEtc(etc);
					
					null_company_id = customerService.insertCustomerAdmin(customerInfoVO);
					status.setComplete();
				}
				
				company_id = null_company_id;
				
				//삭제
				searchVO.setSales_company_id(company_id);
				searchVO.setModifier(login_id);
				
				customerService.deleteSalesCustomer(searchVO);
				
				//저장
				if(!searchVO.getSales_customer().equals("")){
					String arrCust[] = searchVO.getSales_customer().split(",");
					for(int i = 0 ; i < arrCust.length; i ++ ){						
						CustomerSearchVO customerSearchVO =new CustomerSearchVO();						
						customerSearchVO.setSales_company_id(company_id);
						customerSearchVO.setSales_customer(arrCust[i]);
						customerSearchVO.setCreator(login_id);
						customerSearchVO.setModifier(login_id);			
						customerSearchVO.setCompany_sales_customer_id(null);
											
						customerService.insertSalesCustomer(customerSearchVO);
					}
				}
				
				
				String customer_id = "";
				String customer_name ="";
				String division ="";
				String job_title ="";
				String email ="";
				String mobile ="";
				String sub_phone_number ="";
				String fax ="";
				String invoice_gb = "";		
				
				company_id = customerInfoVO.getIn_sub_company_id();
				if("".equals(searchVO.getCustomer_name()) || searchVO.getCustomer_name() == null){
					insertFlag = "2";  
				}else{
					for (int cnt = 0; cnt < searchVO.getCustomer_name().length; cnt++) {
						
						customerInfoVO.setCreator(login_id);
						customerInfoVO.setModifier(login_id);
						
						if(searchVO.getCustomer_id() == null){
							customer_id = null;
						}else{
							if(cnt >= searchVO.getCustomer_id().length){
								customer_id = null;
							}else{
								customer_id = searchVO.getCustomer_id()[cnt];
							}
						}
						customer_name = searchVO.getCustomer_name()[cnt];
						division = searchVO.getDivision()[cnt];
						job_title = searchVO.getJob_title()[cnt];
						email = searchVO.getEmail()[cnt];
						mobile = searchVO.getMobile()[cnt];
						sub_phone_number = searchVO.getSub_phone_number()[cnt];
						fax = searchVO.getFax()[cnt];
						if(searchVO.getInvoice_gb()[cnt] == null 
								|| "".equals(searchVO.getInvoice_gb())){
							invoice_gb = "0";
						}else{
							invoice_gb = searchVO.getInvoice_gb()[cnt];
						}
					
						company_id = searchVO.getIn_sub_company_id()[cnt];
						if("".equals(company_id)){
							company_id = null_company_id;
						}
						
						customerInfoVO.setCustomer_id(customer_id);
						customerInfoVO.setCustomer_name(customer_name);
						customerInfoVO.setDivision(division);
						customerInfoVO.setJob_title(job_title);
						customerInfoVO.setEmail(email);
						customerInfoVO.setMobile(mobile);
						customerInfoVO.setSub_phone_number(sub_phone_number);
						customerInfoVO.setFax(fax);
						customerInfoVO.setCompany_id(company_id);
						customerInfoVO.setInvoice_gb(invoice_gb);						
						
						customerService.insertCustomerSub(customerInfoVO);
					}
				}
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				 if("0".equals(insertFlag)){
					 pw.print("success");
					 pw.flush();
				 }else if("1".equals(insertFlag)){
					 pw.print("fail");
					 pw.flush();
				 }else{
					 pw.print("success");
					 pw.flush();
				 }
		 	} catch(Exception e) {
		 		e.printStackTrace();
		 	}
		}
	 
	 
		/**
		 * 고객사 담당자를 삭제한다.
		 * @param searchVO - 목록 조회조건 정보가 담긴 VO
		 * @param status
		 * @return "forward:/cop/deleteCustomerAdmin"
		 * @exception Exception
		 */
		@RequestMapping("/cop/deleteCustomerSub")
		@ResponseBody
		public void CustomerSubDel(@ModelAttribute("searchVO") CustomerSearchVO searchVO
				, CustomerInfoVO customerInfoVO
				, SessionStatus status
				, HttpServletResponse response) throws Exception {			
			
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			
			int login_id       =  loginVO.getUser_id();
			int company_id = 0;
			String customer_id = "";			
			
			if(searchVO.getCustomer_id() != null){
				for (int cnt = 0; cnt < searchVO.getCustomer_id().length; cnt++) {
					customer_id = searchVO.getCustomer_id()[cnt];
					company_id = searchVO.getIn_sub_company_id()[cnt];
					customerInfoVO.setCustomer_id(customer_id);
					customerInfoVO.setDeleteYn("1");
					customerInfoVO.setCompany_id(company_id);
					customerInfoVO.setModifier(login_id);
					
					customerService.deleteCustomerSub(customerInfoVO);
					status.setComplete();
				}   
			}
			
			
			response.setContentType("text/html; charset=utf-8");
	    	PrintWriter pw = response.getWriter();
	    	pw.print("success");
	    	pw.flush();    
		}
		
		
		/**
		 * 고객사 담당자를 삭제한다.
		 * @param searchVO - 목록 조회조건 정보가 담긴 VO
		 * @param status
		 * @return "forward:/cop/deleteCustomerAdmin"
		 * @exception Exception
		 */
		@RequestMapping("/cop/selectCustomerSubList")
		@ResponseBody
		public void selectCustomerSubList(@ModelAttribute("searchVO") CustomerSearchVO searchVO
						, CustomerInfoVO customerInfoVO
						, SessionStatus status
						, HttpServletRequest request, HttpServletResponse response) throws Exception {			
			
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			List<CustomerInfoVO> resultList = customerService.selectCustomerSubList(searchVO);
			
			customerService.selectCustomerSubList(searchVO);
			status.setComplete();
			
			ObjectMapper om = new ObjectMapper();
	    	String str_resData = om.writeValueAsString(resultList);
	    	 
			response.setContentType("text/html; charset=utf-8");
	    	PrintWriter pw = response.getWriter();
	    	pw.print(str_resData);
	    	pw.flush();
		}
		
		@RequestMapping(value = "/cop/companyDownloadAjax")
		@ResponseBody
		public void companyDownloadAjax(@ModelAttribute("searchVO") CustomerSearchVO searchVO
							, ModelMap model
							, HttpServletRequest request
							, HttpServletResponse response
							, Map<String, String> commandMap) throws Exception {
							 
			response.setContentType("text/html; charset=utf-8");
			String str_resData = "";			
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			try {
				
				//프로젝트 멤버 조회
				CustomerInfoVO salesCompanyFile = new CustomerInfoVO();
				salesCompanyFile = customerService.selectCompanyFiledown(searchVO);				
				request.setAttribute("downFilePath", salesCompanyFile.getCompany_file_path());
				request.setAttribute("downFile", salesCompanyFile.getCompany_file_id());
				request.setAttribute("orgFileName", salesCompanyFile.getCompany_file_name());
				fileUtil.downFile(request, response);
			} catch (Exception ex) {
				str_resData = ex.toString();
			}
	}
			
	@RequestMapping(value = "/cop/chk_comapny_number")
	@ResponseBody
	public void chk_comapny_number(@ModelAttribute("searchVO") CustomerSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 
		response.setContentType("text/html; charset=utf-8");
		String str_resData = "";
		
		try {
			str_resData = customerService.selectCountRegNumber(searchVO);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    pw.print(str_resData);
	    pw.flush();
	}
	
	@RequestMapping(value = "/cop/chk_corporate_number")
	@ResponseBody
	public void chk_corporate_number(@ModelAttribute("searchVO") CustomerSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 
		response.setContentType("text/html; charset=utf-8");
		String str_resData = "";
		
		try {
			str_resData = customerService.selectCountCorporateNumber(searchVO);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    pw.print(str_resData);
	    pw.flush();
	}
	
	@RequestMapping(value = "/cop/chk_comapny_name")
	@ResponseBody
	public void chk_company_name(@ModelAttribute("searchVO") CustomerSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 		
		String str_resData = "";
		try {
			str_resData = customerService.selectCountCompanyName(searchVO);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
    	PrintWriter pw = response.getWriter();
    	pw.print(str_resData);
    	pw.flush();
	}
	
	@RequestMapping(value = "/cop/selectSalesCustomerList")
	@ResponseBody
	public void selectSalesCustomerList(@ModelAttribute("searchVO") PaymentVO searchVO, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		try {
			searchVO.setSh_division_cd(searchVO.getSh_division_cd());
			searchVO.setUser_id(searchVO.getUser_id());
			searchVO.setSh_user_name(searchVO.getSh_user_name());
			searchVO.setCreator(login_id);
			
			List<PaymentVO> salesCustomerList = paymentService.selectSalesCustomerList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("salesCustomerList", salesCustomerList);
					
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
			   	 
		response.setContentType("text/html; charset=utf-8");
	   	PrintWriter pw = response.getWriter();
	   	pw.print(str_resData);
	   	pw.flush();
	}
	
	/**
	 * 부서, 직원 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/cop/divisionListAjax")
	public void selectDivisionList(@ModelAttribute("searchVO") CustomerSearchVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {		
		String str_resData = "";		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		//직원 검색
		List<PaymentVO> userList = paymentService.selectUserList(paymentVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("divisionList", divisionList);
		map.put("userList", userList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	@RequestMapping(value = "/cop/deleteSalesCustomer")
	public void deleteSalesCustomer(@ModelAttribute("searchVO") CustomerSearchVO searchVO
			, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String str_resData = "";
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		try {
			searchVO.setModifier(login_id);			
			customerService.deleteSalesCustomer(searchVO);
			
			str_resData = "succes";
		} catch (Exception ex) {
			str_resData = "fail";
		}
			   	 
		response.setContentType("text/html; charset=utf-8");
	   	PrintWriter pw = response.getWriter();
	   	pw.print(str_resData);
	   	pw.flush();
	}
}
