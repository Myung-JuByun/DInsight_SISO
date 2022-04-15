package siso.prj.report.web;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
import siso.exp.approval.service.ApprovalService;
import siso.exp.approval.service.ApprovalVO;
import siso.prj.report.service.ProjectReportService;
import siso.prj.report.service.ProjectReportVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProjectReportController.java
 * @Description : ProjectReportController Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
@Controller
//@SessionAttributes(types = ProjectReportVO.class)
public class ProjectReportController {
	
	/** ProjectReportService */
	@Autowired
	private ProjectReportService projectReportService;
	
	/** ApprovalService */
	@Autowired
	private ApprovalService approvalService;
	
	/** ExpanseAdminService */
	@Autowired
	private ExpanseAdminService expanseAdminService;

	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
	
	/**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/prj/report/projectReport"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/report/projectReport")
	public String projectReportURL(@ModelAttribute("searchVO") ProjectReportVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/prj/report/projectReport";
		
		try {
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월주
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			String defaultExpanseWeek  = Integer.toString(calendar.get(Calendar.WEEK_OF_MONTH));
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_project_year().equals("")) defaultExpanseYear = searchVO.getSh_project_year();
			if(!searchVO.getSh_project_month().equals("")) defaultExpanseMonth = searchVO.getSh_project_month();
			if(!searchVO.getSh_project_week().equals("")) defaultExpanseWeek = searchVO.getSh_project_week();
			
			searchVO.setSh_project_year(defaultExpanseYear);
			searchVO.setSh_project_month(defaultExpanseMonth);
			searchVO.setSh_project_week(defaultExpanseWeek);
			
			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);
			
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
			
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
		
		return pageUrl;
	}
	
	/**
	 * 리스트 조회
	 * @param searchVO - 조회할 정보가 담긴 ProjectReportSearchVO
	 * @param model
	 * @param request
	 * @return "/prj/report/projectReportList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prj/report/projectReportList")
	public void selectReportList(@ModelAttribute("searchVO") ProjectReportVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			calendar.setFirstDayOfWeek(Calendar.MONDAY); //주 시작을 월요일로 세팅(월~일)
			
			calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_project_year()));
			calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_project_month())-1);
			calendar.set(Calendar.WEEK_OF_MONTH, 1); //첫주
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
			
			if(Integer.parseInt(searchVO.getSh_project_month()) != calendar.get(Calendar.MONTH)+1) {
				calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_project_year()));
				calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_project_month())-1);
				calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(searchVO.getSh_project_week())+1);
				calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
			} else {
				calendar.set(Calendar.YEAR, Integer.parseInt(searchVO.getSh_project_year()));
				calendar.set(Calendar.MONTH, Integer.parseInt(searchVO.getSh_project_month())-1);
				calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(searchVO.getSh_project_week()));
				calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);				
			}
			
			String SearchDate = calendar.get(Calendar.YEAR) +"-"+  String.format("%02d",calendar.get(Calendar.MONTH)+1) +"-"+ String.format("%02d",calendar.get(Calendar.DAY_OF_MONTH));
			
			//회원정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
			int login_id       	=	loginVO.getUser_id();
			
			ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
			
			//근태상황
			inputVo.setGroup_id("113");		
			List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
			model.addAttribute("statusList", statusList);
			
			//MH리스트
			searchVO.setCreator(login_id);
			searchVO.setSh_project_week_day(SearchDate);
			List<ProjectReportVO> userList = projectReportService.selectProjectReportList(searchVO);
			
			//결재선 지정 유무
			ExpanseAdminVO expanseAdminVO = new ExpanseAdminVO();
			
			expanseAdminVO.setSource_type_cd("03");
			expanseAdminVO.setCreator(login_id);			
			String paymentView = expanseAdminService.selectExpansePaymentView(expanseAdminVO);
			
			//
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("statusList", statusList);
			map.put("userList", userList);
			map.put("paymentView", paymentView);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
			
		} catch(Exception ex) {
			ex.printStackTrace();
			
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();		
	}
	
	/**
	 * 일괄저장
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectReportVO - 목록 정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return "/prj/report/projectReportBatchInsert"
	 * @exception Exception
	 */
	@RequestMapping("/prj/report/projectReportBatchInsert")
	@ResponseBody
	public void projectReportBatchInsert(@ModelAttribute("searchVO") ProjectReportVO searchVO, HttpServletRequest request, ModelMap model, HttpServletResponse response) throws Exception {
		
		String commute_id	 	= "";
		String project_id	 	= "";
		String report_ym		= "";
		String report_y			= "";
		String report_m			= "";
		String report_week		= "";
		String mon_status_cd 	= "";
		String tue_status_cd 	= "";
		String wed_status_cd 	= "";
		String thu_status_cd 	= "";
		String fri_status_cd 	= "";
		String sat_status_cd 	= "";
		String sun_status_cd 	= "";		
		String mon_working_hour = "";
		String tue_working_hour = "";
		String wed_working_hour = "";
		String thu_working_hour = "";
		String fri_working_hour = "";
		String sat_working_hour = "";
		String sun_working_hour = "";
		String issue_report     = "";
		String man_hour       	= "";
		String str_resData		= "";
		
		try {
			
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			calendar.setFirstDayOfWeek(Calendar.MONDAY); //주 시작을 월요일로 세팅(월~일)
			
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			int login_id       	=	loginVO.getUser_id();
			
			//파라미터명
			String[] monthWeek = request.getParameter("monthWeek").split("/");
			
			//기간별 체크
			List<ProjectReportVO> inputListVO = new ArrayList<ProjectReportVO>();
			
			for(int mainCnt=0; mainCnt<monthWeek.length; mainCnt++){
				
				//년
				report_y = monthWeek[mainCnt].substring(0, 4);
				
				//월
				report_m = monthWeek[mainCnt].substring(4, 6);
				
				//년월
				report_ym = report_y + "" + report_m;
				
				//주
				report_week = monthWeek[mainCnt].substring(6, 7);
				
				//월요일 기준 일요일 구하기
				calendar.set(Calendar.YEAR, Integer.parseInt(report_y));
				calendar.set(Calendar.MONTH, Integer.parseInt(report_m)-1);
				calendar.set(Calendar.WEEK_OF_MONTH, 1); //첫주
				calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
				
				if(Integer.parseInt(report_m) != calendar.get(Calendar.MONTH)+1) {
					calendar.set(Calendar.YEAR, Integer.parseInt(report_y));
					calendar.set(Calendar.MONTH, Integer.parseInt(report_m)-1);
					calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(report_week)+1);
					calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
				} else {
					calendar.set(Calendar.YEAR, Integer.parseInt(report_y));
					calendar.set(Calendar.MONTH, Integer.parseInt(report_m)-1);
					calendar.set(Calendar.WEEK_OF_MONTH, Integer.parseInt(report_week));
					calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);				
				}
				
				//월기준 주간의 일요일 날짜
				String SearchDate = calendar.get(Calendar.YEAR) +"-"+  String.format("%02d",calendar.get(Calendar.MONTH)+1) +"-"+ String.format("%02d",calendar.get(Calendar.DAY_OF_MONTH));
				
				for(int cnt=0; cnt < searchVO.getIn_pop_project_id().length; cnt++) {
					
					ProjectReportVO projectReportVO = new ProjectReportVO();
					
					//commute_id			=	searchVO.getIn_pop_commute_id()[cnt];
					commute_id			=	null;
					project_id			=	searchVO.getIn_pop_project_id()[cnt];
					mon_status_cd		=	searchVO.getIn_pop_mon_status_cd()[cnt];
					tue_status_cd		=	searchVO.getIn_pop_tue_status_cd()[cnt];
					wed_status_cd		=	searchVO.getIn_pop_wed_status_cd()[cnt];
					thu_status_cd		=	searchVO.getIn_pop_thu_status_cd()[cnt];
					fri_status_cd		=	searchVO.getIn_pop_fri_status_cd()[cnt];
					sat_status_cd		=	searchVO.getIn_pop_sat_status_cd()[cnt];
					sun_status_cd		=	searchVO.getIn_pop_sun_status_cd()[cnt];
					mon_working_hour	=	searchVO.getIn_pop_mon_working_hour()[cnt];
					tue_working_hour	=	searchVO.getIn_pop_tue_working_hour()[cnt];
					wed_working_hour	=	searchVO.getIn_pop_wed_working_hour()[cnt];
					thu_working_hour	=	searchVO.getIn_pop_thu_working_hour()[cnt];
					fri_working_hour	=	searchVO.getIn_pop_fri_working_hour()[cnt];
					sat_working_hour	=	searchVO.getIn_pop_sat_working_hour()[cnt];
					sun_working_hour	=	searchVO.getIn_pop_sun_working_hour()[cnt];
					issue_report		=	"";
					man_hour			=	searchVO.getIn_pop_man_hour()[cnt];
					
					/*if (EgovStringUtil.isEmpty(commute_id)) {
						commute_id = null;
					}*/
					
					if (SpringStringUtil.isEmpty(mon_status_cd)) {
						mon_status_cd = String.valueOf("01");
					}
					if (SpringStringUtil.isEmpty(tue_status_cd)) {
						tue_status_cd = String.valueOf("01");
					}
					if (SpringStringUtil.isEmpty(wed_status_cd)) {
						wed_status_cd = String.valueOf("01");
					}
					if (SpringStringUtil.isEmpty(thu_status_cd)) {
						thu_status_cd = String.valueOf("01");
					}
					if (SpringStringUtil.isEmpty(fri_status_cd)) {
						fri_status_cd = String.valueOf("01");
					}
					if (SpringStringUtil.isEmpty(sat_status_cd)) {
						sat_status_cd = String.valueOf("02");
					}
					if (SpringStringUtil.isEmpty(sun_status_cd)) {
						sun_status_cd = String.valueOf("02");
					}
					
					
					if (SpringStringUtil.isEmpty(mon_working_hour)) {
						mon_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(tue_working_hour)) {
						tue_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(wed_working_hour)) {
						wed_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(thu_working_hour)) {
						thu_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(fri_working_hour)) {
						fri_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(sat_working_hour)) {
						sat_working_hour = String.valueOf("0");
					}
					if (SpringStringUtil.isEmpty(sun_working_hour)) {
						sun_working_hour = String.valueOf("0");
					}
					
					projectReportVO.setCommute_id(commute_id);
					projectReportVO.setProject_id(project_id);
					projectReportVO.setReport_ym(report_ym);
					projectReportVO.setReport_week(report_week);
					projectReportVO.setUser_id(String.valueOf(login_id));
					projectReportVO.setMon_status_cd(mon_status_cd);
					projectReportVO.setTue_status_cd(tue_status_cd);
					projectReportVO.setWed_status_cd(wed_status_cd);
					projectReportVO.setThu_status_cd(thu_status_cd);
					projectReportVO.setFri_status_cd(fri_status_cd);
					projectReportVO.setSat_status_cd(sat_status_cd);
					projectReportVO.setSun_status_cd(sun_status_cd);
					projectReportVO.setMon_working_hour(mon_working_hour);
					projectReportVO.setTue_working_hour(tue_working_hour);
					projectReportVO.setWed_working_hour(wed_working_hour);
					projectReportVO.setThu_working_hour(thu_working_hour);
					projectReportVO.setFri_working_hour(fri_working_hour);
					projectReportVO.setSat_working_hour(sat_working_hour);
					projectReportVO.setSun_working_hour(sun_working_hour);				
					projectReportVO.setMan_hour(man_hour);
					projectReportVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
					projectReportVO.setIssue_report(issue_report);
					projectReportVO.setCreator(login_id);
					projectReportVO.setModifier(login_id);
					
					projectReportVO.setSh_project_week_day(SearchDate);
					
					//MH데이터 존재 유무 체크
					String SearchMhCount = projectReportService.projectReportTot(projectReportVO);
					String SearchDateCheckCount = projectReportService.projectReportDateCheckTot(projectReportVO);
					
					if(SearchMhCount.equals("0") && !SearchDateCheckCount.equals("0")) {				
						inputListVO.add(projectReportVO);
					}
				}				
			}
			
