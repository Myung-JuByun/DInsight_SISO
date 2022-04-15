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
package siso.sas.admin.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.sas.admin.service.SalesAdminInfoVO;
import siso.sas.admin.service.SalesAdminSearchVO;
import siso.sas.admin.service.SalesAdminService;

/**
 * @Class Name : EgovSampleServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service
public class SalesAdminServiceImpl implements SalesAdminService {
	
	@Autowired
	public SqlSession sqlSession;
	public SalesAdminMapper salesAdminMapper;
	
	public SalesAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.salesAdminMapper = sqlSession.getMapper(SalesAdminMapper.class);
	}
	
	/**
	 * 담당영업 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<SalesAdminInfoVO> selectSalesUserList() throws Exception{
    	return salesAdminMapper.selectSalesUserList();
    }
    
	/**
	 * 고객사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<SalesAdminInfoVO> selectSalesCompanyList() throws Exception{
    	return salesAdminMapper.selectSalesCompanyList();
    }
	
	 /**
	 * 고객사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    @Override
	public List<SalesAdminInfoVO> selectSalesAdminList(SalesAdminSearchVO searchVO) throws Exception {
        return salesAdminMapper.selectSalesAdminList(searchVO);
    }

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    @Override
	public int selectSalesAdminListTotCnt(SalesAdminSearchVO searchVO) throws Exception{
		return salesAdminMapper.selectSalesAdminListTotCnt(searchVO);
	}
    
    /**
	 * 등록한다.
	 * @param List<ExpanseInfoVO> - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public void insertSalesAdmin(SalesAdminInfoVO vo) throws Exception {
    	salesAdminMapper.insertSalesAdmin(vo);
    }
        
    /**
	 * 삭제한다.
	 * @param List<ExpanseInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public void deleteSalesAdmin(SalesAdminInfoVO vo) throws Exception {
    	salesAdminMapper.deleteSalesAdmin(vo);
    }
    
    /**
	 * 엑셀파일을 등록한다.
	 * @param InputStream
	 * @throws Exception
	 
	public void insertExcelCustomerAdmin(InputStream file) throws Exception {
		//expanseDAO.insertExcelZip();
		testsalesExcelService.uploadExcel("RdnmadZipDAO.insertExcelZip", file, 1, (long) 5000);		
	}*/
     
}
