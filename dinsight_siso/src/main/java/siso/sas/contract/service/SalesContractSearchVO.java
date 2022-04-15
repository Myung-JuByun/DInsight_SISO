package siso.sas.contract.service;

import java.util.List;

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
public class SalesContractSearchVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269303L;
	
	private String sh_contract_id;
	private String sh_contract_project_code;
	
	private String in_contract_id;
	private String in_contract_project_code;
	private String in_contract_name;
	private String in_contract_file_name;
	private String in_contract_file_id;
	private String in_contract_file_path;
	private String in_contract_project_code_id;
	private String in_contract_rivision;
	
	/** 하위 부서 정보 */
	private List<String> division_child_list;
	
	private String sales_project_year;
	private String sales_project_month;
	private String company_name;
	private String sales_type_cd;
	private String sales_status_cd;
	private String brand_cd;
	private String user_id;
	
	public String getSh_contract_id() {
		return sh_contract_id;
	}
	public void setSh_contract_id(String sh_contract_id) {
		this.sh_contract_id = sh_contract_id;
	}
	public String getSh_contract_project_code() {
		return sh_contract_project_code;
	}
	public void setSh_contract_project_code(String sh_contract_project_code) {
		this.sh_contract_project_code = sh_contract_project_code;
	}
	public String getIn_contract_id() {
		return in_contract_id;
	}
	public void setIn_contract_id(String in_contract_id) {
		this.in_contract_id = in_contract_id;
	}
	public String getIn_contract_project_code() {
		return in_contract_project_code;
	}
	public void setIn_contract_project_code(String in_contract_project_code) {
		this.in_contract_project_code = in_contract_project_code;
	}
	public String getIn_contract_name() {
		return in_contract_name;
	}
	public void setIn_contract_name(String in_contract_name) {
		this.in_contract_name = in_contract_name;
	}
	public String getIn_contract_file_name() {
		return in_contract_file_name;
	}
	public void setIn_contract_file_name(String in_contract_file_name) {
		this.in_contract_file_name = in_contract_file_name;
	}
	public String getIn_contract_rivision() {
		return in_contract_rivision;
	}
	public void setIn_contract_rivision(String in_contract_rivision) {
		this.in_contract_rivision = in_contract_rivision;
	}
	public String getIn_contract_file_id() {
		return in_contract_file_id;
	}
	public void setIn_contract_file_id(String in_contract_file_id) {
		this.in_contract_file_id = in_contract_file_id;
	}
	public String getIn_contract_file_path() {
		return in_contract_file_path;
	}
	public void setIn_contract_file_path(String in_contract_file_path) {
		this.in_contract_file_path = in_contract_file_path;
	}
	public String getIn_contract_project_code_id() {
		return in_contract_project_code_id;
	}
	public void setIn_contract_project_code_id(String in_contract_project_code_id) {
		this.in_contract_project_code_id = in_contract_project_code_id;
	}
	public List<String> getDivision_child_list() {
		return division_child_list;
	}
	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
	}
	
	public String getSales_project_year() {
		return sales_project_year;
	}
	public void setSales_project_year(String sales_project_year) {
		this.sales_project_year = sales_project_year;
	}
	public String getSales_project_month() {
		return sales_project_month;
	}
	public void setSales_project_month(String sales_project_month) {
		this.sales_project_month = sales_project_month;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getSales_type_cd() {
		return sales_type_cd;
	}
	public void setSales_type_cd(String sales_type_cd) {
		this.sales_type_cd = sales_type_cd;
	}
	public String getSales_status_cd() {
		return sales_status_cd;
	}
	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}
	public String getBrand_cd() {
		return brand_cd;
	}
	public void setBrand_cd(String brand_cd) {
		this.brand_cd = brand_cd;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
 }
