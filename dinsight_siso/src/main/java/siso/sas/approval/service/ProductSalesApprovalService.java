package siso.sas.approval.service;

import java.util.List;

import siso.exp.approval.service.ApprovalVO;




/**
 * @Class Name : ProductSalesApprovalService.java
 * @Description : ProductSalesApprovalService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ProductSalesApprovalService {
	
	/**
	 * 메인리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ApprovalVO> prdSalesApprovalList(ApprovalVO searchVO) throws Exception;
	
	/**
	 * 매입/매출 품의서 제출(승인)
	 * @param searchVO - 수정할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    void prdSalesApprovalPermit(ApprovalVO searchVO) throws Exception;
    
    /**
	 * 매입/매출 품의서 제출(반려)
	 * @param searchVO - 수정할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	void prdSalesApprovalCancle(ApprovalVO searchVO) throws Exception;
}