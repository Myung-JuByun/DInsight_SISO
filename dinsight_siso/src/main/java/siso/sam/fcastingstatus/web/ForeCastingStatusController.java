package siso.sam.fcastingstatus.web;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.BusinessUtil;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sam.fcastingstatus.service.ForeCastingStatusService;
import siso.sam.fcastingstatus.service.ForeCastingStatusVO;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ForeCastingStatusController.java
 * @Description : ForeCastingStatusController Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class ForeCastingStatusController {

	/** ForeCastingStatusService */
	@Autowired
	private ForeCastingStatusService foreCastingStatusService;
	
	/** PaymentService */
	@Autowired
	private PaymentService paymentService;
	
	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;

	/** EgovPageInitService */
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	/** EgovMessageSource */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
		
	//private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);
	
	/**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/sam/fcastingstatus/foreCastingStatus"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sam/fcastingstatus/foreCastingStatus")
	public String foreCastingStatusURL(@ModelAttribute("searchVO") ForeCastingStatusVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sam/fcastingstatus/foreCastingStatus";
		
		try {
		
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월주
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			String defaultExpanseWeek  = Integer.toString(calendar.get(Calendar.WEEK_OF_MONTH));
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_sales_year().equals("")) defaultExpanseYear = searchVO.getSh_sales_year();
			if(!searchVO.getSh_sales_month().equals("")) defaultExpanseMonth = searchVO.getSh_sales_month();
			if(!searchVO.getSh_sales_week().equals("")) defaultExpanseWeek = searchVO.getSh_sales_week();
			
			searchVO.setSh_sales_year(defaultExpanseYear);
			searchVO.setSh_sales_month(defaultExpanseMonth);
			searchVO.setSh_sales_week(defaultExpanseWeek);
			
			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);
			
			//좌측, 우측 메뉴정보
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
		
		return pageUrl;
	}
	
	/**
	 * Forecasting 현황 리스트 출력
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sam/fcastingstatus/foreCastingStatusList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sam/fcastingstatus/foreCastingStatusList")
	public void foreCastingStatusList(@ModelAttribute("searchVO") ForeCastingStatusVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		String division_cd = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		//int login_id       	=	loginVO.getUserId();
		String grant_id		=	loginVO.getGrant_id();
		
		//담당영업
		if(grant_id.indexOf("2") >= 0) {
			//관리 권한의 경우 모든 데이터 조회 가능
			division_cd = "1101";
		}else if(grant_id.indexOf("4") >= 0 || grant_id.indexOf("5") >= 0) {
			//부서장, 임원
			division_cd = loginVO.getLast_division_cd();
		}else{
			//영업, 일반, 관리자, 오퍼레이터, 팀장
			division_cd = loginVO.getOperation_cd();			
		}
		
		if (SpringStringUtil.isEmpty(division_cd)) {
			division_cd = loginVO.getLast_division_cd();
		}
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		BusinessUtil businessUtil = new BusinessUtil();
		
		//하위 부서검색
		List<String> divisionChild = businessUtil.divisionChildSearch(divisionList, division_cd, "A");
		
		//하위부서에 자신의 사업부도 포함시킴
		divisionChild.add(division_cd);
		
		//검색
		List<String> division_cd_arr  		=	new ArrayList<String>();
		List<String> contract_ym_arr  		=	new ArrayList<String>();
		List<String> sales_status_cd_arr  	=	new ArrayList<String>();
		List<String> user_id_arr  			=	new ArrayList<String>();
		List<String> sales_type_cd_arr		=	new ArrayList<String>();
		List<String> issue_yn_arr			=	new ArrayList<String>();
		
		if (searchVO.getSh_division_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_division_cd().length; cnt++) {
				division_cd_arr.add(searchVO.getSh_division_cd()[cnt]);
			}
			
			searchVO.setDivision_cd_list(division_cd_arr);			
		} else {			
			searchVO.setDivision_child_list(divisionChild);
		}
		
		if(searchVO.getSh_contract_ym() != null) {
			for(int cnt=0; cnt < searchVO.getSh_contract_ym().length; cnt++) {
				contract_ym_arr.add(searchVO.getSh_contract_ym()[cnt]);			
			}
			
			searchVO.setContract_ym_list(contract_ym_arr);
		}
		
		if(searchVO.getSh_sales_status_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_sales_status_cd().length; cnt++) {
				sales_status_cd_arr.add(searchVO.getSh_sales_status_cd()[cnt]);	
			}
			
			searchVO.setSales_status_cd_list(sales_status_cd_arr);
		}
		
		if(searchVO.getSh_user_id() != null) {
			for(int cnt=0; cnt < searchVO.getSh_user_id().length; cnt++) {
				user_id_arr.add(searchVO.getSh_user_id()[cnt]);			
			}
			
			searchVO.setUser_id_list(user_id_arr);
		}
		
		if(searchVO.getSh_sales_type_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_sales_type_cd().length; cnt++) {
				sales_type_cd_arr.add(searchVO.getSh_sales_type_cd()[cnt]);			
			}
		
			searchVO.setSales_type_cd_list(sales_type_cd_arr);			
		}
		
		if(searchVO.getSh_issue_yn() != null) {
			for(int cnt=0; cnt < searchVO.getSh_issue_yn().length; cnt++) {
				issue_yn_arr.add(searchVO.getSh_issue_yn()[cnt]);			
			}
	
			searchVO.setIssue_yn_list(issue_yn_arr);
		}
		
		//Sales Status 리스트
		List<ForeCastingStatusVO> fStatusList = foreCastingStatusService.fCastingStatusList(searchVO);
		
		//Sales Status 상세 리스트
		List<ForeCastingStatusVO> fStatusDetailList = foreCastingStatusService.fCastingStatusDetailList(searchVO);
		
		ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
		
		//구분
		inputVO.setGroup_id("116");
		List<CmmnDetailCode> salesTypeList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//영업 status
		inputVO.setGroup_id("115");		
		List<CmmnDetailCode> salesStatusList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		ProjectCodeVO projectCodeVO = new ProjectCodeVO();
		
		projectCodeVO.setDivision_child_list(divisionChild);
		
		//담당영업
		List<ProjectCodeVO> divisionUsers = projectCodeService.projectDivisionUserList(projectCodeVO);
		
		//담당부서
		List<ProjectCodeVO> division = projectCodeService.projectDivisionList(projectCodeVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("fStatusList", fStatusList);
		map.put("fStatusDetailList", fStatusDetailList);
		map.put("salesTypeList", salesTypeList);
		map.put("salesStatusList", salesStatusList);
		map.put("divisionUsers", divisionUsers);
		map.put("division", division);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * Forecasting 현황 검색(사용안함)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sam/fcastingstatus/foreCastingStatusSearch"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sam/fcastingstatus/foreCastingStatusSearch")
	public void foreCastingStatusSearch(@ModelAttribute("searchVO") ForeCastingStatusVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		String division_cd = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		//int login_id       	=	loginVO.getUserId();
		String grant_id		=	loginVO.getGrant_id();
		
		//담당영업
		//부서장, 임원
		if(grant_id.indexOf("4") >= 0 || grant_id.indexOf("5") >= 0) {
			division_cd = loginVO.getLast_division_cd();
		} else {
			//영업, 일반, 관리자, 오퍼레이터, 팀장
			division_cd = loginVO.getOperation_cd();			
		}
		
		if (SpringStringUtil.isEmpty(division_cd)) {
			division_cd = loginVO.getLast_division_cd();
		}
		
		PaymentVO paymentVO = new PaymentVO();
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(paymentVO);
		
		BusinessUtil businessUtil = new BusinessUtil();
		
		//하위 부서검색
		List<String> divisionChild = businessUtil.divisionChildSearch(divisionList, division_cd, "A");
		
		//하위부서에 자신의 사업부도 포함시킴
		divisionChild.add(division_cd);
		
		//검색
		List<String> division_cd_arr  		=	new ArrayList<String>();
		List<String> contract_ym_arr  		=	new ArrayList<String>();
		List<String> sales_status_cd_arr  	=	new ArrayList<String>();
		List<String> user_id_arr  			=	new ArrayList<String>();
		List<String> sales_type_cd_arr		=	new ArrayList<String>();
		List<String> issue_yn_arr			=	new ArrayList<String>();
		
		if (searchVO.getSh_division_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_division_cd().length; cnt++) {
				division_cd_arr.add(searchVO.getSh_division_cd()[cnt]);
			}
			
			searchVO.setDivision_cd_list(division_cd_arr);			
		} else {			
			searchVO.setDivision_child_list(divisionChild);
		}
		
		if(searchVO.getSh_contract_ym() != null) {
			for(int cnt=0; cnt < searchVO.getSh_contract_ym().length; cnt++) {
				contract_ym_arr.add(searchVO.getSh_contract_ym()[cnt]);			
			}
			
			searchVO.setContract_ym_list(contract_ym_arr);
		}
		
		if(searchVO.getSh_sales_status_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_sales_status_cd().length; cnt++) {
				sales_status_cd_arr.add(searchVO.getSh_sales_status_cd()[cnt]);	
			}
			
			searchVO.setSales_status_cd_list(sales_status_cd_arr);
		}
		
		if(searchVO.getSh_user_id() != null) {
			for(int cnt=0; cnt < searchVO.getSh_user_id().length; cnt++) {
				user_id_arr.add(searchVO.getSh_user_id()[cnt]);			
			}
			
			searchVO.setUser_id_list(user_id_arr);
		}
		
		if(searchVO.getSh_sales_type_cd() != null) {
			for(int cnt=0; cnt < searchVO.getSh_sales_type_cd().length; cnt++) {
				sales_type_cd_arr.add(searchVO.getSh_sales_type_cd()[cnt]);			
			}
		
			searchVO.setSales_type_cd_list(sales_type_cd_arr);			
		}
		
		if(searchVO.getSh_issue_yn() != null) {
			for(int cnt=0; cnt < searchVO.getSh_issue_yn().length; cnt++) {
				issue_yn_arr.add(searchVO.getSh_issue_yn()[cnt]);			
			}
	
			searchVO.setIssue_yn_list(issue_yn_arr);
		}
		
		//Sales Status 리스트
		List<ForeCastingStatusVO> fStatusList = foreCastingStatusService.fCastingStatusList(searchVO);
		
		//Sales Status 상세 리스트
		List<ForeCastingStatusVO> fStatusDetailList = foreCastingStatusService.fCastingStatusDetailList(searchVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("fStatusList", fStatusList);
		map.put("fStatusDetailList", fStatusDetailList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 품목리스트를 엑셀파일로 출력한다.
	 * @param searchVO 검색조건
	 * @return 엑셀파일
	 * @throws Exception
	 */
	@RequestMapping("/sam/fcastingstatus/foreCastingStatusExcelDown")
	public void foreCastingStatusExcelDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//파라미터명
		String dataSearch = request.getParameter("dataSearch");
		String data = request.getParameter("data");		
		
		//이스케이프 처리된 파라미터 데이터 복원
		String escapedJsonSearch = StringEscapeUtils.unescapeHtml(dataSearch);
		String escapedJson = StringEscapeUtils.unescapeHtml(data);
		
		//json 파서
		JSONParser jsonParser = new JSONParser();
		JSONObject objSearch = (JSONObject) jsonParser.parse(escapedJsonSearch);
		JSONObject obj = (JSONObject) jsonParser.parse(escapedJson);

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
        
        XSSFCellStyle cellStyleBodyNoData = objWorkBook.createCellStyle();
        cellStyleBodyNoData.setAlignment(XSSFCellStyle.ALIGN_CENTER);
        
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
		int loopSearchCnt = 0;
		int loopCnt = 0;
		int mainStartNum = 8;
		
		for(int cnt = 0; cnt<obj.size(); cnt++) {
			
			//워크시트 생성
			XSSFSheet objSheet = objWorkBook.createSheet();
			
			if(cnt == 0) {
				shName ="Sales Status";
			} else {
				shName ="Sales Status 현황";
			}
			//시트 이름
			objWorkBook.setSheetName(cnt, shName);
						
			if(cnt == 0) {
				
				//------------------------------------------------------------
				//search
				JSONArray searchArr= (JSONArray) objSearch.get("search");
								
				Iterator<?> search = searchArr.iterator();
				
				loopSearchCnt = 0;				
				while(search.hasNext()) {
					
					JSONObject innerSearchObj = (JSONObject) search.next();
					
					//행생성
					XSSFRow objSearchRow = objSheet.createRow((short)loopSearchCnt);
					//셀 생성
					XSSFCell objSearchCell = null;
			
					objSearchRow = objSheet.createRow((short)loopSearchCnt);
					
					for(int subSearchCnt=0; subSearchCnt<innerSearchObj.size(); subSearchCnt++) {
						
						String val = (String) innerSearchObj.get("codeName"+subSearchCnt);
						
						objSearchCell = objSearchRow.createCell((short)subSearchCnt);
						
						if(subSearchCnt==0) {
							objSearchCell.setCellValue(val);
							objSearchCell.setCellStyle(cellStyleHeader);
						} else {
							objSearchCell.setCellValue(val);
							objSearchCell.setCellStyle(cellStyleSearch);
						}
						
						objSheet.setColumnWidth((short)subSearchCnt,(short)6000);
					}
					
					loopSearchCnt++;
				}				
				
				//------------------------------------------------------------
				//main
				JSONArray mainArr= (JSONArray) obj.get("main");
				
				Iterator<?> main = mainArr.iterator();
				
				loopCnt = mainStartNum;
				while(main.hasNext()) {
					
					JSONObject innerObj = (JSONObject) main.next();
					
					//행생성
					XSSFRow objRow = objSheet.createRow((short)loopCnt);
					//셀 생성
					XSSFCell objCell = null;
			
					objRow = objSheet.createRow((short)loopCnt);
					
					for(int subCnt=0; subCnt<innerObj.size(); subCnt++) {
						
						String val = (String) innerObj.get("codeName"+subCnt);
						
						objCell = objRow.createCell((short)subCnt);
						
						if(loopCnt == mainStartNum) {
							objCell.setCellValue(val);
							objCell.setCellStyle(cellStyleHeader);
						} else {
							
							if(val.contains("조회된 데이터가 없습니다.")) {
								
								objCell.setCellValue(val);
								objCell.setCellStyle(cellStyleBodyNoData);
								
								objSheet.addMergedRegion(new CellRangeAddress(
										loopCnt, //first row (0-based)
										loopCnt, //last row  (0-based)
							            0, //first column (0-based)
							            6  //last column  (0-based)
							    ));
								
							} else {
							
								if(val.contains("%")) {
									objCell.setCellValue(new BigDecimal(val.replace("%", "")).floatValue());
									objCell.setCellStyle(cellStylePercent);
								} else {
									if(isNumeric(val.replace(",", ""))) {
										objCell.setCellValue(new BigDecimal(val.replace(",", "")).longValue());
										objCell.setCellStyle(cellStyleInt);
									} else {
										objCell.setCellValue(val);
										objCell.setCellStyle(cellStyleBody);
									}
								}
							}
						}
						
						objSheet.setColumnWidth((short)subCnt,(short)6000);
					}
					
					loopCnt++;
				}
				
			} else {
				
				//------------------------------------------------------------
				//issue
				JSONArray issueArr= (JSONArray) obj.get("issue");
				
				Iterator<?> issue = issueArr.iterator();
				
				loopCnt = 0;
				while(issue.hasNext()) {
					
					JSONObject innerObj = (JSONObject) issue.next();
					
					//행생성
					XSSFRow objRow = objSheet.createRow((short)loopCnt);
					//셀 생성
					XSSFCell objCell = null;
			
					objRow = objSheet.createRow((short)loopCnt);
					
					for(int subCnt=0; subCnt<innerObj.size(); subCnt++) {
						
						String val = (String) innerObj.get("codeName"+subCnt);
						
						objCell = objRow.createCell((short)subCnt);
						
						if(loopCnt==0) {
							objCell.setCellValue(val);
							objCell.setCellStyle(cellStyleHeader);
						} else {
							
							if(val.contains("조회된 데이터가 없습니다.")) {
								
								objCell.setCellValue(val);
								objCell.setCellStyle(cellStyleBodyNoData);
								
								objSheet.addMergedRegion(new CellRangeAddress(
										loopCnt, //first row (0-based)
										loopCnt, //last row  (0-based)
							            0, //first column (0-based)
							            11  //last column  (0-based)
							    ));
								
							} else {
								if(val.contains("%")) {
									objCell.setCellValue(new BigDecimal(val.replace("%", "")).floatValue());
									objCell.setCellStyle(cellStylePercent);
								} else {
									if(isNumeric(val.replace(",", ""))) {
										objCell.setCellValue(new BigDecimal(val.replace(",", "")).longValue());
										objCell.setCellStyle(cellStyleInt);
									} else {
										objCell.setCellValue(val);
										objCell.setCellStyle(cellStyleBody);
									}
								}
							}
						}
						
						objSheet.setColumnWidth((short)subCnt,(short)4000);
					}
					
					loopCnt++;
				}
			}

		}
		
		String sFileName = "Forecasting_현황.xlsx";
		
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
		
		fileOut = response.getOutputStream(); 
		objWorkBook.write(fileOut);
		fileOut.close();
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
}
