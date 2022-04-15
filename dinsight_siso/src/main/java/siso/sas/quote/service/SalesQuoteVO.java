package siso.sas.quote.service;

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
public class SalesQuoteVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269259L;
	
	private String quote_id;
	private String quote_project_code;
	private String quote_project_code_id;
	private String quote_name;
	private String quote_file_name;
	private String quote_file_path;
	private String quote_file_id;
	private String quote_rivision;
	private String project_code_count;
	private String quote_user_name;
	private String creation_date;
	private String modify_date;
	
	public String getCreation_date() {
		return creation_date;
	}
	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}
	public String getQuote_user_name() {
		return quote_user_name;
	}
	public void setQuote_user_name(String quote_user_name) {
		this.quote_user_name = quote_user_name;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getQuote_project_code_id() {
		return quote_project_code_id;
	}
	public void setQuote_project_code_id(String quote_project_code_id) {
		this.quote_project_code_id = quote_project_code_id;
	}
	public String getProject_code_count() {
		return project_code_count;
	}
	public void setProject_code_count(String project_code_count) {
		this.project_code_count = project_code_count;
	}
	public String getQuote_id() {
		return quote_id;
	}
	public void setQuote_id(String quote_id) {
		this.quote_id = quote_id;
	}
	public String getQuote_project_code() {
		return quote_project_code;
	}
	public void setQuote_project_code(String quote_project_code) {
		this.quote_project_code = quote_project_code;
	}
	public String getQuote_name() {
		return quote_name;
	}
	public void setQuote_name(String quote_name) {
		this.quote_name = quote_name;
	}
	public String getQuote_file_name() {
		return quote_file_name;
	}
	public void setQuote_file_name(String quote_file_name) {
		this.quote_file_name = quote_file_name;
	}
	public String getQuote_rivision() {
		return quote_rivision;
	}
	public void setQuote_rivision(String quote_rivision) {
		this.quote_rivision = quote_rivision;
	}
	public String getQuote_file_path() {
		return quote_file_path;
	}
	public void setQuote_file_path(String quote_file_path) {
		this.quote_file_path = quote_file_path;
	}
	public String getQuote_file_id() {
		return quote_file_id;
	}
	public void setQuote_file_id(String quote_file_id) {
		this.quote_file_id = quote_file_id;
	}
	public String getModify_date() {
		return modify_date;
	}
	public void setModify_date(String modify_date) {
		this.modify_date = modify_date;
	}	
}
