var prev_pjcode;
var opt;
var WIN_GB;
function getProductCodePop(searchMode, opt){	
	if(searchMode == "SUCCESS_Y")WIN_GB = "1";
	else WIN_GB = "";
	
	//Header
	var date = new Date();
	var year = date.getFullYear() + "";
	var month = date.getMonth() + 1;
	if(month < 10) month = "0" + month;
	else month = month + "";
	var day = date.getDate();
	if(day < 10) day = "0" + day;
	else day = day + "";
	 
	obj={year:year, month:month, name:"", type_cd:"", status_cd:"", brand_cd:"",
			user_id : "", win_gb:WIN_GB, closingYear:"", closingMonth:""};
	
	callProjectCodeData(obj, function (data){
		BRANDLIST=data.brandList;
		STATUSLIST=data.salesStatusList;
		TYPELIST=data.salesTypeList;
		DIVISIONUSERS=data.divisionUsers;
		DIVISION=data.division;
		
		projectCodeList(data, year, month, opt);
		projectCodeListData(data, opt);
	});
};
function getProductCodePop2(e,opt){
	var year = document.getElementById("project_yyyy").value,
		month = document.getElementById("project_mm").value,
		sh_search_company = document.getElementById("sh_search_company").value,
		type_cd = document.getElementById("project_type").value,
		status_cd = document.getElementById("project_status").value,
		brand_cd = document.getElementById("project_brand").value,
		user_id = document.getElementById("project_divisionusers").value,
		closing_yyyy = document.getElementById("closing_yyyy").value,
		closing_mm = document.getElementById("closing_mm").value,
		obj={year:year, month:month, name:sh_search_company, type_cd:type_cd, status_cd:status_cd,
				brand_cd:brand_cd, user_id:user_id, win_gb:WIN_GB, closingYear:closing_yyyy, closingMonth:closing_mm};
		
	callProjectCodeData(obj, function (data){
		BRANDLIST=data.brandList;
		STATUSLIST=data.salesStatusList;
		TYPELIST=data.salesTypeList;
		DIVISIONUSERS=data.divisionUsers;
		DIVISION=data.division;
		
		projectCodeListData(data,opt);
	});
};

var projectCodeList = function(data, year, month, opt){
	var selectYear = new Date();
	selectYear = selectYear.getFullYear() + "";
	selectYear = parseInt(selectYear);
	
	var h=cf.workareaheight-188,
		popobj = getPopupBody(1150, h, "Project Code 조회", "projectcode_search"),
		searchDiv = document.createElement("div"),
		prjlistDiv = document.createElement("div");
	prjlistDiv.id = "popupContentArea";
	searchDiv.className = "search_pop3";	
	mkSrch_pdcodePop(searchDiv,opt);	
	callPop(popobj);
	
	var printArea=document.getElementById("printArea"),
		poparea = document.getElementById("projectcode_search"),
		btnarea=cf.mkTag("div",printArea),
		confirmImg=cf.mkTag("button",btnarea);
	poparea.style.paddingTop = "20px";
	poparea.style.overflowY = "hidden";
	btnarea.className = "savebtn";
	btnarea.id="btnarea";
	poparea.appendChild(searchDiv);
	poparea.appendChild(prjlistDiv);	
	confirmImg.innerHTML="선택";
	confirmImg.className="ct-btn darkgrey large";
	confirmImg.onclick = function(e){
		var project_code_tbody=document.getElementById("project_code_tbody"),
			chkConut = 0;
		
		for(var k=0 ; k<project_code_tbody.childNodes.length ; k++){
			if(project_code_tbody.childNodes[k].tagName == "TR"){
				if(project_code_tbody.childNodes[k].className.indexOf("mouse_over") > -1){
					chkConut++;
				}	
			}
		}		
		if(chkConut == 0){
			generalPopOk("Project Code를 선택해주세요.");
			return false;
		}
		var Layer_Center_wrap_El = document.getElementById("Layer_Center_wrap");		
		pjcodeSave(Layer_Center_wrap_El.parentNode.parentNode,opt);
	};		
};

