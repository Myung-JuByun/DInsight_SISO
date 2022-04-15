package siso.adm.user.web;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import siso.adm.user.service.UserAdminService;
import siso.adm.user.service.UserAdminVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.BusinessUtil;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : UserAdminController.java
 * @Description : UserAdminController Class
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
public class UserAdminController {

	/** UserAdminService */
	@Autowired
	private UserAdminService userAdminService;
	
	/** PaymentService */
	@Autowired
	private PaymentService paymentService;

	/** springPageInitService */
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	/** springCmmUseService */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
	
	//private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

	/**
	 * 페이지로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/adm/user/userAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userAdmin")
	public String userAdminList(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/adm/user/userAdmin";			
					
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		return pageUrl;
	}		
	
	/**
	 * 부서, 직원 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/divisionList")
	public void selectDivisionList(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		//부서검색
		List<PaymentVO> allDivisionList = paymentService.selectAllDivision(paymentVO);
		
		//직원 검색
		List<PaymentVO> userList = paymentService.selectUserList(paymentVO);
		
		ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
		
		//직급 검색
		inputVO.setGroup_id("104");		
		List<CmmnDetailCode> jobTitleList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//고용구분 검색
		inputVO.setGroup_id("111");		
		List<CmmnDetailCode> employTypeList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//화면권한 검색
		inputVO.setGroup_id("121");		
		List<CmmnDetailCode> roleList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("divisionList", divisionList);
		map.put("userList", userList);
		map.put("jobTitleList", jobTitleList);
		map.put("employTypeList", employTypeList);
		map.put("roleList", roleList);
		map.put("allDivisionList", allDivisionList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 부서 저장/수정
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/divisionInsert")
	public void divisionInsert(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String division_id = searchVO.getDivision_id();
		String division_cd = searchVO.getDivision_cd();
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		if (SpringStringUtil.isEmpty(division_id)) {
			division_id = null;
			division_cd = searchVO.getParent_cd();
		}
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		BusinessUtil businessUtil = new BusinessUtil();
		
		String operation_cd = businessUtil.divisionSearch(divisionList, division_cd);
		
		if (SpringStringUtil.isEmpty(operation_cd)) {
			operation_cd = null;
		}
		
		//사업부 체크시
		if("1".equals(searchVO.getOperation_yn())) {
			operation_cd = searchVO.getDivision_cd();
		}
		
		//사업부 체크 해제시
		if("0".equals(searchVO.getOperation_yn()) && operation_cd == null) {
			operation_cd = null;
		}
		
		//파라미터(나머지는 자동으로 받음)
		searchVO.setDivision_id(division_id);
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		searchVO.setOperation_cd(operation_cd);
		
		try {
			
			userAdminService.userAdminDivisionInsert(searchVO);
			
			str_resData = "success";
			
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
	 * 부서 삭제
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/divisionDelete")
	public void divisionDelete(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		//searchVO.setDivision_id(searchVO.getDivision_id());
		searchVO.setModifier(login_id);
		
		try {
			
			userAdminService.userAdminDivisionDelete(searchVO);
			
			str_resData = "success";
			
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
	 * 사원정보 저장/수정
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userInsert")
	public void userInsert(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String user_id     = searchVO.getUser_id();
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		if (SpringStringUtil.isEmpty(user_id)) {
			user_id = null;
		}
		
		//파라미터(나머지는 자동으로 받음)
		searchVO.setUser_id(user_id);
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		try {
			
			userAdminService.userAdminUserInsert(searchVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
		
		System.out.println(str_resData);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 메인 회원가입
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userNewInsert")
	public void userNewInsert(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String user_id     = searchVO.getUser_id();
		
		//세션이 없는 상태의 회원가입이므로 임의의 유저 번호를 넣어준다.
		int login_id       =  545;
				
		if (SpringStringUtil.isEmpty(user_id)) {
			user_id = null;
		}
		
		//파라미터(나머지는 자동으로 받음)
		searchVO.setUser_id(user_id);
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
				
		try {
			
			userAdminService.userAdminUserInsert(searchVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
		
		System.out.println(str_resData);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 사원정보 삭제
	 * @param request
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userDelete")
	public void userDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String in_user_id = "";
		String in_delete_yn = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//파라미터명
		String data = request.getParameter("data");
		
		//이스케이프 처리된 파라미터 데이터 복원
		String escapedJson = StringEscapeUtils.unescapeHtml(data);
		
		//json 파서
		JSONParser jsonParser = new JSONParser();
		JSONArray jsonArray = (JSONArray) jsonParser.parse(escapedJson);
		
		//저장 및 업데이트 처리
		List<UserAdminVO> inputListVO  = new ArrayList<UserAdminVO>();
		
		int jsonArraySize = jsonArray.size();
		
		for(int cnt = 0; cnt < jsonArraySize; cnt++) {
			
			JSONObject rowArr = (JSONObject) jsonArray.get(cnt);
			
			in_user_id = (String) rowArr.get("owner_id");
			
			if(rowArr.get("delete_yn").equals("1")) 	in_delete_yn = "0";
			else										in_delete_yn = "1";
			
			UserAdminVO userAdminVO = new UserAdminVO();
			
			userAdminVO.setUser_id(in_user_id);
			userAdminVO.setDelete_yn(in_delete_yn);
			userAdminVO.setModifier(login_id);
			
			inputListVO.add(userAdminVO);			
		}
		
		try {
			
			userAdminService.userAdminUserDelete(inputListVO);
			
			str_resData = "success";
			
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
	 * 아이디 중복확인
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userSearchCount")
	public void userSearchCount(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//파라미터
		//searchVO.setLogin_id(searchVO.getLogin_id());
		
		try {
			String userCount = userAdminService.userAdminSearchCount(searchVO);
			
			str_resData = userCount;
			
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
	 * 부서장 임명/해임 -> 사용승인으로 변경
	 * @param request
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userHeadUpdate")
	public void userHeadUpdate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String in_user_id = "";
		String in_head_yn = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//파라미터명
		String data = request.getParameter("data");
		
		//이스케이프 처리된 파라미터 데이터 복원
		String escapedJson = StringEscapeUtils.unescapeHtml(data);
		
		//json 파서
		JSONParser jsonParser = new JSONParser();
		JSONArray jsonArray = (JSONArray) jsonParser.parse(escapedJson);
		
		//저장 및 업데이트 처리
		List<UserAdminVO> inputListVO  = new ArrayList<UserAdminVO>();
		
		int jsonArraySize = jsonArray.size();
		
		for(int cnt = 0; cnt < jsonArraySize; cnt++) {
			
			JSONObject rowArr = (JSONObject) jsonArray.get(cnt);
			
			in_user_id = (String) rowArr.get("owner_id");
			
			//System.out.println("##############################");
			//System.out.println(rowArr.get("head_yn"));
			
			if(rowArr.get("activate_yn").equals("1")) 	in_head_yn = "0";
			else										in_head_yn = "1";
			
			UserAdminVO userAdminVO = new UserAdminVO();
			
			userAdminVO.setUser_id(in_user_id);
			//userAdminVO.setHead_yn(in_head_yn);
			userAdminVO.setActivate_yn(in_head_yn);
			userAdminVO.setModifier(login_id);
			
			inputListVO.add(userAdminVO);			
		}
		
		try {
			
			userAdminService.userAdminUserHeadUpdate(inputListVO);
			
			str_resData = "success";
			
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
	 * 패스워드 초기화, 패스워드 변경(로그인 아이디값과 동일하게 변경)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userPassUpdate")
	public void userPassUpdate(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String in_user_id  = "";
		String in_login_id = "";
		String in_pw_original = "";
		String pwCheckInfo = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();

		List<UserAdminVO> inputListVO  = new ArrayList<UserAdminVO>();
		
		//파라미터명
		String data = request.getParameter("data");
		
		//json 으로 넘어 왔다면
		if(!("".equals(data)) && data != null) {
			
			//이스케이프 처리된 파라미터 데이터 복원
			String escapedJson = StringEscapeUtils.unescapeHtml(data);
			
			//json 파서
			JSONParser jsonParser = new JSONParser();
			JSONArray jsonArray = (JSONArray) jsonParser.parse(escapedJson);
			
			//저장 및 업데이트 처리
			int jsonArraySize = jsonArray.size();
			
			for(int cnt = 0; cnt < jsonArraySize; cnt++) {
				
				JSONObject rowArr = (JSONObject) jsonArray.get(cnt);
				
				in_user_id = (String) rowArr.get("owner_id");
				in_login_id = (String) rowArr.get("login_id");
				
				UserAdminVO userAdminVO = new UserAdminVO();
				
				userAdminVO.setUser_id(in_user_id);
				userAdminVO.setLogin_Passwd(in_login_id);
				userAdminVO.setModifier(login_id);
				
				inputListVO.add(userAdminVO);
			}
			
			try {
						
				userAdminService.userAdminUserPassUpdate(inputListVO);
						
				str_resData = "success";
				
			} catch(Exception ex) {
				
				ex.printStackTrace();
				
				str_resData = "fail";
			}
			
		} else {
			
			//VO 로 넘어 왔다면
			if(!searchVO.getLogin_Passwd().equals("")) in_pw_original = searchVO.getLogin_Passwd();
			
			//저장 및 업데이트 처리
			for(int cnt=0; cnt < searchVO.getIn_user_id().length; cnt++) {
				
				UserAdminVO userAdminVO = new UserAdminVO();
				
				in_user_id = searchVO.getIn_user_id()[cnt];
				in_login_id = searchVO.getIn_login_id()[cnt];
				
				userAdminVO.setUser_id(in_user_id);
				userAdminVO.setLogin_Passwd(in_login_id);
				userAdminVO.setModifier(login_id);
				
				inputListVO.add(userAdminVO);
			}
			
			try {
				
				if(!in_pw_original.equals("")) {
					String[] set_user_id = searchVO.getIn_user_id();
					searchVO.setUser_id(set_user_id[0]);
					pwCheckInfo = userAdminService.userAdminUserPassCheck(searchVO);
				}
				
				//관리자의 패스워드 초기화
				if(pwCheckInfo.equals("")) {
					
					userAdminService.userAdminUserPassUpdate(inputListVO);
					
					str_resData = "success";
					
				} else {
					
					//패스워드 변경
					if(pwCheckInfo.equals("0")) {
						
						str_resData = "fail2";
						
					} else {
						
						userAdminService.userAdminUserPassUpdate(inputListVO);
						
						str_resData = "success";
					}
				}
				
			} catch(Exception ex) {
				
				ex.printStackTrace();
				
				str_resData = "fail";
			}
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
		
	/**
	 * 사원 정보
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/adm/user/userInfo")
	public void userInfo(@ModelAttribute("searchVO") UserAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		searchVO.setUser_id(searchVO.getUser_id());
		
		//직원 검색			
		UserAdminVO userList = userAdminService.userAdminUserInfo(searchVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userList", userList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}

}
