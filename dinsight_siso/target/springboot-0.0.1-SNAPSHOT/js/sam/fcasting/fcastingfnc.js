var salesdividelist; 		//영업구분
var salesstatuslist;		//영업상태
var salestypelist;			//영업유형
var brandlist;				//Type
var selectedtr;				//선택된Project Code
var selectedIndex;			//선택된Project CodeROWNUM
var fnaddyy;				//선택된 년
var fnaddmm;				//선택된 월
var fnaddweek;				//선택된 주차
var rowCount = 1;           //리스트에 조회데이터 유무
var compareNowDate;
var compareSearchDate;
var expiredDateFlag = false;

function initView(){
	var Normal_table = document.getElementById("Normal_table"),
		p = document.getElementById("pCodeTable");
	
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
	compareNowDay = year + month + day;
	
	var compareNowDate = getSecofWeekMonday(compareNowDay);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	comMonthWeek = compareNowDate.substring(6,7);
	
	var forecastingyy = document.getElementById("forecastingyy");
	var forecastingmm = document.getElementById("forecastingmm");
	var forecastingweak = document.getElementById("forecastingweak");
	forecastingweak.innerHTML="";
	
	for(var i=0 ; i<maxWeek ; i++){
		var optionEl = document.createElement("option");
		optionEl.value = parseInt(i+1);
		var textnodeEl = document.createTextNode(parseInt(i+1));
		optionEl.appendChild(textnodeEl);
		forecastingweak.appendChild(optionEl);
	}
	
	createYearMonthDay("Y", 2013, "#forecastingyy");
	
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
		getWeekDate(document.getElementById("forecastingyy").value, document.getElementById("forecastingmm").value, document.getElementById("forecastingweak").value, "#weekDate");
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
		getWeekDate(document.getElementById("forecastingyy").value, document.getElementById("forecastingmm").value, document.getElementById("forecastingweak").value, "#weekDate");
	};
	
	forecastingweak.onchange = function(e){
		
		//선택한 주의 기간 표시
		getWeekDate(document.getElementById("forecastingyy").value, document.getElementById("forecastingmm").value, document.getElementById("forecastingweak").value, "#weekDate");
	};
	cf.setCss(p,{height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px"});
	
	//선택한 주의 기간 표시
	getWeekDate(document.getElementById("forecastingyy").value, document.getElementById("forecastingmm").value, document.getElementById("forecastingweak").value, "#weekDate");
};
function getForecastingData(initFlag){	
	var forecastingyy = document.getElementById("forecastingyy").value;
	var forecastingmm = document.getElementById("forecastingmm").value;
	var forecastingweak = document.getElementById("forecastingweak").value;
	
	var sales_ym = forecastingyy + forecastingmm;
	var sales_mm = forecastingmm;
	var sales_week = forecastingweak;
	
	fnaddyy = forecastingyy;
	fnaddmm = sales_mm;
	fnaddweek = sales_week;
	
	$.ajax({
		url: "/sam/fcasting/foreCastingListAjax",
		type: "POST",
		data: { "sales_ym" : sales_ym,"sales_mm" : sales_mm,"sales_week" : sales_week},
		async: false,
		dataType: 'json',
		success: function (data) {
			salesdividelist = data.salesdividelist;
			salesstatuslist = data.salesstatuslist;
			salestypelist = data.salestypelist;
			brandlist = data.brandlist;
			fnDataView(data.saleslist);
			if(!initFlag){ disableEvent();}
			$('.wrap-loading').hide(20);
  		},
  		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
function getForecastingData2(){
	$.ajax({
	  url: "/sam/fcasting/foreCastingListAjax2",
	  type: "POST",
	  data: {"sales_ym" : fnaddyy + fnaddmm,"sales_mm" : fnaddmm,"sales_week" : fnaddweek},
	  async: false,
	  dataType: 'json',
	  success: function (data) {
		  fnDataView(data.saleslist);
		  $('.wrap-loading').hide(20);
   		},
   		beforeSend:function(){
   			$('.wrap-loading').show();
   		}
	});
};
function copyForcastingData(popobj){
	var copy_sales_ym = document.getElementById("in_copy_sales_ym").value;
	var copy_sales_yms = document.getElementsByName("copy_sales_ym");
	for(var i=0 ; i<copy_sales_yms.length ; i++){
		copy_sales_yms[i].value = copy_sales_ym; 
	}
	var temp = $("#listView").find(":has(:checkbox:checked)").find("select, input").serialize();
	
	//var temp_search = "";	
	$.ajax({
		url: "/sam/fcasting/foreCastingListCopyAjax",
		type: "POST",
		data: temp,
		async: false,
		success: function (data) {
			/*generalPop("저장되었습니다");		
			cf.killTag(popobj.parentNode);			 
			$("#listView").after().load("/sam/fcasting/foreCasting", temp_search, function (data){
				//페이지 갱신시 호출 리스트 함수를 부름
				//initView();
				getForecastingData(true);
				initEvent();
			});*/
			cf.killTag(popobj.parentNode);
			generalPopOk("저장되었습니다", getForecastingData2);
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
};
function saveForcastingData(){	
	var temp = $("#listView").find("select, input").serialize();
	$.ajax({
		url: "/sam/fcasting/foreCastingSaveAjax",
		type: "POST",
		data: temp,
		async: false,
		success: function (data) {
			generalPopOk("저장되었습니다", getForecastingData2);
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
};
function deleteForcastingData(){	
	var temp = $("#listView").find(":has(:checkbox:checked)").find("select, input").serialize();
	$.ajax({
		url: "/sam/fcasting/foreCastingListDeleteAjax",
		type: "POST",
		data: temp,
		async: false,
		success: function (data) {
			generalPopOk("삭제되었습니다.", function()	{
				$("#listView").find(":has(:checkbox:checked)").remove();
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
};
function initEvent(){
	var btnCopy = document.getElementById("btnCopy");
	var btnAdd = document.getElementById("btnAdd");
	var btnDel = document.getElementById("btnDel");
	var btnSave = document.getElementById("btnSave");
	var checkbox = document.getElementById("checkAll");
	var productcode = document.getElementsByName("productcode");
	
	btnCopy.onclick = fnBtnCopy;
	btnAdd.onclick = fnBtnAdd;
	btnDel.onclick = fnBtnDel;
	btnSave.onclick = fnBtnSave;
	checkbox.onclick = fnCheckedAll;
	
	for(var i=0 ; i<productcode.length ; i++){
		productcode[i].onclick = function(e){
			getProductCodePop(e);
			if(e.target.parentNode.tagName == "TR"){
				selectedtr = e.target.parentNode;	
			}else{
				selectedtr = e.target.parentNode.parentNode;
			}
			
			selectedIndex = selectedtr.childNodes[0].childNodes[0].value;
		};
	}
};
function disableEvent(){
	var date = new Date();
	var year = date.getFullYear() + "";
	var month = date.getMonth() + 1;
	if(month < 10) month = "0" + month;
	else month = month + "";
	var day = date.getDate();
	if(day < 10) day = "0" + day;
	else day = day + "";
	//var dateStr = year + "" + month + "" + day;
	//var nowWeek = getSecofWeekMonday(dateStr);
	
	var forecastingyy = document.getElementById("forecastingyy");
	var forecastingmm = document.getElementById("forecastingmm");
	var forecastingweak = document.getElementById("forecastingweak");
	
	var btnAdd = document.getElementById("btnAdd");
	var btnDel = document.getElementById("btnDel");
	var btnSave = document.getElementById("btnSave");
	
	compareNowDay = year + month + day;
	//var comMonthWeek = getSecofWeekMonday(compareNowDay);
	//compareNowDate = year + month + comMonthWeek;
	
	
	var compareNowDate = getSecofWeekMonday(compareNowDay);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	comMonthWeek = compareNowDate.substring(6,7);
		
	compareSearchDate = forecastingyy.value + forecastingmm.value + forecastingweak.value;
	
	if(parseInt(compareNowDate) > parseInt(compareSearchDate)){
		expiredDateFlag = true;
		btnAdd.firstChild.firstChild.src = "/images/btn/btn_plus_off.gif";
		btnDel.firstChild.firstChild.src = "/images/btn/btn_del_off.gif";
		btnSave.firstChild.firstChild.src = "/images/btn/btn_save_off.gif";
		btnAdd.firstChild.style.cursor = "default";
		btnDel.firstChild.style.cursor = "default";
		btnSave.firstChild.style.cursor = "default";
		btnAdd.onclick = function(){
			generalPopOk2("과거시점데이터는 복사만 가능합니다.");
		};
		btnDel.onclick = function(){
			generalPopOk2("과거시점데이터는 복사만 가능합니다.");
		};
		btnSave.onclick = function(){
			generalPopOk2("과거시점데이터는 복사만 가능합니다.");
		};
	}else{
		expiredDateFlag = false;
		btnAdd.firstChild.style.cursor = "pointer";
		btnDel.firstChild.style.cursor = "pointer";
		btnSave.firstChild.style.cursor = "pointer";
		btnAdd.firstChild.firstChild.src = "/images/btn/btn_plus_on.gif";
		btnDel.firstChild.firstChild.src = "/images/btn/btn_del_on.gif";
		btnSave.firstChild.firstChild.src = "/images/btn/btn_save_on.gif";
		btnAdd.onclick = fnBtnAdd;
		btnDel.onclick = fnBtnDel;
		btnSave.onclick = fnBtnSave;
	}
	
	/* removeEvent(btnAdd, "click", function(){
		alert("click");
	});
	removeEvent(btnDel, "click", function(){
		alert("Delete");
	});
	removeEvent(btnSave, "click", function(){
		alert("save");
	}); */
};
//추가
function fnBtnAdd(){	
	getProductCodePop("", "insert");	
	/*var addRow = 18;
	var tbody = document.getElementById("listView");
	if(rowCount == 0) {
		tbody.innerHTML ="";
		rowCount = 1;
	}
	
	var tr = document.createElement("tr");
	tr.style.textAlign = "center";
	for(var i=0 ; i<addRow ; i++){
		td = document.createElement("td");
		if(i == 0){
			var totalTr = document.getElementById("listView").childNodes.length;
			var el1 = document.createElement("input");
			el1.type = "hidden";
			el1.name = "selectedIndex";
			el1.value = parseInt(totalTr);
			td.appendChild(el1);
			
			var el2 = document.createElement("input");
			el2.type = "hidden";
			el2.name = "in_sales_id";
			td.appendChild(el2);
			
			var el3 = document.createElement("input");
			el3.type = "hidden";
			el3.name = "in_report_item";
			el3.value = "";
			el3.value = "";
			td.appendChild(el3);
			
			var el4 = document.createElement("input");
			el4.type = "hidden";
			el4.name = "in_sales_project_id";
			el4.value = "";
			td.appendChild(el4);
			
			var copy_sales_ym_el = document.createElement("input");
			copy_sales_ym_el.name = "copy_sales_ym";
			copy_sales_ym_el.type = "hidden";
			td.appendChild(copy_sales_ym_el);
			
		}
		el = fnGetElements(i, null, false);
		td.appendChild(el);
		tr.appendChild(td);
	}
	
	tbody.appendChild(tr);
	var salesFocus = document.getElementsByName("in_sales_project_code");
	salesFocus[salesFocus.length -1].focus();
	salesFocus[salesFocus.length -1].click();*/
};
//복사
function fnBtnCopy(){
	var checkel = document.getElementsByName("checklist");
	var checkcnt = 0;
	for(var i=1 ; i<checkel.length ; i++){
		if(checkel[i].checked) checkcnt++;
	}
	if(checkcnt <= 0){
		generalPopOk2("복사할 데이터를 선택하세요.");
		return false;
	}
	getWeekCopyPop();
};
//삭제
function fnBtnDel(){
	var checkel = document.getElementsByName("checklist");
	var checkcnt = 0;
	for(var i=1 ; i<checkel.length ; i++){
		if(checkel[i].checked) checkcnt++;
	}
	if(checkcnt <= 0){
		generalPopOk2("삭제할 데이터를 선택하세요.");
		return false;
	}
	generalPop("삭제하시겠습니까?", deleteForcastingData);
};
//저장
function fnBtnSave(){
	var checkel = document.getElementsByName("checklist");
	var chk_in_sales_project_code = document.getElementsByName("in_sales_project_code");
	var chk_in_sales_status_cd    = document.getElementsByName("in_sales_status_cd");
	var chk_in_sales_type_cd      = document.getElementsByName("in_sales_type_cd");
	var checkcnt = 0;
	for(var i=1 ; i<checkel.length ; i++){
		if(checkel[i].checked) checkcnt++;
	}
	
	for(var i=0 ; i<chk_in_sales_project_code.length ; i++){
		if(chk_in_sales_project_code[i].value == ""){
			generalPopOk2("Project Code를 입력하셔야 합니다");
			return false;
		}
	}
	
	for(var i=0 ; i<chk_in_sales_status_cd.length ; i++){
		if(chk_in_sales_status_cd[i].value == ""){
			generalPopOk2("영업현황을 선택하셔야 합니다");
			return false;
		}
	}
	
	for(var i=0 ; i<chk_in_sales_type_cd.length ; i++){
		if(chk_in_sales_type_cd[i].value == ""){
			generalPopOk2("구분을 선택하셔야 합니다");
			return false;
		}
	}
	generalPop("저장하시겠습니까?", saveForcastingData);
};
//전체체크 OR 해제
function fnCheckedAll(){
	var checkbox = document.getElementById("checkAll");
	var checkboxs = document.getElementsByName("checklist");
	
	if(checkbox.checked){
		for(var i=0 ; i<checkboxs.length ; i++){
			checkboxs[i].checked = true;
		}
	}else{
		for(var i=0 ; i<checkboxs.length ; i++){
			checkboxs[i].checked = false;
		}
	}
};
function pjcodeSave(con, addMode){
	var pcd=document.getElementsByName("in_sales_project_code"),
		chk=false;	
	pcd.trav(function(d,i){
		if(d.value==prev_pjcode.sales_project_code)chk=true;
	});
	
	if(chk){
		generalPopOk("중복된 Project Code가 있습니다.");
		return false;
	}
	
	if(addMode=="insert") {
		var addRow = 18;
		var tbody = document.getElementById("listView");
		if(rowCount == 0) {
			tbody.innerHTML ="";
			rowCount = 1;
		}
		
		var tr = document.createElement("tr");
		tr.style.textAlign = "center";
		for(var i=0 ; i<addRow ; i++){
			td = document.createElement("td");
			if(i == 0){
				var totalTr = document.getElementById("listView").childNodes.length;
				var el1 = document.createElement("input");
				el1.type = "hidden";
				el1.name = "selectedIndex";
				el1.value = parseInt(totalTr);
				td.appendChild(el1);
				
				var el2 = document.createElement("input");
				el2.type = "hidden";
				el2.name = "in_sales_id";
				td.appendChild(el2);
				
				var el3 = document.createElement("input");
				el3.type = "hidden";
				el3.name = "in_report_item";
				el3.value = "";
				el3.value = "";
				td.appendChild(el3);
				
				var el4 = document.createElement("input");
				el4.type = "hidden";
				el4.name = "in_sales_project_id";
				el4.value = "";
				td.appendChild(el4);
				
				var copy_sales_ym_el = document.createElement("input");
				copy_sales_ym_el.name = "copy_sales_ym";
				copy_sales_ym_el.type = "hidden";
				td.appendChild(copy_sales_ym_el);
				
				//
				selectedIndex = totalTr;
			}
			el = fnGetElements(i, null, false);
			td.appendChild(el);
			tr.appendChild(td);
		}
		
		tbody.appendChild(tr);
	}
	
	var project_code_tbody=document.getElementById("project_code_tbody");
	for(var k=0 ; k<project_code_tbody.childNodes.length ; k++){
		if(project_code_tbody.childNodes[k].tagName == "TR"){
			if(project_code_tbody.childNodes[k].className.indexOf("mouse_over") > -1){
				//코딩
				var in_sales_project_id_El = document.getElementsByName("in_sales_project_id");
				//Project Code
				var in_sales_project_code_El = document.getElementsByName("in_sales_project_code");
				//담당영업	 
				var in_user_name_El = document.getElementsByName("in_user_name");
				var in_user_id_El = document.getElementsByName("in_user_id");
				//신규 OR ALC
				var in_sales_divide_cd_El = document.getElementsByName("in_sales_divide_cd");
				//이슈여부
				var in_issue_yn_El = document.getElementsByName("in_issue_yn");
				//영업 Status
				var in_sales_status_cd_El = document.getElementsByName("in_sales_status_cd");
				//Type
				var in_sales_type_cd_El = document.getElementsByName("in_sales_type_cd");
				//Customer Name
				var in_compnay_name_El = document.getElementsByName("in_compnay_name");
				//Brand
				var in_brand_name_El = document.getElementsByName("in_brand_name");
				//제품
				var in_module_El = document.getElementsByName("in_module");
				//수량
				var in_qty_El = document.getElementsByName("in_qty");
				//계약금액
				var in_contract_price_El = document.getElementsByName("in_contract_price");
				//원가
				var in_cost_price_El = document.getElementsByName("in_cost_price");
				//영업이익
				var in_profit_price_El = document.getElementsByName("in_profit_price");
				//계약시점
				var in_contract_ym_El = document.getElementsByName("in_contract_ym");
				
				
				var sales_project_id	  	= document.getElementsByName("sales_project_id");
				var sales_project_year	 	= document.getElementsByName("sales_project_year");
				var sales_project_month	  	= document.getElementsByName("sales_project_month");
				var sales_project_code    	= document.getElementsByName("sales_project_code");
				var sales_type_cd    	  	= document.getElementsByName("sales_type_cd");
				var company_id 	          	= document.getElementsByName("company_id");
				var company_name          	= document.getElementsByName("company_name");
				var brand_cd	          	= document.getElementsByName("brand_cd");
				var brand_cd_name         	= document.getElementsByName("brand_cd_name");
				var module                	= document.getElementsByName("module");
				var sales_divide_cd       	= document.getElementsByName("sales_divide_cd");
				var sales_status_cd 	  	= document.getElementsByName("sales_status_cd");
				var sales_status_cd_name  	= document.getElementsByName("sales_status_cd_name");
				var closing               	= document.getElementsByName("closing");
				var user_id               	= document.getElementsByName("user_id");
				var user_name             	= document.getElementsByName("user_name");
				var contract_price 			= document.getElementsByName("contract_estimate_price");
				var cost_price            	= document.getElementsByName("cost_price");
				var profit_price         	= document.getElementsByName("profit_price");
				
				
				in_sales_project_id_El[selectedIndex].value = sales_project_id[k].value;
				in_sales_project_code_El[selectedIndex].value = sales_project_code[k].value;
				in_user_name_El[selectedIndex].value = user_name[k].value;
				in_user_id_El[selectedIndex].value = user_id[k].value;
				in_sales_divide_cd_El[selectedIndex].value = sales_divide_cd[k].value;
				in_sales_status_cd_El[selectedIndex].value = sales_status_cd[k].value;
				in_compnay_name_El[selectedIndex].value = company_name[k].value;
				in_sales_type_cd_El[selectedIndex].value = sales_type_cd[k].value;
				in_brand_name_El[selectedIndex].value = brand_cd_name[k].value;
				in_sales_type_cd_El[selectedIndex].value = sales_type_cd[k].value;
				in_module_El[selectedIndex].value = module[k].value;
				in_contract_price_El[selectedIndex].value = comma(contract_price[k].value);
				in_cost_price_El[selectedIndex].value = comma(cost_price[k].value);
				in_profit_price_El[selectedIndex].value = comma(profit_price[k].value);
				in_contract_ym_El[selectedIndex].value = sales_project_year[k].value + "." 
														+ sales_project_month[k].value;
				
				in_sales_project_code_El[selectedIndex].focus();
				cf.killTag(con);
			}	
		}
	}
};
function getStyle(){
	var listhead = document.getElementById("listhead");
	var tags = listhead.getElementsByTagName("td");
	for(var i=0 ; i<tags.length ; i++){
	}
};
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
};
//영업이익 계산
function profitCell(){
	var in_contract_price=document.getElementsByName("in_contract_price"),
		in_cost_price=document.getElementsByName("in_cost_price"),
		in_profit_price=document.getElementsByName("in_profit_price");
	
	in_profit_price.trav(function(d,i){
		var a=uncomma(in_contract_price[i].value)*1,
			b=uncomma(in_cost_price[i].value)*1;
			d.value=comma(a-b);
	});
};
//배열중복제거, 정렬 - select box option 추가 
function titleSelectBox(ele, obj){
	
	$(ele + " option").not("[value='']").remove();
	
	var newObj = obj.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]).sort();
	
	var len=newObj.length;
	
	for(var cnt=0; cnt<len; cnt++){
		$(ele).append("<option value='"+newObj[cnt]+"'>"+newObj[cnt]+"</option>");
	}
};
//select box 데이터로 그리드 조회
function showSearchRow(ele){
	var searchName;
	
	if(ele.id == "orderUserName") {	
		searchName = "in_user_name";
		$("#listView tr").each(function(){
			$(this).removeClass("hide");
			
			if(ele.value) {
				if(ele.value != $(this).find("input[name='"+searchName+"']").val()) {
					$(this).addClass("hide");
				}
			}
		});
	} else if (ele.id == "orderSalesDivide") {
		searchName = "in_sales_divide_cd";
		$("#listView tr").each(function(){
			$(this).removeClass("hide");
			
			if(ele.value) {
				if(ele.value != $(this).find("input[name='"+searchName+"']").val()) {
					$(this).addClass("hide");
				}
			}
		});
	} else if (ele.id == "orderSalesStatus") {
		searchName = "in_sales_status_cd";
		$("#listView tr").each(function(){
			$(this).removeClass("hide");
			
			if(ele.value) {
				if(ele.value != $(this).find("select[name='"+searchName+"'] option:selected").text()) {
					$(this).addClass("hide");
				}
			}
		});
	} else if (ele.id == "orderSalesType") {
		searchName = "in_sales_type_cd";
		$("#listView tr").each(function(){
			$(this).removeClass("hide");
			
			if(ele.value) {
				if(ele.value != $(this).find("select[name='"+searchName+"'] option:selected").text()) {
					$(this).addClass("hide");
				}
			}
		});
	} else if (ele.id == "orderContractYm") {
		searchName = "in_contract_ym";		
		$("#listView tr").each(function(){
			$(this).removeClass("hide");
			
			if(ele.value) {
				if(ele.value != $(this).find("input[name='"+searchName+"']").val().replace(".","")) {
					$(this).addClass("hide");
				}
			}
		});
	}
};