var mkSrch_pdcodePop = function(p,opt) {
	p.innerHTML = "";
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "project_yyyy";
	select.name = "project_yyyy";
	mkYearSelect(select,CurrentDate[0],true);
	/*select.onchange=function(){
		document.getElementById("closing_yyyy").value="";
		document.getElementById("closing_mm").value="";
	};*/
	span.innerHTML = "년";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"197px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "project_mm";
	select.name = "project_mm";
	mkMonthSelect(select,CurrentDate[1],true);
	/*select.onchange=function(){
		document.getElementById("closing_yyyy").value="";
		document.getElementById("closing_mm").value="";
	};*/
	span.innerHTML = "월";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	
	var bx2= cf.mkTag("div",line1),
		span=cf.mkTag("span",bx2),
		ipt=cf.mkTag("input",bx2);
	span.innerHTML="고객사명";
	ipt.id="sh_search_company";
	ipt.type="text";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13)getProductCodePop2(e, opt);
	};	
	
	cf.setCss(ipt,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx2,{paddingLeft:"21px",width:"190px"});
	
	var bx3 = cf.mkTag("div", line1),
		span1 = cf.mkTag("span", bx3),
		select1 = cf.mkTag("select", bx3),
		span2 = cf.mkTag("span", bx3),
		select2 = cf.mkTag("select", bx3),
		span3 = cf.mkTag("span", bx3);
	select1.id = "closing_yyyy";
	select1.name = "closing_yyyy";
	span1.innerHTML = "Closing";
	span2.innerHTML = "년";
	mkYearSelect(select1,CurrentDate[0],true);
	select1.value="";
	/*select1.onchange=function(){
		document.getElementById("project_yyyy").value="";
		document.getElementById("project_mm").value="";
	};*/
	select2.id = "closing_mm";
	select2.name = "closing_mm";
	mkMonthSelect(select2,CurrentDate[1],true);
	select2.value="";
	/*select2.onchange=function(){
		document.getElementById("project_yyyy").value="";
		document.getElementById("project_mm").value="";
	};*/
	span3.innerHTML = "월";	
	cf.setCss(select1,{width:"70px"});
	cf.setCss(select2,{width:"70px"});
	cf.setCss(span1,{paddingRight:"12px"});
	cf.setCss(span2,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(span3,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx3,{paddingLeft:"31px"});	
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		select=cf.mkTag("select",bx4);
	span.innerHTML = "구분";
	select.id="project_type";
	mkSelect(select,TYPELIST,"",true);
	cf.setCss(select,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});

	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		select=cf.mkTag("select",bx5);
	span.innerHTML = "영업현황";
	select.id="project_status";
	mkSelect(select,STATUSLIST,"",true);
	cf.setCss(select,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx5,{paddingLeft:"35px"});
	
	var bx6=cf.mkTag("div",line2),
		span=cf.mkTag("span",bx6),
		select=cf.mkTag("select",bx6);
	span.innerHTML = "Type";
	select.id="project_brand";
	mkSelect(select,BRANDLIST,"",true);
	cf.setCss(select,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx6,{paddingLeft:"35px"});
	
	var bx7=cf.mkTag("div",line2),
		span=cf.mkTag("span",bx7),
		select=cf.mkTag("select",bx7);
	span.innerHTML = "담당영업";
	select.id="project_divisionusers";
	mkSelect(select,DIVISIONUSERS,"",true);
	cf.setCss(select,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx7,{paddingLeft:"35px"});

	var bx8 = cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx8);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx8.className="cursor";
	bx8.onclick=function(){
		document.getElementById("project_yyyy").value=CurrentDate[0];
		document.getElementById("project_mm").value=CurrentDate[1];
		document.getElementById("closing_yyyy").value="";
		document.getElementById("closing_mm").value="";
		document.getElementById("sh_search_company").value="";
		document.getElementById("project_type").value="";
		document.getElementById("project_status").value="";
		document.getElementById("project_brand").value="";
		document.getElementById("project_divisionusers").value="";
	};
	
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go3 cursor";
	img.src="/images/btn/btn_go3.gif";
	img.onclick=function(e){
		getProductCodePop2(e, opt);
	};
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line1,{height:"26px"});
	cf.setCss(line2,{marginTop:"5px",height:"26px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left"});
	cf.setCss(bx8,{float:"left",paddingLeft:"20px"});
};
var project_pop_click_flag = true;
function projectCodeListData(data,opt){	
	//var pcodelist = data.pCodeList;
	var popupContentArea = document.getElementById("popupContentArea");
	popupContentArea.innerHTML = "";
	var con_table = document.createElement("div");
	con_table.className = "con_table";
	
	var wrap_table = document.createElement("div");
	wrap_table.className = "Wrap_table";
	
	var div_overflow_main = document.createElement("div");
	var div_overflow_main2 = document.createElement("div");
	div_overflow_main.className = "pCodeHead";
	div_overflow_main2.className = "pCodeTable";
	cf.setCss(div_overflow_main2,{maxHeight:"405px",height:cf.workareaheight-446+"px"});
	
	var tableEl = document.createElement("table");
	tableEl.className = "Normal_table";
	tableEl.id = "Nomarl_pop_table";
	tableEl.cellpadding = "0px";
	tableEl.cellspacing = "0px";
	tableEl.style.width ="100%";
	tableEl.style.tableLayout = "fixed";
	
	
	var theadEl = document.createElement("thead");
	var theadtr = document.createElement("tr");
	for(var i=0 ; i<14 ; i++ ){
		var thEl = document.createElement("th");
		if(i==0){
			thEl.style.width = "120px";
			thEl.textContent = "Project Code";
		}
		if(i==1){
			thEl.style.width = "40px";
			thEl.textContent = "년도";
			thEl.textAlign = "center";
		}
		if(i==2){
			thEl.style.width = "30px";
			thEl.textContent = "월";
			thEl.textAlign = "center";
		}
		if(i==3){
			thEl.style.width = "50px";
			thEl.textContent = "구분";
			thEl.textAlign = "center";
		}
		if(i==4){
			thEl.style.width = "80px";
			thEl.textContent = "고객사명";
			thEl.textAlign = "center";
		}
		if(i==5){
			thEl.style.width = "80px";
			thEl.textContent = "Type";
			thEl.textAlign = "center";
		}
		if(i==6){
			thEl.style.width = "80px";
			thEl.textContent = "제품";
			thEl.textAlign = "center";
		}
		if(i==7){
			thEl.style.width = "90px";
			thEl.textContent = "ALC";
			thEl.textAlign = "center";
		}
		if(i==8){
			thEl.style.width = "90px";
			thEl.textContent = "영업상태";
			thEl.textAlign = "center";
		}
		if(i==9){
			thEl.style.width = "80px";
			thEl.textContent = "Closing";
			thEl.textAlign = "center";
		}
		if(i==10){
			thEl.style.width = "60px";
			thEl.textContent = "담당영업";
			thEl.textAlign = "center";
		}
		if(i==11){
			thEl.style.width = "88px";
			thEl.textContent = "계약예정금액";
			thEl.textAlign = "center";
		}
		if(i==12){
			thEl.style.width = "88px";
			thEl.textContent = "원가";
			thEl.textAlign = "center";
		}
		if(i==13){
			thEl.style.width = "88px";
			thEl.textContent = "영업이익";
			thEl.textAlign = "center";
		}
		
		theadtr.appendChild(thEl);
	}
	
	theadEl.appendChild(theadtr);
	tableEl.appendChild(theadEl);

	var tableEl2 = document.createElement("table");
	tableEl2.className = "Normal_table";
	tableEl2.id = "Nomarl_pop_table";
	tableEl2.cellpadding = "0px";
	tableEl2.cellspacing = "0px";
	tableEl2.style.width ="100%";
	tableEl2.style.tableLayout = "fixed";
	
	var pcodelist = data.pCodeList;
	var tbodyEl = document.createElement("tbody");
	tbodyEl.id = "project_code_tbody";
	for(var i=0 ; i< pcodelist.length ; i++){
		var trEl = document.createElement("tr");
		trEl.obj=pcodelist[i];
		trEl.style.cursor="pointer";
		for(var j=0 ; j<14 ; j++){
			var tdEl = document.createElement("td");
			if(j == 0){
				tdEl.textContent = pcodelist[i].sales_project_code;
				tdEl.style.textAlign = "left";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "sales_project_id";
				inputEl.value = pcodelist[i].sales_project_id;
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "sales_project_code";
				inputEl2.value = pcodelist[i].sales_project_code;
				
				tdEl.style.width = "110px";
				tdEl.style.paddingLeft ="10px";
				tdEl.appendChild(inputEl);
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 1){
				tdEl.textContent = pcodelist[i].sales_project_year;
				tdEl.style.textAlign = "center";
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "sales_project_year";
				inputEl2.value = pcodelist[i].sales_project_year;
				
				tdEl.style.width = "40px";
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 2){
				tdEl.textContent = pcodelist[i].sales_project_month;
				tdEl.style.textAlign = "center";
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "sales_project_month";
				inputEl2.value = pcodelist[i].sales_project_month;
				
				tdEl.style.width = "30px";
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 3){
				tdEl.name = "sales_type_cd_name";
				tdEl.textContent = pcodelist[i].sales_type_cd_name;
				tdEl.style.textAlign = "center";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "sales_type_cd";
				inputEl.value = pcodelist[i].sales_type_cd;
				
				tdEl.style.width = "50px";
				tdEl.appendChild(inputEl);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 4){
				tdEl.textContent = pcodelist[i].company_name;
				tdEl.style.textAlign = "center";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "company_id";
				inputEl.value = pcodelist[i].company_id;
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "company_name";
				inputEl2.value = pcodelist[i].company_name;
				
				tdEl.style.width = "80px";
				tdEl.appendChild(inputEl);
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 5){
				tdEl.textContent = pcodelist[i].brand_cd_name;
				tdEl.style.textAlign = "center";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "brand_cd";
				inputEl.value = pcodelist[i].brand_cd;
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "brand_cd_name";
				inputEl2.value = pcodelist[i].brand_cd_name;
				
				tdEl.stlye.width = "80px";
				tdEl.appendChild(inputEl);
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 6){
				tdEl.textContent = pcodelist[i].module;
				tdEl.style.textAlign = "center";
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "module";
				inputEl2.value = pcodelist[i].module;
				
				tdEl.style.width = "80px";
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 7){
				tdEl.name = "sales_divide_cd";
				tdEl.textContent = convertNull(pcodelist[i].sales_divide_cd, '');
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "sales_divide_cd";
				inputEl2.value = pcodelist[i].sales_divide_cd;
				
				tdEl.style.width = "80px";
				tdEl.style.textAlign = "center";
				tdEl.style.paddingRight ="10px";
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 8){
				tdEl.name = "sales_status_cd_name";
				tdEl.textContent = pcodelist[i].sales_status_cd_name;
				tdEl.style.textAlign = "center";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "sales_status_cd";
				inputEl.value = pcodelist[i].sales_status_cd;
				
				tdEl.style.width = "90px";
				tdEl.appendChild(inputEl);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 9){
				tdEl.name = "closing";
				var closingdate = pcodelist[i].closing;
				//var closingdateyear = closingdate.substring(0,4);
				//var closingdatemm = closingdate.substring(4,6);
				//var closingdatedd = closingdate.substring(6,8);
				
				//tdEl.textContent = closingdateyear +  "." + closingdatemm + "." + closingdatedd;
				tdEl.textContent = closingdate;				
				tdEl.style.width = "80px";
				tdEl.style.textAlign = "center";
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 10){
				tdEl.name = "user_name";
				tdEl.textContent = pcodelist[i].user_name;
				tdEl.style.textAlign = "center";
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "user_id";
				inputEl.value = pcodelist[i].user_id;
				
				var inputEl2 = document.createElement("input");
				inputEl2.type = "hidden";
				inputEl2.name = "user_name";
				inputEl2.value = pcodelist[i].user_name;
				
				tdEl.style.width = "60px";
				tdEl.appendChild(inputEl);
				tdEl.appendChild(inputEl2);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 11){
				tdEl.textContent = comma(pcodelist[i].contract_estimate_price);
				tdEl.style.textAlign = "right";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "contract_estimate_price";
				inputEl.value = pcodelist[i].contract_estimate_price;
				
				tdEl.style.width = "78px";
				tdEl.style.paddingRight ="10px";
				tdEl.appendChild(inputEl);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 12){
				tdEl.textContent = comma(pcodelist[i].cost_price);
				tdEl.style.textAlign = "right";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "cost_price";
				inputEl.value = pcodelist[i].cost_price;
				
				tdEl.style.width = "78px";
				tdEl.style.paddingRight ="10px";
				tdEl.appendChild(inputEl);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			if(j == 13){
				tdEl.textContent = comma(pcodelist[i].profit_price);
				tdEl.style.textAlign = "right";
				
				var inputEl = document.createElement("input");
				inputEl.type = "hidden";
				inputEl.name = "profit_price";
				inputEl.value = pcodelist[i].profit_price;
				
				tdEl.style.width = "78px";
				tdEl.style.paddingRight ="10px";
				tdEl.appendChild(inputEl);
				if(i==0)cf.setCss(tdEl,{borderTop:"0px"});
			}
			
			trEl.onclick = function(e){
				if(project_pop_click_flag){
					project_pop_click_flag = false;
					var project_code_tbody = document.getElementById("project_code_tbody");
					for(var k=0 ; k<project_code_tbody.childNodes.length ; k++){
						if(project_code_tbody.childNodes[k].tagName == "TR"){
							project_code_tbody.childNodes[k].className = "";
						}
					}
					prev_pjcode=this.obj;
					this.className = "mouse_over";	
					project_pop_click_flag = true;
				}
			};
			trEl.ondblclick = function(e){
				if(project_pop_click_flag){
					project_pop_click_flag = false;
					var project_code_tbody = document.getElementById("project_code_tbody");
					for(var k=0 ; k<project_code_tbody.childNodes.length ; k++){
						if(project_code_tbody.childNodes[k].tagName == "TR"){
							project_code_tbody.childNodes[k].className = "";
						}
					}
					prev_pjcode=this.obj;
					this.className = "mouse_over";	
					project_pop_click_flag = true;
					var Layer_Center_wrap_El = document.getElementById("Layer_Center_wrap");
					pjcodeSave(Layer_Center_wrap_El.parentNode.parentNode,opt);
				}
			};
			trEl.appendChild(tdEl);
		}
		tbodyEl.appendChild(trEl);
	}
	
	tableEl2.appendChild(tbodyEl);
	div_overflow_main.appendChild(tableEl);
	div_overflow_main2.appendChild(tableEl2);
	wrap_table.appendChild(div_overflow_main);
	wrap_table.appendChild(div_overflow_main2);
	con_table.appendChild(wrap_table);
	popupContentArea.appendChild(con_table);
	
	if(pcodelist.length < 1){
			var tr=cf.mkTag("tr",tbodyEl);
			tr.style.textAlign="center";
			
			var td=cf.mkTag("td",tr);
			td.className="right";
			td.colSpan="6";
			td.innerHTML="조회된 데이터가 없습니다.";
	}
};