package siso.prj.admin.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.prj.admin.service.ProjectAdminSearchVO;
import siso.prj.admin.service.ProjectAdminService;
import siso.prj.admin.service.ProjectAdminVO;
import siso.sys.service.LoginVO;

/**
 * @Class Name : ProjectAdminServiceImpl.java
 * @Description : ProjectAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ProjectAdminServiceImpl implements ProjectAdminService { 

	@Autowired
	public SqlSession sqlSession;
	public ProjectAdminMapper projectAdminMapper;
	public LoginVO loginVO;
	
	public ProjectAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.projectAdminMapper = sqlSession.getMapper(ProjectAdminMapper.class);
	}
	
	/**
     * 상단 그리드 등록한다.
     * @param vo - 삭제할 정보가 담긴 ProjectAdminVO
     * @return void형
     * @exception Exception
     */
    @Override
    public void projectAdminSave(List<ProjectAdminVO> vo) throws Exception {
    	for (ProjectAdminVO inputVo : vo ) {
    		projectAdminMapper.projectAdminSave(inputVo);
    	}
    }

	/**
	 * 영업개발상태 조회 - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectAdminVO> selectSaledevSearchList() throws Exception {
		return projectAdminMapper.selectSaledevSearchList();
	}

	/**
	 * 담당자 조회 - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectAdminVO> selectCustomerSearchList() throws Exception {
		return projectAdminMapper.selectCustomerSearchList();
	}

	/**
	 * 프로젝트 조회 - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectAdminVO> selectProjectSearchList() throws Exception {
		return projectAdminMapper.selectProjectSearchList();
	}

	/**
	 * 고객사명 조회  - selectbox 에 사용
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectAdminVO> selectCompanySearchList() throws Exception {
		return projectAdminMapper.selectCompanySearchList();
	}
 
	/**
	 * 상단그리드 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectAdminVO> selectProjectAdminList(ProjectAdminSearchVO searchVO) throws Exception {
		
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		String division_cd = "";
		String grant_id		=	loginVO.getGrant_id();
		
		division_cd = loginVO.getOperation_cd();	

		if (SpringStringUtil.isEmpty(division_cd)) {
			division_cd = loginVO.getLast_division_cd();
		}
		
		if(grant_id.indexOf("2") >= 0) {
			division_cd = "";
		}	
		
		searchVO.setDivision_cd(division_cd);
		
		return projectAdminMapper.selectProjectAdminList(searchVO);
	}

	/**
	 * 글 총 갯수를 조회한다.
	 * 
	 * @param searchVO
	 *            - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	@Override
	public int selectProjectAdminListTotCnt(ProjectAdminSearchVO searchVO) throws Exception {
		return projectAdminMapper.selectProjectAdminListTotCnt(searchVO);
	}

    /**
	 * 상단 그리드 등록한다.
	 * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectAdminInsert(ProjectAdminSearchVO vo) throws Exception {
     	projectAdminMapper.projectAdminInsert(vo);
    }

    /**
	 * 상단 그리드 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectAdminDel(ProjectAdminSearchVO vo) throws Exception {
    	projectAdminMapper.projectAdminDel(vo);
    }

	/**
	 * 하단 그리드 조회한다.
	 * @param vo - 조회할 정보가 담긴 searchVO
	 * @return 조회한 글
	 * @exception Exception
	 */
    @Override    
    public List<ProjectAdminVO> selectProjectAdminDetailList(ProjectAdminSearchVO searchVO) throws Exception {
		return projectAdminMapper.selectProjectAdminDetailList(searchVO);
	}
    /**
     * 하단 사원명 조회한다.
     * @param vo - 조회할 정보가 담긴 searchVO
     * @return 조회한 글
     * @exception Exception
     */
    @Override    
    public List<ProjectAdminVO> selectUserSearchList() throws Exception {
    	return projectAdminMapper.selectUserSearchList();
    }

    /**
	 * 하단 그리드 저장한다.
	 * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void projectAdminDetailSave(List<ProjectAdminVO> vo) throws Exception {
    	for (ProjectAdminVO inputVo : vo ) {
    		projectAdminMapper.projectAdminDetailSave(inputVo);
    	}
    }
    
    /**
     * 하단 그리드 삭제한다.
     * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
     * @return void형
     * @exception Exception
     */
    @Override
    public void projectAdminDetailDel(ProjectAdminVO vo) throws Exception {
    	projectAdminMapper.projectAdminDetailDel(vo);
    } 

}
