package siso.adm.code.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.code.service.CodeAdminService;
import siso.adm.code.service.CodeAdminVO;

/**
 * @Class Name : CodeAdminServiceImpl.java
 * @Description : CodeAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class CodeAdminServiceImpl implements CodeAdminService {
	
	@Autowired
	public SqlSession sqlSession;	
	public CodeAdminMapper codeAdminMapper;
	
	public CodeAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.codeAdminMapper = sqlSession.getMapper(CodeAdminMapper.class);
	}
	
	@Override
	public List<CodeAdminVO> selectCmnGroupCodeList(CodeAdminVO searchVO) throws Exception {
		return codeAdminMapper.selectCmnGroupCodeList(searchVO);
	}	
	
	@Override
	public List<CodeAdminVO> selectCmnCodeList(CodeAdminVO searchVO) throws Exception {
		return codeAdminMapper.selectCmnCodeList(searchVO);
	}

	@Override
	public void saveCmnGroupCode(List<CodeAdminVO> listvo) throws Exception {
	    for (CodeAdminVO inputVo : listvo ) {
	    	codeAdminMapper.saveCmnGroupCode(inputVo);
	    }
	}

	@Override
	public void deleteCmnGroupCode(CodeAdminVO searchVO) throws Exception {
		codeAdminMapper.deleteCmnGroupCode(searchVO);
	}

	@Override
	public void saveCmnCode(List<CodeAdminVO> listvo) throws Exception {
		for (CodeAdminVO inputVo : listvo ) {
			codeAdminMapper.saveCmnCode(inputVo);
    	}
	}

	@Override
	public void deleteCmnCode(CodeAdminVO searchVO) throws Exception {
		codeAdminMapper.deleteCmnCode(searchVO);
	}

	@Override
	public void saveCmnCode(CodeAdminVO listvo) throws Exception {
		codeAdminMapper.saveCmnCode(listvo);		
	}

	@Override
	public void saveCmnGroupCode(CodeAdminVO listvo) throws Exception {
		codeAdminMapper.saveCmnGroupCode(listvo);
	}
}