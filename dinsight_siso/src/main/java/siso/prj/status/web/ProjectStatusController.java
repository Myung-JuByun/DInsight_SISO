package siso.prj.status.web;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import siso.adm.service.ComMenuVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.Globals;
import siso.prj.status.service.ProjectStatusSearchVO;
import siso.prj.status.service.ProjectStatusService;
import siso.prj.status.service.ProjectStatusVO;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ProjectStatusController {
	
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected ProjectStatusService projectStatusService;
	
	@Autowired
    protected SpringCmmUseService springCmmUseService;

	private static final Logger logger = LoggerFactory.getLogger(ProjectStatusController.class);

	@RequestMapping(value = "/prj/status/projectStatus")
	public String projectStatusHtml(@ModelAttribute("searchVO") ProjectStatusSearchVO searchVO, HttpServletRequest request, ModelMap model) throws Exception {
	    String pageUrl = "/prj/status/projectStatus";
			
	    ComMenuVO inputVO           = new ComMenuVO();
		//EgovPageHndlr egovPageHndlr = new EgovPageHndlr();
		inputVO.setMenu_url(pageUrl);
		
		try {
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();

			//기본 년월주
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			String defaultExpanseWeek  = Integer.toString(calendar.get(Calendar.WEEK_OF_MONTH));

			if ( searchVO != null ) {
				//년월 검색 유무 확인후 기본 년월 값 저장
				if(searchVO.getSh_report_yy() != null && !searchVO.getSh_report_yy().equals("")) defaultExpanseYear = searchVO.getSh_report_yy();
				if(searchVO.getSh_report_mm() != null && !searchVO.getSh_report_mm().equals("")) defaultExpanseMonth = searchVO.getSh_report_mm();
				if(searchVO.getSh_report_week() != null && !searchVO.getSh_report_week().equals("")) defaultExpanseWeek = searchVO.getSh_report_week();
			}

			searchVO.setSh_report_yy(defaultExpanseYear);
			searchVO.setSh_report_mm(defaultExpanseMonth);
			searchVO.setSh_report_week(defaultExpanseWeek);		

			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);			

			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
				
		logger.debug(pageUrl + " 호출 ");
				
		return pageUrl;
	}
	
	@RequestMapping(value = "/prj/status/projectStatusList")
	public void projectStatusList(@ModelAttribute("searchVO") ProjectStatusSearchVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String str_resData = "";
		
		try {
			/*//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();		
			
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			String defaultExpanseWeek  = Integer.toString(calendar.get(Calendar.WEEK_OF_MONTH));*/
			
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			calendar.setFirstDayOfWeek(Calendar.MONDAY); //주 시작을 월요일로 세팅(월~일)
			
			calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_report_yy()));
			calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_report_mm())-1);
			calendar.set(Calendar.WEEK_OF_MONTH, 1); //첫주
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
			
			if(Integer.parseInt(searchVO.getSh_report_mm()) != calendar.get(Calendar.MONTH)+1) {
				calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_report_yy()));
				calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_report_mm())-1);
				calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(searchVO.getSh_report_week())+1);
				calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
			} else {
				calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_report_yy()));
				calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_report_mm())-1);
				calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(searchVO.getSh_report_week()));
				calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);				
			}
			
			String SearchDate = calendar.get(Calendar.YEAR) +"-"+  String.format("%02d",calendar.get(Calendar.MONTH)+1) +"-"+ String.format("%02d",calendar.get(Calendar.DAY_OF_MONTH));
			
			searchVO.setSh_report_week_day(SearchDate);
			
			/*String reqYear = request.getParameter("sh_report_yy");
			String reqMonth = request.getParameter("sh_report_mm");
			String reqWeek = request.getParameter("sh_report_week");
			
			if ( reqYear != null && !reqYear.equals("") ) searchVO.setSh_report_yy(reqYear);
			if ( reqMonth != null && !reqMonth.equals("") ) searchVO.setSh_report_mm(reqMonth);
			if ( reqWeek != null && !reqWeek.equals("") ) searchVO.setSh_report_week(reqWeek);

			if(searchVO.getSh_report_yy() == null || searchVO.getSh_report_yy().equals("")) searchVO.setSh_report_yy(defaultExpanseYear);
			if(searchVO.getSh_report_mm() == null || searchVO.getSh_report_mm().equals("")) searchVO.setSh_report_mm(defaultExpanseMonth);
			if(searchVO.getSh_report_week() == null || searchVO.getSh_report_week().equals("")) searchVO.setSh_report_week(defaultExpanseWeek);*/
			
		} catch ( Exception e ) {
			e.printStackTrace();
		}
		
		List<ProjectStatusVO> projectStatusList = projectStatusService.selectStatusSearchList(searchVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("projectStatusList", projectStatusList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		
		projectStatusList = null;

		map = null;
		om = null;
		
		pw.flush();
	}
	
	@RequestMapping(value = "/prj/status/projectStatusExcelDown")
	public void projectStatusExcelDown( HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sFileName = "ProjectStatus_";
		
		String searchParams = 	request.getParameter("searchParam");
		String recData		=	request.getParameter("data");
		
		String escSearchParams 	= 	StringEscapeUtils.unescapeHtml(searchParams);
		String escRecData 		=	StringEscapeUtils.unescapeHtml(recData);
		
		//json 파서
		JSONParser 	jsonParser 	=	new JSONParser();
		JSONObject 	objSearch 	=	(JSONObject) jsonParser.parse(escSearchParams);
		JSONObject	objData		=	(JSONObject) jsonParser.parse(escRecData);
		
		//워크북 생성
		XSSFWorkbook objWorkBook = new XSSFWorkbook();
		
		//------------------------------------------------------------
		// Cell 스타일 생성
        XSSFCellStyle cellStyleHeader = objWorkBook.createCellStyle();
        XSSFFont headerFont = objWorkBook.createFont();
        headerFont.setBold(true);
        XSSFDataFormat fmt = objWorkBook.createDataFormat();		

        // Cell 색깔, 무늬 채우기
        cellStyleHeader.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        cellStyleHeader.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
        cellStyleHeader.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        cellStyleHeader.setFont(headerFont);
        cellStyleHeader.setBorderBottom((short)1);
        cellStyleHeader.setBorderLeft((short)1);
        cellStyleHeader.setBorderRight((short)1);
        cellStyleHeader.setBorderTop((short)1);
        
        XSSFCellStyle cellStyleBody = objWorkBook.createCellStyle();
        cellStyleBody.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        cellStyleBody.setBorderBottom((short)1);
        cellStyleBody.setBorderLeft((short)1);
        cellStyleBody.setBorderRight((short)1);
        cellStyleBody.setBorderTop((short)1);
        
        XSSFCellStyle cellStyleInt = objWorkBook.createCellStyle();
        cellStyleInt.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
        cellStyleInt.setDataFormat(fmt.getFormat("#,##0"));
        cellStyleInt.setBorderBottom((short)1);
        cellStyleInt.setBorderLeft((short)1);
        cellStyleInt.setBorderRight((short)1);
        cellStyleInt.setBorderTop((short)1);
        
        XSSFCellStyle cellStylePercent = objWorkBook.createCellStyle();
        cellStylePercent.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
        cellStylePercent.setDataFormat(fmt.getFormat("0.00"));
        cellStylePercent.setBorderBottom((short)1);
        cellStylePercent.setBorderLeft((short)1);
        cellStylePercent.setBorderRight((short)1);
        cellStylePercent.setBorderTop((short)1);
        
        XSSFCellStyle cellStyleSearch = objWorkBook.createCellStyle();
        cellStyleSearch.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        cellStyleSearch.setBorderBottom((short)1);
        cellStyleSearch.setBorderLeft((short)1);
        cellStyleSearch.setBorderRight((short)1);
        cellStyleSearch.setBorderTop((short)1);
        //------------------------------------------------------------

		String shName = "";
		
		//워크시트 생성
		XSSFSheet objSheet = objWorkBook.createSheet();
		
		shName = "Project Status";
		
		//시트 이름
		objWorkBook.setSheetName(0, shName);
		
        
        
		JSONArray	searchArr	=	(JSONArray) objSearch.get("search");
		
		Iterator<?> search = searchArr.iterator();
		
		int loopSearchCnt = 0;
		
		String report_year = "", report_month = "", report_week = "";
		String project_name = "", company_name = "";
		String member_name = "", member_job_type = "", member_employee = "", member_role = "", member_stay = "";
		
		while(search.hasNext()) {
			JSONObject innerSearchObj = (JSONObject) search.next();

			if ( innerSearchObj.get("name").toString().equals("sh_report_yy")) {
				sFileName	=	sFileName.concat( innerSearchObj.get("value").toString() ).concat("년_");
				report_year	=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("sh_report_mm")) {
				sFileName	=	sFileName.concat( innerSearchObj.get("value").toString() ).concat("월_");
				report_month=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("sh_report_week")) {
				sFileName	=	sFileName.concat( innerSearchObj.get("value").toString() ).concat("주차.xlsx");
				report_week=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("sh_project_name")) {
				project_name=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("sh_company_name")) {
				company_name=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("project_member_name")) {
				member_name=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("search_job_type")) {
				member_job_type=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("search_employee_type")) {
				member_employee=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("search_role_type")) {
				member_role=	innerSearchObj.get("value").toString();
			} else if ( innerSearchObj.get("name").toString().equals("search_stay_type")) {
				member_stay=	innerSearchObj.get("value").toString();
			}
		}
		
		XSSFRow objRow 		= 	objSheet.createRow((short)loopSearchCnt);
		
		XSSFCell objCell	=	null;
		
		objCell				=	objRow.createCell(0);
		objCell.setCellValue("보고주차");
		objCell.setCellStyle(cellStyleHeader);

		objCell				=	objRow.createCell(1);
		objCell.setCellValue(report_year.concat(" 년 ").concat(report_month).concat(" 월 ").concat(report_week).concat(" 주차"));
		objCell.setCellStyle(cellStyleSearch);
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 1, 8) );
		objCell				=	objRow.createCell(2);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(3);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(4);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(5);
		objCell.setCellStyle(cellStyleSearch);		
		objCell				=	objRow.createCell(6);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(7);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(8);
		objCell.setCellStyle(cellStyleSearch);		

		loopSearchCnt ++;
		objRow 		= 	objSheet.createRow((short)loopSearchCnt);
		objCell				=	objRow.createCell(0);
		objCell.setCellValue("프로젝트");
		objCell.setCellStyle(cellStyleHeader);

		objCell				=	objRow.createCell(1);
		objCell.setCellValue(project_name);
		objCell.setCellStyle(cellStyleSearch);
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 1, 3) );

		objCell				=	objRow.createCell(2);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(3);
		objCell.setCellStyle(cellStyleSearch);
		
		objCell				=	objRow.createCell(4);
		objCell.setCellValue("고객사");
		objCell.setCellStyle(cellStyleHeader);

		objCell				=	objRow.createCell(5);
		objCell.setCellValue(company_name);
		objCell.setCellStyle(cellStyleSearch);
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 5, 8) );

		objCell				=	objRow.createCell(6);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(7);
		objCell.setCellStyle(cellStyleSearch);
		objCell				=	objRow.createCell(8);
		objCell.setCellStyle(cellStyleSearch);		
		
		loopSearchCnt ++;
		
		objRow 		= 	objSheet.createRow((short)loopSearchCnt);

		objCell				=	objRow.createCell(0);
		objCell.setCellValue("투입 인원 ");
		objCell.setCellStyle(cellStyleHeader);

		objCell				=	objRow.createCell(1);
		objCell.setCellValue(member_name);
		objCell.setCellStyle(cellStyleSearch);
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 1, 2) );		
		objCell				=	objRow.createCell(2);
		objCell.setCellStyle(cellStyleSearch);
		
		objCell				=	objRow.createCell(3);
		objCell.setCellValue(member_job_type);
		objCell.setCellStyle(cellStyleSearch);
		
		objCell				=	objRow.createCell(4);
		objCell.setCellValue(member_employee);
		objCell.setCellStyle(cellStyleSearch);
		
		objCell				=	objRow.createCell(5);
		objCell.setCellValue(member_role);
		objCell.setCellStyle(cellStyleSearch);		
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 5, 6) );		
		objCell				=	objRow.createCell(6);
		objCell.setCellStyle(cellStyleSearch);

		objCell				=	objRow.createCell(7);
		objCell.setCellValue(member_stay);
		objCell.setCellStyle(cellStyleSearch);		
		objSheet.addMergedRegion ( new CellRangeAddress ( (short)loopSearchCnt, (short)loopSearchCnt, 7, 8) );		
		objCell				=	objRow.createCell(8);
		objCell.setCellStyle(cellStyleSearch);

		loopSearchCnt ++;
		
		sFileName = new String ( sFileName.getBytes("KSC5601"), "8859_1");

		response.reset(); 	// 이 문장이 없으면 excel 등의 파일에서 한글이 깨지는 문제 발생.

		String strClient = request.getHeader("User-Agent");

		String fileName = sFileName;

		if (strClient.indexOf("MSIE 5.5") > -1) {
			//response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "filename=" + fileName + ";");
		} else {
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ";");
		}

		OutputStream fileOut = null;
		
		JSONArray	dataArr	=	(JSONArray) objData.get("data");
		
		search = dataArr.iterator();
		
		loopSearchCnt ++;
		
		int dataHeaderIdx = loopSearchCnt;
		
		while(search.hasNext()) {
			JSONObject innerSearchObj = (JSONObject) search.next();
			
			objRow 		= 	objSheet.createRow((short)loopSearchCnt);
			
			objCell	=	null;
			
			for(int subSearchCnt=0; subSearchCnt<innerSearchObj.size(); subSearchCnt++) {
				String val = (String) innerSearchObj.get("codeName" + subSearchCnt);
				
				objCell		=	objRow.createCell((short) subSearchCnt);
				
				if ( loopSearchCnt == dataHeaderIdx ) {
					objCell.setCellValue(val);
					objCell.setCellStyle(cellStyleHeader);
				} else {
					objCell.setCellValue(val);
					objCell.setCellStyle(cellStyleBody);
				}
				if ( subSearchCnt == 3 ) {
					objSheet.setColumnWidth ( (short) subSearchCnt, (short) 9000 );
				} else if ( subSearchCnt == 4 ) {
					objSheet.setColumnWidth ( (short) subSearchCnt, (short) 5000 );
				} 
			}
			loopSearchCnt ++;			

		}
		
		
		
		
		

		
		/*
		XSSFCell objCell = null;
		
		objCell = objRow.createCell(0);
		
		objCell.setCellValue("1");
		*/
		
		
	
		fileOut = response.getOutputStream(); 
		objWorkBook.write(fileOut);
		fileOut.close();	
	}
	
	
	@RequestMapping( value="/prj/status/projectStatusSearchCondList")
	public void projectStatusJobTypeList(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String str_resData = "";
		
		ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
		
		List<ProjectStatusSearchVO> projectMembers = projectStatusService.selectStatusMemberList();
		
		//직급 코드
		inputVO.setGroup_id("104");
		List<CmmnDetailCode> jobType = springCmmUseService.selectCmnCodeCombo(inputVO);

		//고용 구분
		inputVO.setGroup_id("111");
		List<CmmnDetailCode> employeeType = springCmmUseService.selectCmnCodeCombo(inputVO);

		//역활 구분
		inputVO.setGroup_id("110");
		List<CmmnDetailCode> roleType = springCmmUseService.selectCmnCodeCombo(inputVO);

		//상주 상태
		inputVO.setGroup_id("112");
		List<CmmnDetailCode> stayType = springCmmUseService.selectCmnCodeCombo(inputVO);

		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("memberList", projectMembers);
		map.put("jobType", jobType);
		map.put("employeeType", employeeType);
		map.put("roleType", roleType);
		map.put("stayType", stayType);
				
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		
		projectMembers = null;
		jobType = null;
		employeeType = null;
		roleType = null;
		stayType = null;

		map = null;
		om = null;
		
		pw.flush();
		
	}

}

