<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	.paddingRight {padding-right:10px;}
	.div_overflow_print {width:100%; height:836px; overflow-x:hidden; overflow-y:auto;}
</style>

<%@ include file="/template/prj/projectApproval" %>

<script src="/js/prj/approval/approvalfnc.js"></script>
<script src="/js/prj/approval/approvalpop.js"></script>
<script src="/js/prj/approval/approvalpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				no : "No.",
				title : "제목",
				state : "상태",
				draft : "기안",
				draftDate : "기안일",
				seeDetail : "상세보기"
			}
		});
		
		mkSearch();
		defaultLoadList();
	});
</script>