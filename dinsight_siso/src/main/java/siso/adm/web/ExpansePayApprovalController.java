/*package siso.adm.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import siso.adm.service.ComMenuVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.EgovPageHndlr;
import siso.cmmn.cmm.service.EgovPageInitService;
import siso.cmmn.util.Globals;
import siso.exp.service.ExpSearchVO;
import siso.exp.service.ExpanseInfoVO;
import siso.exp.service.ExpanseService;
import siso.sample.service.SampleVO;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.rte.fdl.property.EgovPropertyService;

*//**
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
 *//*
@Controller
@SessionAttributes(types = SampleVO.class)
public class ExpansePayApprovalController {

		*//** EgovSampleService *//*
		@Resource(name = "expanseService")
		private ExpanseService expanseService;

		*//** EgovPageInitService *//*
		@Resource(name = "egovPageInitService")
		private EgovPageInitService egovPageInitService;
		
		private static final Logger logger = LoggerFactory.getLogger(ExpansePayApprovalController.class);

		*//**
		 * 글 목록을 조회한다. (pageing)
		 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
		 * @param model
		 * @return "/sample/egovSampleList"
		 * @exception Exception
		 *//*
		@RequestMapping(value = "/adm/expansePayApproval")
		public String expansePayApprovalHtml(HttpServletRequest request, ModelMap model) throws Exception {
			String pageUrl = "/adm/expansePayApproval";

			try {
				ComPageInfoVO comPageInfoVO = (ComPageInfoVO) egovPageInitService.controllPageInfo(request, pageUrl);
				model.addAttribute("menuInfo", comPageInfoVO);
			} catch(Exception ex) {
				ex.printStackTrace();
				return "redirect:" + Globals.MAIN_PAGE;
			} 

	        logger.debug(pageUrl + " 호출 ");

	        return pageUrl;
		}
		


		 @RequestMapping(value = "/adm/selectExpansePayApproval")
		 @ResponseBody
		 public void selectExpansePayApproval(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
			 logger.debug("selectExpanseAdmin 컨트롤러 호출 ");
			 ExpSearchVO expSearchVO = new ExpSearchVO();
			 String str_resData = "";	
			 String str_json_data_name = "GetExpanseData";
			 
			 try
			 {			
				 String expanseYear  =  request.getParameter("expanseYear");
				 String expanseMonth =  request.getParameter("expanseMonth");
				 //int expanseId    =  Integer.parseInt(request.getParameter("expanseId"));
				 int userId       =  333;
				 
				 expSearchVO.setExpanseYear(expanseYear);
				 expSearchVO.setExpanseMonth(expanseMonth);
				 //expSearchVO.setExpanseId(expanseId);
				 expSearchVO.setUserId(userId);
				 expSearchVO.setPageingYn("Y");
				 
				 logger.debug("expanseYear {}", expanseYear);
				 logger.debug("expanseMonth {}", expanseMonth);
				 
				 List<ExpanseInfoVO> expanseList = expanseService.selectExpanseList(expSearchVO);
				 
				 Map<String, Object> map_d = new HashMap<String, Object>();
				 if(!expanseList.isEmpty()) {
					 map_d.put(str_json_data_name, expanseList);
				 } else {
					 map_d.put(str_json_data_name, "No Data");
				 }

		    	 ObjectMapper om = new ObjectMapper();
		    	 str_resData = om.writeValueAsString(map_d);
			 }
			 catch(Exception ex)
			 {
				 System.out.println(this.getClass().toString() + " Exception : " + ex.toString());
				 Map<String, Object> map_d = new HashMap<String, Object>();
		    	 map_d.put(str_json_data_name, "Error : " + ex.toString());
		    	 ObjectMapper om = new ObjectMapper();
		    	 str_resData = om.writeValueAsString(map_d);
			 }
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print(str_resData);
	    	 pw.flush();     
		 }
}
*/