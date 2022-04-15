package siso.sam.pcode.service;

import java.util.HashMap;
import java.util.List;

import siso.sys.service.LoginVO;

/**
 * @Class Name : ProjectCodeService.java
 * @Description : ProjectCodeService Class
 * @Modification Information 2014.10.23 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

public interface ProjectCodeService {
	
	/**
	 * 영업관리 Project Code 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectCodeVO> projectCodeList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 영업관리 Project Code 리스트 저장
	 * @param vo - 수정할 정보가 담긴 ProjectCodeVO
	 * @return String 형
	 * @exception Exception
	 */
	String projectCodeInsert(ProjectCodeVO listvo) throws Exception;
    
    /**
	 * 영업관리 Project Code 삭제
	 * @param vo - 수정할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
    //void projectCodeDel(ProjectCodeVO vo) throws Exception;
    HashMap<String, Object> projectCodeDel(List<ProjectCodeVO> listvo) throws Exception;
    
    /**
	 * 월별 max 카운트
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return int형
	 * @exception Exception
	 */
    int selectMonthProjectCount(ProjectCodeVO vo) throws Exception;
    
    /**
	 * 담당영업자 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectCodeVO> projectDivisionUserList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 담당부서 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<ProjectCodeVO> projectDivisionList(ProjectCodeVO searchVO) throws Exception;
	
	/**
	 * 담당부서 리스트(하위부서 모두 포함)
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<String> projectDivisionChildList(LoginVO loginVO) throws Exception;
	
	/**
	 * 계약관리 Project Code 전환
	 * @param vo - 수정할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
    void projectCodeSuccess(List<ProjectCodeVO> listvo) throws Exception;
}