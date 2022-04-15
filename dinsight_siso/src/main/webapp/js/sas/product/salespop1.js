var prev_salespop01;
function callpopup(flag,num,conferid,status){
	if(flag !="new")num=num;
	else num=1;
	prev_salespop01=this;
	prev_salespop01.opt=true;
	prev_salespop01.num=num;
	prev_salespop01.flag=flag;
	if(conferid)prev_salespop01.sales_confer_id=conferid;
	if(prev_salespop01.pop){
		prev_salespop01.pop.location.href="../product/productSalesPop";
		prev_salespop01.pop.focus();
	}else window.open("../product/productSalesPop","_blank","fullscreen=yes,scrollbars=yes,resizable=yes, height=" + screen.height + ",width=" + screen.width);
};
function productDetailPop(obj){
	var con=document.createElement("div"),
		con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0);
	cf.setCss(con,{position:"absolute",width:600+"px",height:350+"px"});
	cf.setCss(con1,{border:2+"px solid black",backgroundColor:"#fff",width:600+"px",height:350+"px"});
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="&nbsp&nbsp&nbsp&nbsp상세보기";
	
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
	cf.setCss(con3,{overflowY:"auto",height:275+"px"});
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
	
	mkProductDetailTable(con5,obj);
	
	callPop(con);
};
function mkProductDetailTable(son,obj){
	var div=cf.mkTag("div",son),
		table=cf.mkTag("table",div);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th",tr);
	th.style.width=25+"%";
	th.innerHTML="작성일";
	
	var th=cf.mkTag("th",tr);
	th.style.width=35+"%";
	th.innerHTML="Project Code";
	
	var th=cf.mkTag("th",tr);
	th.style.width=20+"%";
	th.innerHTML="버전";
	
	var th=cf.mkTag("th",tr);
	th.className="right";
	th.style.width=20+"%";
	th.innerHTML="보기";
		
	var div=cf.mkTag("div",son),
		table=cf.mkTag("table",div);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",table);
		tr.style.textAlign="center";

		var td1=cf.mkTag("td",tr);
		td1.style.width=25+"%";
		td1.innerHTML=modiDate(d.insert_date, ".");
		
		var td2=cf.mkTag("td",tr);
		td2.style.width=35+"%";
		td2.innerHTML=d.contract_number;
				
		var td3=cf.mkTag("td",tr);
		td3.style.width=20+"%";
		td3.innerHTML=d.degree;
				
		var td4=cf.mkTag("td",tr);
		td4.className="right";
		td4.style.width=20+"%";
		td4.style.cursor="pointer";
		td4.innerHTML="[상세보기]";
		tr.onclick=function(){
			op={conferid : d.sales_confer_id};
			callProductSalesViewData(op, function(data){
				callpopup("view",d.degree,d.sales_confer_id);
			});
		};
		if(i==0){
			cf.setCss(td1,{borderTop:0+"px"});
			cf.setCss(td2,{borderTop:0+"px"});
			cf.setCss(td3,{borderTop:0+"px"});
			cf.setCss(td4,{borderTop:0+"px"});
		}
	});	
};
//보기
function productPop(obj){
	var con=document.createElement("div");
	con.style.width=1150+"px";
	con.style.height=cf.workareaheight-150+"px";
	//con.style.height=720+"px";
	con.style.position="absolute";
	//con.style.backgroundColor="white";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	//con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	//con1.className="my_top";
	con1.style.width=1150+"px";
	con1.style.height=cf.workareaheight-150+"px";
	//con1.style.height=720+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="매출/매입 품의서";
	
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
	
	var con_print=cf.mkTag("div",con1);
	con_print.id="printArea";
	
	var con3=cf.mkTag("div",con_print);
	con3.className="my-container2";
	con3.style.height=cf.workareaheight-280+"px";
	con3.style.overflowY="auto";
	
	var con3_title=cf.mkTag("div",con3);
	con3_title.style.fontWeight="bold";
	con3_title.style.fontSize=24+"px";
	con3_title.style.color="#000";
	con3_title.style.margin="0 auto";
	con3_title.style.width=300+"px";
	con3_title.style.textAlign="center";
	con3_title.style.paddingTop=15+"px";
	con3_title.innerHTML="매출 / 매입 품 의 서";
	
	var con4=cf.mkTag("div",con3);
	con4.style.height=40+"px";
	con4.className="sales_wrap";
	mkTitleTable(con4,obj);
	
	var con5=cf.mkTag("div",con3);
	con5.className="sales_wrap2";
	var table=cf.mkTag("table",con5);
	table.className="Normal_table";
	mkCompanyTable(table,obj);
	
	var con6=cf.mkTag("div",con3);
	con6.className="sales_wrap";
	mkSalesDetailTable(con6,obj);
	
	var con7=cf.mkTag("div",con3);
	con7.className="sales_wrap";
	mkSalesTable(con7,obj);
	
	var con8=cf.mkTag("div",con3);
	con8.className="sales_wrap";
	mkPurchaseTable(con8,obj);
		
	var con9=cf.mkTag("div",con1),
		span=cf.mkTag("span",con9);
	con9.className="savebtn3";
	span.innerHTML="<br/>";
	var img1=cf.mkTag("img",con9);
	img1.style.cursor="pointer";
	img1.src="/images/exp_payment/btn_print_big.gif";
	img1.onclick=function(){
		productSalesPrint(con_print);
	}
	
	var span=cf.mkTag("span",con9);
	span.innerHTML="   ";
	var img2=cf.mkTag("img",con9);
	img2.style.cursor="pointer";
	img2.src="/images/exp_payment/btn_cancelprint_big.gif";
	img2.onclick=function(){
		cf.killTag(con.parentNode);
	};	
	callPop(con);
};
function mkTitleTable(son,obj){
	obj=obj.productList;
	
	var table=cf.mkTag("table",son);
	table.style.width=160+"px";
	table.style.float="left";
	table.className="Normal_table";
	//table.id="";
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="59px";
	th.innerHTML="작성일자";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.width="100px";
	td.style.textAlign="center";
	td.innerHTML=modiDate(obj[0].insert_date);
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="담당자";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.style.width="100px";
	td.innerHTML=obj[0].staff_name;
		
	var con=cf.mkTag("div",son);
	con.className="";
	con.style.position="absolute";
	con.style.top=20+"px";
	con.style.left=465+"px";
	con.style.fontWeight="bold";
	con.style.fontSize=13+"px";
	con.style.width=150+"px";
	con.style.height=18+"px";
	con.style.textAlign="center";
	con.style.paddingTop=5+"px";
	con.style.border=2+"px solid black";
	con.innerHTML="수정"+ obj[0].degree +"차";
	
	var table=cf.mkTag("table",son);
	table.style.width=210+"px";
	table.style.float="right";
	table.className="Normalprint_table";

	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="73px";
	th.innerHTML="Project Code";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	//td.style.width="127px";
	td.innerHTML=obj[0].contract_number;
};
function mkCompanyTable(tb,obj){	
	var tr=cf.mkTag("tr",tb);
	var td=cf.mkTag("td",tr);
	td.colSpan=11;
	td.style.borderTop="#fff";
	
	var th=cf.mkTag("th",tr);
	th.rowSpan=3;
	th.style.width=5+"%";
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="결제조건";
	var td=cf.mkTag("td",tr);
	td.style.width=10+"%";
	td.className="pd10";
	
	var span=cf.mkTag("span",td);
	td.style.textAlign="left";
	span.innerHTML="현금 : ";
	
	var span=cf.mkTag("span",td);
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="01"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.rowSpan=4;
	th.style.width=4+"%";
	th.style.backgroundColor="#eeeeee";
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML=" 매<br/><br/>출<br/><br/>처 ";
	
	var th=cf.mkTag("th",tr);
	th.style.width=5+"%";
	th.innerHTML="회사명";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	td.style.width=18+"%";
	td.innerHTML=com[0].company_name;
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	
	th.style.backgroundColor="#eeeeee";
	th.style.width="12%";
	th.innerHTML="총계약금";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	
	th.style.backgroundColor="#eeeeee";
	
	th.innerHTML="매입가";
	th.style.width="12%";
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	
	th.style.backgroundColor="#eeeeee";
	th.style.width="12%";
	th.innerHTML="영업이익";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	td.style.textAlign="left";
	span.innerHTML="어음 : ";
	var span=cf.mkTag("span",td);
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="02"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	//th.style.width=69+"px";
	th.innerHTML="주소";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.style.borderRight="1px solid #e3e3e3";
	td.innerHTML=comma(com[0].total_contract_price);
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.style.borderRight="1px solid #e3e3e3";
	td.innerHTML=comma(com[0].purchase_price);
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum payment_input";
	td.style.borderRight="1px solid #e3e3e3";
	td.innerHTML=comma(com[0].profit_price);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	td.style.textAlign="left";
	span.innerHTML="기타 : "
	var span=cf.mkTag("span",td);
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="03"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	//th.style.width=68+"px";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.innerHTML=com[0].customer_division;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="고객담당자";
	//th.style.width=8+"%";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.style.width="86px";
	td.innerHTML=com[0].customer_name;
	
	var th=cf.mkTag("th",tr);
	th.style.width=5+"%";
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.style.width="97px";
	td.style.textAlign="center";
	td.innerHTML=com[0].customer_tel;
	
	var th=cf.mkTag("th",tr);
	th.style.width=5+"%";
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	//td.style.width="254px";
	td.colSpan=2;
	td.innerHTML=com[0].customer_hp;
	
	var th=cf.mkTag("th",tr);
	th.style.width="70px";
	th.innerHTML="E-mail";
	
	
	var td=cf.mkTag("td",tr);
	td.style.width="137px";
	td.className="pd10";
	td.style.textAlign="left";
	td.innerHTML=com[0].customer_email
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	//th.style.width=69+"px";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	//td.style.width="45px";
	td.innerHTML=com[0].invoice_division
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="계산서 담당자";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.innerHTML=com[0].invoice_id_name;
	
	var th=cf.mkTag("th",tr);
	
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.style.textAlign="center";
	td.innerHTML=com[0].invoice_tel;
	
	var th=cf.mkTag("th",tr);
	
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="pd10";
	td.innerHTML=com[0].invoice_hp;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="E-mail";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.textAlign="left";
	td.innerHTML=com[0].invoice_email;
};
function mkSalesDetailTable(son,obj){
	sum=obj.productList;
	data=obj.recordList;	
	
	var p=cf.mkTag("p",son);
	p.className="mini_title";
	p.innerHTML="매출 및 매입내역";
			
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="No";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="구분";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="모델명";
	
	var th=cf.mkTag("th",tr);
	th.style.width="153px";
	th.innerHTML="Description(기간)";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="수량";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="List price";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출단가";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출액";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="D/C";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입단가";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입가";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="D/C";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="구매처";
	
	var th=cf.mkTag("th",tr);
	th.style.width="121px";
	th.innerHTML="결제조건";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="salesDetail_contents";
	salesDetailView(tbd,data);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=5;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML="합계";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML=comma(sum[0].total_contract_price);
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="sum payment_input";
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.innerHTML=comma(sum[0].purchase_price);
		
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
		td.innerHTML=d.sales_gb;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.model;
		
		var td=cf.mkTag("td",tr);
		var span=cf.mkTag("span",td);
		span.innerHTML=modiDate(d.des_start_day,true);
		var span=cf.mkTag("span",td);
		span.innerHTML=" ~ ";
		var span=cf.mkTag("span",td);
		span.innerHTML=modiDate(d.des_end_day,true);
		
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
		td.innerHTML=d.sales_dc;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.purchase_unit_price);
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.purchase_price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.purchase_dc;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.supplier;
		
		var td=cf.mkTag("td",tr);
		var span=cf.mkTag("span",td);
		span.innerHTML=d.purchase_pay_name;
		var span=cf.mkTag("span",td);
		span.innerHTML=d.purchase_pay_method;
	});
};
function mkSalesTable(son,obj){
	obj=obj.invoiceSaleList;
	
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
	th.style.width="94px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="180px";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="140px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매출액";
	var th=cf.mkTag("th",tr);
	th.innerHTML="매출결제조건";
	th.style.width="180px";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
		
	var tbd=cf.mkTag("tbody",table);
	salesView(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	obj.trav(function(d,i){
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
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.method_name;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.payment_requisite_content;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.contract_number;
	});
};
function mkPurchaseTable(son,obj){
	obj=obj.invoiceBuyList;
	
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
	th.style.width="94px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="180px";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="140px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입액";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입결제조건";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
		
	var tbd=cf.mkTag("tbody",table);
	purchaseView(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	obj.trav(function(d,i){
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
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.method_name;
		
		var td=cf.mkTag("td",tr);
		td.className="payment_input";
		td.innerHTML=comma(d.price);
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.payment_requisite_content;
		
		var td=cf.mkTag("td",tr);
		td.innerHTML=d.contract_number;
	});
};
//추기 수정
function productInputPop(opt){
	if(opt&&!prev){
		generalPopOk2("수정할 매출품의를 선택하세요");
		return;
	}
	var main,record,buy,sales,obj;
	if(opt){
		var op={conferid : prev.obj.sales_confer_id};
		callProductSalesViewData(op, function(data){
			//dir(data);
			obj=data;
			main=data.productList;
			record=data.recordList;
			buy=data.invoiceBuyList;
			sales=data.invoiceSaleList;
		});
	}	
	var con=document.createElement("div");
	con.style.width=1300+"px";
	con.style.height=cf.workareaheight-150+"px";
	con.style.position="absolute";
	//con.style.backgroundColor="white";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	//con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	//con1.className="my_top";
	con1.style.width=1300+"px";
	con1.style.height=cf.workareaheight-150+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="매출/매입품의서";
	
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
	
	var con_print=cf.mkTag("div",con1);
	con_print.id="printArea";
	
	var con3=cf.mkTag("div",con_print);
	con3.className="my-container";
	con3.style.height=cf.workareaheight-260+"px";
	con3.style.overflowY="auto";
	con3.id="product_contents";
	
	var con3_title=cf.mkTag("div",con3);
	con3_title.style.fontWeight="bold";
	con3_title.style.fontSize=24+"px";
	con3_title.style.color="#000";
	con3_title.style.margin="0 auto";
	con3_title.style.width=300+"px";
	con3_title.style.textAlign="center";
	con3_title.style.paddingTop=15+"px";
	con3_title.innerHTML="매출 / 매입 품 의 서";

	var div=cf.mkTag("div",con3),
		span=cf.mkTag("sapn",div);
	div.className="descriptS asterisk ";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";
	
	
	var con4=cf.mkTag("div",con3);
	con4.style.height=40+"px";
	con4.className="sales_wrap";
	if(opt) modiTitleTable(con4,main);
	else addTitleTable(con4);
	
	var con5=cf.mkTag("div",con3);
	con5.className="sales_wrap2";
	var table=cf.mkTag("table",con5);
	//table.cellpadding=0;
	//table.cellspacing=0;
	table.className="Normal_table";
	//table.id="";
	if(opt) modiCompanyTable(table,obj);
	else addCompanyTable(table);
	
	var con6_ds=cf.mkTag("div",con3);
	con6_ds.className="sales_wrap";
	//addDsSalesDetailTable(con6_ds,opt,record);
	
	var con6_etc=cf.mkTag("div",con3);
	con6_etc.className="sales_wrap";
	//addEtcSalesDetailTable(con6_etc,opt,record);
	
	var con7=cf.mkTag("div",con3);
	con7.className="sales_wrap";
	//addSalesTable(con7,opt,sales);
	
	var con8=cf.mkTag("div",con3);
	con8.className="sales_wrap";
	//addPurchaseTable(con8,opt,buy);
		
	var con9=cf.mkTag("div",con1),
		span=cf.mkTag("span",con9);
	con9.className="savebtn3";
	span.innerHTML="<br/>";
	var img1=cf.mkTag("img",con9);
	img1.style.cursor="pointer";
	img1.src="/images/pop_btn/btn_save_big.gif";
	img1.onclick=function(){
		productSave(con);
	};
	
	var span=cf.mkTag("span",con9);
	span.innerHTML="   ";
	var img2=cf.mkTag("img",con9);
	img2.style.cursor="pointer";
	img2.src="/images/pop_btn/btn_cancel_big.gif";
	img2.onclick=function(){
		document.getElementById("my_closs").onclick();	
	};
	callPop(con);
	datePicker("input_date", "yy-mm-dd");
};
function addTitleTable(son){
	var date=new Date();
	var mon=date.getMonth()+1;
	if(mon<10){mon="0"+mon;}
	
	var table=cf.mkTag("table",son);
	table.style.width=160+"px";
	table.style.float="left";
	table.className="Normal_table";
	//table.id="";
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="59px";
	th.innerHTML="작성일자";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.readOnly=true;
	ipt.className="input_date";
	ipt.style.width="95%";
	ipt.name="insert_date";
	ipt.value=date.getFullYear()+"-"+mon+"-"+date.getDate();
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.name="staff_id";
	ipt.id="staff_id";
	var ipt=cf.mkTag("input",td);
	ipt.readOnly=true;
	ipt.id="staff_name";
	ipt.name="staff_name";
	ipt.value="선택하세요";
	cf.setCss(ipt,{
		width:95+"%",
		textAlign:"center",
		cursor:"pointer"
	});
	
	ipt.onclick=divisionPop;
	
	var con=cf.mkTag("div",son);
	con.className="";
	con.style.position="absolute";
	con.style.top=20+"px";
	con.style.left=465+"px";
	con.style.fontWeight="bold";
	con.style.fontSize=13+"px";
	con.style.width=150+"px";
	con.style.height=18+"px";
	con.style.textAlign="center";
	con.style.paddingTop=5+"px";
	con.style.border=2+"px solid black";
	var span=cf.mkTag("span",con);
	span.innerHTML="수정1차";
	
	var table=cf.mkTag("table",son);
	table.style.width=230+"px";
	table.style.float="right";
	table.className="Normal_table";

	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="Project Code";
	th.style.width="73px";
	th.style.fontWeight="bold";
	th.style.fontSize=13+"px";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	//td.className="";
	td.style.textAlign="center";
	td.style.width="156px";
	var ipt=cf.mkTag("input",td);
	ipt.id="contract_number_id";
	ipt.name="contract_number_id";
	ipt.type="hidden";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.name="contract_number";
	ipt.style.width="95%";
	ipt.style.cursor="pointer";
	ipt.readOnly=true;
	ipt.value="선택하세요.";
	ipt.onclick=function(e){
		//getProductCodePop(e,true);
		getProductCodePop("SUCCESS_Y");
	}
	//datePicker("input_date", "yymmdd");
};
function addCompanyTable(tb){
	var tr=cf.mkTag("tr",tb);
	var td=cf.mkTag("td",tr);
	td.colSpan=11;
	td.style.borderTop="#fff";
	var th=cf.mkTag("th",tr);
	th.rowSpan=3;
	th.style.width=70+"px";
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="결제조건";
	
	var td=cf.mkTag("td",tr);
	td.style.width=147+"px";
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="현금 : ";
	var span=cf.mkTag("span",td);
	span.id="method_cash";
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.rowSpan=4;
	th.style.width=42+"px";
	th.style.backgroundColor="#eeeeee";
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML=" 매<br/><br/>출<br/><br/>처 ";
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="회사명";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	td.style.width=248+"px";
	var ipt=cf.mkTag("input",td);
	ipt.id="companyname";
	ipt.style.width="95%";
	ipt.readOnly=true;
	var ipt=cf.mkTag("input",td);
	ipt.id="companyid";
	ipt.name="company_id";
	ipt.type="hidden";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="총계약금";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입가";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="영업이익";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="어음 : ";
	var span=cf.mkTag("span",td);
	span.id="method_bill";
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="주소";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	td.style.width=248+"px";
	var ipt=cf.mkTag("input",td);
	ipt.id="address";
	ipt.name="address";
	ipt.style.width="95%";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="total_contract_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="purchase_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="profit_price";
	ipt.readOnly=true;
	ipt.className="payment_input";
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="기타 : ";
	var span=cf.mkTag("span",td);
	span.id="method_etc";
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	th.style.width=68+"px";
	
	var td=cf.mkTag("td",tr);
	td.style.width="84px";
	td.style.textAlign="center";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_division";
	ipt.readOnly=true;
	ipt.size=9;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="고객<br/>담당자";
	th.style.width=57+"px";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_id";
	ipt.name="customer_id";
	ipt.type="hidden";
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	//ipt.style.width="60px";
	ipt.id="cus_name";
	ipt.readOnly=true;
	ipt.size=6;
	var img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP();
	};	
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_tel";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
		
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="E-mail";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	th.style.width=68+"px";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_division";
	ipt.readOnly=true;
	ipt.size=9;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="계산서<br/>담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_id";
	ipt.name="invoice_id";
	ipt.type="hidden";
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	//ipt.style.width="60px";
	ipt.id="tax_name";
	ipt.readOnly=true;
	ipt.size=6;
	var img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP(true);
	}
	
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_tel";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var th=cf.mkTag("th",tr);
	th.style.width=36+"px";
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="E-mail";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
};
function addDsSalesDetailTable(son,opt,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="DS 매출 및 매입내역";
	
	var con=cf.mkTag("div",son);
	con.className="btn_action2";
	var ul=cf.mkTag("ul",con);
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_plus_on.gif";
	img.onclick=addsalesDetail; //매출 및 매입내역 추가
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_del_on.gif";
	img.onclick=delsalesDetail; //매출 및 매입내역 삭제
		
	var tds=new TABLE({
		p:son,
		arr:[],
		mode:false,
		header:[["No","제품","","","","","","","","","매출","","","매입","","","","기간",""],
		        ["No","Portfolio","Trigram","Type","Prd.Number","PLC","ALC","ETC","List</br>Price","수량","개별 DC","DC","합","PLC</br>DC","ALC</br>DC","단가","합","DS Po일자","설치일자"]],
		colspans:[{y:0, x:1, howmany:9},{y:0, x:10, howmany:3},{y:0, x:13, howmany:4},{y:0, x:17, howmany:2}],
		rowspans:[{y:0, x:0, howmany:2}]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(i<2)headerstyle(row,i,col,j);
				commonstyle(row,i,col,j);
			}				
		});
	});
	function headerstyle(row,i,col,j){
		if(j==13||j==14||j==15||j==16)cf.setCss(col,{backgroundColor:"#eeeeee"});
		else cf.setCss(col,{backgroundColor:"#fafafa"});
		cf.setCss(col,{height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all",borderLeft:1+"px solid #e3e3e3"});
			//cf.setCss(col,{borderTop:0+"px"});
		}
		//if(j==0)cf.setCss(col,{width:89+"px"});
		//else if(j==1)cf.setCss(col,{width:149+"px"});
		//else if(j==2)cf.setCss(col,{width:139+"px"});
		//else if(j==3)cf.setCss(col,{width:119+"px"});
		//else if(j==4)cf.setCss(col,{width:139+"px"});
		//else if(j==5||j==6||j==7||j==8)cf.setCss(col,{width:79+"px"});
		//else if(j==9)cf.setCss(col,{width:67+"px"});
	};
};
function addEtcSalesDetailTable(son,opt,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="ETC 매출 및 매입내역";
	
	var con=cf.mkTag("div",son);
	con.className="btn_action2";
	var ul=cf.mkTag("ul",con);
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_plus_on.gif";
	img.onclick=addsalesDetail; //매출 및 매입내역 추가
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_del_on.gif";
	img.onclick=delsalesDetail; //매출 및 매입내역 삭제
		
	var table=cf.mkTag("table",son);
	table.className="Normal_table";
	table.style.textAlign="center";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="25px";
	th.innerHTML="No";
	
	var th=cf.mkTag("th",tr);
	th.style.width="90px";
	th.innerHTML="구분";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="73px";
	th.innerHTML="모델명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="153px";
	th.innerHTML="Description(기간)";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="30px";
	th.innerHTML="수량";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="70px";
	th.innerHTML="List price";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="80px";
	th.innerHTML="매출단가";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="80px";
	th.innerHTML="매출액";
	
	var th=cf.mkTag("th",tr);
	th.style.width="40px";
	th.innerHTML="D/C";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="80px";
	th.innerHTML="매입단가";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="80px";
	th.innerHTML="매입가";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="40px";
	th.innerHTML="D/C";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="42px";
	th.innerHTML="구매처";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="121px";
	th.innerHTML="결제조건";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="salesDetail_contents";
	if(opt) salesDetailList(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
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
	if(opt) ipt.value=comma(uncomma(prev.obj.total_contract_price));
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
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
	ipt.id="sum_purchase";
	ipt.readOnly=true;
	//ipt.value=0;
	if(opt) ipt.value=comma(uncomma(prev.obj.purchase_price));
		
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
		select.style.width=90+"px";
		select.name="in_sales_gb";
		def=d.sales_gb;
		mkSelect(select, BRANDLIST,def);
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_model";
		ipt.value=d.model;
		
		var td=cf.mkTag("td",tr);
		var ipt_s=cf.mkTag("input",td);
		ipt_s.size=10;
		ipt_s.name="in_des_start_day";
		ipt_s.className="input_date";
		ipt_s.readOnly=true;
		ipt_s.value=modiDate(d.des_start_day);
		var span=cf.mkTag("span",td);
		span.innerHTML=" ~ ";
		var ipt_e=cf.mkTag("input",td);
		ipt_e.size=10;
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
		ipt.style.width="95%";
		ipt.name="in_qty";
		ipt.value=d.qty;
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumprice();
			sumSales();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width="85%";
		ipt.name="in_list_price";
		ipt.value=comma(uncomma(d.list_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width="85%";
		ipt.name="in_sales_unit_price";
		ipt.value=comma(uncomma(d.sales_unit_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumprice();
			sumSales();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width="85%";
		ipt.name="in_sales_price";
		ipt.readOnly=true;
		ipt.value=comma(uncomma(d.sales_price));
					
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="right";
		ipt.style.width="95%";
		ipt.readOnly=true;
		ipt.name="in_sales_dc";
		ipt.value=d.sales_dc;
		ipt.onkeyup=function(e){
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width="85%";
		ipt.name="in_purchase_unit_price";
		ipt.value=comma(uncomma(d.purchase_unit_price));
		ipt.onkeyup=function(e){
			this.value=comma(uncomma(e.target.value));
			checkChar(e,this);
			sumprice();
			sumSales();
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.className="payment_input";
		ipt.style.width="85%";
		ipt.readOnly=true;
		ipt.name="in_purchase_price";
		ipt.value=comma(uncomma(d.purchase_price));
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="right";
		ipt.style.width="95%";
		ipt.name="in_purchase_dc";
		ipt.value=d.purchase_dc;
		ipt.onkeyup=function(e){
			checkChar(e,this);
		};
		
		var td=cf.mkTag("td",tr);
		var ipt=cf.mkTag("input",td);
		ipt.style.width="95%";
		ipt.name="in_supplier";
		ipt.value=d.supplier;
		
		var td=cf.mkTag("td",tr);
		var select=cf.mkTag("select",td);
		select.style.width=60+"px";
		select.name="in_purchase_pay_code";
		var def=d.purchase_pay_code;
		mkSelect(select,PAYLIST,def);
		select.onchane=payMethod;
		var ipt=cf.mkTag("input",td);
		ipt.size=7;
		ipt.name="in_purchase_pay_method";
		ipt.value=d.purchase_pay_method;
		ipt.onblur=payMethod;
		
	});
	datePicker("input_date", "yy-mm-dd");
};
function addSalesTable(son,opt,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="매출 세금계산서";
	
	var con=cf.mkTag("div",son);
	con.className="btn_action2";
	var ul=cf.mkTag("ul",con);
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_plus_on.gif";
	img.onclick=addSales; //매출 세금계산서 추가
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_del_on.gif";
	img.onclick=delSales; //매출 세금계산서 삭제
		
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
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="94px";
	th.innerHTML="발행일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="180px";
	th.innerHTML="계산서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="140px";
	th.innerHTML="수기/전자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매출액";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매출결제조건";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
	
	var tbd=cf.mkTag("tbody",table);
	tbd.id="sales_contents";
	if(opt) salesList(tbd,obj);
	
	var tf=cf.mkTag("tfoot",table);
	var tr=cf.mkTag("tr",tf);
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.style.borderLeft=1+"px solid #e3e3e3";
	//td.innerHTML="비고(사양,납기 등 특이사항)";
	var textarea=cf.mkTag("textarea",td);
	textarea.style.width=95+"%";
	textarea.name="invoice_content";
	if(opt){
		obj.trav(function(d,i){
			if(d.invoice_content)	textarea.value=d.invoice_content;
		});
	}else textarea.value="비고(사양,납기 등 특이사항)";
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
/*function salesList(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		tr.idx=i;
		tr.onclick=function(){
			if(prev_sales==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_sales.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_sales=this;
			prev_sales.obj=d;
		};
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="center";
		ipt.size=10;
		ipt.name="in_split";
		ipt.value=d.split;
		
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
		var def=d.method;
		mkSelect(select,METHODLIST,def);
		
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
};*/
function addPurchaseTable(son,opt,obj){
	var p=cf.mkTag("p",son);
	p.className="mini_title2";
	p.innerHTML="매입 세금계산서";
	
	var con=cf.mkTag("div",son);
	con.className="btn_action2";
	var ul=cf.mkTag("ul",con);
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_plus_on.gif";
	img.onclick=addPurchase; //매입 세금계산서 추가
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_del_on.gif";
	img.onclick=delPurchase; //매입 세금계산서 삭제
		
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
	th.style.width="94px";
	th.innerHTML="발행일";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="180px";
	th.innerHTML="계산서명";
	var th=cf.mkTag("th",tr);
	th.style.backgroundColor="#eeeeee";
	th.style.width="140px";
	th.innerHTML="수기/전자";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입액";
	var th=cf.mkTag("th",tr);
	th.style.width="180px";
	th.innerHTML="매입결제조건";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Project Code";
		
	var tbd=cf.mkTag("tbody",table);
	tbd.id="purchase_contents";
	if(opt) purchaseList(tbd,obj);
	
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
	if(opt){
		obj.trav(function(d,i){
			if(d.invoice_content)	textarea.value=d.buy_invoice_content;
		});
	}else textarea.value="비고(사양,납기 등 특이사항)";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=4;
	td.className="right";
	td.style.borderBottom="#fff";
};
/*function purchaseList(son,obj){
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",son);
		tr.idx=i;
		tr.onclick=function(){
			if(prev_pur==null){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_pur.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_pur=this;
			prev_pur.obj=d;
		};
		
		var td=cf.mkTag("td",tr);
		td.style.borderLeft=1+"px solid #e3e3e3";
		var ipt=cf.mkTag("input",td);
		ipt.style.textAlign="center";
		ipt.size=10;
		ipt.name="in_buy_split";
		ipt.value=d.split;
		
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
		var def=d.method;
		mkSelect(select,METHODLIST,def);
		
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
};*/
//수정
function modiTitleTable(son,obj){
	obj=obj[0];
	
	var table=cf.mkTag("table",son);
	table.style.width=160+"px";
	table.style.float="left";
	table.className="Normal_table";
	//table.id="";
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.style.width="59px";
	th.innerHTML="작성일자";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	//ipt.readOnly=true;
	ipt.className="input_date";
	ipt.style.width="95%";
	ipt.name="insert_date";
	ipt.value=obj.insert_date;
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="담당자";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.name="staff_id";
	ipt.id="staff_id";
	ipt.value=obj.staff_id;
	var ipt=cf.mkTag("input",td);
	ipt.readOnly=true;
	ipt.id="staff_name";
	cf.setCss(ipt,{
		width:95+"%",
		textAlign:"center",
		cursor:"pointer"
	});
	ipt.value=obj.staff_name;
	ipt.onclick=divisionPop;
	
	var con=cf.mkTag("div",son);
	con.className="";
	con.style.position="absolute";
	con.style.top=20+"px";
	con.style.left=470+"px";
	con.style.fontWeight="bold";
	con.style.fontSize=13+"px";
	con.style.width=150+"px";
	con.style.height=18+"px";
	con.style.textAlign="center";
	con.style.paddingTop=5+"px";
	con.style.border=2+"px solid black";
	var span=cf.mkTag("span",con);
	span.innerHTML="수정"+(obj.degree*1+1)+"차";
	
	var table=cf.mkTag("table",son);
	table.style.width=230+"px";
	table.style.float="right";
	table.className="Normal_table";

	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML="Project Code";
	th.style.width="73px";
	
	var td=cf.mkTag("td",tr);
	//td.className="";
	td.style.textAlign="center";
	var ipt=cf.mkTag("input",td);
	ipt.id="contract_number_id";
	ipt.name="contract_number_id";
	ipt.type="hidden";
	ipt.value=obj.contract_number_id;
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.name="contract_number";
	ipt.style.width="95%";
	ipt.value=obj.contract_number;
	ipt.readOnly=true;

	//datePicker("input_date", "yymmdd");
};
function modiCompanyTable(tb,obj){
	com=obj.productList;
	rec=obj.recordList;
	
	com=com[0];

	var tr=cf.mkTag("tr",tb);
	var td=cf.mkTag("td",tr);
	td.colSpan=11;
	td.style.borderTop="#fff";
	var th=cf.mkTag("th",tr);
	th.rowSpan=3;
	th.style.width=69+"px";
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="결제조건";
	
	var td=cf.mkTag("td",tr);
	td.style.width=147+"px";
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="현금 : ";
	var span=cf.mkTag("span",td);
	span.id="method_cash";
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="01"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.rowSpan=4;
	th.style.width=42+"px";
	th.style.backgroundColor="#eeeeee";
	th.style.borderLeft=1+"px solid #e3e3e3";
	th.innerHTML=" 매<br/><br/>출<br/><br/>처 ";
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="회사명";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	td.style.width=248+"px";
	var ipt=cf.mkTag("input",td);
	ipt.id="companyname";
	ipt.style.width="95%";
	ipt.readOnly=true;
	ipt.value=com.company_name;
	var ipt=cf.mkTag("input",td);
	ipt.id="companyid";
	ipt.name="company_id";
	ipt.type="hidden";
	ipt.value=com.company_id;
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="총계약금";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="매입가";
	
	var th=cf.mkTag("th",tr);
	th.colSpan=2;
	th.style.backgroundColor="#eeeeee";
	th.innerHTML="영업이익";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="어음 : ";
	var span=cf.mkTag("span",td);
	span.id="method_bill";
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="02"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="주소";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=3;
	td.className="pd10";
	td.style.width=248+"px";
	var ipt=cf.mkTag("input",td);
	ipt.id="address";
	ipt.style.width="95%";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="total_contract_price";
	ipt.value=comma(uncomma(com.total_contract_price));
	ipt.readOnly=true;
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	ipt.className="payment_input";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="purchase_price";
	ipt.value=comma(com.purchase_price);
	ipt.readOnly=true;
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	ipt.className="payment_input";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="sum";
	td.style.borderRight="1px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="profit_price";
	ipt.value=comma(com.profit_price);
	ipt.readOnly=true;
	cf.setCss(ipt,{
		width:"147px",
		border:"solid 0px",
		background: "#fffeed",
		fontWeight: 600
	});
	ipt.className="payment_input";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var span=cf.mkTag("span",td);
	span.innerHTML="기타 : ";
	var span=cf.mkTag("span",td);
	span.id="method_etc";
	rec.trav(function(d,i){
		if(d.purchase_pay_code=="03"){
			span.innerHTML+=d.purchase_pay_name+" "+d.purchase_pay_method;
		}
	});
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	th.style.width=68+"px";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.style.width="84px";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_division";
	ipt.size=9;
	ipt.readOnly=true;
	ipt.value=com.customer_division;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="고객<br/>담당자";
	th.style.width=57+"px";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_id";
	ipt.name="customer_id";
	ipt.type="hidden";
	ipt.value=com.customer_id;
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	//ipt.style.width="65px";
	ipt.id="cus_name";
	ipt.readOnly=true;
	ipt.size=6;
	ipt.value=com.customer_name;
	var img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP();
	}
	
	var th=cf.mkTag("th",tr);
	th.style.width=69+"px";
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_tel";
	ipt.style.width="95%";
	ipt.readOnly=true;
	ipt.value=com.customer_tel;
	
	var th=cf.mkTag("th",tr);
	th.style.width=70+"px";
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.value=com.customer_hp;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="E-mail";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="cus_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.value=com.customer_email;
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
	
	var tr=cf.mkTag("tr",tb);
	var th=cf.mkTag("th",tr);
	th.innerHTML="부서";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_division";
	ipt.readOnly=true;
	ipt.size=9;
	ipt.value=com.invoice_division;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="계산서<br/> 담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_id";
	ipt.name="invoice_id";
	ipt.type="hidden";
	ipt.value=com.invoice_id;
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	//ipt.style.width="65px";
	ipt.id="tax_name";
	ipt.size=6;
	ipt.readOnly=true;
	ipt.value=com.invoice_id_name;
	var img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		searchRESP(true);
	};
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="TEL";
	
	var td=cf.mkTag("td",tr);
	td.style.textAlign="center";
	td.colSpan=2;
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_tel";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.value=com.invoice_tel;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="HP";
	
	var td=cf.mkTag("td",tr);
	td.colSpan=2;
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_mobile";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.value=com.invoice_hp;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="E-mail";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var ipt=cf.mkTag("input",td);
	ipt.id="tax_email";
	ipt.readOnly=true;
	ipt.style.width="95%";
	ipt.value=com.invoice_email;
	ipt.onblur=function(e){
		chk_email(e.target,this);
	};
};
