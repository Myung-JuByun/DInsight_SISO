package siso.cmmn.cmm.service;

import javax.servlet.http.HttpServletRequest;

import siso.adm.service.ComMenuVO;
import siso.cmmn.ComDefaultVO;
import siso.cmmn.ComPageInfoVO;
import siso.sys.service.LoginVO;



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
public interface SpringPageInitService {
	
	/**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 권한 및 전체정보
     */
   public ComPageInfoVO controllPageInfo(HttpServletRequest request,String jspPath) throws Exception;
   
   /**
    * @param 
    * @param 
    * @see 대메뉴 정보
    */
  public ComPageInfoVO mainMenuInfo() throws Exception;
  
	/**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 정보
     */
 	public ComPageInfoVO pageCompetenceInfo(ComMenuVO inputVO) throws Exception;
 	
    /**
    * @param inputVO
    * @param ComMenuVO
    * @see 화면관련 권한 및 전체정보
    */
	public ComPageInfoVO pageInfo(ComMenuVO inputVO) throws Exception;
	
	/**
	  * @param LoginVO
	  * @param ComMenuVO
	  * @see 화면관련 권한체크  
	  */
	public ComPageInfoVO menuCompetenceInfo(LoginVO loginVO,ComMenuVO comMenuVO) throws Exception;
	
	/**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 권한 및 전체정보
     */
   public ComDefaultVO controllPageIngInfo(HttpServletRequest request) throws Exception;
}
