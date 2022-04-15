package siso.cmmn;

import java.io.Serializable;
import java.util.Date;

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
public class ComDefaultVO implements Serializable {
	
	/** 검색Keyword */
    private String deleteYn;
    
    /** 검색Keyword */
    private int creator;
    
    /** 검색Keyword */
    private Integer modifier;
    
    /** 검색Keyword */
    private Date creationDate;
    
    /** 검색Keyword */
    private Date modifyDate;
    
    /** 페이징 여부 */
    private String pageingYn = "N";
    
    /** 현재페이지 */
    private int pageIndex = 1;

    /** 페이지갯수 */
    private int pageUnit = 15;

    /** 페이지사이즈 */
    private int pageSize = 5;

    /** firstIndex */
    private int firstIndex = 0;

    /** lastIndex */
    private int lastIndex = 1;
    
    /** row 총갯수 */
    private int rowCnt = 0;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;
    
    /** 년 */
    private String sh_default_year;
    
    /** 월 */
    private String sh_default_month;
    
    /** 주 */
    private String sh_default_week;
    
    /** 주의 시작일 */
    private String start_default_date;
    
    /** 주의 종료일 */
    private String end_default_date;


	public String getSh_default_year() {
		return sh_default_year;
	}

	public void setSh_default_year(String sh_default_year) {
		this.sh_default_year = sh_default_year;
	}

	public String getSh_default_month() {
		return sh_default_month;
	}

	public void setSh_default_month(String sh_default_month) {
		this.sh_default_month = sh_default_month;
	}

	public String getSh_default_week() {
		return sh_default_week;
	}

	public void setSh_default_week(String sh_default_week) {
		this.sh_default_week = sh_default_week;
	}

	public String getStart_default_date() {
		return start_default_date;
	}

	public void setStart_default_date(String start_default_date) {
		this.start_default_date = start_default_date;
	}

	public String getEnd_default_date() {
		return end_default_date;
	}

	public void setEnd_default_date(String end_default_date) {
		this.end_default_date = end_default_date;
	}

	/**
     * toString 메소드를 대치한다.
     */
    @Override
	public String toString() {
	return ToStringBuilder.reflectionToString(this);
    }

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

	public int getCreator() {
		return creator;
	}

	public void setCreator(int creator) {
		this.creator = creator;
	}

	public Integer getModifier() {
		return modifier;
	}

	public void setModifier(Integer modifier) {
		this.modifier = modifier;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getPageingYn() {
		return pageingYn;
	}

	public void setPageingYn(String pageingYn) {
		this.pageingYn = pageingYn;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageUnit() {
		return pageUnit;
	}

	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getRowCnt() {
		return rowCnt;
	}

	public void setRowCnt(int rowCnt) {
		this.rowCnt = rowCnt;
	}
}
