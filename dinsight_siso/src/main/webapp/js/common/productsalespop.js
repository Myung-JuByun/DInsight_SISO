var BRANDLIST,METHODLIST,PAYLIST,ETCLIST,SELECT_brand,alcPop_obj,prev_alc1,prev_alc2,chk_alc1=new Array(),chk_alc2=new Array(),chk_alc3=new Array();
/*
var prev_salespop01;
function callpopup(flag,num){
	if(flag !="view"){
		if(num) num=(num*1)+1;
		else num=1;
	}
	prev_salespop01=this;
	prev_salespop01.opt=true;
	prev_salespop01.num=num;
	prev_salespop01.flag=flag;
	if(prev)prev_salespop01.sales_confer_id=prev.obj.sales_confer_id;
	if(prev_salespop01.pop){
		prev_salespop01.pop.location.href="../product/productSalesPop";
		prev_salespop01.pop.focus();
	}else window.open("../product/productSalesPop","_blank","fullscreen=yes,scrollbars=yes,resizable=yes, height=" + screen.height + ",width=" + screen.width);
};

flag : view,modi,new,approval
callpopup("view",d.degree);

*/
function defaulCodeList(){
	var obj={year:2011,month:01,companyname:"",pjcode:"",brandcd:""};	
	callProductSalesData(obj, function(data){
		BRANDLIST=data.brandList;
		METHODLIST=data.methodList;
		PAYLIST=data.purchasePayList;
		ETCLIST=data.etcList;
		KINDLIST=data.conferkindList;
	});
};
function productSave(fnc,fnc2){
	//체크
	var staff_id=nullCheck("staff_id"),
		pjcode=nullCheck("contract_number_id"),
		cus_name=nullCheck("cus_name",true),
		tax_name=nullCheck("tax_name",true);
	
	if(staff_id){
		generalPop("담당자를 선택하세요.");
		return;
	}
	if(pjcode){
		generalPop("Project Code를 선택하세요.");
		return;
	}
	if(cus_name){
		generalPop("고객 담당자를 선택하세요.");
		return;
	}
	if(tax_name){
		generalPop("계산서 담당자를 입력하세요.");
		return;
	}
	
	//매출및 매입내역
	if(dsTb_ar.length==0&&etcTb_ar.length==0&&alcTb_ar.length==0){
		generalPop("매출 및 매입내역을 추가하세요.");
		return;
	}
	
	if(alcTb_ar.length>0){
		var alcchk=false;		
		alcTb_ar2.trav(function(d,i){
			if(!d[9])alcchk=true;
		});		
		if(alcchk){
			generalPopOk("추가한 변경 매출 및 매입내역을 입력하세요.");
			return;
		}
	}
	
	//매출 세금계산서
	var in_split=document.getElementsByName("in_split");
	
	if(in_split.length>0){
		var ct=0;
		in_split.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("분할을 입력하세요.");
			return;
		};
		
		var in_issued=document.getElementsByName("in_issued");
		var ct=0;
		in_issued.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("발행일 선택하세요.");
			return;
		};
		
		var in_invoice_name=document.getElementsByName("in_invoice_name");
		var ct=0;
		in_invoice_name.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("계산서명을 입력하세요.");
			return;
		};
		
		var in_method=document.getElementsByName("in_method");
		var ct=0;
		in_method.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("수기/전자를 선택하세요.");
			return;
		};

		var sales_price_chk=sumPrice_chk();
		if(!sales_price_chk){
			generalPopOk("총계약금과 매출세금계산서의 매출액이 맞지않습니다.");
			return;
		}
		
		var in_payment_requisite_content=document.getElementsByName("in_payment_requisite_content");
		var ct=0;
		in_payment_requisite_content.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("매출결제조건을 입력하세요.");
			return;
		};
	}else{
		generalPop("매출 세금계산서를 추가하세요.");
		return;
	}
	
	var purchaseLength=document.getElementById("purchase_contents").childNodes.length;
	//매입 세금계산서
	if(purchaseLength>0){		
		var in_buy_split=document.getElementsByName("in_buy_split");
		var ct=0;
		in_buy_split.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("분할을 입력하세요.");
			return;
		};
		
		var in_buy_issued=document.getElementsByName("in_buy_issued");
		var ct=0;
		in_buy_issued.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("발행일을 선택하세요.");
			return;
		};
		
		var in_buy_invoice_name=document.getElementsByName("in_buy_invoice_name");
		var ct=0;
		in_buy_invoice_name.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("계산서명을 입력하세요.");
			return;
		};
		
		var in_buy_method=document.getElementsByName("in_buy_method");
		var ct=0;
		in_buy_method.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("수기/전자를 선택하세요.");
			return;
		};
		
		/*
		var in_buy_price=document.getElementsByName("in_buy_price");
		var sum_purchase=document.getElementById("sum_purchase");
		var ct=0;
		var sum=0;
		in_buy_price.trav(function(d,i){
			if(!d.value) ct++;
			sum+=uncomma(d.value)*1;
		});
		if(ct>0){
			generalPop("매입가을 입력하세요.");
			return;
		};
		
		sum_purchase=uncomma(sum_purchase.value)*1;
		if(sum!=sum_purchase){
			generalPop("매입가와 매입세금계산서의 매입액이 맞지않습니다.");
			return false;
		}
		
		var in_buy_payment_requisite_content=document.getElementsByName("in_buy_payment_requisite_content");
		var ct=0;
		in_buy_payment_requisite_content.trav(function(d,i){
			if(!d.value) ct++;
		});
		if(ct>0){
			generalPop("매출결제조건을 입력하세요.");
			return;
		};
		*/		
	}
	
	var confer_kind=document.getElementById("sales_confer_kind");
	
	if(opener.flag=="modi"&&(pop_main.sales_confer_kind!=confer_kind.value)){
		var confer_id=document.getElementById("sales_confer_id"),
			ds_id=document.getElementsByName("in_sales_record_ds_id"),
			record_id=document.getElementsByName("in_sales_record_id"),
			alc_id=document.getElementsByName("in_alc_sales_record_ds_id"),
			invoice_id=document.getElementsByName("in_invoice_id"),
			buy_invoice_id=document.getElementsByName("in_buy_invoice_id");
		confer_id.value="";
		ds_id.trav(function(d,i){
			d.value="";
		});
		record_id.trav(function(d,i){
			d.value="";
		});
		alc_id.trav(function(d,i){
			d.value="";
		});
		invoice_id.trav(function(d,i){
			d.value="";
		});
		buy_invoice_id.trav(function(d,i){
			d.value="";
		});
		callproductSave(fnc,fnc2);
	}else{
		callproductSave(fnc,fnc2);
	}
};
function callproductSave(fnc,fnc2){
	generalPop("저장하시겠습니까?",function(){
		var	temp = $("input, select, textarea").serializeArray(),
			dv1=document.getElementById("dsTb01"),
			dv2=document.getElementById("dsTb02"),
			dv3=document.getElementById("dsTb03"),
			dv4=document.getElementById("etctempdv");
		if(dv1){
			if(prev_pop.etcTemp){
				dv4.childNodes[0].innerHTML="";
				prev_pop.etcTemp.trav(function(d,i){
					temp.push(d);
				});
			}
			if(prev_pop.alcTemp){
				dv4.childNodes[1].innerHTML="";
				prev_pop.alcTemp.trav(function(d,i){
					temp.push(d);
				});
			}
		}else if(dv2){
			if(prev_pop.dsTemp){
				dv4.childNodes[0].innerHTML="";
				prev_pop.dsTemp.trav(function(d,i){
					temp.push(d);
				});
			}
			if(prev_pop.alcTemp){
				dv4.childNodes[1].innerHTML="";
				prev_pop.alcTemp.trav(function(d,i){
					temp.push(d);
				});
			}
		}else if(dv3){
			if(prev_pop.etcTemp){
				dv4.childNodes[0].innerHTML="";
				prev_pop.etcTemp.trav(function(d,i){
					temp.push(d);
				});
			}
			if(prev_pop.dsTemp){
				dv4.childNodes[1].innerHTML="";
				prev_pop.dsTemp.trav(function(d,i){
					temp.push(d);
				});
			}
		}
		$.ajax({
			url: "/sas/product/productSalesSave",
			type: "POST",
			data: temp,
			dataType: "text",
			success : function (data) {
				if(data == "fail") generalPop(data);
				else{
					var confer=document.getElementById("sales_confer_id");
					confer.value=data;
					generalPopOk("저장되었습니다.",function(){
						if(fnc2)fnc2();
						else{
							fnc();
							opener.searchAdmin();
						}
					});
				}
				$('.wrap-loading-pop').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading-pop').show();
			}
		});
	});
};
function productApprove(fnc){
	var obj = {node_id:opener.prev_tr.obj.node_id, source_object_id:opener.prev_tr.obj.source_object_id,
			approval_id:opener.prev_tr.obj.approval_id, final_expanse_appoint:opener.prev_tr.obj.final_expanse_appoint,
			sales_confer_id:opener.prev_tr.obj.sales_confer_id};
	
	//dir(obj);
	generalPop("승인하시겠습니까?", function(){		
		
		$.ajax({
			url: "/sas/approval/prdSalesApprovalPermit",
			type: "POST",
			data: obj,
			dataType: "text",
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPopOk("승인처리되었습니다.",function(){
					fnc();
					opener.prdSalesApprovalList();
				});
				$('.wrap-loading-pop').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading-pop').show();
			}
		});
	});	
};
function productReject(fnc){	
	generalPop("반려하시겠습니까?", function(){
		var obj = {node_id:opener.prev_tr.obj.node_id, source_object_id:opener.prev_tr.obj.source_object_id, 
				approval_id:opener.prev_tr.obj.approval_id, sales_confer_id:opener.prev_tr.obj.sales_confer_id};
		$.ajax({
			url: "/sas/approval/prdSalesApprovalCancel",
			type: "POST",
			data: obj,
			dataType: "text",
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPopOk("반려처리되었습니다.",function(){
					fnc();
					opener.prdSalesApprovalList();
				});
				$('.wrap-loading-pop').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading-pop').show();
			}
		});
	});	
};
function productSalesComSave(obj){
	var cname=document.getElementById("ps_alc_company_name"),
		con=document.getElementById("scrFull");
	if(cname){
		cname.value=obj.company_name;
		cf.killTag(con.parentNode);
	}
};
function alcRecordSrch(){
	var alcTb01=document.getElementById("alcTb01"),
		sh_company_name=document.getElementById("ps_alc_company_name"),
		sh_year=document.getElementById("sh_year"),
		sh_place_of_business=document.getElementById("sh_place_of_business"),
		sh_sales_customer=document.getElementById("sh_sales_customer"),
		sh_license_year=document.getElementById("sh_license_year"),
		sh_license_month=document.getElementById("sh_license_month");
	
	if($("#sh_license_year").val() != "" && $("#sh_license_month").val() == "")generalPop(" License Date 월을 선택하세요.");				
	else if($("#sh_license_year").val() == "" && $("#sh_license_month").val() != "")generalPop(" License Date 년도를 선택하세요.");			
	else{
		var obj={sh_company_name:sh_company_name.value,sh_company_id:sh_company_id.value,sh_year:sh_year.value,sh_place_of_business:sh_place_of_business.value,
				sh_sales_customer:sh_sales_customer.value,sh_license_year:sh_license_year.value,sh_license_month:sh_license_month.value};
		$.ajax({
			  url: "/alc/status/alcStatusList",
			  type: "POST",
			  data: obj,
			  async: true,
			  dataType: "json",
			  success: function (data) {
				  alcPop_obj=data.alcStatusList;
				  calldataset();
			  }
		});
		function calldataset(){
			alcRecordDataSet();
			var res=q.parse("select * from alcpoptb;");
			callAlcRecordTb1(alcTb01,res.arr);
		};
	}
};
function alcRecordDataSet(){
	var ar=[];
	if(alcPop_obj&&alcPop_obj.length>0){
		alcPop_obj.trav(function(d,i){
			if(!d.alc_year) d.alc_year="";
			if(!d.alc_id) d.alc_id="";
			if(!d.stock_yn) d.stock_yn="";
			if(!d.company_id) d.company_id="";
			if(!d.company_name) d.company_name="";
			if(!d.contract_number_id) d.contract_number_id="";
			if(!d.sales_project_code)d.sales_project_code="";
			if(!d.prd_revision)d.prd_revision="";
			if(!d.portfolio) d.portfolio="";
			if(!d.prd_number) d.prd_number="";
			if(!d.prd_type) d.prd_type="";
			if(!d.trigram) d.trigram="";
			if(!d.portfolio_item_name) d.portfolio_item_name="";
			if(!d.qty) d.qty="";
			ar.push([d.alc_id,d.sales_project_code,d.portfolio,d.prd_number,d.prd_type,d.trigram,d.portfolio_item_name,d.prd_revision,d.qty,"",d.alc_year,d.company_id,d.stock_yn]);
		});	
	}
	q.reg("alcpoptb",{
		arr:ar,
		header:["alc_id","sales_project_code","portfolio","prd_number","prd_type","trigram","portfolio_item_name","prd_revision","qty","empty","alc_year","company_id","stock_yn"],
		meta:["string","string","string","string","string","string","string","number","number","string","string","string","string"]
	});
};
function alcRecordAdd(){
	var ar=[],ar2=[],ar3=[],last;	
	chk_alc1.trav(function(d,i){
		if(d[0].checked==true){
			ar.push([d[0].value,d[2]]);
		};
	});
	
	if(chk_alc2.length>0){
		ar.trav(function(f,g){
			ar2.push([f[0],f[1]]);
		});
		var distinct=ar2.distinct(0);
		distinct.trav(function(d,i){
			ar3.push([d,""])
		});
		ar3.trav(function(d,i){
			ar2.trav(function(f,g){
				if(d[0]==f[0])d[1]=f[1];
			});
		});
		last=ar3;
	}else last=ar;
	
	var qty="select alc_id,sales_project_code,portfolio,prd_number,prd_type,trigram,portfolio_item_name,prd_revision,qty,qty from alcpoptb where",
		len=last.length;	
	if(len>0){
		last.trav(function(d,i){
			if(i==len-1) qty+=" alc_id="+d[0]+";";
			else qty+=" alc_id="+d[0]+" or ";
		});
		var res=q.parse(qty),
			dv=document.getElementById("alcTb02");
		callAlcRecordTb2(dv,res.arr);
	}else generalPopOk("추가할 ALC를 선택하세요.")
};
function alcRecordDel(ar){
	var qty="select alc_id,sales_project_code,portfolio,prd_number,prd_type,trigram,portfolio_item_name,prd_revision,qty,qty from alcpoptb where",
		len=ar.length;	
	if(len>0){
		ar.trav(function(d,i){
			if(i==len-1) qty+=" alc_id="+d+";";
			else qty+=" alc_id="+d+" or ";
		});
		var res=q.parse(qty),
			dv=document.getElementById("alcTb02");
		callAlcRecordTb2(dv,res.arr);
	}else{
		var dv=document.getElementById("alcTb02");
		callAlcRecordTb2(dv,[]);
	}
};
function alcPopRecordSave(con){
	var dv=document.getElementById("dsTb03"),ar=[],ar2=[];
	chk_alc3.trav(function(d,i){
		ar.push([d[0][0],d[2]]);
	});
	var qty="select portfolio,trigram,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,alc_id,empty from alcpoptb where",
		qty2="select portfolio,trigram,prd_type,prd_number,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,"+//14
		"empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,empty,"+//32
		"alc_id,empty,empty,empty,empty,alc_year,company_id,stock_yn,empty,prd_revision from alcpoptb where",
		chk="select portfolio,trigram,prd_type,prd_number from alcpoptb where",
		len=ar.length;
	
	if(len>0){
		ar.trav(function(d,i){
			if(i==len-1){
				qty+=" alc_id="+d[0]+";";
				qty2+=" alc_id="+d[0]+";";
				chk+=" alc_id="+d[0]+";";
			}else{
				qty+=" alc_id="+d[0]+" or ";
				qty2+=" alc_id="+d[0]+" or ";
				chk+=" alc_id="+d[0]+" or ";
			}
		});
		var res=q.parse(qty),
			res2=q.parse(qty2),
			res3=q.parse(chk);
		res.arr.trav(function(d,i){
			ar.trav(function(f,g){
				if(d[15]==f[0]){
					d[4]=f[1];
				}
			});
		});
		res2.arr.trav(function(d,i){
			ar.trav(function(f,g){
				if(d[32]==f[0]){
					d[8]=f[1];
					d[32]=1;
				}
			});
		});
		
		if(alcTb_ar.length>0){
			res.arr.trav(function(d,i){
				alcTb_ar.push(d);
			});
			res2.arr.trav(function(d,i){
				alcTb_ar2.push(d);
			});
		}else{
			alcTb_ar=res.arr;
			alcTb_ar2=res2.arr;
		}
		addAlcSalesDetailTable2(dv,opener.prev_salespop01.flag,alcTb_ar);
		
		var a=document.getElementById("alc_salesDetail_contents").offsetHeight,
			tabdv=document.getElementById("dsTb03");
		cf.setCss(tabdv,{height:a+50+"px"});
		
		cf.killTag(con.parentNode);
	}
};
function alcRecordAddPop(str,flag,data){
	chk_alc3=new Array();
	var wh=cf.workareaheight,
		con=document.createElement("div"),
		con0=cf.mkTag("div",con),	
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);
	
	con2.className="my_top";
	span.innerHTML=str;
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(con,{position:"absolute",width:1000+"px"});
	cf.setCss(con1,{width:1000+"px",border:2+"px solid black",backgroundColor:"#fff"});	
	
	var con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con3);
	con3.className="my-container";
	con4.className="con_table";
	con5.className="Wrap_table";
	
	mkDiv_alcRecordSrch(con4);
	alcRecordTb(con5);
	
	cf.setCss(con,{height:cf.workareaheight-100+"px",maxHeight:715+"px"});
	cf.setCss(con1,{height:cf.workareaheight-100+"px",maxHeight:715+"px"});
	cf.setCss(con3,{height:cf.workareaheight-215+"px",maxHeight:615+"px",overflowY:"auto",paddingBottom:0+"px",marginBottom:10+"px"});
	cf.setCss(con4,{marginTop:25+"px",marginBottom:15+"px"});
	
	var con6=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con6),
		span=cf.mkTag("span",con6),
		btn2=cf.mkTag("button",con6);
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey normal";
	btn2.className="ct-btn grey normal";
	btn1.innerHTML="확인";
	btn2.innerHTML="취소";
	span.innerHTML="  ";
	btn1.onclick=function(){
		var qytchk=document.getElementsByName("pop_alc_change_qty"),
			chk=true;
		qytchk.trav(function(d,i){
			if(!d.value||d.value==0||d.value=="0")chk=false;
		});
		if(!chk)generalPopOk("변경  COPY를 입력하세요.");
		else if(chk_alc2.length==0)generalPopOk("추가할 변경 매입 및 매출내역이 없습니다.");	
		else alcPopRecordSave(con);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	callPop(con);
	autocompleteCompanySearch();
	datePicker("input_date", "yy-mm-dd");
};
function mkDiv_alcRecordSrch(p){
	var companyid=document.getElementById("companyid"),
		companyname=document.getElementById("companyname");
	$.ajax({
		  url: "/alc/admin/alcSearchAdminListAjax",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  success: function (data) {
			  PLACEOFBUSINESS = data.placeOfBusiness;
			  SALES = data.sales;
		  }
	});	
	p.innerHTML="";
	p.className="search_pop3";
	p.id="alc_searchDiv";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx1),
		ipt=cf.mkTag("input", bx1);
	span.innerHTML = "고객사명";
	ipt.type="text";
	ipt.className="input_han";
	ipt.id="ps_alc_company_name";
	ipt.name="sh_company_name";
	ipt.onkeypress=function(e){
		if(e.target.value.length==0||!e.target.value)document.getElementById("sh_company_id").value="";
	};
	mkHidden("","sh_company_id",bx1);
	
	var img=cf.mkTag("img",bx1);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0,productSalesComSave);
	};	
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx1,{width:210+"px"});
	
	var bx2=cf.mkTag("div", line1),
		select = cf.mkTag("select", bx2),
		span = cf.mkTag("span", bx2);
	select.id = "sh_year";
	select.name = "sh_year";
	mkYearSelect(select,CurrentDate[0]);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{marginLeft:5+"px"});
	cf.setCss(bx2,{paddingLeft:35+"px",width:90+"px"});
	
	var bx3=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx3);
		select=cf.mkTag("select", bx3);
	span.innerHTML = "사업장 구분";
	select.id="sh_place_of_business";
	select.name="sh_place_of_business";
	mkSelect(select,PLACEOFBUSINESS,"","Y");
	cf.setCss(select,{width:80+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px",width:145+"px"});
	
	var bx4 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx4),
		select= cf.mkTag("select", bx4);
	span.innerHTML = "담당영업";
	select.id="sh_sales_customer";
	select.name="sh_sales_customer";
	mkSelect(select, SALES,"","Y");
	cf.setCss(select,{width:80+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{width:135+"px",paddingLeft:35+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx5=cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		select1 = cf.mkTag("select", bx5),
		select2 = cf.mkTag("select", bx5)
	select1.id = "sh_license_year";
	select1.name = "sh_license_year";
	span.innerHTML = "License Date";
	select2.id = "sh_license_month";
	select2.name = "sh_license_year";
	mkYearSelect(select1,"",true);
	mkMonthSelect(select2,"",true);
	select1.value="";
	select2.value="";
	cf.setCss(select1,{width:70+"px"});
	cf.setCss(select2,{width:70+"px",marginLeft:5+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	//cf.setCss(bx5,{width:197+"px"});		
	
	var bx6=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx6);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx6.className="cursor";
	bx6.onclick=function(){
		document.getElementById("sh_year").value=CurrentDate[0];
		document.getElementById("ps_alc_company_name").value="";
		document.getElementById("sh_company_id").value="";
		document.getElementById("sh_place_of_business").value="";
		document.getElementById("sh_sales_customer").value="";
		document.getElementById("sh_license_year").value="";
		document.getElementById("sh_license_month").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go3 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = alcRecordSrch;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line1,{height:26+"px"});
	cf.setCss(line2,{marginTop:5+"px",height:26+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left",paddingLeft:20+"px"});
};
function alcRecordTb(p){
	var btndv1=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		img1=cf.mkTag("img",btndv1),
		topdv=cf.mkTag("div",p),
		cl2=cf.mkTag("div",p),
		btndv2=cf.mkTag("div",p),
		cl3=cf.mkTag("div",p),
		img2=cf.mkTag("img",btndv2),
		botdv=cf.mkTag("div",p);
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img2.src="/images/btn/btn_del_on.gif";
	img1.onclick=function(){
		alcRecordAdd();
	};
	img2.onclick=function(){
		var a=juSel(chk_alc2,true);
		if(!a.opt)	generalPopOk("삭제할 alc를 선택하세요.");
		else{
			var idx;
			chk_alc2.trav(function(d,i){
				if(d[0].checked){
					idx=i;
					cf.killTag(d.parentNode);
				}
			});
			chk_alc2.splice(idx,1);
			
			var ar=[];
			chk_alc2.trav(function(d,i){
				ar.push(d[0].value);
			});
			alcRecordDel(ar);
		}
	};

	callAlcRecordTb1(topdv,[]);
	callAlcRecordTb2(botdv,[]);
	cf.setCss(btndv1,{paddingTop:5+"px",height:30+"px",float:"right"});
	cf.setCss(btndv2,{paddingTop:5+"px",height:30+"px",float:"right"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(cl3,{clear:"both"});
};
function callAlcRecordTb1(p,data){
	chk_alc1=new Array();
	p.innerHTML="";
	p.id="alcTb01";
	
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbcont=cf.mkTag("div",p);

	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["","Project Code","Portfolio<br>(Brand)","Prd. Number<br>(Product)","Type","Trigram<br>(Module)","Portfolio<br>Item Name","Revision","Copy"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0){
					var ipt=cf.mkTag("input",col);
					ipt.type="checkbox";
					ipt.className="CheckMode";
					ipt.onclick=function(){
						GroupCheck('CheckMode','alc_prd_code');
					};
				}
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j,true);				
			}				
		});
	});//head
	
	if(!data||data.length==0){
		var tds=new TABLE({
			p:tbcont,
			arr:[["조회된 데이터가 없습니다.","","","",""]],
			mode:false,
			header:[],
			colspans:[{y:0, x:0, howmany:5}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					commonstyle(row,i,col,j);
					cf.setCss(col,{height:31+"px",borderRight:1+"px solid #e5e5e5"});					
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbcont,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					alc_tablecellaction_pop01(tds,data,row,i,col,j);
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}	
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j,opt){
		if(opt){
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellPadding="0px";
				tb.cellSpacing="0px";
				tb.className="Normal_table";
				cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			}
			if(j==0)cf.setCss(col,{width:29+"px",});
			else if(j==1)cf.setCss(col,{width:109+"px"});
			else if(j==3)cf.setCss(col,{width:139+"px"});
			else if(j==4)cf.setCss(col,{width:99+"px"});
			else if(j==5)cf.setCss(col,{width:129+"px"});
			else if(j==6)cf.setCss(col,{width:149+"px"});
			else if(j==7)cf.setCss(col,{width:49+"px"});
			else if(j==8)cf.setCss(col,{width:69+"px",borderRight:1+"px solid #e5e5e5"});
		}else{
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellPadding="0px";
				tb.cellSpacing="0px";
				tb.className="Normal_table";
				cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
				cf.setCss(col,{borderTop:0+"px"});
			}
			if(j==0)cf.setCss(col,{width:29+"px",});
			else if(j==1)cf.setCss(col,{width:109+"px"});
			else if(j==3)cf.setCss(col,{width:139+"px"});
			else if(j==4)cf.setCss(col,{width:99+"px"});
			else if(j==5)cf.setCss(col,{width:129+"px"});
			else if(j==6)cf.setCss(col,{width:149+"px"});
			else if(j==7)cf.setCss(col,{width:49+"px"});
			else if(j==8)cf.setCss(col,{width:52+"px",borderRight:1+"px solid #e5e5e5"});
			else if(j>8)cf.setCss(col,{display:"none"});
		}		
	};	
	cf.setCss(cl,{clear:"both"});
	cf.setCss(tbcont,{overflowY:"scroll",height:170+"px",borderBottom:1+"px solid #e3e3e3",borderLeft:1+"px solid #e3e3e3",marginBottom:5+"px"});
};
function alc_tablecellaction_pop01(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==0){
		var ipt=cf.mkTag("input",col);
		ipt.type="checkbox";
		ipt.className="alc_prd_code";
		ipt.id="alc_prd_code";
		ipt.name="alc_prd_code";
		ipt.value=txt;
		chk_alc1.push([ipt,data[i],""]);
		ipt.onclick=function(){
			chkClick(this,data[i],"");
		};
		col.onclick=function(){
			if(!prev_alc1){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_alc1.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_alc1=this.parentNode;
			prev_alc1.idx=i;
			prev_alc1.data=data[i];
			chkClick(this.childNodes[0],data[i],"");
		};
	}else{
		col.innerHTML=txt;
		col.className="cursor";
		col.onclick=function(){
			var chk=this.parentNode.childNodes[0].childNodes[0];
			if(!prev_alc1){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_alc1.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			if(chk.checked==true)chk.checked=false;
			else chk.checked=true;
			prev_alc1=this.parentNode;
			prev_alc1.idx=i;
			prev_alc1.data=data[i];
			chkClick(this.parentNode.childNodes[0].childNodes[0],data[i],"");
		};
	}
};
function callAlcRecordTb2(p,data){
	chk_alc2=new Array();
	p.innerHTML="";
	p.id="alcTb02";
	
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbcont=cf.mkTag("div",p);

	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["","Project Code","Portfolio<br>(Brand)","Prd. Number<br>(Product)","Type","Trigram<br>(Module)","Portfolio<br>Item Name","Revision","Copy","변경 Copy"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0){
					var ipt=cf.mkTag("input",col);
					ipt.type="checkbox";
					ipt.className="CheckMode";
					ipt.onclick=function(){
						GroupCheck('CheckMode','alc_prd_code2');
					};
				}
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j,true);				
			}				
		});
	});//head
	
	if(!data||data.length==0){
		var tds=new TABLE({
			p:tbcont,
			arr:[["조회된 데이터가 없습니다.","","","",]],
			mode:false,
			header:[],
			colspans:[{y:0, x:0, howmany:10}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					commonstyle(row,i,col,j);
					cf.setCss(col,{height:31+"px",borderRight:1+"px solid #e5e5e5"});					
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbcont,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					alc_tablecellaction_pop02(tds,data,row,i,col,j);
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}	
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j,opt){
		if(opt){
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellPadding="0px";
				tb.cellSpacing="0px";
				tb.className="Normal_table";
				cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			}
			if(j==0)cf.setCss(col,{width:29+"px",});
			else if(j==1)cf.setCss(col,{width:109+"px"});
			else if(j==3)cf.setCss(col,{width:139+"px"});
			else if(j==4)cf.setCss(col,{width:89+"px"});
			else if(j==5)cf.setCss(col,{width:119+"px"});
			else if(j==6)cf.setCss(col,{width:149+"px"});
			else if(j==7)cf.setCss(col,{width:69+"px"});
			else if(j==8)cf.setCss(col,{width:49+"px"});
			else if(j==9)cf.setCss(col,{width:79+"px",borderRight:1+"px solid #e5e5e5"});
		}else{
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellPadding="0px";
				tb.cellSpacing="0px";
				tb.className="Normal_table";
				cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
				cf.setCss(col,{borderTop:0+"px"});
			}
			if(j==0)cf.setCss(col,{width:29+"px",});
			else if(j==1)cf.setCss(col,{width:109+"px"});
			else if(j==3)cf.setCss(col,{width:139+"px"});
			else if(j==4)cf.setCss(col,{width:89+"px"});
			else if(j==5)cf.setCss(col,{width:119+"px"});
			else if(j==6)cf.setCss(col,{width:149+"px"});
			else if(j==7)cf.setCss(col,{width:69+"px"});
			else if(j==8)cf.setCss(col,{width:49+"px"});
			else if(j==9)cf.setCss(col,{width:62+"px",borderRight:1+"px solid #e5e5e5"});
		}		
	};	
	cf.setCss(cl,{clear:"both"});
	cf.setCss(tbcont,{overflowY:"scroll",height:200+"px",borderBottom:1+"px solid #e3e3e3",borderLeft:1+"px solid #e3e3e3",marginBottom:5+"px"});	
};
function alc_tablecellaction_pop02(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==0){
		var ipt=cf.mkTag("input",col);
		ipt.type="checkbox";
		ipt.className="alc_prd_code2";
		ipt.id="alc_prd_code";
		ipt.name="alc_prd_code";
		ipt.value=txt;
		chk_alc2.push([ipt,""]);
		col.onclick=function(){
			if(!prev_alc2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_alc2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_alc2=this.parentNode;
			prev_alc2.idx=i;
			prev_alc2.data=data[i];
		};
	}else{
		col.className="cursor";
		col.onclick=function(){
			var chk=this.parentNode.childNodes[0].childNodes[0];
			if(!prev_alc2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_alc2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			if(chk.checked==true)chk.checked=false;
			else chk.checked=true;
			prev_alc2=this.parentNode;
			prev_alc2.idx=i;
			prev_alc2.data=data[i];
		};
		
		if(j==9){
			var ipt=cf.mkTag("input",col);
			ipt.name="pop_alc_change_qty";
			ipt.id="";
			if(chk_alc1[i][2])ipt.value=chk_alc1[i][2];
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var val=(e.target.value)*1,
					ori=(data[i][8])*1;
				if(val>ori)generalPopOk("원본 Copy를 확인 하세요.",function(){
					e.target.value="";
					e.target.focus();
					return;
				});
				chk_alc1[i][2]=e.target.value;
				chk_alc2[i][1]=e.target.value;
				chk_alc3[i][2]=e.target.value;
			};
			cf.setCss(ipt,{width:95+"%",textAlign:"center"});
		}else col.innerHTML=txt;
	}
};
function chkClick(ipt,val,cnt){	
	if(chk_alc3.length==0){
		if(ipt.checked)chk_alc3.push([val,cnt]);
	}else{
		if(ipt.checked){
			chk_alc3.trav(function(d,idx){
				if(d[0][0]!=val[0])chk_alc3.push([val,cnt]);
			});
		}else{
			chk_alc3.trav(function(d,idx){
				if(d[0][0]==val[0])chk_alc3.splice(idx,1);
			});
		}
	}	
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
			if(d[0].checked){
				cnt++;
				val.push(d[0].value);
			}
		});
	}
	if(cnt>0) opt=true;	
	return {opt:opt, val:val};
};
