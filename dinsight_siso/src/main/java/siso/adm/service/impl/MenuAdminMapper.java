package siso.adm.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import siso.adm.service.ComMenuVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;

@Component
public interface MenuAdminMapper {		
    
    /** 
	 * 메뉴정보 조회한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
    public List<ComMenuVO> selectCmmMenuList(ComMenuVO vo) throws Exception;
    
    /** 
	 * 메뉴정보 저장한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void insertMenuAdmin(ComMenuVO vo) throws Exception;
    
    /**
	 * 메뉴정보 수정 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void updateMenuAdmin(ComMenuVO vo) throws Exception;
    
    /**    
	 * 메뉴정보 삭제 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void deleteMenuAdmin(ComMenuVO vo) throws Exception;
    
    public List<CmmnDetailCode> selectCmmCodeDetail(ComDefaultCodeVO vo) throws Exception;
    
    public List<CmmnDetailCode> selectGroupIdDetail(ComDefaultCodeVO vo) throws Exception;
}
