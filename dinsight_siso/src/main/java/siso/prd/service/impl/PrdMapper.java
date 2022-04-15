package siso.prd.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.prd.service.PrdVO;

/**
 * @Class Name : PrdDAO.java
 * @Description : PrdDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface PrdMapper{

	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PrdVO> prdMainList(PrdVO searchVO) throws Exception;
	
	/**
	 * 제품상세리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<PrdVO> prdDetailList(PrdVO searchVO) throws Exception;
	
	/**
	 * 제품상세리스트 - Product 조회(리비전 전체)
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<PrdVO> prdDetailAllList(PrdVO searchVO) throws Exception;
	
	/**
	 * 자료올리기 년도 확인
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public String prdYearCheck(PrdVO searchVO) throws Exception;
	
	/**
	 * 자료올리기 동일 제품 확인
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public String prdRevisionCheck(PrdVO searchVO) throws Exception;
	
	/**
	 * 년도별 자료 삭제
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public void prdYearDelete(PrdVO searchVO) throws Exception;
	
	/**
	 * excel 저장.
	 * @param vo - List<PrdVO>
	 * @return 엑셀저장
	 * @exception Exception
	 */
	public void insertPrdExcel(PrdVO vo) throws Exception;
}
