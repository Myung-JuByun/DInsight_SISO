//페이지 새로고침 시에 팝업 닫기
window.onbeforeunload=function(){
	if(prev_salespop01&&prev_salespop01.pop&&(prev_salespop01.flag=="modi"||prev_salespop01.flag=="new")){
		prev_salespop01.pop.close();
	}
};
mkSearchDiv();
defaultLoadList();
function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_product_sales_year";
	select.name = "sh_product_sales_year";
	mkYearSelect(select,CurrentDate[0]);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_product_sales_month";
	select.name = "sh_product_sales_month";
	mkMonthSelect(select,CurrentDate[1],true);
	span.innerHTML = "월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});

	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx2=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx2);
	searchCompany=cf.mkTag("input", bx2);
	span.innerHTML = "고객사명";
	searchCompany.type="text";
	searchCompany.className="input_han";
	searchCompany.onkeypress = function(e) {
		if (e.keyCode == 13) {
			searchAdmin();
		}
	};
	var img=cf.mkTag("img",bx2);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0);
	};	
	cf.setCss(searchCompany,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{width:210+"px"});//paddingLeft:21+"px"
	
	var bx3=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx3);
	searchContract=cf.mkTag("input", bx3);
	span.innerHTML = "Project Code";
	searchContract.type="text";
	searchContract.className="input_eng";
	searchContract.onkeypress = function(e) {
		if (e.keyCode == 13) {
			searchAdmin();
		}
	};
	var img=cf.mkTag("img",bx3);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		getProductCodePop("SUCCESS_N", "searchPjtCode");
	};	
	cf.setCss(searchContract,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px",width:240+"px"});
	
	var bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4);
	span.innerHTML = "브랜드";
	SELECT_brand = cf.mkTag("select", bx4);
	cf.setCss(SELECT_brand,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx5);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx5.className="cursor";
	bx5.onclick=function(){
		document.getElementById("sh_product_sales_year").value=CurrentDate[0];
		document.getElementById("sh_product_sales_month").value=CurrentDate[1];
		searchCompany.value="";
		searchContract.value="";
		SELECT_brand.value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = searchAdmin;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left",paddingLeft:20+"px"});
	mkBtnDiv();
};
function mkBtnDiv(){
	var p=document.getElementById("mkbtn");
	p.innerHTML="";
	
	var ul=cf.mkTag("ul",p),
		li1=cf.mkTag("li",ul),
		img1=cf.mkTag("img",li1),
		li2=cf.mkTag("li",ul),
		img2=cf.mkTag("img",li2);
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img2.src="/images/btn/btn_modify_on.gif";
	img1.onclick=function(){
		callpopup("new",1);
	};
	img2.onclick=function(){
		if(!prev){
			generalPopOk2("수정할 매출품의를 선택하세요");
			return;
		}else{
			if(prev.obj.status_cd=="701"||prev.obj.status_cd=="703"||prev.obj.status_cd=="707"){
				callpopup("modi",prev.obj.degree,prev.obj.sales_confer_id,prev.obj.status_cd);	
			}else generalPopOk2("제출 중에는 수정할 수 없습니다.");			
		}
	};
};
function productAdminList(obj){
	var p = document.getElementById("prdTb"),
		box=document.getElementById("product_contents");
	box.innerHTML="";
	var len=obj.length;

	if(len==0){
		var tr=cf.mkTag("tr",box);
		tr.style.textAlign="center";		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="11";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
	}else{
		obj.trav(function(d,i){
			var tr=cf.mkTag("tr",box);
			tr.style.textAlign="center";
			tr.style.cursor="pointer";
			tr.onclick=function(){
				if(prev==null){
					this.style.backgroundColor="#edfafb";
				}else{
					prev.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev=this;
				prev.obj=d;
			};
			
			var td1=cf.mkTag("td",tr);
			td1.style.width=4+"%";
			td1.innerHTML=i+1;

			var td2=cf.mkTag("td",tr);
			td2.style.width=8+"%";
			td2.innerHTML=modiDate(d.insert_date,".");
			
			var td3=cf.mkTag("td",tr);
			td3.style.width=15+"%";
			td3.innerHTML=d.contract_number;
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=12+"%";
			td5.innerHTML=d.company_name;
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=6+"%";
			td4.innerHTML=d.sales_confer_kind_name;
			
			var td6=cf.mkTag("td",tr);
			td6.style.width=12+"%";
			td6.className="payment_input";
			td6.innerHTML=comma(d.total_contract_price);
			
			var td7=cf.mkTag("td",tr);
			td7.style.width=11+"%";
			td7.className="payment_input";
			td7.innerHTML=comma(d.purchase_price);
			
			var td8=cf.mkTag("td",tr);
			td8.style.width=11+"%";
			td8.className="payment_input";
			td8.innerHTML=comma(d.profit_price);
			
			var td9=cf.mkTag("td",tr);
			td9.style.width=6+"%";
			td9.innerHTML=d.degree;
			
			var td10=cf.mkTag("td",tr);
			td10.style.width=8+"%";
			td10.innerHTML=d.status_nm;
			
			var td11=cf.mkTag("td",tr);
			td11.style.width=7+"%";
			td11.className="right";
			td11.innerHTML="[버전정보]";
			td11.onclick=function(){
				var op={contract_number:d.contract_number,sales_confer_kind:d.sales_confer_kind};
				callProductSalesDetailData(op, function(data){
					productDetailPop(data.salesDetailList);
				});
			};
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
				cf.setCss(td7,{borderTop:0+"px"});
				cf.setCss(td8,{borderTop:0+"px"});
				cf.setCss(td9,{borderTop:0+"px"});
				cf.setCss(td10,{borderTop:0+"px"});
				cf.setCss(td11,{borderTop:0+"px"});
			}
		});
	}
	cf.setCss(box,{wordBreak:"break-all"});
	cf.setCss(p,{height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px"});
};