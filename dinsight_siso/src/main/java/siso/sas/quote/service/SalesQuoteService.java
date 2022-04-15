package siso.sas.quote.service;

import java.util.List;


/**
 * @Class Name : ProjectAdminService.java
 * @Description : ProjectAdminService Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public interface SalesQuoteService {

	/**
	 * 영업개발상태 조회 - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<SalesQuoteVO> selectSalesQuoteSearchList(SalesQuoteSearchVO vo) throws Exception;
	public List<SalesQuoteVO> selectSalesQuoteRivisionList(SalesQuoteSearchVO vo) throws Exception;
	public SalesQuoteVO selectQuoteFiledown(SalesQuoteSearchVO vo) throws Exception; 
	public SalesQuoteVO selectCountSalesQuote(SalesQuoteSearchVO vo) throws Exception;
	public void saveSalesQuote(SalesQuoteSearchVO vo) throws Exception;
}
