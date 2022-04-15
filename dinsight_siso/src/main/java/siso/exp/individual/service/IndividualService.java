package siso.exp.individual.service;

import java.util.List;

/**
 * @Class Name : IndividualService.java
 * @Description : IndividualService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface IndividualService {
	
	/**
	 * 검색
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<IndividualVO> individualSelectList(IndividualVO searchVO) throws Exception;
	
	/**
	 * 검색(Excel)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<IndividualVO> individualSelectExcelList(IndividualVO searchVO) throws Exception;
}