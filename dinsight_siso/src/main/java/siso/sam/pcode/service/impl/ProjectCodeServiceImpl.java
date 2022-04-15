package siso.sam.pcode.service.impl;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.util.BusinessUtil;
import siso.cmmn.util.SpringStringUtil;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
import siso.sys.service.LoginVO;

/**
 * @Class Name : ProjectCodeServiceImpl.java
 * @Description : ProjectCodeServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ProjectCodeServiceImpl implements ProjectCodeService {
	
	@Autowired
	public SqlSession sqlSession;
	public ProjectCodeMapper projectCodeMapper;
	
	@Autowired
	public PaymentService paymentService;
	
	public ProjectCodeServiceImpl(SqlSession sqlSession, PaymentService paymentService){
		this.sqlSession = sqlSession;
		this.projectCodeMapper = sqlSession.getMapper(ProjectCodeMapper.class);
		this.paymentService = paymentService;
	}
			
	/**
	 * 영업관리 Project Code 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectCodeVO> projectCodeList(ProjectCodeVO searchVO) throws Exception {
		return projectCodeMapper.projectCodeList(searchVO);
	}
	
	/**
	 * 영업관리 Project Code 리스트 저장
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return String
	 * @exception Exception
	 */
    @Override
	public String projectCodeInsert(ProjectCodeVO vo) throws Exception {
    	return projectCodeMapper.projectCodeInsert(vo);
    }
    
    /**
	 * 영업관리 Project Code 삭제
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	/*public void projectCodeDel(ProjectCodeVO vo) throws Exception {    	
    	projectCodeDAO.projectCodeDel(vo);
    }*/
    public HashMap<String, Object> projectCodeDel(List<ProjectCodeVO> listvo) throws Exception {
    	int count = 0;
    	String resultCode = "0";
    	HashMap<String, Object> resultMap = new HashMap<String, Object>();
    	ProjectCodeVO projectcodevo = new ProjectCodeVO();
    	for (ProjectCodeVO inputVo : listvo) {
    		count = projectCodeMapper.projectCount(inputVo);
    		if(count > 0){
    			resultCode = "1";
    			projectcodevo = inputVo;
    			break;
    		}
    	}
    	
    	if("0".equals(resultCode)){
	    	for (ProjectCodeVO inputVo : listvo) {
	    		count = projectCodeMapper.quoteCount(inputVo);
	    		if(count > 0){
	    			resultCode = "2";
	    			projectcodevo = inputVo;
	    			break;
	    		}
	    	}
    	}
    	
    	if("0".equals(resultCode)){
	    	for (ProjectCodeVO inputVo : listvo) {
	    		count = projectCodeMapper.contractCount(inputVo);
	    		if(count > 0){
	    			resultCode = "3";
	    			projectcodevo = inputVo;
	    			break;
	    		}
	    	}
    	}
    	
    	if("0".equals(resultCode)){
	    	for (ProjectCodeVO inputVo : listvo) {
	    		count = projectCodeMapper.salesConferCount(inputVo);
	    		if(count > 0){
	    			resultCode = "4";
	    			projectcodevo = inputVo;
	    			break;
	    		}
	    	}
    	}
    	
    	if("0".equals(resultCode)){
    		for (ProjectCodeVO inputVo : listvo) {
        		projectCodeMapper.projectCodeDel(inputVo);
        	}
    	}
    	
    	resultMap.put("resultCode", resultCode);
    	resultMap.put("projectcodevo", projectcodevo);
    	return resultMap;
    }
    
    /**
	 * 월별 max 카운트
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return int형
	 * @exception Exception
	 */
    @Override
	public int selectMonthProjectCount(ProjectCodeVO vo) throws Exception {    	
    	return projectCodeMapper.selectMonthProjectCount(vo);
    }
    
    /**
	 * 담당영업자 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectCodeVO> projectDivisionUserList(ProjectCodeVO searchVO) throws Exception {
		return projectCodeMapper.projectDivisionUserList(searchVO);
	}
	
	/**
	 * 담당부서 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProjectCodeVO> projectDivisionList(ProjectCodeVO searchVO) throws Exception {
		return projectCodeMapper.projectDivisionList(searchVO);
	}
	
	/**
	 * 담당부서 리스트(하위부서 모두 포함)
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<String> projectDivisionChildList(LoginVO loginVO) throws Exception {
		
		String division_cd = "";
		
		//회원정보
		//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String grant_id		=	loginVO.getGrant_id();
		
		//담당영업
		if(grant_id.indexOf("2") >= 0) {
			//관리 권한의 경우 모든 데이터 조회 가능
			division_cd = "1101";
		}else if(grant_id.indexOf("4") >= 0 || grant_id.indexOf("5") >= 0) {
			//부서장, 임원
			division_cd = loginVO.getLast_division_cd();
		}else{
			//영업, 일반, 관리자, 오퍼레이터, 팀장
			division_cd = loginVO.getOperation_cd();			
		}
		
		if (SpringStringUtil.isEmpty(division_cd))
			division_cd = loginVO.getLast_division_cd();		
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		BusinessUtil businessUtil = new BusinessUtil();
		
		//하위 부서검색
		List<String> divisionChild = businessUtil.divisionChildSearch(divisionList, division_cd, "A");
		
		//하위부서에 자신의 사업부도 포함시킴
		divisionChild.add(division_cd);
		
		return divisionChild;
		
	}
	
	/**
	 * 계약관리 Project Code 전환
	 * @param vo - 저장할 정보가 담긴 ProjectCodeVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
    public void projectCodeSuccess(List<ProjectCodeVO> listvo) throws Exception {
    	for (ProjectCodeVO inputVo : listvo) {
    		projectCodeMapper.projectCodeSuccess(inputVo);
    	}
    }
	
}