//상세보기
function alcInstallCustomerPop(searchString, obj, objSub){
	
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
	alcInstallCustomerPopTable(con6, obj);
	
	//설치사
	alcInstallCustomerPopSubTable(searchString, con3, objSub);
	
	callPop(con);
}

//상세보기 - 제품
function alcInstallCustomerPopTable(con, obj) {
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
	td.className="pd10";
	if(obj[0].code_name==undefined){
		td.innerHTML="";
	}else{
		td.innerHTML=obj[0].code_name;
	}
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="영업담당자";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	if(obj[0].user_name==undefined){
		td.innerHTML="";
	}else{
		td.innerHTML=obj[0].user_name;
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
function alcInstallCustomerPopSubTable(searchString, con, obj) {
	
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
	table.style.width=1800+"px";
	table.cellPadding="0";
	table.cellSpacing="0";
	table.className="project_table Normal_table";
	table.style.textAlign="center";
	
	var thead=cf.mkTag("thead",table);
	var tr=cf.mkTag("tr",thead);
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="설치사명";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="Target Id";
	
	var	th=cf.mkTag("th",tr);
	th.width="4%";
	th.innerHTML="Copy";
	
	var	th=cf.mkTag("th",tr);
	th.width="4%";
	th.innerHTML="License Date";
	
	var	th=cf.mkTag("th",tr);
	th.width="7%";
	th.innerHTML="발주기간";
	
	var	th=cf.mkTag("th",tr);
	th.width="7%";
	th.innerHTML="설치기간";
	
	var	th=cf.mkTag("th",tr);
	th.width="7%";
	th.innerHTML="세금계산서기간";
	
	var	th=cf.mkTag("th",tr);
	th.width="7%";
	th.innerHTML="계약기간";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="List Price";
	
	var	th=cf.mkTag("th",tr);
	th.width="4%";
	th.innerHTML="견적가";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="구매일";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="수금";
	
	var	th=cf.mkTag("th",tr);
	th.width="5%";
	th.innerHTML="견적서파일";
	
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
		td.innerHTML=d.company_name;
		
		var	td=cf.mkTag("td",tr);
		if(d.target_id==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=d.target_id;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.qty;
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.license_date;
		
		var	td=cf.mkTag("td",tr);
		if(d.ordering_start_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=d.ordering_start_day +" ~ "+d.ordering_end_day;
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.install_start_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=d.install_start_day +" ~ "+d.install_end_day;
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.invoice_start_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=d.invoice_start_day +" ~ "+d.invoice_end_day;
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.contract_start_day==""){
			td.innerHTML="";
		}else{
			td.innerHTML=d.contract_start_day +" ~ "+ d.contract_end_day;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.list_price;
		
		var	td=cf.mkTag("td",tr);
		if(d.estimated_cost==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=d.estimated_cost;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.purchase_date;
		
		var	td=cf.mkTag("td",tr);
		if(d.collect_money==undefined){
			td.innerHTML="";
		}else{
			td.innerHTML=d.collect_money;
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.quote_file_nm == "Y"){
			var	img=cf.mkTag("img",td);
			img.src="/images/ico/ico_filedown.gif";
			img.onclick=function(){
				alcAdminfileList(searchString, "quite");
			};
		}else{
			td.innerHTML=d.quote_file_nm;
		}
		
		var	td=cf.mkTag("td",tr);
		if(d.contract_file_nm == "Y"){
			var	img=cf.mkTag("img",td);
			img.src="/images/ico/ico_filedown.gif";
			img.onclick=function(){
				alcAdminfileList(searchString, "contract");
			};
		}else{
			td.innerHTML=d.contract_file_nm;
		}
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.stock_nm;
		
		var	td=cf.mkTag("td",tr);
		td.innerHTML=d.purchase_agreement_nm;
		td.className="right";
	});
}

//상세보기 - 설치사 - 견적서 파일 리스트
function alcInstallCustomerFileListPop(obj, objSub){
	
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
	con1.style.height=cf.workareaheight-280+"px";
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
	con3.style.height=cf.workareaheight-340+"px";
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
	alcInstallCustomerPopTable(con6, obj);
	
	//설치사
	alcInstallCustomerPopSubTable(con3, objSub);
	
	callPop(con);
}

//alc 추가 팝업
function alcAdminAddPop(mode){
	
	if(mode=="M") {
		if(!prev_tr){
			generalPop("수정할 제품을 선택하세요.");
			return;
		}
	}
	
	var con=document.createElement("div");
	con.style.width=950+"px";
	con.style.height=cf.workareaheight-280+"px";
	con.style.position="absolute";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=950+"px";
	//con1.style.height=cf.workareaheight-280+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	if(mode=="M") {
		span.innerHTML="ALC관리 수정";
	}else{
		span.innerHTML="ALC관리 등록";
	}
	
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
	if(mode=="M") {
		con4_title.innerHTML="제품수정";
	}else{
		con4_title.innerHTML="제품등록";
	}
	
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	//테이블
	alcAdminAddPopTable(mode, con6);
	
	var con6=cf.mkTag("div",con3),
	img1=cf.mkTag("img",con6),
	span=cf.mkTag("span",con6),
	img2=cf.mkTag("img",con6);

	con6.className="savebtn";
	img1.style.cursor="pointer";
	img2.style.cursor="pointer";
	img1.src="/images/pop_btn/btn_save_big.gif";
	img2.src="/images/pop_btn/btn_cancel_big.gif";
	span.innerHTML="  ";
	
	img1.onclick=function(){
		alcSave(con);
	};
		
	img2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	callPop(con);
	
	//달력
	datePickerMonth("input_date", "yymmdd");
	datePickerMultiMonth("input_multi_date", "yymmdd", 2);
	
	//자동완성
	autocompletePortfolioSearch();
	autocompleteTrigramSearch();
	autocompleteCompanySearch();
	
	//
	if($("#install_identical_yn").val()=="1"){
		$("#install_company_name").attr("readonly", "true");
		$("#install_search_icon").hide();
	}
	
}

//alc 추가 - 입력폼(공통부분)
function alcAdminAddPopTable(mode, con){
	
	var table=cf.mkTag("table",con);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table_pop";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="고객사";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.width="30%";
	var input=cf.mkTag("input",td);
	input.id="company_name";
	input.name="company_name";
	input.style.width="50%";
	
	var input=cf.mkTag("input",td);
	input.id="company_id";
	input.name="company_id";
	input.type="hidden";
	
	span2=cf.mkTag("span",td);
	span2.innerHTML="&nbsp;";
	
	img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0, alcCompanySave);
	};
	
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="년도";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.style.width="30%";
	select=cf.mkTag("select",td);
	select.id="alc_year";
	select.name="alc_year";
	
	mkYearSelect(select);
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="사업장";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	select=cf.mkTag("select",td);
	select.id="place_of_business";
	select.name="place_of_business";
	
	mkSelect(select, PLACEOFBUSINESS, "", "Y");
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="영업담당자";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	select=cf.mkTag("select",td);
	select.id="sales_customer";
	select.name="sales_customer";
	
	mkSelect(select, SALES, "", "Y");
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Portfolio";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="portfolio";
	input.name="portfolio";
	input.style.width="50%";
	var span=cf.mkTag("span",td);
	span.innerHTML="&nbsp;(2자이상입력)";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Prd. Number";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="prd_number";
	input.name="prd_number";
	input.readOnly=true;
	input.style.width="50%";
	input.style.backgroundColor="#F2F2F2";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Trigram";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="trigram";
	input.name="trigram";
	input.style.width="50%";
	var span=cf.mkTag("span",td);
	span.innerHTML="&nbsp;(2자이상입력)";
	
	//list_price - 자동완성 검색시 금액을 담아 놓는다
	var input=cf.mkTag("input", td);
	input.type="hidden";
	input.id="temp_list_price";
	input.value="";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="Type";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="prd_type";
	input.name="prd_type";
	input.readOnly=true;
	input.style.width="50%";
	input.style.backgroundColor="#F2F2F2";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="Portfolio Item Name";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="portfolio_item_name";
	input.name="portfolio_item_name";
	input.readOnly=true;
	input.style.width=280+"px";
	input.style.backgroundColor="#F2F2F2";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.innerHTML="설치사동일";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	select=cf.mkTag("select",td);
	select.id="install_identical_yn";
	select.name="install_identical_yn";
	select.style.width=160+"px";
	
	if(mode == "M") {
		mkSelect(select, YN);
	}else{
		mkSelect(select, YN, "1");
	}
	
	select.onchange=function(){
		
		//설치사 동일이 N 이면
		if(this.value == 0) {
			
			$(".option_hidden").remove();
			
			alcAdminAddPopSubInstallCustomerTable("con_table");
			
		} else {
			
			//설치사 동일이 Y 이면
			alcAdminAddPopSubTable(table);
			
			$("#install_customer").remove();
			
			//설치사 정보
			$("#install_company_name").val($("#company_name").val());
			$("#install_company_id").val($("#company_id").val());
			$("#install_company_name").attr("readonly", "true");
			$("#install_search_icon").hide();
			
			$("#list_price").val($("#temp_list_price").val());
			
			//달력
			datePickerMonth("input_date", "yymmdd");
			datePickerMultiMonth("input_multi_date", "yymmdd", 2);
		}
	};
	
	alcAdminAddPopSubTable(table);
}

