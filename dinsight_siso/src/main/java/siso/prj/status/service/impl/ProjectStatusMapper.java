package siso.prj.status.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.prj.status.service.ProjectStatusSearchVO;
import siso.prj.status.service.ProjectStatusVO;


@Component
public interface ProjectStatusMapper{

	public List<ProjectStatusVO> selectStatusSearchList(ProjectStatusSearchVO searchVo) throws Exception;
	
	public List<ProjectStatusSearchVO> selectProjectMemberList() throws Exception;
	
}
