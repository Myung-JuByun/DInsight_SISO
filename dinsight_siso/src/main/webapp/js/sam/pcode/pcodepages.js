var mkSearchDiv = function() {
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p);	
	//현재 년월주
	var ArrDate=realYearMonthWeek().split("/"),
		inputHidden1=cf.mkTag("input", srch),
		inputHidden2=cf.mkTag("input", srch);
	inputHidden1.type="hidden";
	inputHidden1.name="sales_ym";
	inputHidden1.value=ArrDate[0];
	
	inputHidden2.type="hidden";
	inputHidden2.name="sales_week";
	inputHidden2.value=ArrDate[1];
	
	//검색항목
	var line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_project_year";
	select.name = "sh_sales_project_year";
	mkYearSelect(select,CurrentDate[0],true);
	select.onchange=function(){
		document.getElementById("sh_closing_year").value="";
		document.getElementById("sh_closing_month").value="";
	};	
	span.innerHTML = "년";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"197px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_project_month";
	select.name = "sh_sales_project_month";
	mkMonthSelect(select,CurrentDate[1],true);
	select.onchange=function(){
		document.getElementById("sh_closing_year").value="";
		document.getElementById("sh_closing_month").value="";
	};	
	span.innerHTML = "월";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});	
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2);
	span.innerHTML = "고객사명";
	searchString = cf.mkTag("input", bx2);
	searchString.type="text";
	searchString.className="input_han";
	searchString.onkeypress = function(e) {
		if (e.keyCode == 13) {
			projectSearch();
		}
	};	
	cf.setCss(searchString,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx2,{paddingLeft:"21px",width:"190px"});
	
	var bx3 = cf.mkTag("div", line1),
		span1 = cf.mkTag("span", bx3),
		select1 = cf.mkTag("select", bx3),
		span2 = cf.mkTag("span", bx3),
		select2 = cf.mkTag("select", bx3),
		span3 = cf.mkTag("span", bx3);
	select1.id = "sh_closing_year";
	select1.name = "sh_closing_year";
	span1.innerHTML = "Closing";
	span2.innerHTML = "년";
	mkYearSelect(select1,CurrentDate[0],true);
	select1.value="";
	select1.onchange=function(){
		document.getElementById("sh_sales_project_year").value="";
		document.getElementById("sh_sales_project_month").value="";
	};	
	select2.id = "sh_closing_month";
	select2.name = "sh_closing_month";
	mkMonthSelect(select2,CurrentDate[1],true);
	select2.value="";
	select2.onchange=function(){
		document.getElementById("sh_sales_project_year").value="";
		document.getElementById("sh_sales_project_month").value="";
	};	
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
		span = cf.mkTag("span", bx4);
	span.innerHTML = "구분";
	SELECT_type = cf.mkTag("select", bx4);
	cf.setCss(SELECT_type,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});

	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5);
	span.innerHTML = "영업현황";
	SELECT_status = cf.mkTag("select", bx5);
	cf.setCss(SELECT_status,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx5,{paddingLeft:"35px"});
	
	var bx6 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx6);
	span.innerHTML = "Type";
	SELECT_brand = cf.mkTag("select", bx6);
	cf.setCss(SELECT_brand,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx6,{paddingLeft:"35px"});
	
	var bx7 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx7);
	span.innerHTML = "담당영업";
	SELECT_user = cf.mkTag("select", bx7);
	cf.setCss(SELECT_user,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx7,{paddingLeft:"35px"});

	var bx8 = cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx8);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx8.className="cursor";
	bx8.onclick=function(){
		document.getElementById("sh_sales_project_year").value=CurrentDate[0];
		document.getElementById("sh_sales_project_month").value=CurrentDate[1];
		document.getElementById("sh_closing_year").value="";
		document.getElementById("sh_closing_month").value="";
		searchString.value="";
		SELECT_type.value="";
		SELECT_status.value="";
		SELECT_brand.value="";
		SELECT_user.value="";
	};
	
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go2 cursor";
	img.src="/images/btn/btn_go3.gif";
	img.onclick=projectSearch;
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:"5px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left"});
	cf.setCss(bx8,{float:"left",paddingLeft:"20px"});
};

