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
package siso.usr.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.usr.service.UserInfoVO;
import siso.usr.service.UserSearchVO;
import siso.usr.service.UserService;

/**
 * @Class Name : UserServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	public SqlSession sqlSession;
	public UserMapper userMapper;
	
	public UserServiceImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
		this.userMapper = sqlSession.getMapper(UserMapper.class);
	}
	
	/**
	 * 글 목록을 조회한다.
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<UserInfoVO> selectUserList(UserSearchVO searchVO) throws Exception {
		return userMapper.selectUserList(searchVO);
	}

	/**
	 * 글 총 갯수를 조회한다.
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	@Override
	public int selectUserListTotCnt(UserSearchVO searchVO) throws Exception{
		return userMapper.selectUserListTotCnt(searchVO);
	}

}
