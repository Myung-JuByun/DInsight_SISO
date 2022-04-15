package siso.prj.approval.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.approval.service.ApprovalVO;
import siso.prj.approval.service.ProjectApprovalVO;
import siso.prj.report.service.ProjectReportVO;

/**
 * @Class Name : ProjectApprovalDAO.java
 * @Description : ProjectApprovalDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ProjectApprovalMapper {

	/**
	 * 리스트 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectReportVO> projectApprovalView(ProjectApprovalVO searchVO) throws Exception;
	
	/**
	 * MH 주별 상태 변경(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateProjectWeekly(ApprovalVO vo) throws Exception;
	
	/**
	 * MH 상태 변경(승인, 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void updateProjectCommute(ApprovalVO vo) throws Exception;
	
	/**
	 * MH (MH 정보 저장 - 반려)
	 * @param vo - 저장할 정보가 담긴 ApprovalVO
	 * @return void형
	 * @exception Exception
	 */
	public void projectCommuteCopyInsert(ApprovalVO vo) throws Exception;

}
