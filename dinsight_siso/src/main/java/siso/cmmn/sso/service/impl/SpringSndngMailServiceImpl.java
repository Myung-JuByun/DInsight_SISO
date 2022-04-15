package siso.cmmn.sso.service.impl;

import org.apache.commons.mail.EmailAttachment;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import siso.cmmn.mail.service.SpringMultiPartEmail;
import siso.cmmn.mail.service.SpringSndngMailService;
import siso.cmmn.mail.service.SndngMailVO;
import siso.cmmn.mail.service.impl.SndngMailRegistMapper;
/**
 * 메일 솔루션과 연동해서 이용해서 메일을 보내는 서비스 구현 클래스
 * @since 2011.09.09
 * @version 1.0
 * @see
 *  
 * <pre>
 * << 개정이력(Modification Information) >>
 * 
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.09.09  서준식       최초 작성
 *  2011.12.06  이기하       메일 첨부파일이 기능 추가 
 *  2013.05.23  이기하       메일 첨부파일이 없을 때 로직 추가 
 *  
 *  </pre>
 */
@Service
public class SpringSndngMailServiceImpl implements SpringSndngMailService {
	
	@Autowired
	private SpringMultiPartEmail springMultiPartEmail;
	
	@Autowired
	private SndngMailRegistMapper sndngMailRegistMapper;
	
	private static final Logger LOG = Logger.getLogger(SpringSndngMailServiceImpl.class.getClass());
	
	/**
	 * 메일을 발송한다
	 * @param vo SndngMailVO
	 * @return boolean
	 * @exception Exception
	 */
	public boolean sndngMail(SndngMailVO sndngMailVO) throws Exception {
		
		String recptnPerson = (sndngMailVO.getRecptnPerson() == null) ? "" : sndngMailVO.getRecptnPerson();		// 수신자
		String subject = (sndngMailVO.getSj() == null) ? "" : sndngMailVO.getSj();								// 메일제목
		String emailCn = (sndngMailVO.getEmailCn() == null) ? "" : sndngMailVO.getEmailCn();					// 메일내용
		String atchmnFileNm = (sndngMailVO.getOrignlFileNm() == null) ? "" : sndngMailVO.getOrignlFileNm();		// 첨부파일이름		
		String atchmnFilePath = (sndngMailVO.getFileStreCours() == null) ? "" : sndngMailVO.getFileStreCours();	// 첨부파일경로		
		
        try{
        	EmailAttachment attachment = new EmailAttachment();
        	// 첨부파일이 있을 때
        	if (atchmnFileNm != "" && atchmnFileNm != null && atchmnFilePath != "" && atchmnFilePath != null) {
	  		  // 첨부할 attachment 정보를 생성합니다
	  		  attachment.setPath(atchmnFilePath);	
	  		  attachment.setDisposition(EmailAttachment.ATTACHMENT);
	  		  attachment.setDescription("첨부파일입니다");
	  		  attachment.setName(atchmnFileNm);
	   
	  		  // 메일을 전송합니다
	  		  springMultiPartEmail.send(recptnPerson, subject, emailCn, attachment);
        	} 
        	// 메일을 전송합니다
        	springMultiPartEmail.send(recptnPerson, subject, emailCn);
        	
        	Throwable t = new Throwable();
	        	
	        }catch(MailParseException ex){
	        	sndngMailVO.setSndngResultCode("F");	// 발송결과 실패
	        	sndngMailRegistMapper.updateSndngMail(sndngMailVO);	// 발송상태를 DB에 업데이트 한다.
	        	LOG.error("Sending Mail Exception : " +  ex.getCause() + " [failure when parsing the message]");
	        	return false;
	        }catch(MailAuthenticationException ex){
	        	sndngMailVO.setSndngResultCode("F");	// 발송결과 실패
	        	sndngMailRegistMapper.updateSndngMail(sndngMailVO);	// 발송상태를 DB에 업데이트 한다.
	        	LOG.error("Sending Mail Exception : " +  ex.getCause() + " [authentication failure]");
	        	return false;
	        }catch(MailSendException ex){
	        	sndngMailVO.setSndngResultCode("F");	// 발송결과 실패
	        	sndngMailRegistMapper.updateSndngMail(sndngMailVO);	// 발송상태를 DB에 업데이트 한다.
	        	LOG.error("Sending Mail Exception : " +  ex.getCause() + " [failure when sending the message]");
	        	return false;
	        }catch(Exception ex){
	        	sndngMailVO.setSndngResultCode("F");	// 발송결과 실패
	        	sndngMailRegistMapper.updateSndngMail(sndngMailVO);	// 발송상태를 DB에 업데이트 한다.
	        	LOG.error("Sending Mail Exception : " +  ex.getCause() + " [unknown Exception]");
	        	ex.printStackTrace();
	        	return false;
	        }
		
		return true;
	}

}
