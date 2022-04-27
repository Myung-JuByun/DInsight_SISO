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
	
	<%@ include file="/template/exp/expanseAdmin" %>
	
	<!-- 인쇄 start-->
	<%-- <jsp:include page="expansePrint.jsp" flush="true" /> --%>
	<!--  //인쇄 end -->
	
	<!--// 마일리지 팝업 start-->
	<%@ include file="/template/exp/expanseMileage" %>				
	<!--// 마일리지 팝업 end-->
</form:form>

<script src="/js/exp/admin/expansePage.js"></script>
<script type="text/javascript">
	function openPrint() {		
		var con = $("<div></div>");
		con.css({width:"820px", height:(cf.workareaheight - 60) + "px", position:"absoulte", "background-color":"white"});		
		
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
			if($(this).find(".in_expanse_type_temp").val() != "")
				$(this).find(".in_expanse_type").val($(this).find(".in_expanse_type_temp").val());			
			
			if($(this).find(".in_category_id_temp").val() != "")
				$(this).find(".in_category_id").val($(this).find(".in_category_id_temp").val());			
		});
		
		//복사용 값 초기 세팅(마일리지)
		//$(".copyRowLayer .input_date").val($("#sh_expanse_year").val() + $("#sh_expanse_month").val() + "01");
		$(".copyRowLayer .input_date").val($("#sh_expanse_month").val() + "-01");
		
		//selectbox 값 선택(마일리지)
		$(".listRowLayer").each(function() {
			if($(this).find(".in_oil_cd_temp").val() != "")
				$(this).find(".in_oil_cd").val($(this).find(".in_oil_cd_temp").val());			
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
			el : ".con_table",
			data : {
				date : "날짜",
				divisionAll : "구분 전체",
				classification : "분류",
				price : "금액",
				history : "내역",
				approvalNo : "품의서 No.",
				status : "상태",
				tot : "합계"
			},
			methods : {
				showExpanseType : function() {
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
			}
		});
		
		new Vue({
			el : "#mileage_pop",
			data : {
				mileageInput : "마일리지 입력",
				date : "날짜",
				price : "금액",
				movePurpose : "이동목적",
				departure : "출발지",
				layover : "경유지",
				destination : "도착지",
				oilKind : "유종",
				distance : "거리",
				expanses : "경비",
				tot : "합계",
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
				],
				btnList : [
					{func:"expanseAddDelCopy('mileage', 'ADD'); return false;", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가", imgClass:"img_plus"},
					{func:"expanseAddDelCopy('mileage', 'DEL'); return false;", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제", imgClass:"img_del"},
					{func:"expanseAddDelCopy('mileage', 'COPY'); return false;", btnImg:"/images/btn/btn_copy_on.gif", altText:"복사", imgClass:"img_copy"},
					{func:"expanseAdminMileageInsert(); return false;", btnImg:"/images/btn/btn_save_on.gif", altText:"저장", imgClass:"img_save"},					
				]
			},
			methods : {
				showExpanseType : function() {
					var now_expanse_type;
					var sh_expanse_type = $("#sh_expanse_type").val();
					
					if(sh_expanse_type) {
						$(".listRow").each(function(){
							now_expanse_type = $(this).find(".in_expanse_type").val();
							if(typeof now_expanse_type != "undefined") {
								$(this).removeClass("hide");
								
								if(sh_expanse_type != now_expanse_type)
									$(this).addClass("hide");								
							}
						});
					} else {
						$(".listRow").each(function(){
							now_expanse_type = $(this).find(".in_expanse_type").val();
							if(typeof now_expanse_type != "undefined")
								$(this).removeClass("hide");									
						});
					}
				}
			}	
		});					
		
		mkSearchDiv();
		defaultLoadList();
	});		
</script>