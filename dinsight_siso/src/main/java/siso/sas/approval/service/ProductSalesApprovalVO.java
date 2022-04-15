package siso.sas.approval.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ProductSalesApprovalVO.java
 * @Description : ProductSalesApprovalVO Class
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
public class ProductSalesApprovalVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 상태코드 */
	private String status_cd;
	
	/** 매입/매출 품의서 키값 */
	private String sales_confer_id;
	
	/** 매입/매출 품의서 키값 */
	private int new_sales_confer_id;
	
	/** alc 키값 */
	private String alc_id;
	
	/** alc_chang 키값 */
	private String max_chg_alc_id;
	
	/** 다소 매입매출 키값 */
	private String sales_record_ds_id;
	
	/** 수량 */
	private String qty;

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getSales_confer_id() {
		return sales_confer_id;
	}

	public void setSales_confer_id(String sales_confer_id) {
		this.sales_confer_id = sales_confer_id;
	}
	
	public int getNew_sales_confer_id() {
		return new_sales_confer_id;
	}

	public void setNew_sales_confer_id(int new_sales_confer_id) {
		this.new_sales_confer_id = new_sales_confer_id;
	}

	public String getAlc_id() {
		return alc_id;
	}

	public void setAlc_id(String alc_id) {
		this.alc_id = alc_id;
	}

	public String getMax_chg_alc_id() {
		return max_chg_alc_id;
	}

	public void setMax_chg_alc_id(String max_chg_alc_id) {
		this.max_chg_alc_id = max_chg_alc_id;
	}

	public String getSales_record_ds_id() {
		return sales_record_ds_id;
	}

	public void setSales_record_ds_id(String sales_record_ds_id) {
		this.sales_record_ds_id = sales_record_ds_id;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}