			//저장
			projectReportService.projectReportInsert(inputListVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			//str_resData = "fail";
			str_resData = ex.toString();
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();		
	}
	
	/**
	 * 저장
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param projectReportVO - 목록 정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return "/prj/report/projectReportInsert"
	 * @exception Exception
	 */
	@RequestMapping("/prj/report/projectReportInsert")
	@ResponseBody
	public void projectReportInsert(@ModelAttribute("searchVO") ProjectReportVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String commute_id	 	= "";
		String project_id	 	= "";
		String report_ym		= "";
		String report_week		= "";
		String mon_status_cd 	= "";
		String tue_status_cd 	= "";
		String wed_status_cd 	= "";
		String thu_status_cd 	= "";
		String fri_status_cd 	= "";
		String sat_status_cd 	= "";
		String sun_status_cd 	= "";		
		String mon_working_hour = "";
		String tue_working_hour = "";
		String wed_working_hour = "";
		String thu_working_hour = "";
		String fri_working_hour = "";
		String sat_working_hour = "";
		String sun_working_hour = "";
		String issue_report     = "";
		String man_hour       	= "";
		String str_resData		= "";
		
		try {
			
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			int login_id       	=	loginVO.getUser_id();
			
			searchVO.setSh_project_year(searchVO.getSh_project_year());
			searchVO.setSh_project_month(searchVO.getSh_project_month());
			searchVO.setSh_project_week(searchVO.getSh_project_week());
									
			//년월
			report_ym = searchVO.getSh_project_year() + "" + searchVO.getSh_project_month();
			
			//주
			report_week = searchVO.getSh_project_week();
			
			//저장 시작
			List<ProjectReportVO> inputListVO = new ArrayList<ProjectReportVO>();
			
			for(int cnt=0; cnt < searchVO.getIn_project_id().length; cnt++) {
				
				ProjectReportVO projectReportVO = new ProjectReportVO();
				
				commute_id			=	searchVO.getIn_commute_id()[cnt];
				project_id			=	searchVO.getIn_project_id()[cnt];
				mon_status_cd		=	searchVO.getIn_mon_status_cd()[cnt];
				tue_status_cd		=	searchVO.getIn_tue_status_cd()[cnt];
				wed_status_cd		=	searchVO.getIn_wed_status_cd()[cnt];
				thu_status_cd		=	searchVO.getIn_thu_status_cd()[cnt];
				fri_status_cd		=	searchVO.getIn_fri_status_cd()[cnt];
				sat_status_cd		=	searchVO.getIn_sat_status_cd()[cnt];
				sun_status_cd		=	searchVO.getIn_sun_status_cd()[cnt];
				mon_working_hour	=	searchVO.getIn_mon_working_hour()[cnt];
				tue_working_hour	=	searchVO.getIn_tue_working_hour()[cnt];
				wed_working_hour	=	searchVO.getIn_wed_working_hour()[cnt];
				thu_working_hour	=	searchVO.getIn_thu_working_hour()[cnt];
				fri_working_hour	=	searchVO.getIn_fri_working_hour()[cnt];
				sat_working_hour	=	searchVO.getIn_sat_working_hour()[cnt];
				sun_working_hour	=	searchVO.getIn_sun_working_hour()[cnt];
				issue_report		=	searchVO.getIn_issue_report()[cnt];
				man_hour			=	searchVO.getIn_man_hour()[cnt];
				
				if (SpringStringUtil.isEmpty(commute_id)) {
					commute_id = null;
				}
				
				if (SpringStringUtil.isEmpty(mon_status_cd)) {
					mon_status_cd = String.valueOf("01");
				}
				if (SpringStringUtil.isEmpty(tue_status_cd)) {
					tue_status_cd = String.valueOf("01");
				}
				if (SpringStringUtil.isEmpty(wed_status_cd)) {
					wed_status_cd = String.valueOf("01");
				}
				if (SpringStringUtil.isEmpty(thu_status_cd)) {
					thu_status_cd = String.valueOf("01");
				}
				if (SpringStringUtil.isEmpty(fri_status_cd)) {
					fri_status_cd = String.valueOf("01");
				}
				if (SpringStringUtil.isEmpty(sat_status_cd)) {
					sat_status_cd = String.valueOf("02");
				}
				if (SpringStringUtil.isEmpty(sun_status_cd)) {
					sun_status_cd = String.valueOf("02");
				}
				
				
				if (SpringStringUtil.isEmpty(mon_working_hour)) {
					mon_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(tue_working_hour)) {
					tue_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(wed_working_hour)) {
					wed_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(thu_working_hour)) {
					thu_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(fri_working_hour)) {
					fri_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(sat_working_hour)) {
					sat_working_hour = String.valueOf("0");
				}
				if (SpringStringUtil.isEmpty(sun_working_hour)) {
					sun_working_hour = String.valueOf("0");
				}
				
				projectReportVO.setCommute_id(commute_id);
				projectReportVO.setProject_id(project_id);
				projectReportVO.setReport_ym(report_ym);
				projectReportVO.setReport_week(report_week);
				projectReportVO.setUser_id(String.valueOf(login_id));
				projectReportVO.setMon_status_cd(mon_status_cd);
				projectReportVO.setTue_status_cd(tue_status_cd);
				projectReportVO.setWed_status_cd(wed_status_cd);
				projectReportVO.setThu_status_cd(thu_status_cd);
				projectReportVO.setFri_status_cd(fri_status_cd);
				projectReportVO.setSat_status_cd(sat_status_cd);
				projectReportVO.setSun_status_cd(sun_status_cd);
				projectReportVO.setMon_working_hour(mon_working_hour);
				projectReportVO.setTue_working_hour(tue_working_hour);
				projectReportVO.setWed_working_hour(wed_working_hour);
				projectReportVO.setThu_working_hour(thu_working_hour);
				projectReportVO.setFri_working_hour(fri_working_hour);
				projectReportVO.setSat_working_hour(sat_working_hour);
				projectReportVO.setSun_working_hour(sun_working_hour);				
				projectReportVO.setMan_hour(man_hour);
				projectReportVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
				projectReportVO.setIssue_report(issue_report);
				projectReportVO.setCreator(login_id);
				projectReportVO.setModifier(login_id);
			
				inputListVO.add(projectReportVO);
			}
			
			projectReportService.projectReportInsert(inputListVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			//str_resData = "fail";
			str_resData = ex.toString();
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();		
	}
	
	/**
	 * M/H 제출
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/prj/report/projectReportFinalInsert")
	@ResponseBody
	public void projectReportFinalInsert(@ModelAttribute("searchVO") ProjectReportVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData	= "";
		String commute_id	= "";
		
		try {
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       	=	loginVO.getUser_id();
			
			String project_year  = searchVO.getSh_project_year();
			String project_month = searchVO.getSh_project_month();
			String project_week  = searchVO.getSh_project_week();
			
			searchVO.setStatus_cd(Globals.EXP_ING_STATUS_CD);
			searchVO.setCreator(login_id);
			
			//MH 주별 승인정보 저장
			int weeklyId = projectReportService.projectReportWeeklyInsert(searchVO);
			
			for(int cnt=0; cnt < searchVO.getIn_commute_id().length; cnt++) {
				
				ProjectReportVO projectReportVO = new ProjectReportVO();
				
				commute_id		=	searchVO.getIn_commute_id()[cnt];
			
				//M/H 상태 수정
				projectReportVO.setCommute_id(commute_id);
				projectReportVO.setProject_weekly_id(weeklyId);
				projectReportVO.setStatus_cd(Globals.EXP_ING_STATUS_CD);
				projectReportVO.setCreator(login_id);
				projectReportVO.setModifier(login_id);
				
				projectReportService.projectReportFinalUpdate(projectReportVO);
			}
			
			//결제 요청서
			ApprovalVO approvalVO = new ApprovalVO();
			
			String approval_name = project_year + "년 " + project_month + "월 " + project_week + "주 MH";
			String source_type_cd = "03";
			
			approvalVO.setApproval_year(project_year);
			approvalVO.setApproval_month(project_month);
			approvalVO.setApproval_week(project_week);
			approvalVO.setApproval_name(approval_name);
			approvalVO.setSource_type_cd(source_type_cd);
			approvalVO.setSource_object_id(String.valueOf(weeklyId));
			approvalVO.setCreator(login_id);
			
			//결재 요청서 저장
			int approvalId = approvalService.expanseApprovalInsert(approvalVO);			
			approvalVO.setApproval_id(approvalId);
			
			//결재 승인정보 저장
			approvalService.expanseApprovalNodeInsert(approvalVO);
			
			str_resData = "success";
			
		} catch(Exception ex) {
			
			//str_resData = "fail";
			str_resData = ex.toString();
			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}	
	
}
