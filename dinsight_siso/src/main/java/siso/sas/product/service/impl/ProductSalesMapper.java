package siso.sas.product.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.sas.product.service.ProductSalesVO;

/**
 * @Class Name : ProjectAdminMapper.java
 * @Description : ProjectAdminMapper Class
 * @Modification Information 2009.03.16 최초생성
 *  
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ProductSalesMapper {

	/**
	 * 매출품의 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesList(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의 상세 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesDetail(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의 상세보기
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesConferView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출품의  alc list
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesAlcSearch(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * DS 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productDSSalesRecordView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * ETC 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesRecordView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * 매출 및 매입 세금계산서 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProductSalesVO> productSalesInvoiceView(ProductSalesVO searchVO) throws Exception;
	
	/**
	 * Project Code max 카운트 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
	public String selectDegreeCount(ProductSalesVO vo) throws Exception;
    
    /**
	 * Check Contract
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
	public List<ProductSalesVO> selectCheckContract(ProductSalesVO searchVO) throws Exception;
    
    /**
	 * 수정 시 일자 체크
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
	public String selectCheckKind(ProductSalesVO vo) throws Exception;
	
    /**
	 * 매출품의 메인정보 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
	public int productSalesConferInsert(ProductSalesVO vo) throws Exception;
    
    /**
	 * 매출품의 메인정보 저장 업데이트
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
	public void productSalesConferUpdate(ProductSalesVO vo) throws Exception;
    
    /**
	 * 매출품의 메인정보 저장 - DS
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
	public String productDSSalesRecordInsert(ProductSalesVO vo) throws Exception;
    
    /**
   	 * 매출품의 메인정보 저장 업데이트 - DS
   	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
   	 * @return String형
   	 * @exception Exception
   	 */
   	public void productDSSalesRecordUpdate(ProductSalesVO vo) throws Exception;
    
   	/**
	 * 매출품의 변경 매출매입 이력추가
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
  	public String productAlcSalesRecordHistoryInsert(ProductSalesVO vo) throws Exception; 
    
    /**
	 * 매출품의 변경 매출매입 이력추가 - 수정품의
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    public String productAlcSalesRecordHistoryModiInsert(ProductSalesVO vo) throws Exception;
    
    /**
   	 * 매출품의 변경 매출매입 이력추가 - 수정품의2
   	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
   	 * @return void형
   	 * @exception Exception
   	 */
    public String productAlcSalesRecordHistoryInsert2(ProductSalesVO vo) throws Exception;
    
	/**
	 * 매출품의 메인정보 저장 - ALC
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */    
	public int productALCSalesRecordInsert(ProductSalesVO vo) throws Exception;
	
    /**
	 * 매출품의 매출 및 매입내역 저장  -ETC
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesRecordInsert(ProductSalesVO vo) throws Exception;
	
	 /**
	 * 매출품의 매출 및 매입내역 저장 업데이트  -ETC
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesRecordUpdate(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 매출/매입 세금계산서 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesInvoiceInsert(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 매출/매입 세금계산서 저장 업데이트
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesInvoiceUpdate(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesConferDel(ProductSalesVO vo) throws Exception;
  	
    /**
	 * 매출품의 변경 매출매입 - 이력삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productAlcSalesRecordHistoryDel(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 매출 및 매입내역 삭제 - alc/ds
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productDSSalesRecordDel(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 매출 및 매입내역 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesRecordDel(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 매출/매입 세금계산서 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
	public void productSalesInvoiceDel(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 제출 - monthly 입력
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */	
	public String productSalesMonthlyInsert(ProductSalesVO vo) throws Exception;
	
	/**
	 * 매출품의 제출 - confer 업데이트
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
	public void productSalesConferFinalUpdate(ProductSalesVO vo) throws Exception;		
}
