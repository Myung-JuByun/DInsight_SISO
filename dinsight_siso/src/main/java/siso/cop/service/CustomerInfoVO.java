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
package siso.cop.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : CustomerInfoVO.java
 * @Description : CustomerInfoVO Class
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
public class CustomerInfoVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** page*/
	private String rn;
	
	private String max_rn;
	
	private String page;
		
	private String rowNum;
		
	/** 고객사 */
    private String company_name;
    
    /** 고객사(영문) */
    private String company_eng;    
    
    /** 영업담당자 */
    private String sales_customer;
    
    /** 영업담당자 */
    private String site_id;
    
    /** 대표명 */
    private String chairman;
    
    /** 업종 */
    private String business_category;
    
    /** 업태 */
    private String business_condition;
    
    /** 사업자등록번호 */
    private String company_reg_number;
    
    /** 사업자등록번호 */
    private String company_reg_check;
        
    /** 법인번호 */
    private String corporate_number;
    
    /** 법인번호 */
    private String corporate_number_check;
  
	/** 전화번호 */
    private String phone_number;
    
    /** 전화번호 */
    private String main_fax;
    

	/** 주소 */
    private String address;
    
    /** 주소(영문) */
    private String address_eng;
    
    /** 사원번호 */
	private String user_id;

	/** 고객사 아이디*/
	private int company_id;
	
	/** */
	private String company_yn;
	
	/** */
	private String charger_yn;
	
	private String etc;
	
	private String operation_cd;
	private String company_file_name;
	private String company_file_id;
	private String company_file_path;
	
	/** 우편번호 앞자리 */
	private String post1;
	/** 우편번호 뒷자리 */
	private String post2;
	/** 건물관리번호 */
	private String build_mng_no;	
	/** 우편번호 */
	private String zipcode;
	
	/** 등록자 **/
	private String user_name;
	
	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getEtc() {
		return etc;
	}

	public void setEtc(String etc) {
		this.etc = etc;
	}

	public String getOperation_cd() {
		return operation_cd;
	}

	public void setOperation_cd(String operation_cd) {
		this.operation_cd = operation_cd;
	}
	
	
	/** 고객사명(입력) */
	private String[] in_company_name;
	
	/** 대표명(입력) */
	private String[] in_chairman;
	
	/** 업종(입력) */
	private String[] in_business_category;
	
	/** 업태(입력) */
	private String[] in_business_condition;
	
	/** 사업자등록번호(입력) */
	private String[] in_company_reg_number;
	
	/** 법인번호(입력) */
	private String[] in_corporate_number;

	/** 연락처(입력) */
	private String[] in_phone_number;
	
	/** 주소(입력) */
	private String[] in_address;
	
	private String[] in_invoice_gb;

	/** 고객사명(입력) */
	private String[] in_company_eng;
	
	/** 영업담당자(입력) */
	private String[] in_sales_customer;
	
	/** 사이트아이디(입력) */
	private String[] in_site_id;
	
	/** 주소 영문(입력) */
	private String[] in_address_eng;
	
	/** (입력) */
	private String[] in_company_reg_check;
	
	/** 세금계산서 여부 */
	private String invoice_gb;
	
	private String invoice_gb_nm;

	/** 고객사 담당자 */
	private String customer_id;
	
	/** 고객사 담당자 이름 */
	private String customer_name;
	
	/** 고객사 담당자 부서 */
	private String division;
	
	/** 고객사 담당자 직급 */
	private String job_title;
	
	/** 고객사 담당자 이메일 */
	private String email;
	
	/** 고객사 담당자 핸드폰 */
	private String mobile;
	
	/** 고객사 담당자 전화번호 */
	private String sub_phone_number;
	
	/** 고객사 담당자 팩스 */
	private String fax;
	
	/** 고객사 담당자(입력) */
	private String[] in_customer_id;
	
	/** 고객사 담당자 이름(입력) */
	private String[] in_customer_name;
	
	/** 고객사 담당자 부서(입력) */
	private String[] in_division;
	
	/** 고객사 담당자 직급(입력) */
	private String[] in_job_title;
	
	/** 고객사 담당자 이메일(입력) */
	private String[] in_email;
	
	/** 고객사 담당자 핸드폰(입력) */
	private String[] in_mobile;
	
	/** 고객사 담당자 전화번호(입력) */
	private String[] in_sub_phone_number;
	
	/** 고객사 담당자 팩스(입력) */
	private String[] in_fax;
	
	private int in_sub_company_id;
	
	private String sales_customer_user_id;

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getCompany_eng() {
		return company_eng;
	}

	public void setCompany_eng(String company_eng) {
		this.company_eng = company_eng;
	}

	public String getSales_customer() {
		return sales_customer;
	}

	public void setSales_customer(String sales_customer) {
		this.sales_customer = sales_customer;
	}

	public String getSite_id() {
		return site_id;
	}

	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}

	public String getChairman() {
		return chairman;
	}

	public void setChairman(String chairman) {
		this.chairman = chairman;
	}

	public String getBusiness_category() {
		return business_category;
	}

	public void setBusiness_category(String business_category) {
		this.business_category = business_category;
	}

	public String getBusiness_condition() {
		return business_condition;
	}

	public void setBusiness_condition(String business_condition) {
		this.business_condition = business_condition;
	}

	public String getCompany_reg_number() {
		return company_reg_number;
	}

	public void setCompany_reg_number(String company_reg_number) {
		this.company_reg_number = company_reg_number;
	}

	public String getCompany_reg_check() {
		return company_reg_check;
	}

	public void setCompany_reg_check(String company_reg_check) {
		this.company_reg_check = company_reg_check;
	}

	public String getCorporate_number() {
		return corporate_number;
	}

	public void setCorporate_number(String corporate_number) {
		this.corporate_number = corporate_number;
	}

	public String getCorporate_number_check() {
		return corporate_number_check;
	}

	public void setCorporate_number_check(String corporate_number_check) {
		this.corporate_number_check = corporate_number_check;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getMain_fax() {
		return main_fax;
	}

	public void setMain_fax(String main_fax) {
		this.main_fax = main_fax;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress_eng() {
		return address_eng;
	}

	public void setAddress_eng(String address_eng) {
		this.address_eng = address_eng;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getCompany_yn() {
		return company_yn;
	}

	public void setCompany_yn(String company_yn) {
		this.company_yn = company_yn;
	}

	public String getCharger_yn() {
		return charger_yn;
	}

	public void setCharger_yn(String charger_yn) {
		this.charger_yn = charger_yn;
	}

	public String getCompany_file_name() {
		return company_file_name;
	}

	public void setCompany_file_name(String company_file_name) {
		this.company_file_name = company_file_name;
	}

	public String getCompany_file_id() {
		return company_file_id;
	}

	public void setCompany_file_id(String company_file_id) {
		this.company_file_id = company_file_id;
	}

	public String getCompany_file_path() {
		return company_file_path;
	}

	public void setCompany_file_path(String company_file_path) {
		this.company_file_path = company_file_path;
	}

	public String getPost1() {
		return post1;
	}

	public void setPost1(String post1) {
		this.post1 = post1;
	}

	public String getPost2() {
		return post2;
	}

	public void setPost2(String post2) {
		this.post2 = post2;
	}

	public String getBuild_mng_no() {
		return build_mng_no;
	}

	public void setBuild_mng_no(String build_mng_no) {
		this.build_mng_no = build_mng_no;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String[] getIn_company_name() {
		return in_company_name;
	}

	public void setIn_company_name(String[] in_company_name) {
		this.in_company_name = in_company_name;
	}

	public String[] getIn_chairman() {
		return in_chairman;
	}

	public void setIn_chairman(String[] in_chairman) {
		this.in_chairman = in_chairman;
	}

	public String[] getIn_business_category() {
		return in_business_category;
	}

	public void setIn_business_category(String[] in_business_category) {
		this.in_business_category = in_business_category;
	}

	public String[] getIn_business_condition() {
		return in_business_condition;
	}

	public void setIn_business_condition(String[] in_business_condition) {
		this.in_business_condition = in_business_condition;
	}

	public String[] getIn_company_reg_number() {
		return in_company_reg_number;
	}

	public void setIn_company_reg_number(String[] in_company_reg_number) {
		this.in_company_reg_number = in_company_reg_number;
	}

	public String[] getIn_corporate_number() {
		return in_corporate_number;
	}

	public void setIn_corporate_number(String[] in_corporate_number) {
		this.in_corporate_number = in_corporate_number;
	}

	public String[] getIn_phone_number() {
		return in_phone_number;
	}

	public void setIn_phone_number(String[] in_phone_number) {
		this.in_phone_number = in_phone_number;
	}

	public String[] getIn_address() {
		return in_address;
	}

	public void setIn_address(String[] in_address) {
		this.in_address = in_address;
	}

	public String[] getIn_invoice_gb() {
		return in_invoice_gb;
	}

	public void setIn_invoice_gb(String[] in_invoice_gb) {
		this.in_invoice_gb = in_invoice_gb;
	}

	public String[] getIn_company_eng() {
		return in_company_eng;
	}

	public void setIn_company_eng(String[] in_company_eng) {
		this.in_company_eng = in_company_eng;
	}

	public String[] getIn_sales_customer() {
		return in_sales_customer;
	}

	public void setIn_sales_customer(String[] in_sales_customer) {
		this.in_sales_customer = in_sales_customer;
	}

	public String[] getIn_site_id() {
		return in_site_id;
	}

	public void setIn_site_id(String[] in_site_id) {
		this.in_site_id = in_site_id;
	}

	public String[] getIn_address_eng() {
		return in_address_eng;
	}

	public void setIn_address_eng(String[] in_address_eng) {
		this.in_address_eng = in_address_eng;
	}

	public String[] getIn_company_reg_check() {
		return in_company_reg_check;
	}

	public void setIn_company_reg_check(String[] in_company_reg_check) {
		this.in_company_reg_check = in_company_reg_check;
	}

	public String getInvoice_gb() {
		return invoice_gb;
	}

	public void setInvoice_gb(String invoice_gb) {
		this.invoice_gb = invoice_gb;
	}

	public String getInvoice_gb_nm() {
		return invoice_gb_nm;
	}

	public void setInvoice_gb_nm(String invoice_gb_nm) {
		this.invoice_gb_nm = invoice_gb_nm;
	}

	public String getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getJob_title() {
		return job_title;
	}

	public void setJob_title(String job_title) {
		this.job_title = job_title;
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

	public String getSub_phone_number() {
		return sub_phone_number;
	}

	public void setSub_phone_number(String sub_phone_number) {
		this.sub_phone_number = sub_phone_number;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String[] getIn_customer_id() {
		return in_customer_id;
	}

	public void setIn_customer_id(String[] in_customer_id) {
		this.in_customer_id = in_customer_id;
	}

	public String[] getIn_customer_name() {
		return in_customer_name;
	}

	public void setIn_customer_name(String[] in_customer_name) {
		this.in_customer_name = in_customer_name;
	}

	public String[] getIn_division() {
		return in_division;
	}

	public void setIn_division(String[] in_division) {
		this.in_division = in_division;
	}

	public String[] getIn_job_title() {
		return in_job_title;
	}

	public void setIn_job_title(String[] in_job_title) {
		this.in_job_title = in_job_title;
	}

	public String[] getIn_email() {
		return in_email;
	}

	public void setIn_email(String[] in_email) {
		this.in_email = in_email;
	}

	public String[] getIn_mobile() {
		return in_mobile;
	}

	public void setIn_mobile(String[] in_mobile) {
		this.in_mobile = in_mobile;
	}

	public String[] getIn_sub_phone_number() {
		return in_sub_phone_number;
	}

	public void setIn_sub_phone_number(String[] in_sub_phone_number) {
		this.in_sub_phone_number = in_sub_phone_number;
	}

	public String[] getIn_fax() {
		return in_fax;
	}

	public void setIn_fax(String[] in_fax) {
		this.in_fax = in_fax;
	}
	
	public int getIn_sub_company_id() {
		return in_sub_company_id;
	}

	public void setIn_sub_company_id(int in_sub_company_id) {
		this.in_sub_company_id = in_sub_company_id;
	}

	public String getSales_customer_user_id() {
		return sales_customer_user_id;
	}

	public void setSales_customer_user_id(String sales_customer_user_id) {
		this.sales_customer_user_id = sales_customer_user_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getRn() {
		return rn;
	}

	public void setRn(String rn) {
		this.rn = rn;
	}

	public String getMax_rn() {
		return max_rn;
	}

	public void setMax_rn(String max_rn) {
		this.max_rn = max_rn;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRowNum() {
		return rowNum;
	}

	public void setRowNum(String rowNum) {
		this.rowNum = rowNum;
	}
	
}
