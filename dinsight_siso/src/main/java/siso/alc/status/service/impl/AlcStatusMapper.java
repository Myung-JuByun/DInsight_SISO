package siso.alc.status.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.alc.status.service.AlcStatusVO;

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
public interface AlcStatusMapper {

	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcStatusVO> alcStatusList(AlcStatusVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 상세조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcStatusVO> alcStatusDetailList(AlcStatusVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 상세조회 - 설치사
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcStatusVO> alcStatusDetailInstallCustomerList(AlcStatusVO searchVO) throws Exception;
	
	/**
	 * 메인리스트 - 상세조회 - 계약서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<AlcStatusVO> alcStatusDetailContractFileList(AlcStatusVO searchVO) throws Exception;
}
