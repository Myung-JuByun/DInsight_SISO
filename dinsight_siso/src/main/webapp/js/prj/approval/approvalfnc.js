var SELECT_STATUS,STATUSLIST;

function defaultCodeLoadList(){
	var obj = {year :"",month :"",week :"",status :1701};
	callProjectApprovalData(obj, function (data){
		STATUSLIST=data.statusList;
	});
}

function defaultLoadList(){
	initView();	
	//데이터 검색 , callApprovalData에 필요한 parameter를 obj 객체를 이용하여 넘김.
	var obj = {year : $("#sh_expanse_year").val(),month :$("#sh_expanse_month").val(),week :$("#sh_expanse_week").val(),status :1701};
	callProjectApprovalData(obj, function (data){
		approvalList(data.approvalList);
	});
}

function approvalSearch() {
	var obj = {year : $("#sh_expanse_year").val(),month :$("#sh_expanse_month").val(),week :$("#sh_expanse_week").val(),status : $("#sh_status_cd").val()};
	callProjectApprovalData(obj, function (data){
		approvalList(data.approvalList);
	});
}

function initView(){
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
	
	dir(dateStr)
	var maxWeek = getWeekCountOfMonthMonday(dateStr);
	//var nowWeek = getSecofWeekMonday(dateStr);
	//var monthWeek = getSecofWeekMonday(dateStr);
	//compareNowDate = year + month + monthWeek;
	
	var compareNowDate = getSecofWeekMonday(dateStr);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	week = compareNowDate.substring(6,7);
		
	var select_year = document.getElementById("sh_expanse_year");
	var select_month = document.getElementById("sh_expanse_month");
	var select_week = document.getElementById("sh_expanse_week");
	
	for(var i=0 ; i<maxWeek ; i++){
		var optionEl = document.createElement("option");
		optionEl.value = parseInt(i+1);
		var textnodeEl = document.createTextNode(parseInt(i+1));
		optionEl.appendChild(textnodeEl);
		select_week.appendChild(optionEl);
	}
	
	for(var i=0 ; i<select_year.options.length ; i++){
		if(select_year.options[i].value == year) select_year.options[i].selected = true;
	}
	
	for(var i=0 ; i<select_month.options.length ; i++){
		if(select_month.options[i].value == month) select_month.options[i].selected = true;
	}
	
	for(var i=0 ; i<select_week.options.length ; i++){
		if(select_week.options[i].value == week) select_week.options[i].selected = true;
	}
	
	select_year.onchange = function(e){
		select_week.innerHTML = "";
		var dateStr2 = select_year.value;
		if(select_month.value.length == 1){
			dateStr2 = dateStr2 + "0" + select_month.value + "1"; 
		}else{
			dateStr2 = dateStr2 + "" + select_month.value + "1";
		}
		var maxWeek2 = getWeekCountOfMonthMonday(dateStr2);
		for(var i=0 ; i<maxWeek2 ; i++){
			var optionEl = document.createElement("option");
			optionEl.value = parseInt(i+1);
			var textnodeEl = document.createTextNode(parseInt(i+1));
			optionEl.appendChild(textnodeEl);
			select_week.appendChild(optionEl);
		}
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_expanse_year").value, document.getElementById("sh_expanse_month").value, document.getElementById("sh_expanse_week").value, "#weekDate");
	};
	
	select_month.onchange = function(e){
		select_week.innerHTML = "";
		var dateStr2 = select_year.value;
		if(select_month.value.length == 1){
			dateStr2 = dateStr2 + "0" + select_month.value + "1"; 
		}else{
			dateStr2 = dateStr2 + "" + select_month.value + "1";
		}
		var maxWeek2 = getWeekCountOfMonthMonday(dateStr2);
		for(var i=0 ; i<maxWeek2 ; i++){
			var optionEl = document.createElement("option");
			optionEl.value = parseInt(i+1);
			var textnodeEl = document.createTextNode(parseInt(i+1));
			optionEl.appendChild(textnodeEl);
			select_week.appendChild(optionEl);
		}
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_expanse_year").value, document.getElementById("sh_expanse_month").value, document.getElementById("sh_expanse_week").value, "#weekDate");
	};
	
	select_week.onchange = function(e){
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_expanse_year").value, document.getElementById("sh_expanse_month").value, document.getElementById("sh_expanse_week").value, "#weekDate");
	};
	
	//선택한 주의 기간 표시
	getWeekDate(document.getElementById("sh_expanse_year").value, document.getElementById("sh_expanse_month").value, document.getElementById("sh_expanse_week").value, "#weekDate");
}

//승인
function approval_permit(bt,con){	
	generalPop("승인처리 하시겠습니까?", function (){
		var obj=bt.param;;
		
		$.ajax({
			url: "/prj/approval/projectApprovalPermit",
			type: "POST",
			data:{"node_id":obj.node_id, "source_object_id":obj.source_object_id, "approval_id":obj.approval_id, "final_expanse_appoint":obj.final_expanse_appoint},
			success : function (data) {
				if(data != "success")
					generalPop(data);
				cf.killTag(con.parentNode);
				approvalSearch();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
}

//반려
function approval_return(bt,con){
	generalPop("반려처리 하시겠습니까?", function (){
		var obj=bt.param;
		$.ajax({
			url: "/prj/approval/projectAapprovalCancel",
			type: "POST",
			data:{"node_id":obj.node_id, "source_object_id":obj.source_object_id, "approval_id":obj.approval_id},
			success : function (data) {
				if(data != "success")
					generalPop(data);
				cf.killTag(con.parentNode);
				approvalSearch();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
}