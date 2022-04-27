var prev_salespop01;

//검색
function prdSalesApprovalList(){
	var temp = $("#searchDiv").find("input, select").serializeArray();
	$.ajax({
		url: "/sas/approval/prdSalesApprovalList",
		type: "POST",
		data: temp,
		dataType: "json",
		success: function (data) {
			approvalList(data.prdSalesApprovalList);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
}

function callpopup(flag,num){
	if(flag !="view"){
		if(num) num=(num*1)+1;
		else num=1;
	}
	prev_salespop01=this;
	prev_salespop01.opt=true;
	prev_salespop01.num=num;
	prev_salespop01.flag=flag;
	if(prev_tr)prev_salespop01.sales_confer_id=prev_tr.obj.sales_confer_id;
	if(prev_salespop01.pop){
		prev_salespop01.pop.location.href="../product/productSalesPop";
		prev_salespop01.pop.focus();
	}else window.open("../product/productSalesPop","_blank","fullscreen=yes,scrollbars=yes,resizable=yes, height=" + screen.height + ",width=" + screen.width);
}