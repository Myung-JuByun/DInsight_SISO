package siso.prj.status.service;

import siso.cmmn.ComDefaultVO;

public class ProjectStatusVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = 4288021548144197548L;
	// 데이터 List ( 조회 )
	
	private String report_ym;					// 보고 년월
	
	private String report_yy;					//	보고년
	private String report_mm;					//	보고월
	private String report_week;					//	보고주
	private String project_id;					//	프로젝트 ID
	private String project_code;				//	프로젝트 코드
	private String project_name;				//	프로젝트명
	private String Company_id;					//	고객사 코드
	private String company_name;				//	고객사
	private String user_id;						//	투입인원 ID
	private String user_name;					//	투입인원 성명
	private String JobTypeCode;					//	투입인원 직급 코드
	private String JobTypeName;					//	투입인원 직급 명칭
	private String EmployeeTypeCode;			//	투입인원 고용구분 코드
	private String EmployeeTypeName;			//	투입인원 고용구분 명칭
	private String RoleTypeCode;				//	투입인원 역활 코드
	private String RoleTypeName;				//	투입인원 역활
	private String StayTypeCode;				//	투입인원 상태 코드
	private String StayTypeName;				//	투입인원 상태
	private String mon_working_day;				//	투입인원 월요일 근무 일수 ( Man Day )
	private String tue_working_day;				//	투입인원 화요일 근무 일수 ( Man Day )
	private String wed_working_day;				//	투입인원 수요일 근무 일수 ( Man Day )
	private String thu_working_day;				//	투입인원 목요일 근무 일수 ( Man Day )
	private String fri_working_day;				//	투입인원 금요일 근무 일수 ( Man Day )
	private String sat_working_day;				//	투입인원 토요일 근무 일수 ( Man Day )
	private String sun_working_day;				//	투입인원 일요일 근무 일수 ( Man Day )
	private String PlanStatucCode;				//	투입인원 계획 코드
	private String PlanStatusName;				//	투입인원 계획
	private String ResultStatusCode;			//	투입인원 실적 코드
	private String ResultStatus;				//	투입인원 실적
	private String ProgressPercent;				//	투입인원 진척률
	private String man_day;						//	투입인원 M/D ( Man Day )
	private String man_month;					//	투입인원 M/D ( Man Day )
	
	
	
	
	
	
	
	
	
	
	

	
	
	public String getReport_ym() {
		return report_ym;
	}
	public void setReport_ym(String report_ym) {
		this.report_ym = report_ym;
		
		String report_yy, report_mm;
		report_yy	=	report_ym.substring(0,4);
		report_mm 	=	report_ym.substring(4,6);
		
		setReport_yy(report_yy);
		setReport_mm(report_mm);
	}
	
	public String getReport_yy() {
		return report_yy;
	}
	public String getReport_mm() {
		return report_mm;
	}
	public String getReport_week() {
		return report_week;
	}
	public String getProject_id() {
		return project_id;
	}
	public String getProject_code() {
		return project_code;
	}
	public String getProject_name() {
		return project_name;
	}
	public String getCompany_id() {
		return Company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public String getUser_id() {
		return user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public String getJobTypeCode() {
		return JobTypeCode;
	}
	public String getJobTypeName() {
		return JobTypeName;
	}
	public String getEmployeeTypeCode() {
		return EmployeeTypeCode;
	}
	public String getEmployeeTypeName() {
		return EmployeeTypeName;
	}
	public String getRoleTypeCode() {
		return RoleTypeCode;
	}
	public String getRoleTypeName() {
		return RoleTypeName;
	}
	public String getStayTypeCode() {
		return StayTypeCode;
	}
	public String getStayTypeName() {
		return StayTypeName;
	}
	public String getMon_working_day() {
		return mon_working_day;
	}
	public String getTue_working_day() {
		return tue_working_day;
	}
	public String getWed_working_day() {
		return wed_working_day;
	}
	public String getThu_working_day() {
		return thu_working_day;
	}
	public String getFri_working_day() {
		return fri_working_day;
	}
	public String getSat_working_day() {
		return sat_working_day;
	}
	public String getSun_working_day() {
		return sun_working_day;
	}
	public String getPlanStatucCode() {
		return PlanStatucCode;
	}
	public String getPlanStatusName() {
		return PlanStatusName;
	}
	public String getResultStatusCode() {
		return ResultStatusCode;
	}
	public String getResultStatus() {
		return ResultStatus;
	}
	public String getProgressPercent() {
		return ProgressPercent;
	}
	public String getMan_day() {
		return man_day;
	}
	public String getMan_month() {
		return man_month;
	}
	
	public void setReport_yy(String report_yy) {
		this.report_yy = report_yy;
	}
	public void setReport_mm(String report_mm) {
		this.report_mm = report_mm;
	}
	public void setReport_week(String report_week) {
		this.report_week = report_week;
	}
	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}
	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}
	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}
	public void setCompany_id(String company_id) {
		Company_id = company_id;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public void setJobTypeCode(String jobTypeCode) {
		JobTypeCode = jobTypeCode;
	}
	public void setJobTypeName(String jobTypeName) {
		JobTypeName = jobTypeName;
	}
	public void setEmployeeTypeCode(String employeeTypeCode) {
		EmployeeTypeCode = employeeTypeCode;
	}
	public void setEmployeeTypeName(String employeeTypeName) {
		EmployeeTypeName = employeeTypeName;
	}
	public void setRoleTypeCode(String roleTypeCode) {
		RoleTypeCode = roleTypeCode;
	}
	public void setRoleTypeName(String roleTypeName) {
		RoleTypeName = roleTypeName;
	}
	public void setStayTypeCode(String stayTypeCode) {
		StayTypeCode = stayTypeCode;
	}
	public void setStayTypeName(String stayTypeName) {
		StayTypeName = stayTypeName;
	}
	public void setMon_working_day(String mon_working_day) {
		this.mon_working_day = mon_working_day;
	}
	public void setTue_working_day(String tue_working_day) {
		this.tue_working_day = tue_working_day;
	}
	public void setWed_working_day(String wed_working_day) {
		this.wed_working_day = wed_working_day;
	}
	public void setThu_working_day(String thu_working_day) {
		this.thu_working_day = thu_working_day;
	}
	public void setFri_working_day(String fri_working_day) {
		this.fri_working_day = fri_working_day;
	}
	public void setSat_working_day(String sat_working_day) {
		this.sat_working_day = sat_working_day;
	}
	public void setSun_working_day(String sun_working_day) {
		this.sun_working_day = sun_working_day;
	}
	public void setPlanStatucCode(String planStatucCode) {
		PlanStatucCode = planStatucCode;
	}
	public void setPlanStatusName(String planStatusName) {
		PlanStatusName = planStatusName;
	}
	public void setResultStatusCode(String resultStatusCode) {
		ResultStatusCode = resultStatusCode;
	}
	public void setResultStatus(String resultStatus) {
		ResultStatus = resultStatus;
	}
	public void setProgressPercent(String progressPercent) {
		ProgressPercent = progressPercent;
	}
	public void setMan_day(String man_day) {
		this.man_day = man_day;
	}
	public void setMan_month(String man_month) {
		this.man_month = man_month;
	}
	

}
