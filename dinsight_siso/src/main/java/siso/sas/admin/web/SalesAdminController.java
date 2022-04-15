package siso.sas.admin.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sas.admin.service.SalesAdminInfoVO;
import siso.sas.admin.service.SalesAdminSearchVO;
import siso.sas.admin.service.SalesAdminService;
import siso.sys.service.LoginVO;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : SalesAdminController.java
 * @Description : SalesAdmin Controller Class
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
public class SalesAdminController {

		@Autowired
		private SalesAdminService salesAdminService;

		@Autowired
		protected DefaultBeanValidator beanValidator;
		
		@Autowired
		protected SpringPageInitService springPageInitService;
		
		@Autowired
		protected SpringCmmUseService springCmmUseService;
		
		private LoginVO loginVO;
		
		/**
		 * 글 목록을 조회한다. (pageing)
		 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
		 * @param model
		 * @return "/usr/selectUserList"
		 * @exception Exception
		 */
		@RequestMapping(value = "/sas/admin/salesAdmin")
		public String selectAdminList(@ModelAttribute("searchVO") SalesAdminSearchVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
			
			String pageUrl = "/sas/admin/salesAdmin";
			
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
			
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
			
			/** 부서명 */
			inputVo.setGroup_id("109");
			List<CmmnDetailCode> divisionList = springCmmUseService.selectCmnCodeCombo(inputVo);
			model.addAttribute("divisionList", divisionList);
			
			/** 담당영업 */
			List<SalesAdminInfoVO> userList = salesAdminService.selectSalesUserList();
			model.addAttribute("userList", userList);
			
			/** 영업 status */
			inputVo.setGroup_id("115");
			List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
			model.addAttribute("statusList", statusList);
			
			/** 고객사 */
			List<SalesAdminInfoVO> companyList = salesAdminService.selectSalesCompanyList();
			model.addAttribute("companyList", companyList);
			
			/** sales_type_cd */
			inputVo.setGroup_id("116");
			List<CmmnDetailCode> typeList = springCmmUseService.selectCmnCodeCombo(inputVo);
			model.addAttribute("typeList", typeList);
			
			/** brand_cd */
			inputVo.setGroup_id("117");
			List<CmmnDetailCode> brandList = springCmmUseService.selectCmnCodeCombo(inputVo);
			model.addAttribute("brandList", brandList);

			/** pageing */
			searchVO.setPageUnit(searchVO.getPageUnit());
			searchVO.setPageSize(searchVO.getPageSize());
			searchVO.setPageingYn("Y");

			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
			paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
			paginationInfo.setPageSize(searchVO.getPageSize());

			searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
			searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
			searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
			
			List<SalesAdminInfoVO> salesAdminList = salesAdminService.selectSalesAdminList(searchVO);
			model.addAttribute("resultList_admin", salesAdminList);

			int totCnt = salesAdminService.selectSalesAdminListTotCnt(searchVO);
			paginationInfo.setTotalRecordCount(totCnt);
			model.addAttribute("paginationInfo", paginationInfo);
			
			System.out.println(salesAdminList);

			return pageUrl;
		}
		
