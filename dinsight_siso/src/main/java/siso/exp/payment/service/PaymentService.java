package siso.exp.payment.service;

import java.util.List;

/**
 * @Class Name : PaymentService.java
 * @Description : PaymentService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface PaymentService {
			
	/**
	 * 결재선 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PaymentVO> selectPaymentInfoList(PaymentVO searchVO) throws Exception;
	
	/**
	 * 부서 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PaymentVO> selectPaymentDivision(PaymentVO searchVO) throws Exception;
	

	/**
	 * 부서 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PaymentVO> selectAllDivision(PaymentVO searchVO) throws Exception;
	
	
	/**
	 * 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PaymentVO> selectUserList(PaymentVO searchVO) throws Exception;
	
	/**
	 * 결재선 지정 삭제
	 * @param vo - 삭제할 정보가 담긴 PaymentVO
	 * @return void형
	 * @exception Exception
	 */
	void paymentDelete(PaymentVO searchVO) throws Exception;
	
	/**
	 * 결재선 지정 저장
	 * @param vo - 저장할 정보가 담긴 PaymentVO
	 * @return void형
	 * @exception Exception
	 */
	public void paymentInsert(List<PaymentVO> listvo) throws Exception;
	
	/**
	 * 수신자 리스트
	 * @param vo - 저장할 정보가 담긴 PaymentVO
	 * @return void형
	 * @exception Exception
	 */
	public List<PaymentVO> selectReceiveList(PaymentVO searchVO) throws Exception;
    
	/**
	 * 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PaymentVO> selectSalesCustomerList(PaymentVO searchVO) throws Exception;
}