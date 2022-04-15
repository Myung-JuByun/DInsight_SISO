package siso.exp.payment.service;

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
public class PaymentVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 결제 요청구분(검색) */
	private String sh_payment_type = "";
	
	/** 부서(검색) */
	private String sh_division_cd = "";
	
	/** 이름(검색) */
	private String sh_user_name = "";
	
	
    /** 결재 승인자 key값(조회) */
	private String approval_owner_id;
	
	/** 결재 요청 데이터 종류 코드(조회) */
	private String source_type_cd;
	
	/** 결재 신청자(조회) */
	private String user_id;
	
	/** 소유자-결재대상자(조회) */
	private String owner_id;
	
	/** 경비선 지정 코드(조회) */
	private String expanse_appoint_cd;
	
	/** 경비선 지정 코드명(조회) */
	private String expanse_appoint_cd_name;
	
	/** 정렬번호(조회) */
	private String order_seq;
	
	
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
	
	/** 사업부여부(조회) */
	private String operation_yn;
	
	/** 사업부 코드(조회) */
	private String operation_cd;
	
	/** 삭제여부(조회) */
	private String delete_yn;
	
	
	/** 로그인 아이디(조회) */
	private String login_id;
	
	/** 직원명(조회) */
	private String user_name;
	
	/** 직급명(조회) */
	private String job_title_name;
	
	/** 영문 직원명(조회) */
	private String name_english;
	
	/** 이메일(조회) */
	private String email;
	
	/** 부서장유무(조회) */
	private String head_yn;
	
	/** 활성여부(조회) */
	private String activate_yn;
	
	/** 고용구분(조회) */
	private String employ_type_cd;
	
	/** 고용구분(조회) */
	private String employ_type_name;
	
	/** 결재 승인자 key값(입력) */
	private String[] in_approval_owner_id;
	
	/** 소유자-결재대상자(입력) */
	private String[] in_owner_id;
	
	/** 경비선 지정 코드(입력) */
	private String[] in_expanse_appoint_cd;
	
	/** 정렬번호(입력) */
	private String[] in_order_seq;
	
	
	private String job_title_cd;
	
	private String code_name;
	
	private String company_id;
	
	
	public String getJob_title_cd() {
		return job_title_cd;
	}

	public void setJob_title_cd(String job_title_cd) {
		this.job_title_cd = job_title_cd;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public String getCompany_id() {
		return company_id;
	}

	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}

	public String getSh_payment_type() {
		return sh_payment_type;
	}

	public void setSh_payment_type(String sh_payment_type) {
		this.sh_payment_type = sh_payment_type;
	}

	public String getSh_division_cd() {
		return sh_division_cd;
	}

	public void setSh_division_cd(String sh_division_cd) {
		this.sh_division_cd = sh_division_cd;
	}

	public String getSh_user_name() {
		return sh_user_name;
	}

	public void setSh_user_name(String sh_user_name) {
		this.sh_user_name = sh_user_name;
	}

	public String getApproval_owner_id() {
		return approval_owner_id;
	}

	public void setApproval_owner_id(String approval_owner_id) {
		this.approval_owner_id = approval_owner_id;
	}

	public String getSource_type_cd() {
		return source_type_cd;
	}

	public void setSource_type_cd(String source_type_cd) {
		this.source_type_cd = source_type_cd;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(String owner_id) {
		this.owner_id = owner_id;
	}

	public String getExpanse_appoint_cd() {
		return expanse_appoint_cd;
	}

	public void setExpanse_appoint_cd(String expanse_appoint_cd) {
		this.expanse_appoint_cd = expanse_appoint_cd;
	}

	public String getExpanse_appoint_cd_name() {
		return expanse_appoint_cd_name;
	}

	public void setExpanse_appoint_cd_name(String expanse_appoint_cd_name) {
		this.expanse_appoint_cd_name = expanse_appoint_cd_name;
	}

	public String getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
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

	public String getOperation_yn() {
		return operation_yn;
	}

	public void setOperation_yn(String operation_yn) {
		this.operation_yn = operation_yn;
	}

	public String getOperation_cd() {
		return operation_cd;
	}

	public void setOperation_cd(String operation_cd) {
		this.operation_cd = operation_cd;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getLogin_id() {
		return login_id;
	}

	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getJob_title_name() {
		return job_title_name;
	}

	public void setJob_title_name(String job_title_name) {
		this.job_title_name = job_title_name;
	}

	public String getName_english() {
		return name_english;
	}

	public void setName_english(String name_english) {
		this.name_english = name_english;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHead_yn() {
		return head_yn;
	}

	public void setHead_yn(String head_yn) {
		this.head_yn = head_yn;
	}

	public String getActivate_yn() {
		return activate_yn;
	}

	public void setActivate_yn(String activate_yn) {
		this.activate_yn = activate_yn;
	}

	public String[] getIn_approval_owner_id() {
		return in_approval_owner_id;
	}

	public void setIn_approval_owner_id(String[] in_approval_owner_id) {
		this.in_approval_owner_id = in_approval_owner_id;
	}

	public String[] getIn_owner_id() {
		return in_owner_id;
	}

	public void setIn_owner_id(String[] in_owner_id) {
		this.in_owner_id = in_owner_id;
	}

	public String[] getIn_expanse_appoint_cd() {
		return in_expanse_appoint_cd;
	}

	public void setIn_expanse_appoint_cd(String[] in_expanse_appoint_cd) {
		this.in_expanse_appoint_cd = in_expanse_appoint_cd;
	}

	public String[] getIn_order_seq() {
		return in_order_seq;
	}

	public void setIn_order_seq(String[] in_order_seq) {
		this.in_order_seq = in_order_seq;
	}

	public String getEmploy_type_cd() {
		return employ_type_cd;
	}

	public void setEmploy_type_cd(String employ_type_cd) {
		this.employ_type_cd = employ_type_cd;
	}

	public String getEmploy_type_name() {
		return employ_type_name;
	}

	public void setEmploy_type_name(String employ_type_name) {
		this.employ_type_name = employ_type_name;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}