package siso.cmmn.cmm.web;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.util.SpringStringUtil;
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
public class SpringComboController {

        @Autowired
	    private SpringCmmUseService springCmmUseService;        
        private SpringMessageSource springMessageSource;        
	    
		private static final Logger logger = LoggerFactory.getLogger(SpringComboController.class);

		/**
		 * 공통콤보 목록을 조회한다.
		 * @param groupId,groupName - 조회할 콤보 데이터
		 * @param model
		 * @return "CmmnDetailCode"
		 * @exception Exception
		 */
		 @RequestMapping(value = "/cmmn/selectCmnCodeCombo")
		 @ResponseBody
		 public void selectCmnCodeCombo(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
			
			 logger.debug("selectCmnCodeCombo 컨트롤러 호출 ");
			 ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
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
				 
				 String groupId   = "";
				 String groupName = "";
				 
				 for (int i=0;i<groupIdList.length;i++) {
					 if ("groupId".equals(groupIdList[i])) {
						 groupId   = paramValueList[i];
					 } else if ("groupName".equals(groupIdList[i])) {
						 groupName = paramValueList[i];
					 }
				 }
				 
				 inputVo.setGroup_id(groupId);
				 
				 List<CmmnDetailCode> resultList = springCmmUseService.selectCmnCodeCombo(inputVo);
				 
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
		 
		 /**
			 * 공통콤보 목록을 조회한다.
			 * @param groupId,groupName - 조회할 콤보 데이터
			 * @param model
			 * @return "CmmnDetailCode"
			 * @exception Exception
			 */
			 @RequestMapping(value = "/cmmn/selectCmnMenuCombo") 
			 @ResponseBody
			 public void selectCmnMenuCombo(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
				 
				 logger.debug("selectMenuList 컨트롤러 호출 ");
				 ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
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
					 
					 for (int i=0;i<groupIdList.length;i++) {
						 if ("groupLevel".equals(groupIdList[i])) {
							 groupLevel   = paramValueList[i];
						 } else if ("groupId".equals(groupIdList[i])) {
							 groupId = paramValueList[i];
						 } else if ("groupName".equals(groupIdList[i])) {
							 groupName = paramValueList[i];
						 }
					 }
					 
					 if (!SpringStringUtil.isEmpty(groupLevel)) {
						 inputVo.setGroup_level(Integer.parseInt(groupLevel));
					 }
					 
					 inputVo.setGroup_id(groupId);
					 
					 List<CmmnDetailCode> resultList = springCmmUseService.selectCmnMenuCombo(inputVo);
					 
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
			 
			 /**
				 * 경비 카테고리 콤보 목록을 조회한다.
				 * @param groupLevel,groupId,groupName - 조회할 콤보 데이터
				 * @param model
				 * @return "CmmnDetailCode"
				 * @exception Exception
				 */
				 @RequestMapping(value = "/cmmn/selectCmnExpCategoryCombo") 
				 @ResponseBody
				 public void selectCmnExpCategoryCombo(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
					 
					 logger.debug("selectMenuList 컨트롤러 호출 ");
					 ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
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
						 
						 for (int i=0;i<groupIdList.length;i++) {
							 if ("groupLevel".equals(groupIdList[i])) {
								 groupLevel   = paramValueList[i];
							 } else if ("groupId".equals(groupIdList[i])) {
								 groupId = paramValueList[i];
							 } else if ("groupName".equals(groupIdList[i])) {
								 groupName = paramValueList[i];
							 }
						 }
						 
						 if (!SpringStringUtil.isEmpty(groupLevel)) {
							 inputVo.setGroup_level(Integer.parseInt(groupLevel));
						 }
						 
						 inputVo.setGroup_id(groupId);
						 
						 List<CmmnDetailCode> resultList = springCmmUseService.selectCmnExpCategoryCombo(inputVo);
						 
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
			 
			 
			 
		
}
