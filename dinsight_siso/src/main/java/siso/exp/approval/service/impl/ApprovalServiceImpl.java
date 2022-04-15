package siso.exp.approval.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.exp.approval.service.ApprovalService;
import siso.exp.approval.service.ApprovalVO;

/**
 * @Class Name : ApprovalServiceImpl.java
 * @Description : ApprovalServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ApprovalServiceImpl implements ApprovalService {

	/** userDAO */
	@Autowired
	public SqlSession sqlSession;
	public ApprovalMapper approvalMapper;
	
	public ApprovalServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.approvalMapper = sqlSession.getMapper(ApprovalMapper.class);
	}
	
	/**
	 * 경비승인 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ApprovalVO> selectApprovalList(ApprovalVO searchVO) throws Exception {
		return approvalMapper.selectApprovalList(searchVO);
	}
	
	/**
	 * PJ관리 - MH승인 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ApprovalVO> selectProjectApprovalList(ApprovalVO searchVO) throws Exception {
		return approvalMapper.selectProjectApprovalList(searchVO);
	}
	
	/**
	 * 결재 승인정보 - 승인자(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateApprovalNodeOwner(ApprovalVO vo) throws Exception {    	
    	approvalMapper.updateApprovalNodeOwner(vo);
    }
    
    /**
	 * 결재 승인정보 - 기안자(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateApprovalNodeCreator(ApprovalVO vo) throws Exception {    	
    	approvalMapper.updateApprovalNodeCreator(vo);
    }
    
    /**
	 * 개인경비 달별 승인정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateExpanseMonthly(ApprovalVO vo) throws Exception {    	
    	approvalMapper.updateExpanseMonthly(vo);
    }
    
    /**
	 * 개인경비 정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateExpanse(ApprovalVO vo) throws Exception {    	
    	approvalMapper.updateExpanse(vo);
    }
    
    /**
	 * 마일리지 정보(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateExpanseMileage(ApprovalVO vo) throws Exception {    	
    	approvalMapper.updateExpanseMileage(vo);
    }
    
    /**
	 * 경비제출 (개인경비 달별 승인정보 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public int expanseMonthlyInsert(ApprovalVO vo) throws Exception {    	
    	return approvalMapper.expanseMonthlyInsert(vo);
    }
    
    /**
	 * 경비제출 (개인경비 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseCopyInsert(ApprovalVO vo) throws Exception {    	
    	approvalMapper.expanseCopyInsert(vo);
    }
    
    /**
	 * 경비제출 (마일리지 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseMileageCopyInsert(ApprovalVO vo) throws Exception {    	
    	approvalMapper.expanseMileageCopyInsert(vo);
    }
    
    /**
	 * 경비제출 (결재 요청서 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public int expanseApprovalInsert(ApprovalVO vo) throws Exception {    	
    	return approvalMapper.expanseApprovalInsert(vo);
    }
    
    /**
	 * 경비제출 (결재 승인정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseApprovalNodeInsert(ApprovalVO vo) throws Exception {    	
    	approvalMapper.expanseApprovalNodeInsert(vo);
    }

}
