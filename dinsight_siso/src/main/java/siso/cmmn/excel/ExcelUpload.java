package siso.cmmn.excel;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Component
public class ExcelUpload {
	
	@Autowired
	private ExcelRead excelread;
	
	public ArrayList<List<Map<String, Object>>> excelUpload(
			HttpServletRequest request
			, int readRowNum
			, String[] exKeys) throws Exception {
		
		ArrayList<List<Map<String, Object>>> resultList = new ArrayList<List<Map<String, Object>>>();
		
		//선언
		final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		
		//extract files
		final Map<String, MultipartFile> files = multiRequest.getFileMap();
		InputStream fis = null;
		
		//process files
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();		
		MultipartFile file;
		
		while (itr.hasNext()) {
			
			Entry<String, MultipartFile> entry = itr.next();
			
			file = entry.getValue();			
			if (!file.getOriginalFilename().equals("")) {
				
				//업로드 파일에 대한 확장자를 체크
				if (file.getOriginalFilename().endsWith(".xls") || file.getOriginalFilename().endsWith(".XLS")) {

					try {
						fis = file.getInputStream();
						
						List<Map<String, Object>> exList = excelread.excelReadXLS(fis, readRowNum, exKeys);
						
						resultList.add(exList);
						
					} catch (Exception e) {
						throw e;
					} finally {
						if (fis != null) {
							fis.close();
						}
					}

				} else if (file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".XLSX")) {
					
					try {
						fis = file.getInputStream();
						
						List<Map<String, Object>> exList = excelread.excelReadXLSX(fis, readRowNum, exKeys);
						
						resultList.add(exList);						
						
					} catch (Exception e) {
						throw e;
					} finally {
						if (fis != null) {
							fis.close();
						}
					}
					
				} else {
					new Exception("errors.excel.fileType");
				}
			}			
		}
		
		return  resultList;
		
	}
	
}