package siso.adm.user.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.user.service.UserAdminService;
import siso.adm.user.service.UserAdminVO;

/**
 * @Class Name : UserAdminServiceImpl.java
 * @Description : UserAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class UserAdminServiceImpl implements UserAdminService {

	@Autowired
	public SqlSession sqlSession;
	public UserAdminMapper userAdminMapper;
	
	public UserAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.userAdminMapper = sqlSession.getMapper(UserAdminMapper.class);
	}	
	
	/**
	 * 부서 저장/수정
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void userAdminDivisionInsert(UserAdminVO vo) throws Exception {
    	userAdminMapper.userAdminDivisionInsert(vo);
    }
    
    /**
	 * 부서 삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void userAdminDivisionDelete(UserAdminVO vo) throws Exception {
    	userAdminMapper.userAdminDivisionDelete(vo);
    }
	
	/**
	 * 사원정보 저장/수정
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void userAdminUserInsert(UserAdminVO vo) throws Exception {
    	userAdminMapper.userAdminUserInsert(vo);
    }
	
	/**
	 * 아이디중복 확인
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String userAdminSearchCount(UserAdminVO vo) throws Exception {    	
    	return userAdminMapper.userAdminSearchCount(vo);
    }
    
    /**
	 * 사원 삭제
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @exception Exception
	 */
    @Override
    public void userAdminUserDelete(List<UserAdminVO> listvo) throws Exception {
    	for (UserAdminVO inputVo : listvo ) {
    		userAdminMapper.userAdminUserDelete(inputVo);
    	}
    }
    
    /**
	 * 부서장 임명/해임
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @exception Exception
	 */
    @Override
	public void userAdminUserHeadUpdate(List<UserAdminVO> listvo) throws Exception {
    	for (UserAdminVO inputVo : listvo ) {
    		userAdminMapper.userAdminUserHeadUpdate(inputVo);
    	}
    }
    
    /**
	 * 패스워드 체크
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String userAdminUserPassCheck(UserAdminVO vo) throws Exception {    	
    	return userAdminMapper.userAdminUserPassCheck(vo);
    }
    
    /**
	 * 패스워드 초기화
	 * @param vo - 정보가 담긴 UserAdminVO
	 * @exception Exception
	 */
    @Override
	public void userAdminUserPassUpdate(List<UserAdminVO> listvo) throws Exception {
    	for (UserAdminVO inputVo : listvo ) {
    		userAdminMapper.userAdminUserPassUpdate(inputVo);
    	}
    }
    
    /**
	 * 사원 정보
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return UserAdminVO
	 * @exception Exception
	 */
	@Override
	public UserAdminVO userAdminUserInfo(UserAdminVO searchVO) throws Exception {
		return userAdminMapper.userAdminUserInfo(searchVO);
	}
	
}

























