//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
var defaultLoadList = function(){
	initView();	
	forCastingStatusList();
};

var initView = function(){	
	var date = new Date(),
		year = date.getFullYear() + "",
		month = date.getMonth() + 1,
		dateStr,monday;
	if(month < 10) month = "0" + month;
	else month = month + "";
	var day = date.getDate();
	if(day < 10) day = "0" + day;
	else day = day + "";
	
	monday=new Date(srchMonday([[year],[month],[day]]));
	today=new Date(year + "-" + month + "-" + day);
	
	if(monday.getMonth()==today.getMonth()){
		dateStr = year + "" + month + "" + day;
	}else{
		dateStr=srchMonday([[year],[month],[day]]);	
		dateStr=saveDate(dateStr);
	}
	var maxWeek = getWeekCountOfMonthMonday(dateStr);
	//var nowWeek = getSecofWeekMonday(dateStr);
	
	compareNowDay = year + month + day;
	//var comMonthWeek = getSecofWeekMonday(compareNowDay);
	//compareNowDate = year + month + comMonthWeek;
	
	var compareNowDate = getSecofWeekMonday(compareNowDay);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	comMonthWeek = compareNowDate.substring(6,7);
	
	var forecastingyy = document.getElementById("sh_sales_year");
	var forecastingmm = document.getElementById("sh_sales_month");
	var forecastingweak = document.getElementById("sh_sales_week");
	
	
	for(var i=0 ; i<maxWeek ; i++){
		var optionEl = document.createElement("option");
		optionEl.value = parseInt(i+1);
		var textnodeEl = document.createTextNode(parseInt(i+1));
		optionEl.appendChild(textnodeEl);
		forecastingweak.appendChild(optionEl);
	}
	
	//년월생성
	createYearMonthDay("Y", "2013", "#sh_sales_year");
	createYearMonthDay("M", "", "#sh_sales_month");
	
	//년월 데이터 선택하기(검색)
	//$("#sh_sales_year").val(CurrentDate[0]);
	//$("#sh_sales_month").val(CurrentDate[1]);
	//$("#sh_sales_week").val(getSecofWeekMonday(date));
	
	for(var i=0 ; i<forecastingyy.options.length ; i++){
		if(forecastingyy.options[i].value == year) forecastingyy.options[i].selected = true;
	}
	
	for(var i=0 ; i<forecastingmm.options.length ; i++){
		if(forecastingmm.options[i].value == month) forecastingmm.options[i].selected = true;
	}
	
	for(var i=0 ; i<forecastingweak.options.length ; i++){
		if(forecastingweak.options[i].value == comMonthWeek) forecastingweak.options[i].selected = true;
	}
	
	forecastingyy.onchange = function(e){
		forecastingweak.innerHTML = "";
		var dateStr2 = forecastingyy.value;
		if(forecastingmm.value.length == 1){
			dateStr2 = dateStr2 + "0" + forecastingmm.value + "1"; 
		}else{
			dateStr2 = dateStr2 + "" + forecastingmm.value + "1";
		}
		var maxWeek2 = getWeekCountOfMonthMonday(dateStr2);
		for(var i=0 ; i<maxWeek2 ; i++){
			var optionEl = document.createElement("option");
			optionEl.value = parseInt(i+1);
			var textnodeEl = document.createTextNode(parseInt(i+1));
			optionEl.appendChild(textnodeEl);
			forecastingweak.appendChild(optionEl);
		}
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_sales_year").value, document.getElementById("sh_sales_month").value, document.getElementById("sh_sales_week").value, "#weekDate");
	};	
	
	forecastingmm.onchange = function(e){
		forecastingweak.innerHTML = "";
		var dateStr2 = forecastingyy.value;
		if(forecastingmm.value.length == 1){
			dateStr2 = dateStr2 + "0" + forecastingmm.value + "1"; 
		}else{
			dateStr2 = dateStr2 + "" + forecastingmm.value + "1";
		}
		var maxWeek2 = getWeekCountOfMonthMonday(dateStr2);
		for(var i=0 ; i<maxWeek2 ; i++){
			var optionEl = document.createElement("option");
			optionEl.value = parseInt(i+1);
			var textnodeEl = document.createTextNode(parseInt(i+1));
			optionEl.appendChild(textnodeEl);
			forecastingweak.appendChild(optionEl);
		}
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_sales_year").value, document.getElementById("sh_sales_month").value, document.getElementById("sh_sales_week").value, "#weekDate");
	};
	
	forecastingweak.onchange = function(e){		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_sales_year").value, document.getElementById("sh_sales_month").value, document.getElementById("sh_sales_week").value, "#weekDate");
	};
	
	//선택한 주의 기간 표시
	getWeekDate(document.getElementById("sh_sales_year").value, document.getElementById("sh_sales_month").value, document.getElementById("sh_sales_week").value, "#weekDate");
};

//검색
var formSearch = function() {
	$(".Show_detail").hide();
	var temp = $("input, select").serialize();
	//데이터 검색
	$.ajax({//"/sam/fcastingstatus/foreCastingStatusSearch",
		url: "/sam/fcastingstatus/foreCastingStatusList",
		type: "POST",
		data: temp,
		dataType: "json",
		success : function (data) {
			//리스트
			dataShowList(data.fStatusList);
			//리스트 상세보기
			dataShowDetailList(data.fStatusDetailList);
			$("#detailShowImg").attr("alt","hide");
			showDetail();
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};

//좌우메뉴 height resize
var autoHeight = function() {	
	var changeHeight = $("#Center_wrap").height() + 90;	
	$("#Left_wrap").height(changeHeight);
	//$("#Right_wrap").height(changeHeight);	
};