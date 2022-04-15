package siso.cmmn.cmm.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.cmmn.cmm.SysLog;

/**
 * @Class Name : SysLogMapper.java
 * @Description : 로그관리(시스템)를 위한 데이터 접근 클래스
 * @Modification Information
 *
 */

@Component
public interface SysLogMapper {

	/**
	 * 시스템 로그정보를 생성한다.
	 * 
	 * @param SysLog
	 * @return
	 * @throws Exception 
	 */
	public void logInsertSysLog(SysLog sysLog) throws Exception;

	/**
	 * 시스템 로그정보를 요약한다.
	 * 
	 * @param 
	 * @return
	 * @throws Exception 
	 */
	public void logInsertSysLogSummary() throws Exception;
	
	public void logDeleteSysLogSummary() throws Exception;		

	/**
	 * 시스템 로그정보를 조회한다.
	 * 
	 * @param sysLog
	 * @return sysLog
	 * @throws Exception 
	 */
	public SysLog selectSysLog(SysLog sysLog) throws Exception;

	/**
	 * 시스템 로그정보 목록을 조회한다.
	 * 
	 * @param sysLog
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("rawtypes")
	public List selectSysLogInf(SysLog sysLog) throws Exception;

	/**
	 * 시스템 로그정보 목록의 숫자를 조회한다.
	 * @param sysLog
	 * @return
	 * @throws Exception
	 */
	public int selectSysLogInfCnt(SysLog sysLog) throws Exception;
	
}