		/**
		 * 고객사를 추가한다.
		 * @param searchVO - 목록 조회조건 정보가 담긴 VO
		 * @param status
		 * @return "forward:/cop/deleteCustomerAdmin"
		 * @exception Exception
		 */
		 @RequestMapping(value = "/sas/admin/insertSalesAdmin")
		 public String SalesAdminInsert(@ModelAttribute("searchVO") SalesAdminSearchVO searchVO, SalesAdminInfoVO salesAdminInfoVO, BindingResult bindingResult, Model model, SessionStatus status) throws Exception {
				
				// Server-Side Validation
				beanValidator.validate(salesAdminInfoVO, bindingResult);
						
				if (bindingResult.hasErrors()) {
				
					//model.addAttribute("projectReportVO", projectReportVO);
					
					//return "/common/error";
				}
				
				System.out.println("##############################################################");
				System.out.println(salesAdminInfoVO);
				System.out.println("##############################################################");
				
				loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
				
				int login_id       =  loginVO.getUser_id();
				
				String division_cd ="";
				String sales_user ="";
				String sales_divide_cd ="";
				String issue_yn ="";
				String sales_status_cd ="";
				String year ="";
				String month ="";
				String sales_type_cd ="";
				String company_id ="";
				String brand_cd ="";
				String module ="";
				String qty ="";
				String contract_price ="";
				String profit_price ="";
				String report_item ="";	
				String contract_ym ="";
								
				for (int cnt = 0; cnt < salesAdminInfoVO.getIn_division_cd().length; cnt++) {
					
					division_cd = salesAdminInfoVO.getIn_division_cd()[cnt];
					sales_user = salesAdminInfoVO.getIn_user_name()[cnt];
					sales_divide_cd = salesAdminInfoVO.getIn_sales_divide_cd()[cnt];
					issue_yn = salesAdminInfoVO.getIn_issue_yn()[cnt];
					sales_status_cd = salesAdminInfoVO.getIn_sales_status_cd()[cnt];
					year = salesAdminInfoVO.getIn_year()[cnt];
					month = salesAdminInfoVO.getIn_month()[cnt];
					sales_type_cd = salesAdminInfoVO.getIn_sales_type_cd()[cnt];
					company_id = salesAdminInfoVO.getIn_company_name()[cnt];
					brand_cd = salesAdminInfoVO.getIn_brand_cd()[cnt];
					module = salesAdminInfoVO.getIn_module()[cnt];
					qty = salesAdminInfoVO.getIn_qty()[cnt];
					contract_price = salesAdminInfoVO.getIn_contract_price()[cnt];
					profit_price = salesAdminInfoVO.getIn_profit_price()[cnt];
					report_item = salesAdminInfoVO.getIn_report_item()[cnt];
					contract_ym = salesAdminInfoVO.getIn_year()[cnt]+salesAdminInfoVO.getIn_month()[cnt];
					
					salesAdminInfoVO.setCreator(login_id);					
					salesAdminInfoVO.setDivision_cd(division_cd);
					salesAdminInfoVO.setSales_user(sales_user);
					salesAdminInfoVO.setSales_divide_cd(sales_divide_cd);
					salesAdminInfoVO.setIssue_yn(issue_yn);
					salesAdminInfoVO.setSales_status_cd(sales_status_cd);
					salesAdminInfoVO.setYear(year);
					salesAdminInfoVO.setMonth(month);
					salesAdminInfoVO.setSales_type_cd(sales_type_cd);
					salesAdminInfoVO.setCompany_id(company_id);
					salesAdminInfoVO.setBrand_cd(brand_cd);
					salesAdminInfoVO.setModule(module);
					salesAdminInfoVO.setQty(qty);
					salesAdminInfoVO.setContract_price(contract_price);
					salesAdminInfoVO.setProfit_price(profit_price);
					salesAdminInfoVO.setReport_item(report_item);
					salesAdminInfoVO.setContract_ym(contract_ym);

					salesAdminService.insertSalesAdmin(salesAdminInfoVO);
					status.setComplete();
				
				}
							
				return "redirect:/sas/admin/salesAdmin";
			}
			
			/**
			 * 고객사를 삭제한다.
			 * @param searchVO - 목록 조회조건 정보가 담긴 VO
			 * @param status
			 * @return "forward:/cop/deleteCustomerAdmin"
			 * @exception Exception
			 */
			@RequestMapping("/sas/admin/deleteSalesAdmin")
			public String SalesAdminDel(@ModelAttribute("searchVO") SalesAdminSearchVO searchVO, SalesAdminInfoVO salesAdminInfoVO, SessionStatus status) throws Exception {			
				
				loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
				
				int login_id       =  loginVO.getUser_id();
				String sales_id = "";
				
				for (int cnt = 0; cnt < searchVO.getSales_id().length; cnt++) {

					sales_id = searchVO.getSales_id()[cnt];
					
					salesAdminInfoVO.setSales_id(sales_id);
					salesAdminInfoVO.setDeleteYn("1");
					salesAdminInfoVO.setModifier(login_id);
					
					salesAdminService.deleteSalesAdmin(salesAdminInfoVO);
					status.setComplete();
				}
				
				return "redirect:/sas/admin/salesAdmin";
			}
}
