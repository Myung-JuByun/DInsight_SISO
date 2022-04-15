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
public class SalesStatusSearchVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

    /** 부서 */
    private String division_cd = "";
    
    /** 담당영업 */
    private String user_list = "";
    
    /** 영업 status */
    private String sales_divide_cd = "";
    
    /** year */
    private String year = "";
    
    /** month */
    private String month = "";

    /** 신규 or ALC */
    private String sales_status_cd = "";
    
    /** 영업이슈여부 */
    private String issue_yn = "";
    
    
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


	public String getUser_list() {
		return user_list;
	}


	public void setUser_list(String user_list) {
		this.user_list = user_list;
	}


	public String getSales_divide_cd() {
		return sales_divide_cd;
	}


	public void setSales_divide_cd(String sales_divide_cd) {
		this.sales_divide_cd = sales_divide_cd;
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


	public String getSales_status_cd() {
		return sales_status_cd;
	}


	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}


	public String getIssue_yn() {
		return issue_yn;
	}


	public void setIssue_yn(String issue_yn) {
		this.issue_yn = issue_yn;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
