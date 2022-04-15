package siso.sam.pcode.web;

import java.io.PrintWriter;
import java.util.ArrayList;
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
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.sam.fcasting.service.ForeCastingService;
import siso.sam.fcasting.service.ForeCastingVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProjectCodeController.java
 * @Description : ProjectCodeController Class
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
public class ProjectCodeController {

	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;	
	
	/** EgovSampleService */
	@Autowired
	private ForeCastingService forecastingservice;

	/** EgovPageInitService */
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	/** EgovMessageSource */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;		
	
	/**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/sam/pcode/projectCode"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sam/pcode/projectCode")
	public String projectCodeURL(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sam/pcode/projectCode";
		
		try {
		
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_sales_project_year().equals("")) defaultExpanseYear = searchVO.getSh_sales_project_year();
			if(!searchVO.getSh_sales_project_month().equals("")) defaultExpanseMonth = searchVO.getSh_sales_project_month();
			
			searchVO.setSh_sales_project_year(defaultExpanseYear);
			searchVO.setSh_sales_project_month(defaultExpanseMonth);
			
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
	 * 영업관리 Project Code 리스트 출력
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sam/pcode/projectCodeList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sam/pcode/projectCodeList")
	public void projectCodeList(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		try {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
			int login_id       	=	loginVO.getUser_id();
			
			List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);
			
			//검색
			searchVO.setSales_project_year(searchVO.getSh_sales_project_year());
			searchVO.setSales_project_month(searchVO.getSh_sales_project_month());
			searchVO.setCompany_name(searchVO.getSh_company_name());
			searchVO.setSales_type_cd(searchVO.getSh_sales_type_cd());
			searchVO.setSales_status_cd(searchVO.getSh_sales_status_cd());
			searchVO.setBrand_cd(searchVO.getSh_brand_cd());
			if (SpringStringUtil.isEmpty(searchVO.getSh_user_id())) {
				searchVO.setDivision_child_list(divisionChild);
			} else {
				searchVO.setDivision_child_list(divisionChild);
				searchVO.setUser_id(searchVO.getSh_user_id());
			}
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			searchVO.setWin_gb(searchVO.getWin_gb());
			
			//리스트
			List<ProjectCodeVO> pCodeList = projectCodeService.projectCodeList(searchVO);
			
			ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
			
			//영업구분
			inputVO.setGroup_id("114");
			List<CmmnDetailCode> salesDividelist = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//구분
			inputVO.setGroup_id("116");
			List<CmmnDetailCode> salesTypeList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//brand
			inputVO.setGroup_id("117");		
			List<CmmnDetailCode> brandList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//영업 status
			inputVO.setGroup_id("115");		
			List<CmmnDetailCode> salesStatusList = springCmmUseService.selectCmnCodeCombo(inputVO);
			
			//담당영업
			List<ProjectCodeVO> divisionUsers = projectCodeService.projectDivisionUserList(searchVO);
			
			//담당부서
			List<ProjectCodeVO> division = projectCodeService.projectDivisionList(searchVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pCodeList", pCodeList);
			map.put("salesDividelist", salesDividelist);
			map.put("salesTypeList", salesTypeList);
			map.put("brandList", brandList);
			map.put("salesStatusList", salesStatusList);
			map.put("divisionUsers", divisionUsers);
			map.put("division", division);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 영업관리 Project Code 리스트 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sam/pcode/projectCodeSave")
	@ResponseBody
	public void projectCodeSave(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData 					=	"";
		
		String sales_ym 					=	searchVO.getSales_ym();
		String sales_week 					=	searchVO.getSales_week();
		
		String sales_project_id 			=	"";
		String last_division_cd 			=	"";
		String operation_cd					=	"";
		String operation_cd_code			=	"";
		String user_id 						=	"";
		String sales_project_year 			=	"";
		String sales_project_month 			=	"";
		String sales_type_cd 				=	"";
		String company_id 					=	"";
		String sales_divide_cd 				=	"";
		String brand_cd 					=	"";
		String brand_cd_name_sub			=	"";
		String module 						=	"";
		String sales_status_cd 				=	"";
		String closing 						=	"";
		String win_gb 						=	"";
		String sales_project_code 			=	"";
		String contract_estimate_price 		=	"";
		String cost_price 					=	"";
		String profit_price 				=	"";
		
		String orderNum						=	"";
		
		try {
		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			
			int login_id       		=	loginVO.getUser_id();
			last_division_cd 		=	loginVO.getLast_division_cd();
			String grant_id			=	loginVO.getGrant_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			searchVO.setLast_division_cd(last_division_cd);
			
			searchVO.setSales_project_year(searchVO.getSh_sales_project_year());
			searchVO.setSales_project_month(searchVO.getSh_sales_project_month());
			
			//월별 전체 카운트 +1 
			int monthCount  = projectCodeService.selectMonthProjectCount(searchVO);
			
			//List<ProjectCodeVO> inputListVO = new ArrayList<ProjectCodeVO>();
			//List<ForeCastingVO> inputListFCastingVO = new ArrayList<ForeCastingVO>();
			
			int projectOrder = monthCount;
			
			for(int cnt=0; cnt < searchVO.getIn_sales_type_cd().length; cnt++) {
				
				/////////////////////////////////////////////////////
				//project code 저장
				ProjectCodeVO projectCodeVO = new ProjectCodeVO();
				
				sales_project_id		=	searchVO.getIn_sales_project_id()[cnt];
				operation_cd			=	searchVO.getIn_operation_cd()[cnt];
				operation_cd_code		=	searchVO.getIn_operation_cd_code()[cnt];
				user_id					=	searchVO.getIn_user_id()[cnt];
				sales_project_year		=	searchVO.getIn_sales_project_year()[cnt];
				sales_project_month		=	searchVO.getIn_sales_project_month()[cnt];
				sales_type_cd			=	searchVO.getIn_sales_type_cd()[cnt];
				company_id				=	searchVO.getIn_company_id()[cnt];
				sales_divide_cd			=	searchVO.getIn_sales_divide_cd()[cnt];
				brand_cd				=	searchVO.getIn_brand_cd()[cnt];
				brand_cd_name_sub		=	searchVO.getIn_brand_cd_name_sub()[cnt];
				module					=	searchVO.getIn_module()[cnt];
				sales_status_cd			=	searchVO.getIn_sales_status_cd()[cnt];
				closing					=	searchVO.getIn_closing()[cnt];
				contract_estimate_price	=	searchVO.getIn_contract_estimate_price()[cnt];
				cost_price				=	searchVO.getIn_cost_price()[cnt];
				profit_price			=	searchVO.getIn_profit_price()[cnt];
				
				//금액 , 치환
				contract_estimate_price = contract_estimate_price.replace(",", "");
				cost_price 				= cost_price.replace(",", "");
				profit_price 			= profit_price.replace(",", "");
				
				if (SpringStringUtil.isEmpty(sales_project_id)) {
					sales_project_id = null;
				}
				
				//프로젝트 코드 생성
				if(sales_project_id == null) {
					
					projectOrder++;
					
					int length = (int) (Math.log10(projectOrder)+1);
				
					if (length == 4) 		orderNum = String.valueOf(projectOrder);
					else if (length == 3)	orderNum = "0" + projectOrder;
					else if (length == 2)	orderNum = "00" + projectOrder;
					else if (length == 1)	orderNum = "000" + projectOrder;
										
					sales_project_code = operation_cd_code + sales_project_year + sales_project_month + "-" + brand_cd_name_sub + "-" + orderNum;
					
					win_gb = "X";
				
				} else {
					
					sales_project_code = ""; //저장안함
					
					win_gb = null;
				}
				
				projectCodeVO.setSales_project_id(sales_project_id);
				projectCodeVO.setUser_id(user_id);
				projectCodeVO.setOperation_cd(operation_cd);
				projectCodeVO.setSales_project_year(sales_project_year);
				projectCodeVO.setSales_project_month(sales_project_month);
				projectCodeVO.setSales_type_cd(sales_type_cd);
				projectCodeVO.setCompany_id(company_id);
				projectCodeVO.setSales_divide_cd(sales_divide_cd);
				projectCodeVO.setBrand_cd(brand_cd);
				projectCodeVO.setModule(module);
				projectCodeVO.setSales_status_cd(sales_status_cd);
				projectCodeVO.setClosing(closing);
				projectCodeVO.setWin_gb(win_gb);
				projectCodeVO.setSales_project_code(sales_project_code);
				projectCodeVO.setContract_estimate_price(contract_estimate_price);
				projectCodeVO.setCost_price(cost_price);
				projectCodeVO.setProfit_price(profit_price);
				if(grant_id.indexOf("7") >= 0) {
					projectCodeVO.setCreator(Integer.parseInt(user_id));
				} else {
					projectCodeVO.setCreator(login_id);
				}
				projectCodeVO.setModifier(login_id);
			
				//inputListVO.add(projectCodeVO);
				
				String salesProjectKey = projectCodeService.projectCodeInsert(projectCodeVO);
				
				/////////////////////////////////////////////////////
				//forecasting 저장
				if(sales_project_id == null) {
					
					String closingYm = "";
					
					if (SpringStringUtil.isEmpty(closing)) {
						closingYm = "";						
					}else{
						closingYm = closing.replace(".", "").substring(0, 6);
					}
					
					ForeCastingVO foreCastingVO = new ForeCastingVO();
					
					foreCastingVO.setSales_id(null);
					foreCastingVO.setSales_project_id(salesProjectKey);
					foreCastingVO.setSales_ym(sales_ym);
					foreCastingVO.setSales_week(sales_week);
					foreCastingVO.setIssue_yn("");
					foreCastingVO.setReport_item("");
					foreCastingVO.setQty("0");
					foreCastingVO.setContract_ym(closingYm);
					foreCastingVO.setSales_status_cd(sales_status_cd);
					foreCastingVO.setSales_type_cd(sales_type_cd);
					foreCastingVO.setContract_price(contract_estimate_price);
					foreCastingVO.setCost_price(cost_price);
					foreCastingVO.setProfit_price(profit_price);
					if(grant_id.indexOf("7") >= 0) {
						foreCastingVO.setCreator(Integer.parseInt(user_id));
					} else {
						foreCastingVO.setCreator(login_id);
					}
					
					foreCastingVO.setModifier(login_id);
					
					forecastingservice.foreCastingSave(foreCastingVO);
				}
			}
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			//str_resData = "fail";
			str_resData = ex.getMessage();
			//str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 영업관리 Project Code 리스트 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sam/pcode/projectCodeDel")
	@ResponseBody
	public void projectCodeDel(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData 			=	"";
		
		String sales_project_id 	=	"";
		String sales_project_code 	=	"";
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			
			//searchVO.setModifier(login_id);
			
			List<ProjectCodeVO> inputListVO = new ArrayList<ProjectCodeVO>();
			
			for(int cnt=0; cnt < searchVO.getIn_sales_project_id().length; cnt++) {
				
				ProjectCodeVO projectCodeVO = new ProjectCodeVO();
				
				sales_project_id	=	searchVO.getIn_sales_project_id()[cnt];
				sales_project_code  =   searchVO.getIn_sales_project_code()[cnt];
				
				projectCodeVO.setSales_project_id(sales_project_id);
				projectCodeVO.setSales_project_code(sales_project_code);
				projectCodeVO.setModifier(login_id);
			
				inputListVO.add(projectCodeVO);
			}
			
			//삭제
			resultMap = projectCodeService.projectCodeDel(inputListVO);
		} catch(Exception ex) {
			ex.printStackTrace();
			//str_resData = "fail";
			str_resData = ex.getMessage();
		}
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(resultMap);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
		
}