//alc 추가 - 입력폼(설치사 부분)
function alcAdminAddPopSubTable(con){
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="설치사";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.width="30%";
	var input=cf.mkTag("input",td);
	input.id="install_company_name";
	input.name="install_company_name";
	input.style.width="50%";
	
	var input=cf.mkTag("input",td);
	input.id="install_company_id";
	input.name="install_company_id";
	input.type="hidden";
	
	span2=cf.mkTag("span",td);
	span2.innerHTML="&nbsp;";
	
	span3=cf.mkTag("span",td);
	span3.id="install_search_icon";
	
	img=cf.mkTag("img",span3);
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
	img.id="";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0, alcInstallCompanySave);
	};
	
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.innerHTML="Copy";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.style.width="30%";
	var input=cf.mkTag("input",td);
	input.id="sub_qty";
	input.name="sub_qty";
	input.style.width="50%";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="발주기간";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="ordering_day";
	input.name="ordering_day";
	input.className="input_multi_date";
	input.readOnly=true;
	input.style.width=280+"px";
	input.onblur=function(){
		copyOrderDate(); //발주기간 -> 설치기간 복사
	};
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="설치기간";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="install_day";
	input.name="install_day";
	input.className="input_multi_date";
	input.readOnly=true;
	input.style.width=280+"px";
	
	var span=cf.mkTag("span",td);
	span.innerHTML="&nbsp;발주기간동일&nbsp;&nbsp;";
	
	var checkbox=cf.mkTag("input",td);
	checkbox.type="checkbox";
	checkbox.id="ordering_identical_yn";
	checkbox.name="ordering_identical_yn";
	checkbox.value="1";
	checkbox.onclick=function(){
		copyDate(this); //발주기간 동일
	};
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Target Id";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="target_id";
	input.name="target_id";
	input.style.width="50%";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="License Date";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="license_date";
	input.name="license_date";
	input.className="input_date";
	input.readOnly=true;
	input.style.width="50%";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="List Price";
	
	asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="list_price";
	input.name="list_price";
	input.style.width="50%";
	
	if(typeof $("#temp_list_price").val() == "undefined") {
		input.value="";
	}else{
		input.value=$("#temp_list_price").val();
	}
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="견적가";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="estimated_cost";
	input.name="estimated_cost";
	input.style.width="50%";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="구매일";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="purchase_date";
	input.name="purchase_date";
	input.className="input_date";
	input.readOnly=true;
	input.style.width="50%";
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="수금";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="collect_money";
	input.name="collect_money";
	input.style.width="50%";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="세금계산서기간";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="invoice_day";
	input.name="invoice_day";
	input.className="input_multi_date";
	input.readOnly=true;
	input.style.width=280+"px";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="계약기간";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="contract_day";
	input.name="contract_day";
	input.className="input_multi_date";
	input.readOnly=true;
	input.style.width=280+"px";
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="견적서 파일";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	var input=cf.mkTag("input",td);
	input.id="quote_file_name";
	input.name="quote_file_name";
	input.readOnly=true;
	input.style.width="50%";
	
	var input=cf.mkTag("input",td);
	input.id="quote_id";
	input.name="quote_id";
	input.type="hidden";
	
	span2=cf.mkTag("span",td);
	span2.innerHTML="&nbsp;";
	
	img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
	img.style.cursor="pointer";
	img.onclick=function(){
		quoteSrchPop(alcInstallQuoteSearch); //견적서 파일 찾기
	};
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="계약서 파일";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var input=cf.mkTag("input",td);
	input.id="contract_file_name";
	input.name="contract_file_name";
	input.readOnly=true;
	input.style.width="50%";
	
	var input=cf.mkTag("input",td);
	input.id="contract_id";
	input.name="contract_id";
	input.type="hidden";
	
	span2=cf.mkTag("span",td);
	span2.innerHTML="&nbsp;";
	
	img=cf.mkTag("img",td);
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
	img.style.cursor="pointer";
	img.onclick=function(){
		contractSrchPop(alcInstallContractSearch); //계약서 파일 찾기
	};
	
	//
	var tr=cf.mkTag("tr",con);
	tr.className="option_hidden";
	var th=cf.mkTag("th",tr);
	th.innerHTML="Stock";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	select=cf.mkTag("select",td);
	select.id="stock_yn";
	select.name="stock_yn";
	select.style.width=160+"px";
	
	mkSelect(select, YN);
	
	var th=cf.mkTag("th",tr);
	th.innerHTML="구매동의";
	
	///asterisk(th);
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	select=cf.mkTag("select",td);
	select.id="purchase_agreement_yn";
	select.name="purchase_agreement_yn";
	select.style.width=160+"px";
	
	mkSelect(select, YN);
}

