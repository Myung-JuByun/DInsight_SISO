<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	img {cursor:pointer}
	.price_padding {text-align:right; padding-right:10px}
</style>

<%@ include file="/template/sas/prjCodeConvert" %>

<script src="/js/sas/project/projectfnc.js"></script>
<script src="/js/sas/project/projectpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				checkMethod : "GroupCheck('CheckMode', 'in_sales_project_id');",
				year : "연도",
				month : "월",
				pCode : "Project Code",
				division : "구분",
				customerCompany : "고객사명",
				product : "제품",
				salesStatus : "영업현황",
				charger : "담당",
				contractPrice : "계약금액",
				purchasePrice : "매입금액",
				salesProfit : "영업이익"
			}
		});
		
		mkSearchDiv();
		defaultLoadList();
	});
</script>