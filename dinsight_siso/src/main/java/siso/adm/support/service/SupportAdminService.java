package siso.adm.support.service;

import java.util.List;

/**
 * @Class Name : UserAdminService.java
 * @Description : UserAdminService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface SupportAdminService {
	
	/**
	 * 매입
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    void purchaseExcelupload(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매입조회
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportPurchaseVO> purchaseSelect(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매입삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    void purchaseDelete(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매출
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    void salesExcelupload(SupportSalesVO vo) throws Exception;
    
    /**
   	 * 매출조회
   	 * @param vo - 정보가 담긴 UserAdminVO
   	 * @return void형
   	 * @exception Exception
   	 */
    List<SupportSalesVO> salesSelect(SupportSalesVO vo) throws Exception;
       
    /**
	 * 매출삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    void salesDelete(SupportSalesVO vo) throws Exception;
    
    /**
	 * 매출매입현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportPurchaseSalesVO> purchaseSalesStatus(SupportPurchaseSalesVO vo) throws Exception;
    
    /**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportSalesVO> salesStatus(SupportSalesVO vo) throws Exception;    
    /**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    
    List<SupportPurchaseVO> purchaseStatus(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매출현황팝업
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportSalesVO> salesStatusPop(SupportPurchaseSalesVO vo) throws Exception;
    
    /**
	 * 매입현황팝업
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportPurchaseVO> purchaseStatusPop(SupportPurchaseSalesVO vo) throws Exception;  
    
    /**
	 * 매출현황분류코드
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    List<SupportSalesItemNameVO> item_div_name(SupportSalesVO vo) throws Exception;
}