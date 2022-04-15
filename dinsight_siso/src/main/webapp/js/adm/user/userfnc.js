var DIVISIONS,MEMBERS,DIVISION_ROOT,CURRENT_DIVISION,CURRENT_DIVISION_MEMBERS=new Array(),ROLELIST,EMPLOYTYPELIST,JOBTITLELIST,btnConfirm=false,
	leaves=[],tree_menu,box,dirSrch,btnDirSrch,checks,prev,prev_mem;

getEls();
defaultLoadList();

function getEls(){
	box=document.getElementById("userListView");
	cf.traverse(document.body,function(el){
		if(el.className=="tree_menu") tree_menu=el;			
	});
};
function defaultLoadList(){
	callUserDivisionData(function (data){
		DIVISIONS=data.divisionList;
		MEMBERS=data.userList;
		ALLDIVISION=data.allDivisionList;
		ROLELIST=data.roleList;
		EMPLOYTYPELIST=data.employTypeList;
		JOBTITLELIST=data.jobTitleList;
	});
	var allchk=document.getElementById("allchk");
	if(prev&&allchk&&allchk.checked==true)allchk.checked=false;
	dataProc();
	mkDivision();
};
function dataProc(){
	var dt=DIVISIONS;
	var obj={};
	dt.trav(function(d,i){
		var str=d.division_cd;
		obj[str]=d;
		d.childNodes=[];
	});
	dt.trav(function(d,i){
		var str=d.parent_cd;
		if(str)	obj[str].childNodes.push(d);
		else DIVISION_ROOT=d;
	});
};
function divisionDel(){
	var cnt=0;		
	CURRENT_DIVISION_MEMBERS.trav(function(d,i){
		//if(d.delete_yn=="0")cnt++;
		cnt++;
	});		
	if(!prev){
		generalPopOk2("삭제할 부서를 선택하세요.");
	}else if(CURRENT_DIVISION.childNodes.length>0){
		generalPopOk2("하위 부서가 있습니다.");
	}else if(CURRENT_DIVISION_MEMBERS&&cnt>0){
		generalPopOk2("부서원이 있습니다.");
	}else{
		generalPop("삭제하시겠습니까?", function(){
			//var a=CURRENT_DIVISION.division_id;				
			$.ajax({
				url: "/adm/user/divisionDelete",
				type: "POST",
				data:{"division_id":CURRENT_DIVISION.division_id},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
					window.location.reload();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};
function userHead(){
	var ar=CURRENT_DIVISION_MEMBERS,
		head=[],
		cnt=0;
	
	if(CURRENT_DIVISION) {
		checks.trav(function(d,i){
			if(d.checked){
				head.push(ar[i]);
				cnt++;
			}
		});
	}
	
	if(cnt==0){
		generalPop("사원을 선택하세요.");
	}else{
		generalPop("활성유무 상태를 변경 하시겠습니까?", function(){
			$.ajax({
				url: "/adm/user/userHeadUpdate",
				type: "POST",
				data:{"data":JSON.stringify(head)},
				async: false,
				dataType: 'json',
				success : function (data) {
					if(data != "success")
						generalPop(data);
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
			defaultLoadList();
			prev.onclick();
		});
	}
};
function userPass(){
	var ar=CURRENT_DIVISION_MEMBERS,
		pass=[],
		cnt=0;
	
	if(CURRENT_DIVISION) {
		checks.trav(function(d,i){
			if(d.checked){
				pass.push(ar[i]);
				cnt++;
			}
		});
	}		
	if(cnt==0){
		generalPop("사원을 선택하세요.");
	}else if(cnt>1){
		generalPop("한 명만 선택하세요.");
	}else {
		generalPop("비밀번호를 초기화 하시겠습니까?", function(){
			$.ajax({
				url: "/adm/user/userPassUpdate",
				type: "POST",
				data:{"data":JSON.stringify(pass)},
				async: false,
				success : function (data) {
					$('.wrap-loading').hide(20);
					
					if(data != "success")generalPop("관리자에게 문의하세요.");
					else{
						generalPop("비밀번호가 초기화되었습니다.");
					}
				},beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};	
//사원 추가 수정 삭제
function userAdd(){		
	if(!CURRENT_DIVISION){
		generalPop("부서 선택 후 추가하세요.");
	}else{
		var con=document.createElement("div");
		con.style.width=880+"px";
		con.style.height=464+"px";
		con.style.position="absolute";
		//con.style.backgroundColor="white";
		
		mkUserinfo(con);
		callPop(con);
	}
};	
function userModi(){
	var cnt=0,
		obj;
	
	if(CURRENT_DIVISION) {
		checks.trav(function(d,i){
			if(d.checked){
				cnt++;
				obj=CURRENT_DIVISION_MEMBERS[i];
			}
		});
	}
	
	if(cnt==0){
		generalPop("수정할 사원을 선택하세요.");
	}else if(cnt>=2){
		generalPop("한 명만 선택하세요.");
	}else{
		//수정가능
		var con=document.createElement("div");
		con.style.width=880+"px";
		con.style.height=464+"px";
		con.style.position="absolute";
		con.style.backgroundColor="white";
	
		$.ajax({
			  url: "/adm/user/userInfo",
			  type: "POST",
			  data: {"user_id":obj.owner_id},
			  async: false,
			  dataType: 'json',
			  success: function (data) {
				  btnConfirm=true;
				  mkUserinfo(con, data.userList);
				  $('.wrap-loading').hide(20);
			  },
			  beforeSend:function(){
			  	$('.wrap-loading').show();
			  }
		});
		//mkUserinfo(con, obj);
		callPop(con);
	}
};
function userDel(){
	var cnt=0,
		del=[];
	
	if(CURRENT_DIVISION) {
		checks.trav(function(d,i){
			if(d.checked){
				cnt++;
				del.push(CURRENT_DIVISION_MEMBERS[i]);
			}
		});
	}
	
	if(cnt==0){
		generalPop("사원을 선택하세요.");
	}else{
		generalPop("삭제유무 상태를 변경 하시겠습니까?", function(){
			$.ajax({
				url: "/adm/user/userDelete",
				type: "POST",
				data: {"data":JSON.stringify(del)},
				async: false,
				success: function (data) {
					if(data != "success") generalPop(data);
					else generalPop("변경되었습니다.");
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
			defaultLoadList();
			prev.onclick();
		});
	}
};
function mksave(son, obj){		
	var con10=cf.mkTag("div",son),
		btn1=cf.mkTag("button",con10),
		btn2=cf.mkTag("button",con10);
	con10.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn2.className="ct-btn grey large";
	btn1.innerHTML="저장";
	btn2.innerHTML="취소";
	cf.setCss(btn1,{marginRight:5+"px"});
	
	btn1.onclick=function(){
		var new_login_id=document.getElementById("new_login_id"),
			new_user_name=document.getElementById("user_name"),
			set_division=document.getElementById("set_division");
		if(!obj&&!new_login_id.value)generalPop("아이디를 입력하세요.");
		else if(!obj&&!btnConfirm)generalPop("중복체크 후 저장가능합니다.");
		else if(!new_user_name.value)generalPop("이름을 입력하세요.");
		else{
			generalPop("저장하시겠습니까?",function(){
				var user_id,user_name,login_id,login_Passwd,last_division_cd,job_title_cd,
					name_english,registration_number,email,mobile,address,birthday,employ_type_cd,
					solar_yn,activate_yn,role_cd,head_yn,sales_yn,delete_yn;
			
				if(obj){
					user_id=obj.user_id;
					login_id=obj.login_id;
					login_Passwd=obj.login_Passwd;
					last_division_cd=document.getElementById("set_division").value;
					head_yn=obj.head_yn;
					sales_yn=obj.sales_yn;
					delete_yn=obj.delete_yn;
					activate_yn=obj.activate_yn;
				}else{
					user_id="";
					login_id=new_login_id.value;
					login_Passwd=new_login_id.value;
					last_division_cd=set_division.value;
					head_yn="0";
					sales_yn="0";
					delete_yn="0";
					activate_yn="0";
				}
				
				user_name = new_user_name.value;
				name_english = document.getElementById("name_english").value;
				email = document.getElementById("email").value;
				mobile = document.getElementById("mobile1").value + document.getElementById("mobile2").value
							+ document.getElementById("mobile3").value;
				mobile = mobile.trim();
				address = document.getElementById("address").value;
				registration_number_first = document.getElementById("registration_number_first").value;
				registration_number_last = document.getElementById("registration_number_last").value;
				registration_number	= registration_number_first + "" + registration_number_last;
				registration_number = registration_number.trim();
				birthday = document.getElementById("birthday").value;
				solar_yn_ary = document.getElementsByName("solar_yn");
				solar_yn = "1";
				for(var i=0 ; i<solar_yn_ary.length ; i++){
					if(solar_yn_ary[i].checked) solar_yn = solar_yn_ary[i].value; 
				}
				role_cd=document.getElementById("set_role").value;
				job_title_cd=document.getElementById("set_job").value;
				employ_type_cd=document.getElementById("set_emp").value;
				
	
				$.ajax({
					url: "/adm/user/userInsert",
					type: "POST",
					data: {user_id : user_id,login_id : login_id,login_Passwd : login_Passwd,last_division_cd : last_division_cd,job_title_cd : job_title_cd,
							employ_type_cd : employ_type_cd,activate_yn : activate_yn,role_cd : role_cd,head_yn	 : head_yn,	sales_yn : sales_yn,delete_yn : delete_yn,
							user_name: user_name,name_english: name_english,email: email,mobile: mobile,
							address: address,registration_number: registration_number,birthday: birthday,solar_yn: solar_yn},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("저장되었습니다.");
						document.getElementById("my_closs").onclick();							
						defaultLoadList();
						prev.onclick();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					} 
				});
			});
		}
	};//save onclick end
	
	btn2.onclick=function(){
		document.getElementById("my_closs").onclick();	
	};		
};	
function number_filter(str_value){
	return str_value.replace(/[^0-9]/gi, ""); 
};	
function mkSelect(select, obj, def){
	var op;
	if(obj==DIVISIONS){
		obj.trav(function(d,i){
			op=cf.mkTag("option",select);
			op.value=d.division_cd;
			op.innerHTML=d.division_name;
			if(def && d.division_cd==def){
				op.selected="selected";
			}
		});
	}else {
		obj.trav(function(d,i){
			op=cf.mkTag("option",select);
			op.value=d.code_id;
			op.innerHTML=d.code_name;
			if(def && d.code_id==def){
				op.selected="selected";
			}
		});
	}
};	