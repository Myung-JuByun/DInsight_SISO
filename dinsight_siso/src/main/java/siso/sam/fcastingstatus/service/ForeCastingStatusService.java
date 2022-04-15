package siso.sam.fcastingstatus.service;

import java.util.List;

/**
 * @Class Name : ForeCastingStatusService.java
 * @Description : ForeCastingStatusService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ForeCastingStatusService {
	
	/**
	 * 영업관리 Forecasting 현황 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ForeCastingStatusVO> fCastingStatusList(ForeCastingStatusVO searchVO) throws Exception;
	
	/**
	 * 영업관리 Forecasting 현황 상세 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ForeCastingStatusVO> fCastingStatusDetailList(ForeCastingStatusVO searchVO) throws Exception;	
	
}