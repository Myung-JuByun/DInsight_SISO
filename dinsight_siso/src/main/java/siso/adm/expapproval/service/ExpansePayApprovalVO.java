package siso.adm.expapproval.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ExpansePayApprovalVO.java
 * @Description : ExpansePayApprovalVO Class
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
public class ExpansePayApprovalVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_expanse_year = "";
	
	/** 월(검색) */
	private String sh_expanse_month = "";
	

	/** 부서 아이디 키값(조회) */
	private String division_id;
	
	/** 부서 코드(조회) */
	private String division_cd;
	
	/** 부서 명(조회) */
	private String division_name;
	
	/** 속성 설명(조회) */
	private String etc_explain;
	
	/** 부서 레벨(조회) */
	private String division_level;
	
	/** 상위 부서 코드(조회) */
	private String parent_cd;
	
	/** 순서(조회) */
	private String order_seq;
	
	/** 사업부여부(조회) */
	private String operation_yn;
	
	/** 삭제여부(조회) */
	private String delete_yn;
	
	
	/** 직원명(조회) */
	private String user_name;
	
	/** 직원 고유번호 키값(조회) */
	private String user_id;
	

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

	public String getDivision_id() {
		return division_id;
	}

	public void setDivision_id(String division_id) {
		this.division_id = division_id;
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

	public String getEtc_explain() {
		return etc_explain;
	}

	public void setEtc_explain(String etc_explain) {
		this.etc_explain = etc_explain;
	}

	public String getDivision_level() {
		return division_level;
	}

	public void setDivision_level(String division_level) {
		this.division_level = division_level;
	}

	public String getParent_cd() {
		return parent_cd;
	}

	public void setParent_cd(String parent_cd) {
		this.parent_cd = parent_cd;
	}

	public String getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}

	public String getOperation_yn() {
		return operation_yn;
	}

	public void setOperation_yn(String operation_yn) {
		this.operation_yn = operation_yn;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}