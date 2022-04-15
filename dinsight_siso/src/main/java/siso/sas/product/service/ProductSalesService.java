package siso.sas.product.service;

import java.util.List;

import siso.sys.service.LoginVO;

/**
 * @Class Name : ProductSalesService.java
 * @Description : ProductSalesService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ProductSalesService {
	
	/**
	 * 매출품의 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesList(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의 상세 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesDetail(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의 alc 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesAlcSearch(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의 상세보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesConferView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * DS 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productDSSalesRecordView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * ETC 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesRecordView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출 및 매입 세금계산서 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesVO> productSalesInvoiceView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * degree max 카운트 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
	String selectDegreeCount(ProductSalesVO vo) throws Exception;
	
	/**
	 * Project Code max 카운트 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
	String selectCheckKind(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 메인정보 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    void productSalesConferInsert(ProductSalesVO vo, LoginVO loginVO) throws Exception;

    /**
	 * 매출품의 매출 및 매입내역 저장
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesRecordInsert(List<ProductSalesVO> listvo) throws Exception;
    
    /**
	 * 매출품의 매출/매입 세금계산서 저장
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesInvoiceInsert(List<ProductSalesVO> listvo) throws Exception;
	
	/**
	 * 매출품의 삭제
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesConferDel(ProductSalesVO vo) throws Exception;
    
    /**
	 * 매출품의 매출 및 매입내역 삭제 - alc/ds
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception 
	 */
    void productDSSalesRecordDel(ProductSalesVO vo) throws Exception;
    
    /**
 	 * 매출품의 변경 매출 및 매입내역 - 이력삭제 
 	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
 	 * @return void형
 	 * @exception Exception
 	 */
     void productAlcSalesRecordHistoryDel(ProductSalesVO vo) throws Exception;
     
    /**
	 * 매출품의 매출 및 매입내역 삭제 - etc
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesRecordDel(ProductSalesVO vo) throws Exception;
    
    /**
	 * 매출품의 매출/매입 세금계산서 삭제
	 * @param vo - 수정할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesInvoiceDel(ProductSalesVO vo) throws Exception;
	
    /**
	 * 매출품의 제출
	 * @param vo -  제출할 정보가 담긴 ProductSalesVO, LoginVO
	 * @return void형
	 * @exception Exception
	 */
    void productSalesFinalSubmit(ProductSalesVO vo, LoginVO loginVO) throws Exception;
    
    /**
	 * contract check 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    public List<ProductSalesVO> selectCheckContract(ProductSalesVO searchVO) throws Exception;
}