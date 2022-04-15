package siso.sas.contract.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.sas.contract.service.SalesContractService;
import siso.sas.contract.service.SalesContractVO;
import siso.sas.contract.service.SalesContractSearchVO;

/**
 * @Class Name : ProjectAdminServiceImpl.java
 * @Description : ProjectAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class SalesContractServiceImpl implements SalesContractService {
	
	@Autowired
	public SqlSession sqlSession;
	public SalesContractMapper salesContractMapper;
	
	public SalesContractServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.salesContractMapper = sqlSession.getMapper(SalesContractMapper.class);
	}

	/**
	 * 영업개발상태 조회 - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<SalesContractVO> selectSalesContractSearchList(SalesContractSearchVO vo) throws Exception {
		return salesContractMapper.selectSalesContractSearchList(vo);
	}

	@Override
	public List<SalesContractVO> selectSalesContractRivisionList(SalesContractSearchVO vo) throws Exception {
		return salesContractMapper.selectSalesContractRivisionList(vo);
	}

	@Override
	public SalesContractVO selectCountSalesContract(SalesContractSearchVO vo) throws Exception {
		return salesContractMapper.selectCountSalesContract(vo);
	}

	@Override
	public void saveSalesContract(SalesContractSearchVO vo) throws Exception {
		salesContractMapper.saveSalesContract(vo);
	}

	@Override
	public SalesContractVO selectContractFiledown(SalesContractSearchVO vo) throws Exception {
		return salesContractMapper.selectContractFiledown(vo);
	}
}
