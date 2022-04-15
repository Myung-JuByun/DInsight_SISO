package siso.exp.approval.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ApprovalVO.java
 * @Description : ApprovalVO Class
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
public class ApprovalVO extends ComDefaultVO {
	
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
	
	
	/** 결재 요청 년(조회) */
	private String approval_year;
	
	/** 결재 요청 월(조회) */
	private String approval_month;
	
	/** 결재 요청 주(조회) */
	private String approval_week;
	
	/** 결재 요청서 제목(조회) */
	private String approval_name;
	
	/** 결재 요청서 기안자 상태코드(조회) */
	private String status_cd;
	
	/** 결재 요청서 기안자 상태명(조회) */
	private String status_cd_name;
	
	/** 기안일(조회) */
	private String creation_date;
	
	/** 기안자명(조회) */
	private String user_name;
	
	/** 승인 아이디 키값(조회) */
	private String node_id;
	
	/** 승인자 아이디(조회) */
	private String owner_id;
	
	/** 결재 요청 데이터 아이디(조회) */
	private String source_object_id;
	
	/** 부서코드(조회) */
	private String division_cd;
	
	/** 부서명(조회) */
	private String division_name;
	
	/** 결재 승인 아이디 키값(조회) */
	private int approval_id;
	
	/** 최종승인자유무- 1 or 0(조회) */
	private String final_expanse_appoint;
	
	
	/** 달별 경비 아이디(반려) */
	private int expanse_monthly_id;
	
	/** 기안,검토,승인,수신 구분 */
	private String expanse_appoint_cd;
	
	/** 매입/매출 품의서 키값 */
	private String sales_confer_id;
	

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

	public String getApproval_year() {
		return approval_year;
	}

	public void setApproval_year(String approval_year) {
		this.approval_year = approval_year;
	}

	public String getApproval_month() {
		return approval_month;
	}

	public void setApproval_month(String approval_month) {
		this.approval_month = approval_month;
	}

	public String getApproval_week() {
		return approval_week;
	}

	public void setApproval_week(String approval_week) {
		this.approval_week = approval_week;
	}

	public String getApproval_name() {
		return approval_name;
	}

	public void setApproval_name(String approval_name) {
		this.approval_name = approval_name;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getStatus_cd_name() {
		return status_cd_name;
	}

	public void setStatus_cd_name(String status_cd_name) {
		this.status_cd_name = status_cd_name;
	}

	public String getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getNode_id() {
		return node_id;
	}

	public void setNode_id(String node_id) {
		this.node_id = node_id;
	}

	public String getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(String owner_id) {
		this.owner_id = owner_id;
	}

	public String getSource_object_id() {
		return source_object_id;
	}

	public void setSource_object_id(String source_object_id) {
		this.source_object_id = source_object_id;
	}

	public String getDivision_cd() {
		return division_cd;
	}

	public void setDivision_cd(String division_cd) {
		this.division_cd = division_cd;
	}

	public String getDivision_name() {
		return division_name;
	}

	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}

	public int getApproval_id() {
		return approval_id;
	}

	public void setApproval_id(int approval_id) {
		this.approval_id = approval_id;
	}

	public String getFinal_expanse_appoint() {
		return final_expanse_appoint;
	}

	public void setFinal_expanse_appoint(String final_expanse_appoint) {
		this.final_expanse_appoint = final_expanse_appoint;
	}

	public int getExpanse_monthly_id() {
		return expanse_monthly_id;
	}

	public void setExpanse_monthly_id(int expanse_monthly_id) {
		this.expanse_monthly_id = expanse_monthly_id;
	}

	public String getExpanse_appoint_cd() {
		return expanse_appoint_cd;
	}

	public void setExpanse_appoint_cd(String expanse_appoint_cd) {
		this.expanse_appoint_cd = expanse_appoint_cd;
	}

	public String getSales_confer_id() {
		return sales_confer_id;
	}

	public void setSales_confer_id(String sales_confer_id) {
		this.sales_confer_id = sales_confer_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}