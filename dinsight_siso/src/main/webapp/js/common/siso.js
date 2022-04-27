var cf=new jCommon(),
	jW=new jWidget(),
	q=new jSQL(),
	CurrentDate;

addLadtDate();
function addLadtDate(){
	CurrentDate=cf.getToday();
	var a=getlastDay(CurrentDate[0],CurrentDate[1]);
	
	CurrentDate.push("01",a);
};
function getlastDay(y,m){
	var a=new Date(y,m,""),
		b=a.getDate();
	return(b);
};
function comma(str){
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
function uncomma(str){
    str = String(str);
    return str.replace(/[^\d]+/g, '');
};
function paymentSet(target){
	target.placeholder=0;
	/*target.onfocus=function(){
		target.value="";
	};*/
};
function phoneSet(target){
	target.placeholder="000-0000-0000";
	if(target.value.length>0)cf.setCss(target,{color:"#000"});	
	else cf.setCss(target,{color:"#dbdbdb"});
	
	target.onfocus=function(){
		cf.setCss(target,{color:"#000"});
	};	
};
function mobileSet(target,opt){
	target.placeholder="010-0000-0000";

	if(target.value.length>0)cf.setCss(target,{color:"#000"});	
	else cf.setCss(target,{color:"#dbdbdb"});
	
	target.onfocus=function(){
		cf.setCss(target,{color:"#000"});
	};
};
function chk_email(target, field){
	var str=target.value,
		regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
		len = str.length;
	
	if(len>0){
		if(regex.test(str)==false){
			generalPopOk("잘못된 email 형식입니다.",function(){
				field.value="";
				field.focus();
			});
		}else{
			return;
		}
	}
};
function chk_tel(target, field){
	var str=target.value;
	
	str = checkDigit(str);
	var len = str.length;
	
	if(len==8){
		if(str.substring(0,2)==02){
			error_numbr(str, field);
		}else{
			field.value = phone_format(1,str);
		}   
	}else if(len==9){
		if(str.substring(0,2)==02){
			field.value = phone_format(2,str);
		}else{
			error_numbr(str, field);
		}
	}else if(len==10){
		if(str.substring(0,2)==02){
			field.value = phone_format(2,str);
		}else{
			field.value = phone_format(3,str);
		}
	}else if(len==11){
		if(str.substring(0,2)==02){
			error_numbr(str, field);
		}else{
			field.value  = phone_format(3,str);
		}
	}else if(len==0){
		return;
	}else{
		error_numbr(str, field);
	}
};
function chk_tel_new(target){
	var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	
	if (!regExp.test(target.value)) {
		return "fail";
	} else {
		return "succ";
	}
};
function checkChar(e,field){
	var key = e.keyCode;
	if(!((key>=37 && key<=57)||(key>=96&&key<=105)||key==8||key==9)||key==110||key==109||key==189||key==220){
		var inputVal=e.target.value; 
		e.target.value=inputVal.replace(/[^0-9.]/gi,'');
	}
};
function checkDigit(num){
	var Digit = "1234567890",
		string = num,
		len = string.length,
		retVal = "";
		
	for (var i = 0; i < len; i++){
		if (Digit.indexOf(string.substring(i, i+1)) >= 0){
			retVal = retVal + string.substring(i, i+1);
		}
	}
	return retVal;
};
function phone_format(type, num){
	if(type==1){
		return num.replace(/([0-9]{4})([0-9]{4})/,"$1-$2");
	}else if(type==2){
		return num.replace(/([0-9]{2})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	}else{
		return num.replace(/(^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	}
};
function error_numbr(str, field){
	generalPopOk("잘못된 전화번호입니다.",function(){
		field.value="";
		field.focus();
	});
};
function regSet(target){
	target.placeholder="000-00-00000";
	cf.setCss(target,{
		color:"#dbdbdb"
	});
	target.onfocus=function(){
		cf.setCss(target,{
			color:"#000"
		});
	};
};
function corporateSet(target){
	target.placeholder="000000-0000000";
	cf.setCss(target,{
		color:"#dbdbdb"
	});
	target.onfocus=function(){
		cf.setCss(target,{
			color:"#000"
		});
	};
};
//레이어 팝업에서 포커스를 바꾸는 함수
function keydefault(){
	var a=document.getElementById("popbtn1");
	if(a)a.focus();
	/*window.onkeypress=function(e){
		if(e.keyCode==13) if(e.target.tagName!="TEXTAREA") e.preventDefault();
	};*/
};
function mkPrint(con,opt, obj){
	var sh_expanse_year=obj.year, sh_expanse_month=obj.month, expanse_day=obj.day;
	var sh_user_id=obj.creator;
	var source_object_id = obj.objectid;
	var usableData;
	var page_bar;
	var pageTotal;
	
	var dataExList,			//
		dataExMList,		//
		dataLoopList,		//
		dataPLineList,		//결재라인 데이터
		dataTPriceList,		//
		dataExList301,		//개인신용
		dataExList302,		//개인법인
		dataExList303,		//개인현금
		dataExList304;		//공통법인
	
	var lineF,
		lineArr,
		lineE;
	
	var lineTDs;
	var pageNumber=0;
	var title=["", "개인법인카드", "개인신용카드", "공통법인카드", "개인현금", "마일리지"];
	var dataAr;
	var dataOrder;
	

	//프린트 첫 정보
	//url:"/exp/admin/expanseAdminPrintTotalPrice"
	//param: sh_expanse_year, sh_expanse_month
	
	//경비 상세
	//url:"/exp/admin/expanseAdminPrintDataDetail"
	//param: sh_expanse_year, sh_expanse_month
	//dataExList - 마일리지 제외한 정보
	//dataExMList -마일리지 정보 
	//dataLoopList - 제목 리스트
	
	//토탈정보
	//url:"/exp/admin/expanseAdminPrintTotalDetail"
	//param: sh_expanse_year, sh_expanse_month
	
	//log(sh_expanse_year, sh_expanse_month, sh_user_id);
	
	callData(
		"/exp/admin/expanseAdminPrintTotalDetail",
		{"sh_expanse_year":sh_expanse_year, "sh_expanse_month":sh_expanse_month, "sh_user_id":sh_user_id, "source_object_id":source_object_id},
		function(data){
			
			dataExList302=data.dataExList302;	//개인법인
			dataExList301=data.dataExList301;	//개인신용
			dataExList304=data.dataExList304;	//공통법인
			dataExList303=data.dataExList303;	//개인현금
			dataExMList=data.dataExMList;		//마일리지
			
			dataExList=data.dataExList;
			dataLoopList=data.dataLoopList;
			dataPLineList=data.dataPLineList;
			dataTPriceList=data.dataTPriceList;
			//dir(data);
			dataProc();
			
			mkPageFront();
		}
	);
	function dataProc(){
		
		//usable data proc
		usableData=new Array();
		dataAr=[[],dataExList302,dataExList301,dataExList304,dataExList303,dataExMList];
		dataOrder=[[],dataExList302,dataExList301,dataExList304,dataExList303,dataExMList];
		
		var tmp=[];
		var ttl=[];
		var tail=[];
		dataAr.trav(function(d,i){
			if(d.length<=30){
				tmp.push(d);
				ttl.push(title[i]);
				tail.push(1);
				return;
			}
			var t=d.getClip(0,d.length-1);
			var cnt=1;
			while(t.length>30){
				var prt=t.getClip(0,29);
				tmp.push(prt);
				ttl.push(title[i]+"-"+cnt);
				tail.push(0);
				t=t.getClip(30,t.length-1);
				cnt++;
			}
			tmp.push(t);
			ttl.push(title[i]+"-"+cnt);
			tail.push(1);
		});
		dataAr=tmp;
		dataAr.trav(function(d,i){
			if(d.length!=0){
				usableData.push([d,ttl[i],tail[i]]);
			}
		});
		usableData.unshift([]);
		pageTotal=usableData.length
		
		//front page data proc
		lineF=dataPLineList[0];
		lineArr=new Array();
		lineE=dataPLineList[dataPLineList.length-1];
		
		dataPLineList.trav(function(d,i){
			if(!(i==0 || i==dataPLineList.length-1))
				lineArr.push(d);
		});
		
		var ln=lineArr.length,
		n=ln-3, 
		chk=n>0?true:false;
		
		n=Math.abs(n);
		while(n){
			chk?lineArr.shift():lineArr.unshift({user_name:"", status_name:""});
			n--;
		}
		lineArr.unshift(lineF);
		lineArr.push(lineE);
	};
	
	function mkPageFront(){
		con.innerHTML="";
		//con.style.overflow="auto";
		var hdr=mkHdr(),
			con2=hdr.con2,
			con4=hdr.con4,
			con5=hdr.con5;
		
		var bdy=mkBody(con5),
			con13_tbl=bdy.con13_tbl,
			con14=bdy.con14;
		
		mkPage(con5);
		mkPtr(con5.parentNode);
		dataSpread();
		
		function dataSpread(){
			if(lineArr[0])
				lineTDs.trav(function(d,i){
					d.innerHTML="<span class='lh'>"+lineArr[i].user_name+"<br />"+lineArr[i].status_name+"</span>";
				});
			
			var sum=0;
			dataTPriceList.trav(function(d,i){
				var tr=cf.mkTag("tr",con13_tbl);
				var ar=[d.code_name, d.code_id, ""];
				ar.trav(function(t,j){
					var td=cf.mkTag("td",tr);
					if(j==0) td.innerHTML=d.expanse_type_name;
					if(j==1){
						td.style.paddingRight=5+"px";
						td.id="print_top_price_"+d.expanse_type;
						td.className="cost paddingright";
						td.innerHTML=cf.commify(d.payment);
						sum+=d.payment*1;
					}
					if(j==2) td.className="right";
				});
			});
			var ar=["총계",cf.commify(sum),""];
			var con13_tbl_tr1=cf.mkTag("tr",con13_tbl);
			ar.trav(function(d,i){
				var td=cf.mkTag("td",con13_tbl_tr1);
				if(i==0){
					td.className="sum";
				}else if(i==1){
					td.style.paddingRight=5+"px";
					td.id="print_top_total_price";
					td.className="sum_cost paddingright";
				}else if(i==2){
					td.className="sum_cost paddingright";
				}
				td.innerHTML=d;
			});
			
			Object.assign(con14.style, {paddingTop:"100px", paddingBottom:"50px", fontSize:"14px"});
			con14.innerHTML="위 금액을 청구하오니 결재 바랍니다.<br/><br/><br/><br/><br/>"+expanse_day;
		};
	};
	function mkPageCnt(cnt,opt){
		if(!opt)
			con.innerHTML="";
		//con.style.overflow="auto";
		var hdr=mkHdr(usableData[cnt][1]),
			con2=hdr.con2,
			con4=hdr.con4,
			con5=hdr.con5;
		mkList(con5, usableData[cnt]);
		mkPage(con5);
		mkPtr(con5.parentNode);
	};
	function mkPageTotal(){
		con.innerHTML="";
		var hdr=mkHdr(),
			con2=hdr.con2,
			con4=hdr.con4,
			con5=hdr.con5;
		var bdy=mkBody(con5),
			con13_tbl=bdy.con13_tbl,
			con14=bdy.con14;
		
		usableData.trav(function(d,i){
			if(i!=0){
				mkTitle(con5,sh_expanse_year+"년 "+sh_expanse_month+"월 경비["+d[1]+"]");
				mkList(con5, d);
			}
		});
		
		mkPage(con5);
		mkPtr(con5.parentNode);
		dataSpread();
		
		function dataSpread(){
			if(lineArr[0])
				lineTDs.trav(function(d,i){
					d.innerHTML=lineArr[i].user_name+"<br /><br/><br/>"+lineArr[i].status_name;
				});
			
			var sum=0;
			dataTPriceList.trav(function(d,i){
				var tr=cf.mkTag("tr",con13_tbl);
				var ar=[d.code_name, d.code_id, ""];
				ar.trav(function(t,j){
					var td=cf.mkTag("td",tr);
					if(j==0) td.innerHTML=d.expanse_type_name;
					if(j==1){
						td.style.paddingRight="5px";
						td.id="print_top_price_"+d.expanse_type;
						td.className="cost paddingright";
						td.innerHTML=cf.commify(d.payment);
						sum+=d.payment*1;
					}
					if(j==2) td.className="right";
				});
			});
			var ar=["총계",cf.commify(sum),""];
			var con13_tbl_tr1=cf.mkTag("tr",con13_tbl);
			ar.trav(function(d,i){
				var td=cf.mkTag("td",con13_tbl_tr1);
				if(i==0){
					td.className="sum";
				}else if(i==1){
					td.style.paddingRight="5px";
					td.id="print_top_total_price";
					td.className="sum_cost paddingright";
				}else if(i==2){
					td.className="right";
				}
				td.innerHTML=d;
			});
			con14.style.fontSize="14px";
			con14.innerHTML="위 금액을 청구하오니 결재 바랍니다.<br /><br />"+expanse_day;
		};
	};	
	function mkTr(str,str1,p){
		var tr=cf.mkTag("tr",p);
		tr.height=32;
		var th=cf.mkTag("th",tr);
		th.width=100;
		th.innerHTML=str;
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.style.paddingLeft="10px";
		td.innerHTML=str1;
	};
	function mkHdr(str){
		
		if(str) str="["+str+"]";
		else str="";
		
		var con1=cf.mkTag("div",con);
		con1.id="Layer_Center_wrap";
		
		var con2=cf.mkTag("div",con1);
		con2.id="pop_print";
		con2.className="pop_print";		
		Object.assign(con2.style, {width:"820px", height:(cf.workareaheight-60)+"px", backgroundColor:"white", border:"2px solid black"});
		
		var con3=cf.mkTag("div",con2);
		con3.className="prt_top my_top";
		
		var con3_text=cf.mkTag("span",con3);
		con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;경비 지급 요청서";
		
		var con3_a=cf.mkTag("a",con3);
		con3_a.href="#";
		con3_a.className="printClose";
		
		var con3_img=cf.mkTag("img",con3_a);
		Object.assign(con3_img, {width:"820px", src:"/images/pop_btn/btn_pop_close.png", alt:"닫기", align:"right"});
		con3_img.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		var con4=cf.mkTag("div",con2);
		con4.id="printArea";
		//con4.className="div_overflow_print";
		
		var con5=cf.mkTag("div",con4);
		con5.id="print_page_1";
		con5.className="div_overflow_print";
		///con5.style.overflowY="auto";
		///con5.style.overflowX="hidden";
		con5.style.height=cf.workareaheight-220+"px";
		///con5.style.paddingLeft=10+"px";
		
		var con6=cf.mkTag("div",con5);
		con6.className="prt_title";
		con6.innerHTML=sh_expanse_year+"년 "+sh_expanse_month+"월 경비 "+str;
		
		return {con2:con2, con4:con4, con5:con5};
	};
	function mkTitle(son,str){
		var con6=cf.mkTag("div",son);
		con6.className="prt_title next_print_page";
		//b.className="pop_table2 next_print_page";
		//con6.innerHTML=sh_expanse_year+"년 "+sh_expanse_month+"월 경비"+str;
		con6.innerHTML=str;
	};
	function mkBody(son){
		
		var con7=cf.mkTag("div",son);
		con7.className="prt_lnr";
		
		var con8=cf.mkTag("div",con7);
		con8.className="prt_left";
		var con9=cf.mkTag("div",con8);
		con9.className="table_left";
		
		var con9_tbl=cf.mkTag("table",con9);
		Object.assign(con9_tbl, {cellpadding:0, cellspacing:0, width:"229px", className:"Normal_table"});		
		
		mkTr("부서",obj.divisionname,con9_tbl);
		mkTr("성명",obj.username,con9_tbl);
		mkTr("일자",expanse_day,con9_tbl);
		
		var con10=cf.mkTag("div",con7);
		con10.className="prt_right";
		var con11=cf.mkTag("div",con10);
		con11.className="table_right";
		
		var con11_tbl=cf.mkTag("table",con11);		
		Object.assign(con11_tbl, {cellpadding:0, cellspacing:0, width:"487px", height:"0", className:"Normal_table"});
		
		var con11_tbl_tr=cf.mkTag("tr",con11_tbl);
		con11_tbl_tr.height=32;
		
		var str=["결<br /><br />재", "담당","검토","검토","검토","승인"];
		str.trav(function(d,i){
			var th=cf.mkTag("th",con11_tbl_tr);
			th.width=90;
			if(i==0){
				th.width=32;
				th.rowSpan=2;
			}else if(i==str.length-1){
				th.className="right";
			}
			th.innerHTML=d;
		});
		
		var con11_tbl_tr1=cf.mkTag("tr",con11_tbl);
		con11_tbl_tr1.align="center";
		
		var str=["","","","","",""];
		lineTDs=new Array();
		str.trav(function(d,i){
			if(i!=0){
				var td=cf.mkTag("td",con11_tbl_tr1);
				td.style.height=65+"px";
				td.id="print_payment_"+i;
				if(i==str.length-1){
					td.className="right";
				}
				lineTDs.push(td);
			}
		});
		
		var con12=cf.mkTag("div",son);
		con12.style.height = 200+"px";
		con12.className="prt_con";
		var con13=cf.mkTag("div",con12);
		con13.className="pop_table2";
		
		var con13_tbl=cf.mkTag("table",con13);
		Object.assign(con13_tbl, {cellpadding:0, cellspacing:0, width:"100%", className:"Normal_table"});
		
		var ar=["구분","금액","비고"];
		var con13_tbl_tr=cf.mkTag("tr",con13_tbl);
		ar.trav(function(d,i){
			var th=cf.mkTag("th",con13_tbl_tr);
			if(i==ar.length-1) th.className="right";
			else th.width=300;
			th.innerHTML=d;
		});
		
		var con14=cf.mkTag("div",son);
		con14.className="prt_text";
		
		
		return {con13_tbl:con13_tbl, con14:con14};
	};
	function mkPage(son){
		
		son=son.parentNode;
		var con15=cf.mkTag("div",son);
		con15.className="prt_page";
		
		var con16=cf.mkTag("div",con15);
		con16.className="page_table";
		
		var con16_tbl=cf.mkTag("table",con16);
		Object.assign(con16_tbl, {cellpadding:0, cellspacing:0, width:"770px"});
		
		var con16_tbl_tr=cf.mkTag("tr",con16_tbl);
		var ar=[
			    "<a href=\"#\"><img src=\"/images/exp_payment/btn_prevpage.png\" alt=\"이전 페이지\"></a>",
			    "<B>"+(pageNumber+1)+"</B> / <span class='printTotalCnt'>"+pageTotal+"</span>",
			    "<a href=\"#\"><img src=\"/images/exp_payment/btn_nextpage.png\" alt=\"다음 페이지\"></a>"
		    ];
		ar.trav(function(d,i){
			var td=cf.mkTag("td",con16_tbl_tr);
			if(i==0){
				td.className="page_left";
				td.onclick=function(){
					goMove("prev",1);
				};
			}
			if(i==1){
				td.className="page_con";
				page_bar=td;
			}
			if(i==2){
				td.className="page_right";
				td.onclick=function(){
					goMove("next",1);
				};
			}
			td.innerHTML=d;
		});
		
		/*
		var con17=cf.mkTag("div",con4);
		con17.id="print_body";
		var con18=cf.mkTag("div",con4);
		con18.id="print_body_mileage";
		*/
		
		$(".my_top").css("cursor","move");
	};
	function mkPtr(son){
		var con19=cf.mkTag("div",son);
		con19.className="prt_btns";
		con19.style.backgroundColor="white";
		con19.innerHTML = "";
		
		if(opt){
			//경비승인 상세보기
			if(obj.statuscd=="1701"){
				var btn_bar=cf.mkTag("span",con19),
					btn_permit=cf.mkTag("span",con19),
					btn_return=cf.mkTag("span",con19),
					img_permit=cf.mkTag("img",btn_permit),
					space=cf.mkTag("span",btn_permit),
					img_return=cf.mkTag("img",btn_return),
					img_btn_bar=cf.mkTag("img",btn_bar);
				
				img_btn_bar.src="/images/ico/print_bar.gif";
				img_btn_bar.style.paddingBottom="15px";
				img_btn_bar.style.align="center";
				
				btn_permit.param={
					node_id : obj.nodeid,
					source_object_id : obj.objectid,
					approval_id : obj.approvalid,
					final_expanse_appoint : obj.finalexpanseappoint,
					creator:obj.creator,
					approval_year : obj.year, 
					approval_month : obj.month
				};
				//btn_permit.onclick = approval_permit;
				btn_permit.onclick = function(){ approval_permit(this.param, con); };
				img_permit.src = "/images/exp_payment/btn_ok_all.gif";
				img_permit.style.cursor="pointer";
				img_permit.alt = "승인";
				
				btn_return.param={
					node_id : obj.nodeid,
					source_object_id : obj.objectid,
					approval_id : obj.approvalid,
					creator : obj.creator,
					approval_year : obj.year, 
					approval_month : obj.month
								};
				
				//btn_return.onclick = approval_return;
				btn_return.onclick = function(){ approval_return(this.param, con); };
				img_return.src = "/images/exp_payment/btn_return.gif";
				img_return.style.cursor="pointer";
				img_return.alt = "반려";
				
				space.innerHTML="&nbsp;&nbsp;";
				
			}else	modPrint();
			
		}else{
			modPrint();
		}
		
		//modPrint();
		function modPrint(){
			
			var btn_bar=cf.mkTag("span",con19),
				btn_print=cf.mkTag("a",con19),
				btn_print_return=cf.mkTag("a",con19),
				img_print=cf.mkTag("img",btn_print),
				space=cf.mkTag("span",btn_print),
				img_print_return=cf.mkTag("img",btn_print_return),
				img_btn_bar=cf.mkTag("img",btn_bar);
			
			img_btn_bar.src="/images/ico/print_bar.gif";
			img_btn_bar.style.paddingBottom="15px";
			
			btn_print_return.href="#";
			btn_print_return.className="printClose";
		
			img_print.src="/images/exp_payment/btn_print_big.gif";
			img_print.alt="인쇄하기";
			img_print.style.cursor="pointer";
			img_print_return.src="/images/exp_payment/btn_cancelprint_big.gif";
			img_print_return.alt="인쇄취소";
			img_print_return.style.cursor="pointer";
			space.innerHTML="&nbsp;&nbsp;";
			
			
			btn_print.onclick=function(){
				goPrint();
			};
			btn_print_return.onclick=function(){
				cf.killTag(con.parentNode);
			};
		};
		
		function goPrint() {
			
			mkPageTotal();
			
			cf.traverse(document.body,function(el){
				if(el.className=="prt_con")
					el.style.overflow="";
			});
			con.style.overflow="";
			$("#printArea").print({
	            //Use Global styles
	            globalStyles : false,
	            //Add link with attrbute media=print
	            mediaPrint : true,
	            //Custom stylesheet
	            stylesheet : "",
	            //Print in a hidden iframe
	            iframe : true,
	            //Don't print this
	            noPrintSelector : ".pop_h2, .prt_page, .prt_btns",
	            //Add this on top
	            append : "",
	            //Add this at bottom
	            prepend : ""
	        });
			goMove("");
		}
	};
	function goMove(opt){
		if(opt=="prev") pageNumber--;
		else if(opt=="next") pageNumber++;
		
		if(pageNumber<0) pageNumber=0;
		var lng=usableData.length-1;
		if(pageNumber>lng) pageNumber=lng;
		
		if(pageNumber==0) mkPageFront();
		else mkPageCnt(pageNumber);
		
		//"<B>1</B> / <span class='printTotalCnt'>5</span>",
		page_bar.innerHTML="<B>"+(pageNumber+1)+"</B> / <span class='printTotalCnt'>"+pageTotal+"</span>";
	};
	
	function mkList(son, data){
		//dir(data);
		var str=data[1];
		var tail=data[2];
		var data=data[0];
		var page=str.indexOf("-")!=-1?str.split("-")[1]*1-1:0;
		
		var a=cf.mkTag("div",son);
		///a.style.height=365+"px";
		a.style.height="600px";
		a.className="prt_con";
		a.style.overflow="auto";
		
		var b=cf.mkTag("div",a);
		//b.className="pop_table2 next_print_page";
		b.className="pop_table2";
		
		var tbl=cf.mkTag("table",b);
		Object.assign(tbl, {cellpadding:0, cellspacing:0, width:"100%", className:"Normal_table"});
		
		var tr=cf.mkTag("tr",tbl);
		var chk=data[0].drive_day?true:false;
		var ar=chk?["no","날짜","이동목적","출발지","경유지","도착지","유종","거리(km)","금액"]:["no","날짜","분류","계정과목","내역","금액"];
		var wdt=chk?[40,100,80,100,100,100,70,70,"right"]:[40,100,100,100,270,"right"];
		ar.trav(function(d,i){
			var th=cf.mkTag("th",tr);
			if(i==ar.length-1) th.className=wdt[i];
			else th.width=wdt[i];
			th.innerHTML=d;
		});
		var arr=new Array();
		data.trav(function(d,i){
			if(d.drive_day){
				arr.push([0, cf.datify(d.drive_day), d.purpose, d.start_point, d.via_point, d.end_point, d.oil_cd_name, cf.commify(d.distance), cf.commify(d.cost)]);
			}else arr.push([0, d.pay_day, d.parent_category_name, d.category_name, d.expanse_name, cf.commify(d.payment)]);
		});
		arr.trav(function(d,i){
			var tr=cf.mkTag("tr",tbl);
			if(chk)
				d.trav(function(t,j){
					var td=cf.mkTag("td",tr);
					td.innerHTML=t;
					if(j==0) td.innerHTML=(i+1)+(page*30);
					else if(j==1) td.className="date";
					else if(j==7) td.className="cost";
					else if(j==8) td.className="cost_r";
				});
			else
				d.trav(function(t,j){
					var td=cf.mkTag("td",tr);
					td.innerHTML=t;
					if(j==0) td.innerHTML=(i+1)+(page*30);
					else if(j==1) td.className="date";
					else if(j==4) td.className="left";
					else if(j==5) td.className="cost_r";
				});
		});
		
		if(tail){
			var optStr=str.split("-")[0];
			var obj={
					"개인법인카드":0, "개인신용카드":1, "공통법인카드":2, "개인현금":3, "마일리지":4
			};
			var idx=obj[optStr]+1;
			var sumAr=dataOrder[idx];
			var sum=0;
			sumAr.trav(function(d,i){
				sum+=chk?d.cost*1:d.payment*1;
			});
			var tr=cf.mkTag("tr",tbl);
			var td=cf.mkTag("td",tr);
			td.className="sum";
			td.colSpan=chk?8:5;
			td.innerHTML="총계";
			
			var td1=cf.mkTag("td",tr);
			td1.className="sum_cost paddingright";
			td1.style.paddingRight="5px";
			td1.innerHTML=cf.commify(sum);
		}
	};	
	return con;
};
function defaultLoadList() {
	//각 페이지 내에서 기본적으로 호출할수 있는 리스트를 등록하기위해 디폴트로 함수를 만듬 (각 페이지에 같음 함수가 없으면 현재 함수를 호출함)
	//각 페이지에서 같은 이름으로 함수 사용하여 호출하면 됨
};
function defaultUpLoadResult() {
	//엑셀 업로드후 결과값 출력 함수
	//각 페이지에서 같은 이름으로 함수 사용하여 호출하면 됨
};
//null check chanage
function convertNull(val, ret) {
	
    if (typeof val !== "undefined" && val !== null) {
        return val;
    } else {
    	if(ret) return ret;
    	else    return "";
    }
};
//레이어 팝업열기
//layerPopup('layer', 'mileagePopup', 'layerClose')
//layerPopup('layer', 'mileagePopup', 'layerClose',{top:50})
//layerPopup('layer', 'mileagePopup', 'layerClose',{top:50, left:100, width:100, height:100})
function layerPopup(parentLayerClassName, layerIdName, closeClassName, options) {
	var $layer = $('#'+layerIdName);
	var $close = $layer.find('.' + closeClassName);
	var $bg = $layer.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
	var width = $layer.outerWidth();
	var height = $layer.outerHeight();

	if($bg){
		$('.' + parentLayerClassName).fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	}else{
		$layer.fadeIn();
	}
	
	if(typeof options == 'undefined') {
		
		var left = ( $(window).scrollLeft() + ($(window).width() - $layer.width()) / 2 );
		var top = ( $(window).scrollTop() + ($(window).height() - $layer.height()) / 2 );
		$layer.css({'left' : left, 'top' : top, 'position':'absolute'});
		
	} else {
		
		var ypos = options.top;
		var xpos = options.left;
		var lwidth = options.width;
		var lheight = options.height;
		
		if(typeof xpos == 'undefined') {
			xpos = ( $(window).scrollLeft() + ($(window).width() - $layer.width()) / 2 );
		}
		
		if(typeof ypos == 'undefined') {
			ypos = ( $(window).scrollTop() + ($(window).height() - $layer.height()) / 2 );
		}
		
		if(typeof lwidth == 'undefined') {
			lwidth = width;
		}
		
		if(typeof lheight == 'undefined') {
			lheight = height;
		}

		$layer.css({'top' : ypos, 'left' : xpos, 'width' : lwidth + 'px', 'height' : lheight + 'px'}).show();
		
	}

	$close.click(function(e){
		if($bg){
			$('.' + parentLayerClassName).fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		}else{
			$layer.fadeOut();
		}
		e.preventDefault();
	});
	
	$(".my_top").css("cursor","move");
	$(".movePopup").draggable({ handle: ".my_top" });
};
//layerPopup('layer', 'layerClose',{top:50, left:100, width:100, height:100, overflowX:'hidden', overflowY:'auto'})
function layerPopup2(parentLayerClassName, layerIdName, closeClassName, options) {
	
	var $parentLayer = $('.' + parentLayerClassName);
	var $layer = $('#' + layerIdName);
	var $close = $layer.find('.' + closeClassName);
	
	var width = $layer.outerWidth();
	var height = $layer.outerHeight();
	
	var top = ( $(window).scrollTop() + ($(window).height() - $layer.height()) / 2 );
	var left = ( $(window).scrollLeft() + ($(window).width() - $layer.width()) / 2 );
	
	if(typeof options == 'undefined') {
	
		$.blockUI({
			message: $parentLayer,
			css: {
                top				: top,
                left			: left,
                width			: width,
                height			: height,
                cursor			: 'default',
                border			: '2px solid #272727',
                'position'		: 'absolute'
			},
            overlayCSS:  { 
                opacity			: 0.6, 
                cursor			: 'default' 
            }
		});
		
	} else {
		
		var otop = typeof options.top !== 'undefined' ? options.top : top;
		var oleft = typeof options.left !== 'undefined' ? options.left : left;
		var owidth = typeof options.width !== 'undefined' ? options.width : width;
		var oheight = typeof options.height !== 'undefined' ? options.height : height;
		var overflowX = typeof options.overflowX !== 'undefined' ? options.overflowX : '';
		var overflowY = typeof options.overflowY !== 'undefined' ? options.overflowY : '';
		
		$.blockUI({ 
			message: $parentLayer,
			css: {
				top				: otop,
				left			: oleft,
				width			: owidth,
                height			: oheight,
                cursor			: 'default',
                border			: '2px solid #272727',
                'overflow-x'	: overflowX,
                'overflow-Y'	: overflowY
            },
            overlayCSS:  { 
                opacity			: 0.6, 
                cursor			: 'default'
            }
		});
	}
	
	$close.click(function() { 
        $.unblockUI(); 
        return false; 
    });
};
//체크박스 전체 선택/해제
function GroupCheck(CheckClassName, GroupClassName) {
	//log(CheckClassName, GroupClassName);
	if ($("." + CheckClassName).is(":checked")) {
		$("input:checkbox[class=" + GroupClassName + "]").prop("checked", true);
	} else {
		$("input:checkbox[class=" + GroupClassName + "]").prop("checked", false); 
	}
};
//날짜 루프 (월요일 날짜 부터 시작해야함)
function weekDateList(StartDate, ClassName, DateCount) {

	var curr = new Date(StartDate); // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + DateCount; // last day is the first day + 6
	var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
	var lastday = new Date(curr.setDate(last)); //12-Jul-2014
	
	var cnt = 1;
	while(firstday < lastday) {
	
	   var newDate = firstday.setDate(firstday.getDate() + 1);
	   firstday = new Date(newDate);
	   //console.log(firstday.format("yyyy-MM-dd"));
	   
	   //하단 그리드 요일별 날짜 변환
	   $("." + ClassName + cnt).text("("+firstday.format("yyyy-MM-dd")+")");
	   
	   cnt++;
	}	
};
//달력
function datePicker(ClassName, DateFormat) {
	
	DateFormat = typeof DateFormat !== 'undefined' ? DateFormat : 'yymmdd';
	
	$("." + ClassName).css("cursor","pointer");
	
	$("." + ClassName).each(function() {

	    $(this).removeClass('hasDatepicker').datepicker({
	    	dateFormat: DateFormat,
		    prevText: '이전 달',
		    nextText: '다음 달',
		    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    dayNames: ['일','월','화','수','목','금','토'],
		    dayNamesShort: ['일','월','화','수','목','금','토'],
		    dayNamesMin: ['일','월','화','수','목','금','토'],
		    showMonthAfterYear: true,
		    yearSuffix: '년'	
	    });
	    
	});
};
//달력
function datePickerMonth(ClassName, DateFormat) {
	
	DateFormat = typeof DateFormat !== 'undefined' ? DateFormat : 'yymmdd';
	
	$("." + ClassName).css("cursor","pointer");
	
	$("." + ClassName).each(function() {

	    $(this).removeClass('hasDatepicker').datepicker({
	    	dateFormat: DateFormat,
		    prevText: '이전 달',
		    nextText: '다음 달',
		    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    dayNames: ['일','월','화','수','목','금','토'],
		    dayNamesShort: ['일','월','화','수','목','금','토'],
		    dayNamesMin: ['일','월','화','수','목','금','토'],
		    showMonthAfterYear: true,
		    yearSuffix: '년',
		    firstDay: 1
	    });
	    
	});
};
//달력 multi
function datePickerMultiMonth(ClassName, DateFormat, monthCount) {
	
	DateFormat = typeof DateFormat !== 'undefined' ? DateFormat : 'yymmdd';
	
	$("." + ClassName).css("cursor","pointer");
	
	$("." + ClassName).each(function() {

	    $(this).removeClass('hasDatepicker').datepicker({
	    	dateFormat: DateFormat,
		    prevText: '이전 달',
		    nextText: '다음 달',
		    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		    dayNames: ['일','월','화','수','목','금','토'],
		    dayNamesShort: ['일','월','화','수','목','금','토'],
		    dayNamesMin: ['일','월','화','수','목','금','토'],
		    showMonthAfterYear: true,
		    yearSuffix: '년',
		    firstDay: 1,
		    numberOfMonths: monthCount,
		    onSelect: function( selectedDate ) {
		        if(!$(this).data().datepicker.first){
		            $(this).data().datepicker.inline = true;
		            $(this).data().datepicker.first = selectedDate;
		        }else{
		            if(selectedDate > $(this).data().datepicker.first){
		                $(this).val($(this).data().datepicker.first+" ~ "+selectedDate);
		            }else{
		                $(this).val(selectedDate+" ~ "+$(this).data().datepicker.first);
		            }
		            $(this).data().datepicker.inline = false;
		        }
		    },
		    onClose:function(){
		        delete $(this).data().datepicker.first;
		        $(this).data().datepicker.inline = false;
		    }
	    });
	    
	});
};
//동적 tr 추가
function tableAddRow(copyClassName, listClassName, indexClassName, checkGroupClassName, calendarClassName, dataReset) {
	
	//디폴트 값 설정
	indexClassName = typeof indexClassName !== 'undefined' ? indexClassName : '';
	checkGroupClassName = typeof checkGroupClassName !== 'undefined' ? checkGroupClassName : '';
	calendarClassName = typeof calendarClassName !== 'undefined' ? calendarClassName : '';
	dataReset = typeof dataReset !== 'undefined' ? dataReset : 'N';
	
	var cnt = 0, chk_cnt = 0;
	
	var originalClass = $("." + copyClassName);
	
	//선택값이 있으면 선택한 값 다음에 추가시킴
	if(checkGroupClassName) {
		
		$("." + checkGroupClassName).each(function() {
			
			//0 값은 복사원본 값이므로 1부터 시작해야 함
			if(cnt > 0) {
				
				if($(this).is(":checked")) {
					
					//복사(이벤트 포함)
					var copyClass = originalClass.clone(true, true);
					
					//복사한값 초기화
					if(dataReset == "Y") {
						copyClass.find("input").val("");
					}
					
					copyClass.find("input:checkbox").prop("checked", false);
					
					//selectbox 복사
					var originalSelects = originalClass.find("select");
					copyClass.find('select').each(function(index, item) {
						
					     $(item).val( originalSelects.eq(index).val() );			 
					});
					
					//복사한값 디스플레이 보임으로변경 
					copyClass.css("display","");
					
					//복사한값 클래스명 변경
					copyClass.attr("class", listClassName);
													
					//복사한값 리스트에 추가
					copyClass.insertAfter($(this).parent().parent());
	
					chk_cnt++;
				}
			}
			
			cnt++;
		});
	}	
	
	//선택된 값이 없으면 제일 마지막에 추가 시킴	
	if(chk_cnt == 0) {
		
		//복사(이벤트 포함)
		var copyClass = $("." + copyClassName).clone(true, true);
		
		//복사한값 초기화
		if(dataReset == "Y") {
			copyClass.find("input").val("");
		}
		
		copyClass.find("input:checkbox").prop("checked", false);
		
		//selectbox 복사
		var originalSelects = originalClass.find("select");
		copyClass.find('select').each(function(index, item) {
			
		     $(item).val( originalSelects.eq(index).val() );			 
		});
		
		//복사한값 디스플레이 보임으로변경 
		copyClass.css("display","");
		
		//복사한값 클래스명 변경
		copyClass.attr("class", listClassName);
										
		//복사한값 리스트에 추가
		copyClass.insertAfter($(this).parent().parent());
	
		//복사한값 리스트에 추가
		copyClass.insertAfter("." + listClassName+":last");
	}
	
	//리스트 순번 출력이 있으면
	if(indexClassName) {
		
		tableOrderRow(listClassName, indexClassName);
	}
	
	//달력 클래스명이 있으면
	if(calendarClassName) {
		
		//동적 추가시 달력에 문제가 생기므로 아이디값을 삭제해준다.
		$("." + calendarClassName).removeAttr("id");
		
		//달력조회
		datePicker(calendarClassName, "mm-dd");
	}
};
//동적 tr 삭제
function tableDelRow(delGroupClassName, listClassName, indexClassName, priceClassName, sumPriceId){	
	//디폴트 값 설정
	listClassName = typeof listClassName !== 'undefined' ? listClassName : '';
	indexClassName = typeof indexClassName !== 'undefined' ? indexClassName : '';
	priceClassName = typeof priceClassName !== 'undefined' ? priceClassName : '';
	sumPriceId = typeof sumPriceId !== 'undefined' ? sumPriceId : '';
	
	var cnt = 0;
	$("." + delGroupClassName).each(function() {
		
		//0 값은 복사원본값이므로 1부터 시작해야 함
		if(cnt > 0) {
			if($(this).is(":checked")) {
				
				$(this).parent().parent().remove();
			}
		}
		cnt++;
	});	
	//리스트 순번 출력이 있으면
	if(indexClassName)tableOrderRow(listClassName, indexClassName);
	//금액합계가 있으면
	if(priceClassName && sumPriceId)sumPrice(sumPriceId, priceClassName);
};
//동적 tr 복사
function tableCopyRow(copyGroupClassName, listClassName, indexClassName, calendarClassName, priceClassName, sumPriceId, exceptionClassName){	
	//디폴트 값 설정
	listClassName = typeof listClassName !== 'undefined' ? listClassName : '';
	indexClassName = typeof indexClassName !== 'undefined' ? indexClassName : '';
	calendarClassName = typeof calendarClassName !== 'undefined' ? calendarClassName : '';
	priceClassName = typeof priceClassName !== 'undefined' ? priceClassName : '';
	sumPriceId = typeof sumPriceId !== 'undefined' ? sumPriceId : '';
	exceptionClassName = typeof exceptionClassName !== 'undefined' ? exceptionClassName : '';
	
	$("." + copyGroupClassName).each(function() {			
		if($(this).is(":checked")) {
			
			var originalClass = $(this).parent().parent();
			
			//복사(이벤트 포함)
			var copyClass = originalClass.clone(true, true);
			
			//checkbox 초기화
			copyClass.find("input:checkbox").prop("checked", false);
			
			//selectbox 복사
			var originalSelects = originalClass.find("select");
			copyClass.find('select').each(function(index, item) {
				
			     $(item).val( originalSelects.eq(index).val() );			 
			});
											
			//복사한값 리스트에 추가
			copyClass.insertAfter($(this).parent().parent());
			
			//복사 Row 예외 값 처리
			if(exceptionClassName) {
				
				if($.isArray(exceptionClassName)) {
					
					$.each(exceptionClassName, function(key, val){
						copyClass.find('.' + val).val('');
						copyClass.find('.' + val).text('');
					});

				} else {
					
					copyClass.find('.' + exceptionClassName).val('');
					copyClass.find('.' + exceptionClassName).text();
				}
			}
		}		
	});
	
	//리스트 순번 출력이 있으면
	if(indexClassName)tableOrderRow(listClassName, indexClassName);
	
	//달력 클래스명이 있으면
	if(calendarClassName){		
		//동적 추가시 달력에 문제가 생기므로 아이디값을 삭제해준다.
		$("." + calendarClassName).removeAttr("id");		
		//달력조회
		datePicker(calendarClassName, "mm-dd");
	}	
	//금액합계가 있으면
	if(priceClassName && sumPriceId)sumPrice(sumPriceId, priceClassName);
};
//동적 tr 순번 - 정렬
function tableOrderRow(listClassName, indexClassName){	
	var index = 0;
	$("." + listClassName).each(function() {
		$(this).find("." + indexClassName).text(index) ;
		index = index + 1;
	});	
};
//금액 콤마 찍기
//priceComma("price");
//priceComma(["price", "mileagePrice", "mileageDistancePrice"]);
function priceComma(priceClassName){	
	if($.isArray(priceClassName)){		
		$.each(priceClassName, function(key, val){
			$("." + val).number(true);
		});
	}else $("." + priceClassName).number(true);
};
//숫자에 콤마 추가하기 (금액단위)
function set_comma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n))
     n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};
//함계계산
function sumPrice(viewIdName, sumClassName){	
	if($.isArray(viewIdName) && $.isArray(sumClassName)){		
		//초기화
		$.each(viewIdName, function(key, val){
			$("#" + val).val(0);
		});		
		var ArrPrice = new Array();
		$.each(sumClassName, function(key, val){
			var cnt = 1;
			
			if(cnt == 1) ArrPrice[key] = 0;
			
			$("." + val).each(function(){
				ArrPrice[key] += parseInt($(this).val().replace(/,/g,'') * 1);
			});
			cnt++;
		});		
		$.each(viewIdName, function(key, val){
			$("#" + val).val(ArrPrice[key]);
		});		
	}else{	
		//초기화
		$("#" + viewIdName).val(0);		
		var PRICE = 0;
		$("." + sumClassName).each(function(){
			PRICE += parseInt($(this).val().replace(/,/g,'') * 1);
		});		
		//합계금액 책정
		$("#" + viewIdName).val(PRICE);		
	}	
};
//콤보박스 생성
function createSelectBox(url, objClassName, groupLevel, groupId, groupName, firstValue){	
	var paramId    = ["groupLevel", "groupId", "groupName"],
		paramValue = [groupLevel, groupId, groupName],
		mode       = "def";	
	if (groupLevel=="0")mode = "grp";	
	//데이터 검색
	$.ajax({
		  url: url,
		  type: "POST",
		  data: { "paramId[]" : paramId , "paramValue[]" : paramValue },
		  async: false,
		  success: function (data) {
			  ResponseComboResult(data, objClassName, mode, firstValue);
		  } 
	});
};
function ResponseComboResult(data, objClassName, mode, firstValue){	
	var json                  = eval('(' + data + ')'),
  		jsonlength            = json.GetResultData.length;  
    //var resultErrorYn         = json.GetResultErrorYn;
    //var resultMsg             = json.GetResultMsg;
    //var resultErrorMoveUrl    = json.GetResultErrorMoveUrl;    
    var HTML = "",
   		pre_group_id = "";    
    if(firstValue)HTML +="<option value=''>" + firstValue + "</option>";    
    for(var cnt=0; cnt<jsonlength; cnt++){    	
    	var code_id   = json.GetResultData[cnt].code_id;
    	var code_name = json.GetResultData[cnt].code_name;
    	var group_id  = json.GetResultData[cnt].group_id;
    	var etc1	  = json.GetResultData[cnt].etc1;    	
    	if(mode=="def")HTML +="<option value='" + code_id + "' alt='" + etc1 + "'>" + code_name + "</option>";
    	else{    		
    		if(group_id==1||group_id==2){    			
    			if(cnt==0){
    				HTML +="<optgroup label='" + code_name + "'>";
    			}else{    				
    				if(pre_group_id==1||pre_group_id==2){    					
    					HTML +="<optgroup label='" + code_name + "'>";    					
    				}else if(pre_group_id==3){    					
    					if(group_id == 1)HTML +="</optgroup></optgroup><optgroup label='" + code_name + "'>";
						else HTML +="</optgroup><optgroup label='" + code_name + "'>";					
    				}
    			}
    		}else HTML +="<option value='" + code_id + "' alt='" + etc1 + "'>" + code_name + "</option>";
    		pre_group_id = group_id;
    	}
    }    
	$("." + objClassName).append(HTML);
};
//다이나믹 폼 체크 후 ajax 처리
function DynamicRowCheckInsert(listClassName, checkClassNameArr, confirmMsg, insertUrl, successAfterUrl, successReFreshIdName){	
	//입력값 체크 초기화
	var emptykValue = "N";	
	checkClassNameArr = typeof checkClassNameArr !== 'undefined' ? checkClassNameArr : '';
	//입력값 체크
	if(checkClassNameArr) {
		$.each(checkClassNameArr, function(key, val) {
			$("." + listClassName + " ." + key).each(function() {
				if($(this).val() == "") {
					emptykValue = "Y";
					generalPop(val);
					return false;
			 	}
			});
			if(emptykValue == "Y") return false;
		});
	}
	//입력값이 모두 입력 되었으면
	if(emptykValue == "N") {
		/*
		if(confirm(confirmMsg + "하시겠습니까?")) {
			var temp = $("input, select").serialize();
			//serialize() 길이 제한이 있어서 변수가 sh_ 로 시작하는 값만 직렬화 시킴
			var temp_search = $("[name^='sh_']").serialize(); 
			//데이터 검색
			$.ajax({
				url: insertUrl,
				type: "POST",
				data: temp,
				success : function () {
					if(successAfterUrl) {
						//리스트 부분만 갱신하기 위해 리스트 삭제
						$("." + listClassName).remove();
						//리스트 부분 새로 갱신
						$("#" + successReFreshIdName).after().load(successAfterUrl, temp_search, function (){
							//페이지 갱신시 호출 리스트 함수를 부름
							defaultLoadList();
						});
					} else {
						document.location.reload();
					}
				}
			});
		}
		*/
		generalPop(confirmMsg + "하시겠습니까?",function(){
			var temp = $("input, select").serializeArray();
			//serialize() 길이 제한이 있어서 변수가 sh_ 로 시작하는 값만 직렬화 시킴
			var temp_search = $("[name^='sh_']").serializeArray();
			//데이터 검색
			$.ajax({
				url: insertUrl,
				type: "POST",
				data: temp,
				success : function () {
					if(successAfterUrl) {
						//리스트 부분만 갱신하기 위해 리스트 삭제
						$("." + listClassName).remove();
						//리스트 부분 새로 갱신
						$("#" + successReFreshIdName).after().load(successAfterUrl, temp_search, function (){
							//페이지 갱신시 호출 리스트 함수를 부름
							defaultLoadList();
							$('.wrap-loading').hide(20);
						});
					} else {
						document.location.reload();
					}
				},
		   		beforeSend:function(){
		   			$('.wrap-loading').show();
		   		}
			});
		});
	}
};
//buttonImgDisable('버튼 이미지 그룹의 클래스명', '변경전 이미지의 글자 패턴', '변경후 이미지의 글자', '에외 이미지 클래스명', '비활성화 클릭시 얼럿 메세지', '버튼이미지 활성화/비활성화 조건 유무 아이디명')
//buttonImgDisable('btn_action img', '_on,'_off', ['img_print', 'img_mil', 'img_close'], '사용하실수 없습니다.', 'monthStatus')
//buttonImgDisable('btn_action img', '_on,'_off', 'img_print', '사용하실수 없습니다.', 'monthStatus')
function buttonImgModeCheck(imgGroupClassName, imgSearchString, imgReplaceString, exceptionClassName, exceptionAlertMsg, disableConditionIdName) {
	//디폴트 값 설정
	imgGroupClassName = typeof imgGroupClassName !== 'undefined' ? imgGroupClassName : '';
	imgSearchString = typeof imgSearchString !== 'undefined' ? imgSearchString : '';
	imgReplaceString = typeof imgReplaceString !== 'undefined' ? imgReplaceString : '';
	exceptionClassName = typeof exceptionClassName !== 'undefined' ? exceptionClassName : '';
	exceptionAlertMsg = typeof exceptionAlertMsg !== 'undefined' ? exceptionAlertMsg : '';
	disableConditionIdName = typeof disableConditionIdName !== 'undefined' ? disableConditionIdName : '';
	//활성화/비활성화 조건이 있다면
	if(disableConditionIdName) {
		//조건값이 Y 이면 루프 돌리면서 활성/비활성화 시킴
		if($("#" + disableConditionIdName).val() == "Y") {				
			//이미지가 속한 클래스명 내에서 루프를 돌림
			$("." + imgGroupClassName).each(function() {
				//에외 클래스명이 존재하면
				if(exceptionClassName) {
					//에외 클래스명이 배열형이면
					if($.isArray(exceptionClassName)) {
						var checkYN = "N";
						var thisClassName = $(this).attr("class");
						$.each(exceptionClassName, function(key, val){
							if(thisClassName == val)checkYN = "Y";
						});					
						if(checkYN == "N"){						
							$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
							$(this).click(function() {
								if(exceptionAlertMsg) {			
									generalPop(exceptionAlertMsg);
								}
								return false;
							});								
						}
					//예외 클래스명이 배열형이 아니면	
					}else{
						if($(this).attr("class") != exceptionClassName) {
							$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
							$(this).click(function() { 
								if(exceptionAlertMsg) {			
									generalPop(exceptionAlertMsg);
								}
								return false;
							});								
						}
					}
				//에외 클래스명이 존재하지 않으면
				}else{
					$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
					$(this).click(function(){ 
						if(exceptionAlertMsg)generalPop(exceptionAlertMsg);
						return false;
					});						
				}
			});
		}		
	}else{
		//이미지가 속한 클래스명 내에서 루프를 돌림
		$("." + imgGroupClassName).each(function(){
			//에외 클래스명이 존재하면
			if(exceptionClassName){
				//에외 클래스명이 배열형이면
				if($.isArray(exceptionClassName)){
					var checkYN = "N";
					var thisClassName = $(this).attr("class");
					$.each(exceptionClassName, function(key, val){
						if(thisClassName == val)checkYN = "Y";
					});
					if(checkYN == "N") {
						$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
						$(this).click(function() {
							if(exceptionAlertMsg)generalPop(exceptionAlertMsg);
							return false;
						});		
					}							
				//예외 클래스명이 배열형이 아니면	
				}else{
					if($(this).attr("class") != exceptionClassName) {
						$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
						$(this).click(function(){
							if(exceptionAlertMsg)generalPop(exceptionAlertMsg);
							return false;
						});							
					}
				}
			//에외 클래스명이 존재하지 않으면
			}else{
				$(this).attr("src", $(this).attr("src").split(imgSearchString).join(imgReplaceString));
				$(this).click(function(){
					if(exceptionAlertMsg)generalPop(exceptionAlertMsg);
					return false;
				});					
			}
		});
	}
};
//특정 위치로 커서 이동
$.fn.selectRange = function(start, end){
	return this.each(function() {
		if(this.setSelectionRange) {
			this.focus();
			this.setSelectionRange(start, end);
		}
		else if(this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	});
};
//년, 월, 일 selectbox 생성
function createYearMonthDay(mode, lastNum, viewEle) {	
	var toDay = new Date(),
		year  = toDay.getFullYear(),
		HTML  = "",
		cntView;
	//var month = (toDay.getMonth()+1);
	//var day   = toDay.getDate();	
	if(mode == "Y"){
		for(var cnt=year+1; cnt>=lastNum; cnt--) {
			HTML += "<option value='"+ cnt +"'>"+ cnt +"</option>";				
		}
	}else if(mode == "M") {
		for(var cnt=1; cnt<=12; cnt++) {
			if(cnt < 10)	cntView = "0" + cnt;
			else 			cntView = cnt;
			HTML += "<option value='"+ cntView +"'>"+ cnt +"</option>";				
		}
	} else if(mode == "D") {
		for(var cnt=1; cnt<=31; cnt++) {
			if(cnt < 10)	cntView = "0" + cnt;
			else 			cntView = cnt;
			HTML += "<option value='"+ cntView +"'>"+ cnt +"</option>";				
		}
	}
	$(viewEle).empty();
	$(viewEle).append(HTML);
};
/*
 * 년, 월, 일 selectbox 생성
 * Parameter
 *  - mode : Y - 년도, M - 월, D - 일자
 *  - diffNum : 범위를 지정할 기간 (mode: Y 일 때만 사용)
 *      ex) ('Y', -2, 변수ID) 일 때 2013 ~ 2015 년 조회
 *          ('Y',  3, 변수ID) 일 때 2015 ~ 2018 년 조회
 */
function createCalendar(mode, diffNum, viewEle) {
	var toDay = new Date(),
		year  = toDay.getFullYear(),
		month = toDay.getMonth(),
		HTML  = "",
		cntView;
	//var day   = toDay.getDate();
	if(month == "11") {
		year = year +1;
	}
	if(mode == "Y") {
		var lastNum = year+diffNum;
		if (lastNum >= year) {
			for(var cnt=lastNum; cnt>=year; cnt--) {
				HTML += "<option value='"+ cnt +"'>"+ cnt +"</option>";				
			}
		}
		else {
			for(var cnt=year; cnt>=lastNum; cnt--) {
				HTML += "<option value='"+ cnt +"'>"+ cnt +"</option>";				
			}
		}
	} else if(mode == "M") {
		for(var cnt=1; cnt<=12; cnt++) {
			if(cnt < 10)	cntView = "0" + cnt;
			else 			cntView = cnt;
			HTML += "<option value='"+ cntView +"'>"+ cnt +"</option>";				
		}
	} else if(mode == "D") {
		for(var cnt=1; cnt<=31; cnt++) {
			if(cnt < 10)	cntView = "0" + cnt;
			else 			cntView = cnt;
			HTML += "<option value='"+ cntView +"'>"+ cnt +"</option>";				
		}
	}
	$(viewEle).empty();
	$(viewEle).append(HTML);
};
//문자열 공백제거
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};
String.prototype.ltrim = function() {
	return this.replace( /^\s+/, "" );
};
String.prototype.rtrim = function() {
	return this.replace( /\s+$/, "" );
};
String.prototype.replaceAll = function(target, replacement) {
    var reg = new RegExp(target, 'g');
    return this.replace(reg, replacement); // 정규식 사용
};
function srchMonday(dt){
	var str=dt[0]+"-"+dt[1]+"-"+dt[2],
		num=new Date(str).getDay(),
		res=cf.calDate(str,"D",-num+1);
	
	return res.a;
};
function getPopupBody(width, height, headname, bodyareaid){
	popWidth = width;
	popHeight = height;
	popBody = popHeight-118;
	
	var con=document.createElement("div");	
	Object.assign(con.style, {width:popWidth+"px", height:popHeight+"px", maxHeight:"670px", position:"absolute"});	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con);
	con1.id="Layer_Center_wrap";
	
	var con2=cf.mkTag("div",con1);
	con2.id="pop_print";
	con2.className="pop_print";
	Object.assign(con2.style, {width:popWidth+"px", height:popHeight+"px", maxHeight:"670px", backgroundColor:"white", border:"2px solid black"});
	
	var con3=cf.mkTag("div",con2);
	con3.className="prt_top my_top";
	
	var con3_text=cf.mkTag("span",con3);
	con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;" + headname;
	
	var con3_a=cf.mkTag("a",con3);
	con3_a.href="javascript:void(0);";
	con3_a.className="printClose";
	
	var con3_img=cf.mkTag("img",con3_a);	
	Object.assign(con3_img, {src:"/images/pop_btn/btn_pop_close.png", alt:"닫기", align:"right"});
	con3_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con4=cf.mkTag("div",con2);
	con4.id="printArea";
	
	var con5=cf.mkTag("div",con4);
	con5.id=bodyareaid;
	con5.className="my-container";
	con5.style.height=popBody+"px";
	con5.style.maxHeight="544px";
	
	$(".my_top").css("cursor","move");
	$(".movePopup").draggable({ handle: ".my_top" });
	
	return con;
};
/**
 * 해당월 주의 최대값(월요일 기준)
 * @param dateStr       YYYYMM
 */
