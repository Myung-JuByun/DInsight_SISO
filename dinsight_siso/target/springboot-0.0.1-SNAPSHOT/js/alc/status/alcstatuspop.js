//상세보기
function alcStatusDetailPop(searchString, obj, objSub){
	
	var con=document.createElement("div");
	con.style.width=1000+"px";
	con.style.height=cf.workareaheight-280+"px";
	con.style.position="absolute";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=1000+"px";
	//con1.style.height=cf.workareaheight-280+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="상세보기";
		
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	var con2_img=cf.mkTag("img",con2_a);
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs1";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	//con3.style.height=cf.workareaheight-340+"px";
	con3.style.overflowY="auto";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	con4.id="con_table";
	
	var con4_title=cf.mkTag("div",con4);
	con4_title.className="mini_title";
	con4_title.innerHTML="제품";
		
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	//제품
	alcStatusDetailPopTable(con6, obj);
	
	//설치사
	alcStatusDetailPopSubTable(searchString, con3, objSub);
	
	callPop(con);
}

//상세보기 - 제품
function alcStatusDetailPopTable(con, obj) {
	//dir(obj);
	
	var table=cf.mkTag("table",con);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table_pop";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="고객사";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.width="30%";
	td.innerHTML=obj[0].company_name;
	
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="년도";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.style.width="30%";
	td.innerHTML=obj[0].alc_year;
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="사업장";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	if(obj[0].place_of_business==undefined){
		td.innerHTML="";
	}else{
		td.innerHTML=obj[0].place_of_business;
	}
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Portfolio";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.innerHTML=obj[0].portfolio;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Prd. Number";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.innerHTML=obj[0].prd_number;
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Type";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.innerHTML=obj[0].prd_type;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Trigram";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.innerHTML=obj[0].trigram;
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Portfolio Item Name";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.innerHTML=obj[0].portfolio_item_name;
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Copy";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.innerHTML=obj[0].qty;
}

//상세보기 - 설치사
function alcStatusDetailPopSubTable(searchString, con, obj) {
	
	//dir(obj);
	
	var mainCon=cf.mkTag("div",con);
	mainCon.id="install_customer";
	
	var con_empty=cf.mkTag("div",mainCon);
	con_empty.style.height="20px";
	
	var con_title_main=cf.mkTag("div",mainCon);
	con_title_main.style.height="30px";
	
	var con_title=cf.mkTag("div",con_title_main);
	con_title.className="mini_title";
	con_title.innerHTML="설치사";
	con_title.style.cssFloat="left";
	
	var div=cf.mkTag("div",mainCon);
	div.className="Wrap_table";
	div.style.width="100%";
	div.style.height="300px";
	div.style.overflowX="scroll";
	div.style.overflowY="auto";
	
	var table=cf.mkTag("table",div);
	table.style.width=1500+"px";
	table.cellPadding="0";
	table.cellSpacing="0";
	table.className="project_table Normal_table";
	table.style.textAlign="center";
	
	var thead=cf.mkTag("thead",table);
	var tr=cf.mkTag("tr",thead);
	
	var	th=cf.mkTag("th",tr);
	th.width="11%";
	th.innerHTML="설치사명";
	
	var	th=cf.mkTag("th",tr);
	th.width="8%";
	th.innerHTML="Target Id";
	
	var	th=cf.mkTag("th",tr);
	th.width="4%";
	th.innerHTML="Copy";
	
	var	th=cf.mkTag("th",tr);
	th.width="12%";
	th.innerHTML="License Date";
	
	var	th=cf.mkTag("th",tr);
	th.width="8%";
	th.innerHTML="발주일";
	
	var	th=cf.mkTag("th",tr);
	th.width="8%";
	th.innerHTML="설치일";
	
	var	th=cf.mkTag("th",tr);
	th.width="8%";
	th.innerHTML="세금계산서일";
	
	var	th=cf.mkTag("th",tr);
	th.width="6%";
	th.innerHTML="List Price";
	
	var	th=cf.mkTag("th",tr);
	th.width="6%";
	th.innerHTML="견적가";
	
	var	th=cf.mkTag("th",tr);
	th.width="8%";
	th.innerHTML="수금일";
	
	var	th=cf.mkTag("th",tr);
	th.width="6%";
	th.innerHTML="수금";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="계약서파일";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="Stock";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="구매동의";
	th.className="right";
	
	var tbody=cf.mkTag("tbody",table);
	tbody.id="install_customer_body";
	
	obj.trav(function(d,i){
		
		var tr=cf.mkTag("tr",tbody);
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.install_company_name;
		
		var	td=cf.mkTag("td",tr);
		if(d.target_id==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=d.target_id;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.qty;
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=modiDate(d.license_start_day, ".") +" ~ "+modiDate(d.license_end_day, ".");
		
		var	td=cf.mkTag("td",tr);
		if(d.ordering_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=modiDate(d.ordering_day, ".");
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.install_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=modiDate(d.install_day, ".");
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.invoice_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=modiDate(d.invoice_day, ".");
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=comma(d.list_price);
		
		var	td=cf.mkTag("td",tr);
		if(d.estimated_cost==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=comma(d.estimated_cost);
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.collect_money_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=modiDate(d.collect_money_day, ".");
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.collect_money==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=comma(d.collect_money);
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.contract_project_code_nm == "Y"){
			var	img=cf.mkTag("img",td);
			img.src="/images/ico/ico_filedown.gif";
			img.onclick=function(){
				alcStatusFileList(searchString);
			};
		}else{
			td.innerHTML=d.contract_project_code_nm;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.stock_nm;
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.purchase_agreement_nm;
		td.className="right";
	});
}

//상세보기 - 설치사 - 계약서 파일 리스트 팝업
function alcStatusInstallCustomerFileListPop(obj){
	
	var con=document.createElement("div");
	con.style.width=700+"px";
	con.style.height=cf.workareaheight-480+"px";
	con.style.position="absolute";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=700+"px";
	con1.style.height=cf.workareaheight-480+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="계약서";
		
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	var con2_img=cf.mkTag("img",con2_a);
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs1";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	con3.style.height=cf.workareaheight-340+"px";
	con3.style.overflowY="auto";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	con4.id="con_table";
	
	/*var con4_title=cf.mkTag("div",con4);
	con4_title.className="mini_title";
	con4_title.innerHTML="제품";*/
		
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
	
	//계약서 파일 리스트
	alcStatusInstallCustomerFileDetailList(con5, obj);
	
	callPop(con);
}

//계약서 리스트 테이블
function alcStatusInstallCustomerFileDetailList(con, obj){
	
	var table=cf.mkTag("table",con);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="project_table Normal_table";
	table.style.textAlign="center";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.width="40%";
	th.innerHTML="계약서명";
	
	var th=cf.mkTag("th",tr);
	th.style.width="40%";
	th.innerHTML="파일";
	
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="버전";
	
	obj.trav(function(d,i){
		
		if(d.file_name!=undefined){
			//
			var tr=cf.mkTag("tr",table);
			var td=cf.mkTag("td",tr);
			td.innerHTML=d.name;
			
			var td=cf.mkTag("td",tr);
			td.innerHTML=d.file_name;
			td.onclick=function(){
				window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=" + d.id));
			};
			td.style.cursor="pointer";
			td.style.textDecoration="underline";
			
			var td=cf.mkTag("td",tr);
			td.innerHTML=d.rivision;
		}
	});
	
}
