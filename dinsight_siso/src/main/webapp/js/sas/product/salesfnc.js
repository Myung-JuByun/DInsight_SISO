var BRANDLIST,METHODLIST,PAYLIST,ETCLIST,SELECT_brand,saleslist,paymentlist,searchCompany,searchContract,prev,prev_resp;

function defaultLoadList(){
	var obj={year:CurrentDate[0],month:CurrentDate[1],companyname:"",pjcode:"",brandcd:""};	
	callProductSalesData(obj, function(data){
		paymentlist=data.paymentList;
		BRANDLIST=data.brandList;
		METHODLIST=data.methodList;
		PAYLIST=data.purchasePayList;
		ETCLIST=data.etcList;
		saleslist=data.salesList;
		mkSearch();
	});
	dataset();
	productAdminList(saleslist);
	function dataset(){
		saleslist.trav(function(d,i){
			if(!d.insert_date)d.insert_date="";
			if(!d.contract_number)d.contract_number="";
			if(!d.company_name)d.company_name="";
			if(!d.total_contract_price)d.total_contract_price="";
			if(!d.purchase_price)d.purchase_price="";
			if(!d.profit_price)d.profit_price="";
			if(!d.degree)d.degree="";
			if(!d.sales_confer_kind_name)d.sales_confer_kind_name="";
			if(!d.status_nm)d.status_nm="";
		});
	};
};
function searchAdmin(){
	prev=null;	
	var obj={year:$("#sh_product_sales_year").val(),month:$("#sh_product_sales_month").val(),companyname:searchCompany.value,
			pjcode:searchContract.value,brandcd:SELECT_brand.value};
	callProductSalesData(obj, function(data){
		paymentlist=data.paymentList;
		saleslist=data.salesList;
	});
	dataset();
	productAdminList(saleslist);
	function dataset(){
		saleslist.trav(function(d,i){
			if(!d.insert_date)d.insert_date="";
			if(!d.contract_number)d.contract_number="";
			if(!d.company_name)d.company_name="";
			if(!d.total_contract_price)d.total_contract_price="";
			if(!d.purchase_price)d.purchase_price="";
			if(!d.profit_price)d.profit_price="";
			if(!d.degree)d.degree="";
			if(!d.sales_confer_kind_name)d.sales_confer_kind_name="";
			if(!d.status_nm)d.status_nm="";
		});
	};
};
function pjcodeSave(con,opt){
	if(opt){
		var pjcode=document.getElementById("searchPjtCode");
		pjcode.value=prev_pjcode.sales_project_code;
		cf.killTag(con);
	}else{
		var chk=false,chklist,salesname="매입/매출";
		if(prev_pjcode){
			$.ajax({
				url: "/sas/product/productSalesCheckContract",
				type: "POST",
				async: false,
				dataType: 'json',
				data: {contract_number_id:prev_pjcode.sales_project_id,sales_confer_kind:document.getElementById("sales_confer_kind").value},
				success : function (data) {
					if(data!="fail"){
						chklist=data.salesCheckList;
						if(chklist.length>0){
							chklist=chklist[0];
							if(chklist.sales_confer_monthly_yn=="N")chk=true;
							else{
								chk=true;
								salesname=chklist.code_name
							}
						}else chk=true;
					}
					$('.wrap-loading-pop').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading-pop').show();
				}
			});	
		}
		if(chk){
			var pjcode=document.getElementById("pjcode");
			pjcode.value=prev_pjcode.sales_project_code;
			
			var pjcode_id=document.getElementById("pjcode_id");
			pjcode_id.value=prev_pjcode.sales_project_id;
			
			var contract_id=document.getElementById("contract_id");
			contract_id.value=prev_pjcode.contract_id;
			
			var companyname=document.getElementById("companyname");
			companyname.value=prev_pjcode.company_name;
			
			var companyid=document.getElementById("companyid");
			companyid.value=prev_pjcode.company_id;
			
			var address=document.getElementById("address");
			address.value=prev_pjcode.company_address;
			
			var cus_division=document.getElementById("cus_division");
			cus_division.value=prev_pjcode.customer_division;
			
			var cus_name=document.getElementById("cus_name");
			cus_name.value=prev_pjcode.customer_name;
			
			var cus_id=document.getElementById("cus_id");
			cus_id.value=prev_pjcode.customer_id;
			
			var cus_tel=document.getElementById("cus_tel");
			cus_tel.value=prev_pjcode.customer_tel;
			
			var cus_mobile=document.getElementById("cus_mobile");
			cus_mobile.value=prev_pjcode.customer_hp;
			
			var cus_email=document.getElementById("cus_email");
			cus_email.value=prev_pjcode.customer_email;
			
			var tax_division=document.getElementById("tax_division");
			tax_division.value=prev_pjcode.invoice_division;
			
			var tax_name=document.getElementById("tax_name");
			tax_name.value=prev_pjcode.invoice_name;
			
			var tax_id=document.getElementById("tax_id");
			tax_id.value=prev_pjcode.invoice_id;
			
			var tax_tel=document.getElementById("tax_tel");
			tax_tel.value=prev_pjcode.invoice_tel;
			
			var tax_mobile=document.getElementById("tax_mobile");
			tax_mobile.value=prev_pjcode.invoice_hp;
			
			var tax_email=document.getElementById("tax_email");
			tax_email.value=prev_pjcode.invoice_email;
			
			var contract_name=document.getElementById("contract_name"),
				contractList;			
			callContractDetailData({pjcode:prev_pjcode.sales_project_code}, function(data){
				contractList=data.salesContractRivisionList;
			});
			if(contractList.length>0){
				contract_name.value=contractList[0].contract_name;
			}else contract_name.value="선택하세요.";
			
			cf.killTag(con);
		}else generalPopOk2("해당 프로젝트는 </br>제출된 "+salesname+" 품의서가 있습니다.",function(){return;});
	}	
};
function companySave(prev_com_obj){
	if(!prev_com_obj) generalPopOk2("고객사를 선택하세요.");
	else searchCompany.value=prev_com_obj.company_name;
	
	document.getElementById("my_closs").onclick();
};
function mkSearch(){
	SELECT_brand.innerHTML="";
	mkSelect(SELECT_brand, BRANDLIST,"",true);
};
function respSave(con,opt){
	if(!prev_resp){
		generalPopOk2("담당자를 선택하세요.");
	}else{
		if(opt){
			var tax_division=document.getElementById("tax_division");
			tax_division.value=prev_resp.obj.division;
			
			var tax_name=document.getElementById("tax_name");
			tax_name.value=prev_resp.obj.customer_name;
			
			var tax_id=document.getElementById("tax_id");
			tax_id.value=prev_resp.obj.customer_id;
			
			var tax_tel=document.getElementById("tax_tel");
			tax_tel.value=prev_resp.obj.sub_phone_number;
			
			var tax_mobile=document.getElementById("tax_mobile");
			tax_mobile.value=prev_resp.obj.mobile;
			
			var tax_email=document.getElementById("tax_email");
			tax_email.value=prev_resp.obj.email;
		}else{
			var cus_division=document.getElementById("cus_division");
			cus_division.value=prev_resp.obj.division;
			
			var cus_name=document.getElementById("cus_name");
			cus_name.value=prev_resp.obj.customer_name;
			
			var cus_id=document.getElementById("cus_id");
			cus_id.value=prev_resp.obj.customer_id;
			
			var cus_tel=document.getElementById("cus_tel");
			cus_tel.value=prev_resp.obj.sub_phone_number;
			
			var cus_mobile=document.getElementById("cus_mobile");
			cus_mobile.value=prev_resp.obj.mobile;
			
			var cus_email=document.getElementById("cus_email");
			cus_email.value=prev_resp.obj.email;
		}
		cf.killTag(con.parentNode);
	}
};
function memberInsert(con){
	if(!prev_user) generalPopOk2("사원을 선택하세요.");
	else{
		var name=document.getElementById("staff_name");
		var id=document.getElementById("staff_id");
		
		name.value=prev_user.obj.division_name;
		id.value=prev_user.obj.division_cd.substring(4,7);
		
		cf.killTag(con.parentNode);
	}
};
function modiDateTen(data,opt){
	var y=data.substring(0,4);
	var m=data.substring(5,7);
	var d=data.substring(8,10);
	
	if(opt)	var date=y+"."+m+"."+d;
	else var date=y+"-"+m+"-"+d;
	return date;
};
function productSalesPrint(con){
	function goPrint(){
		
		cf.traverse(document.body,function(el){
			if(el.className=="my-container2")
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
	        noPrintSelector : ".savebtn3",
	        //Add this on top
	        append : "",
	        //Add this at bottom
	        prepend : ""
	    });
	}
	goPrint();
	
	con.style.overflowY="visble";
};
function dateCheck(stat,endd,flag){
	if(!stat.value){
		generalPopOk2("시작일을 먼저 선택하세요");
		endd.value="";
		return;
	}
	var end=endd.value;
	var endY=end.substring(0,4);
	var endM=end.substring(5,7);
	var endD=end.substring(8,10);
	var set=endY+"/"+endM+"/"+endD;		
	var enddate=new Date(set);	
	
	var startY=stat.value.substring(0,4);
	var startM=stat.value.substring(5,7);
	var startD=stat.value.substring(8,10);
	var set2=startY+"/"+startM+"/"+startD;		
	var startdate=new Date(set2);
	
	var m=enddate-startdate;
	var a=endY+""+endM+""+endD;	
	var b=startY+""+startM+""+startD;
	
	if(flag=="E"){
		if(m<0){
			generalPopOk2("종료일이 시작일 보다 이전입니다.");
			endd.value="";
			return;
		}
	}else if(flag=="S"){
		if(m<0){
			generalPopOk2("시작일이 종료일 보다 이후입니다.");
			stat.value="";
			return;
		}
	}else{
		if(m<0){
			generalPop("종료일이 시작일 보다 이전입니다.");
			endd.value="";
			return;
		}
	} 
};
function idxList(table,p){
	var idx;	
	table.childNodes.trav(function(d,i){
		if(d==p) cf.killTag(d);
	});	
	table.childNodes.trav(function(d,i){
		idx=i+1;
		d.childNodes[0].childNodes[0].innerHTML=idx;
	});
	
	var dv1=document.getElementById("dsTb01"),
		dv2=document.getElementById("dsTb02"),
		dv3=document.getElementById("dsTb03");
	
	if(dv1)prev_pop.dsTemp=$("#ds_salesDetail_contents").find("select, input").serializeArray();
	else if(dv2)prev_pop.etcTemp=$("#etc_salesDetail_contents").find("select, input").serializeArray();
	else if(dv3)prev_pop.alcTemp=$("#alc_salesDetail_contents").find("select, input").serializeArray();
	
};
function idxReturn(table,p){
	var idx;
	
	table.childNodes.trav(function(d,i){
		if(d==p) idx=i;	
	});
	
	return idx;
};
//분할 자동계산
function splitAutoCount(table, elemName, delimiter) {
	var val;
	
	var tableLength = table.childNodes.length;
	
	table.childNodes.trav(function(d, i){
	
		val=(i+1) + delimiter + tableLength;
		
		//d.childNodes[0].childNodes[0].value=val;
		
		document.getElementsByName(elemName)[i].value=val;		
	});
};

/*
function mkSelect(select, obj, def){
var op;

select.className="select_pop";
op=cf.mkTag("option",select);
op.value="";
op.innerHTML="선택안함";

obj.trav(function(d,i){
	op=cf.mkTag("option",select);
	op.value=obj[i].codeId;
	op.innerHTML=obj[i].codeName;
	if(def && obj[i].codeId==def){
		op.selected="selected";
	}
});
};
*/