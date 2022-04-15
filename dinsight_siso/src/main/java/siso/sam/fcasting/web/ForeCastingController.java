package siso.sam.fcasting.web;

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
import siso.cmmn.ComDefaultVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.sam.fcasting.service.ForeCastingService;
import siso.sam.fcasting.service.ForeCastingVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
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
public class ForeCastingController{
	
	/** forecastingService */
	@Autowired
	private ForeCastingService forecastingservice;
	
	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;

	@Autowired
	protected SpringCmmUseService springCmmUseService;
	
	@Autowired
	private SpringPageInitService springPageInitService;
	
	private LoginVO loginVO;
	
	@RequestMapping(value = "/sam/fcasting/foreCasting")
	public String commonCodeHtml(HttpServletRequest request, ModelMap model) throws Exception {
		String pageUrl = "/sam/fcasting/foreCasting";

		try {
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		} 

	    return pageUrl;
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingListAjax")
	@ResponseBody
	public void foreCastingListAjax(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";
			Map<String, Object>	 resultMap = new HashMap<String, Object>();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
			
			/** NEW/ALC */
			inputVo.setGroup_id("114");
			List<CmmnDetailCode> salesdividelist = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			/** 영엉상태 */
			inputVo.setGroup_id("115");
			List<CmmnDetailCode> salesstatuslist = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			/** 영업유형 */
			inputVo.setGroup_id("116");
			List<CmmnDetailCode> salestypelist = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			/** 브래드 */
			inputVo.setGroup_id("117");
			List<CmmnDetailCode> brandlist = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			try{
				List<ForeCastingVO> resultlist = forecastingservice.selectForeCastingList(searchVO);
				
				resultMap.put("salesdividelist"	, salesdividelist);
				resultMap.put("salesstatuslist"	, salesstatuslist);
				resultMap.put("salestypelist"	, salestypelist);
				resultMap.put("brandlist"		, brandlist);
				resultMap.put("saleslist"		, resultlist);
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(resultMap);
				
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
	
			 response.setContentType("text/html; charset=utf-8");
			 PrintWriter pw = response.getWriter();
			 pw.print(str_resData);
			 pw.flush();     
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingListAjax2")
	@ResponseBody
	public void foreCastingListAjax2(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";
			Map<String, Object>	 resultMap = new HashMap<String, Object>();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			
			//ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
			
			try{
				List<ForeCastingVO> resultlist = forecastingservice.selectForeCastingList(searchVO);
				
				resultMap.put("saleslist"		, resultlist);
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(resultMap);
				
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
	
			 response.setContentType("text/html; charset=utf-8");
			 PrintWriter pw = response.getWriter();
			 pw.print(str_resData);
			 pw.flush();     
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingListCopyAjax")
	@ResponseBody
	public void foreCastingListCopy(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			String grant_id			=	loginVO.getGrant_id();
			
			//searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			try{
				String[] Sales_project_id = searchVO.getIn_sales_project_id();
				
				if(Sales_project_id != null && Sales_project_id.length > 0){
					String copy_sales_ym = searchVO.getCopy_sales_ym();
					copy_sales_ym = copy_sales_ym.trim();
					copy_sales_ym = copy_sales_ym.replace("년", "");
					copy_sales_ym = copy_sales_ym.replace("월", "");
					copy_sales_ym = copy_sales_ym.replace("주", "");
					copy_sales_ym = copy_sales_ym.replace(" ", "");
					String copy_sales_yy = copy_sales_ym.substring(0, 6);
					String copy_sales_yw = copy_sales_ym.substring(6, 7);
					
					for(int i=0 ; i<Sales_project_id.length ; i++){
						String in_issue_yn = searchVO.getIn_issue_yn()[i];
						String in_contract_price = searchVO.getIn_contract_price()[i];
						String in_cost_price = searchVO.getIn_cost_price()[i];
						String in_profit_price = searchVO.getIn_profit_price()[i];
						String in_contract_ym = searchVO.getIn_contract_ym()[i];
						
						if("O".equals(in_issue_yn)){
							in_issue_yn = "1";
						} 
						else{
							in_issue_yn = "0";
						}
						
						in_contract_price = in_contract_price.replaceAll(",", "");
						in_cost_price = in_cost_price.replaceAll(",", "");
						in_profit_price = in_profit_price.replaceAll(",", "");
						in_contract_ym = in_contract_ym.replace(".", "");
						in_contract_ym = in_contract_ym.replace(".", "");
						
						searchVO.setSales_id(null);
						searchVO.setSales_project_id(searchVO.getIn_sales_project_id()[i]);
						searchVO.setSales_ym(copy_sales_yy);
						searchVO.setSales_week(copy_sales_yw);
						//searchVO.setSales_divide_cd(searchVO.getIn_sales_divide_cd()[i]);
						searchVO.setIssue_yn(in_issue_yn);
						searchVO.setReport_item(searchVO.getIn_report_item()[i]);
						searchVO.setQty(searchVO.getIn_qty()[i]);
						searchVO.setContract_ym(in_contract_ym);
						searchVO.setSales_status_cd(searchVO.getIn_sales_status_cd()[i]);
						searchVO.setSales_type_cd(searchVO.getIn_sales_type_cd()[i]);
						searchVO.setContract_price(in_contract_price);
						searchVO.setCost_price(in_cost_price);
						searchVO.setProfit_price(in_profit_price);
						if(grant_id.indexOf("7") >= 0) {
							searchVO.setCreator(Integer.parseInt(searchVO.getIn_user_id()[i]));
						} else {
							searchVO.setCreator(login_id);
						}
						
						forecastingservice.foreCastingSave(searchVO);
					}
				}
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
			
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("success");
			pw.flush();
			      
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingSaveAjax")
	@ResponseBody
	public void foreCastingSave(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			String grant_id			=	loginVO.getGrant_id();
			
			//searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			
			try{
				String[] Sales_project_id = searchVO.getIn_sales_project_id();
				
				List<ProjectCodeVO> inputListVO = new ArrayList<ProjectCodeVO>();
				
				for(int i=0 ; i<Sales_project_id.length ; i++){
					
					ProjectCodeVO projectCodeVO = new ProjectCodeVO();
					
					String in_issue_yn = searchVO.getIn_issue_yn()[i];
					String in_contract_price = searchVO.getIn_contract_price()[i];
					String in_cost_price = searchVO.getIn_cost_price()[i];
					String in_profit_price = searchVO.getIn_profit_price()[i];
					String in_contract_ym = searchVO.getIn_contract_ym()[i];
					String sales_ym = searchVO.getIn_sales_yy()[i] + searchVO.getIn_sales_mm()[i];
					
					if("O".equals(in_issue_yn)){
						in_issue_yn = "1";
					} 
					else{
						in_issue_yn = "0";
					}
					
					in_contract_price = in_contract_price.replaceAll(",", "");
					in_cost_price = in_cost_price.replaceAll(",", "");
					in_profit_price = in_profit_price.replaceAll(",", "");
					in_contract_ym = in_contract_ym.replace(".", "");
					in_contract_ym = in_contract_ym.replace(".", "");
					
					if("".equals(searchVO.getIn_sales_id()[i])){
						searchVO.setSales_id(null);
					}else{
						searchVO.setSales_id(searchVO.getIn_sales_id()[i]);
					}
					searchVO.setSales_project_id(searchVO.getIn_sales_project_id()[i]);
					searchVO.setSales_ym(sales_ym);
					searchVO.setSales_week(searchVO.getIn_sales_week()[i]);
					//searchVO.setSales_divide_cd(searchVO.getIn_sales_divide_cd()[i]);
					searchVO.setIssue_yn(in_issue_yn);
					searchVO.setReport_item(searchVO.getIn_report_item()[i]);
					searchVO.setQty(searchVO.getIn_qty()[i]);
					searchVO.setContract_ym(in_contract_ym);
					searchVO.setSales_status_cd(searchVO.getIn_sales_status_cd()[i]);
					searchVO.setSales_type_cd(searchVO.getIn_sales_type_cd()[i]);
					searchVO.setContract_price(in_contract_price);
					searchVO.setCost_price(in_cost_price);
					searchVO.setProfit_price(in_profit_price);
					if(grant_id.indexOf("7") >= 0) {
						searchVO.setCreator(Integer.parseInt(searchVO.getIn_user_id()[i]));
					} else {
						searchVO.setCreator(login_id);
					}
					
					forecastingservice.foreCastingSave(searchVO);
					
					//영업현황이 won 이면 성공 전환
					if(searchVO.getIn_sales_status_cd()[i].equals("01")){
						projectCodeVO.setSales_status_cd(searchVO.getIn_sales_status_cd()[i]);
						projectCodeVO.setSales_project_id(searchVO.getIn_sales_project_id()[i]);
						projectCodeVO.setModifier(login_id);
						
						inputListVO.add(projectCodeVO);
					}
				}
				
				//성공 전환
				projectCodeService.projectCodeSuccess(inputListVO);
				
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
			
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("success");
			pw.flush();
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingListDeleteAjax")
	@ResponseBody
	public void foreCastingListDelete(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		
		try{
			if(searchVO.getIn_sales_id() != null){
				String[] Sales_project_id = searchVO.getIn_sales_project_id();
				
				for(int i=0 ; i<Sales_project_id.length ; i++){
					searchVO.setSales_id(searchVO.getIn_sales_id()[i]);
					forecastingservice.foreCastingListDelete(searchVO);
				}
			}
		}catch(Exception ex){
			ex.printStackTrace();
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("fail");
			pw.flush();
		} 
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();
	}
	
	@RequestMapping(value = "/sam/fcasting/selectForeCastingIssueAjax")
	@ResponseBody
	public void selectForeCastingIssue(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";
			Map<String, Object>	 resultMap = new HashMap<String, Object>();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			
			try{
				List<ForeCastingVO> resultlist = forecastingservice.selectForeCastingIssue(searchVO);
				resultMap.put("report_item_list"	, resultlist);
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(resultMap);
				
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
	
			 response.setContentType("text/html; charset=utf-8");
			 PrintWriter pw = response.getWriter();
			 pw.print(str_resData);
			 pw.flush();     
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingIssueSaveAjax")
	@ResponseBody
	public void foreCastingIssueSave(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		
		try{
			if(searchVO.getSales_id() != null){
				forecastingservice.foreCastingIssueSave(searchVO);
			}
		}catch(Exception ex){
			ex.printStackTrace();
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("fail");
			pw.flush();
		} 
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();
	}
	
	@RequestMapping(value = "/sam/fcasting/foreCastingIssueDeleteAjax")
	@ResponseBody
	public void foreCastingIssueDelete(@ModelAttribute("searchVO") ForeCastingVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response
									, ModelMap model) throws Exception {
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		
		try{
			if(searchVO.getSales_id() != null){
				forecastingservice.foreCastingIssueDelete(searchVO);
			}
		}catch(Exception ex){
			ex.printStackTrace();
			response.setContentType("text/html; charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.print("fail");
			pw.flush();
		} 
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();
	}
	
	@RequestMapping(value = "/sam/fcasting/selectWeekDateAjax")
	@ResponseBody
	public void selectWeekDate(@ModelAttribute("searchVO") ComDefaultVO searchVO
									,HttpServletRequest request
									,HttpServletResponse response) throws Exception {
			String str_resData = "";
			Map<String, Object>	 resultMap = new HashMap<String, Object>();
			
			try{
				ComDefaultVO weekDate = springCmmUseService.selectWeekDate(searchVO);
				resultMap.put("weekDate", weekDate);
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(resultMap);
				
			}catch(Exception ex){
				ex.printStackTrace();
				response.setContentType("text/html; charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.print("fail");
				pw.flush();
			} 
	
			 response.setContentType("text/html; charset=utf-8");
			 PrintWriter pw = response.getWriter();
			 pw.print(str_resData);
			 pw.flush();     
	}
}
