package siso.exp.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.adm.service.ComMenuVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.Globals;
import siso.exp.service.ExpSearchVO;
import siso.exp.service.ExpanseInfoVO;
import siso.exp.service.ExpanseService;

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
public class ExpansePartYearStatusController {

		/** EgovSampleService */
		@Autowired
		private ExpanseService expanseService;

		@Autowired
		protected SpringPageInitService springPageInitService;
		
		private static final Logger logger = LoggerFactory.getLogger(ExpansePartYearStatusController.class);

		/**
		 * 글 목록을 조회한다. (pageing)
		 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
		 * @param model
		 * @return "/sample/egovSampleList"
		 * @exception Exception
		 */
		@RequestMapping(value = "/exp/expansePartYearStatus")
		public String selectExpanseHtml(HttpServletRequest request, ModelMap model) throws Exception {
			String pageUrl = "/exp/expansePartYearStatus";

			ComMenuVO inputVO           = new ComMenuVO();			
			inputVO.setMenu_url(pageUrl);
			
			try {
				ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
				model.addAttribute("menuInfo", comPageInfoVO);
			} catch(Exception ex) {
				ex.printStackTrace();
				return "redirect:" + Globals.MAIN_PAGE;
			}

	        logger.debug(pageUrl + " 호출 ");

	        return pageUrl;
		}
		


		 @RequestMapping(value = "/exp/selectExpansePartYearStatus")
		 @ResponseBody
		 public void selectExpansePartYearStatus(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
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
				 
				 expSearchVO.setExpanse_year(expanseYear);
				 expSearchVO.setExpanse_month(expanseMonth);
				 //expSearchVO.setExpanseId(expanseId);
				 expSearchVO.setUser_id(userId);
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
