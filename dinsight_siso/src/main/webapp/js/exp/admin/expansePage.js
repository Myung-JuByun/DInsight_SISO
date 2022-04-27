function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_year";
	select.name = "sh_expanse_year";
	span.innerHTML = "년";
	select.onchange=function(){
		expanseAdminSearch();
	};
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"195px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_month";
	select.name = "sh_expanse_month";
	mkMonthSelect(select,CurrentDate[1],true);
	select.onchange=function(){
		expanseAdminSearch();
	};	
	span.innerHTML = "월";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(bx1,{float:"left"});
}

function expanseAddDelCopy(type, mode){
	//경비입력
	if(type == "expanse") {
		if(mode == "ADD")
			tableAddRow('copyRow', 'listRow', 'listIndex', 'expanse_id', 'input_date', 'N');
		else if(mode == "DEL")
			generalPop("삭제하시겠습니까?", function(){
				tableDelRow('expanse_id', 'listRow', 'listIndex', 'in_payment', 'sum_price');
			});
		else if(mode == "COPY")
			tableCopyRow('listRow .expanse_id', 'listRow', 'listIndex', 'input_date', 'in_payment', 'sum_price', ['in_expanse_id', 'expanse_id', 'statusView']);											
	//마일리지
	} else {
		if(mode == "ADD")
			tableAddRow('copyRowLayer', 'listRowLayer', 'mileageListIndex', 'mileage_id', 'input_date', 'N');
		else if(mode == "DEL")
			generalPop("삭제하시겠습니까?", function(){
				tableDelRow('mileage_id', 'listRowLayer', 'mileageListIndex', ['in_distance','in_cost'], ['sum_mileageDistance','sum_mileagePrice']);
			});
		else if(mode == "COPY")
			tableCopyRow('listRowLayer .mileage_id', 'listRowLayer', 'mileageListIndex', 'input_date', ['in_distance','in_cost'], ['sum_mileageDistance','sum_mileagePrice'], ['in_mileage_id', 'mileage_id']);								
	}
	
	chk_submit();
}

function expanseAdminInsert() {	
	if($("#sh_expanse_type").val() != "") {
		generalPop("구분 검색을 '구분 전체'로 변경해주세요.");
		return false;
	}		
	
	var insertYN = "N";
	
	$(".listRow .listIndex").each(function() {			
		if($(this).text() != "")	insertYN = "Y";							
	});		
	//저장할 데이터가 없더라도 현재월 데이터가 존재하면 저장을 할수 있게 한다
	if($("#expanseCount").val() > 0) insertYN = "Y";
	
	if(insertYN == "N") {							
		generalPop("경비를 입력해주세요.");
		return false;			
	} else {			
		//품의서 번호 체크
		var obj = priceOverCheck("listRow .in_payment");
		
		if(obj.permitYn == "Y") {
			generalPopOk("품의서 번호를 입력하세요.", function (){
				obj.permitEle.focus();
			});	
			return false;
		}			
		//경비체크
		var checkClassNameArr = {
			"in_pay_day" : "날짜를 입력해주세요.", 
			"in_expanse_type" : "구분을 선택해주세요.", 
			"in_category_id" : "분류를 선택해주세요.", 
			"in_payment" : "금액을 입력해주세요.",
			"in_expanse_name" : "내역을 입력해주세요."
		};
		
		DynamicRowCheckInsert("listRow", checkClassNameArr, "저장", "/exp/admin/expanseAdminInsert", "/exp/admin/expanseAdmin.do .listRow", "refresh");
		
		//전체선택 체크박스 초기화
		$(".CheckMode").prop("checked", false);
		chk_submit();
	}
}

//유종에 따른 거리의 합계금액 계산(마일리지)
function sumMileageRow(_this, _event) {
	
	//이벤트에 따라 가져오는 값이 틀리므로 분기 처리
	if(_event.type == "change") {
		
		var oilCd = $("option:selected", _this).attr("alt");
		var distance = $(_this).parent().parent().parent().find(".in_distance").val();
		
		oilCd = typeof oilCd !== 'undefined' ? parseInt(oilCd * 1) : 0;
		distance = typeof distance !== 'undefined' ? parseInt(distance * 1) : 0;
		
		//유종*거리
		resultSum = oilCd * distance;
		
		$(_this).parent().parent().parent().find(".in_cost").val(resultSum);			
	} else {			
		var oilCd = $(_this).parent().parent().find(".in_oil_cd option:selected").attr("alt");
		var distance = $(_this).val();
		
		oilCd = typeof oilCd !== 'undefined' ? parseInt(oilCd * 1) : 0;
		distance = typeof distance !== 'undefined' ? parseInt(distance * 1) : 0;
		
		//유종*거리
		resultSum = oilCd * distance;
		
		$(_this).parent().parent().find(".in_cost").val(resultSum);
	}
	
	//합계 계산
	sumPrice(['sum_mileageDistance','sum_mileagePrice'], ['in_distance', 'in_cost']);
}

