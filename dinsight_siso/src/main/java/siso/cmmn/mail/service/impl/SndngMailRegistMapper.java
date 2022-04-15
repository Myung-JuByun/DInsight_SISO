package siso.cmmn.mail.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import siso.cmmn.mail.service.SndngMailVO;

/**
 * 발송메일을 등록하는 DAO 클래스
 * @author 공통서비스 개발팀 박지욱
 * @version 1.0
 * @see
 *  
 * 
 */

@Component
public interface SndngMailRegistMapper {

	/**
	 * 발송할 메일을 등록한다
	 * @param vo SndngMailVO
	 * @return SndngMailVO
	 * @exception Exception
	 */
    public SndngMailVO insertSndngMail(SndngMailVO vo) throws Exception;
    
    /**
	 * 발송할 메일에 있는 첨부파일 목록을 조회한다.
	 * @param vo SndngMailVO
	 * @return List
	 * @exception Exception
	 */
    @SuppressWarnings("rawtypes")
	public List selectAtchmnFileList(SndngMailVO vo) throws Exception;
    
    /**
	 * 발송결과를 수정한다.
	 * @param vo SndngMailVO
	 * @return SndngMailVO
	 * @exception Exception
	 */
    public SndngMailVO updateSndngMail(SndngMailVO vo) throws Exception;
}
