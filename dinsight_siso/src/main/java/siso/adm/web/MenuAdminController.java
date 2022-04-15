package siso.adm.web;

import java.io.PrintWriter;
import java.util.ArrayList;
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
import siso.adm.service.MenuAdminService;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
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
public class MenuAdminController {
	
	/** EgovPageInitService */
	@Autowired
	private MenuAdminService menuAdminService;
	
	/** EgovPageInitService */
	@Autowired
	private SpringPageInitService springPageInitService;
	
	/** EgovMessageSource */
	private SpringMessageSource springMessageSource;	
	private LoginVO loginVO;
	
	
	
	private static final Logger logger = LoggerFactory.getLogger(MenuAdminController.class);

	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/menuAdmin")
	public String menuAdminHtml(HttpServletRequest request, ModelMap model) throws Exception {
		String pageUrl = "/adm/menuAdmin";
		
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
	
	/**
	 * 공통콤보 목록을 조회한다.
	 * @param groupId,groupName - 조회할 콤보 데이터
	 * @param model
	 * @return "CmmnDetailCode"
	 * @exception Exception
	 */
	 @RequestMapping(value = "/adm/selectMenuList") 
	 @ResponseBody
	 public void selectMenuList(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		
		 logger.debug("selectMenuList 컨트롤러 호출 ");
		 ComMenuVO inputVo  = new ComMenuVO();
		 String str_resData = "";	
		 String return_msg  = "";        
		 
		 try
		 {			
			 String menuLevel =  request.getParameter("menu_level");
			 String level1Id  =  request.getParameter("level1_id");
			 String level2Id  =  request.getParameter("level2_id");
			 String level1Name =  request.getParameter("level1_name");
			 
			 if (!SpringStringUtil.isEmpty(menuLevel))
				 inputVo.setMenu_level(Integer.parseInt(menuLevel));			 
			 
			 if (!SpringStringUtil.isEmpty(level1Id)) {
				 inputVo.setLevel1_id (Integer.parseInt(level1Id));
			 }
			 
			 if (!SpringStringUtil.isEmpty(level2Id)) {
				 inputVo.setLevel2_id (Integer.parseInt(level2Id));
			 }
			 
			 inputVo.setMenu_name(level1Name);
			 
			 List<ComMenuVO> resultList = menuAdminService.selectCmmMenuList(inputVo);
			 
			 Map<String, Object> map_d = new HashMap<String, Object>();
			 map_d.put(Globals.AJAX_JSON_DATA_NAME, resultList);
			 map_d.put(Globals.AJAX_JSON_DATA_COUNT, resultList.size());
			 
			 map_d.put(Globals.AJAX_JSON_ERROR_YN,false);
	    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,return_msg);
			 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 catch(Exception ex)
		 {
			 return_msg = ex.toString();
			 
			 System.out.println(this.getClass().toString() + " Exception : " + return_msg);
			 Map<String, Object> map_d = new HashMap<String, Object>();
	    	 map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
	    	 map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
	    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
	    	 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();
	}
	


	 @SuppressWarnings({ "rawtypes", "unchecked" })
	 @RequestMapping(value = "/adm/saveMenuAdmin")
	 @ResponseBody
	 public void saveMenuAdmin(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 logger.debug("saveMenuAdmin 컨트롤러 호출 ");
		 
		 String str_resData = "";	
		 String return_msg  = "";  
		 
		 Map<String, Object> map_d = new HashMap<String, Object>();
		 
		 try
		 {			
			 logger.debug("-----> ");
			 String[] dataModeList      =  (String[]) request.getParameterValues("dataMode");
			 String[] menuIdList        =  (String[]) request.getParameterValues("menu_id");
			 String[] menuNameList      =  (String[]) request.getParameterValues("menu_name");
			 String[] orderSeqList      =  (String[]) request.getParameterValues("order_seq");
			 String[] menuUrlList       =  (String[]) request.getParameterValues("menu_url");
			 String[] menuAuthorityList =  (String[]) request.getParameterValues("menu_authority");
			 String[] menuImgUrlList    =  (String[]) request.getParameterValues("menu_img_url");
			 String menuLevel           =  (String)   request.getParameter("menu_level");
			 String level1Id            =  (String)   request.getParameter("level1_id");
			 String level2Id            =  (String)   request.getParameter("level2_id");
			 
			 logger.debug("dataModeList.size = " + dataModeList.length);
			 
			 Boolean isAuthenticated = SpringUserDetailsHelper.isAuthenticated();
			 
			 if (!isAuthenticated) {
				 return_msg = springMessageSource.getMessage("errors.login");
				 map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
		    	 map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
		    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
		    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,Globals.MAIN_PAGE);
		    	 
			 } else {
				 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();					
				 int userId       =  loginVO.getUser_id();
				 
				 List inputListVo  = new ArrayList();
				 
				 ComMenuVO comMenuVO;
				 
				 for (int i=0;i<dataModeList.length;i++) {

					 comMenuVO       = new ComMenuVO();
					 String dataMode = dataModeList[i];
					 int menuId      = 0;
					 int orderSeq    = 0;
					 
					 if (!SpringStringUtil.isEmpty(menuIdList[i])) {
						 menuId = Integer.parseInt(menuIdList[i]);
					 }
					 
					 if (!SpringStringUtil.isEmpty(orderSeqList[i])) {
						 orderSeq =  Integer.parseInt(orderSeqList[i]);
					 }
					 
					 if (SpringStringUtil.isEmpty(level1Id)) {
						 level1Id = "0";
					 }
					 
					 if (SpringStringUtil.isEmpty(level2Id)) {
						 level2Id = "0";
					 }
					 
					 comMenuVO.setDataMode(dataMode);
					 comMenuVO.setMenu_id(menuId);
					 comMenuVO.setMenu_name(menuNameList[i]);
					 comMenuVO.setOrder_seq(orderSeq);
					 comMenuVO.setMenu_url(menuUrlList[i]);
					 comMenuVO.setMenu_authority(menuAuthorityList[i]);
					 comMenuVO.setMenu_img_url(menuImgUrlList[i]);
					 comMenuVO.setMenu_level(Integer.parseInt(menuLevel));
					 comMenuVO.setLevel1_id(Integer.parseInt(level1Id));
					 comMenuVO.setLevel2_id(Integer.parseInt(level2Id));
					 comMenuVO.setUser_id(userId);
					 
					 inputListVo.add(comMenuVO);
					 
				 }
				 
				 menuAdminService.inputMenuAdmin(inputListVo);
				 
				 return_msg = springMessageSource.getMessage("result.save.ok");
				 
				 map_d.put(Globals.AJAX_JSON_DATA_NAME, "");
				 map_d.put(Globals.AJAX_JSON_DATA_COUNT, "");
				 map_d.put(Globals.AJAX_JSON_ERROR_YN,false);
		    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,return_msg); 
		    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,"");
			 }
			 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 catch(Exception ex)
		 {
             return_msg = ex.toString();
			 
			 System.out.println(this.getClass().toString() + " Exception : " + return_msg);
			 ex.printStackTrace();
			 
			 map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
	    	 map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
	    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
	    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,"");
	    	 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();     
	 }
	 
		 
}
