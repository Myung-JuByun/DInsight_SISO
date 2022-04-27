var setDate = function(){
	var year=document.getElementById("sh_expanse_year");
	if(srch_obj){
		mkYearSelect(year,srch_obj.year);
	}else{
		mkYearSelect(year);
	}
};

var mkSearchDiv = function(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_year";
	select.name = "sh_expanse_year";
	span.innerHTML = "년도";
	select.onchange=function(){
		individualSearch();
	};
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:195+"px"});
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
};

//ajax 처리후 결과 처리
var defaultAutoCompleteResult = function(json) {
	var cnt, mainCnt, expanse_month;
	var arr_total = new Array();
	var	arr_payment = new Array();
	var	arr_status = new Array();
	var arr_status_cd = new Array();
	var pre_expanse_month = "";
	
	for (cnt=0 ; cnt<json.length; cnt++) {
		expanse_month = json[cnt].expanse_month;
		expanse_type  = json[cnt].expanse_type;
		payment  	  = json[cnt].payment;
		if(expanse_month != pre_expanse_month) {
			//이차원배열 선언
			arr_payment[expanse_month]  = new Array();
		}
		//결과값 배열에 담는다(개인법인, 개인신용, 개인현금, 공통법인, 마일리지)
		arr_payment[expanse_month][expanse_type]=json[cnt].payment;
		//결과값 배열에 담는다(진행상황)
		arr_status[expanse_month]=json[cnt].status_cd_name;
		arr_status_cd[expanse_month]=json[cnt].status_cd;
		//결과값 배열에 담는다(합계)
		if(typeof arr_payment[expanse_month][expanse_type] != "undefined") {
			
			if(typeof arr_total[expanse_type]  == "undefined") {
				arr_total[expanse_type] = 0;
			}
			arr_total[expanse_type] 				+= parseInt(payment);
		}
		pre_expanse_month = expanse_month;
	}
	//리스트 출력
	var HTML = "";
	var payment_302 = "", payment_301 = "", payment_303 = "", payment_304 = "", payment_mileage = "";
	var sum1Q_302 = 0, sum1Q_301 = 0, sum1Q_303 = 0, sum1Q_304 = 0, sum1Q_mileage = 0;
	var sum2Q_302 = 0, sum2Q_301 = 0, sum2Q_303 = 0, sum2Q_304 = 0, sum2Q_mileage = 0;
	var sum3Q_302 = 0, sum3Q_301 = 0, sum3Q_303 = 0, sum3Q_304 = 0, sum3Q_mileage = 0;
	var sum4Q_302 = 0, sum4Q_301 = 0, sum4Q_303 = 0, sum4Q_304 = 0, sum4Q_mileage = 0;
	var sum1H_302 = 0, sum1H_301 = 0, sum1H_303 = 0, sum1H_304 = 0, sum1H_mileage = 0;
	var sum2H_302 = 0, sum2H_301 = 0, sum2H_303 = 0, sum2H_304 = 0, sum2H_mileage = 0;
	var rowSum = 0, rowSumQ = 0, rowSumH = 0, totalRowSum = 0;
	for (mainCnt = 1; mainCnt <= 12; mainCnt++) {
		if (mainCnt.toString().length == 1) 	mainCntView = "0" + mainCnt;
		else									mainCntView = mainCnt;

		if(typeof arr_payment[mainCntView] !== "undefined") {			
			payment_302 	= convertNull(arr_payment[mainCntView]['302'], '0');
			payment_301 	= convertNull(arr_payment[mainCntView]['301'], '0');
			payment_303 	= convertNull(arr_payment[mainCntView]['303'], '0');
			payment_304 	= convertNull(arr_payment[mainCntView]['304'], '0');
			payment_mileage = convertNull(arr_payment[mainCntView]['mileage'], '0');			
		} else {
			payment_302 	= 0;
			payment_301 	= 0;
			payment_303 	= 0;
			payment_304 	= 0;
			payment_mileage = 0;				
		}
		
		if(typeof payment_302 === "undefined")		payment_302 = 0;			
		if(typeof payment_301 === "undefined")		payment_301 = 0;			
		if(typeof payment_303 === "undefined")		payment_303 = 0;			
		if(typeof payment_304 === "undefined")		payment_304 = 0;
		if(typeof payment_mileage === "undefined")	payment_mileage = 0;
			
		//4분기 합계
		if(mainCnt >= 1 && mainCnt <=3) {
			sum1Q_302 		+= parseInt(payment_302);
			sum1Q_301 		+= parseInt(payment_301);
			sum1Q_303 		+= parseInt(payment_303);
			sum1Q_304 		+= parseInt(payment_304);
			sum1Q_mileage 	+= parseInt(payment_mileage);
		} else if (mainCnt >= 4 && mainCnt <=6) {
			sum2Q_302 		+= parseInt(payment_302);
			sum2Q_301 		+= parseInt(payment_301);
			sum2Q_303 		+= parseInt(payment_303);
			sum2Q_304 		+= parseInt(payment_304);
			sum2Q_mileage 	+= parseInt(payment_mileage);
		} else if (mainCnt >= 7 && mainCnt <=9) {
			sum3Q_302 		+= parseInt(payment_302);
			sum3Q_301 		+= parseInt(payment_301);
			sum3Q_303 		+= parseInt(payment_303);
			sum3Q_304 		+= parseInt(payment_304);
			sum3Q_mileage 	+= parseInt(payment_mileage);
		} else if (mainCnt >= 10 && mainCnt <=12) {			
			sum4Q_302 		+= parseInt(payment_302);
			sum4Q_301 		+= parseInt(payment_301);
			sum4Q_303 		+= parseInt(payment_303);
			sum4Q_304 		+= parseInt(payment_304);
			sum4Q_mileage 	+= parseInt(payment_mileage);				
		}
		//2분기 합계
		if(mainCnt >= 1 && mainCnt <=6) {
			sum1H_302 		+= parseInt(payment_302);
			sum1H_301 		+= parseInt(payment_301);
			sum1H_303 		+= parseInt(payment_303);
			sum1H_304 		+= parseInt(payment_304);
			sum1H_mileage 	+= parseInt(payment_mileage);
		} else if (mainCnt >= 7 && mainCnt <=12) {
			sum2H_302 		+= parseInt(payment_302);
			sum2H_301 		+= parseInt(payment_301);
			sum2H_303 		+= parseInt(payment_303);
			sum2H_304 		+= parseInt(payment_304);
			sum2H_mileage 	+= parseInt(payment_mileage);
		}
		//row 합계
		rowSum = parseInt(payment_302) + parseInt(payment_301) + parseInt(payment_303) + parseInt(payment_304) + parseInt(payment_mileage);
		HTML += "<tr>";
		HTML += "	<td class='txt_center'>" + mainCnt + "월</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(payment_302) + "</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(payment_301) + "</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(payment_303) + "</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(payment_304) + "</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(payment_mileage) + "</td>";
		HTML += "	<td class='txt_right paddingRight'>" + set_comma(rowSum) + "</td>";
		
		if(arr_status_cd[mainCntView]=="701"){
			HTML += "<td class='txt_center right'><img src='/images/exp_payment/btn_red.png' style='vertical-align:middle'/> " + convertNull(arr_status[mainCntView]) + "</td>";
		}else if(arr_status_cd[mainCntView]=="702"){
			HTML += "<td class='txt_center right'><img src='/images/exp_payment/btn_blue.png' style='vertical-align:middle''/> " + convertNull(arr_status[mainCntView]) + "</td>";
		}else if(arr_status_cd[mainCntView]=="703"){
			HTML += "<td class='txt_center right'><img src='/images/exp_payment/btn_green.png' style='vertical-align:middle'/> " + convertNull(arr_status[mainCntView]) + "</td>";
		}else if(arr_status_cd[mainCntView]=="706"){
			HTML += "<td class='txt_center right'><img src='/images/exp_payment/btn_yellow.gif' style='vertical-align:middle'/> " + convertNull(arr_status[mainCntView]) + "</td>";
		}else {
			HTML += "<td class='txt_center right'>" + convertNull(arr_status[mainCntView]) + "</td>";
		}	
		HTML += "</tr>";
		
		//4분기 합계 HTML
		var QView;
		var QSum_302, QSum_301, QSum_303, QSum_304, QSum_mileage;
		if(mainCnt == 3 || mainCnt == 6 || mainCnt == 9 || mainCnt == 12) {
			var QView = (mainCnt / 3)+"Q";
			if(mainCnt == 3) {
				QSum_302 		= sum1Q_302;
				QSum_301 		= sum1Q_301;
				QSum_303 		= sum1Q_303;
				QSum_304 		= sum1Q_304;
				QSum_mileage 	= sum1Q_mileage;
			} else if(mainCnt == 6) {
				QSum_302 		= sum2Q_302;
				QSum_301 		= sum2Q_301;
				QSum_303 		= sum2Q_303;
				QSum_304 		= sum2Q_304;
				QSum_mileage 	= sum2Q_mileage;
			} else if(mainCnt == 9) {
				QSum_302 		= sum3Q_302;
				QSum_301 		= sum3Q_301;
				QSum_303 		= sum3Q_303;
				QSum_304 		= sum3Q_304;
				QSum_mileage 	= sum3Q_mileage;
			} else {
				QSum_302 		= sum4Q_302;
				QSum_301 		= sum4Q_301;
				QSum_303 		= sum4Q_303;
				QSum_304 		= sum4Q_304;
				QSum_mileage 	= sum4Q_mileage;
			}
			//row 합계
			rowSumQ = parseInt(QSum_302) + parseInt(QSum_301) + parseInt(QSum_303) + parseInt(QSum_304) + parseInt(QSum_mileage);
			HTML += "<tr>";
			HTML += "	<td class='txt_center qColor'>" + QView + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(QSum_302) + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(QSum_301) + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(QSum_303) + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(QSum_304) + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(QSum_mileage) + "</td>";
			HTML += "	<td class='txt_right paddingRight qColor'>" + set_comma(rowSumQ) + "</td>";
			HTML += "	<td class='txt_center right qColor'></td>";
			HTML += "</tr>";
		}
		
		//2분기 합계 HTML
		var HView;
		var HSum_302, HSum_301, HSum_303, HSum_304, HSum_mileage;
		if(mainCnt == 6 || mainCnt == 12) {
			if(mainCnt == 6) {
				HView ="1" + "st".sup() + " H";
				HSum_302 		= sum1H_302;
				HSum_301 		= sum1H_301;
				HSum_303 		= sum1H_303;
				HSum_304 		= sum1H_304;
				HSum_mileage 	= sum1H_mileage;
			} else {
				HView ="2" + "nd".sup() + " H";
				HSum_302 		= sum2H_302;
				HSum_301 		= sum2H_301;
				HSum_303 		= sum2H_303;
				HSum_304 		= sum2H_304;
				HSum_mileage 	= sum2H_mileage;
			}
			//row 합계
			rowSumH = parseInt(HSum_302) + parseInt(HSum_301) + parseInt(HSum_303) + parseInt(HSum_304) + parseInt(HSum_mileage);
			HTML += "<tr>";
			HTML += "	<td class='txt_center hColor'>" + HView + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(HSum_302) + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(HSum_301) + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(HSum_303) + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(HSum_304) + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(HSum_mileage) + "</td>";
			HTML += "	<td class='txt_right paddingRight hColor'>" + set_comma(rowSumH) + "</td>";
			HTML += "	<td class='txt_center right hColor'></td>";
			HTML += "</tr>";
		}
	};		
	$("#listView").html(HTML);		
	//합계 출력
	var HTML_SUM = "";		
	//row 합계
	totalRowSum = parseInt(convertNull(arr_total['302'], '0')) + parseInt(convertNull(arr_total['301'], '0')) + parseInt(convertNull(arr_total['303'], '0')) + parseInt(convertNull(arr_total['mileage'], '0'));
	HTML_SUM += "<tr>";
	HTML_SUM += "	<td class='sum'> 합계</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(convertNull(arr_total['302'], '0')) + "</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(convertNull(arr_total['301'], '0')) + "</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(convertNull(arr_total['303'], '0')) + "</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(convertNull(arr_total['304'], '0')) + "</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(convertNull(arr_total['mileage'], '0')) + "</td>";
	HTML_SUM += "	<td class='sum_cost  paddingRight'>" + set_comma(totalRowSum) + "</td>";
	HTML_SUM += "	<td class='sum_cost txt_center'></td>";
	HTML_SUM += "</tr>";
	$("#sumView").html(HTML_SUM);
};