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
package siso.exp.service;

import java.io.InputStream;
import java.util.List;

/**
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
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
public interface ExpanseService {

	/**
	 * 경비을 등록,수정,삭제한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void inputExpanseAdmin(List<ExpanseInfoVO> listvo) throws Exception;
    
	/**
	 * 개인경비을 수정한다.
	 * @param List<ExpanseInfoVO> - 수정할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public void updateExpanseAdmin(List<ExpanseInfoVO> listvo) throws Exception;
    	
    
    /**
	 * 개인경비을 삭제한다.
	 * @param List<ExpanseInfoVO> - 삭제할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public void deleteExpanseAdmin(List<ExpanseInfoVO> listvo) throws Exception;
    
    /**
	 * 경비 엑셀파일을 등록한다.
	 * @param InputStream
	 * @throws Exception
	 */
	public void insertExcelExpanseAdmin(InputStream file) throws Exception;

    

    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<ExpanseInfoVO> selectExpanseList(ExpSearchVO searchVO) throws Exception;

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    int selectExpanseListTotCnt(ExpSearchVO searchVO) throws Exception;
	

}
