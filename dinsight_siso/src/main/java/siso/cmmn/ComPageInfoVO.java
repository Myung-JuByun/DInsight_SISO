package siso.cmmn;

import java.io.Serializable;
import java.util.List;

import siso.adm.service.ComMenuVO;
import siso.sys.service.LoginVO;

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
public class ComPageInfoVO implements Serializable {
	
	/** 메뉴 url */
    private String menu_url = "";
    
    /** 1 level id */
    private int level1_id = 0;
    
    /** 1 level 명 */
    private String level1_name = "";
    
    /** 2 level id */
    private int level2_id = 0;
    
    /** menu level */
    private int menu_level = 0;
    
    /** menu level */
    private String move_url = "";
    
    /** 대메뉴 정보 */
    private List<ComMenuVO> mainMenu;
    
    /** 대메뉴 정보 */
    private List<ComMenuVO> subMenu;
    
    private LoginVO loginVO;
    
    private Boolean error_yn;
    
    private String error_message;
    
    /** 화면에 공통으로 처리할 페이징 관련 변수 */
    private int firstIndex = 0;
    
    /** 2 level 명 */
    private String level2_name = "";

	public String getMenu_url() {
		return menu_url;
	}

	public void setMenu_url(String menu_url) {
		this.menu_url = menu_url;
	}

	public int getLevel1_id() {
		return level1_id;
	}

	public void setLevel1_id(int level1_id) {
		this.level1_id = level1_id;
	}

	public String getLevel1_name() {
		return level1_name;
	}

	public void setLevel1_name(String level1_name) {
		this.level1_name = level1_name;
	}

	public int getLevel2_id() {
		return level2_id;
	}

	public void setLevel2_id(int level2_id) {
		this.level2_id = level2_id;
	}

	public int getMenu_level() {
		return menu_level;
	}

	public void setMenu_level(int menu_level) {
		this.menu_level = menu_level;
	}

	public String getMove_url() {
		return move_url;
	}

	public void setMove_url(String move_url) {
		this.move_url = move_url;
	}

	public List<ComMenuVO> getMainMenu() {
		return mainMenu;
	}

	public void setMainMenu(List<ComMenuVO> mainMenu) {
		this.mainMenu = mainMenu;
	}

	public List<ComMenuVO> getSubMenu() {
		return subMenu;
	}

	public void setSubMenu(List<ComMenuVO> subMenu) {
		this.subMenu = subMenu;
	}

	public LoginVO getLoginVO() {
		return loginVO;
	}

	public void setLoginVO(LoginVO loginVO) {
		this.loginVO = loginVO;
	}

	public Boolean getError_yn() {
		return error_yn;
	}

	public void setError_yn(Boolean error_yn) {
		this.error_yn = error_yn;
	}

	public String getError_message() {
		return error_message;
	}

	public void setError_message(String error_message) {
		this.error_message = error_message;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public String getLevel2_name() {
		return level2_name;
	}

	public void setLevel2_name(String level2_name) {
		this.level2_name = level2_name;
	}
	    
}
