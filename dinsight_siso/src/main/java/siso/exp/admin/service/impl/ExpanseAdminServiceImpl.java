package siso.exp.admin.service.impl;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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

import siso.exp.admin.service.ExpanseAdminService;
import siso.exp.admin.service.ExpanseAdminVO;

/**
 * @Class Name : ExpanseAdminServiceImpl.java
 * @Description : ExpanseAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ExpanseAdminServiceImpl implements ExpanseAdminService {

	// private static final Logger LOGGER = LoggerFactory.getLogger(ExpanseServiceImpl.class);
	@Autowired
	public SqlSession sqlSession;	
	public ExpanseAdminMapper expanseAdminMapper;
	
	public ExpanseAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.expanseAdminMapper = sqlSession.getMapper(ExpanseAdminMapper.class);
	}
	
	/**
	 * 경비제출유무 확인
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String selectExpanseStatusList(ExpanseAdminVO vo) throws Exception {    	
    	return expanseAdminMapper.selectExpanseStatusList(vo);
    }
    
    /**
	 * 결제선 보기
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String selectExpansePaymentView(ExpanseAdminVO vo) throws Exception {    	
    	return expanseAdminMapper.selectExpansePaymentView(vo);
    }
	
	/**
	 * 경비조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> selectExpanseList(ExpanseAdminVO searchVO) throws Exception {
		return expanseAdminMapper.selectExpanseList(searchVO);
	}
		
	/**
	 * 경비저장
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseInsert(List<ExpanseAdminVO> listvo) throws Exception {
    	for (ExpanseAdminVO inputVo : listvo ) {
    		expanseAdminMapper.expanseInsert(inputVo);
    	}
    }
    
    /**
	 * 경비삭제
	 * @param vo - 삭제할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseDelete(ExpanseAdminVO vo) throws Exception {
    	expanseAdminMapper.expanseDelete(vo);
    }
    
    /**
	 * 경비지급 요청서 결재라인 결제유무(인쇄)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> expansePrintPayment(ExpanseAdminVO searchVO) throws Exception {
		return expanseAdminMapper.expansePrintPayment(searchVO);
	}
    
    /**
	 * 경비지급 요청서 표지(인쇄)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> expansePrintTotalPrice(ExpanseAdminVO searchVO) throws Exception {
		return expanseAdminMapper.expansePrintTotalPrice(searchVO);
	}
    
    /**
	 * 경비제출 (개인경비 달별 승인정보)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public int expanseFinalMonthlyInsert(ExpanseAdminVO vo) throws Exception {    	
    	return expanseAdminMapper.expanseFinalMonthlyInsert(vo);
    }
    
    /**
	 * 경비제출 (개인경비 정보 수정)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseFinalUpdate(ExpanseAdminVO vo) throws Exception {    	
    	expanseAdminMapper.expanseFinalUpdate(vo);
    }
    
    /**
	 * 경비제출 (마일리지 정보 수정)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseFinalMileageUpdate(ExpanseAdminVO vo) throws Exception {    	
    	expanseAdminMapper.expanseFinalMileageUpdate(vo);
    }
    
    /**
	 * 경비제출 (결재 요청서 저장)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public int expanseFinalApprovalInsert(ExpanseAdminVO vo) throws Exception {    	
    	return expanseAdminMapper.expanseFinalApprovalInsert(vo);
    }
    
    /**
	 * 경비제출 (결재 승인정보 저장)
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseFinalApprovalNodeInsert(ExpanseAdminVO vo) throws Exception {    	
    	expanseAdminMapper.expanseFinalApprovalNodeInsert(vo);
    }
    
    /**
	 * 마일리지조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ExpanseAdminVO> selectExpanseMileageList(ExpanseAdminVO searchVO) throws Exception {
		return expanseAdminMapper.selectExpanseMileageList(searchVO);
	}
    
    /**
	 * 마일리지저장
	 * @param vo - 저장할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseMileageInsert(List<ExpanseAdminVO> listvo) throws Exception {
    	for (ExpanseAdminVO inputVo : listvo ) {
    		expanseAdminMapper.expanseMileageInsert(inputVo);
    	}
    }
    
    /**
	 * 마일리지삭제
	 * @param vo - 삭제할 정보가 담긴 ExpanseAdminVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void expanseMileageDelete(ExpanseAdminVO vo) throws Exception {
    	expanseAdminMapper.expanseMileageDelete(vo);
    }
    
    /**
	 * 품목 xls 엑셀파일을 등록한다.
	 * @param file
	 * @throws Exception
	 */
    public List<Map<String, Object>> insertExcelGoods(InputStream file) throws Exception {
    	
    	// map의 key정의
		String[] exKeys = { "pay_day", "expanse_type", "expanse_type_text", "category_id", "category_id_text", "payment", "expanse_name", "confer_number" };
		String[] miKeys = { "drive_day", "purpose", "start_point", "via_point", "end_point", "oil_cd", "oil_cd_text", "distance", "cost" };
		
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		Workbook workbook = null;
		
		workbook = new HSSFWorkbook(file);
		
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();
		
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
	
		int numberOfSheets = 2;
         
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
                if(cnt > 1) {
                	
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
	                        if(cellcnt == 0) {
	                        	String month = data.substring(4, 6);
	                        	String day   = data.substring(6, 8);
	                        	
	                        	data = month + "-" + day;
	                        }
	                        
	                        // 한개의 셀 데이터 저장
	                        if(i == 0) {
	                        	map.put(exKeys[cellcnt], data);
	                        } else {
	                        	map.put(miKeys[cellcnt], data);	                        	
	                        }
	                        
	                        //System.out.println(data);
	                        
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
	public List<Map<String, Object>> insertExcelPOIGoods(InputStream file) throws Exception {
		
		// map의 key정의
		String[] exKeys = { "pay_day", "expanse_type", "expanse_type_text", "category_id", "category_id_text", "payment", "expanse_name", "confer_number" };
		String[] miKeys = { "drive_day", "purpose", "start_point", "via_point", "end_point", "oil_cd", "oil_cd_text", "distance", "cost" };
		
		// 읽어들인 데이터를 저장
		List<Map<String, Object>> exList = new ArrayList<Map<String, Object>>();
		
		
		Workbook workbook = null;
		
		workbook = new XSSFWorkbook(file);
		
		//Get the number of sheets in the xlsx file
        //int numberOfSheets = workbook.getNumberOfSheets();
		
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator(); // 수식 계산 시 필요!!!!!!
		
		int numberOfSheets = 2;
         
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
                if(cnt > 1) {
                	
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
	                        if(cellcnt == 0) {
	                        	String month = data.substring(4, 6);
	                        	String day   = data.substring(6, 8);
	                        	
	                        	data = month + "-" + day;
	                        }
	                        
	                        // 한개의 셀 데이터 저장
	                        if(i == 0) {
	                        	map.put(exKeys[cellcnt], data);
	                        } else {
	                        	map.put(miKeys[cellcnt], data);	                        	
	                        }
	                        
	                        //System.out.println(data);
	                        
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
