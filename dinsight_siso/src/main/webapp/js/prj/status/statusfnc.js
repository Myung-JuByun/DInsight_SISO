var MEMBERLIST,JOBLIST,EMPLOYEELIST,ROLERIST,STAYLIST;

function defaultLoadList(){
	initView();
    var temp = null;
	//데이터 검색
	$.ajax({
		url: "/prj/status/projectStatusSearchCondList",
		type: "POST",
		dataType: "json",
		success : function (data) {
			MEMBERLIST=data.memberList;
			JOBLIST=data.jobType;
			EMPLOYEELIST=data.employeeType;
			ROLERIST=data.roleType;
			STAYLIST=data.stayType;
			searchMemberHTML("#sh_project_member_id", data.memberList);
			searchCodeHTML("#sh_job_type", "직급", data.jobType);
			searchCodeHTML("#sh_employee_type", "고용형태", data.employeeType);
			searchCodeHTML("#sh_role_type", "역할", data.roleType);
			searchCodeHTML("#sh_stay_type", "상주상태", data.stayType);
			
			getProjectStatusList();
			$('.wrap-loading').hide(20);
   		},
   		beforeSend:function(){
   			$('.wrap-loading').show();
   		}
	});
	//getProjectStatusList();
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
	
	var maxWeek = getWeekCountOfMonthMonday(dateStr);	
	var compareNowDate = getSecofWeekMonday(dateStr);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	week = compareNowDate.substring(6,7);
		
	var select_year = document.getElementById("sh_report_yy");
	var select_month = document.getElementById("sh_report_mm");
	var select_week = document.getElementById("sh_report_week");
	
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
		getWeekDate(document.getElementById("sh_report_yy").value, document.getElementById("sh_report_mm").value, document.getElementById("sh_report_week").value, "#weekDate");
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
		getWeekDate(document.getElementById("sh_report_yy").value, document.getElementById("sh_report_mm").value, document.getElementById("sh_report_week").value, "#weekDate");
	};
	select_week.onchange = function(e){
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_report_yy").value, document.getElementById("sh_report_mm").value, document.getElementById("sh_report_week").value, "#weekDate");
	};	
	
	//선택한 주의 기간 표시
	getWeekDate(document.getElementById("sh_report_yy").value, document.getElementById("sh_report_mm").value, document.getElementById("sh_report_week").value, "#weekDate");
}

function getProjectStatusList() {
	reSetDataArea();
	var temp = $("input, select").serialize();
	$.ajax({
		url :"/prj/status/projectStatusList",
		type :"POST",
		dataType :"json",
		data :	temp,
		async: true,
		success :function ( data ) {
			setResultData( data );
			$('.wrap-loading').hide(20);
   		},
   		beforeSend:function(){
   			$('.wrap-loading').show();
   		}
	});
};