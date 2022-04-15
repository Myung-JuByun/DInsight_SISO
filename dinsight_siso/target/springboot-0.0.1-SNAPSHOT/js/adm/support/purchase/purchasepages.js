function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		title=cf.mkTag("div", line1),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	title.innerHTML = "기준 년월";
	select.id = "prev_purchase_year";
	select.name = "prev_purchase_year";
	mkYearSelect(select,CurrentDate[0]);
	select.onchange=function(){
		selcChange();
	};
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "prev_purchase_month";
	select.name = "prev_purchase_month";
	mkMonthSelect(select,CurrentDate[1]);
	select.onchange=function(){
		selcChange();
	};
	span.innerHTML = "월";
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});

	var str = cf.mkTag("span", bx1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	str.innerHTML="~";
	select.id = "next_purchase_year";
	select.name = "next_purchase_year";
	mkYearSelect(select,CurrentDate[0]);
	select.onchange=function(){
		selcChange();
	};
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(str,{marginRight:12+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "next_purchase_month";
	select.name = "next_purchase_month";
	mkMonthSelect(select,CurrentDate[1]);
	select.onchange=function(){
		selcChange();
	};
	span.innerHTML = "월";
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx2=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx2),
		ipt=cf.mkTag("input", bx2);
	span.innerHTML = "Project Code";
	ipt.type="text";
	ipt.id="ipt_purchase_project_code";
	ipt.className="input_eng";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)defaultLoadList();
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	
	var bx3=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx3),
		ipt=cf.mkTag("input", bx3);
	span.innerHTML = "매입처";
	ipt.type="text";
	ipt.id="ipt_creditor_name";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)defaultLoadList();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px"});
	
	var bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		ipt=cf.mkTag("input", bx4);
	span.innerHTML = "매출처";
	ipt.id="ipt_debtor_name";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)defaultLoadList();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		ipt=cf.mkTag("input", bx5);
	span.innerHTML = "담당자";
	ipt.id="ipt_purchase_staff_name";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if(e.keyCode == 13)defaultLoadList();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});
	
	var bx6=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx6);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx6.className="cursor";
	bx6.onclick=function(){
		document.getElementById("prev_purchase_year").value=CurrentDate[0];
		document.getElementById("prev_purchase_month").value=CurrentDate[1];
		document.getElementById("next_purchase_year").value=CurrentDate[0];
		document.getElementById("next_purchase_month").value=CurrentDate[1];
		document.getElementById("ipt_purchase_project_code").value="";
		document.getElementById("ipt_creditor_name").value="";
		document.getElementById("ipt_debtor_name").value="";
		document.getElementById("ipt_purchase_staff_name").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = defaultLoadList;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(title,{float:"left",fontWeight:"bold",paddingRight:12+"px",paddingTop:6+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left",paddingLeft:20+"px"});
};
function setInputValue(result){
	//앞에서 setInputValue 하기전에 uploading .. 중입니다. 여기서 없애기
	var tbd=document.getElementById("purchaseView");
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
			var tr=cf.mkTag("tr",tbd);
			var td=cf.mkTag("td",tr);//NO
			td.innerHTML=i+1;
			td.style.textAlign="center";
			
			var td2=cf.mkTag("td",tr); //일자
			td2.innerHTML=d.purchase_day;
			td2.style.textAlign="center";
			
			var td3=cf.mkTag("td",tr); //pj코드
			td3.innerHTML=d.purchase_project_code;
			td3.style.textAlign="center";
			
			var td4=cf.mkTag("td",tr); //담당
			td4.innerHTML=d.purchase_staff_name;
			td4.style.textAlign="center";
			td4.style.paddingLeft=6+"px";
			
			var td5=cf.mkTag("td",tr); //매입처
			td5.innerHTML=d.creditor_name;
			td5.style.textAlign="left";
			td5.style.paddingLeft=6+"px";
			
			var td6=cf.mkTag("td",tr);//품목명
			td6.innerHTML=d.item_name;
			td6.style.textAlign="left";
			td6.style.paddingLeft=6+"px";
			
			var td7=cf.mkTag("td",tr);//매출처
			td7.innerHTML=d.debtor_name;
			td7.style.textAlign="left";
			td7.style.paddingLeft=6+"px";
			td7.style.paddingRight=6+"px";
			
			var td8=cf.mkTag("td",tr);
			var comma_supley=comma(d.purchase_supply_price);
			td8.innerHTML=comma_supley;
			td8.style.textAlign="right";
			td8.style.paddingRight=6+"px";
			
			var td9=cf.mkTag("td",tr);
			var comma_tax=comma(d.purchase_tax);
			td9.innerHTML=comma_tax;
			td9.style.textAlign="right";
			td9.style.paddingRight=6+"px";
			
			var td10=cf.mkTag("td",tr);
			var comma_total=comma(d.purchase_total_price);
			td10.innerHTML=comma_total;
			td10.style.textAlign="right";
			td10.style.paddingRight=6+"px";
			td10.className="right";
		});
		rowCount=true;
	}
	selcflag = true;
};