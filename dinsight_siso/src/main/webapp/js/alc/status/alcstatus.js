var SALES;

function defaultLoadList(){	
	
	$.ajax({
		  url: "/alc/status/alcSearchStatusList",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  success: function (data) {
			  SALES = data.sales;
		  }
	});
	
	//검색화면
	mkSearch();
	
	//자동완성
	autocompleteCompanySearch();
	
	//리스트 출력
	alcStatusSearchList();
};