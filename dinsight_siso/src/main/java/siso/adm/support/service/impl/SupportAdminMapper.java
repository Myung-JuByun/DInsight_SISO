package siso.adm.support.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.adm.support.service.SupportPurchaseSalesVO;
import siso.adm.support.service.SupportPurchaseVO;
import siso.adm.support.service.SupportSalesItemNameVO;
import siso.adm.support.service.SupportSalesVO;

/**
 * @Class Name : UserAdminDAO.java
 * @Description : UserAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface SupportAdminMapper {
	
	/**
	 * 매입
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void purchaseExceluploadInsert(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매입조회
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public  List<SupportPurchaseVO> purchaseSelect(SupportPurchaseVO vo) throws Exception;    
    
    /**
  	 * 매입 삭제
  	 * @param vo - 정보가 담긴 UserAdminVO
  	 * @return void형
  	 * @exception Exception
  	 */
	  public void purchaseDelete(SupportPurchaseVO vo) throws Exception;
      
    /**
	 * 매출
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void salesExceluploadInsert(SupportSalesVO vo) throws Exception;
    
    /**
	 * 매출조회
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportSalesVO> salesSelect(SupportSalesVO vo) throws Exception;
    
    /**
	 * 매출 삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void salesDelete(SupportSalesVO vo) throws Exception;
    
    /**
	 * 매입매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportPurchaseSalesVO> purchaseSalesStatus(SupportPurchaseSalesVO vo) throws Exception;
    
    /**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportSalesVO> salesStatus(SupportSalesVO vo) throws Exception;
    
    /**
	 * 매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportPurchaseVO> purchaseStatus(SupportPurchaseVO vo) throws Exception;
    
    /**
	 * 매입매출현황
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportSalesVO> salesStatusPop(SupportPurchaseSalesVO vo) throws Exception;
    
    /**
	 * 매입현황팝업
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportPurchaseVO> purchaseStatusPop(SupportPurchaseSalesVO vo) throws Exception;
    
    /**
	 * 매출현황분류코드
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public List<SupportSalesItemNameVO> item_div_name(SupportSalesVO vo) throws Exception;
}
