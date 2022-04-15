/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package siso.prj.report.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.prj.report.service.ProjectReportService;
import siso.prj.report.service.ProjectReportVO;

/**
 * @Class Name : ProjectReportServiceImpl.java
 * @Description : ProjectReportServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ProjectReportServiceImpl implements ProjectReportService {

	@Autowired
	public SqlSession sqlSession;
	public ProjectReportMapper projectReportMapper;
	
	public ProjectReportServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.projectReportMapper = sqlSession.getMapper(ProjectReportMapper.class);
	}

	/**
	 * 리스트 조회
	 * 
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectReportVO> selectProjectReportList(ProjectReportVO searchVO) throws Exception {
		return projectReportMapper.selectProjectReportList(searchVO);
	}
	
	/**
	 * MH데이터 존재 유무 체크
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String projectReportTot(ProjectReportVO vo) throws Exception {    	
    	return projectReportMapper.projectReportTot(vo);
    }
    
    /**
	 * 현재주의 존재하는 프로젝트카운트
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String projectReportDateCheckTot(ProjectReportVO vo) throws Exception {    	
    	return projectReportMapper.projectReportDateCheckTot(vo);
    }

	/**
	 * 저장
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectReportInsert(List<ProjectReportVO> listvo) throws Exception {
    	for (ProjectReportVO inputVo : listvo) {
    		projectReportMapper.projectReportInsert(inputVo);
    	}
    }
    
    /**
	 * MH제출 (MH 주별 승인정보)
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public int projectReportWeeklyInsert(ProjectReportVO vo) throws Exception {    	
    	return projectReportMapper.projectReportWeeklyInsert(vo);
    }
    
    /**
	 * MH 상태변경
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectReportFinalUpdate(ProjectReportVO vo) throws Exception {    	
    	projectReportMapper.projectReportFinalUpdate(vo);
    }

}
