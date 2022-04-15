package siso.sam.fcastingstatus.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.sam.fcastingstatus.service.ForeCastingStatusService;
import siso.sam.fcastingstatus.service.ForeCastingStatusVO;

/**
 * @Class Name : ForeCastingStatusServiceImpl.java
 * @Description : ForeCastingStatusServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ForeCastingStatusServiceImpl implements ForeCastingStatusService {
	
	@Autowired
	public SqlSession sqlSession;
	public ForeCastingStatusMapper foreCastingStatusMapper;
	
	public ForeCastingStatusServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.foreCastingStatusMapper = sqlSession.getMapper(ForeCastingStatusMapper.class);
	}
			
	/**
	 * 영업관리 Forecasting 현황 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ForeCastingStatusVO> fCastingStatusList(ForeCastingStatusVO searchVO) throws Exception {
		return foreCastingStatusMapper.fCastingStatusList(searchVO);
	}
	
	/**
	 * 영업관리 Forecasting 현황 상세 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ForeCastingStatusVO> fCastingStatusDetailList(ForeCastingStatusVO searchVO) throws Exception {
		return foreCastingStatusMapper.fCastingStatusDetailList(searchVO);
	}

	
}