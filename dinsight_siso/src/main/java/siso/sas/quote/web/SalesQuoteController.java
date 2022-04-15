package siso.sas.quote.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringFileMngUtil;
import siso.cmmn.util.SpringProperties;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
import siso.sas.quote.service.SalesQuoteSearchVO;
import siso.sas.quote.service.SalesQuoteService;
import siso.sas.quote.service.SalesQuoteVO;
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
public class SalesQuoteController {

	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;
	
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected SpringCmmUseService springCmmUseService;
	
	@Autowired
	protected SalesQuoteService salesquoteservice;
	
	@Autowired
	private SpringFileMngUtil fileUtil;
	
	private LoginVO loginVO;
	
	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/usr/selectUserList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/quote/quoteAdmin")
	public String selectAdminList(@ModelAttribute("searchVO") SalesQuoteSearchVO searchVO
			, ModelMap model
			, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sas/quote/quoteAdmin";
		
		/** 좌측, 우측 메뉴정보 */
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		return pageUrl;
	}
	
	@RequestMapping(value = "/sas/quote/quoteAdminListAjax")
	@ResponseBody
	public void quoteAdminListAjax(@ModelAttribute("searchVO") SalesQuoteSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response) throws Exception {

		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		String chk_grant=loginVO.getGrant_id();
		
		try {
			ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
			ProjectCodeVO projectcodevo = new ProjectCodeVO();
			
			//자신이 속한 상위부서 전체 또는 자신이 관리하는 모든 하위부서 전체
			if(chk_grant.indexOf("2") < 0){
				List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);			
				searchVO.setDivision_child_list(divisionChild);
				projectcodevo.setDivision_child_list(divisionChild);
			}

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
			List<ProjectCodeVO> divisionUsers = projectCodeService.projectDivisionUserList(projectcodevo);
			
			//담당부서
			List<ProjectCodeVO> division = projectCodeService.projectDivisionList(projectcodevo);
			
			//계약서 조회
			List<SalesQuoteVO> salesQuoteList = salesquoteservice.selectSalesQuoteSearchList(searchVO);
			
			map.put("salesQuoteList", salesQuoteList);
			map.put("salesTypeList", salesTypeList);
			map.put("brandList", brandList);
			map.put("salesStatusList", salesStatusList);
			map.put("divisionUsers", divisionUsers);
			map.put("division", division);
			
			ObjectMapper om = new ObjectMapper();
			str_resData = om.writeValueAsString(map);

		} catch (Exception ex) {
			str_resData = ex.toString();
		}
		
	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	@RequestMapping(value = "/sas/quote/quoteAdminRivisionListAjax")
	@ResponseBody
	public void quoteAdminRivisionListAjax(@ModelAttribute("searchVO") SalesQuoteSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response) throws Exception {

		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			//프로젝트 멤버 조회
			List<SalesQuoteVO> salesQuoteRivisionList = salesquoteservice.selectSalesQuoteRivisionList(searchVO);
			
			map.put("salesQuoteRivisionList", salesQuoteRivisionList);
			
			ObjectMapper om = new ObjectMapper();
			str_resData = om.writeValueAsString(map);

		} catch (Exception ex) {
			str_resData = ex.toString();
		}

	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/sas/quote/saveSalesQuoteAjax")
	@ResponseBody
	public void saveSalesQuoteAjax(@ModelAttribute("searchVO") SalesQuoteSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		SalesQuoteVO salesquotevo = new SalesQuoteVO();  
		salesquotevo = salesquoteservice.selectCountSalesQuote(searchVO);
		String project_code_count = salesquotevo.getProject_code_count(); 
		String project_code_yn = "N";
		int project_count = Integer.parseInt(project_code_count); 
		if(project_count > 0) project_code_yn = "Y";
		map.put("project_code_yn", project_code_yn);
		
		//파일 업로드
	    MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest)request;
	    
	    Map<String, MultipartFile> files = mptRequest.getFileMap();
	    Iterator<Entry<String, MultipartFile>> fileIter = files.entrySet().iterator();
	    
	    while (fileIter.hasNext()) {
            Entry<String, MultipartFile> entry = fileIter.next();
            MultipartFile mFile = entry.getValue();

		    if (mFile.getSize() > 0) {
		    	HashMap _map = fileUtil.uploadFile(mFile, "quote");
			    //아래 코드 대신에 데이터베이스에 저장하기 위해서 Map에 담는 코드를 넣으면 된다.
		    	System.out.println("[ "+Globals.FILE_PATH+" : "+_map.get(Globals.FILE_PATH)+" ]");
				System.out.println("[ "+Globals.FILE_SIZE+" : "+_map.get(Globals.FILE_SIZE)+" ]");
				System.out.println("[ "+Globals.ORIGIN_FILE_NM+" : "+_map.get(Globals.ORIGIN_FILE_NM)+" ]");
				System.out.println("[ "+Globals.UPLOAD_FILE_NM+" : "+_map.get(Globals.UPLOAD_FILE_NM)+" ]");
				System.out.println("[ "+Globals.FILE_EXT+" : "+_map.get(Globals.FILE_EXT)+" ]");
				searchVO.setIn_quote_file_id((String)_map.get(Globals.UPLOAD_FILE_NM));
				searchVO.setIn_quote_file_path((String)_map.get(Globals.FILE_PATH));
				searchVO.setIn_quote_file_name((String)_map.get(Globals.ORIGIN_FILE_NM));					    
		    }
	    }
	    
	    try {
			salesquoteservice.saveSalesQuote(searchVO);
		} catch (Exception ex) {
			str_resData = ex.toString();
			pw.print("fail");
			pw.flush();
		}
		map.put("status", "success");
		ObjectMapper om = new ObjectMapper();
		str_resData = om.writeValueAsString(map);
		
		pw.print(str_resData);
		pw.flush();
	}
	
	@RequestMapping(value = "/sas/quote/quoteDownloadAjax")
	@ResponseBody
	public void quoteDownloadAjax(@ModelAttribute("searchVO") SalesQuoteSearchVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 
		response.setContentType("text/html; charset=utf-8");
		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		try {
			
			//프로젝트 멤버 조회
			SalesQuoteVO salesQuoteFile = new SalesQuoteVO();
			salesQuoteFile = salesquoteservice.selectQuoteFiledown(searchVO);
			String fileStorePath = SpringProperties.getProperty("Globals.fileStorePath");
			request.setAttribute("downFilePath", salesQuoteFile.getQuote_file_path());
			request.setAttribute("downFile", salesQuoteFile.getQuote_file_id());
			request.setAttribute("orgFileName", salesQuoteFile.getQuote_file_name());
			fileUtil.downFile(request, response);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
	}
}
