package siso.exp.reference.service;

import java.util.List;

/**
 * @Class Name : ApprovalService.java
 * @Description : ApprovalService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ReferenceService {
	
	/**
	 * 자료실목록 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ReferenceVO> selectReferenceList(ReferenceVO searchVO) throws Exception;

	/**
	 * 파일 정보 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public ReferenceVO selectReferenceFiledown(ReferenceVO searchVO) throws Exception;

	/**
	 * 파일 정보 저장
	 */
	public void saveReference(ReferenceVO searchVO) throws Exception;

	/**
	 * 파일 정보 삭제
	 */
	public void deleteReference(ReferenceVO vo) throws Exception;
}