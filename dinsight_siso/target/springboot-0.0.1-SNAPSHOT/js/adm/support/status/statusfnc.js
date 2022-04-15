var rowCount=true;

mkSearchDiv();
defaultLoadList();

function defaultLoadList(){
	var yearSelc=document.getElementById("startYear");
	var monthSelc=document.getElementById("startMonth");
	var yearSelc2=document.getElementById("endYear");
	var monthSelc2=document.getElementById("endMonth");
	var inputStartDate=yearSelc.value+"-"+monthSelc.value;
	var inputEndDate=yearSelc2.value+"-"+monthSelc2.value;
	$.ajax({
		url: "/adm/purchaseSalesStatusSelectAjax",
		type: "POST",
		data: {
			startDate : inputStartDate,
			endDate : inputEndDate
		},
		dataType: "json",
		success : function (data) {
        	if(data.length>0)rowCount=false;
        	else rowCount=true;
			setInputValue(data);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
function dateSelect(yearSelc,monthSelc){
	var date = new Date(),
		year = date.getFullYear() + "",
		month = date.getMonth() + 1;

	if(month < 10) month = "0" + month;
	else month = month + "";

	createYearMonthDay("Y", 2013, yearSelc);
	createYearMonthDay("M", 1, monthSelc);

	for(var i=0 ; i<yearSelc.options.length ; i++){
		if(yearSelc.options[i].value == year) yearSelc.options[i].selected = true;
	}

	for(var i=0 ; i<monthSelc.options.length ; i++){
		if(monthSelc.options[i].value == month) monthSelc.options[i].selected = true;
	}
};
function formSearch(){
	var startDateInfo, endDateInfo,
		win_gb = document.getElementById("win_gb");
	startDateInfo = $('#startYear').val() +'-' + $('#startMonth').val();
	endDateInfo = $('#endYear').val() +'-' + $('#endMonth').val();
	
	if(win_gb.value==0){
		var obj = {
				startDate:startDateInfo,
				endDate:endDateInfo,
				in_project_code:$('#in_project_code').val(),
				in_staff_name:$('#in_staff_name').val()
		};
		$.ajax({
			url: "/adm/purchaseSalesStatusSelectAjax",
			type: "POST",
			data: obj,
			dataType: "json",
			success : function (data) {
				if(data.length>0)rowCount=false;
	        	else rowCount=true;
				setInputValue(data);
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	}else if(win_gb.value==1){  //매입일때
		var obj = {
				startDate:startDateInfo,
				endDate:endDateInfo,
				in_project_code:$('#in_project_code').val(),
				in_staff_name:$('#in_staff_name').val()
		};
		$.ajax({
			url: "/adm/purchaseStatusAjax",
			type: "POST",
			data: obj,
			dataType: "json",
			success : function (data) {
				if(data.length>0)rowCount=false;
	        	else rowCount=true;
				setInputValue(data);
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	}else if(win_gb.value==2){
		var obj = {startDate:startDateInfo,endDate:endDateInfo,in_project_code:$('#in_project_code').val(),
				in_staff_name:$('#in_staff_name').val()};
		$.ajax({
			url: "/adm/salesStatusAjax",
			type: "POST",
			data: obj,
			dataType: "json",
			success : function (data) {
				if(data.length>0)rowCount=false;
	        	else rowCount=true;	        	
				setInputValue(data);
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	}
};
function setNumberData ( obj, val ){
	if ( isNaN(val) ) {
		val = "&nbsp;";
	} else if (val == null ) {
		val = "&nbsp;";
	} else {
		if ( eval(val) < 0 ) {
			obj.style.color="red";
		} else {
			obj.style.color="black";
		}
		val = comma(val);
		obj.style.textAlign="right";
		obj.style.paddingRight=6+"px";
	}
	obj.innerHTML = val;
};