package siso.cmmn.cmm.web;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.adm.service.ComMenuVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringProperties;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.PropertiesVO;

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
public class SpringPageInitController {

        /** EgovPageInitService */
    	@Autowired
		private SpringPageInitService springPageInitService;
		
		private static final Logger logger = LoggerFactory.getLogger(SpringPageInitController.class);

		/**
		 * 화면관련 권한 및 정보을 조회한다.
		 * @param 
		 * @param HttpServletRequest request
		 * @return 
		 * @exception Exception
		 */
		 @RequestMapping(value = "/cmmn/selectPageInfo")
		 @ResponseBody
		 public void selectPageInfo(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
            logger.debug(this.getClass().getName() + ".selectPageInfo 컨트롤러 호출 ");
            logger.debug("request.getPathInfo()" + request.getPathInfo());
            String[] groupIdList        =  request.getParameterValues("paramId[]"   );
			String[] paramValueList     =  request.getParameterValues("paramValue[]");
			String menuId               = "0";
			String menuUrl              = "";
			ComMenuVO inputVO           = new ComMenuVO();
			
			//화면관련 파라미터 설정
			for (int i=0;i<groupIdList.length;i++) {
			   if ("menu_id".equals(groupIdList[i])) {
			      menuId = paramValueList[i];
			   } else if ("menu_url".equals(groupIdList[i])) {
			      menuUrl = paramValueList[i];
			   }
			}
				 
			if (!SpringStringUtil.isEmpty(menuId))
			   inputVO.setMenu_id(Integer.parseInt(menuId));			
				
			inputVO.setMenu_url(menuUrl);
			 
			 String str_resData              = "";	
			 String str_json_data_name       = "GetResultData";
			 String str_json_data_count_name = "GetResultDataCnt";
			 String str_json_error_yn        = "GetResultErrorYn";
			 String str_json_return_msg      = "GetResultMsg";
			 String return_msg               = "";        
			 try
			 {			
				 
				 ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.pageInfo(inputVO);

				 Map<String, Object> map_d = new HashMap<String, Object>();
				 
				 map_d.put(str_json_data_name, comPageInfoVO);
				 map_d.put(str_json_data_count_name, 1);
				 
				 map_d.put(str_json_error_yn,comPageInfoVO.getError_yn());
		    	 map_d.put(str_json_return_msg,comPageInfoVO.getError_message());
				 
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
		 
		@RequestMapping(value = "/properties/{propertiesName}")
		@ResponseBody
		public void getProperties(@PathVariable String propertiesName, HttpServletResponse response) throws IOException {
			String str_resData              = "";	
			String str_json_data_name       = "GetResultData";
			String str_json_data_count_name = "GetResultDataCnt";
			String str_json_error_yn        = "GetResultErrorYn";
			String str_json_return_msg      = "GetResultMsg";
			String return_msg               = "";      
			
			try
			 {			
				 
				String pageUrl = SpringProperties.RELATIVE_PATH_PREFIX + "message" + System.getProperty("file.separator") + propertiesName + ".properties";
	            List<PropertiesVO> keyList = SpringProperties.loadPropertyFileVO(pageUrl);
				
	            Map<String, Object> map_d = new HashMap<String, Object>();
				 map_d.put(str_json_data_name, keyList);
				 map_d.put(str_json_data_count_name, keyList.size());
				 
				 map_d.put(str_json_error_yn,false);
		    	 map_d.put(str_json_return_msg,"");
				 
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
