package siso.adm.code.service;

import java.util.List;

/**
 * @Class Name : UserAdminService.java
 * @Description : UserAdminService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface CodeAdminService {
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public List<CodeAdminVO> selectCmnGroupCodeList(CodeAdminVO searchVO) throws Exception;
	
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public List<CodeAdminVO> selectCmnCodeList(CodeAdminVO searchVO) throws Exception;
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public void saveCmnGroupCode(List<CodeAdminVO> listvo)  throws Exception;
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public void deleteCmnGroupCode(CodeAdminVO searchVO) throws Exception;
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public void saveCmnCode(CodeAdminVO listvo) throws Exception ;
	
	public void saveCmnGroupCode(CodeAdminVO listvo)  throws Exception;
	
	public void saveCmnCode(List<CodeAdminVO> listvo) throws Exception ;
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public void deleteCmnCode(CodeAdminVO searchVO) throws Exception;
	
}