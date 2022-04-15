package siso.prj.status.service;

import java.util.List;

public interface ProjectStatusService {
	
	/**
	 * 프로젝트 현황 상세 정보 조회
	 * @param searchVo		조회 정보가 담긴 VO
	 * @return				프로젝트 상세 정보.
	 * @throws Exception
	 */
	public List<ProjectStatusVO> selectStatusSearchList ( ProjectStatusSearchVO searchVo ) throws Exception;
	
	public List<ProjectStatusSearchVO> selectStatusMemberList () throws Exception;

	

}
