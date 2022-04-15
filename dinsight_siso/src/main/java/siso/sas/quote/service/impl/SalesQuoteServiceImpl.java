package siso.sas.quote.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import siso.sas.quote.service.SalesQuoteSearchVO;
import siso.sas.quote.service.SalesQuoteService;
import siso.sas.quote.service.SalesQuoteVO;

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
public class SalesQuoteServiceImpl implements SalesQuoteService {

	@Autowired
	public SqlSession sqlSession;	
	public SalesQuoteMapper salesQuoteMapper;
	
	public SalesQuoteServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.salesQuoteMapper = sqlSession.getMapper(SalesQuoteMapper.class);				
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
	public List<SalesQuoteVO> selectSalesQuoteSearchList(SalesQuoteSearchVO vo) throws Exception {
		return salesQuoteMapper.selectSalesQuoteSearchList(vo);
	}

	@Override
	public List<SalesQuoteVO> selectSalesQuoteRivisionList(SalesQuoteSearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return salesQuoteMapper.selectSalesQuoteRivisionList(vo);
	}

	@Override
	public SalesQuoteVO selectCountSalesQuote(SalesQuoteSearchVO vo) throws Exception {
		return salesQuoteMapper.selectCountSalesQuote(vo);
	}

	@Override
	public void saveSalesQuote(SalesQuoteSearchVO vo) throws Exception {
		salesQuoteMapper.saveSalesQuote(vo);
	}

	@Override
	public SalesQuoteVO selectQuoteFiledown(SalesQuoteSearchVO vo) throws Exception {
		return salesQuoteMapper.selectQuoteFiledown(vo);
	}
}
