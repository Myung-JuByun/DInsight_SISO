//부서 추가 수정 삭제
function divisionAdd() {
	if(!prev) generalPop("상위부서를 선택하세요.");
	else{
		var con=document.createElement("div");
		con.innerHTML="";
		Object.assign(con.style, {width:"400px", height:"200px", position:"absolute"});
		
		var con0=cf.mkTag("div",con),		
			con1=cf.mkTag("div",con0);
		con1.id="pop_group_add";
		con1.style.border="2px solid black";
		con1.style.backgroundColor="white";
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;부서추가"
		
		var con3=cf.mkTag("div",con1);
		con3.className="";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="부서정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);
		Object.assign(tbl, {cellpadding:0, cellspacing:0, className:"Normal_table"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.colSpan="3";
		td.className="right pd10";
		th.innerHTML="상위부서";
		td.innerHTML=CURRENT_DIVISION.division_name;
	
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.style.width="125px";
		td.style.textAlign="center";
		th.innerHTML="부서";
		var input=cf.mkTag("input",td);
		input.size="18";
		input.id="add";
		
		var th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.style.textAlign="center";
		td.className="right pd10";
		th.innerHTML="사업부여부";
		
		var select=cf.mkTag("select",td),
			op1=cf.mkTag("option",select),
			op2=cf.mkTag("option",select);
		select.style.width="50px";
		select.className="select_pop";
		select.id="operation_yn";
		op1.value="0";
		op1.innerHTML="N";
		op2.value="1";
		op2.innerHTML="Y";
		
		var con7=cf.mkTag("div",con3),
			btn1=cf.mkTag("button",con7),
			btn2=cf.mkTag("button",con7);		
		con7.className="savebtn";
		btn1.className="ct-btn darkgrey small";
		btn2.className="ct-btn grey small";
		btn1.innerHTML="추가";
		btn2.innerHTML="취소";
		cf.setCss(btn1,{marginRight:"5px"});		
		btn1.onclick=function(){
			//추가
			var new_cd,
				cd1=Number(CURRENT_DIVISION.division_level)+1+10,
				cd2,
				new_name=document.getElementById("add").value,
				operation_yn=document.getElementById("operation_yn").value;
				
			var cnt=0;
			var divArr = [];
			ALLDIVISION.trav(function(d,i){
				if((CURRENT_DIVISION.division_level*1+1)==d.division_level*1) {
					cnt++;
					divArr.push(d.division_cd);
				}
			});
			cd2=cnt+1;
			divArr.sort();
			
			//로직상 동일 뎁스에 99개 부서만 생성이 가능함 - 20180313(정승호)
			var ii="";
			var dvCd="";
			var newDvCd = "";
			var valChk = "0";
			for(var i=1; i<100; i++) {
				if(i<10)	ii="0"+i;
				else		ii=i;
				
				dvCd=String(cd1)+String(ii);
				
				if(divArr.indexOf(dvCd) == -1 && valChk == "0") {
					valChk = "1";
					newDvCd = dvCd;
				}
			}
			
			if(valChk == "1") {
				new_cd = newDvCd;
			
				//if(cd2>9) new_cd=String(cd1)+String(cd2);
				//else new_cd=String(cd1)+0+String(cd2);
				generalPop("추가하시겠습니까?", function(){								
					$.ajax({
						url: "/adm/user/divisionInsert",
						type: "POST",
						data:{"division_id"	: "","division_cd" : new_cd,"division_name" : new_name,"etc_explain" : CURRENT_DIVISION.division_name,
							"division_level" : String(Number(CURRENT_DIVISION.division_level)+1),"parent_cd" : CURRENT_DIVISION.division_cd,
							"order_seq" : String(cd2),"operation_yn" : operation_yn},
						dataType: "text",
						success : function (data) {
							if(data != "success") generalPop(data);
							else generalPop("추가되었습니다.");
							window.location.reload();
							$('.wrap-loading').hide(20);
						},
						beforeSend:function(){
							$('.wrap-loading').show();
						}
					});
				});
			} else {
				generalPop("부서 등록을 하실 수 없습니다. 관리자에게 문의하세요.");
			}
		};			
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
		};			
		callPop(con);
	}
}

function divisionModi(){		
	if(!prev) generalPop("수정할 부서를 선택하세요.");
	else{
		var con=document.createElement("div");		
		con.innerHTML="";
		Object.assign(con.style, {width:"400px", height:"200px", position:"absolute"});
		
		var con0=cf.mkTag("div",con);
		var con1=cf.mkTag("div",con0);
		con1.id="pop_group_add";
		con1.style.border="2px solid black";
		con1.style.backgroundColor="white";
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;부서수정";
		
		var con3=cf.mkTag("div",con1);
		con3.className="";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="부서정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);		
		Object.assign(tbl, {cellpadding:0, cellspacing:0, className:"Normal_table"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.colSpan="3";
		td.className="right pd10";
		th.innerHTML="상위부서";
		
		DIVISIONS.trav(function(d,i){
			if(DIVISIONS[i].division_cd==CURRENT_DIVISION.parent_cd){
				td.innerHTML=DIVISIONS[i].division_name;
			}
		});
	
		var	tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
		
		td.style.width="125px";
		td.style.textAlign="center";
		th.innerHTML="부서";
		var input=cf.mkTag("input",td);
		input.size="18";
		input.id="modi";
		if(prev) input.value=CURRENT_DIVISION.division_name;
		
		var th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.style.textAlign="center";
		td.className="right pd10";
		th.innerHTML="사업부여부";
		
		var select=cf.mkTag("select",td),
			op1=cf.mkTag("option",select),
			op2=cf.mkTag("option",select);
		select.className="select_pop";
		select.style.width="50px";
		select.id="operation_yn";
		op1.value="0";
		op1.innerHTML="N";
		op2.value="1";
		op2.innerHTML="Y";
		if(CURRENT_DIVISION.operation_yn==op1.value) op1.selected="selected";
		if(CURRENT_DIVISION.operation_yn==op2.value) op2.selected="selected";
		
		var con7=cf.mkTag("div",con3),
			btn1=cf.mkTag("button",con7),
			btn2=cf.mkTag("button",con7);		
		con7.className="savebtn";
		btn1.className="ct-btn darkgrey small";
		btn2.className="ct-btn grey small";
		btn1.innerHTML="수정";
		btn2.innerHTML="취소";
		cf.setCss(btn1,{marginRight:"5px"});
		btn1.onclick=function(){
			var new_name=document.getElementById("modi").value,
				operation_yn=document.getElementById("operation_yn").value;
			
			generalPop("수정하시겠습니까?", function(){
				
				$.ajax({
					url: "/adm/user/divisionInsert",
					type: "POST",
					data:{"division_id"	: CURRENT_DIVISION.division_id,	"division_cd" : CURRENT_DIVISION.division_cd,"division_name" : new_name,
						"etc_explain" : CURRENT_DIVISION.etc_explain,"division_level" : CURRENT_DIVISION.division_level,"parent_cd" : CURRENT_DIVISION.parent_cd,
						"order_seq" : CURRENT_DIVISION.order_seq,"operation_yn" : operation_yn},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("수정되었습니다.");
						window.location.reload();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
			});
		};			
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		callPop(con);
	}
}

//사원정보 팝업
function mkUserinfo(son, obj){
	son.innerHTML="";
	var hdr=mkHdr(son),
		con2=hdr.con2,
		con4=hdr.con4,
		bdy=mkBody(con4),
		con7_tbl=bdy.con7_tbl,
		con9_tbl=bdy.con9_tbl;
	
	mkuserTb(con7_tbl, obj);
	mkdivisionTb(con9_tbl, obj);
	mksave(con4, obj);
}

function mkHdr(con){
	var con1=cf.mkTag("div",con);
	con1.className="pop-mypage";
	
	var con2=cf.mkTag("div",con1);
	con2.id="pop_my";
	Object.assign(con2.style, {border:"2px solid black", backgroundColor:"white", height:"464px"});
	
	var con3=cf.mkTag("div",con2);
	con3.className="my_top";
	
	var con3_text=cf.mkTag("span",con3);
	con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;사원 정보";
	
	var con3_a=cf.mkTag("a",con3);
	con3_a.href="#";
	con3_a.className="my_top_closs";
	
	var con3_img=cf.mkTag("img",con3_a);
	con3_img.src="/images/pop_btn/btn_pop_close.png";
	con3_img.id="my_closs";
	con3_img.alt="닫기";
	con3_img.align="right";
	Object.assign(con3_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
	con3_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con4=cf.mkTag("div",con2);
	con4.className="my-container";
	
	return {con2:con2, con4:con4};
}

function mkBody(son){
	var con5=cf.mkTag("div",son);
	con5.className="con_table";
	
	var con6=cf.mkTag("div",con5);
	con6.className="mini_title";
	
	var con6_text=cf.mkTag("span",con6);
	con6.innerHTML="개인정보";
	
	var con7=cf.mkTag("div",con5);
	con7.className="Wrap_table";
	
	var con7_tbl=cf.mkTag("table",con7);
	con7_tbl.cellpadding=0;
	con7_tbl.cellspacing=0;
	con7_tbl.className="Normal_table_pop";
	Object.assign(con7_tbl, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
	
	var con8=cf.mkTag("div",con5);
	con8.className="mini_title";
	
	var con8_text=cf.mkTag("span",con8);
	con8_text.innerHTML="</br>부서정보";
	
	var con9=cf.mkTag("div",con5);
	con9.className="Wrap_table";
	
	var con9_tbl=cf.mkTag("table",con9);
	Object.assign(con9_tbl, {cellpadding:0, cellspacing:0, width:"792px", className:"Normal_table_pop"});
	
	return {con7_tbl:con7_tbl, con9_tbl:con9_tbl};
}

function mkuserTb(son, obj){
	var tbody=cf.mkTag("tbody",son);
	
	var tr=cf.mkTag("tr",tbody),
		tr1=cf.mkTag("tr",tbody),
		tr2=cf.mkTag("tr",tbody),
		tr3=cf.mkTag("tr",tbody),
		tr4=cf.mkTag("tr",tbody),
		tr5=cf.mkTag("tr",tbody);
	
	var th1=cf.mkTag("th",tr),
		td1=cf.mkTag("td",tr),
		td1_2=cf.mkTag("td",tr),
		td1_3=cf.mkTag("td",tr);
	th1.style.width="100px";
	td1.className="right pd10";
	td1_3.className="right";
	td1_2.align="center";
	td1.id="login_id";
	
	if(obj){
		td1.innerHTML=obj.login_id;
		td1_2.colSpan="2";
	}else{
		var id_input=cf.mkTag("input",td1);
		id_input.size="20";
		id_input.id="new_login_id";
		var span=cf.mkTag("span",td1);
		span.className="pd10";
		span.innerHTML="영문,숫자,_만 가능합니다.";
		
		var img=cf.mkTag("img",td1_2);
		img.src="/images/pop_btn/btn_idcheck.gif";
		img.onclick=function(){
			var newid=document.getElementById("new_login_id");
			if(newid.value==""){
				td1_3.innerHTML="아이디를 입력하세요.";
				td1_3.style.color="red";
				btnConfirm=false;
				newid.focus();
				return;
			}
			
			var reg=/\W/g;
			if(reg.test(newid.value)){
				td1_3.innerHTML="아이디를 확인하세요.";
				td1_3.style.color="red";
				newid.focus();
				btnConfirm=false;
				return;
			};				
			
			$.ajax({
				  url: "/adm/user/userSearchCount",
				  type: "POST",
				  data: {"login_id":newid.value},
				  async: false,
				  dataType: 'json',
				  success: function (data) {
					 if(data!=0){
						 td1_3.innerHTML="중복된 아이디입니다.";
						 td1_3.style.color="red";
						 newid.focus();
						 btnConfirm=false;
					 }else{
						 td1_3.innerHTML="사용가능한 아이디입니다.";
						 td1_3.style.color="green";
						 btnConfirm=true;
					 }
				  }
			});
		};	
	}
	
	td1_2.className="right";
	th1.innerHTML="아이디";
	
	var th2=cf.mkTag("th",tr1),
		td2=cf.mkTag("td",tr1),
		th3=cf.mkTag("th",tr1),
		td3=cf.mkTag("td",tr1);
	th2.style.width="100px";
	th3.style.width="100px";
	td2.className="pd10";
	td2.style.width="283px";
	td3.className="right pd10";
	th2.innerHTML="이름";
	th3.innerHTML="영문이름";
	var input1=cf.mkTag("input",td2);
	var input2=cf.mkTag("input",td3);
	input1.size="25";
	input2.size="25";
	
	input1.id="user_name";
	input2.id="name_english";
	
	var th4=cf.mkTag("th",tr2),
		td4=cf.mkTag("td",tr2),
		th5=cf.mkTag("th",tr2),
		td5=cf.mkTag("td",tr2);
	td4.className="pd10";
	td5.className="right pd10";
	th4.innerHTML="이메일";
	th5.innerHTML="휴대폰번호";
	var input3=cf.mkTag("input",td4);
	var input4_1=cf.mkTag("input",td5);
	var input4_1_textNode = document.createTextNode(" - ");
	td5.appendChild(input4_1_textNode);
	var input4_2=cf.mkTag("input",td5);
	var input4_2_textNode = document.createTextNode(" - ");
	td5.appendChild(input4_2_textNode);
	var input4_3=cf.mkTag("input",td5);
	input3.size="35";
	input4_1.size="10";
	input4_2.size="10";
	input4_3.size="10";
	
	input3.id="email";
	input4_1.id="mobile1";
	input4_2.id="mobile2";
	input4_3.id="mobile3";
	input4_1.maxLength = "3";
	input4_2.maxLength = "4";
	input4_3.maxLength = "4";
	input4_1.onkeyup = function(e){
		this.value=number_filter(this.value);
	};
	input4_2.onkeyup = function(e){
		this.value=number_filter(this.value);
	};
	input4_3.onkeyup = function(e){
		this.value=number_filter(this.value);
	};
	
	if(obj){
		var mobileNumber = obj.mobile;
		if(mobileNumber.length == 10){
			input4_1.value = mobileNumber.substring(0,3);
			input4_2.value = mobileNumber.substring(3,6);
			input4_3.value = mobileNumber.substring(6,10);
		}else{
			input4_1.value = mobileNumber.substring(0,3);
			input4_2.value = mobileNumber.substring(3,7);
			input4_3.value = mobileNumber.substring(7,11);
		}
	}

	var th6=cf.mkTag("th",tr3),
		td6=cf.mkTag("td",tr3);
	td6.className="right pd10";
	td6.colSpan="3";
	th6.innerHTML="주소";
	var input5=cf.mkTag("input",td6);
	input5.size="85";
	input5.id="address";
	
	var th7=cf.mkTag("th",tr4),
		td7=cf.mkTag("td",tr4);
	td7.className="right pd10";
	td7.colSpan="3";
	th7.innerHTML="주민번호";
	var input6=cf.mkTag("input",td7);
	input6.onkeyup = function(e){
		this.value=number_filter(this.value);
	};	
	var dashTextNode=document.createTextNode(" - ");
	td7.appendChild(dashTextNode);
	var input7=cf.mkTag("input",td7);
	input7.onkeyup = function(e){
		this.value=number_filter(this.value);
	};
	
	input6.maxLength="6";
	input7.maxLength="7";
	input6.id="registration_number_first";
	input7.id="registration_number_last";
	
	if(obj){
		registration_number_first = obj.registration_number.substring(0,6);
		registration_number_last = obj.registration_number.substring(6,13);
		input6.value=registration_number_first;
		input7.value=registration_number_last;
	}
	
	var th8=cf.mkTag("th",tr5),
		td8=cf.mkTag("td",tr5);
	td8.className="right pd10";
	td8.colSpan="3";
	th8.innerHTML="생년월일";
	var input8=cf.mkTag("input",td8);
	var span0=cf.mkTag("span",td8);
	var input9=cf.mkTag("input",td8);
	var span1=cf.mkTag("span",td8);
	var input10=cf.mkTag("input",td8);
	var span2=cf.mkTag("span",td8);
	span0.innerHTML="  ";
	input9.type="radio";
	input9.value="1";
	input9.name="solar_yn";
	span1.innerHTML=" 양력 ";
	input10.type="radio";
	input10.name="solar_yn";
	input10.value="0";
	if(obj){
		if(obj.solar_yn == "1") input9.checked=true;
		if(obj.solar_yn == "0") input10.checked=true;
	}
	span2.innerHTML=" 음력 ";
	var p=cf.mkTag("p",td8);
	p.innerHTML="예 ) 1974년10월20일 19741020 숫자만입력";
	p.style.paddingTop = "5px";
	p.style.paddingBottom = "5px";
	input8.style.marginTop ="2px";
	input8.size="30";
	input8.id="birthday";
	input8.maxLength="8";
	input8.onkeyup = function(e){
		this.value=number_filter(this.value);
	};	
	var arEls=[input1, input2, input3, input5, input8];
	if(obj){
		obj.value=[obj.user_name, obj.name_english, obj.email, obj.address, obj.birthday];
		arEls.trav(function(d,i){
			if(obj.value[i]) d.value=obj.value[i];
		});
	}
}

function mkdivisionTb(son, obj){
	var tbody=cf.mkTag("tbody",son);
	
	var tr=cf.mkTag("tr",tbody),
		tr1=cf.mkTag("tr",tbody);
	
	var th1=cf.mkTag("th",tr),
		td1=cf.mkTag("td",tr),
		th2=cf.mkTag("th",tr),
		td2=cf.mkTag("td",tr);
	th1.style.width="100px";
	th2.style.width="100px";
	td1.style.width="283px";
	td1.className="pd10";
	td2.className="right pd10";
	th1.innerHTML="부서";
	var select=cf.mkTag("select",td1);
	select.id="set_division";
	select.className="select_pop";
	if(obj)def=obj.last_division_cd;
	else def=CURRENT_DIVISION.division_cd;
	
	mkSelect(select, DIVISIONS, def);
	
	th2.innerHTML="직급";
	var select=cf.mkTag("select",td2);
	select.id="set_job";
	select.className="select_pop";
	if(obj){
		def=obj.job_title_cd;
		mkSelect(select, JOBTITLELIST, def);
	}else mkSelect(select, JOBTITLELIST,"17");
	
	var th3=cf.mkTag("th",tr1),
		td3=cf.mkTag("td",tr1),
		th4=cf.mkTag("th",tr1),
		td4=cf.mkTag("td",tr1);
	th3.style.width="100px";
	th4.style.width="100px";
	td3.className="pd10";
	td4.className="right pd10";
	th3.innerHTML="고용구분";
	var select=cf.mkTag("select",td3);
	select.id="set_emp";
	select.className="select_pop";
	if(obj){
		def=obj.employ_type_cd;
		mkSelect(select, EMPLOYTYPELIST, def);
	} else mkSelect(select, EMPLOYTYPELIST);
	
	th4.innerHTML="화면권한";
	var select=cf.mkTag("select",td4);
	select.id="set_role";
	select.className="select_pop";
	if(obj){
		def=obj.role_cd;
		mkSelect(select, ROLELIST, def);
	}else mkSelect(select, ROLELIST, 10);
}