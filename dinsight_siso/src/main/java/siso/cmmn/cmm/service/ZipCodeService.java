package siso.cmmn.cmm.service;

import java.util.List;


public interface ZipCodeService {
	
    /**
	 * 주소검색
	 * @param InputStream
	 * @throws Exception
	 */
	public List<ZipCodeVO> selectZipCodeList(ZipCodeVO searchVO) throws Exception;
	
	 /**
	 * 20160607 이후 추가 도로명 주소검색 결과 
	 * @param InputStream
	 * @throws Exception
	 */
	public List<ZipCodeVO> selectZipCodeListRoad(ZipCodeVO searchVO) throws Exception;
	
	 /**
	 * 20160607 이후 추가 지번 주소검색 결과 
	 * @param InputStream
	 * @throws Exception
	 */
	public List<ZipCodeVO> selectZipCodeListBunji(ZipCodeVO searchVO) throws Exception;
	
	/**
	 * @throws Exception 
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */	 
    int selectZipCodeListTotCnt(ZipCodeVO searchVO) throws Exception;
    
    /**
	 * @throws Exception 
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */	 
    int selectZipCodeListTotCntRoad(ZipCodeVO searchVO) throws Exception;
    
    /**
	 * @throws Exception 
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */	 
    int selectZipCodeListTotCntBunji(ZipCodeVO searchVO) throws Exception;
}
