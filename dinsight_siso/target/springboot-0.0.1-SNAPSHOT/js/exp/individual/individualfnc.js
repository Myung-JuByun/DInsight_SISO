var srch_obj;

//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList(){		
	//년월생성
	//createYearMonthDay("Y", "2013", "#sh_expanse_year");		
	//결재 요청구분(검색)
	//$("#sh_expanse_year").val(CurrentDate[0]);
	setDate();
	//리스트, 검색 출력
	individualList();		
};	
//리스트 출력
function individualList(){	
	//데이터 검색
	$.ajax({
		url: "/exp/individual/individualList",
		type: "POST",
		data: {sh_expanse_year: $("#sh_expanse_year").val()},
		dataType: "json",
		success : function (data) {
			defaultAutoCompleteResult(data);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
//엑셀다운로드
function excelDown() {
	$(location).attr("href","<c:url value='/exp/individual/excelDownload.do?sh_expanse_year=" + $("#sh_expanse_year").val() + "'/>");
};	
//년 검색
function individualSearch() {
	//$("#searchForm").submit();
	var obj = {year : $("#sh_expanse_year").val(),month :$("#sh_expanse_month").val(),status : $("#sh_status_cd").val()};
	srch_obj=obj;
	individualList();
};