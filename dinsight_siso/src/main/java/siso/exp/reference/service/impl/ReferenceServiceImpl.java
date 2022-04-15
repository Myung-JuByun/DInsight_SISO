package siso.exp.reference.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.exp.reference.service.ReferenceService;
import siso.exp.reference.service.ReferenceVO;

/**
 * @Class Name : ApprovalServiceImpl.java
 * @Description : ApprovalServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ReferenceServiceImpl implements ReferenceService {

	@Autowired
	public SqlSession sqlSession;
	public ReferenceMapper referenceMapper;
	
	public ReferenceServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.referenceMapper = sqlSession.getMapper(ReferenceMapper.class);
	}
	
	/**
	 * 자료실 목록 조회
	 * @param ReferenceVO - 조회할 정보가 담긴 VO
	 * @return 자료실 목록
	 * @exception Exception
	 */
	@Override
	public List<ReferenceVO> selectReferenceList(ReferenceVO vo) throws Exception {
		return referenceMapper.selectReferenceList(vo);
	}

	/**
	 * 자료실 정보 조회
	 * @param ReferenceVO - 조회할 정보가 담긴 VO
	 * @return 파일id,파일명,파일경로
	 * @exception Exception
	 */
	@Override
	public ReferenceVO selectReferenceFiledown(ReferenceVO vo) throws Exception{
		return referenceMapper.selectReferenceFileDown(vo);
	}

	/**
	 * 자료실 저장
	 */
	@Override
	public void saveReference(ReferenceVO vo) throws Exception {
		referenceMapper.saveReference(vo);
	}

	/**
	 * 자료실 정보 삭제
	 */
	@Override
	public void deleteReference(ReferenceVO vo) throws Exception{
		referenceMapper.deleteReference(vo);
	}
}
