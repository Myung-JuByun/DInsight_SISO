package siso.prj.status.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.prj.status.service.ProjectStatusSearchVO;
import siso.prj.status.service.ProjectStatusService;
import siso.prj.status.service.ProjectStatusVO;

@Service
public class ProjectStatusServiceImpl implements ProjectStatusService {
	
	@Autowired
	public SqlSession sqlSession;
	public ProjectStatusMapper projectStatusMapper;
	
	public ProjectStatusServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.projectStatusMapper = sqlSession.getMapper(ProjectStatusMapper.class);
	}
	
	@Override
	public List<ProjectStatusVO> selectStatusSearchList( ProjectStatusSearchVO searchVo ) throws Exception {
		return projectStatusMapper.selectStatusSearchList(searchVo);
	}

	@Override
	public List<ProjectStatusSearchVO> selectStatusMemberList() throws Exception {
		return projectStatusMapper.selectProjectMemberList();
	}

}
