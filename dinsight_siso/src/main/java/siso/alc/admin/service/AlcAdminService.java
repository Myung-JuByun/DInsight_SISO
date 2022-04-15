package siso.alc.admin.service;

import java.util.List;


/**
 * @Class Name : AlcAdminService.java
 * @Description : AlcAdminService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface AlcAdminService {
	
	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 설치사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminInstallCustomerList(AlcAdminVO searchVO) throws Exception;
	
	
	/**
	 * 메인리스트 - 글 등록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public void insertAlcAdmin(AlcAdminVO vo) throws Exception;
    
	/**
	 * 메인리스트 - 담당영업
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcSalesList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 상세보기 - 견적서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminDetailQuiteFileList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 상세보기 - 계약서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminDetailContractFileList(AlcAdminVO searchVO) throws Exception;
}