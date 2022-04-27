var prev_tr, pop_prev_tr;

//검색
function mkSearch(){
	var p = document.getElementById("searchDiv");
	p.innerHTML="";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span=cf.mkTag("span", bx1),
		ipt=cf.mkTag("input", bx1);
	span.innerHTML = "고객사명";
	ipt.id = "sh_company_name";
	ipt.name = "sh_company_name";
	ipt.type="text";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			alcStatusSearchList();
		}
	};
	mkHidden("","sh_company_id",bx1);
	var img=cf.mkTag("img",bx1);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0);
	};	
	cf.setCss(ipt,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx1,{width:"210px"});
	
	var bx2 = cf.mkTag("div", line1),
		span=cf.mkTag("span", bx2),
		ipt=cf.mkTag("input", bx2);
	span.innerHTML = "Project Code";
	ipt.id="contract_number";
	ipt.name="contract_number";
	ipt.type="text";
	ipt.className="input_eng";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			alcStatusSearchList();
		}
	};
	ipt.onfocus=function(){
		document.getElementById("sh_contract_number_id").value="";
		ipt.value="";
	};
	mkHidden("","sh_contract_number_id",bx1);
	var img=cf.mkTag("img",bx2);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		getProductCodePop("SUCCESS_Y");
	};	
	cf.setCss(ipt,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx2,{paddingLeft:"35px",width:"240px"});
		
	var bx3 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx3),
		select = cf.mkTag("select", bx3);
	span.innerHTML = "담당영업";
	select.id = "sh_sales_customer";
	select.name = "sh_sales_customer";
	mkSelect(select, SALES,"","Y");
	cf.setCss(select,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx3,{paddingLeft:"35px"});	
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		select = cf.mkTag("select", bx4);
	span.innerHTML = "년도";
	select.id = "sh_year";
	select.name = "sh_year";
	mkYearSelect(select,CurrentDate[0],true);
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px"});
	cf.setCss(bx4,{width:"110px"});
	
	var bx5 = cf.mkTag("div", line2),
		span1 = cf.mkTag("span", bx5),
		select = cf.mkTag("select", bx5),
		span2 = cf.mkTag("span", bx5);
	span1.innerHTML = "License Date";
	span2.innerHTML = "년";
	select.id = "sh_license_year";
	select.name = "sh_license_year";
	mkYearSelect(select,CurrentDate[0],true);
	select.value="";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span1,{paddingRight:"5px"});
	cf.setCss(span2,{paddingLeft:"5px"});
	cf.setCss(bx5,{paddingLeft:"35px"});
	
	var select2 = cf.mkTag("select", bx5),
		span = cf.mkTag("span", bx5);
	span.innerHTML = "월";
	select2.id = "sh_license_month";
	select2.name = "sh_license_month";
	mkMonthSelect(select2,CurrentDate[1],true);
	select2.value="";
	cf.setCss(select2,{width:"70px",marginLeft:"12px"});
	cf.setCss(span,{paddingLeft:"5px"});

	var bx6=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx6);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx6.className="cursor";
	bx6.onclick=function(){
		document.getElementById("sh_year").value=CurrentDate[0];
		document.getElementById("sh_company_name").value="";
		document.getElementById("sh_company_id").value="";
		document.getElementById("sh_sales_customer").value="";
		document.getElementById("sh_contract_number_id").value="";
		document.getElementById("contract_number").value="";
		document.getElementById("sh_license_year").value="";
		document.getElementById("sh_license_month").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = alcStatusSearchList;
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:"5px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left",paddingLeft:"20px"});
};
//리스트
function alcStatusList(obj) {
	var bodyList = document.getElementById("alcStatusView");
	bodyList.innerHTML="";
	
	var len=obj.length;

	if(len==0){
		var tr=cf.mkTag("tr",bodyList);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="7";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:"0px"});
	}else{
	
		obj.trav(function(d,i){
			//dir(d);
			
			var tr=cf.mkTag("tr",bodyList);
			tr.style.cursor="pointer";
			tr.style.textAlign="center";
			
			tr.onmousedown=function(){
				if(prev_tr==null){
					this.style.backgroundColor="#edfafb";
				}else{
					prev_tr.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev_tr=this;
				prev_tr.obj=d;
			};
			
			var td1=cf.mkTag("td",tr);
			td1.style.width="5%";
			td1.innerHTML=i+1;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width="10%";
			if(d.company_name==undefined){
				td2.innerHTML="";
			}else{
				td2.innerHTML=d.company_name;
			}
			
			var td3=cf.mkTag("td",tr);
			td3.style.width="10%";
			if(d.sales_project_code==undefined){
				td3.innerHTML="";
			}else{
				td3.innerHTML=d.sales_project_code;
			}
			
			var td4=cf.mkTag("td",tr);
			td4.style.width="15%";
			td4.innerHTML=d.portfolio;
			
			var td5=cf.mkTag("td",tr);
			td5.style.width="10%";
			td5.innerHTML=d.prd_number;
			
			var td6=cf.mkTag("td",tr);
			td6.style.width="10%";
			td6.innerHTML=d.prd_type;
			
			var td7=cf.mkTag("td",tr);
			td7.style.width="10%";
			td7.innerHTML=d.trigram;
			
			var td8=cf.mkTag("td",tr);
			td8.style.width="15%";
			td8.innerHTML=d.portfolio_item_name;
			
			var td9=cf.mkTag("td",tr);
			td9.style.width="5%";
			td9.innerHTML=d.qty;
			
			var td10=cf.mkTag("td",tr);
			td10.style.width="10%";
			td10.innerHTML="[상세보기]";
			td10.onclick=function (){
				alcStatusDetail(d);
			};
			
			if(i==0){
				cf.setCss(td1,{borderTop:"0px"});
				cf.setCss(td2,{borderTop:"0px"});
				cf.setCss(td3,{borderTop:"0px"});
				cf.setCss(td4,{borderTop:"0px"});
				cf.setCss(td5,{borderTop:"0px"});
				cf.setCss(td6,{borderTop:"0px"});
				cf.setCss(td7,{borderTop:"0px"});
				cf.setCss(td8,{borderTop:"0px"});
				cf.setCss(td9,{borderTop:"0px"});
				cf.setCss(td10,{borderTop:"0px"});				
			}
		});
	}
};