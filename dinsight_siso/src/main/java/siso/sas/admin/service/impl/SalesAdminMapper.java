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


import org.springframework.stereotype.Component;
import siso.sas.admin.service.SalesAdminInfoVO;
import siso.sas.admin.service.SalesAdminSearchVO;

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
public interface SalesAdminMapper {
	
	/**
	 * 담당영업 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<SalesAdminInfoVO> selectSalesUserList() throws Exception;
    
    /**
	 * 고객사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<SalesAdminInfoVO> selectSalesCompanyList() throws Exception;
	
    /**
	 * 고객사 조회
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */    
	public List<SalesAdminInfoVO> selectSalesAdminList(SalesAdminSearchVO searchVO) throws Exception;

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 글 총 갯수
	 * @exception
	 */    
	public int selectSalesAdminListTotCnt(SalesAdminSearchVO searchVO) throws Exception;        
    
    /**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public void insertSalesAdmin(SalesAdminInfoVO vo) throws Exception;

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void deleteSalesAdmin(SalesAdminInfoVO vo) throws Exception;
}