//검색(경비, 마일리지)
function expanseAdminSearch(){		
	$("#searchForm").submit();
}		

//분류 디폴트 세팅(부서장 : 접대, 부서장외 : 식대)
function defaultCategorySelectbox() {
	var selectText = "";
	var headYn = $("#headYn").val();
	
	if(headYn == 1) selectText = "접대";
	else			selectText = "식대비";
	
	$(".copyRow .in_category_id option").each(function(){
		if(this.text == selectText) {
			this.selected = true;
		}			
	});
}

//품의서 번호 체크(분류가 식대비, 접대일경우 부서장:300000, 부서장외 : 100000 이상 입력 못하게 막음)
function priceOverCheck(priceClassName) {
	if("${menuInfo.loginVO}" != null && "${menuInfo.loginVO}" != ''){
		userInfo = "${menuInfo.loginVO.user_id}";
	}else{
		userInfo = "${loginVO.user_id}";
	}
	var selectText = "접대", selectText1 = "식대비";
	var maxPrice = "", inputPrice = "";
	var nowRowCategory = "", nowRowConferNumber = "";
	var headYn = $("#headYn").val();
	var permitYn = "N", permitCnt = "", permitEle = "";
	if(headYn == 1) maxPrice = 300000;			
	else			maxPrice = 100000;
	var cnt = 0;
	$("." + priceClassName).each(function() {
		
		inputPrice = $(this).val().replace(/,/gi, '');
		nowRowCategory = $(this).parent().parent().find(".in_category_id option:selected").text();
		nowRowConferNumber = $(this).parent().parent().find(".in_confer_number").val();
		
		inputPrice=inputPrice*1;
		
		if((nowRowCategory.trim() == selectText || nowRowCategory.trim() == selectText1) && nowRowConferNumber == '') {
			if(inputPrice >= maxPrice) {
				if(!(userInfo == 135 || userInfo == 698)){
					permitYn = "Y";
					permitCnt = cnt;
					permitEle = $(".listRow .in_confer_number").eq(cnt);
					return false;						
				}
			}
		}
		
		cnt++;
	});
	var obj = {permitYn : permitYn,	permitCnt : permitCnt,permitEle : permitEle};		
	return obj;
}

