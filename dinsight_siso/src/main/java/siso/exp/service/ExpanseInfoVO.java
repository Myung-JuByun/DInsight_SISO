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
package siso.exp.service;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ExpSearchVO.java
 * @Description : ExpSearchVO Class
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
@SuppressWarnings("serial")
public class ExpanseInfoVO extends ComDefaultVO {

	/** 경비아이디 */
    private int expanse_id;

    /** 개인경비 내역 */
    private String expanse_name;
    
    /** 개인경비 구분 */
    private String expanse_type;
    
    /** 경비일 */
    private String pay_day = "";
    
    /** 카테고리3 아이디 */
    private int category_id = 0;
    
    /** 금액 */
    private long payment = 0;
    
    /** 기준년도 */
    private String expanse_year = "";
    
    /** 기준월 */
    private String expanse_month = "";
    
    /** 제출일 */
    private Date submited_date;
    
    /** 승인(반려)일 */
    private Date approved_date;
    
    /** 완결일 */
    private Date finalized_date;
    
    /** 부서 코드 */
    private String division_cd = "";
    
    /** 부서 명 */
    private String division_name = "";
    
    /** 상태코드 */
    private String status_cd = "";
    
    /** 상태명 */
    private String status_name = "";
    
    /** 프로젝트 아이디 */
    private int project_id = 0;
    
    /** 처리자 아이디 */
    private int user_id = 0;
    
    /** 데이터 처리 mode */
    private String dataMode = "";
    
    @Override
	public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

	public int getExpanse_id() {
		return expanse_id;
	}

	public String getExpanse_name() {
		return expanse_name;
	}

	public String getExpanse_type() {
		return expanse_type;
	}

	public String getPay_day() {
		return pay_day;
	}

	public int getCategory_id() {
		return category_id;
	}

	public long getPayment() {
		return payment;
	}

	public String getExpanse_year() {
		return expanse_year;
	}

	public String getExpanse_month() {
		return expanse_month;
	}

	public Date getSubmited_date() {
		return submited_date;
	}

	public Date getApproved_date() {
		return approved_date;
	}

	public Date getFinalized_date() {
		return finalized_date;
	}

	public String getDivision_cd() {
		return division_cd;
	}

	public String getDivision_name() {
		return division_name;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public String getStatus_name() {
		return status_name;
	}

	public int getProject_id() {
		return project_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public String getDataMode() {
		return dataMode;
	}

	public void setExpanse_id(int expanse_id) {
		this.expanse_id = expanse_id;
	}

	public void setExpanse_name(String expanse_name) {
		this.expanse_name = expanse_name;
	}

	public void setExpanse_type(String expanse_type) {
		this.expanse_type = expanse_type;
	}

	public void setPay_day(String pay_day) {
		this.pay_day = pay_day;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public void setPayment(long payment) {
		this.payment = payment;
	}

	public void setExpanse_year(String expanse_year) {
		this.expanse_year = expanse_year;
	}

	public void setExpanse_month(String expanse_month) {
		this.expanse_month = expanse_month;
	}

	public void setSubmited_date(Date submited_date) {
		this.submited_date = submited_date;
	}

	public void setApproved_date(Date approved_date) {
		this.approved_date = approved_date;
	}

	public void setFinalized_date(Date finalized_date) {
		this.finalized_date = finalized_date;
	}

	public void setDivision_cd(String division_cd) {
		this.division_cd = division_cd;
	}

	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public void setStatus_name(String status_name) {
		this.status_name = status_name;
	}

	public void setProject_id(int project_id) {
		this.project_id = project_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}			
}
