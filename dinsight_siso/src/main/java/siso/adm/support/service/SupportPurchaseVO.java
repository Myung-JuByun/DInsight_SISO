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
public class SupportPurchaseVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	private String purchase_id;
	private String purchase_day;
	private String purchase_project_code_id;
	private String purchase_project_code;
	private String purchase_staff_id;
	private String purchase_staff_name;
	private String creditor_id;
	private String creditor_name;
	private String item_name;
	private String debtor_id;
	private String debtor_name;
	private String purchase_supply_price;
	private String purchase_tax;
	private String purchase_total_price;
	private String startDate;
	private String endDate;
	private String in_staff_name;
	private String in_project_code;
	
	private List<Map<String, Object>> purchaseList;
	
	public String getPurchase_id() {
		return purchase_id;
	}
	public void setPurchase_id(String purchase_id) {
		this.purchase_id = purchase_id;
	}
	public String getPurchase_day() {
		return purchase_day;
	}
	public void setPurchase_day(String purchase_day) {
		this.purchase_day = purchase_day;
	}
	public String getPurchase_project_code_id() {
		return purchase_project_code_id;
	}
	public void setPurchase_project_code_id(String purchase_project_code_id) {
		this.purchase_project_code_id = purchase_project_code_id;
	}
	public String getPurchase_project_code() {
		return purchase_project_code;
	}
	public void setPurchase_project_code(String purchase_project_code) {
		this.purchase_project_code = purchase_project_code;
	}
	public String getPurchase_staff_id() {
		return purchase_staff_id;
	}
	public void setPurchase_staff_id(String purchase_staff_id) {
		this.purchase_staff_id = purchase_staff_id;
	}
	public String getPurchase_staff_name() {
		return purchase_staff_name;
	}
	public void setPurchase_staff_name(String purchase_staff_name) {
		this.purchase_staff_name = purchase_staff_name;
	}
	public String getCreditor_id() {
		return creditor_id;
	}
	public void setCreditor_id(String creditor_id) {
		this.creditor_id = creditor_id;
	}
	public String getCreditor_name() {
		return creditor_name;
	}
	public void setCreditor_name(String creditor_name) {
		this.creditor_name = creditor_name;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getDebtor_id() {
		return debtor_id;
	}
	public void setDebtor_id(String debtor_id) {
		this.debtor_id = debtor_id;
	}
	public String getDebtor_name() {
		return debtor_name;
	}
	public void setDebtor_name(String debtor_name) {
		this.debtor_name = debtor_name;
	}
	public String getPurchase_supply_price() {
		return purchase_supply_price;
	}
	public void setPurchase_supply_price(String purchase_supply_price) {
		this.purchase_supply_price = purchase_supply_price;
	}
	public String getPurchase_tax() {
		return purchase_tax;
	}
	public void setPurchase_tax(String purchase_tax) {
		this.purchase_tax = purchase_tax;
	}
	public String getPurchase_total_price() {
		return purchase_total_price;
	}
	public void setPurchase_total_price(String purchase_total_price) {
		this.purchase_total_price = purchase_total_price;
	}
	public List<Map<String, Object>> getPurchaseList() {
		return purchaseList;
	}
	public void setPurchaseList(List<Map<String, Object>> purchaseList) {
		this.purchaseList = purchaseList;
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