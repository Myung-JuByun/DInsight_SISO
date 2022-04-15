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
package siso.prj.report.service;

import java.util.List;


/**
 * @Class Name : ProjectReportService.java
 * @Description : ProjectReportService Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public interface ProjectReportService {

	/**
	 * 리스트 조회 
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectReportVO> selectProjectReportList(ProjectReportVO searchVO) throws Exception;
	
	/**
	 * MH데이터 존재 유무 체크
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    String projectReportTot(ProjectReportVO vo) throws Exception;
    
    /**
	 * 현재주의 존재하는 프로젝트카운트
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    String projectReportDateCheckTot(ProjectReportVO vo) throws Exception;
	
	/**
	 * 저장
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return void형
	 * @exception Exception
	 */
    void projectReportInsert(List<ProjectReportVO> listvo) throws Exception;
    
    /**
	 * MH제출 (MH 주별 승인정보)
	 * @param vo - 저장할 정보가 담긴 ProjectReportVO
	 * @return String형
	 * @exception Exception
	 */
    int projectReportWeeklyInsert(ProjectReportVO vo) throws Exception;
    
    /**
	 * MH 상태변경
	 * @param vo - 수정할 정보가 담긴 ProjectReportVO
	 * @return void형
	 * @exception Exception
	 */
    void projectReportFinalUpdate(ProjectReportVO vo) throws Exception;

}
