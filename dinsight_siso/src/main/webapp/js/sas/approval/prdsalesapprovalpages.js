var prev_tr;

//검색
function mkSearch(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_year";
	select.name = "sh_expanse_year";
	mkYearSelect(select);
	span.innerHTML="년";
	select.onchange=function(){
		prdSalesApprovalList();
	};
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:187+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_month";
	select.name = "sh_expanse_month";
	mkMonthSelect(select);
	span.innerHTML="월";
	select.onchange=function(){
		prdSalesApprovalList();
	};
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2),
		select = cf.mkTag("select", bx2);
	span.innerHTML = "구분";
	select.id = "sh_status_cd";
	select.name = "sh_status_cd";
	mkSelect(select,STATUS);
	select.onchange=function(){
		prdSalesApprovalList();
	};
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px"});
	
	/*var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick=function(){
		prdSalesApprovalList();
	};*/
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
};
//리스트
function approvalList(obj){
	var bodyList = document.getElementById("approvalView");
	bodyList.innerHTML="";
	
	var len=obj.length;

	if(len==0){
		var tr=cf.mkTag("tr",bodyList);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="6";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
	}else{
		
		obj.trav(function(d,i){
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
			td1.style.width=5+"%";
			td1.innerHTML=i+1;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width=30+"%";
			td2.innerHTML=d.approval_name;
			
			var td3=cf.mkTag("td",tr);
			td3.style.width=14+"%";
			td3.innerHTML=d.status_cd_name;
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=18+"%";
			td4.innerHTML=d.user_name;
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=18+"%";
			td5.innerHTML=d.creation_date;
			
			var td6=cf.mkTag("td",tr);
			td6.style.width=15+"%";
			td6.innerHTML="[상세보기]";
			td6.onclick=function (){
				if(d.status_cd == "1701") {
					callpopup("approval");
				}else{
					callpopup("view");
				}
			};
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
			}
		});
	}
};