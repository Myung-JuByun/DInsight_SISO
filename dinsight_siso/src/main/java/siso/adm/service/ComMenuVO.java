package siso.adm.service;

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
public class ComMenuVO extends ComDefaultVO {
	
	/** 메뉴 id */
    private int menu_id = 0;
    
    /** 메뉴명 */
    private String menu_name;
    
    /** 메뉴명 */
    private String menu_url;
    
    /** 메뉴 이미지 */
    private String menu_img_url;
    
    /** 메뉴 권한 */
    private String menu_authority;
    
    /** 메뉴 권한 */
    private Integer order_seq;
    
    /** 메뉴 레벨 */
    private Integer menu_level;
    
    /** level1 id */
    private Integer level1_id;
    
    /** level1 name */
    private String level1_name;
    
    /** level1 Authority */
    private String level1_authority;
    
    /** level2 id */
    private Integer level2_id;
    
    /** level2 name */
    private String level2_name;
    
    /** level1 Authority */
    private String level2_authority;
    
    /** level3 id */
    private Integer level3_id;
    
    /** 로그인 사원번호 */
    private int user_id = 0;
    
    /** 데이터 처리 mode */
    private String dataMode;
    
    /** 메뉴사용가능여부 */
    private String chkMenu;

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}

	public String getMenu_name() {
		return menu_name;
	}

	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}

	public String getMenu_url() {
		return menu_url;
	}

	public void setMenu_url(String menu_url) {
		this.menu_url = menu_url;
	}

	public String getMenu_img_url() {
		return menu_img_url;
	}

	public void setMenu_img_url(String menu_img_url) {
		this.menu_img_url = menu_img_url;
	}

	public String getMenu_authority() {
		return menu_authority;
	}

	public void setMenu_authority(String menu_authority) {
		this.menu_authority = menu_authority;
	}

	public Integer getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(Integer order_seq) {
		this.order_seq = order_seq;
	}

	public Integer getMenu_level() {
		return menu_level;
	}

	public void setMenu_level(Integer menu_level) {
		this.menu_level = menu_level;
	}

	public Integer getLevel1_id() {
		return level1_id;
	}

	public void setLevel1_id(Integer level1_id) {
		this.level1_id = level1_id;
	}

	public String getLevel1_name() {
		return level1_name;
	}

	public void setLevel1_name(String level1_name) {
		this.level1_name = level1_name;
	}

	public String getLevel1_authority() {
		return level1_authority;
	}

	public void setLevel1_authority(String level1_authority) {
		this.level1_authority = level1_authority;
	}

	public Integer getLevel2_id() {
		return level2_id;
	}

	public void setLevel2_id(Integer level2_id) {
		this.level2_id = level2_id;
	}

	public String getLevel2_name() {
		return level2_name;
	}

	public void setLevel2_name(String level2_name) {
		this.level2_name = level2_name;
	}

	public String getLevel2_authority() {
		return level2_authority;
	}

	public void setLevel2_authority(String level2_authority) {
		this.level2_authority = level2_authority;
	}

	public Integer getLevel3_id() {
		return level3_id;
	}

	public void setLevel3_id(Integer level3_id) {
		this.level3_id = level3_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getDataMode() {
		return dataMode;
	}

	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}

	public String getChkMenu() {
		return chkMenu;
	}

	public void setChkMenu(String chkMenu) {
		this.chkMenu = chkMenu;
	}	    
    
}
