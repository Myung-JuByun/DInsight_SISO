package siso.adm.user.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : UserAdminVO.java
 * @Description : UserAdminVO Class
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
public class UserAdminVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	

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
	
	/** 사업부 코드(조회) */
	private String operation_cd;
	
	
	/** 사용자 아이디 키값(조회) */
	private String user_id;
	
	/** 사용자명(조회) */
	private String user_name;
	
	/** 로그인 아이디(조회) */
	private String login_id;
	
	/** 로그인 비밀번호(조회) */
	private String login_Passwd;
	
	/** 사업부_코드(검색) */
	private String last_division_cd;
	
	/** 사업부_코드 명(검색) */
	private String last_division_cd_name;
	
	/** 직급 코드(조회) */
	private String job_title_cd;
	
	/** 직급 코드 명(조회) */
	private String job_title_cd_name;
	
	/** 영어이름(조회) */
	private String name_english;
	
	/** 주민번호(조회) */
	private String registration_number;
	
	/** 이메일(조회) */
	private String email;
	
	/** 핸드폰(조회) */
	private String mobile;
	
	/** 주소(조회) */
	private String address;
	
	/** 생년월일(조회) */
	private String birthday;
	
	/** 고용구분 코드(조회) */
	private String employ_type_cd;
	
	/** 고용구분 코드 명(조회) */
	private String employ_type_cd_name;
	
	/** 양력여부(조회) */
	private String solar_yn;
	
	/** 활성여부(조회) */
	private String activate_yn;
	
	/** 화면 권한 코드(조회) */
	private String role_cd;
	
	/** 화면 권한 코드 명(조회) */
	private String role_cd_name;
	
	/** 부서장 여부(조회) */
	private String head_yn;
	
	/** 영업자 여부(조회) */
	private String sales_yn;
	
	/** 삭제여부(조회) */
	private String delete_yn;
	
		
	/** 사용자 아이디 키값(입력) */
	private String[] in_user_id;
	
	/** 부서장 여부(입력) */
	private String[] in_head_yn;
	
	/** 로그인 아이디(입력) */
	private String[] in_login_id;
	
	

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

	public String getOperation_cd() {
		return operation_cd;
	}

	public void setOperation_cd(String operation_cd) {
		this.operation_cd = operation_cd;
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

	public String getLogin_id() {
		return login_id;
	}

	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}

	public String getLogin_Passwd() {
		return login_Passwd;
	}

	public void setLogin_Passwd(String login_Passwd) {
		this.login_Passwd = login_Passwd;
	}

	public String getLast_division_cd() {
		return last_division_cd;
	}

	public void setLast_division_cd(String last_division_cd) {
		this.last_division_cd = last_division_cd;
	}

	public String getLast_division_cd_name() {
		return last_division_cd_name;
	}

	public void setLast_division_cd_name(String last_division_cd_name) {
		this.last_division_cd_name = last_division_cd_name;
	}

	public String getJob_title_cd() {
		return job_title_cd;
	}

	public void setJob_title_cd(String job_title_cd) {
		this.job_title_cd = job_title_cd;
	}

	public String getJob_title_cd_name() {
		return job_title_cd_name;
	}

	public void setJob_title_cd_name(String job_title_cd_name) {
		this.job_title_cd_name = job_title_cd_name;
	}

	public String getName_english() {
		return name_english;
	}

	public void setName_english(String name_english) {
		this.name_english = name_english;
	}

	public String getRegistration_number() {
		return registration_number;
	}

	public void setRegistration_number(String registration_number) {
		this.registration_number = registration_number;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getEmploy_type_cd() {
		return employ_type_cd;
	}

	public void setEmploy_type_cd(String employ_type_cd) {
		this.employ_type_cd = employ_type_cd;
	}

	public String getEmploy_type_cd_name() {
		return employ_type_cd_name;
	}

	public void setEmploy_type_cd_name(String employ_type_cd_name) {
		this.employ_type_cd_name = employ_type_cd_name;
	}

	public String getSolar_yn() {
		return solar_yn;
	}

	public void setSolar_yn(String solar_yn) {
		this.solar_yn = solar_yn;
	}

	public String getActivate_yn() {
		return activate_yn;
	}

	public void setActivate_yn(String activate_yn) {
		this.activate_yn = activate_yn;
	}

	public String getRole_cd() {
		return role_cd;
	}

	public void setRole_cd(String role_cd) {
		this.role_cd = role_cd;
	}

	public String getRole_cd_name() {
		return role_cd_name;
	}

	public void setRole_cd_name(String role_cd_name) {
		this.role_cd_name = role_cd_name;
	}

	public String getHead_yn() {
		return head_yn;
	}

	public void setHead_yn(String head_yn) {
		this.head_yn = head_yn;
	}

	public String getSales_yn() {
		return sales_yn;
	}

	public void setSales_yn(String sales_yn) {
		this.sales_yn = sales_yn;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String[] getIn_user_id() {
		return in_user_id;
	}

	public void setIn_user_id(String[] in_user_id) {
		this.in_user_id = in_user_id;
	}

	public String[] getIn_head_yn() {
		return in_head_yn;
	}

	public void setIn_head_yn(String[] in_head_yn) {
		this.in_head_yn = in_head_yn;
	}

	public String[] getIn_login_id() {
		return in_login_id;
	}

	public void setIn_login_id(String[] in_login_id) {
		this.in_login_id = in_login_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}