//리스트 출력
var projectCodeList = function(data) {
	var p = document.getElementById("pCodeTable"),
		obj = data.pCodeList;
	arr_list = new Array();
	SELECT_year = new Array();
	SELECT_month = new Array();

	if (obj.length > 0)
		rowCount = false;
	else
		rowCount = true;

	obj.trav(function(d, i) {
		if(!d.sales_project_id)d.sales_project_id="";
		if(!d.sales_project_year)d.sales_project_year="";
		if(!d.sales_project_month)d.sales_project_month="";
		if(!d.sales_type_cd)d.sales_type_cd="";
		if(!d.company_id)d.company_id="";
		if(!d.company_name)d.company_name="";
		if(!d.sales_divide_cd)d.sales_divide_cd="";
		if(!d.brand_cd_name_sub)d.brand_cd_name_sub="";
		if(!d.brand_cd)d.brand_cd="";
		if(!d.module)d.module="";
		if(!d.closing)d.closing="";
		if(!d.operation_cd_code)d.operation_cd_code="";
		if(!d.operation_cd)d.operation_cd="";
		if(!d.user_id)d.user_id="";		
		if(!d.sales_project_code)d.sales_project_code="";
		if(!d.contract_estimate_price)d.contract_estimate_price="";
		if(!d.cost_price)d.cost_price="";
		if(!d.profit_price)d.profit_price="";
		if(!d.win_gb)d.win_gb="";
		if(!d.creator_user_name)d.creator_user_name="";
		if(!d.creator)d.creator="";
		
		arr_list.push([ "", d.sales_project_id, d.sales_project_year,
				d.sales_project_month, d.sales_type_cd, d.company_id,
				d.company_name, d.sales_divide_cd, d.brand_cd_name_sub, d.brand_cd, d.module,
				d.sales_status_cd, d.closing,
				d.operation_cd_code, d.operation_cd, d.user_id,
				d.sales_project_code, d.contract_estimate_price, d.cost_price,
				d.profit_price, d.win_gb, d.creator_user_name, d.creator ]);
	});
	setInputValue(arr_list);
	cf.setCss(p,{height:cf.workareaheight*0.65+"px",minHeight:"450px",maxHeight:"600px"});
	datePicker("input_date", "yy.mm.dd");
};

