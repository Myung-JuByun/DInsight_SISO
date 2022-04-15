/**
 * @Class Name  : EgovNumberUtil.java
 * @Description : 숫자 데이터 처리 관련 유틸리티
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *   2009.02.13       이삼섭                  최초 생성
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 02. 13
 * @version 1.0
 * @see
 *
 */

package siso.cmmn.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class SpringExcelUtil extends AbstractExcelView {

	/**
     * 특정숫자 집합에서 랜덤 숫자를 구하는 기능 시작숫자와 종료숫자 사이에서 구한 랜덤 숫자를 반환한다
     *
     * @param startNum - 시작숫자
     * @param endNum - 종료숫자
     * @return 랜덤숫자
     * @exception MyException
     * @see
     */
	
	
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<InputStream> fileCheck(HttpServletRequest request) {
		List fileList = new ArrayList();
		System.out.println("fileCheck start");
		
	    try {
	       
		   final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		   System.out.println("file open1");
		   final Map<String, MultipartFile> files = multiRequest.getFileMap();
		   System.out.println("file open2");
		   InputStream fis = null;
	       Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
	       System.out.println("file open3");
		   MultipartFile file;
		   System.out.println("file open");
		   
		   while (itr.hasNext()) {
		      Entry<String, MultipartFile> entry = itr.next();
	
			  file = entry.getValue();
			  
			  System.out.println("file.getOriginalFilename() = " + file.getOriginalFilename());
			  if (!"".equals(file.getOriginalFilename())) {
			     // 2011.10.07 업로드 파일에 대한 확장자를 체크
				 if (file.getOriginalFilename().endsWith(".xls")
				     || file.getOriginalFilename().endsWith(".xlsx")
					 || file.getOriginalFilename().endsWith(".XLS")
					 || file.getOriginalFilename().endsWith(".XLSX")) {
				    try {
				    	System.out.println("file.getInputStream() ");
				    	fis = file.getInputStream();
				    	fileList.add(fis);
					} catch(Exception e) {
						System.out.println("Exception e = " + e.getMessage());
						throw e;
					} finally {
						if (fis != null)	fis.close();
					}
				} else {
					new Exception("errors.excel.fileType");
				}
			  }
		   }
		} catch (Exception e) {
		    e.printStackTrace();
		    throw new RuntimeException(e);	// 2011.10.10 보안점검 후속조치
		}
	
		return fileList;
    }
    
    /**
	 * 엑셀파일을 설정하고 생성한다.
	 * @param model
	 * @param wb
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void buildExcelDocument(Map<String, Object> model, Workbook wb, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		//년월일
		String nowDate = new java.text.SimpleDateFormat("yyyyMMdd").format(new java.util.Date());		
		XSSFCell cell = null;
		
		//시트명
		String sheetName = (String) model.get("excelSheetName");		
		//System.out.println(excelSheetName);
		
		if(sheetName == null || sheetName.equals(""))
			sheetName = nowDate;		
		
		//워크시트 생성
		XSSFSheet sheet = (XSSFSheet) wb.createSheet(sheetName);		
		sheet.setDefaultColumnWidth((short) 12);
		
		XSSFCellStyle cs = (XSSFCellStyle) wb.createCellStyle();		
		cs.setAlignment(XSSFCellStyle.ALIGN_CENTER);	// cell 정렬
		
		//타이틀
		List<Object> eHeaderList = (List<Object>) model.get("excelHeaderList");		
		//System.out.println(eHeaderList);
		
		if(eHeaderList != null && eHeaderList.size() > 0) {
		
			for(int i = 0; i < eHeaderList.size(); i++) {
				cell = (XSSFCell) getCell(sheet, 0, i);
				cell.setCellStyle(cs);
				setText(cell, (String) eHeaderList.get(i));			
			}
		}
		
		//상세리스트
		List<Object> eList = (List<Object>) model.get("excelList");		
		System.out.println(eList);
		
		int startCount = 0;		
		for(int i = 0; i < eList.size(); i++) {			
			List<Object> list = (List<Object>) eList.get(i);
			System.out.println(list);
			
			for(int j = 0; j < list.size(); j++) {				
				if(eHeaderList != null && eHeaderList.size() > 0)					
					startCount = i + 1;
				else
					startCount = i;				
				
				cell = (XSSFCell) getCell(sheet, startCount, j);
				
				if(isNumeric((String) list.get(j)))
					setNumber(cell, Integer.parseInt((String) list.get(j)));	
				else
					setText(cell, (String) list.get(j));					
				
				cell.setCellStyle(cs);
			} 
		}
		
		//파일명
		String fileName = sheetName + ".xlsx";		
		System.out.println(fileName);
		
		//xls확장자로 다운로드
		//response.setContentType("application/x-msdownload");
		response.setContentType("application/vnd.ms-excel");
		//response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		
		setDisposition(fileName, request, response);
	}
	
	/**
     * 숫자형 체크
     * 
     * @param str
     * @return
     */
	private boolean isNumeric(String str) {

        Pattern pattern = Pattern.compile("[+-]?\\d+");
        return pattern.matcher(str).matches();
    }
	
	/**
     * 브라우저 구분 얻기.
     * 
     * @param request
     * @return
     */
    private String getBrowser(HttpServletRequest request) {
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
     * Disposition 지정하기.
     * 
     * @param filename
     * @param request
     * @param response
     * @throws Exception
     */
    private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String browser = getBrowser(request);
		
		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;
		
		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Trident")) {		// IE11 문자열 깨짐 방지
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
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
		
		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);

		if ("Opera".equals(browser))
			response.setContentType("application/octet-stream;charset=UTF-8");		
    }	
	
}
