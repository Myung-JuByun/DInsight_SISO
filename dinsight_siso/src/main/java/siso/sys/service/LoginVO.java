package  siso.sys.service;

import java.io.Serializable;

/**
 * @Class Name : LoginVO.java
 * @Description : Login VO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.03.03    박지욱          최초 생성
 *
 *  @author 공통서비스 개발팀 박지욱
 *  @since 2009.03.03
 *  @version 1.0
 *  @see
 *  
 */
public class LoginVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8274004534207618049L;
	
	/** 사원번호 */
	private int user_id = 0;
	/** 이름 */
	private String user_name;
	/** 로그인 아이디 */
	private String login_id;
	/** 로그인 비밀번호 */
	private String login_Passwd;
	/** 조직(부서)ID */
	private String division_cd;
	/** 조직(부서)명 */
	private String division_name;
	/** 조직(팀)코드 */
	private String team_cd;
	/** 조직(팀)명 */
	private String team_name;
	/** 직급코드 */
	private String job_title_cd;
	/** 직급명 */
	private String job_title_name;
	/** 주민등록번호 */
	private String registration_number;
	/** 이메일주소 */
	private String email;
	/** 직급명 */
	private String address;
	/** 직급명 */
	private String birthday;
	/** 계약구분코드 */
	private String employ_type_cd;
	/** 사용자권한코드 */
	private String role_cd;
	/** 부서장여부 */
	private String head_yn;
	/** 영업자여부 */
	private String sales_yn;
	/** 활동화여부 */
	private String activate_yn;
	/** 에러메시지 */
	private Boolean error_yn;
	/** 에러메시지 */
	private String returnMessage;
	/** 에러메시지  - 신규 추가 */
	private String returnMessageCode;
	/** 조직(부서)ID - 신규 추가 */
	private String last_division_cd;
	/** 권한 - 신규 추가 */
	private String grant_id;
	/** 사업부여부 - 신규 추가 */
	private String operation_yn;
	/** 사업부 코드 - 신규 추가 */
	private String operation_cd;
	
	
	/* ----- 사용안함 ------*/
	/** 비밀번호 힌트 */
	private String passwordHint;
	/** 비밀번호 정답 */
	private String passwordCnsr;
	/** 사용자구분 */
	private String userSe;
	/** 고유아이디 */
	private String uniqId;
	/** 로그인 후 이동할 페이지 */
	private String url;
	/** 사용자 IP정보 */
	private String ip;
	/** GPKI인증 DN */
	private String dn;
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
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
	public String getTeam_cd() {
		return team_cd;
	}
	public void setTeam_cd(String team_cd) {
		this.team_cd = team_cd;
	}
	public String getTeam_name() {
		return team_name;
	}
	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}	
	public String getJob_title_cd() {
		return job_title_cd;
	}
	public void setJob_title_cd(String job_title_cd) {
		this.job_title_cd = job_title_cd;
	}
	public String getJob_title_name() {
		return job_title_name;
	}
	public void setJob_title_name(String job_title_name) {
		this.job_title_name = job_title_name;
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
	public String getRole_cd() {
		return role_cd;
	}
	public void setRole_cd(String role_cd) {
		this.role_cd = role_cd;
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
	public String getActivate_yn() {
		return activate_yn;
	}
	public void setActivate_yn(String activate_yn) {
		this.activate_yn = activate_yn;
	}
	public Boolean getError_yn() {
		return error_yn;
	}
	public void setError_yn(Boolean error_yn) {
		this.error_yn = error_yn;
	}
	public String getReturnMessage() {
		return returnMessage;
	}
	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}
	public String getReturnMessageCode() {
		return returnMessageCode;
	}
	public void setReturnMessageCode(String returnMessageCode) {
		this.returnMessageCode = returnMessageCode;
	}
	public String getLast_division_cd() {
		return last_division_cd;
	}
	public void setLast_division_cd(String last_division_cd) {
		this.last_division_cd = last_division_cd;
	}
	public String getGrant_id() {
		return grant_id;
	}
	public void setGrant_id(String grant_id) {
		this.grant_id = grant_id;
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
	public String getPasswordHint() {
		return passwordHint;
	}
	public void setPasswordHint(String passwordHint) {
		this.passwordHint = passwordHint;
	}
	public String getPasswordCnsr() {
		return passwordCnsr;
	}
	public void setPasswordCnsr(String passwordCnsr) {
		this.passwordCnsr = passwordCnsr;
	}
	public String getUserSe() {
		return userSe;
	}
	public void setUserSe(String userSe) {
		this.userSe = userSe;
	}
	public String getUniqId() {
		return uniqId;
	}
	public void setUniqId(String uniqId) {
		this.uniqId = uniqId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getDn() {
		return dn;
	}
	public void setDn(String dn) {
		this.dn = dn;
	}
	
	
	
	
}
