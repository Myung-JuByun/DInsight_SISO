package siso.adm.classification.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.classification.service.ExpanseCategoryAdminService;
import siso.adm.classification.service.ExpanseCategoryAdminVO;

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
public class ExpanseCategoryAdminServiceImpl implements ExpanseCategoryAdminService {
	
	@Autowired
	public SqlSession sqlSession;	
	public ExpanseCategoryAdminMapper expanseCategoryAdminMapper;
	
	public ExpanseCategoryAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.expanseCategoryAdminMapper = sqlSession.getMapper(ExpanseCategoryAdminMapper.class);
	}

	@Override
	public List<ExpanseCategoryAdminVO> selectCategoryAdminList(ExpanseCategoryAdminVO searchVO) throws Exception {
		return expanseCategoryAdminMapper.selectCategoryAdminList(searchVO);
	}
	
	@Override
	public List<ExpanseCategoryAdminVO> selectAccountComboList(ExpanseCategoryAdminVO searchVO) throws Exception {
		return expanseCategoryAdminMapper.selectAccountComboList(searchVO);
	}	

	@Override
	public void saveExpanseCategory(ExpanseCategoryAdminVO searchVO) throws Exception{
		expanseCategoryAdminMapper.saveExpanseCategory(searchVO);
	}

	@Override
	public void deleteExpanseCategory(ExpanseCategoryAdminVO searchVO) throws Exception {
		expanseCategoryAdminMapper.deleteExpanseCategory(searchVO);
	}	
	
}

























