package siso.adm.user.service.impl;

import org.springframework.stereotype.Component;
import siso.adm.user.service.UserAdminVO;

/**
 * @Class Name : UserAdminDAO.java
 * @Description : UserAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface UserAdminMapper {
	
	/**
	 * 부서 저장/수정
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminDivisionInsert(UserAdminVO vo) throws Exception;
    
    /**
	 * 부서 삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminDivisionDelete(UserAdminVO vo) throws Exception;
	
	/**
	 * 사원정보 저장/수정
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminUserInsert(UserAdminVO vo) throws Exception;
	
	/**
	 * 아이디중복 확인
	 * @param vo - 저장할 정보가 담긴 UserAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public String userAdminSearchCount(UserAdminVO vo) throws Exception;
    
    /**
	 * 사원 삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminUserDelete(UserAdminVO vo) throws Exception;
    
    /**
	 * 부서장 임명/해임
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminUserHeadUpdate(UserAdminVO vo) throws Exception;
    
    /**
	 * 패스워드 체크
	 * @param vo - 저장할 정보가 담긴 UserAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public String userAdminUserPassCheck(UserAdminVO vo) throws Exception;
    
    /**
	 * 패스워드 초기화
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void userAdminUserPassUpdate(UserAdminVO vo) throws Exception;    
    
    /**
	 * 사원 정보
	 * @param searchVO - 조회할 정보가 담긴 UserAdminVO
	 * @return UserAdminVO
	 * @exception Exception
	 */	
	public UserAdminVO userAdminUserInfo(UserAdminVO searchVO) throws Exception;
}
