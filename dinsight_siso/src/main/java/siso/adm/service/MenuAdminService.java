package siso.adm.service;

import java.util.List;



/**
 * 
 * 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기 위한 서비스 인터페이스 
 * @author 공통서비스 개발팀 이삼섭
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.11  이삼섭          최초 생성
 *
 * </pre>
 */
public interface MenuAdminService {
	
	/**
     * 메뉴를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<ComMenuVO> selectCmmMenuList(ComMenuVO vo) throws Exception;
    
    /**
     * 메뉴를 저장한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public void inputMenuAdmin(List<ComMenuVO> comMenuListVO ) throws Exception;
    
    /**
     * 2014.08.04
	 * 메뉴정보 수정 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void updateMenuAdmin(List<ComMenuVO> comMenuListVO) throws Exception;
    
    /**
     * 2014.08.04
	 * 메뉴정보 삭제 한다
	 * @param vo ComMenuVO
	 * @return void
	 * @exception Exception
	 */
    public void deleteMenuAdmin(List<ComMenuVO> comMenuListVO) throws Exception;
    
}
