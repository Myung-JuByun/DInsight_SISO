package siso.sam.fcasting.service;
import java.io.Serializable;
import java.util.List;

import siso.cmmn.ComDefaultVO;

/**
 *  클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------       --------    ---------------------------
 *   2009.3.11   이삼섭          최초 생성
 *
 * </pre>
 */
@SuppressWarnings("serial")
public class ForeCastingVO extends ComDefaultVO implements Serializable {
	private String sales_id;
	private String sales_project_id;
	private String sales_ym;
	private String sales_yy;
	private String sales_mm;
	private String sales_week;
	private String sales_divide_cd;
	private String issue_yn;
	private String report_item;
	private String qty;
	private String contract_ym;
	private String sales_status_cd;
	private String sales_type_cd;
	private String contract_price;
	private String cost_price;
	private String profit_price;
	
    private String user_id;
	private String brand_cd;
    private String sales_project_code;
    private String module;
    private String sales_divide_name;
    private String sales_status_name;
    private String sales_type_name;
    private String brand_name;
    private String user_name;
    private String company_id;
    
    
    private String[] in_sales_id;
	private String[] in_sales_project_id;
    private String[] in_sales_ym;
    private String[] in_sales_yy;
	private String[] in_sales_mm;
    private String[] in_sales_week;
    private String[] in_sales_divide_cd;
    private String[] in_issue_yn;
    private String[] in_report_item;
    private String[] in_qty;
    private String[] in_contract_ym;    
    private String[] in_sales_status_cd;
    private String[] in_sales_type_cd;  
    private String[] in_contract_price; 
    private String[] in_cost_price;     
    private String[] in_profit_price;   
    private String[] in_user_id;
    
	public String[] getIn_user_id() {
		return in_user_id;
	}
	public void setIn_user_id(String[] in_user_id) {
		this.in_user_id = in_user_id;
	}
	private String company_name;
	private String copy_sales_ym;
	private String copy_sales_mm;
	private String user_role_id;
	
	private String copy_sales_week;
	private String now_sales_ym;
	private String now_sales_week;
	private String now_ymd;
	
	/** 하위 부서 정보 */
	private List<String> division_child_list;
	
	public List<String> getDivision_child_list() {
		return division_child_list;
	}
	public void setDivision_child_list(List<String> division_child_list) {
		this.division_child_list = division_child_list;
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
	public String getSales_yy() {
		return sales_yy;
	}
	public void setSales_yy(String sales_yy) {
		this.sales_yy = sales_yy;
	}
	public String getSales_mm() {
		return sales_mm;
	}
	public void setSales_mm(String sales_mm) {
		this.sales_mm = sales_mm;
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
	public String getSales_status_cd() {
		return sales_status_cd;
	}
	public void setSales_status_cd(String sales_status_cd) {
		this.sales_status_cd = sales_status_cd;
	}
	public String getSales_type_cd() {
		return sales_type_cd;
	}
	public void setSales_type_cd(String sales_type_cd) {
		this.sales_type_cd = sales_type_cd;
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
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getBrand_cd() {
		return brand_cd;
	}
	public void setBrand_cd(String brand_cd) {
		this.brand_cd = brand_cd;
	}
	public String getSales_project_code() {
		return sales_project_code;
	}
	public void setSales_project_code(String sales_project_code) {
		this.sales_project_code = sales_project_code;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getSales_divide_name() {
		return sales_divide_name;
	}
	public void setSales_divide_name(String sales_divide_name) {
		this.sales_divide_name = sales_divide_name;
	}
	public String getSales_status_name() {
		return sales_status_name;
	}
	public void setSales_status_name(String sales_status_name) {
		this.sales_status_name = sales_status_name;
	}
	public String getSales_type_name() {
		return sales_type_name;
	}
	public void setSales_type_name(String sales_type_name) {
		this.sales_type_name = sales_type_name;
	}
	public String getBrand_name() {
		return brand_name;
	}
	public void setBrand_name(String brand_name) {
		this.brand_name = brand_name;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}
	public String[] getIn_sales_id() {
		return in_sales_id;
	}
	public void setIn_sales_id(String[] in_sales_id) {
		this.in_sales_id = in_sales_id;
	}
	public String[] getIn_sales_project_id() {
		return in_sales_project_id;
	}
	public void setIn_sales_project_id(String[] in_sales_project_id) {
		this.in_sales_project_id = in_sales_project_id;
	}
	public String[] getIn_sales_ym() {
		return in_sales_ym;
	}
	public void setIn_sales_ym(String[] in_sales_ym) {
		this.in_sales_ym = in_sales_ym;
	}
	public String[] getIn_sales_yy() {
		return in_sales_yy;
	}
	public void setIn_sales_yy(String[] in_sales_yy) {
		this.in_sales_yy = in_sales_yy;
	}
	public String[] getIn_sales_mm() {
		return in_sales_mm;
	}
	public void setIn_sales_mm(String[] in_sales_mm) {
		this.in_sales_mm = in_sales_mm;
	}
	public String[] getIn_sales_week() {
		return in_sales_week;
	}
	public void setIn_sales_week(String[] in_sales_week) {
		this.in_sales_week = in_sales_week;
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
	public String[] getIn_report_item() {
		return in_report_item;
	}
	public void setIn_report_item(String[] in_report_item) {
		this.in_report_item = in_report_item;
	}
	public String[] getIn_qty() {
		return in_qty;
	}
	public void setIn_qty(String[] in_qty) {
		this.in_qty = in_qty;
	}
	public String[] getIn_contract_ym() {
		return in_contract_ym;
	}
	public void setIn_contract_ym(String[] in_contract_ym) {
		this.in_contract_ym = in_contract_ym;
	}
	public String[] getIn_sales_status_cd() {
		return in_sales_status_cd;
	}
	public void setIn_sales_status_cd(String[] in_sales_status_cd) {
		this.in_sales_status_cd = in_sales_status_cd;
	}
	public String[] getIn_sales_type_cd() {
		return in_sales_type_cd;
	}
	public void setIn_sales_type_cd(String[] in_sales_type_cd) {
		this.in_sales_type_cd = in_sales_type_cd;
	}
	public String[] getIn_contract_price() {
		return in_contract_price;
	}
	public void setIn_contract_price(String[] in_contract_price) {
		this.in_contract_price = in_contract_price;
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
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getCopy_sales_ym() {
		return copy_sales_ym;
	}
	public void setCopy_sales_ym(String copy_sales_ym) {
		this.copy_sales_ym = copy_sales_ym;
	}
	public String getCopy_sales_mm() {
		return copy_sales_mm;
	}
	public void setCopy_sales_mm(String copy_sales_mm) {
		this.copy_sales_mm = copy_sales_mm;
	}
	public String getUser_role_id() {
		return user_role_id;
	}
	public void setUser_role_id(String user_role_id) {
		this.user_role_id = user_role_id;
	}
	public String getCopy_sales_week() {
		return copy_sales_week;
	}
	public void setCopy_sales_week(String copy_sales_week) {
		this.copy_sales_week = copy_sales_week;
	}
	public String getNow_sales_ym() {
		return now_sales_ym;
	}
	public void setNow_sales_ym(String now_sales_ym) {
		this.now_sales_ym = now_sales_ym;
	}
	public String getNow_sales_week() {
		return now_sales_week;
	}
	public void setNow_sales_week(String now_sales_week) {
		this.now_sales_week = now_sales_week;
	}
	public String getNow_ymd() {
		return now_ymd;
	}
	public void setNow_ymd(String now_ymd) {
		this.now_ymd = now_ymd;
	}
}
