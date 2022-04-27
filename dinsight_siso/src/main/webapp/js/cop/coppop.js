function companyListPop(){
	var obj={company_id : prev.data[18]};
	arr_sub=new Array();
	callSubCustomerAdminData(obj, function (data){
		data.trav(function(d,i){
			if(!d.customer_name)d.customer_name="";
			if(!d.division)d.division="";
			if(!d.job_title)d.job_title="";
			if(!d.email)d.email="";
			if(!d.mobile)d.mobile="";
			if(!d.sub_phone_number)d.sub_phone_number="";
			if(!d.fax)d.fax="";
			if(!d.invoice_gb_nm)d.invoice_gb_nm="";
			arr_sub.push([d.customer_name,d.division,d.job_title,d.email,d.mobile,d.sub_phone_number,d.fax,d.invoice_gb_nm]);
		});
	});
	arr_sub.asc(0);
	var con=document.createElement("div");
	con.style.width=935+"px";
	con.style.height=cf.workareaheight-150+"px";
	con.style.position="absolute";
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=935+"px";
	con1.style.height=cf.workareaheight-150+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML=prev.data[0];
	
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	var con2_img=cf.mkTag("img",con2_a);
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	con3.style.height=cf.workareaheight-210+"px";
	con3.style.overflowY="auto";
	
	//고객사list
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	
	var con4_title=cf.mkTag("div",con4);
	con4_title.className="mini_title";
	con4_title.innerHTML="고객사 정보";
	
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	var charger_yn, company_yn;		
	if(prev.data[14]=="0") charger_yn="N";
	if(prev.data[14]=="1") charger_yn="Y";		
	if(prev.data[15]=="0") company_yn="N";
	if(prev.data[15]=="1") company_yn="Y";

	var arr=[
         ["",prev.data[0],"",prev.data[1]],
         ["",prev.data[2],"",prev.data[3]],
         ["",prev.data[4],"",prev.data[5]],
         ["",prev.data[6],"",prev.data[8]],
         ["",prev.data[7]],
         ["",prev.data[10],"",prev.data[11]],
         ["",prev.data[12]],
         ["",prev.data[13]],
         ["",charger_yn,"",company_yn],
         ["",prev.data[9]],
         ["",prev.data[25]]
     ];
	
	var headTable=mkHeadTable(con6);		
	setHeadTableValue(headTable,arr,true);
	
	var con5=cf.mkTag("div",con3);
	con5.className="con_table";
	con5.id="subCompany";
	con5.style.display="";
	
	var con5_title=cf.mkTag("div",con5);
	con5_title.className="mini_title";
	con5_title.innerHTML="담당자 정보";
	
	var con7=cf.mkTag("div",con5);
	con7.className="Wrap_table";
	
	var btable_head=mkBottomTableHead(con7);
	var btable_list=cf.mkTag("tbody", btable_head);
	btable_list.id="subCompanyList";
	mkBottomTable(btable_list,arr_sub);
	
	callPop(con);
};
function companyAdd(){
	com_checks=new Array();	
	var con=document.createElement("div"),
		con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);
	con0.className="pop-mypage";
	con1.id="pop_my";
	con2.className="my_top";
	span.innerHTML="고객사 추가";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	cf.setCss(con,{width:935+"px",height:cf.workareaheight-162+"px",position:"absolute"});
	cf.setCss(con1,{width:935+"px",height:cf.workareaheight-162+"px",border:2+"px solid black",backgroundColor:"#fff"});
	
	var con3=cf.mkTag("div",con1),
		div=cf.mkTag("div",con3),
		span=cf.mkTag("sapn",div);
	con3.className="my-container";
	div.className="descriptR must asterisk";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";
	cf.setCss(con3,{height:cf.workareaheight-260+"px",paddingBottom:0+"px",overflowY:"auto"});
	
	var con4=cf.mkTag("div",con3),
		con4_title=cf.mkTag("div",con4)
	con4.className="con_table";
	con4_title.className="mini_title";
	con4_title.innerHTML="고객사 정보";
	
	var con6=cf.mkTag("div",con4),
		headTable=mkHeadTable(con6,true),
		con5=cf.mkTag("div",con3),
		con5_btn=cf.mkTag("div",con5),
		ul=cf.mkTag("ul",con5_btn),
		li=cf.mkTag("li",ul),
		img=cf.mkTag("img",li);
	con6.className="Wrap_table";
	setInput(headTable);
	con5.className="con_table";
	con5.id="subCompany";
	con5.style.display="";
	con5_btn.className="btn_action";
	img.src="/images/btn/btn_plus_on.gif";
	img.onmousedown=function(){
		subCompanyAdd(true);
	};
	
	var li=cf.mkTag("li",ul),
		img=cf.mkTag("img",li),
		con5_title=cf.mkTag("div",con5);
	img.src="/images/btn/btn_del_on.gif";
	img.onmousedown=subCompanyDel;
	con5_title.className="mini_title";
	con5_title.innerHTML="담당자 정보";
	
	var con7=cf.mkTag("div",con5),
		btable_head=inputBottomTableHead(con7),
		btable_list=cf.mkTag("tbody", btable_head);
	con7.className="Wrap_table";
	btable_list.id="subCompanyList";
	
	var con8=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con8),
		btn2=cf.mkTag("button",con8);
	con8.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn1.innerHTML="저장";
	btn1.onmousedown=function(){
		copSave(con,2);
	};
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onmousedown=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function companyModi(){	
	com_checks=new Array();	
	arr_sub=new Array();
	if(!prev){
		generalPop("수정할 고객사를 선택하세요.");
		return;
	}
	var obj={company_id : prev.data[18]};
	callSubCustomerAdminData(obj, function (data){
		data.trav(function(d,i){
			if(!d.customer_name)d.customer_name="";
			if(!d.division)d.division="";
			if(!d.job_title)d.job_title="";
			if(!d.email)d.email="";
			if(!d.mobile)d.mobile="";
			if(!d.sub_phone_number)d.sub_phone_number="";
			if(!d.fax)d.fax="";
			if(!d.invoice_gb)d.invoice_gb="";
			arr_sub.push(["",d.customer_name,d.division,d.job_title,d.email,d.mobile,d.sub_phone_number,d.fax,d.invoice_gb,d.customer_id,d.company_id]);
		});
	});
	arr_sub.asc(1);
	var current_company=prev.data,
		con=document.createElement("div"),
		con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);		
	con0.className="pop-mypage";
	con1.id="pop_my";
	con2.className="my_top";
	span.innerHTML=prev.data[0];		
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	cf.setCss(con,{width:935+"px",height:cf.workareaheight-162+"px",position:"absolute"});
	cf.setCss(con1,{width:935+"px",height:cf.workareaheight-162+"px",border:2+"px solid black",backgroundColor:"#fff"});
	
	var con3=cf.mkTag("div",con1),
		div=cf.mkTag("div",con3),
		span=cf.mkTag("sapn",div);
	con3.className="my-container";
	div.className="descriptR must asterisk";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";
	cf.setCss(con3,{height:cf.workareaheight-260+"px",paddingBottom:0+"px",overflowY:"auto"});

	var con4=cf.mkTag("div",con3),
		con4_title=cf.mkTag("div",con4),
		con6=cf.mkTag("div",con4),
		headTable=mkHeadTable(con6,true);
	con4.className="con_table";		
	con4_title.className="mini_title";
	con4_title.innerHTML="고객사 정보";
	con6.className="Wrap_table";			
	var arr=[
	         ["",prev.data[0],"",prev.data[1]],
	         ["",prev.data[2],"",prev.data[3], prev.data[24]],
	         ["",prev.data[4],"",prev.data[5]],
	         ["",prev.data[6],"",prev.data[8]],
	         ["",prev.data[7]],
	         ["",prev.data[10],"",prev.data[11]],
	         ["",prev.data[12]],
	         ["",prev.data[12]],
	         ["",prev.data[13]],
	         ["",prev.data[14],"",prev.data[15]],
	         ["",prev.data[9]],
	         ["",prev.data[25]]
	         ];
	setInputValue(headTable,arr,true);
	
	var con5=cf.mkTag("div",con3),
		con5_btn=cf.mkTag("div",con5),
		ul=cf.mkTag("ul",con5_btn),
		li=cf.mkTag("li",ul),
		img=cf.mkTag("img",li);
	con5.className="con_table";
	con5.id="subCompany";
	con5.style.display="";
	con5_btn.className="btn_action";
	img.src="/images/btn/btn_plus_on.gif";
	img.onmousedown=function(){
		subCompanyAdd(false);
	};
	var li=cf.mkTag("li",ul),
		img=cf.mkTag("img",li),
		con5_title=cf.mkTag("div",con5);
	img.src="/images/btn/btn_del_on.gif";
	img.onmousedown=subCompanyDel;
	con5_title.className="mini_title";
	con5_title.innerHTML="담당자 정보";
	
	var con7=cf.mkTag("div",con5),
		btable_head=inputBottomTableHead(con7),
		btable_list=cf.mkTag("tbody", btable_head);
	con7.className="Wrap_table";
	btable_list.id="subCompanyList";
	inputBottomTable(btable_list,arr_sub);		
	
	var con8=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con8),
		btn2=cf.mkTag("button",con8);
	con8.className="savebtn";
	btn1.className="ct-btn darkgrey large btnR5";
	btn1.innerHTML="저장";
	btn1.onmousedown=function(){
		copSave(con,2);
	};
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onmousedown=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function setHeadTableValue(tbl,arr,opt){
	for(var i=0, lng=tbl.children.length;i<lng;i++){
		var row=tbl.children[i];
		for(var j=0, jng=row.children.length;j<jng;j++){
			var cell=row.children[j];
			if(i==6){
				if(j==1){
					if(arr[i][j])cell.innerHTML="("+prev.data[21]+" - "+prev.data[22]+")&nbsp;&nbsp;"+arr[i][j];
				}
			}else if(i==9||(i==9&&opt)){
				if(j==1){
					if(prev.data[9]){
						var aTagImg = cf.mkTag("img", cell);
						aTagImg.src = "/images/ico/ico_filedown.gif";
						aTagImg.onclick = function(){
							window.open(encodeURI("/cop/companyDownloadAjax?sh_company_id=" +prev.data[18]));
						};			
						var aTag = cf.mkTag("a", cell);
						aTag.textContent = prev.data[16];
						aTag.onclick = function(){
							window.open(encodeURI("/cop/companyDownloadAjax?sh_company_id=" + prev.data[18]));
						};
						cf.setCss(aTag,{cursor:"pointer",textDecoration:"underline"});
					}
				}else if(j==3)cell.innerHTML=arr[i][j];
			}else if(i==10){
				if(j==1){
					if(prev.data[25]){
						var ta = cf.mkTag("textarea",cell);
						ta.style.width=95+"%";
						ta.style.height=80+"px";
						ta.setAttribute("readonly","readonly");
						ta.innerHTML=arr[i][j];
					}
				}
			}else{
				if(j==3)cell.innerHTML=arr[i][j];
				if(j==1){
					if(i == 9) {
						cell.style.width=300+"px";
						cell.innerHTML=arr[i][j].replaceAll('\n', '<br/>');
					} else {
						cell.style.width=300+"px";
						cell.innerHTML=arr[i][j];
					}
				}
			}
		}
	}
};
//customer popup// 
function setInputValue(tbl,arr,opt){
	for(var i=0, lng=tbl.children.length;i<lng;i++){
		var row=tbl.children[i];
		for(var j=0, jng=row.children.length;j<jng;j++){
			var cell=row.children[j];
			if(i==0){
				if(j==1){
					cell.style.width=400+"px";
					var ipt=cf.mkTag("input",cell);
					ipt.type="hidden";
					ipt.name="pop_company_id";
					ipt.id="pop_company_id";
					ipt.value=prev.data[18];
					var ipt=cf.mkTag("input",cell),
						oriName=arr[i][j];
					ipt.name="company_name";
					ipt.id="company_name";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
					ipt.onkeyup=function(e){
						var cmpValue = e.target.value;
						if(oriName != cmpValue){
							nameFlag = false;
							var span = document.getElementById('nameChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					ipt.onblur=function(e){
						if(!nameFlag){
							var span = document.getElementById('nameChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					var btn=cf.mkTag("button", cell);
					btn.id = "nameImg";
					btn.style.marginLeft = "10px";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						nameFlag = false;
						var company_name=document.getElementById("company_name"),
							strOrigin=company_name.value;
						if(strOrigin.lenght==0){
							generalPopOk("고객사명을 입력해주세요.",function(){
								nameFlag = false;
								var span = document.getElementById('nameChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								company_name.focus();
							});
							return false;
					 	}
						if(strOrigin==oriName){
							nameFlag = true;
							var span = document.getElementById('nameChk');
							span.textContent = "사용가능한 고객사명 입니다.";
							span.style.color="green";
							company_name.value=strOrigin;
							return false;
						}
						$.ajax({
							url: "/cop/chk_comapny_name",
							type: "POST",
							data: {"company_name":strOrigin},
							async: false,
							dataType: 'json',
							success: function (data) {
								if(parseInt(data) > 0){
									nameFlag = false;
									var span = document.getElementById('nameChk');
									span.textContent = "중복된 고객사명입니다";
									span.style.color="red";
									//company_name.focus();
								}else{
									nameFlag = true;
									var span = document.getElementById('nameChk');
									span.textContent = "사용가능한 고객사명 입니다";
									span.style.color="green";
									e.target.parentNode.appendChild(span);
									company_name.value = strOrigin;
								}
							}
						});
					};
					nameFlag=true;
					var span=cf.mkTag("span", cell);
					span.textContent = "";
					span.style.color="green";
					span.id = "nameChk";			
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="company_eng";
					ipt.id="company_eng";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			//영업 담당자 수정
			if(i==1){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="chairman";
					ipt.id="chairman";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="sales_customer";
					ipt.id="sales_customer";
					ipt.type="hidden";
					ipt.value=arr[i][j+1];
					
					var dv=cf.mkTag("div",cell);
					dv.style.border="1px solid #dbdbdb";
					dv.style.width="130px";
					dv.style.height="26px";
					dv.style.float="left";
					dv.style.overflowY="auto";
					dv.id="sales_customer_layer";
					//
					salesCustomerLayer2(dv, arr[i][j], arr[i][j+1]);
					
					var img=cf.mkTag("img",cell);
					img.src="/images/ico/btn_search_small.png";
					img.style.verticalAlign="middle";
					img.style.padding="5px";
					img.onclick=function(e){
						salesCustomerPop();
						//salesSrchPop();
					};
				}
			}			
			if(i==2){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="business_category";
					ipt.id="business_category";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}
				if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="business_condition";
					ipt.id="business_condition";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==3){
				if(j==1){
					var ipt=cf.mkTag("input",cell),
						dupNumber=arr[i][j];
					ipt.name="company_reg_number";
					ipt.id="company_reg_number";
					ipt.value=dupNumber;
					ipt.placeholder="000-00-00000";
					cf.setCss(ipt,{width:125+"px"});
					ipt.onkeyup=function(e){
						checkChar(e,this);
						var cmpValue = e.target.value;
						cmpValue = checkDigit(cmpValue);
						if(dupNumber != e.target.value){
							dupFlag = false;
							var span = document.getElementById('duplicateChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					ipt.onblur=function(e){
						if(!dupFlag){
							var span = document.getElementById('duplicateChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					var btn=cf.mkTag("button", cell);
					btn.id = "nameImg";
					btn.style.marginLeft = "10px";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						dupFlag = false;
						var company_reg_number = document.getElementById("company_reg_number"),
							strOrigin=company_reg_number.value,
							compareValue =dupNumber,
							str = checkDigit(strOrigin);
						compareValue = checkDigit(compareValue);
					 	len = str.length;
					 	var strValue = parseInt(str) + "";
						if(len==10){
							strOrigin = str.replace(/([0-9]{3})([0-9]{2})([0-9]{5})/,"$1-$2-$3");
						}else if(len==0){
							generalPopOk("사업자등록번호를 입력해주세요.",function(){
								dupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								company_reg_number.focus();
							});
							return false;
						}else{
							generalPopOk("잘못된 사업자등록번호입니다.",function(){
								dupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								company_reg_number.focus();
							});
							return false;
						}
						if(strValue == "0"){
							generalPopOk("사업자등록번호를 입력해주세요.",function(){
								dupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								company_reg_number.focus();
							});
							return false;
					 	}
						if(str == compareValue){
							dupFlag = true;
							var span = document.getElementById('duplicateChk');
							span.textContent = "사용가능한 번호 입니다.";
							span.style.color="green";
							company_reg_number.value = strOrigin;
							return false;
						}
						dupNumber = str;
						$.ajax({
						url: "/cop/chk_comapny_number",
						type: "POST",
						data: { "company_reg_number" : strOrigin },
						async: false,
						dataType: 'json',
						success: function (data) {
								if(parseInt(data) > 0){
									dupFlag = false;
									var span = document.getElementById('duplicateChk');
									span.textContent = "중복된 번호입니다";
									span.style.color="red";
									//company_reg_number.focus();
								}else{
									dupFlag = true;
									var span = document.getElementById('duplicateChk');
									span.textContent = "사용가능한 번호 입니다";
									span.style.color="green";
									//e.target.parentNode.appendChild(span);
									company_reg_number.value = strOrigin;
								}
							}
						});
					}
					dupFlag = true;
					var span=cf.mkTag("span", cell);
					span.textContent = "";
					span.style.color="green";
					span.id = "duplicateChk";
					
					var ipt_chk=cf.mkTag("input",cell),
						span_chk=cf.mkTag("span", cell);
					ipt_chk.name="company_reg_check";
					ipt_chk.id="company_reg_check";
					ipt_chk.type="checkbox";
					ipt_chk.value=prev.data[22];
					span_chk.innerHTML="모름";
					if(prev.data[22]==1||!arr[i][j]){
						ipt_chk.checked=true;
						ipt_chk.value=1;
						ipt.readOnly=true;
						ipt.bg("#ddd");
					}
					ipt_chk.onclick=function(e){
						var tt=e.target;
						if(tt.checked){
							tt.value=1;
							dupFlag = true;
							company_reg_number.value="";
							company_reg_number.readOnly=true;
							company_reg_number.bg("#ddd");
						}else{
							dupFlag = false;
							tt.value=0;
							company_reg_number.readOnly=false;
							company_reg_number.bg("#fff");
						}
					};
					cf.setCss(ipt_chk,{marginLeft:10+"px",marginRight:5+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="site_id";
					ipt.id="site_id";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==4){
				if(j==1){
					var ipt=cf.mkTag("input",cell),
						dupNumber=arr[i][j];
					ipt.name="corporate_number";
					ipt.id="corporate_number";
					ipt.value=dupNumber;
					ipt.placeholder="000000-0000000";
					cf.setCss(ipt,{width:125+"px"});
					ipt.onkeyup=function(e){
						checkChar(e,this);
						var cmpValue = e.target.value;
						cmpValue = checkDigit(cmpValue);
						if(dupNumber != e.target.value){
							cupFlag = false;
							var span = document.getElementById('duplicateChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					ipt.onblur=function(e){
						if(!cupFlag){
							var span = document.getElementById('duplicateChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					var btn=cf.mkTag("button", cell);
					btn.id = "nameImg";
					btn.style.marginLeft = "10px";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						cupFlag = false;
						var corporate_number = document.getElementById("corporate_number"),
							strOrigin=corporate_number.value,
							compareValue =dupNumber,
							str = checkDigit(strOrigin);
						compareValue = checkDigit(compareValue);
					 	len = str.length;
					 	var strValue = parseInt(str) + "";
						if(len==13){
							strOrigin = str.replace(/([0-9]{6})([0-9]{7})/,"$1-$2");
						}else if(len==0){
							generalPopOk("법인번호를 입력해주세요.",function(){
								cupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								corporate_number.focus();
							});
							return false;
						}else{
							generalPopOk("잘못된 법인등록번호입니다.",function(){
								cupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								corporate_number.focus();
							});
							return false;
						}
						if(strValue == "0"){
							generalPopOk("법인번호를 입력해주세요.",function(){
								cupFlag = false;
								var span = document.getElementById('duplicateChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								corporate_number.focus();
							});
							return false;
					 	}
						if(str == compareValue){
							cupFlag = true;
							var span = document.getElementById('duplicateChk');
							span.textContent = "사용가능한 번호 입니다.";
							span.style.color="green";
							corporate_number.value = strOrigin;
							return false;
						}
						dupNumber = str;
						$.ajax({
						url: "/cop/chk_corporate_number",
						type: "POST",
						data: { "corporate_number" : strOrigin },
						async: false,
						dataType: 'json',
						success: function (data) {
								if(parseInt(data) > 0){
									cupFlag = false;
									var span = document.getElementById('duplicateChk');
									span.textContent = "중복된 번호입니다";
									span.style.color="red";
									//company_reg_number.focus();
								}else{
									cupFlag = true;
									var span = document.getElementById('duplicateChk');
									span.textContent = "사용가능한 번호 입니다";
									span.style.color="green";
									//e.target.parentNode.appendChild(span);
									corporate_number.value = strOrigin;
								}
							}
						});
					}
					cupFlag = true;
					var span=cf.mkTag("span", cell);
					span.textContent = "";
					span.style.color="green";
					span.id = "duplicateChk";
					
					var ipt_chk=cf.mkTag("input",cell),
						span_chk=cf.mkTag("span", cell);
					ipt_chk.name="corporate_number_check";
					ipt_chk.id="corporate_number_check";
					ipt_chk.type="checkbox";
					ipt_chk.value=prev.data[22];
					span_chk.innerHTML="모름";
					if(prev.data[22]==1||!arr[i][j]){
						ipt_chk.checked=true;
						ipt_chk.value=1;
						ipt.readOnly=true;
						ipt.bg("#ddd");
					}
					ipt_chk.onclick=function(e){
						var tt=e.target;
						if(tt.checked){
							tt.value=1;
							cupFlag = true;
							corporate_number.value="";
							corporate_number.readOnly=true;
							corporate_number.bg("#ddd");
						}else{
							cupFlag = false;
							tt.value=0;
							corporate_number.readOnly=false;
							corporate_number.bg("#fff");
						}
					};
					cf.setCss(ipt_chk,{marginLeft:10+"px",marginRight:5+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="site_id";
					ipt.id="site_id";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==5){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="phone_number";
					ipt.id="phone_number";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
					ipt.onblur=function(e){
						chk_tel(e.target,this);
					};
					ipt.onkeypress=function(e){
						checkChar(e,this);
					};
					phoneSet(ipt);
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="main_fax";
					ipt.id="main_fax";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:125+"px"});
					ipt.onblur=function(e){
						chk_tel(e.target,this);
					};
					ipt.onkeypress=function(e){
						checkChar(e,this);
					};
					phoneSet(ipt);
				}
			}
			if(i==6){
				if(j==1){
					var p_div=cf.mkTag("div", cell);
					p_div.className="postDiv";
					
					var post1=cf.mkTag("input",p_div);
					post1.id="post1";
					post1.style.width=57+"px";
					post1.readOnly=true;
					post1.value = prev.data[21];
					post1.onclick= function() {
						getZipCodePop();
					};
					
					var span=cf.mkTag("span", p_div);
					 span.textContent = "  -  ";					 
					
					var post2=cf.mkTag("input",p_div);					
					post2.id="post2";
					post2.style.width=57+"px";
					post2.readOnly=true;
					post2.value = prev.data[22];
					post2.onclick= function() {
						getZipCodePop();
					};
					
					var zipcode=cf.mkTag("input",cell);
					zipcode.type="hidden";
					zipcode.id="zipcode";
					zipcode.name="zipcode";
					
					var btn=cf.mkTag("button", p_div);
					btn.id = "zipcodeImg";
					btn.style.marginLeft = "10px";
					btn.className="ct-btn blue td";
					btn.innerHTML="우편번호";
					btn.onclick = function(e){
						getZipCodePop();
					};	
					
					var ipt=cf.mkTag("input",cell);
					ipt.name="address";
					ipt.id="address";
					ipt.value=arr[i][j];
					ipt.readOnly=true;
					cf.setCss(ipt,{width:686+"px"});
					ipt.onclick= function() {
						getZipCodePop();
					};
				}
			}
			if(i==8){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="address_eng";
					ipt.id="address_eng";
					ipt.value=arr[i][j];
					cf.setCss(ipt,{width:686+"px"});
				}
			}
			if(i==9){
				if(j==1){
					var select=cf.mkTag("select",cell);
					select.name="charger_yn";
					select.id="charger_yn";
					mkSelectYN(select,arr[i][j]);
				}
				if(j==3){
					var select=cf.mkTag("select",cell);
					select.name="company_yn";
					select.id="company_yn";
					mkSelectYN(select,arr[i][j]);
				}
			}
			if(i==10){
				if(j==1){
					if(prev.data[9]){
						var aTagImg = cf.mkTag("img", cell);
						aTagImg.src = "/images/ico/ico_filedown.gif";
						aTagImg.onclick = function(){
							window.open(encodeURI("/cop/companyDownloadAjax?sh_company_id=" +prev.data[18]));
						}
						var aTag = cf.mkTag("a", cell);
						//aTag.href = 'javascript:window.open(encodeURI("/cop/companyDownloadAjax.do?sh_company_id=' + prev.obj.company_id + '"))';
						aTag.style.textDecoration="underline";
						aTag.style.cursor="pointer";
						aTag.textContent = prev.data[16];
						aTag.onclick = function(){
							window.open(encodeURI("/cop/companyDownloadAjax?sh_company_id=" + prev.data[18]));
						}
						var span= cf.mkTag("span", cell);
						span.style.paddingLeft="5px";
						var img= cf.mkTag("img", span);
						img.src="/images/common/btn_x.gif";
						
						img.onclick=function(){
							generalPop("삭제하시겠습니까?", function(){
								$.ajax({
									url: "/cop/deleteUploadfile",
									type: "POST",
									data: {"company_id" : prev.data[18]},
									async: false,
									dataType: "text",
									success : function (data) {
										if(data != "success") generalPop(data);
										else generalPop("삭제되었습니다.");
										aTagImg.outerHTML="";
										aTag.outerHTML="";
										span.innerHTML="";
										prev.childNodes[9].innerHTML="";
										prev.data[9]="";
										companySearchList();										
										$('.wrap-loading').hide(20);
									},
									beforeSend:function(){
										$('.wrap-loading').show();
									}
								});
							});
							//
						};
					}										
					var ipt=cf.mkTag("input",cell);
					ipt.id="uploadFile";
					ipt.type="file";
				}
			}
			if(i==11){
				if(j==1){
					var ipt=cf.mkTag("textarea",cell);
					ipt.name="etc";
					ipt.id="etc";
					ipt.style.width=95+"%";
					ipt.style.height=80+"px";
					ipt.value=arr[i][j];
				}
			}
		}
	}
};
function mkBottomTableHead(p){
	var arr=[["이름","부서","직책","E-mail","휴대폰","전화번호","Fax","세금계산서"]];
    	var tb=cf.mkTag("table",p);
    	tb.cellpadding=0;
    	tb.cellspacing=0;
    	tb.className="Normal_table";
    	arr.trav(function(ar,i){
    		var tr=cf.mkTag("tr",tb);
    		ar.trav(function(d,j){
				var td=cf.mkTag("th",tr);
				td.innerHTML=d;
				if(j==7)td.className="right";
				if(i==0){
					if(j==0)cf.setCss(td,{width:109+"px"});
					else if(j==1||j==2)cf.setCss(td,{width:109+"px"});
					else if(j==3)cf.setCss(td,{width:129+"px"});
					else if(j==4||j==5||j==6)cf.setCss(td,{width:109+"px"});
				}
    		});
    	});
    	return tb;
};
function mkBottomTable(tbd,arr){
	tbd.innerHTML="";
	cf.setCss(tbd,{width:100+"%",wordBreak:"break-all"});
	var len=arr.length;
	if(len==0){
		var tr=cf.mkTag("tr",tbd);
		tr.style.textAlign="center";

		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="8";
		td.innerHTML="담당자가 없습니다.";
		
	}else{
		arr.trav(function(d,i){
			var tr=cf.mkTag("tr",tbd);
			tr.style.textAlign="center";
			
			for(var j=0, lng=8;j<lng;j++){
				var td=cf.mkTag("td",tr);
				td.innerHTML=arr_sub[i][j];
				if(j==7) td.className="right";
				if(i==0){
					if(j==0)cf.setCss(td,{width:109+"px"});
					else if(j==1||j==2)cf.setCss(td,{width:109+"px"});
					else if(j==3)cf.setCss(td,{width:129+"px"});
					else if(j==4||j==5||j==6)cf.setCss(td,{width:109+"px"});
				}
			}
		});
	}	
};
//damdang profile
function inputBottomTable(tbd,arr){
	tbd.innerHTML="";
	cf.setCss(tbd,{width:100+"%",wordBreak:"break-all"});
	arr.trav(function(d,i){
		var tr=cf.mkTag("tr",tbd);
		for(var j=0, lng=9;j<lng;j++){
			var td=cf.mkTag("td",tr);
			td.style.textAlign="center";		
			if(j==0){
				var ipt=cf.mkTag("input",td);
				ipt.type="hidden";
				ipt.name="customer_id";
				ipt.value=d[9];
				
				var ipt=cf.mkTag("input",td);
				ipt.type="hidden";
				ipt.name="in_sub_company_id";
				ipt.value=d[10];
				
				var ipt=cf.mkTag("input",td);
				ipt.type="checkbox";
				ipt.name="customercheckbox";
				ipt.className="customer_id";
				com_checks.push(ipt);
			}else if(j==1){
				var ipt=cf.mkTag("input",td);
				ipt.name="customer_name";
				ipt.className="input_han";
				ipt.value=d[j];
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==2){
				var ipt=cf.mkTag("input",td);
				ipt.name="division";
				ipt.className="input_han";
				ipt.value=d[j];
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==3){
				var ipt=cf.mkTag("input",td);
				ipt.name="job_title";
				ipt.className="input_han";
				ipt.value=d[j];
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==4){
				var ipt=cf.mkTag("input",td);
				ipt.name="email";
				ipt.className="input_eng";
				ipt.value=d[j];
				ipt.onblur=function(e){
					chk_email(e.target,this);
				};
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==5){
				var ipt=cf.mkTag("input",td);
				ipt.name="mobile";
				ipt.value=d[j];
				ipt.onblur=function(e){
					chk_tel(e.target,this);
					//chk_tel_new(e.target);
				};
				ipt.onkeypress=function(e){
					checkChar(e,this);
				};
				mobileSet(ipt);
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==6){
				var ipt=cf.mkTag("input",td);
				ipt.name="sub_phone_number";
				ipt.value=d[j];
				ipt.onblur=function(e){
					chk_tel(e.target,this);
					//chk_tel_new(e.target);
				};
				ipt.onkeypress=function(e){
					checkChar(e,this);
				};
				phoneSet(ipt);
				cf.setCss(ipt,{width:90+"%"});
			}else if(j==7){
				var ipt=cf.mkTag("input",td);
				ipt.name="fax";
				ipt.value=d[j];
				ipt.onblur=function(e){
					chk_tel(e.target,this);
					//chk_tel_new(e.target);
				};
				ipt.onkeypress=function(e){
					checkChar(e,this);
				};
				phoneSet(ipt);
				cf.setCss(ipt,{width:95+"%"});
			}else if(j==8){
				td.className="right";
				var def=d[j];
				var select=cf.mkTag("select",td);
				select.name="invoice_gb";
				mkSelectYN(select, def);
			}			
			if(i==0){
				if(j==0)cf.setCss(td,{width:29+"px"});
				else if(j==1)cf.setCss(td,{width:79+"px"});
				else if(j==2||j==3)cf.setCss(td,{width:109+"px"});
				else if(j==4)cf.setCss(td,{width:129+"px"});
				else if(j==5||j==6||j==7)cf.setCss(td,{width:109+"px"});
			}
		}
	});
};