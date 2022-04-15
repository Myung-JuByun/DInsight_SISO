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
package siso.cop.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cop.service.CustomerInfoVO;
import siso.cop.service.CustomerSearchVO;
import siso.cop.service.CustomerService;

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
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	public SqlSession sqlSession;	
	public CustomerMapper customerMapper;
	
	public CustomerServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.customerMapper = sqlSession.getMapper(CustomerMapper.class);
	}

	 /**
	 * 고객사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    @Override
	public List<CustomerInfoVO> selectCustomerList(CustomerSearchVO searchVO) throws Exception {
        return customerMapper.selectCustomerList(searchVO);
    }

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    @Override
	public int selectCustomerListTotCnt(CustomerSearchVO searchVO) throws Exception {
		return customerMapper.selectCustomerListTotCnt(searchVO);
	}
    
    /**
	 * 등록한다.
	 * @param List<ExpanseInfoVO> - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public int insertCustomerAdmin(CustomerInfoVO vo) throws Exception {
    	return customerMapper.insertCustomerAdmin(vo);
    }
        
    /**
	 * 삭제한다.
	 * @param List<ExpanseInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public String deleteCustomerAdmin(CustomerInfoVO vo) throws Exception {
    	int count = 0;
    	count = customerMapper.salesProjectCodeCount(vo);
    	if(count > 0) return "1";
    	
    	count = customerMapper.projectCount(vo);
    	if(count > 0) return "2";
    	
    	count = customerMapper.salesProjectCodeCount(vo);
    	
    	if(count > 0) return "3";
    	
    	customerMapper.deleteCustomerAdmin(vo);
    	
    	return "0";
    }
    
    /**
	 * 삭제한다.
	 * @param List<ExpanseInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
	public String deleteUploadfile(CustomerInfoVO vo) throws Exception {
    	customerMapper.deleteUploadfile(vo);
    	return "0";
    }
        
	 /**
	 * 고객사 담당자 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
   @Override
	public List<CustomerInfoVO> selectCustomerSubList(CustomerSearchVO searchVO) throws Exception {
       return customerMapper.selectCustomerSubList(searchVO);
   }
   
   /**
	 * 고객사 담당자 추가
	 * @param List<CustomerInfoVO> - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
   @Override
	public void insertCustomerSub(CustomerInfoVO vo) throws Exception {
   	customerMapper.insertCustomerSub(vo);
   }
       
   /**
	 * 고객사 담당자 삭제
	 * @param List<CustomerInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
   @Override
	public void deleteCustomerSub(CustomerInfoVO vo) throws Exception {
   	customerMapper.deleteCustomerSub(vo);
   }

	@Override
	public CustomerInfoVO selectCompanyFiledown(CustomerSearchVO vo) throws Exception {
		return customerMapper.selectCompanyFiledown(vo);
	}
	
	@Override
	public String selectCountRegNumber(CustomerSearchVO vo) throws Exception {
		return customerMapper.selectCountRegNumber(vo);
	}
	
	@Override
	public String selectCountCorporateNumber(CustomerSearchVO vo) throws Exception {
		return customerMapper.selectCountCorporateNumber(vo);
	}
    
	@Override
	public String selectCountCompanyName(CustomerSearchVO vo) throws Exception {
		return customerMapper.selectCountCompanyName(vo);
	}
	
	
	@Override
	public void insertSalesCustomer(CustomerSearchVO vo) throws Exception {
    	customerMapper.insertSalesCustomer(vo);
    }
	
	@Override
	public void deleteSalesCustomer(CustomerSearchVO vo) throws Exception {
    	customerMapper.deleteSalesCustomer(vo);
    }
	
}
