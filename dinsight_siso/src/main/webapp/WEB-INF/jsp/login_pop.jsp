<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="siso.cmmn.util.Globals"  %>

<style type="text/css">
	img {cursor:pointer}
</style>

<%@ include file="/template/loginPop" %>

<script>

$(document).ready(function() {
	defaultLoadList();
	setInfoDiv();
	$('#loginId').css("ime-mode", "inactive");		
});

	var DIVISIONS;
	var CURRENT_DIVISION;
	var ROLELIST;
	var EMPLOYTYPELIST;
	var JOBTITLELIST;
	var btnConfirm;
	
	new Vue({
		el : "#pop_up_login",
		data: {
			loginCon : "login_con",
			conBackGround : "background:url('<c:url value='/images/main/bg_login.gif'/>')",
			idRequired : "txt_id required",
			pwRequired : "txt_pw required",
			inputStyle : "width:140px; ime-mode:inactive;",
			altText : "로그인",
			joinFormStyle : "position:absolute; top:165px; left:273px; width:70px;",
			joinBtnImg : "/images/main/btn_join.gif",
			btnImage : "/images/main/btn_login.gif",						
		},
		computed : {
			loginId : function(){
				return this.altText + " ID";
			},
			loginPasswd : function(){
				return this.altText + " 패스워드";
			}			
		},
		methods : {
			checkKey : function(event){
				if(event.keyCode == 13)	this.actionLogin();
			},
			actionLogin: function(){
				var actionUrl            = "<c:url value='/sys/actionLogin'/>";
				var formId               = "loginForm";
				
				if($("#login_id").val() == "")	{
					generalPopOk("아이디를 입력하세요.",function(){
						$("#login_id").focus();
					});
					
					$("#popbtn1").focus();
					return false;
				}
				
				if($("#login_Passwd").val() == "")	{
					generalPopOk("비밀번호를 입력하세요.",function(){
						$("#login_Passwd").focus();
					});
					
					$("#popbtn1").focus();
					return false;
				}
				
				//ajax 호출
				$.ajax({
				    type: "POST",
				    url: actionUrl,
				    data: $("#" + formId).serialize(),
				    async: false,
				    success: function(msg) {
				    	//호출 결과 관련 선처리
				    	var json	=	eval('(' + msg + ')');
				    	var resultErrorYn         = json.GetResultErrorYn;
				    	var resultMsg             = json.GetResultMsg;
				    	var resultMsgName         = json.GetResultMsgName;
				    	var resultErrorMoveUrl    = json.GetResultErrorMoveUrl; 
				    	
				    	if(resultMsgName == "errorLoginNodata" || resultMsgName == "errorLoginActivate") {		
				    		generalPopOk(resultMsg,function(){
				    			$("#login_id").focus();
				    		});
				    		
				    		$("#login_id").val("");
				    		$("#login_Passwd").val("");
				    		$("#popbtn1").focus();
				    		
				    		return false;		
				    	}
				    	
				    	if(resultMsgName == "errorLoginPw"){
				    		generalPopOk(resultMsg,function(){
				    			$("#login_Passwd").focus();
				    		});
				    		
				    		$("#login_Passwd").val("");
				    		$("#popbtn1").focus();
				    		
				    		return false;
				    	}
				    	
				    	$("#" + formId).attr("action", resultErrorMoveUrl);
				    	$("#" + formId).submit();
			            
			            fn_ajax_resultLogin(json, formId);
				    }
			    });	
			},			
			joinPopup : function(){
				var con = document.createElement("div");				
				Object.assign(con.style, {width:"880px", height:"420px", position:"absolute"});
				
				mkUserinfo(con);
				callPop(con);
			}
		}
	});
		
	function defaultLoadList(){
		callUserDivisionData(function (data){
			//dir(data);
			ROLELIST=data.roleList;
			EMPLOYTYPELIST=data.employTypeList;
			JOBTITLELIST=data.jobTitleList;
			DIVISIONS=data.divisionList;
		})
	};
	
	function familyToggle(fam) {
		var familyArea = $("#" + fam);
		
		if(familyArea.css("display")=="block"){
			$("#linkPlus").show();
			$("#linkMinus").hide();
			familyArea.slideUp(400);
		} else {
			$("#linkPlus").hide();
			$("#linkMinus").show();
			familyArea.slideDown(400);
		}
	}
		
	function mkUserinfo(son, obj){
		son.innerHTML = "";
	
		var hdr=mkHdr(son),
			con2=hdr.con2,
			con4=hdr.con4;
	
		var bdy=mkBody(con4),
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
		//con2.className="pop-mypage";
		con2.style.border = "2px solid black";
		con2.style.backgroundColor="white";
		con2.style.height = "420px";
		
		
		var con3=cf.mkTag("div",con2);
		con3.className="my_top";
		
		var con3_text=cf.mkTag("span",con3);
		con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;회원 가입";
		
		var con3_a=cf.mkTag("a",con3);
		con3_a.href="javascript:;";
		con3_a.className="my_top_closs";
		var con3_img=cf.mkTag("img",con3_a);
		con3_img.src="/images/pop_btn/btn_pop_close.png";
		con3_img.id="my_closs";
		con3_img.alt="닫기";
		con3_img.align="right";
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
		//con5.width=830+"px";
		
		var con6=cf.mkTag("div",con5);
		con6.className="mini_title";
		
		var con6_text=cf.mkTag("span",con6);
		con6.innerHTML="개인정보";
		
		var con7=cf.mkTag("div",con5);
		con7.className="Wrap_table";
		
		var con7_tbl=cf.mkTag("table",con7);
		con7_tbl.cellpadding=0;
		con7_tbl.cellspacing=0;
		con7_tbl.className="Normal_table_pop"
		
		
		var con8=cf.mkTag("div",con5);
		con8.className="mini_title";
		
		var con8_text=cf.mkTag("span",con8);
		con8_text.innerHTML="<br/>부서정보";
		
		var con9=cf.mkTag("div",con5);
		con9.className="Wrap_table";
		
		var con9_tbl=cf.mkTag("table",con9);
		con9_tbl.cellpadding=0;
		con9_tbl.cellspacing=0;
		con9_tbl.width=792+"px";
		con9_tbl.className="Normal_table_pop";
		
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
		th1.style.width = "80px";
		td1.className="right pd10";
		td1_3.className="right";
		td1_2.align="center";
		td1.id="login_id";
		
		if(obj){
			td1.innerHTML=obj.login_id;
			td1_2.colSpan="2";
		}else{
			var id_input=cf.mkTag("input",td1);
			id_input.size="15";
			id_input.id="new_login_id";
			var span=cf.mkTag("span",td1);
			span.className="pd10";
			span.innerHTML="아이디는 영문,숫자,_만 가능합니다.";
			
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
				btnConfirm=true;			
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
						 }else{
							 td1_3.innerHTML="사용가능한 아이디입니다.";
							 td1_3.style.color="green";
							 var email=document.getElementById("email");
							 email.value=newid.value+"@rntime.com";
						 }
					  }
				});
			};	
		}	
		td1_2.className="right";
		th1.innerHTML="아이디";
		var span=cf.mkTag("span",th1);
		span.innerHTML="*";
		
		var th2=cf.mkTag("th",tr1),
			td2=cf.mkTag("td",tr1);
		th2.style.width=100+"px";
		th2.innerHTML="이름";
		td2.className="pd10";
		td2.style.width= "293px";
		var input1=cf.mkTag("input",td2);
		input1.size="25";
		input1.id="user_name";
		var span=cf.mkTag("span",th2);
		span.innerHTML="*";
		
		var th3=cf.mkTag("th",tr1),
			td3=cf.mkTag("td",tr1);
		th3.style.width="100px";
		th3.innerHTML="영문이름";
		td3.className="right pd10";
		var input2=cf.mkTag("input",td3);
		input2.size="25";
		input2.id="name_english";
		
		
		var th4=cf.mkTag("th",tr2),
			td4=cf.mkTag("td",tr2);
		th4.innerHTML="이메일";
		var span=cf.mkTag("span",th4);
		span.innerHTML="*";
		td4.className="pd10";	
		var input3=cf.mkTag("input",td4);
		input3.size="35";
		input3.id="email";
		
		var th5=cf.mkTag("th",tr2),
			td5=cf.mkTag("td",tr2);
		th5.innerHTML="휴대폰번호";
		var span=cf.mkTag("span",th5);
		span.innerHTML="*";
		td5.className="right pd10";
		var input4_1=cf.mkTag("input",td5);
		var input4_1_textNode = document.createTextNode(" - ");
		td5.appendChild(input4_1_textNode);
		var input4_2=cf.mkTag("input",td5);
		var input4_2_textNode = document.createTextNode(" - ");
		td5.appendChild(input4_2_textNode);
		var input4_3=cf.mkTag("input",td5);
		input4_1.size="10";
		input4_2.size="10";
		input4_3.size="10";
		input4_1.id="mobile1";
		input4_2.id="mobile2";
		input4_3.id="mobile3";
		input4_1.maxLength = "3";
		input4_2.maxLength = "4";
		input4_3.maxLength = "4";
		input4_1.onkeyup = function(e){
			this.value=number_filter(this.value);
		}
		input4_2.onkeyup = function(e){
			this.value=number_filter(this.value);
		}
		input4_3.onkeyup = function(e){
			this.value=number_filter(this.value);
		}
	
		var th6=cf.mkTag("th",tr3),
			td6=cf.mkTag("td",tr3);
		th6.innerHTML="주소";
		var span=cf.mkTag("span",th6);
		span.innerHTML="*";
		td6.className="right pd10";
		td6.colSpan="3";
		var input5=cf.mkTag("input",td6);
		input5.size="85";
		input5.id="address";
			
		var th7=cf.mkTag("th",tr5),
			td7=cf.mkTag("td",tr5);
		th7.innerHTML="생년월일";
		var span=cf.mkTag("span",th7);
		span.innerHTML="*";
		td7.className="right pd10";
		td7.colSpan="3";
		
		var input8=cf.mkTag("input",td7);
		input8.style.marginTop=2+"px";
		input8.size="30";
		input8.id="birthday";
		input8.maxLength="8";
		input8.onkeyup = function(e){
			this.value=number_filter(this.value);
		}
		var span0=cf.mkTag("span",td7);
		span0.innerHTML="  ";
		var input9=cf.mkTag("input",td7);
		input9.type="radio";
		input9.value="1";
		input9.checked=true;
		input9.name="solar_yn";
		var span1=cf.mkTag("span",td7);
		span1.innerHTML=" 양력 ";
		var input10=cf.mkTag("input",td7);
		input10.type="radio";
		input10.name="solar_yn";
		input10.value="0";
		var span2=cf.mkTag("span",td7);
		span2.innerHTML=" 음력 ";
	
		var p=cf.mkTag("p",td7);
		p.innerHTML="예 ) 1974년10월20일 19741020 숫자만입력";
		p.style.paddingTop=5+"px";
		p.style.paddingBottom=5+"px";
		
		var arEls=[input1, input2, input3, input5, input8];
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
		td1.style.width="293px";
		td1.className="pd10";
		td2.className="right pd10";
		th1.innerHTML="부서";
		var select=cf.mkTag("select",td1);
		select.id="set_division";
		select.className="select_pop";
		mkSelect(select, DIVISIONS);
		
		th2.innerHTML="직급";
		var select=cf.mkTag("select",td2);
		select.id="set_job";
		select.className="select_pop";
		mkSelect(select, JOBTITLELIST , 17);
	}
	
	function mksave(son, obj){
		var con10=cf.mkTag("div",son),
			span=cf.mkTag("span",con10);
		
		con10.className="savebtn2";
		span.innerHTML="<br/>";
		img1=cf.mkTag("img",con10);
		img1.src="/images/main/btn_member.gif";
		img1.onclick=function(){
			var user_id,
			user_name=document.getElementById("user_name"),
			login_id=document.getElementById("new_login_id"),
			login_Passwd,
			last_division_cd,
			job_title_cd,
			name_english,
			email=document.getElementById("email"),
			mobile1=document.getElementById("mobile1"),
			mobile2=document.getElementById("mobile2"),
			mobile3=document.getElementById("mobile3"),
			mobile=mobile1.value+mobile2.value+mobile3.value,
			address=document.getElementById("address"),
			birthday=document.getElementById("birthday"),
			solar_yn,
			activate_yn,
			head_yn,
			sales_yn,
			delete_yn;
			
			if(!login_id.value){
				generalPop("아이디를 입력하세요.",function(){
					login_id.focus();
				},true);
			}else if(!btnConfirm){
				generalPop("아이디 중복체크 후 가입 가능합니다."); 
			}else if(!user_name.value){
				generalPop("이름을 입력하세요.",function(){
					user_name.focus();
				},true);
			}else if(!email.value){
				
			}else if(!mobile1.value){
				generalPop("휴대폰번호를 입력하세요.",function(){
					mobile1.focus();
				},true);
			}else if(!mobile2.value){
				generalPop("휴대폰번호를 입력하세요.",function(){
					mobile2.focus();
				},true);
			}else if(!mobile3.value){
				generalPop("휴대폰번호를 입력하세요.",function(){
					mobile3.focus();
				},true);
			}else if(!address.value){
				generalPop("주소를 입력하세요.",function(){
					address.focus();
				},true);
			}else if(!birthday.value){
				generalPop("생년월일을 입력하세요.",function(){
					birthday.focus();
				},true);
			}else{
				generalPop("가입하시겠습니까?",function(){
					user_id="";
					login_Passwd=document.getElementById("new_login_id").value;
					last_division_cd=document.getElementById("set_division").value;
					mobile = mobile.trim(),
					head_yn="0";
					sales_yn="0";
					delete_yn="0";
					activate_yn="0";
					name_english = document.getElementById("name_english").value;
					email=email.value;
					address=address.value;
					birthday=birthday.value;
					solar_yn_ary = document.getElementsByName("solar_yn");
					solar_yn = "1";
					for(var i=0 ; i<solar_yn_ary.length ; i++){
						if(solar_yn_ary[i].checked) solar_yn = solar_yn_ary[i].value; 
					}
					job_title_cd=document.getElementById("set_job").value;
					
					$.ajax({
						url: "/adm/user/userNewInsert",
						type: "POST",
						data: {
								user_id : user_id,
								login_id : login_id.value,
								login_Passwd : login_Passwd,
								last_division_cd : last_division_cd,
								job_title_cd : job_title_cd,
								employ_type_cd : EMPLOYTYPELIST[0].codeId,
								activate_yn : activate_yn,
								role_cd : ROLELIST[1].codeId,
								head_yn	 : head_yn,
								sales_yn : sales_yn,
								delete_yn : delete_yn,
								user_name: user_name.value,
								name_english: name_english,
								email: email,
								mobile: mobile,
								address: address,
								registration_number: "",
								birthday: birthday,
								solar_yn: solar_yn
							  },
						dataType: "text",
						success : function (data) {
							if(data == "success"){
								document.getElementById("my_closs").onclick();							
								defaultLoadList();
								prev.onclick();
							}
						}  
					});
				});
			}//else
		};//save onclick end
		
		span=cf.mkTag("span",con10);
		span.innerHTML="   ";
		
		img2=cf.mkTag("img",con10);
		img2.src="/images/pop_btn/btn_cancel_big.gif";
		img2.onclick=function(){
			document.getElementById("my_closs").onclick();	
		};
	}
	
	function number_filter(str_value){
		return str_value.replace(/[^0-9]/gi, ""); 
	}
	
	function mkSelect(select, obj, def){
		var op;
		
		if(obj==DIVISIONS){
			obj.trav(function(d,i){
				op=cf.mkTag("option",select);
				op.value=obj[i].division_cd;
				op.innerHTML=obj[i].division_name;
			});
		}else{
			obj.trav(function(d,i){
				op=cf.mkTag("option",select);
				op.value=obj[i].codeId;
				op.innerHTML=obj[i].codeName;
				if(def && obj[i].codeId==def){
					op.selected="selected";
				}
			});
		}
	}
	
	function setInfoDiv(){
		var infodiv=document.getElementById("info_msg"),
			copydiv=document.getElementById("copyright");
		
		infodiv.innerHTML="※본 시스템은 익스플로러(IE) 10 이상의 버전과</br>크롬(Chrome)에 최적화되어 있습니다.";
		copydiv.innerHTML="Copyright ⓒ 2022 <strong>THE INSIGHT INTRANET SYSTEM.</strong> All Rights Reserved.";
		
		cf.setCss(infodiv,{position:"absolute",top:"235px",width:"400px",fontSize:"10px",color:"#575757",textAlign:"center",lineHeight:"14px",height:"40px"});
		cf.setCss(copydiv,{position:"absolute",top:"275px",width:"400px",fontSize:"10px",color:"#fff",textAlign:"center",lineHeight:"20px"});
	}
</script>