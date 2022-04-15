var prevC;

function mkSearchDiv(){
	var arr=[{code_id:0,code_name:"전체"},{code_id:1,code_name:"매입"},{code_id:2,code_name:"매출"}];
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		title=cf.mkTag("div", line1),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	title.innerHTML = "기준 년월";
	select.id = "startYear";
	select.name = "startYear";
	mkYearSelect(select,CurrentDate[0]);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "startMonth";
	select.name = "startMonth";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});

	var str = cf.mkTag("span", bx1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	str.innerHTML="~";
	select.id = "endYear";
	select.name = "endYear";
	mkYearSelect(select,CurrentDate[0]);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(str,{marginRight:12+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "endMonth";
	select.name = "endMonth";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx2=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx2),
		select=cf.mkTag("select", bx2);
	span.innerHTML="구분";
	select.id="win_gb";
	select.name="win_gb";
	mkSelect(select,arr);
	cf.setCss(select,{width:80+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	
	var bx3=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx3),
		ipt=cf.mkTag("input", bx3);
	span.innerHTML="Project Code";
	ipt.id="in_project_code";
	ipt.type="text";
	ipt.className="input_eng";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)formSearch();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px"});

	var bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		ipt=cf.mkTag("input", bx4);
	span.innerHTML="담당자";
	ipt.id="in_staff_name";
	ipt.type="text";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)formSearch();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx5);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx5.className="cursor";
	bx5.onclick=function(){
		document.getElementById("startYear").value=CurrentDate[0];
		document.getElementById("startMonth").value=CurrentDate[1];
		document.getElementById("endYear").value=CurrentDate[0];
		document.getElementById("endMonth").value=CurrentDate[1];
		document.getElementById("win_gb").value="0";
		document.getElementById("in_project_code").value="";
		document.getElementById("in_staff_name").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = formSearch;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(title,{float:"left",fontWeight:"bold",paddingRight:12+"px",paddingTop:6+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left",paddingLeft:20+"px"});
};
function setInputValue(result){
	//앞에서 setInputValue 하기전에 uploading .. 중입니다. 여기서 없애기
	var tbd=document.getElementById("statusBody");
	tbd.innerHTML="";

	if(rowCount){
		var tr=cf.mkTag("tr",tbd);
		tr.style.textAlign="center";

		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="17";
		td.innerHTML="조회된 데이터가 없습니다.";
		rowCount=false;
	}else{
		result.trav(function(d,i){
			if ( d.ord === "3" ) {
				var dataPanel = document.getElementById("sales_total");
				var price =  d.sales_price_sum;
				setNumberData ( dataPanel, price );

				var dataPanel = document.getElementById("purchase_total");
				var price =  d.purchase_price_sum;
				setNumberData ( dataPanel, price );

				var dataPanel = document.getElementById("gp1_total");
				var price =  d.sales_GP_sum;
				setNumberData ( dataPanel, price );

				var dataPanel = document.getElementById("gp2_total");
				var price =  d.gp;
				setNumberData ( dataPanel, price );
			} else {
				var tr=cf.mkTag("tr",tbd);

				var td=cf.mkTag("td",tr);//NO
				td.innerHTML=i+1;
				td.style.textAlign="center";

				var td2=cf.mkTag("td",tr); //pj코드
				td2.innerHTML=d.project_code;
				td2.style.textAlign="center";
				if ( d.project_code != "" ) {
					td2.onmousemove=function(){
						this.style.cursor="pointer";
					};
					td2.onclick=function(){
						var obj = {in_project_code:d.project_code};
						$.ajax({
							url: "/adm/salesPurchaseStatusPopAjax",
							type: "POST",
							data: obj,
							dataType: "json",
							success : function (data) {
								if(data.length>0)rowCount=false;
					        	else rowCount=true;
								showPopupWin(d, data);
								$('.wrap-loading').hide(20);
							},
							beforeSend:function(){
								$('.wrap-loading').show();
							}
						});
					};
				};
				var td3=cf.mkTag("td",tr); //담당자
				td3.innerHTML=d.staff_name;
				td3.style.textAlign="left";
				td3.style.paddingLeft=6+"px";

				var td5=cf.mkTag("td",tr); //매출처
				td5.innerHTML=d.client_name;
				td5.style.textAlign="left";
				td5.style.paddingLeft=6+"px";

				var td6=cf.mkTag("td",tr);//매출공급가
				var price = d.sales_price_sum;
				setNumberData ( td6, price );

				var td7=cf.mkTag("td",tr);//매입공급가
				var price = d.purchase_price_sum;
				setNumberData ( td7, price );

				var td8=cf.mkTag("td",tr); //품의상GP
				var price = d.sales_GP_sum;
				setNumberData ( td8, price );

				var td9=cf.mkTag("td",tr); //GP정산
				var price = d.gp;
				setNumberData ( td9, price );
			}
		});
		rowCount=true;
	}
};
function showPopupWin( d , data) {
	var con = document.createElement("div");
	con.id="layerPop";
	con.style.position="absolute";
	con.style.width="1150px";
	con.style.height="720px";
	con.style.display = "block";
	con.style.top = "50px";
	con.style.left = "50px";

	var con2 = cf.mkTag("div", con);
	con2.className="my_top";
	con2.textContent = "매입 매출 현황";

	var con2_a = cf.mkTag("a", con2);
	con2_a.href = "#";
	con2_a.className = "my_top_closs";
	var con2_img = cf.mkTag("img", con2_a);
	con2_img.src = "/images/pop_btn/btn_pop_close.png";
	con2_img.id = "my_closs";
	con2_img.alt = "닫기";
	con2_img.align = "right";
	con2_img.onclick = function() {
		cf.killTag(con.parentNode);
	};

	var con3 = cf.mkTag("div", con);
	con3.className="my_container";
	con3.style.height="640px";
	con3.style.overflowY="none";

	var con3_1 = cf.mkTag("div", con3);
	con3.className="my-container";

	var con4_1 = cf.mkTag("div", con3_1);  // table들이 들어갈곳
	con4_1.className="con_table";

	var con4_2 = cf.mkTag("div", con3_1);  //save버튼들어갈곳
	con4_2.style.marginTop="20px";

	/////////////////////////////////////////////////////////////////////
	var con5 = cf.mkTag("div", con4_1);  ////맨 위에 table, 클릭한거 정보나옴
	con5.className="Wrap_table";
	con5.style.marginBottom="20px";
	con5.style.width="100%";
	con5.style.textAlign="center";

	var table1 = cf.mkTag("table", con5);
	table1.className="Normal_table";

	var tbody = cf.mkTag("tbody",table1);
	var tr=cf.mkTag("tr", tbody);

	var th1=cf.mkTag("th",tr);
	th1.textContent="프로젝트 코드";
	th1.style.width="200px";

	var td1=cf.mkTag("td",tr); //DB_ 프로젝트코드
	td1.textContent=d.project_code;

	var th2=cf.mkTag("th",tr);
	th2.textContent="담당자";
	th2.style.width="150px";

	var td2=cf.mkTag("td",tr);  //DB_ 담당자
	td2.textContent=d.staff_name;

	var th3=cf.mkTag("th",tr);
	th3.textContent="GP정산";
	th3.style.width="200px";

	var td3=cf.mkTag("td",tr);  //DB_ GP정산
	td3.textContent=d.gp;
	
	///////////////////////////매출시작/////////////////////////////////////////////////
	var con6 = cf.mkTag("div", con4_1);  // miniTiTle 매출
	con6.textContent = "매출";
	con6.className="mini_title";

	var salesDiv = cf.mkTag("div", con4_1);  //매출DIV, 매출Table들어갈곳
	salesDiv.className="Wrap_table";

	var purchaseDiv_title = cf.mkTag("div", salesDiv);
	purchaseDiv_title.className="div_overflow_y_scroll";

	var purchaseDiv_title_tb=cf.mkTag("table",purchaseDiv_title);
	purchaseDiv_title_tb.className="scrollTable";
	purchaseDiv_title_tb.cellPadding="0px";
	purchaseDiv_title_tb.cellSpacing="0px";
	purchaseDiv_title_tb.style.width="100%";
	var title_tb_thead=cf.mkTag("thead",purchaseDiv_title_tb);
	var title_tr=cf.mkTag("tr",title_tb_thead);

	var title_tr_th1=cf.mkTag("th",title_tr);
	title_tr_th1.width="5%";
	title_tr_th1.textContent = "NO";

	var title_tr_th2=cf.mkTag("th",title_tr);
	title_tr_th2.width="15%";
	title_tr_th2.textContent = "일자";

	var title_tr_th3=cf.mkTag("th",title_tr);
	title_tr_th3.width="10%";
	title_tr_th3.textContent = "거래처";

	var title_tr_th4=cf.mkTag("th",title_tr);
	title_tr_th4.width="20%";
	title_tr_th4.textContent = "품목명";

	var title_tr_th5=cf.mkTag("th",title_tr);
	title_tr_th5.width="10%";
	title_tr_th5.textContent = "품목구분";

	var title_tr_th6=cf.mkTag("th",title_tr);
	title_tr_th6.width="10%";
	title_tr_th6.textContent = "공급가";

	var title_tr_th7=cf.mkTag("th",title_tr);
	title_tr_th7.width="10%";
	title_tr_th7.textContent = "세액";

	var title_tr_th8=cf.mkTag("th",title_tr);
	title_tr_th8.width="10%";
	title_tr_th8.textContent = "합계";

	var title_tr_th9=cf.mkTag("th",title_tr);
	title_tr_th9.textContent = "순이익";
	title_tr_th9.width="10%";
	title_tr_th9.className="right";

	var salesDiv_main = cf.mkTag("div", salesDiv);
	salesDiv_main.className="div_overflow_main";

	salesDiv_main.style.height="170px";

	//sales DATA 넣기
	data.salesResult.trav(function(d,i){
		if((i+1)<data.salesResult.length){
			var main_table=cf.mkTag("table",salesDiv_main);
			main_table.className="scrollTable";
			main_table.cellSpacing="0px";
			main_table.cellPadding="0px";
			main_table.width="100%";

			//dir(d);
			var main_tb_tr=cf.mkTag("tr",main_table);
			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="5%";
			m_td.style.textAlign="center";
			m_td.textContent=i+1;

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="15%";
			m_td.style.textAlign="center";
			m_td.textContent=d.sales_day;

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="10%";
			m_td.style.textAlign="center";
			m_td.textContent=d.sales_client_name;

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="20%";
			m_td.style.textAlign="center";
			m_td.textContent=d.item_name;

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="10%";
			m_td.style.textAlign="center";
			m_td.textContent=d.item_div_name;

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="10%";
			var price = d.sales_supply_price;
			setNumberData ( m_td, price );

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="10%";
			var price = d.sales_tax;
			setNumberData ( m_td, price );

			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.style.width="10%";
			var price = d.sales_total_price;
			setNumberData ( m_td, price );


			var m_td=cf.mkTag("td",main_tb_tr);
			m_td.className="right";
			m_td.style.width="10%";
			var price = d.sales_GP;
			setNumberData ( m_td, price );
		}

		if((i+1)==data.salesResult.length){
			//dir(d);
			var salesDiv_foot = cf.mkTag("div", salesDiv);
			salesDiv_foot.className="div_overflow_y_scroll";

			var s_foot_tb=cf.mkTag("table",salesDiv_foot);
			s_foot_tb.className="scrollTable";
			s_foot_tb.cellPadding="0px";
			s_foot_tb.cellSpacing="0px";
			s_foot_tb.style.width="100%";

			var s_foot_tb_tbody=cf.mkTag("tbody",s_foot_tb);
			var s_foot_tr=cf.mkTag("tr",s_foot_tb_tbody);

			var s_foot_td1=cf.mkTag("td",s_foot_tr);
			s_foot_td1.style.textAlign="center";
			s_foot_td1.style.fontWeight="bold";
			s_foot_td1.textContent = "합계";
			s_foot_td1.className="sum";


			var s_foot_td2=cf.mkTag("td",s_foot_tr);
			s_foot_td2.style.textAlign="right";
			s_foot_td2.style.paddingRight="6px";
			s_foot_td2.style.width="10%";
			s_foot_td2.className="sum";
			var price = d.sales_supply_price;
			setNumberData ( s_foot_td2, price );			
			

			var s_foot_td3=cf.mkTag("td",s_foot_tr);
			s_foot_td3.style.textAlign="right";
			s_foot_td3.style.paddingRight="6px";
			s_foot_td3.style.width="10%";
			s_foot_td3.className="sum";
			var price = d.sales_tax;
			setNumberData ( s_foot_td3, price );			

			var s_foot_td4=cf.mkTag("td",s_foot_tr);

			s_foot_td4.style.textAlign="right";
			s_foot_td4.style.paddingRight="6px";
			s_foot_td4.style.width="10%";
			s_foot_td4.className="sum";
			var price = d.sales_total_price;
			setNumberData ( s_foot_td4, price );			

			var s_foot_td5=cf.mkTag("td",s_foot_tr);

			s_foot_td5.style.textAlign="right";
			s_foot_td5.style.paddingRight="6px";
			s_foot_td5.style.width="10%";
			s_foot_td5.style.fontWeight="bold";
			s_foot_td5.className="sum right";
			var price = d.sales_GP;
			setNumberData ( s_foot_td5, price );			
		}
	});


    ///////////////////////////////매출 끝//////////////////////////////////////////
	var con7 = cf.mkTag("div", con4_1);  // miniTiTle 매입
	con7.style.marginTop="20px";
	con7.textContent = "매입";
	con7.className="mini_title";

	var purchaseDiv = cf.mkTag("div", con4_1);  //매출DIV, 매출Table들어갈곳
	purchaseDiv.className="Wrap_table";

	var purchaseDiv_title = cf.mkTag("div", purchaseDiv);
	purchaseDiv_title.className="div_overflow_y_scroll";

	var purchaseDiv_title_tb=cf.mkTag("table",purchaseDiv_title);
	purchaseDiv_title_tb.className="scrollTable";
	purchaseDiv_title_tb.cellPadding="0px";
	purchaseDiv_title_tb.cellSpacing="0px";
	purchaseDiv_title_tb.style.width="100%";
	var p_title_tb_thead=cf.mkTag("thead",purchaseDiv_title_tb);
	var t_title_tr=cf.mkTag("tr",p_title_tb_thead);


	var p_title_tr_th2=cf.mkTag("th",t_title_tr);
	p_title_tr_th2.width="5%";
	p_title_tr_th2.textContent = "No";
	
	var p_title_tr_th2=cf.mkTag("th",t_title_tr);
	p_title_tr_th2.width="10%";
	p_title_tr_th2.textContent = "일자";	

	var t_title_tr_th3=cf.mkTag("th",t_title_tr);
	t_title_tr_th3.width="20%";
	t_title_tr_th3.textContent = "매입처";

	var t_title_tr_th4=cf.mkTag("th",t_title_tr);
	t_title_tr_th4.width="20%";
	t_title_tr_th4.textContent = "품목명";

	var t_title_tr_th6=cf.mkTag("th",t_title_tr);
	t_title_tr_th6.width="15%";
	t_title_tr_th6.textContent = "공급가";

	var t_title_tr_th7=cf.mkTag("th",t_title_tr);
	t_title_tr_th7.width="15%";
	t_title_tr_th7.textContent = "세액";

	var t_title_tr_th8=cf.mkTag("th",t_title_tr);
	t_title_tr_th8.width="15%";
	t_title_tr_th8.textContent = "합계";


	var purchaseDiv_main = cf.mkTag("div", purchaseDiv);
	purchaseDiv_main.className="div_overflow_main";

	purchaseDiv_main.style.height="167px";

	data.purchaseResult.trav(function(d,i){
		console.dir(d);
		if((i+1)<data.purchaseResult.length){
			var t_main_table2=cf.mkTag("table",purchaseDiv_main);
			t_main_table2.className="scrollTable";
			t_main_table2.cellSpacing="0px";
			t_main_table2.cellPadding="0px";
			t_main_table2.width="100%";

			//dir(d);
			var t_main_tb_tr=cf.mkTag("tr",t_main_table2);
			
			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="5%";
			m_td.style.textAlign="center";
			m_td.textContent=i+1;
			

			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="10%";
			m_td.style.textAlign="center";
			m_td.textContent=d.purchase_day;

			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="20%";
			m_td.style.textAlign="center";
			m_td.textContent=d.creditor_name;
			
			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="20%";
			m_td.style.textAlign="center";
			m_td.textContent=d.item_name;

			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="15%";
			var price = d.purchase_supply_price;
			setNumberData ( m_td, price );

			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="15%";
			var price = d.purchase_tax;
			setNumberData ( m_td, price );


			var m_td=cf.mkTag("td",t_main_tb_tr);
			m_td.style.width="15%";
			m_td.className="right";
			var price = d.purchase_total_price;
			setNumberData ( m_td, price );
		}

		if((i+1)==data.purchaseResult.length){
			//dir(d);
			var purchase_div_foot = cf.mkTag("div", purchaseDiv);
			purchase_div_foot.className="div_overflow_y_scroll";

			var t_foot_tb=cf.mkTag("table",purchase_div_foot);
			t_foot_tb.className="scrollTable";
			t_foot_tb.cellPadding="0px";
			t_foot_tb.cellSpacing="0px";
			t_foot_tb.style.width="100%";

			var t_foot_tb_tbody=cf.mkTag("tbody",t_foot_tb);
			var t_foot_tr=cf.mkTag("tr",t_foot_tb_tbody);

			var t_foot_td1=cf.mkTag("td",t_foot_tr);
			t_foot_td1.style.textAlign="center";
			t_foot_td1.style.fontWeight="bold";
			t_foot_td1.textContent = "합계";
			t_foot_td1.className="sum";
			

			var t_foot_td3=cf.mkTag("td",t_foot_tr);
			t_foot_td3.style.textAlign="right";
			t_foot_td3.style.paddingRight="6px";
			t_foot_td3.style.width="15%";
			t_foot_td3.className="sum";
			var price = d.purchase_supply_price;
			setNumberData ( t_foot_td3, price );			

			var t_foot_td4=cf.mkTag("td",t_foot_tr);

			t_foot_td4.style.textAlign="right";
			t_foot_td4.style.paddingRight="6px";
			t_foot_td4.style.width="15%";
			t_foot_td4.className="sum";
			var price = d.purchase_tax;
			setNumberData ( t_foot_td4, price );			

			var t_foot_td5=cf.mkTag("td",t_foot_tr);

			t_foot_td5.style.textAlign="right";
			t_foot_td5.style.paddingRight="6px";
			t_foot_td5.style.width="15%";
			t_foot_td5.style.fontWeight="bold";
			t_foot_td5.className="sum right";
			var price = d.purchase_total_price;
			setNumberData ( t_foot_td5, price );			
		}
	});
	callPop(con);
};