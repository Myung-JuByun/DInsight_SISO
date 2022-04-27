var STATUSLIST,len,prev,dropdown,current,approval,prev_data,pop_prev_data,compareNowDate,popListData,
	select_mon=new Array(),select_tue=new Array(),select_wed=new Array(),select_thu=new Array(),select_fri=new Array(),select_sat=new Array(),select_sun=new Array(),
	select_pop_mon=new Array(),select_pop_tue=new Array(),select_pop_wed=new Array(),select_pop_thu=new Array(),select_pop_fri=new Array(),
	select_pop_sat=new Array(),select_pop_sun=new Array();

function defaultLoadList(initCode){
	createYearMonthDay("Y", "2013", "#sh_project_year");
	createYearMonthDay("M", "", "#sh_project_month");	
	//년월 데이터 선택하기(검색)
	//$("#sh_project_year").val(CurrentDate[0]);
	//$("#sh_project_month").val(CurrentDate[1]);
	
	initView();
	setDay();
	//var dateStr=srchMonday(cf.getToday()).replace(/-/g,""),
	var	select_year = document.getElementById("sh_project_year"),
		select_month = document.getElementById("sh_project_month"),
		select_week = document.getElementById("sh_project_week"),
		obj={year :select_year.value, month : select_month.value, week : select_week.value};
	callProjectReportData(obj, function (data){
		//dir(data);
		approval=data.paymentView;
		STATUSLIST=data.statusList;
		len=data.userList.length;
		mkBtn(data.userList);		
		popListData=data.userList;
	});
	
	popListData.trav(function(d,i){
		if(i==0) mkStatus();
		if(!d.project_name)d.project_name="";
		if(!d.mon_status_cd)d.mon_status_cd="";
		if(!d.mon_working_hour)d.mon_working_hour="";
		if(!d.tue_status_cd)d.tue_status_cd="";
		if(!d.tue_working_hour)d.tue_working_hour="";
		if(!d.wed_status_cd)d.wed_status_cd="";
		if(!d.wed_working_hour)d.wed_working_hour="";
		if(!d.thu_status_cd)d.thu_status_cd="";
		if(!d.thu_working_hour)d.thu_working_hour="";
		if(!d.fri_status_cd)d.fri_status_cd="";
		if(!d.fri_working_hour)d.fri_working_hour="";
		if(!d.sat_status_cd)d.sat_status_cd="";
		if(!d.sat_working_hour)d.sat_working_hour="";
		if(!d.sun_status_cd)d.sun_status_cd="";
		if(!d.sun_working_hour)d.sun_working_hour="";
		if(!d.status_cd)d.status_cd="";
		if(!d.status_cd_name)d.status_cd_name="";
	});		
	reportList(popListData);
	mkSumTb();
	dropdown=mkDropDown();
}

function searchAdmin(){
	setDay();
	var obj={year : document.getElementById("sh_project_year").value,month :document.getElementById("sh_project_month").value,week : document.getElementById("sh_project_week").value};
	callProjectReportData(obj, function (data){
		//dir(data);
		len=data.userList.length;
		reportList(data.userList);
		mkBtn(data.userList);		
		popListData=data.userList;
	});
	popListData.trav(function(d,i){
		if(i==0) mkStatus();
		if(!d.project_name)d.project_name="";
		if(!d.mon_status_cd)d.mon_status_cd="";
		if(!d.mon_working_hour)d.mon_working_hour="";
		if(!d.tue_status_cd)d.tue_status_cd="";
		if(!d.tue_working_hour)d.tue_working_hour="";
		if(!d.wed_status_cd)d.wed_status_cd="";
		if(!d.wed_working_hour)d.wed_working_hour="";
		if(!d.thu_status_cd)d.thu_status_cd="";
		if(!d.thu_working_hour)d.thu_working_hour="";
		if(!d.fri_status_cd)d.fri_status_cd="";
		if(!d.fri_working_hour)d.fri_working_hour="";
		if(!d.sat_status_cd)d.sat_status_cd="";
		if(!d.sat_working_hour)d.sat_working_hour="";
		if(!d.sun_status_cd)d.sun_status_cd="";
		if(!d.sun_working_hour)d.sun_working_hour="";
		if(!d.status_cd)d.status_cd="";
		if(!d.status_cd_name)d.status_cd_name="";
	});
	reportList(popListData);
	mkSumTb();
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

	var	maxWeek = getWeekCountOfMonthMonday(dateStr),
		compareNowYmw = getSecofWeekMonday(dateStr),
		select_year = document.getElementById("sh_project_year"),
		select_month = document.getElementById("sh_project_month"),
		select_week = document.getElementById("sh_project_week");	
	compareNowDate=dateStr;
	
	year = compareNowYmw.substring(0, 4);
	month = compareNowYmw.substring(4, 6);
	week = compareNowYmw.substring(6,7);
	
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
	
	select_year.onchange=function(e){
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
		getWeekDate(document.getElementById("sh_project_year").value, document.getElementById("sh_project_month").value, document.getElementById("sh_project_week").value, "#weekDate");
	};	
	select_month.onchange=function(e){
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
		getWeekDate(document.getElementById("sh_project_year").value, document.getElementById("sh_project_month").value, document.getElementById("sh_project_week").value, "#weekDate");
	};
	select_week.onchange=function(e){
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("sh_project_year").value, document.getElementById("sh_project_month").value, document.getElementById("sh_project_week").value, "#weekDate");
	};
	
	//선택한 주의 기간 표시
	getWeekDate(document.getElementById("sh_project_year").value, document.getElementById("sh_project_month").value, document.getElementById("sh_project_week").value, "#weekDate");
}

