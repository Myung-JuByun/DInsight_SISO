<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/template/foreCasting" %>

<script>
	new Vue({
		el : ".btn_action",
		data : {
			message : "* 표시는 필수 입력 항목입니다.",
			btnList : [
				{id:"btnCopy", btnImg:"/images/btn/btn_copy_on.gif", altText:"복사", imgClass:"img_copy"},
				{id:"btnAdd", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가", imgClass:"img_plus"},
				{id:"btnDel", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제", imgClass:"img_del"},
				{id:"btnSave", btnImg:"/images/btn/btn_save_on.gif", altText:"저장", imgClass:"img_save"},					
			]
		}	
	});
	
	new Vue({
		el : "#Normal_table",
		data() {
			return {
				defaultComboStyle : "height:28px; background:#fafafa; font-weight:bold; border:0;"	
			};			
		},
		computed : {
			padding20LargeCombo : function(){
				return this.defaultComboStyle + "width:100%; padding-left:20px";
			},
			padding5LargeCombo : function(){
				return this.defaultComboStyle + "width:100%; padding-left:5px";
			},
			smallComboStyle : function(){
				return this.defaultComboStyle + "width:70%; padding-left:5px";
			}
		},
		methods : {
			//select box 데이터로 그리드 조회
			showSearchRow : function(ele){
				var searchName = "";
				
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
			}
		}
	});
</script>
<script src="/js/sam/fcasting/fcastingfnc.js"></script>
<script src="/js/sam/fcasting/fcastingpages.js"></script>
