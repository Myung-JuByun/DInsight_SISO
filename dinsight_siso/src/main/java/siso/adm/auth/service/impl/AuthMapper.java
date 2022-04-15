package siso.adm.auth.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.adm.auth.service.AuthVO;

/**
 * @Class Name : AuthMapper.java
 * @Description : AuthMapper.Class
 */

@Component
public interface AuthMapper {

	/**
	 * 설정권한보기
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AuthVO> authViewList(AuthVO searchVO) throws Exception;	
	
	/**
	 * 설정권한 저장
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authViewSave(AuthVO vo) throws Exception;
	
	/**
	 * 설정권한 삭제
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authViewDel(AuthVO vo) throws Exception;
	
	/**
	 * 메뉴설정권한 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AuthVO> menuAuthSaveList(AuthVO vo) throws Exception;
	
	/**
	 * 메뉴설정권한 저장
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authMenuSave(AuthVO vo) throws Exception;
	
	/**
	 * 메뉴설정권한 삭제
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authMenuDel(AuthVO vo) throws Exception;
	
	/**
	 * 권한 저장
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authSave(AuthVO vo) throws Exception;
	
	/**
	 * 권한 삭제
	 * @param vo - AuthVO
	 * @return
	 * @exception Exception
	 */
	public void authDel(AuthVO vo) throws Exception;			
	
}