var setInputValue = function(arr) {
	var tbd = document.getElementById("pcodeView");
	tbd.innerHTML = "";
	checks = new Array();
	var def1, def2;

	if (rowCount) {
		var tr = cf.mkTag("tr", tbd);
		tr.style.textAlign = "center";

		var td = cf.mkTag("td", tr);
		td.className = "right";
		td.colSpan = "18";
		td.innerHTML = "조회된 데이터가 없습니다.";
		rowCount = false;
	} else {
		arr.trav(function(d, i) {
			var tr = cf.mkTag("tr", tbd);
			tr.style.textAlign = "center";

			for (var j = 0, lng = arr[i].length; j < lng; j++) {
				var td = cf.mkTag("td", tr);

				if (j == 0) {
					var ipt = cf.mkTag("input", td);
					ipt.type = "checkbox";
					checks.push(ipt);
				}
				if (j == 1) {
					var ipt = cf.mkTag("input", td);
					ipt.name = "in_sales_project_id";
					ipt.value = arr_list[i][j];
					td.style.display = "none";
				}
				if (j == 2) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_sales_project_year";
					select.className = "in_sales_project_year select_pop2";
					def1 = arr_list[i][j];
				}
				if (j == 3) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_sales_project_month";
					select.className = "in_sales_project_month select_pop2";
					def2 = arr_list[i][j];
				}
				if (j == 4) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_sales_type_cd";
					var def = arr_list[i][j];
					mkSelect(select, TYPELIST, def);
					select.className = "select_pop2";
				}
				if (j == 5) {
					td.style.display = "none";
					var ipt = cf.mkTag("input", td);
					ipt.name = "in_company_id";
					ipt.value = arr_list[i][j];
				}
				if (j == 6) {
					td.style.cursor = "pointer";
					td.innerHTML = arr_list[i][j];
					td.onclick = function() {
						companyPopSrch(0);
						pcode_prev = this;
					};
				}
				//신규 OR ALC
				if (j == 7) {
					var select = cf.mkTag("select", td);
					select.name = "in_sales_divide_cd";
					select.className="select_pop2";
					select.style.width = "95%";
					
					var def = arr_list[i][j];
					
					for(var a=0 ; a<DIVIDELIST.length ; a++){
						var option = cf.mkTag("option", select);
						option.value=DIVIDELIST[a].code_id;
						option.text=DIVIDELIST[a].code_id;
						
						if(option.value == def) {
							select.options[a].selected = true;
						}
					}
				} 
				
				if (j == 8) {
					var ipt = cf.mkTag("input", td);
					ipt.name = "in_brand_cd_name_sub";
					ipt.value = arr_list[i][j];
					td.style.display = "none";
				}
				if (j == 9) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_brand_cd";
					var def = arr_list[i][j];
					mkSelect(select, BRANDLIST, def);
					select.className = "select_pop2";
				}
				if (j == 10) {
					var ipt = cf.mkTag("input", td);
					ipt.style.width = "90%";
					ipt.name = "in_module";
					ipt.className="input_eng";
					ipt.value = arr_list[i][j];
				}
				if (j == 11) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_sales_status_cd";
					var def = arr_list[i][j];
					mkSelect(select, STATUSLIST, def);
					select.className = "select_pop2";
					select.options[1].disabled="true";
				}
				if (j == 12) {
					var ipt = cf.mkTag("input", td);
					ipt.style.width = "90%";
					ipt.name = "in_closing";
					ipt.className = "input_date";
					ipt.readOnly = true;
					ipt.value = arr_list[i][j];
				}
				if (j == 13) {
					var ipt = cf.mkTag("input", td);
					ipt.name = "in_operation_cd_code";
					ipt.value = arr_list[i][j];
					td.style.display = "none";
				}
				if (j == 14) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_operation_cd";
					var def = arr_list[i][j];
					mkSelect(select, DIVISION, def);
					select.className = "select_pop2";
				}
				if (j == 15) {
					var select = cf.mkTag("select", td);
					select.style.width = "95%";
					select.name = "in_user_id";
					var def = arr_list[i][j];
					mkSelect(select, DIVISIONUSERS, def);
					select.className = "select_pop2";
				}
				if (j == 16) {
					td.innerHTML = arr_list[i][j];
					var ipt = cf.mkTag("input", td);
					ipt.type = "hidden";
					ipt.name = "in_sales_project_code";
					ipt.value = arr_list[i][j];
					;

				}
				if (j == 17) {
					var ipt2 = cf.mkTag("input", td);
					ipt2.style.width = "90%";
					ipt2.style.textAlign = "right";
					ipt2.name = "in_contract_estimate_price";
					ipt2.value = comma(arr_list[i][j]);
					ipt2.onkeyup = function(e) {
						this.value = comma(uncomma(e.target.value));
						checkChar(e, this);
						profitCell();
					};
				}
				if (j == 18) {
					var ipt3 = cf.mkTag("input", td);
					ipt3.style.width = "90%";
					ipt3.style.textAlign = "right";
					ipt3.name = "in_cost_price";
					ipt3.value = comma(arr_list[i][j]);
					ipt3.onkeyup = function(e) {
						this.value = comma(uncomma(e.target.value));
						checkChar(e, this);
						profitCell();
					};
				}
				if (j == 19) {
					var ipt4 = cf.mkTag("input", td);
					ipt4.style.width = "90%";
					ipt4.style.textAlign = "right";
					ipt4.name = "in_profit_price";
					ipt4.readOnly = true;
					ipt4.value = comma(arr_list[i][j]);
				}
				if (j == 20) {
					if(arr_list[i][j] != 'X') {
						td.innerHTML = "O";
					}else {
						td.innerHTML = arr_list[i][j];
					}
				}
				if (j == 21) {
					td.className = "right";
					td.name = "creator_user_name";
					td.innerHTML = arr_list[i][j];
				}
				if (j == 22) {
					var ipt2 = cf.mkTag("input", td);
					ipt2.type = "hidden";
					ipt2.name = "prj_creator";
					ipt2.value = arr_list[i][j];
				}
			}
		});
		loadYearMonth(def1, def2);
		rowCount = true;
	}
};
function pcodeAdd() {
	var tbd = document.getElementById("pcodeView");
	if (!rowCount)
		tbd.innerHTML = "";
	var def1 = document.getElementById("sh_sales_project_year").value;
	var def2 = document.getElementById("sh_sales_project_month").value;

	var tr = cf.mkTag("tr", tbd);
	tr.style.textAlign = "center";
	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.type = "checkbox";
	checks.push(ipt);

	var td = cf.mkTag("td", tr);
	td.style.display = "none";
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_sales_project_id";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_sales_project_year";
	select.className = "in_sales_project_year select_pop2";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_sales_project_month";
	select.className = "in_sales_project_month select_pop2";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_sales_type_cd";
	mkSelect(select, TYPELIST);
	select.className = "select_pop2";
	select.focus();

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_company_id";
	td.style.display = "none";

	var td = cf.mkTag("td", tr);
	td.innerHTML = "선택하세요.";
	td.style.cursor = "pointer";
	td.onclick = function() {
		companyPopSrch(0);
		pcode_prev = this;
	};
	
	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.name = "in_sales_divide_cd";
	select.className="select_pop2";
	select.style.width = "95%";	
	for(var a=0 ; a<DIVIDELIST.length ; a++){
		var option = cf.mkTag("option", select);
		option.value=DIVIDELIST[a].code_id;
		option.text=DIVIDELIST[a].code_id;
	}

	var td = cf.mkTag("td", tr);
	var ipt_brand = cf.mkTag("input", td);
	ipt_brand.name = "in_brand_cd_name_sub";
	td.style.display = "none";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_brand_cd";
	mkSelect(select, BRANDLIST,"",true);
	select.className = "select_pop2";
	var set;
	select.onchange = function() {
		set = this;
		BRANDLIST.trav(function(d, i) {
			if (d.code_id == set.value) {
				ipt_brand.value = d.etc1;
			}
		});
	};

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_module";
	ipt.style.width = "90%";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_sales_status_cd";
	mkSelect(select, STATUSLIST,"",true);
	select.className = "select_pop2";
	select.options[1].disabled="true";

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_closing";
	ipt.className = "input_date";
	ipt.readOnly = true;
	ipt.style.width = "90%";

	var td = cf.mkTag("td", tr);
	var ipt_op = cf.mkTag("input", td);
	ipt_op.name = "in_operation_cd_code";
	td.style.display = "none";

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_operation_cd";
	/*if (DIVISION.length == 1) {
		var def,ocd=document.getElementById("in_operation_cd_code");
		def = DIVISION[0].codeName;
		if(def.indexOf("전략")>=0||def.indexOf("솔루션")>=0||def.indexOf("M&S")>=0||def.indexOf("공공")>=0)ocd.value = "R";
		else ocd.value = "T";
	}*/
	mkSelect(select, DIVISION,"",true);
	select.className = "select_pop2";
	select.onchange = function(e){
		var idx=e.target.selectedIndex;
		def = e.target.childNodes[idx].innerHTML;
		if(def.indexOf("전략")>=0||def.indexOf("솔루션")>=0||def.indexOf("M&S")>=0||def.indexOf("공공")>=0){
			ipt_op.value = "R";
		}else ipt_op.value = "T";
	};

	var td = cf.mkTag("td", tr);
	var select = cf.mkTag("select", td);
	select.style.width = "95%";
	select.name = "in_user_id";
	//var def = searchMem();
	mkSelect(select, DIVISIONUSERS, LOGINFO.user_id);
	select.className = "select_pop2";

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_sales_project_code";
	ipt.disabled = true;
	ipt.style.width = "95%";

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_contract_estimate_price";
	ipt.style.width = "90%";
	ipt.style.textAlign = "right";
	ipt.onkeyup = function(e) {
		this.value = comma(uncomma(e.target.value));
		checkChar(e, this);
		profitCell();
	};
	paymentSet(ipt);

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_cost_price";
	ipt.style.width = "90%";
	ipt.style.textAlign = "right";
	ipt.onkeyup = function(e) {
		this.value = comma(uncomma(e.target.value));
		checkChar(e, this);
		profitCell();
	};
	paymentSet(ipt);

	var td = cf.mkTag("td", tr);
	var ipt = cf.mkTag("input", td);
	ipt.name = "in_profit_price";
	ipt.style.width = "90%";
	ipt.style.textAlign = "right";
	ipt.readOnly = true;
	ipt.value = 0;

	var td = cf.mkTag("td", tr);
	var td = cf.mkTag("td", tr);
	td.className = "right";

	datePicker("input_date", "yy.mm.dd");
	//년월 불러오기
	loadYearMonth(def1, def2);
	rowCount = true;
};

