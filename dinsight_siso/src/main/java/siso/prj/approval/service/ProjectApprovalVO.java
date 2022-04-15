package siso.prj.approval.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProjectApprovalVO.java
 * @Description : ProjectApprovalVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.10           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class ProjectApprovalVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_expanse_year = "";
	
	/** 월(검색) */
	private String sh_expanse_month = "";
	
	/** 주(검색) */
	private String sh_expanse_week = "";
	
	/** 상태(검색) */
	private String sh_status_cd = "";
	
	/** 결제 지정 구분(검색) */
	private String source_type_cd = "";
	
	
	/** 결제 지정 구분(인쇄 검색) */
	private String sh_user_id;
	
	/** 결제 지정 구분(인쇄 검색) */
	private String source_object_id;
	
	
	/** MM 제출 주별 ID(조회) */
	private String project_weekly_id;
	
	/** 년도(조회) */
	private String project_year;
	
	/** 월(조회) */
	private String project_month;
	
	/** 주차(조회) */
	private String project_weekly;
	
	/** 상태 코드(조회) */
	private String status_cd;
	

	public String getSh_expanse_year() {
		return sh_expanse_year;
	}

	public void setSh_expanse_year(String sh_expanse_year) {
		this.sh_expanse_year = sh_expanse_year;
	}

	public String getSh_expanse_month() {
		return sh_expanse_month;
	}

	public void setSh_expanse_month(String sh_expanse_month) {
		this.sh_expanse_month = sh_expanse_month;
	}

	public String getSh_expanse_week() {
		return sh_expanse_week;
	}

	public void setSh_expanse_week(String sh_expanse_week) {
		this.sh_expanse_week = sh_expanse_week;
	}

	public String getSh_status_cd() {
		return sh_status_cd;
	}

	public void setSh_status_cd(String sh_status_cd) {
		this.sh_status_cd = sh_status_cd;
	}

	public String getSource_type_cd() {
		return source_type_cd;
	}

	public void setSource_type_cd(String source_type_cd) {
		this.source_type_cd = source_type_cd;
	}

	public String getSh_user_id() {
		return sh_user_id;
	}

	public void setSh_user_id(String sh_user_id) {
		this.sh_user_id = sh_user_id;
	}

	public String getSource_object_id() {
		return source_object_id;
	}

	public void setSource_object_id(String source_object_id) {
		this.source_object_id = source_object_id;
	}

	public String getProject_weekly_id() {
		return project_weekly_id;
	}

	public void setProject_weekly_id(String project_weekly_id) {
		this.project_weekly_id = project_weekly_id;
	}

	public String getProject_year() {
		return project_year;
	}

	public void setProject_year(String project_year) {
		this.project_year = project_year;
	}

	public String getProject_month() {
		return project_month;
	}

	public void setProject_month(String project_month) {
		this.project_month = project_month;
	}

	public String getProject_weekly() {
		return project_weekly;
	}

	public void setProject_weekly(String project_weekly) {
		this.project_weekly = project_weekly;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}