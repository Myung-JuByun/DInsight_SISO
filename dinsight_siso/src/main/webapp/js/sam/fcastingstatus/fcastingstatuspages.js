var mkSearchDiv = function(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_year";
	select.name = "sh_sales_year";
	span.innerHTML = "년";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"280px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_month";
	select.name = "sh_sales_month";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_week";
	select.name = "sh_sales_week";
	span.innerHTML = "주차";
	cf.setCss(select,{width:"50px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});

	var bx2 = cf.mkTag("div", line1);
	bx2.id = "weekDate";

	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick=function(){
		formSearch();
	};
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left",paddingTop:"5px",paddingLeft:"12px"});
};

//리스트 출력
var forCastingStatusList = function(){
	//계약시점 월
	var monthArray = new Array();	
	var addText = "";
	for(var cnt=0; cnt<12; cnt++) {
		 var monthInfo = new Object();
		 if(cnt < 9) 	addText = "0";
		 else			addText = "";
		 monthInfo.code_id = addText + (cnt + 1);
		 monthInfo.code_name = (cnt + 1) + "월";
         
         monthArray.push(monthInfo);
	}	
	//이슈여부
	var issueArray = new Array();	
	var issueInfo = new Object();
	issueInfo.code_id = "0";
	issueInfo.code_name = "O";
	
	issueArray.push(issueInfo);
	
	var issueInfo = new Object();            
	issueInfo.code_id = "1";
	issueInfo.code_name = "X";
	
	issueArray.push(issueInfo);
	
	//계약시점 월, 이슈여부 json 으로 합치기
    var totalInfo = new Object();
     
    totalInfo.month = monthArray;
    totalInfo.issue = issueArray;
     
    var jsonInfo = eval(totalInfo);
    
    var temp = $("input, select").serialize();	
	//데이터 검색
	$.ajax({
		url: "/sam/fcastingstatus/foreCastingStatusList",
		type: "POST",
		data: temp,
		dataType: "json",
		success : function (data) {			
			//사업부(검색)
			searchCodeHTML("#searchDivision", "sh_division_cd", data.division);
			//계약시점(검색)
			searchCodeHTML("#searchContractYm", "sh_contract_ym", jsonInfo.month);
			//영업Status(검색)
			searchCodeHTML("#searchSalesStatus", "sh_sales_status_cd", data.salesStatusList);
			//담당영업(검색)
			searchCodeHTML("#searchDivisionUser", "sh_user_id", data.divisionUsers);
			//구분(검색)
			searchCodeHTML("#searchSalesType", "sh_sales_type_cd", data.salesTypeList);
			//이슈(검색)
			searchCodeHTML("#searchIssueYn", "sh_issue_yn", jsonInfo.issue);
			//리스트
			dataShowList(data.fStatusList);
			//리스트 상세보기
			dataShowDetailList(data.fStatusDetailList);
			
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};

//검색 조건 생성
var searchCodeHTML = function(appendId, eleName, data) {
	var jsonLength = data.length;
	var HTML = "";
	HTML += "<table cellpadding='0' cellspacing='0' width='100%' bgcolor='white' class='Normal_table'>";
	for(var cnt =0; cnt<jsonLength; cnt++) {
		HTML += "<tr>";
		HTML += "	<td class='right'>" + data[cnt].code_name + "</td>";
		HTML += "	<td width='25px' class='right'>";
		HTML += "		<input type='checkbox' name='" + eleName + "' class='" + eleName + "' value='" + data[cnt].code_id + "'></input>";
		HTML += "	</td>";
		HTML += "</tr>";
	}
	HTML += "</table>";
	$(appendId).append(HTML);
};

//리스트 데이터 가공
var dataShowList = function(data) {
	//초기화
	$("#mainList").empty();	
	$("#mainSumList").empty();
	//데이터 생성
	var jsonLength = data.length;
	var division_name = "", user_name= "", operation_cd = "";
	var contract_price = 0, profit_price = 0;
	var sum_contract_price = 0, sum_profit_price = 0;
	var	arr_contract_price = new Array();
	var	arr_profit_price = new Array();
	
	for(var cnt=0; cnt<jsonLength; cnt++) {		
		division_name	= data[cnt].division_name.trim();
		user_name		= data[cnt].user_name.trim();
		operation_cd 	= data[cnt].operation_cd;
		contract_price 	= parseInt(data[cnt].contract_price);
		profit_price   	= parseInt(data[cnt].profit_price);
		
		//사업부별 소계
		if(user_name == "소계") {			
			arr_contract_price[operation_cd]	=	contract_price;
			arr_profit_price[operation_cd]		=	profit_price;			
		}
		
		//합계
		if(division_name == "합계") {
			sum_contract_price					=	contract_price;
			sum_profit_price					=	profit_price;
		}
	}
	
	var HTML = "", SumHTML = "";
	var profit_pt = 0, all_contract_pt = 0, all_profit_pt = 0;	
	//var pre_operation_cd = "";
	var pointColor = "";
	
	HTML += "<table cellpadding='0' cellspacing='0' width='100%' class='Normal_table'>";
	
	if(jsonLength > 0) {
		for(var cnt=0; cnt<jsonLength; cnt++) {			
			division_name	= data[cnt].division_name.trim();
			user_name		= data[cnt].user_name.trim();
			operation_cd 	= data[cnt].operation_cd;
			contract_price 	= parseInt(data[cnt].contract_price);
			profit_price   	= parseInt(data[cnt].profit_price);
			
			if(user_name == '소계' || user_name == '합계') {				
				pointColor = "class='hColor'";				
				profit_pt   	= ((profit_price/contract_price) * 100).toFixed(2);
				all_contract_pt	= ((contract_price/sum_contract_price) * 100).toFixed(2);
				all_profit_pt	= ((profit_price/sum_profit_price) * 100).toFixed(2);				
			} else {				
				pointColor = "";				
				profit_pt   	= ((profit_price/contract_price) * 100).toFixed(2);
				all_contract_pt	= ((contract_price/arr_contract_price[operation_cd]) * 100).toFixed(2);
				all_profit_pt	= ((profit_price/arr_profit_price[operation_cd]) * 100).toFixed(2);
			}
			
			sum_profit_pt		+= parseFloat(profit_pt);
			sum_all_contract_pt	+= parseFloat(all_contract_pt);
			sum_all_profit_pt	+= parseFloat(all_profit_pt);
			
			if(division_name == '합계') {			
				SumHTML += "<table cellpadding='0' cellspacing='0' class='Normal_table' width='100%'>";
				SumHTML += "<tr>";
				SumHTML += "	<td width='13%' class='sum'>&nbsp;</td>";
				SumHTML += "	<td width='12%' class='sum'>합계</td>";
				SumHTML += "	<td width='20%' class='sum_cost pdr10'>" + set_comma(contract_price) + "</td>";
				SumHTML += "	<td width='15%' class='sum_cost pdr10' align='right'>" + set_comma(profit_price) + "</td>";
				SumHTML += "	<td width='12%' class='sum'>" + profit_pt + "%</td>";
				SumHTML += "	<td width='12%' class='sum'>&nbsp;</td>";
				SumHTML += "	<td width='16%' class='sum'>&nbsp;</td>";
				SumHTML += "</tr>";
				SumHTML += "</table>";				
			} else {				
				HTML += "<tr " + pointColor + ">";
				HTML += "	<td width='13%' align='center'>" + data[cnt].division_name + "</td>";
				HTML += "	<td width='12%' align='center'>" + data[cnt].user_name + "</td>";
				HTML += "	<td width='20%' align='right' class='pdr10'>" + set_comma(contract_price) + "</td>";
				HTML += "	<td width='15%' align='right' class='pdr10'>" + set_comma(profit_price) + "</td>";
				HTML += "	<td width='12%' align='center'>" + profit_pt + "%</td>";
				HTML += "	<td width='12%' align='center'>" + all_contract_pt + "%</td>";
				HTML += "	<td width='16%' class='right' align='center'>" + all_profit_pt + "%</td>";
				HTML += "</tr>";
			}
		}		
	} else {		
		HTML += "<tr>";
		HTML += "	<td colspan='7' align='center' class='right' style='border-top:none;'>조회된 데이터가 없습니다.</td>";
		HTML += "</tr>";
	}
	
	HTML += "</table>";
	
	$("#mainList").append(HTML);	
	$("#mainSumList").append(SumHTML);
};

//리스트 상세 데이터 가공
var dataShowDetailList = function(data) {	
	//초기화
	$("#detailList").empty();	
	$("#detailSumList").empty();
	
	//데이터 생성
	var jsonLength = data.length;	
	var HTML = "", SumHTML = "";
	
	HTML += "<table cellpadding='0' cellspacing='0' width='100%' class='Normal_table' style='table-layout:fixed'>";
	
	if(jsonLength > 0) {	
		for(var cnt=0; cnt<jsonLength; cnt++) {
			if(data[cnt].user_name.trim() == '소계') {	
				pointColor = "class='hColor'";
			} else {
				if(data[cnt].user_name.trim().search("요약") >= 0) {
					pointColor = "class='qColor'";
				} else {
					pointColor = "";	
				}
			}			
			if(data[cnt].division_name.trim() == '합계') {				
				SumHTML += "<table cellpadding='0' cellspacing='0' class='Normal_table' width='100%' style='table-layout:fixed'>";
				SumHTML += "<tr>";
				SumHTML += "	<td width='10%' class='sum'>&nbsp;</td>";
				SumHTML += "	<td width='10%' class='sum'>" + convertNull(data[cnt].division_name, '') + "</td>";
				SumHTML += "	<td width='8%' class='sum'>&nbsp;</td>";
				SumHTML += "	<td width='5%' class='sum'>" + convertNull(data[cnt].sales_divide_cd, '') + "</td>";
				SumHTML += "	<td width='12%' class='sum'>" + convertNull(data[cnt].sales_status_cd_name, '') + "</td>";					   
				SumHTML += "	<td width='5%' class='sum'>" + convertNull(data[cnt].sales_type_cd_name, '') + "</td>";
				SumHTML += "	<td width='8%' class='sum'>" + convertNull(data[cnt].company_name, '') + "</td>";
				SumHTML += "	<td width='7%' class='sum'>" + convertNull(data[cnt].brand_cd_name, '') + "</td>";
				SumHTML += "	<td width='10%' class='sum'>" + convertNull(data[cnt].module, '') + "</td>";
				SumHTML += "	<td width='5%' class='sum'>" + convertNull(data[cnt].qty, '') + "</td>";
				SumHTML += "	<td width='10%' class='sum_cost pdr10'>" + convertNull(set_comma(data[cnt].contract_price), '') + "</td>";
				SumHTML += "	<td width='10%' class='sum_cost pdr10'>" + convertNull(set_comma(data[cnt].profit_price), '') + "</td>";
				SumHTML += "</tr>";
				SumHTML += "</table>";				
			} else {			
				HTML += "<tr " + pointColor + ">";
				HTML += "	<td width='10%' align='center'>" + convertNull(data[cnt].division_name, '') + "</td>";
				HTML += "	<td width='10%' align='center'>" + convertNull(data[cnt].user_name, '') + "</td>";
				HTML += "	<td width='8%' align='center'>" + convertNull(data[cnt].contract_name, '') + "</td>";
				HTML += "	<td width='5%' align='center'>" + convertNull(data[cnt].sales_divide_cd, '') + "</td>";
				HTML += "	<td width='12%' align='center'>" + convertNull(data[cnt].sales_status_cd_name, '') + "</td>";					   
				HTML += "	<td width='5%' align='center'>" + convertNull(data[cnt].sales_type_cd_name, '') + "</td>";
				HTML += "	<td width='8%' align='center'>" + convertNull(data[cnt].company_name, '') + "</td>";
				HTML += "	<td width='7%' align='center'>" + convertNull(data[cnt].brand_cd_name, '') + "</td>";
				HTML += "	<td width='10%' align='center'>" + convertNull(data[cnt].module, '') + "</td>";
				HTML += "	<td width='5%' align='center'>" + convertNull(data[cnt].qty, '') + "</td>";
				HTML += "	<td width='10%' align='right' class='pdr10'>" + convertNull(set_comma(data[cnt].contract_price), '') + "</td>";
				HTML += "	<td width='10%' align='right' class='right pdr10'>" + convertNull(set_comma(data[cnt].profit_price), '') + "</td>";
				HTML += "</tr>";
			}
		}
		
	} else {		
		HTML += "<tr>";
		HTML += "	<td colspan='12' align='center' class='right' style='border-top:none;'>조회된 데이터가 없습니다.</td>";
		HTML += "</tr>";
	}
		
	HTML += "</table>";
	
	$("#detailList").append(HTML);
	$("#detailSumList").append(SumHTML);
};