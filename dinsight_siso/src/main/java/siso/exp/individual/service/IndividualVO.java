package siso.exp.individual.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : PaymentVO.java
 * @Description : PaymentVO Class
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
public class IndividualVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 결제 요청구분(검색) */
	private String sh_expanse_year = "";
	
	
	/** 기준년도(조회) */
	private String expanse_year;
	
    /** 기준월(조회) */
	private String expanse_month;
	
	/** 경비 구분 코드(조회) */
	private String expanse_type;
	
	/** 경비 구분 코드 명(조회) */
	private String expanse_type_name;
	
	/** 금액(조회) */
	private String payment;
	
	/** 상태 코드(조회) */
	private String status_cd;	
	
	/** 상태 코드 명(조회) */
	private String status_cd_name;
	
	/** 정렬번호(조회) */
	private String order_seq;
	
	
	/** 정렬번호(조회) (엑셀) */
	private String month_name;
	
	/** 정렬번호(조회) (엑셀) */
	private String text1;
	
	/** 정렬번호(조회) (엑셀) */
	private String text2;
	
	/** 정렬번호(조회) (엑셀) */
	private String text3;
	
	/** 정렬번호(조회) (엑셀) */
	private String text4;
	
	/** 정렬번호(조회) (엑셀) */
	private String text5;
	

	public String getSh_expanse_year() {
		return sh_expanse_year;
	}

	public void setSh_expanse_year(String sh_expanse_year) {
		this.sh_expanse_year = sh_expanse_year;
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

	public String getExpanse_type() {
		return expanse_type;
	}

	public void setExpanse_type(String expanse_type) {
		this.expanse_type = expanse_type;
	}

	public String getExpanse_type_name() {
		return expanse_type_name;
	}

	public void setExpanse_type_name(String expanse_type_name) {
		this.expanse_type_name = expanse_type_name;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
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

	public String getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}

	public String getMonth_name() {
		return month_name;
	}

	public void setMonth_name(String month_name) {
		this.month_name = month_name;
	}

	public String getText1() {
		return text1;
	}

	public void setText1(String text1) {
		this.text1 = text1;
	}

	public String getText2() {
		return text2;
	}

	public void setText2(String text2) {
		this.text2 = text2;
	}

	public String getText3() {
		return text3;
	}

	public void setText3(String text3) {
		this.text3 = text3;
	}

	public String getText4() {
		return text4;
	}

	public void setText4(String text4) {
		this.text4 = text4;
	}

	public String getText5() {
		return text5;
	}

	public void setText5(String text5) {
		this.text5 = text5;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}