var statusInfo = function() {
	STATUS_info = document.getElementById("status_info").childNodes[0];
	STATUS_info.className = "ico_info";
	var img = cf.mkTag("img", STATUS_info);
	img.src = "/images/ico/ico_info.png";
	img.style.cursor = "pointer";
	img.onclick = function() {
		var con = document.createElement("div");
		con.innerHTML = "";		
		Object.assign(con.style, {width:"400px", height:"280px", position:"absolute"});		

		var con0 = cf.mkTag("div", con);
		con0.className = "pop-mypage";

		var con1 = cf.mkTag("div", con0);
		con1.id = "pop_my";
		Object.assign(con1.style, {width:"400px", height:"280px", border:"2px solid black", backgroundColor:"white"});
		
		var con2 = cf.mkTag("div", con1);
		con2.className = "my_top";
		var span = cf.mkTag("span", con2);
		span.innerHTML = "영업 현황";

		var con2_a = cf.mkTag("a", con2);
		con2_a.href = "javascript:;";
		con2_a.className = "my_top_closs";
		
		var con2_img = cf.mkTag("img", con2_a);
		con2_img.src = "/images/pop_btn/btn_pop_close.png";
		con2_img.id = "my_closs";
		con2_img.alt = "닫기";
		con2_img.align = "right";
		Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
		
		con2_img.onclick = function() {
			cf.killTag(con.parentNode);
		};

		var con3 = cf.mkTag("div", con1);
		con3.className = "my-container";		
		Object.assign(con3.style, {width:"210px", marginTop:"20px", overflowY:"auto"});

		var con4 = cf.mkTag("div", con3);
		con4.className = "Wrap_table";

		var table = cf.mkTag("table", con4);		
		Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});

		STATUSLIST.trav(function(d, i) {
			var tr = cf.mkTag("tr", table);
			var th = cf.mkTag("th", tr);
			var td = cf.mkTag("td", tr);
			td.className = "pd10 right";
			th.innerHTML = d.code_name;
			td.innerHTML = d.etc1;
		});

		callPop(con);
	};
};

var profitCell = function() {
	var in_contract_price = document.getElementsByName("in_contract_estimate_price")
		, in_cost_price = document.getElementsByName("in_cost_price")
		, in_profit_price = document.getElementsByName("in_profit_price");

	in_profit_price.trav(function(d, i) {
		var a = uncomma(in_contract_price[i].value) * 1, b = uncomma(in_cost_price[i].value) * 1;
		d.value = comma(a - b);
	});
};

var searchMem = function(){
	var mem;
	
	DIVISIONUSERS.trav(function(d, i) {
		if (d.code_id == LOGINFO.user_id)
			mem = d.code_id;
	});
	
	return mem;
};