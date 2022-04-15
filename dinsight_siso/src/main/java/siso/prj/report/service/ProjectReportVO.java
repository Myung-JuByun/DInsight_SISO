/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package siso.prj.report.service;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : UserInfohVO.java
 * @Description : UserInfohVO Class
 * @Modification Information 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class ProjectReportVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;
	
	/** 년(검색) */
	private String sh_project_year = "";
		
	/** 월(검색) */
	private String sh_project_month = "";
	
	/** 주(검색) */
	private String sh_project_week = "";
	
	/** 한 주의 일요일(검색) */
	private String sh_project_week_day = "";
	
	
	/** 근태정보 아이디 키값(조회) */
	private String commute_id;
	
	/** 프로젝트 아이디(조회) */
	private String project_id;
	
	/** 프로젝트 명(조회) */
	private String project_name;
	
	/** 보고년월(조회) */
	private String report_ym;
	
	/** 보고주(조회) */
	private String report_week;
	
	/** 사원번호(조회) */
	private String user_id;
	
	/** 월요일_근태상태 코드(조회) */
	private String mon_status_cd;
	
	/** 화요일_근태상태 코드(조회) */
	private String tue_status_cd;
	
	/** 수요일_근태상태 코드(조회) */
	private String wed_status_cd;
	
	/** 목요일_근태상태 코드(조회) */
	private String thu_status_cd;
	
	/** 금요일_근태상태 코드(조회) */
	private String fri_status_cd;
	
	/** 토요일_근태상태 코드(조회) */
	private String sat_status_cd;
	
	/** 일요일_근태상태 코드(조회) */
	private String sun_status_cd;
	
	/** 월요일_근무시간(조회) */
	private String mon_working_hour;
	
	/** 화요일_근무시간(조회) */
	private String tue_working_hour;
	
	/** 수요일_근무시간(조회) */
	private String wed_working_hour;
	
	/** 목요일_근무시간(조회) */
	private String thu_working_hour;
	
	/** 금요일_근무시간(조회) */
	private String fri_working_hour;
	
	/** 토요일_근무시간(조회) */
	private String sat_working_hour;
	
	/** 일요일_근무시간(조회) */
	private String sun_working_hour;
	
	/** 주간 맨데이(조회) */
	private String man_day;
	
	/** 주간 man_hour(조회) */
	private String man_hour;
	
	/** 주간 man_month(조회) */
	private String man_month;
	
	/** 승인자 아이디(조회) */
	private String owner_id;
	
	/** 결재 승인 상태 코드(조회) */
	private String status_cd;
	
	/** 결재 승인 상태 코드명(조회) */
	private String status_cd_name;
	
	/** 승인(반려)일자(조회) */
	private String approved_day;
	
	/** 삭제여부(조회) */
	private String delete_yn;
	
	/** 이슈사항(조회) */
	private String issue_report;
	
	/** MM 제출 주별 ID(조회) */
	private int project_weekly_id;
	
	
	/** 근태정보 아이디 키값(입력) */
	private String[] in_commute_id;
	
	/** 프로젝트 아이디(입력) */
	private String[] in_project_id;
	
	/** 프로젝트 명(입력) */
	private String[] in_project_name;
	
	/** 월요일_근태상태 코드(입력) */
	private String[] in_mon_status_cd;
	
	/** 화요일_근태상태 코드(입력) */
	private String[] in_tue_status_cd;
	
	/** 수요일_근태상태 코드(입력) */
	private String[] in_wed_status_cd;
	
	/** 목요일_근태상태 코드(입력) */
	private String[] in_thu_status_cd;
	
	/** 금요일_근태상태 코드(입력) */
	private String[] in_fri_status_cd;
	
	/** 토요일_근태상태 코드(입력) */
	private String[] in_sat_status_cd;
	
	/** 일요일_근태상태 코드(입력) */
	private String[] in_sun_status_cd;
	
	/** 월요일_근무시간(입력) */
	private String[] in_mon_working_hour;
	
	/** 화요일_근무시간(입력) */
	private String[] in_tue_working_hour;
	
	/** 수요일_근무시간(입력) */
	private String[] in_wed_working_hour;
	
	/** 목요일_근무시간(입력) */
	private String[] in_thu_working_hour;
	
	/** 금요일_근무시간(입력) */
	private String[] in_fri_working_hour;
	
	/** 토요일_근무시간(입력) */
	private String[] in_sat_working_hour;
	
	/** 일요일_근무시간(입력) */
	private String[] in_sun_working_hour;
	
	/** 주간 맨데이(입력) */
	private String[] in_man_day;
	
	/** 주간 man_hour(입력) */
	private String[] in_man_hour;
	
	/** 주간 man_month(입력) */
	private String[] in_man_month;
	
	/** 결재 승인 상태 코드(입력) */
	private String[] in_status_cd;
	
	/** 이슈사항(조회) */
	private String[] in_issue_report;
	
	
	/** 근태정보 아이디 키값(일괄입력) */
	private String[] in_pop_commute_id;
	
	/** 프로젝트 아이디(일괄입력) */
	private String[] in_pop_project_id;
	
	/** 프로젝트 명(일괄입력) */
	private String[] in_pop_project_name;
	
	/** 월요일_근태상태 코드(일괄입력) */
	private String[] in_pop_mon_status_cd;
	
	/** 화요일_근태상태 코드(일괄입력) */
	private String[] in_pop_tue_status_cd;
	
	/** 수요일_근태상태 코드(일괄입력) */
	private String[] in_pop_wed_status_cd;
	
	/** 목요일_근태상태 코드(일괄입력) */
	private String[] in_pop_thu_status_cd;
	
	/** 금요일_근태상태 코드(일괄입력) */
	private String[] in_pop_fri_status_cd;
	
	/** 토요일_근태상태 코드(일괄입력) */
	private String[] in_pop_sat_status_cd;
	
	/** 일요일_근태상태 코드(일괄입력) */
	private String[] in_pop_sun_status_cd;
	
	/** 월요일_근무시간(일괄입력) */
	private String[] in_pop_mon_working_hour;
	
	/** 화요일_근무시간(일괄입력) */
	private String[] in_pop_tue_working_hour;
	
	/** 수요일_근무시간(일괄입력) */
	private String[] in_pop_wed_working_hour;
	
	/** 목요일_근무시간(일괄입력) */
	private String[] in_pop_thu_working_hour;
	
	/** 금요일_근무시간(일괄입력) */
	private String[] in_pop_fri_working_hour;
	
	/** 토요일_근무시간(일괄입력) */
	private String[] in_pop_sat_working_hour;
	
	/** 일요일_근무시간(일괄입력) */
	private String[] in_pop_sun_working_hour;
	
	/** 주간 맨데이(일괄입력) */
	private String[] in_pop_man_day;
	
	/** 주간 man_hour(일괄입력) */
	private String[] in_pop_man_hour;
	

	public String getSh_project_year() {
		return sh_project_year;
	}

	public void setSh_project_year(String sh_project_year) {
		this.sh_project_year = sh_project_year;
	}

	public String getSh_project_month() {
		return sh_project_month;
	}

	public void setSh_project_month(String sh_project_month) {
		this.sh_project_month = sh_project_month;
	}

	public String getSh_project_week() {
		return sh_project_week;
	}

	public void setSh_project_week(String sh_project_week) {
		this.sh_project_week = sh_project_week;
	}

	public String getSh_project_week_day() {
		return sh_project_week_day;
	}

	public void setSh_project_week_day(String sh_project_week_day) {
		this.sh_project_week_day = sh_project_week_day;
	}

	public String getCommute_id() {
		return commute_id;
	}

	public void setCommute_id(String commute_id) {
		this.commute_id = commute_id;
	}

	public String getProject_id() {
		return project_id;
	}

	public void setProject_id(String project_id) {
		this.project_id = project_id;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getReport_ym() {
		return report_ym;
	}

	public void setReport_ym(String report_ym) {
		this.report_ym = report_ym;
	}

	public String getReport_week() {
		return report_week;
	}

	public void setReport_week(String report_week) {
		this.report_week = report_week;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getMon_status_cd() {
		return mon_status_cd;
	}

	public void setMon_status_cd(String mon_status_cd) {
		this.mon_status_cd = mon_status_cd;
	}

	public String getTue_status_cd() {
		return tue_status_cd;
	}

	public void setTue_status_cd(String tue_status_cd) {
		this.tue_status_cd = tue_status_cd;
	}

	public String getWed_status_cd() {
		return wed_status_cd;
	}

	public void setWed_status_cd(String wed_status_cd) {
		this.wed_status_cd = wed_status_cd;
	}

	public String getThu_status_cd() {
		return thu_status_cd;
	}

	public void setThu_status_cd(String thu_status_cd) {
		this.thu_status_cd = thu_status_cd;
	}

	public String getFri_status_cd() {
		return fri_status_cd;
	}

	public void setFri_status_cd(String fri_status_cd) {
		this.fri_status_cd = fri_status_cd;
	}

	public String getSat_status_cd() {
		return sat_status_cd;
	}

	public void setSat_status_cd(String sat_status_cd) {
		this.sat_status_cd = sat_status_cd;
	}

	public String getSun_status_cd() {
		return sun_status_cd;
	}

	public void setSun_status_cd(String sun_status_cd) {
		this.sun_status_cd = sun_status_cd;
	}

	public String getMon_working_hour() {
		return mon_working_hour;
	}

	public void setMon_working_hour(String mon_working_hour) {
		this.mon_working_hour = mon_working_hour;
	}

	public String getTue_working_hour() {
		return tue_working_hour;
	}

	public void setTue_working_hour(String tue_working_hour) {
		this.tue_working_hour = tue_working_hour;
	}

	public String getWed_working_hour() {
		return wed_working_hour;
	}

	public void setWed_working_hour(String wed_working_hour) {
		this.wed_working_hour = wed_working_hour;
	}

	public String getThu_working_hour() {
		return thu_working_hour;
	}

	public void setThu_working_hour(String thu_working_hour) {
		this.thu_working_hour = thu_working_hour;
	}

	public String getFri_working_hour() {
		return fri_working_hour;
	}

	public void setFri_working_hour(String fri_working_hour) {
		this.fri_working_hour = fri_working_hour;
	}

	public String getSat_working_hour() {
		return sat_working_hour;
	}

	public void setSat_working_hour(String sat_working_hour) {
		this.sat_working_hour = sat_working_hour;
	}

	public String getSun_working_hour() {
		return sun_working_hour;
	}

	public void setSun_working_hour(String sun_working_hour) {
		this.sun_working_hour = sun_working_hour;
	}

	public String getMan_day() {
		return man_day;
	}

	public void setMan_day(String man_day) {
		this.man_day = man_day;
	}

	public String getMan_hour() {
		return man_hour;
	}

	public void setMan_hour(String man_hour) {
		this.man_hour = man_hour;
	}

	public String getMan_month() {
		return man_month;
	}

	public void setMan_month(String man_month) {
		this.man_month = man_month;
	}

	public String getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(String owner_id) {
		this.owner_id = owner_id;
	}

	public String getStatus_cd() {
		return status_cd;
	}

	public void setStatus_cd(String status_cd) {
		this.status_cd = status_cd;
	}

	public String getStatus_cd_name() {
		return status_cd_name;
	}

	public void setStatus_cd_name(String status_cd_name) {
		this.status_cd_name = status_cd_name;
	}

	public String getApproved_day() {
		return approved_day;
	}

	public void setApproved_day(String approved_day) {
		this.approved_day = approved_day;
	}

	public String getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(String delete_yn) {
		this.delete_yn = delete_yn;
	}

	public String getIssue_report() {
		return issue_report;
	}

	public void setIssue_report(String issue_report) {
		this.issue_report = issue_report;
	}

	public int getProject_weekly_id() {
		return project_weekly_id;
	}

	public void setProject_weekly_id(int project_weekly_id) {
		this.project_weekly_id = project_weekly_id;
	}

	public String[] getIn_commute_id() {
		return in_commute_id;
	}

	public void setIn_commute_id(String[] in_commute_id) {
		this.in_commute_id = in_commute_id;
	}

	public String[] getIn_project_id() {
		return in_project_id;
	}

	public void setIn_project_id(String[] in_project_id) {
		this.in_project_id = in_project_id;
	}

	public String[] getIn_project_name() {
		return in_project_name;
	}

	public void setIn_project_name(String[] in_project_name) {
		this.in_project_name = in_project_name;
	}

	public String[] getIn_mon_status_cd() {
		return in_mon_status_cd;
	}

	public void setIn_mon_status_cd(String[] in_mon_status_cd) {
		this.in_mon_status_cd = in_mon_status_cd;
	}

	public String[] getIn_tue_status_cd() {
		return in_tue_status_cd;
	}

	public void setIn_tue_status_cd(String[] in_tue_status_cd) {
		this.in_tue_status_cd = in_tue_status_cd;
	}

	public String[] getIn_wed_status_cd() {
		return in_wed_status_cd;
	}

	public void setIn_wed_status_cd(String[] in_wed_status_cd) {
		this.in_wed_status_cd = in_wed_status_cd;
	}

	public String[] getIn_thu_status_cd() {
		return in_thu_status_cd;
	}

	public void setIn_thu_status_cd(String[] in_thu_status_cd) {
		this.in_thu_status_cd = in_thu_status_cd;
	}

	public String[] getIn_fri_status_cd() {
		return in_fri_status_cd;
	}

	public void setIn_fri_status_cd(String[] in_fri_status_cd) {
		this.in_fri_status_cd = in_fri_status_cd;
	}

	public String[] getIn_sat_status_cd() {
		return in_sat_status_cd;
	}

	public void setIn_sat_status_cd(String[] in_sat_status_cd) {
		this.in_sat_status_cd = in_sat_status_cd;
	}

	public String[] getIn_sun_status_cd() {
		return in_sun_status_cd;
	}

	public void setIn_sun_status_cd(String[] in_sun_status_cd) {
		this.in_sun_status_cd = in_sun_status_cd;
	}

	public String[] getIn_mon_working_hour() {
		return in_mon_working_hour;
	}

	public void setIn_mon_working_hour(String[] in_mon_working_hour) {
		this.in_mon_working_hour = in_mon_working_hour;
	}

	public String[] getIn_tue_working_hour() {
		return in_tue_working_hour;
	}

	public void setIn_tue_working_hour(String[] in_tue_working_hour) {
		this.in_tue_working_hour = in_tue_working_hour;
	}

	public String[] getIn_wed_working_hour() {
		return in_wed_working_hour;
	}

	public void setIn_wed_working_hour(String[] in_wed_working_hour) {
		this.in_wed_working_hour = in_wed_working_hour;
	}

	public String[] getIn_thu_working_hour() {
		return in_thu_working_hour;
	}

	public void setIn_thu_working_hour(String[] in_thu_working_hour) {
		this.in_thu_working_hour = in_thu_working_hour;
	}

	public String[] getIn_fri_working_hour() {
		return in_fri_working_hour;
	}

	public void setIn_fri_working_hour(String[] in_fri_working_hour) {
		this.in_fri_working_hour = in_fri_working_hour;
	}

	public String[] getIn_sat_working_hour() {
		return in_sat_working_hour;
	}

	public void setIn_sat_working_hour(String[] in_sat_working_hour) {
		this.in_sat_working_hour = in_sat_working_hour;
	}

	public String[] getIn_sun_working_hour() {
		return in_sun_working_hour;
	}

	public void setIn_sun_working_hour(String[] in_sun_working_hour) {
		this.in_sun_working_hour = in_sun_working_hour;
	}

	public String[] getIn_man_day() {
		return in_man_day;
	}

	public void setIn_man_day(String[] in_man_day) {
		this.in_man_day = in_man_day;
	}

	public String[] getIn_man_hour() {
		return in_man_hour;
	}

	public void setIn_man_hour(String[] in_man_hour) {
		this.in_man_hour = in_man_hour;
	}

	public String[] getIn_man_month() {
		return in_man_month;
	}

	public void setIn_man_month(String[] in_man_month) {
		this.in_man_month = in_man_month;
	}

	public String[] getIn_status_cd() {
		return in_status_cd;
	}

	public void setIn_status_cd(String[] in_status_cd) {
		this.in_status_cd = in_status_cd;
	}

	public String[] getIn_issue_report() {
		return in_issue_report;
	}

	public void setIn_issue_report(String[] in_issue_report) {
		this.in_issue_report = in_issue_report;
	}

	public String[] getIn_pop_commute_id() {
		return in_pop_commute_id;
	}

	public void setIn_pop_commute_id(String[] in_pop_commute_id) {
		this.in_pop_commute_id = in_pop_commute_id;
	}

	public String[] getIn_pop_project_id() {
		return in_pop_project_id;
	}

	public void setIn_pop_project_id(String[] in_pop_project_id) {
		this.in_pop_project_id = in_pop_project_id;
	}

	public String[] getIn_pop_project_name() {
		return in_pop_project_name;
	}

	public void setIn_pop_project_name(String[] in_pop_project_name) {
		this.in_pop_project_name = in_pop_project_name;
	}

	public String[] getIn_pop_mon_status_cd() {
		return in_pop_mon_status_cd;
	}

	public void setIn_pop_mon_status_cd(String[] in_pop_mon_status_cd) {
		this.in_pop_mon_status_cd = in_pop_mon_status_cd;
	}

	public String[] getIn_pop_tue_status_cd() {
		return in_pop_tue_status_cd;
	}

	public void setIn_pop_tue_status_cd(String[] in_pop_tue_status_cd) {
		this.in_pop_tue_status_cd = in_pop_tue_status_cd;
	}

	public String[] getIn_pop_wed_status_cd() {
		return in_pop_wed_status_cd;
	}

	public void setIn_pop_wed_status_cd(String[] in_pop_wed_status_cd) {
		this.in_pop_wed_status_cd = in_pop_wed_status_cd;
	}

	public String[] getIn_pop_thu_status_cd() {
		return in_pop_thu_status_cd;
	}

	public void setIn_pop_thu_status_cd(String[] in_pop_thu_status_cd) {
		this.in_pop_thu_status_cd = in_pop_thu_status_cd;
	}

	public String[] getIn_pop_fri_status_cd() {
		return in_pop_fri_status_cd;
	}

	public void setIn_pop_fri_status_cd(String[] in_pop_fri_status_cd) {
		this.in_pop_fri_status_cd = in_pop_fri_status_cd;
	}

	public String[] getIn_pop_sat_status_cd() {
		return in_pop_sat_status_cd;
	}

	public void setIn_pop_sat_status_cd(String[] in_pop_sat_status_cd) {
		this.in_pop_sat_status_cd = in_pop_sat_status_cd;
	}

	public String[] getIn_pop_sun_status_cd() {
		return in_pop_sun_status_cd;
	}

	public void setIn_pop_sun_status_cd(String[] in_pop_sun_status_cd) {
		this.in_pop_sun_status_cd = in_pop_sun_status_cd;
	}

	public String[] getIn_pop_mon_working_hour() {
		return in_pop_mon_working_hour;
	}

	public void setIn_pop_mon_working_hour(String[] in_pop_mon_working_hour) {
		this.in_pop_mon_working_hour = in_pop_mon_working_hour;
	}

	public String[] getIn_pop_tue_working_hour() {
		return in_pop_tue_working_hour;
	}

	public void setIn_pop_tue_working_hour(String[] in_pop_tue_working_hour) {
		this.in_pop_tue_working_hour = in_pop_tue_working_hour;
	}

	public String[] getIn_pop_wed_working_hour() {
		return in_pop_wed_working_hour;
	}

	public void setIn_pop_wed_working_hour(String[] in_pop_wed_working_hour) {
		this.in_pop_wed_working_hour = in_pop_wed_working_hour;
	}

	public String[] getIn_pop_thu_working_hour() {
		return in_pop_thu_working_hour;
	}

	public void setIn_pop_thu_working_hour(String[] in_pop_thu_working_hour) {
		this.in_pop_thu_working_hour = in_pop_thu_working_hour;
	}

	public String[] getIn_pop_fri_working_hour() {
		return in_pop_fri_working_hour;
	}

	public void setIn_pop_fri_working_hour(String[] in_pop_fri_working_hour) {
		this.in_pop_fri_working_hour = in_pop_fri_working_hour;
	}

	public String[] getIn_pop_sat_working_hour() {
		return in_pop_sat_working_hour;
	}

	public void setIn_pop_sat_working_hour(String[] in_pop_sat_working_hour) {
		this.in_pop_sat_working_hour = in_pop_sat_working_hour;
	}

	public String[] getIn_pop_sun_working_hour() {
		return in_pop_sun_working_hour;
	}

	public void setIn_pop_sun_working_hour(String[] in_pop_sun_working_hour) {
		this.in_pop_sun_working_hour = in_pop_sun_working_hour;
	}

	public String[] getIn_pop_man_day() {
		return in_pop_man_day;
	}

	public void setIn_pop_man_day(String[] in_pop_man_day) {
		this.in_pop_man_day = in_pop_man_day;
	}

	public String[] getIn_pop_man_hour() {
		return in_pop_man_hour;
	}

	public void setIn_pop_man_hour(String[] in_pop_man_hour) {
		this.in_pop_man_hour = in_pop_man_hour;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
