package siso.adm.expapproval.service;

import java.util.List;

import siso.exp.admin.service.ExpanseAdminVO;

/**
 * @Class Name : ExpansePayApprovalService.java
 * @Description : ExpansePayApprovalService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ExpansePayApprovalService {
	
	/**
	 * 부서 유저 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ExpansePayApprovalVO> selectDivisionUserList(ExpansePayApprovalVO searchVO) throws Exception;
	
	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ExpanseAdminVO> selectExpansePayList(ExpanseAdminVO searchVO) throws Exception;
	
	/**
	 * 마일리지조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ExpanseAdminVO> selectExpansePayMileageList(ExpanseAdminVO searchVO) throws Exception;
	
	/**
	 * 부서 저장/수정
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    //void userAdminDivisionInsert(UserAdminVO vo) throws Exception;
	
	/**
	 * 아이디중복 확인
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return String형
	 * @exception Exception
	 */
    //String userAdminSearchCount(UserAdminVO vo) throws Exception;
	
	/**
	 * 부서장 임명/해임
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    //void userAdminUserHeadUpdate(List<UserAdminVO> listvo) throws Exception;
    
    /**
	 * 사원 정보
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return UserAdminVO
	 * @exception Exception
	 */
	//public UserAdminVO userAdminUserInfo(UserAdminVO searchVO) throws Exception;
    
    
}