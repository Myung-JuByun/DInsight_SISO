package siso.alc.status.web;

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
import siso.alc.status.service.AlcStatusService;
import siso.alc.status.service.AlcStatusVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : AlcStatusController.java
 * @Description : AlcStatusController Class
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
public class AlcStatusController {

	/** alcAdminService */
	@Autowired
	private AlcAdminService alcAdminService;
	
	/** alcAdminService */
	@Autowired
	private AlcStatusService alcStatusService;
		
	@Autowired
	protected SpringPageInitService egovPageInitService;
		
	@Autowired
	protected SpringCmmUseService egovCmmUseService;
		
	//private LoginVO loginVO;
		
	/**
	 * 페이지 접속
	 * @param model
	 * @param request
	 * @return "/alc/status/alcStatus"
	 * @exception Exception
	 */
	@RequestMapping(value = "/alc/status/alcStatus")
	public String alcStatusHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/alc/status/alcStatus";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) egovPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}
	
	/**
	 * 메인리스트(검색)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/status/alcSearchStatusList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/status/alcSearchStatusList")
	public void alcSearchStatusList(@ModelAttribute("searchVO") AlcAdminVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//담당영업
			List<AlcAdminVO> sales = alcAdminService.alcSalesList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
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
	 * @return "/alc/status/alcStatusList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/status/alcStatusList")
	public void alcStatusList(@ModelAttribute("searchVO") AlcStatusVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
			
			String license_year = searchVO.getSh_license_year();
			String license_month = searchVO.getSh_license_month();
			
			if(!SpringStringUtil.isEmpty(license_year) && !SpringStringUtil.isEmpty(license_month)) {
				searchVO.setSh_license_ym(license_year + license_month);
			}
					
			//Product 조회
			List<AlcStatusVO> alcStatusList = alcStatusService.alcStatusList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcStatusList", alcStatusList);
			
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
	 * 메인리스트 -  상세보기
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/status/alcStatusDetailList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/status/alcStatusDetailList")
	public void alcAdminInstallCustomerList(@ModelAttribute("searchVO") AlcStatusVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
		
			//회원정보
			//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
			//int login_id       =  loginVO.getUserId();
					
			//상세조회
			List<AlcStatusVO> alcStatusDetailList = alcStatusService.alcStatusDetailList(searchVO);
			
			//상세조회 - 설치사
			List<AlcStatusVO> alcStatusDetailInstallCustomerList = alcStatusService.alcStatusDetailInstallCustomerList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcStatusDetailList", alcStatusDetailList);
			map_d.put("alcStatusDetailInstallCustomerList", alcStatusDetailInstallCustomerList);
			
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
	 * 메인리스트 - 상세조회 - 계약서 파일 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/alc/status/alcStatusDetailContractFileList"
	 * @exception Exception
	 */
	@RequestMapping("/alc/status/alcStatusDetailContractFileList")
	public void alcAdminDetailContractFileList(@ModelAttribute("searchVO") AlcStatusVO searchVO
			, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
					
			//계약서 파일 리스트
			List<AlcStatusVO> alcStatusDetailContractFileList = alcStatusService.alcStatusDetailContractFileList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("alcStatusDetailFileList", alcStatusDetailContractFileList);
			
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
