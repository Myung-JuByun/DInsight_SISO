<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<style type="text/css">
	.div_overflow_main {width:100%; height:361px; overflow-x:hidden; overflow-y:scroll;}
	.div_overflow_mileage {width:100%; height:465px; overflow-x:hidden; overflow-y:auto;}
	.div_overflow_y_scroll {overflow-y:scroll;}
	.paddingright {padding-right:10px}
</style>

<noscript class="noScriptTitle">자바스크립트를 지원하지 않는 브라우저에서는 일부 기능을 사용하실 수 없습니다.</noscript>
<form:form commandName="searchVO" method="post" id="searchForm" name="searchForm">
	<input type="hidden" id="monthStatus" name="monthStatus" value="${params.approval_status}" />
	<input type="hidden" id="expanseCount" name="expanseCount" value="${params.expanse_count}" />
	<input type="hidden" id="mileageCount" name="mileageCount" value="${params.mileage_count}" />
	<input type="hidden" id="paymentCount" name="paymentCount" value="${params.payment_count}" />
	<input type="hidden" id="headYn" name="headYn" value="${params.head_yn}">
	<div class="search4" id="searchDiv"></div>
	<!--// search end -->
	
	<%@ include file="/template/expanseAdmin" %>
	
	<!-- 인쇄 start-->
	<%-- <jsp:include page="expansePrint.jsp" flush="true" /> --%>
	<!--  //인쇄 end -->
	
	<!--// 마일리지 팝업 start-->
	<jsp:include page="expanseMileage.jsp" flush="true" />				
	<!--// 마일리지 팝업 end-->
</form:form>

