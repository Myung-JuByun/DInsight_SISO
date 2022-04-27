<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@ page import="java.util.*" %>
<%@ include file="/template/sas/contractAdmin" %>

<script src="/js/sas/contract/contractfnc.js"></script>
<script src="/js/sas/contract/contractpages.js"></script>
<script src="/js/sas/contract/contractpop.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				scroll : "overflow-y:scroll;",
				no : "No.",
				pCode : "Project Code",
				contractName : "계약서명",
				file : "파일",
				version : "버전",
				watch : "보기"
			}
		});
		
		mkSearchDiv();
		mkBtnDiv();
		defaultLoadList();
	});
</script>