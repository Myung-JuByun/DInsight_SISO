package siso.cmmn;

import java.io.Serializable;
import java.util.List;

import siso.adm.service.ComMenuVO;

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
public class ComMenuDefaultVO implements Serializable {
	
	/** 메뉴 id */
    private int menu_id;
    
	/** 메뉴 url */
    private String menu_url = "";
    
    /** 1 level id */
    private int level1_id = 0;
    
    /** 1 level 명 */
    private String level1_name = "";
    
    /** 2 level id */
    private int level2_id = 0;
    
    /** 대메뉴 정보 */
    private List<ComMenuVO> mainMenu;
    
    /** 대메뉴 정보 */
    private List<ComMenuVO> subMenu;
    
    /** 2 level 명 */
    private String level2_name = "";

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}

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

	public String getLevel2_name() {
		return level2_name;
	}

	public void setLevel2_name(String level2_name) {
		this.level2_name = level2_name;
	}
	    
}
