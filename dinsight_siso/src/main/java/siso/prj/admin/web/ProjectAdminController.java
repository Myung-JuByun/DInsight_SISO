package siso.prj.admin.web;

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
import org.springframework.web.bind.annotation.ResponseBody;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.prj.admin.service.ProjectAdminSearchVO;
import siso.prj.admin.service.ProjectAdminService;
import siso.prj.admin.service.ProjectAdminVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProjectAdminController.java
 * @Description : ProjectAdminController Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
@Controller
//@SessionAttributes(types = ProjectAdminVO.class)
public class ProjectAdminController {
	
	/** EgovSampleService */
	@Autowired
	private ProjectAdminService projectAdminService;

	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected SpringCmmUseService springCmmUseService;
		
	@Autowired
	private PaymentService paymentService;
	
	private LoginVO loginVO;

	/**
	 * 상단그리드 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 ProjectAdminSearchVO
	 * @param model
	 * @param request
	 * @return "/prj/admin/projectAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/admin/projectAdmin")
	public String selectAdminList(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {

		String pageUrl = "/prj/admin/projectAdmin";

		/** 좌측, 우측 메뉴정보 */
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}

	
	/**
	 * 상단그리드 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 ProjectAdminSearchVO
	 * @param model
	 * @param request
	 * @return "/prj/admin/projectAdminAjax"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/admin/projectAdminAjax")
	@ResponseBody
	public void selectAdminListAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ModelMap model
			, HttpServletRequest request
			, HttpServletResponse response) throws Exception {


		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();		
		
		String str_resData = "";
		PaymentVO paymentVO = new PaymentVO();
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			/** 상단 리스트 */
			List<ProjectAdminVO> projectList = projectAdminService.selectProjectAdminList(searchVO);
			
			/** 프로젝트명 */
			List<ProjectAdminVO> selectProjectSearchList = projectAdminService.selectProjectSearchList();
			
			/** list select box (고객사) */
			//List<ProjectAdminVO> selectCompanySearchList = projectAdminService.selectCompanySearchList();

			/** 등록 select box (담당자명) */
			//List<ProjectAdminVO> selectCustomerSearchList = projectAdminService.selectCustomerSearchList();
			
			//부서정보
			List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
			
			/** 영업,개발 상태 */
			inputVo.setGroup_id("126");	
			List<CmmnDetailCode> salesStatusCdList = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			/** 상주,비상주,내부 */
			inputVo.setGroup_id("112");	
			List<CmmnDetailCode> stayStatusCdList = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			//부서직원 조회
			//List<ExpansePayApprovalVO> divisionUserList = expansePayApprovalService.selectDivisionUserList(expansepayapprovalvo);
			
			map.put("projectList", projectList);
			map.put("projectNameList", selectProjectSearchList);
			//map.put("companySearchList", selectCompanySearchList);
			//map.put("customerSearchList", selectCustomerSearchList);
			map.put("divisionList", divisionList);
			map.put("salesStatusCdList", salesStatusCdList);
			map.put("stayStatusCdList", stayStatusCdList);
			//map.put("divisionUserList", divisionUserList);
			
			ObjectMapper om = new ObjectMapper();
			str_resData = om.writeValueAsString(map);

		} catch (Exception ex) {

			str_resData = ex.toString();
		}

	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 하단그리드 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 ProjectAdminSearchVO
	 * @param model
	 * @param request
	 * @return "/prj/admin/projectAdminMemberAjax"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/admin/projectAdminMemberAjax")
	@ResponseBody
	public void projectAdminMemberAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response) throws Exception {

		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
			
		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			//프로젝트 멤버 조회
			List<ProjectAdminVO> selectProjectAdminDetailList = projectAdminService.selectProjectAdminDetailList(searchVO);
			
			/** 하단 selectbox 역할 */
			inputVo.setGroup_id("110");	
			List<CmmnDetailCode> roleCdList = springCmmUseService.selectCmnCodeCombo(inputVo);

			/** 하단 selectbox 상태 */
			inputVo.setGroup_id("112");	
			List<CmmnDetailCode> stayStatusCdList = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			
			map.put("projectMemberList", selectProjectAdminDetailList);
			map.put("roleList", roleCdList);
			map.put("stayStatusList", stayStatusCdList);
			
			
			ObjectMapper om = new ObjectMapper();
			str_resData = om.writeValueAsString(map);

		} catch (Exception ex) {

			str_resData = ex.toString();
		}

	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 상단 그리드 등록한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminInsert"
	 * @exception Exception
	 */
	@RequestMapping("/prj/admin/projectAdminInsertAjax")
	@ResponseBody
	public void projectAdminInsertAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ProjectAdminVO projectAdminVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		String str_resData = "";
		searchVO.setCreator(login_id);
		
		try {
			String sales_dev_cd = searchVO.getIn_sale_dev_cd();
			if("02".equals(sales_dev_cd) || "03".equals(sales_dev_cd)){
				String opertaion_code = searchVO.getIn_opertaion_code();
				opertaion_code = opertaion_code + searchVO.getIn_start_day();
				searchVO.setIn_project_code(opertaion_code);
			}
			String project_id = searchVO.getIn_project_id();
			String in_contract_price = searchVO.getIn_contract_price();
			String in_customer_id = searchVO.getIn_customer_id();
			if("".equals(project_id)) searchVO.setIn_project_id(null);
			if("".equals(in_contract_price)) searchVO.setIn_contract_price("0");
			if(in_customer_id == null) searchVO.setIn_customer_id("");
			projectAdminService.projectAdminInsert(searchVO);
			str_resData = "success";
		} catch (Exception e) {
			//str_resData = "fail";
			str_resData = e.toString();
			pw.print(str_resData);
			pw.flush();
		}
		
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 상단 그리드 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailDel"
	 * @exception Exception
	 */
	@RequestMapping("/prj/admin/projectAdminDelAjax")
	@ResponseBody
	public void projectAdminDelAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ProjectAdminVO projectAdminVO
			, HttpServletRequest request
			, HttpServletResponse response) throws Exception {			
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		try{
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			searchVO.setModifier(login_id);
			projectAdminService.projectAdminDel(searchVO);
		}catch(Exception ex){
			pw.print(ex.toString());
			pw.flush();
		}
		
		pw.print("success");
		pw.flush();
	}
	
	/**
	 * 하단 그리드 등록한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailSave"
	 * @exception Exception
	 */
	@RequestMapping("/prj/admin/projectAdminMemberSaveAjax")
	public void projectAdminMemberSaveAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ProjectAdminVO projectAdminVO
			, HttpServletRequest request
			, HttpServletResponse response) throws Exception {
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		String member_id               = "";
		String din_project_id          = "";
		String din_user_id             = "";
		String din_role_cd  	       = "";
		String din_stay_status_cd      = "";
		String din_job_start_day       = "";
		String din_job_end_day         = "";
		String din_man_month           = "";
 		
		//** 로그인정보 *//*
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
		
		//** 저장 및 업데이트 처리 *//* 
		List<ProjectAdminVO> inputListVo  = new ArrayList<ProjectAdminVO>();
		
		//** 처음 값은 복사용 값이므로 제외 시킴 *//* 
		try {
			for(int cnt=0; cnt < searchVO.getDin_user_id().length; cnt++) {
				
				ProjectAdminVO inputVO = new ProjectAdminVO(); 
				
				//파라미터 값을 찾아온다
				if(searchVO.getMember_id() == null || "".equals(searchVO.getMember_id()[cnt])) member_id = null;
				else member_id = searchVO.getMember_id()[cnt];
				
				din_project_id       = searchVO.getDin_project_id()[cnt];
				din_user_id          = searchVO.getDin_user_id()[cnt];
				din_role_cd          = searchVO.getDin_role_cd()[cnt];
				din_stay_status_cd   = searchVO.getDin_stay_status_cd()[cnt];
				din_job_start_day    = searchVO.getDin_job_start_day()[cnt];
				din_job_end_day      = searchVO.getDin_job_end_day()[cnt];
				din_man_month        = searchVO.getDin_man_month()[cnt];
				
				if (SpringStringUtil.isEmpty(din_man_month)) {
					din_man_month = "0.0";
				}

				//inputVO 값을 담는다
				inputVO.setProject_id(din_project_id);
				inputVO.setMember_id(member_id);
				inputVO.setUser_id(din_user_id);
				inputVO.setRole_cd(din_role_cd);
				inputVO.setStay_status_cd(din_stay_status_cd);
				inputVO.setJob_start_day(din_job_start_day);
				inputVO.setJob_end_day(din_job_end_day);
				inputVO.setMan_month(din_man_month);
				inputVO.setCreator(login_id);
				inputVO.setModifier(login_id);
				
				inputListVo.add(inputVO);
				
			}
			
			projectAdminService.projectAdminDetailSave(inputListVo);
		} catch (Exception e) {
			e.printStackTrace();
			pw.print(e.toString());
			pw.flush();
		}
		
		pw.print("success");
		pw.flush();
	}
	
	/**
	 * 하단 그리드 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailDel"
	 * @exception Exception
	 */
	@RequestMapping("/prj/admin/projectAdminMemberDelAjax")
	@ResponseBody
	public void projectAdminMemberDelAjax(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ProjectAdminVO projectAdminVO
			, HttpServletResponse response
			, HttpServletRequest request) throws Exception {			
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id = loginVO.getUser_id();
		String member_id = "";
		
		if(searchVO.getMember_id() != null){
			try {
				for (int cnt = 0; cnt < searchVO.getMember_id().length; cnt++) {

					member_id = searchVO.getMember_id()[cnt];
					projectAdminVO.setMember_id(member_id);
					projectAdminVO.setDeleteYn("1");
					projectAdminVO.setModifier(login_id);
					projectAdminService.projectAdminDetailDel(projectAdminVO);
				}
			} catch (Exception e) {
				pw.print(e.toString());
				pw.flush();
			}
		}else{
			pw.print("member_id is null");
			pw.flush();
		}
		
		pw.print("success");
		pw.flush();
	}
	
	/**
	 * 하단 그리드 멤버 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailDel"
	 * @exception Exception
	 */
	/*@RequestMapping("/prj/admin/projectAdminMemberDel")
	@ResponseBody
	public void projectAdminMemberDel(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO
			, ProjectAdminVO projectAdminVO
			, HttpServletResponse response
			, BindingResult bindingResult
			, Model model
			, SessionStatus status) throws Exception {			
		
		loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUserId();
		String member_id = "";
		
		for (int cnt = 0; cnt < searchVO.getMember_id().length; cnt++) {

			member_id = searchVO.getMember_id()[cnt];
			
			projectAdminVO.setDeleteYn("1");
			projectAdminVO.setModifier(login_id);
			
			projectAdminService.projectAdminDetailDel(projectAdminVO);
			status.setComplete();
			
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("success");
			pw.flush();
			
		}
	}*/
	
	
	/**
	 * 상단 그리드 등록한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdmin"
	 * @exception Exception
	 */
	/*@RequestMapping("/prj/admin/projectAdminInsert")
	public String adminInsert(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ProjectAdminVO projectAdminVO, BindingResult bindingResult, Model model, SessionStatus status) throws Exception {
		
		
		
		String inmo_project_id         = "";
		inmo_project_id = searchVO.getInmo_project_id();
		
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■  inmo_project_id  : "+inmo_project_id);
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		
		if(inmo_project_id.length() != 0){
			System.out.println("aaaaaaaaaaaaaaaaaa");
			
		}
		 
		// Server-Side Validation
		beanValidator.validate(projectAdminVO, bindingResult);

		if (bindingResult.hasErrors()) {

			model.addAttribute("projectAdminVO", projectAdminVO);
			
			return "/common/error";
		}

		loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUserId();

		searchVO.setIn_division_cd(loginVO.getDivisionCd());
		searchVO.setIn_status_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
		searchVO.setCreator(login_id);

		projectAdminService.projectAdminInsert(searchVO);
		status.setComplete();
		
		return "redirect:/prj/admin/projectAdmin";
	}*/
	
	/**
	 * 상단 그리드 수정 후 저장한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/prj/admin/projectAdminSave"
	 * @exception Exception
	 */
	/*@RequestMapping("/prj/admin/projectAdminSave")
	public void adminSave(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ProjectAdminVO projectAdminVO, Model model,HttpServletResponse response) throws Exception {
	
		System.out.println("adminSave!!!!!!!!!!!!!!!!!!!!!!!");
		
		String mo_project_id         = "";
		String mo_sale_dev_cd        = "";
		String mo_project_status_cd  = "";
		String mo_project_name       = "";
		String mo_company_id         = "";
		String mo_man_month          = "";
		String mo_start_day          = "";
		String mo_end_day            = "";
		String mo_customer_id        = "";
		
		*//** 로그인정보 *//*
		loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUserId();
		
		
		//ProjectAdminSearchVO projectDelVO = new ProjectAdminSearchVO();
		
		searchVO.setModifier(login_id);
		searchVO.setCompany_code(searchVO.getCompany_code());
		searchVO.setYear(searchVO.getYear());
		searchVO.setMonth(searchVO.getMonth());	
		searchVO.setProject_code(searchVO.getProject_code());
		
		
		*//** 기존 데이터 삭제 처리 후 저장 하는방식으로 적용 *//*
		//projectAdminService.projectAdminDel(searchVO);
		
		 *//** 저장 및 업데이트 처리 *//* 
		List<ProjectAdminVO> inputListVo  = new ArrayList<ProjectAdminVO>();
		
		
		//System.out.println("searchVO.getMo_project_id().length : "+searchVO.getMo_project_id().length);
		//System.out.println("searchVO.getMo_project_id().length : "+searchVO.getMo_project_id().length);
		
		
		 *//** 처음 값은 복사용 값이므로 제외 시킴 *//* 
		for(int cnt=0; cnt < searchVO.getMo_project_id().length; cnt++) {
			
			ProjectAdminVO inputVO = new ProjectAdminVO(); 
			
			//파라미터 값을 찾아온다
			mo_sale_dev_cd        = searchVO.getMo_sale_dev_cd()[cnt];
			mo_project_status_cd  = searchVO.getMo_project_status_cd()[cnt];
			mo_project_name       = searchVO.getMo_project_name()[cnt];
			mo_company_id         = searchVO.getMo_company_id()[cnt];
			mo_man_month          = searchVO.getMo_man_month()[cnt];
			mo_start_day          = searchVO.getMo_start_day()[cnt];
			mo_end_day            = searchVO.getMo_end_day()[cnt];
			mo_customer_id        = searchVO.getMo_customer_id()[cnt];
			
			mo_project_id = searchVO.getMo_project_id()[cnt];
			
			if (EgovStringUtil.isEmpty(mo_project_id)) {
				
				mo_project_id = null;
			 }
			
			//inputVO 값을 담는다
			inputVO.setProject_id(mo_project_id);
			inputVO.setSale_dev_cd(mo_sale_dev_cd);
			inputVO.setProject_status_cd(mo_project_status_cd);
			inputVO.setProject_name(mo_project_name);
			inputVO.setCompany_id(mo_company_id);
			inputVO.setMan_month(mo_man_month);
			inputVO.setStart_day(mo_start_day);
			inputVO.setEnd_day(mo_end_day);
			inputVO.setCustomer_id(mo_customer_id);

			inputVO.setCreator(login_id);
			inputVO.setModifier(login_id);
			inputVO.setDivision_cd(loginVO.getDivisionCd());
			inputVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
			
			inputListVo.add(inputVO);
			
		}
		
		 *//** 검색조건을 담는다 *//* 
		//model.addAttribute("params", searchVO);
		
		projectAdminService.projectAdminSave(inputListVo);
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();
	}*/
	


	/**
	 * 하단 그리드 조회한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return @ModelAttribute("searchVO") - 조회한 정보
	 * @exception Exception
	 */	
	/*@RequestMapping("/prj/admin/selectAdminDetailList")
	public void selectAdminDetailList(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {

		String str_resData = "";
		
		try {
		
			List<ProjectAdminVO> selectProjectAdminDetailList = projectAdminService.selectProjectAdminDetailList(searchVO);
			System.out.println("■■■■■■■■■■■■■■■ selectAdminDetailList  : "+selectProjectAdminDetailList);
			
			ObjectMapper om = new ObjectMapper();
			str_resData = om.writeValueAsString(selectProjectAdminDetailList);

		} catch (Exception ex) {

			str_resData = ex.toString();
		}

	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	    //return str_resData;
	}*/
	

	
	/**
	 * 하단 그리드 등록한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailSave"
	 * @exception Exception
	 */
	/*@RequestMapping("/prj/admin/projectAdminDetailSave")
	public void adminDetailSave(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ProjectAdminVO projectAdminVO,  BindingResult bindingResult, Model model, HttpServletResponse response) throws Exception {

			
		System.out.println("■■■■■■■■■■■■■■■ projectAdminDetailSave");
		System.out.println("■■■■■■■■■■■■■■■ projectAdminDetailSave");
		System.out.println("■■■■■■■■■■■■■■■ projectAdminDetailSave");

		String member_id               = "";
		String din_project_id          = "";
		String din_user_id             = "";
		String din_role_cd  	       = "";
		String din_stay_status_cd      = "";
		String din_job_start_day       = "";
		String din_job_end_day         = "";
 		
		// Server-Side Validation
		//beanValidator.validate(projectAdminVO, bindingResult);

		if (bindingResult.hasErrors()) {
			//model.addAttribute("projectAdminVO", projectAdminVO);
			//return "/common/error";
		}
		
		*//** 로그인정보 *//*
		loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUserId();
		
		searchVO.setCreator(login_id);
		searchVO.setDin_project_id(searchVO.getDin_project_id());
		searchVO.setDin_user_id(searchVO.getDin_user_id());
		searchVO.setDin_role_cd(searchVO.getDin_role_cd());	
		searchVO.setDin_stay_status_cd(searchVO.getDin_stay_status_cd());
		searchVO.setMember_id(searchVO.getMember_id());
		
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		System.out.println("■■■■■■■■■■■■■■■ searchVO : "+ searchVO);
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		System.out.println("■■■■■■■■■■■■■■■ projectAdminVO : "+ projectAdminVO);
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		
		
		
		System.out.println(" projectAdminDetailDel start!!!");		
		*//** 기존 데이터 삭제 처리 후 저장 하는방식으로 적용 *//*
		projectAdminService.projectAdminDetailDel(searchVO);
		
		System.out.println(" projectAdminDetailDel  end!!!");		
		System.out.println("1");		
		
		
		 *//** 저장 및 업데이트 처리 *//* 
		List<ProjectAdminVO> inputListVo  = new ArrayList<ProjectAdminVO>();
		
		System.out.println("2");		
		System.out.println("searchVO.getMember_id().length : "+searchVO.getDin_user_id().length);		
		System.out.println("searchVO.getMember_id : "+searchVO.getDin_user_id());		
		System.out.println("444");		

		 *//** 처음 값은 복사용 값이므로 제외 시킴 *//* 
		for(int cnt=0; cnt < searchVO.getDin_user_id().length; cnt++) {
			
			System.out.println("111111");		
			ProjectAdminVO inputVO = new ProjectAdminVO(); 
			System.out.println("222222");		
			
			//파라미터 값을 찾아온다
			din_project_id       = searchVO.getDin_project_id()[cnt];
			din_user_id          = searchVO.getDin_user_id()[cnt];
			din_role_cd          = searchVO.getDin_role_cd()[cnt];
			din_stay_status_cd   = searchVO.getDin_stay_status_cd()[cnt];
			din_job_start_day    = searchVO.getDin_job_start_day()[cnt];
			din_job_end_day      = searchVO.getDin_job_end_day()[cnt];
			
			if (EgovStringUtil.isEmpty(member_id)) {
				
				member_id = null;
			 }

			System.out.println("333333");		
			
			//inputVO 값을 담는다
			inputVO.setProject_id(din_project_id);
			inputVO.setMember_id(member_id);
			inputVO.setUser_id(din_user_id);
			inputVO.setRole_code_id(din_role_cd);
			inputVO.setState_code_id(din_stay_status_cd);
			inputVO.setJob_start_day(din_job_start_day);
			inputVO.setJob_end_day(din_job_end_day);
			inputVO.setCreator(login_id);

			inputVO.setModifier(login_id);
			inputVO.setCreator(login_id);
			inputVO.setDivision_cd(loginVO.getDivisionCd());
			inputVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
			
			inputListVo.add(inputVO);
			
		}
		
		
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		System.out.println("projectAdminDetailSave");
		projectAdminService.projectAdminDetailSave(inputListVo);
		System.out.println("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();
		
	}
		*/
	
	/**
	 * 하단 그리드 삭제한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectAdminVO - 목록  정보가 담긴 VO
	 * @param bindingResult
	 * @param model
	 * @param status
	 * @return "forward:/prj/admin/projectAdminDetailDel"
	 * @exception Exception
	 */
	/*@RequestMapping("/prj/admin/projectAdminDetailDel")
	public String adminDetailDel(@ModelAttribute("searchVO") ProjectAdminSearchVO searchVO, ProjectAdminVO projectAdminVO, BindingResult bindingResult, Model model, SessionStatus status) throws Exception {			
		
		loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUserId();
		String member_id = "";
		
		for (int cnt = 0; cnt < searchVO.getMember_id().length; cnt++) {

			member_id = searchVO.getMember_id()[cnt];
			
			projectAdminVO.setMember_id(member_id);
			projectAdminVO.setDeleteYn("1");
			projectAdminVO.setModifier(login_id);
			
			projectAdminService.projectAdminDetailDel(projectAdminVO);
			status.setComplete();
		}
		return "redirect:/prj/admin/projectAdmin";
	}*/
	
}
