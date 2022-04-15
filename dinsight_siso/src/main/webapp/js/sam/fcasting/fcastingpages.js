mkSearchDiv();
initView();
getForecastingData(true);
initEvent();

function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "forecastingyy";
	select.name = "forecastingyy";
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:280+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "forecastingmm";
	select.name = "forecastingmm";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "forecastingweak";
	select.name = "forecastingweak";
	span.innerHTML = "주차";
	cf.setCss(select,{width:50+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});

	var bx2 = cf.mkTag("div", line1);
	bx2.id = "weekDate";

	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick=function(){
		getForecastingData(false);
	};
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left",paddingTop:5+"px",paddingLeft:12+"px"});
};
//Elements 생성
function fnGetElements(idx, data, dataflag){
	//체크박스
	if(idx == 0){
		var el = document.createElement("input");
		el.type = "checkbox";
		el.name = "checklist";
		el.size = 10;     
	}	
	//Project Code
	if(idx == 1){
		var el = document.createElement("input");
		el.onclick = function(e){
			getProductCodePop(e);
			
			if(e.target.parentNode.tagName == "TR"){
				selectedtr = e.target.parentNode;	
			}else{
				selectedtr = e.target.parentNode.parentNode;
			}
			
			selectedIndex = selectedtr.childNodes[0].childNodes[0].value;
		};
		el.style.cursor = "pointer";
		el.style.width = "90%";
		el.name = "in_sales_project_code";
		el.readOnly = true;
		el.className="iptpadl0";
		el.style.textAlign = "center";
		if(dataflag){
			el.value = data.sales_project_code;
		}
	}
	
	//년
	if(idx == 2){
		var el = document.createElement("input");
		el.style.width = "85%";
		el.name = "in_sales_yy";
		el.style.textAlign = "center";
		el.className="iptpadl0";
		el.maxLength = "4";
		el.readOnly = true;
		if(dataflag){
			var sales_yy = data.sales_ym;
			el.value = sales_yy.substring(0,4);
		}else{
			el.value = fnaddyy;
		}
	} 
	
	//월
	if(idx == 3){
		var el = document.createElement("input");
		el.name = "in_sales_mm";
		el.style.width = "80%";
		el.style.textAlign = "center";
		el.className="iptpadl0";
		el.maxLength = "2";
		el.readOnly = true;
		if(dataflag){
			var sales_mm = data.sales_ym;
			el.value = sales_mm.substring(4,6);
		}else{
			el.value = fnaddmm;
		}
	} 
	
	//주차
	if(idx == 4){
		var el = document.createElement("input");
		el.style.width = "80%";
		el.name = "in_sales_week";
		el.style.textAlign = "center";
		el.className="iptpadl0";
		el.maxLength = "1";
		el.readOnly = true;
		if(dataflag){
			el.value = data.sales_week;
		}else{
			el.value = fnaddweek;
		}
	} 
	
	//담당영업	 
	if(idx == 5){
		var el = document.createElement("input");
		el.style.width = "85%";
		el.name = "in_user_name";
		el.className="iptpadl0";
		el.readOnly = true;
		el.style.textAlign = "center";
		if(dataflag){
			el.value = data.user_name;
			mkHidden(data.user_id,"in_user_id",el);
		}else mkHidden("","in_user_id",el);		
	} 
	
	//신규 OR ALC
	if(idx == 6){
		/*var el = document.createElement("select");
		el.name = "in_sales_divide_cd";
		el.className="select_pop2";
		el.style.width = "95%";
		for(var i=0 ; i<salesdividelist.length ; i++){
			var opt = document.createElement("option");
			opt.value = salesdividelist[i].codeId;
			textnode = document.createTextNode(salesdividelist[i].codeId);
			opt.appendChild(textnode);
			el.appendChild(opt);	
		}
		
		if(dataflag){
			for(var i=0 ; i<el.options.length ; i++){
				if(data.sales_divide_cd == salesdividelist[i].codeId){
					el.options[i].selected = true;
				}
			}
		}*/
		
		var el = document.createElement("input");
		el.style.width = "85%";
		el.name = "in_sales_divide_cd";
		el.className="iptpadl0";
		el.readOnly = true;
		el.style.textAlign = "center";
		if(dataflag){
			el.value = data.sales_divide_cd;
		}
	} 
	
	//이슈여부
	if(idx == 7){
		var el = document.createElement("input");
		el.style.width = "85%";
		el.name = "in_issue_yn";
		el.className="iptpadl0";
		el.style.textAlign = "center";
		el.readOnly = true;
		
		var hiddenel = document.createElement("input");
		hiddenel.type ="hidden";
		el.appendChild(hiddenel);
		el.style.cursor = "pointer";
		if(dataflag){
			if(data.issue_yn == "1"){
				el.value = "O";	
			}
		}
			
		el.onclick = function(e){
			getmakeIssuePop(e);
		};
	} 
	
    //영업 Status
	if(idx == 8){
		var el = document.createElement("select");
		el.style.width = "95%";
		el.className="select_pop2";
		el.name = "in_sales_status_cd";
		for(var i=0 ; i<salesstatuslist.length ; i++){
			var opt = document.createElement("option");
			opt.value = salesstatuslist[i].code_id;
			textnode = document.createTextNode(salesstatuslist[i].code_name);
			opt.appendChild(textnode);
			el.appendChild(opt);	
		}
		
		if(dataflag){
			for(var i=0 ; i<el.options.length ; i++){
				if(data.sales_status_cd == salesstatuslist[i].code_id){
					el.options[i].selected = true;
				}
			}
		}
	} 
    
    //Type
	if(idx == 9){
		var el = document.createElement("select");
		el.style.width = "95%";
		el.className="select_pop2";
		el.name = "in_sales_type_cd";
		for(var i=0 ; i<salestypelist.length ; i++){
			var opt = document.createElement("option");
			opt.value = salestypelist[i].code_id;
			textnode = document.createTextNode(salestypelist[i].code_name);
			opt.appendChild(textnode);
			el.appendChild(opt);	
		}
		
		if(dataflag){
			for(var i=0 ; i<el.options.length ; i++){
				if(data.sales_type_cd == salestypelist[i].code_id){
					el.options[i].selected = true;
				}
			}
		}
	} 
    
	//Customer Name
	if(idx == 10){
		var el = document.createElement("input");
		el.style.width = "90%";
		el.readOnly = true;
		el.name = "in_compnay_name";
		el.style.textAlign = "center";
		el.size = 18;    
		if(dataflag){
			el.value = data.company_name;
		}
	} 
	
    //Brand
	if(idx ==11){
		var el = document.createElement("input");
		el.style.width = "90%";
		el.readOnly = true;
		el.name = "in_brand_name";
		el.style.textAlign = "center";
		el.size = 13;
		if(dataflag){
			el.value = data.brand_name;
		}
	} 
    
	//제품
	if(idx ==12){
		var el = document.createElement("input");
		el.readOnly = true;
		el.name = "in_module";
		el.style.textAlign = "center";
		el.style.width = "90%";
		if(dataflag){
			el.value = data.module;
		}
	} 
	
	//수량
	if(idx ==13){
		var el = document.createElement("input");
		el.style.textAlign = "right";
		el.className="iptpadl0 iptpadr5";
		el.name = "in_qty";
		el.style.width = "85%";
		el.placeholder = "0";
		if(dataflag){
			el.value = data.qty;
		}else{
			el.value = 0;
		}
		
		el.onkeyup = function(e){
			checkChar(e, this);
		};
	} 
	
	//계약금액
	if(idx ==14){
		var el = document.createElement("input");
		el.style.textAlign = "right";
		el.name = "in_contract_price";
		el.className="iptpadl0 iptpadr5";
		el.style.width = "90%";
		if(dataflag){
			el.value = comma(data.contract_price);
		}else{
			el.value = 0;
		}
		
		el.onkeyup = function(e){
			el.value = comma(uncomma(e.target.value));
			profitCell();
		};
	} 
	
	//원가
	if(idx ==15){
		var el = document.createElement("input");
		el.style.textAlign = "right";
		el.name = "in_cost_price";
		el.className="iptpadl0 iptpadr5";
		el.style.width = "90%";
		if(dataflag){
			el.value = comma(data.cost_price);
		}else{
			el.value = 0;
		}
		
		el.onkeyup = function(e){
			el.value = comma(uncomma(e.target.value));
			profitCell();
		};
	} 
	
	//영업이익
	if(idx ==16){
		var el = document.createElement("input");
		el.style.textAlign = "right";
		el.name = "in_profit_price";
		el.className="iptpadl0 iptpadr5";
		el.style.width = "90%";
		el.readOnly = true;
		if(dataflag){
			el.value = comma(data.profit_price);
		}else{
			el.value = 0;
		}
		
		el.onblur = function(e){
			el.value = comma(uncomma(e.target.value));
			profitCell();
		};
	} 
	
	//계약시점
	if(idx ==17){
		var el = document.createElement("input");
		el.name = "in_contract_ym";
		el.style.textAlign = "center";
		el.style.width = "90%";
		el.size = 10;
		
		if(dataflag){
			var contract_ym = data.contract_ym;
			var contract_yyyy = contract_ym.substring(0,4); 
			var contract_mm = contract_ym.substring(4,6);
			var contract_dd = contract_ym.substring(6,8);
			//el.value = contract_yyyy + "." + contract_mm + "." + contract_dd;
			if(contract_ym != "" || contract_ym != null || contract_ym != undfined)
			el.value = contract_yyyy + "." + contract_mm;
		}
	}
	return el;
};
function fnDataView(data){
	document.getElementById("checkAll").checked = false;
	var addRow = 18;
	var dataRow = data.length;
	var tbody = document.getElementById("listView");
	tbody.innerHTML = "";
	
	var ArrUserName = Array();
	var ArrSalesDivide = Array();
	var ArrSalesStatus = Array();
	var ArrSalesType = Array();
	var ArrContractYm = Array();
	
	if(dataRow > 0) {
		for(var i=0 ; i<dataRow ; i++){
			var tr = document.createElement("tr");
			for(var j=0 ; j<addRow ; j++){
				td = document.createElement("td");
				if(j == 0){
					var el1 = document.createElement("input");
					el1.type = "hidden";
					el1.name = "selectedIndex";
					el1.value = parseInt(i);
					td.appendChild(el1);
					
					var el2 = document.createElement("input");
					el2.type = "hidden";
					el2.name = "in_sales_id";
					el2.value = data[i].sales_id;
					td.appendChild(el2);
					
					var el3 = document.createElement("input");
					el3.type = "hidden";
					el3.name = "in_report_item";
					el3.value = data[i].report_item;
					td.appendChild(el3);
					
					var el4 = document.createElement("input");
					el4.type = "hidden";
					el4.name = "in_sales_project_id";
					el4.value = data[i].sales_project_id;
					td.appendChild(el4);
					
					var copy_sales_ym_el = document.createElement("input");
					copy_sales_ym_el.name = "copy_sales_ym";
					copy_sales_ym_el.type = "hidden";
					td.appendChild(copy_sales_ym_el);
				}
				el = fnGetElements(j, data[i], true);
				td.appendChild(el);
				tr.style.textAlign = "center";
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
			
			ArrUserName.push(data[i].user_name);
			ArrSalesDivide.push(data[i].sales_divide_cd);
			ArrSalesStatus.push(data[i].sales_status_name);
			ArrSalesType.push(data[i].sales_type_name);
			ArrContractYm.push(data[i].contract_ym);
		}
		
		//그리드 타이틀 셀렉트 박스 데이터 만들기
		titleSelectBox("#orderUserName", ArrUserName);
		titleSelectBox("#orderSalesDivide", ArrSalesDivide);
		titleSelectBox("#orderSalesStatus", ArrSalesStatus);
		titleSelectBox("#orderSalesType", ArrSalesType);
		titleSelectBox("#orderContractYm", ArrContractYm);
		
	} else {
		
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.colSpan="18";
		td.textContent = "조회된 데이터가 없습니다.";
		td.style.textAlign = "center";
		td.className="right";
		tr.appendChild(td);
		tbody.appendChild(tr);
		rowCount = 0; //조회 리스트에 데이터 없음으로 변경
	}
};
function getmakeIssuePop(e){
	//Header
	var popobj = getPopupBody(700, 360, "이슈 작성", "make_issue");
	var sales_id = e.target.parentNode.parentNode.firstChild.childNodes[1].value;
	var isuDataflag = false;
	$.ajax({
		  url: "/sam/fcasting/selectForeCastingIssueAjax",
		  type: "POST",
		  data: {"sales_id" : sales_id},
		  async: false,
		  dataType: 'json',
		  success: function (data) {
			  	var report_item = "";
			  	if(data.report_item_list.length > 0){
			  		isuDataflag = true;
			  		report_item = data.report_item_list[0].report_item;
			  	}else{
			  		report_item = e.target.children[0].value;
			  	}
			  	
			  	pEl = document.createElement("p");
			  	pEl.style.marginLeft = "40px";
			  	pEl.style.marginTop = "20px";
			  	strongEl = document.createElement("strong");
			  	strongEl.textContent = "이슈 작성";
			  	strongEl.style.fontSize = "16px";
			  	strongEl.style.fontWeight = "bold";
			  	
			  	pEl.appendChild(strongEl);
			  	
			  	issueDiv = document.createElement("div");
			  	issueDiv.style.width = "36%";
				issueDiv.style.margin = "auto";
			  	issueDiv.style.marginTop = "15px";
			  	imgEl1 = document.createElement("button");
			  	imgEl1.className="ct-btn darkgrey large";
			  	imgEl1.innerHTML="저장";
			  	if(expiredDateFlag)imgEl1.disabled=true;
			  	
			  	if(e.target.parentNode.tagName == "TR"){
  					selectedtr = e.target.parentNode;	
  				}else{
  					selectedtr = e.target.parentNode.parentNode;
  				}
  				
  				IsuselectedIndex = selectedtr.childNodes[0].childNodes[0].value;
  				  				
			  	imgEl1.onclick = function(){
			  		if(expiredDateFlag){
			  			generalPopOk2("과거시점데이터는 조회만 가능합니다.");	
			  		}else{
			  			
			  			var text_issue = document.getElementById("text_issue").value;
				  		if(text_issue == ""){
				  			generalPopOk2("내용을 입력하세요", function(){
				  				document.getElementById("text_issue").focus();
				  			});
				  			return false;
				  		} 
				  		
				  		if(!isuDataflag){
				  		    generalPopOk("저장되었습니다.", function(){
			  				e.target.value = "O";
			  				var isu_report_item = document.getElementsByName("in_report_item");
			  				isu_report_item[IsuselectedIndex].value = text_issue;
			  				
			  				e.target.children[0].value = text_issue;
			  				var con = document.getElementById("Layer_Center_wrap");
					  		cf.killTag(con.parentNode.parentNode);
				  		  });
				  		}else{
							$.ajax({
								url: "/sam/fcasting/foreCastingIssueSaveAjax",
								type: "POST",
								data: {"sales_id" : sales_id,"report_item" : text_issue},
								async: false,
								success: function (data) {
									generalPopOk("저장되었습니다.", function(){
										e.target.value = "O";
										
										var isu_report_item = document.getElementsByName("in_report_item");
						  				isu_report_item[IsuselectedIndex].value = text_issue;
						  				
										var con = document.getElementById("Layer_Center_wrap");
										cf.killTag(con.parentNode.parentNode);
									});						  			  
									$('.wrap-loading').hide(20);
									},
									beforeSend:function(){
										$('.wrap-loading').show();
									},						  		  
									error:function(request,status,error){
										$('.wrap-loading').hide(20);
										generalPopOk("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
									}
							});
				  		}
			  		}
			  	};
			  	
			  	imgEl2 = document.createElement("button");
			  	imgEl2.className="ct-btn grey large";
			  	imgEl2.innerHTML="삭제";
			  	if(expiredDateFlag)imgEl2.disabled=true;
			  	
			  	imgEl1.style.marginRight=5+"px";
			  	imgEl2.onclick = function(){
			  		if(expiredDateFlag){
			  			generalPopOk2("과거시점데이터는 조회만 가능합니다.");	
			  		}else{
					  		 
			  			if(!isuDataflag){
			  				generalPopOk("삭제되었습니다.", function(){
				  				e.target.value = "";
				  				var isu_report_item = document.getElementsByName("in_report_item");
				  				isu_report_item[IsuselectedIndex].value = "";
				  				var con = document.getElementById("Layer_Center_wrap");
						  		cf.killTag(con.parentNode.parentNode);
				  			  });	
			  			}else{
							$.ajax({
								url: "/sam/fcasting/foreCastingIssueDeleteAjax",
								type: "POST",
								data: {"sales_id" : sales_id},
								async: false,
								success: function (data) {
									generalPopOk("삭제되었습니다.", function(){
						  				e.target.value = "";
						  				var con = document.getElementById("Layer_Center_wrap");
								  		cf.killTag(con.parentNode.parentNode);
									});
						  			$('.wrap-loading').hide(20);
						  		},
						  		beforeSend:function(){
						  			$('.wrap-loading').show();
						  		},
								error:function(request,status,error){
									$('.wrap-loading').hide(20);
									generalPopOk("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
								}
							});
			  			}
			  		}
			  	};
			  	issueDiv.appendChild(imgEl1);
			  	issueDiv.appendChild(imgEl2);
			  	
			  	issueDiv2 = document.createElement("div");
			  	issueDiv2.style.width = "95%";
			  	issueDiv2.style.margin = "auto";
			  	textEl = document.createElement("textarea");
			  	textEl.value = report_item;
			  	textEl.id = "text_issue";
			  	textEl.style.width = "100%";
			  	textEl.style.height = "245px";
			  	textEl.style.marginTop = "15px";
			  	textEl.style.border ="2px solid #898989";
			  	textEl.style.background ="#f5f5f5";
			  	textEl.style.fontSize = "12px";
			  	issueDiv2.appendChild(textEl);
			  	
			  	callPop(popobj);
				var poparea = document.getElementById("make_issue");
				
				//poparea.appendChild(pEl);
				poparea.appendChild(issueDiv2);
				poparea.appendChild(issueDiv);
				textEl.focus();
		  }
	});
};
function getWeekCopyPop(e){
	//Header
	var popobj = getPopupBody(322, 183, "Forecasting 복사", "forcastingcopy"),
		date = new Date(),
		year = date.getFullYear() + "",
		month = date.getMonth() + 1,
		day = date.getDate(),
		dateStr;
	if(month < 10) month = "0" + month;
	else month = month + "";
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
	var nowWeek = getSecofWeekMonday(dateStr);
	var pel = document.createElement("p");
	var strongel = document.createElement("strong");
	strongel.textContent = "복사할 주를 선택해주세요";
	pel.appendChild(strongel);
	cf.setCss(strongel,{fontSize:13+"px"});
	cf.setCss(pel,{marginTop:20+"px",textAlign:"left"});
	
	var el = document.createElement("input");
	el.readOnly = true;
	el.className = "input_date";
	el.id = "in_copy_sales_ym";
	cf.setCss(el,{marginTop:10+"px",textAlign:"center",fontWeight:"bold",height:35+"px",width:265+"px"});
	
	nowWeek=nowWeek.substr(6,1);
	el.value = year + "년 " + month + "월 " + nowWeek + "주";
	var datevalue = "";
	el.onchange = function(e){
		datevalue = e.target.value;
		var datenowWeek =  getSecofWeekMonday(datevalue);
		var dateyear = datevalue.substring(0,4);
		var datemm = datevalue.substring(4,6);
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
		if(datenowWeek.length>1)datenowWeek=datenowWeek.substr(6,1);
		e.target.value = dateyear + "년 " + datemm + "월 " + datenowWeek + "주";
	};
	
	
	var el3 = document.createElement("div")
		el3_img=cf.mkTag("img",el3);
	el3_img.src = "/images/pop_btn/btn_pop_copy.gif";
	cf.setCss(el3,{marginTop:15+"px",cursor:"pointer",textAlign:"center"});
	
	el3.onclick = function(){
		var compareDateValue = datevalue.substring(0,6) + getSecofWeekMonday(datevalue);
		if(compareDateValue == "NaN" || compareDateValue == undefined || compareDateValue == null){
			compareDateValue = year + month + nowWeek;
		}
		
		if(compareNowDate > compareDateValue){
			generalPopOk2("과거시점으로 복사할수 없습니다.");
			return false;
		}
		
		var in_sales_project_code = document.getElementsByName("in_sales_project_code");
		var checkel = document.getElementsByName("checklist");
		for(var i=1 ; i<checkel.length ; i++){
			if(checkel[i].checked) {
				if(in_sales_project_code[i-1].value == ""){
					generalPopOk2("Project Code를 입력하셔야합니다.");
					return false;		
				}
			}
		}		
		generalPop("복사하시겠습니까?", function(){
			copyForcastingData(popobj);
		});
	};
	
	callPop(popobj);
	
	var poparea = document.getElementById("forcastingcopy");
	
	poparea.appendChild(pel);
	poparea.appendChild(el); 
	poparea.appendChild(el3);
	
	$("#datepicker").datepicker( "option", "showWeek", "true");
	datePickerMonth("input_date", "yymmdd");
};