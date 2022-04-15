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
package siso.sas.admin.service;

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
public class SalesAdminInfoVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 담당 부서명 */
    private String division_cd;
    
    /** 담당 영업 사원 */
    private String user_id;
    
    private String sales_user;
    
    /** 담당 영업 사원 */
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
    
    /** 영업 유형 */
    private String sales_type_cd;
    
    /** 고객사 */
    private String company_id;
    
    /** 고객사 */
    private String company_name;
    
    /** 브랜드코드 */
    private String brand_cd;
    
    /** 모듈 */
    private String module;
    
    /** 수량 */
    private String qty;
    
    /** 계약금액 */
    private String contract_price;
    
    /** 영업이익 */
    private String profit_price;
    
    /** 계약시점 */
    private String contract_ym;
    
    /** 보고사항 */
    private String report_item;
    
    /** sales_id */
    private String sales_id;
    
    
    
    /** 담당 부서명 (입력) */
    private String[] in_division_cd;
    
    /** 담당 영업 사원 (입력) */
    private String[] in_user_name;
    
    /** 영업 구분 코드(신규 or ALC) (입력) */
    private String[] in_sales_divide_cd;
    
    /** 이슈여부 (입력) */
    private String[] in_issue_yn;
    
    /** 영업 상태 (입력) */
    private String[] in_sales_status_cd;
    
    /** 년도 (입력) */
    private String[] in_year;
    
    /** 달 (입력) */
    private String[] in_month;
    
    /** 영업 유형 (입력) */
    private String[] in_sales_type_cd;
    
    /** 고객사 (입력) */
    private String[] in_company_name;
    
    /** 브랜드코드 (입력) */
    private String[] in_brand_cd;
    
    /** 모듈 (입력) */
    private String[] in_module;
    
    /** 수량 (입력) */
    private String[] in_qty;
    
    /** 계약금액 (입력) */
    private String[] in_contract_price;
    
    /** 영업이익 (입력) */
    private String[] in_profit_price;
    
    /** 계약시점 (입력) */
    private String[] in_contract_ym;
    
    /** 보고사항 (입력) */
    private String[] in_report_item;
    

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


	public String getSales_user() {
		return sales_user;
	}


	public void setSales_user(String sales_user) {
		this.sales_user = sales_user;
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


	public String getSales_type_cd() {
		return sales_type_cd;
	}


	public void setSales_type_cd(String sales_type_cd) {
		this.sales_type_cd = sales_type_cd;
	}


	public String getCompany_id() {
		return company_id;
	}


	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}


	public String getCompany_name() {
		return company_name;
	}


	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}


	public String getBrand_cd() {
		return brand_cd;
	}


	public void setBrand_cd(String brand_cd) {
		this.brand_cd = brand_cd;
	}


	public String getModule() {
		return module;
	}


	public void setModule(String module) {
		this.module = module;
	}


	public String getQty() {
		return qty;
	}


	public void setQty(String qty) {
		this.qty = qty;
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


	public String getReport_item() {
		return report_item;
	}


	public void setReport_item(String report_item) {
		this.report_item = report_item;
	}


	public String getSales_id() {
		return sales_id;
	}


	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}


	public String[] getIn_division_cd() {
		return in_division_cd;
	}


	public void setIn_division_cd(String[] in_division_cd) {
		this.in_division_cd = in_division_cd;
	}


	public String[] getIn_user_name() {
		return in_user_name;
	}


	public void setIn_user_name(String[] in_user_name) {
		this.in_user_name = in_user_name;
	}


	public String[] getIn_sales_divide_cd() {
		return in_sales_divide_cd;
	}


	public void setIn_sales_divide_cd(String[] in_sales_divide_cd) {
		this.in_sales_divide_cd = in_sales_divide_cd;
	}


	public String[] getIn_issue_yn() {
		return in_issue_yn;
	}


	public void setIn_issue_yn(String[] in_issue_yn) {
		this.in_issue_yn = in_issue_yn;
	}


	public String[] getIn_sales_status_cd() {
		return in_sales_status_cd;
	}


	public void setIn_sales_status_cd(String[] in_sales_status_cd) {
		this.in_sales_status_cd = in_sales_status_cd;
	}


	public String[] getIn_year() {
		return in_year;
	}


	public void setIn_year(String[] in_year) {
		this.in_year = in_year;
	}


	public String[] getIn_month() {
		return in_month;
	}


	public void setIn_month(String[] in_month) {
		this.in_month = in_month;
	}


	public String[] getIn_sales_type_cd() {
		return in_sales_type_cd;
	}


	public void setIn_sales_type_cd(String[] in_sales_type_cd) {
		this.in_sales_type_cd = in_sales_type_cd;
	}


	public String[] getIn_company_name() {
		return in_company_name;
	}


	public void setIn_company_name(String[] in_company_name) {
		this.in_company_name = in_company_name;
	}


	public String[] getIn_brand_cd() {
		return in_brand_cd;
	}


	public void setIn_brand_cd(String[] in_brand_cd) {
		this.in_brand_cd = in_brand_cd;
	}


	public String[] getIn_module() {
		return in_module;
	}


	public void setIn_module(String[] in_module) {
		this.in_module = in_module;
	}


	public String[] getIn_qty() {
		return in_qty;
	}


	public void setIn_qty(String[] in_qty) {
		this.in_qty = in_qty;
	}


	public String[] getIn_contract_price() {
		return in_contract_price;
	}


	public void setIn_contract_price(String[] in_contract_price) {
		this.in_contract_price = in_contract_price;
	}


	public String[] getIn_profit_price() {
		return in_profit_price;
	}


	public void setIn_profit_price(String[] in_profit_price) {
		this.in_profit_price = in_profit_price;
	}


	public String[] getIn_contract_ym() {
		return in_contract_ym;
	}


	public void setIn_contract_ym(String[] in_contract_ym) {
		this.in_contract_ym = in_contract_ym;
	}


	public String[] getIn_report_item() {
		return in_report_item;
	}


	public void setIn_report_item(String[] in_report_item) {
		this.in_report_item = in_report_item;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