//alc 추가 - 입력폼(설치사 부분) - 추가후 리스트 헤더
function alcAdminAddPopSubInstallCustomerTable(con_id){
	
	var con = document.getElementById(con_id);
	
	var mainCon=cf.mkTag("div",con);
	mainCon.id="install_customer";
	
	var con_empty=cf.mkTag("div",mainCon);
	con_empty.style.height="20px";
	
	var con_title_main=cf.mkTag("div",mainCon);
	con_title_main.style.height="30px";
	
	var con_title=cf.mkTag("div",con_title_main);
	con_title.className="mini_title";
	con_title.innerHTML="설치사 추가";
	con_title.style.cssFloat="left";
	
	var con_img=cf.mkTag("div",con_title_main);	
	con_img.style.cssFloat="right";
	var con_add_img=cf.mkTag("img",con_img);
	con_add_img.src="/images/btn/btn_plus_on.gif";
	con_add_img.onclick=alcInstallCustomerAddPop; //설치사 추가
	
	var con_del_img=cf.mkTag("img",con_img);
	con_del_img.src="/images/btn/btn_del_on.gif";
	con_del_img.onclick=alcInstallCustomerDel; //설치사 삭제
	
	var div=cf.mkTag("div",mainCon);
	div.className="Wrap_table";
	
	var table=cf.mkTag("table",div);
	table.width="100%";
	table.cellPadding="0";
	table.cellSpacing="0";
	table.className="project_table Normal_table";
	table.style.textAlign="center";
	
	var thead=cf.mkTag("thead",table);
	var tr=cf.mkTag("tr",thead);
	
	var	td=cf.mkTag("th",tr);
	td.width="10%";
	td.innerHTML="설치사명";
	
	var	td=cf.mkTag("th",tr);
	td.width="10%";
	td.innerHTML="Target Id";
	
	var	td=cf.mkTag("th",tr);
	td.width="5%";
	td.innerHTML="Copy";
	
	var	td=cf.mkTag("th",tr);
	td.width="17%";
	td.innerHTML="발주기간";
	
	var	td=cf.mkTag("th",tr);
	td.width="16%";
	td.innerHTML="설치기간";
	
	var	td=cf.mkTag("th",tr);
	td.width="16%";
	td.innerHTML="세금계산서기간";
	
	var	td=cf.mkTag("th",tr);
	td.width="16%";
	td.innerHTML="계약기간";
	
	var	td=cf.mkTag("th",tr);
	td.width="10%";
	td.innerHTML="License Date";
	td.className="right";
	
	var tbody=cf.mkTag("tbody",table);
	tbody.id="install_customer_body";
	
}

