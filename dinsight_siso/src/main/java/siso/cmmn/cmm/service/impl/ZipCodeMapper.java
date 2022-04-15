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
package siso.cmmn.cmm.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.cmmn.cmm.service.ZipCodeVO;

/**
 * @Class Name : SampleDAO.java
 * @Description : Sample DAO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.05.13           최초생성
 *
 * @author 주소검색
 * @since 2015. 05. 13
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface ZipCodeMapper {

    /**
	 * 주소검색 결과
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 주소 목록
	 * @exception Exception
	 */	
	public List<ZipCodeVO> selectZipCodeList(ZipCodeVO searchVO) throws Exception;
	
	 /**
	 * 20160607 이후 추가 도로명 주소검색 결과 
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 주소 목록
	 * @exception Exception
	 */	
	public List<ZipCodeVO> selectZipCodeListRoad(ZipCodeVO searchVO) throws Exception;
	
	/**
	 * 20160607 이후 추가 지번 주소검색 결과 
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 주소 목록
	 * @exception Exception
	 */	
	public List<ZipCodeVO> selectZipCodeListBunji(ZipCodeVO searchVO) throws Exception;
	
    /**
	 * 총 갯수를 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 총 갯수
	 * @exception
	 */
	public int selectZipCodeListTotCnt(ZipCodeVO searchVO) throws Exception;
	
	/**
	 * 20160607 이후 추가 총 갯수를 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 총 갯수
	 * @exception
	 */	
	public int selectZipCodeListTotCntRoad(ZipCodeVO searchVO) throws Exception;

	/**
	 * 20160607 이후 추가 총 갯수를 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 총 갯수
	 * @exception
	 */	
	public int selectZipCodeListTotCntBunji(ZipCodeVO searchVO) throws Exception;
}
