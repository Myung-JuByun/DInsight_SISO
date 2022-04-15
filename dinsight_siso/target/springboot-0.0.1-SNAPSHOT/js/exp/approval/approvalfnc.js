var srch_obj,STATUS;
//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList(){
	//데이터 검색 , callApprovalData에 필요한 parameter를 obj 객체를 이용하여 넘김.
	var obj = {year :CurrentDate[0],month :CurrentDate[1],status :"1701"};		
	callApprovalData(obj, function (data){
		STATUS=data.statusList;
		if(data.userList.length>0)approvalList(document.body,data.userList);
		else noDataList();
	});
};
function crTag(str,el){
	var a=document.createElement(str);
	el.appendChild(a);
	return a;
};
//년 검색
function approvalSearch() {
	//$("#searchForm").submit();
	var obj = {year : $("#sh_expanse_year").val(),month :$("#sh_expanse_month").val(),status : $("#sh_status_cd").val()};
	srch_obj=obj;
	callApprovalData(obj, function (data){
		STATUS=data.statusList;
		if(data.userList.length>0)approvalList(document.body,data.userList);
		else noDataList();
	});
};	
//데이터를 불러 오기위한 재귀함수.
function traverse(target, fnc){
	fnc(target);
	for( var i = 0, lng=target.childNodes.length; i < lng; i++){
 		traverse(target.childNodes[i],fnc);
 	}		
};	
//승인
function approval_permit(obj, con){
	generalPop("승인처리 하시겠습니까?", function (){
		//var obj=this.param;
		$.ajax({
			url: "/exp/approval/approvalPermit",
			type: "POST",
			data:{"node_id":obj.node_id, "source_object_id":obj.source_object_id, "approval_id":obj.approval_id, "final_expanse_appoint":obj.final_expanse_appoint, "creator":obj.creator,
					"approval_year":obj.approval_year, "approval_month":obj.approval_month},
			success : function (data) {
				if(data != "success")
					generalPop(data);
				cf.killTag(con.parentNode);
				approvalSearch();
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	});		
};	
//반려
function approval_return(obj, con){
	generalPop("반려처리 하시겠습니까?", function (){
		//var obj=this.param;
		$.ajax({
			url: "/exp/approval/approvalCancel",
			type: "POST",
			data:{"node_id":obj.node_id, "source_object_id":obj.source_object_id, "approval_id":obj.approval_id, "creator":obj.creator, "approval_year":obj.approval_year, "approval_month":obj.approval_month},
			success : function (data) {
				if(data != "success")
					generalPop(data);
				cf.killTag(con.parentNode);
				approvalSearch();
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	});
};	