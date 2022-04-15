package siso.cmmn.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;


/**
 * @Class Name  : EgovFileMngUtil.java
 * @Description : 메시지 처리 관련 유틸리티
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *   2009.02.13       이삼섭                  최초 생성
 *   2011.08.09       서준식                  utl.fcc패키지와 Dependency제거를 위해 getTimeStamp()메서드 추가
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 02. 13
 * @version 1.0
 * @see
 *
 */
@Component
public class SpringFileMngUtil {

    public static final int BUFF_SIZE = 2048;


   /* @Resource(name = "egovFileIdGnrService")
    private EgovIdGnrService idgenService;*/

    private static final Logger LOG = Logger.getLogger(SpringFileMngUtil.class.getName());
    
    @Autowired
	private SFTPUtil sftputil;    

    /**
     * 첨부파일에 대한 목록 정보를 취득한다.
     *
     * @param files
     * @return
     * @throws Exception
     */
    public List<FileVO> parseFileInf(Map<String, MultipartFile> files, String KeyStr, int fileKeyParam, String atchFileId, String storePath) throws Exception {
		int fileKey = fileKeyParam;
	
		String storePathString = "";
		String atchFileIdString = "";
	
		if ("".equals(storePath) || storePath == null) {
		    storePathString = SpringProperties.getProperty("Globals.fileStorePath");
		} else {
		    storePathString = SpringProperties.getProperty(storePath);
		}
	
		if ("".equals(atchFileId) || atchFileId == null) {
		   // atchFileIdString = idgenService.getNextStringId();
		} else {
		    atchFileIdString = atchFileId;
		}
	
		File saveFolder = new File(SpringWebUtil.filePathBlackList(storePathString));
	
		if (!saveFolder.exists() || saveFolder.isFile()) {
		    saveFolder.mkdirs();
		}
	
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		MultipartFile file;
		String filePath = "";
		List<FileVO> result  = new ArrayList<FileVO>();
		FileVO fvo;
	
		while (itr.hasNext()) {
		    Entry<String, MultipartFile> entry = itr.next();
	
		    file = entry.getValue();
		    String orginFileName = file.getOriginalFilename();
	
		    //--------------------------------------
		    // 원 파일명이 없는 경우 처리
		    // (첨부가 되지 않은 input file type)
		    //--------------------------------------
		    if ("".equals(orginFileName)) {
			continue;
		    }
		    ////------------------------------------
	
		    int index = orginFileName.lastIndexOf(".");
		    //String fileName = orginFileName.substring(0, index);
		    String fileExt = orginFileName.substring(index + 1);
		    String newName = KeyStr + getTimeStamp() + fileKey;
		    long _size = file.getSize();
	
		    if (!"".equals(orginFileName)) {
			filePath = storePathString + File.separator + newName;
			file.transferTo(new File(SpringWebUtil.filePathBlackList(filePath)));
		    }
		    fvo = new FileVO();
		    fvo.setFileExtsn(fileExt);
		    fvo.setFileStreCours(storePathString);
		    fvo.setFileMg(Long.toString(_size));
		    fvo.setOrignlFileNm(orginFileName);
		    fvo.setStreFileNm(newName);
		    fvo.setAtchFileId(atchFileIdString);
		    fvo.setFileSn(String.valueOf(fileKey));
	
		    //writeFile(file, newName, storePathString);
		    result.add(fvo);
	
		    fileKey++;
		}
	
		return result;
    }

