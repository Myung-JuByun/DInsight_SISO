<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@page import="java.util.*" %>
<%@ include file="/template/prj/projectAdmin" %>

	<!-- bottom table end -->
<script src="/js/prj/admin/adminfnc.js"></script>
<script src="/js/prj/admin/adminpop.js"></script>
<script src="/js/prj/admin/adminpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".btn_action",
			data : {
				btnList : [
					{func:"prjAdd();", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"prjModi();", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"prjDel();", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"}
				]
			}
		});
		
		new Vue({
			el : ".con_table",
			data : {
				tblStyle : "width:100%; table-layout:fixed",
				no : "No.",
				pCode : "Project Code",
				projectNm : "프로젝트명",
				division : "구분",
				project : "프로젝트",
				contract : "계약",
				customerCompany : "고객사",
				customerCompanyNm : "고객사명",
				relatedDept : "관련부서",
				contractPrice : "계약금액(만)",
				startDate : "시작일",
				endDate : "종료일",
				mm : "(M/M)",
				customerCompanyNm : "고객사명",
				charger : "담당자",
				contact : "연락처"				
			}
		});
		
		new Vue({
			el : "#btn_info",
			data : {
				btnBottomList : [
					{btnImg:"/images/btn/btn_plus_off.gif", altText:"X"},
					{btnImg:"/images/btn/btn_del_off.gif", altText:"X"},
					{btnImg:"/images/btn/btn_save_off.gif", altText:"X"}
				],
				requiredMsg : "* 표시는 필수 입력 항목입니다."
			}
		});
		
		new Vue({
			el : "#bottom_table",
			data : {
				assignInfo : "프로젝트 투입정보(상위 Grid 내 선택된 정보값)",
				no : "No.",
				employee : "사원명",
				role : "역할",
				stayState : "상주상태",
				assignStart : "투입 시작일",
				assignEnd : "투입 종료일",
				contractMM : "계약 M/M"
			}
		});
		
		mkSearchDiv();
		defaultLoadList();
	});
</script>		