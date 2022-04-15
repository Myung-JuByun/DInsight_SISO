/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package siso.usr.service;

import org.apache.commons.lang.builder.ToStringBuilder;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : UserInfohVO.java
 * @Description : UserInfohVO Class
 * @Modification Information 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class UserInfoVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 아이디 */
	private String login_id;

	/** 이름 */
	private String user_name;

	/** 부서코드 */
	private String division_cd;

	/** 직급코드 */
	private String job_title_cd;

	/** 이메일 */
	private String email;

	/** 활성여부 */
	private String activate_yn;

	/** 부서장여부 */
	private String head_yn;

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
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

	public String getDivision_cd() {
		return division_cd;
	}

	public void setDivision_cd(String division_cd) {
		this.division_cd = division_cd;
	}

	public String getJob_title_cd() {
		return job_title_cd;
	}

	public void setJob_title_cd(String job_title_cd) {
		this.job_title_cd = job_title_cd;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getActivate_yn() {
		return activate_yn;
	}

	public void setActivate_yn(String activate_yn) {
		this.activate_yn = activate_yn;
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
