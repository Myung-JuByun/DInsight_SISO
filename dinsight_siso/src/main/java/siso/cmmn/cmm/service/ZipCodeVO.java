package siso.cmmn.cmm.service;

import siso.cmmn.ComDefaultVO;

public class ZipCodeVO  extends ComDefaultVO {

	private String bjdong_cd         = "" ;  // 법정동코드
	private String sido_nm           = "" ;  // 시도명
	private String sigu_nm           = "" ;  // 시군구명
	private String bjdong_nm         = "" ;  // 법정읍면동명
	private String bjri_nm           = "" ;  // 법정리명
	private String san_yn            = "" ;  // 산여부
	private String jb_bunji          = "" ;  // 지번본번(번지)
	private String jb_ho             = "" ;  // 지번부번(호)
	private String roadnm_cd         = "" ;  // 도로명코드
	private String road_nm           = "" ;  // 도로명
	private String jiha_yn           = "" ;  // 지하여부
	private String build_pre_no      = "" ;  // 건물본번
	private String build_post_no     = "" ;  // 건물부번
	private String build_nm          = "" ;  // 건축물대장 건물명
	private String dt_build_nm       = "" ;  // 상세건물명
	private String build_mng_no      = "" ;  // 건물관리번호
	private String dong_seq          = "" ;  // 읍면동일련번호
	private String hj_dong_cd        = "" ;  // 행정동코드
	private String hj_dong_nm        = "" ;  // 행정동명
	private String zip_code          = "" ;  // 우편번호
	private String zip_seq           = "" ;  // 우편일련번호
	private String delivery_nm       = "" ;  // 다량배달처명
	private String chng_cd           = "" ;  // 변경사유코드
	private String gosi_date         = "" ;  // 고시일자
	private String chng_bf_road_juso = "" ;  // 변경전도로명주소
	private String sigu_build_nm     = "" ;  // 시군구용건물명
	private String house_yn          = "" ;  // 공동주택여부
	private String area_no           = "" ;  // 기초구역번호
	private String detail_juso_yn    = "" ;  // 상세주소 부여여부
	private String bigo1             = "" ;  // 비고1
	private String bigo2             = "" ;  // 비고2

	private String addr_gubun        = "" ;  // 검색주소구분   (도로명검색-R/지번검색-J)
	private String level_addr        = "" ;  // 검색주소선택정보   (시/도+시/군/구)
	private String addr_nm           = "" ;  // 검색어 (도로명/주소명) 저장
	private String addr_pre_no       = "" ;  // 검색어 (건물번호 앞자리/번지 앞자리) 저장
	private String addr_post_no      = "" ;  // 검색어 (건물번호 뒷자리/번지 뒷자리) 저장
	
	private String jibun_addr_no     = "" ;  // 지번검색주소입력정보   (동+번지포함)
	private String road_addr_no      = "" ;  // 도로명검색주소입력정보 (도로명+건물번호 포함)
	
	/*20160607이후 추가 6자리 우편번호 도로명*/	
	private String basement_yn       = "" ;  // 지하구분
	private String build_main_no       = "" ;  // 건물본번
	private String build_sub_no       = "" ;  // 건물부번
	
