package siso.sys.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import siso.cmmn.cmm.SpringComponentChecker;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.cmmn.util.sim.SpringClntInfo;
import siso.sys.service.LoginService;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * 일반 로그인, 인증서 로그인을 처리하는 컨트롤러 클래스
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.06
 * @version 1.0
 * @see
 *  
 * <pre>
 * << 개정이력(Modification Information) >>
 * 
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.06  박지욱          최초 생성 
 *  2011.8.26	정진오			IncludedInfo annotation 추가
 *  2011.09.07  서준식          스프링 시큐리티 로그인 및 SSO 인증 로직을 필터로 분리
 *  2011.09.25  서준식          사용자 관리 컴포넌트 미포함에 대한 점검 로직 추가
 *  2011.09.27  서준식          인증서 로그인시 스프링 시큐리티 사용에 대한 체크 로직 추가
 *  2011.10.27  서준식          아이디 찾기 기능에서 사용자 리름 공백 제거 기능 추가
 *  </pre>
 */

@Controller
public class UserLoginController {
	
    @Autowired
    private LoginService loginService;
		
    @Autowired
    private SpringMessageSource springMessageSource;
    
	/** log */
    protected static final Log LOG = LogFactory.getLog(UserLoginController.class);
    
    /**
	 * 일반(세션) 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */    
    public String actionLogin(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, ModelMap model) throws Exception {    	
    	String message = (String) springMessageSource.getMessage("fail.common.login");       
    	LOG.debug("메시지=" + message);
        
    	// 1. 일반 로그인 처리
        LoginVO resultVO = loginService.actionLogin(loginVO);
    		
        if (resultVO != null && resultVO.getUser_id() != 0) {        	
        	// 2-1. 로그인 정보를 세션에 저장
        	request.getSession().setAttribute("loginVO", resultVO);
    		return "redirect:/uat/uia/actionMain";     
        } else {        	
        	model.addAttribute("message", springMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
        }                
    }   
    
    @RequestMapping(value = "/sys/actionLogin")
	@ResponseBody
	public void actionLogin(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
    	 LOG.debug("/sys/actionLogin 컨트롤러 호출 ");
		 
		 String str_resData = "";	
		 String str_json_data_name       = "GetResultData";
		 String str_json_data_count_name = "GetResultDataCnt";
		 String str_json_error_yn        = "GetResultErrorYn";
		 String str_json_return_msg      = "GetResultMsg";		 
		 String str_json_return_msg_name = "GetResultMsgName";
		 String return_msg               = "";  
		 String str_json_error_moveUrl   = "GetResultErrorMoveUrl";
		 
		 try
		 {			
			 String login_id     =  request.getParameter("login_id");
			 String login_Passwd =  request.getParameter("login_Passwd");
			 //int expanseId    =  Integer.parseInt(request.getParameter("expanseId"));
			 
			 LoginVO searchVo = new LoginVO();
			 searchVo.setLogin_id(login_id);
			 searchVo.setLogin_Passwd(login_Passwd);
			 
			 // 1. 일반 로그인 처리
		     LoginVO resultVO = loginService.actionLogin(searchVo);
		     
		     Map<String, Object> map_d = new HashMap<String, Object>();
		     
		     if (!resultVO.getError_yn()) {
		    	// 2-1. 로그인 정보를 세션에 저장
		        request.getSession().setAttribute("loginVO", resultVO);
		     }
		     
			 map_d.put(str_json_data_name, resultVO);
			 map_d.put(str_json_error_yn,resultVO.getError_yn());
			 map_d.put(str_json_return_msg,resultVO.getReturnMessage());
			 map_d.put(str_json_return_msg_name,resultVO.getReturnMessageCode());
			 map_d.put(str_json_error_moveUrl,Globals.MAIN_PAGE);
			 map_d.put(str_json_data_count_name,0);
			 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 catch(Exception ex)
		 {
			 LOG.debug(this.getClass().toString() + " Exception : " + ex.toString());
			 Map<String, Object> map_d = new HashMap<String, Object>();
			 map_d.put(str_json_data_name, "Error : " + return_msg);
	    	 map_d.put(str_json_error_yn,true);
	    	 map_d.put(str_json_return_msg,"Error : " + return_msg);
	    	 map_d.put(str_json_return_msg_name,"Error : " + return_msg);
	    	 map_d.put(str_json_error_moveUrl,"");
	    	 map_d.put(str_json_data_count_name,0);
	    	 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 response.setContentType("text/html; charset=utf-8");
		 PrintWriter pw = response.getWriter();
		 pw.print(str_resData);
		 pw.flush();     
	 }
    
    
    /**
	 * 로그아웃한다.
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/sys/actionLogout")
	@ResponseBody
	public void actionLogout(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
    	 LOG.debug("/sys/actionLogout 컨트롤러 호출 ");
    	
    	 String str_resData = "";	
		 String str_json_data_name       = "GetResultData";
		 String str_json_data_count_name = "GetResultDataCnt";
		 String str_json_error_yn        = "GetResultErrorYn";
		 String str_json_return_msg      = "GetResultMsg";
		 String return_msg               = "";  
		 String str_json_error_moveUrl   = "GetResultErrorMoveUrl";
		 
		 try
		 {			
			 request.getSession().setAttribute("loginVO", null);
		     
		     Map<String, Object> map_d = new HashMap<String, Object>();
		     
			 map_d.put(str_json_data_name, "ok");
			 map_d.put(str_json_error_yn,false);
			 map_d.put(str_json_return_msg,"");
			 map_d.put(str_json_error_moveUrl,Globals.MAIN_PAGE);
			 map_d.put(str_json_data_count_name,0);
			 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 catch(Exception ex)
		 {
			 LOG.debug(this.getClass().toString() + " Exception : " + ex.toString());
			 Map<String, Object> map_d = new HashMap<String, Object>();
			 map_d.put(str_json_data_name, "Error : " + return_msg);
	    	 map_d.put(str_json_error_yn,true);
	    	 map_d.put(str_json_return_msg,"Error : " + return_msg);
	    	 map_d.put(str_json_error_moveUrl,"");
	    	 map_d.put(str_json_data_count_name,0);
	    	 
	    	 ObjectMapper om = new ObjectMapper();
	    	 str_resData = om.writeValueAsString(map_d);
		 }
		 response.setContentType("text/html; charset=utf-8");
   	     PrintWriter pw = response.getWriter();
   	     pw.print(str_resData);
   	     pw.flush();  
    }
    
	/**
	 * 로그인 화면으로 들어간다
	 * @param vo - 로그인후 이동할 URL이 담긴 LoginVO
	 * @return 로그인 페이지
	 * @exception Exception
	 */
    //@IncludedInfo(name="로그인", listUrl="/uat/uia/egovLoginUsr", order = 10, gid = 10)
    @RequestMapping(value="/uat/uia/egovLoginUsr")
	public String loginUsrView(@ModelAttribute("loginVO") LoginVO loginVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) 
			throws Exception {
    	if(SpringComponentChecker.hasComponent("mberManageService")){
    		model.addAttribute("useMemberManage", "true");
    	}
    	
    	System.out.print(SpringComponentChecker.hasComponent("mberManageService"));    	
    	return "egovframework/com/uat/uia/EgovLoginUsr";
	}
   
    /**
	 * 인증서 로그인을 처리한다
	 * @param vo - 주민번호가 담긴 LoginVO
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
    //@RequestMapping(value="/uat/uia/actionCrtfctLogin")
    public String actionCrtfctLogin(@ModelAttribute("loginVO") LoginVO loginVO, 
    		HttpServletRequest request,
    		HttpServletResponse response,
			ModelMap model)
            throws Exception {
    	    	
    	return "egovframework/com/uat/uia/EgovLoginUsr";
    }
    
    /**
	 * 로그인 후 메인화면으로 들어간다
	 * @param 
	 * @return 로그인 페이지
	 * @exception Exception
	 */
    //@RequestMapping(value="/uat/uia/actionMain")
	public String actionMain(ModelMap model) 
			throws Exception {
    	
    	// 1. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = SpringUserDetailsHelper.isAuthenticated();
    	if(!isAuthenticated) {
    		model.addAttribute("message", springMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}
    	
    	// 3. 메인 페이지 이동
		String main_page = Globals.MAIN_PAGE;
		
		LOG.debug("Globals.MAIN_PAGE > " +  Globals.MAIN_PAGE);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);
		LOG.debug("main_page > " +  main_page);		
		
		if (main_page.startsWith("/"))
		    return "forward:" + main_page;
		else
		    return main_page;						
	}
    
    
    
    /**
	 * 아이디/비밀번호 찾기 화면으로 들어간다
	 * @param 
	 * @return 아이디/비밀번호 찾기 페이지
	 * @exception Exception
	 */
	//@RequestMapping(value="/uat/uia/egovIdPasswordSearch")
	public String idPasswordSearchView(ModelMap model) throws Exception {
		return "egovframework/com/uat/uia/EgovIdPasswordSearch";
	}
	
	/**
	 * 인증서안내 화면으로 들어간다
	 * @return 인증서안내 페이지
	 * @exception Exception
	 */
	//@RequestMapping(value="/uat/uia/egovGpkiIssu")
	public String gpkiIssuView(ModelMap model) 
			throws Exception {
		return "egovframework/com/uat/uia/EgovGpkiIssu";
	}
	
    /**
	 * 아이디를 찾는다.
	 * @param vo - 이름, 이메일주소, 사용자구분이 담긴 LoginVO
	 * @return result - 아이디
	 * @exception Exception
	 */
	//@RequestMapping(value="/uat/uia/searchId")
    public String searchId(@ModelAttribute("loginVO") LoginVO loginVO, 
    		ModelMap model)
            throws Exception {
    	
    	if (loginVO == null || loginVO.getUser_name() == null || loginVO.getUser_name().equals("")
    		&& loginVO.getEmail() == null || loginVO.getEmail().equals("")
    		&& loginVO.getUserSe() == null || loginVO.getUserSe().equals("")
    	) {
    		return "egovframework/com/cmm/egovError";
    	}
    	
    	// 1. 아이디 찾기
    	loginVO.setUser_name(loginVO.getUser_name().replaceAll(" ", ""));
        LoginVO resultVO = loginService.searchId(loginVO);
        
        if (resultVO != null && resultVO.getUser_id() != 0) {
        	
        	model.addAttribute("resultInfo", "아이디는 " + resultVO.getUser_id() + " 입니다.");
        	return "egovframework/com/uat/uia/EgovIdPasswordResult";
        } else {
        	model.addAttribute("resultInfo", springMessageSource.getMessage("fail.common.idsearch"));
        	return "egovframework/com/uat/uia/EgovIdPasswordResult";
        }
    }
    
    /**
	 * 비밀번호를 찾는다.
	 * @param vo - 아이디, 이름, 이메일주소, 비밀번호 힌트, 비밀번호 정답, 사용자구분이 담긴 LoginVO
	 * @return result - 임시비밀번호전송결과
	 * @exception Exception
	 */
    //@RequestMapping(value="/uat/uia/searchPassword")
    public String searchPassword(@ModelAttribute("loginVO") LoginVO loginVO, 
    		ModelMap model)
            throws Exception {
    	
    	if (loginVO == null || loginVO.getUser_id() == 0
    		&& loginVO.getUser_name() == null || loginVO.getUser_name().equals("")
    		&& loginVO.getEmail() == null || loginVO.getEmail().equals("")
    		&& loginVO.getPasswordHint() == null || loginVO.getPasswordHint().equals("")
    		&& loginVO.getPasswordCnsr() == null || loginVO.getPasswordCnsr().equals("")
    		&& loginVO.getUserSe() == null || loginVO.getUserSe().equals("")
    	) {
    		return "egovframework/com/cmm/egovError";
    	}
    	
    	// 1. 비밀번호 찾기
        boolean result = loginService.searchPassword(loginVO);
        
        // 2. 결과 리턴
        if (result) {
        	model.addAttribute("resultInfo", "임시 비밀번호를 발송하였습니다.");
        	return "egovframework/com/uat/uia/EgovIdPasswordResult";
        } else {
        	model.addAttribute("resultInfo", springMessageSource.getMessage("fail.common.pwsearch"));
        	return "egovframework/com/uat/uia/EgovIdPasswordResult";
        }
    }    
    
    /**
     * 인증서 DN추출 팝업을 호출한다.
     * @return 인증서 등록 페이지
     * @exception Exception
     */
	//@RequestMapping(value = "/uat/uia/EgovGpkiRegist")
    public String gpkiRegistView(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	return "egovframework/com/uat/uia/EgovGpkiRegist";
    }

    /**
     * 인증서 DN값을 추출한다
     * @return result - dn값
     * @exception Exception
     */
    //@RequestMapping(value = "/uat/uia/actionGpkiRegist")
	public String actionGpkiRegist(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) throws Exception {

		/** GPKI 인증 부분 */
		// OS에 따라 (local NT(로컬) / server Unix(서버)) 구분
		String os = System.getProperty("os.arch");
		// String virusReturn = null;
		String dn = "";

		// 브라우저 이름을 받기위한 처리
		String webKind = SpringClntInfo.getClntWebKind(request);
		String[] ss = webKind.split(" ");
		String browser = ss[1];
		model.addAttribute("browser", browser);
		
		return "egovframework/com/uat/uia/EgovGpkiRegist";
	}
}