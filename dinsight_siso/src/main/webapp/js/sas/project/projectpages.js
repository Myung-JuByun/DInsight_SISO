mkSearchDiv();
defaultLoadList();

function mkSearchDiv() {
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_project_year";
	select.name = "sh_sales_project_year";
	mkYearSelect(select,CurrentDate[0],true);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_sales_project_month";
	select.name = "sh_sales_project_month";
	mkMonthSelect(select,CurrentDate[1],true);
	span.innerHTML = "월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2),
		select = cf.mkTag("select", bx2);
	select.id = "win_gb";
	select.name = "win_gb";
	span.innerHTML = "Success";
	mkSelectYN(select,1);
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:7+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px"});

	var bx3=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx3),
		ipt=cf.mkTag("input", bx3);
	span.innerHTML = "고객사명";
	ipt.id = "sh_company_name";
	ipt.name = "sh_company_name";
	ipt.type="text";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			formSearch();
		}
	};
	var img=cf.mkTag("img",bx3);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0);
	};	
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px",width:210+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		select = cf.mkTag("select", bx4);
	span.innerHTML = "구분";
	select.id = "sh_sales_type_cd";
	select.name = "sh_sales_type_cd";
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});

	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		select = cf.mkTag("select", bx5);
	span.innerHTML = "영업현황";
	select.id = "sh_sales_status_cd";
	select.name = "sh_sales_status_cd";
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});
	
	var bx6 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx6),
		select = cf.mkTag("select", bx6);
	span.innerHTML = "Type";
	select.id = "sh_brand_cd";
	select.name = "sh_brand_cd";
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx6,{paddingLeft:35+"px"});
	
	var bx7 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx7),
		select = cf.mkTag("select", bx7);
	span.innerHTML = "담당영업";
	select.id = "sh_user_id";
	select.name = "sh_user_id";
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx7,{paddingLeft:35+"px"});

	var bx8=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx8);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx8.className="cursor";
	bx8.onclick=function(){
		document.getElementById("sh_sales_project_year").value=CurrentDate[0];
		document.getElementById("sh_sales_project_month").value=CurrentDate[1];
		document.getElementById("win_gb").value="0";
		document.getElementById("sh_company_name").value="";
		document.getElementById("sh_sales_type_cd").value="";
		document.getElementById("sh_sales_status_cd").value="";
		document.getElementById("sh_brand_cd").value="";
		document.getElementById("sh_user_id").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = formSearch;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left"});
	cf.setCss(bx8,{float:"left",paddingLeft:20+"px"});
};
//리스트 데이터 가공
function dataShowList(appendId, data) {
	var p = document.getElementById("pCodeTable");
	cf.setCss(p,{height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px"});
	//초기화
	$(appendId).empty();	
	//데이터 생성
	var jsonLength = data.length;
	var HTML 	= "";
	var win_gb 	= "";
	
	if(jsonLength > 0) {
	
		for(var cnt=0; cnt<jsonLength; cnt++) {
			
			if(data[cnt].win_gb == "X") win_gb = "N";
			else						win_gb = "Y";
			
			HTML += "<tr style='text-align:center'>";
			HTML += "	<td><input type='checkbox' class='in_sales_project_id' name='in_sales_project_id' value='" + data[cnt].sales_project_id + "'></td>";
			HTML += "	<td>" + data[cnt].sales_project_year + "</td>";
			HTML += "	<td>" + data[cnt].sales_project_month + "</td>";
			HTML += "	<td>" + data[cnt].sales_project_code + "</td>";
			HTML += "	<td>" + data[cnt].sales_type_cd_name + "</td>";
			HTML += "	<td>" + data[cnt].company_name + "</td>";
			HTML += "	<td>" + data[cnt].brand_cd_name + "</td>";
			HTML += "	<td>" + data[cnt].module + "</td>";
			HTML += "	<td>" + win_gb + "</td>";
			HTML += "	<td>" + data[cnt].sales_status_cd_name + "</td>";
			HTML += "	<td>" + data[cnt].user_name + "</td>";
			HTML += "	<td class='price_padding'>" + set_comma(data[cnt].contract_estimate_price) + "</td>";
			HTML += "	<td class='price_padding'>" + set_comma(data[cnt].cost_price) + "</td>";
			HTML += "	<td class='price_padding'>" + set_comma(data[cnt].profit_price) + "</td>";
			HTML += "	<td class='right'>" + data[cnt].closing + "</th>";
			HTML += "</tr>";
		}
	} else {
		HTML += "<tr style='text-align:center'>";
		HTML += "	<td colspan='16'>조회된 데이터가 없습니다.</td>";
		HTML += "</tr>";
	}
	$(appendId).append(HTML);
};
function statusInfo(){
	STATUS_info=document.getElementById("status_info").childNodes[0];
	STATUS_info.className="ico_info";
	var img=cf.mkTag("img",STATUS_info);
	img.src="/images/ico/ico_info.png";
	img.style.cursor="pointer";
	img.onclick=function(){
		var con=document.createElement("div");
		con.style.width=400+"px";
		con.style.height=280+"px";
		con.style.position="absolute";
		//con.style.backgroundColor="white";
		
		con.innerHTML="";
		
		var con0=cf.mkTag("div",con);
		con0.className="pop-mypage";
		
		var con1=cf.mkTag("div",con0);
		con1.id="pop_my";
		//con1.className="my_top";
		con1.style.width=400+"px";
		con1.style.height=280+"px";
		con1.style.border=2+"px solid black";
		con1.style.backgroundColor="white";
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="영업 현황";
		
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
		con3.style.height=210+"px";
		con3.style.marginTop=20+"px";
		con3.style.overflowY="auto";
		
		var con4=cf.mkTag("div",con3);
		con4.className="Wrap_table";
				
		var table=cf.mkTag("table",con4);
		table.cellpadding=0;
		table.cellspacing=0;
		table.className="Normal_table_pop";
		
		STATUSLIST.trav(function(d,i){
			var tr=cf.mkTag("tr",table);
			var th=cf.mkTag("th",tr);
			var td=cf.mkTag("td",tr);
			td.className="pd10 right";
			th.innerHTML=d.codeName;
			td.innerHTML=d.etc1;
			
		});
		callPop(con);
	};
};