<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>

<c:set var="date" value="<%=new Date() %>"/>
<%@ include file="/template/prj/projectReport" %>

<script src="/js/prj/report/reportfnc.js"></script>
<script src="/js/prj/report/reportpop.js"></script>
<script src="/js/prj/report/reportpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : "#mm_head",
			data : {
				no : "No.",
				projectNm : "프로젝트명",
				sum : "합계",
				issue : "이슈사항",
				state : "상태",
				dayTh : [
					{day:"월", id:"mon_day"},
					{day:"화", id:"tue_day"},
					{day:"수", id:"wed_day"},
					{day:"목", id:"thu_day"},
					{day:"금", id:"fri_day"},
					{day:"토", id:"sat_day"},
					{day:"일", id:"sun_day"}
				],
				statusDayTh : ["status_mon", "status_tue", "status_wed", "status_thu", "status_fri", "status_sat", "status_sun"],
				dayStyle : "font-size:10px; margin-left:5px;"
			}
		});
		
		mkSearchDiv();
		defaultLoadList("0");
	});
</script>