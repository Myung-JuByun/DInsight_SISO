package siso.adm.support.service;

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
public class SupportPurchaseSalesVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	private String Ord;
	private String project_code;
	private String staff_name;
	private String client_name;
	private String sales_price_sum;
	private String purchase_price_sum;
	private String sales_GP_sum;
	private String GP;
	private String in_staff_name;
	private String in_project_code;
	private String startDate;
	private String endDate;
	
	public String getOrd() {
		return Ord;
	}
	public void setOrd(String ord) {
		Ord = ord;
	}
	public String getProject_code() {
		return project_code;
	}
	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getClient_name() {
		return client_name;
	}
	public void setClient_name(String client_name) {
		this.client_name = client_name;
	}
	public String getSales_price_sum() {
		return sales_price_sum;
	}
	public void setSales_price_sum(String sales_price_sum) {
		this.sales_price_sum = sales_price_sum;
	}
	public String getPurchase_price_sum() {
		return purchase_price_sum;
	}
	public void setPurchase_price_sum(String purchase_price_sum) {
		this.purchase_price_sum = purchase_price_sum;
	}
	public String getSales_GP_sum() {
		return sales_GP_sum;
	}
	public void setSales_GP_sum(String sales_GP_sum) {
		this.sales_GP_sum = sales_GP_sum;
	}
	public String getGP() {
		return GP;
	}
	public void setGP(String gP) {
		GP = gP;
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
	
}