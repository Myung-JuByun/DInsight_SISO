package siso.exp.individual.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.exp.individual.service.IndividualService;
import siso.exp.individual.service.IndividualVO;

/**
 * @Class Name : IndividualServiceImpl.java
 * @Description : IndividualServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class IndividualServiceImpl implements IndividualService {

	@Autowired
	public SqlSession sqlSession;
	public IndividualMapper individualMapper;
	
	public IndividualServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.individualMapper = sqlSession.getMapper(IndividualMapper.class);
	}
			
	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<IndividualVO> individualSelectList(IndividualVO searchVO) throws Exception {
		return individualMapper.individualSelectList(searchVO);
	}
	
	/**
	 * 글 목록을 조회한다.(Excel)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<IndividualVO> individualSelectExcelList(IndividualVO searchVO) throws Exception {
		return individualMapper.individualSelectExcelList(searchVO);
	}
	
}

























