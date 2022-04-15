package siso.exp.admin.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.admin.service.ExpanseAdminVO;

/**
 * @Class Name : ExpanseAdminDAO.java
 * @Description : ExpanseAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ExpanseAdminMapper {
	
	/**
	 * 경비제출유무 확인
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public String selectExpanseStatusList(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 결제선 보기
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public String selectExpansePaymentView(ExpanseAdminVO vo) throws Exception;

	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpanseAdminVO> selectExpanseList(ExpanseAdminVO searchVO) throws Exception;

	/**
	 * 경비저장
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void expanseInsert(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 경비삭제
	 * @param vo - 삭제할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void expanseDelete(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 경비지급 요청서 결재라인 결제유무(인쇄)
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpanseAdminVO> expansePrintPayment(ExpanseAdminVO searchVO) throws Exception;
    
    /**
	 * 경비지급 요청서 표지(인쇄)
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpanseAdminVO> expansePrintTotalPrice(ExpanseAdminVO searchVO) throws Exception;
    
    /**
	 * 경비제출 (개인경비 달별 승인정보)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public int expanseFinalMonthlyInsert(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 경비제출 (개인경비 정보 수정)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseFinalUpdate(ExpanseAdminVO vo) throws Exception;
	
	/**
	 * 경비제출 (마일리지 정보 수정)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseFinalMileageUpdate(ExpanseAdminVO vo) throws Exception;
	
	/**
	 * 경비제출 (결재 요청서 저장)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */    
	public int expanseFinalApprovalInsert(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 경비제출 (개인경비 정보 수정)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseFinalApprovalNodeInsert(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 마일리지조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ExpanseAdminVO> selectExpanseMileageList(ExpanseAdminVO searchVO) throws Exception;	
    
    /**
	 * 마일리지저장
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void expanseMileageInsert(ExpanseAdminVO vo) throws Exception;
    
    /**
	 * 마일리지삭제
	 * @param vo - 삭제할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    public void expanseMileageDelete(ExpanseAdminVO vo) throws Exception;

}