	public String getBjdong_cd() {
		return bjdong_cd;
	}
	public void setBjdong_cd(String bjdong_cd) {
		this.bjdong_cd = bjdong_cd;
	}
	public String getSido_nm() {
		return sido_nm;
	}
	public void setSido_nm(String sido_nm) {
		this.sido_nm = sido_nm;
	}
	public String getSigu_nm() {
		return sigu_nm;
	}
	public void setSigu_nm(String sigu_nm) {
		this.sigu_nm = sigu_nm;
	}
	public String getBjdong_nm() {
		return bjdong_nm;
	}
	public void setBjdong_nm(String bjdong_nm) {
		this.bjdong_nm = bjdong_nm;
	}
	public String getBjri_nm() {
		return bjri_nm;
	}
	public void setBjri_nm(String bjri_nm) {
		this.bjri_nm = bjri_nm;
	}
	public String getSan_yn() {
		return san_yn;
	}
	public void setSan_yn(String san_yn) {
		this.san_yn = san_yn;
	}
	public String getJb_bunji() {
		return jb_bunji;
	}
	public void setJb_bunji(String jb_bunji) {
		this.jb_bunji = jb_bunji;
	}
	public String getJb_ho() {
		return jb_ho;
	}
	public void setJb_ho(String jb_ho) {
		this.jb_ho = jb_ho;
	}
	public String getRoadnm_cd() {
		return roadnm_cd;
	}
	public void setRoadnm_cd(String roadnm_cd) {
		this.roadnm_cd = roadnm_cd;
	}
	public String getRoad_nm() {
		return road_nm;
	}
	public void setRoad_nm(String road_nm) {
		this.road_nm = road_nm;
	}
	public String getJiha_yn() {
		return jiha_yn;
	}
	public void setJiha_yn(String jiha_yn) {
		this.jiha_yn = jiha_yn;
	}
	public String getBuild_pre_no() {
		return build_pre_no;
	}
	public void setBuild_pre_no(String build_pre_no) {
		this.build_pre_no = build_pre_no;
	}
	public String getBuild_post_no() {
		return build_post_no;
	}
	public void setBuild_post_no(String build_post_no) {
		this.build_post_no = build_post_no;
	}
	public String getBuild_nm() {
		return build_nm;
	}
	public void setBuild_nm(String build_nm) {
		this.build_nm = build_nm;
	}
	public String getDt_build_nm() {
		return dt_build_nm;
	}
	public void setDt_build_nm(String dt_build_nm) {
		this.dt_build_nm = dt_build_nm;
	}
	public String getBuild_mng_no() {
		return build_mng_no;
	}
	public void setBuild_mng_no(String build_mng_no) {
		this.build_mng_no = build_mng_no;
	}
	public String getDong_seq() {
		return dong_seq;
	}
	public void setDong_seq(String dong_seq) {
		this.dong_seq = dong_seq;
	}
	public String getHj_dong_cd() {
		return hj_dong_cd;
	}
	public void setHj_dong_cd(String hj_dong_cd) {
		this.hj_dong_cd = hj_dong_cd;
	}
	public String getHj_dong_nm() {
		return hj_dong_nm;
	}
	public void setHj_dong_nm(String hj_dong_nm) {
		this.hj_dong_nm = hj_dong_nm;
	}
	public String getZip_code() {
		return zip_code;
	}
	public void setZip_code(String zip_code) {
		this.zip_code = zip_code;
	}
	public String getZip_seq() {
		return zip_seq;
	}
	public void setZip_seq(String zip_seq) {
		this.zip_seq = zip_seq;
	}
	public String getDelivery_nm() {
		return delivery_nm;
	}
	public void setDelivery_nm(String delivery_nm) {
		this.delivery_nm = delivery_nm;
	}
	public String getChng_cd() {
		return chng_cd;
	}
	public void setChng_cd(String chng_cd) {
		this.chng_cd = chng_cd;
	}
	public String getGosi_date() {
		return gosi_date;
	}
	public void setGosi_date(String gosi_date) {
		this.gosi_date = gosi_date;
	}
	public String getChng_bf_road_juso() {
		return chng_bf_road_juso;
	}
	public void setChng_bf_road_juso(String chng_bf_road_juso) {
		this.chng_bf_road_juso = chng_bf_road_juso;
	}
	public String getSigu_build_nm() {
		return sigu_build_nm;
	}
	public void setSigu_build_nm(String sigu_build_nm) {
		this.sigu_build_nm = sigu_build_nm;
	}
	public String getHouse_yn() {
		return house_yn;
	}
	public void setHouse_yn(String house_yn) {
		this.house_yn = house_yn;
	}
	public String getArea_no() {
		return area_no;
	}
	public void setArea_no(String area_no) {
		this.area_no = area_no;
	}
	public String getDetail_juso_yn() {
		return detail_juso_yn;
	}
	public void setDetail_juso_yn(String detail_juso_yn) {
		this.detail_juso_yn = detail_juso_yn;
	}
	public String getBigo1() {
		return bigo1;
	}
	public void setBigo1(String bigo1) {
		this.bigo1 = bigo1;
	}
	public String getBigo2() {
		return bigo2;
	}
	public void setBigo2(String bigo2) {
		this.bigo2 = bigo2;
	}
	public String getAddr_gubun() {
		return addr_gubun;
	}
	public void setAddr_gubun(String addr_gubun) {
		this.addr_gubun = addr_gubun;
	}
	public String getLevel_addr() {
		return level_addr;
	}
	public void setLevel_addr(String level_addr) {
		this.level_addr = level_addr;
	}
	public String getAddr_nm() {
		return addr_nm;
	}
	public void setAddr_nm(String addr_nm) {
		this.addr_nm = addr_nm;
	}
	public String getAddr_pre_no() {
		return addr_pre_no;
	}
	public void setAddr_pre_no(String addr_pre_no) {
		this.addr_pre_no = addr_pre_no;
	}
	public String getAddr_post_no() {
		return addr_post_no;
	}
	public void setAddr_post_no(String addr_post_no) {
		this.addr_post_no = addr_post_no;
	}
	public String getJibun_addr_no() {
		return jibun_addr_no;
	}
	public void setJibun_addr_no(String jibun_addr_no) {
		this.jibun_addr_no = jibun_addr_no;
	}
	public String getRoad_addr_no() {
		return road_addr_no;
	}
	
	public String getBasement_yn() {
		return basement_yn;
	}
	public void setBasement_yn(String basement_yn) {
		this.basement_yn = basement_yn;
	}
	public String getBuild_main_no() {
		return build_main_no;
	}
	public void setBuild_main_no(String build_main_no) {
		this.build_main_no = build_main_no;
	}
	public String getBuild_sub_no() {
		return build_sub_no;
	}
	public void setBuild_sub_no(String build_sub_no) {
		this.build_sub_no = build_sub_no;
	}
	public void setRoad_addr_no(String road_addr_no) {
		this.road_addr_no = road_addr_no;
	}	
}
