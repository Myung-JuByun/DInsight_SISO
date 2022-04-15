package siso.adm.auth.web;

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

import siso.adm.auth.service.AuthService;
import siso.adm.auth.service.AuthVO;
import siso.adm.service.ComMenuVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : AuthController.java
 * @Description : AuthController Class
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
public class AuthController {

	/** authService */
	@Autowired
	private AuthService authService;
	
	/** PaymentService */
	@Autowired
	private PaymentService paymentService;
		
	@Autowired
	protected SpringPageInitService springPageInitService;
		
	@Autowired
	protected SpringCmmUseService springCmmUseService;
		
	/**
	 * 페이지 접속
	 * @param model
	 * @param request
	 * @return "/adm/auth/authList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/auth/authList")
	public String alcAdminHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/adm/auth/authList";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		return pageUrl;
	}
	
	/**
	 * 메인리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/adm/auth/authInfoListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authInfoListAjax")
	public void authInfoListAjax(@ModelAttribute("searchVO") AuthVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			PaymentVO paymentVO = new PaymentVO();
			
			//부서검색
			List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
			
			//직원 검색
			paymentVO.setDelete_yn("0");
			List<PaymentVO> divisionUserList = paymentService.selectUserList(paymentVO);
			
			//권한
			List<CmmnDetailCode> grantList = springCmmUseService.selectGrantList();
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("divisionList", divisionList);
			map_d.put("divisionUserList", divisionUserList);
			map_d.put("grantList", grantList);
			
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
	 * 설정권한보기
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/adm/auth/authViewList"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authViewList")
	public void authViewList(@ModelAttribute("searchVO") AuthVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//설정권한보기
			List<AuthVO> authViewList = authService.authViewList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("authViewList", authViewList);
			
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
	 * 설정권한 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authViewSave"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authViewSave")	
	public void authViewSave(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authViewSave(searchVO);
			
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
	 * 설정권한 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authViewDel"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authViewDel")	
	public void authViewDel(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authViewDel(searchVO);
			
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
	 * 메뉴권한 설정 팝업
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/adm/auth/authMenuListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authMenuListAjax")
	public void authMenuListAjax(@ModelAttribute("searchVO") AuthVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//메뉴리스트
			List<ComMenuVO> menuList = springCmmUseService.menuList();
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("menuList", menuList);
			
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
	 * 메뉴설정권한 보기
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @return "/adm/auth/menuAuthSaveListAjax"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/menuAuthSaveListAjax")
	public void menuAuthSaveListAjax(@ModelAttribute("searchVO") AuthVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//메뉴설정권한 리스트
			List<AuthVO> menuAuthSaveList = authService.menuAuthSaveList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("menuAuthSaveList", menuAuthSaveList);
			
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
	 * 메뉴설정권한 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authMenuSave"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authMenuSave")	
	public void authMenuSave(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authMenuSave(searchVO);
			
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
	 * 메뉴설정권한 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authMenuDel"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authMenuDel")	
	public void authMenuDel(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authMenuDel(searchVO);
			
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
	 * 권한 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authSave"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authSave")	
	public void authSave(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authSave(searchVO);
			
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
	 * 권한 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @param request
	 * @return "/adm/auth/authDel"
	 * @exception Exception
	 */
	@RequestMapping("/adm/auth/authDel")	
	public void authDel(@ModelAttribute("searchVO") AuthVO searchVO
			, HttpServletRequest request
			, HttpServletResponse response
			) throws Exception {
		
		String str_resData = "";
		
		try {
			
			authService.authDel(searchVO);
			
			str_resData = "success";
		} catch (Exception e) {
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
}
