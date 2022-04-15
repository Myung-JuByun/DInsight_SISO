package siso.prd.service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;


/**
 * @Class Name : AlcAdminService.java
 * @Description : AlcAdminService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface PrdService {
	
	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PrdVO> prdMainList(PrdVO searchVO) throws Exception;
	
	/**
	 * 상세리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PrdVO> prdDetailList(PrdVO searchVO) throws Exception;
	
	/**
	 * 상세리스트 - Product 조회(리비전 전체)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<PrdVO> prdDetailAllList(PrdVO searchVO) throws Exception;
	
	/**
	 * 자료올리기 년도 확인
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public String prdYearCheck(PrdVO searchVO) throws Exception;

	 /**
	 * 품목 xls 엑셀파일을 등록한다.
	 * @param file
	 * @throws Exception
	 */
	public void insertExcelGoods(InputStream file, PrdVO searchVO) throws Exception;

	/**
	 * 품목 xlsx 엑셀파일을 등록한다.
	 * @param file
	 * @return 
	 * @throws Exception
	 */
	public void insertExcelPOIGoods(InputStream file, PrdVO searchVO) throws Exception;
}