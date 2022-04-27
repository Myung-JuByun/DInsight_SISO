package siso.adm.code.web;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import siso.adm.code.service.CodeAdminService;
import siso.adm.code.service.CodeAdminVO;
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
public class CommonCodeAdminAjaxController {
		
	@Autowired
	private CodeAdminService codeAdminService;
	private LoginVO loginVO;		
	 
	@RequestMapping(value = "/adm/code/selectCmnGroupCodeList")
	 @ResponseBody
	 public void selectCmnGroupCodeList(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.getSh_group_name();
			searchVO.getSh_code_name();
			
			try {
				List<CodeAdminVO> codeList = codeAdminService.selectCmnGroupCodeList(searchVO);
				
				for(CodeAdminVO adminVO : codeList) {
					System.out.println(adminVO.getGroup_id() + "/" + adminVO.getCode_id());
				}
				
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(codeList);			    			    
			    
				model.addAttribute("codeList", codeList);
				
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();     
	 }
	
	 @RequestMapping(value = "/adm/code/selectCmnCodeList")
	 @ResponseBody
	 public void selectCmnCodeList(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";			
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.getSh_group_name();
			searchVO.getSh_code_name();
			
			try {
				List<CodeAdminVO> codeList = codeAdminService.selectCmnCodeList(searchVO);
				
				for(CodeAdminVO adminVO : codeList) {
					System.out.println(adminVO.getGroup_id() + "/" + adminVO.getCode_id());
				}
				
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(codeList);
			    
				model.addAttribute("codeList", codeList);
				
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();     
	 }
	 
	 @RequestMapping(value = "/adm/code/selectCmnGrpCodeList")
	 @ResponseBody
	 public void selectCmnGrpCodeList(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			String str_resData = "";			
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.getSh_group_name();
			searchVO.getSh_code_name();
			
			try {
				Map<String, List<CodeAdminVO>> resultMap = new HashMap<String, List<CodeAdminVO>>();
				List<CodeAdminVO> groupList = codeAdminService.selectCmnGroupCodeList(searchVO);
				List<CodeAdminVO> codeList = codeAdminService.selectCmnCodeList(searchVO);
				
				resultMap.put("groupList", groupList);
				resultMap.put("codeList", codeList);
				
				for(CodeAdminVO groupVo : groupList) {
					System.out.println(groupVo.getGroup_id() + "/" + groupVo.getCode_id());
				}
								
				ObjectMapper om = new ObjectMapper();
			    str_resData = om.writeValueAsString(resultMap);			    			    
			    
				model.addAttribute("codeList", codeList);
				
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print(str_resData);
    	 pw.flush();     
	 }
	 
	 @RequestMapping(value = "/adm/code/saveCmnGroupCode")
	 @ResponseBody
	 public void saveCmnGroupCode(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model 
			 ,HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			List<CodeAdminVO> listvo = new ArrayList<CodeAdminVO>();
			
			String[] group_id = searchVO.getIn_group_id();
			String[] group_name = searchVO.getIn_group_name();
			String[] etc_explain = searchVO.getIn_etc_explain();
			String[] delete_yn = searchVO.getIn_delete_yn();
			
			if(group_id != null){
				for(int i=0 ; i<group_id.length ; i++){
					CodeAdminVO codeadminvo = new CodeAdminVO();
					if(group_id != null) codeadminvo.setGroup_id(group_id[i]);
					if(group_name != null) codeadminvo.setGroup_name(group_name[i]);
					if(etc_explain != null) codeadminvo.setEtc_explain(etc_explain[i]);
					if(delete_yn != null) codeadminvo.setDelete_yn(delete_yn[i]);
					
					codeadminvo.setCreator(login_id);
					codeadminvo.setModifier(login_id);
					listvo.add(codeadminvo);
				}
				
				try{
					codeAdminService.saveCmnGroupCode(listvo);
				}catch(Exception ex) {
					ex.printStackTrace();
				}
			}
			
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print("success");
	    	 pw.flush();     
	 }
	 
	 @RequestMapping(value = "/adm/code/deleteCmnGroupCode")
	 @ResponseBody
	 public void deleteCmnGroupCode(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		 int login_id       =  loginVO.getUser_id();
			
			searchVO.setModifier(login_id);
			
			CodeAdminVO codeadminvo = new CodeAdminVO();
			codeadminvo.setGroup_id(searchVO.getGroup_id());
			codeadminvo.setModifier(login_id);
			
			try {
				codeAdminService.deleteCmnGroupCode(codeadminvo);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print("success");
    	 pw.flush();    
	 }
	 
	 @RequestMapping(value = "/adm/code/saveCmnCode")
	 @ResponseBody
	 public void saveCmnCode(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		 int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			List<CodeAdminVO> listvo = new ArrayList<CodeAdminVO>();
			
			String[] group_id = searchVO.getIn_group_id();
			String[] code_id = searchVO.getIn_group_id();
			String[] code_name = searchVO.getIn_group_name();
			String[] etc1 = searchVO.getIn_etc1();
			String[] etc2 = searchVO.getIn_etc2();
			String[] etc3 = searchVO.getIn_etc3();
			String[] etc4 = searchVO.getIn_etc4();
			String[] delete_yn = searchVO.getIn_delete_yn();
			
			if(group_id != null){
				for(int i=0 ; i<group_id.length ; i++){
					CodeAdminVO codeadminvo = new CodeAdminVO();
					if(group_id != null) codeadminvo.setGroup_id(group_id[i]);
					if(code_id != null) codeadminvo.setGroup_id(code_id[i]);
					if(code_name != null) codeadminvo.setGroup_name(code_name[i]);
					if(etc1 != null) codeadminvo.setEtc_explain(etc1[i]);
					if(etc2 != null) codeadminvo.setEtc_explain(etc2[i]);
					if(etc3 != null) codeadminvo.setEtc_explain(etc3[i]);
					if(etc4 != null) codeadminvo.setEtc_explain(etc4[i]);
					if(delete_yn != null) codeadminvo.setDelete_yn(delete_yn[i]);
					
					codeadminvo.setCreator(login_id);
					codeadminvo.setModifier(login_id);
					listvo.add(codeadminvo);
				}
				
				try {
					codeAdminService.saveCmnCode(listvo);
				} catch(Exception ex) {
					ex.printStackTrace();
				} 
			 }
			
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print("success");
	    	 pw.flush();      
	 }
	 
	 @RequestMapping(value = "/adm/code/deleteCmnCode")
	 @ResponseBody
	 public void deleteCmnCode(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		 int login_id       =  loginVO.getUser_id();
			
			searchVO.setModifier(login_id);
			
			CodeAdminVO codeadminvo = new CodeAdminVO();
			codeadminvo.setGroup_id(searchVO.getGroup_id());
			codeadminvo.setCode_id(searchVO.getCode_id());
			codeadminvo.setModifier(login_id);
			
			try {
				codeAdminService.deleteCmnCode(codeadminvo);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 

		 response.setContentType("text/html; charset=utf-8");
    	 PrintWriter pw = response.getWriter();
    	 pw.print("success");
    	 pw.flush();    
	 }
	 
	 @RequestMapping(value = "/adm/code/saveCmnGroupCodeOne")
	 @ResponseBody
	 public void saveCmnGroupCodeOne(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model 
			 ,HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
				
			try{
				codeAdminService.saveCmnGroupCode(searchVO);
			}catch(Exception ex) {
				ex.printStackTrace();
			}
			
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print("success");
	    	 pw.flush();     
	 }
	 
	 @RequestMapping(value = "/adm/code/saveCmnCodeOne")
	 @ResponseBody
	 public void saveCmnCodeOne(@ModelAttribute("searchVO") CodeAdminVO searchVO, Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		 loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		 int login_id       =  loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setModifier(login_id);
			
			try {
				codeAdminService.saveCmnCode(searchVO);
			} catch(Exception ex) {
				ex.printStackTrace();
			} 
			
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print("success");
	    	 pw.flush();      
	 }
}
