var PLACEOFBUSINESS, SALESCUSTOMER, YN, SALES;

function defaultLoadList(){	
	
	$.ajax({
		  url: "/alc/admin/alcSearchAdminListAjax",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  success: function (data) {
			  PLACEOFBUSINESS = data.placeOfBusiness;
			  YN = data.yn;
			  SALES = data.sales;
		  }
	});
	
	//검색화면
	mkSearch();
	
	//자동완성
	autocompleteCompanySearch();
};