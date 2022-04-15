package siso.adm.code.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import siso.adm.code.service.CodeAdminVO;

/**
 * @Class Name : UserAdminDAO.java
 * @Description : UserAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Component
public interface CodeAdminMapper {

	public List<CodeAdminVO> selectCmnGroupCodeList(CodeAdminVO searchVO) throws Exception;
	
	public List<CodeAdminVO> selectCmnCodeList(CodeAdminVO searchVO) throws Exception;
		
	public void saveCmnGroupCode(CodeAdminVO vo) throws Exception;	

	public void deleteCmnGroupCode(CodeAdminVO vo) throws Exception;
	
	public void saveCmnCode(CodeAdminVO vo) throws Exception;

	public void deleteCmnCode(CodeAdminVO vo) throws Exception;

}
