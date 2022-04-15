package siso.adm.classification.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.adm.classification.service.ExpanseCategoryAdminVO;

/**
 * @Class Name : ExpanseCategoryAdminMapper.java
 * @Description : ExpanseCategoryAdminMapper Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface ExpanseCategoryAdminMapper {
	
    public List<ExpanseCategoryAdminVO> selectCategoryAdminList(ExpanseCategoryAdminVO vo) throws Exception;
    
    public List<ExpanseCategoryAdminVO> selectAccountComboList(ExpanseCategoryAdminVO vo) throws Exception;
    
    public void saveExpanseCategory(ExpanseCategoryAdminVO vo) throws Exception;
	
	public void deleteExpanseCategory(ExpanseCategoryAdminVO vo) throws Exception;

}
