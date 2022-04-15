package siso.sam.fcastingstatus.service;

import java.util.List;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ForeCastingStatusVO.java
 * @Description : ForeCastingStatusVO Class
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
public class ForeCastingStatusVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_sales_year = "";
	
	/** 월(검색) */
	private String sh_sales_month = "";
	
	/** 주(검색) */
	private String sh_sales_week = "";
	
	
	/** 사업부(검색) */
	private String[] sh_division_cd;
	
	/** 계약시점(검색) */
	private String[] sh_contract_ym;
	
	/** 영업 Status(검색) */
	private String[] sh_sales_status_cd;
	
	/** 담당영업(검색) */
	private String[] sh_user_id;
	
	/** 구분(검색) */
	private String[] sh_sales_type_cd;
	
	/** 이슈여부(검색) */
	private String[] sh_issue_yn;
	
	
	/** 사업부(배열담기) */
	private String in_division_cd;
	
	/** 계약시점(배열담기) */
	private String in_contract_ym;
	
	/** 영업 Status(배열담기) */
	private String in_sales_status_cd;
	
	/** 담당영업(배열담기) */
	private String in_user_id;
	
	/** 구분(배열담기) */
	private String in_sales_type_cd;
	
	/** 이슈여부(배열담기) */
	private String in_issue_yn;
	
	
	/** 사업부(배열 쿼리) */
	private List<String> division_cd_list;
	
	/** 계약시점(배열 쿼리) */
	private List<String> contract_ym_list;
	
	/** 영업 Status(배열 쿼리) */
	private List<String> sales_status_cd_list;
	
	/** 담당영업(배열 쿼리) */
	private List<String> user_id_list;
	
	/** 구분(배열 쿼리) */
	private List<String> sales_type_cd_list;
	
	/** 이슈여부(배열 쿼리) */
	private List<String> issue_yn_list;
	
	
	/** 하위 부서 정보 */
	private List<String> division_child_list;
	
	
	
	/** 사업부명(조회) */
	private String division_name;
	
	/** 사업부코드(조회) */
	private String operation_cd;
	
	/** 담당영업자명(조회) */
	private String user_name;
	
	
	/** 영업성과 아이디(조회) */
	private String sales_id;
	
    /** 영업 프로젝트 아이디(조회) */
	private String sales_project_id;
	
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
	private String contract_name;
	
	/** 영업 상태 코드(조회) */
	private String sales_status_cd;
	
	/** 계약금액(조회) */
	private String contract_price;	
	
	/** 원가(조회) */
	private String cost_price;
	
	/** 영업이익(조회) */
	private String profit_price;
	
	/** 정렬번호(조회) */
	private String order_seq;
	
	/** 정렬번호(조회) */
	private String order_seq_sub;
	
	
	/** 담당영업 키값(조회) */
	private String user_id;
	
	/** 영업 Status 명(조회) */
	private String sales_status_cd_name;
	
	/** 타입 명(조회) */
	private String sales_type_cd_name;
	
	/** 고객사 명(조회) */
	private String company_name;
	
	/** Brand 명(조회) */
	private String brand_cd_name;
	
	/** 모듈 명(조회) */
	private String module;

	public String getSh_sales_year() {
		return sh_sales_year;
	}

	public void setSh_sales_year(String sh_sales_year) {
		this.sh_sales_year = sh_sales_year;
	}

	public String getSh_sales_month() {
		return sh_sales_month;
	}

	public void setSh_sales_month(String sh_sales_month) {
		this.sh_sales_month = sh_sales_month;
	}

	public String getSh_sales_week() {
		return sh_sales_week;
	}

	public void setSh_sales_week(String sh_sales_week) {
		this.sh_sales_week = sh_sales_week;
	}

	public String[] getSh_division_cd() {
		return sh_division_cd;
	}

	public void setSh_division_cd(String[] sh_division_cd) {
		this.sh_division_cd = sh_division_cd;
	}

	public String[] getSh_contract_ym() {
		return sh_contract_ym;
	}

	public void setSh_contract_ym(String[] sh_contract_ym) {
		this.sh_contract_ym = sh_contract_ym;
	}

	public String[] getSh_sales_status_cd() {
		return sh_sales_status_cd;
	}

	public void setSh_sales_status_cd(String[] sh_sales_status_cd) {
		this.sh_sales_status_cd = sh_sales_status_cd;
	}

	public String[] getSh_user_id() {
		return sh_user_id;
	}

	public void setSh_user_id(String[] sh_user_id) {
		this.sh_user_id = sh_user_id;
	}

	public String[] getSh_sales_type_cd() {
		return sh_sales_type_cd;
	}

	public void setSh_sales_type_cd(String[] sh_sales_type_cd) {
		this.sh_sales_type_cd = sh_sales_type_cd;
	}

	public String[] getSh_issue_yn() {
		return sh_issue_yn;
	}

	public void setSh_issue_yn(String[] sh_issue_yn) {
		this.sh_issue_yn = sh_issue_yn;
	}

	public String getIn_division_cd() {
		return in_division_cd;
	}

	public void setIn_division_cd(String in_division_cd) {
		this.in_division_cd = in_division_cd;
	}

	public String getIn_contract_ym() {
		return in_contract_ym;
	}

	public void setIn_contract_ym(String in_contract_ym) {
		this.in_contract_ym = in_contract_ym;
	}

	public String getIn_sales_status_cd() {
		return in_sales_status_cd;
	}

	public void setIn_sales_status_cd(String in_sales_status_cd) {
		this.in_sales_status_cd = in_sales_status_cd;
	}

	public String getIn_user_id() {
		return in_user_id;
	}

	public void setIn_user_id(String in_user_id) {
		this.in_user_id = in_user_id;
	}

	public String getIn_sales_type_cd() {
		return in_sales_type_cd;
	}

	public void setIn_sales_type_cd(String in_sales_type_cd) {
		this.in_sales_type_cd = in_sales_type_cd;
	}

	public String getIn_issue_yn() {
		return in_issue_yn;
	}

	public void setIn_issue_yn(String in_issue_yn) {
		this.in_issue_yn = in_issue_yn;
	}

	public List<String> getDivision_cd_list() {
		return division_cd_list;
	}

	public void setDivision_cd_list(List<String> division_cd_list) {
		this.division_cd_list = division_cd_list;
	}

	public List<String> getContract_ym_list() {
		return contract_ym_list;
	}

	public void setContract_ym_list(List<String> contract_ym_list) {
		this.contract_ym_list = contract_ym_list;
	}

	public List<String> getSales_status_cd_list() {
		return sales_status_cd_list;
	}

	public void setSales_status_cd_list(List<String> sales_status_cd_list) {
		this.sales_status_cd_list = sales_status_cd_list;
	}

	public List<String> getUser_id_list() {
		return user_id_list;
	}

	public void setUser_id_list(List<String> user_id_list) {
		this.user_id_list = user_id_list;
	}

	public List<String> getSales_type_cd_list() {
		return sales_type_cd_list;
	}

	public void setSales_type_cd_list(List<String> sales_type_cd_list) {
		this.sales_type_cd_list = sales_type_cd_list;
	}

	public List<String> getIssue_yn_list() {
		return issue_yn_list;
	}

	public void setIssue_yn_list(List<String> issue_yn_list) {
		this.issue_yn_list = issue_yn_list;
	}

	public List<String> getDivision_child_list() {
		return division_child_list;
	}

	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
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

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getSales_id() {
		return sales_id;
	}

	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}

	public String getSales_project_id() {
		return sales_project_id;
	}

	public void setSales_project_id(String sales_project_id) {
		this.sales_project_id = sales_project_id;
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

	public String getContract_name() {
		return contract_name;
	}

	public void setContract_name(String contract_name) {
		this.contract_name = contract_name;
	}

	public String getSales_status_cd() {
		return sales_status_cd;
	}

	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}

	public String getContract_price() {
		return contract_price;
	}

	public void setContract_price(String contract_price) {
		this.contract_price = contract_price;
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

	public String getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}

	public String getOrder_seq_sub() {
		return order_seq_sub;
	}

	public void setOrder_seq_sub(String order_seq_sub) {
		this.order_seq_sub = order_seq_sub;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getSales_status_cd_name() {
		return sales_status_cd_name;
	}

	public void setSales_status_cd_name(String sales_status_cd_name) {
		this.sales_status_cd_name = sales_status_cd_name;
	}

	public String getSales_type_cd_name() {
		return sales_type_cd_name;
	}

	public void setSales_type_cd_name(String sales_type_cd_name) {
		this.sales_type_cd_name = sales_type_cd_name;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getBrand_cd_name() {
		return brand_cd_name;
	}

	public void setBrand_cd_name(String brand_cd_name) {
		this.brand_cd_name = brand_cd_name;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}