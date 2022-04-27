<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/template/sas/productSalesApproval" %>

<script src="/js/sas/approval/prdsalesapproval.js"></script>
<script src="/js/sas/approval/prdsalesapprovalpages.js"></script>
<script src="/js/sas/approval/prdsalesapprovalfnc.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				scroll : "overflow-y:scroll;",
				tblWidth : "width:802px;",
				normalTbl : "Normal_table",
				no : "No.",
				title : "제목",
				state : "상태",
				draft : "기안",
				draftDate : "기안일",
				seeDetail : "상세보기"
			}
		});
		
		defaultLoadList();
	});
</script>