package siso.sas.contract.service;

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
public class SalesContractVO extends ComDefaultVO {

	/** serialVersion UID*/
	private static final long serialVersionUID = -858838578081269303L;
	
	private String contract_id;
	private String contract_project_code;
	private String contract_project_code_id;
	private String contract_name;
	private String contract_file_name;
	private String contract_file_path;
	private String contract_file_id;
	private String contract_rivision;
	private String project_code_count;	
	private String contract_user_name;
	private String creation_date;
	private String modify_date;
	
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contract_id) {
		this.contract_id = contract_id;
	}
	public String getContract_project_code() {
		return contract_project_code;
	}
	public void setContract_project_code(String contract_project_code) {
		this.contract_project_code = contract_project_code;
	}
	public String getContract_project_code_id() {
		return contract_project_code_id;
	}
	public void setContract_project_code_id(String contract_project_code_id) {
		this.contract_project_code_id = contract_project_code_id;
	}
	public String getContract_name() {
		return contract_name;
	}
	public void setContract_name(String contract_name) {
		this.contract_name = contract_name;
	}
	public String getContract_file_name() {
		return contract_file_name;
	}
	public void setContract_file_name(String contract_file_name) {
		this.contract_file_name = contract_file_name;
	}
	public String getContract_file_path() {
		return contract_file_path;
	}
	public void setContract_file_path(String contract_file_path) {
		this.contract_file_path = contract_file_path;
	}
	public String getContract_file_id() {
		return contract_file_id;
	}
	public void setContract_file_id(String contract_file_id) {
		this.contract_file_id = contract_file_id;
	}
	public String getContract_rivision() {
		return contract_rivision;
	}
	public void setContract_rivision(String contract_rivision) {
		this.contract_rivision = contract_rivision;
	}
	public String getProject_code_count() {
		return project_code_count;
	}
	public void setProject_code_count(String project_code_count) {
		this.project_code_count = project_code_count;
	}
	public String getContract_user_name() {
		return contract_user_name;
	}
	public void setContract_user_name(String contract_user_name) {
		this.contract_user_name = contract_user_name;
	}
	public String getCreation_date() {
		return creation_date;
	}
	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getModify_date() {
		return modify_date;
	}
	public void setModify_date(String modify_date) {
		this.modify_date = modify_date;
	}	
 }
