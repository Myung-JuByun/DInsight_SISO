package siso.adm.classification.service;

import java.util.List;

/**
 * @Class Name : UserAdminService.java
 * @Description : UserAdminService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ExpanseCategoryAdminService {
	
	/**
	 * 코드관리
	 * @param searchVO - 조회할 정보가 담긴VO
	 * @return 그룹 및 코드 리스트
	 * @exception Exception
	 */
	
	public List<ExpanseCategoryAdminVO> selectCategoryAdminList(ExpanseCategoryAdminVO searchVO) throws Exception;
	public List<ExpanseCategoryAdminVO> selectAccountComboList(ExpanseCategoryAdminVO searchVO) throws Exception;
	public void saveExpanseCategory(ExpanseCategoryAdminVO searchVO) throws Exception;
	public void deleteExpanseCategory(ExpanseCategoryAdminVO searchVO) throws Exception;
}