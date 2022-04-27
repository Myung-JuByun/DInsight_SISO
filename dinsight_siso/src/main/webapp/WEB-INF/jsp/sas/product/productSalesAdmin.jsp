<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/template/sas/productSalesAdmin" %>

<script src="/js/sas/product/salespop1.js"></script>
<script src="/js/sas/product/salesfnc.js"></script>
<script src="/js/sas/product/salespages.js"></script>
<script>
	//페이지 새로고침 시에 팝업 닫기
	$(window).on("beforeunload", function(){
		if(prev_salespop01 && prev_salespop01.pop && (prev_salespop01.flag=="modi" || prev_salespop01.flag == "new"))
			prev_salespop01.pop.close();		
	});
	
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				scroll : "overflow-y:scroll;",				
				no : "No.",
				createDate : "작성일",
				pCode : "Project Code",
				customer : "고객",
				division : "구분",
				totalContractPrice : "총계약금",
				purchasePrice : "매입금",
				salesProfit : "영업이익",
				degree : "차수",
				state : "상태",
				watch : "보기"
			}
		});
		
		mkSearchDiv();
		defaultLoadList();	
	});	
</script>