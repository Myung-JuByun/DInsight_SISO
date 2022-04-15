package siso.sys.service.impl;


import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import siso.sys.service.LoginVO;

/**
 * 일반 로그인, 인증서 로그인을 처리하는 DAO 클래스
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


@Component
public interface LoginMapper {    
	
    /**
     * 2011.08.26
	 * EsntlId를 이용한 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO actionLoginByEsntlId(LoginVO vo) throws Exception;    
    
	/**
	 * 일반 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    @Select(value = "SELECT		a.*"
		    		+ "			,IF(FIND_IN_SET('4', IF(c.grant_id IS NULL, 1, CONCAT(\"1,\", GROUP_CONCAT(DISTINCT c.grant_id)))), 1, 0) AS head_yn" + "\r\n" 		    		
		    		+ "			,IF(c.grant_id IS NULL, 1, CONCAT(\"1,\", GROUP_CONCAT(DISTINCT c.grant_id))) AS grant_id" + "\r\n"
		    		+ "			,b.division_name, b.operation_yn, b.operation_cd, d.code_name as job_title_name" + "\r\n"
		    		+ "	FROM	tb_users a" + "\r\n"
		    		+ "		INNER JOIN tb_division b ON b.division_cd = a.last_division_cd" + "\r\n"
		    		+ "		INNER JOIN tb_code d ON (d.group_id = '104' AND a.job_title_cd = d.code_id)" + "\r\n"
		    		+ "		LEFT JOIN tb_grant_user c ON c.user_id = a.user_id" + "\r\n"
		    		+ "		WHERE a.login_id = #{login_id}" + "\r\n"
		    		+ "       AND a.delete_yn = '0'" + "\r\n"
		    		+ "		GROUP BY a.login_id")
    public LoginVO actionLogin(LoginVO vo) throws Exception;

    /**
	 * 인증서 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO actionCrtfctLogin(LoginVO vo) throws Exception;
    
    /**
	 * 아이디를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO searchId(LoginVO vo) throws Exception;
    
    /**
	 * 비밀번호를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public LoginVO searchPassword(LoginVO vo) throws Exception;
    
    /**
	 * 변경된 비밀번호를 저장한다.
	 * @param vo LoginVO
	 * @exception Exception
	 */
    public void updatePassword(LoginVO vo) throws Exception;
}
