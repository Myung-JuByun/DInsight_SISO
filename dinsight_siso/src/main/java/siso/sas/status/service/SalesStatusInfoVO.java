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
package siso.sas.status.service;

import org.apache.commons.lang.builder.ToStringBuilder;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : CustomerSearchVO.java
 * @Description : CustomerSearchVO Class
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
public class SalesStatusInfoVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 담당 부서명 */
    private String division_cd;
    
    /** 담당 영업 사원 */
    private String sales_user;
    
    /**  */
    private String user_name;
    
    /** 영업 구분 코드(신규 or ALC) */
    private String sales_divide_cd;
    
    /** 이슈여부 */
    private String issue_yn;
    
    /** 영업 상태 */
    private String sales_status_cd;
    
    /** 년도 */
    private String year;
    
    /** 달 */
    private String month;
        
    /** 계약금액 */
    private String contract_price;
    
    /** 영업이익 */
    private String profit_price;
    
    /** 계약시점 */
    private String contract_ym; 
  
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public String getDivision_cd() {
		return division_cd;
	}

	public void setDivision_cd(String division_cd) {
		this.division_cd = division_cd;
	}

	public String getSales_user() {
		return sales_user;
	}

	public void setSales_user(String sales_user) {
		this.sales_user = sales_user;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getSales_divide_cd() {
		return sales_divide_cd;
	}

	public void setSales_divide_cd(String sales_divide_cd) {
		this.sales_divide_cd = sales_divide_cd;
	}

	public String getIssue_yn() {
		return issue_yn;
	}

	public void setIssue_yn(String issue_yn) {
		this.issue_yn = issue_yn;
	}

	public String getSales_status_cd() {
		return sales_status_cd;
	}

	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getContract_price() {
		return contract_price;
	}

	public void setContract_price(String contract_price) {
		this.contract_price = contract_price;
	}

	public String getProfit_price() {
		return profit_price;
	}

	public void setProfit_price(String profit_price) {
		this.profit_price = profit_price;
	}

	public String getContract_ym() {
		return contract_ym;
	}

	public void setContract_ym(String contract_ym) {
		this.contract_ym = contract_ym;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
