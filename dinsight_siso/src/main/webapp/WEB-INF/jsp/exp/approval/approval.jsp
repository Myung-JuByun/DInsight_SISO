<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<style type="text/css">
	.paddingRight {padding-right:10px;}
	.div_overflow_print {width:100%; height:836px; overflow-x:hidden; overflow-y:auto;}
</style>

<%@ include file="/template/exp/approval" %>

<script src="/js/exp/approval/approvalfnc.js"></script>
<script src="/js/exp/approval/approvalpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				scroll : "overflow-y:scroll;",
				no : "No.",
				title : "제목",
				state : "상태",
				draft : "기안",
				draftDate : "기안일",
				seeDetail : "상세보기"
			}
		});
		
		defaultLoadList();
		mkSearchDiv();
		setDate();
	});
</script>