package siso.adm.expapproval.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import siso.adm.expapproval.service.ExpansePayApprovalVO;
import siso.exp.admin.service.ExpanseAdminVO;

/**
 * @Class Name : ExpansePayApprovalMapper.java
 * @Description : ExpansePayApprovalMapper Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface ExpansePayApprovalMapper {
	
	/**
	 * 부서 검색
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpansePayApprovalVO> selectDivisionUserList(ExpansePayApprovalVO searchVO) throws Exception;
	
	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpanseAdminVO> selectExpansePayList(ExpanseAdminVO searchVO) throws Exception;
	
	/**
	 * 마일리지조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ExpanseAdminVO> selectExpansePayMileageList(ExpanseAdminVO searchVO) throws Exception;

}
