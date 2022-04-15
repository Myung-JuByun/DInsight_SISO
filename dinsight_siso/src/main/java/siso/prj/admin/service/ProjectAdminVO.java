package siso.prj.admin.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProjectAdminVO.java
 * @Description : ProjectAdminVO Class
 * @Modification Information 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class ProjectAdminVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;


	/**
	 * 프로젝트 관리 프로젝트 정보
	 */
	private String project_id;
	private String project_code;
	private String project_name;
	private String project_status_cd;
	private String project_status_name;
	private String sale_dev_cd;
	private String sale_dev_name;
	private String start_day;
	private String end_day;
	private String man_month;
	private String company_id;
	private String company_name;
	private String customer_id;
	private String customer_name;
    private String mobile;
	private String phone_number;
	private String division_id;
	private String division_name;
	private String user_id;
	private String user_name;
	private String member_id;
	private String role_cd;
	private String stay_status_cd;
	private String job_start_day;
	private String job_end_day;
	private String contract_price;
	private String staff_name;
	private String staff_phone_number;
	private String division_cd;
		
	public String getDivision_cd() {
		return division_cd;
	}
	public void setDivision_cd(String division_cd) {
		this.division_cd = division_cd;
	}
	public String getProject_id() {
		return project_id;
	}
	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}
	public String getProject_code() {
		return project_code;
	}
	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}
	public String getProject_name() {
		return project_name;
	}
	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}
	public String getProject_status_cd() {
		return project_status_cd;
	}
	public void setProject_status_cd(String project_status_cd) {
		this.project_status_cd = project_status_cd;
	}
	public String getProject_status_name() {
		return project_status_name;
	}
	public void setProject_status_name(String project_status_name) {
		this.project_status_name = project_status_name;
	}
	public String getSale_dev_cd() {
		return sale_dev_cd;
	}
	public void setSale_dev_cd(String sale_dev_cd) {
		this.sale_dev_cd = sale_dev_cd;
	}
	public String getSale_dev_name() {
		return sale_dev_name;
	}
	public void setSale_dev_name(String sale_dev_name) {
		this.sale_dev_name = sale_dev_name;
	}
	public String getStart_day() {
		return start_day;
	}
	public void setStart_day(String start_day) {
		this.start_day = start_day;
	}
	public String getEnd_day() {
		return end_day;
	}
	public void setEnd_day(String end_day) {
		this.end_day = end_day;
	}
	public String getMan_month() {
		return man_month;
	}
	public void setMan_month(String man_month) {
		this.man_month = man_month;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getDivision_id() {
		return division_id;
	}
	public void setDivision_id(String division_id) {
		this.division_id = division_id;
	}
	public String getDivision_name() {
		return division_name;
	}
	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getRole_cd() {
		return role_cd;
	}
	public void setRole_cd(String role_cd) {
		this.role_cd = role_cd;
	}
	public String getStay_status_cd() {
		return stay_status_cd;
	}
	public void setStay_status_cd(String stay_status_cd) {
		this.stay_status_cd = stay_status_cd;
	}
	public String getJob_start_day() {
		return job_start_day;
	}
	public void setJob_start_day(String job_start_day) {
		this.job_start_day = job_start_day;
	}
	public String getJob_end_day() {
		return job_end_day;
	}
	public void setJob_end_day(String job_end_day) {
		this.job_end_day = job_end_day;
	}
	public String getContract_price() {
		return contract_price;
	}
	public void setContract_price(String contract_price) {
		this.contract_price = contract_price;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getStaff_phone_number() {
		return staff_phone_number;
	}
	public void setStaff_phone_number(String staff_phone_number) {
		this.staff_phone_number = staff_phone_number;
	}
}
