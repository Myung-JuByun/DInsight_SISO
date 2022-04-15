package siso.cmmn.excel;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

@Component
public class ExcelRead {
	
	/**
	 * 품목 xls 엑셀파일을 등록한다.
	 * @param file
	 * @throws Exception
	 */
    public List<Map<String, Object>> excelReadXLS(
    		InputStream file
    		, int readRowNum
    		, String[] exKeys) throws Exception {
		
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		Workbook workbook = null;
		
		workbook = new HSSFWorkbook(file);
		
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();
		
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
	
		int numberOfSheets = workbook.getNumberOfSheets();
         
        //loop through each of the sheets
        for(int i=0; i < numberOfSheets; i++) {
        	
        	//한 행을 저장
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
                
                //몇번째 라인부터 읽을건지 결정
                if(cnt > (readRowNum-1)) {
                	
	                //공백체크
	                if(row.getCell(0).getCellType() != 3) {
	                	
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
	                        
	                        //날짜 데이터 예외처리
	                        /*if(cellcnt == 0) {
	                        	String month = data.substring(4, 6);
	                        	String day   = data.substring(6, 8);
	                        	
	                        	data = month + "-" + day;
	                        }*/
	                        
	                        //한개의 셀 데이터 저장
	                        if(cellcnt < exKeys.length){
	                        	//map.put("sheet_"+i+"_col_"+cellcnt, data);
		                        map.put(exKeys[cellcnt], data);
	                        }
	                        cellcnt++;
		                	
		                } //end of cell iterator
		                
		                exList.add(map);
		                
	                }
	                
                }
            
                cnt++;
                
            } //end of rows iterator             
             
        } //end of sheets for loop
        
        // 읽어 들인  데이터 출력
     	/*for (Map<String, Object> temp : exList) {
     		System.out.println(temp);
     	}*/
             
        return exList;
	}

	/**
	 * 품목 xlsx 엑셀파일을 등록한다.
	 * @param file
	 * @return 
	 * @throws Exception
	 */
	public List<Map<String, Object>> excelReadXLSX(InputStream file
			, int readRowNum
			, String[] exKeys) throws Exception {
		
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		
		Workbook workbook = null;
		
		workbook = new XSSFWorkbook(file);
		
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();
		
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
		
		int numberOfSheets = workbook.getNumberOfSheets();
         
        //loop through each of the sheets
        for(int i=0; i < numberOfSheets; i++) {
        	
        	//한 행을 저장
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
                
                //몇번째 라인부터 읽을건지 결정
                if(cnt >= (readRowNum-1)) {
                	
	                //공백체크
	                if(row.getCell(0).getCellType() != 3) {
	                	
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
	                        
	                        //날짜 데이터 예외처리
	                        /*if(cellcnt == 0) {
	                        	String month = data.substring(4, 6);
	                        	String day   = data.substring(6, 8);
	                        	
	                        	data = month + "-" + day;
	                        }*/
	                        
	                        //한개의 셀 데이터 저장
	                        if(cellcnt < exKeys.length){
	                        	//map.put("sheet_"+i+"_col_"+cellcnt, data);
		                        map.put(exKeys[cellcnt], data);
	                        }
	                        
	                        cellcnt++;
		                
		                } //end of cell iterator
		                
		                exList.add(map);
	                }
	                
                }
            
                cnt++;
                
            } //end of rows iterator             
             
        } //end of sheets for loop
        
        // 읽어 들인  데이터 출력
		/*for (Map<String, Object> temp : exList) {
			System.out.println(temp);
		}*/
        
        return exList;
        
	}
	
}