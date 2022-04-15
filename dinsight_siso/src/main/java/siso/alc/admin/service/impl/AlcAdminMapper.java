package siso.alc.admin.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.alc.admin.service.AlcAdminVO;

/**
 * @Class Name : AlcAdminDAO.java
 * @Description : AlcAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface AlcAdminMapper{

	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 설치사 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcAdminInstallCustomerList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 글을 등록한다.
	 * @param vo - AlcAdminVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public int insertAlcAdmin(AlcAdminVO vo) throws Exception;
	
	/**
	 * 글을 등록한다.
	 * @param vo - AlcAdminVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void insertAlcAdminChang(AlcAdminVO vo) throws Exception;
	
	/**
	 * 메인리스트 - 담당영업
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<AlcAdminVO> alcSalesList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * max_chg_alc_id 필드 입괄 업데이트
	 * @param vo - AlcAdminVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void updateAlcAdminMaxChgAlcId() throws Exception;
	
	/**
	 * 메인리스트 - 견적서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcAdminVO> alcAdminDetailQuiteFileList(AlcAdminVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 계약서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcAdminVO> alcAdminDetailContractFileList(AlcAdminVO searchVO) throws Exception;
}
