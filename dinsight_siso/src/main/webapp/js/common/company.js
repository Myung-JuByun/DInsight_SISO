var prev_com;	//고객검색데이터
var addr_gubun;   //주소검색시 선택사항(도로명/지번)
var msg;        //주소검색시 선택명칭 label
var dupFlag=false,dupNumber="",nameFlag=false,oriName="",cupFlag=false;

//고객사 검색
function companyPopSrch(flag,fnc){
	if(flag==0){
		var name=document.getElementById("searchCompany"),
			tbd=document.getElementById("companyView");		
		if(!name){
			companySrchPop("",fnc);
		}else{
			$.ajax({
				url: "/cop/customerAdminAjax",
				type: "POST",
				data: { "searchString" : name.value ,"business_category" : "", "business_condition" : "" },
				async: true,
				dataType: 'json',
				success: function (data) {
					compop_obj=data.customerList;
					calldataset();
					$('.wrap-loading').hide(20);
				},beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
			function calldataset(){
				companyPopDataSet();
				companySrchPop(compop_obj,fnc);
			};
		}
		
		/*callCustomerAdminData(obj,function (data){
			compop_obj=data.customerList;
		});
		companyPopDataSet();
		companySrchPop(compop_obj,fnc);*/
	}else if(flag==1){
		var name=document.getElementById("searchCompany"),
			tbd=document.getElementById("companyView");		
		if(!name)name="";
		else name=name.value;
		
		$.ajax({
			url: "/cop/customerAdminAjax",
			type: "POST",
			data: { "searchString" : name ,"business_category" : "", "business_condition" : "" },
			async: true,
			dataType: 'json',
			success: function (data) {
				compop_obj=data.customerList;
				calldataset();
				$('.wrap-loading').hide(20);
			},beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
		function calldataset(){
			companyPopDataSet();
			companyList(tbd,compop_obj);
		};
		
		/*var	obj={ "searchString" : name ,"business_category" : "", "business_condition" : "" };
		callCustomerAdminData(obj,function (data){
			compop_obj=data.customerList;
		});
		companyPopDataSet();
		companyList(tbd,compop_obj);
		//callCustomerAdminData(obj,function (data){
		//	companyList(tbd,data.customerList);
		//});*/
	}
};
function companyPopDataSet(){
	var ar=[];
	if(compop_obj&&compop_obj.length>0){
		compop_obj.trav(function(d,i){
			if(!d.company_name) d.company_name="";
			if(!d.company_eng) d.company_eng="";
			if(!d.chairman) d.chairman="";
			if(!d.sales_customer) d.sales_customer="";
			if(!d.business_category) d.business_category="";
			if(!d.business_condition) d.business_condition="";
			if(!d.company_reg_number)d.company_reg_number="";
			if(!d.corporate_number)d.corporate_number="";
			if(!d.site_id)d.site_id="";
			if(!d.company_file_id) d.company_file_id="";
			if(!d.company_file_name) d.company_file_name="";
			if(!d.company_file_path)d.company_file_path="";
			if(!d.phone_number) d.phone_number="";
			if(!d.fax) d.fax="";
			if(!d.address)d.address="";
			if(!d.address_eng) d.address_eng="";
			if(!d.charger_yn) d.charger_yn="";
			if(!d.company_yn)d.company_yn="";
			if(!d.company_id)d.company_id="";
			if(!d.build_mng_no)d.build_mng_no="";
			if(!d.creator)d.creator="";
			if(!d.post1)d.post1="";
			if(!d.post2)d.post2="";
			if(!d.company_reg_check)d.company_reg_check="";
			ar.push([d.company_name,d.company_eng,d.chairman,d.sales_customer,d.business_category,d.business_condition,d.company_reg_number,d.corporate_number,d.site_id,
			         d.company_file_id,d.phone_number,d.fax,d.address,d.address_eng,d.charger_yn,d.company_yn,d.company_file_name,d.company_file_path,d.company_id,
			         d.build_mng_no,d.creator,d.post1,d.post2,d.company_reg_check]);
		});
	}
	q.reg("companypoplist01",{
		arr:ar,
		header:["company_name","company_eng","chairman","sales_customer","business_category","business_condition","company_reg_number","corporate_number","site_id","company_file_id",
		        "phone_number","fax","address","address_eng","charger_yn","company_yn","company_file_name","company_file_path","company_id","build_mng_no","creator",
		        "post1","post2","company_reg_check"],
		meta:["string","string","string","string","string","string","string","string","string","string","string","string","string","string","string","string","string"
		      ,"string","string","string","string","string","string","number"]
	});
};
function companySrchPop(obj,fnc){
	var con=document.createElement("div");
	con.id="scrFull";
	con.style.width=1150+"px";
	con.style.height=cf.workareaheight-107+"px";;
	con.style.position="absolute";
	
	con.innerHTML="";	
	var con0=cf.mkTag("div",con);
	//con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=1150+"px";
	con1.style.height=cf.workareaheight-107+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="고객사 조회";
	
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	var con2_img=cf.mkTag("img",con2_a);
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	con3.style.height=cf.workareaheight-220+"px";
	
	var search=cf.mkTag("div",con3);
	search.className="search_pop";
	
	var span=cf.mkTag("span", search);
	span.style.fontWeight="bold";
	span.innerHTML="고객사명&nbsp;&nbsp;";
	var ipt=cf.mkTag("input",search);
	ipt.size="39";
	ipt.id="searchCompany";
	ipt.className="input_han";
	ipt.onkeypress=function(e){
		if(e.keyCode==13){
			companyPopSrch(1);
		}
	};
	
	var img=cf.mkTag("img",search);
	img.src="/images/btn/btn_go2.gif";
	img.style.verticalAlign="middle";
	img.onclick=function(){
		companyPopSrch(1);
	};
	
	//고객사list
	var con4=cf.mkTag("div",con3),
		con4_top=cf.mkTag("div",con4),
		con4_title=cf.mkTag("div",con4_top),
		con4_btndbv=cf.mkTag("div",con4_top),
		con4_img1=cf.mkTag("img",con4_btndbv);
	con4.className="con_table";	
	con4_title.className="mini_title";
	con4_title.innerHTML="고객사 정보";
	con4_img1.className="cursor";	
	con4_img1.src="/images/btn/btn_plus_on.gif";
	con4_img1.onclick=function(){
		companyPopAdd();
	};
	cf.setCss(con4_top,{height:30+"px"});
	cf.setCss(con4_title,{position:"absolute",left:25+"px",marginTop:10+"px"});
	cf.setCss(con4_btndbv,{position:"absolute",right:25+"px"});
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
		
	companyListHead(con5);
	
	var con6=cf.mkTag("div",con5);
	con6.style.overflowY="scroll";
	con6.style.height=cf.workareaheight-361+"px";;
	con6.className="";
	
	var table=cf.mkTag("table",con6);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	table.id="companyView";
	
	companyList(table,obj,fnc);
	var cl=cf.mkTag("div",con1);
	cl.className="clear";
	var con7=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con7),
		btn2=cf.mkTag("button",con7);
	
	con7.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn1.innerHTML="선택";
	btn1.onclick=function(){
		if(fnc) fnc(prev_com.obj);
		else companySave(prev_com.obj);
	};	
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function companyList(son,obj,fnc){
	prev_com="";
	son.innerHTML="";
	
	if(!obj||obj.length==0){
		var tr=cf.mkTag("tr",son),
			td1=cf.mkTag("td",tr);
		tr.style.textAlign="center";
		td1.colSpan=9;
		td1.className="right";
		td1.innerHTML="조회된 데이터가 없습니다.";
	}else{
		obj.trav(function(d,i){
			var tr=cf.mkTag("tr",son);
			tr.style.textAlign="center";
			tr.style.cursor="pointer";
			tr.onclick=function(){
				if(!prev_com){
					this.style.backgroundColor="#edfafb";
				}else{
					prev_com.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev_com=this;
				prev_com.obj=d;
			};
			tr.ondblclick=function(){
				if(!prev_com){
					this.style.backgroundColor="#edfafb";
				}else{
					prev_com.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev_com=this;
				prev_com.obj=d;
				
				if(fnc)fnc(prev_com.obj);
				else companySave(prev_com.obj);
			};
			var charger_yn="", company_yn="";
			
			if(d.charger_yn=="0") charger_yn="N";
			if(d.charger_yn=="1") charger_yn="Y";
			
			if(d.company_yn=="0") company_yn="N";
			if(d.company_yn=="1") company_yn="Y";
			
			var td1=cf.mkTag("td",tr);
			td1.style.width=119+"px";
			td1.innerHTML=d.company_name;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width=84+"px";
			td2.innerHTML=d.chairman;
			
			var td3=cf.mkTag("td",tr);
			td3.style.width=129+"px";
			td3.innerHTML=d.business_category;
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=129+"px";
			td4.innerHTML=d.business_condition;
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=119+"px";
			td5.innerHTML=d.company_reg_number;
			
			var td6=cf.mkTag("td",tr);
			td6.style.width=119+"px";
			td6.innerHTML=d.corporate_number;
			
			var td7=cf.mkTag("td",tr);
			td7.style.width=109+"px";
			td7.innerHTML=d.phone_number;
			
			var td8=cf.mkTag("td",tr);
			td8.innerHTML=d.address;
			
			var td9=cf.mkTag("td",tr);
			td9.style.width=44+"px";
			td9.innerHTML=charger_yn;
			
			var td10=cf.mkTag("td",tr);
			td10.style.width=44+"px";
			td10.className="right";
			td10.innerHTML=company_yn;
			
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
				cf.setCss(td7,{borderTop:0+"px"});
				cf.setCss(td8,{borderTop:0+"px"});
				cf.setCss(td9,{borderTop:0+"px"});
				cf.setCss(td10,{borderTop:0+"px"});
			}
		});
	}	
};
function companyListHead(son){
	var arr=[["고객사","대표명","업태","업종","사업자등록번호","법인번호","전화번호","주소","거래처여부","고객사여부"]];
	var div=cf.mkTag("div",son);
	div.style.overflowY="scroll";
    var tb=cf.mkTag("table",div);
    	tb.cellpadding=0;
    	tb.cellspacing=0;
    	tb.className="Normal_table";
    	arr.trav(function(ar,i){
    		var tr=cf.mkTag("tr",tb);
    		ar.trav(function(d,j){
				td=cf.mkTag("th",tr);
				td.innerHTML=d;
				if(j==0)td.style.width=119+"px";
				if(j==1)td.style.width=84+"px";
				if(j==2)td.style.width=129+"px";
				if(j==3)td.style.width=129+"px";
				if(j==4)td.style.width=119+"px";
				if(j==5)td.style.width=119+"px";
				if(j==6)td.style.width=109+"px";
				if(j==8)td.style.width=44+"px";
				if(j==9){
					td.style.width=44+"px";
					td.className="right";
				}
    		});
    	});
};
function companyPopAdd(){
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
		copSave(con,1);
	};
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onmousedown=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function mkHeadTable(p,opt){
	//opt==true 면 추가,수정
	var arr=[];
	if(opt){
		arr=[["고객사명(한글)","","고객사명(영문)",""],["대표자명","","영업 담당자",""],["업태","","업종",""],["사업자등록번호","","Site ID",""],["법인번호",""],["전화번호","","fax",""],["주소","","",""],
		     ["주소","","",""],["주소(영문)","","",""],["거래처여부","","고객사여부",""],["사업자등록증 첨부",""],["기타정보",""]];	
	}else arr=[["고객사명(한글)","","고객사명(영문)",""],["대표자명","","영업 담당자",""],["업태","","업종",""],["사업자등록번호","","Site ID",""],["법인번호",""],["전화번호","","fax",""],["주소","","",""],
	          ["주소(영문)","","",""],["거래처여부","","고객사여부",""],["사업자등록증 첨부",""],["기타정보",""]];
	var tb=cf.mkTag("table",p);
	tb.cellpadding=0;
	tb.cellspacing=0;
	tb.className="Normal_table_pop";
	arr.trav(function(ar,i){
		var tr=cf.mkTag("tr",tb);
		ar.trav(function(d,j){      //0512수정
			var td=cf.mkTag("td",tr);
			td.id="tdref";
			td.className="pd10";
			if(opt){
				if(i==4||i==6||i==7||i==8||i==10||i==11){
					if(i==7)td.style.display="none";
					if(j==1){
						td.colSpan="3";
						td.className="right pd10";
						return true;
					}
				}
				if(j==0){
					cf.killTag(td);
					td=cf.mkTag("th",tr);
					td.style.width=105+"px";
					if(i==6)td.rowSpan="2";
					if(i==7)cf.killTag(td);					
					td.innerHTML=d;					
					if(opt&&(i==0||i==3||i==4||i==5)){
						var span=cf.mkTag("span",td);
						span.className="asterisk";
						span.innerHTML="*";
					}
				}
				if(j==2){
					cf.killTag(td);
					 td=cf.mkTag("th",tr);
					 td.style.width=105+"px";
					 td.innerHTML=d;
				}
				if(j==3)td.className="right pd10";
			}else{
				if(i==6||i==7||i==9||i==10){
					if(j==1){
						td.colSpan="3";
						td.className="right pd10";
						return true;
					}
				}

				if(j==0){
					cf.killTag(td);
					td=cf.mkTag("th",tr);
					td.style.width=105+"px";
					td.innerHTML=d;			
					if(opt&&(i==0||i==3||i==4||i==5)){
						var span=cf.mkTag("span",td);
						span.className="asterisk";
						span.innerHTML="*";
					}
				}
				if(j==2){
					if(i==0||i==1||i==2||i==3||i==4||i==5||i==8){
						cf.killTag(td);
						td=cf.mkTag("th",tr);
						td.style.width=105+"px";
						td.innerHTML=d;
					}
				}
				if(j==3)td.className="right pd10";
			}
		});
	});
	return tb;
};
function setInput(tbl){
	for(var i=0, lng=tbl.children.length;i<lng;i++){
		var row=tbl.children[i];
		for(var j=0, jng=row.children.length;j<jng;j++){
			var cell=row.children[j];
			if(i==0){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="company_name";
					ipt.id="company_name";
					cf.setCss(ipt,{width:125+"px"});
					ipt.onblur=function(e){
						if(!nameFlag){
							var span = document.getElementById('nameChk');
							span.textContent = "중복체크를 하셔야 합니다.";
							span.style.color="blue";
						}
					};					
					var btn=cf.mkTag("button", cell);
					btn.id = "nameImg";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						nameFlag = false;
						var company_name=document.getElementById("company_name"),
							strOrigin=company_name.value;
						if(!strOrigin){
							generalPopOk("고객사명을 입력해주세요.",function(){
								nameFlag = false;
								var span = document.getElementById('nameChk');
								span.textContent = "중복 체크를 하셔야합니다.";
								span.style.color="blue";
								company_name.focus();
							});
							return false;
					 	}else{
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
					 	}
					};
					//nameFlag=true;		
					var span=cf.mkTag("span", cell);
					span.textContent = "중복체크를 하셔야 합니다";
					span.style.color="blue";
					span.id = "nameChk";
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="company_eng";
					ipt.id="company_eng";
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==1){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="chairman";
					ipt.id="chairman";
					cf.setCss(ipt,{width:125+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="sales_customer";
					ipt.id="sales_customer";
					ipt.type="hidden";
					ipt.value="";
										
					var dv=cf.mkTag("div",cell);
					dv.style.border="1px solid #dbdbdb";
					dv.style.width="130px";
					dv.style.height="26px";
					dv.style.float="left";
					dv.style.overflowY="auto";
					dv.id="sales_customer_layer";
					
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
					cf.setCss(ipt,{width:125+"px"});
				}
				if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="business_condition";
					ipt.id="business_condition";
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==3){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="company_reg_number";
					ipt.id="company_reg_number";
					ipt.placeholder="000-00-00000";
					cf.setCss(ipt,{width:125+"px"});
					ipt.onblur=function(e){
						if(!dupFlag){
							var span = document.getElementById('duplicateChk');
							span.textContent = "중복체크를 하셔야 합니다";
							span.style.color="blue";
						}
					};					
					regSet(ipt);
					var btn=cf.mkTag("button", cell);
					btn.id = "duplicateImg";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						dupFlag = false;
						var company_reg_number = document.getElementById("company_reg_number");
						var strOrigin=company_reg_number.value;
						var str = checkDigit(strOrigin);
					 	len = str.length;
					 	var strValue = parseInt(str) + "";
						if(len==10){
							strOrigin = str.replace(/([0-9]{3})([0-9]{2})([0-9]{5})/,"$1-$2-$3");
						}else if(len==0){
							generalPopOk("사업자등록번호를 입력해주세요.",function(){
								  dupFlag = false;
								  var span = document.getElementById('duplicateChk');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								  company_reg_number.focus();
							});
							return false;
						}else{
							generalPopOk("잘못된 사업자등록번호입니다.",function(){
								 dupFlag = false;
								  var span = document.getElementById('duplicateChk');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								company_reg_number.focus();
							});
							return false;
						}						
						if(strValue == "0"){
							generalPopOk("사업자등록번호를 입력해주세요.",function(){
								 dupFlag = false;
								  var span = document.getElementById('duplicateChk');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								company_reg_number.focus();
							});
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
									  span.textContent = "중복된 번호 입니다";
									  span.style.color="red";
									  //company_reg_number.focus();
								  }else{
									  dupFlag = true;
									  //var span = document.createElement('span');
									  var span = document.getElementById('duplicateChk');
									  span.textContent = "사용가능한 번호 입니다";
									  span.style.color="green";
									  span.id = "duplicateChk";
									 // e.target.parentNode.appendChild(span);
									  company_reg_number.value = strOrigin;
								  }
							  }
						});	
					};
					var span=cf.mkTag("span", cell);
					span.textContent = "중복체크를 하셔야 합니다";
					span.style.color="blue";
					span.id = "duplicateChk";
					
					var ipt_chk=cf.mkTag("input",cell),
						span_chk=cf.mkTag("span", cell);
					ipt_chk.name="company_reg_check";
					ipt_chk.id="company_reg_check";
					ipt_chk.type="checkbox";
					span_chk.innerHTML="모름";
					ipt_chk.onclick=function(e){
						var tt=e.target;
						if(tt.checked){
							tt.value=1;
							dupFlag = true;
							company_reg_number.value="";
							company_reg_number.readOnly=true;
							company_reg_number.bg("#ddd");
						}else{
							tt.value=0;
							dupFlag = false;
							company_reg_number.readOnly=false;
							company_reg_number.bg("#fff");
						}
					};
					cf.setCss(ipt_chk,{marginLeft:10+"px",marginRight:5+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="site_id";
					ipt.id="site_id";
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==4){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="corporate_number";
					ipt.id="corporate_number";
					ipt.placeholder="000000-0000000";
					cf.setCss(ipt,{width:125+"px"});
					ipt.onblur=function(e){
						if(!cupFlag){
							var span = document.getElementById('duplicateChk2');
							span.textContent = "중복체크를 하셔야 합니다";
							span.style.color="blue";
						}
					};					
					corporateSet(ipt);
					var btn=cf.mkTag("button", cell);
					btn.id = "duplicateImg2";
					btn.className="ct-btn blue td";
					btn.innerHTML="중복체크";
					cf.setCss(btn,{marginLeft:10+"px",marginRight:10+"px"});
					btn.onclick = function(e){
						cupFlag = false;
						var corporate_number = document.getElementById("corporate_number");
						var strOrigin=corporate_number.value;
						var str = checkDigit(strOrigin);
					 	len = str.length;
					 	var strValue = parseInt(str) + "";
						if(len==13){
							strOrigin = str.replace(/([0-9]{6})([0-9]{7})/,"$1-$2");
						}else if(len==0){
							generalPopOk("법인번호를 입력해주세요.",function(){
								cupFlag = false;
								  var span = document.getElementById('duplicateChk2');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								  corporate_number.focus();
							});
							return false;
						}else{
							generalPopOk("잘못된 법인번호입니다.",function(){
								cupFlag = false;
								  var span = document.getElementById('duplicateChk2');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								  corporate_number.focus();
							});
							return false;
						}						
						if(strValue == "0"){
							generalPopOk("법인번호를 입력해주세요.",function(){
								cupFlag = false;
								  var span = document.getElementById('duplicateChk2');
								  span.textContent = "중복체크를 하셔야 합니다";
								  span.style.color="blue";
								  corporate_number.focus();
							});
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
									  var span = document.getElementById('duplicateChk2');
									  span.textContent = "중복된 번호 입니다";
									  span.style.color="red";
									  //company_reg_number.focus();
								  }else{
									  cupFlag = true;
									  //var span = document.createElement('span');
									  var span = document.getElementById('duplicateChk2');
									  span.textContent = "사용가능한 번호 입니다";
									  span.style.color="green";
									  span.id = "duplicateChk";
									 // e.target.parentNode.appendChild(span);
									  corporate_number.value = strOrigin;
								  }
							  }
						});	
					};
					var span=cf.mkTag("span", cell);
					span.textContent = "중복체크를 하셔야 합니다";
					span.style.color="blue";
					span.id = "duplicateChk2";
					
					var ipt_chk=cf.mkTag("input",cell),
						span_chk=cf.mkTag("span", cell);
					ipt_chk.name="corporate_number_check";
					ipt_chk.id="corporate_number_check";
					ipt_chk.type="checkbox";
					span_chk.innerHTML="모름";
					ipt_chk.onclick=function(e){
						var tt=e.target;
						if(tt.checked){
							tt.value=1;
							cupFlag = true;
							corporate_number.value="";
							corporate_number.readOnly=true;
							corporate_number.bg("#ddd");
						}else{
							tt.value=0;
							cupFlag = false;
							corporate_number.readOnly=false;
							corporate_number.bg("#fff");
						}
					};
					cf.setCss(ipt_chk,{marginLeft:10+"px",marginRight:5+"px"});
				}else if(j==3){
					var ipt=cf.mkTag("input",cell);
					ipt.name="site_id";
					ipt.id="site_id";
					cf.setCss(ipt,{width:125+"px"});
				}
			}
			if(i==5){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="phone_number";
					ipt.id="phone_number";
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
			if(i==6){    //0512수정
				if(j==1){
					cell.style.height=66+"px";
					var p_div=cf.mkTag("div", cell);
					p_div.className="postDiv";
					
					var post1=cf.mkTag("input",p_div);
					post1.id="post1";
					post1.style.width=60+"px";
					post1.readOnly=true;
					
					var span=cf.mkTag("span", p_div);
					 span.textContent = "  -  ";
					
					var post2=cf.mkTag("input",p_div);					
					post2.id="post2";
					post2.style.width=60+"px";
					post2.readOnly=true;
					
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
					ipt.readOnly=true;
					ipt.placeholder="선택하세요";
					cf.setCss(ipt,{width:686+"px"});
				}
			}
			if(i==8){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.name="address_eng";
					ipt.id="address_eng";
					cf.setCss(ipt,{width:686+"px"});
				}
			}
			if(i==9){
				if(j==1){
					var select=cf.mkTag("select",cell);
					select.name="charger_yn";
					select.id="charger_yn";
					var def=1;
					mkSelectYN(select,def);
				}
				if(j==3){
					var select=cf.mkTag("select",cell);
					select.name="company_yn";
					select.id="company_yn";
					var def=1;
					mkSelectYN(select,def);
				}
			}
			if(i==10){
				if(j==1){
					var ipt=cf.mkTag("input",cell);
					ipt.id="uploadFile";
					ipt.type="file";
				}
			}
			if(i==11){
				if(j==1){
					var ipt=cf.mkTag("textarea",cell);
					ipt.id="etc";
					ipt.name="etc";
					ipt.style.width=95+"%";
					ipt.style.height=80+"px";
				}
			}
		}
	}
};

