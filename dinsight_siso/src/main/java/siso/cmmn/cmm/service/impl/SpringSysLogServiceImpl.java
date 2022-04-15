package siso.cmmn.cmm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.cmm.SysLog;
import siso.cmmn.cmm.service.SpringSysLogService;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : EgovSysLogServiceImpl.java
 * @Description : 로그관리(시스템)를 위한 서비스 구현 클래스
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
public class SpringSysLogServiceImpl implements SpringSysLogService {
	
	@Autowired
	public SqlSession sqlSession;	
	public SysLogMapper sysLogMapper;	
	public EgovIdGnrService egovSysLogIdGnrService;
    
    public SpringSysLogServiceImpl(SqlSession sqlSession, EgovIdGnrService egovSysLogIdGnrService) {
		this.sqlSession = sqlSession;
		this.sysLogMapper = sqlSession.getMapper(SysLogMapper.class);
		this.egovSysLogIdGnrService = egovSysLogIdGnrService;
	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * 
	 * @param SysLog
	 */
	public void logInsertSysLog(SysLog sysLog) throws Exception {
		// TODO Auto-generated method stub
		String requstId = egovSysLogIdGnrService.getNextStringId();
		sysLog.setRequstId(requstId);
		
		sysLogMapper.logInsertSysLog(sysLog);    	
	}

	/**
	 * 시스템 로그정보를 요약한다.
	 * 
	 * @param 
	 */
	public void logInsertSysLogSummary() throws Exception {
		sysLogMapper.logInsertSysLogSummary();
		sysLogMapper.logDeleteSysLogSummary();
	}

	/**
	 * 시스템 로그정보를 조회한다.
	 * 
	 * @param sysLog
	 * @return sysLog
	 * @throws Exception 
	 */
	public SysLog selectSysLog(SysLog sysLog) throws Exception{		
		return sysLogMapper.selectSysLog(sysLog);
	}	

	/**
	 * 시스템 로그정보 목록을 조회한다.
	 * 
	 * @param SysLog
	 */
	@SuppressWarnings("rawtypes")
	public Map selectSysLogInf(SysLog sysLog) throws Exception {
		List _result = sysLogMapper.selectSysLogInf(sysLog);
		int _cnt = sysLogMapper.selectSysLogInfCnt(sysLog);
		 
		Map<String, Object> _map = new HashMap<String, Object>();
		_map.put("resultList", _result);
		_map.put("resultCnt", Integer.toString(_cnt));
		 
		return _map;
	}

}
