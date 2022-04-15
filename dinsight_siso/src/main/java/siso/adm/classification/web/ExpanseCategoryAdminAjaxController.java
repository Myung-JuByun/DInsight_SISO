package siso.adm.classification.web;

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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.adm.classification.service.ExpanseCategoryAdminService;
import siso.adm.classification.service.ExpanseCategoryAdminVO;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
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
public class ExpanseCategoryAdminAjaxController {
		/** EgovSampleService */
	@Autowired
	private ExpanseCategoryAdminService expansecategoryadminservice;
	
	private SpringMessageSource springMessageSource;	
	private LoginVO loginVO;
	private static final Logger logger = LoggerFactory.getLogger(ExpanseCategoryAdminAjaxController.class);

	 
	@RequestMapping(value = "/adm/category/selectExpanseCategory")
	 @ResponseBody
	 public void selectExpanseCategory(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		logger.debug("selectMenuList 컨트롤러 호출 ");
			ExpanseCategoryAdminVO inputVo = new ExpanseCategoryAdminVO();
		 String str_resData = "";	
		 String str_json_data_name       = "GetResultData";
		 String str_json_data_count_name = "GetResultDataCnt";
		 String str_json_error_yn        = "GetResultErrorYn";
		 String str_json_return_msg      = "GetResultMsg";
		 String return_msg               = "";        
		 try
		 {			
			 String[] groupIdList    =  request.getParameterValues("paramId[]");
			 String[] paramValueList  =  request.getParameterValues("paramValue[]");
			 
			 String groupLevel = "";
			 String groupId   = "";
			 String groupName = "";
			 
			 if(groupIdList != null){
				 for (int i=0;i<groupIdList.length;i++) {
					 if ("groupLevel".equals(groupIdList[i])) {
						 groupLevel   = paramValueList[i];
					 } else if ("groupId".equals(groupIdList[i])) {
						 groupId = paramValueList[i];
					 } else if ("groupName".equals(groupIdList[i])) {
						 groupName = paramValueList[i];
					 }
				 }
			 }
			 
			 if (!SpringStringUtil.isEmpty(groupLevel)) {
				 inputVo.setGroup_level(Integer.parseInt(groupLevel));
			 }
			 
			 inputVo.setGroup_id(groupId);
			 
			 List<ExpanseCategoryAdminVO> resultList = expansecategoryadminservice.selectCategoryAdminList(inputVo);
			 
			 //System.out.println("size resultList Size : "  + resultList.size());
			 
			 /*for(ExpanseCategoryAdminVO list : resultList){
				 System.out.println("reesultCodeId : " + list.getCodeId());
				 System.out.println("reesultCodeName : " + list.getCodeName());
				 System.out.println("reesultGroupLevel : " + list.getGroupLevel());
				 System.out.println("reesultGroupName : " + list.getGroupName());
			 }*/
			 Map<String, Object> map_d = new HashMap<String, Object>();
			 if(!resultList.isEmpty()) {
				 map_d.put(str_json_data_name, resultList);
				 map_d.put(str_json_data_count_name, resultList.size());
				 
				 map_d.put(str_json_error_yn,false);
		    	 map_d.put(str_json_return_msg,return_msg);
			 } else {
				 map_d.put(str_json_data_count_name, 0);
				 map_d.put(str_json_data_name, "No Data");
				 
				 map_d.put(str_json_error_yn,false);
				 
				 String[] msg_param = new String[1];
				 msg_param[0] = groupName;
				 
				 return_msg = springMessageSource.getMessage("result.combo.noData", msg_param , null);
				 
		    	 map_d.put(str_json_return_msg,"Error : " + return_msg);
			 }
			 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 catch(Exception ex)
		 {
			 return_msg = ex.toString();
			 
			 System.out.println(this.getClass().toString() + " Exception : " + return_msg);
			 Map<String, Object> map_d = new HashMap<String, Object>();
	    	 map_d.put(str_json_data_name, "Error : " + return_msg);
	    	 map_d.put(str_json_error_yn,true);
	    	 map_d.put(str_json_return_msg,"Error : " + return_msg);
	    	 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();
	 }
	
	@RequestMapping(value = "/adm/category/saveExpanseCategory")
	 @ResponseBody
	 public void saveCmnCode(@ModelAttribute("searchVO") ExpanseCategoryAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			String categoriId = searchVO.getCategory_id();
			
			if("".equals(categoriId)){
				searchVO.setCategory_id(null);
			}
			
			try {
				expansecategoryadminservice.saveExpanseCategory(searchVO);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 
			
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print("success");
	    	 pw.flush();      
	 }
	 
	 @RequestMapping(value = "/adm/category/deleteExpanseCategory")
	 @ResponseBody
	 public void deleteCmnCode(@ModelAttribute("searchVO") ExpanseCategoryAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 	loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setModifier(login_id);
			
			try {
				expansecategoryadminservice.deleteExpanseCategory(searchVO);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print("success");
    	 pw.flush();    
	 }
	 
	 @RequestMapping(value = "/adm/category/selectAccountComboList")
	 @ResponseBody
	 public void selectAccountComboListdeleteCmnCode(@ModelAttribute("searchVO") ExpanseCategoryAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 	loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			String str_resData = "";
			
			searchVO.setCreator(login_id);
			
			ExpanseCategoryAdminVO expansecategoryadminvo = new ExpanseCategoryAdminVO();
			
			try {
				List<ExpanseCategoryAdminVO> codeList = expansecategoryadminservice.selectAccountComboList(expansecategoryadminvo);
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(codeList);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();    
	 }
		 
}
