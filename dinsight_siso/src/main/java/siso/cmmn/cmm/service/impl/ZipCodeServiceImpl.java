package siso.cmmn.cmm.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.cmm.service.ZipCodeService;
import siso.cmmn.cmm.service.ZipCodeVO;

/**
 * @Class Name : ExpanseAdminServiceImpl.java
 * @Description : ExpanseAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ZipCodeServiceImpl implements ZipCodeService {
	
	@Autowired
	public SqlSession sqlSession;	
	public ZipCodeMapper zipcodeMapper;
	
	public ZipCodeServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.zipcodeMapper = sqlSession.getMapper(ZipCodeMapper.class);
	}
    
	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ZipCodeVO> selectZipCodeList(ZipCodeVO searchVO) throws Exception {
		return zipcodeMapper.selectZipCodeList(searchVO);
	}
	
	@Override
	public List<ZipCodeVO> selectZipCodeListRoad(ZipCodeVO searchVO) throws Exception {
		return zipcodeMapper.selectZipCodeListRoad(searchVO);
	}

	@Override
	public List<ZipCodeVO> selectZipCodeListBunji(ZipCodeVO searchVO) throws Exception {
		return zipcodeMapper.selectZipCodeListBunji(searchVO);
	}
	
    @Override
	public int selectZipCodeListTotCnt(ZipCodeVO searchVO)  throws Exception {
		return zipcodeMapper.selectZipCodeListTotCnt(searchVO);
	}
    
    @Override
	public int selectZipCodeListTotCntRoad(ZipCodeVO searchVO)  throws Exception {
		return zipcodeMapper.selectZipCodeListTotCntRoad(searchVO);
	}
    
    @Override
	public int selectZipCodeListTotCntBunji(ZipCodeVO searchVO)  throws Exception {
		return zipcodeMapper.selectZipCodeListTotCntBunji(searchVO);
	}
}
