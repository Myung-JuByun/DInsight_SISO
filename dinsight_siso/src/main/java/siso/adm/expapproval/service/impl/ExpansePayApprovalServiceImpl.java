package siso.adm.expapproval.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.expapproval.service.ExpansePayApprovalService;
import siso.adm.expapproval.service.ExpansePayApprovalVO;
import siso.exp.admin.service.ExpanseAdminVO;

/**
 * @Class Name : ExpansePayApprovalServiceImpl.java
 * @Description : ExpansePayApprovalServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ExpansePayApprovalServiceImpl implements ExpansePayApprovalService {
	
	@Autowired
	public SqlSession sqlSession;	
	public ExpansePayApprovalMapper expansePayApprovalMapper;
	
	public ExpansePayApprovalServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.expansePayApprovalMapper = sqlSession.getMapper(ExpansePayApprovalMapper.class);
	}
	
	/**
	 * 부서 유저 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpansePayApprovalVO> selectDivisionUserList(ExpansePayApprovalVO searchVO) throws Exception {
		return expansePayApprovalMapper.selectDivisionUserList(searchVO);
	}
	
	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> selectExpansePayList(ExpanseAdminVO searchVO) throws Exception {
		return expansePayApprovalMapper.selectExpansePayList(searchVO);
	}
	
	/**
	 * 마일리지조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> selectExpansePayMileageList(ExpanseAdminVO searchVO) throws Exception {
		return expansePayApprovalMapper.selectExpansePayMileageList(searchVO);
	}	
	
}