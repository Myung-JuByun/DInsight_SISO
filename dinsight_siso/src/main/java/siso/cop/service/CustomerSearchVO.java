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

import java.util.List;

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
public class CustomerSearchVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** page*/
	private String rn;
	
	private String max_rn;
	
	private String page;
		
	private String rowNum;
	
	/** 고객사(조회)*/
    private String searchString;

    /** 업종(조회) */
    private String business_category = "";
    
    /** 업태(조회) */
    private String business_condition = "";
    
	private String charger_yn = "";
    private String company_yn = "";
        
    /** 고객사 코드(삭제) */
	private int[] company_id;
	
	private int pop_company_id;
	
	private String etc;
		
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

	public String getEtc() {
		return etc;
	}

	public void setEtc(String etc) {
		this.etc = etc;
	}

	/** 하위 부서 정보 */
	private List<String> division_child_list;
	
	public List<String> getDivision_child_list() {
		return division_child_list;
	}

	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
	}	

	public String getCompany_yn() {
		return company_yn;
	}

	public void setCompany_yn(String company_yn) {
		this.company_yn = company_yn;
	}
		
	public void setCompany_id(int[] company_id) {
		this.company_id = company_id;
	}

	String[] customer_name ;
	public String[] getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String[] customer_name) {
		this.customer_name = customer_name;
	}

	public String[] getDivision() {
		return division;
	}

	public void setDivision(String[] division) {
		this.division = division;
	}

	public String[] getJob_title() {
		return job_title;
	}

	public void setJob_title(String[] job_title) {
		this.job_title = job_title;
	}

	public String[] getEmail() {
		return email;
	}

	public void setEmail(String[] email) {
		this.email = email;
	}

	public String[] getMobile() {
		return mobile;
	}

	public void setMobile(String[] mobile) {
		this.mobile = mobile;
	}

	public String[] getSub_phone_number() {
		return sub_phone_number;
	}

	public void setSub_phone_number(String[] sub_phone_number) {
		this.sub_phone_number = sub_phone_number;
	}

	public String[] getFax() {
		return fax;
	}

	public void setFax(String[] fax) {
		this.fax = fax;
	}

	public String[] getInvoice_gb() {
		return invoice_gb;
	}

	public void setInvoice_gb(String[] invoice_gb) {
		this.invoice_gb = invoice_gb;
	}
	
	String[] division ;
	String[] job_title ;
	String[] email ;
	String[] mobile ;
	String[] sub_phone_number ;
	String[] fax ;
	String[] invoice_gb;
	int[] in_sub_company_id;
	
	public int[] getIn_sub_company_id() {
		return in_sub_company_id;
	}

	public void setIn_sub_company_id(int[] in_sub_company_id) {
		this.in_sub_company_id = in_sub_company_id;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getChairman() {
		return chairman;
	}

	public void setChairman(String chairman) {
		this.chairman = chairman;
	}

	public String getCompany_reg_number() {
		return company_reg_number;
	}

	public void setCompany_reg_number(String company_reg_number) {
		this.company_reg_number = company_reg_number;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	private String company_sales_customer_id ="";
	private String delete_yn ="";
	private String creation_date ="";
	private int sales_company_id;
	
	
	public int getSales_company_id() {
		return sales_company_id;
	}

	public void setSales_company_id(int sales_company_id) {
		this.sales_company_id = sales_company_id;
	}

	public String getCompany_sales_customer_id() {
		return company_sales_customer_id;
	}

	public void setCompany_sales_customer_id(String company_sales_customer_id) {
		this.company_sales_customer_id = company_sales_customer_id;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}

	String company_name ="";
	String chairman ="";
	String company_reg_number ="";
	String phone_number ="";
	String main_fax ="";
	String address ="";
	String company_eng ="";
	String sales_customer ="";
	String site_id ="";
	String company_reg_check ="";
	String address_eng ="";
	String corporate_number ="";
	String corporate_number_check ="";

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

	public String getMain_fax() {
		return main_fax;
	}

	public void setMain_fax(String main_fax) {
		this.main_fax = main_fax;
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

	public String getCompany_reg_check() {
		return company_reg_check;
	}

	public void setCompany_reg_check(String company_reg_check) {
		this.company_reg_check = company_reg_check;
	}

	public String getAddress_eng() {
		return address_eng;
	}

	public void setAddress_eng(String address_eng) {
		this.address_eng = address_eng;
	}

	private String sh_company_id;
	
	public String getSh_company_id() {
		return sh_company_id;
	}
	
	public void setSh_company_id(String sh_company_id) {
		this.sh_company_id = sh_company_id;
	}

	/** 담당자 코드(삭제) */
	private String[] customer_id;
	
   
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}


	public String getSearchString() {
		return searchString;
	}


	public void setSearchString(String searchString) {
		this.searchString = searchString;
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
	
	public String getCharger_yn() {
		return charger_yn;
	}

	public int[] getCompany_id() {
		return company_id;
	}

	public int getPop_company_id() {
		return pop_company_id;
	}

	public void setCharger_yn(String charger_yn) {
		this.charger_yn = charger_yn;
	}

	public void setPop_company_id(int pop_company_id) {
		this.pop_company_id = pop_company_id;
	}

	public String[] getCustomer_id() {
		return customer_id;
	}


	public void setCustomer_id(String[] customer_id) {
		this.customer_id = customer_id;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
	
}
