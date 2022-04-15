var prev_pop,dsTb_ar=[],dsTb_ar2=[],etcTb_ar=[],etcTb_ar2=[],alcTb_ar=[],alcTb_ar2=[],
	pop_main,pop_dsrecord,pop_record,pop_buy,pop_sales,prev_ds,prev_alc,prev_sde,prev_sales,prev_pur,pop_dsdata;

function closePage(){
	opener.prev_salespop01.pop="";
};
function callSalesPopList(){
	var op={sales_confer_id :opener.prev_salespop01.sales_confer_id};
	callProductSalesViewData(op, function(data){
		pop_main=data.productList;
		pop_dsrecord=data.dsRecordList;
		pop_alcrecord=data.alcRecordList;
		pop_record=data.recordList;
		pop_buy=data.invoiceBuyList;
		pop_sales=data.invoiceSaleList;
		pop_com=data.productList;
		pop_main=pop_main[0];
	});
	callSalesPopDataSet();
};
function callSalesPopDataSet(){
	prev_pop.ds_sales_confer_id=pop_main.sales_confer_id;
	prev_pop.etc_sales_confer_id=pop_main.sales_confer_id;
	
	var ar=[];
	if(pop_dsrecord&&pop_dsrecord.length>0){
		pop_dsrecord.trav(function(d,i){
			if(!d.portfolio)d.portfolio="";
			if(!d.portfolio_item_name)d.portfolio_item_name="";
			if(!d.trigram) d.trigram="";
			if(!d.prd_type) d.prd_type="";
			if(!d.prd_number) d.prd_number="";
			if(!d.plc) d.plc="";
			if(!d.alc) d.alc="";
			if(!d.etc) d.etc="";
			if(!d.ds_list_price) d.ds_list_price="";
			if(!d.ds_qty) d.ds_qty="";
			if(!d.each_yn) d.each_yn="";
			if(!d.sales_alc_dc) d.sales_alc_dc="";
			if(!d.sales_plc_dc) d.sales_plc_dc="";
			if(!d.sales_alc_dc_price) d.sales_alc_dc_price="";
			if(!d.sales_plc_dc_price) d.sales_plc_dc_price="";
			if(!d.sales_alc_dc_gb) d.sales_alc_dc_gb="";
			if(!d.sales_plc_dc_gb) d.sales_plc_dc_gb="";
			if(!d.ds_sales_price) d.ds_sales_price="";
			if(!d.last_sales_price) d.last_sales_price="";	
			if(!d.purchase_plc_dc) d.purchase_plc_dc="";
			if(!d.purchase_alc_dc) d.purchase_alc_dc="";
			if(!d.purchase_plc_dc_price) d.purchase_plc_dc_price="";
			if(!d.purchase_alc_dc_price) d.purchase_alc_dc_price="";
			if(!d.purchase_plc_dc_gb) d.purchase_plc_dc_gb="";
			if(!d.purchase_alc_dc_gb) d.purchase_alc_dc_gb="";
			if(!d.ds_purchase_unit_price) d.ds_purchase_unit_price="";
			if(!d.ds_purchase_price) d.ds_purchase_price="";
			if(!d.last_purchase_price) d.last_purchase_price="";
			if(!d.ds_po_day) d.ds_po_day="";
			if(!d.install_day) d.install_day="";
			if(!d.ordering_day) d.ordering_day="";
			if(!d.license_start_date) d.license_start_date="";
			if(!d.license_end_date) d.license_end_date="";
			if(!d.qlc) d.qlc="";
			if(!d.ylc) d.ylc="";
			if(!d.sales_confer_id) d.sales_confer_id="";
			if(!d.sales_record_ds_id) d.sales_record_ds_id="";
			if(!d.price_list_date) d.price_list_date="";
			if(!d.target_id) d.target_id="";
			if(!d.place_of_business) d.place_of_business="";
			if(!d.price_list_date)d.price_list_date="";
			if(!d.chang_yn)d.chang_yn="";
			if(!d.prd_revision)d.prd_revision="";
			ar.push([d.portfolio,d.trigram,d.prd_type,d.prd_number,d.plc,d.alc,d.etc,d.ds_list_price,d.ds_qty,d.each_yn,d.sales_plc_dc,d.sales_alc_dc,d.sales_plc_dc_price,d.sales_alc_dc_price,//14
			         d.ds_sales_price,d.purchase_plc_dc,d.purchase_alc_dc,d.purchase_plc_dc_price,d.purchase_alc_dc_price,d.ds_purchase_unit_price,d.ds_purchase_price,//21
			         d.ds_po_day,d.install_day,d.ordering_day,d.license_start_date,d.license_end_date,d.qlc,d.ylc,d.target_id,d.place_of_business,d.sales_record_ds_id,d.price_list_date,d.chang_yn,
			         d.sales_plc_dc_gb,d.sales_alc_dc_gb,d.purchase_plc_dc_gb,d.purchase_alc_dc_gb,d.portfolio_item_name,d.prd_revision]);
		});	
	}
	q.reg("dsrecordtb01",{
		arr:ar,
		header:["portfolio","trigram","prd_type","prd_number","plc","alc","etc","ds_list_price","ds_qty","each_yn","sales_plc_dc","sales_alc_dc","sales_plc_dc_price","sales_alc_dc_price",//14
		        "sales_price","purchase_plc_dc","purchase_alc_dc","purchase_plc_dc_price","purchase_alc_dc_price","ds_purchase_unit_price","ds_purchase_price",//21
		        "ds_po_day","install_day","ordering_day","license_start_date","license_end_date","qlc","ylc","target_id","place_of_business","sales_record_ds_id","price_list_date","chang_yn",
		        "sales_plc_dc_gb","sales_alc_dc_gb","purchase_plc_dc_gb","purchase_alc_dc_gb","portfolio_item_name","prd_revision"],
		meta:["string","string","string","string","number","number","string","number","number","number","number","number","number","number","number","number","number","number","number",
		      "number","number","number","string","string","string","string","string","number","number","string","string","number","string","number","number","number","number","string","string"]
	});
	var ar2=[];
	if(pop_alcrecord&&pop_alcrecord.length>0){
		pop_alcrecord.trav(function(d,i){
			if(!d.portfolio)d.portfolio="";
			if(!d.portfolio_item_name)d.portfolio_item_name="";
			if(!d.trigram) d.trigram="";
			if(!d.prd_type) d.prd_type="";
			if(!d.prd_number) d.prd_number="";
			if(!d.plc) d.plc="";
			if(!d.alc) d.alc="";
			if(!d.etc) d.etc="";
			if(!d.ds_list_price) d.ds_list_price="";
			if(!d.ds_qty) d.ds_qty="";
			if(!d.each_yn) d.each_yn="";
			if(!d.sales_alc_dc) d.sales_alc_dc="";
			if(!d.sales_plc_dc) d.sales_plc_dc="";
			if(!d.sales_alc_dc_price) d.sales_alc_dc_price="";
			if(!d.sales_plc_dc_price) d.sales_plc_dc_price="";
			if(!d.sales_alc_dc_gb) d.sales_alc_dc_gb="";
			if(!d.sales_plc_dc_gb) d.sales_plc_dc_gb="";
			if(!d.ds_sales_price) d.ds_sales_price="";	
			if(!d.last_sales_price) d.last_sales_price="";	
			if(!d.purchase_plc_dc) d.purchase_plc_dc="";
			if(!d.purchase_alc_dc) d.purchase_alc_dc="";
			if(!d.purchase_plc_dc_price) d.purchase_plc_dc_price="";
			if(!d.purchase_alc_dc_price) d.purchase_alc_dc_price="";
			if(!d.purchase_plc_dc_gb) d.purchase_plc_dc_gb="";
			if(!d.purchase_alc_dc_gb) d.purchase_alc_dc_gb="";
			if(!d.ds_purchase_unit_price) d.ds_purchase_unit_price="";
			if(!d.ds_purchase_price) d.ds_purchase_price="";
			if(!d.last_purchase_price) d.last_purchase_price="";
			if(!d.ds_po_day) d.ds_po_day="";
			if(!d.install_day) d.install_day="";
			if(!d.ordering_day) d.ordering_day="";
			if(!d.license_start_date) d.license_start_date="";
			if(!d.license_end_date) d.license_end_date="";
			if(!d.qlc) d.qlc="";
			if(!d.ylc) d.ylc="";
			if(!d.sales_confer_id) d.sales_confer_id="";
			if(!d.sales_record_ds_id) d.sales_record_ds_id="";
			if(!d.price_list_date) d.price_list_date="";
			if(!d.target_id) d.target_id="";
			if(!d.place_of_business) d.place_of_business="";
			if(!d.price_list_date)d.price_list_date="";
			if(!d.chang_yn)d.chang_yn="";
			if(!d.prd_revision)d.prd_revision="";
			ar2.push([d.portfolio,d.trigram,d.prd_type,d.prd_number,d.plc,d.alc,d.etc,d.ds_list_price,d.ds_qty,d.each_yn,d.sales_plc_dc,d.sales_alc_dc,d.sales_plc_dc_price,d.sales_alc_dc_price,//14
			          d.ds_sales_price,d.purchase_plc_dc,d.purchase_alc_dc,d.purchase_plc_dc_price,d.purchase_alc_dc_price,d.ds_purchase_unit_price,d.ds_purchase_price,//21
			          d.ds_po_day,d.install_day,d.ordering_day,d.license_start_date,d.license_end_date,d.qlc,d.ylc,d.target_id,d.place_of_business,d.sales_record_ds_id,d.price_list_date,d.chang_yn,
			          d.sales_plc_dc_gb,d.sales_alc_dc_gb,d.purchase_plc_dc_gb,d.purchase_alc_dc_gb,"","","",d.portfolio_item_name,d.prd_revision]);
		});	
	}
	q.reg("dsrecordtb02",{
		arr:ar2,
		header:["portfolio","trigram","prd_type","prd_number","plc","alc","etc","ds_list_price","ds_qty","each_yn","sales_plc_dc","sales_alc_dc","sales_plc_dc_price","sales_alc_dc_price",//14
		        "sales_price","purchase_plc_dc","purchase_alc_dc","purchase_plc_dc_price","purchase_alc_dc_price","ds_purchase_unit_price","ds_purchase_price",//21
		        "ds_po_day","install_day","ordering_day","license_start_date","license_end_date","qlc","ylc","target_id","place_of_business","sales_record_ds_id","price_list_date","chang_yn",
		        "sales_plc_dc_gb","sales_alc_dc_gb","purchase_plc_dc_gb","purchase_alc_dc_gb","alc_year","company_id","stock_yn","portfolio_item_name","prd_revision"],
		meta:["string","string","string","string","number","number","string","number","number","number","number","number","number","number","number","number","number","number","number",
		      "number","number","number","string","string","string","string","string","number","number","string","string","number","string","number","number","number","number",
		      "string","string","string","string","string"]
	});
	
	var ar3=[];	
	if(pop_record&&pop_record.length>0){
		pop_record.trav(function(d,i){
			if(!d.sales_gb)d.sales_gb="";
			if(!d.model) d.model="";
			if(!d.des_start_day) d.des_start_day="";
			if(!d.des_end_day) d.des_end_day="";
			if(!d.qty) d.qty="";
			if(!d.list_price) d.list_price="";
			if(!d.sales_unit_price) d.sales_unit_price="";
			if(!d.sales_dc) d.sales_dc="";
			if(!d.sales_price) d.sales_price="";
			if(!d.purchase_unit_price) d.purchase_unit_price="";
			if(!d.purchase_price) d.purchase_price="";
			if(!d.purchase_dc) d.purchase_dc="";
			if(!d.purchase_dc) d.sales_price="";			
			if(!d.supplier) d.supplier="";
			if(!d.purchase_pay_code) d.purchase_pay_code="";
			if(!d.purchase_pay_method) d.purchase_pay_method="";
			if(!d.sales_confer_id) d.sales_confer_id="";
			if(!d.sales_record_id) d.sales_record_id="";
			ar3.push([d.sales_gb,d.model,d.des_start_day,d.des_end_day,d.qty,d.list_price,d.sales_unit_price,d.sales_price,d.sales_dc,d.purchase_unit_price,d.purchase_price,d.purchase_dc,
			         d.supplier,d.purchase_pay_code,d.purchase_pay_method,d.sales_confer_id,d.sales_record_id]);
		});	
	}
	q.reg("etcrecordtb01",{
		arr:ar3,
		header:["sales_gb","model","des_start_day","des_end_day","qty","list_price","sales_unit_price","sales_price","sales_dc","purchase_unit_price","purchase_price",
		        "purchase_dc","supplier","purchase_pay_code","purchase_pay_method","sales_confer_id","sales_record_id"],
		meta:["string","string","string","string","number","number","number","number","number","number","number","number","string","string","string","string","string"]
	});
};
function callProductSalesKindGb(){
	var op={contract_number_id :document.getElementById("pjcode_id").value,
			sales_confer_kind:document.getElementById("sales_confer_kind").value},
			kind_gb;
	callProductSalesKindGbData(op, function(data){
		kind_gb=data.checkKindGbList;
	});
	return kind_gb[0];
};
//담당자 조회
function searchRESP(opt){
	var com=document.getElementById("companyid").value,
		obj={company_id : com};
	if(!com)generalPopOk2("Project Code를 먼저 선택하세요.");		
	else{
		callSubCustomerAdminData(obj, function (data){
			respPop(data,opt);
		});
	}
};
function dsRecordSave(str,flag,con){
	var dv=document.getElementById("dsTb01"),
		pop_portfolio=document.getElementById("pop_portfolio"),
		pop_portfolio_item_name=document.getElementById("pop_portfolio_item_name"),
		pop_prd_number=document.getElementById("pop_prd_number"),
		pop_trigram=document.getElementById("pop_trigram"),
		pop_prd_type=document.getElementById("pop_prd_type"),
		pop_etc=document.getElementById("pop_etc"),
		pop_plc=document.getElementById("pop_plc"),
		pop_alc=document.getElementById("pop_alc"),
		pop_list_price=document.getElementById("pop_list_price"),
		pop_qty=document.getElementById("pop_qty"),
		pop_dc_yn=document.getElementById("pop_dc_yn"),
		pop_sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
		pop_sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
		pop_sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
		pop_sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
		pop_sales_alc_dc_gb=document.getElementsByName("pop_sales_alc_dc_gb"),
		pop_sales_plc_dc_gb=document.getElementsByName("pop_sales_plc_dc_gb"),
		pop_sales_sum=document.getElementById("pop_sales_sum"),
		pop_plc_dc=document.getElementById("pop_plc_dc"),
		pop_alc_dc=document.getElementById("pop_alc_dc"),
		pop_plc_dc_price=document.getElementById("pop_plc_dc_price"),
		pop_alc_dc_price=document.getElementById("pop_alc_dc_price"),
		pop_purchase_alc_dc_gb=document.getElementsByName("pop_purchase_alc_dc_gb"),
		pop_purchase_plc_dc_gb=document.getElementsByName("pop_purchase_plc_dc_gb"),
		pop_unit_price=document.getElementById("pop_unit_price"),
		pop_pur_sum=document.getElementById("pop_pur_sum"),
		pop_ds_po_day=document.getElementById("pop_ds_po_day"),
		pop_install_day=document.getElementById("pop_install_day"),
		pop_ordering_day=document.getElementById("pop_ordering_day"), // 발주
		pop_license_start_date=document.getElementById("pop_license_start_date"),
		pop_license_end_date=document.getElementById("pop_license_end_date"),
		pop_in_target_id=document.getElementById("pop_in_target_id"),
		pop_in_place_of_business=document.getElementById("pop_in_place_of_business"),
		pop_sales_record_ds_id=document.getElementById("pop_sales_record_ds_id"),
		pop_in_price_list_date=document.getElementById("pop_in_price_list_date"),
		pop_qlc=document.getElementById("pop_qlc"),
		pop_ylc=document.getElementById("pop_ylc"),
		pop_prd_revision=document.getElementById("pop_prd_revision"),
		sales_plc_dc_gb,sales_alc_dc_gb,purchase_plc_dc_gb,purchase_alc_dc_gb;
	
		pop_sales_plc_dc_gb.trav(function(d,i){
			if(d.checked)sales_plc_dc_gb=d.value;
		});
		pop_sales_alc_dc_gb.trav(function(d,i){
			if(d.checked)sales_alc_dc_gb=d.value;
		});
		pop_purchase_plc_dc_gb.trav(function(d,i){
			if(d.checked)purchase_plc_dc_gb=d.value;
		});
		pop_purchase_alc_dc_gb.trav(function(d,i){
			if(d.checked)purchase_alc_dc_gb=d.value;
		});
	
		var ar1=[pop_portfolio.value,pop_trigram.value,uncomma(pop_plc.value),uncomma(pop_alc.value),pop_qty.value,uncomma(pop_sales_sum.value),pop_plc_dc.value,pop_alc_dc.value,
		         uncomma(pop_plc_dc_price.value),uncomma(pop_alc_dc_price.value),uncomma(pop_unit_price.value),uncomma(pop_pur_sum.value),pop_in_target_id.value,
		         pop_in_place_of_business.value,pop_sales_record_ds_id.value],
	        ar2=[pop_portfolio.value,pop_trigram.value,pop_prd_type.value,pop_prd_number.value,uncomma(pop_plc.value),uncomma(pop_alc.value),pop_etc.value,
	             uncomma(pop_list_price.value),pop_qty.value,pop_dc_yn.value,pop_sales_plc_dc.value,pop_sales_alc_dc.value,uncomma(pop_sales_plc_dc_price.value),
	             uncomma(pop_sales_alc_dc_price.value),uncomma(pop_sales_sum.value),pop_plc_dc.value,pop_alc_dc.value,uncomma(pop_plc_dc_price.value),uncomma(pop_alc_dc_price.value),
	             uncomma(pop_unit_price.value),uncomma(pop_pur_sum.value),
	             saveDate(pop_ds_po_day.value),saveDate(pop_install_day.value),saveDate(pop_ordering_day.value),saveDate(pop_license_start_date.value),saveDate(pop_license_end_date.value),
	             uncomma(pop_qlc.value),uncomma(pop_ylc.value),pop_in_target_id.value,pop_in_place_of_business.value,pop_sales_record_ds_id.value,pop_in_price_list_date.value,0,
	             sales_plc_dc_gb,sales_alc_dc_gb,purchase_plc_dc_gb,purchase_alc_dc_gb,pop_portfolio_item_name.value,pop_prd_revision.value];
	
	if(!pop_portfolio.value)generalPopOk2("Portfolio을 입력하세요.",function(){return;});
	else if(!pop_trigram.value)generalPopOk2("Trigram을 입력하세요.",function(){return;});
	else if(!pop_plc.value&&!pop_alc.value)generalPopOk2("PLC/ALC 중 하나의 값은 있어야합니다.",function(){return;});
	else if(!pop_qty.value)generalPopOk2("수량을 입력하세요.",function(){return;});
	else if(!pop_sales_alc_dc.value)generalPopOk2("매출 ALC DC Rate를 입력하세요.",function(){return;});
	else if(!pop_ds_po_day.value)generalPopOk2("DS Po날짜를 선택하세요.",function(){return;});
	else if(!pop_install_day.value)generalPopOk2("설치 시작를 선택하세요.",function(){return;});
	else if(!pop_ordering_day.value)generalPopOk2("발주일자를 선택하세요.",function(){return;});	//발주
	else if(!pop_license_start_date.value)generalPopOk2("License 시작일자를 선택하세요.",function(){return;});	
	else if(!pop_license_end_date.value)generalPopOk2("License 종료일자를 선택하세요.",function(){return;});	
	else{
		if(flag=="add"){
			dsTb_ar.push(ar1);
			dsTb_ar2.push(ar2);
			addDsSalesDetailTable2(dv,"new",dsTb_ar);
		}else{
			dsTb_ar[prev_ds.idx]=ar1;
			dsTb_ar2[prev_ds.idx]=ar2;
			addDsSalesDetailTable2(dv,flag,dsTb_ar);
		}
		sumPrice();
		
		var a=document.getElementById("ds_salesDetail_contents").offsetHeight,
			tabdv=document.getElementById("dsTb01");		
		prev_pop.dsTemp=$("#ds_salesDetail_contents").find("select, input").serializeArray();		
		cf.setCss(tabdv,{height:a+50+"px"});		
		cf.killTag(con.parentNode);
	}	
};
function alcRecordSave(str,flag,con){
	var dv=document.getElementById("dsTb03"),
		pop_portfolio=document.getElementById("pop_portfolio"),
		pop_portfolio_item_name=document.getElementById("pop_portfolio_item_name"),
		pop_prd_number=document.getElementById("pop_prd_number"),
		pop_trigram=document.getElementById("pop_trigram"),
		pop_prd_type=document.getElementById("pop_prd_type"),
		pop_etc=document.getElementById("pop_etc"),
		pop_plc=document.getElementById("pop_plc"),
		pop_alc=document.getElementById("pop_alc"),
		pop_list_price=document.getElementById("pop_list_price"),
		pop_qty=document.getElementById("pop_qty"),
		pop_dc_yn=document.getElementById("pop_dc_yn"),
		pop_sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
		pop_sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
		pop_sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
		pop_sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
		pop_sales_alc_dc_gb=document.getElementsByName("pop_sales_alc_dc_gb"),
		pop_sales_plc_dc_gb=document.getElementsByName("pop_sales_plc_dc_gb"),
		pop_sales_sum=document.getElementById("pop_sales_sum"),
		pop_plc_dc=document.getElementById("pop_plc_dc"),
		pop_alc_dc=document.getElementById("pop_alc_dc"),
		pop_plc_dc_price=document.getElementById("pop_plc_dc_price"),
		pop_alc_dc_price=document.getElementById("pop_alc_dc_price"),
		pop_purchase_alc_dc_gb=document.getElementsByName("pop_purchase_alc_dc_gb"),
		pop_purchase_plc_dc_gb=document.getElementsByName("pop_purchase_plc_dc_gb"),
		pop_unit_price=document.getElementById("pop_unit_price"),
		pop_pur_sum=document.getElementById("pop_pur_sum"),
		pop_ds_po_day=document.getElementById("pop_ds_po_day"),
		pop_install_day=document.getElementById("pop_install_day"),
		pop_ordering_day=document.getElementById("pop_ordering_day"), // 발주
		pop_license_start_date=document.getElementById("pop_license_start_date"),
		pop_license_end_date=document.getElementById("pop_license_end_date"),
		pop_in_target_id=document.getElementById("pop_in_target_id"),
		pop_in_place_of_business=document.getElementById("pop_in_place_of_business"),
		pop_sales_record_ds_id=document.getElementById("pop_sales_record_ds_id"),
		pop_in_price_list_date=document.getElementById("pop_in_price_list_date"),
		pop_alc_year=document.getElementById("pop_alc_year"),
		pop_company_id=document.getElementById("pop_company_id"),
		pop_stock_yn=document.getElementById("pop_stock_yn"),
		pop_qlc=document.getElementById("pop_qlc"),
		pop_ylc=document.getElementById("pop_ylc"),
		pop_prd_revision=document.getElementById("pop_prd_revision"),
		sales_plc_dc_gb,sales_alc_dc_gb,purchase_plc_dc_gb,purchase_alc_dc_gb;
	
		pop_sales_plc_dc_gb.trav(function(d,i){
			if(d.checked)sales_plc_dc_gb=d.value;
		});
		pop_sales_alc_dc_gb.trav(function(d,i){
			if(d.checked)sales_alc_dc_gb=d.value;
		});
		pop_purchase_plc_dc_gb.trav(function(d,i){
			if(d.checked)purchase_plc_dc_gb=d.value;
		});
		pop_purchase_alc_dc_gb.trav(function(d,i){
			if(d.checked)purchase_alc_dc_gb=d.value;
		});
	
		var ar1=[pop_portfolio.value,pop_trigram.value,uncomma(pop_plc.value),uncomma(pop_alc.value),pop_qty.value,uncomma(pop_sales_sum.value),pop_plc_dc.value,pop_alc_dc.value,
		         uncomma(pop_plc_dc_price.value),uncomma(pop_alc_dc_price.value),uncomma(pop_unit_price.value),uncomma(pop_pur_sum.value),pop_in_target_id.value,
		         pop_in_place_of_business.value,pop_sales_record_ds_id.value],
	         ar2=[pop_portfolio.value,pop_trigram.value,pop_prd_type.value,pop_prd_number.value,uncomma(pop_plc.value),uncomma(pop_alc.value),pop_etc.value,
	             uncomma(pop_list_price.value),pop_qty.value,pop_dc_yn.value,pop_sales_plc_dc.value,pop_sales_alc_dc.value,uncomma(pop_sales_plc_dc_price.value),
	             uncomma(pop_sales_alc_dc_price.value),uncomma(pop_sales_sum.value),pop_plc_dc.value,pop_alc_dc.value,uncomma(pop_plc_dc_price.value),uncomma(pop_alc_dc_price.value),
	             uncomma(pop_unit_price.value),uncomma(pop_pur_sum.value),
	             saveDate(pop_ds_po_day.value),saveDate(pop_install_day.value),saveDate(pop_ordering_day.value),saveDate(pop_license_start_date.value),saveDate(pop_license_end_date.value),
	             uncomma(pop_qlc.value),uncomma(pop_ylc.value),pop_in_target_id.value,pop_in_place_of_business.value,pop_sales_record_ds_id.value,pop_in_price_list_date.value,0,
	             sales_plc_dc_gb,sales_alc_dc_gb,purchase_plc_dc_gb,purchase_alc_dc_gb,pop_alc_year.value,pop_company_id.value,"",pop_portfolio_item_name.value,pop_prd_revision.value];
	
	if(!pop_portfolio.value)generalPopOk2("Portfolio을 입력하세요.",function(){return;});
	else if(!pop_trigram.value)generalPopOk2("Trigram을 입력하세요.",function(){return;});
	else if(!pop_plc.value&&!pop_alc.value)generalPopOk2("PLC/ALC 중 하나의 값은 있어야합니다.",function(){return;});
	else if(!pop_qty.value)generalPopOk2("수량을 입력하세요.",function(){return;});
	else if(!pop_sales_plc_dc_price.value)generalPopOk2("매출 PLC DC Price 값이 필요합니다.",function(){return;});
	else if(!pop_sales_alc_dc_price.value)generalPopOk2("매출 ALC DC Price 값이 필요합니다.",function(){return;});
	else if(!pop_plc_dc_price.value)generalPopOk2("매입 PLC DC Price 값이 필요합니다.",function(){return;});
	else if(!pop_alc_dc_price.value)generalPopOk2("매입 ALC DC Price 값이 필요합니다.",function(){return;});
	else if(!pop_ds_po_day.value)generalPopOk2("DS Po날짜를 선택하세요.",function(){return;});
	else if(!pop_ds_po_day.value)generalPopOk2("DS Po날짜를 선택하세요.",function(){return;});
	else if(!pop_install_day.value)generalPopOk2("설치 시작를 선택하세요.",function(){return;});
	else if(!pop_ordering_day.value)generalPopOk2("발주일자를 선택하세요.",function(){return;});	//발주
	else if(!pop_license_start_date.value)generalPopOk2("License 시작일자를 선택하세요.",function(){return;});	
	else if(!pop_license_end_date.value)generalPopOk2("License 종료일자를 선택하세요.",function(){return;});	
	else{
		if(flag=="add"){
			alcTb_ar.push(ar1);
			alcTb_ar2.push(ar2);
			addAlcSalesDetailTable2(dv,flag,alcTb_ar);
		}else{
			alcTb_ar[prev_alc.idx]=ar1;
			alcTb_ar2[prev_alc.idx]=ar2;
			addAlcSalesDetailTable2(dv,flag,alcTb_ar);
		}
		sumPrice();
		
		var a=document.getElementById("alc_salesDetail_contents").offsetHeight,
			tabdv=document.getElementById("dsTb03");
		prev_pop.alcTemp=$("#alc_salesDetail_contents").find("select, input").serializeArray();
		cf.setCss(tabdv,{height:a+50+"px"});
		cf.killTag(con.parentNode);
	}	
};
function etcRecordSave(str,flag,con){
	var dv=document.getElementById("dsTb02"),
		pop_in_sales_gb=document.getElementById("pop_in_sales_gb"),
		pop_in_model=document.getElementById("pop_in_model"),
		pop_in_des_start_day=document.getElementById("pop_in_des_start_day"),
		pop_in_des_end_day=document.getElementById("pop_in_des_end_day"),
		pop_in_qty=document.getElementById("pop_in_qty"),
		pop_in_list_price=document.getElementById("pop_in_list_price"),
		pop_in_sales_unit_price=document.getElementById("pop_in_sales_unit_price"),
		pop_in_sales_price=document.getElementById("pop_in_sales_price"),
		pop_in_sales_dc=document.getElementById("pop_in_sales_dc"),
		pop_in_purchase_unit_price=document.getElementById("pop_in_purchase_unit_price"),
		pop_in_purchase_price=document.getElementById("pop_in_purchase_price"),
		pop_in_purchase_dc=document.getElementById("pop_in_purchase_dc"),
		pop_in_supplier=document.getElementById("pop_in_supplier"),
		pop_in_purchase_pay_code=document.getElementById("pop_in_purchase_pay_code"),
		pop_in_purchase_pay_method=document.getElementById("pop_in_purchase_pay_method"),
		pop_sales_record_id=document.getElementById("pop_sales_record_id"),
		ar1=[pop_in_sales_gb.value,pop_in_model.value,saveDate(pop_in_des_start_day.value),saveDate(pop_in_des_end_day.value),pop_in_qty.value,uncomma(pop_in_list_price.value),
		     uncomma(pop_in_sales_unit_price.value),uncomma(pop_in_purchase_unit_price.value),pop_in_purchase_dc.value,pop_in_supplier.value,pop_in_purchase_pay_code.value,
		     pop_in_purchase_pay_method.value,pop_sales_record_id.value],
		ar2=[pop_in_sales_gb.value,pop_in_model.value,saveDate(pop_in_des_start_day.value),saveDate(pop_in_des_end_day.value),pop_in_qty.value,uncomma(pop_in_list_price.value),
		     uncomma(pop_in_sales_unit_price.value),uncomma(pop_in_sales_price.value),pop_in_sales_dc.value,
		     uncomma(pop_in_purchase_unit_price.value),uncomma(pop_in_purchase_price.value),pop_in_purchase_dc.value,pop_in_supplier.value,pop_in_purchase_pay_code.value,
		     pop_in_purchase_pay_method.value,"",pop_sales_record_id.value];
	if(!pop_in_sales_gb.value)generalPopOk2("구분을 선택하세요.",function(){return;});
	else if(!pop_in_model.value)generalPopOk2("모델명을 입력하세요.",function(){return;});
	else if(!pop_in_des_start_day.value)generalPopOk2("시작날짜를 선택하세요.",function(){return;});
	else if(!pop_in_des_end_day.value)generalPopOk2("종료일자를 선택하세요.",function(){return;});
	else if(!pop_in_qty.value||isNumber(pop_in_qty.value)==false)generalPopOk2("수량을 입력하세요.",function(){return;});
	else if(!pop_in_list_price.value||isNumber(uncomma(pop_in_list_price.value))==false)generalPopOk2("List Price를 입력하세요.",function(){return;});
	else if(!pop_in_sales_unit_price.value||isNumber(uncomma(pop_in_sales_unit_price.value))==false)generalPopOk2("매출단가를 입력하세요.",function(){return;});
	else if(!pop_in_purchase_unit_price.value||isNumber(uncomma(pop_in_purchase_unit_price.value))==false)generalPopOk2("매입단가를 입력하세요.",function(){return;});
	else if(!pop_in_purchase_dc.value||isNumber(pop_in_purchase_dc.value)==false)generalPopOk2("매입 D/C를 입력하세요.",function(){return;});
	else if(!pop_in_supplier.value)generalPopOk2("구매처를 입력하세요.",function(){return;});
	else if(!pop_in_purchase_pay_method.value)generalPopOk2("결재조건을 입력하세요.",function(){return;});
	else{
		if(flag=="add"){
			etcTb_ar.push(ar1);
			etcTb_ar2.push(ar2);
			addEtcSalesDetailTable2(dv,flag,etcTb_ar);
		}else{
			etcTb_ar[prev_sde.idx]=ar1;
			etcTb_ar2[prev_sde.idx]=ar2;
			addEtcSalesDetailTable2(dv,flag,etcTb_ar);
		}
		sumPrice();
		sumMethod();
		var a=document.getElementById("etc_salesDetail_contents").offsetHeight,
			tabdv=document.getElementById("dsTb02");
		prev_pop.etcTemp=$("#etc_salesDetail_contents").find("select, input").serializeArray();
		cf.setCss(tabdv,{height:a+50+"px"});
		cf.killTag(con.parentNode);
	}
};
function delDSsalesDetail(){
	var dv=document.getElementById("dsTb01");	
	if(!prev_ds) generalPopOk2("삭제할 DS 매출 및 매입내역을 선택하세요.");
	else{
		generalPop("삭제하시겠습니까?",function(){
			$.ajax({
				url: "/sas/product/productDSSalesRecordDel",
				type: "POST",
				data: {sales_record_ds_id:prev_ds.data[16],chang_yn:"0"},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPopOk("삭제되었습니다.",function(){
						dsTb_ar.splice(prev_ds.idx,1);
						dsTb_ar2.splice(prev_ds.idx,1);
						addDsSalesDetailTable2(dv,"modi",dsTb_ar);						
						sumPrice();						
						prev_pop.dsTemp=$("#ds_salesDetail_contents").find("select, input").serializeArray();
					});
					$('.wrap-loading-pop').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading-pop').show();
				}
			});
		});
	}
};
function delALCsalesDetail(){
	var dv=document.getElementById("dsTb03");
		if(!prev_alc) generalPopOk2("삭제할 변경 매출 및 매입내역을 선택하세요.");
	else{		
		generalPop("삭제하시겠습니까?",function(){
			$.ajax({
				url: "/sas/product/productDSSalesRecordDel",
				type: "POST",
				data: {sales_record_ds_id:prev_alc.data[16],chang_yn:"1"},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPopOk("삭제되었습니다.",function(){
						alcTb_ar.splice(prev_alc.idx,1);
						alcTb_ar2.splice(prev_alc.idx,1);
						addAlcSalesDetailTable2(dv,"modi",alcTb_ar);
						sumPrice();
						prev_pop.alcTemp=$("#alc_salesDetail_contents").find("select, input").serializeArray();
					});
					$('.wrap-loading-pop').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading-pop').show();
				}
			});
		});
	}
};
function delETCsalesDetail(){
	var dv=document.getElementById("dsTb02");
		if(!prev_sde) generalPopOk2("삭제할 변경 매출 및 매입내역을 선택하세요.");
	else{		
		generalPop("삭제하시겠습니까?",function(){
			$.ajax({
				url: "/sas/product/productSalesRecordDel",
				type: "POST",
				data: {sales_record_id:prev_sde.data[12]},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPopOk("삭제되었습니다.",function(){
						etcTb_ar.splice(prev_sde.idx,1);
						etcTb_ar2.splice(prev_sde.idx,1);
						addEtcSalesDetailTable2(dv,"modi",etcTb_ar);
						sumPrice();
						sumMethod();
						prev_pop.etcTemp=$("#etc_salesDetail_contents").find("select, input").serializeArray();
					});
					$('.wrap-loading-pop').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading-pop').show();
				}
			});
		});
	}
};
function addsalesDetail(){
	var tbd=document.getElementById("salesDetail_contents"),	
		tr=cf.mkTag("tr",tbd);
	tr.idx=tbd.children.length-1;
	tr.onclick=function(){
		if(prev_sde==null){
			this.style.backgroundColor="#edfafb";
		}else{
			prev_sde.style.backgroundColor="white";
			this.style.backgroundColor="#edfafb";
		}
		prev_sde=this;
	};
	
	var td=cf.mkTag("td",tr);
	td.style.borderLeft=1+"px solid #e3e3e3";
	td.style.width="20px";
	var span_idx=cf.mkTag("span",td);
	
	var td=cf.mkTag("td",tr);
	var select=cf.mkTag("select",td);
	select.style.width=95+"px";
	select.name="in_sales_gb";
	mkSelect(select, BRANDLIST);
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width="95%";
	ipt.name="in_model";
	
	var td=cf.mkTag("td",tr);
	var ipt_s=cf.mkTag("input",td);
	ipt_s.style.width="42%";
	ipt_s.name="in_des_start_day";
	ipt_s.className="input_date";
	ipt_s.readOnly=true;
	var span=cf.mkTag("span",td);
	span.innerHTML=" ~ ";
	var ipt_e=cf.mkTag("input",td);
	ipt_e.style.width="42%";
	ipt_e.name="in_des_end_day";
	ipt_e.className="input_date";
	ipt_e.readOnly=true;
	
	ipt_s.onchange=function(){
		dateCheck(ipt_s,ipt_e,"S");
	};
	ipt_e.onchange=function(){
		dateCheck(ipt_s,ipt_e,"E");
	};
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	ipt.style.width="85%";
	ipt.name="in_qty";
	ipt.onkeyup=function(e){
		checkChar(e,this);
		//sumPrice_ETC();
		//sumSales_ETC();
	};
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.className="payment_input";
	ipt.name="in_list_price";
	ipt.onkeyup=function(e){
		this.value=comma(uncomma(e.target.value));
		checkChar(e,this);
	};
	paymentSet(ipt);
		
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.className="payment_input";
	ipt.name="in_sales_unit_price";
	ipt.onkeyup=function(e){
		this.value=comma(uncomma(e.target.value));
		checkChar(e,this);
		//sumPrice_ETC();
		//sumSales_ETC();
	};
	paymentSet(ipt);
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.className="payment_input";
	ipt.name="in_sales_price";
	ipt.readOnly=true;
	ipt.placeholder=0;
		
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.style.textAlign="right";
	ipt.readOnly=true;
	ipt.name="in_sales_dc";
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.className="payment_input";
	ipt.style.width="85%";
	ipt.name="in_purchase_unit_price";
	ipt.onkeyup=function(e){
		this.value=comma(uncomma(e.target.value));
		checkChar(e,this);
		//sumPrice_ETC();
		//sumSales_ETC();
	};
	paymentSet(ipt);
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.className="payment_input";
	ipt.style.width="85%";
	ipt.readOnly=true;
	ipt.name="in_purchase_price";
	ipt.placeholder=0;
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="right";
	ipt.style.width="85%";
	ipt.name="in_purchase_dc";
	ipt.onkeypress=function(e){
		checkChar(e,this);
	};
	
	var td=cf.mkTag("td",tr),
		ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.name="in_supplier";
	
	var td=cf.mkTag("td",tr),
		select=cf.mkTag("select",td),
		ipt=cf.mkTag("input",td);
	select.style.width=60+"px";
	select.name="in_purchase_pay_code";
	mkSelect(select,PAYLIST);
	select.onchange=payMethod;
	ipt.name="in_purchase_pay_method";
	ipt.onblur=payMethod;
	cf.setCss(ipt,{width:50+"%",marginLeft:5+"px"});
	
	span_idx.innerHTML=idxReturn(tbd,tr)+1;
	//idxList(tbd,tr);
	datePicker("input_date", "yy-mm-dd");
};
function delsalesDetail(){
	if(!prev_sde) generalPopOk2("삭제할 매출 및 매입내역을 선택하세요.");
	else{
		var tbd=document.getElementById("alc_salesDetail_contents");
		/* if(prev_sde.obj){
			$.ajax({
				url: "/sas/product/productSalesRecordDel",
				type: "POST",
				data:{
					"sales_record_id"	: prev_sde.obj.sales_record_id
				},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
				}
			});
		} */
		idxList(tbd,prev_sde);
		//sumPrice_ETC();
		sumPrice();
	}
};
function addSales(){
	var tbd=document.getElementById("sales_contents");
	
	var tr=cf.mkTag("tr",tbd);
	tr.idx=tbd.children.length-1;
	tr.onclick=function(){
		if(prev_sales==null){
			this.style.backgroundColor="#edfafb";
		}else{
			prev_sales.style.backgroundColor="white";
			this.style.backgroundColor="#edfafb";
		}
		prev_sales=this;
	};
	
	var td=cf.mkTag("td",tr);
	td.style.borderLeft=1+"px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.name="in_split";
	ipt.readOnly=true;
	mkHidden("","in_invoice_id",td);
	cf.setCss(ipt,{textAlign:"center",width:85+"%"});
	
	splitAutoCount(tbd, ipt.name, "/"); //분할 자동계산

	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=85+"%";
	ipt.name="in_issued";
	ipt.className="input_date";
	ipt.readOnly=true;
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=95+"%";
	ipt.name="in_invoice_name";
	
	var td=cf.mkTag("td",tr);
	var select=cf.mkTag("select",td);
	select.style.width=100+"px";
	select.name="in_method";
	mkSelect(select,METHODLIST,"02");
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=85+"%";
	ipt.className="payment_input";
	ipt.name="in_price";
	ipt.onkeyup=function(e){
		this.value=comma(uncomma(e.target.value));
		checkChar(e,this);
	};
	paymentSet(ipt);
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=95+"%";
	ipt.name="in_payment_requisite_content";
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=95+"%";
	ipt.name="in_contract_number";
	ipt.readOnly=true;
	var pjcode=document.getElementById("pjcode").value;
	ipt.value=pjcode;
	
	datePicker("input_date", "yy-mm-dd");
};
function delSales(){
	if(!prev_sales) generalPopOk2("삭제할 매출세금계산서를 선택하세요.");
	else{
		var tbd=document.getElementById("sales_contents");
		if(prev_sales.obj){
			generalPop("삭제하시겠습니까?",function(){
				$.ajax({
					url: "/sas/product/productSalesInvoiceDel",
					type: "POST",
					data:{"invoice_id": prev_sales.obj.invoice_id},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("삭제되었습니다.");
						tbd.childNodes.trav(function(d,i){
							if(d==prev_sales) cf.killTag(d);
						});
						tbd.style.backgroundColor="white";
						prev_sales = null;
						splitAutoCount(tbd, "in_split", "/"); //분할 자동계산
					}
				});
			});
		}else{
			tbd.childNodes.trav(function(d,i){
				if(d==prev_sales) cf.killTag(d);
			});
			tbd.style.backgroundColor="white";
			prev_sales = null;
			splitAutoCount(tbd, "in_split", "/");
		}		
	}
};
function addPurchase(){
	var tbd=document.getElementById("purchase_contents"),	
		tr=cf.mkTag("tr",tbd);
	tr.idx=tbd.children.length-1;
	tr.onclick=function(){
		if(prev_pur==null){
			this.style.backgroundColor="#edfafb";
		}else{
			prev_pur.style.backgroundColor="white";
			this.style.backgroundColor="#edfafb";
		}
		prev_pur=this;
	};
	
	var td=cf.mkTag("td",tr);
	td.style.borderLeft=1+"px solid #e3e3e3";
	var ipt=cf.mkTag("input",td);
	ipt.style.textAlign="center";
	ipt.style.width=85+"%";
	ipt.name="in_buy_split";
	ipt.readOnly=true;
	mkHidden("","in_buy_invoice_id",td);
	
	splitAutoCount(tbd, ipt.name, "/"); //분할 자동계산
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=85+"%";
	ipt.name="in_buy_issued";
	ipt.className="input_date";
	ipt.readOnly=true;
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=95+"%";
	ipt.name="in_buy_invoice_name";
	
	var td=cf.mkTag("td",tr);
	var select=cf.mkTag("select",td);
	select.style.width=100+"px";
	select.name="in_buy_method";
	mkSelect(select,METHODLIST,"02");
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width=85+"%";
	ipt.className="payment_input";
	ipt.name="in_buy_price";
	ipt.onkeyup=function(e){
		this.value=comma(uncomma(e.target.value));
		checkChar(e,this);
	};
	paymentSet(ipt);
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width="85%";
	ipt.name="in_buy_payment_requisite_content";
	
	var td=cf.mkTag("td",tr);
	var ipt=cf.mkTag("input",td);
	ipt.style.width="95%";
	ipt.name="in_buy_contract_number";
	ipt.readOnly=true;
	var pjcode=document.getElementById("pjcode").value;
	ipt.value=pjcode;
	
	datePicker("input_date", "yy-mm-dd");
};
function delPurchase(){
	if(!prev_pur) generalPopOk2("삭제할 매입세금계산서를 선택하세요.");
	else{
		var tbd=document.getElementById("purchase_contents");		
		if(prev_pur.obj){
			generalPop("삭제하시겠습니까?",function(){
				$.ajax({
					url: "/sas/product/productSalesInvoiceDel",
					type: "POST",
					data:{"invoice_id": prev_pur.obj.invoice_id},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("삭제되었습니다.");
						tbd.childNodes.trav(function(d,i){
							if(d==prev_pur) cf.killTag(d);
						});
						tbd.style.backgroundColor="white";
						prev_pur = null;
						splitAutoCount(tbd, "in_buy_split", "/"); //분할 자동계산
					}
				});
			});
		}else{
			tbd.childNodes.trav(function(d,i){
				if(d==prev_pur) cf.killTag(d);
			});
			tbd.style.backgroundColor="white";
			prev_pur = null;
			splitAutoCount(tbd, "in_buy_split", "/"); //분할 자동계산
		}
		
		/* if(prev_pur.obj){
			$.ajax({
				url: "/sas/product/productSalesRecordDel",
				type: "POST",
				data:{
					"invoice_id"	: prev_pur.obj.invoice_id
				},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
					cf.killTag(prev_pur);
					prev_pur.style.backgroundColor="white";
				}
			});
		}else{
			cf.killTag(prev_pur);
			prev_pur.style.backgroundColor="white";
		} */
	}
};
function payMethod(){
	var code=document.getElementsByName("in_purchase_pay_code");
	var method=document.getElementsByName("in_purchase_pay_method");
	var method_cash=document.getElementById("method_cash");
	var method_bill=document.getElementById("method_bill");
	var method_etc=document.getElementById("method_etc");
	
	method_cash.innerHTML="";
	method_bill.innerHTML="";
	method_etc.innerHTML="";
	
	code.trav(function(d,i){
		if(d.value=="01"){
			method_cash.innerHTML+="현금"+method[i].value+" ";
			return;
		}else if(d.value=="02"){
			method_bill.innerHTML+="어음"+method[i].value+" ";
			return;
		}else{
			method_etc.innerHTML+="기타"+method[i].value+" ";
			return;
		}
	});
};
function sumMethod(){
	var method_cash=document.getElementById("method_cash"),
		method_bill=document.getElementById("method_bill"),
		method_etc=document.getElementById("method_etc");
	
	method_cash.innerHTML="";
	method_bill.innerHTML="";
	method_etc.innerHTML="";
	
	if(etcTb_ar2&&etcTb_ar2.length>0){
		etcTb_ar2.trav(function(d,i){
			if(d[13]=="01"){
				method_cash.innerHTML+="현금"+d[14]+" ";
				return;
			}else if(d[13]=="02"){
				method_bill.innerHTML+="어음"+d[14]+" ";
				return;
			}else if(d[13]=="03"){
				method_etc.innerHTML+="기타"+d[14]+" ";
				return;
			}
		});
	}
};
function sumPrice(){
	var total_contract=document.getElementsByName("total_contract_price"),
		total_purchase=document.getElementsByName("purchase_price"),
		profit_price=document.getElementsByName("profit_price");
	
	var sales_sum=0;
	var purchase_sum=0;
	
	if(dsTb_ar2&&dsTb_ar2.length>0){
		dsTb_ar2.trav(function(d,i){
			var a1=0,a2=0;
			a1=d[14]*1;
			a2=d[20]*1;
			sales_sum+=a1;
			purchase_sum+=a2;
		});
	}
	if(alcTb_ar2&&alcTb_ar2.length>0){
		alcTb_ar2.trav(function(d,i){
			var a1=0,a2=0;
			a1=d[14]*1;
			a2=d[20]*1;
			sales_sum+=a1;
			purchase_sum+=a2;
		});
	}
	if(etcTb_ar2&&etcTb_ar2.length>0){
		etcTb_ar2.trav(function(d,i){
			sales_sum+=(d[7]*1);
			purchase_sum+=(d[10]*1);
		});
	}
	dir(sales_sum)
		dir(purchase_sum)
	total_contract[0].value=comma(sales_sum);
	total_purchase[0].value=comma(purchase_sum);
	profit_price[0].value=comma(sales_sum-purchase_sum);
};
function sumPrice_chk(){
	var invoice_price=document.getElementsByName("in_price"),
		sales_sum=0,
		purchase_sum=0,
		invoice_sum=0,
		chk=false;
	
	if(dsTb_ar2&&dsTb_ar2.length>0){
		dsTb_ar2.trav(function(d,i){
			var a1=0,a2=0;
			a1=d[14]*1;
			a2=d[20]*1;
			sales_sum+=a1;
			purchase_sum+=a2;
		});
	}
	if(alcTb_ar2&&alcTb_ar2.length>0){
		alcTb_ar2.trav(function(d,i){
			var a1=0,a2=0;
			a1=d[14]*1;
			a2=d[20]*1;
			sales_sum+=a1;
			purchase_sum+=a2;
		});
	}
	if(etcTb_ar2&&etcTb_ar2.length>0){
		etcTb_ar2.trav(function(d,i){
			sales_sum+=(d[7]*1);
			purchase_sum+=(d[10]*1);
		});
	}
	if(invoice_price.length>0){
		invoice_price.trav(function(d,i){
			invoice_sum+=uncomma(d.value)*1;
		});
	}
	if(invoice_sum==sales_sum)chk=true;
	return chk;
};
function defalutEtc(p){
	var col1=cf.mkTag("div",p),
		col2=cf.mkTag("div",p);
	
	etcTb_ar2.trav(function(d,i){
		mkHidden(d[16],"in_sales_record_id",col1);
		mkHidden(d[0],"in_sales_gb",col1);
		mkHidden(d[1],"in_model",col1);
		mkHidden(d[2],"in_des_start_day",col1);
		mkHidden(d[3],"in_des_end_day",col1);
		mkHidden(d[4],"in_qty",col1);
		mkHidden(d[5],"in_list_price",col1);
		mkHidden(d[6],"in_sales_unit_price",col1);
		mkHidden(d[7],"in_sales_price",col1);
		mkHidden(d[8],"in_sales_dc",col1);
		mkHidden(d[9],"in_purchase_unit_price",col1);
		mkHidden(d[10],"in_purchase_price",col1);
		mkHidden(d[11],"in_purchase_dc",col1);
		mkHidden(d[12],"in_supplier",col1);
		mkHidden(d[13],"in_purchase_pay_code",col1);
		mkHidden(d[14],"in_purchase_pay_method",col1);
	});
	alcTb_ar2.trav(function(d,i){
		mkHidden(d[30],"in_alc_sales_record_ds_id",col2);
		mkHidden(d[31],"in_alc_price_list_date",col2);
		mkHidden(d[0],"in_alc_portfolio",col2);
		mkHidden(d[3],"in_alc_prd_number",col2);
		mkHidden(d[2],"in_alc_prd_type",col2);
		mkHidden(d[1],"in_alc_trigram",col2);
		mkHidden(d[4],"in_alc_plc",col2);
		mkHidden(d[5],"in_alc_alc",col2);
		mkHidden(d[6],"in_alc_etc",col2);
		mkHidden(d[7],"in_alc_ds_list_price",col2);
		mkHidden(d[8],"in_alc_ds_qty",col2);
		mkHidden(d[9],"in_alc_each_yn",col2);
		mkHidden(d[10],"in_alc_sales_plc_dc",col2);
		mkHidden(d[11],"in_alc_sales_alc_dc",col2);
		mkHidden(d[12],"in_alc_sales_plc_dc_price",col2);
		mkHidden(d[13],"in_alc_sales_alc_dc_price",col2);
		mkHidden(d[33],"in_alc_sales_plc_dc_gb",col2);
		mkHidden(d[34],"in_alc_sales_alc_dc_gb",col2);
		mkHidden(d[14],"in_alc_ds_sales_price",col2);
		mkHidden(d[15],"in_alc_purchase_plc_dc",col2);
		mkHidden(d[16],"in_alc_purchase_alc_dc",col2);
		mkHidden(d[17],"in_alc_purchase_plc_dc_price",col2);
		mkHidden(d[18],"in_alc_purchase_alc_dc_price",col2);
		mkHidden(d[35],"in_alc_purchase_plc_dc_gb",col2);
		mkHidden(d[36],"in_alc_purchase_alc_dc_gb",col2);
		mkHidden(d[19],"in_alc_ds_purchase_unit_price",col2);
		mkHidden(d[20],"in_alc_ds_purchase_price",col2);
		mkHidden(d[21],"in_alc_ds_po_day",col2);
		mkHidden(d[22],"in_alc_install_day",col2);
		mkHidden(d[23],"in_alc_ordering_day",col2);
		mkHidden(d[24],"in_alc_license_start_date",col2);
		mkHidden(d[25],"in_alc_license_end_date",col2);
		mkHidden(d[26],"in_alc_qlc",col2);
		mkHidden(d[27],"in_alc_ylc",col2);
		mkHidden(d[28],"in_alc_target_id",col2);
		mkHidden(d[29],"in_alc_place_of_business",col2);
		mkHidden(1,"in_alc_chang_yn",col2);
		mkHidden(d[37],"in_alc_year",col2);
		mkHidden(d[38],"in_company_id",col2);
		mkHidden(d[39],"in_stock_yn",col2);
		mkHidden(d[40],"in_alc_portfolio_item_name",col2);
		mkHidden(d[41],"in_alc_prd_revision",col2);
	});
};
//자동완성 기능(Portfolio)
function autocompletePortfolioSearch(){	
	$.widget("custom.mcautocomplete", $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	        this.widget().css({"z-index":"10000","max-width":"850px", "max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"850px", "height":"300px"});
	    },
	    _renderMenu: function (ul, items) {
	        var self = this;
	        if (this.options.showHeader) {
	        	var td = "";
	        	$.each(this.options.columns, function (index, item) {
	            	td += "<td class='pd10' width='"+item.width+"'>" + item.name + "</td>";
	            });
	        	
	            var table = $("<table class='Normal_table_pop ui-widget-header'></table>");
	            table.append("<tr>"+td+"</tr>");
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	    	var td = "";
	    	var style="";
	    	
	    	$.each(this.options.columns, function (index, column) {
	    		if(column.name == "Portfolio"){
	    			style="style='color:green;'";
	    		}else{
	    			style="";
	    		}
	            td += "<td class='pd10' "+style+" width='"+column.width+"'>" + item[column.valueField ? column.valueField : index] + "</td>";
	        });
	    	
	    	return $("<li style='list-style-image:none;padding:0 0 0 0'>")
	    	.data('ui-autocomplete-item', item)
	      	.append("<table class='Normal_table_pop'>"
	      			+"<tr>"+ td +"</tr>"
	      			+"</table>")
	      	.appendTo(ul);
	    }
	});
	
	$("#pop_portfolio").mcautocomplete({
		showHeader: true,
		columns: [{
	        name: 'Portfolio',
	        width: '22%',
	        valueField: 'portfolio'
	    }, {
	        name: 'Prd. Number',
	        width: '13%',
	        valueField: 'prd_number'
	    }, {
	        name: 'Trigram',
	        width: '10%',
	        valueField: 'trigram'
	    }, {
	        name: 'Type',
	        width: '11%',
	        valueField: 'prd_type'
	    }, {
	        name: 'Portfolio Item Name',
	        width: '34%',
	        valueField: 'portfolio_item_name'
	    }, {
	        name: 'Revision',
	        width: '10%',
	        valueField: 'revision'
	    }],
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/sas/product/salesProductCategorySearchAjax",
                dataType: "json",
                data: {"portfolio": $("#pop_portfolio").val()},
                success: function(data) {
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                	response(data.selectSalesProductCategorySearch);
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	$("#pop_etc")[0].value=10;
        	pop_dsdata=ui.item;
        	$("#pop_portfolio").val(ui.item.portfolio);
        	$("#pop_portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#pop_prd_number").val(ui.item.prd_number);
            $("#pop_prd_type").val(ui.item.prd_type);
            $("#pop_trigram").val(ui.item.trigram);
            $("#pop_list_price").val(comma(ui.item.list_price));
            $("#pop_plc").val(comma(ui.item.plc));
            $("#pop_alc").val(comma(ui.item.alc));
            $("#pop_qlc").val(ui.item.qlc_list_price);
            $("#pop_ylc").val(ui.item.ylc_list_price);
            $("#pop_prd_revision").val(ui.item.revision);
            
            var plc=ui.item.plc,
	        	alc=ui.item.alc,
	        	plc_dc=document.getElementById("pop_plc_dc"),
	       		alc_dc=document.getElementById("pop_alc_dc"),
	       		sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
	       		sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
	       		unit_price=document.getElementById("pop_unit_price"),
	       		unit_price_str=document.getElementById("pop_unit_price_str"),
	       		pur_sum=document.getElementById("pop_pur_sum"),
	       		pur_sum_str=document.getElementById("pop_pur_sum_str"),
	       		pop_qty=document.getElementById("pop_qty"),
	       		sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
	       		sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
	       		sales_sum_str=document.getElementById("pop_sales_sum_str"),
	       		sales_sum=document.getElementById("pop_sales_sum");
	        
	        if(!alc_dc.value)alc_dc.value=20;
	        if(!plc_dc.value)plc_dc.value=35;
	        
	        if(!sales_alc_dc.value||sales_alc_dc.value==0){
	        	sales_alc_dc_price.value=comma(alc*1);
	        	sales_sum_str.innerHTML=comma(((alc*1)+(plc*1))*(pop_qty.value*1));
	        	sales_sum.value=((alc*1)+(plc*1))*(pop_qty.value*1);
	        }else{
	        	var price=(((alc*1)*(1-((alc_dc.value*1)/100))*1)).toFixed(0),
	        		sum=(((price*1)+(uncomma(sales_plc_dc_price.value)*1))*(pop_qty.value*1)).toFixed(0);
	        	sales_alc_dc_price.value=comma(price);
	        	sales_sum_str.innerHTML=comma(sum);
	        	sales_sum.value=sum;
	        }
	        
	        if(!sales_plc_dc.value||sales_plc_dc.value==0){
	        	sales_plc_dc_price.value=comma(plc*1);
	        	sales_sum_str.innerHTML=comma(((alc*1)+(plc*1))*(pop_qty.value*1));
	        	sales_sum.value=((alc*1)+(plc*1))*(pop_qty.value*1);
	        }else{
	        	var price=(((plc*1)*(1-((plc_dc.value*1)/100))*1)).toFixed(0),
	        		sum=(((price*1)+(uncomma(sales_alc_dc_price.value)*1))*(pop_qty.value*1)).toFixed(0);
	        	sales_plc_dc_price.value=comma(price);
	        	sales_sum_str.innerHTML=comma(sum);
	        	sales_sum.value=sum;
	        }
	        
	        var	plc_dc_price=((plc*1)*(1-((plc_dc.value*1)/100))),
       			alc_dc_price=((alc*1)*(1-((alc_dc.value*1)/100)));
	        
	        plc_dc_price=(plc_dc_price*1).toFixed(0);
	        alc_dc_price=(alc_dc_price*1).toFixed(0);
	        var sum1=plc_dc_price*1+alc_dc_price*1;
	        
	        document.getElementById("pop_plc_dc_price").value=comma(plc_dc_price);
	        document.getElementById("pop_alc_dc_price").value=comma(alc_dc_price);
	        unit_price.value=(sum1).toFixed(0);
	        unit_price_str.innerHTML=comma((sum1).toFixed(0));
	        pur_sum.value=((sum1)*(pop_qty.value*1)).toFixed(0);
	        pur_sum_str.innerHTML=comma(((sum1)*(pop_qty.value*1)).toFixed(0));
            return false;
        },
        open: function(){
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
};
//자동완성 기능(Trigram)
function autocompleteTrigramSearch(){
	
	$.widget("custom.mcautocomplete", $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	        this.widget().css({"z-index":"10000","max-width":"850px", "max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"850px", "height":"300px"});
	    },
	    _renderMenu: function (ul, items) {
	        var self = this;
	        if (this.options.showHeader) {
	        	var td = "";
	        	$.each(this.options.columns, function (index, item) {
	            	td += "<td class='pd10' width='"+item.width+"'>" + item.name + "</td>";
	            });
	        	
	            var table = $("<table class='Normal_table_pop ui-widget-header'></table>");
	            table.append("<tr>"+td+"</tr>");
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	    	var td = "";
	    	var style="";
	    	
	    	$.each(this.options.columns, function (index, column) {
	    		if(column.name == "Trigram"){
	    			style="style='color:green;'";
	    		}else{
	    			style="";
	    		}
	            td += "<td class='pd10' "+style+" width='"+column.width+"'>" + item[column.valueField ? column.valueField : index] + "</td>";
	        });
	    	
	    	return $("<li style='list-style-image:none;padding:0 0 0 0'>")
	    	.data('ui-autocomplete-item', item)
	      	.append("<table class='Normal_table_pop'>"
	      			+"<tr>"+ td +"</tr>"
	      			+"</table>")
	      	.appendTo(ul);
	    }
	});
	
	$("#pop_trigram").mcautocomplete({
		showHeader: true,
	    columns: [{
	        name: 'Portfolio',
	        width: '22%',
	        valueField: 'portfolio'
	    }, {
	        name: 'Prd. Number',
	        width: '13%',
	        valueField: 'prd_number'
	    }, {
	        name: 'Trigram',
	        width: '10%',
	        valueField: 'trigram'
	    }, {
	        name: 'Type',
	        width: '11%',
	        valueField: 'prd_type'
	    }, {
	        name: 'Portfolio Item Name',
	        width: '34%',
	        valueField: 'portfolio_item_name'
	    }, {
	        name: 'Revision',
	        width: '10%',
	        valueField: 'revision'
	    }],
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/sas/product/salesProductCategorySearchAjax",
                dataType: "json",
                data: {"trigram": $("#pop_trigram").val()},
                success: function(data) {                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                	response(data.selectSalesProductCategorySearch);
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
        	$("#pop_etc")[0].value=10;
        	pop_dsdata=ui.item;
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생        	
        	$("#pop_portfolio").val(ui.item.portfolio);
        	$("#pop_portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#pop_prd_number").val(ui.item.prd_number);
            $("#pop_prd_type").val(ui.item.prd_type);
            $("#pop_trigram").val(ui.item.trigram);
            $("#pop_list_price").val(comma(ui.item.list_price));
            $("#pop_plc").val(comma(ui.item.plc));
            $("#pop_alc").val(comma(ui.item.alc));
            $("#pop_qlc").val(ui.item.qlc_list_price);
            $("#pop_prd_revision").val(ui.item.revision);
            
            var plc=ui.item.plc,
	        	alc=ui.item.alc,
	        	plc_dc=document.getElementById("pop_plc_dc"),
	       		alc_dc=document.getElementById("pop_alc_dc"),
	       		sales_plc_dc=document.getElementById("pop_sales_plc_dc"),
	       		sales_alc_dc=document.getElementById("pop_sales_alc_dc"),
	       		unit_price=document.getElementById("pop_unit_price"),
	       		unit_price_str=document.getElementById("pop_unit_price_str"),
	       		pur_sum=document.getElementById("pop_pur_sum"),
	       		pur_sum_str=document.getElementById("pop_pur_sum_str"),
	       		pop_qty=document.getElementById("pop_qty"),
	       		sales_alc_dc_price=document.getElementById("pop_sales_alc_dc_price"),
	       		sales_plc_dc_price=document.getElementById("pop_sales_plc_dc_price"),
	       		sales_sum_str=document.getElementById("pop_sales_sum_str"),
	       		sales_sum=document.getElementById("pop_sales_sum");
	        
	        if(!alc_dc.value)alc_dc.value=20;
	        if(!plc_dc.value)plc_dc.value=35;
	        
	        if(!sales_alc_dc.value||sales_alc_dc.value==0){
	        	sales_alc_dc_price.value=comma(alc*1);
	        	sales_sum_str.innerHTML=comma(((alc*1)+(plc*1))*(pop_qty.value*1));
	        	sales_sum.value=((alc*1)+(plc*1))*(pop_qty.value*1);
	        }else{
	        	var price=((alc*1)*(1-((alc_dc.value*1)/100))*1).toFixed(0),
	        		sum=(((price*1)+(uncomma(sales_plc_dc_price.value)*1))*(pop_qty.value*1)).toFixed(0);
	        	sales_alc_dc_price.value=comma(price);
	        	sales_sum_str.innerHTML=comma(sum);
	        	sales_sum.value=sum;
	        }	        
	        if(sales_plc_dc.value==0){
	        	sales_plc_dc_price.value=comma(plc*1);
	        	sales_sum_str.innerHTML=comma(((alc*1)+(plc*1))*(pop_qty.value*1));
	        	sales_sum.value=((alc*1)+(plc*1))*(pop_qty.value*1);
	        }else{
	        	var price=((plc*1)*(1-((plc_dc.value*1)/100))*1).toFixed(0),
	        		sum=(((price*1)+(uncomma(sales_alc_dc_price.value)*1))*(pop_qty.value*1)).toFixed(0);
	        	sales_plc_dc_price.value=comma(price);
	        	sales_sum_str.innerHTML=comma(sum);
	        	sales_sum.value=sum;
	        }
            
	        var	plc_dc_price=((plc*1)*(1-((plc_dc.value*1)/100)))*1,
	   			alc_dc_price=((alc*1)*(1-((alc_dc.value*1)/100)))*1;
	        plc_dc_price=(plc_dc_price*1).toFixed(0);
	        alc_dc_price=(alc_dc_price*1).toFixed(0);
	        var sum1=plc_dc_price*1+alc_dc_price*1;
	        
	        document.getElementById("pop_plc_dc_price").value=comma(plc_dc_price);
	        document.getElementById("pop_alc_dc_price").value=comma(alc_dc_price);
	        unit_price.value=(sum1).toFixed(0);
	        unit_price_str.innerHTML=comma((sum1).toFixed(0));
	        pur_sum.value=((sum1)*(pop_qty.value*1)).toFixed(0);
	        pur_sum_str.innerHTML=comma(((sum1)*(pop_qty.value*1)).toFixed(0));
	        return false;
        },
        open: function(){
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
};
function autocompleteCompanySearch(){	
	$("#ps_alc_company_name").autocomplete({
		source : function( request, response ) {			
			$.ajax({
                type: "POST",
                url: "/cop/customerAdminAjax",
                dataType: "json",
                data: {"searchString": request.term},
                success: function(data) {
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response( 
                        $.map(data.customerList, function(item) {
                            return {
                            	label: item.company_name,
                            	company_id: item.company_id
                            };
                        })
                    );
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 1,
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생        	
        	if(this.name == "sh_company_name") {
        		$("#sh_company_id").val(ui.item.company_id);
                $("#ps_alc_company_name").val(ui.item.label);
        	}
            return false;
        },
        open: function(){
            $(this).autocomplete('widget').css({"z-index":"10000","max-height":"200px", "overflow-y":"auto", "overflow-x":"hidden", "width":"200px", "height":"200px"});
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
};
function setBtndv(opt){
	var btndv=document.getElementById("pop_btndv");
	btndv.innerHTML="";
	
	if(opt){
		var btn1=cf.mkTag("buttom",btndv),
			span=cf.mkTag("span",btndv),
			btn2=cf.mkTag("buttom",btndv),
			span2=cf.mkTag("span",btndv),
			btn3=cf.mkTag("buttom",btndv);
		btndv.className="savebtn2";
		btn1.className="ct-btn darkgrey large";
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
						if(d.codeId==kind.value)str=d.codeName;
					});
					generalPopOk2("기존의 "+str+"품의서가 있습니다.<br/> 변경 품의 하시기 바랍니다.");	
				}
			}
		};
		btn2.onclick=function(){
			window.close();
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
	}else cf.setCss(btndv,{marginBottom:0+"px"});
};