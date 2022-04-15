package siso.exp.reference.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ApprovalVO.java
 * @Description : ApprovalVO Class
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
public class ReferenceVO extends ComDefaultVO {
	
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -2388138863856657125L;

	/** 삭제_변동_아이디 */
	private String reference_room_id;
	
	/** 고객사 파일명 */
	private String reference_file_id;
	
	/** 고객사 파일명 */
	private String reference_file_name;
	
	/** 고객사 파일PATH */
	private String reference_file_path;
	
	/** 삭제여부 */
	private String delete_yn;
	
	/** 등록일 */
	private String creation_date;
	
	/** 수정일 */
	private String modify_date;
	
	/** 등록자 */
	private String creator_name;
	
	/** 수정자 */
	private String modifier_name;
	
	/** 삭제_변동_아이디 배열값 */
	private String[] reference_room_ids;

	public String getReference_room_id() {
		return reference_room_id;
	}

	public void setReference_room_id(String reference_room_id) {
		this.reference_room_id = reference_room_id;
	}

	public String getReference_file_id() {
		return reference_file_id;
	}

	public void setReference_file_id(String reference_file_id) {
		this.reference_file_id = reference_file_id;
	}
	
	public String getReference_file_name() {
		return reference_file_name;
	}

	public void setReference_file_name(String reference_file_name) {
		this.reference_file_name = reference_file_name;
	}

	public String getReference_file_path() {
		return reference_file_path;
	}

	public void setReference_file_path(String reference_file_path) {
		this.reference_file_path = reference_file_path;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}

	public String getModify_date() {
		return modify_date;
	}

	public void setModify_date(String modify_date) {
		this.modify_date = modify_date;
	}

	public String getCreator_name() {
		return creator_name;
	}

	public void setCreator_name(String creator_name) {
		this.creator_name = creator_name;
	}

	public String getModifier_name() {
		return modifier_name;
	}

	public void setModifier_name(String modifier_name) {
		this.modifier_name = modifier_name;
	}

	public String[] getReference_room_ids() {
		return reference_room_ids;
	}

	public void setReference_room_ids(String[] reference_room_ids) {
		this.reference_room_ids = reference_room_ids;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}