//주소검색 창 띄우기
function getZipCodePop() {
	addr_gubun = "S";  //도로명선택(default)
	//바탕 선택 못하도록 막는 레이어
	var pop_Window=document.createElement("div");
	pop_Window.id="pop_win";
	pop_Window.style.width = cf.workareawidth-100+"%";
	pop_Window.style.height = cf.workareaheight-250+"%";
	pop_Window.style.position = "absolute";
	
	//주소찾기 전체창 설정
	var winZip=cf.mkTag("div",pop_Window);
	winZip.id="win_zipcode";
	var cw=screen.availWidth;     //화면 넓이
	var ch=screen.availHeight;    //화면 높이
	sw=400;    //띄울 창의 넓이
	sh=535;    //띄울 창의 높이
	
	winZip.style.top = (ch-sh)/3+"px";  //가운데 띄우기위한 창의 y위치
	winZip.style.left = (cw-sw)*2/5+"px"; //가운데 띄우기위한 창의 x위치
	
	winZip.style.width=sw+"px";
	winZip.style.height = sh+"px";
	winZip.style.position = "absolute";
	winZip.style.backgroundColor="white";
	winZip.style.border=1+"px solid black";
	
	var con3=cf.mkTag("div",winZip);
	con3.className="prt_top my_top";
	
	var con3_text=cf.mkTag("span",con3);
	con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;우편번호 찾기";
	
	var con3_a=cf.mkTag("a",con3);
	con3_a.href="#";
	con3_a.className="printClose";
	var con3_img=cf.mkTag("img",con3_a);
	con3_img.src="/images/pop_btn/btn_pop_close.png";
	con3_img.alt="닫기";
	con3_img.align="right";
	con3_img.onclick=function(){
		cf.killTag(pop_Window.parentNode);
	};
/////////////////////////////////////////////////////////////
///                                                       ///
///        주소 찾기 화면 제어 (default: 도로명)                   ///
///                                                       ///
/////////////////////////////////////////////////////////////

	/*  주소 검색 화면 내부 그리기
	 *  div_street = 도로명 주소검색 화면 탭
	*/
	var div_addr_list=cf.mkTag("div",winZip);
	div_addr_list.className = "pop_zipcode";
	div_addr_list.style.display = "block";
	div_addr_list.id="addr_list";
	//div_addr_list.style.width=90+"%";
	div_addr_list.style.height = 92+"%";

//------------------------주소찾기 Title -------------------------------------	
	/*var zip_title=cf.mkTag("h1",div_addr_list);
	zip_title.innerHTML="우편번호 찾기";*/
	
	var ul_zip_type = cf.mkTag("ul", div_addr_list);
	ul_zip_type.id="ul_zip_type";
	ul_zip_type.className="zipcode_type";
	
	var div_tab_road=cf.mkTag("li",ul_zip_type);
	div_tab_road.id="tab_road";
	div_tab_road.className="selected";
	var street_addr_link=cf.mkTag("a",div_tab_road);
	street_addr_link.href="#";
	street_addr_link.innerHTML="도로명주소";
	street_addr_link.onclick=function(){
		addr_gubun ="S";
		goTab(addr_gubun); 
		return false;
	};

	var div_tab_jibun=cf.mkTag("li",ul_zip_type);
	div_tab_jibun.id="tab_jibun";
	var jibun_addr_link=cf.mkTag("a",div_tab_jibun);
	jibun_addr_link.style.cursor="pointer";
	jibun_addr_link.href="#";
	jibun_addr_link.innerHTML="지번주소";
	jibun_addr_link.onclick=function(){
		addr_gubun ="J";
		goTab(addr_gubun); 
		return false;
	};

/**
 * 도로명주소/지번주소 선택시 아래 div의 ID로 내용 변경
 * desc_addr_name: 설명 변경  [도로명 + 건물번호 입력 / 검색하실 주소의 동/읍/면을 입력해 주세요.]
 * desc_addr_detail : 설명 예시 변경  [ (예: 올림픽로 326) / (예: 논현동) ]
 * addr_name_title : 검색어 레이블명 변경  [도로명/주소명]
 * addr_no_title : 주소상세검색어 레이블 변경 [건물번호/번지]
 */
//------------------------검색기준 설명-------------------------------------	
	var zip_desc=cf.mkTag("div",div_addr_list);
	zip_desc.id="field_set";
	zip_desc.className="zipcode_fieldset";
	cf.setCss(zip_desc,{height:145+"px"});
	//hidden - 주소구분(도로명선택/지번선택);
    var ipt_gubun=document.createElement("input");
    ipt_gubun.name="addr_gubun";
    ipt_gubun.id="addr_gubun";
    ipt_gubun.type="hidden";
    ipt_gubun.value="S";
    zip_desc.appendChild(ipt_gubun);
    
	if(addr_gubun=="J")msg="주소명";
	else msg="도로명";
    
	var zip_desc_p=cf.mkTag("p",zip_desc);
	zip_desc_p.id ="desc_addr_name";               //***도로명/지번 선택시미다 변경
	zip_desc_p.className="zipcode_dsc";
	zip_desc_p.innerHTML="도로명 + 건물번호 입력 ";       //검색하실 주소의 동/읍/면을 입력해 주세요
	var zip_desc_txt=cf.mkTag("span",zip_desc_p);
	zip_desc_txt.id ="desc_addr_detail";           //***도로명/지번 선택시미다 변경
	zip_desc_txt.className="ex";
	zip_desc_txt.innerHTML="(예: 올림픽로 326)";    //(예: 논현동)
//------------------------우편번호 검색 : 링크 ------------------------------------------
	var zip_code_search=cf.mkTag("p",zip_desc);
	zip_code_search.id = "zipcode_search";
	zip_code_search.className = "zipcode_dsc";
	zip_code_search.innerHTML="우편번호 검색";
		
	zip_code_search.onclick=function(){
		window.open("http://www.epost.go.kr/search.RetrieveIntegrationNewZipCdList.comm", 
				"우편번호 검색","width=600, height=674, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
	};
	zip_code_search.style.textDecoration="underline";
//------------------------검색조건: 시/도, 시/군/구 -------------------------------------
	var zip_fdset=cf.mkTag("fieldset",zip_desc);
	var zip_fdset_l0=cf.mkTag("legend",zip_fdset);
	zip_fdset_l0.innerHTML="주소선택필드";
	var zip_fdset_l1=cf.mkTag("label",zip_fdset);
	zip_fdset_l1.innerHTML="시/도";
	var sel_sido_nm=mkSidoSelect(zip_fdset);
	sel_sido_nm.name="sido_nm";
	sel_sido_nm.id="sido_nm";
	sel_sido_nm.className="form_txt";
	var zip_fdset_l2=cf.mkTag("label",zip_fdset);
	zip_fdset_l2.className="local";
	zip_fdset_l2.innerHTML="시/군/구";
	var sel_sigu_nm=mkSiguSelect(zip_fdset);
	sel_sigu_nm.name="sigu_nm";
	sel_sigu_nm.id="sigu_nm";
	sel_sigu_nm.className="form_txt";
//------------------------ 검색조건: 도로명+건물명 입력-------------------------------------			
	var zip_sch_area=cf.mkTag("div",zip_fdset);
	zip_sch_area.className="unit";
	var lbl_addr_name_title=cf.mkTag("label",zip_sch_area);
	lbl_addr_name_title.id="addr_name_title";
		lbl_addr_name_title.innerHTML=msg;
	var ipt_addr_nm=cf.mkTag("input",zip_sch_area);
	ipt_addr_nm.name="addr_nm";
	ipt_addr_nm.id="addr_nm";
	ipt_addr_nm.className="form_txt address input_han";
	ipt_addr_nm.onkeypress=function(e){
		if(e.keyCode==13){
			if(document.getElementById("sido_nm").value=="") {
				generalPopOk("시/도를 선택하세요.", function() {
					document.getElementById("sido_nm").selectedIndex=0;
					document.getElementById("sido_nm").focus();
				});
			}
			else if(document.getElementById("sigu_nm").value=="") {
				generalPopOk("시/군/구를 선택하세요.", function() {
					document.getElementById("sigu_nm").selectedIndex=0;
					document.getElementById("sigu_nm").focus();
				});
			}
			else if(document.getElementById("addr_nm").value=="") {
				generalPopOk(msg+"을 선택하세요.", function() {
					document.getElementById("addr_nm").focus();
				});
			}
			else {
				getAddressList();                               //DB조회
			}
			return false;
		}
	};
//------------------------ 검색조건: 건물번호 입력-------------------------------------			
	var zip_sch_area2=cf.mkTag("div",zip_fdset);
	zip_sch_area2.className="unit";
	lbl_addr_no_title=cf.mkTag("label",zip_sch_area2);
	lbl_addr_no_title.id="addr_no_title";
	lbl_addr_no_title.innerHTML="건물번호";
	var ipt_addr_pre_no=cf.mkTag("input",zip_sch_area2);
	ipt_addr_pre_no.name="build_main_no";
	ipt_addr_pre_no.id="build_main_no";
	ipt_addr_pre_no.className="form_txt bd_num";
	ipt_addr_pre_no.onkeypress=function(e){
		if(e.keyCode==13){
			if(document.getElementById("sido_nm").value=="") {
				generalPopOk("시/도를 선택하세요.", function() {
					document.getElementById("sido_nm").selectedIndex=0;
					document.getElementById("sido_nm").focus();
				});
			}
			else if(document.getElementById("sigu_nm").value=="") {
				generalPopOk("시/군/구를 선택하세요.", function() {
					document.getElementById("sigu_nm").selectedIndex=0;
					document.getElementById("sigu_nm").focus();
				});
			}
			else if(document.getElementById("addr_nm").value=="") {
				generalPopOk(msg+"을 선택하세요.", function() {
					document.getElementById("addr_nm").focus();
				});
			}
			else {
				getAddressList();                               //DB조회
			}
			return false;
		}
	};
	var zip_sch_span=cf.mkTag("span",zip_sch_area2);
	zip_sch_span.innerHTML=" - ";
	var ipt_addr_post_no=cf.mkTag("input",zip_sch_area2);
	ipt_addr_post_no.name="build_sub_no";
	ipt_addr_post_no.id="build_sub_no";
	ipt_addr_post_no.className="form_txt bd_num";
	ipt_addr_post_no.onkeypress=function(e){
		if(e.keyCode==13){
			if(document.getElementById("sido_nm").value=="") {
				generalPopOk("시/도를 선택하세요.", function() {
					document.getElementById("sido_nm").selectedIndex=0;
					document.getElementById("sido_nm").focus();
				});
			}
			else if(document.getElementById("sigu_nm").value=="") {
				generalPopOk("시/군/구를 선택하세요.", function() {
					document.getElementById("sigu_nm").selectedIndex=0;
					document.getElementById("sigu_nm").focus();
				});
			}
			else if(document.getElementById("addr_nm").value=="") {
				generalPopOk(msg+"을 선택하세요.", function() {
					document.getElementById("addr_nm").focus();
				});
			}
			else {
				getAddressList();                               //DB조회
			}
			return false;
		}
	};
	cf.setCss(zip_sch_area2,{height:28+"px"});
//-------------------------검색 버튼 ---------------------------------------	
	var area2_btn=cf.mkTag("div",zip_fdset);
	cf.setCss(area2_btn,{position:"absolute",width:60+"px",right:25+"px",top:220+"px"});
	var zip_sch_btn=cf.mkTag("button",area2_btn);
	zip_sch_btn.id="srchbtn";
	zip_sch_btn.className="ct-btn blue small";
	zip_sch_btn.innerHTML="검색";
	zip_sch_btn.onclick=function(){			
		if(document.getElementById("sido_nm").value=="") {
			generalPopOk("시/도를 선택하세요.", function() {
				document.getElementById("sido_nm").selectedIndex=0;
				document.getElementById("sido_nm").focus();
			});
		}
		else if(document.getElementById("sigu_nm").value=="") {
			generalPopOk("시/군/구를 선택하세요.", function() {
				document.getElementById("sigu_nm").selectedIndex=0;
				document.getElementById("sigu_nm").focus();
			});
		}
		else if(document.getElementById("addr_nm").value=="") {
			generalPopOk(msg+"을 선택하세요.", function() {
				document.getElementById("addr_nm").focus();
			});
		}
		else {
			getAddressList();                               //DB조회
		}
		return false;
	};
//################################################################################################
//------------------------검색 결과 조회 view 초기화 ---------------------------------------DB조회	
//################################################################################################
	var totCnt = "0";     //DB조회-건수		
	var div_zip_list_id=cf.mkTag("div",div_addr_list);
	div_zip_list_id.id="zip_list_id";
	div_zip_list_id.className="zipcode_select";
		
	var zip_list_span=cf.mkTag("span",div_zip_list_id);
	zip_list_span.id="rslt_cnt_span";
	zip_list_span.className="result_preview";
	zip_list_span.innerHTML=" 검색결과 : "+totCnt+" 건";
		
	var div_list_table=cf.mkTag("div",div_zip_list_id);
	div_list_table.id="list_table";
	div_list_table.className="result";
	var tbl_rs_table=cf.mkTag("table",div_list_table);
	tbl_rs_table.id="rs_table";
	tbl_rs_table.style.border="0";
	var zip_list_cgrp=cf.mkTag("colgroup",tbl_rs_table);
	var zip_list_col1=cf.mkTag("col",zip_list_cgrp);
	zip_list_col1.style.width="85px";
	var zip_list_col2=cf.mkTag("col",zip_list_cgrp);
	zip_list_col2.style.width="*";
	var zip_list_thd=cf.mkTag("thead",tbl_rs_table);
	var zip_list_tr=cf.mkTag("tr",zip_list_thd);			
	var zip_list_th1=cf.mkTag("th",zip_list_tr);
	zip_list_th1.scope="col";
	zip_list_th1.className="zipcode";
	zip_list_th1.innerHTML="우편번호";
	var zip_list_th2=cf.mkTag("th",zip_list_tr);
	zip_list_th2.scope="col";
	zip_list_th2.className="addr";
	zip_list_th2.innerHTML="주소";
//-------------------------DB에서 데이터 가져온 값 setting ---------------------------------------------
	var level_addr = "";
	var jibun_addr_no = "";
	var road_addr_no  = "";		
	var tbd_result_list_bd=cf.mkTag("tbody",tbl_rs_table);
	tbd_result_list_bd.id="result_list_bd";
	var zip_list_bd_tr=cf.mkTag("tr",tbd_result_list_bd);
	var zip_list_bd_td1=cf.mkTag("td",zip_list_bd_tr);
	zip_list_bd_td1.className="zipcode";
	zip_list_bd_td1.innerHTML="";  //DB조회-zip_code
	var zip_list_bd_td2=cf.mkTag("td",zip_list_bd_tr);
	zip_list_bd_td2.className="addr";
	var zip_list_bd_td2_p1=cf.mkTag("p",zip_list_bd_td2);
	zip_list_bd_td2_p1.className="road";				
	var zip_list_bd_td2_a1=cf.mkTag("a",zip_list_bd_td2_p1);
	zip_list_bd_td2_a1.style.cursor="pointer";
	zip_list_bd_td2_a1.href="#";
	zip_list_bd_td2_a1.onclick=function(){
		generalPopOk(level_addr +" "+ road_addr_no);  //DB조회-도로주소명 선택
		return false;
	};		
	var zip_list_bd_td2_em1=cf.mkTag("em",zip_list_bd_td2_a1);
	zip_list_bd_td2_em1.innerHTML="도로명 ";
	var zip_list_bd_td2_span1=cf.mkTag("span",zip_list_bd_td2_a1);
	zip_list_bd_td2_span1.innerHTML=level_addr +" "+ road_addr_no;  //DB조회-level_addr+road_addr_no
	var zip_list_bd_td2_p2=cf.mkTag("p",zip_list_bd_td2);
	zip_list_bd_td2_p2.className="allocation";
	var zip_list_bd_td2_em2=cf.mkTag("em",zip_list_bd_td2_p2);
	zip_list_bd_td2_em2.innerHTML="지번 ";
	var zip_list_bd_td2_span2=cf.mkTag("span",zip_list_bd_td2_p2);
	zip_list_bd_td2_span2.innerHTML=level_addr +" "+ jibun_addr_no;  //DB조회-level_addr+jibun_juso
//----------------------닫기 버튼 ------------------------------------------------------------------				
	var zip_close=cf.mkTag("div",div_addr_list); //div_zip_list_id
	zip_close.className="closebtn";
	var btn_close=cf.mkTag("button",zip_close);
	btn_close.id="btn_close";
	btn_close.className="ct-btn darkgrey small";
	btn_close.innerHTML="닫기";
	btn_close.onclick=function(){
		cf.killTag(pop_Window.parentNode);
	};
		
	pop_Window.appendChild(winZip);
	
	callPop(pop_Window);   //창띄우기
// 검색결과 초기화
	document.getElementById("result_list_bd").innerHTML="";
	document.getElementById("zip_list_id").style.display = "none";
};

/**
 * 화면 전환
 * 도로명주소/지번주소 선택시 아래 div의 ID로 내용 변경
 * desc_addr_name: 설명 변경  [도로명 + 건물번호 입력 / 검색하실 주소의 동/읍/면을 입력해 주세요.]
 * desc_addr_detail : 설명 예시 변경  [ (예: 올림픽로 326) / (예: 논현동) ]
 * addr_name_title : 검색어 레이블명 변경  [도로명/주소명]
 * addr_no_title : 주소상세검색어 레이블 변경 [건물번호/번지]
 */
function goTab(selType){
	addr_gubun=selType;
    
    var sido_nm=document.getElementById("sido_nm"),
    	sigu_nm=document.getElementById("sigu_nm"),
	    main_no=document.getElementById("build_main_no"),
    	sub_no=document.getElementById("build_sub_no"),
    	gubun= document.getElementById("addr_gubun");
	
    main_no.value="";
	sub_no.value="";
    sido_nm.value="";
    sigu_nm.value="";
    gubun.value=addr_gubun;
    
    if (selType == "J") {
    	var addr_nm=document.getElementById("addr_nm"),
    		bunji=document.getElementById("addr_no_title");
		msg="주소명";
		addr_nm.value=""; 
	// 탭 색상 변경    	
    	document.getElementById("ul_zip_type").className = "zipcode_type";
    	document.getElementById("tab_jibun").className = "selected";
    	document.getElementById("tab_road").className = "zipcode_type";
	// 검색명칭 변경
    	var desc_explain = document.getElementById("desc_addr_name");
    	desc_explain.innerHTML="검색하실 주소의 동/읍/면을 입력해 주세요.";  //검색하실 주소의 동/읍/면을 입력해 주세요
		var zip_desc_txt=cf.mkTag("span",desc_explain);
		zip_desc_txt.id ="desc_addr_detail";           //***도로명/지번 선택시미다 변경
		zip_desc_txt.className="ex";
		zip_desc_txt.innerHTML=" (예: 논현동)";  
    	document.getElementById("addr_name_title").innerHTML=msg;
    	
	// 검색결과 초기화
    	document.getElementById("result_list_bd").innerHTML="";
    	document.getElementById("zip_list_id").style.display = "none";    	
    	bunji.parentNode.style.display="none";
    }else {
    	var addr_nm=document.getElementById("addr_nm"),
    		bunji=document.getElementById("addr_no_title");
    	msg="도로명";
    	addr_nm.value="";
	// 탭 색상 변경
    	document.getElementById("ul_zip_type").className = "zipcode_type";
    	document.getElementById("tab_road").className = "selected";
    	document.getElementById("tab_jibun").className = "zipcode_type";
	// 검색명칭 변경
    	var desc_explain = document.getElementById("desc_addr_name");
    	desc_explain.innerHTML="도로명 + 건물번호 입력";
    	var zip_desc_txt=cf.mkTag("span",desc_explain);
		zip_desc_txt.id ="desc_addr_detail";
		zip_desc_txt.className="ex";
		zip_desc_txt.innerHTML=" (예: 올림픽로 326)";    //(예: 논현동)
    	document.getElementById("addr_name_title").innerHTML=msg;
    	document.getElementById("addr_no_title").innerHTML="건물번호 ";
	// 검색결과 초기화
    	document.getElementById("result_list_bd").innerHTML="";
    	document.getElementById("zip_list_id").style.display = "none";    	
    	bunji.parentNode.style.display="";
    }
};	
/** 주소검색 시/도 선택box 초기화	*/
function mkSidoSelect(parent) {	
	var sidoList = "";
	var sigunguList = "";
	$.ajax({
		  url: "/cmm/ZipCodeAjax",
		  type: "POST",
		  async: false,
		  dataType: 'json',
		  success: function (data) {
			  //fnc(data);
			  sidoList = data.sidoList;
			  sigunguList = data.sigunguList;
		  }
	});
	
    var doc=document.createElement("select"),
		op=document.createElement("option");
    doc.appendChild(op);
	op.innerHTML="--시/도--";
	op.value="";
	op.selected="selected";

	sidoList.trav(function(d,i){
	    op=cf.mkTag("option",doc);
	    op.value=d.code_name;
	    op.innerHTML=d.code_name;
	});
	
	doc.onchange = function(e){
		var val = e.target.value,
			selectEl = document.getElementById("sigu_nm");
		selectEl.innerHTML = "";
		  
		var op2=cf.mkTag("option",selectEl);
		op2.value="";
		op2.innerHTML="--시/군/구--";
			
		sigunguList.trav(function(d,i){
			if(val==d.etc1) {
			    op2=cf.mkTag("option",selectEl);
			    op2.value=d.code_name;
			    op2.innerHTML=d.code_name;
			}
		});		
	};
	parent.appendChild(doc);
	return doc;
};
/**시군구 선택box 초기화 */
function mkSiguSelect(parent) {
	var doc=document.createElement("select");
    //loop start
	//0
	var tmpOpt=document.createElement("option");
	doc.appendChild(tmpOpt);
	tmpOpt.innerHTML="--시/군/구--";
	tmpOpt.value="";
	tmpOpt.selected="selected";
    //loop end
	parent.appendChild(doc);
	return doc;
}

function inputBottomTableHead(p){
	var arr=[["","성명","부서","직책","E-mail","휴대폰","전화번호","Fax","세금계산서"]],
   		tb=cf.mkTag("table",p);
	tb.cellpadding=0;
	tb.cellspacing=0;
	tb.className="Normal_table";
	arr.trav(function(ar,i){
		var tr=cf.mkTag("tr",tb);
		ar.trav(function(d,j){
			var td=cf.mkTag("th",tr);
			td.innerHTML=d;
			if(j==0){
				var ipt=cf.mkTag("input",td);
				ipt.type="checkbox";
				ipt.className="customer_id";
				ipt.name="customer_id";
				ipt.onclick=function(){
					checkMode(this);
				};
			}else if(j==1){
				var span=cf.mkTag("span",td);
				span.className="asterisk";
				span.innerHTML="*";
			}else if(j==8)td.className="right";			
			if(i==0){
				if(j==0)cf.setCss(td,{width:29+"px"});
				else if(j==1)cf.setCss(td,{width:79+"px"});
				else if(j==2||j==3)cf.setCss(td,{width:109+"px"});
				else if(j==4)cf.setCss(td,{width:129+"px"});
				else if(j==5||j==6||j==7)cf.setCss(td,{width:109+"px"});
			}
		});
	});
	return tb;
};
function copSave(con,flag){
	var comname=document.getElementById("company_name");
	var company_reg_number=document.getElementById("company_reg_number");
	var company_reg_number_val=company_reg_number.value;
	var company_reg_check=document.getElementById("company_reg_check");
	var company_reg_check_val=company_reg_check.value;
	
	var corporate_number=document.getElementById("corporate_number");
	var corporate_number_val=corporate_number.value;
	var corporate_number_check=document.getElementById("corporate_number_check");
	var corporate_number_check_val=corporate_number_check.value;
		
	var phone_number=document.getElementById("phone_number");
	var phone_number_val=phone_number.value;
	
	var fax_number=document.getElementById("main_fax");
	var fax_number_val=fax_number.value;
	
	var etc=document.getElementById("etc");
	var etc_val=etc.value; //이벤트가 일어난 컨트롤의 value 값
	var etc_len=etc_val.lenght; //전체길이
	var len = 0;
	
	for(var i=0; i<etc_val.length; i++)	{
		if(etc_val.charCodeAt(i) >= 12592){  // 이부분에서 영문 숫자 조건줘서 변경 가능
            len = len+2;  // 한글은 2바이트로 체크
        }else{
            len = len+1;  // 한글 외에는 1바이트로 체크
        }
 
        if(len > 2000){
        	generalPopOk(2000+"bytes를 넘었습니다");
        	etc_val = etc_val.substring(0,i);  // maxlen이상 입력할 수 없다
        }
	}
	
	if(!comname.value){
		generalPopOk("고객사명을 입력하세요.",function(){
			comname.focus();
		});
		return;
	}
	if(!nameFlag){
		generalPopOk("고객사명을 중복체크를 하셔야 합니다.");
		return;
	}
	if(company_reg_check_val!='1' && (!company_reg_number_val||company_reg_number_val=="000-00-00000")){
		generalPopOk("사업자등록번호를 입력하세요.",function(){
			company_reg_number.focus();
		});
		return;
	}
	if(!dupFlag){
		generalPopOk("사업자등록번호를 중복체크를 하셔야 합니다.");
		return;
	}
	if(corporate_number_check_val!='1' && (!corporate_number_val||corporate_number_val=="000000-0000000")){
		generalPopOk("법인번호를 입력하세요.",function(){
			corporate_number.focus();
		});
		return;
	}
	if(!cupFlag){
		generalPopOk("법인번호를 중복체크를 하셔야 합니다.");
		return;
	}
	if(!phone_number_val||phone_number_val=="000-0000-0000"){
		generalPopOk("전화번호를 입력하세요.",function(){
			phone_number.focus();
		});
		return;
	}
	if(phone_number_val && chk_tel_new(phone_number) == "fail"){
		generalPopOk("잘못된 전화번호입니다.",function(){
			phone_number.value="";
			phone_number.focus();
		});
		return;
	}
	
	if(phone_number_val.length == 8) {
		phone_number.value=phone_format(1, phone_number_val);
	}else if(phone_number_val.length == 9){
		phone_number.value=phone_format(2, phone_number_val);
	}else{
		phone_number.value=phone_format(3, phone_number_val);
	}
	
	if(fax_number_val && chk_tel_new(fax_number) == "fail") {
		generalPopOk("잘못된 번호입니다.",function(){
			fax_number.value="";
			fax_number.focus();
		});
		return;
	}
	
	if(fax_number_val && chk_tel_new(fax_number) == "succ") {
		if(fax_number_val.length == 8) {
			fax_number.value=phone_format(1, fax_number_val);
		}else if(fax_number_val.length == 9){
			fax_number.value=phone_format(2, fax_number_val);
		}else{
			fax_number.value=phone_format(3, fax_number_val);
		}
	}
	
	var mobile=document.getElementsByName("mobile");
	mobile.trav(function(d,i){
		if(d.value=="010-0000-0000"){
			d.value="";
		}
	});	
	var sub_phone_number=document.getElementsByName("sub_phone_number");
	sub_phone_number.trav(function(d,i){
		if(d.value=="000-0000-0000"){
			d.value="";
		}
	});	
	var fax=document.getElementsByName("fax");
	fax.trav(function(d,i){
		if(d.value=="000-0000-0000"){
			d.value="";
		}
	});
	
	var customer_name=document.getElementsByName("customer_name"),
		cnt=0;
	customer_name.trav(function(d,i){
		if(d.value=="")	cnt++;
	});
	
	if(customer_name.length>0&&cnt>0){
		generalPopOk("담당자 이름을 입력하세요.");
		return;
	}
	
	var temp=$("input, select, textarea").serializeArray(),
		formData = new FormData();
	if($("#uploadFile")[0] != undefined && $("#uploadFile")[0] != null) var file=$("#uploadFile")[0].files[0];

	if(file){
		formData.append("uploadfile", $("#uploadFile")[0].files[0]);
	}
	for(var i=0 ; i<temp.length ; i++){
		var paramKey = temp[i].name;
		var paramValue = temp[i].value;
		console.log(paramValue);
		formData.append(paramKey, paramValue);
	}	
	
	generalPop("저장하시겠습니까?", function(){
		$.ajax({
			url: "/cop/insertCustomerSub",
			type: "POST",
			data: formData,
			dataType: "text",
			processData: false,
			contentType: false,			
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPop("저장되었습니다.");
				cf.killTag(con.parentNode);
				if(flag==2)companySearchList();
				else companyPopSrch(flag);
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	});
};
function subCompanyAdd(opt){
	var subAdd=document.getElementById("subCompanyList");
	var	tr=cf.mkTag("tr",subAdd);
	tr.style.textAlign="center";
	
	var td=cf.mkTag("td",tr);
	//td.style.width=3+"%";
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.name="in_sub_company_id";
	if(!opt&&prev){
		ipt.value=prev.data[18];
	}
	
	var ipt=cf.mkTag("input",td);
	ipt.type="checkbox";
	ipt.name="customercheckbox";
	ipt.className="customer_id";
	com_checks.push(ipt);
	
	var td=cf.mkTag("td",tr),
		input=cf.mkTag("input",td);
	input.className="input_han";
	input.name="customer_name";
	cf.setCss(input,{width:90+"%"});
	input.focus();

	var td=cf.mkTag("td",tr),
		input=cf.mkTag("input",td);
	input.className="input_han";
	input.name="division";
	cf.setCss(input,{width:90+"%"});
	
	var td=cf.mkTag("td",tr),
		input=cf.mkTag("input",td);
	input.className="input_han";
	input.name="job_title";
	cf.setCss(input,{width:90+"%"});
	
	var td=cf.mkTag("td",tr),
		input=cf.mkTag("input",td);
	input.name="email";
	input.className="input_eng";
	cf.setCss(input,{width:90+"%"});
	input.onblur=function(e){
		chk_email(e.target,this);
	};
	
	var td=cf.mkTag("td",tr);
	//td.style.width=15+"%";
	var input=cf.mkTag("input",td);
	input.name="mobile";
	cf.setCss(input,{width:90+"%"});
	input.onblur=function(e){
		chk_tel(e.target,this);
	};
	input.onkeypress=function(e){
		checkChar(e,this);
	};
	mobileSet(input);
	
	var td=cf.mkTag("td",tr);
	//td.style.width=15+"%";
	var input=cf.mkTag("input",td);
	input.name="sub_phone_number";
	cf.setCss(input,{width:90+"%"});
	input.onblur=function(e){
		chk_tel(e.target,this);
	};
	input.onkeypress=function(e){
		checkChar(e,this);
	};
	phoneSet(input);
	
	var td=cf.mkTag("td",tr);
	//td.style.width=13+"%";
	var input=cf.mkTag("input",td);
	input.name="fax";
	cf.setCss(input,{width:90+"%"});
	input.onblur=function(e){
		chk_tel(e.target,this);
	};
	input.onkeypress=function(e){
		checkChar(e,this);
	};
	phoneSet(input);
	
	var td=cf.mkTag("td",tr);
	td.className="right";
	//td.style.width=10+"%";
	var select=cf.mkTag("select", td);
	select.name="invoice_gb";
	mkSelectYN(select);
};
function subCompanyDel(){
	var temp = $("#subCompanyList").find(":has(:checkbox:checked)").find("select, input").serialize(),
		len=com_checks.length;	
	
	var customercheckbox = document.getElementsByName("customercheckbox"),
		customercheckboxCnt = 0;
	for(var i=0 ; i<customercheckbox.length ; i++){
		if(customercheckbox[i].checked) customercheckboxCnt++;
	}
	
	if(customercheckboxCnt==0){
		generalPop("삭제할 담당자를 선택하세요.");
	}else{
		generalPop("삭제하시겠습니까?", function(){
			$.ajax({
				url: "/cop/deleteCustomerSub",
				type: "POST",
				data: temp,
				success : function (data) {
					if(data != "success") generalPop(data);
					else{
						generalPop("삭제되었습니다.");
						var idx;
						com_checks.trav(function(d,i){
							if(d.checked){
								idx=i;
								cf.killTag(d.parentNode.parentNode);
							}
						});
						com_checks.splice(idx,1);
					}
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};
/**
 * 검색버튼 Click
 */
function getAddressList() {
	//검색결과 list 보이기
	document.getElementById("zip_list_id").style.display = "block";
	
	//검색조건 parameter
	var temp = $("#field_set").find("select, input").serialize();	
	var zipcodeList = "";
	var totCnt ="0";
	
	//document.getElementById("rs_table").innerHTML="검색된 데이터가 없습니다.";
	
	if(addr_gubun=="S"){
		 $.ajax({
			url: "/cmm/ZipcodeSearchRoad",
			type: "POST",
			async: false,
			dataType: 'json',
			data: temp,
			success: function(data){
				//zipcodeList = data.zipcodeList;
				zipcodeList = data.zipcodeListRoad;
				totCnt = data.totCnt;
				document.getElementById("rslt_cnt_span").innerHTML=" 검색결과 : "+totCnt+" 건";
				var table_list=document.getElementById("result_list_bd"); //검색결과 list div
				
				table_list.innerHTML = "";
				if(zipcodeList.length==0){
					var tbd=document.getElementById("result_list_bd"),
						tr=cf.mkTag("tr",tbd),
						td=cf.mkTag("td",tr);
					td.colSpan="2";
					td.innerHTML="검색된 데이터가 없습니다.";
				}else{
					zipcodeList.trav(function(d,i){
					    rslt_tr=cf.mkTag("tr", table_list);
					    rslt_td1=cf.mkTag("td", rslt_tr);
					    rslt_td1.className="zipcode";
					    rslt_td1.innerHTML=d.zip_code; 
					    var post=d.zip_code.split("-");
					    build_mng_no=d.build_mng_no;
					    var rslt_td2=cf.mkTag("td", rslt_tr);
					    rslt_td2.className="addr";
					    var rslt_td2_p1=cf.mkTag("p", rslt_td2);
					    rslt_td2_p1.className = "road";
					    var rslt_td2_em1=cf.mkTag("em", rslt_td2_p1);
					    rslt_td2_em1.innerHTML="도로명 ";
					    var rslt_td2_p1_alnk=cf.mkTag("a", rslt_td2_p1);
					    rslt_td2_p1_alnk.href="#";
					    rslt_td2_p1_alnk.innerHTML=d.level_addr+" "+d.road_addr_no;  //도로명주소
					    rslt_td2_p1_alnk.onclick=function(){
							setAddrValue(post[0], post[1], d.level_addr+" "+d.road_addr_no, build_mng_no);
						};
					    
						var rslt_td2_p2=cf.mkTag("p", rslt_td2);
					    rslt_td2_p2.className = "allocation";
					    var rslt_td2_em2=cf.mkTag("em", rslt_td2_p2);
					    rslt_td2_em2.innerHTML="지번 ";
					    var rslt_td2_p2_lbl=cf.mkTag("lable", rslt_td2_p2);
					    rslt_td2_p2_lbl.innerHTML=d.level_addr+" "+d.jibun_addr_no;     //지번주소결과 
			    	});
				}
			}
		 });
	}else if(addr_gubun=="J"){
		$.ajax({
			url: "/cmm/ZipcodeSearchBunji",
			type: "POST",
			async: false,
			dataType: 'json',
			data: temp,
			success: function(data){
				//zipcodeList = data.zipcodeList;
				zipcodeList = data.zipcodeListBunji;
				totCnt = data.totCnt;
				document.getElementById("rslt_cnt_span").innerHTML=" 검색결과 : "+totCnt+" 건";
				var table_list=document.getElementById("result_list_bd"); //검색결과 list div
				
				table_list.innerHTML = "";
				
				if(zipcodeList.length==0){
					var tbd=document.getElementById("result_list_bd"),
						tr=cf.mkTag("tr",tbd),
						td=cf.mkTag("td",tr);
					td.colSpan="2";
					td.innerHTML="검색된 데이터가 없습니다.";
				}else{
					zipcodeList.trav(function(d,i){
						rslt_tr=cf.mkTag("tr", table_list);
					    rslt_td1=cf.mkTag("td", rslt_tr);
					    rslt_td1.className="zipcode";
					    rslt_td1.innerHTML=d.zip_code; 
					    var post=d.zip_code.split("-");
					    build_mng_no=d.build_mng_no;
				    	var rslt_td2=cf.mkTag("td", rslt_tr);
					    rslt_td2.className="addr";
					    var rslt_td2_p1=cf.mkTag("p", rslt_td2);
					    rslt_td2_p1.className = "road";
					    var rslt_td2_em1=cf.mkTag("em", rslt_td2_p1);
					    rslt_td2_em1.innerHTML="지번 ";
					    var rslt_td2_p1_alnk=cf.mkTag("a", rslt_td2_p1);
					    rslt_td2_p1_alnk.href="#";
					    rslt_td2_p1_alnk.innerHTML=d.level_addr+" "+d.jibun_addr_no;     //지번주소결과 
					    rslt_td2_p1_alnk.onclick=function(){
					    	setAddrValue(post[0], post[1], d.level_addr+" "+d.road_addr_no, build_mng_no);			    	
						};
					    
						var rslt_td2_p2=cf.mkTag("p", rslt_td2);
					    rslt_td2_p2.className = "allocation";
					    var rslt_td2_em2=cf.mkTag("em", rslt_td2_p2);
					    rslt_td2_em2.innerHTML="도로명 ";
					    var rslt_td2_p2_lbl=cf.mkTag("lable", rslt_td2_p2);
					    rslt_td2_p2_lbl.innerHTML=d.level_addr+" "+d.road_addr_no;
			    	});
				}
			}
		});
	}
};

/** 선택된 주소값 전달후 창 닫기 */
function setAddrValue(post1, post2, addr, mng_no) {
	document.getElementById("post1").value=post1;
	document.getElementById("post2").value=post2;
	document.getElementById("address").value=addr;
	document.getElementById("zipcode").value=post1+post2;
	cf.killTag(document.getElementById("pop_win").parentNode);
}