function getWeekCountOfMonthMonday(dateStr){
	//log(dateStr);
	var year=dateStr.substring(0,4);
	var month=dateStr.substring(4,6);
	var nowDate=new Date(year, month-1,1);
	var lastDate=new Date(year, month,0).getDate();
	var monthSWeek= nowDate.getDay();
	var baseWeek=[1,0,6,5,4,3,2];
	var weekSeq=parseInt((parseInt(lastDate) - 1 - baseWeek[monthSWeek])/7) + 1;
	
	return weekSeq;
};
//월요일 기준 해당 주차(오류로 사용안함)
function getSecofWeekMonday_(date){
	dir(date);
	var d = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, date.substring(6,8) );
    var fd = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, 1 );
    var baseWeek = [6, 0, 1, 2, 3, 4, 5];
    var monthWeek = Math.ceil((parseInt(date.substring(6,8))-baseWeek[d.getDay()])/7);
    return Math.ceil((parseInt(date.substring(6,8))-baseWeek[d.getDay()])/7);
};
//월요일 기준 해당 주차
function getSecofWeekMonday(date){
	//dir(date);
	//date = "20160731";
	var year = date.substring(0, 4);
	var month = date.substring(4, 6);
	var day = date.substring(6, 8);
	//var week = new Array("일", "월", "화", "수", "목", "금", "토");
	
	var vn_day1 = new Date(year, month - 1, day);
	var i = vn_day1.getDay(); //기준일의 요일을 구한다.( 0:일요일, 1:월요일, 2:화요일, 3:수요일, 4:목요일, 5:금요일, 6:토요일 )
	if ((i > 0) && (i < 7)) { //기준일이 월~토 일때
        intDayCnt1 = 1 - i;
        //intDayCnt2 = 7 - i;
    }
    else if (i == 0) {  //기준일이 일요일일때
        intDayCnt1 = -6;
        //intDayCnt2 = 0;
    }
	//기준일의 주의 월요일의 날짜와 토요일의 날짜
	var Cal_st = new Date(vn_day1.getFullYear(), vn_day1.getMonth(), vn_day1.getDate() + intDayCnt1);
	//var Cal_en = new Date(vn_day1.getFullYear(), vn_day1.getMonth(), vn_day1.getDate() + intDayCnt2);
	
	//날짜표시형식 첫번째 (예: 2008년 5월 1일)
	// var st_day = Cal_st.getFullYear()+"년 "+(Cal_st.getMonth()+1)+"월 "+Cal_st.getDate()+"일 "+ week[Cal_st.getDay()]+"요일";
	// var en_day = Cal_en.getFullYear()+"년 "+(Cal_en.getMonth()+1)+"월 "+Cal_en.getDate()+"일 "+ week[Cal_en.getDay()]+"요일";
	
	//날짜표시형식 두번째 (예: 20080501)
	var st_day2 = DateFormat(Cal_st);
	//var en_day2 = DateFormat(Cal_en);
	//dir(st_day2);
	var weekCount=0;
	for(var cnt=1; cnt<=Cal_st.getDate(); cnt++){
		
		var date_check = new Date(Cal_st.getFullYear(), Cal_st.getMonth(), cnt);
		//dir(DateFormat(date_check));
		
		if(date_check.getDay() == 1) weekCount++;
	}
	//dir(st_day2.substring(0, 6)+""+weekCount);
	var result = st_day2.substring(0, 6)+""+weekCount;
	
	return result;	
};
function DateFormat(obj, sep) { //날짜를 YYYYMMDD 형식으로 변경하는 함수
	
	if(typeof sep == 'undefined') sep="";
		
    //Year
    var yy = obj.getFullYear();
    //Month
    if (String(obj.getMonth() + 1).length == 1) {
        var mm = "0" + (obj.getMonth() + 1);
    }
    else {
        var mm = obj.getMonth() + 1;
    }
    //Day
    if (String(obj.getDate()).length == 1) {
        var dd = "0" + obj.getDate();
    }
    else {
        var dd = obj.getDate();
    }
    var date = String(yy) + sep + String(mm) + sep + String(dd);
    return date;
};
/**
 * 해당월 주의 최대값(사용안함)
 * @param dateStr       YYYYMM
 */
