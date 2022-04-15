package siso.sas.approval.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.approval.service.ApprovalVO;
import siso.sas.approval.service.ProductSalesApprovalVO;

/**
 * @Class Name : ProductSalesApprovalDAO.java
 * @Description : ProductSalesApprovalDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ProductSalesApprovalMapper {

	/**
	 * 메인리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ApprovalVO> prdSalesApprovalList(ApprovalVO searchVO) throws Exception;
	
	/**
	 * 매입/매출 품의서 제출 업데이트(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateProductSalesApprovalConferMonthly(ApprovalVO vo) throws Exception;
	
	/**
	 * 매입/매출 품의서 제출 업데이트(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateProductSalesApprovalConfer(ApprovalVO vo) throws Exception;
	
	/**
	 * 매입/매출 품의서 복사 - 반려
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return String형
	 * @exception Exception
	 */    
	public int copyProductSalesApprovalConfer(ProductSalesApprovalVO vo) throws Exception;
    
    /**
	 * ETC 매입 및 매출내역 복사 - 반려
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void copyProductSalesApprovalRecord(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * DS 매입 및 매출내역 복사 - 반려
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void copyProductSalesApprovalRecordDs(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * DS 변경 매입 및 매출내역 복사 - 반려
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void copyProductSalesApprovalRecordDsChang(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * 매입/매출 세금계산서 복사 - 반려
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void copyProductSalesApprovalInvoice(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * alc 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void alcDel(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * alc update 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void alcDelUpdate(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * 다소 매입매출 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProductSalesApprovalVO> salesRecordDsList(ProductSalesApprovalVO searchVO) throws Exception;
	
	/**
	 * alc 저장 - 다소 데이터
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void
	 * @exception Exception
	 */
	public void alcDsSave(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * alc 수정 - first_alc_id, first_company_id 수정
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void alcFirstAlcIdCompanyIdModify(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * alc 수정 - 변경매입매출 기존데이터 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void alcChangeSalesRecordModify(ProductSalesApprovalVO vo) throws Exception;
	
	/**
	 * alc 저장 - 변경매입매출 데이터 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void
	 * @exception Exception
	 */
	public void alcChangeSalesRecordSave(ProductSalesApprovalVO vo) throws Exception;
    
    /**
	 * alc 히스토리 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void
	 * @exception Exception
	 */
	public void alcChangSave(ProductSalesApprovalVO vo) throws Exception;
}
