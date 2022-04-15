package siso.sas.product.service;

import java.util.List;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProductSalesVO.java
 * @Description : ProductSalesVO Class
 * @Modification Information @ @ 수정일 수정자 수정내용 @ --------- ---------
 *               ------------------------------- @ 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class ProductSalesVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 년도(검색) */
	private String sh_product_sales_year = "";

	/** 월(검색) */
	private String sh_product_sales_month = "";

	/** 고객사(검색) */
	private String sh_company_name = "";

	/** 구분(검색) */
	private String sh_project_code = "";

	/** 브랜드(검색) */
	private String sh_brand_cd = "";

	/** 하위 부서 정보 */
	private List<String> division_child_list;

	/** 최초등록일자(조회) */
	private String insert_date;

	/** check_date_yn(조회) */
	private String check_date_yn;
	
	/** 매출품의 id(조회) */
	private int sales_confer_id;

	/** 매출품의 id(조회) */
	private int old_sales_confer_id;
	
	/** 계약번호(프로젝트 코드) key값(조회) */
	private String contract_number_id;

	/** 계약번호(프로젝트 코드)(조회) */
	private String contract_number;

	/** 고객사 아이디(조회) */
	private int company_id;

	/** 고객사 명(조회) */
	private String company_name;

	/** 고객사 주소 */
	private String address;

	/** 총계약금(조회) */
	private String total_contract_price;

	/** 영업이익(조회) */
	private String profit_price;

	/** 품의서 담당자 ID(조회) */
	private String staff_id;

	/** 품의서 담당자 명(조회) */
	private String staff_name;

	/** 고객 담당자 ID(조회) */
	private String customer_id;

	/** 고객 담당자 명(조회) */
	private String customer_name;

	/** 고객 담당자 부서(조회) */
	private String customer_division;

	/** 고객 담당자 TEL(조회) */
	private String customer_tel;

	/** 고객 담당자 HP(조회) */
	private String customer_hp;

	/** 고객 담당자 이메일(조회) */
	private String customer_email;

	/** 세금계산서 담당자 ID(조회) */
	private String invoice_id;

	/** 세금계산서 담당자 명(조회) */
	private String invoice_id_name;

	/** 세금계산서 담당자 부서(조회) */
	private String invoice_division;

	/** 세금계산서 담당자 TEL(조회) */
	private String invoice_tel;

	/** 세금계산서 담당자 HP(조회) */
	private String invoice_hp;

	/** 세금계산서 담당자 이메일(조회) */
	private String invoice_email;

	/** 차수(조회) */
	private String degree;

	/** 구분코드(조회) */
	private String sales_confer_kind;
	
	/** 구분코드명(조회) */
	private String sales_confer_kind_name;
	
	/** 상태코드(조회) */
	private String status_cd;
	
	/** 상태명(조회) */
	private String status_nm;
	
	/** 결재상신시 사용(조회) */
	private int sales_confer_monthly_id;
	
	/** 결재상신시 사용(조회) */
	private String sales_confer_monthly_yn;
	
	/** 삭제여부(조회) */
	private String delete_yn;

	/** 매출내역_id(조회) */
	private String sales_record_id;
	
	/** DS */
	/** 매출내역_id(입력) */
	private int sales_record_ds_id;
	
	/** price_list_date(조회) */
	private String price_list_date;
	
	/** portfolio(조회) */
	private String portfolio;
	
	/** portfolio_item_name(조회) */
	private String portfolio_item_name;
	
	/** prd_number(조회) */
	private String prd_number;
	
	/** prd_type(조회) */
	private String prd_type;
	
	/** trigram(조회) */
	private String trigram;
	
	/** revision(조회) */
	private String prd_revision;
	
	/** 수량(조회) */
	private String ds_qty;

	/** Price(조회) */
	private String ds_list_price;
	
	/** plc(조회) */
	private String plc;
	
	/** alc(조회) */
	private String alc;
	
	/** qlc(조회) */
	private String qlc;
	
	/** ylc(조회) */
	private String ylc;
	
	/** etc(조회) */
	private String etc;
	
	/** code_name(조회) */
	private String code_name;
	
	/** each_yn(조회) */
	private String each_yn;
	
	/** sales_alc_dc(조회) */
	private String sales_alc_dc;
	
	/** sales_plc_dc(조회) */
	private String sales_plc_dc;
	
	/** sales_plc_dc_gb(조회) */
	private String sales_plc_dc_gb;
	
	/** sales_alc_dc_gb(조회) */
	private String sales_alc_dc_gb;
	
	/** sales_plc_dc_price(조회) */
	private String sales_plc_dc_price;
	
	/** sales_alc_dc_price(조회) */
	private String sales_alc_dc_price;
	
	/** ds_sales_price(조회) */
	private String ds_sales_price;
	
	/** last_sales_price(조회) */
	private String last_sales_price;
	
	/** purchase_plc_dc(조회) */
	private String purchase_plc_dc;
	
	/** purchase_alc_dc(조회) */
	private String purchase_alc_dc;
	
	/** purchase_plc_dc_gb(조회) */
	private String purchase_plc_dc_gb;
	
	/** purchase_alc_dc_gb(조회) */
	private String purchase_alc_dc_gb;
	
	/** purchase_plc_dc_price(조회) */
	private String purchase_plc_dc_price;
	
	/** purchase_alc_dc_price(조회) */
	private String purchase_alc_dc_price;
	
	/** 매입단가(조회) */
	private String ds_purchase_unit_price;

	/** 매입가(조회) */
	private String ds_purchase_price;
	
	/** 매입가(조회) */
	private String last_purchase_price;
	
	/** ds_po_day(조회) */
	private String ds_po_day;
	
	/** install_day(조회) */
	private String install_day;
	
	/** ordering_day(조회) */
	private String ordering_day;
	
	/** license_start_date(조회) */
	private String license_start_date;
	
	/** license_end_date(조회) */
	private String license_end_date;
	
	/** target_id(조회) */
	private String target_id;
	
	/** place_of_business(조회) */
	private String place_of_business;
	
	/** chang_yn(조회) */
	private String chang_yn;

	
	/** ALC */
	/** 매출내역_id(입력) */
	private int chg_sales_record_ds_id;
	
	/** price_list_date(조회) */
	private String chg_price_list_date;
	
	/** portfolio(조회) */
	private String chg_portfolio;
	
	/** portfolio(조회) */
	private String chg_portfolio_item_name;
	
	/** prd_number(조회) */
	private String chg_prd_number;
	
	/** prd_type(조회) */
	private String chg_prd_type;
	
	/** trigram(조회) */
	private String chg_trigram;
	
	/** prd_revision(조회) */
	private String chg_prd_revision;
	
	/** 수량(조회) */
	private String chg_qty;

	/** Price(조회) */
	private String chg_ds_list_price;
	
	/** plc(조회) */
	private String chg_plc;
	
	/** alc(조회) */
	private String chg_alc;
	
	/** qlc(조회) */
	private String chg_qlc;
	
	/** ylc(조회) */
	private String chg_ylc;
	
	/** etc(조회) */
	private String chg_etc;
	
	/** code_name(조회) */
	private String chg_code_name;
	
	/** each_yn(조회) */
	private String chg_each_yn;
	
	/** sales_alc_dc(조회) */
	private String chg_sales_alc_dc;
	
	/** sales_plc_dc(조회) */
	private String chg_sales_plc_dc;
	
	/** sales_plc_dc_gb(조회) */
	private String chg_sales_plc_dc_gb;
	
	/** sales_alc_dc_gb(조회) */
	private String chg_sales_alc_dc_gb;
	
	/** sales_plc_dc_price(조회) */
	private String chg_sales_plc_dc_price;
	
	/** sales_alc_dc_price(조회) */
	private String chg_sales_alc_dc_price;
	
	/** ds_sales_price(조회) */
	private String chg_ds_sales_price;
	
	/** purchase_plc_dc(조회) */
	private String chg_purchase_plc_dc;
	
	/** purchase_alc_dc(조회) */
	private String chg_purchase_alc_dc;
	
	/** purchase_plc_dc_gb(조회) */
	private String chg_purchase_plc_dc_gb;
	
	/** purchase_alc_dc_gb(조회) */
	private String chg_purchase_alc_dc_gb;
	
	/** purchase_plc_dc_price(조회) */
	private String chg_purchase_plc_dc_price;
	
	/** purchase_alc_dc_price(조회) */
	private String chg_purchase_alc_dc_price;
	
	/** 매입단가(조회) */
	private String chg_ds_purchase_unit_price;

	/** 매입가(조회) */
	private String chg_ds_purchase_price;
	
	/** ds_po_day(조회) */
	private String chg_ds_po_day;
	
	/** install_day(조회) */
	private String chg_install_day;
	
	/** ordering_day(조회) */
	private String chg_ordering_day;
	
	/** license_start_date(조회) */
	private String chg_license_start_date;
	
	/** license_end_date(조회) */
	private String chg_license_end_date;
	
	/** target_id(조회) */
	private String chg_target_id;
	
	/** place_of_business(조회) */
	private String chg_place_of_business;
	
	/** chang_yn(조회) */
	private String chg_chang_yn;
	
	/** alc_year(조회) */
	private String alc_year;
	
	/** stock_yn(조회) */
	private String stock_yn;
	
	
	/** ETC */
	/** 영업 구분(조회) */
	private String sales_gb;

	/** 영업 구분 명(조회) */
	private String sales_gb_name;

	/** 모델명(조회) */
	private String model;

	/** 기간 시작일(조회) */
	private String des_start_day;

	/** 기간 종료일(조회) */
	private String des_end_day;

	/** 수량(조회) */
	private String qty;

	/** Price(조회) */
	private String list_price;

	/** 매출단가(조회) */
	private String sales_unit_price;

	/** 매출액(조회) */
	private String sales_price;

	/** 매출D/C(조회) */
	private String sales_dc;

	/** 매입단가(조회) */
	private String purchase_unit_price;

	/** 매입가(조회) */
	private String purchase_price;

	/** 매입D/C(조회) */
	private String purchase_dc;

	/** 구매처(조회) */
	private String supplier;

	/** 결제조건코드(조회) */
	private String purchase_pay_code;

	/** 결제조건코드 명(조회) */
	private String purchase_pay_name;

	/** 결제조건내용(조회) */
	private String purchase_pay_method;

	/** 세금계산서 명(조회) */
	private String sale_invoice_id;
	
	/** 세금계산서 명(조회) */
	private String buy_invoice_id;
	
	/** 세금계산서 명(조회) */
	private String invoice_name;

	/** 매출/매입(1:매출 2:매입)(조회) */
	private String checked;

	/** 분할(조회) */
	private String split;

	/** 계산서일자(조회) */
	private String issued;

	/** 수기/전자(01:수기 02:전자)(조회) */
	private String method;

	/** 수기/전자(01:수기 02:전자) 명(조회) */
	private String method_name;

	/** 매출액(조회) */
	private String price;

	/** 매출결제조건내용(조회) */
	private String payment_requisite_content;

	/** 매출품의 제출 - year */
	private String sales_confer_year;

	/** 매출품의 제출 - month */
	private String sales_confer_month;
	
	
	/** DS */
	/** 매출내역_id(입력) */
	private int[] in_sales_record_ds_id;
	
	/** 매출내역_id(입력) */
	private String[] in_price_list_date;
	
	/** 매출내역_id(입력) */
	private String[] in_portfolio;
	
	/** portfolio_item_name(입력) */
	private String[] in_portfolio_item_name;
	
	/** 매출내역_id(입력) */
	private String[] in_prd_number;
	
	/** in_prd_revision(입력) */
	private String[] in_prd_revision;	
	
	/** 매출내역_id(입력) */
	private String[] in_prd_type;
	
	/** 매출내역_id(입력) */
	private String[] in_trigram;
	
	/** 매출내역_id(입력) */
	private String[] in_plc;
	
	/** 매출내역_id(입력) */
	private String[] in_alc;
	
	/** qlc(입력) */
	private String[] in_qlc;
	
	/** ylc(입력) */
	private String[] in_ylc;
	
	/** etc(입력) */
	private String[] in_etc;
	
	/** list_price(입력) */
	private String[] in_ds_list_price;
	
	/** qty(입력) */
	private String[] in_ds_qty;
	
	/** each_yn(입력) */
	private String[] in_each_yn;
	
	/** in_sales_alc_dc(입력) */
	private String[] in_sales_alc_dc;
	
	/** sales_plc_dc(입력) */
	private String[] in_sales_plc_dc;	

	/** sales_dc_gb(입력) */
	private String[] in_sales_alc_dc_gb;

	/** sales_dc_gb(입력) */
	private String[] in_sales_plc_dc_gb;
	
	/** sales_plc_dc_price(입력) */
	private String[] in_sales_plc_dc_price;
	
	/** sales_alc_dc_price(입력) */
	private String[] in_sales_alc_dc_price;
	
	/** sales_price(입력) */
	private String[] in_ds_sales_price;
	
	/** last_sales_price(입력) */
	private String[] in_last_sales_price;
	
	/** purchase_plc_dc(입력) */
	private String[] in_purchase_plc_dc;
	
	/** purchase_alc_dc(입력) */
	private String[] in_purchase_alc_dc;
	
	/** purchase_dc_gb(입력) */
	private String[] in_purchase_alc_gb;

	/** purchase_plc_dc_gb(입력) */
	private String[] in_purchase_plc_dc_gb;
	
	/** purchase_alc_dc_gb(입력) */
	private String[] in_purchase_alc_dc_gb;
	
	/** purchase_plc_dc_price(입력) */
	private String[] in_purchase_plc_dc_price;
	
	/** purchase_alc_dc_price(입력) */
	private String[] in_purchase_alc_dc_price;
	
	/** purchase_unit_price(입력) */
	private String[] in_ds_purchase_unit_price;
	
	/** purchase_price(입력) */
	private String[] in_ds_purchase_price;
	
	/** last_purchase_price(입력) */
	private String[] in_last_purchase_price;
	
	/** ds_po_day(입력) */
	private String[] in_ds_po_day;
	
	/** install_day(입력) */
	private String[] in_install_day;
	
	/** ordering_day(입력) */
	private String[] in_ordering_day;
	
	/** license_start_date(입력) */
	private String[] in_license_start_date;
	
	/** license_end_date(입력) */
	private String[] in_license_end_date;
	
	/** place_of_business(입력) */
	private String[] in_place_of_business;
	
	/** in_target_id(입력) */
	private String[] in_target_id;
	
	/** chang_yn(입력) */
	private String[] in_chang_yn;
	
	
	//ALC	
	/** 매출내역_id(입력) */
	private int[] in_alc_sales_record_ds_id;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_price_list_date;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_portfolio;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_portfolio_item_name;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_prd_number;
	
	/** in_alc_prd_revision(입력) */
	private String[] in_alc_prd_revision;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_prd_type;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_trigram;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_plc;
	
	/** 매출내역_id(입력) */
	private String[] in_alc_alc;
	
	/** qlc(입력) */
	private String[] in_alc_qlc;
	
	/** ylc(입력) */
	private String[] in_alc_ylc;
	
	/** etc(입력) */
	private String[] in_alc_etc;
	
	/** list_price(입력) */
	private String[] in_alc_ds_list_price;
	
	/** qty(입력) */
	private String[] in_alc_ds_qty;
	
	/** each_yn(입력) */
	private String[] in_alc_each_yn;
	
	/** in_sales_alc_dc(입력) */
	private String[] in_alc_sales_alc_dc;
	
	/** sales_plc_dc(입력) */
	private String[] in_alc_sales_plc_dc;	

	/** sales_dc_gb(입력) */
	private String[] in_alc_sales_alc_dc_gb;

	/** sales_dc_gb(입력) */
	private String[] in_alc_sales_plc_dc_gb;
	
	/** sales_plc_dc_price(입력) */
	private String[] in_alc_sales_plc_dc_price;
	
	/** sales_alc_dc_price(입력) */
	private String[] in_alc_sales_alc_dc_price;
	
	/** sales_price(입력) */
	private String[] in_alc_ds_sales_price;
	
	/** last_sales_price(입력) */
	private String[] in_alc_last_sales_price;
	
	/** purchase_plc_dc(입력) */
	private String[] in_alc_purchase_plc_dc;
	
	/** purchase_alc_dc(입력) */
	private String[] in_alc_purchase_alc_dc;
	
	/** purchase_dc_gb(입력) */
	private String[] in_alc_purchase_alc_gb;

	/** purchase_plc_dc_gb(입력) */
	private String[] in_alc_purchase_plc_dc_gb;
	
	/** purchase_alc_dc_gb(입력) */
	private String[] in_alc_purchase_alc_dc_gb;
	
	/** purchase_plc_dc_price(입력) */
	private String[] in_alc_purchase_plc_dc_price;
	
	/** purchase_alc_dc_price(입력) */
	private String[] in_alc_purchase_alc_dc_price;
	
	/** purchase_unit_price(입력) */
	private String[] in_alc_ds_purchase_unit_price;
	
	/** purchase_price(입력) */
	private String[] in_alc_ds_purchase_price;
	
	/** last_purchase_price(입력) */
	private String[] in_alc_last_purchase_price;
	
	/** ds_po_day(입력) */
	private String[] in_alc_ds_po_day;
	
	/** install_day(입력) */
	private String[] in_alc_install_day;
	
	/** ordering_day(입력) */
	private String[] in_alc_ordering_day;
	
	/** license_start_date(입력) */
	private String[] in_alc_license_start_date;
	
	/** license_end_date(입력) */
	private String[] in_alc_license_end_date;
	
	/** place_of_business(입력) */
	private String[] in_alc_place_of_business;
	
	/** in_target_id(입력) */
	private String[] in_alc_target_id;
	
	/** chang_yn(입력) */
	private String[] in_alc_chang_yn;
	
	/** alc_year(입력) */
	private String[] in_alc_year;
	
	/** company_id(입력) */
	private int[] in_company_id;
	
	/** sales_project_code(입력) */
	private String[] in_sales_project_code;
	
	/** stock_yn(입력) */
	private String[] in_stock_yn;
	
	
	/** ETC */
	/** 매출내역_id(입력) */
	private String[] in_sales_record_id;
	
	/** 영업 구분(입력) */
	private String[] in_sales_gb;

	/** 모델명(입력) */
	private String[] in_model;

	/** 기간 시작일(입력) */
	private String[] in_des_start_day;

	/** 기간 종료일(입력) */
	private String[] in_des_end_day;

	/** 수량(입력) */
	private String[] in_qty;

	/** Price(입력) */
	private String[] in_list_price;

	/** 매출단가(입력) */
	private String[] in_sales_unit_price;

	/** 매출액(입력) */
	private String[] in_sales_price;

	/** 매출D/C(입력) */
	private String[] in_sales_dc;

	/** 매입단가(입력) */
	private String[] in_purchase_unit_price;

	/** 매입가(입력) */
	private String[] in_purchase_price;

	/** 매입D/C(입력) */
	private String[] in_purchase_dc;

	/** 구매처(입력) */
	private String[] in_supplier;

	/** 결제조건코드(입력) */
	private String[] in_purchase_pay_code;

	/** 결제조건내용(입력) */
	private String[] in_purchase_pay_method;

	/** 매출 */
	/** 세금계산서_명(입력) */
	private String[] in_invoice_id;

	/** 세금계산서_명(입력) */
	private String[] in_invoice_name;

	/** 매출/매입(1:매출 2:매입)(입력) */
	private String[] in_checked;

	/** 분할(입력) */
	private String[] in_split;

	/** 계산서일자(입력) */
	private String[] in_issued;

	/** 수기/전자(01:수기 02:전자)(입력) */
	private String[] in_method;

	/** 매출액(입력) */
	private String[] in_price;

	/** 매출결제조건내용(입력) */
	private String[] in_payment_requisite_content;

	/** 계약번호(프로젝트 코드)(입력) */
	private String[] in_contract_number;

	/** 매입 */
	/** 세금계산서_명(입력) */
	private String[] in_buy_invoice_id;

	/** 세금계산서_명(입력) */
	private String[] in_buy_invoice_name;

	/** 매출/매입(1:매출 2:매입)(입력) */
	private String[] in_buy_checked;

	/** 분할(입력) */
	private String[] in_buy_split;

	/** 계산서일자(입력) */
	private String[] in_buy_issued;

	/** 수기/전자(01:수기 02:전자)(입력) */
	private String[] in_buy_method;

	/** 매출액(입력) */
	private String[] in_buy_price;

	/** 매출결제조건내용(입력) */
	private String[] in_buy_payment_requisite_content;

	/** 계약번호(프로젝트 코드)(입력) */
	private String[] in_buy_contract_number;

	/** 매출 세금계산서 특이사항(입력) */
	private String invoice_content;

	/** 매입 세금계산서 특이사항(입력) */
	private String buy_invoice_content;

	public String getSh_product_sales_year() {
		return sh_product_sales_year;
	}

	public void setSh_product_sales_year(String sh_product_sales_year) {
		this.sh_product_sales_year = sh_product_sales_year;
	}

	public String getSh_product_sales_month() {
		return sh_product_sales_month;
	}

	public void setSh_product_sales_month(String sh_product_sales_month) {
		this.sh_product_sales_month = sh_product_sales_month;
	}

	public String getSh_company_name() {
		return sh_company_name;
	}

	public void setSh_company_name(String sh_company_name) {
		this.sh_company_name = sh_company_name;
	}

	public String getSh_project_code() {
		return sh_project_code;
	}

	public void setSh_project_code(String sh_project_code) {
		this.sh_project_code = sh_project_code;
	}

	public String getSh_brand_cd() {
		return sh_brand_cd;
	}

	public void setSh_brand_cd(String sh_brand_cd) {
		this.sh_brand_cd = sh_brand_cd;
	}

	public List<String> getDivision_child_list() {
		return division_child_list;
	}

	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
	}

	public String getInsert_date() {
		return insert_date;
	}

	public void setInsert_date(String insert_date) {
		this.insert_date = insert_date;
	}

	public String getCheck_date_yn() {
		return check_date_yn;
	}

	public void setCheck_date_yn(String check_date_yn) {
		this.check_date_yn = check_date_yn;
	}
	
	public int getSales_confer_id() {
		return sales_confer_id;
	}

	public void setSales_confer_id(int sales_confer_id) {
		this.sales_confer_id = sales_confer_id;
	}
	
	public int getOld_sales_confer_id() {
		return old_sales_confer_id;
	}

	public void setOld_sales_confer_id(int old_sales_confer_id) {
		this.old_sales_confer_id = old_sales_confer_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getContract_number_id() {
		return contract_number_id;
	}

	public void setContract_number_id(String contract_number_id) {
		this.contract_number_id = contract_number_id;
	}

	public String getContract_number() {
		return contract_number;
	}

	public void setContract_number(String contract_number) {
		this.contract_number = contract_number;
	}

	public int getCompany_id() {
		return company_id;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTotal_contract_price() {
		return total_contract_price;
	}

	public void setTotal_contract_price(String total_contract_price) {
		this.total_contract_price = total_contract_price;
	}

	public String getProfit_price() {
		return profit_price;
	}

	public void setProfit_price(String profit_price) {
		this.profit_price = profit_price;
	}

	public String getStaff_id() {
		return staff_id;
	}

	public void setStaff_id(String staff_id) {
		this.staff_id = staff_id;
	}

	public String getStaff_name() {
		return staff_name;
	}

	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
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

	public String getCustomer_division() {
		return customer_division;
	}

	public void setCustomer_division(String customer_division) {
		this.customer_division = customer_division;
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

	public String getInvoice_id_name() {
		return invoice_id_name;
	}

	public void setInvoice_id_name(String invoice_id_name) {
		this.invoice_id_name = invoice_id_name;
	}

	public String getInvoice_division() {
		return invoice_division;
	}

	public void setInvoice_division(String invoice_division) {
		this.invoice_division = invoice_division;
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

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getSales_confer_kind() {
		return sales_confer_kind;
	}

	public void setSales_confer_kind(String sales_confer_kind) {
		this.sales_confer_kind = sales_confer_kind;
	}

	public String getSales_confer_kind_name() {
		return sales_confer_kind_name;
	}

	public void setSales_confer_kind_name(String sales_confer_kind_name) {
		this.sales_confer_kind_name = sales_confer_kind_name;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getStatus_nm() {
		return status_nm;
	}

	public void setStatus_nm(String status_nm) {
		this.status_nm = status_nm;
	}

	public int getSales_confer_monthly_id() {
		return sales_confer_monthly_id;
	}

	public void setSales_confer_monthly_id(int sales_confer_monthly_id) {
		this.sales_confer_monthly_id = sales_confer_monthly_id;
	}

	public String getSales_confer_monthly_yn() {
		return sales_confer_monthly_yn;
	}

	public void setSales_confer_monthly_yn(String sales_confer_monthly_yn) {
		this.sales_confer_monthly_yn = sales_confer_monthly_yn;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getSales_record_id() {
		return sales_record_id;
	}

	public void setSales_record_id(String sales_record_id) {
		this.sales_record_id = sales_record_id;
	}

	public int getSales_record_ds_id() {
		return sales_record_ds_id;
	}

	public void setSales_record_ds_id(int sales_record_ds_id) {
		this.sales_record_ds_id = sales_record_ds_id;
	}

	public String getPrice_list_date() {
		return price_list_date;
	}

	public void setPrice_list_date(String price_list_date) {
		this.price_list_date = price_list_date;
	}

	public String getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
	}

	public String getPortfolio_item_name() {
		return portfolio_item_name;
	}

	public void setPortfolio_item_name(String portfolio_item_name) {
		this.portfolio_item_name = portfolio_item_name;
	}

	public String getPrd_number() {
		return prd_number;
	}

	public void setPrd_number(String prd_number) {
		this.prd_number = prd_number;
	}

	public String getPrd_type() {
		return prd_type;
	}

	public void setPrd_type(String prd_type) {
		this.prd_type = prd_type;
	}

	public String getTrigram() {
		return trigram;
	}

	public void setTrigram(String trigram) {
		this.trigram = trigram;
	}

	public String getPrd_revision() {
		return prd_revision;
	}

	public void setPrd_revision(String prd_revision) {
		this.prd_revision = prd_revision;
	}

	public String getDs_qty() {
		return ds_qty;
	}

	public void setDs_qty(String ds_qty) {
		this.ds_qty = ds_qty;
	}

	public String getDs_list_price() {
		return ds_list_price;
	}

	public void setDs_list_price(String ds_list_price) {
		this.ds_list_price = ds_list_price;
	}

	public String getPlc() {
		return plc;
	}

	public void setPlc(String plc) {
		this.plc = plc;
	}

	public String getAlc() {
		return alc;
	}

	public void setAlc(String alc) {
		this.alc = alc;
	}

	public String getQlc() {
		return qlc;
	}

	public void setQlc(String qlc) {
		this.qlc = qlc;
	}

	public String getYlc() {
		return ylc;
	}

	public void setYlc(String ylc) {
		this.ylc = ylc;
	}

	public String getEtc() {
		return etc;
	}

	public void setEtc(String etc) {
		this.etc = etc;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public String getEach_yn() {
		return each_yn;
	}

	public void setEach_yn(String each_yn) {
		this.each_yn = each_yn;
	}

	public String getSales_alc_dc() {
		return sales_alc_dc;
	}

	public void setSales_alc_dc(String sales_alc_dc) {
		this.sales_alc_dc = sales_alc_dc;
	}

	public String getSales_plc_dc() {
		return sales_plc_dc;
	}

	public void setSales_plc_dc(String sales_plc_dc) {
		this.sales_plc_dc = sales_plc_dc;
	}

	public String getSales_plc_dc_gb() {
		return sales_plc_dc_gb;
	}

	public void setSales_plc_dc_gb(String sales_plc_dc_gb) {
		this.sales_plc_dc_gb = sales_plc_dc_gb;
	}

	public String getSales_alc_dc_gb() {
		return sales_alc_dc_gb;
	}

	public void setSales_alc_dc_gb(String sales_alc_dc_gb) {
		this.sales_alc_dc_gb = sales_alc_dc_gb;
	}

	public String getSales_plc_dc_price() {
		return sales_plc_dc_price;
	}

	public void setSales_plc_dc_price(String sales_plc_dc_price) {
		this.sales_plc_dc_price = sales_plc_dc_price;
	}

	public String getSales_alc_dc_price() {
		return sales_alc_dc_price;
	}

	public void setSales_alc_dc_price(String sales_alc_dc_price) {
		this.sales_alc_dc_price = sales_alc_dc_price;
	}

	public String getDs_sales_price() {
		return ds_sales_price;
	}

	public void setDs_sales_price(String ds_sales_price) {
		this.ds_sales_price = ds_sales_price;
	}

	public String getLast_sales_price() {
		return last_sales_price;
	}

	public void setLast_sales_price(String last_sales_price) {
		this.last_sales_price = last_sales_price;
	}

	public String getPurchase_plc_dc() {
		return purchase_plc_dc;
	}

	public void setPurchase_plc_dc(String purchase_plc_dc) {
		this.purchase_plc_dc = purchase_plc_dc;
	}

	public String getPurchase_alc_dc() {
		return purchase_alc_dc;
	}

	public void setPurchase_alc_dc(String purchase_alc_dc) {
		this.purchase_alc_dc = purchase_alc_dc;
	}

	public String getPurchase_plc_dc_gb() {
		return purchase_plc_dc_gb;
	}

	public void setPurchase_plc_dc_gb(String purchase_plc_dc_gb) {
		this.purchase_plc_dc_gb = purchase_plc_dc_gb;
	}

	public String getPurchase_alc_dc_gb() {
		return purchase_alc_dc_gb;
	}

	public void setPurchase_alc_dc_gb(String purchase_alc_dc_gb) {
		this.purchase_alc_dc_gb = purchase_alc_dc_gb;
	}

	public String getPurchase_plc_dc_price() {
		return purchase_plc_dc_price;
	}

	public void setPurchase_plc_dc_price(String purchase_plc_dc_price) {
		this.purchase_plc_dc_price = purchase_plc_dc_price;
	}

	public String getPurchase_alc_dc_price() {
		return purchase_alc_dc_price;
	}

	public void setPurchase_alc_dc_price(String purchase_alc_dc_price) {
		this.purchase_alc_dc_price = purchase_alc_dc_price;
	}

	public String getDs_purchase_unit_price() {
		return ds_purchase_unit_price;
	}

	public void setDs_purchase_unit_price(String ds_purchase_unit_price) {
		this.ds_purchase_unit_price = ds_purchase_unit_price;
	}

	public String getDs_purchase_price() {
		return ds_purchase_price;
	}

	public void setDs_purchase_price(String ds_purchase_price) {
		this.ds_purchase_price = ds_purchase_price;
	}

	public String getLast_purchase_price() {
		return last_purchase_price;
	}

	public void setLast_purchase_price(String last_purchase_price) {
		this.last_purchase_price = last_purchase_price;
	}

	public String getDs_po_day() {
		return ds_po_day;
	}

	public void setDs_po_day(String ds_po_day) {
		this.ds_po_day = ds_po_day;
	}

	public String getInstall_day() {
		return install_day;
	}

	public void setInstall_day(String install_day) {
		this.install_day = install_day;
	}

	public String getOrdering_day() {
		return ordering_day;
	}

	public void setOrdering_day(String ordering_day) {
		this.ordering_day = ordering_day;
	}

	public String getLicense_start_date() {
		return license_start_date;
	}

	public void setLicense_start_date(String license_start_date) {
		this.license_start_date = license_start_date;
	}

	public String getLicense_end_date() {
		return license_end_date;
	}

	public void setLicense_end_date(String license_end_date) {
		this.license_end_date = license_end_date;
	}

	public String getTarget_id() {
		return target_id;
	}

	public void setTarget_id(String target_id) {
		this.target_id = target_id;
	}

	public String getPlace_of_business() {
		return place_of_business;
	}

	public void setPlace_of_business(String place_of_business) {
		this.place_of_business = place_of_business;
	}

	public String getChang_yn() {
		return chang_yn;
	}

	public void setChang_yn(String chang_yn) {
		this.chang_yn = chang_yn;
	}

	public int getChg_sales_record_ds_id() {
		return chg_sales_record_ds_id;
	}

	public void setChg_sales_record_ds_id(int chg_sales_record_ds_id) {
		this.chg_sales_record_ds_id = chg_sales_record_ds_id;
	}

	public String getChg_price_list_date() {
		return chg_price_list_date;
	}

	public void setChg_price_list_date(String chg_price_list_date) {
		this.chg_price_list_date = chg_price_list_date;
	}

	public String getChg_portfolio() {
		return chg_portfolio;
	}

	public void setChg_portfolio(String chg_portfolio) {
		this.chg_portfolio = chg_portfolio;
	}

	public String getChg_portfolio_item_name() {
		return chg_portfolio_item_name;
	}

	public void setChg_portfolio_item_name(String chg_portfolio_item_name) {
		this.chg_portfolio_item_name = chg_portfolio_item_name;
	}

	public String getChg_prd_number() {
		return chg_prd_number;
	}

	public void setChg_prd_number(String chg_prd_number) {
		this.chg_prd_number = chg_prd_number;
	}

	public String getChg_prd_type() {
		return chg_prd_type;
	}

	public void setChg_prd_type(String chg_prd_type) {
		this.chg_prd_type = chg_prd_type;
	}

	public String getChg_trigram() {
		return chg_trigram;
	}

	public void setChg_trigram(String chg_trigram) {
		this.chg_trigram = chg_trigram;
	}

	public String getChg_prd_revision() {
		return chg_prd_revision;
	}

	public void setChg_prd_revision(String chg_prd_revision) {
		this.chg_prd_revision = chg_prd_revision;
	}

	public String getChg_qty() {
		return chg_qty;
	}

	public void setChg_qty(String chg_qty) {
		this.chg_qty = chg_qty;
	}

	public String getChg_ds_list_price() {
		return chg_ds_list_price;
	}

	public void setChg_ds_list_price(String chg_ds_list_price) {
		this.chg_ds_list_price = chg_ds_list_price;
	}

	public String getChg_plc() {
		return chg_plc;
	}

	public void setChg_plc(String chg_plc) {
		this.chg_plc = chg_plc;
	}

	public String getChg_alc() {
		return chg_alc;
	}

	public void setChg_alc(String chg_alc) {
		this.chg_alc = chg_alc;
	}

	public String getChg_qlc() {
		return chg_qlc;
	}

	public void setChg_qlc(String chg_qlc) {
		this.chg_qlc = chg_qlc;
	}

	public String getChg_ylc() {
		return chg_ylc;
	}

	public void setChg_ylc(String chg_ylc) {
		this.chg_ylc = chg_ylc;
	}

	public String getChg_etc() {
		return chg_etc;
	}

	public void setChg_etc(String chg_etc) {
		this.chg_etc = chg_etc;
	}

	public String getChg_code_name() {
		return chg_code_name;
	}

	public void setChg_code_name(String chg_code_name) {
		this.chg_code_name = chg_code_name;
	}

	public String getChg_each_yn() {
		return chg_each_yn;
	}

	public void setChg_each_yn(String chg_each_yn) {
		this.chg_each_yn = chg_each_yn;
	}

	public String getChg_sales_alc_dc() {
		return chg_sales_alc_dc;
	}

	public void setChg_sales_alc_dc(String chg_sales_alc_dc) {
		this.chg_sales_alc_dc = chg_sales_alc_dc;
	}

	public String getChg_sales_plc_dc() {
		return chg_sales_plc_dc;
	}

	public void setChg_sales_plc_dc(String chg_sales_plc_dc) {
		this.chg_sales_plc_dc = chg_sales_plc_dc;
	}

	public String getChg_sales_plc_dc_gb() {
		return chg_sales_plc_dc_gb;
	}

	public void setChg_sales_plc_dc_gb(String chg_sales_plc_dc_gb) {
		this.chg_sales_plc_dc_gb = chg_sales_plc_dc_gb;
	}

	public String getChg_sales_alc_dc_gb() {
		return chg_sales_alc_dc_gb;
	}

	public void setChg_sales_alc_dc_gb(String chg_sales_alc_dc_gb) {
		this.chg_sales_alc_dc_gb = chg_sales_alc_dc_gb;
	}

	public String getChg_sales_plc_dc_price() {
		return chg_sales_plc_dc_price;
	}

	public void setChg_sales_plc_dc_price(String chg_sales_plc_dc_price) {
		this.chg_sales_plc_dc_price = chg_sales_plc_dc_price;
	}

	public String getChg_sales_alc_dc_price() {
		return chg_sales_alc_dc_price;
	}

	public void setChg_sales_alc_dc_price(String chg_sales_alc_dc_price) {
		this.chg_sales_alc_dc_price = chg_sales_alc_dc_price;
	}

	public String getChg_ds_sales_price() {
		return chg_ds_sales_price;
	}

	public void setChg_ds_sales_price(String chg_ds_sales_price) {
		this.chg_ds_sales_price = chg_ds_sales_price;
	}

	public String getChg_purchase_plc_dc() {
		return chg_purchase_plc_dc;
	}

	public void setChg_purchase_plc_dc(String chg_purchase_plc_dc) {
		this.chg_purchase_plc_dc = chg_purchase_plc_dc;
	}

	public String getChg_purchase_alc_dc() {
		return chg_purchase_alc_dc;
	}

	public void setChg_purchase_alc_dc(String chg_purchase_alc_dc) {
		this.chg_purchase_alc_dc = chg_purchase_alc_dc;
	}

	public String getChg_purchase_plc_dc_gb() {
		return chg_purchase_plc_dc_gb;
	}

	public void setChg_purchase_plc_dc_gb(String chg_purchase_plc_dc_gb) {
		this.chg_purchase_plc_dc_gb = chg_purchase_plc_dc_gb;
	}

	public String getChg_purchase_alc_dc_gb() {
		return chg_purchase_alc_dc_gb;
	}

	public void setChg_purchase_alc_dc_gb(String chg_purchase_alc_dc_gb) {
		this.chg_purchase_alc_dc_gb = chg_purchase_alc_dc_gb;
	}

	public String getChg_purchase_plc_dc_price() {
		return chg_purchase_plc_dc_price;
	}

	public void setChg_purchase_plc_dc_price(String chg_purchase_plc_dc_price) {
		this.chg_purchase_plc_dc_price = chg_purchase_plc_dc_price;
	}

	public String getChg_purchase_alc_dc_price() {
		return chg_purchase_alc_dc_price;
	}

	public void setChg_purchase_alc_dc_price(String chg_purchase_alc_dc_price) {
		this.chg_purchase_alc_dc_price = chg_purchase_alc_dc_price;
	}

	public String getChg_ds_purchase_unit_price() {
		return chg_ds_purchase_unit_price;
	}

	public void setChg_ds_purchase_unit_price(String chg_ds_purchase_unit_price) {
		this.chg_ds_purchase_unit_price = chg_ds_purchase_unit_price;
	}

	public String getChg_ds_purchase_price() {
		return chg_ds_purchase_price;
	}

	public void setChg_ds_purchase_price(String chg_ds_purchase_price) {
		this.chg_ds_purchase_price = chg_ds_purchase_price;
	}

	public String getChg_ds_po_day() {
		return chg_ds_po_day;
	}

	public void setChg_ds_po_day(String chg_ds_po_day) {
		this.chg_ds_po_day = chg_ds_po_day;
	}

	public String getChg_install_day() {
		return chg_install_day;
	}

	public void setChg_install_day(String chg_install_day) {
		this.chg_install_day = chg_install_day;
	}

	public String getChg_ordering_day() {
		return chg_ordering_day;
	}

	public void setChg_ordering_day(String chg_ordering_day) {
		this.chg_ordering_day = chg_ordering_day;
	}

	public String getChg_license_start_date() {
		return chg_license_start_date;
	}

	public void setChg_license_start_date(String chg_license_start_date) {
		this.chg_license_start_date = chg_license_start_date;
	}

	public String getChg_license_end_date() {
		return chg_license_end_date;
	}

	public void setChg_license_end_date(String chg_license_end_date) {
		this.chg_license_end_date = chg_license_end_date;
	}

	public String getChg_target_id() {
		return chg_target_id;
	}

	public void setChg_target_id(String chg_target_id) {
		this.chg_target_id = chg_target_id;
	}

	public String getChg_place_of_business() {
		return chg_place_of_business;
	}

	public void setChg_place_of_business(String chg_place_of_business) {
		this.chg_place_of_business = chg_place_of_business;
	}

	public String getChg_chang_yn() {
		return chg_chang_yn;
	}

	public void setChg_chang_yn(String chg_chang_yn) {
		this.chg_chang_yn = chg_chang_yn;
	}

	public String getAlc_year() {
		return alc_year;
	}

	public void setAlc_year(String alc_year) {
		this.alc_year = alc_year;
	}

	public String getStock_yn() {
		return stock_yn;
	}

	public void setStock_yn(String stock_yn) {
		this.stock_yn = stock_yn;
	}

	public String getSales_gb() {
		return sales_gb;
	}

	public void setSales_gb(String sales_gb) {
		this.sales_gb = sales_gb;
	}

	public String getSales_gb_name() {
		return sales_gb_name;
	}

	public void setSales_gb_name(String sales_gb_name) {
		this.sales_gb_name = sales_gb_name;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getDes_start_day() {
		return des_start_day;
	}

	public void setDes_start_day(String des_start_day) {
		this.des_start_day = des_start_day;
	}

	public String getDes_end_day() {
		return des_end_day;
	}

	public void setDes_end_day(String des_end_day) {
		this.des_end_day = des_end_day;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getList_price() {
		return list_price;
	}

	public void setList_price(String list_price) {
		this.list_price = list_price;
	}

	public String getSales_unit_price() {
		return sales_unit_price;
	}

	public void setSales_unit_price(String sales_unit_price) {
		this.sales_unit_price = sales_unit_price;
	}

	public String getSales_price() {
		return sales_price;
	}

	public void setSales_price(String sales_price) {
		this.sales_price = sales_price;
	}

	public String getSales_dc() {
		return sales_dc;
	}

	public void setSales_dc(String sales_dc) {
		this.sales_dc = sales_dc;
	}

	public String getPurchase_unit_price() {
		return purchase_unit_price;
	}

	public void setPurchase_unit_price(String purchase_unit_price) {
		this.purchase_unit_price = purchase_unit_price;
	}

	public String getPurchase_price() {
		return purchase_price;
	}

	public void setPurchase_price(String purchase_price) {
		this.purchase_price = purchase_price;
	}

	public String getPurchase_dc() {
		return purchase_dc;
	}

	public void setPurchase_dc(String purchase_dc) {
		this.purchase_dc = purchase_dc;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getPurchase_pay_code() {
		return purchase_pay_code;
	}

	public void setPurchase_pay_code(String purchase_pay_code) {
		this.purchase_pay_code = purchase_pay_code;
	}

	public String getPurchase_pay_name() {
		return purchase_pay_name;
	}

	public void setPurchase_pay_name(String purchase_pay_name) {
		this.purchase_pay_name = purchase_pay_name;
	}

	public String getPurchase_pay_method() {
		return purchase_pay_method;
	}

	public void setPurchase_pay_method(String purchase_pay_method) {
		this.purchase_pay_method = purchase_pay_method;
	}

	public String getSale_invoice_id() {
		return sale_invoice_id;
	}

	public void setSale_invoice_id(String sale_invoice_id) {
		this.sale_invoice_id = sale_invoice_id;
	}

	public String getBuy_invoice_id() {
		return buy_invoice_id;
	}

	public void setBuy_invoice_id(String buy_invoice_id) {
		this.buy_invoice_id = buy_invoice_id;
	}

	public String getInvoice_name() {
		return invoice_name;
	}

	public void setInvoice_name(String invoice_name) {
		this.invoice_name = invoice_name;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public String getSplit() {
		return split;
	}

	public void setSplit(String split) {
		this.split = split;
	}

	public String getIssued() {
		return issued;
	}

	public void setIssued(String issued) {
		this.issued = issued;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getMethod_name() {
		return method_name;
	}

	public void setMethod_name(String method_name) {
		this.method_name = method_name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPayment_requisite_content() {
		return payment_requisite_content;
	}

	public void setPayment_requisite_content(String payment_requisite_content) {
		this.payment_requisite_content = payment_requisite_content;
	}

	public String getSales_confer_year() {
		return sales_confer_year;
	}

	public void setSales_confer_year(String sales_confer_year) {
		this.sales_confer_year = sales_confer_year;
	}

	public String getSales_confer_month() {
		return sales_confer_month;
	}

	public void setSales_confer_month(String sales_confer_month) {
		this.sales_confer_month = sales_confer_month;
	}

	public int[] getIn_sales_record_ds_id() {
		return in_sales_record_ds_id;
	}

	public void setIn_sales_record_ds_id(int[] in_sales_record_ds_id) {
		this.in_sales_record_ds_id = in_sales_record_ds_id;
	}

	public String[] getIn_price_list_date() {
		return in_price_list_date;
	}

	public void setIn_price_list_date(String[] in_price_list_date) {
		this.in_price_list_date = in_price_list_date;
	}

	public String[] getIn_portfolio() {
		return in_portfolio;
	}

	public void setIn_portfolio(String[] in_portfolio) {
		this.in_portfolio = in_portfolio;
	}

	public String[] getIn_portfolio_item_name() {
		return in_portfolio_item_name;
	}

	public void setIn_portfolio_item_name(String[] in_portfolio_item_name) {
		this.in_portfolio_item_name = in_portfolio_item_name;
	}

	public String[] getIn_prd_number() {
		return in_prd_number;
	}

	public void setIn_prd_number(String[] in_prd_number) {
		this.in_prd_number = in_prd_number;
	}

	public String[] getIn_prd_type() {
		return in_prd_type;
	}

	public void setIn_prd_type(String[] in_prd_type) {
		this.in_prd_type = in_prd_type;
	}

	public String[] getIn_trigram() {
		return in_trigram;
	}

	public void setIn_trigram(String[] in_trigram) {
		this.in_trigram = in_trigram;
	}

	public String[] getIn_plc() {
		return in_plc;
	}

	public void setIn_plc(String[] in_plc) {
		this.in_plc = in_plc;
	}

	public String[] getIn_alc() {
		return in_alc;
	}

	public void setIn_alc(String[] in_alc) {
		this.in_alc = in_alc;
	}

	public String[] getIn_qlc() {
		return in_qlc;
	}

	public void setIn_qlc(String[] in_qlc) {
		this.in_qlc = in_qlc;
	}

	public String[] getIn_ylc() {
		return in_ylc;
	}

	public void setIn_ylc(String[] in_ylc) {
		this.in_ylc = in_ylc;
	}

	public String[] getIn_etc() {
		return in_etc;
	}

	public void setIn_etc(String[] in_etc) {
		this.in_etc = in_etc;
	}

	public String[] getIn_ds_list_price() {
		return in_ds_list_price;
	}

	public void setIn_ds_list_price(String[] in_ds_list_price) {
		this.in_ds_list_price = in_ds_list_price;
	}

	public String[] getIn_ds_qty() {
		return in_ds_qty;
	}

	public void setIn_ds_qty(String[] in_ds_qty) {
		this.in_ds_qty = in_ds_qty;
	}

	public String[] getIn_each_yn() {
		return in_each_yn;
	}

	public void setIn_each_yn(String[] in_each_yn) {
		this.in_each_yn = in_each_yn;
	}

	public String[] getIn_sales_alc_dc() {
		return in_sales_alc_dc;
	}

	public void setIn_sales_alc_dc(String[] in_sales_alc_dc) {
		this.in_sales_alc_dc = in_sales_alc_dc;
	}

	public String[] getIn_sales_plc_dc() {
		return in_sales_plc_dc;
	}

	public void setIn_sales_plc_dc(String[] in_sales_plc_dc) {
		this.in_sales_plc_dc = in_sales_plc_dc;
	}

	public String[] getIn_sales_alc_dc_gb() {
		return in_sales_alc_dc_gb;
	}

	public void setIn_sales_alc_dc_gb(String[] in_sales_alc_dc_gb) {
		this.in_sales_alc_dc_gb = in_sales_alc_dc_gb;
	}

	public String[] getIn_sales_plc_dc_gb() {
		return in_sales_plc_dc_gb;
	}

	public void setIn_sales_plc_dc_gb(String[] in_sales_plc_dc_gb) {
		this.in_sales_plc_dc_gb = in_sales_plc_dc_gb;
	}

	public String[] getIn_sales_plc_dc_price() {
		return in_sales_plc_dc_price;
	}

	public void setIn_sales_plc_dc_price(String[] in_sales_plc_dc_price) {
		this.in_sales_plc_dc_price = in_sales_plc_dc_price;
	}

	public String[] getIn_sales_alc_dc_price() {
		return in_sales_alc_dc_price;
	}

	public void setIn_sales_alc_dc_price(String[] in_sales_alc_dc_price) {
		this.in_sales_alc_dc_price = in_sales_alc_dc_price;
	}

	public String[] getIn_ds_sales_price() {
		return in_ds_sales_price;
	}

	public void setIn_ds_sales_price(String[] in_ds_sales_price) {
		this.in_ds_sales_price = in_ds_sales_price;
	}

	public String[] getIn_last_sales_price() {
		return in_last_sales_price;
	}

	public void setIn_last_sales_price(String[] in_last_sales_price) {
		this.in_last_sales_price = in_last_sales_price;
	}

	public String[] getIn_purchase_plc_dc() {
		return in_purchase_plc_dc;
	}

	public void setIn_purchase_plc_dc(String[] in_purchase_plc_dc) {
		this.in_purchase_plc_dc = in_purchase_plc_dc;
	}

	public String[] getIn_purchase_alc_dc() {
		return in_purchase_alc_dc;
	}

	public void setIn_purchase_alc_dc(String[] in_purchase_alc_dc) {
		this.in_purchase_alc_dc = in_purchase_alc_dc;
	}

	public String[] getIn_purchase_alc_gb() {
		return in_purchase_alc_gb;
	}

	public void setIn_purchase_alc_gb(String[] in_purchase_alc_gb) {
		this.in_purchase_alc_gb = in_purchase_alc_gb;
	}

	public String[] getIn_purchase_plc_dc_gb() {
		return in_purchase_plc_dc_gb;
	}

	public void setIn_purchase_plc_dc_gb(String[] in_purchase_plc_dc_gb) {
		this.in_purchase_plc_dc_gb = in_purchase_plc_dc_gb;
	}

	public String[] getIn_purchase_alc_dc_gb() {
		return in_purchase_alc_dc_gb;
	}

	public void setIn_purchase_alc_dc_gb(String[] in_purchase_alc_dc_gb) {
		this.in_purchase_alc_dc_gb = in_purchase_alc_dc_gb;
	}

	public String[] getIn_purchase_plc_dc_price() {
		return in_purchase_plc_dc_price;
	}

	public void setIn_purchase_plc_dc_price(String[] in_purchase_plc_dc_price) {
		this.in_purchase_plc_dc_price = in_purchase_plc_dc_price;
	}

	public String[] getIn_purchase_alc_dc_price() {
		return in_purchase_alc_dc_price;
	}

	public void setIn_purchase_alc_dc_price(String[] in_purchase_alc_dc_price) {
		this.in_purchase_alc_dc_price = in_purchase_alc_dc_price;
	}

	public String[] getIn_ds_purchase_unit_price() {
		return in_ds_purchase_unit_price;
	}

	public void setIn_ds_purchase_unit_price(String[] in_ds_purchase_unit_price) {
		this.in_ds_purchase_unit_price = in_ds_purchase_unit_price;
	}

	public String[] getIn_ds_purchase_price() {
		return in_ds_purchase_price;
	}

	public void setIn_ds_purchase_price(String[] in_ds_purchase_price) {
		this.in_ds_purchase_price = in_ds_purchase_price;
	}

	public String[] getIn_last_purchase_price() {
		return in_last_purchase_price;
	}

	public void setIn_last_purchase_price(String[] in_last_purchase_price) {
		this.in_last_purchase_price = in_last_purchase_price;
	}

	public String[] getIn_ds_po_day() {
		return in_ds_po_day;
	}

	public void setIn_ds_po_day(String[] in_ds_po_day) {
		this.in_ds_po_day = in_ds_po_day;
	}

	public String[] getIn_install_day() {
		return in_install_day;
	}

	public void setIn_install_day(String[] in_install_day) {
		this.in_install_day = in_install_day;
	}

	public String[] getIn_ordering_day() {
		return in_ordering_day;
	}

	public void setIn_ordering_day(String[] in_ordering_day) {
		this.in_ordering_day = in_ordering_day;
	}

	public String[] getIn_license_start_date() {
		return in_license_start_date;
	}

	public void setIn_license_start_date(String[] in_license_start_date) {
		this.in_license_start_date = in_license_start_date;
	}

	public String[] getIn_license_end_date() {
		return in_license_end_date;
	}

	public void setIn_license_end_date(String[] in_license_end_date) {
		this.in_license_end_date = in_license_end_date;
	}

	public String[] getIn_place_of_business() {
		return in_place_of_business;
	}

	public void setIn_place_of_business(String[] in_place_of_business) {
		this.in_place_of_business = in_place_of_business;
	}

	public String[] getIn_target_id() {
		return in_target_id;
	}

	public void setIn_target_id(String[] in_target_id) {
		this.in_target_id = in_target_id;
	}

	public String[] getIn_chang_yn() {
		return in_chang_yn;
	}

	public void setIn_chang_yn(String[] in_chang_yn) {
		this.in_chang_yn = in_chang_yn;
	}

	public int[] getIn_alc_sales_record_ds_id() {
		return in_alc_sales_record_ds_id;
	}

	public void setIn_alc_sales_record_ds_id(int[] in_alc_sales_record_ds_id) {
		this.in_alc_sales_record_ds_id = in_alc_sales_record_ds_id;
	}

	public String[] getIn_alc_price_list_date() {
		return in_alc_price_list_date;
	}

	public void setIn_alc_price_list_date(String[] in_alc_price_list_date) {
		this.in_alc_price_list_date = in_alc_price_list_date;
	}

	public String[] getIn_alc_portfolio() {
		return in_alc_portfolio;
	}

	public void setIn_alc_portfolio(String[] in_alc_portfolio) {
		this.in_alc_portfolio = in_alc_portfolio;
	}

	public String[] getIn_alc_portfolio_item_name() {
		return in_alc_portfolio_item_name;
	}

	public void setIn_alc_portfolio_item_name(String[] in_alc_portfolio_item_name) {
		this.in_alc_portfolio_item_name = in_alc_portfolio_item_name;
	}

	public String[] getIn_alc_prd_number() {
		return in_alc_prd_number;
	}

	public void setIn_alc_prd_number(String[] in_alc_prd_number) {
		this.in_alc_prd_number = in_alc_prd_number;
	}

	public String[] getIn_alc_prd_type() {
		return in_alc_prd_type;
	}

	public void setIn_alc_prd_type(String[] in_alc_prd_type) {
		this.in_alc_prd_type = in_alc_prd_type;
	}

	public String[] getIn_alc_trigram() {
		return in_alc_trigram;
	}

	public void setIn_alc_trigram(String[] in_alc_trigram) {
		this.in_alc_trigram = in_alc_trigram;
	}

	public String[] getIn_alc_plc() {
		return in_alc_plc;
	}

	public void setIn_alc_plc(String[] in_alc_plc) {
		this.in_alc_plc = in_alc_plc;
	}

	public String[] getIn_alc_alc() {
		return in_alc_alc;
	}

	public void setIn_alc_alc(String[] in_alc_alc) {
		this.in_alc_alc = in_alc_alc;
	}

	public String[] getIn_alc_qlc() {
		return in_alc_qlc;
	}

	public void setIn_alc_qlc(String[] in_alc_qlc) {
		this.in_alc_qlc = in_alc_qlc;
	}

	public String[] getIn_alc_ylc() {
		return in_alc_ylc;
	}

	public void setIn_alc_ylc(String[] in_alc_ylc) {
		this.in_alc_ylc = in_alc_ylc;
	}

	public String[] getIn_alc_etc() {
		return in_alc_etc;
	}

	public void setIn_alc_etc(String[] in_alc_etc) {
		this.in_alc_etc = in_alc_etc;
	}

	public String[] getIn_alc_ds_list_price() {
		return in_alc_ds_list_price;
	}

	public void setIn_alc_ds_list_price(String[] in_alc_ds_list_price) {
		this.in_alc_ds_list_price = in_alc_ds_list_price;
	}

	public String[] getIn_alc_ds_qty() {
		return in_alc_ds_qty;
	}

	public void setIn_alc_ds_qty(String[] in_alc_ds_qty) {
		this.in_alc_ds_qty = in_alc_ds_qty;
	}

	public String[] getIn_alc_each_yn() {
		return in_alc_each_yn;
	}

	public void setIn_alc_each_yn(String[] in_alc_each_yn) {
		this.in_alc_each_yn = in_alc_each_yn;
	}

	public String[] getIn_alc_sales_alc_dc() {
		return in_alc_sales_alc_dc;
	}

	public void setIn_alc_sales_alc_dc(String[] in_alc_sales_alc_dc) {
		this.in_alc_sales_alc_dc = in_alc_sales_alc_dc;
	}

	public String[] getIn_alc_sales_plc_dc() {
		return in_alc_sales_plc_dc;
	}

	public void setIn_alc_sales_plc_dc(String[] in_alc_sales_plc_dc) {
		this.in_alc_sales_plc_dc = in_alc_sales_plc_dc;
	}

	public String[] getIn_alc_sales_alc_dc_gb() {
		return in_alc_sales_alc_dc_gb;
	}

	public void setIn_alc_sales_alc_dc_gb(String[] in_alc_sales_alc_dc_gb) {
		this.in_alc_sales_alc_dc_gb = in_alc_sales_alc_dc_gb;
	}

	public String[] getIn_alc_sales_plc_dc_gb() {
		return in_alc_sales_plc_dc_gb;
	}

	public void setIn_alc_sales_plc_dc_gb(String[] in_alc_sales_plc_dc_gb) {
		this.in_alc_sales_plc_dc_gb = in_alc_sales_plc_dc_gb;
	}

	public String[] getIn_alc_sales_plc_dc_price() {
		return in_alc_sales_plc_dc_price;
	}

	public void setIn_alc_sales_plc_dc_price(String[] in_alc_sales_plc_dc_price) {
		this.in_alc_sales_plc_dc_price = in_alc_sales_plc_dc_price;
	}

	public String[] getIn_alc_sales_alc_dc_price() {
		return in_alc_sales_alc_dc_price;
	}

	public void setIn_alc_sales_alc_dc_price(String[] in_alc_sales_alc_dc_price) {
		this.in_alc_sales_alc_dc_price = in_alc_sales_alc_dc_price;
	}

	public String[] getIn_alc_ds_sales_price() {
		return in_alc_ds_sales_price;
	}

	public void setIn_alc_ds_sales_price(String[] in_alc_ds_sales_price) {
		this.in_alc_ds_sales_price = in_alc_ds_sales_price;
	}

	public String[] getIn_alc_last_sales_price() {
		return in_alc_last_sales_price;
	}

	public void setIn_alc_last_sales_price(String[] in_alc_last_sales_price) {
		this.in_alc_last_sales_price = in_alc_last_sales_price;
	}

	public String[] getIn_alc_purchase_plc_dc() {
		return in_alc_purchase_plc_dc;
	}

	public void setIn_alc_purchase_plc_dc(String[] in_alc_purchase_plc_dc) {
		this.in_alc_purchase_plc_dc = in_alc_purchase_plc_dc;
	}

	public String[] getIn_alc_purchase_alc_dc() {
		return in_alc_purchase_alc_dc;
	}

	public void setIn_alc_purchase_alc_dc(String[] in_alc_purchase_alc_dc) {
		this.in_alc_purchase_alc_dc = in_alc_purchase_alc_dc;
	}

	public String[] getIn_alc_purchase_alc_gb() {
		return in_alc_purchase_alc_gb;
	}

	public void setIn_alc_purchase_alc_gb(String[] in_alc_purchase_alc_gb) {
		this.in_alc_purchase_alc_gb = in_alc_purchase_alc_gb;
	}

	public String[] getIn_alc_purchase_plc_dc_gb() {
		return in_alc_purchase_plc_dc_gb;
	}

	public void setIn_alc_purchase_plc_dc_gb(String[] in_alc_purchase_plc_dc_gb) {
		this.in_alc_purchase_plc_dc_gb = in_alc_purchase_plc_dc_gb;
	}

	public String[] getIn_alc_purchase_alc_dc_gb() {
		return in_alc_purchase_alc_dc_gb;
	}

	public void setIn_alc_purchase_alc_dc_gb(String[] in_alc_purchase_alc_dc_gb) {
		this.in_alc_purchase_alc_dc_gb = in_alc_purchase_alc_dc_gb;
	}

	public String[] getIn_alc_purchase_plc_dc_price() {
		return in_alc_purchase_plc_dc_price;
	}

	public void setIn_alc_purchase_plc_dc_price(
			String[] in_alc_purchase_plc_dc_price) {
		this.in_alc_purchase_plc_dc_price = in_alc_purchase_plc_dc_price;
	}

	public String[] getIn_alc_purchase_alc_dc_price() {
		return in_alc_purchase_alc_dc_price;
	}

	public void setIn_alc_purchase_alc_dc_price(
			String[] in_alc_purchase_alc_dc_price) {
		this.in_alc_purchase_alc_dc_price = in_alc_purchase_alc_dc_price;
	}

	public String[] getIn_alc_ds_purchase_unit_price() {
		return in_alc_ds_purchase_unit_price;
	}

	public void setIn_alc_ds_purchase_unit_price(
			String[] in_alc_ds_purchase_unit_price) {
		this.in_alc_ds_purchase_unit_price = in_alc_ds_purchase_unit_price;
	}

	public String[] getIn_alc_ds_purchase_price() {
		return in_alc_ds_purchase_price;
	}

	public void setIn_alc_ds_purchase_price(String[] in_alc_ds_purchase_price) {
		this.in_alc_ds_purchase_price = in_alc_ds_purchase_price;
	}

	public String[] getIn_alc_last_purchase_price() {
		return in_alc_last_purchase_price;
	}

	public void setIn_alc_last_purchase_price(String[] in_alc_last_purchase_price) {
		this.in_alc_last_purchase_price = in_alc_last_purchase_price;
	}

	public String[] getIn_alc_ds_po_day() {
		return in_alc_ds_po_day;
	}

	public void setIn_alc_ds_po_day(String[] in_alc_ds_po_day) {
		this.in_alc_ds_po_day = in_alc_ds_po_day;
	}

	public String[] getIn_alc_install_day() {
		return in_alc_install_day;
	}

	public void setIn_alc_install_day(String[] in_alc_install_day) {
		this.in_alc_install_day = in_alc_install_day;
	}

	public String[] getIn_alc_ordering_day() {
		return in_alc_ordering_day;
	}

	public void setIn_alc_ordering_day(String[] in_alc_ordering_day) {
		this.in_alc_ordering_day = in_alc_ordering_day;
	}

	public String[] getIn_alc_license_start_date() {
		return in_alc_license_start_date;
	}

	public void setIn_alc_license_start_date(String[] in_alc_license_start_date) {
		this.in_alc_license_start_date = in_alc_license_start_date;
	}

	public String[] getIn_alc_license_end_date() {
		return in_alc_license_end_date;
	}

	public void setIn_alc_license_end_date(String[] in_alc_license_end_date) {
		this.in_alc_license_end_date = in_alc_license_end_date;
	}

	public String[] getIn_alc_place_of_business() {
		return in_alc_place_of_business;
	}

	public void setIn_alc_place_of_business(String[] in_alc_place_of_business) {
		this.in_alc_place_of_business = in_alc_place_of_business;
	}

	public String[] getIn_alc_target_id() {
		return in_alc_target_id;
	}

	public void setIn_alc_target_id(String[] in_alc_target_id) {
		this.in_alc_target_id = in_alc_target_id;
	}

	public String[] getIn_alc_chang_yn() {
		return in_alc_chang_yn;
	}

	public void setIn_alc_chang_yn(String[] in_alc_chang_yn) {
		this.in_alc_chang_yn = in_alc_chang_yn;
	}

	public String[] getIn_alc_year() {
		return in_alc_year;
	}

	public void setIn_alc_year(String[] in_alc_year) {
		this.in_alc_year = in_alc_year;
	}
	
	public int[] getIn_company_id() {
		return in_company_id;
	}

	public void setIn_company_id(int[] in_company_id) {
		this.in_company_id = in_company_id;
	}

	public String[] getIn_sales_project_code() {
		return in_sales_project_code;
	}

	public void setIn_sales_project_code(String[] in_sales_project_code) {
		this.in_sales_project_code = in_sales_project_code;
	}

	public String[] getIn_stock_yn() {
		return in_stock_yn;
	}

	public void setIn_stock_yn(String[] in_stock_yn) {
		this.in_stock_yn = in_stock_yn;
	}

	public String[] getIn_sales_record_id() {
		return in_sales_record_id;
	}

	public void setIn_sales_record_id(String[] in_sales_record_id) {
		this.in_sales_record_id = in_sales_record_id;
	}

	public String[] getIn_sales_gb() {
		return in_sales_gb;
	}

	public void setIn_sales_gb(String[] in_sales_gb) {
		this.in_sales_gb = in_sales_gb;
	}

	public String[] getIn_model() {
		return in_model;
	}

	public void setIn_model(String[] in_model) {
		this.in_model = in_model;
	}

	public String[] getIn_des_start_day() {
		return in_des_start_day;
	}

	public void setIn_des_start_day(String[] in_des_start_day) {
		this.in_des_start_day = in_des_start_day;
	}

	public String[] getIn_des_end_day() {
		return in_des_end_day;
	}

	public void setIn_des_end_day(String[] in_des_end_day) {
		this.in_des_end_day = in_des_end_day;
	}

	public String[] getIn_qty() {
		return in_qty;
	}

	public void setIn_qty(String[] in_qty) {
		this.in_qty = in_qty;
	}

	public String[] getIn_list_price() {
		return in_list_price;
	}

	public void setIn_list_price(String[] in_list_price) {
		this.in_list_price = in_list_price;
	}

	public String[] getIn_sales_unit_price() {
		return in_sales_unit_price;
	}

	public void setIn_sales_unit_price(String[] in_sales_unit_price) {
		this.in_sales_unit_price = in_sales_unit_price;
	}

	public String[] getIn_sales_price() {
		return in_sales_price;
	}

	public void setIn_sales_price(String[] in_sales_price) {
		this.in_sales_price = in_sales_price;
	}

	public String[] getIn_sales_dc() {
		return in_sales_dc;
	}

	public void setIn_sales_dc(String[] in_sales_dc) {
		this.in_sales_dc = in_sales_dc;
	}

	public String[] getIn_purchase_unit_price() {
		return in_purchase_unit_price;
	}

	public void setIn_purchase_unit_price(String[] in_purchase_unit_price) {
		this.in_purchase_unit_price = in_purchase_unit_price;
	}

	public String[] getIn_purchase_price() {
		return in_purchase_price;
	}

	public void setIn_purchase_price(String[] in_purchase_price) {
		this.in_purchase_price = in_purchase_price;
	}

	public String[] getIn_purchase_dc() {
		return in_purchase_dc;
	}

	public void setIn_purchase_dc(String[] in_purchase_dc) {
		this.in_purchase_dc = in_purchase_dc;
	}

	public String[] getIn_supplier() {
		return in_supplier;
	}

	public void setIn_supplier(String[] in_supplier) {
		this.in_supplier = in_supplier;
	}

	public String[] getIn_purchase_pay_code() {
		return in_purchase_pay_code;
	}

	public void setIn_purchase_pay_code(String[] in_purchase_pay_code) {
		this.in_purchase_pay_code = in_purchase_pay_code;
	}

	public String[] getIn_purchase_pay_method() {
		return in_purchase_pay_method;
	}

	public void setIn_purchase_pay_method(String[] in_purchase_pay_method) {
		this.in_purchase_pay_method = in_purchase_pay_method;
	}

	public String[] getIn_invoice_id() {
		return in_invoice_id;
	}

	public void setIn_invoice_id(String[] in_invoice_id) {
		this.in_invoice_id = in_invoice_id;
	}

	public String[] getIn_invoice_name() {
		return in_invoice_name;
	}

	public void setIn_invoice_name(String[] in_invoice_name) {
		this.in_invoice_name = in_invoice_name;
	}

	public String[] getIn_checked() {
		return in_checked;
	}

	public void setIn_checked(String[] in_checked) {
		this.in_checked = in_checked;
	}

	public String[] getIn_split() {
		return in_split;
	}

	public void setIn_split(String[] in_split) {
		this.in_split = in_split;
	}

	public String[] getIn_issued() {
		return in_issued;
	}

	public void setIn_issued(String[] in_issued) {
		this.in_issued = in_issued;
	}

	public String[] getIn_method() {
		return in_method;
	}

	public void setIn_method(String[] in_method) {
		this.in_method = in_method;
	}

	public String[] getIn_price() {
		return in_price;
	}

	public void setIn_price(String[] in_price) {
		this.in_price = in_price;
	}

	public String[] getIn_payment_requisite_content() {
		return in_payment_requisite_content;
	}

	public void setIn_payment_requisite_content(
			String[] in_payment_requisite_content) {
		this.in_payment_requisite_content = in_payment_requisite_content;
	}

	public String[] getIn_contract_number() {
		return in_contract_number;
	}

	public void setIn_contract_number(String[] in_contract_number) {
		this.in_contract_number = in_contract_number;
	}

	public String[] getIn_buy_invoice_id() {
		return in_buy_invoice_id;
	}

	public void setIn_buy_invoice_id(String[] in_buy_invoice_id) {
		this.in_buy_invoice_id = in_buy_invoice_id;
	}

	public String[] getIn_buy_invoice_name() {
		return in_buy_invoice_name;
	}

	public void setIn_buy_invoice_name(String[] in_buy_invoice_name) {
		this.in_buy_invoice_name = in_buy_invoice_name;
	}

	public String[] getIn_buy_checked() {
		return in_buy_checked;
	}

	public void setIn_buy_checked(String[] in_buy_checked) {
		this.in_buy_checked = in_buy_checked;
	}

	public String[] getIn_buy_split() {
		return in_buy_split;
	}

	public void setIn_buy_split(String[] in_buy_split) {
		this.in_buy_split = in_buy_split;
	}

	public String[] getIn_buy_issued() {
		return in_buy_issued;
	}

	public void setIn_buy_issued(String[] in_buy_issued) {
		this.in_buy_issued = in_buy_issued;
	}

	public String[] getIn_buy_method() {
		return in_buy_method;
	}

	public void setIn_buy_method(String[] in_buy_method) {
		this.in_buy_method = in_buy_method;
	}

	public String[] getIn_buy_price() {
		return in_buy_price;
	}

	public void setIn_buy_price(String[] in_buy_price) {
		this.in_buy_price = in_buy_price;
	}

	public String[] getIn_buy_payment_requisite_content() {
		return in_buy_payment_requisite_content;
	}

	public void setIn_buy_payment_requisite_content(
			String[] in_buy_payment_requisite_content) {
		this.in_buy_payment_requisite_content = in_buy_payment_requisite_content;
	}

	public String[] getIn_buy_contract_number() {
		return in_buy_contract_number;
	}

	public void setIn_buy_contract_number(String[] in_buy_contract_number) {
		this.in_buy_contract_number = in_buy_contract_number;
	}

	public String getInvoice_content() {
		return invoice_content;
	}

	public void setInvoice_content(String invoice_content) {
		this.invoice_content = invoice_content;
	}

	public String getBuy_invoice_content() {
		return buy_invoice_content;
	}

	public void setBuy_invoice_content(String buy_invoice_content) {
		this.buy_invoice_content = buy_invoice_content;
	}

	public String[] getIn_prd_revision() {
		return in_prd_revision;
	}

	public void setIn_prd_revision(String[] in_prd_revision) {
		this.in_prd_revision = in_prd_revision;
	}

	public String[] getIn_alc_prd_revision() {
		return in_alc_prd_revision;
	}

	public void setIn_alc_prd_revision(String[] in_alc_prd_revision) {
		this.in_alc_prd_revision = in_alc_prd_revision;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}