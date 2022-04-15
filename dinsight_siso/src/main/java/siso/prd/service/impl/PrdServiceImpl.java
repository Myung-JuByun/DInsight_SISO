package siso.prd.service.impl;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.util.SpringStringUtil;
import siso.prd.service.PrdService;
import siso.prd.service.PrdVO;

/**
 * @Class Name : AlcAdminServiceImpl.java
 * @Description : AlcAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class PrdServiceImpl implements PrdService {

	@Autowired
	public SqlSession sqlSession;
	public PrdMapper prdMapper;
	
	public PrdServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.prdMapper = sqlSession.getMapper(PrdMapper.class);
	}
	
	/**
	 * 메인리스트 - 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PrdVO> prdMainList(PrdVO searchVO) throws Exception {
		return prdMapper.prdMainList(searchVO);
	}
	
	/**
	 * 상세리스트 - 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PrdVO> prdDetailList(PrdVO searchVO) throws Exception {
		return prdMapper.prdDetailList(searchVO);
	}
	
	/**
	 * 상세리스트 - 조회(리비전 전체)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<PrdVO> prdDetailAllList(PrdVO searchVO) throws Exception {
		return prdMapper.prdDetailAllList(searchVO);
	}
	
	/**
	 * 자료올리기 년도 확인
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public String prdYearCheck(PrdVO searchVO) throws Exception {
		return prdMapper.prdYearCheck(searchVO);
	}
	
	/**
	 * 품목 xls 엑셀파일을 등록한다.
	 * @param file
	 * @throws Exception
	 */
    public void insertExcelGoods(InputStream file, PrdVO searchVO) throws Exception {    	
    	// map의 key정의
    	String[] exKeys = {"pricelist","currency","price_list_date","Version","prd_number","type","trigram","portfolio_item_name",
    			"plc","alc","portfolio","qlc","ylc","slc","tbl2","tbl3","ulc","xlc","qrc","elc"};
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		Workbook workbook = null;
		workbook = new HSSFWorkbook(file);
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
		
		int numberOfSheets = 1;
        //loop through each of the sheets
        for(int i=0; i < numberOfSheets; i++) {
        	
        	// 한 행을 저장
    		Map<String, Object> map = null;
            //Get the nth sheet from the workbook
            Sheet sheet = workbook.getSheetAt(i);
            
            int cnt = 0;
            //every sheet has rows, iterate over them
            Iterator<Row> rowIterator = sheet.iterator();
            while (rowIterator.hasNext()) {
            	map = new HashMap<String, Object>();
                //Get the row object
                Row row = rowIterator.next();
                //1,2 라인 제외
                if(cnt > 0) {
                	
                	for (int cellcnt = 0; cellcnt < exKeys.length; cellcnt++) {
	            		
	            		Cell cell = row.getCell(cellcnt);
	            		String data = null;
	            		
	            		if (cell == null) {
	            			data = "";
	            		} else {	            			
	            			switch (cell.getCellType()) {
								case Cell.CELL_TYPE_BOOLEAN:         
									boolean bdata = cell.getBooleanCellValue();         
									data = String.valueOf(bdata);         
									break;         
								case Cell.CELL_TYPE_NUMERIC: 
									// cell의 값이 numeric일 경우 날짜와 숫자 두가지일 경우이다. 아래와 같이 확인     
									if (HSSFDateUtil.isCellDateFormatted(cell)){
										SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
										data = formatter.format(cell.getDateCellValue());
									} else{
										data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
									}
									break;         
								case Cell.CELL_TYPE_STRING:         
									data = cell.toString();
									break;         
								case Cell.CELL_TYPE_BLANK:         
								case Cell.CELL_TYPE_ERROR:         
								// 수식일 경우 기존의 바로 처리하는 방식이 아니라 수식을 다시 계산한 후 해당 값이 어떤 type인지 확인해서 처리한다.
								case Cell.CELL_TYPE_FORMULA:
									if(!(cell.toString()=="") ){
										if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_NUMERIC){
											data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
										}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_STRING){
											data = cell.getStringCellValue();
										}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_BOOLEAN){
											boolean fbdata = cell.getBooleanCellValue();         
											data = String.valueOf(fbdata);         
										}
										break; 
									} 
								default:         
									data = cell.toString();
	            			}
	            		}
	            		
	            		data = data.trim();
                        
                        if(cellcnt == 8 || cellcnt == 9 || cellcnt == 11 || cellcnt == 12 || cellcnt == 13 || cellcnt == 14 
                        		|| cellcnt == 15 || cellcnt == 16 || cellcnt == 17 || cellcnt == 18 || cellcnt == 19) {
                        	data = data.replace(",", "");
                        }
                        
                        // 한개의 셀 데이터 저장
                    	map.put(exKeys[cellcnt], data);
	            	}
	            	
	            	exList.add(map);
                	
	            	//////엑셀 파일내 빈셀 존재시 인식못하는 문제로 위에 소스로 교체
	            	
					/*//Every row has columns, get the column iterator and iterate over them
					Iterator<Cell> cellIterator = row.cellIterator();
					int cellcnt = 0;
					while (cellIterator.hasNext()) {
					    //Get the Cell object
					    Cell cell = cellIterator.next();
					    String data = null;
					    switch (cell.getCellType()) {
					        case Cell.CELL_TYPE_BOOLEAN:         
								boolean bdata = cell.getBooleanCellValue();         
								data = String.valueOf(bdata);         
								break;         
							case Cell.CELL_TYPE_NUMERIC: 
								// cell의 값이 numeric일 경우 날짜와 숫자 두가지일 경우이다. 아래와 같이 확인     
								if (HSSFDateUtil.isCellDateFormatted(cell)){
									SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
									data = formatter.format(cell.getDateCellValue());
								} else{
									data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
								}
								break;         
							case Cell.CELL_TYPE_STRING:         
								data = cell.toString();         
								break;         
							case Cell.CELL_TYPE_BLANK:         
							case Cell.CELL_TYPE_ERROR:         
							// 수식일 경우 기존의 바로 처리하는 방식이 아니라 수식을 다시 계산한 후 해당 값이 어떤 type인지 확인해서 처리한다.
							case Cell.CELL_TYPE_FORMULA:
								if(!(cell.toString()=="") ){
									if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_NUMERIC){
										data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
									}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_STRING){
										data = cell.getStringCellValue();
									}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_BOOLEAN){
										boolean fbdata = cell.getBooleanCellValue();         
										data = String.valueOf(fbdata);         
									}
									break; 
								} 
							default:         
								data = cell.toString();
					    }
					    
					    data = data.trim();
					    
					    if(cellcnt == 8 || cellcnt == 9 || cellcnt == 11 || cellcnt == 12 || cellcnt == 13 || cellcnt == 14 
                        		|| cellcnt == 15 || cellcnt == 16 || cellcnt == 17 || cellcnt == 18 || cellcnt == 19) {
                        	data = data.replace(",", "");
                        }
                        
					    // 한개의 셀 데이터 저장
					    map.put(exKeys[cellcnt], data);	                        
					    cellcnt++;
					} //end of cell iterator
					
					exList.add(map);*/
                }
                cnt++;
            } //end of rows iterator             
             
        } //end of sheets for loop
        
        // 읽어 들인  데이터 출력
     	/*for (Map<String, Object> temp : exList) {
     		System.out.println(temp);
     	}*/             
        // return exList;
        
        //년도 데이터 제크 후 기존 데이터 삭제
        /*String yearchk = prdDAO.prdYearCheck(searchVO);
        if(Integer.parseInt(yearchk)>0){
        	prdDAO.prdYearDelete(searchVO);
        }*/
        
        for(int i=0; i<exList.size(); i++) {
        	Set<?> key = exList.get(i).keySet();
        	PrdVO prdVO = new PrdVO();
        	for (Iterator<?> iterator = key.iterator(); iterator.hasNext();) {
                String keyName = (String) iterator.next();
                String valueName = (String) exList.get(i).get(keyName);
                //System.out.println(keyName +" = " +valueName);
                
                if(keyName.equals("pricelist"))prdVO.setPricelist(valueName);                       
                if(keyName.equals("currency"))prdVO.setCurrency(valueName);
                if(keyName.equals("price_list_date"))prdVO.setPrice_list_date(valueName);                
                if(keyName.equals("Version"))prdVO.setVersion(valueName);                
                if(keyName.equals("prd_number"))prdVO.setPrd_number(valueName);                
                if(keyName.equals("type"))prdVO.setPrd_type(valueName);                
                if(keyName.equals("trigram"))prdVO.setTrigram(valueName);
                if(keyName.equals("portfolio_item_name"))prdVO.setPortfolio_item_name(valueName);
                if(keyName.equals("plc"))prdVO.setPlc(valueName);
                if(keyName.equals("alc"))prdVO.setAlc(valueName);
                if(keyName.equals("portfolio"))prdVO.setPortfolio(valueName);
                if(keyName.equals("qlc"))prdVO.setQlc(valueName);
                if(keyName.equals("ylc"))prdVO.setYlc(valueName);
                if(keyName.equals("slc"))prdVO.setSlc(valueName);
                if(keyName.equals("tbl2"))prdVO.setTbl2(valueName);
                if(keyName.equals("tbl3"))prdVO.setTbl3(valueName);
                if(keyName.equals("ulc"))prdVO.setUlc(valueName);
                if(keyName.equals("xlc"))prdVO.setXlc(valueName);
                if(keyName.equals("qrc"))prdVO.setQrc(valueName);
                if(keyName.equals("elc"))prdVO.setElc(valueName);
        	}
        	
        	String revision = prdMapper.prdRevisionCheck(prdVO);
        	
        	if(SpringStringUtil.isEmpty(revision)) {
        		prdVO.setRevision("1");
        	}else{
        		prdVO.setRevision(revision);
        	}
        	
        	//저장
        	prdMapper.insertPrdExcel(prdVO);
        }
	}

	/**
	 * 품목 xlsx 엑셀파일을 등록한다.
	 * @param file
	 * @return 
	 * @throws Exception
	 */
	public void insertExcelPOIGoods(InputStream file, PrdVO searchVO) throws Exception {
		// map의 key정의
		String[] exKeys = {"pricelist","currency","price_list_date","Version","prd_number","type","trigram","portfolio_item_name","plc","alc","portfolio","qlc","ylc","slc","tbl2","tbl3","ulc","xlc","qrc","elc"};
		
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		Workbook workbook = null;
		workbook = new XSSFWorkbook(file);		
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();		
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
		
		int numberOfSheets = 1;		
        //loop through each of the sheets
        for(int i=0; i < numberOfSheets; i++) {
			// 한 행을 저장
			Map<String, Object> map = null;			 
			//Get the nth sheet from the workbook
			Sheet sheet = workbook.getSheetAt(i);	
			
			int cnt = 0;			
			//every sheet has rows, iterate over them
			Iterator<Row> rowIterator = sheet.iterator();
			while (rowIterator.hasNext()) {            	
	        	map = new HashMap<String, Object>();
	            //Get the row object
	            Row row = rowIterator.next();
	            //1,2 라인 제외
	            if(cnt > 0) {
	            	
	            	for (int cellcnt = 0; cellcnt < exKeys.length; cellcnt++) {
	            		
	            		Cell cell = row.getCell(cellcnt);
	            		String data = null;
	            		
	            		if (cell == null) {
	            			data = "";
	            		} else {	            			
	            			switch (cell.getCellType()) {
								case Cell.CELL_TYPE_BOOLEAN:         
									boolean bdata = cell.getBooleanCellValue();         
									data = String.valueOf(bdata);         
									break;         
								case Cell.CELL_TYPE_NUMERIC: 
									// cell의 값이 numeric일 경우 날짜와 숫자 두가지일 경우이다. 아래와 같이 확인     
									if (HSSFDateUtil.isCellDateFormatted(cell)){
										SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
										data = formatter.format(cell.getDateCellValue());
									} else{
										data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
									}
									break;         
								case Cell.CELL_TYPE_STRING:         
									data = cell.toString();
									break;         
								case Cell.CELL_TYPE_BLANK:         
								case Cell.CELL_TYPE_ERROR:         
								// 수식일 경우 기존의 바로 처리하는 방식이 아니라 수식을 다시 계산한 후 해당 값이 어떤 type인지 확인해서 처리한다.
								case Cell.CELL_TYPE_FORMULA:
									if(!(cell.toString()=="") ){
										if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_NUMERIC){
											data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
										}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_STRING){
											data = cell.getStringCellValue();
										}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_BOOLEAN){
											boolean fbdata = cell.getBooleanCellValue();         
											data = String.valueOf(fbdata);         
										}
										break; 
									} 
								default:         
									data = cell.toString();
	            			}
	            		}
	            		
	            		data = data.trim();
                        
                        if(cellcnt == 8 || cellcnt == 9 || cellcnt == 11 || cellcnt == 12 || cellcnt == 13 || cellcnt == 14 
                        		|| cellcnt == 15 || cellcnt == 16 || cellcnt == 17 || cellcnt == 18 || cellcnt == 19) {
                        	data = data.replace(",", "");
                        }
                        
                        // 한개의 셀 데이터 저장
                    	map.put(exKeys[cellcnt], data);
	            	}
	            	
	            	exList.add(map);
	            	
	            	//////엑셀 파일내 빈셀 존재시 인식못하는 문제로 위에 소스로 교체
	            	
	                /*//공백체크
	            	//if(row.getCell(0).getCellType() != 3) {
		            //Every row has columns, get the column iterator and iterate over them
            		Iterator<Cell> cellIterator = row.cellIterator();
        			int cellcnt = 0;
    				while (cellIterator.hasNext()) {
    					
						//Get the Cell object
						Cell cell = cellIterator.next();
						String data = null;
		                    
                        switch (cell.getCellType()) {
							case Cell.CELL_TYPE_BOOLEAN:         
								boolean bdata = cell.getBooleanCellValue();         
								data = String.valueOf(bdata);         
								break;         
							case Cell.CELL_TYPE_NUMERIC: 
								// cell의 값이 numeric일 경우 날짜와 숫자 두가지일 경우이다. 아래와 같이 확인     
								if (HSSFDateUtil.isCellDateFormatted(cell)){
									SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
									data = formatter.format(cell.getDateCellValue());
								} else{
									data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
								}
								break;         
							case Cell.CELL_TYPE_STRING:         
								data = cell.toString();
								break;         
							case Cell.CELL_TYPE_BLANK:         
							case Cell.CELL_TYPE_ERROR:         
							// 수식일 경우 기존의 바로 처리하는 방식이 아니라 수식을 다시 계산한 후 해당 값이 어떤 type인지 확인해서 처리한다.
							case Cell.CELL_TYPE_FORMULA:
								if(!(cell.toString()=="") ){
									if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_NUMERIC){
										data = String.valueOf(new Double(cell.getNumericCellValue()).intValue());
									}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_STRING){
										data = cell.getStringCellValue();
									}else if(evaluator.evaluateFormulaCell(cell)==Cell.CELL_TYPE_BOOLEAN){
										boolean fbdata = cell.getBooleanCellValue();         
										data = String.valueOf(fbdata);         
									}
									break; 
								} 
							default:         
								data = cell.toString();
                        }
                        
                        data = data.trim();
                        
                        if(cellcnt == 8 || cellcnt == 9 || cellcnt == 11 || cellcnt == 12 || cellcnt == 13 || cellcnt == 14 
                        		|| cellcnt == 15 || cellcnt == 16 || cellcnt == 17 || cellcnt == 18 || cellcnt == 19) {
                        	data = data.replace(",", "");
                        }
                        
                        // 한개의 셀 데이터 저장
                    	map.put(exKeys[cellcnt], data);
                    	//System.out.println(data);
                		cellcnt++;
		            } //end of cell iterator
		            
    				exList.add(map);*/
                }
                cnt++;                
            } //end of rows iterator             
        } //end of sheets for loop        
        
        // 읽어 들인  데이터 출력
		/*for (Map<String, Object> temp : exList) {
			System.out.println(temp);
		}*/       
        //return exList;
        
        //년도 데이터 제크 후 기존 데이터 삭제
        /*String yearchk = prdDAO.prdYearCheck(searchVO);
        if(Integer.parseInt(yearchk)>0){
        	prdDAO.prdYearDelete(searchVO);
        }*/
        for(int i=0; i<exList.size(); i++) {
        	Set<?> key = exList.get(i).keySet();
        	PrdVO prdVO = new PrdVO();
        	for (Iterator<?> iterator = key.iterator(); iterator.hasNext();) {
                String keyName = (String) iterator.next();
                String valueName = (String) exList.get(i).get(keyName);
                //System.out.println(keyName +" = " +valueName);
                
                if(keyName.equals("pricelist"))				prdVO.setPricelist(valueName);                       
                if(keyName.equals("currency"))				prdVO.setCurrency(valueName);
                if(keyName.equals("price_list_date"))		prdVO.setPrice_list_date(valueName);                
                if(keyName.equals("Version"))				prdVO.setVersion(valueName);                
                if(keyName.equals("prd_number"))			prdVO.setPrd_number(valueName);                
                if(keyName.equals("type"))					prdVO.setPrd_type(valueName);                
                if(keyName.equals("trigram"))				prdVO.setTrigram(valueName);
                if(keyName.equals("portfolio_item_name"))	prdVO.setPortfolio_item_name(valueName);
                if(keyName.equals("plc"))					prdVO.setPlc(valueName);
                if(keyName.equals("alc"))					prdVO.setAlc(valueName);
                if(keyName.equals("portfolio"))				prdVO.setPortfolio(valueName);
                if(keyName.equals("qlc"))					prdVO.setQlc(valueName);
                if(keyName.equals("ylc"))					prdVO.setYlc(valueName);
                if(keyName.equals("slc"))					prdVO.setSlc(valueName);
                if(keyName.equals("tbl2"))					prdVO.setTbl2(valueName);
                if(keyName.equals("tbl3"))					prdVO.setTbl3(valueName);
                if(keyName.equals("ulc"))					prdVO.setUlc(valueName);
                if(keyName.equals("xlc"))					prdVO.setXlc(valueName);
                if(keyName.equals("qrc"))					prdVO.setQrc(valueName);
                if(keyName.equals("elc"))					prdVO.setElc(valueName);
        	}
        	
        	String revision = prdMapper.prdRevisionCheck(prdVO);
        	
        	if(SpringStringUtil.isEmpty(revision)) {
        		prdVO.setRevision("1");
        	}else{
        		prdVO.setRevision(revision);
        	}
        	
        	//저장
        	prdMapper.insertPrdExcel(prdVO);
        }
	}
}
