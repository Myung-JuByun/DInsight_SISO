package siso.sys.service.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.mail.service.SpringSndngMailRegistService;
import siso.cmmn.mail.service.SndngMailVO;
import siso.cmmn.util.SpringNumberUtil;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.sim.SpringFileScrty;
import siso.sys.service.LoginService;
import siso.sys.service.LoginVO;

/**
 * 일반 로그인, 인증서 로그인을 처리하는 비즈니스 구현 클래스
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
 *  2011.08.26  서준식          EsntlId를 이용한 로그인 추가
 *  </pre>
 */
@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	public SqlSession sqlSession;	
	public LoginMapper loginMapper;
    
    @Autowired
    public SpringSndngMailRegistService sndngMailRegistService;
    
    @Autowired
    public SpringMessageSource springMessageSource;
    
    LoginServiceImpl(SqlSession sqlSession, SpringSndngMailRegistService sndngMailRegistService, SpringMessageSource springMessageSource) {
    	this.sqlSession = sqlSession;
    	this.loginMapper = sqlSession.getMapper(LoginMapper.class);
    	this.sndngMailRegistService = sndngMailRegistService;
    	this.springMessageSource = springMessageSource;
    }
		
	/**
     * 2011.08.26
	 * EsntlId를 이용한 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO actionLoginByEsntlId(LoginVO vo) throws Exception {
    	
    	
    	LoginVO loginVO = loginMapper.actionLoginByEsntlId(vo);
    	
    	// 3. 결과를 리턴한다.
    	if (loginVO != null && loginVO.getUser_id() != 0 && !loginVO.getLogin_Passwd().equals(""))
    		return loginVO;
    	else
    		loginVO = new LoginVO();    	
    	
    	return loginVO;
    }
	
    
    /**
	 * 일반 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO actionLogin(LoginVO vo) throws Exception {
    	
    	// 1. 입력한 비밀번호를 암호화한다.
    	//String enpassword = EgovFileScrty.encryptPassword(vo.getPassword());
    	//vo.setPassword(enpassword);
    	
    	// 2. 아이디와 암호화된 비밀번호가 DB와 일치하는지 확인한다.
    	LoginVO loginVO = loginMapper.actionLogin(vo);
    	
    	Boolean errorYn     = true;
    	String returnMessageCd = "";
    	String returnMessageCdName = "";
    	
    	
    	// 3. 결과를 리턴한다.
    	if (loginVO != null && loginVO.getUser_id() != 0 && !loginVO.getLogin_Passwd().equals("")) {
    		if (vo.getLogin_Passwd().equals(loginVO.getLogin_Passwd())) {
    			if ("1".equals(loginVO.getActivate_yn())) {
    				errorYn = false;
    			} else {
    				returnMessageCd = "errors.login.activate"; 
    				returnMessageCdName ="errorLoginActivate";
    			}
    		} else {
    			returnMessageCd = "errors.login.pw";
    			returnMessageCdName ="errorLoginPw";
    		}
    	} else {
    		returnMessageCd = "errors.login.nodata";
    		returnMessageCdName ="errorLoginNodata";
    	}
    	
    	if (errorYn)
    		loginVO = new LoginVO();    	
    	
    	if (!SpringStringUtil.isEmpty(returnMessageCd)) {
    		loginVO.setReturnMessage(springMessageSource.getMessage(returnMessageCd));
    		loginVO.setReturnMessageCode(returnMessageCdName);
    	}
    	
    	loginVO.setError_yn(errorYn);
		
		return loginVO;	
    }
    
    /**
	 * 인증서 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO actionCrtfctLogin(LoginVO vo) throws Exception {
    	
    	// 1. DN값으로 ID, PW를 조회한다.
    	LoginVO loginVO = loginMapper.actionCrtfctLogin(vo);
    	
    	// 3. 결과를 리턴한다.
    	if (loginVO != null && loginVO.getUser_id() != 0 && !loginVO.getLogin_Passwd().equals(""))
    		return loginVO;
    	else
    		loginVO = new LoginVO();
    	    	
    	return loginVO;
    }
    
    /**
	 * 아이디를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO searchId(LoginVO vo) throws Exception {

    	// 1. 이름, 이메일주소가 DB와 일치하는 사용자 ID를 조회한다.
    	LoginVO loginVO = loginMapper.searchId(vo);
    	
    	// 2. 결과를 리턴한다.
    	if (loginVO != null && loginVO.getUser_id() != 0)
    		return loginVO;
    	else
    		loginVO = new LoginVO();    	
    	
    	return loginVO;
    }
    
    /**
	 * 비밀번호를 찾는다.
	 * @param vo LoginVO
	 * @return boolean
	 * @exception Exception
	 */
    public boolean searchPassword(LoginVO vo) throws Exception {
    	
    	boolean result = true;
    	
    	// 1. 아이디, 이름, 이메일주소, 비밀번호 힌트, 비밀번호 정답이 DB와 일치하는 사용자 Password를 조회한다.
    	LoginVO loginVO = loginMapper.searchPassword(vo);
    	if (loginVO == null || loginVO.getLogin_Passwd() == null || loginVO.getLogin_Passwd().equals(""))
    		return false;    	
    	
    	// 2. 임시 비밀번호를 생성한다.(영+영+숫+영+영+숫=6자리)
    	String newpassword = "";
    	for (int i = 1; i <= 6; i++) {
    		// 영자
    		if (i % 3 != 0) {
    			newpassword += SpringStringUtil.getRandomStr('a', 'z');
    		// 숫자
    		} else {
    			newpassword += SpringNumberUtil.getRandomNum(0, 9);
    		}
    	}
    	
    	// 3. 임시 비밀번호를 암호화하여 DB에 저장한다.
    	LoginVO pwVO = new LoginVO();
    	String enpassword = SpringFileScrty.encryptPassword(newpassword);
    	pwVO.setUser_id(vo.getUser_id());
    	pwVO.setLogin_Passwd(enpassword);
    	pwVO.setUserSe(vo.getUserSe());
    	loginMapper.updatePassword(pwVO);
    	
    	// 4. 임시 비밀번호를 이메일 발송한다.(메일연동솔루션 활용)
    	SndngMailVO sndngMailVO = new SndngMailVO();
    	sndngMailVO.setDsptchPerson("webmaster");
    	sndngMailVO.setRecptnPerson(vo.getEmail());
    	sndngMailVO.setSj("[MOPAS] 임시 비밀번호를 발송했습니다.");
    	sndngMailVO.setEmailCn("고객님의 임시 비밀번호는 " + newpassword + " 입니다.");
    	sndngMailVO.setAtchFileId("");
    	
    	result = sndngMailRegistService.insertSndngMail(sndngMailVO);
    	
    	return result;
    }
}
