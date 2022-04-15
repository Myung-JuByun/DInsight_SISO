function callData(url, param, fnc){
	$.ajax({
		url: url,
		type: "POST",
		data: param,
		async: false,
		dataType: 'json',
		success: function (data) {			
			fnc(data);
			$('.wrap-loading').hide(20);
		},
		error:function(request,status,error){
        	console.log("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
        },
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
function callData2(url, fnc){
	$.ajax({
		url: url,
		type: "POST",
		async: false,
		dataType: 'json',
		success: function (data) {
			fnc(data);
			$('.wrap-loading').hide(20);
		},
		error:function(request,status,error){
        	console.log("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
        },
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
function callApprovalData(obj, fnc){
		
	//var year= 2014, month=12, status=1701;
	callData(
		"/exp/approval/approvalList",
		{ "sh_expanse_year" : obj.year , "sh_expanse_month" : obj.month , "sh_status_cd" : obj.status },
		fnc
	);
	
	/*
	$.ajax({
		  url: "/exp/approval/approvalList",
		  type: "POST",
		  data: { "sh_expanse_year" : year , "sh_expanse_month" : month },
		  async: false,
		  dataType: 'json',
		  success: function (data) {
			  fnc(data);
		  }
	});
	*/
};
function callCodeAdminData(fnc){
	
	//var year= 2014, month=12, status=1701;
	callData2(
		"/adm/code/selectCmnGrpCodeList",
		fnc
	);
};
function callUserDivisionData(fnc){
	callData2(
		"/adm/user/divisionList",
		fnc
	);
};
function callExpanseCategoryData(fnc){
	callData2(
		"/adm/category/selectExpanseCategory",
		fnc
	);
};
function callexApprovalData(obj, fnc){
	
	//var year= 2014, month=12, status=1701;
	callData(
		"/adm/expapproval/approvalListAjax",
		{ "sh_expanse_year" : obj.year , "sh_expanse_month" : obj.month },
		fnc
	);
};
function callCustomerAdminData(obj,fnc){
	callData(
		"/cop/customerAdminAjax",
		obj,
		fnc
	);
};
function callSubCustomerAdminData(obj, fnc){
	callData(
		"/cop/selectCustomerSubList",
		{ "sh_company_id" : obj.company_id },
		fnc
	);
};
function callProjectCodeData(obj, fnc){	
	callData(
		"/sam/pcode/projectCodeList",
		{ sh_sales_project_year: obj.year, sh_sales_project_month: obj.month, sh_company_name: obj.name, 
			sh_sales_type_cd : obj.type_cd, sh_sales_status_cd : obj.status_cd, sh_brand_cd : obj.brand_cd, 
			sh_user_id : obj.user_id, win_gb : obj.win_gb, 
			sh_closing_year: obj.closingYear, sh_closing_month: obj.closingMonth},
		fnc
	);
};
function callstatusDetailCodeData(obj,fnc){
	callData(
		"/sam/fcasting/foreCastingStatusDetailCodeAjax",
		obj,
		fnc
	);
};
function callProjectAdminData(obj, fnc){
	if(obj.month.length < 2){
		obj.month = "0" + obj.month;
	}
	callData(
		"/prj/admin/projectAdminAjax",
		{ year: obj.year, month: obj.month, project_name: obj.pjname, company_name: obj.coname, sel_user_name: obj.username },
		fnc
	);
};
function callProjectBottomData(obj, fnc){
	callData(
		"/prj/admin/projectAdminMemberAjax",
		{ in_sub_project_id: obj.pjid},
		fnc
	);
};
function callProjectReportData(obj, fnc){
	callData(
		"/prj/report/projectReportList",
		{ sh_project_year: obj.year, sh_project_month: obj.month, sh_project_week: obj.week},
		fnc
	);
};
function callQuoteAdminData(obj,fnc){
	callData(
		"/sas/quote/quoteAdminListAjax",
		obj,
		fnc
	);
};
function callQuoteDetailData(obj, fnc){
	callData(
			"/sas/quote/quoteAdminRivisionListAjax",
			{ in_quote_project_code: obj.pjcode},
			fnc
		);
};
function callContractAdminData(obj,fnc){
	callData(
		"/sas/Contract/ContractAdminListAjax",
		obj,
		fnc
	);
};
function callContractDetailData(obj, fnc){
	callData(
			"/sas/Contract/ContractAdminRivisionListAjax",
			{ sh_contract_project_code : obj.pjcode},
			fnc
		);
};
function callProductSalesData(obj, fnc){
	callData(
			"/sas/product/productSalesList",
			{ sh_product_sales_year:obj.year, sh_product_sales_month:obj.month, sh_company_name:obj.companyname, sh_project_code:obj.pjcode, sh_brand_cd:obj.brandcd},
			fnc
		);
};
function callProductSalesDetailData(obj, fnc){
	callData(
			"/sas/product/productSalesDetail",
			obj,
			fnc
		);
};
function callProductSalesViewData(obj, fnc){
	callData(
		"/sas/product/productSalesView",
		obj,
		fnc
	);
};
function callProductSalesKindGbData(obj, fnc){
	callData(
		"/sas/product/selectCheckKind",
		obj,
		fnc
	);
};
function callProjectApprovalData(obj, fnc){
	callData(
		"/prj/approval/projectApprovalList",
		{ "sh_expanse_year" : obj.year , "sh_expanse_month" : obj.month, "sh_expanse_week" : obj.week, "sh_status_cd" : obj.status },
		fnc
	);
};
function callProjectApprovalDetailData(obj, fnc){
	callData(
		"/prj/approval/projectApprovalView",
		{ "sh_expanse_year":obj.year, "sh_expanse_month":obj.month, "sh_expanse_week":obj.week, "sh_user_id":obj.userid, "source_object_id":obj.objectid},
		fnc
	);
};
function callPrdMainListData(obj, fnc){
	callData(
		"/prd/prdSearchList",
		obj,
		fnc
	);
};
function callPrdDetailListData(obj, fnc){
	callData(
		"/prd/prdDetailList",
		obj,
		fnc
	);
};
function callPrdYearCheck(obj, fnc){
	callData(
		"/prd/prdYearCheck",
		obj,
		fnc
	);
};
function callDivisionMemberData(fnc){
	callData2(
		"/adm/auth/authInfoListAjax",
		fnc
	);
};
function callExpanseReferenceData(fnc){
	callData2(
		"/exp/reference/referenceListAjax",
		fnc
	);
};
function CallSalesCustomerData(obj, fnc){
	callData(
		"/cop/selectSalesCustomerList",
		obj,
		fnc
	);
};
function CallCopDivisionData(fnc){
	callData2(
		"/cop/divisionListAjax",
		fnc
	);
};