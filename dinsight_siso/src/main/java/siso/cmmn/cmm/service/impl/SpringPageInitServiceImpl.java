package siso.cmmn.cmm.service.impl;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.service.ComMenuVO;
import siso.adm.service.impl.MenuAdminMapper;
import siso.cmmn.ComDefaultVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.SpringPageHndlr;
import siso.cmmn.PageUrlVO;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.sys.service.LoginVO;

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
public class SpringPageInitServiceImpl implements SpringPageInitService {
	
	@Autowired
	public SqlSession sqlSession;	
	public MenuAdminMapper menuAdminMapper;
	
	@Autowired
	public SpringMessageSource springMessageSource;
	
	public SpringPageInitServiceImpl(SqlSession sqlSession, SpringMessageSource springMessageSource) {
		this.sqlSession = sqlSession;
		this.menuAdminMapper = sqlSession.getMapper(MenuAdminMapper.class);
		this.springMessageSource = springMessageSource;
	}
    
    /**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 권한 및 전체정보
     */
   public ComPageInfoVO controllPageInfo(HttpServletRequest request,String jspPath) throws Exception {
	   String[] groupIdList        =  request.getParameterValues("paramId[]"   );
	   String[] paramValueList     =  request.getParameterValues("paramValue[]");
	   String menuId               = "0";
		
		//화면관련 파라미터 설정
	   if (groupIdList != null) {
	      for (int i=0;i<groupIdList.length;i++) {
		     if ("menuId".equals(groupIdList[i])) {
			    menuId = paramValueList[i];
		     }
	      }
	   }
	   
	   ComMenuVO inputVO = new ComMenuVO();
	   
	   PageUrlVO pageUrlVO = SpringPageHndlr.pageUrlInfo(request, jspPath);
	   inputVO.setMenu_url(pageUrlVO.getPageUrl());
	   inputVO.setMenu_id(Integer.parseInt(menuId));
			   
	   ComPageInfoVO resultVo = this.pageInfo(inputVO);
	   
	   return resultVo;
   }
    /**
      * @param 
      * @param 
      * @see 대메뉴 정보 조회
      */
    public ComPageInfoVO pageInfo(ComMenuVO inputVO) throws Exception {
       ComPageInfoVO comPageInfoVO = new ComPageInfoVO();
       LoginVO loginVO              = new LoginVO();
       loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
       
       try
       {
    	  //화면정보를 조회 및 권한체크
          comPageInfoVO               = this.pageCompetenceInfo(inputVO);
          
          //대메뉴 설정
          ComMenuVO menuinputVO       = new ComMenuVO();
          menuinputVO.setUser_id(loginVO.getUser_id());
          menuinputVO.setMenu_level(1);
          List<ComMenuVO> mainMenuList = menuAdminMapper.selectCmmMenuList(menuinputVO);
          comPageInfoVO.setMainMenu(mainMenuList);
          
          //중메뉴 설정
          menuinputVO = new ComMenuVO();
          menuinputVO.setUser_id(loginVO.getUser_id());
          menuinputVO.setMenu_level(2);
          menuinputVO.setLevel1_id(comPageInfoVO.getLevel1_id());
          List<ComMenuVO> subMenuList = menuAdminMapper.selectCmmMenuList(menuinputVO);
          comPageInfoVO.setSubMenu(subMenuList);
       } catch(Exception ex) {
          comPageInfoVO = new ComPageInfoVO();
          comPageInfoVO.setError_yn(true);
          comPageInfoVO.setError_message(springMessageSource.getMessage("fail.common.msg"));
       }
                                        
       return comPageInfoVO;
    } 
    
    /**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 권한 및 전체정보
     */
   public ComPageInfoVO mainMenuInfo() throws Exception {
      ComPageInfoVO comPageInfoVO = new ComPageInfoVO();
      LoginVO loginVO              = new LoginVO();
      loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
      
      try {
    	  //대메뉴 설정
    	  ComMenuVO menuinputVO       = new ComMenuVO();        
    	  if(loginVO != null) menuinputVO.setUser_id(loginVO.getUser_id());
    	  menuinputVO.setMenu_level(1);
    	  List<ComMenuVO> mainMenuList = menuAdminMapper.selectCmmMenuList(menuinputVO);        
    	  comPageInfoVO.setMainMenu(mainMenuList);
      } catch(Exception ex) {
    	  ex.printStackTrace(); 
    	  comPageInfoVO = new ComPageInfoVO();
    	  comPageInfoVO.setError_yn(true);
    	  comPageInfoVO.setError_message(springMessageSource.getMessage("fail.common.msg"));
      }
                                       
      return comPageInfoVO;
   } 
                          
