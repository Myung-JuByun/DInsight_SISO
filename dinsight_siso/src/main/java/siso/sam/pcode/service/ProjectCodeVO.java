package siso.sam.pcode.service;

import java.util.List;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProjectCodeVO.java
 * @Description : ProjectCodeVO Class
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
public class ProjectCodeVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_sales_project_year = "";
	
	/** 월(검색) */
	private String sh_sales_project_month = "";
	
	/** closing 년도(검색) */
	private String sh_closing_year = "";
	
	/** closing 월(검색) */
	private String sh_closing_month = "";
	
	/** 고객사(검색) */
	private String sh_company_name = "";
	
	/** 구분(검색) */
	private String sh_sales_type_cd = "";
	
	/** 영업 Status(검색) */
	private String sh_sales_status_cd = "";
	
	/** 브랜드(검색) */
	private String sh_brand_cd = "";
	
	/** 담당영업(검색) */
	private String sh_user_id = "";
	
	
	private String creator_user_name = "";
	
	/** 하위 부서 정보 */
	private List<String> division_child_list;
	
	/** 공통 코드 사용을 위해 추가 */
	private String code_id = "";
	
	/** 공통 코드 사용을 위해 추가 */
	private String code_name = "";
	
	
	/** 영업 프로젝트 아이디 */
	private int salesProjectKey;
	
	/** 영업 프로젝트 아이디(조회) */
	private String sales_project_id;
	
    /** 마지막 부서 코드(조회) */
	private String last_division_cd;
	
	/** 마지막 부서 명(조회) */
	private String division_name;
	
	/** 사업부 코드(조회) */
	private String operation_cd;
	
	/** 사업부 명(조회) */
	private String operation_cd_name;
	
	/** 사업부 코드 약자 (솔루션사업부 : S, 전략사업부 : T)(조회) */
	private String operation_cd_code;
	
	/** 담당자 아이디(조회) */
	private String user_id;
	
	/** 담당자 명(조회) */
	private String user_name;
	
	/** 년도(조회) */
	private String sales_project_year;
	
	/** 월(조회) */
	private String sales_project_month;
	
	/** 영업 유형 코드(조회) */
	private String sales_type_cd;
	
	/** 영업 유형 코드(조회) */
	private String sales_type_cd_name;
	
	/** 고객사 아이디(조회) */
	private String company_id;
	
	/** 고객사 명(조회) */
	private String company_name;
	
	/** 고객사 주소(조회) */
	private String company_address;
	
	/** 고객 담당자 키값(조회) */
	private String customer_id;
	
	/** 고객 담당자 부서(조회) */
	private String customer_division;
	
	/** 고객 담당자 명(조회) */
	private String customer_name;
	
	/** 고객 담당자 전화번호(조회) */
	private String customer_tel;
	
	/** 고객 담당자 핸드폰번호(조회) */
	private String customer_hp;
	
	/** 고객 담당자 이메일(조회) */
	private String customer_email;
	
	/** 계산서 담당자 키값(조회) */
	private String invoice_id;
	
	/** 계산서 담당자 부서(조회) */
	private String invoice_division;
	
	/** 계산서 담당자 명(조회) */
	private String invoice_name;
	
	/** 계산서 담당자 전화번호(조회) */
	private String invoice_tel;
	
	/** 계산서 담당자 핸드폰번호(조회) */
	private String invoice_hp;
	
	/** 계산서 담당자 이메일(조회) */
	private String invoice_email;
	
	/** 브랜드 코드(조회) */
	private String brand_cd;
	
	/** 브랜드 코드 명(조회) */
	private String brand_cd_name;
	
	/** 브랜드 코드 명 약자(조회) */
	private String brand_cd_name_sub;
	
	/** 모듈(조회) */
	private String module;
	
	/** 영업 상태 코드(조회) */
	private String sales_status_cd;
	
	/** 영업 상태 코드 명(조회) */
	private String sales_status_cd_name;
	
	/** 종료일(조회) */
	private String closing;
	
	/** 수주구분(조회) */
	private String win_gb;
	
	/** 영업 프로젝트 코드(조회) */
	private String sales_project_code;
	
	/** 계약예정금액(조회) */
	private String contract_estimate_price;
	
	/** 원가(조회) */
	private String cost_price;
	
	/** 영업이익(조회) */
	private String profit_price;
	
	/** 삭제여부(조회) */
	private String delete_yn;
	
	
	/** 보고년월(조회) */
	private String sales_ym;
	
	/** 보고주(조회) */
	private String sales_week;
	
	/** 영업구분(신규ORALC) 코드(조회) */
	private String sales_divide_cd;
	
	/** 이슈 여부(조회) */
	private String issue_yn;
	
	/** 보고 사항(조회) */
	private String report_item;
	
	/** 수량(조회) */
	private String qty;
	
	/** 계약 시점 년월(조회) */
	private String contract_ym;
	
	
	/** 영업 프로젝트 아이디(입력) */
	private String[] in_sales_project_id;
	
	
	/** 영업 프로젝트 코드(입력) */
	private String[] in_sales_project_code;
	
	/** 사업부 코드(입력) */
	private String[] in_operation_cd;
	
	/** 사업부 코드 약자 (솔루션사업부 : S, 전략사업부 : T)(입력) */
	private String[] in_operation_cd_code;
	
	/** 담당자 아이디(입력) */
	private String[] in_user_id;
	
	/** 년도(입력) */
	private String[] in_sales_project_year;
	
	/** 월(입력) */
	private String[] in_sales_project_month;
	
	/** 영업 유형 코드(입력) */
	private String[] in_sales_type_cd;
	
	/** 고객사 아이디(입력) */
	private String[] in_company_id;
	
	/** ALC/NEW(입력) */
	private String[] in_sales_divide_cd;
	
	/** 브랜드 코드(입력) */
	private String[] in_brand_cd;
	
	/** 브랜드 코드 명(입력) */
	private String[] in_brand_cd_name;
	
	/** 브랜드 코드 명 약자(입력) */
	private String[] in_brand_cd_name_sub;
	
	/** 모듈(입력) */
	private String[] in_module;
	
	/** 영업 상태 코드(입력) */
	private String[] in_sales_status_cd;
	
	/** 종료일(입력) */
	private String[] in_closing;
	
	/** 계약예정금액(입력) */
	private String[] in_contract_estimate_price;
	
	/** 원가(입력) */
	private String[] in_cost_price;
	
	/** 영업이익(입력) */
	private String[] in_profit_price;
	

	public String getSh_sales_project_year() {
		return sh_sales_project_year;
	}

	public void setSh_sales_project_year(String sh_sales_project_year) {
		this.sh_sales_project_year = sh_sales_project_year;
	}

	public String getSh_sales_project_month() {
		return sh_sales_project_month;
	}

	public void setSh_sales_project_month(String sh_sales_project_month) {
		this.sh_sales_project_month = sh_sales_project_month;
	}

	public String getSh_closing_year() {
		return sh_closing_year;
	}

	public void setSh_closing_year(String sh_closing_year) {
		this.sh_closing_year = sh_closing_year;
	}

	public String getSh_closing_month() {
		return sh_closing_month;
	}

	public void setSh_closing_month(String sh_closing_month) {
		this.sh_closing_month = sh_closing_month;
	}

	public String getSh_company_name() {
		return sh_company_name;
	}

	public void setSh_company_name(String sh_company_name) {
		this.sh_company_name = sh_company_name;
	}

	public String getSh_sales_type_cd() {
		return sh_sales_type_cd;
	}

	public void setSh_sales_type_cd(String sh_sales_type_cd) {
		this.sh_sales_type_cd = sh_sales_type_cd;
	}

	public String getSh_sales_status_cd() {
		return sh_sales_status_cd;
	}

	public void setSh_sales_status_cd(String sh_sales_status_cd) {
		this.sh_sales_status_cd = sh_sales_status_cd;
	}

	public String getSh_brand_cd() {
		return sh_brand_cd;
	}

	public void setSh_brand_cd(String sh_brand_cd) {
		this.sh_brand_cd = sh_brand_cd;
	}

	public String getSh_user_id() {
		return sh_user_id;
	}

	public void setSh_user_id(String sh_user_id) {
		this.sh_user_id = sh_user_id;
	}

	public String getCreator_user_name() {
		return creator_user_name;
	}

	public void setCreator_user_name(String creator_user_name) {
		this.creator_user_name = creator_user_name;
	}

	public List<String> getDivision_child_list() {
		return division_child_list;
	}

	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
	}

	public String getCode_id() {
		return code_id;
	}

	public void setCode_id(String code_id) {
		this.code_id = code_id;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public int getSalesProjectKey() {
		return salesProjectKey;
	}

	public void setSalesProjectKey(int salesProjectKey) {
		this.salesProjectKey = salesProjectKey;
	}

	public String getSales_project_id() {
		return sales_project_id;
	}

	public void setSales_project_id(String sales_project_id) {
		this.sales_project_id = sales_project_id;
	}

	public String getLast_division_cd() {
		return last_division_cd;
	}

	public void setLast_division_cd(String last_division_cd) {
		this.last_division_cd = last_division_cd;
	}

	public String getDivision_name() {
		return division_name;
	}

	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}

	public String getOperation_cd() {
		return operation_cd;
	}

	public void setOperation_cd(String operation_cd) {
		this.operation_cd = operation_cd;
	}

	public String getOperation_cd_name() {
		return operation_cd_name;
	}

	public void setOperation_cd_name(String operation_cd_name) {
		this.operation_cd_name = operation_cd_name;
	}

	public String getOperation_cd_code() {
		return operation_cd_code;
	}

	public void setOperation_cd_code(String operation_cd_code) {
		this.operation_cd_code = operation_cd_code;
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

	public String getSales_project_year() {
		return sales_project_year;
	}

	public void setSales_project_year(String sales_project_year) {
		this.sales_project_year = sales_project_year;
	}

	public String getSales_project_month() {
		return sales_project_month;
	}

	public void setSales_project_month(String sales_project_month) {
		this.sales_project_month = sales_project_month;
	}

	public String getSales_type_cd() {
		return sales_type_cd;
	}

	public void setSales_type_cd(String sales_type_cd) {
		this.sales_type_cd = sales_type_cd;
	}

	public String getSales_type_cd_name() {
		return sales_type_cd_name;
	}

	public void setSales_type_cd_name(String sales_type_cd_name) {
		this.sales_type_cd_name = sales_type_cd_name;
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

	public String getCompany_address() {
		return company_address;
	}

	public void setCompany_address(String company_address) {
		this.company_address = company_address;
	}

	public String getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}

	public String getCustomer_division() {
		return customer_division;
	}

	public void setCustomer_division(String customer_division) {
		this.customer_division = customer_division;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getCustomer_tel() {
		return customer_tel;
	}

	public void setCustomer_tel(String customer_tel) {
		this.customer_tel = customer_tel;
	}

	public String getCustomer_hp() {
		return customer_hp;
	}

	public void setCustomer_hp(String customer_hp) {
		this.customer_hp = customer_hp;
	}

	public String getCustomer_email() {
		return customer_email;
	}

	public void setCustomer_email(String customer_email) {
		this.customer_email = customer_email;
	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

	public String getInvoice_division() {
		return invoice_division;
	}

	public void setInvoice_division(String invoice_division) {
		this.invoice_division = invoice_division;
	}

	public String getInvoice_name() {
		return invoice_name;
	}

	public void setInvoice_name(String invoice_name) {
		this.invoice_name = invoice_name;
	}

	public String getInvoice_tel() {
		return invoice_tel;
	}

	public void setInvoice_tel(String invoice_tel) {
		this.invoice_tel = invoice_tel;
	}

	public String getInvoice_hp() {
		return invoice_hp;
	}

	public void setInvoice_hp(String invoice_hp) {
		this.invoice_hp = invoice_hp;
	}

	public String getInvoice_email() {
		return invoice_email;
	}

	public void setInvoice_email(String invoice_email) {
		this.invoice_email = invoice_email;
	}

	public String getBrand_cd() {
		return brand_cd;
	}

	public void setBrand_cd(String brand_cd) {
		this.brand_cd = brand_cd;
	}

	public String getBrand_cd_name() {
		return brand_cd_name;
	}

	public void setBrand_cd_name(String brand_cd_name) {
		this.brand_cd_name = brand_cd_name;
	}

	public String getBrand_cd_name_sub() {
		return brand_cd_name_sub;
	}

	public void setBrand_cd_name_sub(String brand_cd_name_sub) {
		this.brand_cd_name_sub = brand_cd_name_sub;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getSales_status_cd() {
		return sales_status_cd;
	}

	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}

	public String getSales_status_cd_name() {
		return sales_status_cd_name;
	}

	public void setSales_status_cd_name(String sales_status_cd_name) {
		this.sales_status_cd_name = sales_status_cd_name;
	}

	public String getClosing() {
		return closing;
	}

	public void setClosing(String closing) {
		this.closing = closing;
	}

	public String getWin_gb() {
		return win_gb;
	}

	public void setWin_gb(String win_gb) {
		this.win_gb = win_gb;
	}

	public String getSales_project_code() {
		return sales_project_code;
	}

	public void setSales_project_code(String sales_project_code) {
		this.sales_project_code = sales_project_code;
	}

	public String getContract_estimate_price() {
		return contract_estimate_price;
	}

	public void setContract_estimate_price(String contract_estimate_price) {
		this.contract_estimate_price = contract_estimate_price;
	}

	public String getCost_price() {
		return cost_price;
	}

	public void setCost_price(String cost_price) {
		this.cost_price = cost_price;
	}

	public String getProfit_price() {
		return profit_price;
	}

	public void setProfit_price(String profit_price) {
		this.profit_price = profit_price;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getSales_ym() {
		return sales_ym;
	}

	public void setSales_ym(String sales_ym) {
		this.sales_ym = sales_ym;
	}

	public String getSales_week() {
		return sales_week;
	}

	public void setSales_week(String sales_week) {
		this.sales_week = sales_week;
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

	public String getReport_item() {
		return report_item;
	}

	public void setReport_item(String report_item) {
		this.report_item = report_item;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getContract_ym() {
		return contract_ym;
	}

	public void setContract_ym(String contract_ym) {
		this.contract_ym = contract_ym;
	}

	public String[] getIn_sales_project_id() {
		return in_sales_project_id;
	}

	public void setIn_sales_project_id(String[] in_sales_project_id) {
		this.in_sales_project_id = in_sales_project_id;
	}

	public String[] getIn_sales_project_code() {
		return in_sales_project_code;
	}

	public void setIn_sales_project_code(String[] in_sales_project_code) {
		this.in_sales_project_code = in_sales_project_code;
	}

	public String[] getIn_operation_cd() {
		return in_operation_cd;
	}

	public void setIn_operation_cd(String[] in_operation_cd) {
		this.in_operation_cd = in_operation_cd;
	}

	public String[] getIn_operation_cd_code() {
		return in_operation_cd_code;
	}

	public void setIn_operation_cd_code(String[] in_operation_cd_code) {
		this.in_operation_cd_code = in_operation_cd_code;
	}

	public String[] getIn_user_id() {
		return in_user_id;
	}

	public void setIn_user_id(String[] in_user_id) {
		this.in_user_id = in_user_id;
	}

	public String[] getIn_sales_project_year() {
		return in_sales_project_year;
	}

	public void setIn_sales_project_year(String[] in_sales_project_year) {
		this.in_sales_project_year = in_sales_project_year;
	}

	public String[] getIn_sales_project_month() {
		return in_sales_project_month;
	}

	public void setIn_sales_project_month(String[] in_sales_project_month) {
		this.in_sales_project_month = in_sales_project_month;
	}

	public String[] getIn_sales_type_cd() {
		return in_sales_type_cd;
	}

	public void setIn_sales_type_cd(String[] in_sales_type_cd) {
		this.in_sales_type_cd = in_sales_type_cd;
	}

	public String[] getIn_company_id() {
		return in_company_id;
	}

	public void setIn_company_id(String[] in_company_id) {
		this.in_company_id = in_company_id;
	}

	public String[] getIn_sales_divide_cd() {
		return in_sales_divide_cd;
	}

	public void setIn_sales_divide_cd(String[] in_sales_divide_cd) {
		this.in_sales_divide_cd = in_sales_divide_cd;
	}

	public String[] getIn_brand_cd() {
		return in_brand_cd;
	}

	public void setIn_brand_cd(String[] in_brand_cd) {
		this.in_brand_cd = in_brand_cd;
	}

	public String[] getIn_brand_cd_name() {
		return in_brand_cd_name;
	}

	public void setIn_brand_cd_name(String[] in_brand_cd_name) {
		this.in_brand_cd_name = in_brand_cd_name;
	}

	public String[] getIn_brand_cd_name_sub() {
		return in_brand_cd_name_sub;
	}

	public void setIn_brand_cd_name_sub(String[] in_brand_cd_name_sub) {
		this.in_brand_cd_name_sub = in_brand_cd_name_sub;
	}

	public String[] getIn_module() {
		return in_module;
	}

	public void setIn_module(String[] in_module) {
		this.in_module = in_module;
	}

	public String[] getIn_sales_status_cd() {
		return in_sales_status_cd;
	}

	public void setIn_sales_status_cd(String[] in_sales_status_cd) {
		this.in_sales_status_cd = in_sales_status_cd;
	}

	public String[] getIn_closing() {
		return in_closing;
	}

	public void setIn_closing(String[] in_closing) {
		this.in_closing = in_closing;
	}

	public String[] getIn_contract_estimate_price() {
		return in_contract_estimate_price;
	}

	public void setIn_contract_estimate_price(String[] in_contract_estimate_price) {
		this.in_contract_estimate_price = in_contract_estimate_price;
	}

	public String[] getIn_cost_price() {
		return in_cost_price;
	}

	public void setIn_cost_price(String[] in_cost_price) {
		this.in_cost_price = in_cost_price;
	}

	public String[] getIn_profit_price() {
		return in_profit_price;
	}

	public void setIn_profit_price(String[] in_profit_price) {
		this.in_profit_price = in_profit_price;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}