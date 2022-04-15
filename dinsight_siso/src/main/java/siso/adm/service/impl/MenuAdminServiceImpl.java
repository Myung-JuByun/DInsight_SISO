package siso.adm.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.service.ComMenuVO;
import siso.adm.service.MenuAdminService;

@Service
public class MenuAdminServiceImpl implements MenuAdminService {

	@Autowired
	public SqlSession sqlSession;
	public MenuAdminMapper menuAdminMapper;
    
	public MenuAdminServiceImpl(SqlSession sqlSession){
    	this.sqlSession = sqlSession;
    	this.menuAdminMapper = sqlSession.getMapper(MenuAdminMapper.class);
    }

    /**
     * 메뉴를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<ComMenuVO> selectCmmMenuList(ComMenuVO vo) throws Exception {
	   return menuAdminMapper.selectCmmMenuList(vo);
    }
    
    
    /**
     * 메뉴를 저장,수정,삭제한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public void inputMenuAdmin(List<ComMenuVO> comMenuListVO ) throws Exception {
    	
    	for (ComMenuVO inputVo : comMenuListVO ) {
    		if ("I".equals(inputVo.getDataMode()))
    			menuAdminMapper.insertMenuAdmin(inputVo);
    		else if ("U".equals(inputVo.getDataMode()))
    			menuAdminMapper.updateMenuAdmin(inputVo);
    		else if ("D".equals(inputVo.getDataMode()))
    			menuAdminMapper.deleteMenuAdmin(inputVo);    		
    	}
    }
    
    /**
	 * 메뉴정보 수정 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void updateMenuAdmin(List<ComMenuVO> comMenuListVO) throws Exception {
    	for (ComMenuVO inputVo : comMenuListVO ) {
    		menuAdminMapper.updateMenuAdmin(inputVo);
    	}
    }
    
    /** 
	 * 메뉴정보 삭제 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void deleteMenuAdmin(List<ComMenuVO> comMenuListVO) throws Exception {
    	for (ComMenuVO inputVo : comMenuListVO ) {
    		menuAdminMapper.deleteMenuAdmin(inputVo);
    	}
    }
}
