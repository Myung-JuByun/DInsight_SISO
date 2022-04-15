package siso.cmmn.cmm.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.service.ComMenuVO;
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.ComDefaultVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.sas.product.service.ProductSalesVO;

/**
 * @Class Name : EgovCmmUseServiceImpl.java
 * @Description : 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기위한 서비스 구현 클래스
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
@Service
public class SpringCmmUseServiceImpl implements SpringCmmUseService {
	
	@Autowired
	public SqlSession sqlSession;
	public CmmUseMapper cmmUseMapper;
	
	public SpringCmmUseServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.cmmUseMapper = sqlSession.getMapper(CmmUseMapper.class);
	}

    /**
     * 공통코드 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnCodeCombo(ComDefaultCodeVO vo) throws Exception {
    	return cmmUseMapper.selectCmnCodeCombo(vo);
    }
    
    /**
     * 메뉴정보 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnMenuCombo(ComDefaultCodeVO vo) throws Exception {
    	return cmmUseMapper.selectCmnMenuCombo(vo);
    }
    
    /**
     * 카테고리 정보 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectCmnExpCategoryCombo(ComDefaultCodeVO vo) throws Exception {
    	return cmmUseMapper.selectCmnExpCategoryCombo(vo);
    }
    
    /**
     * 전체 공통코드 콤보를 조회한다.
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectAllCmnCodeCombo() throws Exception {	    	
		return cmmUseMapper.selectAllCmnCodeCombo();
    }
    
    /**
     * ALC 제품 카테고리 조회
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<AlcAdminVO> selectAlcAdminProductCategorySearch(AlcAdminVO vo) throws Exception {
    	return cmmUseMapper.selectAlcAdminProductCategorySearch(vo);
    }
    
    /**
     * 매출품의 제품 카테고리 조회
     * 
     * @param vo
     * @return
     * @throws Exception
     */
    public List<AlcAdminVO> selectSalesProductCategorySearch(ProductSalesVO vo) throws Exception {
    	return cmmUseMapper.selectSalesProductCategorySearch(vo);
    }
    
    /**
     * 권한리스트
     * 
     * @return
     * @throws Exception
     */
    public List<CmmnDetailCode> selectGrantList() throws Exception {
    	return cmmUseMapper.selectGrantList();
    }
    
    /**
     * 메뉴리스트
     * 
     * @return
     * @throws Exception
     */
    public List<ComMenuVO> menuList() throws Exception {
    	return cmmUseMapper.menuList();
    }
    
    /**
     * 년월주의 시작날짜 ~ 종료날짜
     * 
     * @return
     * @throws Exception
     */
    public ComDefaultVO selectWeekDate(ComDefaultVO vo) throws Exception {
    	return cmmUseMapper.selectWeekDate(vo);
    }
}
