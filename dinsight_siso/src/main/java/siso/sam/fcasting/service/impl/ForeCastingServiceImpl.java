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
package siso.sam.fcasting.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sam.fcasting.service.ForeCastingService;
import siso.sam.fcasting.service.ForeCastingVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sys.service.LoginVO;

/**
 * @Class Name : ForeCastingServiceImpl.java
 * @Description : ForeCastingServiceImpl.Class
 */

@Service
public class ForeCastingServiceImpl implements ForeCastingService {
	
	@Autowired
	public SqlSession sqlSession;
	public ForeCastingMapper forecastingMapper;	
	public LoginVO loginVO;
	
	/** ProjectCodeService */
	@Autowired
	public ProjectCodeService projectCodeService;
	
	public ForeCastingServiceImpl(SqlSession sqlSession, ProjectCodeService projectCodeService){
		this.sqlSession = sqlSession;
		this.forecastingMapper = sqlSession.getMapper(ForeCastingMapper.class);
		this.projectCodeService = projectCodeService;
	}
	
	@Override
	public List<ForeCastingVO> selectForeCastingList(ForeCastingVO forecastingvo)
			throws Exception {
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		String grant_id		=	loginVO.getGrant_id();
		String user_role_id = forecastingMapper.selectForeCastingRole(forecastingvo);
		String division_cd = "";
		
		if(user_role_id.indexOf("4") >= 0 || user_role_id.indexOf("5") >= 0) {
			//부서장, 임원
			division_cd = loginVO.getLast_division_cd();
		}else {
			//영업, 일반, 관리자, 오퍼레이터, 팀장
			division_cd = loginVO.getOperation_cd();
		}		

		if(grant_id.indexOf("2") >= 0) {
			user_role_id = "";
			division_cd = "1101";
		}	
		
		if (SpringStringUtil.isEmpty(division_cd)) {
			division_cd = loginVO.getLast_division_cd();
		}
		
		List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);
		
		forecastingvo.setUser_role_id(user_role_id);
		forecastingvo.setDivision_child_list(divisionChild);
		return forecastingMapper.selectForeCastingList(forecastingvo);
	}

	@Override
	public List<ForeCastingVO> foreCastingListCopy(ForeCastingVO forecastingvo)
			throws Exception {
		return forecastingMapper.foreCastingListCopy(forecastingvo);
	}

	@Override
	public void foreCastingSave(ForeCastingVO forecastingvo) throws Exception {
		forecastingMapper.foreCastingSave(forecastingvo);
	}

	@Override
	public void foreCastingListDelete(ForeCastingVO forecastingvo) throws Exception {
		forecastingMapper.foreCastingListDelete(forecastingvo);
	}

	@Override
	public List<ForeCastingVO> selectForeCastingIssue(ForeCastingVO forecastingvo) throws Exception {
		return forecastingMapper.selectForeCastingIssue(forecastingvo);
		
	}

	@Override
	public void foreCastingIssueSave(ForeCastingVO forecastingvo) throws Exception {
		forecastingMapper.foreCastingIssueSave(forecastingvo);
		
	}

	@Override
	public void foreCastingIssueDelete(ForeCastingVO forecastingvo) throws Exception {
		forecastingMapper.foreCastingIssueDelete(forecastingvo);
	}
	
	@Override
	public ForeCastingVO foreCastingAutoSaveWeekCheck(ForeCastingVO forecastingvo) throws Exception {
		return forecastingMapper.foreCastingAutoSaveWeekCheck(forecastingvo);
		
	}
	
	@Override
	public void foreCastingAutoSave(ForeCastingVO forecastingvo) throws Exception {
		forecastingMapper.foreCastingAutoSave(forecastingvo);
	}
}
