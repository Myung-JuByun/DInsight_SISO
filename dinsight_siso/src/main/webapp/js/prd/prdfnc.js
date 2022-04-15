var prd_obj01,prd_obj02,prd_obj02_rev,prd_obj03,prev_prd01,prev_prd02,chk_prd=new Array(),MAX_PAGE=1,CUR_PAGE,prd_page=new Array();

function prdLoadList01(){
	prd_page=new Array();
	prev_pdt="";
	CUR_PAGE="";
	MAX_PAGE="";
	var obj={sh_year:CurrentDate[0],portfolio:"",prd_number:"",prd_type:"",trigram:"",rownum:100,page:1},//CurrentDate[0]
		dv=document.getElementById("prdTb01");
	$.ajax({
		url: "/prd/prdSearchList",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			prd_obj01=data.prdMainList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		prdDataSet01();
		if(MAX_PAGE){
			for(var i=0;i<MAX_PAGE;i++){
				var a=parseInt((i)/10);
				prd_page.push([i+1,a+1,(a*10)+1,0]);
			}
			var max_pages=prd_page.distinct(1),lenar=[];
			max_pages.trav(function(d,i){
				var cnt=0;
				prd_page.trav(function(f,g){
					if(d==f[1]){
						cnt++;
					}
				});
				lenar.push(cnt);
			});
			lenar.trav(function(f,g){
				prd_page.trav(function(d,i){
					if(g+1==d[1])d[3]=f;
				});
			});
		}
		var res=q.parse("select * from prdlist01;");
			pdv=document.getElementById("prd_page");
		mkList_body(dv,res.arr);
		mkprd_page(pdv);
	};	
};
function prdSrchList01(){
	prd_page=new Array();
	prev_pdt="";
	CUR_PAGE="";
	MAX_PAGE="";
	var sh_year=document.getElementById("sh_year"),
		portfolio=document.getElementById("portfolio"),
		prd_number=document.getElementById("prd_number"),
		prd_type=document.getElementById("prd_type"),
		trigram=document.getElementById("trigram"),
		rownum=document.getElementById("rownum"),
		dv=document.getElementById("prdTb01"),
		obj={sh_year:sh_year.value,portfolio:portfolio.value,prd_number:prd_number.value,prd_type:prd_type.value,trigram:trigram.value,rownum:rownum.value,page:1};
	$.ajax({
		url: "/prd/prdSearchList",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			prd_obj01=data.prdMainList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		prdDataSet01();
		if(MAX_PAGE){
			for(var i=0;i<MAX_PAGE;i++){
				var a=parseInt((i)/10);
				prd_page.push([i+1,a+1,(a*10)+1,0]);
			}
			var max_pages=prd_page.distinct(1),lenar=[];
			max_pages.trav(function(d,i){
				var cnt=0;
				prd_page.trav(function(f,g){
					if(d==f[1]){
						cnt++;
					}
				});
				lenar.push(cnt);
			});
			lenar.trav(function(f,g){
				prd_page.trav(function(d,i){
					if(g+1==d[1])d[3]=f;
				});
			});
		}
		var res=q.parse("select * from prdlist01;");
			pdv=document.getElementById("prd_page");
		mkList_body(dv,res.arr);
		mkprd_page(pdv);
	};	
};
function prdSrchPageList01(){
	var sh_year=document.getElementById("sh_year"),
		portfolio=document.getElementById("portfolio"),
		prd_number=document.getElementById("prd_number"),
		prd_type=document.getElementById("prd_type"),
		trigram=document.getElementById("trigram"),
		rownum=document.getElementById("rownum"),
		dv=document.getElementById("prdTb01"),
		obj={sh_year:sh_year.value,portfolio:portfolio.value,prd_number:prd_number.value,prd_type:prd_type.value,trigram:trigram.value,rownum:rownum.value,page:CUR_PAGE.pg};
	$.ajax({
		url: "/prd/prdSearchList",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			prd_obj01=data.prdMainList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		prdDataSet01();
		var res=q.parse("select * from prdlist01;");
			pdv=document.getElementById("prd_page");
		mkList_body(dv,res.arr);
		mkprd_page(pdv);
	};
};
function prdDataSet01(){
	var ar=[];
	if(prd_obj01&&prd_obj01.length>0){
		prd_obj01.trav(function(d,i){
			if(!d.price_list_date)d.price_list_date="";
			if(!d.portfolio)d.portfolio="";
			if(!d.prd_number)d.prd_number="";
			if(!d.prd_type)d.prd_type="";
			if(!d.trigram)d.trigram="";
			if(!d.portfolio_item_name)d.portfolio_item_name="";
			if(!d.plc)d.plc="";
			if(!d.alc)d.alc="";
			if(!d.qlc)d.qlc="";
			if(!d.ylc)d.ylc="";
			if(d.max_rn) MAX_PAGE=d.max_rn*1;
			ar.push([i+1,d.price_list_date,d.portfolio,d.trigram,d.prd_type,d.prd_number,d.plc,d.alc,d.qlc,d.ylc,"[상세보기]",d.revision]);
		});
	}
	q.reg("prdlist01",{
		arr:ar,
		header:["num","price_list_date","portfolio","trigram","prd_type","prd_number","plc","alc","qlc","ylc","view","revision"],
		meta:["number","string","string","string","string","string","string","string","string","string","string","string"]
	});
};
function prdLoadList02(obj){
	callPrdDetailListData(obj,function(data){
		prd_obj02=data.prdDetailList;
	});	
	prdDataSet02();
	//prdDataSet02All();
};
function prdLoadList02_rev(obj){
	callPrdDetailListData(obj,function(data){
		prd_obj02_rev=data.prdDetailAllList;
	});	
	prdDataSet02_rev();
	//prdDataSet02All();
};
function prdDataSet02(){
	var ar=[];
	if(prd_obj02&&prd_obj02.length>0){
		prd_obj02.trav(function(d,i){
			if(!d.pricelist)d.pricelist="";
			if(!d.currency)d.currency="";
			if(!d.price_list_date)d.price_list_date="";
			if(!d.portfolio)d.portfolio="";
			if(!d.prd_number)d.prd_number="";
			if(!d.version)d.version="";
			if(!d.prd_type)d.prd_type="";
			if(!d.trigram)d.trigram="";
			if(!d.portfolio_item_name)d.portfolio_item_name="";
			if(!d.plc)d.plc="";
			if(!d.alc)d.alc="";
			if(!d.qlc)d.qlc="";
			if(!d.ylc)d.ylc="";
			if(!d.slc)d.slc="";
			if(!d.tbl2)d.tbl2="";
			if(!d.tbl3)d.tbl3="";
			if(!d.ulc)d.ulc="";
			if(!d.xlc)d.xlc="";
			if(!d.qrc)d.qrc="";
			if(!d.elc)d.elc="";
			ar.push([d.pricelist,d.currency,d.price_list_date,d.portfolio,d.prd_number,d.version,d.prd_type,d.trigram,d.portfolio_item_name
			         ,d.plc,d.alc,d.qlc,d.ylc,d.slc,d.tbl2,d.tbl3,d.ulc,d.xlc,d.qrc,d.elc]);
		});
	}
	q.reg("prdlist02",{
		arr:ar,
		header:["pricelist","currency","price_list_date","portfolio","prd_number","version","prd_type","trigram","portfolio_item_name"
		        ,"plc","alc","qlc","ylc","slc","tbl2","tbl3","ulc","xlc","qrc","elc"],
		meta:["string","string","string","string","string","string","string","string","string","string","string","string"
		      ,"string","string","string","string","string","string","string","string"]
	});
};
function prdDataSet02_rev(){
	var ar=[];
	if(prd_obj02_rev&&prd_obj02_rev.length>0){
		prd_obj02_rev.trav(function(d,i){
			if(!d.price_list_date)d.price_list_date="";
			if(!d.revision)d.revision="";
			if(!d.portfolio)d.portfolio="";
			if(!d.prd_number)d.prd_number="";
			if(!d.prd_type)d.prd_type="";
			if(!d.trigram)d.trigram="";
			if(!d.plc)d.plc="";
			if(!d.alc)d.alc="";
			if(!d.qlc)d.qlc="";
			if(!d.ylc)d.ylc="";
			ar.push([d.revision,d.price_list_date,d.portfolio,d.trigram,d.prd_type,d.prd_number,d.plc,d.alc,d.qlc,d.ylc]);
		});
	}
	q.reg("prdlist02_rev",{
		arr:ar,
		header:["revision","price_list_date","portfolio","trigram","prd_type","prd_number","plc","alc","qlc","ylc"],
		meta:["string","string","string","string","string","string","string","string","string","string"]
	});
};
function prdLoadList03(opt){
	var chk_year=document.getElementById("chk_year"),
		chk_str=document.getElementById("chk_str");
	
	if(!opt)obj={sh_year:chk_year.value};
	else obj={sh_year:CurrentDate[0]};
	callPrdYearCheck(obj,function(data){
		prd_obj03=data.prdYearCheck;
	});
	if(prd_obj03){
		if(prd_obj03*1>0){
			chk_str.innerHTML="자료가 존재합니다.";
			chk_str.className="asterisk";
		}else{
			chk_str.innerHTML="";
			chk_str.className="";
		}
	}
};
function prdExcelSave(pcon){
	var temp=$("select").serializeArray(),
		formData = new FormData(),
		str;
	
	if(prd_obj03*1>0)str="해당년도에 제품이 존재합니다.</br>삭제 후 저장하시겠습니까?";
	else str="저장하시겠습니다?";
	
	if(!$("#uploadFile")[0].value){
		generalPopOk2("첨부파일을 등록하세요.");
	}else{
		if($("#uploadFile")[0] != undefined && $("#uploadFile")[0] != null) var file=$("#uploadFile")[0].files[0];
		formData.append("uploadfile", $("#uploadFile")[0].files[0]);
		for(var i=0 ; i<temp.length ; i++){
			var paramKey = temp[i].name;
			var paramValue = temp[i].value;
			formData.append(paramKey, paramValue);
		}
		generalPop(str, function(){
			$.ajax({
				url: "/prd/prdExcelUpload",
				type: "POST",
				data: formData,
				dataType: "text",
				processData: false,
				contentType: false,					
				success : function (data) {
					var data = $.parseJSON(data);
					if(data != "success") generalPopOk2("관리자에게 문의하시기 바랍니다.");
					else generalPop("저장되었습니다.");
					cf.killTag(pcon.parentNode);
					prdSrchList01();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}	
};