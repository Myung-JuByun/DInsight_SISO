package siso.exp.payment.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;

/**
 * @Class Name : PaymentServiceImpl.java
 * @Description : PaymentServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	public SqlSession sqlSession;
	public PaymentMapper paymentMapper;
	
	public PaymentServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.paymentMapper = sqlSession.getMapper(PaymentMapper.class);
	}
			
	/**
	 * 결재선 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectPaymentInfoList(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectPaymentInfoList(searchVO);
	}
	
	/**
	 * 부서 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectPaymentDivision(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectPaymentDivision(searchVO);
	}
	
	/**
	 * 부서 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectAllDivision(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectAllDivision(searchVO);
	}
	
	/**
	 * 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectUserList(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectUserList(searchVO);
	}
	
	/**
	 * 검색
	 * @param searchVO - 영업담당자 조회
	 * @return 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectSalesCustomerList(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectSalesCustomerList(searchVO);
	}
	
	
	/**
	 * 결재선 지정 삭제
	 * @param vo - 삭제할 정보가 담긴 PaymentVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void paymentDelete(PaymentVO vo) throws Exception {
    	paymentMapper.paymentDelete(vo);
    }
	
    /**
	 * 결재선 지정 저장
	 * @param vo - 저장할 정보가 담긴 PaymentVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void paymentInsert(List<PaymentVO> listvo) throws Exception {
    	for (PaymentVO inputVo : listvo ) {
    		paymentMapper.paymentInsert(inputVo);
    	}
    }
    
    /**
	 * 수신자 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PaymentVO> selectReceiveList(PaymentVO searchVO) throws Exception {
		return paymentMapper.selectReceiveList(searchVO);
	}
}

