    /**
     * 첨부파일을 서버에 저장한다.
     *
     * @param file
     * @param newName
     * @param stordFilePath
     * @throws Exception
     */
    protected void writeUploadedFile(MultipartFile file, String newName, String stordFilePath) throws Exception {
		InputStream stream = null;
		OutputStream bos = null;
	
		try {
		    stream = file.getInputStream();
		    File cFile = new File(stordFilePath);
	
		    if (!cFile.isDirectory()) {
				boolean _flag = cFile.mkdir();
				
				if (!_flag)
				    throw new IOException("Directory creation Failed ");				
		    }
	
		    bos = new FileOutputStream(stordFilePath + File.separator + newName);
	
		    int bytesRead = 0;
		    byte[] buffer = new byte[BUFF_SIZE];
	
		    while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
		    	bos.write(buffer, 0, bytesRead);
		    }
		} catch (Exception e) {
		    //e.printStackTrace();
		    LOG.error("IGNORE:", e);	// 2011.10.10 보안점검 후속조치
		} finally {
		    if (bos != null) {
				try {
				    bos.close();
				} catch (Exception ignore) {
				    LOG.debug("IGNORED: " + ignore.getMessage());
				}
		    }
		    
		    if (stream != null) {
				try {
				    stream.close();
				} catch (Exception ignore) {
				    LOG.debug("IGNORED: " + ignore.getMessage());
				}
		    }
		}
    }
    
    /**
     * 브라우저 구분 얻기.
     * 
     * @param request
     * @return
     */
    private static String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.indexOf("MSIE") > -1)
            return "MSIE";
        else if (header.indexOf("Trident") > -1)	// IE11 문자열 깨짐 방지
            return "Trident";
        else if (header.indexOf("Chrome") > -1)
            return "Chrome";
        else if (header.indexOf("Opera") > -1)
            return "Opera";
        
        return "Firefox";
    }
    /**
     * 서버의 파일을 다운로드한다.
     *
     * @param request
     * @param response
     * @throws Exception
     */
    public void downFile(HttpServletRequest request, HttpServletResponse response) throws Exception {       
	    response.setContentType("text/html; charset=utf-8");
	    
	    String downFilePath = "";
		String downFileName = "";
		String orgFileName = "";
		
		if ((String)request.getAttribute("downFilePath") == null)
		    downFilePath = "";
		else
			downFilePath = (String)request.getAttribute("downFilePath");		
		
		if ((String)request.getAttribute("downFile") == null)
		    downFileName = "";
		else
		    downFileName = (String)request.getAttribute("downFile");		
	
		if ((String)request.getAttribute("orgFileName") == null)
		    orgFileName = "";
		else
		    orgFileName = (String)request.getAttribute("orgFileName");		
	
		orgFileName = orgFileName.replaceAll("\r", "").replaceAll("\n", "");				
		
		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;
		String browser = getBrowser(request);
		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(orgFileName, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Trident")) {		// IE11 문자열 깨짐 방지
			encodedFilename = URLEncoder.encode(orgFileName, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(orgFileName.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(orgFileName.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < orgFileName.length(); i++) {
				char c = orgFileName.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			throw new IOException("Not supported browser");
		}
		
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");
		//response.setContentLength(fSize);
		
		sftputil.init();
		sftputil.downloadStream(downFilePath, downFileName, response);	
    }

    /**
     * 첨부로 등록된 파일을 서버에 업로드한다.
     *
     * @param file
     * @return
     * @throws Exception
     */
    public HashMap<String, String> uploadFile(MultipartFile file, String lastFilePath) throws Exception {
    	
    	if(lastFilePath == null) lastFilePath = "";
    	
    	sftputil.init();
    	//fTPUtil.init();
    	
		HashMap<String, String> map = new HashMap<String, String>();
		//Write File 이후 Move File????
		String newName = "";
		String stordFilePath = SpringProperties.getProperty("Globals.fileStorePath") + lastFilePath;
		String orginFileName = file.getOriginalFilename();
	
		int index = orginFileName.lastIndexOf(".");
		//String fileName = orginFileName.substring(0, _index);
		String fileExt = orginFileName.substring(index + 1);
		long size = file.getSize();
	
		//newName 은 Naming Convention에 의해서 생성
		newName = getTimeStamp();	// 2012.11 KISA 보안조치
		//writeFile(file, newName, stordFilePath);
		sftputil.upload(file, newName, stordFilePath);
		//fTPUtil.upload(file, newName, stordFilePath);
		
		//storedFilePath는 지정
		map.put(Globals.ORIGIN_FILE_NM, orginFileName);
		map.put(Globals.UPLOAD_FILE_NM, newName);
		map.put(Globals.FILE_EXT, fileExt);
		map.put(Globals.FILE_PATH, stordFilePath);
		map.put(Globals.FILE_SIZE, String.valueOf(size));
		
		sftputil.disconnection();
		//fTPUtil.disconnection();
			
		return map;
    }
    

    /**
     * 파일을 실제 물리적인 경로에 생성한다.
     *
     * @param file
     * @param newName
     * @param stordFilePath
     * @throws Exception
     */
    protected static void writeFile(MultipartFile file, String newName, String stordFilePath) throws Exception {
		InputStream stream = null;
		OutputStream bos = null;
	
		try {
		    stream = file.getInputStream();
		    File cFile = new File(SpringWebUtil.filePathBlackList(stordFilePath));
	
		    if (!cFile.isDirectory())	cFile.mkdir();
	
		    bos = new FileOutputStream(SpringWebUtil.filePathBlackList(stordFilePath + File.separator + newName));
		    int bytesRead = 0;
		    byte[] buffer = new byte[BUFF_SIZE];
	
		    while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
		    	bos.write(buffer, 0, bytesRead);
		    }
		} catch (Exception e) {
		    //e.printStackTrace();
		    //throw new RuntimeException(e);	// 보안점검 후속조치
			Logger.getLogger(SpringFileMngUtil.class).debug("IGNORED: " + e.getMessage());
		} finally {
		    if (bos != null) {
				try {
				    bos.close();
				} catch (Exception ignore) {
				    Logger.getLogger(SpringFileMngUtil.class).debug("IGNORED: " + ignore.getMessage());
				}
		    }
		    
		    if (stream != null) {
				try {
				    stream.close();
				} catch (Exception ignore) {
				    Logger.getLogger(SpringFileMngUtil.class).debug("IGNORED: " + ignore.getMessage());
				}
		    }
		}
    }

    /**
     * 서버 파일에 대하여 다운로드를 처리한다.
     *
     * @param response
     * @param streFileNm
     *            : 파일저장 경로가 포함된 형태
     * @param orignFileNm
     * @throws Exception
     */
    public void downFile(HttpServletResponse response, String streFileNm, String orignFileNm) throws Exception {
		String downFileName = streFileNm;
		String orgFileName = orignFileNm;
	
		File file = new File(downFileName);
		
		if (!file.exists())
		    throw new FileNotFoundException(downFileName);		
	
		if (!file.isFile())
		    throw new FileNotFoundException(downFileName);		
	
		int fSize = (int)file.length();
		if (fSize > 0) {
		    BufferedInputStream in = null;
	
		    try {
		    	in = new BufferedInputStream(new FileInputStream(file));
	    	    String mimetype = "text/html"; //"application/x-msdownload"
	   	    	response.setBufferSize(fSize);
	   	    	response.setContentType(mimetype);
				response.setHeader("Content-Disposition:", "attachment; filename=" + orgFileName);
				response.setContentLength(fSize);
				FileCopyUtils.copy(in, response.getOutputStream());
		    } finally {
				if (in != null) {
				    try {
				    	in.close();
				    } catch (Exception ignore) {
						Logger.getLogger(SpringFileMngUtil.class).debug("IGNORED: " + ignore.getMessage());
				    }
				}
		    }
		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		}			
    }

    /**
     * 2011.08.09
     * 공통 컴포넌트 utl.fcc 패키지와 Dependency제거를 위해 내부 메서드로 추가 정의함
     * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서17자리의TIMESTAMP값을 구하는 기능
     *
     * @param
     * @return Timestamp 값
     * @exception MyException
     * @see
     */
    private static String getTimeStamp() {
		String rtnStr = null;
	
		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmssSSS";
	
		try {
		    SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
		    Timestamp ts = new Timestamp(System.currentTimeMillis());
		    rtnStr = sdfCurrent.format(ts.getTime());
		} catch (Exception e) {
		    LOG.debug("IGNORED: " + e.getMessage());
		}
	
		return rtnStr;
    }
}
