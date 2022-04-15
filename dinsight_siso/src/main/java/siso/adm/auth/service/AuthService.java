package siso.adm.auth.service;

import java.util.List;

/**
 * @Class Name : AuthService.java
 * @Description : AuthService Class
 */
public interface AuthService {	

    /**
	 * 설정권한보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 목록
	 * @exception Exception
	 */
    public List<AuthVO> authViewList(AuthVO searchVO) throws Exception;
    
    /**
	 * 설정권한 저장
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authViewSave(AuthVO searchVO) throws Exception;

    /**
	 * 설정권한 삭제
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authViewDel(AuthVO searchVO) throws Exception;
	
	/**
	 * 메뉴설정권한 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 목록
	 * @exception Exception
	 */
    public List<AuthVO> menuAuthSaveList(AuthVO searchVO) throws Exception;
    
    /**
	 * 메뉴설정권한 저장
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authMenuSave(AuthVO searchVO) throws Exception;
    
    /**
	 * 메뉴설정권한 삭제
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authMenuDel(AuthVO searchVO) throws Exception;
	
	/**
	 * 권한 저장
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authSave(AuthVO searchVO) throws Exception;
	
	/**
	 * 권한 삭제
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void authDel(AuthVO searchVO) throws Exception;
}
