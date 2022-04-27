function statusPop(son){
	if(len!=0){
		son.parentNode.style.position="relative";
		son.parentNode.appendChild(dropdown);		
		current=son.parentNode;		
		dropdown.style.display="";
	}
}

function statusTable(son,con){
	var table=cf.mkTag("table",son);	
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table"})
		
	STATUSLIST.trav(function(d,i){
		var tr=cf.mkTag("tr",table);
	
		var td=cf.mkTag("td",tr);
		td.style.cursor="pointer";
		td.className="right";
		td.innerHTML=d.code_name;
		td.onclick=function(){
			if(prev==null){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev.parentNode.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev=this;
			prev.obj=d;			
			statusSave(con);			
		};
	});
}

function autoMHPop(){	
	var date = new Date();
	var year = date.getFullYear() + "";
	var month = date.getMonth() + 1;
	if(month < 10) month = "0" + month;
	else month = month + "";
	var day = date.getDate();
	if(day < 10) day = "0" + day;
	else day = day + "";
	var dateStr = year + "" + month + "" + day;
	var maxWeek = getWeekCountOfMonthMonday(dateStr);
	//var nowWeek = getSecofWeekMonday(dateStr);
	
	var compareNowDate = getSecofWeekMonday(dateStr);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	nowWeek = compareNowDate.substring(6,7);
	
	var popobj = getPopupBody(900, 570, "MH 일괄입력", "mhinput");
	
	var contentDiv=document.createElement("div");
	contentDiv.className="contentView";
	contentDiv.style.height="500px";
	
	var p=document.createElement("p");
	p.style.marginTop="20px";
	
	var strong=document.createElement("strong");
	strong.textContent="종료주를 선택해주세요";
	strong.style.fontSize="13px";
	p.appendChild(strong);
	
	var inputDiv=document.createElement("div");
	inputDiv.style.paddingTop="10px";
		
	var input1=document.createElement("input");
	input1.id="pop_start_week";
	input1.name="pop_start_week";
	input1.readOnly=true;
	input1.className="iptpadl0";
	input1.value = document.getElementById("sh_project_year").value +"년 "+ document.getElementById("sh_project_month").value +"월 "+ document.getElementById("sh_project_week").value + "주";
	cf.setCss(input1,{textAlign:"center",backgroundColor:"#eee"});

	var span=document.createElement("span");
	span.innerHTML="&nbsp; ~ &nbsp;";
	
	var input2=document.createElement("input");
	input2.className="input_date iptpadl0";
	input2.id="pop_end_week";
	input2.name="pop_end_week";
	input2.readOnly=true;
	input2.value = year + "년 " + month + "월 " + nowWeek + "주";
	input2.onchange = function(e){
		datevalue = e.target.value;
		//var datenowWeek =  getSecofWeekMonday(datevalue);
		//var dateyear = datevalue.substring(0,4);
		//var datemm = datevalue.substring(4,6);
		
		var compareNowYmw = getSecofWeekMonday(datevalue);
		
		var dateyear = compareNowYmw.substring(0, 4);
		var datemm = compareNowYmw.substring(4, 6);
		var datenowWeek = compareNowYmw.substring(6,7);
		
		if(datenowWeek == 0){
			if((datemm-1) <= 0 ){
				datevalue = new Date(parseInt(dateyear)-1, 12, 0);	
			}else{
				datevalue = new Date(dateyear, datemm-1, 0);
			}
			dateyear = datevalue.getFullYear();
			datemm = datevalue.getMonth()+1;
			if(datemm < 10) datemm = "0" + datemm;
			dateDay = datevalue.getDate();
			if(dateDay < 10) dateDay = "0" + dateDay;
			datenowWeek = getSecofWeekMonday(dateyear + "" + datemm + "" + dateDay);
			datevalue = dateyear + "" + datemm + "" + dateDay;
		}
		e.target.value = dateyear + "년 " + datemm + "월 " + datenowWeek + "주";
	};
	
	//
	contentDiv.appendChild(p);
	contentDiv.appendChild(inputDiv);
	
	inputDiv.appendChild(input1);
	inputDiv.appendChild(span);
	inputDiv.appendChild(input2);
	
	//
	popList(contentDiv);
	
	//
	var footerDiv=document.createElement("div"),
		btn1=cf.mkTag("button",footerDiv),
		btn2=cf.mkTag("button",footerDiv);
	footerDiv.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn2.className="ct-btn grey large";
	btn1.innerHTML="저장";
	btn2.innerHTML="취소";	
	btn1.onclick=function(){
		popSubmit(popobj);
	};
	btn2.onclick=function(){
		cf.killTag(popobj.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	contentDiv.appendChild(footerDiv);
	
	//팝업생성
	callPop(popobj);
	
	var poparea = document.getElementById("mhinput");
	poparea.appendChild(contentDiv);
	
	$("#datepicker").datepicker( "option", "showWeek", "true");
	datePickerMonth("input_date", "yymmdd");
	
	if(len==0) {
		mkPopStatus();
	} else {
		setPopStatus();
	}	
	dropdown=mkDropDown();
}

function popList(ele){		
	var div=document.createElement("div");
	cf.setCss(div,{marginTop:"15px",width:"850px"});
	
	var popDiv=cf.mkTag("div", div);
	popDiv.id="mm_pop_head";
	popDiv.className="Wrap_table";
	
	var table=cf.mkTag("table", popDiv);
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table"})	
	cf.setCss(table,{width:"100%"});
	
	var thead=cf.mkTag("thead", table),
		tr=cf.mkTag("tr", thead),	
		th=cf.mkTag("th", tr);
	th.rowSpan="2";
	th.innerHTML="NO.";	
	cf.setCss(th,{width:"39px",height:"50px"});
	
	var th=cf.mkTag("th", tr);
	th.rowSpan="2";
	th.innerHTML="프로젝트명";
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="월";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="화";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="수";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="목";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="금";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="토";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.innerHTML="일";
	cf.setCss(th,{width:"74px"});
	
	var th=cf.mkTag("th", tr);
	th.rowSpan="2";
	th.className="right";
	th.innerHTML="합";
	cf.setCss(th,{width:"69px"});
	
	var tr=cf.mkTag("tr", thead),
		th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_mon";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_tue";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_wed";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_thu";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_fri";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_sat";
	
	var th=cf.mkTag("th", tr),
		thDiv=cf.mkTag("div", th);
	thDiv.className="pointer";
	thDiv.innerHTML="▼";
	thDiv.onclick=function(){
		statusPop(this);
	};
	var thDiv=cf.mkTag("div", th);
	thDiv.id="pop_status_sun";
	
	var subDiv=cf.mkTag("div", popDiv),
		table=cf.mkTag("table", subDiv),
		tbody=cf.mkTag("tbody", table),
		tbddv=cf.mkTag("div",tbody);
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table"})
	tbody.id="mm_pop_contents";
	
	cf.setCss(subDiv,{overflowY:"scroll",height:317+"px"});
	
	ele.appendChild(div);	
	reportPopList(tbody, popListData);
}

function reportPopList(box, obj){
	select_pop_mon=new Array();
	select_pop_tue=new Array();
	select_pop_wed=new Array();
	select_pop_thu=new Array();
	select_pop_fri=new Array();
	select_pop_sat=new Array();
	select_pop_sun=new Array();
	box.innerHTML="";
	
	var len=obj.length;
	if(len==0){
		var tr=cf.mkTag("tr",box);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="12";
		td.innerHTML="조회된 데이터가 없습니다.";
	}else{		
		var searchDay=document.getElementById("sh_project_year").value+document.getElementById("sh_project_month").value+document.getElementById("sh_project_week").value;

		obj.trav(function(d,i){
			var tr=cf.mkTag("tr",box);
			tr.style.textAlign="center";			
			/* if(compareNowDate>searchDay){
				tr.onclick = function () {
					generalPop("제출기간이 지났습니다.");
				}
			} */			
			var td=cf.mkTag("td",tr),
				ipt=cf.mkTag("input",td);
			td.innerHTML=i+1;
			ipt.className="iptCenter";
			ipt.name="in_pop_commute_id";
			ipt.value=d.commute_id;
			ipt.type="hidden";
			cf.setCss(td,{width:"39px"});

			var td=cf.mkTag("td",tr),
				str=cf.mkTag("div",td),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			str.innerHTML=d.project_name;
			ipt1.name="in_pop_project_id";
			ipt1.value=d.project_id;
			ipt1.type="hidden";
			ipt2.className="iptCenter";
			ipt2.name="in_pop_project_name";
			ipt2.value=d.project_name;
			ipt2.type="hidden";
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_mon_status_cd";
			ipt1.value=d.mon_status_cd;
			ipt1.type="hidden";
			select_pop_mon.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_mon_working_hour";
			ipt2.value=d.mon_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_tue_status_cd";
			ipt1.value=d.tue_status_cd;
			ipt1.type="hidden";
			select_pop_tue.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_tue_working_hour";
			ipt2.value=d.tue_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_wed_status_cd";
			ipt1.value=d.wed_status_cd;
			ipt1.type="hidden";
			select_pop_wed.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_wed_working_hour";
			ipt2.value=d.wed_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_thu_status_cd";
			ipt1.value=d.thu_status_cd;
			ipt1.type="hidden";
			select_pop_thu.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_thu_working_hour";
			ipt2.value=d.thu_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_fri_status_cd";
			ipt1.value=d.fri_status_cd;
			ipt1.type="hidden";
			select_pop_fri.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_fri_working_hour";
			ipt2.value=d.fri_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_sat_status_cd";
			ipt1.value=d.sat_status_cd;
			ipt1.type="hidden";
			select_pop_sat.push(ipt1);
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_sat_working_hour";
			ipt2.value=d.sat_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});	
			
			var td=cf.mkTag("td",tr),
				ipt1=cf.mkTag("input",td),
				ipt2=cf.mkTag("input",td);
			ipt1.name="in_pop_sun_status_cd";
			ipt1.value=d.sun_status_cd;
			ipt1.type="hidden";
			select_pop_sun.push(ipt1);					
			ipt2.className="iptCenter iptpadl0";
			ipt2.name="in_pop_sun_working_hour";
			ipt2.value=d.sun_working_hour;
			ipt2.onchange=manhourPopSum;
			ipt2.onkeypress=function(e){
				checkChar(e,this);
			};
			cf.setCss(ipt2,{width:"60%"});
			cf.setCss(td,{width:"74px"});	
			
			var td=cf.mkTag("td",tr),
				ipt=cf.mkTag("input",td);
			td.className="right";
			ipt.className="iptCenter iptpadl0";
			ipt.name="in_pop_man_hour";
			ipt.readOnly=true;
			if(!d.man_hour) ipt.value=0;
			else ipt.value=d.man_hour;
			cf.setCss(ipt,{width:"60%",backgroundColor:"#eee"});
			cf.setCss(td,{width:"52px"});
		});
	}
}

function mkPopStatus(){
	var mon=document.getElementById("pop_status_mon"),
		tue=document.getElementById("pop_status_tue"),
		wed=document.getElementById("pop_status_wed"),
		thu=document.getElementById("pop_status_thu"),
		fri=document.getElementById("pop_status_fri"),
		sat=document.getElementById("pop_status_sat"),
		sun=document.getElementById("pop_status_sun");
	mon.innerHTML="";
	tue.innerHTML="";
	wed.innerHTML="";
	thu.innerHTML="";
	fri.innerHTML="";
	sat.innerHTML="";
	sun.innerHTML="";
	
	mon.innerHTML="정상";
	var ipt=cf.mkTag("input",mon.parentNode);
	ipt.type="hidden";
	ipt.value=8;
	
	if(mon.childNodes.length>0){
		select_pop_mon.trav(function(d,i){
			d.value="01";
		});
	}
	
	tue.innerHTML="정상";
	var ipt=cf.mkTag("input",tue.parentNode);
	ipt.type="hidden";
	ipt.value=8;
	
	if(tue.childNodes.length>0){
		select_pop_tue.trav(function(d,i){
			d.value="01";
		});
	}
	
	wed.innerHTML="정상";
	var ipt=cf.mkTag("input",wed.parentNode);
	ipt.type="hidden";
	ipt.value=8;
	
	if(wed.childNodes.length>0){
		select_pop_wed.trav(function(d,i){
			d.value="01";
		});
	}
	
	thu.innerHTML="정상";
	var ipt=cf.mkTag("input",thu.parentNode);
	ipt.type="hidden";
	ipt.value=8;
	
	if(thu.childNodes.length>0){
		select_pop_thu.trav(function(d,i){
			d.value="01";
		});
	}
	
	fri.innerHTML="정상";
	var ipt=cf.mkTag("input",fri.parentNode);
	ipt.type="hidden";
	ipt.value=8;
	
	if(fri.childNodes.length>0){
		select_pop_fri.trav(function(d,i){
			d.value="01";
		});
	}
	
	sat.innerHTML="휴일";
	var ipt=cf.mkTag("input",sat.parentNode);
	ipt.type="hidden";
	ipt.value=0;
	
	if(sat.childNodes.length>0){
		select_pop_sat.trav(function(d,i){
			d.value="02";
		});
	}
	
	sun.innerHTML="휴일";
	var ipt=cf.mkTag("input",sun.parentNode);
	ipt.type="hidden";
	ipt.value=0;
	
	if(sun.childNodes.length>0){
		select_pop_sun.trav(function(d,i){
			d.value="02";
		});
	}
}

function setPopStatus(){
	var mon=document.getElementById("pop_status_mon"),
		tue=document.getElementById("pop_status_tue"),
		wed=document.getElementById("pop_status_wed"),
		thu=document.getElementById("pop_status_thu"),
		fri=document.getElementById("pop_status_fri"),
		sat=document.getElementById("pop_status_sat"),
		sun=document.getElementById("pop_status_sun");
	mon.innerHTML="";
	tue.innerHTML="";
	wed.innerHTML="";
	thu.innerHTML="";
	fri.innerHTML="";
	sat.innerHTML="";
	sun.innerHTML="";	
	if(select_pop_mon[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_mon[0].value){
				mon.innerHTML=d.code_name;
				var input=cf.mkTag("input",mon);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		mon.innerHTML="정상";
		var ipt=cf.mkTag("input",mon.parentNode);
		ipt.type="hidden";
		ipt.value=8;
		
		if(mon.childNodes.length>0){
			select_pop_mon.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_pop_tue[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_tue[0].value){
				tue.innerHTML=d.code_name;
				var input=cf.mkTag("input",tue);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		tue.innerHTML="정상";
		var ipt=cf.mkTag("input",tue.parentNode);
		ipt.type="hidden";
		ipt.value=8;
		
		if(tue.childNodes.length>0){
			select_pop_tue.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_pop_wed[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_wed[0].value){
				wed.innerHTML=d.code_name;
				var input=cf.mkTag("input",wed);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		wed.innerHTML="정상";
		var ipt=cf.mkTag("input",wed.parentNode);
		ipt.type="hidden";
		ipt.value=8;
		
		if(wed.childNodes.length>0){
			select_pop_wed.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_pop_thu[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_thu[0].value){
				thu.innerHTML=d.code_name;
				var input=cf.mkTag("input",thu);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		thu.innerHTML="정상";
		var ipt=cf.mkTag("input",thu.parentNode);
		ipt.type="hidden";
		ipt.value=8;
		
		if(thu.childNodes.length>0){
			select_pop_thu.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_pop_fri[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_fri[0].value){
				fri.innerHTML=d.code_name;
				var input=cf.mkTag("input",fri);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		fri.innerHTML="정상";
		var ipt=cf.mkTag("input",fri.parentNode);
		ipt.type="hidden";
		ipt.value=8;
		
		if(fri.childNodes.length>0){
			select_pop_fri.trav(function(d,i){
				d.value="01";
			});
		}
	}
	
	if(select_pop_sat[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_sat[0].value){
				sat.innerHTML=d.code_name;
				var input=cf.mkTag("input",sat);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		sat.innerHTML="휴일";
		var ipt=cf.mkTag("input",sat.parentNode);
		ipt.type="hidden";
		ipt.value=0;
		
		if(sat.childNodes.length>0){
			select_pop_sat.trav(function(d,i){
				d.value="02";
			});
		}
	}
	
	if(select_pop_sun[0].value!=""){
		STATUSLIST.trav(function(d,i){
			if(d.code_id==select_pop_sun[0].value){
				sun.innerHTML=d.code_name;
				var input=cf.mkTag("input",sun);
				input.type="hidden";
				input.value=d.etc1;
			}
		});
	}else{
		sun.innerHTML="휴일";
		var ipt=cf.mkTag("input",sun.parentNode);
		ipt.type="hidden";
		ipt.value=0;
		
		if(sun.childNodes.length>0){
			select_pop_sun.trav(function(d,i){
				d.value="02";
			});
		}
	}
};