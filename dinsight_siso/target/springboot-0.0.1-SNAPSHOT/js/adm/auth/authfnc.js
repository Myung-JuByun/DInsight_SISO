//권한설정 저장
function authSave(obj){
	
	var temp=$("#userListView").find("input:checkbox[name='in_user_id']").serialize();
	
	if(temp.length==0){
		generalPop("권한설정할 이름을 체크해주세요.");
	}else{
		
		temp += "&grant_id=" + obj.code_id;
		
		generalPop(obj.code_name + " 권한으로 저장 하시겠습니까?", function(){
			
			$.ajax({
				  url: "/adm/auth/authViewSave",
				  type: "POST",
				  data: temp,
				  success: function (data) {
					  viewAuth();
				  }
			});
		});
	}
}

//권한설정 보기
function viewAuth(mode){
	
	//권한버튼 색깔 초기화
	if(PREV_BUTTON != null) PREV_BUTTON.className="ct-btn darkgrey normal";
	
	//
	var temp=$("#userListView").find("input:checkbox[name='in_user_id']").serializeArray();
	
	if(temp.length==0){
		if(!mode) generalPop("이름을 체크해주세요.");
	}else{
		
		$.ajax({
			  url: "/adm/auth/authViewList",
			  type: "POST",
			  data: temp,
			  dataType: "json",
			  success: function (data) {
				  authViewTable(data.authViewList);
			  }
		});
	}
}

//권한설정 삭제
function delAuth(){
	
	//권한버튼 색깔 초기화
	if(PREV_BUTTON != null) PREV_BUTTON.className="ct-btn darkgrey normal";
	
	//
	var temp=$("#authList").find("input:checkbox[name='in_grant_user_id']").serializeArray();
	
	if(temp.length==0){
		generalPop("삭제할 권한을 체크해주세요.");
	}else{
		
		generalPop("삭제하시겠습니까?", function(){
		
			$.ajax({
				  url: "/adm/auth/authViewDel",
				  type: "POST",
				  data: temp,
				  success: function (data) {
					  viewAuth();
				  }
			});
		});
	}
}

//메뉴권한 설정 보기
function viewSaveMenuAtuhList(obj){
	
	$.ajax({
		  url: "/adm/auth/menuAuthSaveListAjax",
		  type: "POST",
		  data: {grant_id : obj.code_id},
		  dataType: "json",
		  success: function (data) {
			  viewMenuAuth(data.menuAuthSaveList);
		  }
	});
}

//메뉴권한 설정 저장
function saveMenuAuth(obj){
	
	var temp=$("#checkbox_menu_tree").find("input:checkbox[name='in_menu_id']").serialize();
	
	if(!obj){
		generalPop("저장할 권한을 선택해주세요.");
	}else{
		
		if(temp.length==0){
			generalPop("메뉴를 체크해주세요.");
		}else{
			
			temp += "&grant_id=" + obj.code_id;
		
			generalPop(obj.code_name + " 권한으로 저장 하시겠습니까?", function(){
				
				$.ajax({
					  url: "/adm/auth/authMenuSave",
					  type: "POST",
					  data: temp,
					  success: function (data) {
						  if(data == "success") {
							  generalPop("저장하였습니다.");
							  viewSaveMenuAtuhList(obj);
						  }
					  }
				});
			});
		}
	}
}

//메뉴권한 설정 삭제
function delMenuAuth(obj){
	
	//
	var temp=$("#viewSaveMenuAtuhList").find("input:checkbox[name='in_menu_id']").serializeArray();
	
	if(temp.length==0){
		generalPop("삭제할 메뉴를 체크해주세요.");
	}else{
		
		generalPop("삭제하시겠습니까?", function(){
		
			$.ajax({
				  url: "/adm/auth/authMenuDel",
				  type: "POST",
				  data: temp,
				  success: function (data) {
					  viewSaveMenuAtuhList(obj);
				  }
			});
		});
	}
}

//권한추가
function authAddSave(con){
	
	if($("#grant_name").val()==""){
		generalPop("권한을 입력하세요.");
		$("#grant_name").focus();
		return;
	}
	
	if($("#grant_explain").val()==""){
		generalPop("설명을 입력하세요.");
		$("#grant_explain").focus();
		return;
	}
	
	generalPop("저장하시겠습니까?", function(){
		
		var temp = $("#con_auth_table").find("input, select").serializeArray();
		
		$.ajax({
			  url: "/adm/auth/authSave",
			  type: "POST",
			  data: temp,
			  success: function () {
				  defaultLoadList();
				  authList(GRANT);
				  cf.killTag(con.parentNode);
			  }
		});
	});
}

//권한삭제
function authDelSave(obj){
	
	if(!obj){
		generalPop("삭제할 권한을 선택해주세요.");
	}else{
	
		if(obj.code_id<=7){
			generalPop("시스템 운영에 기본이 되는 권한은 삭제할수 없습니다.");
		}else{
			var children = $("#viewSaveMenuAtuhList").children().length;
			
			if(children > 0) {
				generalPop("선택한 권한에 메뉴가 설정되어있습니다.<br>메뉴 삭제 후 이용해주세요.");
			}else {
				
				generalPop("삭제하시겠습니까?", function(){
					
					$.ajax({
						  url: "/adm/auth/authDel",
						  type: "POST",
						  data: {grant_id : obj.code_id},
						  success: function () {
							  defaultLoadList();
							  authList(GRANT);
						  }
					});
				});
			}
		}
	}
	
}
