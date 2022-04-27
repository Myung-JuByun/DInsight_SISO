<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	#detailList td {word-wrap:break-word;}
</style>

<%@ include file="/template/sam/foreCastingStatus" %>

<script src="/js/sam/fcastingstatus/fcastingstatusfnc.js"></script>
<script src="/js/sam/fcastingstatus/fcastingstatuspages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".search_detail",
			data() {
				return {
					marginBottom : "margin-bottom:32px;",
					width100 : "width:100%;",
					checkBoxNm : "CheckMode",
					checkF : "GroupCheck",
					businessDept : "사업부",
					division : "구분",
					contractPoint : "계약시점",
					issueYn : "이슈여부",
					salesStatus : "영업 현황",
					chargeSale : "담당 영업",
					funcParam : [
						"sh_division_cd", "sh_sales_type_cd", "sh_contract_ym", "sh_issue_yn", "sh_sales_status_cd", "sh_user_id"
					]
				};
			},
			computed : {
				cMode() {
					return (num) => {
						return this.checkBoxNm + num;
					};	
				},
				checkFunc() {
					return (num) => {
						var idx = num - 1;
						return this.checkF + "('" + this.cMode(num) + "', '" + this.funcParam[idx] + "');";
					};
				}
			}
		});
		
		new Vue({
			el : ".btn_action",
			data() {
				return {
					infobotStyle : "font-size: 13px; padding-left:5px;font-weight: bold;",
					salesStatus : "영업 현황",
					downGif : "/images/btn/excel_down.gif",
					xlsDownload : "엑셀 다운로드"
				};
			},
			methods : {
				excelDataSend : function() {
					formSearch();
					
					var searchArray = new Array();
					//search
					$(".search_detail .Wrap_table").each(function(i){		
						var search = $(this);
						var searchInfo = new Object();		
						searchInfo["codeName0"] = search.find("th").first().text();
						
						var cnt=1;
						search.find("div tr").each(function(j, k){			
							var searchSub = $(this);			
							if(searchSub.find("input:checked").val()) {
								searchInfo["codeName" + cnt] = k.innerText;
								cnt++;
							}
						});
						searchArray.push(searchInfo);
					});
					
					var titleArray = new Array();
					
					//Sales Status
					var titleInfo = new Object();
					$("#mainTitle th").each(function(i) {
						titleInfo["codeName" + i] = $(this).text();
					});	
					titleArray.push(titleInfo);
					
					$("#mainList tr").each(function(i) {
						var tr = $(this);
						
						var titleInfo = new Object();
						tr.find("td").each(function(j,k) {
							titleInfo["codeName" + j] = k.innerText;
						});		
						titleArray.push(titleInfo);
					});
					
					var titleInfo = new Object();
					$("#mainSumList td").each(function(i){
						titleInfo["codeName" + i] = $(this).text();
					});
					titleArray.push(titleInfo);
					
					var issueArray = new Array();
					
					//Sales Status 현황
					var issueInfo = new Object();
					$("#detailTitle th").each(function(i){
						issueInfo["codeName" + i] = $(this).text();
					});
					issueArray.push(issueInfo);
					
					$("#detailList tr").each(function(){
						var tr = $(this);
						
						var issueInfo = new Object();	
						tr.find("td").each(function(j,k) {
							issueInfo["codeName" + j] = k.innerText;
						});		
						issueArray.push(issueInfo);
					});
					
					var issueInfo = new Object();
					$("#detailSumList td").each(function(i){
						issueInfo["codeName" + i] = $(this).text();
					});
					issueArray.push(issueInfo);
					
					//전체
					var totalInfoSearch = new Object();
					totalInfoSearch.search = searchArray;
					
					var totalInfo = new Object();
				    totalInfo.main = titleArray;
				    totalInfo.issue = issueArray;
				    
				    var tempSearch 	= JSON.stringify(totalInfoSearch);
				    var temp 		= JSON.stringify(totalInfo);
				    
				  	//데이터 검색
				  	var form = $("<form></form").attr({
				  		id:"excelForm",
				  		action:"/sam/fcastingstatus/foreCastingStatusExcelDown",
				  		method:"post"
				  	});
				  	
				  	form.append("<input type='hidden' name='dataSearch' value='"+tempSearch+"' />");
				  	form.append("<input type='hidden' name='data' value='"+temp+"' />");
				    form.appendTo("body").submit().remove();				    
				}
			}
		});
		
		new Vue({
			el : ".con_table",
			data() {
				return {
					scroll : "overflow-y:scroll;",
					businessDept : "사업부",
					chargeSales : "담당영업",
					contractPrice : "계약 금액",
					salesProfit : "영업 이익",
					salesProfitRates : "영업 이익률(%)",
					totSalesRates : "전체 매출대비(%)",
					totSalesProfitRates : "전체 영업 이익 대비(%)"					
				};
			},
			computed : {
				scrollList : function() {
					return this.scroll + "height:297px;";
				},
				scrollSumList: function() {
					return this.scroll + "height:34px;";
				}
			}
		});
		
		new Vue({
			el : "#detailBtn",
			data() {
				return {
					btnRight : "btn_action alignright",
					detailOpenGif : "/images/btn/btn_detail_open.gif"
				};
			},
			methods : {
				showDetail : function() {	
					if($("#detailShowImg").attr("alt") == "show") {
						$(".Show_detail").show();
						$("#detailShowImg").attr("alt","hide");
						$("#detailShowImg").attr("src","/images/btn/btn_detail_close.gif");
					} else {
						$(".Show_detail").hide();
						$("#detailShowImg").attr("alt","show");
						$("#detailShowImg").attr("src","/images/btn/btn_detail_open.gif");
					}
					autoHeight();
				}
			}
		});
		
		new Vue({
			el : ".Show_detail",
			data() {
				return {
					scroll : "overflow-y:scroll;",
					salesDetail : "영업 현황 상세",
					businessDept : "사업부",
					chargeSales : "담당영업",
					contractPoint : "계약시점",
					salesStatus : "영업현황",
					division : "구분",
					customerCompany : "고객사명",
					product : "제품",
					count : "수량",
					contractPrice : "계약금액",
					salesProfit : "영업이익"					
				};
			},
			computed : {
				scrollList : function() {
					return this.scroll + "height:297px;";
				},
				scrollSumList: function() {
					return this.scroll + "height:34px;";
				}
			}
		});				
		
		mkSearchDiv();
		defaultLoadList();	
		autoHeight();
	});
</script>