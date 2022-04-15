package siso.cmmn.cmm.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.adm.service.ComMenuVO;
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.ComDefaultVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.sas.product.service.ProductSalesVO;

/**
 * @Class Name : CmmUseMapper.java
 * @Description : 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기위한 데이터 접근 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 11.     이삼섭
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */


@Component
public interface CmmUseMapper {

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
     * 메뉴정보 콤보를 조회한다.
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
