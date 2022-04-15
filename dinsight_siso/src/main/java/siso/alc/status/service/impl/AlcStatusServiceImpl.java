package siso.alc.status.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.alc.status.service.AlcStatusService;
import siso.alc.status.service.AlcStatusVO;

/**
 * @Class Name : AlcStatusServiceImpl.java
 * @Description : AlcStatusServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class AlcStatusServiceImpl implements AlcStatusService {
	
	@Autowired
	SqlSession sqlSession;
	AlcStatusMapper alcStatusMapper;
	
	AlcStatusServiceImpl(SqlSession sqlSession) {		
		this.sqlSession = sqlSession;
		this.alcStatusMapper = sqlSession.getMapper(AlcStatusMapper.class);
	}

	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcStatusVO> alcStatusList(AlcStatusVO searchVO) throws Exception {
		return alcStatusMapper.alcStatusList(searchVO);
	}
	
	/**
	 * 메인리스트 - 상세조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcStatusVO> alcStatusDetailList(AlcStatusVO searchVO) throws Exception {
		return alcStatusMapper.alcStatusDetailList(searchVO);
	}
	
	/**
	 * 메인리스트 - 상세조회 - 설치사
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcStatusVO> alcStatusDetailInstallCustomerList(AlcStatusVO searchVO) throws Exception {
		return alcStatusMapper.alcStatusDetailInstallCustomerList(searchVO);
	}
	
	/**
	 * 메인리스트 - 상세조회 - 계약서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcStatusVO> alcStatusDetailContractFileList(AlcStatusVO searchVO) throws Exception {
		return alcStatusMapper.alcStatusDetailContractFileList(searchVO);
	}		
}