    /**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 정보
     */
    public ComPageInfoVO pageCompetenceInfo(ComMenuVO inputVO) throws Exception {
       ComPageInfoVO comPageInfoVO  = new ComPageInfoVO();
       LoginVO loginVO              = new LoginVO();
       
       try
       {
          //로그인 체크
          Boolean isAuthenticated = SpringUserDetailsHelper.isAuthenticated();
                           
          // 로그인 체크 
          if (isAuthenticated) {
             loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
             comPageInfoVO = (ComPageInfoVO) this.menuCompetenceInfo(loginVO, inputVO);
          } else {
             String errorMessage = springMessageSource.getMessage("errors.login");
             comPageInfoVO.setError_message(errorMessage);
             comPageInfoVO.setError_yn(true);
             comPageInfoVO.setMenu_url(Globals.MAIN_PAGE);
          }
                           
          comPageInfoVO.setLoginVO(loginVO);
       
       } catch(Exception ex) {
    	   comPageInfoVO = new ComPageInfoVO(); 
    	   comPageInfoVO.setError_message(ex.toString());
           comPageInfoVO.setError_yn(true);
    	   ex.printStackTrace();
       }
       
       return comPageInfoVO;
    }
    
    /**
     * @param LoginVO
     * @param ComMenuVO
     * @see 화면관련 권한체크
     */
    public ComPageInfoVO menuCompetenceInfo(LoginVO loginVO,ComMenuVO comMenuVO) throws Exception {
       ComPageInfoVO comPageInfoVO = new ComPageInfoVO();       
       Boolean  errYn   = false;
       Object[] errName = new Object[1];
       
       List<ComMenuVO> resultList = menuAdminMapper.selectCmmMenuList(comMenuVO);
       
       for (ComMenuVO comMenu : resultList) {
          String[] menuAuthorityList = new String[3];
   	      menuAuthorityList[0]       = comMenu.getMenu_authority();
          menuAuthorityList[1]       = comMenu.getLevel1_authority();
          menuAuthorityList[2]       = comMenu.getLevel2_authority();
          
          for (String menuAuthority : menuAuthorityList) {
  		     if (!SpringStringUtil.isEmpty(menuAuthority)) {
  			    if (Globals.PAGE_AUTHORITY_PART.equals(menuAuthority)) {
  		 	       if (!"01".equals(loginVO.getHead_yn())) {
  		 	          errYn      = true;
  		 	          errName[0] = Globals.PAGE_AUTHORITY_PART_NAME;
  		 	       }
  		 	    } else if (Globals.PAGE_AUTHORITY_SALES.equals(menuAuthority)) {
  		 	       if (!"01".equals(loginVO.getSales_yn())) {
  		 	          errYn      = true;
  		 	          errName[0] = Globals.PAGE_AUTHORITY_SALES_NAME;
  		 	       }
  		 	    } else if (Globals.PAGE_AUTHORITY_ADMIN.equals(menuAuthority)) {
  		 	       if (!"01".equals(loginVO.getRole_cd())) {
  		 	          errYn      = true;
  		 	          errName[0] = Globals.PAGE_AUTHORITY_ADMIN_NAME;
  		 	       }
  		 	    }
  			    
  			    if (errYn) {
  	               comPageInfoVO.setError_yn(errYn);
  	               comPageInfoVO.setError_message(springMessageSource.getMessageArgs("errors.competence",errName,Locale.getDefault()));
  	               return comPageInfoVO;
  	            }
  		     }
  		  }
       }
       
       //화면에 권한이 있는 경우 메뉴정보를 설정
       if (resultList != null) {
    	   if (resultList.size() > 0) {
    		   comPageInfoVO.setLevel1_id  (resultList.get(resultList.size()-1).getLevel1_id()  );
               comPageInfoVO.setLevel1_name(resultList.get(resultList.size()-1).getLevel1_name());
               comPageInfoVO.setLevel2_id  (resultList.get(resultList.size()-1).getLevel2_id()  );
               comPageInfoVO.setLevel2_name(resultList.get(resultList.size()-1).getLevel2_name());
               comPageInfoVO.setMenu_level (resultList.get(resultList.size()-1).getMenu_level());
               comPageInfoVO.setMenu_url   (resultList.get(resultList.size()-1).getMenu_url());
    	   }
       }
       
       comPageInfoVO.setError_yn(errYn);
       comPageInfoVO.setError_message("");
                 
       return comPageInfoVO;
    }
    
    /**
     * @param inputVO
     * @param ComMenuVO
     * @see 화면관련 페이징 설정
     */
   public ComDefaultVO controllPageIngInfo(HttpServletRequest request) throws Exception {
	   String pageIndex            =  request.getParameter("pageIndex");
	   String recordCountPerPage   = request.getParameter("recordCountPerPage");
	   
	   ComDefaultVO defaultVO = new ComDefaultVO();
	   
	   if (!SpringStringUtil.isEmpty(pageIndex)) {
		   defaultVO.setPageIndex(Integer.parseInt(pageIndex));
	   }
	      
	   if (!SpringStringUtil.isEmpty(recordCountPerPage)) {
		   defaultVO.setRecordCountPerPage(Integer.parseInt(recordCountPerPage));
	   }
	      
	   int firstIndex = (defaultVO.getPageIndex() - 1) * defaultVO.getRecordCountPerPage();
	   
	   defaultVO.setFirstIndex(firstIndex);
	   
	   return defaultVO;
   }
}