function setDay(){
	var week=document.getElementById("weekDate"),
		st=week.innerHTML.substring(1,11),
		ar=[0,1,2,3,4,5,6],
		ar2=["mon","tue","wed","thu","fri","sat","sun"];
	st=st.replace(/[.]/g,"-");
	var d_day=new Date(st),
		sday=new Date(st),
		ar3=[];
	ar.trav(function(d,i){
		if(i==0) var a=d_day;
		else var a=d_day.setDate(d_day.getDate()+1);
		ar3.push(new Date(a));
	});
	
	ar2.trav(function(d,idx){
		var str=d+"_day",
			span=document.getElementById(str);
		
		var	smonth=ar3[idx].getMonth()+1,
			sday=ar3[idx].getDate();		
		span.innerHTML="("+smonth+"/"+sday+")";
	});
}

function reportSave(fnc){	
	var week=["mon","tue","wed","thu","fri","sat","sun"];
	week.trav(function(day,idx){
		var st="in_"+day+"_status_cd",
			st2="status_"+day+"_cd",
			ar=document.getElementsByName(st),
			cid=document.getElementById(st2);
		ar.trav(function(d,i){
			d.value=cid.value;
		});
	});	
	var temp=$("input, select").serialize();
	generalPop("저장하시겠습니까?", function(){
		$.ajax({
			url: "/prj/report/projectReportInsert",
			type: "POST",
			data: temp,
			success : function (data) {
				if(data != "success") generalPop(data);
				else{
					generalPopOk("저장되었습니다.",function(){
						if(fnc)fnc();
					});
					searchAdmin();
				}
				searchAdmin();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
}

function reportSubmit(){
	//결제선 입력유무
	$.ajax({
		url: "/exp/admin/expansePaymentCount",
		type: "POST",
		async: false,
		data: {source_type_cd : "03"},
		success : function (data) {
			if(data != "fail") {approval = data;}
			$('.wrap-loading').hide(20);
   		},beforeSend:function(){
   			$('.wrap-loading').show();
   		}
	});
	
	if(approval=="0"){
		generalPopOk2("M/H 결재선지정이 필요합니다.<br/>결제선 지정을 하시겠습니까?", function(){
			//결제선지정 팝업 호출
			paymentPop();
		});
		return;
	}
	var temp=$("input, select").serialize();
	/*if(prev_data!=temp&&len>0){
		generalPopOk2("저장 후 제출 가능합니다.");
		return;
	}*/
	
	var ipt_mon=document.getElementsByName("in_mon_working_hour"),
		ipt_tue=document.getElementsByName("in_tue_working_hour"),
		ipt_wed=document.getElementsByName("in_wed_working_hour"),
		ipt_thu=document.getElementsByName("in_thu_working_hour"),
		ipt_fri=document.getElementsByName("in_fri_working_hour"),	
		mon=document.getElementById("status_mon"),
		tue=document.getElementById("status_tue"),
		wed=document.getElementById("status_wed"),
		thu=document.getElementById("status_thu"),
		fri=document.getElementById("status_fri"),
		sat=document.getElementById("status_sat"),
		sun=document.getElementById("status_sun");
	
	if(mon.childNodes.length>0){
		var sum=0;
		ipt_mon.trav(function(d,i){
			 sum+=d.value*1;
		});
		var ch=mon.childNodes[1].value*1;
		if(ch>sum){
			generalPopOk2("M/H가 부족합니다.",function(){
				ipt_mon[0].focus();
			});
			return;
		}
	}else{
		generalPopOk2("상태를 선택하세요.");
		return;
	}
	
	if(tue.childNodes.length>0){
		var sum=0;
		ipt_tue.trav(function(d,i){
			 sum+=d.value*1;
		});
		var ch=tue.childNodes[1].value*1;
		if(ch>sum){
			generalPopOk2("M/H가 부족합니다.",function(){
				ipt_tue[0].focus();
			});
			return;
		}
	}else{
		generalPopOk2("상태를 선택하세요.");
		return;
	}
	
	if(wed.childNodes.length>0){
		var sum=0;
		ipt_wed.trav(function(d,i){
			 sum+=d.value*1;
		});
		var ch=wed.childNodes[1].value*1;
		if(ch>sum){
			generalPopOk2("M/H가 부족합니다.",function(){
				ipt_wed[0].focus();
			});
			return;
		}
	}else{
		generalPopOk2("상태를 선택하세요.");
		return;
	}
	
	if(thu.childNodes.length>0){
		var sum=0;
		ipt_thu.trav(function(d,i){
			 sum+=d.value*1;
		});
		var ch=thu.childNodes[1].value*1;
		if(ch>sum){
			generalPopOk2("M/H가 부족합니다.",function(){
				ipt_thu[0].focus();
			});
			return;
		}
	}else{
		generalPopOk2("상태를 선택하세요.");
		return;
	}
	
	if(fri.childNodes.length>0){
		var sum=0;
		ipt_fri.trav(function(d,i){
			 sum+=d.value*1;
		});
		var ch=fri.childNodes[1].value*1;
		if(ch>sum){
			generalPopOk2("M/H가 부족합니다.",function(){
				ipt_fri[0].focus();
			});
			return;
		}
	}else{
		generalPopOk2("상태를 선택하세요.");
		return;
	}
	
	generalPop("제출하시겠습니까?", function(){
		$.ajax({
			url: "/prj/report/projectReportFinalInsert",
			type: "POST",
			data: temp,
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPop("제출되었습니다.");
				searchAdmin();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
}

function manhourSum(){
	var mon=document.getElementsByName("in_mon_working_hour"),
		tue=document.getElementsByName("in_tue_working_hour"),
		wed=document.getElementsByName("in_wed_working_hour"),
		thu=document.getElementsByName("in_thu_working_hour"),
		fri=document.getElementsByName("in_fri_working_hour"),
		sat=document.getElementsByName("in_sat_working_hour"),
		sun=document.getElementsByName("in_sun_working_hour"),
		sum=document.getElementsByName("in_man_hour");
	
	for(var i=0;i<len;i++){
		sum[i].value=(mon[i].value*1+tue[i].value*1+wed[i].value*1+thu[i].value*1+fri[i].value*1+sat[i].value*1+sun[i].value*1).toFixed(1);
		sum[i].readOnly=true;
	}
}

function mkDropDown(){
	var con=document.createElement("div");	
	Object.assign(con.style, {width:"200px", height:"310px", position:"absolute", left:"0px", top:"32px", display:"none", zIndex:10000});
	
	var con1=cf.mkTag("div",con);
	con1.className="pop-mypage";
	
	var con2=cf.mkTag("div",con1);	
	con2.id="pop-my";
	Object.assign(con2.style, {width:"200px", height:"310px", backgroundColor:"white", border:"2px solid black"});
	
	var con3=cf.mkTag("div",con2);
	con3.className="my_top";
	var span=cf.mkTag("span",con3);
	span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;상태";
	
	var con3_a=cf.mkTag("a",con3);
	con3_a.href="#";
	con3_a.className="my_top_closs";
	
	var con3_img=cf.mkTag("img",con3_a);	
	Object.assign(con3_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
	con3_img.onclick=function(){
		dropdown.style.display="none";
	};
	
	var con4=cf.mkTag("div",con2);
	con4.className="my-container";	
	Object.assign(con4.style, {width:"285px", height:"20px", overflowY:"auto"});
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
			
	statusTable(con5,con);	
	return con;
}

function statusSave(con){
	if(!prev) generalPopOk2("상태를 선택하세요");
	else{
		con.style.display="none";
		current.childNodes[1].innerHTML=prev.obj.code_name;
		
		var input=cf.mkTag("input",current.childNodes[1]);
		input.type="hidden";
		input.value=prev.obj.etc1;
		var a=current.childNodes[1].id,
			day=a.substring(7,10),
			st="status_"+day+"_cd",
			input2=cf.mkTag("input",current.childNodes[1]);
		input2.type="hidden";
		input2.id=st;
		input2.value=prev.obj.code_id;	
		prev.parentNode.style.backgroundColor="white";		
		setCode();
	}
}

function setCode(){
	var a=current.childNodes[1].id;	
	var day=a.substring(7,10);
	var st="in_"+day+"_status_cd";	
	var ar=document.getElementsByName(st);	
	ar.trav(function(d,i){
		d.value=prev.obj.code_id;
	});
}

function setStatus(){
	var mon=document.getElementById("status_mon"),
		tue=document.getElementById("status_tue"),
		wed=document.getElementById("status_wed"),
		thu=document.getElementById("status_thu"),
		fri=document.getElementById("status_fri"),
		sat=document.getElementById("status_sat"),
		sun=document.getElementById("status_sun");	
	mon.innerHTML="";
	tue.innerHTML="";
	wed.innerHTML="";
	thu.innerHTML="";
	fri.innerHTML="";
	sat.innerHTML="";
	sun.innerHTML="";
	
	if(select_mon[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_mon[0].value){
				mon.innerHTML=d.code_name;
				var input=cf.mkTag("input",mon);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",mon);
				ipt2.type="hidden";
				ipt2.id="status_mon_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		mon.innerHTML="정상";
		var ipt=cf.mkTag("input",mon);
		ipt.type="hidden";
		ipt.value=8;
		var ipt2=cf.mkTag("input",mon);
		ipt2.type="hidden";
		ipt2.id="status_mon_cd";
		ipt2.value="01";
		
		if(mon.childNodes.length>0){
			select_mon.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_tue[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_tue[0].value){
				tue.innerHTML=d.code_name;
				var input=cf.mkTag("input",tue);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",tue);
				ipt2.type="hidden";
				ipt2.id="status_tue_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		tue.innerHTML="정상";
		var ipt=cf.mkTag("input",tue);
		ipt.type="hidden";
		ipt.value=8;
		var ipt2=cf.mkTag("input",tue);
		ipt2.type="hidden";
		ipt2.id="status_tue_cd";
		ipt2.value="01";
		
		if(tue.childNodes.length>0){
			select_tue.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_wed[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_wed[0].value){
				wed.innerHTML=d.code_name;
				var input=cf.mkTag("input",wed);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",wed);
				ipt2.type="hidden";
				ipt2.id="status_wed_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		wed.innerHTML="정상";
		var ipt=cf.mkTag("input",wed);
		ipt.type="hidden";
		ipt.value=8;
		var ipt2=cf.mkTag("input",wed);
		ipt2.type="hidden";
		ipt2.id="status_wed_cd";
		ipt2.value="01";
		
		if(wed.childNodes.length>0){
			select_wed.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_thu[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_thu[0].value){
				thu.innerHTML=d.code_name;
				var input=cf.mkTag("input",thu);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",thu);
				ipt2.type="hidden";
				ipt2.id="status_thu_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		thu.innerHTML="정상";
		var ipt=cf.mkTag("input",thu);
		ipt.type="hidden";
		ipt.value=8;
		var ipt2=cf.mkTag("input",thu);
		ipt2.type="hidden";
		ipt2.id="status_thu_cd";
		ipt2.value="01";
		
		if(thu.childNodes.length>0){
			select_thu.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_fri[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_fri[0].value){
				fri.innerHTML=d.code_name;
				var input=cf.mkTag("input",fri);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",fri);
				ipt2.type="hidden";
				ipt2.id="status_fri_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		fri.innerHTML="정상";
		var ipt=cf.mkTag("input",fri);
		ipt.type="hidden";
		ipt.value=8;
		var ipt2=cf.mkTag("input",fri);
		ipt2.type="hidden";
		ipt2.id="status_fri_cd";
		ipt2.value="01";
		
		if(fri.childNodes.length>0){
			select_fri.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_sat[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_sat[0].value){
				sat.innerHTML=d.code_name;
				var input=cf.mkTag("input",sat);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",sat);
				ipt2.type="hidden";
				ipt2.id="status_sat_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		sat.innerHTML="휴일";
		var ipt=cf.mkTag("input",sat);
		ipt.type="hidden";
		ipt.value=0;
		var ipt2=cf.mkTag("input",sat);
		ipt2.type="hidden";
		ipt2.id="status_sat_cd";
		ipt2.value="02";
		
		if(sat.childNodes.length>0){
			select_sat.trav(function(d,i){
				d.value="02";
			});
		}
	}
	
	if(select_sun[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_sun[0].value){
				sun.innerHTML=d.code_name;
				var input=cf.mkTag("input",sun);
				input.type="hidden";
				input.value=d.etc1;
				var ipt2=cf.mkTag("input",sun);
				ipt2.type="hidden";
				ipt2.id="status_sun_cd";
				ipt2.value=d.code_id;
			}
		});
	}else{
		sun.innerHTML="휴일";
		var ipt=cf.mkTag("input",sun);
		ipt.type="hidden";
		ipt.value=0;
		var ipt2=cf.mkTag("input",sun);
		ipt2.type="hidden";
		ipt2.id="status_sun_cd";
		ipt2.value="02";
		
		if(sun.childNodes.length>0){
			select_sun.trav(function(d,i){
				d.value="02";
			});
		}
	}
};
function mkStatus(){
	var mon=document.getElementById("status_mon"),
		tue=document.getElementById("status_tue"),
		wed=document.getElementById("status_wed"),
		thu=document.getElementById("status_thu"),
		fri=document.getElementById("status_fri"),
		sat=document.getElementById("status_sat"),
		sun=document.getElementById("status_sun");	
	mon.innerHTML="";
	tue.innerHTML="";
	wed.innerHTML="";
	thu.innerHTML="";
	fri.innerHTML="";
	sat.innerHTML="";
	sun.innerHTML="";
	
	mon.innerHTML="정상";
	var ipt=cf.mkTag("input",mon);
	ipt.type="hidden";
	ipt.value=8;
	var ipt2=cf.mkTag("input",mon);
	ipt2.type="hidden";
	ipt2.id="status_mon_cd";
	ipt2.value="01";
	
	if(mon.childNodes.length>0){
		select_mon.trav(function(d,i){
			d.value="01";
		});
	}
	
	tue.innerHTML="정상";
	var ipt=cf.mkTag("input",tue);
	ipt.type="hidden";
	ipt.value=8;
	var ipt2=cf.mkTag("input",tue);
	ipt2.type="hidden";
	ipt2.id="status_tue_cd";
	ipt2.value="01";
	
	if(tue.childNodes.length>0){
		select_tue.trav(function(d,i){
			d.value="01";
		});
	}
	
	wed.innerHTML="정상";
	var ipt=cf.mkTag("input",wed);
	ipt.type="hidden";
	ipt.value=8;
	var ipt2=cf.mkTag("input",wed);
	ipt2.type="hidden";
	ipt2.id="status_wed_cd";
	ipt2.value="01";
	
	if(wed.childNodes.length>0){
		select_wed.trav(function(d,i){
			d.value="01";
		});
	}
	
	thu.innerHTML="정상";
	var ipt=cf.mkTag("input",thu);
	ipt.type="hidden";
	ipt.value=8;
	var ipt2=cf.mkTag("input",thu);
	ipt2.type="hidden";
	ipt2.id="status_thu_cd";
	ipt2.value="01";
	
	if(thu.childNodes.length>0){
		select_thu.trav(function(d,i){
			d.value="01";
		});
	}
	
	fri.innerHTML="정상";
	var ipt=cf.mkTag("input",fri);
	ipt.type="hidden";
	ipt.value=8;
	var ipt2=cf.mkTag("input",fri);
	ipt2.type="hidden";
	ipt2.id="status_fri_cd";
	ipt2.value="01";
	
	if(fri.childNodes.length>0){
		select_fri.trav(function(d,i){
			d.value="01";
		});
	}
	
	sat.innerHTML="휴일";
	var ipt=cf.mkTag("input",sat);
	ipt.type="hidden";
	ipt.value=0;
	var ipt2=cf.mkTag("input",sat);
	ipt2.type="hidden";
	ipt2.id="status_sat_cd";
	ipt2.value="02";
	
	if(sat.childNodes.length>0){
		select_sat.trav(function(d,i){
			d.value="02";
		});
	}
	
	sun.innerHTML="휴일";
	var ipt=cf.mkTag("input",sun);
	ipt.type="hidden";
	ipt.value=0;
	var ipt2=cf.mkTag("input",sun);
	ipt2.type="hidden";
	ipt2.id="status_sun_cd";
	ipt2.value="02";
	
	if(sun.childNodes.length>0){
		select_sun.trav(function(d,i){
			d.value="02";
		});
	}
}

function popSubmit(obj){	
	var sDate = document.getElementById("pop_start_week").value,
		eDate = document.getElementById("pop_end_week").value,
		sDateYear = sDate.split(" ")[0].replace("년",""),
		sDateMonth= sDate.split(" ")[1].replace("월",""),
		sDateWeek = sDate.split(" ")[2].replace("주",""),
		eDateYear = eDate.split(" ")[0].replace("년",""),
		eDateMonth= eDate.split(" ")[1].replace("월",""),
		eDateWeek = eDate.split(" ")[2].replace("주",""),
		startYmw = sDateYear+""+sDateMonth+""+sDateWeek,
		endYmw = eDateYear+""+eDateMonth+""+eDateWeek;
	
	if(startYmw > endYmw) {
		generalPopOk2("종료일은 시작일보다 빠를 수 없습니다.");
		return false;
	}
	
	var monthCheck, monthCheck2, ymd, maxWeekCount, monthSum,loopResult="",br="";
	
	for(var cnt=startYmw; cnt<=endYmw; cnt++){		
		monthCheck2=String(cnt);
		ymd = monthCheck2.substring(0,6) +"01";
		maxWeekCount = getWeekCountOfMonthMonday(ymd);
		
		if(monthCheck2.substring(6,7) > maxWeekCount) {
			cnt=parseInt(monthCheck2.substring(0,6))+1;
			cnt+="1";
		}
		monthCheck=String(cnt);
		if(monthCheck.substring(4,6) > 12) {
			cnt=parseInt(monthCheck.substring(0,4))+1;
			cnt+="01";
			cnt+=monthCheck.substring(6,7);
		}		
		loopResult+=br+cnt;
		br="/";
	}
	
	pop_prev_data=$("#mm_pop_head").find("input, select").serialize();	
	var temp=pop_prev_data+"&monthWeek="+loopResult;
	
	generalPop("저장하시겠습니까?", function(){
		$.ajax({
			url: "/prj/report/projectReportBatchInsert",
			type: "POST",
			data: temp,
			success : function (data) {
				if(data != "success"){
					generalPop(data);
				} else {
					generalPopOk("저장되었습니다.", function(){
						cf.killTag(obj.parentNode);
					});
					searchAdmin();
				}
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
}

function manhourPopSum(){
	var mon=document.getElementsByName("in_pop_mon_working_hour");
	var tue=document.getElementsByName("in_pop_tue_working_hour");
	var wed=document.getElementsByName("in_pop_wed_working_hour");
	var thu=document.getElementsByName("in_pop_thu_working_hour");
	var fri=document.getElementsByName("in_pop_fri_working_hour");
	var sat=document.getElementsByName("in_pop_sat_working_hour");
	var sun=document.getElementsByName("in_pop_sun_working_hour");
	var sum=document.getElementsByName("in_pop_man_hour");
	
	for(var i=0;i<len;i++){
		sum[i].value=(mon[i].value*1+tue[i].value*1+wed[i].value*1+thu[i].value*1+fri[i].value*1+sat[i].value*1+sun[i].value*1).toFixed(1);
		sum[i].readOnly=true;
	}
}

function manSum(str){
	var arr=document.getElementsByName(str);
	var	sum=0;
		
	arr.trav(function(d,i){
		if(d.value)
			sum+=(d.value)*1;
		else sum +=0;
	});
	return {sum:sum};
}

function manRowSum(idx){
	var mon=document.getElementsByName("in_mon_working_hour"),
		tue=document.getElementsByName("in_tue_working_hour"),
		wed=document.getElementsByName("in_wed_working_hour"),
		thu=document.getElementsByName("in_thu_working_hour"),
		fri=document.getElementsByName("in_fri_working_hour"),
		sat=document.getElementsByName("in_sat_working_hour"),
		sun=document.getElementsByName("in_sun_working_hour"),
		rsum=document.getElementsByName("in_man_hour"),
		sum=0;
	sum=(mon[idx].value*1)+(tue[idx].value*1)+(wed[idx].value*1)+(thu[idx].value*1)+(fri[idx].value*1)+(sat[idx].value*1)+(sun[idx].value*1);
	
	return {sum:sum};
}