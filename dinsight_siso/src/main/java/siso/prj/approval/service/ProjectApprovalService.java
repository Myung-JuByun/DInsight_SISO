package siso.prj.approval.service;

import java.util.List;

import siso.exp.approval.service.ApprovalVO;
import siso.prj.report.service.ProjectReportVO;


/**
 * @Class Name : ProjectApprovalService.java
 * @Description : ProjectApprovalService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ProjectApprovalService {
	
	/**
	 * MH 승인/반려 상세보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectReportVO> projectApprovalView(ProjectApprovalVO searchVO) throws Exception;
	
	/**
	 * MH 주별 상태 변경(승인, 반려)
	 * @param vo - 수정할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    void updateProjectWeekly(ApprovalVO vo) throws Exception;
    
    /**
	 * MH 상태 변경(승인, 반려)
	 * @param vo - 수정할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    void updateProjectCommute(ApprovalVO vo) throws Exception;
    
    /**
	 * MH (MH 정보 저장 - 반려)
	 * @param vo - 수정할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    void projectCommuteCopyInsert(ApprovalVO vo) throws Exception;
    
}