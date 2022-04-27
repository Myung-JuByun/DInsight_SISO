$(document).ready(function(){
	new Vue({
		el : "#searchForm",
		data : {
			deptEmplName : "부서/사원명",
			no : "No.",
			date : "날짜",
			division : "구분",
			kind : "분류",
			price : "금액",
			history : "내역",
			state : "상태",
			btnList : [
				{btnImg:"/images/btn/btn_mil_off.gif", altText:"마일리지"},
				{func:"openPrint()", btnImg:"/images/btn/btn_print_on.gif", altText:"인쇄"},
				{func:"approvalRecall()", btnImg:"/images/btn/btn_recall_on.gif", altText:"회수"},
				{func:"approvalPermit()", btnImg:"/images/btn/btn_ok_on.gif", altText:"승인"}
			]
		}
	});
	
	$(".Right_group > .btn_action > ul > li:eq(0)").attr("id", "mile");	
	mkSearchDiv();
	defaultLoadList();	
});
