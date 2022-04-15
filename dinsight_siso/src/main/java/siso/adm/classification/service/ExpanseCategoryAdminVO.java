package siso.adm.classification.service;
import java.io.Serializable;

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
public class ExpanseCategoryAdminVO extends ComDefaultVO implements Serializable {
	/** 그롭 level */
    private int group_level = 0;
    
    /** 그롭코드 ID */
    private String group_id = "";
    
    /** 그롭코드 명 */
    private String group_name = "";
    
    /** 코드 ID */
    private String code_id = "";
    
    /** 코드명 */
    private String code_name = "";
    
    String category_level;
	String category_id;
    String category_name;
    String parent_id;
    String account_cd;
    String default_expanse_class;
    String delete_yn;
    String account_name;
    String order_seq;
    
    String[] in_category_level;
    String[] in_ategory_id;
    String[] in_category_name;
    String[] in_parent_id;
    String[] in_account_cd;
    String[] in_default_expanse_class;
    String[] in_delete_yn;
    
	public int getGroup_level() {
		return group_level;
	}
	public String getGroup_id() {
		return group_id;
	}
	public String getGroup_name() {
		return group_name;
	}
	public String getCode_id() {
		return code_id;
	}
	public String getCode_name() {
		return code_name;
	}
	public String getCategory_level() {
		return category_level;
	}
	public String getCategory_id() {
		return category_id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public String getParent_id() {
		return parent_id;
	}
	public String getAccount_cd() {
		return account_cd;
	}
	public String getDefault_expanse_class() {
		return default_expanse_class;
	}
	public String getDelete_yn() {
		return delete_yn;
	}
	public String getAccount_name() {
		return account_name;
	}
	public String getOrder_seq() {
		return order_seq;
	}
	public String[] getIn_category_level() {
		return in_category_level;
	}
	public String[] getIn_ategory_id() {
		return in_ategory_id;
	}
	public String[] getIn_category_name() {
		return in_category_name;
	}
	public String[] getIn_parent_id() {
		return in_parent_id;
	}
	public String[] getIn_account_cd() {
		return in_account_cd;
	}
	public String[] getIn_default_expanse_class() {
		return in_default_expanse_class;
	}
	public String[] getIn_delete_yn() {
		return in_delete_yn;
	}
	public void setGroup_level(int group_level) {
		this.group_level = group_level;
	}
	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}
	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}
	public void setCode_id(String code_id) {
		this.code_id = code_id;
	}
	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}
	public void setCategory_level(String category_level) {
		this.category_level = category_level;
	}
	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public void setParent_id(String parent_id) {
		this.parent_id = parent_id;
	}
	public void setAccount_cd(String account_cd) {
		this.account_cd = account_cd;
	}
	public void setDefault_expanse_class(String default_expanse_class) {
		this.default_expanse_class = default_expanse_class;
	}
	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}
	public void setIn_category_level(String[] in_category_level) {
		this.in_category_level = in_category_level;
	}
	public void setIn_ategory_id(String[] in_ategory_id) {
		this.in_ategory_id = in_ategory_id;
	}
	public void setIn_category_name(String[] in_category_name) {
		this.in_category_name = in_category_name;
	}
	public void setIn_parent_id(String[] in_parent_id) {
		this.in_parent_id = in_parent_id;
	}
	public void setIn_account_cd(String[] in_account_cd) {
		this.in_account_cd = in_account_cd;
	}
	public void setIn_default_expanse_class(String[] in_default_expanse_class) {
		this.in_default_expanse_class = in_default_expanse_class;
	}
	public void setIn_delete_yn(String[] in_delete_yn) {
		this.in_delete_yn = in_delete_yn;
	}    
    
}
