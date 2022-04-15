package siso.adm.support.service;

import java.util.List;
import java.util.Map;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : UserAdminVO.java
 * @Description : UserAdminVO Class
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
public class SupportSalesVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	private String sales_id               ;
	private String sales_day              ;
	private String sales_project_code_id  ;
	private String sales_project_code     ;
	private String sales_staff_id         ;
	private String sales_staff_name       ;
	private String sales_client_id        ;
	private String sales_client_name      ;
	private String item_name              ;
	private String item_div_code_id       ;
	private String item_div_name          ;
	private String sales_supply_price     ;
	private String sales_tax              ;
	private String sales_total_price      ;
	private String sales_GP               ;
	private String startDate			  ;
	private String endDate				  ;
	private String in_staff_name		  ;
	private String in_project_code		  ;
	
	private List<Map<String, Object>> salesList;
	
	public List<Map<String, Object>> getSalesList() {
		return salesList;
	}
	public void setSalesList(List<Map<String, Object>> salesList) {
		this.salesList = salesList;
	}
	public String getSales_id() {
		return sales_id;
	}
	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}
	public String getSales_day() {
		return sales_day;
	}
	public void setSales_day(String sales_day) {
		this.sales_day = sales_day;
	}
	public String getSales_project_code_id() {
		return sales_project_code_id;
	}
	public void setSales_project_code_id(String sales_project_code_id) {
		this.sales_project_code_id = sales_project_code_id;
	}
	public String getSales_project_code() {
		return sales_project_code;
	}
	public void setSales_project_code(String sales_project_code) {
		this.sales_project_code = sales_project_code;
	}
	public String getSales_staff_id() {
		return sales_staff_id;
	}
	public void setSales_staff_id(String sales_staff_id) {
		this.sales_staff_id = sales_staff_id;
	}
	public String getSales_staff_name() {
		return sales_staff_name;
	}
	public void setSales_staff_name(String sales_staff_name) {
		this.sales_staff_name = sales_staff_name;
	}
	public String getSales_client_id() {
		return sales_client_id;
	}
	public void setSales_client_id(String sales_client_id) {
		this.sales_client_id = sales_client_id;
	}
	public String getSales_client_name() {
		return sales_client_name;
	}
	public void setSales_client_name(String sales_client_name) {
		this.sales_client_name = sales_client_name;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getItem_div_code_id() {
		return item_div_code_id;
	}
	public void setItem_div_code_id(String item_div_code_id) {
		this.item_div_code_id = item_div_code_id;
	}
	public String getItem_div_name() {
		return item_div_name;
	}
	public void setItem_div_name(String item_div_name) {
		this.item_div_name = item_div_name;
	}
	public String getSales_supply_price() {
		return sales_supply_price;
	}
	public void setSales_supply_price(String sales_supply_price) {
		this.sales_supply_price = sales_supply_price;
	}
	public String getSales_tax() {
		return sales_tax;
	}
	public void setSales_tax(String sales_tax) {
		this.sales_tax = sales_tax;
	}
	public String getSales_total_price() {
		return sales_total_price;
	}
	public void setSales_total_price(String sales_total_price) {
		this.sales_total_price = sales_total_price;
	}
	public String getSales_GP() {
		return sales_GP;
	}
	public void setSales_GP(String sales_GP) {
		this.sales_GP = sales_GP;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getIn_staff_name() {
		return in_staff_name;
	}
	public void setIn_staff_name(String in_staff_name) {
		this.in_staff_name = in_staff_name;
	}
	public String getIn_project_code() {
		return in_project_code;
	}
	public void setIn_project_code(String in_project_code) {
		this.in_project_code = in_project_code;
	}
	
	
}