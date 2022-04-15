package siso.sam.pcode.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.sam.pcode.service.ProjectCodeVO;

/**
 * @Class Name : ProjectCodeDAO.java
 * @Description : ProjectCodeDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface ProjectCodeMapper {

	/**
	 * 영업관리 Project Code 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProjectCodeVO> projectCodeList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 영업관리 Project Code 리스트 저장
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return String형
	 * @exception Exception
	 */	
	public String projectCodeInsert(ProjectCodeVO vo) throws Exception;
	
	/**
	 * 영업관리 Project Code 삭제
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
	public void projectCodeDel(ProjectCodeVO vo) throws Exception;
	
	/**
	 * 월별 max 카운트
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return String형
	 * @exception Exception
	 */    
	public int selectMonthProjectCount(ProjectCodeVO vo) throws Exception;
    
    /**
	 * 담당영업자 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProjectCodeVO> projectDivisionUserList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 담당부서 리스트
	 * @param searchVO - 조회할 정보가 담긴 Map
	 * @return 글 목록
	 * @exception Exception
	 */	
	public List<ProjectCodeVO> projectDivisionList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 계약관리 Project Code 전환
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
	public void projectCodeSuccess(ProjectCodeVO vo) throws Exception;
		
	public int projectCount(ProjectCodeVO vo) throws Exception;
		
	public int quoteCount(ProjectCodeVO vo) throws Exception;
		
	public int contractCount(ProjectCodeVO vo) throws Exception;
	
	public int salesConferCount(ProjectCodeVO vo) throws Exception;

}
