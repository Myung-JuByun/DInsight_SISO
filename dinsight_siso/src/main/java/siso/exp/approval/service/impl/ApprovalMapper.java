package siso.exp.approval.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.approval.service.ApprovalVO;

/**
 * @Class Name : ApprovalDAO.java
 * @Description : ApprovalDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ApprovalMapper {
	
	/**
	 * 경비승인 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ApprovalVO> selectApprovalList(ApprovalVO searchVO) throws Exception;
	
	/**
	 * PJ관리 - MH승인 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ApprovalVO> selectProjectApprovalList(ApprovalVO searchVO) throws Exception;
	
	/**
	 * 결재 승인정보 - 승인자(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateApprovalNodeOwner(ApprovalVO vo) throws Exception;
	
	/**
	 * 결재 승인정보 - 기안자(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateApprovalNodeCreator(ApprovalVO vo) throws Exception;
	
	/**
	 * 개인경비 달별 승인정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateExpanseMonthly(ApprovalVO vo) throws Exception;
	
	/**
	 * 개인경비 정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateExpanse(ApprovalVO vo) throws Exception;
	
	/**
	 * 마일리지 정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateExpanseMileage(ApprovalVO vo) throws Exception;
	
	/**
	 * 경비제출 (개인경비 달별 승인정보 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return String형
	 * @exception Exception
	 */    
	public int expanseMonthlyInsert(ApprovalVO vo) throws Exception;
    
    /**
	 * 경비제출 (개인경비 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseCopyInsert(ApprovalVO vo) throws Exception;
	
	/**
	 * 경비제출 (마일리지 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseMileageCopyInsert(ApprovalVO vo) throws Exception;
	
	/**
	 * 경비제출 (결재 요청서 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return String형
	 * @exception Exception
	 */    
	public int expanseApprovalInsert(ApprovalVO vo) throws Exception;
    
    /**
	 * 경비제출 (결재 승인정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void expanseApprovalNodeInsert(ApprovalVO vo) throws Exception;
	
}
