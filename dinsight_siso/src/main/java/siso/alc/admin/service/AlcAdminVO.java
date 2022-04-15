package siso.alc.admin.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : AlcAdminVO.java
 * @Description : AlcAdminVO Class
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
public class AlcAdminVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년도(검색) */
	private String sh_year = "";
	
	/** 월(검색) */
	private String sh_month = "";
	
	/** 영업담당(검색) */
	private String sh_sales_customer = "";
	
	/** 고객사_아이디(검색) */
	private String sh_company_id = "";
	
	/** 사업장(검색) */
	private String sh_place_of_business = "";
	
	
	/** chg_alc_아이디 */
	private String chg_alc_id;
	
    /** alc_아이디 */
	private Integer alc_id;
	
	/** code_id */
	private String code_id;
		
	/** alc_년도 */
	private String alc_year;
	
	/** 고객사_아이디 */
	private String company_id;
	
	/** 고객사_명 */
	private String company_name;
	
	/** 사업장 */
	private String place_of_business;
	
	/** 사업장 명 */
	private String code_name;
	
	/** 영업담당 */
	private String sales_customer;
	
	/** 영업담당 명 */
	private String user_name;
	
	/** 상표 */
	private String portfolio;
	
	/** 제품번호 */
	private String prd_number;
	
	/** 유형 */
	private String prd_type;
	
	/** 모듈 */
	private String trigram;
	
	/** 상표명 */
	private String portfolio_item_name;
	
	/** prd_revision */
	private String prd_revision;
	
	/** 수량 */
	private String qty;
	
	/** 수량 */
	private String sub_qty;
	
	/** 설치사동일여부 */
	private String install_identical_yn;
	
	/** 발주일 */
	private String 	ordering_day;
	
	/** 발주_시작일 */
	private String ordering_start_day;
	
	/** 발주_종료일 */
	private String ordering_end_day;
	
	/** 발주기간동일여부 */
	private String ordering_identical_yn;

	/** 설치사_id */
	private String install_company_id;

	/** 설치사명 */
	private String install_company_name;
	
	/** 설치일 */
	private String install_day;
	
	/** 설치_시작일 */
	private String install_start_day;
	
	/** 설치_종료일 */
	private String install_end_day;
	
	/** Target_Id */
	private String target_id;	
	
	/** license_date */
	private String license_date;
		
	/** 정가 */
	private String list_price;

	/** 견적가 */
	private String estimated_cost;		
	
	/** purchase_date */
	private String purchase_date;
	
	/** collect_money */
	private String collect_money;
	
	/** destruction_yn */
	private String destruction_yn;
	
	/** 견적일 */
	private String invoice_day;
	
	/** 견적서_시작일 */
	private String invoice_start_day;
	
	/** 견적서_종료일 */
	private String invoice_end_day;
	
	/** 계약일*/
	private String contract_day;
	
	/** 계약서_시작일 */
	private String contract_start_day;
	
	/** 계약서_종료일 */
	private String contract_end_day;
	
	/** 세금계산서_id */
	private String quote_id;
	
	/** invoice_id */
	private String invoice_id;
	
	/** 구매동의 코드 */
	private String purchase_agreement_yn;
	
	/** 구매동의 명 */
	private String purchase_agreement_nm;
	
	/** creation_date */
	private String creation_date;
		
	/** 세금계산서명 */
	private String quote_name;
	
	/** 세금계산서 파일ID */
	private String quote_file_id;
	
	/** 세금계산서 파일명 */
	private String quote_file_name;
	
	/** 세금계산서 파일PATH */
	private String quote_file_path;
	
	/** 세금계산서 차수 */
	private String quote_rivision;
	
	/** 세금계산서 파일유무 코드 */
	private String quote_file_yn;
	
	/** 세금계산서 파일유무 명 */
	private String quote_file_nm;
	
	/** 계약서 ID */
	private String contract_id;
	
	/** 계약서 명 */
	private String contract_name;
	
	/** 계약서 파일명 */
	private String contract_file_name;
	
	/** 계약서 파일ID */
	private String contract_file_id;
	
	/** 계약서 파일PATH */
	private String contract_file_path;
	
	/** 계약서 차수 */
	private String contract_rivision;
	
	/** 계약서 파일유무 코드*/
	private String contract_file_yn;
	
	/** 계약서 파일유무 명 */
	private String contract_file_nm;
	
	/** stock_여부 코드 */
	private String stock_yn;
	
	/** stock_여부 명 */
	private String stock_nm;
	
	/** 최종_변동_alc_아이디 */
	private String max_chg_alc_id;
	
	/** 삭제유무 */
	private String delete_yn;
	
	/** alc*/
	private String alc;
	
	/** plc*/
	private String plc;
	
	/** qlc_list_price*/
	private String qlc_list_price;
	
	/** qlc_list_price */
	private String ylc_list_price;	
	
	/** 설치사id */
	private String[] in_install_company_id;
		
	/** Copy */
	private String[] in_qty;
	
	/** Copy */
	private String[] in_sub_qty;
	
	/** 발주일*/
	private String[] in_ordering_day;
	
	/** 발주기간 시작일 */
	private String[] in_ordering_start_day;
	
	/** 발주기간 종료일 */
	private String[] in_ordering_end_day;
	
	/** 발주기간 동일여부*/
	private String[] in_ordering_identical_yn;
	
	/** 설치일 */
	private String[] in_install_day;
	
	/** 설치기간 시작일 */
	private String[] in_install_start_day;
	
	/** 설치기간 종류일 */
	private String[] in_install_end_day;
	
	/** Target Id */
	private String[] in_target_id;
	
	/** License Date */
	private String[] in_license_date;
	
	/** list_price */
	private String[] in_list_price;

	/** estimated_cost */
	private String[] in_estimated_cost;		
	
	/** purchase_date */
	private String[] in_purchase_date;
	
	/** collect_money */
	private String[] in_collect_money;
	
	/** 견적일*/
	private String[] in_invoice_day;
	
	/** 세금계산 시작일 */
	private String[] in_invoice_start_day;
	
	/** 세금계산 종료일 */
	private String[] in_invoice_end_day;
	
	/** 계약일*/
	private String[] in_contract_day;
	
	/** 계약서_시작일 */
	private String[] in_contract_start_day;
	
	/** 계약서_종료일 */
	private String[] in_contract_end_day;
	
	/** 세금계산서 id */
	private String[] in_quote_id;
	
	/** 계약서 ID */
	private String[] in_contract_id;
	
	/** Stock */
	private String[] in_stock_yn;
	
	/** 구매동의 */
	private String[] in_purchase_agreement_yn;

	/** 견적서, 계약서 키값 */
	private String id;
	
	/** 견적서, 계약서 제목 */
	private String name;
	
	/** 견적서, 계약서 키값 첨부파일 명 */
	private String file_name;
	
	/** 견적서, 계약서 키값 첨부파일 키값 */
	private String file_id;
	
	/** 견적서, 계약서 키값 첨부파일 경로 */
	private String file_path;
	
	/** 견적서, 계약서 키값 리비전 */
	private String rivision;
	
	/** 리비전 */
	private String revision;

	public String getSh_year() {
		return sh_year;
	}

	public void setSh_year(String sh_year) {
		this.sh_year = sh_year;
	}

	public String getSh_month() {
		return sh_month;
	}

	public void setSh_month(String sh_month) {
		this.sh_month = sh_month;
	}

	public String getSh_sales_customer() {
		return sh_sales_customer;
	}

	public void setSh_sales_customer(String sh_sales_customer) {
		this.sh_sales_customer = sh_sales_customer;
	}

	public String getSh_company_id() {
		return sh_company_id;
	}

	public void setSh_company_id(String sh_company_id) {
		this.sh_company_id = sh_company_id;
	}

	public String getSh_place_of_business() {
		return sh_place_of_business;
	}

	public void setSh_place_of_business(String sh_place_of_business) {
		this.sh_place_of_business = sh_place_of_business;
	}

	public String getChg_alc_id() {
		return chg_alc_id;
	}

	public void setChg_alc_id(String chg_alc_id) {
		this.chg_alc_id = chg_alc_id;
	}

	public Integer getAlc_id() {
		return alc_id;
	}

	public void setAlc_id(Integer alc_id) {
		this.alc_id = alc_id;
	}

	public String getCode_id() {
		return code_id;
	}

	public void setCode_id(String code_id) {
		this.code_id = code_id;
	}
	
	public String getAlc_year() {
		return alc_year;
	}

	public void setAlc_year(String alc_year) {
		this.alc_year = alc_year;
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

	public String getPlace_of_business() {
		return place_of_business;
	}

	public void setPlace_of_business(String place_of_business) {
		this.place_of_business = place_of_business;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public String getSales_customer() {
		return sales_customer;
	}

	public void setSales_customer(String sales_customer) {
		this.sales_customer = sales_customer;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
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

	public String getPortfolio_item_name() {
		return portfolio_item_name;
	}

	public void setPortfolio_item_name(String portfolio_item_name) {
		this.portfolio_item_name = portfolio_item_name;
	}

	public String getPrd_revision() {
		return prd_revision;
	}

	public void setPrd_revision(String prd_revision) {
		this.prd_revision = prd_revision;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getSub_qty() {
		return sub_qty;
	}

	public void setSub_qty(String sub_qty) {
		this.sub_qty = sub_qty;
	}

	public String getInstall_identical_yn() {
		return install_identical_yn;
	}

	public void setInstall_identical_yn(String install_identical_yn) {
		this.install_identical_yn = install_identical_yn;
	}

	public String getOrdering_day() {
		return ordering_day;
	}

	public void setOrdering_day(String ordering_day) {
		this.ordering_day = ordering_day;
	}

	public String getOrdering_start_day() {
		return ordering_start_day;
	}

	public void setOrdering_start_day(String ordering_start_day) {
		this.ordering_start_day = ordering_start_day;
	}

	public String getOrdering_end_day() {
		return ordering_end_day;
	}

	public void setOrdering_end_day(String ordering_end_day) {
		this.ordering_end_day = ordering_end_day;
	}

	public String getOrdering_identical_yn() {
		return ordering_identical_yn;
	}

	public void setOrdering_identical_yn(String ordering_identical_yn) {
		this.ordering_identical_yn = ordering_identical_yn;
	}

	public String getInstall_company_id() {
		return install_company_id;
	}

	public void setInstall_company_id(String install_company_id) {
		this.install_company_id = install_company_id;
	}

	public String getInstall_company_name() {
		return install_company_name;
	}

	public void setInstall_company_name(String install_company_name) {
		this.install_company_name = install_company_name;
	}

	public String getInstall_day() {
		return install_day;
	}

	public void setInstall_day(String install_day) {
		this.install_day = install_day;
	}

	public String getInstall_start_day() {
		return install_start_day;
	}

	public void setInstall_start_day(String install_start_day) {
		this.install_start_day = install_start_day;
	}

	public String getInstall_end_day() {
		return install_end_day;
	}

	public void setInstall_end_day(String install_end_day) {
		this.install_end_day = install_end_day;
	}

	public String getTarget_id() {
		return target_id;
	}

	public void setTarget_id(String target_id) {
		this.target_id = target_id;
	}

	public String getLicense_date() {
		return license_date;
	}

	public void setLicense_date(String license_date) {
		this.license_date = license_date;
	}

	public String getList_price() {
		return list_price;
	}

	public void setList_price(String list_price) {
		this.list_price = list_price;
	}

	public String getEstimated_cost() {
		return estimated_cost;
	}

	public void setEstimated_cost(String estimated_cost) {
		this.estimated_cost = estimated_cost;
	}

	public String getPurchase_date() {
		return purchase_date;
	}

	public void setPurchase_date(String purchase_date) {
		this.purchase_date = purchase_date;
	}

	public String getCollect_money() {
		return collect_money;
	}

	public void setCollect_money(String collect_money) {
		this.collect_money = collect_money;
	}

	public String getDestruction_yn() {
		return destruction_yn;
	}

	public void setDestruction_yn(String destruction_yn) {
		this.destruction_yn = destruction_yn;
	}

	public String getInvoice_day() {
		return invoice_day;
	}

	public void setInvoice_day(String invoice_day) {
		this.invoice_day = invoice_day;
	}

	public String getInvoice_start_day() {
		return invoice_start_day;
	}

	public void setInvoice_start_day(String invoice_start_day) {
		this.invoice_start_day = invoice_start_day;
	}

	public String getInvoice_end_day() {
		return invoice_end_day;
	}

	public void setInvoice_end_day(String invoice_end_day) {
		this.invoice_end_day = invoice_end_day;
	}

	public String getContract_day() {
		return contract_day;
	}

	public void setContract_day(String contract_day) {
		this.contract_day = contract_day;
	}

	public String getContract_start_day() {
		return contract_start_day;
	}

	public void setContract_start_day(String contract_start_day) {
		this.contract_start_day = contract_start_day;
	}

	public String getContract_end_day() {
		return contract_end_day;
	}

	public void setContract_end_day(String contract_end_day) {
		this.contract_end_day = contract_end_day;
	}

	public String getQuote_id() {
		return quote_id;
	}

	public void setQuote_id(String quote_id) {
		this.quote_id = quote_id;
	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

	public String getPurchase_agreement_yn() {
		return purchase_agreement_yn;
	}

	public void setPurchase_agreement_yn(String purchase_agreement_yn) {
		this.purchase_agreement_yn = purchase_agreement_yn;
	}

	public String getPurchase_agreement_nm() {
		return purchase_agreement_nm;
	}

	public void setPurchase_agreement_nm(String purchase_agreement_nm) {
		this.purchase_agreement_nm = purchase_agreement_nm;
	}

	public String getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}

	public String getQuote_name() {
		return quote_name;
	}

	public void setQuote_name(String quote_name) {
		this.quote_name = quote_name;
	}

	public String getQuote_file_id() {
		return quote_file_id;
	}

	public void setQuote_file_id(String quote_file_id) {
		this.quote_file_id = quote_file_id;
	}

	public String getQuote_file_name() {
		return quote_file_name;
	}

	public void setQuote_file_name(String quote_file_name) {
		this.quote_file_name = quote_file_name;
	}

	public String getQuote_file_path() {
		return quote_file_path;
	}

	public void setQuote_file_path(String quote_file_path) {
		this.quote_file_path = quote_file_path;
	}

	public String getQuote_rivision() {
		return quote_rivision;
	}

	public void setQuote_rivision(String quote_rivision) {
		this.quote_rivision = quote_rivision;
	}

	public String getQuote_file_yn() {
		return quote_file_yn;
	}

	public void setQuote_file_yn(String quote_file_yn) {
		this.quote_file_yn = quote_file_yn;
	}

	public String getQuote_file_nm() {
		return quote_file_nm;
	}

	public void setQuote_file_nm(String quote_file_nm) {
		this.quote_file_nm = quote_file_nm;
	}

	public String getContract_id() {
		return contract_id;
	}

	public void setContract_id(String contract_id) {
		this.contract_id = contract_id;
	}

	public String getContract_name() {
		return contract_name;
	}

	public void setContract_name(String contract_name) {
		this.contract_name = contract_name;
	}

	public String getContract_file_name() {
		return contract_file_name;
	}

	public void setContract_file_name(String contract_file_name) {
		this.contract_file_name = contract_file_name;
	}

	public String getContract_file_id() {
		return contract_file_id;
	}

	public void setContract_file_id(String contract_file_id) {
		this.contract_file_id = contract_file_id;
	}

	public String getContract_file_path() {
		return contract_file_path;
	}

	public void setContract_file_path(String contract_file_path) {
		this.contract_file_path = contract_file_path;
	}

	public String getContract_rivision() {
		return contract_rivision;
	}

	public void setContract_rivision(String contract_rivision) {
		this.contract_rivision = contract_rivision;
	}

	public String getContract_file_yn() {
		return contract_file_yn;
	}

	public void setContract_file_yn(String contract_file_yn) {
		this.contract_file_yn = contract_file_yn;
	}

	public String getContract_file_nm() {
		return contract_file_nm;
	}

	public void setContract_file_nm(String contract_file_nm) {
		this.contract_file_nm = contract_file_nm;
	}

	public String getStock_yn() {
		return stock_yn;
	}

	public void setStock_yn(String stock_yn) {
		this.stock_yn = stock_yn;
	}

	public String getStock_nm() {
		return stock_nm;
	}

	public void setStock_nm(String stock_nm) {
		this.stock_nm = stock_nm;
	}

	public String getMax_chg_alc_id() {
		return max_chg_alc_id;
	}

	public void setMax_chg_alc_id(String max_chg_alc_id) {
		this.max_chg_alc_id = max_chg_alc_id;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getAlc() {
		return alc;
	}

	public void setAlc(String alc) {
		this.alc = alc;
	}

	public String getPlc() {
		return plc;
	}

	public void setPlc(String plc) {
		this.plc = plc;
	}

	public String getQlc_list_price() {
		return qlc_list_price;
	}

	public void setQlc_list_price(String qlc_list_price) {
		this.qlc_list_price = qlc_list_price;
	}

	public String getYlc_list_price() {
		return ylc_list_price;
	}

	public void setYlc_list_price(String ylc_list_price) {
		this.ylc_list_price = ylc_list_price;
	}

	public String[] getIn_install_company_id() {
		return in_install_company_id;
	}

	public void setIn_install_company_id(String[] in_install_company_id) {
		this.in_install_company_id = in_install_company_id;
	}

	public String[] getIn_qty() {
		return in_qty;
	}

	public void setIn_qty(String[] in_qty) {
		this.in_qty = in_qty;
	}

	public String[] getIn_sub_qty() {
		return in_sub_qty;
	}

	public void setIn_sub_qty(String[] in_sub_qty) {
		this.in_sub_qty = in_sub_qty;
	}

	public String[] getIn_ordering_day() {
		return in_ordering_day;
	}

	public void setIn_ordering_day(String[] in_ordering_day) {
		this.in_ordering_day = in_ordering_day;
	}

	public String[] getIn_ordering_start_day() {
		return in_ordering_start_day;
	}

	public void setIn_ordering_start_day(String[] in_ordering_start_day) {
		this.in_ordering_start_day = in_ordering_start_day;
	}

	public String[] getIn_ordering_end_day() {
		return in_ordering_end_day;
	}

	public void setIn_ordering_end_day(String[] in_ordering_end_day) {
		this.in_ordering_end_day = in_ordering_end_day;
	}

	public String[] getIn_ordering_identical_yn() {
		return in_ordering_identical_yn;
	}

	public void setIn_ordering_identical_yn(String[] in_ordering_identical_yn) {
		this.in_ordering_identical_yn = in_ordering_identical_yn;
	}

	public String[] getIn_install_day() {
		return in_install_day;
	}

	public void setIn_install_day(String[] in_install_day) {
		this.in_install_day = in_install_day;
	}

	public String[] getIn_install_start_day() {
		return in_install_start_day;
	}

	public void setIn_install_start_day(String[] in_install_start_day) {
		this.in_install_start_day = in_install_start_day;
	}

	public String[] getIn_install_end_day() {
		return in_install_end_day;
	}

	public void setIn_install_end_day(String[] in_install_end_day) {
		this.in_install_end_day = in_install_end_day;
	}

	public String[] getIn_target_id() {
		return in_target_id;
	}

	public void setIn_target_id(String[] in_target_id) {
		this.in_target_id = in_target_id;
	}

	public String[] getIn_license_date() {
		return in_license_date;
	}

	public void setIn_license_date(String[] in_license_date) {
		this.in_license_date = in_license_date;
	}

	public String[] getIn_list_price() {
		return in_list_price;
	}

	public void setIn_list_price(String[] in_list_price) {
		this.in_list_price = in_list_price;
	}

	public String[] getIn_estimated_cost() {
		return in_estimated_cost;
	}

	public void setIn_estimated_cost(String[] in_estimated_cost) {
		this.in_estimated_cost = in_estimated_cost;
	}

	public String[] getIn_purchase_date() {
		return in_purchase_date;
	}

	public void setIn_purchase_date(String[] in_purchase_date) {
		this.in_purchase_date = in_purchase_date;
	}

	public String[] getIn_collect_money() {
		return in_collect_money;
	}

	public void setIn_collect_money(String[] in_collect_money) {
		this.in_collect_money = in_collect_money;
	}

	public String[] getIn_invoice_day() {
		return in_invoice_day;
	}

	public void setIn_invoice_day(String[] in_invoice_day) {
		this.in_invoice_day = in_invoice_day;
	}

	public String[] getIn_invoice_start_day() {
		return in_invoice_start_day;
	}

	public void setIn_invoice_start_day(String[] in_invoice_start_day) {
		this.in_invoice_start_day = in_invoice_start_day;
	}

	public String[] getIn_invoice_end_day() {
		return in_invoice_end_day;
	}

	public void setIn_invoice_end_day(String[] in_invoice_end_day) {
		this.in_invoice_end_day = in_invoice_end_day;
	}

	public String[] getIn_contract_day() {
		return in_contract_day;
	}

	public void setIn_contract_day(String[] in_contract_day) {
		this.in_contract_day = in_contract_day;
	}

	public String[] getIn_contract_start_day() {
		return in_contract_start_day;
	}

	public void setIn_contract_start_day(String[] in_contract_start_day) {
		this.in_contract_start_day = in_contract_start_day;
	}

	public String[] getIn_contract_end_day() {
		return in_contract_end_day;
	}

	public void setIn_contract_end_day(String[] in_contract_end_day) {
		this.in_contract_end_day = in_contract_end_day;
	}

	public String[] getIn_quote_id() {
		return in_quote_id;
	}

	public void setIn_quote_id(String[] in_quote_id) {
		this.in_quote_id = in_quote_id;
	}

	public String[] getIn_contract_id() {
		return in_contract_id;
	}

	public void setIn_contract_id(String[] in_contract_id) {
		this.in_contract_id = in_contract_id;
	}

	public String[] getIn_stock_yn() {
		return in_stock_yn;
	}

	public void setIn_stock_yn(String[] in_stock_yn) {
		this.in_stock_yn = in_stock_yn;
	}

	public String[] getIn_purchase_agreement_yn() {
		return in_purchase_agreement_yn;
	}

	public void setIn_purchase_agreement_yn(String[] in_purchase_agreement_yn) {
		this.in_purchase_agreement_yn = in_purchase_agreement_yn;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFile_name() {
		return file_name;
	}

	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}

	public String getFile_id() {
		return file_id;
	}

	public void setFile_id(String file_id) {
		this.file_id = file_id;
	}

	public String getFile_path() {
		return file_path;
	}

	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}

	public String getRivision() {
		return rivision;
	}

	public void setRivision(String rivision) {
		this.rivision = rivision;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}