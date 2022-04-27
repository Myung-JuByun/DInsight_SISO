$(document).ready(function(){
	new Vue({
		el : ".con_table",
		data : {
			customerCompany : "고객사",
			pf : "Portfolio",
			prdNo : "Prd.Number",
			itemNm : "Item Name",
			breakYn : "파훼여부",
			orderPeriod : "발주기간",
			installCompany : "설치사",
			installPeriod : "설치기간",
			unifiedYn : "통일여부"
		},
		computed : {
			pfItemNm : function(){
				return this.pf + "<br />" + this.itemNm;
			},
			comUnifiedYn : function(){
				return this.installCompany + "<br />" + this.unifiedYn;
			}
		}
	});
	
	defaultLoadList();
});