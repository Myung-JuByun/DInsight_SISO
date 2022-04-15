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
public class ProjectAdminMemberVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/**
	 * 프로젝트 멤버 관리
	 * 
	 */
	private String member_id;
    private String project_id;
	private String project_name;
	private String user_id;
	private String user_name;
	private String role_cd;
	private String role_name;
	private String stay_status_cd;
	private String stay_status_name;
	private String job_start_day;
	private String job_end_day;
	
	private String man_month;
	
	/**
	 * 검색조건
	 */
	private String in_sub_project_id;

	public String getMember_id() {
		return member_id;
	}

	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public String getProject_id() {
		return project_id;
	}

	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
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

	public String getRole_cd() {
		return role_cd;
	}

	public void setRole_cd(String role_cd) {
		this.role_cd = role_cd;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public String getStay_status_cd() {
		return stay_status_cd;
	}

	public void setStay_status_cd(String stay_status_cd) {
		this.stay_status_cd = stay_status_cd;
	}

	public String getStay_status_name() {
		return stay_status_name;
	}

	public void setStay_status_name(String stay_status_name) {
		this.stay_status_name = stay_status_name;
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

	public String getMan_month() {
		return man_month;
	}

	public void setMan_month(String man_month) {
		this.man_month = man_month;
	}

	public String getIn_sub_project_id() {
		return in_sub_project_id;
	}

	public void setIn_sub_project_id(String in_sub_project_id) {
		this.in_sub_project_id = in_sub_project_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
