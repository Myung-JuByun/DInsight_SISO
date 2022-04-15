package siso.exp.admin.web;

import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.admin.service.ExpanseAdminService;
import siso.exp.admin.service.ExpanseAdminVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * @Class Name : ExpanseController.java
 * @Description : EgovSample Controller Class
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
//@SessionAttributes(types = ExpanseAdminVO.class)
public class ExpanseController {
	
	/** ExpanseAdminService */
	@Autowired
	private ExpanseAdminService expanseAdminService;

	@Autowired
	protected SpringPageInitService springPageInitService;	
    
	@Autowired    
    protected SpringCmmUseService springCmmUseService;    
	
	private LoginVO loginVO;
    
	//private static final Logger logger = LoggerFactory.getLogger(ExpanseController.class);
	
	/**
	 * 경비, 마일리지 조회
	 * @param searchVO - 조회할 정보가 담긴 ExpanseAdminVO
	 * @param model
	 * @param request
	 * @return "/exp/admin/expanseAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/admin/expanseAdmin")
	public String selectExpanseList(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/exp/admin/expanseAdmin";
		
		//디폴트 년,월 설정
		Calendar calendar = Calendar.getInstance();
		
		//기본 년월
		String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
		String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
		
		//년월 검색 유무 확인후 기본 년월 값 저장
		if(!searchVO.getSh_expanse_year().equals("")) defaultExpanseYear = searchVO.getSh_expanse_year();
		if(!searchVO.getSh_expanse_month().equals("")) defaultExpanseMonth = searchVO.getSh_expanse_month();
		
		//특정월의 마지막일자
		calendar.set(Integer.parseInt(defaultExpanseYear), Integer.parseInt(defaultExpanseMonth), 1);
		String defaultExpanseDay = String.valueOf(calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		//월검색
		//inputVo.setGroupId("124");
		//List<CmmnDetailCode> monthList = egovCmmUseService.selectCmnCodeCombo(inputVo);
		//model.addAttribute("monthList", monthList);
		
		//구분
		inputVo.setGroup_id("102");
		List<CmmnDetailCode> typeList = springCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("typeList", typeList);
		
		//분류
		//List<CmmnDetailCode> categoryList = egovCmmUseService.selectCmnExpCategoryCombo(inputVo);
		//model.addAttribute("categoryList", categoryList);
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       		= loginVO.getUser_id();
		String user_name   		= loginVO.getUser_name();
		String division_cd_name	= loginVO.getDivision_name();
		String head_yn 			= loginVO.getHead_yn();
		
		searchVO.setCreator(login_id);
		searchVO.setExpanse_year(defaultExpanseYear);		
		searchVO.setExpanse_month(defaultExpanseMonth);
		
		//경비조회
		List<ExpanseAdminVO> userList = expanseAdminService.selectExpanseList(searchVO);
		model.addAttribute("resultList", userList);
		
		//마일리지 조회
		List<ExpanseAdminVO> userMileageList = expanseAdminService.selectExpanseMileageList(searchVO);
		model.addAttribute("resultMileageList", userMileageList);
		
		searchVO.setApproval_year(defaultExpanseYear);
		searchVO.setApproval_month(defaultExpanseMonth);
		searchVO.setSource_type_cd("01");
		
		//경비제출 유무 확인
		String approvalIdCount = expanseAdminService.selectExpanseStatusList(searchVO);
		
		String approvalStatus = "";
		
		if (Integer.parseInt(approvalIdCount) > 0) {
			approvalStatus = "Y";
		} else {
			approvalStatus = "N";
		}
		
		searchVO.setApproval_status(approvalStatus);
		
		//해당월의 마지막 일자
		searchVO.setExpanse_day(defaultExpanseDay);
		
		//경비제출 결재선 지정유무		
		String paymentView = expanseAdminService.selectExpansePaymentView(searchVO);
		model.addAttribute("paymentView", paymentView);
		
		searchVO.setApproval_status(approvalStatus);
		
		//경비데이터 수량
		searchVO.setExpanse_count(String.valueOf(userList.size()));
		
		//마일리지 데이터 수량
		searchVO.setMileage_count(String.valueOf(userMileageList.size()));
		
		//경비제출 결재선 지정유무(결재선 카운트 수)
		searchVO.setPayment_count(paymentView);
		
		//년월 디폴트값 설정
		searchVO.setSh_expanse_year(defaultExpanseYear);
		searchVO.setSh_expanse_month(defaultExpanseMonth);
		
		//이름, 부서정보 디폴트값 설정(인쇄표시에 사용)
		searchVO.setUser_name(user_name);
		searchVO.setDivision_cd_name(division_cd_name);
		
		//부서장 여부
		searchVO.setHead_yn(head_yn);
		
		//검색조건을 vo에 담는다.
		model.addAttribute("params", searchVO);
		
		return pageUrl;
	}
	
	/**
	 * 경비저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminInsert")
	public void expanseAdminInsert(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String in_expanse_id = "";
		String in_pay_day = "";
		String in_expanse_type = "";
		String in_category_id = "";
		String in_payment = "";
		String in_expanse_name = "";
		String in_confer_number = "";
		
		//System.out.println(searchVO);
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//기존 데이터 삭제 처리 후 저장 하는방식으로 적용
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setCreator(login_id);
		
		expanseAdminService.expanseDelete(searchVO);
		
		//저장 및 업데이트 처리
		List<ExpanseAdminVO> inputListVo  = new ArrayList<ExpanseAdminVO>();
		
		//처음 값은 복사용 값이므로 제외 시킴
		for(int cnt=1; cnt < searchVO.getIn_pay_day().length; cnt++) {
			
			ExpanseAdminVO expanseAdminVO  = new ExpanseAdminVO();
			
			//파라미터 값을 찾아온다
			in_expanse_id = searchVO.getIn_expanse_id()[cnt];
			in_pay_day = searchVO.getIn_pay_day()[cnt];
			in_expanse_type = searchVO.getIn_expanse_type()[cnt];
			in_category_id = searchVO.getIn_category_id()[cnt];
			in_payment = searchVO.getIn_payment()[cnt];
			in_expanse_name = searchVO.getIn_expanse_name()[cnt];
			in_confer_number = searchVO.getIn_confer_number()[cnt];
			
			//날짜 치환
			in_pay_day = searchVO.getSh_expanse_year() + in_pay_day.replace("-", "");
			
			//금액 , 치환
			in_payment = in_payment.replace(",", "");
			
			if (SpringStringUtil.isEmpty(in_expanse_id)) {
				in_expanse_id = null;
			}
			
			//vo에 값을 답는다
			expanseAdminVO.setExpanse_id(in_expanse_id);
			expanseAdminVO.setPay_day(in_pay_day);
			expanseAdminVO.setExpanse_type(in_expanse_type);
			expanseAdminVO.setCategory_id(in_category_id);
			expanseAdminVO.setPayment(in_payment);
			expanseAdminVO.setExpanse_year(searchVO.getSh_expanse_year());
			expanseAdminVO.setExpanse_month(searchVO.getSh_expanse_month());
			expanseAdminVO.setExpanse_name(in_expanse_name);
			expanseAdminVO.setConfer_number(in_confer_number);
			expanseAdminVO.setCreator(login_id);
			expanseAdminVO.setModifier(login_id);
			expanseAdminVO.setLast_division_cd(loginVO.getLast_division_cd());
			expanseAdminVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
			
			inputListVo.add(expanseAdminVO);
		}
		
		expanseAdminService.expanseInsert(inputListVo);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();

	}
	
	/**
	 * 결재선 유무확인
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expansePaymentCount")
	public void expansePaymentCount(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//회원정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
			int login_id       		= loginVO.getUser_id();
			
			searchVO.setCreator(login_id);
			searchVO.setSource_type_cd(searchVO.getSource_type_cd());
			
			//경비제출 결재선 지정유무		
			String paymentView = expanseAdminService.selectExpansePaymentView(searchVO);
			
			str_resData = paymentView;
		
		} catch(Exception ex) {
			
			str_resData = "fail";
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}	
	
	/**
	 * 경비지급 요청서 결재라인 + 표지 + 상세데이터(인쇄)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminPrintTotalDetail")
	public void expanseAdminPrintTotalDetail(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		//loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();		
		//int login_id       =  loginVO.getUserId();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		//searchVO.setCreator(login_id);
		searchVO.setCreator(Integer.parseInt(searchVO.getSh_user_id()));
		searchVO.setSource_type_cd("01");
		searchVO.setSource_object_id(searchVO.getSource_object_id());
		
		//결재라인 조회
		List<ExpanseAdminVO> paymentLineList = expanseAdminService.expansePrintPayment(searchVO);
		
		//표지데이터 조회
		List<ExpanseAdminVO> totalPriceList = expanseAdminService.expansePrintTotalPrice(searchVO);
		
		//경비조회
		List<ExpanseAdminVO> userList = expanseAdminService.selectExpanseList(searchVO);
		
		//경비조회 데이터 분할(개인법인 - 302, 개인신용 - 301, 개인현금 - 303, 공통법인 - 304)
		List<ExpanseAdminVO> userListArr301  = new ArrayList<ExpanseAdminVO>();
		List<ExpanseAdminVO> userListArr302  = new ArrayList<ExpanseAdminVO>();
		List<ExpanseAdminVO> userListArr303  = new ArrayList<ExpanseAdminVO>();
		List<ExpanseAdminVO> userListArr304  = new ArrayList<ExpanseAdminVO>();		
		
		//경비조회 리스트 수 만큼 루프
		for(int cnt=0; cnt < userList.size(); cnt++) {
			
			ExpanseAdminVO expanseAdminVO  = new ExpanseAdminVO();
			
			expanseAdminVO = (userList.get(cnt));
			
			String expanse_type = expanseAdminVO.getExpanse_type();
			
			if("301".equals(expanse_type)){
				userListArr301.add(expanseAdminVO);
			}else if("302".equals(expanse_type)){
				userListArr302.add(expanseAdminVO);
			}else if("303".equals(expanse_type)){
				userListArr303.add(expanseAdminVO);
			}else if("304".equals(expanse_type)){
				userListArr304.add(expanseAdminVO);
			}
		}
		
		//마일리지 조회
		List<ExpanseAdminVO> userMileageList = expanseAdminService.selectExpanseMileageList(searchVO);
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		//구분
		inputVo.setGroup_id("102");
		List<CmmnDetailCode> typeList = springCmmUseService.selectCmnCodeCombo(inputVo);
		
		Map<String, Object> map_d = new HashMap<String, Object>();
		map_d.put("dataPLineList", paymentLineList);
		map_d.put("dataTPriceList", totalPriceList);
		map_d.put("dataExList301", userListArr301);
		map_d.put("dataExList302", userListArr302);
		map_d.put("dataExList303", userListArr303);
		map_d.put("dataExList304", userListArr304);
		map_d.put("dataExMList", userMileageList);
		map_d.put("dataLoopList", typeList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map_d);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 경비제출
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminFinalInsert")
	@ResponseBody
	public void expanseAdminFinalInsert(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setStatus_cd(Globals.EXP_ING_STATUS_CD);
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		//개인경비 달별 승인정보 저장
		int monthlyId = expanseAdminService.expanseFinalMonthlyInsert(searchVO);		
		searchVO.setExpanse_monthly_id(monthlyId);
		
		//개인경비 정보 수정
		expanseAdminService.expanseFinalUpdate(searchVO);
		
		//마일리지 정보 수정
		expanseAdminService.expanseFinalMileageUpdate(searchVO);
		
		String approval_name = searchVO.getSh_expanse_year() + "년 " + searchVO.getSh_expanse_month() + "월 경비지급요청서";
		String source_type_cd = "01";
		
		searchVO.setApproval_year(searchVO.getSh_expanse_year());
		searchVO.setApproval_month(searchVO.getSh_expanse_month());
		searchVO.setApproval_name(approval_name);
		searchVO.setSource_type_cd(source_type_cd);
		searchVO.setSource_object_id(String.valueOf(monthlyId));
		
		//결재 요청서 저장
		int approvalId = expanseAdminService.expanseFinalApprovalInsert(searchVO);		
		searchVO.setApproval_id(approvalId);
		
		//결재 승인정보 저장
		expanseAdminService.expanseFinalApprovalNodeInsert(searchVO);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();

	}
	
	/**
	 * 마일리지 저장
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminMileageInsert")
	public void expanseAdminMileageInsert(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String in_mileage_id = "";
		String in_drive_day = "";
		String in_purpose = "";
		String in_start_point = "";
		String in_via_point = "";
		String in_end_point = "";
		String in_oil_cd = "";
		String in_distance = "";
		String in_cost = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//기존 데이터 삭제 처리 후 저장 하는방식으로 적용
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setCreator(login_id);
		
		expanseAdminService.expanseMileageDelete(searchVO);
				
		//저장 및 업데이트 처리
		List<ExpanseAdminVO> inputListVo  = new ArrayList<ExpanseAdminVO>();
		
		//처음 값은 복사용 값이므로 제외 시킴
		for(int cnt=1; cnt < searchVO.getIn_drive_day().length; cnt++) {
			
			ExpanseAdminVO expanseAdminVO  = new ExpanseAdminVO();
			
			//파라미터 값을 찾아온다
			in_mileage_id = searchVO.getIn_mileage_id()[cnt];
			in_drive_day = searchVO.getIn_drive_day()[cnt];
			in_purpose = searchVO.getIn_purpose()[cnt];
			in_start_point = searchVO.getIn_start_point()[cnt];
			in_via_point = searchVO.getIn_via_point()[cnt];
			in_end_point = searchVO.getIn_end_point()[cnt];
			in_oil_cd = searchVO.getIn_oil_cd()[cnt];
			in_distance = searchVO.getIn_distance()[cnt];
			in_cost = searchVO.getIn_cost()[cnt];
			
			//날짜 치환
			in_drive_day = searchVO.getSh_expanse_year() + in_drive_day.replace("-", "");
			
			//금액 , 치환
			in_distance = in_distance.replace(",", "");
			in_cost = in_cost.replace(",", "");
			
			if (SpringStringUtil.isEmpty(in_mileage_id)) {
				in_mileage_id = null;
			}
			
			//vo에 값을 답는다
			expanseAdminVO.setMileage_id(in_mileage_id);
			expanseAdminVO.setDrive_day(in_drive_day);
			expanseAdminVO.setPurpose(in_purpose);
			expanseAdminVO.setStart_point(in_start_point);
			expanseAdminVO.setVia_point(in_via_point);
			expanseAdminVO.setEnd_point(in_end_point);
			expanseAdminVO.setOil_cd(in_oil_cd);
			expanseAdminVO.setDistance(in_distance);
			expanseAdminVO.setCost(in_cost);
			expanseAdminVO.setCreator(login_id);
			expanseAdminVO.setModifier(login_id);
			expanseAdminVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
			
			inputListVo.add(expanseAdminVO);
		}
		
		//마일리지저장
		expanseAdminService.expanseMileageInsert(inputListVo);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print("success");
		pw.flush();

	}
	
	/**
	 * 엑셀업로드
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminExcelUpload")
	@ResponseBody
	public void expanseAdminExcelUpload(HttpServletRequest request, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
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
						
						List<Map<String, Object>> exList = expanseAdminService.insertExcelGoods(fis);
						
						ObjectMapper om = new ObjectMapper();
					    str_resData = om.writeValueAsString(exList);
						
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
						
						List<Map<String, Object>> exList = expanseAdminService.insertExcelPOIGoods(fis);
						
						ObjectMapper om = new ObjectMapper();
					    str_resData = om.writeValueAsString(exList);
						
						
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
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 경비지급 요청서 결재라인 결제유무(인쇄) - 사용안함
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminPrintPayment")
	public void expanseAdminPrintPayment(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setCreator(login_id);
		searchVO.setSource_type_cd("01");
										
		List<ExpanseAdminVO> userList = expanseAdminService.expansePrintPayment(searchVO);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(userList);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 경비지급 요청서 표지(인쇄) - 사용안함
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminPrintTotalPrice")
	public void expanseAdminPrintTotalPrice(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setCreator(login_id);
										
		List<ExpanseAdminVO> userList = expanseAdminService.expansePrintTotalPrice(searchVO);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(userList);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 경비지급 요청서 상세데이터(인쇄) - 사용안함
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/admin/expanseAdminPrintDataDetail")
	public void expanseAdminPrintDataDetail(@ModelAttribute("searchVO") ExpanseAdminVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setExpanse_month(searchVO.getSh_expanse_month());
		searchVO.setCreator(login_id);
		
		//경비조회
		List<ExpanseAdminVO> userList = expanseAdminService.selectExpanseList(searchVO);
		model.addAttribute("resultList", userList);
		
		//마일리지 조회
		List<ExpanseAdminVO> userMileageList = expanseAdminService.selectExpanseMileageList(searchVO);
		model.addAttribute("resultMileageList", userMileageList);
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		//구분
		inputVo.setGroup_id("102");
		List<CmmnDetailCode> typeList = springCmmUseService.selectCmnCodeCombo(inputVo);
		
		Map<String, Object> map_d = new HashMap<String, Object>();
		map_d.put("dataExList", userList);
		map_d.put("dataExMList", userMileageList);
		map_d.put("dataLoopList", typeList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map_d);
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
}
