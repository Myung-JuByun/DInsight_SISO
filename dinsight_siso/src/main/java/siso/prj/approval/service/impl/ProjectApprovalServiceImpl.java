package siso.prj.approval.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.exp.approval.service.ApprovalVO;
import siso.prj.approval.service.ProjectApprovalService;
import siso.prj.approval.service.ProjectApprovalVO;
import siso.prj.report.service.ProjectReportVO;

/**
 * @Class Name : ProjectApprovalServiceImpl.java
 * @Description : ProjectApprovalServiceImpl Class
 * @Modification Information 2022.03.14
 * 
 */

@Service
public class ProjectApprovalServiceImpl implements ProjectApprovalService {

	@Autowired
	public SqlSession sqlSession;
	public ProjectApprovalMapper projectApprovalMapper;
	
	public ProjectApprovalServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.projectApprovalMapper = sqlSession.getMapper(ProjectApprovalMapper.class);
	}
    
    /**
	 * MH 승인/반려 상세보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectReportVO> projectApprovalView(ProjectApprovalVO searchVO) throws Exception {
		return projectApprovalMapper.projectApprovalView(searchVO);
	}
	
	/**
	 * MH 주별 상태 변경(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateProjectWeekly(ApprovalVO vo) throws Exception {    	
    	projectApprovalMapper.updateProjectWeekly(vo);
    }
    
    /**
	 * MH 상태 변경(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void updateProjectCommute(ApprovalVO vo) throws Exception {    	
    	projectApprovalMapper.updateProjectCommute(vo);
    }
    
    /**
	 *  MH (MH 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectCommuteCopyInsert(ApprovalVO vo) throws Exception {    	
    	projectApprovalMapper.projectCommuteCopyInsert(vo);
    }

}