//alc 추가 - 입력폼(설치사 부분) - 설치사추가팝업
function alcInstallCustomerAddPop(){
	
	if($("#portfolio").val()==""){
		generalPop("portfolio를 입력하세요.");
		$("#portfolio").focus();
		return;
	}
	
	if($("#trigram").val()==""){
		generalPop("trigram을 입력하세요.");
		$("#trigram").focus();
		return;
	}
	
	if($("#prd_number").val()==""){
		generalPop("prd_number을 입력하세요.");
		$("#prd_number").focus();
		return;
	}
	
	var con=document.createElement("div");
	con.style.width=800+"px";
	con.style.height=cf.workareaheight-280+"px";
	con.style.position="absolute";
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_my";
	con1.style.width=800+"px";
	con1.style.height=cf.workareaheight-380+"px";
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="설치사 추가";
	
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
	
	var con4_title=cf.mkTag("div",con4);
	con4_title.className="mini_title";
	con4_title.innerHTML="설치사 추가";
	
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	var table=cf.mkTag("table",con6);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table_pop";
	
	//테이블
	alcAdminAddPopSubTable(table);
	
	var con6=cf.mkTag("div",con3),
	img1=cf.mkTag("img",con6),
	span=cf.mkTag("span",con6),
	img2=cf.mkTag("img",con6);

	con6.className="savebtn";
	img1.style.cursor="pointer";
	img2.style.cursor="pointer";
	img1.src="/images/pop_btn/btn_pop_add.png";
	img2.src="/images/pop_btn/btn_pop_cancel.gif";
	span.innerHTML="  ";
	
	img1.onclick=function(){
		installCustomerAppendList(con);
	};
		
	img2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	callPop(con);
	
	//달력
	datePickerMonth("input_date", "yymmdd");
	datePickerMultiMonth("input_multi_date", "yymmdd", 2);
	
	//설치사 자동완성
	autocompleteCompanySearch();
}

