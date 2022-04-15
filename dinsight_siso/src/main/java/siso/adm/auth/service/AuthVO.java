package siso.adm.auth.service;

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
public class AuthVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
			
	/** grant_list_id */
	private String grant_list_id;
	
	/** grant_id */
	private String grant_id;
	
	/** 권한명 */
	private String grant_name;
	
	/** 권한설명 */
	private String grant_explain;
	
	/** menu_id */
	private String menu_id;
	
	/** 메뉴명 */
	private String menu_name;
	
	/** 메뉴레벨 */
	private String menu_level;
	
	/** grant_user_id */
	private String grant_user_id;
	
	/** user_id */
	private String user_id;
	
	/** 이름 */
	private String user_name;
	
	/** 부서명 */
	private String division_name;
	
	/** 삭제유무 */
	private String delete_yn;
	
	
	/** grant_id */
	private String[] in_grant_id;
	
	/** 권한명 */
	private String[] in_grant_name;
	
	/** menu_id */
	private String[] in_menu_id;
	
	/** user_id */
	private String[] in_user_id;
	
	/** grant_user_id */
	private String[] in_grant_user_id;

	public String getGrant_list_id() {
		return grant_list_id;
	}

	public void setGrant_list_id(String grant_list_id) {
		this.grant_list_id = grant_list_id;
	}

	public String getGrant_id() {
		return grant_id;
	}

	public void setGrant_id(String grant_id) {
		this.grant_id = grant_id;
	}

	public String getGrant_name() {
		return grant_name;
	}

	public void setGrant_name(String grant_name) {
		this.grant_name = grant_name;
	}

	public String getGrant_explain() {
		return grant_explain;
	}

	public void setGrant_explain(String grant_explain) {
		this.grant_explain = grant_explain;
	}

	public String getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}

	public String getMenu_name() {
		return menu_name;
	}

	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}

	public String getMenu_level() {
		return menu_level;
	}

	public void setMenu_level(String menu_level) {
		this.menu_level = menu_level;
	}

	public String getGrant_user_id() {
		return grant_user_id;
	}

	public void setGrant_user_id(String grant_user_id) {
		this.grant_user_id = grant_user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getDivision_name() {
		return division_name;
	}

	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String[] getIn_grant_id() {
		return in_grant_id;
	}

	public void setIn_grant_id(String[] in_grant_id) {
		this.in_grant_id = in_grant_id;
	}

	public String[] getIn_grant_name() {
		return in_grant_name;
	}

	public void setIn_grant_name(String[] in_grant_name) {
		this.in_grant_name = in_grant_name;
	}

	public String[] getIn_menu_id() {
		return in_menu_id;
	}

	public void setIn_menu_id(String[] in_menu_id) {
		this.in_menu_id = in_menu_id;
	}

	public String[] getIn_user_id() {
		return in_user_id;
	}

	public void setIn_user_id(String[] in_user_id) {
		this.in_user_id = in_user_id;
	}

	public String[] getIn_grant_user_id() {
		return in_grant_user_id;
	}

	public void setIn_grant_user_id(String[] in_grant_user_id) {
		this.in_grant_user_id = in_grant_user_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}