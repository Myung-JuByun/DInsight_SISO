package siso.cmmn.cmm.service;

import java.util.List;

import siso.adm.service.ComMenuVO;
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.ComDefaultVO;
import siso.sas.product.service.ProductSalesVO;



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
public interface SpringCmmUseService {
	
	 /**
     * 공통코드 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnCodeCombo(ComDefaultCodeVO vo) throws Exception;
    
    /**
     * 메뉴정보 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnMenuCombo(ComDefaultCodeVO vo) throws Exception;
    
    /**
     * 카테고리 정보 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnExpCategoryCombo(ComDefaultCodeVO vo) throws Exception;

    /**
     * 전체 공통코드 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectAllCmnCodeCombo() throws Exception;
    
    /**
     * ALC 제품 카테고리 조회
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<AlcAdminVO> selectAlcAdminProductCategorySearch(AlcAdminVO vo) throws Exception;
    
    /**
     * 매출품의 제품 카테고리 조회
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<AlcAdminVO> selectSalesProductCategorySearch(ProductSalesVO vo) throws Exception;
    
    /**
     * 권한리스트
     * 
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectGrantList() throws Exception;
    
    /**
     * 메뉴리스트
     * 
     * @return
     * @throws Exception
     */
    public List<ComMenuVO> menuList() throws Exception;
    
    /**
     * 년월주의 시작날짜 ~ 종료날짜
     * 
     * @return
     * @throws Exception
     */
    public ComDefaultVO selectWeekDate(ComDefaultVO vo) throws Exception;
}
