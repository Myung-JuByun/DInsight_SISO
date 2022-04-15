package siso.adm.code.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : CodeAdminVO.java
 * @Description : CodeAdminVO Class
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
public class CodeAdminVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 그룹코드(입력) */
	private String[] in_group_id;
	/** 그룹명(입력) */
	private String[] in_group_name;
	/** 속성 설명(입력) */
	private String[] in_etc_explain;
	/** 삭제여부(입력) */
	private String[] in_delete_yn;
	/** 코드(입력) */
	private String[] in_code_id;
	/** 코드명(입력) */
	private String[] in_code_name;
	/** 기타2(입력) */
	private String[] in_etc1;
	/** 기타2(입력)*/
	private String[] in_etc2;
	/** 기타3(입력)*/
	private String[] in_etc3;
	/** 기타4(입력) */
	private String[] in_etc4;
	/** 순서(입력) */
	private int[] in_order_seq;
	
	
	/** 그룹코드(조회) */
	private String group_id;
	/** 그룹명(조회) */
	private String group_name;
	/** 속성 설명(조회) */
	private String etc_explain;
	/** 삭제여부(조회) */
	private String delete_yn;
	/** 코드(조회) */
	private String code_id;
	/** 코드명(조회) */
	private String code_name;
	/** 기타2(조회) */
	private String etc1;
	/** 기타2(조회)*/
	private String etc2;
	/** 기타3(조회)*/
	private String etc3;
	/** 기타4(조회) */
	private String etc4;
	/** 순서(조회) */
	private String order_seq;
	
	
	private String sh_group_name;
	private String sh_code_name;
	public String[] getIn_group_id() {
		return in_group_id;
	}
	public void setIn_group_id(String[] in_group_id) {
		this.in_group_id = in_group_id;
	}
	public String[] getIn_group_name() {
		return in_group_name;
	}
	public void setIn_group_name(String[] in_group_name) {
		this.in_group_name = in_group_name;
	}
	public String[] getIn_etc_explain() {
		return in_etc_explain;
	}
	public void setIn_etc_explain(String[] in_etc_explain) {
		this.in_etc_explain = in_etc_explain;
	}
	public String[] getIn_delete_yn() {
		return in_delete_yn;
	}
	public void setIn_delete_yn(String[] in_delete_yn) {
		this.in_delete_yn = in_delete_yn;
	}
	public String[] getIn_code_id() {
		return in_code_id;
	}
	public void setIn_code_id(String[] in_code_id) {
		this.in_code_id = in_code_id;
	}
	public String[] getIn_code_name() {
		return in_code_name;
	}
	public void setIn_code_name(String[] in_code_name) {
		this.in_code_name = in_code_name;
	}
	public String[] getIn_etc1() {
		return in_etc1;
	}
	public void setIn_etc1(String[] in_etc1) {
		this.in_etc1 = in_etc1;
	}
	public String[] getIn_etc2() {
		return in_etc2;
	}
	public void setIn_etc2(String[] in_etc2) {
		this.in_etc2 = in_etc2;
	}
	public String[] getIn_etc3() {
		return in_etc3;
	}
	public void setIn_etc3(String[] in_etc3) {
		this.in_etc3 = in_etc3;
	}
	public String[] getIn_etc4() {
		return in_etc4;
	}
	public void setIn_etc4(String[] in_etc4) {
		this.in_etc4 = in_etc4;
	}
	public int[] getIn_order_seq() {
		return in_order_seq;
	}
	public void setIn_order_seq(int[] in_order_seq) {
		this.in_order_seq = in_order_seq;
	}
	public String getGroup_id() {
		return group_id;
	}
	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}
	public String getEtc_explain() {
		return etc_explain;
	}
	public void setEtc_explain(String etc_explain) {
		this.etc_explain = etc_explain;
	}
	public String getDelete_yn() {
		return delete_yn;
	}
	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
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
	public String getEtc1() {
		return etc1;
	}
	public void setEtc1(String etc1) {
		this.etc1 = etc1;
	}
	public String getEtc2() {
		return etc2;
	}
	public void setEtc2(String etc2) {
		this.etc2 = etc2;
	}
	public String getEtc3() {
		return etc3;
	}
	public void setEtc3(String etc3) {
		this.etc3 = etc3;
	}
	public String getEtc4() {
		return etc4;
	}
	public void setEtc4(String etc4) {
		this.etc4 = etc4;
	}
	public String getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}
	public String getSh_group_name() {
		return sh_group_name;
	}
	public void setSh_group_name(String sh_group_name) {
		this.sh_group_name = sh_group_name;
	}
	public String getSh_code_name() {
		return sh_code_name;
	}
	public void setSh_code_name(String sh_code_name) {
		this.sh_code_name = sh_code_name;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}