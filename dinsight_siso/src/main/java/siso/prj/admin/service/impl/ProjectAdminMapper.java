package siso.prj.admin.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.prj.admin.service.ProjectAdminSearchVO;
import siso.prj.admin.service.ProjectAdminVO;

/**
 * @Class Name : ProjectAdminDAO.java
 * @Description : ProjectAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ProjectAdminMapper {

	/**
	 * 영업개발상태 목록을 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectAdminVO> selectSaledevSearchList() throws Exception;
	
	/**
	 * 담당자 목록을 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProjectAdminVO> selectCustomerSearchList() throws Exception;
 
	
	/**
	 * 프로젝트 목록을 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * 
	 * @exception Exception
	 */	
	public List<ProjectAdminVO> selectProjectSearchList() throws Exception;
	
	/**
	 * 고객사명 목록을 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProjectAdminVO> selectCompanySearchList() throws Exception;

	/**
	 * 상단그리드 조회한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectAdminVO> selectProjectAdminList(ProjectAdminSearchVO searchVO) throws Exception;

	/**
	 * 글 총 갯수를 조회한다.
	 * 
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return 글 총 갯수
	 * @exception
	 */
	public int selectProjectAdminListTotCnt(ProjectAdminSearchVO searchVO) throws Exception;
		
	/**
	 * 상단 그리드 등록한다.
	 * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void projectAdminInsert(ProjectAdminSearchVO vo) throws Exception;
    
    /**
	 * 상단 그리드 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void projectAdminDel(ProjectAdminSearchVO vo) throws Exception;
    
	/**
	 * 하단 그리드 조회한다.
	 * @param vo - 조회할 정보가 담긴 searchVO
	 * @return 조회한 글
	 * @exception Exception
	 */   	
    public List<ProjectAdminVO> selectProjectAdminDetailList(ProjectAdminSearchVO searchVO) throws Exception;
	
	/**
	 * 하단 사원명 조회한다.
	 * @param vo - 조회할 정보가 담긴 searchVO
	 * @return 조회한 글
	 * @exception Exception
	 */   	
	public List<ProjectAdminVO> selectUserSearchList() throws Exception;
	
	/**
	 * 하단 그리드 등록한다.
	 * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void projectAdminDetailSave(ProjectAdminVO vo) throws Exception;
    
    /**
     * 상단 그리드 저장한다.
     * @param vo - 삭제할 정보가 담긴 ProjectAdminVO
     * @return void형
     * @exception Exception
     */
    public void projectAdminSave(ProjectAdminVO vo) throws Exception;

	/**
	 * 하단 그리드 삭제한다.
	 * @param vo - 등록할 정보가 담긴 ProjectAdminSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void projectAdminDetailDel(ProjectAdminVO vo) throws Exception;
    
}
