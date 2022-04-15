mkSearchDiv();
mkBtnDiv();
defaultLoadList();

function mkSearchDiv(){
	var p=document.getElementById("mksearch");
	p.innerHTML="";	
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_contract_year";
	select.name="sh_contract_year";
	mkYearSelect(select);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});

	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_contract_month";
	select.name="sh_contract_month";
	mkMonthSelect(select,CurrentDate[1],true);
	span.innerHTML="월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2);
	span.innerHTML = "고객사명";
	searchString = cf.mkTag("input", bx2);
	searchString.id="contract_company_name";
	searchString.type="text";
	searchString.className="input_han";
	searchString.onkeypress = function(e) {
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
	cf.setCss(searchString,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px",width:210+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx3 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx3);
	span.innerHTML = "구분";
	SELECT_type = cf.mkTag("select", bx3);
	cf.setCss(SELECT_type,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	
	var bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4);
	span.innerHTML = "영업현황";
	SELECT_status = cf.mkTag("select", bx4);
	SELECT_status.id="contract_sales_status_cd";
	cf.setCss(SELECT_status,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5);
	span.innerHTML = "Type";
	SELECT_brand = cf.mkTag("select", bx5);
	SELECT_brand.id="contract_brand_cd";
	cf.setCss(SELECT_brand,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});
	
	var bx6 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx6);
	span.innerHTML = "담당영업";
	SELECT_user = cf.mkTag("select", bx6);
	SELECT_user.id="contract_user_id";
	cf.setCss(SELECT_user,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx6,{paddingLeft:35+"px"});
	
	var bx7 = cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx7);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx7.className="cursor";
	bx7.onclick=function(){
		document.getElementById("sh_contract_year").value=CurrentDate[0];
		document.getElementById("sh_contract_month").value=CurrentDate[1];
		searchString.value="";
		SELECT_type.value="";
		SELECT_status.value="";
		SELECT_brand.value="";
		SELECT_user.value="";
	};
	
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go2 cursor";
	img.src="/images/btn/btn_go3.gif";
	img.style.cursor="pointer";
	img.onclick=searchAdmin;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left",paddingLeft:20+"px"});
};
function mkBtnDiv(){
	var p=document.getElementById("mkbtn");
	p.innerHTML="";
	
	var ul=cf.mkTag("ul",p),
		li1=cf.mkTag("li",ul),
		img1=cf.mkTag("img",li1),
		li2=cf.mkTag("li",ul),
		img2=cf.mkTag("img",li2);
	img2.id="modibtn";	
	img1.className="cursor";
	img2.className="cursor";
	img1.src="/images/btn/btn_plus_on.gif";
	img2.src="/images/btn/btn_modify_on.gif";
	img1.onclick=function(){
		contractPop("new");
	};
	img2.onclick=function(){
		if(!prev)generalPopOk2("수정할 계약서를 선택하세요.");
		//else contractPop("modi",prev.obj);
	};
};
function mkSelect(select, obj, def){
	var op;
	
	select.className="select_pop";
	op=cf.mkTag("option",select);
	op.value="";
	op.innerHTML="선택안함";
	
	obj.trav(function(d,i){
		op=cf.mkTag("option",select);
		op.value=obj[i].code_id;
		op.innerHTML=obj[i].code_name;
		if(def && obj[i].code_name==def){
			op.selected="selected";
		}
	});
};
function contractList(obj){
	var p=document.getElementById("contractTb"),
		box=document.getElementById("contract_contents");
	box.innerHTML="";
	var len=obj.length;
	if(len==0){
		var tr=cf.mkTag("tr",box);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="5";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
	}else{
		obj.trav(function(d,i){
			var tr=cf.mkTag("tr",box);
			tr.style.textAlign="center";
			tr.style.cursor="pointer";
			tr.onclick=function(){
				var modibtn=document.getElementById("modibtn"),
					chk=LOGINFO.grant_id.indexOf("7"),
					userid=LOGINFO.user_id;
				if(prev==null){
					this.style.backgroundColor="#edfafb";
				}else{
					prev.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev=this;
				prev.obj=d;
				if(userid==d.creator){
					modibtn.src="/images/btn/btn_modify_on.gif";
					modibtn.className="cursor";
					modibtn.onclick=function(){
						contractPop("modi",prev.obj);
					};
				}else{
					if(chk>=0){
						modibtn.src="/images/btn/btn_modify_on.gif";
						modibtn.className="cursor";
						modibtn.onclick=function(){
							contractPop("modi",prev.obj);
						};
					}else{
						modibtn.src="/images/btn/btn_modify_off.gif";
						modibtn.className="";
						modibtn.onclick=function(){
							generalPopOk2("수정 권한이 없습니다.");
						};
					}
				}
			};
			
			var td1=cf.mkTag("td",tr);
			td1.style.width=5+"%";
			td1.innerHTML=i+1;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width=15+"%";
			td2.innerHTML=d.contract_project_code;

			var td3=cf.mkTag("td",tr);
			td3.style.width=30+"%";
			td3.innerHTML=d.contract_name;
			td3.className="txt_left pd10";
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=35+"%";
			td4.className="txt_left pd10";
			
			if(d.contract_file_name != '' && d.contract_file_name != null && d.contract_file_name != undefined){
				var aTagImg = cf.mkTag("img", td4);
				aTagImg.src = "/images/ico/ico_filedown.gif";
				aTagImg.onclick = function(){
					javascript:window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=" + d.contract_id));
				};
			}
			var aTag = cf.mkTag("a", td4);
			//aTag.href = 'javascript:window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=' + d.contract_id + '"))';
			aTag.onclick = function(){
				javascript:window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=" + d.contract_id));
			};
			aTag.textContent = d.contract_file_name; 
			aTag.style.textDecoration="underline";
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=5+"%";
			td5.innerHTML=d.contract_rivision;
			
			var td6=cf.mkTag("td",tr);
			td6.className="right";
			td6.style.width=15+"%";
			td6.style.cursor="pointer";
			td6.innerHTML="[버전이력상세]";
			td6.onclick=function(){
				var op={pjcode : d.contract_project_code};				
				callContractDetailData(op, function(data){
					data.salesContractRivisionList.trav(function(g,idx){
						if(!g.contract_project_code)g.contract_project_code="";
						if(!g.contract_name)g.contract_name="";
						if(!g.contract_file_name)g.contract_file_name="";
						if(!g.contract_rivision)g.contract_rivision="";
						if(!g.contract_user_name)g.contract_user_name="";
						if(!g.creation_date)g.creation_date="";
					});
					contractDetailPop(data.salesContractRivisionList);
				});
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
	cf.setCss(p,{height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px"});
};
