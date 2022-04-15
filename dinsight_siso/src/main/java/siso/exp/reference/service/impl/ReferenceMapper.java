package siso.exp.reference.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.exp.reference.service.ReferenceVO;

/**
 * @Class Name : ReferenceDAO.java
 * @Description : ReferenceDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ReferenceMapper {
	
	/**
	 * 자료실 목록 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 자료실 목록
	 * @exception Exception
	 */
	public List<ReferenceVO> selectReferenceList(ReferenceVO searchVO) throws Exception;

	/**
	 * 파일 정보 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 자료실 목록
	 * @exception Exception
	 */
	public ReferenceVO selectReferenceFileDown(ReferenceVO vo) throws Exception;

	public void saveReference(ReferenceVO vo) throws Exception;

	public void deleteReference(ReferenceVO vo) throws Exception;
}
