package siso.prj.admin.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProjectAdminSearchVO.java
 * @Description : ProjectAdminSearchVO Class
 * @Modification Information 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class ProjectAdminSearchVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	private String project_id;


	/** 프로젝트코드(검색) select box*/
	private String project_code;
	
	/** 프로젝트명(검색) input box*/
	private String project_name;

	/** 등록자코드(검색) select box*/
	private String sel_user_id;
	
	/** 등록자명(검색) select box*/
	private String sel_user_name;
	
	private String in_staff_name;
	private String in_staff_phone_number;
	    	
	/** 년도별 검색 */
	private String year;

	/** 월검색 */
	private String month;

	/** 고객사 아이디(검색) select box*/
	private String company_code;

	/** 고객사 아이디(검색) */
	private String company_id;

	/** 영업_개발_코드명(검색) */
	private String sale_dev_cd;

	/** 프로젝트_상태_코드(검색) */
	private String project_status_cd;

	/** 고객사 명(검색) input box*/
	private String company_name;

	/** 담당자 아이디(검색) */
	private String customer_id;

	/** 담당자명(검색) */
	private String customer_name;
	
	/** 등록 아이디(검색) */
	private String user_id;
	
	/** 결제승인상태코드 */
	private String status_cd;

	//////////////////////////////////////////////////
	/** 상단 프로젝트 코드로 하단 프로젝트 조회 */
	private String in_sub_project_id;
	//////////////////////////////////////////////////

	/** 프로젝트 등록 */
	private String in_sale_dev_cd;
	private String in_project_status_cd;
	private String in_project_name;
	private String in_company_id;
	private String in_customer_id;
	private String in_man_month;
	private String in_start_day;
	private String in_end_day;
	private String in_customer_name;
	private String in_status_cd;
	private String in_project_code;
	private String in_contract_price;
	private String in_project_id;
	private String in_opertaion_code;
	

	/** 진행부서코드 */
	private String in_division_cd;

	/** 프로젝트 수정 */
	private String[] mo_project_id;
	private String[] mo_sale_dev_cd;
	private String[] mo_project_status_cd;
	private String[] mo_project_name;
	private String[] mo_company_id;
	private String[] mo_man_month;
	private String[] mo_start_day;
	private String[] mo_end_day;
	private String[] mo_customer_id;
	private String[] mo_customer_name;
	private String[] mo_status_cd;
	


	//////////////////////////////////////////////////
	
	/** 하단 프로젝트 투입정보 등록 */
	private String[] din_project_id;	
	/** 사원 코드 */
	private String[] din_user_id;
	/** 역할 코드 */
	private String[] din_role_cd;
	/** 상주 상태 코드 */
	private String[] din_stay_status_cd;
	/** 작업 시작일 */
	private String[] din_job_start_day;
	/** 작업 종료일 */
	private String[] din_job_end_day;
	/** man_month */
	private String[] din_man_month;
 
	/** popup 수정 project_id */
	private String inmo_project_id;
	
	//////////////////////////////////////////////////
    /** member_id (삭제) */
    private String[] member_id;
    
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

	public String getSel_user_id() {
		return sel_user_id;
	}

	public void setSel_user_id(String sel_user_id) {
		this.sel_user_id = sel_user_id;
	}

	public String getSel_user_name() {
		return sel_user_name;
	}

	public void setSel_user_name(String sel_user_name) {
		this.sel_user_name = sel_user_name;
	}

	public String getIn_staff_name() {
		return in_staff_name;
	}

	public void setIn_staff_name(String in_staff_name) {
		this.in_staff_name = in_staff_name;
	}

	public String getIn_staff_phone_number() {
		return in_staff_phone_number;
	}

	public void setIn_staff_phone_number(String in_staff_phone_number) {
		this.in_staff_phone_number = in_staff_phone_number;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getCompany_code() {
		return company_code;
	}

	public void setCompany_code(String company_code) {
		this.company_code = company_code;
	}

	public String getCompany_id() {
		return company_id;
	}

	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}

	public String getSale_dev_cd() {
		return sale_dev_cd;
	}

	public void setSale_dev_cd(String sale_dev_cd) {
		this.sale_dev_cd = sale_dev_cd;
	}

	public String getProject_status_cd() {
		return project_status_cd;
	}

	public void setProject_status_cd(String project_status_cd) {
		this.project_status_cd = project_status_cd;
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

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getIn_sub_project_id() {
		return in_sub_project_id;
	}

	public void setIn_sub_project_id(String in_sub_project_id) {
		this.in_sub_project_id = in_sub_project_id;
	}

	public String getIn_sale_dev_cd() {
		return in_sale_dev_cd;
	}

	public void setIn_sale_dev_cd(String in_sale_dev_cd) {
		this.in_sale_dev_cd = in_sale_dev_cd;
	}

	public String getIn_project_status_cd() {
		return in_project_status_cd;
	}

	public void setIn_project_status_cd(String in_project_status_cd) {
		this.in_project_status_cd = in_project_status_cd;
	}

	public String getIn_project_name() {
		return in_project_name;
	}

	public void setIn_project_name(String in_project_name) {
		this.in_project_name = in_project_name;
	}

	public String getIn_company_id() {
		return in_company_id;
	}

	public void setIn_company_id(String in_company_id) {
		this.in_company_id = in_company_id;
	}

	public String getIn_customer_id() {
		return in_customer_id;
	}

	public void setIn_customer_id(String in_customer_id) {
		this.in_customer_id = in_customer_id;
	}

	public String getIn_man_month() {
		return in_man_month;
	}

	public void setIn_man_month(String in_man_month) {
		this.in_man_month = in_man_month;
	}

	public String getIn_start_day() {
		return in_start_day;
	}

	public void setIn_start_day(String in_start_day) {
		this.in_start_day = in_start_day;
	}

	public String getIn_end_day() {
		return in_end_day;
	}

	public void setIn_end_day(String in_end_day) {
		this.in_end_day = in_end_day;
	}

	public String getIn_customer_name() {
		return in_customer_name;
	}

	public void setIn_customer_name(String in_customer_name) {
		this.in_customer_name = in_customer_name;
	}

	public String getIn_status_cd() {
		return in_status_cd;
	}

	public void setIn_status_cd(String in_status_cd) {
		this.in_status_cd = in_status_cd;
	}

	public String getIn_project_code() {
		return in_project_code;
	}

	public void setIn_project_code(String in_project_code) {
		this.in_project_code = in_project_code;
	}

	public String getIn_contract_price() {
		return in_contract_price;
	}

	public void setIn_contract_price(String in_contract_price) {
		this.in_contract_price = in_contract_price;
	}

	public String getIn_project_id() {
		return in_project_id;
	}

	public void setIn_project_id(String in_project_id) {
		this.in_project_id = in_project_id;
	}

	public String getIn_opertaion_code() {
		return in_opertaion_code;
	}

	public void setIn_opertaion_code(String in_opertaion_code) {
		this.in_opertaion_code = in_opertaion_code;
	}

	public String getIn_division_cd() {
		return in_division_cd;
	}

	public void setIn_division_cd(String in_division_cd) {
		this.in_division_cd = in_division_cd;
	}

	public String[] getMo_project_id() {
		return mo_project_id;
	}

	public void setMo_project_id(String[] mo_project_id) {
		this.mo_project_id = mo_project_id;
	}

	public String[] getMo_sale_dev_cd() {
		return mo_sale_dev_cd;
	}

	public void setMo_sale_dev_cd(String[] mo_sale_dev_cd) {
		this.mo_sale_dev_cd = mo_sale_dev_cd;
	}

	public String[] getMo_project_status_cd() {
		return mo_project_status_cd;
	}

	public void setMo_project_status_cd(String[] mo_project_status_cd) {
		this.mo_project_status_cd = mo_project_status_cd;
	}

	public String[] getMo_project_name() {
		return mo_project_name;
	}

	public void setMo_project_name(String[] mo_project_name) {
		this.mo_project_name = mo_project_name;
	}

	public String[] getMo_company_id() {
		return mo_company_id;
	}

	public void setMo_company_id(String[] mo_company_id) {
		this.mo_company_id = mo_company_id;
	}

	public String[] getMo_man_month() {
		return mo_man_month;
	}

	public void setMo_man_month(String[] mo_man_month) {
		this.mo_man_month = mo_man_month;
	}

	public String[] getMo_start_day() {
		return mo_start_day;
	}

	public void setMo_start_day(String[] mo_start_day) {
		this.mo_start_day = mo_start_day;
	}

	public String[] getMo_end_day() {
		return mo_end_day;
	}

	public void setMo_end_day(String[] mo_end_day) {
		this.mo_end_day = mo_end_day;
	}

	public String[] getMo_customer_id() {
		return mo_customer_id;
	}

	public void setMo_customer_id(String[] mo_customer_id) {
		this.mo_customer_id = mo_customer_id;
	}

	public String[] getMo_customer_name() {
		return mo_customer_name;
	}

	public void setMo_customer_name(String[] mo_customer_name) {
		this.mo_customer_name = mo_customer_name;
	}

	public String[] getMo_status_cd() {
		return mo_status_cd;
	}

	public void setMo_status_cd(String[] mo_status_cd) {
		this.mo_status_cd = mo_status_cd;
	}

	public String[] getDin_project_id() {
		return din_project_id;
	}

	public void setDin_project_id(String[] din_project_id) {
		this.din_project_id = din_project_id;
	}

	public String[] getDin_user_id() {
		return din_user_id;
	}

	public void setDin_user_id(String[] din_user_id) {
		this.din_user_id = din_user_id;
	}

	public String[] getDin_role_cd() {
		return din_role_cd;
	}

	public void setDin_role_cd(String[] din_role_cd) {
		this.din_role_cd = din_role_cd;
	}

	public String[] getDin_stay_status_cd() {
		return din_stay_status_cd;
	}

	public void setDin_stay_status_cd(String[] din_stay_status_cd) {
		this.din_stay_status_cd = din_stay_status_cd;
	}

	public String[] getDin_job_start_day() {
		return din_job_start_day;
	}

	public void setDin_job_start_day(String[] din_job_start_day) {
		this.din_job_start_day = din_job_start_day;
	}

	public String[] getDin_job_end_day() {
		return din_job_end_day;
	}

	public void setDin_job_end_day(String[] din_job_end_day) {
		this.din_job_end_day = din_job_end_day;
	}

	public String[] getDin_man_month() {
		return din_man_month;
	}

	public void setDin_man_month(String[] din_man_month) {
		this.din_man_month = din_man_month;
	}

	public String getInmo_project_id() {
		return inmo_project_id;
	}

	public void setInmo_project_id(String inmo_project_id) {
		this.inmo_project_id = inmo_project_id;
	}

	public String[] getMember_id() {
		return member_id;
	}

	public void setMember_id(String[] member_id) {
		this.member_id = member_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
 }
