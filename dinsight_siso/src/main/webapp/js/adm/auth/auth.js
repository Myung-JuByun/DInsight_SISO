$(document).ready(function() {
	new Vue({
		el : "#authListView",
		data : {
			organizationMap : "조직도",
			tblDivStyle : "margin-top:0px; height:500px;",
			tblStyle : "overflow-y:scroll; height:467px;",
			department : "부서",
			sMarginStyle : "width:10px;float:left",
			name : "이름",
			position : "직위",
			redBtn : "ct-btn red normal",			 
			setAuth : "설정권한",
			auth: "권한",
			del : "삭제"
		},
		computed : {
			departmentNm : function(){
				return this.department + "명";
			},
			watchAuth : function(){
				return this.setAuth + "보기";
			}
		}
	});
	
	defaultLoadList();
});