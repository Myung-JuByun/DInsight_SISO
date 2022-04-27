var STATUS;
var defaultLoadList = function(){		
	$.ajax({
		  url: "/sas/approval/prdSalesApprovalSearch",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  success: function (data) {
			  STATUS = data.statusList;
		  }
	});
	
	//검색화면
	mkSearch();	
	//리스트
	prdSalesApprovalList();
};