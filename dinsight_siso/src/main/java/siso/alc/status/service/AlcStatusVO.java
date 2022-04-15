package siso.alc.status.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : AlcStatusVO.java
 * @Description : AlcStatusVO Class
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
public class AlcStatusVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 고객사_아이디(검색) */
	private String sh_company_id = "";
		
	/** 계약번호 키값(검색) */
	private String sh_contract_number_id = "";
	
	/** 영업담당(검색) */
	private String sh_sales_customer = "";
	
	/** 년도(검색) */
	private String sh_year = "";
	
	/** License Date 년도(검색) */
	private String sh_license_year = "";
	
	/** License Date 월(검색) */
	private String sh_license_month = "";
	
	/** License Date 년월(검색) */
	private String sh_license_ym = "";
	
	
	/** alc_id */
	private String alc_id;
	
	/** alc_년도 */
	private String alc_year;
	
	/** 고객사_아이디 */
	private String company_id;
	
	/** 고객사_명 */
	private String company_name;
	
	/** 계약번호 키값 */
	private String contract_number_id;
	
	/** 프로젝트 코드 */
	private String sales_project_code;
	
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
	
	/** stock_여부 코드 */
	private String stock_yn;
	
	/** stock_여부 명 */
	private String stock_nm;
	
	/** 사업장 */
	private String place_of_business;
	
	/** 설치사_id */
	private String install_company_id;
	
	/** 설치사 명 */
	private String install_company_name;
	
	/** 설치사동일여부 */
	private String install_identical_yn;
	
	/** 설치일 */
	private String install_day;
	
	/** 발주일 */
	private String ordering_day;
	
	/** 발주기간동일여부 */
	private String ordering_identical_yn;

	/** Target_Id */
	private String target_id;
	
	/** license_start_day */
	private String license_start_day;
	
	/** license_end_day */
	private String license_end_day;
	
	/** 최종_변동_alc_아이디 */
	private String max_chg_alc_id;

	/** 견적일 */
	private String invoice_day;
	
	/** 정가 */
	private String list_price;
	
	/** 견적가 */
	private String estimated_cost;
	
	/** 수금일 */
	private String collect_money_day;
	
	/** 수금 */
	private String collect_money;
	
	/** 구매동의 코드 */
	private String purchase_agreement_yn;
	
	/** 구매동의 명 */
	private String purchase_agreement_nm;
	
	/** 구매동의 명 */
	private String contract_project_code_id;
	
	/** 구매동의 명 */
	private String contract_project_code_nm;
	
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

	public String getSh_company_id() {
		return sh_company_id;
	}

	public void setSh_company_id(String sh_company_id) {
		this.sh_company_id = sh_company_id;
	}

	public String getSh_contract_number_id() {
		return sh_contract_number_id;
	}

	public void setSh_contract_number_id(String sh_contract_number_id) {
		this.sh_contract_number_id = sh_contract_number_id;
	}

	public String getSh_sales_customer() {
		return sh_sales_customer;
	}

	public void setSh_sales_customer(String sh_sales_customer) {
		this.sh_sales_customer = sh_sales_customer;
	}

	public String getSh_year() {
		return sh_year;
	}

	public void setSh_year(String sh_year) {
		this.sh_year = sh_year;
	}

	public String getSh_license_year() {
		return sh_license_year;
	}

	public void setSh_license_year(String sh_license_year) {
		this.sh_license_year = sh_license_year;
	}

	public String getSh_license_month() {
		return sh_license_month;
	}

	public void setSh_license_month(String sh_license_month) {
		this.sh_license_month = sh_license_month;
	}

	public String getSh_license_ym() {
		return sh_license_ym;
	}

	public void setSh_license_ym(String sh_license_ym) {
		this.sh_license_ym = sh_license_ym;
	}

	public String getAlc_id() {
		return alc_id;
	}

	public void setAlc_id(String alc_id) {
		this.alc_id = alc_id;
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

	public String getContract_number_id() {
		return contract_number_id;
	}

	public void setContract_number_id(String contract_number_id) {
		this.contract_number_id = contract_number_id;
	}

	public String getSales_project_code() {
		return sales_project_code;
	}

	public void setSales_project_code(String sales_project_code) {
		this.sales_project_code = sales_project_code;
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

	public String getPlace_of_business() {
		return place_of_business;
	}

	public void setPlace_of_business(String place_of_business) {
		this.place_of_business = place_of_business;
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

	public String getInstall_identical_yn() {
		return install_identical_yn;
	}

	public void setInstall_identical_yn(String install_identical_yn) {
		this.install_identical_yn = install_identical_yn;
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

	public String getOrdering_identical_yn() {
		return ordering_identical_yn;
	}

	public void setOrdering_identical_yn(String ordering_identical_yn) {
		this.ordering_identical_yn = ordering_identical_yn;
	}

	public String getTarget_id() {
		return target_id;
	}

	public void setTarget_id(String target_id) {
		this.target_id = target_id;
	}

	public String getLicense_start_day() {
		return license_start_day;
	}

	public void setLicense_start_day(String license_start_day) {
		this.license_start_day = license_start_day;
	}

	public String getLicense_end_day() {
		return license_end_day;
	}

	public void setLicense_end_day(String license_end_day) {
		this.license_end_day = license_end_day;
	}

	public String getMax_chg_alc_id() {
		return max_chg_alc_id;
	}

	public void setMax_chg_alc_id(String max_chg_alc_id) {
		this.max_chg_alc_id = max_chg_alc_id;
	}

	public String getInvoice_day() {
		return invoice_day;
	}

	public void setInvoice_day(String invoice_day) {
		this.invoice_day = invoice_day;
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

	public String getCollect_money_day() {
		return collect_money_day;
	}

	public void setCollect_money_day(String collect_money_day) {
		this.collect_money_day = collect_money_day;
	}

	public String getCollect_money() {
		return collect_money;
	}

	public void setCollect_money(String collect_money) {
		this.collect_money = collect_money;
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

	public String getContract_project_code_id() {
		return contract_project_code_id;
	}

	public void setContract_project_code_id(String contract_project_code_id) {
		this.contract_project_code_id = contract_project_code_id;
	}

	public String getContract_project_code_nm() {
		return contract_project_code_nm;
	}

	public void setContract_project_code_nm(String contract_project_code_nm) {
		this.contract_project_code_nm = contract_project_code_nm;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}