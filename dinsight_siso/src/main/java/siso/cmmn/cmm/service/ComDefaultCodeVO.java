package siso.cmmn.cmm.service;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

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
public class ComDefaultCodeVO implements Serializable {
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

	public int getGroup_level() {
		return group_level;
	}

	public void setGroup_level(int group_level) {
		this.group_level = group_level;
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
    
}
