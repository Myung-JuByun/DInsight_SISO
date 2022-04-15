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
package siso.sas.status.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.sas.status.service.SalesStatusInfoVO;
import siso.sas.status.service.SalesStatusSearchVO;
import siso.sas.status.service.SalesStatusService;

/**
 * @Class Name : EgovSampleServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information
 * 
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service
public class SalesStatusServiceImpl implements SalesStatusService {
	
	@Autowired
	public SqlSession sqlSession;
	public SalesStatusMapper salesStatusMapper;
	
	public SalesStatusServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.salesStatusMapper = sqlSession.getMapper(SalesStatusMapper.class);
	}
	
	/**
	 * 담당영업 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<SalesStatusInfoVO> selectSalesUserList() throws Exception{
    	return salesStatusMapper.selectSalesUserList();
    }
	
	 /**
	 * 고객사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    @Override
	public List<SalesStatusInfoVO> selectSalesList(SalesStatusSearchVO searchVO) throws Exception {
        return salesStatusMapper.selectSalesList(searchVO);
    }

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    @Override
	public int selectSalesListTotCnt(SalesStatusSearchVO searchVO) throws Exception{
		return salesStatusMapper.selectSalesListTotCnt(searchVO);
	}
    
    /**
	 * 등록한다.
	 * @param List<ExpanseInfoVO> - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public void insertSalesAdmin(SalesStatusInfoVO vo) throws Exception {
    	salesStatusMapper.insertSalesAdmin(vo);
    }
        
    /**
	 * 삭제한다.
	 * @param List<ExpanseInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public void deleteSalesAdmin(SalesStatusInfoVO vo) throws Exception {
    	salesStatusMapper.deleteSalesAdmin(vo);
    }   
     
}
