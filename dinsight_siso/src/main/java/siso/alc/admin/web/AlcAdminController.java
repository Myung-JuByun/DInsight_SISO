package siso.alc.admin.web;

import java.io.PrintWriter;
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

import siso.alc.admin.service.AlcAdminService;
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : AlcAdminController.java
 * @Description : AlcAdminController Class
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
public class AlcAdminController {

	/** alcAdminService */
	@Autowired
	private AlcAdminService alcAdminService;
		
	@Autowired
	protected SpringPageInitService springPageInitService;
		
	@Autowired
	protected SpringCmmUseService springCmmUseService;
		
	private LoginVO loginVO;
		
	/**
	 * 페이지 접속
	 * @param model
	 * @param request
	 * @return "/alc/admin/alcAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/alc/admin/alcAdmin")
	public String alcAdminHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/alc/admin/alcAdmin";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}
	
	/**
	 * 메인리스트(검색)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcSearchAdminListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcSearchAdminListAjax")
	public void alcSearchAdminListAjax(@ModelAttribute("searchVO") AlcAdminVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//공통
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
			inputVo.setGroup_id("144");
			List<CmmnDetailCode> placeOfBusiness = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			inputVo.setGroup_id("001");
			List<CmmnDetailCode> yn = springCmmUseService.selectCmnCodeCombo(inputVo);
			
			//담당영업
			List<AlcAdminVO> sales = alcAdminService.alcSalesList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("placeOfBusiness", placeOfBusiness);
			map_d.put("yn", yn);
			map_d.put("sales", sales);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcAdminListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminListAjax")
	public void alcAdminListAjax(@ModelAttribute("searchVO") AlcAdminVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//Product 조회
			List<AlcAdminVO> alcAdminList = alcAdminService.alcAdminList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcAdminList", alcAdminList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 메인리스트 -  설치사 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcAdminInstallCustomerListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminInstallCustomerListAjax")
	public void alcAdminInstallCustomerListAjax(@ModelAttribute("searchVO") AlcAdminVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//설치사 조회
			List<AlcAdminVO> alcAdminList = alcAdminService.alcAdminList(searchVO);
			List<AlcAdminVO> alcAdminInstallCustomerList = alcAdminService.alcAdminInstallCustomerList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcAdminList", alcAdminList);
			map_d.put("alcAdminInstallCustomerList", alcAdminInstallCustomerList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 메인리스트 -  설치사 등록
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/alc/admin/alcAdminInsertAjax"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminInsertAjax")	
	public void alcAdminInsertAjax(@ModelAttribute("searchVO") AlcAdminVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
    
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		String str_resData = "";
		searchVO.setCreator(login_id);
		
		try {
			
			alcAdminService.insertAlcAdmin(searchVO);
			
			str_resData = "success";
		} catch (Exception e) {
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 메인리스트 -  제품 카테고리 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/alc/admin/alcAdminProductCategorySearchAjax"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminProductCategorySearchAjax")	
	public void alcAdminProductCategorySearchAjax(@ModelAttribute("searchVO") AlcAdminVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
    
		String str_resData = "";
		
		try {
		
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//설치사 조회
			List<AlcAdminVO> selectAlcAdminProductCategorySearch = springCmmUseService.selectAlcAdminProductCategorySearch(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("selectAlcAdminProductCategorySearch", selectAlcAdminProductCategorySearch);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 상세보기 - 견적서 파일 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcAdminDetailQuiteFileList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminDetailQuiteFileList")
	public void alcAdminDetailQuiteFileList(@ModelAttribute("searchVO") AlcAdminVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
					
			//견적서 파일 리스트
			List<AlcAdminVO> alcAdminDetailQuiteFileList = alcAdminService.alcAdminDetailQuiteFileList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcAdminDetailFileList", alcAdminDetailQuiteFileList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 상세보기 - 계약서 파일 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcAdminDetailContractFileList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminDetailContractFileList")
	public void alcAdminDetailContractFileList(@ModelAttribute("searchVO") AlcAdminVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
					
			//계약서 파일 리스트
			List<AlcAdminVO> alcAdminDetailContractFileList = alcAdminService.alcAdminDetailContractFileList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcAdminDetailFileList", alcAdminDetailContractFileList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 페이지 접속(ALC수정)
	 * @param model
	 * @param request
	 * @return "/alc/alcAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/alc/adminModify/alcAdminModify")
	public String alcAdminModifyHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/alc/adminModify/alcAdminModify";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}
	
	/**
	 * 메인리스트 - Product 조회 - ALC 수정 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/admin/alcAdminModifyList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/admin/alcAdminModifyList")
	public void alcAdminModifyList(@ModelAttribute("searchVO") AlcAdminVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//Product 조회
			List<AlcAdminVO> alcAdminList = alcAdminService.alcAdminList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcAdminList", alcAdminList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
}
