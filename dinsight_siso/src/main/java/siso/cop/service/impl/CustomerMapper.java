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


import org.springframework.stereotype.Component;
import siso.cop.service.CustomerInfoVO;
import siso.cop.service.CustomerSearchVO;

/**
 * @Class Name : SampleDAO.java
 * @Description : Sample DAO Class
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


@Component
public interface CustomerMapper {

    /**
	 * 고객사 조회
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<CustomerInfoVO> selectCustomerList(CustomerSearchVO searchVO) throws Exception;

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 글 총 갯수
	 * @exception
	 */
	public int selectCustomerListTotCnt(CustomerSearchVO searchVO) throws Exception;
    
    /**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertCustomerAdmin(CustomerInfoVO vo) throws Exception;

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void deleteCustomerAdmin(CustomerInfoVO vo) throws Exception;
    
    /**
   	 * 업로드파일을 삭제한다.
   	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
   	 * @return void형
   	 * @exception Exception
   	 */
	public void deleteUploadfile(CustomerInfoVO vo) throws Exception;
    
    /**
	 * 담당자를 조회한다
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public List<CustomerInfoVO> selectCustomerSubList(CustomerSearchVO searchVO) throws Exception;
    
    /**
	 * 담당자를 등록한다.
	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public void insertCustomerSub(CustomerInfoVO vo) throws Exception;

    /**
	 * 담당자를 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void deleteCustomerSub(CustomerInfoVO vo) throws Exception;
    
	public CustomerInfoVO selectCompanyFiledown(CustomerSearchVO vo) throws Exception;
	
	public String selectCountRegNumber(CustomerSearchVO searchVO) throws Exception;
	
	public String selectCountCorporateNumber(CustomerSearchVO searchVO) throws Exception;
	
	public String selectCountCompanyName(CustomerSearchVO searchVO) throws Exception;
	    
    public int salesProjectCodeCount(CustomerInfoVO searchVO) throws Exception;
  
	public int projectCount(CustomerInfoVO searchVO) throws Exception;        
    
    public int salesConferCount(CustomerInfoVO searchVO) throws Exception;
    
    /**
   	 * 글을 등록한다.
   	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
   	 * @return 등록 결과
   	 * @exception Exception
	 */
	public String insertSalesCustomer(CustomerSearchVO vo) throws Exception;
	
	/**
   	 * 글을 등록한다.
   	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
   	 * @return 등록 결과
   	 * @exception Exception
	 */
	public void deleteSalesCustomer(CustomerSearchVO vo) throws Exception;
}
