package siso.cmmn.cmm.service;

import siso.cmmn.ComDefaultVO;

/**
 * 공통상세코드 모델 클래스
 * @author 공통서비스 개발팀 이중호
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.01  이중호          최초 생성
 *
 * </pre>
 */
@SuppressWarnings("serial")
public class CmmnDetailCode extends ComDefaultVO {
	
	/** 그롭코드 ID */
    private String group_id = "";

    /** 코드 ID */
    private String code_id = "";
    
    /** 코드명 */
    private String code_name = "";
    
    /** 코드 속성1 */
    private String etc1 = "";
    
    /** 코드 속성2 */
    private String etc2 = "";
    
    /** 코드 속성3 */
    private String etc3 = "";	
    
    /** 코드 속성4 */
    private String etc4 = "N";
    
    /** 코드 순서 */
    private int order_seq = 0;
    
    /** 그롭 코드 관련 추가 정보 */
    /** 그룹코드명 */
    private String group_name = "";
    
    /** 속성설명 */
    private String etcExplain = "";

	public String getGroup_id() {
		return group_id;
	}

	public String getCode_id() {
		return code_id;
	}

	public String getCode_name() {
		return code_name;
	}

	public String getEtc1() {
		return etc1;
	}

	public String getEtc2() {
		return etc2;
	}

	public String getEtc3() {
		return etc3;
	}

	public String getEtc4() {
		return etc4;
	}

	public int getOrder_seq() {
		return order_seq;
	}

	public String getGroup_name() {
		return group_name;
	}

	public String getEtcExplain() {
		return etcExplain;
	}

	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}

	public void setCode_id(String code_id) {
		this.code_id = code_id;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	public void setEtc1(String etc1) {
		this.etc1 = etc1;
	}

	public void setEtc2(String etc2) {
		this.etc2 = etc2;
	}

	public void setEtc3(String etc3) {
		this.etc3 = etc3;
	}

	public void setEtc4(String etc4) {
		this.etc4 = etc4;
	}

	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}

	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}

	public void setEtcExplain(String etcExplain) {
		this.etcExplain = etcExplain;
	}	
}
