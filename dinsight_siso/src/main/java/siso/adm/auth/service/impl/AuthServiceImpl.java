package siso.adm.auth.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.auth.service.AuthService;
import siso.adm.auth.service.AuthVO;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sys.service.LoginVO;

/**
 * @Class Name : AuthServiceImpl.java
 * @Description : AuthServiceImpl.Class
 */

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	public SqlSession sqlSession;
	public AuthMapper authMapper;	
	public LoginVO loginVO;
	
	public AuthServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.authMapper = sqlSession.getMapper(AuthMapper.class);		
	}
		
	/**
	 * 설정권한보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AuthVO> authViewList(AuthVO searchVO) throws Exception {
		return authMapper.authViewList(searchVO);
	}
	
	/**
	 * 설정권한 저장
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authViewSave(AuthVO searchVO) throws Exception {
    	
    	//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
    	
    	String grant_id = searchVO.getGrant_id();
    	String user_id = "";
    	    	    	
    	for(int cnt=0; cnt<searchVO.getIn_user_id().length; cnt++){
    		
    		AuthVO authVO = new AuthVO();
    		
    		user_id = searchVO.getIn_user_id()[cnt];
    		
    		authVO.setGrant_id(grant_id);
    		authVO.setUser_id(user_id);    		
    		authVO.setCreator(login_id);    		
    		authMapper.authViewSave(authVO);
    	}    	    	    	
    }
	
	/**
	 * 설정권한 삭제
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authViewDel(AuthVO searchVO) throws Exception {
    	
    	for(int cnt=0; cnt<searchVO.getIn_grant_user_id().length; cnt++){
    		
    		AuthVO authVO = new AuthVO();
    		
    		String ArrayInfo[] = searchVO.getIn_grant_user_id()[cnt].split("@");
    		
    		authVO.setGrant_id(ArrayInfo[0]);
    		authVO.setUser_id(ArrayInfo[1]);    		
    		authMapper.authViewDel(authVO);
    	}    	
    }
    
    /**
	 * 메뉴설정권한 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AuthVO> menuAuthSaveList(AuthVO searchVO) throws Exception {
		return authMapper.menuAuthSaveList(searchVO);
	}
	
	/**
	 * 메뉴권한 설정 저장
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authMenuSave(AuthVO searchVO) throws Exception {
    	
    	//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
    	
    	String grant_id = searchVO.getGrant_id();
    	String menu_id = "";
    	
    	List<AuthVO> mainListVO = authMapper.menuAuthSaveList(searchVO);    	
    	
    	//저장모드
    	String saveMode="Y";    	
    	for(int cnt=0; cnt<searchVO.getIn_menu_id().length; cnt++){   		
    		
    		menu_id = searchVO.getIn_menu_id()[cnt];
    		
    		for(int subCnt=0; subCnt<mainListVO.size(); subCnt++){
    			
    			if(mainListVO.get(subCnt).getMenu_id().equals(menu_id) && mainListVO.get(subCnt).getGrant_id().equals(grant_id)){
    				saveMode="N";
    				continue;
    			}
    		}
    		
    		if(saveMode.equals("Y")){
	    		AuthVO authVO = new AuthVO();
	    		
	    		authVO.setGrant_id(grant_id);
	    		authVO.setMenu_id(menu_id);    		
	    		authVO.setCreator(login_id);
	    		
	    		authMapper.authMenuSave(authVO);
    		}
    	}    	    	
    }
	
	/**
	 * 메뉴설정권한 삭제
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authMenuDel(AuthVO searchVO) throws Exception {    	
    	for(int cnt=0; cnt<searchVO.getIn_menu_id().length; cnt++){
    		
    		AuthVO authVO = new AuthVO();
    		
    		String ArrayInfo[] = searchVO.getIn_menu_id()[cnt].split("@");
    		
    		authVO.setGrant_id(ArrayInfo[0]);
    		authVO.setMenu_id(ArrayInfo[1]);    		
    		authMapper.authMenuDel(authVO);
    	}    	    	
    }
    
    /**
	 * 권한 저장
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authSave(AuthVO searchVO) throws Exception {
    	
    	//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setCreator(login_id);
    	
    	//저장
    	authMapper.authSave(searchVO);
    }
    
    /**
	 * 권한 삭제
	 * @param searchVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void authDel(AuthVO searchVO) throws Exception {
    	
    	//삭제
    	authMapper.authViewDel(searchVO);
    	authMapper.authDel(searchVO);
    }
}
