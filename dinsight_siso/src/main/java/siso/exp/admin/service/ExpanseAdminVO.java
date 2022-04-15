package siso.exp.admin.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ExpanseAdminVO.java
 * @Description : ExpanseAdminVO Class
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
public class ExpanseAdminVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_expanse_year = "";
	
	/** 월(검색) */
	private String sh_expanse_month = "";
	
	/** 검색 아이디 키값(검색) */
	private String sh_user_id = "";
	
	
    /** 기준년도(조회) */
	private String expanse_year;
	
	/** 기준월(조회) */
	private String expanse_month;
	
	/** 경비코드(조회) */
	private String expanse_id;
	
	/** 경비날짜(조회) */
	private String pay_day;
	
	/** 경비구분(조회) */
	private String expanse_type;
	
	/** 경비분류(조회) */
	private String category_id;
	
	/** 경비금액(조회) */
	private String payment;
	
	/** 달별 경비 아이디(조회) */
	private int expanse_monthly_id;
	
	/** 경비내역(조회) */
	private String expanse_name;
	
	/** 경비내역(조회) */
	private String confer_number;
	
	/** 경비상태(조회) */
	private String code_name;
	
	/** 부서코드(조회) */
	private String last_division_cd;
	
	/** 상태코드(조회) */
	private String status_cd;
	
	
	/** 결제 요청 제출유무(조회) */
	private String approval_status;
	
	/** 결재 요청서 ID(조회) */
	private int approval_id;
	
	/** 결재 요청 년(조회) */
	private String approval_year;
	
	/** 결재 요청 월(조회) */
	private String approval_month;
	
	/** 결재 요청 주(조회) */
	private String approval_week;
	
	/** 결재 요청서명(조회) */
	private String approval_name;
	
	/** 결재 요청 데이터 종류 코드(조회) */
	private String source_type_cd;
	
	/** 결재 요청 데이터 아이디(조회) */
	private String source_object_id;
	
	
	/** 승인 아이디(조회) */
	private String node_id;
	
	/** 결재 승인 아이디(조회) */
	private String owner_id;
	
	
	/** 마일리지 코드(조회) */
	private String mileage_id;
	
	/** 마일리지 날짜(조회) */
	private String drive_day;
	
	/** 마일리지 이동목적(조회) */
	private String purpose;
	
	/** 마일리지 출발지(조회) */
	private String start_point;
	
	/** 마일리지 경유지(조회) */
	private String via_point;
	
	/** 마일리지 도착지(조회) */
	private String end_point;
	
	/** 마일리지 유종코드(조회) */
	private String oil_cd;
	
	/** 마일리지 유종코드 이름(조회) */
	private String oil_cd_name;
	
	/** 마일리지 거리(조회) */
	private String distance;
	
	/** 마일리지 합계금액(조회) */
	private String cost;
	
	
	/** 경비코드(입력) */
	private String[] in_expanse_id;
	
	/** 경비날짜(입력) */
	private String[] in_pay_day;
	
	/** 경비구분(입력) */
	private String[] in_expanse_type;
	
	/** 경비분류(입력) */
	private String[] in_category_id;
	
	/** 경비금액(입력) */
	private String[] in_payment;
	
	/** 경비내역(입력) */
	private String[] in_expanse_name;
	
	/** 품의서번호(입력) */
	private String[] in_confer_number;
	
	/** 경비상태(입력) */
	private String[] in_code_name;
	
	
	/** 마일리지 코드(입력) */
	private String[] in_mileage_id;
	
	/** 마일리지 날짜(입력) */
	private String[] in_drive_day;
	
	/** 마일리지 이동목적(입력) */
	private String[] in_purpose;
	
	/** 마일리지 출발지(입력) */
	private String[] in_start_point;
	
	/** 마일리지 경유지(입력) */
	private String[] in_via_point;
	
	/** 마일리지 도착지(입력) */
	private String[] in_end_point;
	
	/** 마일리지 유종코드(입력) */
	private String[] in_oil_cd;
	
	/** 마일리지 거리(입력) */
	private String[] in_distance;
	
	/** 마일리지 합계금액(입력) */
	private String[] in_cost;
	
	
	/** 이름(인쇄 - 결재라인) */
	private String user_name;
	
	/** 승인날짜 (인쇄 - 결재라인) */
	private String approved_date;
	
	/** 결재라인순서(인쇄 - 결재라인) */
	private String order_seq;
	
	/** 기안, 대기, 승인 상태(인쇄 - 결재라인) */
	private String status_name;
	
	/** 일자(인쇄) */
	private String expanse_day;
	
	/** 구분명 (인쇄) */
	private String expanse_type_name;
	
	/** 분류명(인쇄) */
	private String category_name;
	
	/** 계정과목(인쇄) */
	private String parent_category_name;
	
	
	/** 경비 데이터 수량(조회) */
	private String expanse_count;
	
	/** 마일리지 데이터 수량(조회) */
	private String mileage_count;
	
	/** 지정된 결재선 인원수(조회) */
	private String payment_count;
	
	/** 부서명(조회) */
	private String division_cd_name;
	
	/** 부서장 여부(조회) */
	private String head_yn;
	

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

	public String getSh_user_id() {
		return sh_user_id;
	}

	public void setSh_user_id(String sh_user_id) {
		this.sh_user_id = sh_user_id;
	}

	public String getExpanse_year() {
		return expanse_year;
	}

	public void setExpanse_year(String expanse_year) {
		this.expanse_year = expanse_year;
	}

	public String getExpanse_month() {
		return expanse_month;
	}

	public void setExpanse_month(String expanse_month) {
		this.expanse_month = expanse_month;
	}

	public String getExpanse_id() {
		return expanse_id;
	}

	public void setExpanse_id(String expanse_id) {
		this.expanse_id = expanse_id;
	}

	public String getPay_day() {
		return pay_day;
	}

	public void setPay_day(String pay_day) {
		this.pay_day = pay_day;
	}

	public String getExpanse_type() {
		return expanse_type;
	}

	public void setExpanse_type(String expanse_type) {
		this.expanse_type = expanse_type;
	}

	public String getCategory_id() {
		return category_id;
	}

	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public int getExpanse_monthly_id() {
		return expanse_monthly_id;
	}

	public void setExpanse_monthly_id(int expanse_monthly_id) {
		this.expanse_monthly_id = expanse_monthly_id;
	}

	public String getExpanse_name() {
		return expanse_name;
	}

	public void setExpanse_name(String expanse_name) {
		this.expanse_name = expanse_name;
	}

	public String getConfer_number() {
		return confer_number;
	}

	public void setConfer_number(String confer_number) {
		this.confer_number = confer_number;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public String getLast_division_cd() {
		return last_division_cd;
	}

	public void setLast_division_cd(String last_division_cd) {
		this.last_division_cd = last_division_cd;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getApproval_status() {
		return approval_status;
	}

	public void setApproval_status(String approval_status) {
		this.approval_status = approval_status;
	}

	public int getApproval_id() {
		return approval_id;
	}

	public void setApproval_id(int approval_id) {
		this.approval_id = approval_id;
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

	public String getSource_type_cd() {
		return source_type_cd;
	}

	public void setSource_type_cd(String source_type_cd) {
		this.source_type_cd = source_type_cd;
	}

	public String getSource_object_id() {
		return source_object_id;
	}

	public void setSource_object_id(String source_object_id) {
		this.source_object_id = source_object_id;
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

	public String getMileage_id() {
		return mileage_id;
	}

	public void setMileage_id(String mileage_id) {
		this.mileage_id = mileage_id;
	}

	public String getDrive_day() {
		return drive_day;
	}

	public void setDrive_day(String drive_day) {
		this.drive_day = drive_day;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getStart_point() {
		return start_point;
	}

	public void setStart_point(String start_point) {
		this.start_point = start_point;
	}

	public String getVia_point() {
		return via_point;
	}

	public void setVia_point(String via_point) {
		this.via_point = via_point;
	}

	public String getEnd_point() {
		return end_point;
	}

	public void setEnd_point(String end_point) {
		this.end_point = end_point;
	}

	public String getOil_cd() {
		return oil_cd;
	}

	public void setOil_cd(String oil_cd) {
		this.oil_cd = oil_cd;
	}

	public String getOil_cd_name() {
		return oil_cd_name;
	}

	public void setOil_cd_name(String oil_cd_name) {
		this.oil_cd_name = oil_cd_name;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String[] getIn_expanse_id() {
		return in_expanse_id;
	}

	public void setIn_expanse_id(String[] in_expanse_id) {
		this.in_expanse_id = in_expanse_id;
	}

	public String[] getIn_pay_day() {
		return in_pay_day;
	}

	public void setIn_pay_day(String[] in_pay_day) {
		this.in_pay_day = in_pay_day;
	}

	public String[] getIn_expanse_type() {
		return in_expanse_type;
	}

	public void setIn_expanse_type(String[] in_expanse_type) {
		this.in_expanse_type = in_expanse_type;
	}

	public String[] getIn_category_id() {
		return in_category_id;
	}

	public void setIn_category_id(String[] in_category_id) {
		this.in_category_id = in_category_id;
	}

	public String[] getIn_payment() {
		return in_payment;
	}

	public void setIn_payment(String[] in_payment) {
		this.in_payment = in_payment;
	}

	public String[] getIn_expanse_name() {
		return in_expanse_name;
	}

	public void setIn_expanse_name(String[] in_expanse_name) {
		this.in_expanse_name = in_expanse_name;
	}

	public String[] getIn_confer_number() {
		return in_confer_number;
	}

	public void setIn_confer_number(String[] in_confer_number) {
		this.in_confer_number = in_confer_number;
	}

	public String[] getIn_code_name() {
		return in_code_name;
	}

	public void setIn_code_name(String[] in_code_name) {
		this.in_code_name = in_code_name;
	}

	public String[] getIn_mileage_id() {
		return in_mileage_id;
	}

	public void setIn_mileage_id(String[] in_mileage_id) {
		this.in_mileage_id = in_mileage_id;
	}

	public String[] getIn_drive_day() {
		return in_drive_day;
	}

	public void setIn_drive_day(String[] in_drive_day) {
		this.in_drive_day = in_drive_day;
	}

	public String[] getIn_purpose() {
		return in_purpose;
	}

	public void setIn_purpose(String[] in_purpose) {
		this.in_purpose = in_purpose;
	}

	public String[] getIn_start_point() {
		return in_start_point;
	}

	public void setIn_start_point(String[] in_start_point) {
		this.in_start_point = in_start_point;
	}

	public String[] getIn_via_point() {
		return in_via_point;
	}

	public void setIn_via_point(String[] in_via_point) {
		this.in_via_point = in_via_point;
	}

	public String[] getIn_end_point() {
		return in_end_point;
	}

	public void setIn_end_point(String[] in_end_point) {
		this.in_end_point = in_end_point;
	}

	public String[] getIn_oil_cd() {
		return in_oil_cd;
	}

	public void setIn_oil_cd(String[] in_oil_cd) {
		this.in_oil_cd = in_oil_cd;
	}

	public String[] getIn_distance() {
		return in_distance;
	}

	public void setIn_distance(String[] in_distance) {
		this.in_distance = in_distance;
	}

	public String[] getIn_cost() {
		return in_cost;
	}

	public void setIn_cost(String[] in_cost) {
		this.in_cost = in_cost;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getApproved_date() {
		return approved_date;
	}

	public void setApproved_date(String approved_date) {
		this.approved_date = approved_date;
	}

	public String getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}

	public String getStatus_name() {
		return status_name;
	}

	public void setStatus_name(String status_name) {
		this.status_name = status_name;
	}

	public String getExpanse_day() {
		return expanse_day;
	}

	public void setExpanse_day(String expanse_day) {
		this.expanse_day = expanse_day;
	}

	public String getExpanse_type_name() {
		return expanse_type_name;
	}

	public void setExpanse_type_name(String expanse_type_name) {
		this.expanse_type_name = expanse_type_name;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getParent_category_name() {
		return parent_category_name;
	}

	public void setParent_category_name(String parent_category_name) {
		this.parent_category_name = parent_category_name;
	}

	public String getExpanse_count() {
		return expanse_count;
	}

	public void setExpanse_count(String expanse_count) {
		this.expanse_count = expanse_count;
	}

	public String getMileage_count() {
		return mileage_count;
	}

	public void setMileage_count(String mileage_count) {
		this.mileage_count = mileage_count;
	}

	public String getPayment_count() {
		return payment_count;
	}

	public void setPayment_count(String payment_count) {
		this.payment_count = payment_count;
	}

	public String getDivision_cd_name() {
		return division_cd_name;
	}

	public void setDivision_cd_name(String division_cd_name) {
		this.division_cd_name = division_cd_name;
	}

	public String getHead_yn() {
		return head_yn;
	}

	public void setHead_yn(String head_yn) {
		this.head_yn = head_yn;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}