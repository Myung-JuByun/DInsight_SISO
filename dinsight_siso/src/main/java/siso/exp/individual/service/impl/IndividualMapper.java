package siso.exp.individual.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.individual.service.IndividualVO;

/**
 * @Class Name : IndividualDAO.java
 * @Description : IndividualDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface IndividualMapper {

	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<IndividualVO> individualSelectList(IndividualVO searchVO) throws Exception;
	
	/**
	 * 글 목록을 조회한다.(Excel)
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<IndividualVO> individualSelectExcelList(IndividualVO searchVO) throws Exception;

}