<script type="text/javascript">
	$(document).ready(function() {
		new Vue({
			el : "#expanseAdmBtn",
			data : {
				btnList : [
					{id:"btn_add", func:"expanseAddDelCopy('expanse', 'ADD');", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가", imgClass:"img_plus"},
					{id:"btn_del", func:"expanseAddDelCopy('expanse', 'DEL');", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제", imgClass:"img_del"},
					{id:"btn_copy", func:"expanseAddDelCopy('expanse', 'COPY');", btnImg:"/images/btn/btn_copy_on.gif", altText:"복사", imgClass:"img_copy"},
					{id:"btn_save", func:"expanseAdminInsert(); return false;", btnImg:"/images/btn/btn_save_on.gif", altText:"저장", imgClass:"img_save"},
					{id:"btn_print", func:"openPrint()", btnImg:"/images/btn/btn_print_on.gif", altText:"인쇄", imgClass:"img_print"},
					{id:"btn_mil_popup", func:"layerPopup('layer', 'mileage_pop', 'layerClose'); return false", btnImg:"/images/btn/btn_mil_on.gif", altText:"마일리지", imgClass:"img_mil"},
					{id:"img_exlup", func:"", btnImg:"/images/btn/btn_exlup_on.gif", altText:"엑셀 업로드", imgClass:"img_exlup"},
					{id:"btn_submit", func:"", btnImg:"/images/btn/btn_submit.gif", altText:"제출", imgClass:"img_submit cursor"}
				]
			}	
		});
		
		new Vue({
			el : "#expanseMilBtn",
			data : {
				btnList : [
					{func:"expanseAddDelCopy('mileage', 'ADD'); return false;", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가", imgClass:"img_plus"},
					{func:"expanseAddDelCopy('mileage', 'DEL'); return false;", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제", imgClass:"img_del"},
					{func:"expanseAddDelCopy('mileage', 'COPY'); return false;", btnImg:"/images/btn/btn_copy_on.gif", altText:"복사", imgClass:"img_copy"},
					{func:"expanseAdminMileageInsert(); return false;", btnImg:"/images/btn/btn_save_on.gif", altText:"저장", imgClass:"img_save"},					
				]
			}	
		});
		
		new Vue({
			el : "#rowLayerHidden",
			data : {
				hiddenCell : [
					{tdClass:"txt_center2", component:"<input type=\"checkbox\" name=\"mileage_id\" class=\"mileage_id\" />"},
					{	
						tdClass:"txt_center mileageListIndex", 
						component:"<input type=\"hidden\" name=\"in_mileage_id\" id=\"in_mileage_id\" />\n" + 
						"<input type=\"hidden\" name=\"in_oli_cd_temp\" id=\"in_oil_mileage_id\" />"
					},
					{tdClass:"txt_center", component:"<input name=\"in_drive_day\" class=\"in_drive_day input_date\" readonly/>"},
					{tdClass:"txt_center", component:"<input name=\"in_purpose\" class=\"in_pourpose\" title=\"이동목적\"/>"},
					{tdClass:"txt_center", component:"<input name=\"in_start_point\" class=\"in_start_point\" title=\"출발지점\" />"},
					{tdClass:"txt_center", component:"<input name=\"in_via_point\" class=\"in_via_point\" title=\"경유지\" />"},
					{tdClass:"txt_center", component:"<input name=\"in_end_point\" class=\"in_end_point\" title=\"도착지점\" />"},
					{
						tdClass:"txt_center", 
						component:"<div class=\"styled-select\" style=\"width:100%;\">\n" +
						"	<select name=\"in_oil_cd\" class=\"in_oil_cd\" title=\"유종\" style=\"width:150%;\"></select>\n" + 
						"</div>"
					},
					{tdClass:"txt_center", component:"<input name=\"distance\" class=\"in_distance price\" title=\"거리\" />"},
					{tdClass:"txt_center right", component:"<input name=\"in_cost\" class=\"in_cost price\" title=\"경비\" readonly/>"}					
				]
			}
		});
		
		mkSearchDiv();
		defaultLoadList();
	});	
	
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
	
	//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
	function defaultLoadList(){
		//년월생성
		createYearMonthDay("Y", "2013", "#sh_expanse_year");
		createYearMonthDay("M", "", "#sh_expanse_month");
		
		//경비제출이 끝나면 버튼 기능 비활성화 시킴
		buttonImgModeCheck('btn_action img', '_on', '_off', ['img_print', 'img_mil', 'img_close'], '경비제출 후에는 사용하실 수 없습니다.', 'monthStatus');
		
		//경비제출이 끝나면 화면 수정 안되게 추가
		if($("#monthStatus").val() == "Y") {
			
			$("input, select").attr("readonly", true);
			$(".listRow .in_pay_day").removeClass("input_date").css("text-align","center");
			$(".listRowLayer .in_drive_day").removeClass("input_date").css("text-align","center");
			
			$(".listRow select").attr("disabled", true);
			$(".listRow select").css("color", "black");
			
			$(".listRowLayer select").attr("disabled", true);
			$(".listRowLayer select").css("color", "black");
		}
		
		//달력조회(경비, 마일리지 포함) - datePicker(ClassName, DateFormat)
		datePicker("input_date", "mm-dd");
		
		//금액 콤마찍기(경비, 마일리지 포함 - inputbox) - priceComma(priceClassName)
		priceComma("price");

		//selectbox 초기화(경비, 마일리지 포함)
		$(".in_category_id, .in_oil_cd").empty();
		
		//분류 콤보박스 생성  - createSelectBox(url, objClassName, groupLevel, groupId, groupName, firstValue)
		//createSelectBox("/cmmn/selectCmnCodeCombo", "in_expanse_type", 1, 102, $(".in_expanse_type").attr("title"), "");
		createSelectBox("/cmmn/selectCmnExpCategoryCombo", "in_category_id", 0, 0, $(".in_category_id").attr("title"), "선택");
		createSelectBox("/cmmn/selectCmnCodeCombo", "in_oil_cd", 1, 105, $(".in_oil_cd").attr("title"), "선택");
		
		//합계 출력 (경비, 마일리지 포함)- sumPrice(함계출력 아이디명, 합계 계산할 클래스명)
		sumPrice(['sum_price', 'sum_mileageDistance','sum_mileagePrice'], ['in_payment', 'in_distance', 'in_cost']);
		
		//금액란에 금액변경시 합계출력(경비, 마일리지 포함)
		$(".in_payment").on("keyup", function(){
			sumPrice('sum_price', 'in_payment');
		});
		
		//년월 데이터 선택하기(검색)
		$("#sh_expanse_year").val('<c:out value="${params.sh_expanse_year}" />');
		$("#sh_expanse_month").val('<c:out value="${params.sh_expanse_month}" />');
		
		//경비 및 마일리지 데이터 수량 체크(저장시 기존데이터가 존재하다가 모두삭제하게 되면 저장이 안되는 버그가 있어서 추가함)
		$("#expanseCount").val($(".listRow .listIndex").last().text());
		$("#mileageCount").val($(".listRowLayer .mileageListIndex").last().text());
		
		//복사용 값 초기 세팅(경비)
		//$(".copyRow .input_date").val($("#sh_expanse_year").val() + $("#sh_expanse_month").val() + "01");
		//$(".copyRow .in_expanse_type option:eq(1)").attr("selected", "selected");
		$(".copyRow .input_date").val($("#sh_expanse_month").val() + "-01");
		defaultCategorySelectbox(); //분류 디폴트 세팅(부서장 : 접대, 부서장외 : 식대)
		
		//selectbox 값 선택(경비)
		$(".listRow").each(function() {
			if($(this).find(".in_expanse_type_temp").val() != "") {
				$(this).find(".in_expanse_type").val($(this).find(".in_expanse_type_temp").val());
			}
			
			if($(this).find(".in_category_id_temp").val() != "") {
				$(this).find(".in_category_id").val($(this).find(".in_category_id_temp").val());
			}
		});
		
		//복사용 값 초기 세팅(마일리지)
		//$(".copyRowLayer .input_date").val($("#sh_expanse_year").val() + $("#sh_expanse_month").val() + "01");
		$(".copyRowLayer .input_date").val($("#sh_expanse_month").val() + "-01");
		
		//selectbox 값 선택(마일리지)
		$(".listRowLayer").each(function() {
			if($(this).find(".in_oil_cd_temp").val() != "") {
				$(this).find(".in_oil_cd").val($(this).find(".in_oil_cd_temp").val());
			}
		});
		
		//유종과거리의 합계금액 계산(마일리지)
		$(".in_oil_cd").on("change", function(event) {
			sumMileageRow(this, event);
		});
		
		$(".in_distance").on("keyup", function(event) {
			sumMileageRow(this, event);
		});
		
		//경비제출후에는 사용을 막는다(엑셀업로드)
		if($("#monthStatus").val() != "Y") {

			var button = $('#img_exlup');
			
			new AjaxUpload(button, {
				action: '/exp/admin/expanseAdminExcelUpload', 
				name: 'fileNm',
				onSubmit : function(file, ext){
	
		            if (!(/xlsx|xls/i).test(ext)) {
		            	generalPop('엑셀파일만 가능합니다');
		            	return false;
		            }
		            
		            $('.wrap-loading').removeClass('hide');
				},
				onComplete: function(file, response){
					
					$('.wrap-loading').addClass('hide');
					
					//결과리턴
		        	defaultUpLoadResult(response);
				}
			});		
		}
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
	
	function openPrint() {		
		var con = document.createElement("div");
		Object.assign(con.style, {
			width:"820px", height:(cf.workareaheight - 60) + "px", position:"absoulte", backgroundColor:"white"}
		); 
		
		//검색년월의 마지막날
		var today = new Date();
		var lastday = today.getFullYear()+"년 "+(today.getMonth() + 1)+"월 "+ today.getDate()+"일";						
		var obj = {
			year : $("#sh_expanse_year").val(),
			month : $("#sh_expanse_month").val(),
			day : lastday,
			creator : "<c:out value="${params.creator}" />",
			username : "<c:out value="${params.user_name}" />",
			divisionname : "<c:out value="${params.division_cd_name}" />",
			objectid : $(".in_expanse_monthly_id:first").val()
		};						
		
		mkPrint(con, false, obj);
		callPop(con);
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
	
	//구분 검색
	function showExpanseType() {
		var now_expanse_type;
		var sh_expanse_type = $("#sh_expanse_type").val();
		if(sh_expanse_type) {
			$(".listRow").each(function(){
				now_expanse_type = $(this).find(".in_expanse_type").val();
				if(typeof now_expanse_type != "undefined") {
					$(this).removeClass("hide");
					if(sh_expanse_type != now_expanse_type) {
						$(this).addClass("hide");
					}
				}
			});
		} else {
			$(".listRow").each(function(){
				now_expanse_type = $(this).find(".in_expanse_type").val();
				if(typeof now_expanse_type != "undefined") {
					$(this).removeClass("hide");
				}		
			});
		}
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
</script>