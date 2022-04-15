package siso.prj.status.service;

import siso.cmmn.ComDefaultVO;

public class ProjectStatusSearchVO extends ComDefaultVO{
	
	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -5255222371450433347L;

	/** 보고 년 */
	private String sh_report_yy;
	
	/** 보고 월 */
	private String sh_report_mm;
	
	/** 보고 주*/
	private String sh_report_week;
	
	/** 보고 주 기준 날짜*/
	private String sh_report_week_day;

	/** 프로젝트 명 */
	private String sh_project_name;
	
	/** 프로젝트 ID */
	private String sh_project_id;

	/** 회사 명 */
	private String sh_company_name;
	
	private String sh_member_name;
	private String sh_job_type;
	private String sh_employee_type;
	private String sh_role_type;
	private String sh_stay_type;
	private String sh_manday_zero;

	private String sh_code_group_id;
	private String sh_code_id;
	private String sh_code_name;


	private String sh_project_member_id;
	private String sh_project_member_name;
	public String getSh_report_yy() {
		return sh_report_yy;
	}
	public void setSh_report_yy(String sh_report_yy) {
		this.sh_report_yy = sh_report_yy;
	}
	public String getSh_report_mm() {
		return sh_report_mm;
	}
	public void setSh_report_mm(String sh_report_mm) {
		this.sh_report_mm = sh_report_mm;
	}
	public String getSh_report_week() {
		return sh_report_week;
	}
	public void setSh_report_week(String sh_report_week) {
		this.sh_report_week = sh_report_week;
	}
	public String getSh_report_week_day() {
		return sh_report_week_day;
	}
	public void setSh_report_week_day(String sh_report_week_day) {
		this.sh_report_week_day = sh_report_week_day;
	}
	public String getSh_project_name() {
		return sh_project_name;
	}
	public void setSh_project_name(String sh_project_name) {
		this.sh_project_name = sh_project_name;
	}
	public String getSh_project_id() {
		return sh_project_id;
	}
	public void setSh_project_id(String sh_project_id) {
		this.sh_project_id = sh_project_id;
	}
	public String getSh_company_name() {
		return sh_company_name;
	}
	public void setSh_company_name(String sh_company_name) {
		this.sh_company_name = sh_company_name;
	}
	public String getSh_member_name() {
		return sh_member_name;
	}
	public void setSh_member_name(String sh_member_name) {
		this.sh_member_name = sh_member_name;
	}
	public String getSh_job_type() {
		return sh_job_type;
	}
	public void setSh_job_type(String sh_job_type) {
		this.sh_job_type = sh_job_type;
	}
	public String getSh_employee_type() {
		return sh_employee_type;
	}
	public void setSh_employee_type(String sh_employee_type) {
		this.sh_employee_type = sh_employee_type;
	}
	public String getSh_role_type() {
		return sh_role_type;
	}
	public void setSh_role_type(String sh_role_type) {
		this.sh_role_type = sh_role_type;
	}
	public String getSh_stay_type() {
		return sh_stay_type;
	}
	public void setSh_stay_type(String sh_stay_type) {
		this.sh_stay_type = sh_stay_type;
	}
	public String getSh_manday_zero() {
		return sh_manday_zero;
	}
	public void setSh_manday_zero(String sh_manday_zero) {
		this.sh_manday_zero = sh_manday_zero;
	}
	public String getSh_code_group_id() {
		return sh_code_group_id;
	}
	public void setSh_code_group_id(String sh_code_group_id) {
		this.sh_code_group_id = sh_code_group_id;
	}
	public String getSh_code_id() {
		return sh_code_id;
	}
	public void setSh_code_id(String sh_code_id) {
		this.sh_code_id = sh_code_id;
	}
	public String getSh_code_name() {
		return sh_code_name;
	}
	public void setSh_code_name(String sh_code_name) {
		this.sh_code_name = sh_code_name;
	}
	public String getSh_project_member_id() {
		return sh_project_member_id;
	}
	public void setSh_project_member_id(String sh_project_member_id) {
		this.sh_project_member_id = sh_project_member_id;
	}
	public String getSh_project_member_name() {
		return sh_project_member_name;
	}
	public void setSh_project_member_name(String sh_project_member_name) {
		this.sh_project_member_name = sh_project_member_name;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
		
}
