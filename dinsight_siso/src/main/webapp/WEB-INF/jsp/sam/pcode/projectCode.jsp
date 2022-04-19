<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	img {cursor: pointer}
</style>

<%@ include file="/template/projectCode" %>

<script>
	var login_userid = "<c:out value='${loginVO.user_id}' />";
	
	new Vue({
		el : ".btn_action",
		data : {
			message : "* 표시는 필수 입력 항목입니다.",
			btnList : [
				{func:"javascript:pcodeAdd()", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
				{func:"javascript:pcodeDel()", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"},
				{func:"javascript:pcodeSave()", btnImg:"/images/btn/btn_save_on.gif", altText:"저장"}
			]
		}
	});
	
	new Vue({
		el : "#pCodeTable",
		data : {
			year : "년도",
			month : "월",
			division : "구분",
			companyNm : "고객사명",
			product : "제품",
			salesStatus : "영업 현황",
			department : "부서",
			chargeSales : "담당영업",
			expectedPrice : "계약예정 금액",
			importPrice : "매입금액",
			salesProfit : "영업이익",
			completeYn : "완료여부",
			modifier : "수정자"
		}
	});	
</script>
<script src="/js/sam/pcode/pcodefnc.js"></script>
<script src="/js/sam/pcode/pcodepages.js"></script>