//경비제출(경비, 마일리지)
function expanseAdminFinalInsert() {
	if($("#sh_expanse_type").val() != "") {
		generalPop("구분 검색을 '구분 전체'로 변경해주세요.");
		return false;
	}
	
	var insertYN = "Y";
	var cnt = 0;
	//경비
	$(".listRow .statusView").each(function() {			
		//상태값이 없는 데이터가 있으면 제출이 안됨
		if($(this).text() == "")insertYN = "N";
			
		cnt++;
	});		
	//마일리지
	$(".listRowLayer .in_mileage_id").each(function() {			
		//상태값이 없는 데이터가 있으면 제출이 안됨
		if($(this).val() == "")insertYN = "N";
		cnt++;
	});
	
	if(cnt == 0 || insertYN == "N") {			
		generalPop("경비/마일리지 저장 후 경비제출을 하실 수 있습니다.");			
		return false;			
	}else {			
		//결제선 입력유무
		$.ajax({
			url: "/exp/admin/expansePaymentCount",
			type: "POST",
			async: false,
			data: {source_type_cd : "01"},
			success : function (data) {
				if(data != "fail") {
					$("#paymentCount").val(data);
				}
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});			
		if($("#paymentCount").val() == 0 || $("#paymentCount").val() == '') {
			
			generalPop("결재선 지정후 경비제출을 하실 수 있습니다.<br/>결제선 지정을 하시겠습니까?", function(){
				//결제선지정 팝업 호출
				paymentPop();
			});
			//document.location.href = "/exp/payment/paymentAdmin";
			return false;
			
		} else {
			
			//품의서 번호 체크
			var obj = priceOverCheck("listRow .in_payment");
			
			if(obj.permitYn == "Y") {
				generalPopOk("품의서 번호를 입력하세요.", function (){
					obj.permitEle.focus();
				});	
				return false;
			}				
			//경비제출
			generalPop("경비제출을 하시겠습니까?",function(){
				var temp = $("input, select").serializeArray();					
				//데이터 검색
				$.ajax({
					url: "/exp/admin/expanseAdminFinalInsert",
					type: "POST",
					data: temp,
					success : function (data) {
						$("#searchForm").submit();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
				
			});
		}
	}
}

//저장(마일리지)
function expanseAdminMileageInsert() {
	var insertYN = "N";
	$(".listRowLayer .mileageListIndex").each(function() {
		
		if($(this).text() != "") {
			insertYN = "Y";
		}
	});		
	//저장할 데이터가 없더라도 현재월 데이터가 존재하면 저장을 할수 있게 한다
	if($("#mileageCount").val() > 0) insertYN = "Y";
	
	if(insertYN == "N") {			
		generalPop("마일리지를 입력해주세요.");
		return false;			
	} else {		
		var checkClassNameArr = { 
				"in_drive_day" : "날짜를 입력해주세요.", 
				"in_purpose" : "이동목적을 입력하세요.", 
				"in_start_point" : "출발지를 입력하세요.", 
				"in_end_point" : "도착지를 입력하세요.", 
				"in_oil_cd" : "유종을 선택하세요.", 
				"in_distance" : "거리를 입력하세요."
		};			
		//form 체크후 저장하기
		DynamicRowCheckInsert("listRowLayer", checkClassNameArr, "저장", "/exp/admin/expanseAdminMileageInsert", "/exp/admin/expanseAdmin.do .listRowLayer", "refreshLayer");
		
		//전체선택 체크박스 초기화
		$(".CheckMileageMode").prop("checked", false);
	}
}

//엑셀 업로드후 결과 리턴 함수
function defaultUpLoadResult(data) {		
	var json = JSON.parse(data);		
	var expanse_month = $("#sh_expanse_month").val();		
	var view_date;		
	for (var cnt=0 ; cnt<json.length; cnt++) {			
		if(json[cnt].pay_day) {
			//엑셀 월 데이터와 검색 월 데이터가 일치하지 않으면 검색 월로 치환
			if(expanse_month != json[cnt].pay_day.substring(0,2)) {
				view_date = expanse_month + json[cnt].pay_day.substring(2,5);
			} else {
				view_date = json[cnt].pay_day;
			}
			//row 추가(항상 마지막에 추가)
			tableAddRow('copyRow', 'listRow', 'listIndex', '', 'input_date', 'N');
			
			//추가한 rowd의 값 지정
			$(".listRow").last().find(".in_expanse_type_temp").val(json[cnt].expanse_type);
			$(".listRow").last().find(".in_category_id_temp").val(json[cnt].category_id);
			$(".listRow").last().find(".in_pay_day").val(view_date);
			$(".listRow").last().find(".in_expanse_type").val(json[cnt].expanse_type);
			$(".listRow").last().find(".in_category_id").val(json[cnt].category_id);
			$(".listRow").last().find(".in_payment").val(json[cnt].payment);
			$(".listRow").last().find(".in_expanse_name").val(json[cnt].expanse_name);
			$(".listRow").last().find(".in_confer_number").val(json[cnt].confer_number);
		} else {
			//엑셀 월 데이터와 검색 월 데이터가 일치하지 않으면 검색 월로 치환
			if(expanse_month != json[cnt].drive_day.substring(0,2)) {
				view_date = expanse_month + json[cnt].drive_day.substring(2,5);
			} else {
				view_date = json[cnt].drive_day;
			}
			
			//row 추가(항상 마지막에 추가)
			tableAddRow('copyRowLayer', 'listRowLayer', 'mileageListIndex', '', 'input_date', 'N');
			
			//추가한 rowd의 값 지정
			$(".listRowLayer").last().find(".in_oil_cd_temp").val(json[cnt].oil_cd);
			$(".listRowLayer").last().find(".in_drive_day").val(view_date);
			$(".listRowLayer").last().find(".in_purpose").val(json[cnt].purpose);
			$(".listRowLayer").last().find(".in_start_point").val(json[cnt].start_point);
			$(".listRowLayer").last().find(".in_via_point").val(json[cnt].via_point);
			$(".listRowLayer").last().find(".in_end_point").val(json[cnt].end_point);
			$(".listRowLayer").last().find(".in_oil_cd").val(json[cnt].oil_cd);
			$(".listRowLayer").last().find(".in_distance").val(json[cnt].distance);
			$(".listRowLayer").last().find(".in_cost").val(json[cnt].cost);
		}
	}
	//합계 출력 (경비, 마일리지 포함)- sumPrice(함계출력 아이디명, 합계 계산할 클래스명)
	sumPrice(['sum_price', 'sum_mileageDistance','sum_mileagePrice'], ['in_payment', 'in_distance', 'in_cost']);
}

function excel_down(){
	var down=document.getElementById("excel_down");
	down.style.display="";
}

function chk_submit(){
	var img_btn=document.getElementById("btn_submit"),
		chk=document.getElementsByName("chk_submit");
	if(chk.length>0){
		chk.trav(function(d,i){
			if(d.value=="702"||d.value=="703"){
				img_btn.src="/images/btn/btn_submit_done.gif";
			}else{
				img_btn.src="/images/btn/btn_submit.gif";
				img_btn.onclick=function(){
					expanseAdminFinalInsert();
				};
			}
		});
		//expanseAdminFinalInsert()
	}else{
		img_btn.onclick=function(){
			generalPop("경비/마일리지 저장 후 경비제출을 하실 수 있습니다.");
		};
	}
}