function getWeekCountOfMonth(dateStr){
	var year=dateStr.substring(0,4);
	var month=dateStr.substring(4,6);
	var nowDate=new Date(year,month-1,1);
	var lastDate=new Date(year,month,0).getDate();
	var monthSWeek=nowDate.getDay();
	var weekSeq=parseInt((parseInt(lastDate)+monthSWeek - 1)/7)+1;
	
	return weekSeq;
};
//해당월의 몇 주차(사용안함)
function getSecofWeek(date){
    var d = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, date.substring(6,8) );
    var fd = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, 1 );
    return Math.ceil((parseInt(date.substring(6,8))+fd.getDay())/7);
}
//월요일 기준 해당주차 (사용안함)
function getMonthWeek(date){
	datevalue = date;
	var datenowWeek =  getSecofWeekMonday(datevalue);
	var dateyear = datevalue.substring(0,4);
	var datemm = datevalue.substring(4,6);
	if(datenowWeek == 0){
		if((datemm-1) <= 0 ){
			datevalue = new Date(parseInt(dateyear)-1, 12, 0);	
		}else{
			datevalue = new Date(dateyear, datemm-1, 0);
		}
		dateyear = datevalue.getFullYear();
		datemm = datevalue.getMonth()+1;
		if(datemm < 10) datemm = "0" + datemm;
		dateDay = datevalue.getDate();
		if(dateDay < 10) dateDay = "0" + dateDay;
		datenowWeek = getSecofWeekMonday(dateyear + "" + datemm + "" + dateDay);
	}
	
	datevalue = dateyear + "" + datemm + "" + datenowWeek;
};
//오브젝트비교
var compare = function(a, b){
  var i = 0, j;
  if(typeof a == "object" && a){
    if(Array.isArray(a)){
      if(!Array.isArray(b) || a.length != b.length) return false;
      for(j = a.length ; i < j ; i++) if(!compare(a[i], b[i])) return false;
      return true;
    }else{
      for(var j in b) if(b.hasOwnProperty(j)) i++;
      for(var j in a) if(a.hasOwnProperty(j)){
        if(!compare(a[j], b[j])) return false;
        i--;
      }
      return !i;
    }
  }
  return a === b;
};
//셀렉트 박스 생성
function mkSelect(select, obj, def, opt, str){
	var op;	
	select.className="select_pop";
	if(opt){
		op=cf.mkTag("option",select);
		op.value="";
		if(str)op.innerHTML=str;
		else op.innerHTML="선택안함";
	}
	
	obj.trav(function(d,i){
		op=cf.mkTag("option",select);
		op.value=obj[i].code_id;
		op.innerHTML=obj[i].code_name;
		if(def && obj[i].code_id==def){
			op.selected="selected";
		}
	});
};
function mkSelectYN(select, def){	
	var op1=cf.mkTag("option",select),
		op2=cf.mkTag("option",select);

	select.style.width="50px";
	select.className="select_pop";
	op1.value="0";
	op1.innerHTML="N";
	op2.value="1";
	op2.innerHTML="Y";
	
	if(def&&def==op1.value) op1.selected="selected";
	if(def&&def==op2.value) op2.selected="selected";
};
function mkYearSelect(select,def,opt){
	var op,cur=CurrentDate[0];
	select.className="select_pop";
	if(opt){
		op=cf.mkTag("option",select);
		op.value="";
		op.innerHTML="선택안함";
	}	
	for(var i=2013;i<cur+2;i++){
		op=cf.mkTag("option",select);
		op.value=i;
		op.innerHTML=i;
		if(def && op.value==def){
			op.selected="selected";
		}else if(!def){
			if(cur==i){
				op.selected="selected";
			}
		}
	}	
};
function mkMonthSelect(select,def,opt){
	var op,cur=CurrentDate[1];
	select.className="select_pop";
	if(opt){
		op=cf.mkTag("option",select);
		op.value="";
		op.innerHTML="선택안함";
	}	
	for(var i=1;i<13;i++){
		op=cf.mkTag("option",select);
		var a=i;
		if(i<10) i="0"+i;
		op.value=i;
		op.innerHTML=a;
		if(def && op.value==def){
			op.selected="selected";
		}else if(!def){
			if(cur==i){
				op.selected="selected";
			}
		}
	}
};
function mkPageSelect(select,def,opt){
	var op,cur=100,ar=[10,50,100,250,500,1000];
	select.className="select_pop";
	if(opt){
		op=cf.mkTag("option",select);
		op.value="";
		op.innerHTML="선택안함";
	}	
	ar.trav(function(d,i){
		op=cf.mkTag("option",select);
		op.value=d;
		op.innerHTML=d;
		if(def && op.value==def){
			op.selected="selected";
		}else if(!def){
			if(cur==d){
				op.selected="selected";
			}
		}
	});
};
function saveDate(data){
	var y=data.substring(0,4);
	var m=data.substring(5,7);
	var d=data.substring(8,10);
	
	var date=y+""+m+""+d;
	return date;
};
function nullCheck(obj,opt){
	var a=false;	
	if(opt){
		var data=document.getElementById(obj);
		if(!data.value) a=true;
	}else{ 
		var data=document.getElementsByName(obj);
		if(data.length>0){
			data.trav(function(d,i){
				if(!d.value) a=true;
			});
		}
	}
	return a;
};
//날짜 형식을 바꿔즈는 함수
function modiDate(data,str){
	/*modiDate(20150225,".") => 2015.02.25*/
	var date;
	if(data == undefined) {
		date = "";
	} else {
		var y=data.substring(0,4);
		var m=data.substring(4,6);
		var d=data.substring(6,8);
	
		if(str==undefined) {
			date=y+m+d;
		}else{
			date=y+str+m+str+d;
		}
	}
	return date;
};
function mkHidden(data,name,p){
	//mkHidden(eval_pop05.pjt_evaluation_id,"pjt_evaluation_id",col);
	
	var ipt=cf.mkTag("input",p);
	ipt.value=data;
	ipt.type="hidden";
	ipt.name=name;
	ipt.id=name;
};
function juSel(obj,op){
	//체크박스에 선택된 값이 있는지 판단
	var opt=false,
		cnt=0,
		val=[];
	if(!op){
		obj.trav(function(d,i){
			if(d.checked){
				cnt++;
				val.push(d.value);
			}
		});
	}else{
		obj.trav(function(d,i){
			if(d.childNodes[1].childNodes[0].checked){
				cnt++;
				val.push(d.childNodes[1].childNodes[0].value);
			}
		});
	}
	if(cnt>0) opt=true;	
	return {opt:opt, val:val};
};
function isNumber(s) {
  s += ''; // 문자열로 변환
  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
  if (s == '' || isNaN(s)) return false;
  return true;
};
//선택한 주의 기간 표시
function getWeekDate(year, month, week, view){	
	$(view).html("");
	
	$.ajax({
		url: "/sam/fcasting/selectWeekDateAjax",
		type: "POST",
		data: { "sh_default_year" : year,"sh_default_month" : month,"sh_default_week" : week},
		async: false,
		dataType: "json",
		success: function (data) {
			$(view).html("(" + modiDate(data.weekDate.start_default_date,".") + " ~ " + modiDate(data.weekDate.end_default_date,".") + ")");
  		}
	});
};
function colSum(tds,col,limit,opt){
	/*
	해당 열의 값 더하기
	var colchk=colSum(tds,j,26);
	colchk.sum;
	*/	
	var sum=0;
	var op=true;
	var cnt=0;
	for(i=0,len=tds.length-1; i<len;i++){
		if(opt&&i>0){
			var a=(tds[i][col].innerHTML)*1;
			if(!a) sum+=0;
			else sum+=a;			
		}else{
			if(tds[i][col].childNodes[0]&&tds[i][col].childNodes[0].value!=undefined){
				var a=(tds[i][col].childNodes[0].value)*1;
				if(!a) sum+=0;
				else sum+=a;				
				if(limit&&sum>limit){
					op=false;
				}else cnt++;
			}
		}
	}
	return {sum:sum,opt:op,idx:cnt}
};