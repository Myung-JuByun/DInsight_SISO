callPrdSalesList();
function callPrdSalesList(){
	defaulCodeList();
	dsTb_ar=new Array();
	dsTb_ar2=new Array();
	etcTb_ar=new Array();
	etcTb_ar2=new Array();
	opener.prev_salespop01.pop=this;
	prev_pop=this;
	prev_pop.dsHead=["portfolio","trigram","prd_type","prd_number","plc","alc","etc","ds_list_price","ds_qty","each_yn","sales_alc_dc","sales_plc_dc","sales_alc_dc_price",
	                 "sales_plc_dc_price","sales_price","purchase_plc_dc","purchase_alc_dc","purchase_plc_dc_price","purchase_alc_dc_price","ds_purchase_unit_price","ds_purchase_price",
	                 "ds_po_day","install_day","ordering_day","license_start_date","license_end_date","qlc","ylc","target_id","place_of_business","sales_record_ds_id","price_list_date","chang_yn"];
	prev_pop.alcHead=["portfolio","trigram","prd_type","prd_number","plc","alc","etc","ds_list_price","ds_qty","each_yn","sales_alc_dc","sales_plc_dc","sales_alc_dc_price",
	                  "sales_plc_dc_price","sales_price","purchase_plc_dc","purchase_alc_dc","purchase_plc_dc_price","purchase_alc_dc_price","ds_purchase_unit_price","ds_purchase_price",
	                  "ds_po_day","install_day","ordering_day","license_start_date","license_end_date","qlc","ylc","target_id","place_of_business","sales_record_ds_id","price_list_date","chang_yn"];
	prev_pop.etcHead=["sales_gb","model","des_start_day","des_end_day","qty","list_price","sales_unit_price","sales_price","sales_dc","purchase_unit_price",
   	                "purchase_price","purchase_dc","supplier","purchase_pay_code","purchase_pay_method"];	
	//window.onLoad=this.focus();
	if(opener.prev_salespop01.flag!="new")callSalesPopList();
	var p=cf.mkTag("div",document.body),
		bx=new jCON({p:p,h:360}),
		topdv=cf.mkTag("div",bx.header),
		str=cf.mkTag("div",topdv),
		exit_dv=cf.mkTag("div",topdv),
		exit_btn=cf.mkTag("img",exit_dv);
		btndv=cf.mkTag("div",p);
	btndv.id="pop_btndv";
	exit_btn.className="cursor";
	exit_btn.src="/images/pop_btn/btn_pop_close.png";
	str.innerHTML="매입 및 매출 품의서";
	exit_btn.onclick=function(){
		if(opener.prev_salespop01.flag=="new"||opener.prev_salespop01.flag=="modi"){
			generalPop("품의서 작성을 취소하시겠습니까?",function(){
				window.close();
			});
		}else window.close();
	};
	
	cf.setCss(topdv,{padding:10+"px 6px 6px 6px",height:26+"px",textAlign:"center"});
	cf.setCss(exit_dv,{position:"absolute",right:10+"px",top:10+"px",zIndex:99});
	cf.setCss(bx.header,{width:100+"%",position:"relative",height:42+"px",fontSize:16+"px",fontWeight:"bold",backgroundColor:"#575757",color:"#fff"});
	cf.setCss(bx.body,{height:"auto",width:100+"%",paddingBottom:50+"px"});//,backgroundColor:"#fbfbfb",borderBottom:1+"px solid #b9b9b9"
	cf.setCss(bx.footer,{height:"auto",paddingLeft:20+"px",paddingRight:20+"px",paddingBottom:50+"px",width:"auto"});
	cf.setCss(p,{height:"auto",width:"100%"});
	
	if(opener.prev_salespop01.flag=="view"||opener.prev_salespop01.flag=="approval")cf.setCss(p,{minWidth:1800+"px"});
	else cf.setCss(p,{minWidth:1500+"px"});
	
	callPrdSalesTitle(bx.body,opener.prev_salespop01.flag,opener.prev_salespop01.num);
	callPrdSalesCont(bx.footer,opener.prev_salespop01.flag,opener.prev_salespop01.num);
	
	if(opener.prev_salespop01.flag=="new"){
		var btn1=cf.mkTag("buttom",btndv),
			span=cf.mkTag("span",btndv),
			btn2=cf.mkTag("buttom",btndv),
			span2=cf.mkTag("span",btndv),
			btn3=cf.mkTag("buttom",btndv);
		btndv.className="savebtn2";
		btn1.className="ct-btn blue large";
		btn2.className="ct-btn grey large";
		btn3.className="ct-btn red large";
		btn1.innerHTML="저장";
		btn2.innerHTML="취소";
		btn3.innerHTML="제출";
		span.innerHTML="&nbsp;&nbsp;";
		span2.innerHTML="&nbsp;&nbsp;";
		btn1.onclick=function(){
			var kind=document.getElementById("sales_confer_kind"),			
				kind_gb=callProductSalesKindGb();
			if(kind_gb=="N"){
				productSave(window.close);
			}else{
				var str="";
				KINDLIST.trav(function(d,i){
					if(d.code_id==kind.value)str=d.code_name;
				});
				generalPopOk2("기존의 "+str+"품의서가 있습니다.<br/> 변경 품의 하시기 바랍니다.");	
			}
		};
		btn2.onclick=function(){
			if(opener.prev_salespop01.flag=="new"||opener.prev_salespop01.flag=="modi"){
				generalPop("품의서 작성을 취소하시겠습니까?",function(){
					window.close();
				});
			}else window.close();
		};
		btn3.onclick=function(){
			var confer=document.getElementById("sales_confer_id");
			if(opener.paymentlist&&opener.paymentlist>0){
				productSave(window.close,function(){					
					generalPop("제출하시겠습니까?",function(){
						var obj={sales_confer_year:CurrentDate[0],sales_confer_month:CurrentDate[1],sales_confer_id:confer.value};
						$.ajax({
							url: "/sas/product/productSalesFinalSubmit",
							type: "POST",
							data: obj,
							success : function (data) {
								if(data != "success") generalPop(data);
								else generalPopOk("제출되었습니다.",function(){
									window.close();
									opener.searchAdmin();
								});
								$('.wrap-loading-pop').hide(20);
							},
							beforeSend:function(){
								$('.wrap-loading-pop').show();
							}
						});				
					});					
				});
			}else generalPopOk2("매입 및 매출 품의 결재선이 지정되지 않았습니다.");
		};
		cf.setCss(btndv,{marginBottom:35+"px"});
	}else if(opener.prev_salespop01.flag=="modi"){
		if(pop_main.status_cd!="702"){
			var btn1=cf.mkTag("buttom",btndv),
				span=cf.mkTag("span",btndv),
				btn2=cf.mkTag("buttom",btndv),
				span2=cf.mkTag("span",btndv),
				btn3=cf.mkTag("buttom",btndv);
			btndv.className="savebtn2";
			btn1.className="ct-btn blue large";
			btn2.className="ct-btn grey large";
			btn3.className="ct-btn red large";
			btn1.innerHTML="저장";
			btn2.innerHTML="취소";
			btn3.innerHTML="제출";
			span.innerHTML="&nbsp;&nbsp;";
			span2.innerHTML="&nbsp;&nbsp;";
			btn1.onclick=function(){
				var kind=document.getElementById("sales_confer_kind");				
				if(kind.value==pop_main.sales_confer_kind){
					productSave(window.close);
				}else{
					var kind_gb=callProductSalesKindGb();
					if(kind_gb=="N"){
						productSave(window.close);
					}else{
						var str="";
						KINDLIST.trav(function(d,i){
							if(d.code_id==kind.value)str=d.code_name;
						});
						generalPopOk2("기존의 "+str+"품의서가 있습니다.<br/> 변경 품의 하시기 바랍니다.");	
					}
				}
			};
			btn2.onclick=function(){
				if(opener.prev_salespop01.flag=="new"||opener.prev_salespop01.flag=="modi"){
					generalPop("품의서 작성을 취소하시겠습니까?",function(){
						window.close();
					});
				}else window.close();
			};
			btn3.onclick=function(){
				var confer=document.getElementById("sales_confer_id");
				if(opener.paymentlist&&opener.paymentlist>0){
					productSave(window.close,function(){
						generalPop("제출하시겠습니까?",function(){
							var obj={sales_confer_year:CurrentDate[0],sales_confer_month:CurrentDate[1],sales_confer_id:confer.value};
							$.ajax({
								url: "/sas/product/productSalesFinalSubmit",
								type: "POST",
								data: obj,
								success : function (data) {
									if(data != "success") generalPop(data);
									else generalPopOk("제출되었습니다.",function(){
										window.close();
										opener.searchAdmin();
									});
									$('.wrap-loading-pop').hide(20);
								},
								beforeSend:function(){
									$('.wrap-loading-pop').show();
								}
							});				
						});
					});
				}else generalPopOk2("매입 및 매출 품의 결재선이 지정되지 않았습니다.");
			};
			cf.setCss(btndv,{marginBottom:35+"px"});
		}
	}else if(opener.prev_salespop01.flag=="approval"){
		var btn1=cf.mkTag("buttom",btndv),
			span=cf.mkTag("span",btndv),
			btn2=cf.mkTag("buttom",btndv);
		btndv.className="savebtn2";
		btn1.className="ct-btn blue large";
		btn2.className="ct-btn red large";
		btn1.innerHTML="승인";
		btn2.innerHTML="반려";
		span.innerHTML="&nbsp;&nbsp;";
		btn1.onclick=function(){
			productApprove(window.close);
		};
		btn2.onclick=function(){
			productReject(window.close);
		};
		cf.setCss(btndv,{marginBottom:35+"px"});
	};
	window.onbeforeunload=closePage;
};
function callPrdSalesTitle(p,flag,num){
	p.innerHTML="";
	var t_dv=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		b_dv=cf.mkTag("div",p),
		ldv=cf.mkTag("div",b_dv),
		str1=cf.mkTag("div",ldv),
		tbdv1=cf.mkTag("div",ldv),
		ltb=cf.mkTag("table",tbdv1),
		cdv=cf.mkTag("div",b_dv),
		kind=cf.mkTag("div",cdv),
		ver=cf.mkTag("div",cdv),
		rdv=cf.mkTag("div",b_dv),
		rtb=cf.mkTag("table",rdv);
	t_dv.id="title_name";
	if(flag=="new")t_dv.innerHTML="매입 품 의 서";
	else t_dv.innerHTML=pop_main.sales_confer_kind_name+" 품 의 서";
	
	if(flag=="view"||flag=="approval"){
		//view]
		kind.innerHTML=pop_main.sales_confer_kind_name;		
		ver.innerHTML="수정 "+ pop_main.degree +" 차";		
		ltb.className="Normal_table";
		rtb.className="Normalprint_table";		
		
		var tr=cf.mkTag("tr",ltb),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.borderLeft=1+"px solid #e3e3e3";
		th.style.width="100px";
		th.innerHTML="작성일자";
		td.className="pd10";
		td.style.width="150px";
		td.style.textAlign="center";
		td.innerHTML=modiDate(pop_main.insert_date,"-");
		
		var tr=cf.mkTag("tr",ltb),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.borderLeft=1+"px solid #e3e3e3";
		th.innerHTML="담당자";
		td.style.textAlign="center";
		td.style.width="100px";
		td.innerHTML=pop_main.staff_name;

		var tr1=cf.mkTag("tr",rtb),
			tr2=cf.mkTag("tr",rtb),
			th1=cf.mkTag("th",tr1),
			td1=cf.mkTag("td",tr1),
			th2=cf.mkTag("th",tr2),
			td2=cf.mkTag("td",tr2);
		th1.innerHTML="Project Code";
		th2.innerHTML="계약서";
		td1.className="pd10";
		td2.className="pd10";
		td1.innerHTML=pop_main.contract_number;
		td2.innerHTML="[계약서 보기]";
		td2.onclick=function(e){
			var op={pjcode:pop_main.contract_number};
			callContractDetailData(op, function(data){
				contractDetailPop(data.salesContractRivisionList);
			});
		};
		cf.setCss(th1,{width:100+"px",borderLeft:1+"px solid #e3e3e3"});
		cf.setCss(th2,{borderLeft:1+"px solid #e3e3e3"});
		cf.setCss(td2,{cursor:"pointer",width:200+"px"});
		cf.setCss(kind,{marginLeft:40+"px",paddingTop:4+"px"});
	}else{
		//추가,수정시
		var select=cf.mkTag("select",kind);
		if(flag=="modi")mkSelect(select,KINDLIST,pop_main.sales_confer_kind);
		else mkSelect(select,KINDLIST);
		select.name="sales_confer_kind";
		select.id="sales_confer_kind";
		select.onchange=function(e){
			var title=document.getElementById("title_name");
			if(e.target.value==10)title.innerHTML="매입 품 의 서";
			else if(e.target.value==20)title.innerHTML="매출 품 의 서";
			else if(e.target.value==30)title.innerHTML="매입 및 매출 품 의 서";
			
			if(flag=="modi"){
				var status=document.getElementById("status_cd"),
					monthly_id=document.getElementById("sales_confer_monthly_id");
				
				if(status.value=="701"||status.value=="703"||status.value=="707"){
					setBtndv(true);
				}else{
					if(pop_main.sales_confer_kind!=e.target.value){
						setBtndv(true);
						status.value="701";
					}else setBtndv(false);
				}
			}//else setBtndv(true);
		};
		cf.setCss(select,{width:60+"px",marginLeft:30+"px"});
		
		str1.innerHTML="* 표시는 필수 입력 항목입니다.";
		str1.className="asterisk pd2";
		ver.innerHTML="수정 "+num+" 차";
		ltb.className="Normal_table";
		rtb.className="Normalprint_table";
		
		var tr=cf.mkTag("tr",ltb),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr),
			ipt=cf.mkTag("input",td);
		th.style.borderLeft=1+"px solid #e3e3e3";
		th.style.width="100px";
		th.innerHTML="작성일자";
		ipt.readOnly=true;
		ipt.className="input_date";
		ipt.style.width="95%";
		ipt.name="insert_date";
		if(flag=="modi")ipt.value=modiDate(pop_main.insert_date,"-");
		else ipt.value=CurrentDate[0]+"-"+CurrentDate[1]+"-"+CurrentDate[2];
		cf.setCss(td,{width:150+"px",textAlign:"center"});
		
		var tr=cf.mkTag("tr",ltb),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.borderLeft=1+"px solid #e3e3e3";
		th.innerHTML="담당자";
		var span=cf.mkTag("span",th);
		span.className="asterisk pd2";
		span.innerHTML="*";
		var ipt1=cf.mkTag("input",td),
			ipt2=cf.mkTag("input",td);
		ipt1.type="hidden";
		ipt1.name="staff_id";
		ipt1.id="staff_id";
		ipt2.readOnly=true;
		ipt2.id="staff_name";
		ipt2.name="staff_name";
		if(flag=="modi"){
			ipt1.value=pop_main.staff_id;
			ipt2.value=pop_main.staff_name;
		}else{
			ipt1.value=LOGINFO.user_id;
			ipt2.value=LOGINFO.name;
		}
		ipt2.onclick=divisionPop;
		cf.setCss(ipt2,{width:95+"%",textAlign:"center",cursor:"pointer"});
		cf.setCss(td,{width:150+"px",textAlign:"center"});

		var tr1=cf.mkTag("tr",rtb),
			tr2=cf.mkTag("tr",rtb),
			th1=cf.mkTag("th",tr1),
			td1=cf.mkTag("td",tr1),
			th2=cf.mkTag("th",tr2),
			td2=cf.mkTag("td",tr2);
		th1.style.borderLeft=1+"px solid #e3e3e3";
		th2.style.borderLeft=1+"px solid #e3e3e3";
		th1.style.width="100px";
		th1.innerHTML="Project Code";
		th2.innerHTML="계약서";
		
		var span=cf.mkTag("span",th1);
		span.className="asterisk pd2";
		span.innerHTML="*";
		
		var ipt3=cf.mkTag("input",td1),
			ipt4=cf.mkTag("input",td1),
			ipt5=cf.mkTag("input",td1);		
		ipt3.id="pjcode_id";
		ipt3.name="contract_number_id";
		ipt3.type="hidden";
		ipt4.id="pjcode";
		ipt4.name="contract_number";
		ipt4.readOnly=true;
		ipt5.id="contract_id";
		ipt5.name="contract_id";
		ipt5.type="hidden";
		if(flag=="modi"){
			ipt3.value=pop_main.contract_number_id;
			ipt4.value=pop_main.contract_number;
		}else ipt4.value="선택하세요.";		
		ipt4.onclick=function(e){
			getProductCodePop("SUCCESS_Y");
		};
		
		var ipt6=cf.mkTag("input",td2);
		ipt6.id="contract_name";
		ipt6.name="contract_name";
		ipt6.readOnly=true;
		if(flag=="modi"){
			var op={pjcode:ipt4.value},contractList;
			callContractDetailData(op, function(data){
				contractList=data.salesContractRivisionList;
			});
			if(contractList.length>0){
				ipt6.value=contractList[0].contract_name;
			}else ipt6.value="선택하세요.";
		}else ipt6.value="선택하세요.";
		ipt6.onclick=function(e){
			if(!ipt3.value)generalPopOk2("Project Code를 먼저 선택하세요.");
			else{
				var op={pjcode:ipt4.value};
				callContractDetailData(op, function(data){
					contractDetailPop(data.salesContractRivisionList,true);
				});
			}
		};		
		cf.setCss(ipt4,{width:95+"%",cursor:"pointer"});
		cf.setCss(ipt6,{width:95+"%",cursor:"pointer"});
		cf.setCss(td2,{width:200+"px",textAlign:"center"});
		cf.setCss(td1,{width:200+"px",textAlign:"center"});		
		
		mkHidden("","sales_confer_monthly_id",p);
		
		if(flag=="modi"){
			mkHidden(pop_main.status_cd,"status_cd",p);
			mkHidden(pop_main.degree,"degree",p)
		}else{
			mkHidden("701","status_cd",p);
			mkHidden("1","degree",p);
		}
	}
	
	cf.setCss(str1,{height:15+"px",paddingBottom:5+"px"});
	cf.setCss(ltb,{width:250+"px",float:"left"});
	cf.setCss(rtb,{width:300+"px",float:"right"});
	cf.setCss(cl,{clear:"both"});
	cf.setCss(rdv,{marginTop:-35+"px"});
	cf.setCss(kind,{position:"relative",float:"left",textAlign:"center",fontWeight:"bold",fontSize:13+"px"});
	cf.setCss(ver,{position:"relative",float:"left",textAlign:"center",fontWeight:"bold",fontSize:13+"px",marginLeft:15+"px",paddingTop:4+"px"});
	cf.setCss(cdv,{position:"relative",top:20+"px",width:190+"px",height:24+"px",padding:3+"px",border:2+"px solid black",margin:"auto"});
	cf.setCss(t_dv,{position:"relative",width:300+"px",textAlign:"center",paddingTop:15+"px",fontWeight:"bold",fontSize:24+"px",color:"#000",margin:0+" auto",height:43+"px"});
	cf.setCss(b_dv,{position:"relative",paddingLeft:35+"px",paddingRight:35+"px",height:70+"px"});
};
function callPrdSalesCont(p,flag,num){
	p.innerHTML="";
	var topdv=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		middv=cf.mkTag("div",p),
		dsdv=cf.mkTag("div",middv),
		etcdv=cf.mkTag("div",middv),
		alcdv=cf.mkTag("div",middv),
		cl2=cf.mkTag("div",p),
		botdv=cf.mkTag("div",p),
		saledv=cf.mkTag("div",botdv),
		purdv=cf.mkTag("div",botdv);
		
	topdv.className="sales_wrap2";
	
	if(flag=="new"){
		var table1=cf.mkTag("table",topdv);
		table1.className="Normal_table";
		addCompanyTable(table1);

		mkTab_record(dsdv,0,flag);
		
		saledv.className="sales_wrap";
		addSalesTable(saledv,flag);
		
		purdv.className="sales_wrap";
		addPurchaseTable(purdv,flag);
		
	}else if(flag=="modi"){
		var table=cf.mkTag("table",topdv);
		table.className="Normal_table";
		addCompanyTable(table,pop_main);
		
		var res=q.parse("select portfolio,trigram,plc,alc,ds_qty,sales_price,purchase_plc_dc,purchase_alc_dc,purchase_plc_dc_price,purchase_alc_dc_price," +
				"ds_purchase_unit_price,ds_purchase_price,last_sales_price,last_purchase_price,target_id,place_of_business,sales_record_ds_id from dsrecordtb01;"),
			res2=q.parse("select * from dsrecordtb01;"),
			res3=q.parse("select sales_gb,model,des_start_day,des_end_day,qty,list_price,sales_unit_price,purchase_unit_price," +
					"purchase_dc,supplier,purchase_pay_code,purchase_pay_method,sales_record_id from etcrecordtb01;"),
			res4=q.parse("select * from etcrecordtb01;"),
			res5=q.parse("select portfolio,trigram,plc,alc,ds_qty,sales_price,purchase_plc_dc,purchase_alc_dc,purchase_plc_dc_price,purchase_alc_dc_price," +
				"ds_purchase_unit_price,ds_purchase_price,last_sales_price,last_purchase_price,target_id,place_of_business,sales_record_ds_id from dsrecordtb02;"),
			res6=q.parse("select * from dsrecordtb02;");
		
		dsTb_ar=res.arr;
		dsTb_ar2=res2.arr;
		etcTb_ar=res3.arr;
		etcTb_ar2=res4.arr;
		alcTb_ar=res5.arr;
		alcTb_ar2=res6.arr;		
		mkTab_record(dsdv,0,flag);
		
		saledv.className="sales_wrap";
		addSalesTable(saledv,flag,pop_sales);
		
		purdv.className="sales_wrap";
		addPurchaseTable(purdv,flag,pop_buy);
		
	}else{
		var table=cf.mkTag("table",topdv);
		table.className="Normal_table";
		mkCompanyTable(table,pop_main);
		
		dsdv.className="sales_wrap";
		var res=q.parse("select portfolio,portfolio,trigram,prd_type,prd_number,plc,alc,etc,ds_list_price,ds_qty,sales_plc_dc,sales_alc_dc,sales_price,"+
				"purchase_plc_dc,purchase_alc_dc,purchase_plc_dc_price,purchase_alc_dc_price,ds_purchase_unit_price,ds_purchase_price,"+
				"ds_po_day,license_start_date,license_end_date from dsrecordTb01;");
		if(res.arr.length>0)addDsSalesDetailTable(dsdv,flag,"ds",res.arr);
		
		etcdv.className="sales_wrap";
		if(pop_record.length>0)mkSalesDetailTable(etcdv,flag,pop_record);
		
		alcdv.className="sales_wrap";
		var res=q.parse("select portfolio,portfolio,trigram,prd_type,prd_number,plc,alc,etc,ds_list_price,ds_qty,sales_plc_dc,sales_alc_dc,sales_price,"+
				"purchase_plc_dc,purchase_alc_dc,purchase_plc_dc_price,purchase_alc_dc_price,ds_purchase_unit_price,ds_purchase_price,"+
				"ds_po_day,license_start_date,license_end_date from dsrecordTb02;");
		if(res.arr.length>0)addDsSalesDetailTable(alcdv,flag,"alc",res.arr);
		
		saledv.className="sales_wrap";
		mkSalesTable(saledv,flag,pop_sales);
		
		purdv.className="sales_wrap";
		if(pop_buy.length>0)mkPurchaseTable(purdv,flag,pop_buy);
	}
};
function addCompanyTable(tb,data){
	var tr=cf.mkTag("tr",tb),
		td=cf.mkTag("td",tr);
	td.colSpan=11;
	td.style.borderTop="#fff";
	var th=cf.mkTag("th",tr);
	th.rowSpan=3;
	th.style.width=70+"px";
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="결제조건";
	
	var td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	td.style.width=299+"px";
	td.className="pd10";
	span1.innerHTML="현금 : ";
	span2.id="method_cash";
	if(pop_record){
		pop_record.trav(function(d,i){
			if(d.purchase_pay_code=="01"){
				span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
			}
		});
	}
	
	var tr=cf.mkTag("tr",tb),
		th1=cf.mkTag("th",tr),
		th2=cf.mkTag("th",tr);
	th1.rowSpan=4;
	th1.style.width=42+"px";
	th1.style.backgroundColor="#eeeeee";
	th1.style.borderLeft=1+"px solid #e3e3e3";
	th1.innerHTML=" 매<br/><br/>출<br/><br/>처 ";
	th2.style.width=69+"px";
	th2.innerHTML="회사명";
	
	var td=cf.mkTag("td",tr),
		ipt1=cf.mkTag("input",td),
		ipt2=cf.mkTag("input",td);
	td.colSpan=3;
	td.style.textAlign="center";
	td.style.width=248+"px";
	ipt1.id="companyname";
	ipt1.readOnly=true;
	ipt2.id="companyid";
	ipt2.name="company_id";
	ipt2.type="hidden";
	if(data){
		ipt1.value=data.company_name;
		ipt2.value=data.company_id;
	}
	cf.setCss(ipt1,{width:95+"%",backgroundColor:"#eee"});
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="총계약금";
	th.style.width=200+"px";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입가";
	th.style.width=200+"px";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="영업이익";
	//th.style.width=200+"px";
	
	var td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	td.className="pd10";
	span1.innerHTML="어음 : ";
	span2.id="method_bill";
	if(pop_record){
		pop_record.trav(function(d,i){
			if(d.purchase_pay_code=="02"){
				span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
			}
		});
	}
	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.style.width=69+"px";
	th.innerHTML="주소";
	td.colSpan=3;
	td.style.textAlign="center";
	td.style.width=248+"px";
	ipt.id="address";
	ipt.name="address";
	ipt.style.width="95%";
	if(data)ipt.value=data.address;
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	ipt.name="total_contract_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	if(data)ipt.value=comma(uncomma(data.total_contract_price));
	cf.setCss(ipt,{width:"147px",border:"solid 0px",background: "#fffeed",fontWeight: 600});
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	ipt.name="purchase_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	if(data)ipt.value=comma(uncomma(data.purchase_price));
	cf.setCss(ipt,{width:"147px",border:"solid 0px",background: "#fffeed",fontWeight: 600});
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	ipt.name="profit_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	if(data)ipt.value=comma(data.profit_price);
	cf.setCss(ipt,{width:"147px",border:"solid 0px",background: "#fffeed",fontWeight: 600});
	
	var td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	td.className="pd10";
	span1.innerHTML="기타 : ";
	span2.id="method_etc";
	if(pop_record){
		pop_record.trav(function(d,i){
			if(d.purchase_pay_code=="03"){
				span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
			}
		});
	}
	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	th.style.width=68+"px";
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	td.style.width="129px";
	td.style.textAlign="center";
	ipt.id="cus_division";
	ipt.readOnly=true;
	ipt.style.width=90+"%";
	if(data)ipt.value=data.customer_division;
	
	var th=cf.mkTag("th",tr);		
	th.innerHTML="고객 담당자";
	th.style.width=99+"px";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr),
		ipt1=cf.mkTag("input",td),
		ipt2=cf.mkTag("input",td),
		img=cf.mkTag("img",td);
	td.className="pd10";
	td.style.width=129+"px";
	ipt1.id="cus_id";
	ipt1.name="customer_id";
	ipt1.type="hidden";
	ipt2.style.textAlign="center";
	ipt2.id="cus_name";
	ipt2.readOnly=true;
	ipt2.style.width=70+"%";
	if(data){
		ipt1.value=data.customer_id;
		ipt2.value=data.customer_name;
	}
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP();
	};	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.style.width=69+"px";
	th.innerHTML="TEL";	
	td.style.textAlign="center";
	td.colSpan=2;
	td.className="pd10";
	ipt.id="cus_tel";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.customer_tel;
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
		
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.style.width=69+"px";
	th.innerHTML="HP";	
	td.className="pd10";
	td.colSpan=2;
	td.style.width=190+"px";
	ipt.id="cus_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.customer_hp;
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.innerHTML="E-mail";	
	td.className="pd10";
	ipt.id="cus_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.customer_email;
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.innerHTML="부서";
	th.style.width=68+"px";
	td.style.textAlign="center";
	ipt.id="tax_division";
	ipt.readOnly=true;
	ipt.style.width=90+"%";
	if(data)ipt.value=data.invoice_division;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="계산서 담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr),
		ipt1=cf.mkTag("input",td),
		ipt2=cf.mkTag("input",td),
		img=cf.mkTag("img",td);
	td.className="pd10";
	td.style.width=129+"px";
	ipt1.id="tax_id";
	ipt1.name="invoice_id";
	ipt1.type="hidden";
	ipt2.style.textAlign="center";
	ipt2.id="tax_name";
	ipt2.readOnly=true;
	ipt2.style.width=70+"%";
	if(data){
		ipt1.value=data.invoice_id;
		ipt2.value=data.invoice_id_name;
	}
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP(true);
	};
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	td.style.textAlign="center";
	td.className="pd10";
	td.colSpan=2;
	ipt.id="tax_tel";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.invoice_tel;
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.style.width=36+"px";
	th.innerHTML="HP";
	td.colSpan=2;
	td.className="pd10";
	ipt.id="tax_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.invoice_hp;
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	th.innerHTML="E-mail";
	td.className="pd10";
	ipt.id="tax_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	if(data)ipt.value=data.invoice_email;
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
};
function addDsSalesDetailTable(p,flag,gb,data){
	p.innerHTML="";
	p.id="dsTb01";
	var str=cf.mkTag("p",p),
		btndv=cf.mkTag("p",p),
		tbdv=cf.mkTag("p",p);
	str.className="mini_title2";
	
	if(gb=="ds")str.innerHTML="DS 매입 및 매출내역";
	else if(gb=="alc")str.innerHTML="변경 매입 및 매출내역";
	
	cf.setCss(str,{paddingBottom:5+"px"});
	
	if(data&&data.length>0){
		var len=data.length,
			collen=len+2;
		dsTb_ar=data;
	}else{
		var len=3,
			collen=2;
	}
	var tds=new TABLE({
		p:tbdv,
		arr:data,
		mode:false,
		header:[["No","제품","","","","","","","","수량","매출","","","매입","","","","","","기간",""],
		        ["No","Portfolio","Trigram","Type","Prd.Number","PLC","ALC","ETC","List Price","수량","PLC DC","ALC DC","합","PLC DC","ALC DC","PLC</br>DC Price","ALC</br>DC Price","단가","합","DS Po일자","License Date"]],
        footer:[["합계","","","","","","","","","","","","","","","","","","","",""]],
		colspans:[{y:0, x:1, howmany:8},{y:0, x:10, howmany:3},{y:0, x:13, howmany:6},{y:0, x:19, howmany:2},//{y:1, x:17, howmany:2},{y:1, x:19, howmany:2},
		          {y:collen, x:0, howmany:10},{y:collen, x:10, howmany:3},{y:collen, x:13, howmany:6},{y:collen, x:19, howmany:2}],
		rowspans:[{y:0, x:0, howmany:2},{y:0, x:9, howmany:2}]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(i<2)headerstyle(row,i,col,j);
				else if(i==collen){
					col.className="sum";
					cf.setCss(col,{borderRight:1+"px solid #e3e3e3"});
				}else salespop01_tablecellaction_view(tds,data,row,i,col,j);				
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		if(j==13||j==14||j==15||j==16||j==17||j==18)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else cf.setCss(col,{backgroundColor:"#fafafa"});
		cf.setCss(col,{height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="ds_salesDetail_contents";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			//cf.setCss(col,{borderTop:0+"px"});
		}
		if(j==0)cf.setCss(col,{width:31+"px"});
		//else if(j==1)cf.setCss(col,{width:109+"px"});
		else if(j==2||j==4||j==17)cf.setCss(col,{width:89+"px"});
		else if(j==3)cf.setCss(col,{width:59+"px"});
		else if(j==5||j==6||j==15||j==16)cf.setCss(col,{width:84+"px"});
		else if(j==8||j==12||j==18)cf.setCss(col,{width:99+"px"});
		else if(j==7)cf.setCss(col,{width:59+"px"});
		else if(j==9||j==10||j==11||j==13||j==14)cf.setCss(col,{width:49+"px"});
		else if(j==19)cf.setCss(col,{width:79+"px"});
		else if(j==20)cf.setCss(col,{width:149+"px"});
	};
};
function salespop01_tablecellaction_view(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==0){
		col.innerHTML=i-1;
	}else if(j==5||j==6||j==8||j==12||j==15||j==16||j==17||j==18){
		if(txt){
			col.className="price paddingRight";
			col.innerHTML=comma(uncomma(txt));
		}else col.innerHTML="-";
	}else if(j==10||j==11||j==13||j==14){
		if(txt)col.innerHTML=txt+"%";
		else col.innerHTML="-";
	}else if(j==19){
		if(txt)col.innerHTML=modiDate(txt,".");
		else col.innerHTML="-";
	}else if(j==20){
		if(txt){
			var txt2=data[i-2][21];
			if(txt){
				if(txt.length==8)txt=modiDate(txt,".");
				else txt="-";
			}
			if(txt2){
				if(txt2.length==8)txt2=modiDate(txt2,".");
				else txt2="-";
			}
			if(txt&&txt2)col.innerHTML=txt+" ~ "+txt2;
			else if(!txt&&txt2) col.innerHTML="-"+" ~ "+txt2;
			else if(txt&&!txt2) col.innerHTML=txt+" ~ "+"-";
			else col.innerHTML="-";
		}else col.innerHTML="-";
	}else col.innerHTML=txt;
};
//DS 추가 시 팝업 형식으로 변경
function mkTab_record(p,cnt,flag){
	p.innerHTML="";	
	var TabArr=["DS 매입 및 매출내역","ETC 매입 및 매출내역","변경 매출"],
		pages=new PAGES({p:p}),
		etctemp=cf.mkTag("div",p);
	etctemp.id="etctempdv";
	defalutEtc(etctemp);
	TabArr.trav(function(d,i){
		pages.add({
			filename:d,
			onclick:function(obj){	
				if(i==1){
					etctemp.childNodes[0].innerHTML="";
				}else if(i==2){
					etctemp.childNodes[1].innerHTML="";
				}
				tabclick_record(obj,i,d,p,flag);				
			}
		});
	});
	if(cnt) pages.focus(cnt);
	else pages.focus(0);
	cf.setCss(p,{marginTop:30+"px",paddingLeft:15+"px",paddingRight:15+"px"});
	
	if(flag=="new")mkHidden("","sales_confer_id",p);
	else mkHidden(prev_pop.ds_sales_confer_id,"sales_confer_id",p);	
};
function tabclick_record(obj,i,d,p,flag){
	obj.innerHTML="";
	cf.setCss(obj,{minHeight:150+"px",border:0+"px",margin:0+" auto",paddingLeft:0+"px",paddingRight:0+"px"});
	obj.className="sales_wrap";
	if(i==0){
		addDsSalesDetailTable2(obj,flag,dsTb_ar);
		prev_pop.dsTemp=$("#ds_salesDetail_contents").find("select, input").serializeArray();
		var a=document.getElementById("ds_salesDetail_contents").offsetHeight;
		cf.setCss(obj,{height:a+50+"px"});
	}else if(i==1){
		addEtcSalesDetailTable2(obj,flag,etcTb_ar);
		prev_pop.etcTemp=$("#etc_salesDetail_contents").find("select, input").serializeArray();
		var a=document.getElementById("etc_salesDetail_contents").offsetHeight;
		cf.setCss(obj,{height:a+50+"px"});
	}else if(i==2){
		addAlcSalesDetailTable2(obj,flag,alcTb_ar);
		prev_pop.alcTemp=$("#alc_salesDetail_contents").find("select, input").serializeArray();
		var a=document.getElementById("alc_salesDetail_contents").offsetHeight;
		cf.setCss(obj,{height:a+50+"px"});
	}
};
function addDsSalesDetailTable2(p,flag,data){
	p.innerHTML="";
	p.id="dsTb01";
	var str=cf.mkTag("p",p),
		btndv=cf.mkTag("p",p),
		tbdv=cf.mkTag("p",p);
	str.className="mini_title2";
	str.innerHTML="DS 매입 및 매출내역";
	cf.setCss(str,{paddingBottom:5+"px"});
	
	if(flag=="new"||flag=="modi"){
		var con=cf.mkTag("div",btndv),
			ul=cf.mkTag("ul",con),
			li1=cf.mkTag("li",ul),
			img1=cf.mkTag("img",li1),
			li2=cf.mkTag("li",ul),
			img2=cf.mkTag("img",li2),
			li3=cf.mkTag("li",ul),
			img3=cf.mkTag("img",li3);
		con.className="btn_action2";
		img1.className="cursor";
		img2.className="cursor";
		img3.className="cursor";
		img1.src="/images/btn/btn_plus_on.gif";
		img1.onclick=function(){
			recordAddPop("DS 매입 및 매출내역","add"); //매출 및 매입내역 추가
		};
		img2.src="/images/btn/btn_del_on.gif";
		img2.onclick=function(){
			delDSsalesDetail(); //매출 및 매입내역 삭제
		};
		img3.src="/images/btn/btn_exlup_on.gif";
		img3.onclick=function(){
			generalPopOk2("준비중입니다.");
		};
	}
	//data=[["","","","","","990,000,000","990,000,000","","","","","","10,000,000,000","","","","990,000,000","990,000,000","10,000,000,000","2016.04.01~2017.03.31","2016.04.01~2017.03.31"]];
	if(data&&data.length>0){
		var len=data.length,
			collen=len+2;
		dsTb_ar=data;
	}else{
		var len=3,
			collen=2;
	}
	var tds=new TABLE({
		p:tbdv,
		arr:data,
		mode:false,
		header:[["제품","","","","수량","매출","매입","","","","",""],
		        ["Portfolio","Trigram","PLC","ALC","수량","합","PLC DC","ALC DC","PLC DC Price","ALC DC Price","단가","합"]],
        //footer:[["합계","","","","","","","","","","","","","","","","","","","",""]],
		colspans:[{y:0, x:0, howmany:4},{y:0, x:6, howmany:6}],
		rowspans:[{y:0, x:4, howmany:2}]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(i<2)headerstyle(row,i,col,j);
				else salespop01_tablecellaction_add2_ds(tds,data,row,i,col,j,flag);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		if(j==5)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else cf.setCss(col,{backgroundColor:"#fafafa"});
		cf.setCss(col,{height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="ds_salesDetail_contents";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			//cf.setCss(col,{borderTop:0+"px"});
		}
		if(j==1)cf.setCss(col,{width:149+"px"});
		else if(j==2||j==3||j==8||j==9||j==10)cf.setCss(col,{width:109+"px"});
		else if(j==4)cf.setCss(col,{width:69+"px"});
		else if(j==5||j==11)cf.setCss(col,{width:129+"px"});
		else if(j==6||j==7)cf.setCss(col,{width:89+"px"});
	};
};
function salespop01_tablecellaction_add2_ds(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	col.onclick=function(){
		if(!prev_ds){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_ds.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_ds=this.parentNode;
		prev_ds.idx=i-2;
		prev_ds.data=data[i-2];
	};
	
	if(j==0){
		col.innerHTML=txt;
		col.onclick=function(){
			if(!prev_ds){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_ds.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_ds=this.parentNode;
			prev_ds.idx=i-2;
			prev_ds.data=data[i-2];
			
			recordAddPop("DS 매입 및 매출내역","modi",dsTb_ar2[i-2]);
		};
		
		if(flag=="add")	mkHidden("","in_sales_record_ds_id",col);
		else mkHidden(dsTb_ar2[i-2][30],"in_sales_record_ds_id",col);

		mkHidden(dsTb_ar2[i-2][31],"in_price_list_date",col);
		mkHidden(dsTb_ar2[i-2][0],"in_portfolio",col);
		mkHidden(dsTb_ar2[i-2][3],"in_prd_number",col);
		mkHidden(dsTb_ar2[i-2][2],"in_prd_type",col);
		mkHidden(dsTb_ar2[i-2][1],"in_trigram",col);
		mkHidden(dsTb_ar2[i-2][4],"in_plc",col);
		mkHidden(dsTb_ar2[i-2][5],"in_alc",col);
		mkHidden(dsTb_ar2[i-2][6],"in_etc",col);
		mkHidden(dsTb_ar2[i-2][7],"in_ds_list_price",col);
		mkHidden(dsTb_ar2[i-2][8],"in_ds_qty",col);
		mkHidden(dsTb_ar2[i-2][9],"in_each_yn",col);
		mkHidden(dsTb_ar2[i-2][10],"in_sales_plc_dc",col);
		mkHidden(dsTb_ar2[i-2][11],"in_sales_alc_dc",col);
		mkHidden(dsTb_ar2[i-2][12],"in_sales_plc_dc_price",col);
		mkHidden(dsTb_ar2[i-2][13],"in_sales_alc_dc_price",col);
		mkHidden(dsTb_ar2[i-2][33],"in_sales_plc_dc_gb",col);
		mkHidden(dsTb_ar2[i-2][34],"in_sales_alc_dc_gb",col);
		mkHidden(dsTb_ar2[i-2][14],"in_ds_sales_price",col);
		mkHidden(dsTb_ar2[i-2][15],"in_purchase_plc_dc",col);
		mkHidden(dsTb_ar2[i-2][16],"in_purchase_alc_dc",col);
		mkHidden(dsTb_ar2[i-2][17],"in_purchase_plc_dc_price",col);
		mkHidden(dsTb_ar2[i-2][18],"in_purchase_alc_dc_price",col);
		mkHidden(dsTb_ar2[i-2][35],"in_purchase_plc_dc_gb",col);
		mkHidden(dsTb_ar2[i-2][36],"in_purchase_alc_dc_gb",col);
		mkHidden(dsTb_ar2[i-2][19],"in_ds_purchase_unit_price",col);
		mkHidden(dsTb_ar2[i-2][20],"in_ds_purchase_price",col);
		mkHidden(dsTb_ar2[i-2][21],"in_ds_po_day",col);
		mkHidden(dsTb_ar2[i-2][22],"in_install_day",col);
		mkHidden(dsTb_ar2[i-2][23],"in_ordering_day",col);
		mkHidden(dsTb_ar2[i-2][24],"in_license_start_date",col);
		mkHidden(dsTb_ar2[i-2][25],"in_license_end_date",col);
		mkHidden(dsTb_ar2[i-2][26],"in_qlc",col);
		mkHidden(dsTb_ar2[i-2][27],"in_ylc",col);
		mkHidden(dsTb_ar2[i-2][28],"in_target_id",col);
		mkHidden(dsTb_ar2[i-2][29],"in_place_of_business",col);
		mkHidden(dsTb_ar2[i-2][37],"in_portfolio_item_name",col);
		mkHidden(0,"in_chang_yn",col);
		mkHidden(dsTb_ar2[i-2][38],"in_prd_revision",col);
		cf.setCss(col,{cursor:"pointer"});
	}else if(j==2||j==3||j==8||j==9||j==10){
		if(txt)col.innerHTML=comma(uncomma(txt*1));
	}else if(j==5){
		if(txt) col.innerHTML=comma(uncomma(txt*1));
		else col.innerHTML="-";
	}else if(j==11){
		if(txt) col.innerHTML=comma(uncomma(txt*1));
		else col.innerHTML="-";
	}else if(j==6||j==7){
		if(txt)col.innerHTML=txt+"%";
	}else col.innerHTML=txt;
};
function addEtcSalesDetailTable(son,flag,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="ETC 매입 및 매출내역";
	
	var con=cf.mkTag("div",son),
		ul=cf.mkTag("ul",con);
		li1=cf.mkTag("li",ul),
		img1=cf.mkTag("img",li1),
		li2=cf.mkTag("li",ul),
		img2=cf.mkTag("img",li2);		
	con.className="btn_action2";
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img1.onclick=function(){
		recordAddPop("ETC 매입 및 매출내역","add");
		//addsalesDetail; //매출 및 매입내역 추가
	}
	img2.src="/images/btn/btn_del_on.gif";
	img2.onclick=delsalesDetail; //매출 및 매입내역 삭제
		
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="25px";
	th.innerHTML="No";
	
	var th=cf.mkTag("th",tr);
	th.style.width="99px";
	th.innerHTML="구분";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="모델명";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="199px";
	th.innerHTML="Description(기간)";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="49px";
	th.innerHTML="수량";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="109px";
	th.innerHTML="List price";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="109px";
	th.innerHTML="매출단가";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="109px";
	th.innerHTML="매출액";
	
	var th=cf.mkTag("th",tr);
	th.style.width="49px";
	th.innerHTML="D/C";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="109px";
	th.innerHTML="매입단가";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="109px";
	th.innerHTML="매입가";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="49px";
	th.innerHTML="D/C";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="119px";
	th.innerHTML="구매처";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="199px";
	th.innerHTML="결제조건";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="salesDetail_contents";
	if(flag=="modi") salesDetailList(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table),
		tr=cf.mkTag("tr",tf),
		td=cf.mkTag("td",tr);
	td.colSpan=5;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML="합계";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="sum";
	td.style.borderLeft=1+"px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.className="payment_input";
	cf.setCss(ipt,{
		width:"95%",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600,
		textAlign:"center"
	});
	ipt.id="sum_contract";
	ipt.readOnly=true;
	//ipt.value=0;
	if(flag=="modi") ipt.value=comma(uncomma(opener.prev.obj.total_contract_price));
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="sum";
	td.style.borderLeft=1+"px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.className="payment_input";
	cf.setCss(ipt,{width:"95%",border:"solid 0px",background:"#fffeed",fontWeight:600,textAlign:"center"});
	ipt.id="sum_purchase";
	ipt.readOnly=true;
	//ipt.value=0;
	if(flag=="modi") ipt.value=comma(uncomma(opener.prev.obj.purchase_price));
		
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.border=1+"px solid #e3e3e3";
};
function salesDetailList(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		tr.idx=i;
		tr.onclick=function(){
			if(prev_sde==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_sde.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_sde=this;
			prev_sde.obj=d;
		};
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var span=cf.mkTag("span",td)
		span.innerHTML=i+1;
		
		var td=cf.mkTag("td",tr);
		var select=cf.mkTag("select",td);
		select.style.width=95+"px";
		select.name="in_sales_gb";
		mkSelect(select,BRANDLIST,d.sales_gb);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_model";
		ipt.value=d.model;
		
		var td=cf.mkTag("td",tr),
			ipt_s=cf.mkTag("input",td),
			span=cf.mkTag("span",td),
			ipt_e=cf.mkTag("input",td);
		ipt_s.style.width="42%";
		ipt_s.name="in_des_start_day";
		ipt_s.className="input_date";
		ipt_s.readOnly=true;
		ipt_s.value=modiDate(d.des_start_day);
		span.innerHTML=" ~ ";
		ipt_e.style.width="42%";
		ipt_e.name="in_des_end_day";
		ipt_e.className="input_date";
		ipt_e.readOnly=true;
		ipt_e.value=modiDate(d.des_end_day);		
		ipt_s.onchange=function(){
			dateCheck(ipt_s,ipt_e,"S");
		};
		ipt_e.onchange=function(){
			dateCheck(ipt_s,ipt_e,"E");
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="center";
		ipt.style.width=85+"%";
		ipt.name="in_qty";
		ipt.value=d.qty;
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumPrice_ETC();
			sumSales_ETC();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=85+"%";
		ipt.name="in_list_price";
		ipt.value=comma(uncomma(d.list_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=85+"%";
		ipt.name="in_sales_unit_price";
		ipt.value=comma(uncomma(d.sales_unit_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumPrice_ETC();
			sumSales_ETC();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=85+"%";
		ipt.name="in_sales_price";
		ipt.readOnly=true;
		ipt.value=comma(uncomma(d.sales_price));
					
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="right";
		ipt.style.width=95+"%";
		ipt.readOnly=true;
		ipt.name="in_sales_dc";
		ipt.value=d.sales_dc;
		ipt.onkeyup=function(e){
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=85+"%";
		ipt.name="in_purchase_unit_price";
		ipt.value=comma(uncomma(d.purchase_unit_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumprice_ETC();
			sumSales_ETC();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=85+"%";
		ipt.readOnly=true;
		ipt.name="in_purchase_price";
		ipt.value=comma(uncomma(d.purchase_price));
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="right";
		ipt.style.width=95+"%";
		ipt.name="in_purchase_dc";
		ipt.value=d.purchase_dc;
		ipt.onkeyup=function(e){
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width=95+"%";
		ipt.name="in_supplier";
		ipt.value=d.supplier;
		
		var td=cf.mkTag("td",tr);
		var select=cf.mkTag("select",td);
		select.style.width=60+"px";
		select.name="in_purchase_pay_code";
		mkSelect(select,PAYLIST,d.purchase_pay_code);
		select.onchane=payMethod;
		var ipt=cf.mkTag("input",td);
		ipt.name="in_purchase_pay_method";
		ipt.value=d.purchase_pay_method;
		ipt.onblur=payMethod;
		cf.setCss(ipt,{width:50+"%",marginLeft:5+"px"});		
	});
	datePicker("input_date", "yy-mm-dd");
};
function addEtcSalesDetailTable2(p,flag,data){
	p.innerHTML="";
	p.id="dsTb02";
	var str=cf.mkTag("p",p),
		btndv=cf.mkTag("p",p),
		tbdv=cf.mkTag("p",p);
	str.className="mini_title2";
	str.innerHTML="ETC 매입 및 매출내역";
	cf.setCss(str,{paddingBottom:5+"px"});
	
	if(flag!="view"){
		var con=cf.mkTag("div",btndv),
			ul=cf.mkTag("ul",con),
			li1=cf.mkTag("li",ul),
			img1=cf.mkTag("img",li1),
			li2=cf.mkTag("li",ul),
			img2=cf.mkTag("img",li2);
			//li3=cf.mkTag("li",ul),
			//img3=cf.mkTag("img",li3);
		con.className="btn_action2";
		img1.className="cursor";
		img2.className="cursor";
		img1.src="/images/btn/btn_plus_on.gif";
		img1.onclick=function(){
			recordAddPop("ETC 매입 및 매출내역","add"); //매출 및 매입내역 추가
		};
		img2.src="/images/btn/btn_del_on.gif";
		img2.onclick=function(){
			delETCsalesDetail(); //매출 및 매입내역 삭제
		};
		//img3.src="/images/btn/btn_exlup_on.gif";
	}
	//data=[["","","","","","990,000,000","990,000,000","","","","","","10,000,000,000","","","","990,000,000","990,000,000","10,000,000,000","2016.04.01~2017.03.31","2016.04.01~2017.03.31"]];
	if(data&&data.length>0){
		var len=data.length,
			collen=len+2;
		etcTb_ar=data;
	}else{
		var len=3,
			collen=2;
	}
	var tds=new TABLE({
		p:tbdv,
		arr:data,
		mode:false,
		header:[["제품","","","","","매출","매입","","기타","",""],
		        ["구분","모델명","Description(기간)","","수량","List Price","단가","단가","DC","구매처","결재조건",""]],
        //footer:[["합계","","","","","","","","","","","","","","","","","","","",""]],
		colspans:[{y:0, x:0, howmany:5},{y:0, x:6, howmany:2},{y:0, x:8, howmany:3},{y:1, x:10, howmany:2}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(i<2)headerstyle(row,i,col,j);
				else salespop01_tablecellaction_add2_etc(tds,data,row,i,col,j,flag);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		if(i==0&&j==5)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else if(i==1&&j==6)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else cf.setCss(col,{backgroundColor:"#fafafa"});
		cf.setCss(col,{height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="etc_salesDetail_contents";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}else{
			if(j==0)cf.setCss(col,{width:109+"px"});
			else if(j==1)cf.setCss(col,{width:199+"px"});
			else if(j==2)cf.setCss(col,{width:219+"px"});
			else if(j==3)cf.setCss(col,{display:"none"});
			else if(j==4||j==8)cf.setCss(col,{width:89+"px"});
			else if(j==5||j==6||j==7)cf.setCss(col,{width:139+"px"});
			else if(j==9)cf.setCss(col,{width:129+"px"});
			else if(j==10)cf.setCss(col,{width:219+"px"});
		}
	};
};
function salespop01_tablecellaction_add2_etc(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	col.onclick=function(){
		if(!prev_sde){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_sde.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_sde=this.parentNode;
		prev_sde.idx=i-2;
		prev_sde.data=data[i-2];
	};
	
	if(j==0){
		var name="";
		BRANDLIST.trav(function(code,idx){
			if(txt==code.code_id)name=code.code_name;
		});
		col.innerHTML=name;
	}else if(j==1){
		col.innerHTML=txt;
		col.onclick=function(){
			if(!prev_sde){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_sde.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_sde=this.parentNode;
			prev_sde.idx=i-2;
			prev_sde.data=data[i-2];
			
			recordAddPop("ETC 매입 및 매출내역","modi",etcTb_ar2[i-2]);
		};
		cf.setCss(col,{cursor:"pointer"});
		
		mkHidden(etcTb_ar2[i-2][16],"in_sales_record_id",col);
		mkHidden(etcTb_ar2[i-2][0],"in_sales_gb",col);
		mkHidden(etcTb_ar2[i-2][1],"in_model",col);
		mkHidden(etcTb_ar2[i-2][3],"in_des_start_day",col);
		mkHidden(etcTb_ar2[i-2][2],"in_des_end_day",col);
		mkHidden(etcTb_ar2[i-2][4],"in_qty",col);
		mkHidden(etcTb_ar2[i-2][5],"in_list_price",col);
		mkHidden(etcTb_ar2[i-2][6],"in_sales_unit_price",col);
		mkHidden(etcTb_ar2[i-2][7],"in_sales_price",col);
		mkHidden(etcTb_ar2[i-2][8],"in_sales_dc",col);
		mkHidden(etcTb_ar2[i-2][9],"in_purchase_unit_price",col);
		mkHidden(etcTb_ar2[i-2][10],"in_purchase_price",col);
		mkHidden(etcTb_ar2[i-2][11],"in_purchase_dc",col);
		mkHidden(etcTb_ar2[i-2][12],"in_supplier",col);
		mkHidden(etcTb_ar2[i-2][13],"in_purchase_pay_code",col);
		mkHidden(etcTb_ar2[i-2][14],"in_purchase_pay_method",col);
	}else if(j==2){
		var txt2=data[i-2][3];		
		if(txt)txt=modiDate(txt,"-");
		else txt="";
		if(txt2)txt2=modiDate(txt2,"-");
		else txt2="";
		if(txt&&txt2)col.innerHTML=txt+"&nbsp;&nbsp;~&nbsp;&nbsp;"+txt2;
	}else if(j==5||j==6||j==7){
		if(txt)col.innerHTML=comma(txt);		
	}else if(j==8){
		if(txt)col.innerHTML=(txt*1)+"%";		
	}else if(j==10){
		var name="";
		PAYLIST.trav(function(code,idx){
			if(txt==code.code_id)name=code.code_name;
		});
		col.innerHTML=name+"&nbsp;&nbsp;"+data[i-2][11];
	}else col.innerHTML=txt;
};
function addAlcSalesDetailTable2(p,flag,data){
	p.innerHTML="";
	p.id="dsTb03";
	var str=cf.mkTag("p",p),
		btndv=cf.mkTag("p",p),
		tbdv=cf.mkTag("p",p);
	str.className="mini_title2";
	str.innerHTML="변경 매입 및 매출내역";
	cf.setCss(str,{paddingBottom:5+"px"});
	
	if(flag=="new"||flag=="modi"){
		var con=cf.mkTag("div",btndv),
			ul=cf.mkTag("ul",con),
			li1=cf.mkTag("li",ul),
			img1=cf.mkTag("img",li1),
			li2=cf.mkTag("li",ul),
			img2=cf.mkTag("img",li2);
		con.className="btn_action2";
		img1.className="cursor";
		img2.className="cursor";
		img1.src="/images/btn/btn_plus_on.gif";
		img1.onclick=function(){
			alcRecordAddPop("변경 매입 및 매출내역","add");
		};
		img2.src="/images/btn/btn_del_on.gif";
		img2.onclick=function(){
			delALCsalesDetail(); //매출 및 매입내역 삭제
		};
	}
	//data=[["","","","","","990,000,000","990,000,000","","","","","","10,000,000,000","","","","990,000,000","990,000,000","10,000,000,000","2016.04.01~2017.03.31","2016.04.01~2017.03.31"]];
	if(data&&data.length>0){
		var len=data.length,
			collen=len+2;
		alcTb_ar=data;
	}else{
		var len=3,
			collen=2;
	}
	var tds=new TABLE({
		p:tbdv,
		arr:data,
		mode:false,
		header:[["제품","","","","수량","매출","매입","","","","",""],
		        ["Portfolio","Trigram","PLC","ALC","수량","합","PLC DC","ALC DC","PLC DC Price","ALC DC Price","단가","합"]],
        //footer:[["합계","","","","","","","","","","","","","","","","","","","",""]],
		colspans:[{y:0, x:0, howmany:4},{y:0, x:6, howmany:6}],
		rowspans:[{y:0, x:4, howmany:2}]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(i<2)headerstyle(row,i,col,j);
				else salespop01_tablecellaction_add2_alc(tds,data,row,i,col,j,flag);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		if(j==5)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else cf.setCss(col,{backgroundColor:"#fafafa"});
		cf.setCss(col,{height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="alc_salesDetail_contents";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			//cf.setCss(col,{borderTop:0+"px"});
		}
		if(j==1)cf.setCss(col,{width:149+"px"});
		else if(j==2||j==3||j==8||j==9||j==10)cf.setCss(col,{width:109+"px"});
		else if(j==4)cf.setCss(col,{width:69+"px"});
		else if(j==5||j==11)cf.setCss(col,{width:129+"px"});
		else if(j==6||j==7)cf.setCss(col,{width:89+"px"});
	};
};
function salespop01_tablecellaction_add2_alc(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	col.onclick=function(){
		if(!prev_alc){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_alc.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_alc=this.parentNode;
		prev_alc.idx=i-2;
		prev_alc.data=data[i-2];
	};
	
	if(j==0){
		col.innerHTML=txt;
		col.onclick=function(){
			if(!prev_alc){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_alc.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_alc=this.parentNode;
			prev_alc.idx=i-2;
			prev_alc.data=data[i-2];
			
			if(!alcTb_ar2[i-2][30]){
				var alcobj;
				$.ajax({
	                type: "POST",
	                url: "/sas/product/productSalesAlcSearch",
	                dataType: "json",
	                data: {"portfolio":data[i-2][0],"trigram":data[i-2][1],"prd_number":alcTb_ar2[i-2][3],"prd_type":alcTb_ar2[i-2][2],"prd_revision":alcTb_ar2[i-2][41]},
	                success: function(data) {
	                	alcobj= data.alcList;
	                	if(alcobj.length==1){
	                		if(!alcobj[0].qlc_list_price)alcobj[0].qlc_list_price="";
	                		if(!alcobj[0].ylc_list_price)alcobj[0].ylc_list_price="";
	                		if(!alcobj[0].alc)alcobj[0].alc="";
	                		if(!alcobj[0].plc)alcobj[0].plc="";
	                		if(!alcobj[0].list_price)alcobj[0].list_price="";
	                		//if(!alcobj[0].prd_revision)alcobj[0].prd_revision="";
	                		
	                		alcTb_ar2[i-2][4]=alcobj[0].plc;
		                	alcTb_ar2[i-2][5]=alcobj[0].alc;
		                	alcTb_ar2[i-2][26]=alcobj[0].qlc_list_price;
		                	alcTb_ar2[i-2][27]=alcobj[0].ylc_list_price;
		                	alcTb_ar2[i-2][7]=alcobj[0].list_price;
		                	alcTb_ar2[i-2][31]=alcobj[0].price_list_date;
		                	alcTb_ar2[i-2][40]=alcobj[0].portfolio_item_name;
		                	//alcTb_ar2[i-2][41]=alcobj[0].prd_revision;
		                	prev_alc.obj=alcobj[0];
		                	recordAddPop("변경 매입 및 매출내역","modi",alcTb_ar2[i-2]);
	                	}
	                }
	           });
			}else recordAddPop("변경 매입 및 매출내역","modi",alcTb_ar2[i-2]);
		};
		
		if(flag=="add")	mkHidden("","in_alc_sales_record_ds_id",col);
		else mkHidden(alcTb_ar2[i-2][30],"in_alc_sales_record_ds_id",col);
		
		mkHidden(alcTb_ar2[i-2][31],"in_alc_price_list_date",col);
		mkHidden(alcTb_ar2[i-2][0],"in_alc_portfolio",col);
		mkHidden(alcTb_ar2[i-2][3],"in_alc_prd_number",col);
		mkHidden(alcTb_ar2[i-2][2],"in_alc_prd_type",col);
		mkHidden(alcTb_ar2[i-2][1],"in_alc_trigram",col);
		mkHidden(alcTb_ar2[i-2][4],"in_alc_plc",col);
		mkHidden(alcTb_ar2[i-2][5],"in_alc_alc",col);
		mkHidden(alcTb_ar2[i-2][6],"in_alc_etc",col);
		mkHidden(alcTb_ar2[i-2][7],"in_alc_ds_list_price",col);
		mkHidden(alcTb_ar2[i-2][8],"in_alc_ds_qty",col);
		mkHidden(alcTb_ar2[i-2][9],"in_alc_each_yn",col);
		mkHidden(alcTb_ar2[i-2][10],"in_alc_sales_plc_dc",col);
		mkHidden(alcTb_ar2[i-2][11],"in_alc_sales_alc_dc",col);
		mkHidden(alcTb_ar2[i-2][12],"in_alc_sales_plc_dc_price",col);
		mkHidden(alcTb_ar2[i-2][13],"in_alc_sales_alc_dc_price",col);
		mkHidden(alcTb_ar2[i-2][33],"in_alc_sales_plc_dc_gb",col);
		mkHidden(alcTb_ar2[i-2][34],"in_alc_sales_alc_dc_gb",col);
		mkHidden(alcTb_ar2[i-2][14],"in_alc_ds_sales_price",col);
		mkHidden(alcTb_ar2[i-2][15],"in_alc_purchase_plc_dc",col);
		mkHidden(alcTb_ar2[i-2][16],"in_alc_purchase_alc_dc",col);
		mkHidden(alcTb_ar2[i-2][17],"in_alc_purchase_plc_dc_price",col);
		mkHidden(alcTb_ar2[i-2][18],"in_alc_purchase_alc_dc_price",col);
		mkHidden(alcTb_ar2[i-2][35],"in_alc_purchase_plc_dc_gb",col);
		mkHidden(alcTb_ar2[i-2][36],"in_alc_purchase_alc_dc_gb",col);
		mkHidden(alcTb_ar2[i-2][19],"in_alc_ds_purchase_unit_price",col);
		mkHidden(alcTb_ar2[i-2][20],"in_alc_ds_purchase_price",col);
		mkHidden(alcTb_ar2[i-2][21],"in_alc_ds_po_day",col);
		mkHidden(alcTb_ar2[i-2][22],"in_alc_install_day",col);
		mkHidden(alcTb_ar2[i-2][23],"in_alc_ordering_day",col);
		mkHidden(alcTb_ar2[i-2][24],"in_alc_license_start_date",col);
		mkHidden(alcTb_ar2[i-2][25],"in_alc_license_end_date",col);
		mkHidden(alcTb_ar2[i-2][26],"in_alc_qlc",col);
		mkHidden(alcTb_ar2[i-2][27],"in_alc_ylc",col);
		mkHidden(alcTb_ar2[i-2][28],"in_alc_target_id",col);
		mkHidden(alcTb_ar2[i-2][29],"in_alc_place_of_business",col);
		mkHidden(1,"in_alc_chang_yn",col);
		mkHidden(alcTb_ar2[i-2][37],"in_alc_year",col);
		mkHidden(alcTb_ar2[i-2][38],"in_company_id",col);
		mkHidden(alcTb_ar2[i-2][39],"in_stock_yn",col);
		mkHidden(alcTb_ar2[i-2][40],"in_alc_portfolio_item_name",col);
		mkHidden(alcTb_ar2[i-2][41],"in_alc_prd_revision",col);
		cf.setCss(col,{cursor:"pointer"});
	}else if(j==2||j==3||j==8||j==9||j==10||j==11){
		if(txt)col.innerHTML=comma(uncomma(txt*1));
	}else if(j==5){
		if(data[i-2][12])col.innerHTML=comma(uncomma(data[i-2][12]*1));
		else if(txt) col.innerHTML=comma(uncomma(txt*1));
		else col.innerHTML="-";
	}else if(j==6||j==7){
		if(txt)col.innerHTML=txt+"%";
	}else col.innerHTML=txt;
};
function addSalesTable(son,flag,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="매출 세금계산서";
	
	var con=cf.mkTag("div",son),
		ul=cf.mkTag("ul",con);
		li1=cf.mkTag("li",ul),
		img1=cf.mkTag("img",li1),
		li2=cf.mkTag("li",ul),
		img2=cf.mkTag("img",li2);		
	con.className="btn_action2";
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img1.onclick=addSales; //매출 세금계산서 추가
	img2.src="/images/btn/btn_del_on.gif";
	img2.onclick=delSales; //매출 세금계산서 삭제
		
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.backgroundColor="#eeeeee";
	th.style.width="94px";
	th.innerHTML="분할";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="109px";
	th.innerHTML="발행일";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="계산서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="수기/전자";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매출액";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="299px";
	th.innerHTML="매출결제조건";
	var span=cf.mkTag("span",th);
	span.className="asterisk pd2";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
	th.style.width="249px";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="sales_contents";
	if(flag=="modi")salesList(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table),
		tr=cf.mkTag("tr",tf),
		td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	var textarea=cf.mkTag("textarea",td);
	textarea.style.width=95+"%";
	textarea.name="invoice_content";
	if(flag=="modi"){
		obj.trav(function(d,i){
			if(d.invoice_content)textarea.value=d.invoice_content;
		});
	}else textarea.value="비고(사양,납기 등 특이사항)";
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
function salesList(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		tr.idx=i;
		tr.obj=d;
		tr.onclick=function(){
			if(prev_sales==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_sales.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_sales=this;
			prev_sales.obj=this.obj;
		};
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var ipt=cf.mkTag("input",td);
		ipt.name="in_split";
		ipt.value=d.split;
		cf.setCss(ipt,{textAlign:"center",width:85+"%"});
		mkHidden(d.invoice_id,"in_invoice_id",td);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.size=13;
		ipt.name="in_issued";
		ipt.className="input_date";
		ipt.readOnly=true;
		ipt.value=modiDateTen(d.issued);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_invoice_name";
		ipt.value=d.invoice_name;
		
		var td=cf.mkTag("td",tr);
		var select=cf.mkTag("select",td);
		select.style.width=100+"px";
		select.name="in_method";
		if(d.method)mkSelect(select,METHODLIST,d.method);
		else mkSelect(select,METHODLIST,"02");
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=90+"%";
		ipt.name="in_price";
		ipt.value=comma(uncomma(d.price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_payment_requisite_content";
		ipt.value=d.payment_requisite_content;
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_contract_number";
		ipt.readOnly=true;
		ipt.value=d.contract_number;
		
	});
	datePicker("input_date", "yy-mm-dd");
};
function addPurchaseTable(son,flag,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="매입 세금계산서";
	
	var con=cf.mkTag("div",son),
		ul=cf.mkTag("ul",con);
		li1=cf.mkTag("li",ul),
		img1=cf.mkTag("img",li1),
		li2=cf.mkTag("li",ul),
		img2=cf.mkTag("img",li2);		
	con.className="btn_action2";
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img1.onclick=addPurchase; //매입 세금계산서 추가
	img2.src="/images/btn/btn_del_on.gif";
	img2.onclick=delPurchase; //매입 세금계산서 삭제
		
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.backgroundColor="#eeeeee";
	th.style.width="94px";
	th.innerHTML="분할";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="109px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입액";
	var th=cf.mkTag("th",tr);
	th.style.width="299px";
	th.innerHTML="매입결제조건";
	var th=cf.mkTag("th",tr);
	th.style.width="249px";
	th.innerHTML="Project Code";
		
	var tbd=cf.mkTag("tbody",table);
	tbd.id="purchase_contents";
	if(flag=="modi")purchaseList(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	//invoice_contents , buy_invoice_contents
	var textarea=cf.mkTag("textarea",td);
	textarea.style.width=95+"%";
	textarea.name="buy_invoice_content";
	if(flag=="modi"){
		obj.trav(function(d,i){
			if(d.invoice_content)textarea.value=d.buy_invoice_content;
		});
	}else textarea.value="비고(사양,납기 등 특이사항)";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
function purchaseList(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		tr.idx=i;
		tr.obj=d;
		tr.onclick=function(){
			if(prev_pur==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_pur.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_pur=this;
			prev_pur.obj=this.obj;
		};
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="center";
		ipt.size=10;
		ipt.name="in_buy_split";
		ipt.value=d.split;
		mkHidden(d.invoice_id,"in_buy_invoice_id",td);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.size=13;
		ipt.name="in_buy_issued";
		ipt.className="input_date";
		ipt.readOnly=true;
		ipt.value=modiDateTen(d.issued);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_buy_invoice_name";
		ipt.value=d.invoice_name;
		
		var td=cf.mkTag("td",tr);
		var select=cf.mkTag("select",td);
		select.style.width=100+"px";
		select.name="in_buy_method";
		if(d.method)mkSelect(select,METHODLIST,d.method);
		else mkSelect(select,METHODLIST,"02");
		
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width=90+"%";
		ipt.name="in_buy_price";
		ipt.value=comma(uncomma(d.price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_buy_payment_requisite_content";
		ipt.value=d.payment_requisite_content;
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_buy_contract_number";
		ipt.readOnly=true;
		ipt.value=d.contract_number;
		
	});
	datePicker("input_date", "yy-mm-dd");
};
//viewpop
function mkCompanyTable(tb,data){	
	var tr=cf.mkTag("tr",tb),
		td=cf.mkTag("td",tr);
	td.colSpan=11;
	td.style.borderTop="#fff";
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	th.rowSpan=3;
	th.style.width=70+"px";
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="결제조건";
	td.style.width=299+"px";
	td.className="pd10";
	td.style.textAlign="left";
	span1.innerHTML="현금 : ";
	pop_record.trav(function(d,i){
		if(d.purchase_pay_code=="01"){
			span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb),
		th1=cf.mkTag("th",tr),
		th2=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th1.rowSpan=4;
	th1.style.width=42+"px";
	th1.style.backgroundColor="#eeeeee";
	th1.style.borderLeft=1+"px solid #e3e3e3";
	th1.innerHTML=" 매<br/><br/>출<br/><br/>처 ";
	th2.style.width=69+"px";
	th2.innerHTML="회사명";
	td.colSpan=3;
	td.className="pd10";
	td.style.width=248+"px";
	td.innerHTML=data.company_name;
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;	
	th.style.backgroundColor="#eeeeee";
	th.style.width=300+"px";
	th.innerHTML="총계약금";	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";	
	th.innerHTML="매입가";
	th.style.width=300+"px";
	var th=cf.mkTag("th",tr);
	th.colSpan=2;	
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="영업이익";
	
	var td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	td.className="pd10";
	td.style.textAlign="left";
	span1.innerHTML="어음 : ";
	pop_record.trav(function(d,i){
		if(d.purchase_pay_code=="02"){
			span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="주소";
	th.style.width=69+"px";
	td.colSpan=3;
	td.className="pd10";
	td.innerHTML=data.address;
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.innerHTML=comma(data.total_contract_price);
	cf.setCss(td,{textAlign:"right",marginright:5+"px",borderRight:1+"px solid #e3e3e3"});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.innerHTML=comma(data.purchase_price);
	cf.setCss(td,{textAlign:"right",marginright:5+"px",borderRight:1+"px solid #e3e3e3"});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.innerHTML=comma(data.profit_price);
	cf.setCss(td,{textAlign:"right",marginright:5+"px",borderRight:1+"px solid #e3e3e3"});
	
	var td=cf.mkTag("td",tr),
		span1=cf.mkTag("span",td),
		span2=cf.mkTag("span",td);
	td.className="pd10";
	td.style.textAlign="left";
	span1.innerHTML="기타 : "
	pop_record.trav(function(d,i){
		if(d.purchase_pay_code=="03"){
			span2.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="부서";
	th.style.width=68+"px";
	td.style.textAlign="center";
	td.style.width=129+"px";
	td.innerHTML=data.customer_division;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="고객담당자";
	th.style.width=99+"px";
	td.style.textAlign="center";
	td.style.width=129+"px";
	td.innerHTML=data.customer_name;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	td.colSpan=2;
	td.style.width=265+"px";
	td.className="pd10";
	td.innerHTML=data.customer_tel;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width=69+"px";
	th.innerHTML="HP";
	td.className="pd10";
	td.style.width=190+"px";
	td.colSpan=2;
	td.innerHTML=data.customer_hp;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width="70px";
	th.innerHTML="E-mail";
	//td.style.width="137px";
	td.className="pd10";
	td.style.textAlign="left";
	td.innerHTML=data.customer_email
	
	var tr=cf.mkTag("tr",tb),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="부서";
	td.style.textAlign="center";
	td.innerHTML=data.invoice_division
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="계산서 담당자";
	td.style.textAlign="center";
	td.innerHTML=data.invoice_id_name;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	td.colSpan=2;
	td.style.width=265+"px";
	td.className="pd10";
	td.innerHTML=data.invoice_tel;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="HP";
	td.colSpan=2;
	td.className="pd10";
	td.innerHTML=data.invoice_hp;
	
	var th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.innerHTML="E-mail";
	td.className="pd10";
	td.style.textAlign="left";
	td.innerHTML=data.invoice_email;
};
function mkSalesDetailTable(son,flag,data){
	var p=cf.mkTag("p",son);
	p.className="mini_title";
	p.innerHTML="ETC 매입 및 매출내역";
			
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="No";
	th.style.width="25px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="구분";
	th.style.width="99px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="모델명";
	
	var th=cf.mkTag("th",tr);
	th.style.width="199px";
	th.innerHTML="Description(기간)";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="수량";
	th.style.width="49px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="List price";
	th.style.width="109px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출단가";
	th.style.width="109px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출액";
	th.style.width="109px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="D/C";
	th.style.width="49px";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입단가";
	th.style.width="109px";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입가";
	th.style.width="109px";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="D/C";
	th.style.width="49px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="구매처";
	th.style.width="119px";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="결제조건";
	th.style.width="189px";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="salesDetail_contents";
	salesDetailView(tbd,data);
	
	var tf=cf.mkTag("tfoot",table),
		tr=cf.mkTag("tr",tf),
		td=cf.mkTag("td",tr);
	td.colSpan=5;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML="합계";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="sum payment_input";
	td.innerHTML=comma(pop_main.total_contract_price);
	cf.setCss(td,{textAlign:"right",marginright:5+"px",borderLeft:1+"px solid #e3e3e3"});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML=comma(pop_main.purchase_price);
	cf.setCss(td,{textAlign:"right",marginright:5+"px"});
		
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.border=1+"px solid #e3e3e3";
};
function salesDetailView(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var span=cf.mkTag("span",td)
		span.innerHTML=i+1;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.sales_gb_name;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.model;
		td.className="pd10 alignleft";
		
		var td=cf.mkTag("td",tr);
		var span=cf.mkTag("span",td);
		span.innerHTML=modiDate(d.des_start_day, ".");
		var span=cf.mkTag("span",td);
		span.innerHTML=" ~ ";
		var span=cf.mkTag("span",td);
		span.innerHTML=modiDate(d.des_end_day, ".");
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.qty;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.list_price);
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.sales_unit_price);

		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.sales_price);
					
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.sales_dc+"%";
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.purchase_unit_price);
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.purchase_price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.purchase_dc+"%";
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.supplier;
		
		var td=cf.mkTag("td",tr),
			span1=cf.mkTag("span",td),
			span2=cf.mkTag("span",td);
		span1.innerHTML=d.purchase_pay_name;
		span2.innerHTML=d.purchase_pay_method;
		td.className="pd10 alignleft";
	});
};
function mkSalesTable(son,flag,data){
	var p=cf.mkTag("p",son);
	p.className="mini_title";
	p.innerHTML="매출 세금계산서";
			
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.backgroundColor="#eeeeee";
	th.style.width="94px";
	th.innerHTML="분할";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매출액";
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출결제조건";
	th.style.width="289px";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
	th.style.width="249px";
		
	var tbd=cf.mkTag("tbody",table);
	salesView(tbd,data);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	data.trav(function(d,i){
		if(d.invoice_content){
			td.innerHTML+=d.invoice_content;
		}
		else td.innerHTML="비고(사양,납기 등 특이사항)";
	});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
function salesView(son, obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
				
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		td.style.textAlign="center";
		td.innerHTML=d.split;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.issued.substring(0,10);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.invoice_name;
		td.className="pd10 alignleft";
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.method_name;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.payment_requisite_content;
		td.className="pd10 alignleft";
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.contract_number;
	});
};
function mkPurchaseTable(son,flag,data){
	var p=cf.mkTag("p",son);
	p.className="mini_title";
	p.innerHTML="매입 세금계산서";
		
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.backgroundColor="#eeeeee";
	th.style.width="94px";
	th.innerHTML="분할";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="119px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입액";
	var th=cf.mkTag("th",tr);
	th.style.width="289px";
	th.innerHTML="매입결제조건";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
	th.style.width="249px";
		
	var tbd=cf.mkTag("tbody",table);
	purchaseView(tbd,data);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	data.trav(function(d,i){
		if(d.invoice_content)td.innerHTML+=d.invoice_content;
		else td.innerHTML="비고(사양,납기 등 특이사항)";
	});
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
function purchaseView(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		td.style.textAlign="center";
		td.innerHTML=d.split;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.issued.substring(0,10);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.invoice_name;
		td.className="pd10 alignleft";
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.method_name;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.payment_requisite_content;
		td.className="pd10 alignleft";
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.contract_number;
	});
};
function respPop(obj,opt){
	var con=document.createElement("div"),	
		con0=cf.mkTag("div",con),	
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);
	
	con2.className="my_top";
	span.innerHTML="&nbsp&nbsp&nbsp&nbsp담당자 조회";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(con,{position:"absolute",width:600+"px",height:300+"px"});
	cf.setCss(con1,{width:600+"px",height:300+"px",border:2+"px solid black",backgroundColor:"#fff"});	
	
	var con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con4);
	con3.className="my-container";
	con3.style.height=190+"px";
	con3.style.overflowY="auto";	
	con4.className="con_table";
	con5.className="Wrap_table";	
	mkRespTable(con5,con,opt,obj);
	
	var con6=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con6),
		span=cf.mkTag("span",con6),
		btn2=cf.mkTag("button",con6);
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey normal";
	btn2.className="ct-btn grey normal";
	btn1.innerHTML="추가";
	btn2.innerHTML="취소";
	span.innerHTML="  ";
	btn1.onclick=function(){
		respSave(con,opt);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	callPop(con);
};
function mkRespTable(son,con,opt,obj){
	var div=cf.mkTag("div",son),		
		table=cf.mkTag("table",div);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th",tr);
	th.style.width=10+"%";
	th.innerHTML="이름";
	
	var th=cf.mkTag("th",tr);
	th.style.width=13+"%";
	th.innerHTML="부서";
	
	var th=cf.mkTag("th",tr);
	th.style.width=20+"%";
	th.innerHTML="전화번호";
	
	var th=cf.mkTag("th",tr);
	th.style.width=20+"%";
	th.innerHTML="휴대폰번호";
	
	var th=cf.mkTag("th",tr);
	th.style.width=30+"%";
	th.innerHTML="e-mail";
	
	var th=cf.mkTag("th",tr);
	th.className="right";
	th.style.width=7+"%";
	th.innerHTML="세금<br/>계산서";
	
	var div=cf.mkTag("div",son),	
		table=cf.mkTag("table",div);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",table);
		tr.style.textAlign="center";
		tr.className="cursor";
		tr.onclick=function(){
			if(prev_resp==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_resp.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_resp=this;
			prev_resp.obj=d;
		};
		tr.ondblclick=function(){
			if(prev_resp==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_resp.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_resp=this;
			prev_resp.obj=d;
			
			respSave(con,opt);
		};
		
		var td=cf.mkTag("td",tr);
		td.style.width=10+"%";
		td.innerHTML=d.customer_name;
		
		var td=cf.mkTag("td",tr);
		td.style.width=13+"%";
		td.innerHTML=d.division;
				
		var td=cf.mkTag("td",tr);
		td.style.width=20+"%";
		td.innerHTML=d.sub_phone_number;
		
		var td=cf.mkTag("td",tr);
		td.style.width=20+"%";
		td.innerHTML=d.mobile;
		
		var td=cf.mkTag("td",tr);
		td.style.width=30+"%";
		td.innerHTML=d.email;
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.style.width=7+"%";
		td.innerHTML=d.invoice_gb_nm;
	});
};
function recordAddPop(str,flag,data){
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
		con5=cf.mkTag("div",con4);
	con3.className="my-container";
	con4.className="con_table";
	//con5.className="Wrap_table";
	
	if(str=="DS 매입 및 매출내역"){
		cf.setCss(con,{height:cf.workareaheight-118+"px",maxHeight:688+"px"});
		cf.setCss(con1,{height:cf.workareaheight-118+"px",maxHeight:688+"px"});
		cf.setCss(con3,{height:cf.workareaheight-215+"px",maxHeight:588+"px",overflowY:"auto",paddingBottom:0+"px"});
		recordAddPopTb01(con5,flag,"ds",data);
	}else if(str=="변경 매입 및 매출내역"){
		cf.setCss(con,{height:cf.workareaheight-118+"px",maxHeight:688+"px"});
		cf.setCss(con1,{height:cf.workareaheight-118+"px",maxHeight:688+"px"});
		cf.setCss(con3,{height:cf.workareaheight-215+"px",maxHeight:588+"px",overflowY:"auto",paddingBottom:0+"px"});
		recordAddPopTb01(con5,flag,"alc",data);
	}else{
		cf.setCss(con,{height:476+"px"});
		cf.setCss(con1,{height:476+"px"});
		cf.setCss(con3,{height:363+"px"});
		recordAddPopTb02(con5,flag,data);
	}
	
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
		if(str=="DS 매입 및 매출내역")dsRecordSave(str,flag,con);
		else if(str=="변경 매입 및 매출내역")alcRecordSave(str,flag,con);
		else etcRecordSave(str,flag,con);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	callPop(con);
	autocompletePortfolioSearch();
	autocompleteTrigramSearch();
	datePicker("input_date", "yy-mm-dd");
};
//DS 추가
function recordAddPopTb01(p,flag,gb,data){
	p.innerHTML="";
	var tit01=cf.mkTag("div",p),
		tbdv01=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		tit02=cf.mkTag("div",p),
		tbdv02=cf.mkTag("div",p),
		cl2=cf.mkTag("div",p),
		tit03=cf.mkTag("div",p),
		tbdv03=cf.mkTag("div",p),
		cl3=cf.mkTag("div",p),
		tit04=cf.mkTag("div",p),
		tbdv04=cf.mkTag("div",p),
		cl4=cf.mkTag("div",p),
		tit05=cf.mkTag("div",p),
		tbdv05=cf.mkTag("div",p);
	tit01.className="mini_title";
	tit02.className="mini_title";
	tit03.className="mini_title";
	tit04.className="mini_title";
	tit05.className="mini_title";
	tit01.innerHTML="제품";
	tit02.innerHTML="매출";
	tit03.innerHTML="매입";
	tit04.innerHTML="일자";
	tit05.innerHTML="고객사";
	tbdv01.className="Wrap_table";
	tbdv02.className="Wrap_table";
	tbdv03.className="Wrap_table";
	tbdv04.className="Wrap_table";
	tbdv05.className="Wrap_table";
	callRecordAddTb01(tbdv01,flag,gb,data);
	callRecordAddTb02(tbdv02,flag,gb,data);
	callRecordAddTb03(tbdv03,flag,gb,data);
	callRecordAddTb04(tbdv04,flag,gb,data);
	callRecordAddTb09(tbdv05,flag,gb,data);
	
	cf.setCss(tit01,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit02,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit03,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit04,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit05,{height:20+"px",marginTop:15+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(cl3,{clear:"both"});
	cf.setCss(cl4,{clear:"both"});
	//cf.setCss(p,{paddingBottom:20+"px"});
};
function callRecordAddTb01(p,flag,gb,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["Portfolio","","","","Prd.Number",""],["Trigram","","","","Type",""],["ETC","","PLC","","ALC",""],["List Price","","","","수량",""]];
	else var tbar=[["Portfolio",data[0],"","","Prd.Number",data[3]],["Trigram",data[1],"","","Type",data[2]],["ETC",data[6],"PLC",data[4],"ALC",data[5]],["List Price",data[7],"","","수량",data[8]]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:1, howmany:3},{y:1, x:1, howmany:3},{y:3, x:1, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4){
					var span=cf.mkTag("span",col);
					span.innerHTML="*";
					span.className="asterisk pd2";
					headerstyle(row,i,col,j);
				}else{
					if(gb=="ds")salespop02_tablecellaction_addtb01(tds,data,row,i,col,j,flag);
					else salespop02_tablecellaction_addtb01_alc(tds,data,row,i,col,j,flag);
				}
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:119+"px"});
	};	
};
function salespop02_tablecellaction_addtb01(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(i==0){
		if(j==1){
			var dv=cf.mkTag("div",col),
				ipt=cf.mkTag("input",dv),
				str=cf.mkTag("div",dv);
			ipt.id="pop_portfolio";
			ipt.name="portfolio";
			ipt.value=txt.replace("&amp;","&");
			str.innerHTML="&nbsp;(2자이상입력)";
			cf.setCss(ipt,{float:"left",width:255+"px"});
			cf.setCss(str,{float:"left",paddingTop:6+"px"});
			cf.setCss(dv,{paddingLeft:6+"px"});
			if(flag=="modi"){
				mkHidden(dsTb_ar2[prev_ds.idx][30],"pop_sales_record_ds_id",col);
				mkHidden(dsTb_ar2[prev_ds.idx][31],"pop_in_price_list_date",col);
				mkHidden(dsTb_ar2[prev_ds.idx][26],"pop_qlc",col);
				mkHidden(dsTb_ar2[prev_ds.idx][27],"pop_ylc",col);
				mkHidden(dsTb_ar2[prev_ds.idx][37],"pop_portfolio_item_name",col);
				mkHidden(dsTb_ar2[prev_ds.idx][38],"pop_prd_revision",col);
			}else{
				mkHidden("","pop_portfolio_item_name",col);
				mkHidden("","pop_sales_record_ds_id",col);
				mkHidden("","pop_in_price_list_date",col);
				mkHidden("","pop_qlc",col);
				mkHidden("","pop_ylc",col);
				mkHidden("","pop_prd_revision",col);
			}
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_prd_number";
			ipt.value=txt;
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
		}
	}else if(i==1){
		if(j==1){
			var dv=cf.mkTag("div",col),
				ipt=cf.mkTag("input",dv),
				str=cf.mkTag("div",dv);
			ipt.id="pop_trigram";
			ipt.value=txt;
			str.innerHTML="&nbsp;(2자이상입력)";
			cf.setCss(ipt,{float:"left",width:255+"px"});
			cf.setCss(str,{float:"left",paddingTop:6+"px"});
			cf.setCss(dv,{paddingLeft:6+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_prd_type";
			ipt.value=txt;
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
		}
	}else if(i==2){
		if(j==1){
			var select=cf.mkTag("select",col);
			select.id="pop_etc";
			mkSelect(select,ETCLIST,txt);
			select.onchange=function(){
				var list_price=document.getElementById("pop_list_price"),
					plc=document.getElementById("pop_plc"),
					alc=document.getElementById("pop_alc"),
					plc_dc=document.getElementById("pop_plc_dc"),
					alc_dc=document.getElementById("pop_alc_dc"),
					pop_plc_dc_price=document.getElementById("pop_plc_dc_price"),
					pop_alc_dc_price=document.getElementById("pop_alc_dc_price"),
					sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
					sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_sum_str=document.getElementById("pop_sales_sum_str"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					unit_price=document.getElementById("pop_unit_price"),
		       		unit_price_str=document.getElementById("pop_unit_price_str"),
		       		qty=document.getElementById("pop_qty"),
		       		pur_sum=document.getElementById("pop_pur_sum"),
					pur_sum_str=document.getElementById("pop_pur_sum_str"),
					plc_price,alc_price,qlc_list_price;	
				
				if(pop_dsdata){
					plc_price=pop_dsdata.plc*1;
					alc_price=pop_dsdata.alc*1;
					qlc_list_price=pop_dsdata.qlc_list_price;
					ylc_list_price=pop_dsdata.ylc_list_price;
					
					plc.value=comma(uncomma(plc_price*1));
					alc.value=comma(uncomma(alc_price*1));
				}else{
					plc_price=dsTb_ar2[prev_ds.idx][4]*1;
					alc_price=dsTb_ar2[prev_ds.idx][5]*1;
					qlc_list_price=dsTb_ar2[prev_ds.idx][26];
					ylc_list_price=dsTb_ar2[prev_ds.idx][27];
					
					plc.value=comma(uncomma(plc_price*1));
					alc.value=comma(uncomma(alc_price*1));
				}

				//초기화
				pop_plc_dc_price.value="0";
				pop_alc_dc_price.value="0";
				sales_plc_dc_price.value="0";
				sales_alc_dc_price.value="0";
				sales_sum.value="";
				sales_sum_str.innerHTML="";
				pur_sum.value="0";
				pur_sum_str.innerHTML="0";
				list_price.value="0";
				unit_price.value="";
				unit_price_str.innerHTML="";
				
				if(this.value==10){
					list_price.value=comma((uncomma(plc_price)*1)+(uncomma(alc_price)*1));
					
					//매출
					var salse_plc_price=(plc_price*1)*(1-((sales_plc_dc.value*1)/100)),
						salse_alc_price=(alc_price*1)*(1-((sales_alc_dc.value*1)/100));
					
					if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(plc_price);
					else sales_plc_dc_price.value=comma(salse_plc_price);
					
					if(!sales_alc_dc.value||sales_alc_dc.value==0)sales_alc_dc_price.value=comma(alc_price);
					else sales_alc_dc_price.value=comma(salse_alc_price);
					
					var sum1=(uncomma(sales_plc_dc_price.value)*1+uncomma(sales_alc_dc_price.value)*1)*(qty.value*1);
					sum1=sum1.toFixed(0);
					sales_sum.value=sum1;
					sales_sum_str.innerHTML=comma(sum1);
					
					//매입
					var pur_plc_price=(plc_price*1)*(1-((plc_dc.value*1)/100)),
						pur_alc_price=(alc_price*1)*(1-((alc_dc.value*1)/100));
					
					if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(plc_price);
					else pop_plc_dc_price.value=comma(pur_plc_price);
					
					if(!alc_dc.value||alc_dc.value==0)pop_alc_dc_price.value=comma(alc_price);
					else pop_alc_dc_price.value=comma(pur_alc_price);
					
					var sum2=(uncomma(pop_plc_dc_price.value)*1+uncomma(pop_alc_dc_price.value)*1),
						sum3=(sum2*(qty.value*1)).toFixed(0);
					
					unit_price.value=sum2.toFixed(0);
					unit_price_str.innerHTML=comma(sum2.toFixed(0));
					pur_sum.value=sum3;
					pur_sum_str.innerHTML=comma(sum3);
					
				}else if(this.value==20){
					plc.value="";
					alc.value="";
					alc_dc.value="0";
					sales_alc_dc.value="0";
					
					if(qlc_list_price&&qlc_list_price!=0){
						qlc_list_price=qlc_list_price*1;
						alc.value=comma(qlc_list_price);
						var calunit_pur=(qlc_list_price*1)*(1-((plc_dc.value*1)/100)),
							calunit_sale=(qlc_list_price*1)*(1-((sales_plc_dc.value*1)/100));
						calunit_sale=(calunit_sale*1).toFixed(0);
						calunit_pur=(calunit_pur*1).toFixed(0);
						
						if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(qlc_list_price);
						else sales_plc_dc_price.value=comma(calunit_sale);
						sales_sum.value=calunit_sale*(qty.value*1);
						sales_sum_str.innerHTML=comma(calunit_sale*(qty.value*1));
						
						if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(ylc_list_price);
						else pop_plc_dc_price.value=comma(calunit_pur);
						list_price.value=comma(qlc_list_price);
						unit_price.value=calunit_pur;
						unit_price_str.innerHTML=comma(calunit_pur);
						pur_sum.value=calunit_pur*(qty.value*1);
						pur_sum_str.innerHTML=comma(calunit_pur*(qty.value*1));
					}
				}else if(this.value==30){
					plc.value="";
					alc.value="";
					alc_dc.value="0";
					sales_alc_dc.value="0";
					
					if(ylc_list_price&&ylc_list_price!=0){
						ylc_list_price=ylc_list_price*1;
						alc.value=comma(ylc_list_price);
						var calunit_pur=(ylc_list_price*1)*(1-((plc_dc.value*1)/100)),
							calunit_sale=(ylc_list_price*1)*(1-((sales_plc_dc.value*1)/100));
						calunit_sale=(calunit_sale*1).toFixed(0);
						calunit_pur=(calunit_pur*1).toFixed(0);
						
						if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(ylc_list_price);
						else sales_plc_dc_price.value=comma(calunit_sale);						
						sales_sum.value=calunit_sale*(qty.value*1);
						sales_sum_str.innerHTML=comma(calunit_sale*(qty.value*1));
						
						if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(ylc_list_price);
						else pop_plc_dc_price.value=comma(calunit_pur);						
						list_price.value=comma(ylc_list_price);
						unit_price.value=calunit_pur;
						unit_price_str.innerHTML=comma(calunit_pur);
						pur_sum.value=calunit_pur*(qty.value*1);
						pur_sum_str.innerHTML=comma(calunit_pur*(qty.value*1));
					}
				}
			};
			cf.setCss(select,{width:100+"px"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_plc";
			ipt.value=comma(txt);
			ipt.className="price";
			cf.setCss(ipt,{width:228+"px",backgroundColor:"#eee"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_alc";
			ipt.value=comma(txt);
			ipt.className="price";
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
			cf.setCss(col,{paddingLeft:3+"px"});
		}
	}else if(i==3){
		if(j==1){
			var ipt=cf.mkTag("input",col);
			ipt.id="pop_list_price";
			ipt.className="price";
			ipt.value=comma(txt*1);
			ipt.readOnly=true;
			cf.setCss(ipt,{width:455+"px",backgroundColor:"#eee"});
			cf.setCss(col,{paddingLeft:3+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.id="pop_qty";
			ipt.value=txt;
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					pop_sales_sum=document.getElementById("pop_sales_sum"),
					unit_price=document.getElementById("pop_unit_price"),
					pur_sum=document.getElementById("pop_pur_sum"),
					pur_sum_str=document.getElementById("pop_pur_sum_str"),
					sum1,sum2;
				
				sum1=(this.value*1)*((uncomma(sales_alc_dc_price.value)*1)+(uncomma(sales_plc_dc_price.value)*1));				
				sum2=(unit_price.value*1)*(this.value*1);
				
				pop_sales_sum.value=sum1;
				sum_str.innerHTML=comma(sum1);
				pur_sum.value=sum2;
				pur_sum_str.innerHTML=comma(sum2);
			};
			cf.setCss(ipt,{width:238+"px"});
		}
	}
};
function salespop02_tablecellaction_addtb01_alc(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(i==0){
		if(j==1){
			var dv=cf.mkTag("div",col),
				ipt=cf.mkTag("input",dv),
				str=cf.mkTag("div",dv);
			ipt.id="pop_portfolio";
			ipt.name="portfolio";
			ipt.readOnly=true;
			ipt.value=txt.replace("&amp;","&");
			str.innerHTML="&nbsp;(2자이상입력)";
			cf.setCss(ipt,{float:"left",width:255+"px",backgroundColor:"#eee"});
			cf.setCss(str,{float:"left",paddingTop:6+"px"});
			cf.setCss(dv,{paddingLeft:6+"px"});
			if(flag=="modi"){
				mkHidden(alcTb_ar2[prev_alc.idx][30],"pop_sales_record_ds_id",col);
				mkHidden(alcTb_ar2[prev_alc.idx][31],"pop_in_price_list_date",col);
				mkHidden(alcTb_ar2[prev_alc.idx][26],"pop_qlc",col);
				mkHidden(alcTb_ar2[prev_alc.idx][27],"pop_ylc",col);				
			}else{
				mkHidden("","pop_sales_record_ds_id",col);
				mkHidden("","pop_in_price_list_date",col);
				mkHidden("","pop_qlc",col);
				mkHidden("","pop_ylc",col);
			}
			mkHidden(alcTb_ar2[prev_alc.idx][41],"pop_prd_revision",col);
			mkHidden(alcTb_ar2[prev_alc.idx][40],"pop_portfolio_item_name",col);
			mkHidden(alcTb_ar2[prev_alc.idx][37],"pop_alc_year",col);
			mkHidden(alcTb_ar2[prev_alc.idx][38],"pop_company_id",col);
			mkHidden(alcTb_ar2[prev_alc.idx][39],"pop_stock_yn",col);
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_prd_number";
			ipt.value=txt;
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
		}
	}else if(i==1){
		if(j==1){
			var dv=cf.mkTag("div",col),
				ipt=cf.mkTag("input",dv),
				str=cf.mkTag("div",dv);
			ipt.id="pop_trigram";
			ipt.value=txt;
			ipt.readOnly=true;
			str.innerHTML="&nbsp;(2자이상입력)";
			cf.setCss(ipt,{float:"left",width:255+"px",backgroundColor:"#eee"});
			cf.setCss(str,{float:"left",paddingTop:6+"px"});
			cf.setCss(dv,{paddingLeft:6+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_prd_type";
			ipt.value=txt;
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
		}
	}else if(i==2){
		if(j==1){
			var select=cf.mkTag("select",col);
			select.id="pop_etc";
			mkSelect(select,ETCLIST,txt);
			select.onchange=function(){
				var list_price=document.getElementById("pop_list_price"),
					plc=document.getElementById("pop_plc"),
					alc=document.getElementById("pop_alc"),
					plc_dc=document.getElementById("pop_plc_dc"),
					alc_dc=document.getElementById("pop_alc_dc"),
					pop_plc_dc_price=document.getElementById("pop_plc_dc_price"),
					pop_alc_dc_price=document.getElementById("pop_alc_dc_price"),
					sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
					sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_sum_str=document.getElementById("pop_sales_sum_str"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					unit_price=document.getElementById("pop_unit_price"),
		       		unit_price_str=document.getElementById("pop_unit_price_str"),
		       		qty=document.getElementById("pop_qty"),
		       		pur_sum=document.getElementById("pop_pur_sum"),
					pur_sum_str=document.getElementById("pop_pur_sum_str"),
					plc_price,alc_price,qlc_list_price;	
				
				if(pop_dsdata){
					plc_price=pop_dsdata.plc*1;
					alc_price=pop_dsdata.alc*1;
					qlc_list_price=pop_dsdata.qlc_list_price;
					ylc_list_price=pop_dsdata.ylc_list_price;
					
					plc.value=comma(uncomma(plc_price*1));
					alc.value=comma(uncomma(alc_price*1));
				}else{
					plc_price=alcTb_ar2[prev_alc.idx][4]*1;
					alc_price=alcTb_ar2[prev_alc.idx][5]*1;
					qlc_list_price=alcTb_ar2[prev_alc.idx][26];
					ylc_list_price=alcTb_ar2[prev_alc.idx][27];
					
					plc.value=comma(uncomma(plc_price*1));
					alc.value=comma(uncomma(alc_price*1));
				}

				//초기화
				pop_plc_dc_price.value="0";
				pop_alc_dc_price.value="0";
				sales_plc_dc_price.value="0";
				sales_alc_dc_price.value="0";
				sales_sum.value="";
				sales_sum_str.innerHTML="";
				pur_sum.value="0";
				pur_sum_str.innerHTML="0";
				list_price.value="0";
				unit_price.value="";
				unit_price_str.innerHTML="";
				
				if(this.value==10){
					list_price.value=comma((uncomma(plc_price)*1)+(uncomma(alc_price)*1));
					
					//매출
					var salse_plc_price=(plc_price*1)*(1-((sales_plc_dc.value*1)/100)),
						salse_alc_price=(alc_price*1)*(1-((sales_alc_dc.value*1)/100));
					
					if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(plc_price);
					else sales_plc_dc_price.value=comma(salse_plc_price);
					
					if(!sales_alc_dc.value||sales_alc_dc.value==0)sales_alc_dc_price.value=comma(alc_price);
					else sales_alc_dc_price.value=comma(salse_alc_price);
					
					var sum1=(uncomma(sales_plc_dc_price.value)*1+uncomma(sales_alc_dc_price.value)*1)*(qty.value*1);
					sum1=sum1.toFixed(0);
					sales_sum.value=sum1;
					sales_sum_str.innerHTML=comma(sum1);
					
					//매입
					var pur_plc_price=(plc_price*1)*(1-((plc_dc.value*1)/100)),
						pur_alc_price=(alc_price*1)*(1-((alc_dc.value*1)/100));
					
					if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(plc_price);
					else pop_plc_dc_price.value=comma(pur_plc_price);
					
					if(!alc_dc.value||alc_dc.value==0)pop_alc_dc_price.value=comma(alc_price);
					else pop_alc_dc_price.value=comma(pur_alc_price);
					
					var sum2=(uncomma(pop_plc_dc_price.value)*1+uncomma(pop_alc_dc_price.value)*1),
						sum3=(sum2*(qty.value*1)).toFixed(0);
					
					unit_price.value=sum2.toFixed(0);
					unit_price_str.innerHTML=comma(sum2.toFixed(0));
					pur_sum.value=sum3;
					pur_sum_str.innerHTML=comma(sum3);
					
				}else if(this.value==20){
					plc.value="";
					alc.value="";
					alc_dc.value="0";
					sales_alc_dc.value="0";
					
					if(qlc_list_price&&qlc_list_price!=0){
						qlc_list_price=qlc_list_price*1;
						plc.value=comma(qlc_list_price);
						var calunit_pur=(qlc_list_price*1)*(1-((plc_dc.value*1)/100)),
							calunit_sale=(qlc_list_price*1)*(1-((sales_plc_dc.value*1)/100));
						calunit_sale=(calunit_sale*1).toFixed(0);
						calunit_pur=(calunit_pur*1).toFixed(0);
						
						if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(qlc_list_price);
						else sales_plc_dc_price.value=comma(calunit_sale);
						sales_sum.value=calunit_sale*(qty.value*1);
						sales_sum_str.innerHTML=comma(calunit_sale*(qty.value*1));
						
						if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(ylc_list_price);
						else pop_plc_dc_price.value=comma(calunit_pur);
						list_price.value=comma(qlc_list_price);
						unit_price.value=calunit_pur;
						unit_price_str.innerHTML=comma(calunit_pur);
						pur_sum.value=calunit_pur*(qty.value*1);
						pur_sum_str.innerHTML=comma(calunit_pur*(qty.value*1));
					}
				}else if(this.value==30){
					plc.value="";
					alc.value="";
					alc_dc.value="0";
					sales_alc_dc.value="0";
					
					if(ylc_list_price&&ylc_list_price!=0){
						ylc_list_price=ylc_list_price*1;
						plc.value=comma(ylc_list_price);
						var calunit_pur=(ylc_list_price*1)*(1-((plc_dc.value*1)/100)),
							calunit_sale=(ylc_list_price*1)*(1-((sales_plc_dc.value*1)/100));
						calunit_sale=(calunit_sale*1).toFixed(0);
						calunit_pur=(calunit_pur*1).toFixed(0);
						
						if(!sales_plc_dc.value||sales_plc_dc.value==0)sales_plc_dc_price.value=comma(ylc_list_price);
						else sales_plc_dc_price.value=comma(calunit_sale);						
						sales_sum.value=calunit_sale*(qty.value*1);
						sales_sum_str.innerHTML=comma(calunit_sale*(qty.value*1));
						
						if(!plc_dc.value||plc_dc.value==0)pop_plc_dc_price.value=comma(ylc_list_price);
						else pop_plc_dc_price.value=comma(calunit_pur);						
						list_price.value=comma(ylc_list_price);
						unit_price.value=calunit_pur;
						unit_price_str.innerHTML=comma(calunit_pur);
						pur_sum.value=calunit_pur*(qty.value*1);
						pur_sum_str.innerHTML=comma(calunit_pur*(qty.value*1));
					}
				}
			};
			cf.setCss(select,{width:100+"px"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_plc";
			ipt.value=comma(txt);
			ipt.className="price";
			cf.setCss(ipt,{width:228+"px",backgroundColor:"#eee"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.readOnly=true;
			ipt.id="pop_alc";
			ipt.value=comma(txt);
			ipt.className="price";
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
			cf.setCss(col,{paddingLeft:3+"px"});
		}
	}else if(i==3){
		if(j==1){
			var ipt=cf.mkTag("input",col);
			ipt.id="pop_list_price";
			ipt.className="price";
			ipt.readOnly=true;
			if(txt)ipt.value=comma(txt);
			else{
				var plc_price,alc_price;
				if(pop_dsdata){
					plc_price=pop_dsdata.plc*1;
					alc_price=pop_dsdata.alc*1;
				}else{
					plc_price=alcTb_ar2[prev_alc.idx][4]*1;
					alc_price=alcTb_ar2[prev_alc.idx][5]*1;
				}			
				ipt.value=comma(plc_price+alc_price);
			}
			cf.setCss(ipt,{width:455+"px",backgroundColor:"#eee"});
			cf.setCss(col,{paddingLeft:3+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col);
			ipt.id="pop_qty";
			ipt.value=txt;
			ipt.readOnly=true;
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					pop_sales_sum=document.getElementById("pop_sales_sum"),
					unit_price=document.getElementById("pop_unit_price"),
					pur_sum=document.getElementById("pop_pur_sum"),
					pur_sum_str=document.getElementById("pop_pur_sum_str"),
					sum1,sum2;
				
				sum1=(this.value*1)*((uncomma(sales_alc_dc_price.value)*1)+(uncomma(sales_plc_dc_price.value)*1));				
				sum2=(unit_price.value*1)*(this.value*1);
				
				pop_sales_sum.value=sum1;
				sum_str.innerHTML=comma(sum1);
				pur_sum.value=sum2;
				pur_sum_str.innerHTML=comma(sum2);
			};
			cf.setCss(ipt,{width:238+"px",backgroundColor:"#eee"});
		}
	}
};
function callRecordAddTb02(p,flag,gb,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["개별 DC 여부","","PLC DC Rate","","ALC DC Rate","","",""],["합","","PLC DC Price","","ALC DC Price","","",""]];
	else var tbar=[["개별 DC 여부",data[9],"PLC DC Rate",data[10],"ALC DC Rate",data[11],"",""],["합",data[14],"PLC DC Price",data[12],"ALC DC Price",data[13],"",""]];
	
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:5, howmany:3},{y:1, x:5, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					if((i==0&&(j==0||j==4))||(i==1&&(j==4))){
						var span=cf.mkTag("span",col);
						span.innerHTML="*";
						span.className="asterisk pd2";
					}
					headerstyle(row,i,col,j);
				}else{
					if(gb=="ds")salespop02_tablecellaction_addtb02(tds,data,row,i,col,j,flag);
					else salespop02_tablecellaction_addtb02_alc(tds,data,row,i,col,j,flag);
				}
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:204+"px"});
		else if(j==3)cf.setCss(col,{width:204+"px"});
	};	
};
function salespop02_tablecellaction_addtb02(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(i==0){
		if(j==1){
			var select=cf.mkTag("select",col);
			select.id="pop_dc_yn";
			if(txt){
				mkSelectYN(select,txt);
				if(txt==0)dsTb_ar2.yn=true;
				else dsTb_ar2.yn=false;
			}else{
				if(dsTb_ar2.yn==undefined){
					dsTb_ar2.yn=true;
					mkSelectYN(select,txt)
				}else{
					if(!dsTb_ar2.yn)mkSelectYN(select,1);
					else mkSelectYN(select,txt);
				}
			}
			cf.setCss(select,{width:120+"px"});
			select.onchange=function(e){
				if(e.target.value==0){
					var sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
						sales_alc_dc=document.getElementById("pop_sales_alc_dc");
					dsTb_ar2.yn=true;
					dsTb_ar2.sales_plc_dc=(sales_plc_dc.value)*1;
					dsTb_ar2.sales_alc_dc=(sales_alc_dc.value)*1;
				}else dsTb_ar2.yn=false;
			};
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_sales_plc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_sales_plc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";			
			if(flag=="add"||dsTb_ar2[prev_ds.idx][33]==""||dsTb_ar2[prev_ds.idx][33]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			if(txt)ipt.value=txt;
			else{
				if(dsTb_ar2.yn&&dsTb_ar2.sales_plc_dc)ipt.value=dsTb_ar2.sales_plc_dc;
				else ipt.value=0;
			}			
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);				
				if(this.value==0)this.value="";
				else this.value=this.value*1;
				
				if(dsTb_ar2.yn)dsTb_ar2.sales_plc_dc=(this.value)*1;
				else dsTb_ar2.sales_plc_dc="";
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					pop_qty=document.getElementById("pop_qty"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					plc=document.getElementById("pop_plc"),
					sum,plc_dc_price;
				
				if(!this.value||this.value==0)plc_dc_price=uncomma(plc.value);
				else plc_dc_price=((uncomma(plc.value)*1)*(1-((this.value*1)/100)));				
				
				//ALC PLC 나눠졌을때 공식?
				plc_dc_price=(plc_dc_price*1).toFixed(0);
				plc_dc_price=plc_dc_price*1;
				sum=(pop_qty.value*1)*(plc_dc_price+(uncomma(sales_alc_dc_price.value)*1));
				sales_plc_dc_price.value=comma(plc_dc_price);
				sales_sum.value=sum.toFixed(0);
				sum_str.innerHTML=comma(sum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_sales_plc_dc_price");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_sales_alc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_sales_alc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(flag=="add"||dsTb_ar2[prev_ds.idx][34]==""||dsTb_ar2[prev_ds.idx][34]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			if(txt)ipt.value=txt;
			else{
				if(dsTb_ar2.yn&&dsTb_ar2.sales_alc_dc)ipt.value=dsTb_ar2.sales_alc_dc;
				else ipt.value=0;
			}			
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);				
				if(this.value==0)this.value="";
				else this.value=this.value*1;
				
				if(dsTb_ar2.yn)dsTb_ar2.sales_alc_dc=(this.value)*1;
				else dsTb_ar2.sales_alc_dc="";
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					pop_qty=document.getElementById("pop_qty"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					alc=document.getElementById("pop_alc"),
					sum,alc_dc_price;
				
				if(!this.value||this.value==0)alc_dc_price=uncomma(alc.value);
				else alc_dc_price=((uncomma(alc.value)*1)*(1-((this.value*1)/100)));				
				
				//ALC PLC 나눠졌을때 공식?
				alc_dc_price=(alc_dc_price*1).toFixed(0);
				alc_dc_price=alc_dc_price*1;
				sum=(pop_qty.value*1)*(alc_dc_price+(uncomma(pop_sales_plc_dc_price.value)*1));
				sales_alc_dc_price.value=comma(alc_dc_price);
				sales_sum.value=sum.toFixed(0);
				sum_str.innerHTML=comma(sum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_sales_alc_dc_price");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}else{
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			str.id="pop_sales_sum_str";
			ipt.id="pop_sales_sum";
			if(txt){
				ipt.value=txt*1;
				str.innerHTML=comma(txt*1);
			}else{
				if(flag=="modi"&&dsTb_ar2[prev_ds.idx]){
					var sum;
					sum=(dsTb_ar2[prev_ds.idx][8]*1)*(dsTb_ar2[prev_ds.idx][19]*1);
					ipt.value=sum.toFixed(0);
					str.innerHTML=comma(sum.toFixed(0));
				}
			}
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_sales_plc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_sales_plc_dc_gb";
			ipt.value=comma(txt*1);
			ipt2.value=0;
			if(flag=="modi"&&dsTb_ar2[prev_ds.idx][33]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var plc_dc=document.getElementById("pop_sales_plc_dc"),
					plc=document.getElementById("pop_plc"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					sales_sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					qty=document.getElementById("pop_qty"),
					percent=(1-((uncomma(this.value)*1)/(uncomma(plc.value)*1)))*100,
					sum=((uncomma(sales_alc_dc_price.value)*1)+(uncomma(this.value)*1))*(qty.value*1);		
				if(plc.value!=0)plc_dc.value=percent.toFixed(2);
				sales_sum_str.innerHTML=comma(sum);
				sales_sum.value=sum;			
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_sales_plc_dc");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_sales_alc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_sales_alc_dc_gb";	
			ipt.value=comma(txt*1);
			ipt2.value=0;
			if(flag=="modi"&&dsTb_ar2[prev_ds.idx][34]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var alc_dc=document.getElementById("pop_sales_alc_dc"),
					alc=document.getElementById("pop_alc"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					qty=document.getElementById("pop_qty"),
					percent=(1-((uncomma(this.value)*1)/(uncomma(alc.value)*1)))*100,
					sum=((uncomma(sales_plc_dc_price.value)*1)+(uncomma(this.value)*1))*(qty.value*1);
				if(alc.value!=0)alc_dc.value=percent.toFixed(2);
				sales_sum_str.innerHTML=comma(sum);
				sales_sum.value=sum;				
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_sales_alc_dc");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}
};
function salespop02_tablecellaction_addtb02_alc(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(i==0){
		if(j==1){
			var select=cf.mkTag("select",col);
			select.id="pop_dc_yn";
			if(txt){
				mkSelectYN(select,txt);
				if(txt==0)alcTb_ar2.yn=true;
				else alcTb_ar2.yn=false;
			}else{
				if(alcTb_ar2.yn==undefined){
					alcTb_ar2.yn=true;
					mkSelectYN(select,txt)
				}else{
					if(!alcTb_ar2.yn)mkSelectYN(select,1);
					else mkSelectYN(select,txt);
				}
			}
			select.onchange=function(e){
				if(e.target.value==0){
					var sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
						sales_alc_dc=document.getElementById("pop_sales_alc_dc");
					alcTb_ar2.yn=true;
					alcTb_ar2.sales_plc_dc=(sales_plc_dc.value)*1;
					alcTb_ar2.sales_alc_dc=(sales_alc_dc.value)*1;
				}else alcTb_ar2.yn=false;
			};
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_sales_plc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_sales_plc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";			
			if(flag=="add"||alcTb_ar2[prev_alc.idx][33]==""||alcTb_ar2[prev_alc.idx][33]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			if(txt)ipt.value=txt;
			else{
				if(alcTb_ar2.yn&&alcTb_ar2.sales_plc_dc)ipt.value=alcTb_ar2.sales_plc_dc;
				else ipt.value=0;
			}			
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);				
				this.value=this.value*1;
				
				if(alcTb_ar2.yn)alcTb_ar2.sales_plc_dc=(this.value)*1;
				else alcTb_ar2.sales_plc_dc="";
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					pop_qty=document.getElementById("pop_qty"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					plc=document.getElementById("pop_plc"),
					sum,plc_dc_price;
				
				if(!this.value||this.value==0)plc_dc_price=uncomma(plc.value);
				else plc_dc_price=((uncomma(plc.value)*1)*(1-((this.value*1)/100)));				
				
				//ALC PLC 나눠졌을때 공식?
				plc_dc_price=(plc_dc_price*1).toFixed(0);
				plc_dc_price=plc_dc_price*1;
				sum=(pop_qty.value*1)*(plc_dc_price+(uncomma(sales_alc_dc_price.value)*1));
				sales_plc_dc_price.value=comma(plc_dc_price);
				sales_sum.value=sum.toFixed(0);
				sum_str.innerHTML=comma(sum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_sales_plc_dc_price");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_sales_alc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_sales_alc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(flag=="add"||alcTb_ar2[prev_alc.idx][34]==""||alcTb_ar2[prev_alc.idx][34]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			if(txt)ipt.value=txt;
			else{
				if(dsTb_ar2.yn&&dsTb_ar2.sales_alc_dc)ipt.value=dsTb_ar2.sales_alc_dc;
				else ipt.value=0;
			}			
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);
				this.value=this.value*1;
				
				if(alcTb_ar2.yn)alcTb_ar2.sales_alc_dc=(this.value)*1;
				else alcTb_ar2.sales_alc_dc="";
				checkChar(e,this);
				var pop_list_price=document.getElementById("pop_list_price"),
					pop_qty=document.getElementById("pop_qty"),
					sum_str=document.getElementById("pop_sales_sum_str"),
					sales_sum=document.getElementById("pop_sales_sum"),
					sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
					sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
					alc=document.getElementById("pop_alc"),
					sum,alc_dc_price;
				
				if(!this.value||this.value==0)alc_dc_price=uncomma(alc.value);
				else alc_dc_price=((uncomma(alc.value)*1)*(1-((this.value*1)/100)));				
				
				//ALC PLC 나눠졌을때 공식?
				alc_dc_price=(alc_dc_price*1).toFixed(0);
				alc_dc_price=alc_dc_price*1;
				sum=(pop_qty.value*1)*(alc_dc_price+(uncomma(pop_sales_plc_dc_price.value)*1));
				sales_alc_dc_price.value=comma(alc_dc_price);
				sales_sum.value=sum.toFixed(0);
				sum_str.innerHTML=comma(sum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_sales_alc_dc_price");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}else{
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			str.id="pop_sales_sum_str";
			ipt.id="pop_sales_sum";
			if(txt){
				ipt.value=txt;
				str.innerHTML=comma(txt);
			}else{
				if(flag=="modi"&&alcTb_ar2[prev_alc.idx]){
					var sum;
					sum=(alcTb_ar2[prev_alc.idx][8]*1)*(alcTb_ar2[prev_alc.idx][19]*1);
					ipt.value=sum.toFixed(0);
					str.innerHTML=comma(sum.toFixed(0));
				}
			}
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_sales_plc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_sales_plc_dc_gb";
			ipt.value=comma(txt);
			ipt2.value=0;
			if(flag=="modi"&&alcTb_ar2[prev_alc.idx][33]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var plc_dc=document.getElementById("pop_sales_plc_dc"),
					plc=document.getElementById("pop_plc"),
				percent=(1-(uncomma(this.value)*1)/uncomma(plc.value)*1)*100;
				
				plc_dc.value=percent.toFixed(2);
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_sales_plc_dc");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_sales_alc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_sales_alc_dc_gb";	
			ipt.value=comma(txt);
			ipt2.value=0;
			if(flag=="modi"&&alcTb_ar2[prev_alc.idx][34]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var alc_dc=document.getElementById("pop_sales_alc_dc"),
					alc=document.getElementById("pop_alc"),
					percent=(1-(uncomma(this.value)*1)/uncomma(alc.value)*1)*100;
					
				alc_dc.value=percent.toFixed(2);
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_sales_alc_dc");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}
};
function callRecordAddTb03(p,flag,gb,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["단가","","PLC DC","","ALC DC",""],["합","","PLC DC Price","","ALC DC Price",""]];
	else var tbar=[["단가",data[19],"PLC DC",data[15],"ALC DC",data[16]],["합",data[20],"PLC DC Price",data[17],"ALC DC Price",data[18]]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:1, x:5, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					/*if((i==0&&j!=0)||(i==1&&j!=0)){
						var span=cf.mkTag("span",col);
						span.innerHTML="*";
						span.className="asterisk pd2";
					}*/
					headerstyle(row,i,col,j);
				}else{
					if(gb=="ds")salespop02_tablecellaction_addtb03(tds,data,row,i,col,j,flag);
					else salespop02_tablecellaction_addtb03_alc(tds,data,row,i,col,j,flag);
				}
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:204+"px"});
		else if(j==3)cf.setCss(col,{width:204+"px"});
	};	
};
function salespop02_tablecellaction_addtb03(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(i==0){
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			ipt.id="pop_unit_price";
			str.id="pop_unit_price_str";
			if(txt){
				str.innerHTML=comma(txt);
				ipt.value=txt;
			}else{
				if(flag=="modi"&&dsTb_ar2[prev_ds.idx]){
					var price=(uncomma(dsTb_ar2[prev_ds.idx][4])*1)*(1-((dsTb_ar2[prev_ds.idx][15]*1)/100))+
								(uncomma(dsTb_ar2[prev_ds.idx][5])*1)*(1-((dsTb_ar2[prev_ds.idx][16]*1)/100));
					ipt.value=price.toFixed(0);
					str.innerHTML=comma(price.toFixed(0));
				}
				
			}
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_plc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_plc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(txt)ipt.value=txt;
			else ipt.value=35;
			if(flag=="add"||!dsTb_ar2[prev_ds.idx][35]||dsTb_ar2[prev_ds.idx][35]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			ipt.onkeyup=function(e){
				this.value=(uncomma(e.target.value))*1;				
				checkChar(e,this);
				var pop_plc=document.getElementById("pop_plc"),
					qty=document.getElementById("pop_qty"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(pop_plc.value)*1)*(1-((this.value*1)/100)),
					unit=(price+uncomma(alc_dc_price.value)*1),
					pursum=((qty.value*1)*unit);

				plc_dc_price.value=comma(price.toFixed(0));	
				pop_unit_price.value=unit.toFixed(0);
				pop_unit_price_str.innerHTML=comma(unit.toFixed(0));
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_plc_dc_price");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_alc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_alc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(txt)ipt.value=txt;
			else ipt.value=20;
			if(flag=="add"||!dsTb_ar2[prev_ds.idx][36]||dsTb_ar2[prev_ds.idx][36]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			ipt.onkeyup=function(e){
				this.value=(uncomma(e.target.value))*1;
				checkChar(e,this);
				var pop_alc=document.getElementById("pop_alc"),
					qty=document.getElementById("pop_qty"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(pop_alc.value)*1)*(1-((this.value*1)/100)),
					unit=(price+uncomma(plc_dc_price.value)*1),
					pursum=((qty.value*1)*unit);
				
				alc_dc_price.value=comma(price.toFixed(0));				
				pop_unit_price.value=unit.toFixed(0);
				pop_unit_price_str.innerHTML=comma(unit.toFixed(0));
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_alc_dc_price");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}if(i==1){
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			ipt.id="pop_pur_sum";
			str.id="pop_pur_sum_str";
			if(txt){
				ipt.value=txt;
				str.innerHTML=comma(txt);
			}else{
				
			}
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_plc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_plc_dc_gb";
			ipt2.value=0;
			if(flag=="modi"&&dsTb_ar2[prev_ds.idx][35]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			if(txt){
				ipt.value=comma(uncomma(txt));
			}else{
				if(flag=="modi"&&dsTb_ar2[prev_ds.idx][4]&&dsTb_ar2[prev_ds.idx][15]){
					var price=(uncomma(dsTb_ar2[prev_ds.idx][4])*1)*(1-((dsTb_ar2[prev_ds.idx][15]*1)/100));
					ipt.value=comma(price.toFixed(0));
				}
			}
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					plc_dc=document.getElementById("pop_plc_dc"),
					plc=document.getElementById("pop_plc"),
					qty=document.getElementById("pop_qty"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(alc_dc_price.value)*1)+(uncomma(this.value)*1),
					percent=(1-(uncomma(this.value)*1)/uncomma(plc.value)*1)*100,
					pursum=((qty.value*1)*price);
				
				plc_dc.value=percent.toFixed(2);
				pop_unit_price_str.innerHTML=comma(price.toFixed(0));
				pop_unit_price.value=price.toFixed(0);
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_plc_dc");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_alc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_alc_dc_gb";
			ipt2.value=0;
			if(flag=="modi"&&dsTb_ar2[prev_ds.idx][36]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			if(txt){
				ipt.value=comma(txt);
			}else{
				if(flag=="modi"&&dsTb_ar2[prev_ds.idx][5]&&dsTb_ar2[prev_ds.idx][16]){
					var price=(uncomma(dsTb_ar2[prev_ds.idx][5])*1)*(1-((dsTb_ar2[prev_ds.idx][16]*1)/100));
					ipt.value=comma(price.toFixed(0));
				}
			}
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc=document.getElementById("pop_alc_dc"),
					alc=document.getElementById("pop_alc"),
					qty=document.getElementById("pop_qty"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(plc_dc_price.value)*1)+(uncomma(this.value)*1),
					percent=(1-(uncomma(this.value)*1)/uncomma(alc.value)*1)*100,
					pursum=((qty.value*1)*price);
				
				alc_dc.value=percent.toFixed(2);
				pop_unit_price_str.innerHTML=comma(price.toFixed(0));
				pop_unit_price.value=price.toFixed(0);
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_alc_dc");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}
};
function salespop02_tablecellaction_addtb03_alc(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(i==0){
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			ipt.id="pop_unit_price";
			str.id="pop_unit_price_str";
			if(txt){
				str.innerHTML=comma(txt);
				ipt.value=txt;
			}else{
				if(flag=="modi"&&alcTb_ar2[prev_alc.idx]){
					var price=(uncomma(alcTb_ar2[prev_alc.idx][4])*1)*(1-((alcTb_ar2[prev_alc.idx][15]*1)/100))+
								(uncomma(alcTb_ar2[prev_alc.idx][5])*1)*(1-((alcTb_ar2[prev_alc.idx][16]*1)/100));
					ipt.value=price.toFixed(0);
					str.innerHTML=comma(price.toFixed(0));
				}
				
			}
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_plc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_plc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(txt)ipt.value=txt;
			else ipt.value=35;
			if(flag=="add"||!alcTb_ar2[prev_alc.idx][35]||alcTb_ar2[prev_alc.idx][35]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			ipt.onkeyup=function(e){
				this.value=(uncomma(e.target.value))*1;
				checkChar(e,this);
				var pop_plc=document.getElementById("pop_plc"),
					qty=document.getElementById("pop_qty"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(pop_plc.value)*1)*(1-((this.value*1)/100)),
					unit=(price+uncomma(alc_dc_price.value)*1),
					pursum=((qty.value*1)*unit);
				
				plc_dc_price.value=comma(price.toFixed(0));				
				pop_unit_price.value=unit.toFixed(0);
				pop_unit_price_str.innerHTML=comma(unit.toFixed(0));
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_plc_dc_price");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt.id="pop_alc_dc";
			ipt.className="price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_alc_dc_gb";
			ipt2.value=1;
			span.innerHTML="%";
			if(txt)ipt.value=txt;
			else ipt.value=20;
			if(flag=="add"||!alcTb_ar2[prev_alc.idx][36]||alcTb_ar2[prev_alc.idx][36]=="1")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			ipt.onkeyup=function(e){
				this.value=(uncomma(e.target.value))*1;
				checkChar(e,this);
				var pop_alc=document.getElementById("pop_alc"),
					qty=document.getElementById("pop_qty"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(pop_alc.value)*1)*(1-((this.value*1)/100)),
					unit=(price+uncomma(plc_dc_price.value)*1),
					pursum=((qty.value*1)*unit);
				
				alc_dc_price.value=comma(price.toFixed(0));
				pop_unit_price.value=unit.toFixed(0);
				pop_unit_price_str.innerHTML=comma(unit.toFixed(0));
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_alc_dc_price");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:100+"px",float:"left",marginLeft:10+"px"});
			cf.setCss(span,{float:"left",paddingTop:7+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}if(i==1){
		if(j==1){
			var dv=cf.mkTag("div",col),
				str=cf.mkTag("div",dv),
				ipt=cf.mkTag("input",dv);
			str.className="price";
			ipt.id="pop_pur_sum";
			str.id="pop_pur_sum_str";
			ipt.value=txt;
			str.innerHTML=comma(txt);
			cf.setCss(ipt,{display:"none"});
		}else if(j==3){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_plc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_plc_dc_gb";
			ipt2.value=0;
			if(flag=="modi"&&alcTb_ar2[prev_alc.idx][35]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			if(txt){
				ipt.value=comma(uncomma(txt));
			}else{
				if(flag=="modi"&&alcTb_ar2[prev_alc.idx][4]&&alcTb_ar2[prev_alc.idx][15]){
					var price=(uncomma(alcTb_ar2[prev_alc.idx][4])*1)*(1-((alcTb_ar2[prev_alc.idx][15]*1)/100));
					ipt.value=comma(price.toFixed(0));
				}
			}
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				
				var pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					alc_dc_price=document.getElementById("pop_alc_dc_price"),
					plc_dc=document.getElementById("pop_plc_dc"),
					plc=document.getElementById("pop_plc"),
					qty=document.getElementById("pop_qty"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(alc_dc_price.value)*1)+(uncomma(this.value)*1),
					percent=(1-(uncomma(this.value)*1)/uncomma(plc.value)*1)*100,
					pursum=((qty.value*1)*price);
				
				plc_dc.value=percent.toFixed(2);
				pop_unit_price_str.innerHTML=comma(price.toFixed(0));
				pop_unit_price.value=price.toFixed(0);
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_plc_dc=document.getElementById("pop_plc_dc");
					ipt.readOnly=false;
					pop_plc_dc.readOnly=true;
					cf.setCss(pop_plc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}else if(j==5){
			var ipt=cf.mkTag("input",col),
				ipt2=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_alc_dc_price";
			ipt2.type="radio";
			ipt2.name="pop_purchase_alc_dc_gb";
			ipt2.value=0;
			if(flag=="modi"&&alcTb_ar2[prev_alc.idx][36]=="0")ipt2.checked=true;
			else{
				ipt.readOnly=true;
				cf.setCss(ipt,{backgroundColor:"#eee"});
			}
			if(txt){
				ipt.value=comma(txt);
			}else{
				if(flag=="modi"&&alcTb_ar2[prev_alc.idx][5]&&alcTb_ar2[prev_alc.idx][16]){
					var price=(uncomma(alcTb_ar2[prev_alc.idx][5])*1)*(1-((alcTb_ar2[prev_alc.idx][16]*1)/100));
					ipt.value=comma(price.toFixed(0));
				}
			}
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);
				var pop_unit_price=document.getElementById("pop_unit_price"),
					pop_unit_price_str=document.getElementById("pop_unit_price_str"),
					plc_dc_price=document.getElementById("pop_plc_dc_price"),
					alc_dc=document.getElementById("pop_alc_dc"),
					alc=document.getElementById("pop_alc"),
					qty=document.getElementById("pop_qty"),
					pop_pur_sum=document.getElementById("pop_pur_sum"),
					pop_pur_sum_str=document.getElementById("pop_pur_sum_str"),
					price=(uncomma(plc_dc_price.value)*1)+(uncomma(this.value)*1),
					percent=(1-(uncomma(this.value)*1)/uncomma(alc.value)*1)*100,
					pursum=((qty.value*1)*price);
				
				alc_dc.value=percent.toFixed(2);
				pop_unit_price_str.innerHTML=comma(price.toFixed(0));
				pop_unit_price.value=price.toFixed(0);
				pop_pur_sum.value=pursum.toFixed(0);
				pop_pur_sum_str.innerHTML=comma(pursum.toFixed(0));
			};
			ipt2.onclick=function(e){
				var chk=e.target.checked;
				if(chk){
					var pop_alc_dc=document.getElementById("pop_alc_dc");
					ipt.readOnly=false;
					pop_alc_dc.readOnly=true;
					cf.setCss(pop_alc_dc,{backgroundColor:"#eee"});
					cf.setCss(ipt,{backgroundColor:"#fff"});
				}
			};
			cf.setCss(ipt,{width:75+"%",float:"left",marginLeft:10+"px"});
			cf.setCss(ipt2,{float:"right",marginRight:5+"px"});
		}
	}
};
function callRecordAddTb04(p,flag,gb,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["DS Po 일자","","","","설치일자","","",""],["발주일자","","","","License Date","","",""]];
	else var tbar=[["DS Po 일자",data[21],"","","설치일자",data[22],"",""],["발주일자",data[23],"","","License Date",data[24],data[25],""]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:1, howmany:3},{y:0, x:5, howmany:3},{y:1, x:1, howmany:3},{y:1, x:5, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					var span=cf.mkTag("span",col);
					span.innerHTML="*";
					span.className="asterisk pd2";
					headerstyle(row,i,col,j);
				}else{
					salespop02_tablecellaction_addtb04(tds,tbar,row,i,col,j,flag);
				}
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:220+"px"});
	};
};
function salespop02_tablecellaction_addtb04(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(i==0){
		if(j==1){
			var ipt1=cf.mkTag("input",col);
			ipt1.className="input_date";
			ipt1.id="pop_ds_po_day";
			if(flag=="modi"&&txt){
				ipt1.value=modiDate(txt,"-");		
			}
			cf.setCss(ipt1,{width:109+"px"});
		}else if(j==5){
			var ipt1=cf.mkTag("input",col);
			ipt1.className="input_date";
			ipt1.id="pop_install_day";
			if(flag=="modi"&&txt){
				ipt1.value=modiDate(txt,"-");		
			}
			cf.setCss(ipt1,{width:109+"px"});
		}
	}else{
		if(j==1){
			var ipt1=cf.mkTag("input",col);
			ipt1.className="input_date";
			ipt1.id="pop_ordering_day";
			if(flag=="modi"&&txt){
				ipt1.value=modiDate(txt,"-");		
			}
			cf.setCss(ipt1,{width:109+"px"});
		}else if(j==5){
			var ipt1=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt1.className="input_date";
			ipt1.id="pop_license_start_date";
			ipt2.className="input_date";
			ipt2.id="pop_license_end_date";
			if(flag=="modi"){
				if(txt&&data[i][6]){
					ipt1.value=modiDate(txt,"-");
					ipt2.value=modiDate(data[i][6],"-");
				}
			}
			span.innerHTML=" ~ ";			
			ipt1.onchange=function(e){
				if(e.target.value){
					var sday=ipt1.value,
						year=(sday.split("-")[0])*1,
						mon=sday.split("-")[1],
						day=sday.split("-")[2],
						startday=new Date(sday),
						endday=new Date(ipt2.value);		
					
					if(ipt2.value&&startday>endday){
						generalPopOk2("시작일과 종료일을 확인하세요.",function(){
							e.target.value="";
							return;
						});
					}else{
						var cal_sday=new Date(sday),
							cal_eday,cal;
						cal=cal_sday.setDate(cal_sday.getDate()+364);
						cal_eday=new Date(cal);
						var day=cal_eday.getDate(),
							mon=(cal_eday.getMonth()*1)+1;
						function f(val){
							if(val<10){
								val="0"+val;
							}
							return val;
						}
						ipt2.value=cal_eday.getFullYear()+"-"+f(mon*1)+"-"+f(day*1);
					}
				}
			};
			ipt2.onchange=function(e){
				if(ipt1.value){
					var sday=ipt1.value,
						year=(sday.split("-")[0])*1,
						mon=sday.split("-")[1],
						day=sday.split("-")[2],
						startday=new Date(sday),
						endday=new Date(e.target.value);		
					
					if(startday>endday){
						generalPopOk2("시작일과 종료일을 확인하세요.",function(){
							e.target.value=(year+1)+"-"+mon+"-"+day;
							return;
						});
					}
				}
			};
			cf.setCss(ipt1,{width:109+"px"});
			cf.setCss(ipt2,{width:109+"px"});
		}
	}
};
function callRecordAddTb09(p,flag,gb,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["Target ID","","사업장","","",""]];
	else var tbar=[["Target ID",data[28],"사업장",data[29],"",""]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:3, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					//var span=cf.mkTag("span",col);
					//span.innerHTML="*";
					//span.className="asterisk pd2";
					headerstyle(row,i,col,j);
				}else{
					salespop02_tablecellaction_addtb09(tds,data,row,i,col,j);
				}
				commonstyle(row,i,col,j);
			}
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2)cf.setCss(col,{width:109+"px"});
		if(j==1)cf.setCss(col,{width:351+"px"});
	};
};
function salespop02_tablecellaction_addtb09(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(j==1){
		var ipt=cf.mkTag("input",col);
		ipt.id="pop_in_target_id";
		ipt.value=txt;
		cf.setCss(ipt,{width:90+"%"});
	}else if(j==3){
		var ipt=cf.mkTag("input",col);
		ipt.id="pop_in_place_of_business";
		ipt.value=txt;
		cf.setCss(ipt,{width:90+"%"});
	}
};
//ETC 추가
function recordAddPopTb02(p,flag,data){
	p.innerHTML="";
	var tit01=cf.mkTag("div",p),
		tbdv01=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		tit02=cf.mkTag("div",p),
		tbdv02=cf.mkTag("div",p),
		cl2=cf.mkTag("div",p),
		tit03=cf.mkTag("div",p),
		tbdv03=cf.mkTag("div",p),
		cl3=cf.mkTag("div",p),
		tit04=cf.mkTag("div",p),
		tbdv04=cf.mkTag("div",p);
	tit01.className="mini_title";
	tit02.className="mini_title";
	tit03.className="mini_title";
	tit04.className="mini_title";
	tit01.innerHTML="제품";
	tit02.innerHTML="매출";
	tit03.innerHTML="매입";
	tit04.innerHTML="기타";	
	tbdv01.className="Wrap_table";
	tbdv02.className="Wrap_table";
	tbdv03.className="Wrap_table";
	tbdv04.className="Wrap_table";
	callRecordAddTb05(tbdv01,flag,data);
	callRecordAddTb06(tbdv02,flag,data);
	callRecordAddTb07(tbdv03,flag,data);
	callRecordAddTb08(tbdv04,flag,data);
	
	cf.setCss(tit01,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit02,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit03,{height:20+"px",marginTop:15+"px"});
	cf.setCss(tit04,{height:20+"px",marginTop:15+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(cl3,{clear:"both"});
	//cf.setCss(p,{paddingBottom:20+"px"});
};
function callRecordAddTb05(p,flag,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["구분","","모델명","","",""],["Description(기간)","","","","수량",""],["List Price","","","","",""]];
	else var tbar=[["구분",data[0],"모델명",data[1],"",""],["Description(기간)",data[2],"","","수량",data[4]],["List Price",data[5],"","","",""]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:3, howmany:3},{y:1, x:1, howmany:3},{y:2, x:1, howmany:5}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4){
					var span=cf.mkTag("span",col);
					span.innerHTML="*";
					span.className="asterisk pd2";
					headerstyle(row,i,col,j);
				}else salespop02_tablecellaction_addtb05(tds,data,row,i,col,j,flag);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(i==0&&j==1)cf.setCss(col,{width:159+"px"});
		else if(i==1&&j==5)cf.setCss(col,{width:219+"px"});
	};	
};
function salespop02_tablecellaction_addtb05(tds,data,row,i,col,j,flag){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(i==0){
		if(j==1){			
			var select=cf.mkTag("select",col);
			select.style.width=95+"px";
			select.id="pop_in_sales_gb";
			mkSelect(select,BRANDLIST,txt);
			cf.setCss(select,{width:130+"px"});			
			if(flag=="modi")mkHidden(data[16],"pop_sales_record_id",col);
			else mkHidden("","pop_sales_record_id",col);
		}else if(j==3){
			var ipt=cf.mkTag("input",col);
			ipt.id="pop_in_model";
			ipt.value=txt;
			cf.setCss(ipt,{width:95+"%"});
		}else col.innerHTML=txt;
	}else if(i==1){
		if(j==1){
			col.className="txt_left pd10";
			var ipt1=cf.mkTag("input",col),
				span=cf.mkTag("span",col),
				ipt2=cf.mkTag("input",col);
			ipt1.className="input_date";
			ipt1.id="pop_in_des_start_day";
			ipt2.className="input_date";
			ipt2.id="pop_in_des_end_day";
			if(flag=="modi"){
				if(txt)ipt1.value=modiDate(txt,"-");
				if(data[3])ipt2.value=modiDate(data[3],"-");
			}
			span.innerHTML="~";
			
			ipt1.onchange=function(e){
				if(e.target.value){
					var sday=ipt1.value,
						year=(sday.split("-")[0])*1,
						mon=sday.split("-")[1],
						day=sday.split("-")[2],
						startday=new Date(sday),
						endday=new Date(ipt2.value);		
					
					if(ipt2.value&&startday>endday){
						generalPopOk2("시작일과 종료일을 확인하세요.",function(){
							e.target.value="";
							return;
						});
					}else{
						var cal_sday=new Date(sday),
							cal_eday,cal;
						cal=cal_sday.setDate(cal_sday.getDate()+364);
						cal_eday=new Date(cal);
						var day=cal_eday.getDate(),
							mon=(cal_eday.getMonth()*1)+1;
						function f(val){
							if(val<10){
								val="0"+val;
							}
							return val;
						}
						ipt2.value=cal_eday.getFullYear()+"-"+f(mon*1)+"-"+f(day*1);
					}
				}
			};
			ipt2.onchange=function(e){
				if(ipt1.value){
					var sday=ipt1.value,
						year=(sday.split("-")[0])*1,
						mon=sday.split("-")[1],
						day=sday.split("-")[2],
						startday=new Date(sday),
						endday=new Date(e.target.value);		
					
					if(startday>endday){
						generalPopOk2("시작일과 종료일을 확인하세요.",function(){
							e.target.value=(year+1)+"-"+mon+"-"+day;
							return;
						});
					}
				}
			};
			cf.setCss(span,{marginLeft:20+"px",marginRight:20+"px"});
			cf.setCss(ipt1,{width:129+"px"});
			cf.setCss(ipt2,{width:129+"px"});
		}else if(j==5){
			col.className="txt_left pd10";
			var ipt=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_in_qty";
			ipt.value=txt;
			ipt.onkeyup=function(e){
				this.value=uncomma(e.target.value);
				checkChar(e,this);
				
				var purchase_unit=document.getElementById("pop_in_purchase_unit_price").value,
					purchase_str=document.getElementById("pop_in_purchase_price_str"),
					purchase_price=document.getElementById("pop_in_purchase_price"),
					sales_unit=document.getElementById("pop_in_sales_unit_price").value,
					sales_str=document.getElementById("pop_in_sales_price_str"),
					sales_price=document.getElementById("pop_in_sales_price"),
					list_price=document.getElementById("pop_in_list_price").value,
					dc=document.getElementById("pop_in_purchase_dc"),qty;
				
				if(!sales_unit)sales_unit=1;
				if(!purchase_unit)purchase_unit=1;
				if(!list_price)list_price=1;
				if(!this.value)qty=1;
				else qty=this.value;
				
				var	sales_sum=(qty*1)*(uncomma(sales_unit)*1),
					purchase_sum=(qty*1)*(uncomma(purchase_unit)*1),
					purchase_sum2=(uncomma(list_price)*1)*(qty*1),
					purchase_dc=((1-(purchase_sum/purchase_sum2))*100);
				
				if(this.value!=0){
					purchase_sum=purchase_sum.toFixed(0);
					sales_sum=sales_sum.toFixed(0);
					purchase_price.value=purchase_sum;
					purchase_str.innerHTML=comma(purchase_sum);
					sales_price.value=sales_sum;
					sales_str.innerHTML=comma(sales_sum);

					if(list_price==0){
						dc.value=0;
					}else dc.value=purchase_dc.toFixed(2);
				}
			};
			cf.setCss(ipt,{width:119+"px"});
		}else col.innerHTML=txt;
	}else if(i==2){
		if(j==1){
			col.className="txt_left pd10";
			var ipt=cf.mkTag("input",col);
			ipt.className="price";
			ipt.id="pop_in_list_price";
			ipt.value=comma(txt*1);
			ipt.onkeyup=function(e){
				this.value=comma(uncomma(e.target.value));
				checkChar(e,this);			
				var qty=document.getElementById("pop_in_qty").value,
					purchase_unit=document.getElementById("pop_in_purchase_unit_price").value,
					purchase_str=document.getElementById("pop_in_purchase_price_str"),
					purchase_price=document.getElementById("pop_in_purchase_price"),
					dc=document.getElementById("pop_in_purchase_dc"),list_price;
				
				if(!qty)qty=1;
				if(!purchase_unit)purchase_unit=1;
				if(!this.value)list_price=1;
				else list_price=this.value;
				
				var	purchase_sum=(qty*1)*(uncomma(purchase_unit)*1),
					purchase_sum2=(uncomma(list_price)*1)*(qty*1),
					purchase_dc=((1-(purchase_sum/purchase_sum2))*100);
				if(this.value!=0){
					purchase_price.value=purchase_sum.toFixed(0);
					purchase_str.innerHTML=comma(purchase_sum.toFixed(0));
					dc.value=purchase_dc.toFixed(2);
				}
			};
			cf.setCss(ipt,{width:470+"px"});
		}
	}else col.innerHTML=txt;
};
function callRecordAddTb06(p,flag,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["단가","","매출액","","DC Rate",""]];
	else var tbar=[["단가",data[6],"매출액",data[7],"DC Rate",data[8]]];
	
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4){
					if(j==0){
						var span=cf.mkTag("span",col);
						span.innerHTML="*";
						span.className="asterisk pd2";
					}
					headerstyle(row,i,col,j);
				}else salespop02_tablecellaction_addtb06(tds,data,row,i,col,j);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:159+"px"});
		else if(j==5)cf.setCss(col,{width:219+"px"});
	};	
};
function salespop02_tablecellaction_addtb06(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(j==1){
		var ipt=cf.mkTag("input",col);
		ipt.className="price";
		ipt.id="pop_in_sales_unit_price";
		ipt.value=comma(txt*1);
		ipt.onfocus=function(e){
			if(e.target.value==0)e.target.value="";
		};
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);			
			var qty=document.getElementById("pop_in_qty"),
				str=document.getElementById("pop_in_sales_price_str"),
				price=document.getElementById("pop_in_sales_price"),
				sum=(uncomma(this.value)*1)*(qty.value*1);
			price.value=sum.toFixed(0);
			str.innerHTML=comma(sum.toFixed(0));
		};
		cf.setCss(ipt,{width:90+"%"});
	}else if(j==3){
		var dv=cf.mkTag("div",col),
			str=cf.mkTag("div",dv),
			ipt=cf.mkTag("input",dv);
		str.className="price";
		str.id="pop_in_sales_price_str";
		ipt.id="pop_in_sales_price";			
		if(data){
			if(data[7]){
				var sum=(uncomma(data[7])*1).toFixed(0);
				ipt.value=sum;
				str.innerHTML=comma(sum);
			}else if(data[4]&&data[6]){
				var sum=(uncomma(data[4])*1)*(uncomma(data[6])*1);
				sum=(sum*1).toFixed(0);
				ipt.value=sum;
				str.innerHTML=comma(sum);
			}
		}else{
			ipt.value=txt*1;
			str.innerHTML=comma(txt*1);
		}		
		cf.setCss(ipt,{display:"none"});
	}else if(j==5){
		col.className="txt_left pd10";
		var ipt=cf.mkTag("input",col),
			span=cf.mkTag("span",col);
		ipt.id="pop_in_sales_dc";
		ipt.className="price";
		span.innerHTML="%";
		ipt.value=txt*1;		
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
		};
		cf.setCss(ipt,{width:99+"px"});
	}
};
function callRecordAddTb07(p,flag,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["단가","","매입가","","DC Rate",""]];
	else var tbar=[["단가",data[9],"매입가",data[10],"DC Rate",data[11]]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					if(j==0||j==4){
						var span=cf.mkTag("span",col);
						span.innerHTML="*";
						span.className="asterisk pd2";
					}
					headerstyle(row,i,col,j);
				}else salespop02_tablecellaction_addtb07(tds,data,row,i,col,j);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2||j==4)cf.setCss(col,{width:109+"px"});
		else if(j==1)cf.setCss(col,{width:159+"px"});
		else if(j==5)cf.setCss(col,{width:219+"px"});
	};	
};
function salespop02_tablecellaction_addtb07(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(j==1){
		var ipt=cf.mkTag("input",col);
		ipt.className="price";
		ipt.id="pop_in_purchase_unit_price";
		ipt.value=comma(txt*1);
		ipt.onfocus=function(e){
			if(e.target.value==0)e.target.value="";
		};
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);			
			var qty=document.getElementById("pop_in_qty").value,
				str=document.getElementById("pop_in_purchase_price_str"),
				price=document.getElementById("pop_in_purchase_price"),
				list_price=document.getElementById("pop_in_list_price").value,
				dc=document.getElementById("pop_in_purchase_dc"),purchase_unit;
			
			if(!qty)qty=1;
			if(!list_price)list_price=1;
			if(!this.value)purchase_unit=1;
			else purchase_unit=this.value;
			
			var	sum=(uncomma(purchase_unit)*1)*(qty*1),
				sum2=(uncomma(list_price)*1)*(uncomma(qty)*1);
			price.value=sum.toFixed(0);
			str.innerHTML=comma(sum.toFixed(0));
			
			if(list_price==0){
				dc.value=0;
			}else{
				var purchase_dc=((1-(sum/sum2))*100);				
				if(isNumber(dc.value)==true)dc.value=purchase_dc.toFixed(2);
			}
		};
		cf.setCss(ipt,{width:90+"%"});
	}else if(j==3){
		var dv=cf.mkTag("div",col),
			str=cf.mkTag("div",dv),
			ipt=cf.mkTag("input",dv);
		str.className="price";
		str.id="pop_in_purchase_price_str";
		ipt.id="pop_in_purchase_price";			
		if(data){
			if(data[10]){
				var sum=(uncomma(data[10])*1).toFixed(0);
				ipt.value=sum;
				str.innerHTML=comma(sum);
			}else if(data[4]&&data[9]){
				var sum=(uncomma(data[4])*1)*(uncomma(data[9])*1);
				sum=(sum*1).toFixed(0);
				ipt.value=sum;
				str.innerHTML=comma(sum);
			}
		}else{
			ipt.value=txt*1;
			str.innerHTML=comma(txt*1);
		}		
		cf.setCss(ipt,{display:"none"});
	}else if(j==5){
		col.className="txt_left pd10";
		var ipt=cf.mkTag("input",col),
			span=cf.mkTag("span",col);
		ipt.id="pop_in_purchase_dc";
		ipt.className="price";
		ipt.readOnly=true;
		span.innerHTML="%";
		ipt.value=txt;
		cf.setCss(ipt,{width:99+"px",backgroundColor:"#eee"});
	}
};
function callRecordAddTb08(p,flag,data){
	p.innerHTML="";
	if(flag=="add")var tbar=[["구매처","","결재조건","","",""]];
	else var tbar=[["구매처",data[12],"결재조건",data[13],"",""]];
	var tds=new TABLE({
		p:p,
		arr:tbar,
		mode:false,
		header:[],
		colspans:[{y:0, x:3, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6){
					var span=cf.mkTag("span",col);
					span.innerHTML="*";
					span.className="asterisk pd2";
					headerstyle(row,i,col,j);
				}else salespop02_tablecellaction_addtb08(tds,data,row,i,col,j);
				commonstyle(row,i,col,j);
			}
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{backgroundColor:"#fafafa",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			tb.id="";			
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
		}
		if(j==0||j==2)cf.setCss(col,{width:109+"px"});
		if(j==1)cf.setCss(col,{width:159+"px"});
	};
};
function salespop02_tablecellaction_addtb08(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";	
	if(j==1){
		var ipt=cf.mkTag("input",col);
		ipt.id="pop_in_supplier";
		ipt.value=txt;
		cf.setCss(ipt,{width:90+"%"});
	}else if(j==3){
		col.className="txt_left pd10";
		var select=cf.mkTag("select",col),
			ipt=cf.mkTag("input",col);
		select.id="pop_in_purchase_pay_code";
		mkSelect(select,PAYLIST,txt);
		select.onchane=payMethod;
		ipt.id="pop_in_purchase_pay_method";
		if(data)ipt.value=data[14];
		ipt.onblur=payMethod;
		cf.setCss(select,{width:100+"px"});
		cf.setCss(ipt,{width:300+"px",marginLeft:5+"px"});
	}
};