//alc 추가 - 입력폼(설치사 부분) - 설치사추가팝업 - 리스트추가
function installCustomerAppendList(con){
	
	if($("#install_company_id").val()==""){
		generalPop("설치사를 입력하세요.");
		$("#install_company_name").focus();
		return;
	}
	
	if($("#sub_qty").val()==""){
		generalPop("설치사 수량을 입력하세요.");
		$("#sub_qty").focus();
		return;
	}
	
	if($("#ordering_day").val()==""){
		generalPop("발주기간을 입력하세요.");
		return;
	}
	
	if($("#license_date").val()==""){
		generalPop("License Date를 입력하세요.");
		return;
	}
	
	if($("#list_price").val()==""){
		generalPop("List Price를 입력하세요.");
		$("#list_price").focus();
		return;
	}
	
	var obj = con.querySelectorAll("input, select");
	var new_obj={};
	obj.trav(function(d,i){
		
		if(d.name == 'ordering_identical_yn') {
			if($("#ordering_identical_yn").prop("checked") == true) {
				new_obj[d.name] = "1";
			} else {
				new_obj[d.name] = "0";
			}
		} else {
			new_obj[d.name] = d.value;
		}
	});
	
	//dir(new_obj);
	
	var tbody = document.getElementById("install_customer_body");
	
	var tr=cf.mkTag("tr",tbody);
	tr.style.cursor="pointer";
	tr.onmousedown=function(){
		if(pop_prev_tr==null){
			this.style.backgroundColor="#edfafb";
		}else{
			pop_prev_tr.style.backgroundColor="white";
			this.style.backgroundColor="#edfafb";
		}
		pop_prev_tr=this;
	};
	
	var	td=cf.mkTag("td",tr);
	td.width="10%";
	td.innerHTML=new_obj["install_company_name"];
	
	//
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_install_company_name";
	input.value=new_obj["install_company_name"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_install_company_id";
	input.value=new_obj["install_company_id"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_sub_qty";
	input.value=new_obj["sub_qty"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_ordering_day";
	input.value=new_obj["ordering_day"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_install_day";
	input.value=new_obj["install_day"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_ordering_identical_yn";
	input.value=new_obj["ordering_identical_yn"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_target_id";
	input.value=new_obj["target_id"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_license_date";
	input.value=new_obj["license_date"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_list_price";
	input.value=new_obj["list_price"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_estimated_cost";
	input.value=new_obj["estimated_cost"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_purchase_date";
	input.value=new_obj["purchase_date"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_collect_money";
	input.value=new_obj["collect_money"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_invoice_day";
	input.value=new_obj["invoice_day"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_contract_day";
	input.value=new_obj["contract_day"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_quote_file_name";
	input.value=new_obj["quote_file_name"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_quote_id";
	input.value=new_obj["quote_id"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_contract_file_name";
	input.value=new_obj["contract_file_name"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_contract_id";
	input.value=new_obj["contract_id"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_stock_yn";
	input.value=new_obj["stock_yn"];
	
	var	input=cf.mkTag("input",td);
	input.type="hidden";
	input.name="in_purchase_agreement_yn";
	input.value=new_obj["purchase_agreement_yn"];
	
	//
	var	td=cf.mkTag("td",tr);
	td.width="10%";
	td.innerHTML=new_obj["target_id"];
	
	var	td=cf.mkTag("td",tr);
	td.width="5%";
	td.innerHTML=new_obj["sub_qty"];
	
	var	td=cf.mkTag("td",tr);
	td.width="17%";
	td.innerHTML=new_obj["ordering_day"];
	
	var	td=cf.mkTag("td",tr);
	td.width="16%";
	td.innerHTML=new_obj["install_day"];
	
	var	td=cf.mkTag("td",tr);
	td.width="16%";
	td.innerHTML=new_obj["invoice_day"];
	
	var	td=cf.mkTag("td",tr);
	td.width="16%";
	td.innerHTML=new_obj["contract_day"];
	
	var	td=cf.mkTag("td",tr);
	td.width="10%";
	td.innerHTML=new_obj["license_date"];
	td.className="right";
	
	cf.killTag(con.parentNode);
}


//상세보기 - 설치사 - 견적서, 계약서 파일 리스트 팝업
function alcInstallCustomerFileListPop(mode, obj){
	
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
	if(mode=="quite"){
		span.innerHTML="견적서";
	}else{
		span.innerHTML="계약서";
	}
		
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
	
	//견적서, 계약서 파일 리스트
	alcInstallCustomerFileDetailList(mode, con5, obj);
	
	callPop(con);
}

//견적서, 계약서 리스트 테이블
function alcInstallCustomerFileDetailList(mode, con, obj){
	
	var table=cf.mkTag("table",con);
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="project_table Normal_table";
	table.style.textAlign="center";
	
	//
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.width="40%";
	if(mode=="quite"){
		th.innerHTML="견적서명";
	}else{
		th.innerHTML="계약서명";
	}
	
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
				if(mode=="quite"){
					window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + d.id));
				}else{
					window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=" + d.id));
				}			
			};
			td.style.cursor="pointer";
			td.style.textDecoration="underline";
			
			var td=cf.mkTag("td",tr);
			td.innerHTML=d.rivision;
		}
		
	});
	
}
