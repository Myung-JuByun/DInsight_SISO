var global_user_id;
callTopInfo();
function callTopInfo(){
	var p=document.getElementById("top_info"),
		div1=cf.mkTag("div",p),
		img1=cf.mkTag("img",div1),
		str1=cf.mkTag("div",div1),
		div2=cf.mkTag("div",p),
		img2=cf.mkTag("img",div2),
		div3=cf.mkTag("div",p),
		img3=cf.mkTag("img",div3),
		div4=cf.mkTag("div",p),
		img4=cf.mkTag("img",div4),
		div5=cf.mkTag("div",p),
		img5=cf.mkTag("img",div5);
	
	img1.src="/images/ico/ico_person.gif";
	img2.src="/images/mypage/btn_mypage.png";
	img3.src="/images/mypage/img_bar.png";
	img4.src="/images/mypage/btn_topcon.png";
	img5.src="/images/mypage/btn_logout.png";
	str1.innerHTML=LOGINFO.name+"&nbsp;("+LOGINFO.id+",&nbsp;"+LOGINFO.division+")";
	
	div2.onclick=function(){
		get_mypage_info();
	};
	div4.onclick=function(){
		paymentPop();
	};
	div5.onclick=function(){
		generalPop("로그아웃 하시겠습니까?",function(){
			pfn_logout();
		});
	};
	
	cf.setCss(div1,{float:"left",marginLeft:"5px"});
	cf.setCss(str1,{float:"left",marginLeft:"5px",cursor:"pointer"});
	cf.setCss(div2,{float:"left",marginLeft:"5px",cursor:"pointer"});
	cf.setCss(div3,{float:"left",marginLeft:"5px",cursor:"pointer"});
	cf.setCss(div4,{float:"left",marginLeft:"5px",cursor:"pointer"});
	cf.setCss(div5,{float:"left",marginLeft:"5px",cursor:"pointer"});
	cf.setCss(img1,{float:"left",verticalAlign:"middle"});
	cf.setCss(img2,{verticalAlign:"middle"});
	cf.setCss(img3,{verticalAlign:"middle"});
	cf.setCss(img4,{verticalAlign:"middle"});
	cf.setCss(img5,{verticalAlign:"middle"});
	cf.setCss(p,{position:"absolute",right:"150px",marginBottom:"64px",fontSize:"13px",paddingTop:"20px"});//,width:380+"px"
};
function pfn_mypage(result){
	var con=document.createElement("div");
		Object.assign(con.style, {width:"884px", height:"464px", position:"absolute"});
		con.innerHTML="";
	var hdr=mkHdr(),
		con2=hdr.con2,
		con4=hdr.con4;
	var bdy=mkBody(con4),
		con7_tbl=bdy.con7_tbl,
		con9_tbl=bdy.con9_tbl;
	global_user_id = result.user_id;
	mkuserTb(con7_tbl, result);
	mkdivisionTb(con9_tbl, result);
	mksave(con4, result);
	
	function mkHdr(){
		var con1=cf.mkTag("div",con);
		con1.className="pop-mypage";
		
		var con2=cf.mkTag("div",con1);
		con2.id="pop_my";
		con2.className="pop-mypage";		
		Object.assign(con2.style, {border:"2px solid black", backgroundColor:"white", height:"464px"});
		
		var con3=cf.mkTag("div",con2);
		con3.className="my_top";
		
		var con3_text=cf.mkTag("span",con3);
		con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;MY PAGE";
		
		var con3_a=cf.mkTag("a",con3);
		con3_a.href="javascript:;";
		con3_a.className="my_top_closs";
		
		var con3_img=cf.mkTag("img",con3_a);
		Object.assign(con3_img, {
			src:"/images/pop_btn/btn_pop_close.png",
			id:"my_closs",
			alt:"닫기",
			align:"right"
		});		
		con3_img.onclick=function(){
			cf.killTag(con.parentNode);
		}
		
		var con4=cf.mkTag("div",con2);
		con4.className="my-container";
		
		return {con2:con2, con4:con4};
	};
	function mkBody(son){
		var con5=cf.mkTag("div",son);
		con5.className="con_table";
		var con6=cf.mkTag("div",con5);
		con6.className="mini_title";
		var con6_text=cf.mkTag("span",con6);
		con6_text.innerHTML="개인정보";
		var con7=cf.mkTag("div",con5);
		con7.className="Wrap_table";
		var con7_tbl=cf.mkTag("table",con7);
		con7_tbl.cellpadding=0;
		con7_tbl.cellspacing=0;
		con7_tbl.className="Normal_table_pop";
		var con8=cf.mkTag("div",con5);
		con8.className="mini_title";
		var con8_text=cf.mkTag("span",con8);
		con8_text.innerHTML="<br/>부서정보";
		var con9=cf.mkTag("div",con5);
		con9.className="Wrap_table";
		var con9_tbl=cf.mkTag("table",con9);
		con9_tbl.cellpadding=0;
		con9_tbl.cellspacing=0;
		con9_tbl.width="792px";
		con9_tbl.className="Normal_table_pop";
		return {con7_tbl:con7_tbl, con9_tbl:con9_tbl};
	};		
	function mkuserTb(son, result){
		var tbody=cf.mkTag("tbody",son);
		var tr=cf.mkTag("tr",tbody),
			tr1=cf.mkTag("tr",tbody),
			tr2=cf.mkTag("tr",tbody),
			tr3=cf.mkTag("tr",tbody),
			tr4=cf.mkTag("tr",tbody),
			tr5=cf.mkTag("tr",tbody);
		
		var th1=cf.mkTag("th",tr),
			td1=cf.mkTag("td",tr);
		
		th1.style.width=+"100px";
		td1.className="right pd10";
		td1.id="login_id";
		td1.className="right pd10";
		th1.innerHTML="아이디";
		td1.textContent=result.login_id;
	
		var pw=cf.mkTag("button",td1);
		pw.className="ct-btn blue td";
		pw.innerHTML="비밀번호 변경";
		pw.style.marginLeft="20px";
		pw.onclick=changePw;
		
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
		//input1.className="out_focus";
		input1.size="25";
		//input2.className="out_focus";
		input2.size="25";
		
		input1.id="user_name";
		input1.value=result.user_name;
		input2.id="name_english";
		input2.value=result.name_english;
		
		
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
		//input3.className="out_focus";
		input3.size="35";
		input4_1.size="10";
		input4_2.size="10";
		input4_3.size="10";
		
		input3.id="email";
		input3.value=result.email;
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
		
		
		var mobileNumber = result.mobile;
		if(mobileNumber.length == 10){
			input4_1.value = mobileNumber.substring(0,3);
			input4_2.value = mobileNumber.substring(3,6);
			input4_3.value = mobileNumber.substring(6,10);
		}else{
			input4_1.value = mobileNumber.substring(0,3);
			input4_2.value = mobileNumber.substring(3,7);
			input4_3.value = mobileNumber.substring(7,11);
		}
		
		
		var th6=cf.mkTag("th",tr3),
			td6=cf.mkTag("td",tr3);
		td6.className="right pd10";
		td6.colSpan="3";
		th6.innerHTML="주소";
		var input5=cf.mkTag("input",td6);
		input5.size="85";
		input5.id="address";
		input5.value=result.address;
		
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
		
		registration_number_first = result.registration_number.substring(0,6);
		registration_number_last = result.registration_number.substring(6,13);
		
		input6.maxLength="6";
		input7.maxLength="7";
		input6.id="registration_number_first";
		input7.id="registration_number_last";
		input6.value=registration_number_first;
		input7.value=registration_number_last;
		
		var th8=cf.mkTag("th",tr5),
			td8=cf.mkTag("td",tr5);
		td8.className="right pd10";
		td8.colSpan="3";
		th8.innerHTML="생년월일 ";
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
		if(result.solar_yn == "1") input9.checked=true;
		if(result.solar_yn == "0") input10.checked=true;
		span2.innerHTML=" 음력 ";
		var p=cf.mkTag("p",td8);
		p.innerHTML="예 ) 1974년10월20일 19741020 숫자만입력";
		p.style.padding=5+"px";
		input8.style.marginTop=2+"px";
		input8.size="30";
		
		input8.id="birthday";
		input8.value=result.birthday;
		input8.maxLength="8";
		input8.onkeyup = function(e){
			this.value=number_filter(this.value);
		};
	};
	function mkdivisionTb(son, result){
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
		td1.innerHTML=result.last_division_cd_name;
		th2.innerHTML="직급";
		td2.innerHTML=result.job_title_cd_name;
		
		var th3=cf.mkTag("th",tr1),
			td3=cf.mkTag("td",tr1),
			th4=cf.mkTag("th",tr1),
			td4=cf.mkTag("td",tr1);
		td3.className="pd10";
		td4.className="right pd10";
		th3.innerHTML="고용구분";
		td3.innerHTML=result.employ_type_cd_name;
		th4.innerHTML="화면권한";
		td4.innerHTML=result.role_cd_name;
	};
	function mksave(son, result){
		var con10=cf.mkTag("div",son),
			btn1=cf.mkTag("button",con10);
		con10.className="savebtn";
		btn1.className="ct-btn darkgrey large";
		btn1.innerHTML="저장";
		btn1.onclick=function(){
			
			user_name = document.getElementById("user_name").value;
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
			
			$.ajax({
				url: "/adm/user/userInsert",
				type: "POST",
				data: {
						user_id : result.user_id,
						login_id : result.login_id,
						login_Passwd : result.login_Passwd,
						last_division_cd : result.last_division_cd,
						job_title_cd : result.job_title_cd,
						employ_type_cd : result.employ_type_cd,
						activate_yn : result.activate_yn,
						role_cd : result.role_cd,
						head_yn	 : result.head_yn,
						sales_yn : result.sales_yn,
						delete_yn : result.delete_yn,
						user_name: user_name,
						name_english: name_english,
						email: email,
						mobile: mobile,
						address: address,
						registration_number: registration_number,
						birthday: birthday,
						solar_yn: solar_yn
					  },
				dataType: "text",
				success : function (data) {
					if(data == "success")
					generalPopOk("저장이 완료되었습니다.",function(){
						cf.killTag(con.parentNode);
					});
				},
				error:function(request,status,error){
					generalPopOk("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			    }	  
			});
		};
		var btn2=cf.mkTag("button",con10);	
		btn2.className="ct-btn grey large";
		btn2.innerHTML="취소";
		btn2.onclick=function(){
			document.getElementById("my_closs").onclick();	
		};
		cf.setCss(btn1,{marginRight:5+"px"});
	};
	function changePw(){
		var con=document.createElement("div");
		Object.assign(con.style, {width:"350px", height:"200px", position:"absolute"});		
		con.innerHTML="";
		
		var con1=cf.mkTag("div",con);
		
		var con2=cf.mkTag("div",con1);
		con2.id="pop_pw";
		con2.className="pop-mypage";
		con2.style.border=2+"px solid black";
		con2.style.backgroundColor="white";
		
		var con3=cf.mkTag("div",con2);
		con3.className="mini_title";
		con3.innerHTML="비밀번호 변경";
		
		var con4=cf.mkTag("div",con2);
		con4.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con4);
		tb1.cellpadding=0;
		tb1.cellspacing=0;
		tb1.className="Normal_table_pop";
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.className="right";
		th.innerHTML="기존 비밀번호";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="orgPasswd";
		input.type="password";
		
		var	tr1=cf.mkTag("tr",tbd),
			th1=cf.mkTag("th",tr1),
			td1=cf.mkTag("td",tr1);
		td1.className="right";
		th1.innerHTML="새 비밀번호";
		var input1=cf.mkTag("input",td1);
		input1.size="30";
		input1.id="newPasswd";
		input1.type="password";
		
		var	tr2=cf.mkTag("tr",tbd),
			th2=cf.mkTag("th",tr2),
			td2=cf.mkTag("td",tr2);
		td2.className="right";
		th2.innerHTML="비밀번호 확인";
		var input2=cf.mkTag("input",td2);
		input2.size="30";
		input2.id="newPasswdConfirm";
		input2.type="password";
		
		var con5=cf.mkTag("div",con2),
			btn1=cf.mkTag("button",con5),
			span=cf.mkTag("span",con5),
			btn2=cf.mkTag("button",con5);
		
		con5.className="savebtn";
		btn1.className="ct-btn darkgrey normal";
		btn1.innerHTML="저장";
		btn2.className="ct-btn grey normal";
		btn2.innerHTML="취소";
		span.innerHTML="  ";		
		btn1.onclick=function(){
			
			pw = document.getElementById("orgPasswd").value;
			pw1 = document.getElementById("newPasswd").value;
			pw2 = document.getElementById("newPasswdConfirm").value;
			
			if(pw == null || pw == ''){
				generalPopOk("기존 비밀번호를 입력해주세요", function(){
					var pwf = document.getElementById("orgPasswd");
					pwf.focus();	
				});
				return false;
			}
			
			if(pw1== null || pw1 == ''){
				generalPopOk("새 비밀번호를 입력해주세요", function(){
					var pwf = document.getElementById("newPasswd");
					pwf.focus();
				});
				
				return false;
			}
			
			if(pw2 == null || pw2 == ''){
				generalPopOk("비밀번호 확인을 입력해주세요", function(){
					var pwf = document.getElementById("newPasswdConfirm");
					pwf.focus();
				});
				return false;
			}
			
			if(pw1 != pw2){
				generalPopOk("새 비밀번호가 맞지 않습니다.<br><br>비밀번호 확인을 제대로 해주세요", function(){
					var pwf = document.getElementById("newPasswdConfirm");
					pwf.value = "";
					pwf.focus();
				});
				return false;
			}
			
			$.ajax({
				url: "/adm/user/userPassUpdate",
				type: "POST",
				data: {
						in_user_id : global_user_id,
						login_Passwd : pw,
						in_login_id : pw1
					  },
				dataType: "text",
				success : function (data) {
					if(data == "fail2") {
						generalPopOk("기존 비밀번호가 맞지 않습니다.", function(){
							document.getElementById("orgPasswd").value = "";
							document.getElementById("newPasswd").value = "";
							document.getElementById("newPasswdConfirm").value = "";	
							document.getElementById("orgPasswd").focus();
						});
					}
					else{
						if(data == "success"){
							generalPop("정상적으로 변경되었습니다.");
							cf.killTag(con.parentNode);
						} 
					}
				},
				error:function(request,status,error){
					generalPopOk("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			    }	  
			});
		};		
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		callPop(con);
	};	
	function number_filter(str_value){
		return str_value.replace(/[^0-9]/gi, ""); 
	};
	callPop(con);	 
};