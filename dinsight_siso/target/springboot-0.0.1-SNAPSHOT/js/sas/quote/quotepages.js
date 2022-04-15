mkSearchDiv();
mkBtnDiv();
defaultLoadListInit();
	
function mkSearchDiv(){
	var p=document.getElementById("mksearch");
	p.innerHTML="";	
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_quote_year";
	select.name="sh_quote_year";
	mkYearSelect(select);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});

	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_quote_month";
	select.name="sh_quote_month";
	mkMonthSelect(select,CurrentDate[1],true);
	span.innerHTML="월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2);
	span.innerHTML = "고객사명";
	searchString = cf.mkTag("input", bx2);
	searchString.id="quote_company_name";
	searchString.type="text";
	searchString.className="input_han";
	searchString.onkeypress = function(e) {
		if (e.keyCode == 13) {
			searchAdmin();
		}
	};
	var img=cf.mkTag("img",bx2);
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
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
	SELECT_status.id="quote_sales_status_cd";
	cf.setCss(SELECT_status,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5);
	span.innerHTML = "Type";
	SELECT_brand = cf.mkTag("select", bx5);
	SELECT_brand.id="quote_brand_cd";
	cf.setCss(SELECT_brand,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});
	
	var bx6 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx6);
	span.innerHTML = "담당영업";
	SELECT_user = cf.mkTag("select", bx6);
	SELECT_user.id="quote_user_id";
	cf.setCss(SELECT_user,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx6,{paddingLeft:35+"px"});
	
	var bx7 = cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx7);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx7.className="cursor";
	bx7.onclick=function(){
		document.getElementById("sh_quote_year").value=CurrentDate[0];
		document.getElementById("sh_quote_month").value=CurrentDate[1];
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
		quotePop();
	};
	img2.onclick=function(){
		if(!prev)generalPopOk2("수정할 견적서를 선택하세요.");
		//else contractPop("modi",prev.obj);
	};
};
function quoteList(obj){
	var p = document.getElementById("quoteTb"),
		box=document.getElementById("quote_contents");
	box.innerHTML="";
	var len=obj.length;
	if(len==0){
		var tr=cf.mkTag("tr",box);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="7";
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
						quotePop(true,prev.obj);
					};
				}else{
					if(chk>=0){
						modibtn.src="/images/btn/btn_modify_on.gif";
						modibtn.className="cursor";
						modibtn.onclick=function(){
							quotePop(true,prev.obj);
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
			td2.innerHTML=d.quote_project_code;
			var ipt=cf.mkTag("input", td2);
			ipt.type="hidden";
			ipt.value=d.quote_id;
	
			var td3=cf.mkTag("td",tr);
			td3.style.width=30+"%";
			td3.innerHTML=d.quote_name;
			td3.className="txt_left pd10";
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=35+"%";
			td4.className="txt_left pd10";			
				if(d.quote_file_name != '' && d.quote_file_name != null && d.quote_file_name != undefined){
					var aTagImg = cf.mkTag("img", td4);
					aTagImg.src = "/images/ico/ico_filedown.gif";
					aTagImg.onclick = function(){
						javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + d.quote_id));
					}
				}			
			var aTag = cf.mkTag("a", td4);
			aTag.onclick = function(){
				javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + d.quote_id));
			};
			aTag.textContent = d.quote_file_name; 
			aTag.style.textDecoration="underline";
			aTag.style.cursor="pointer";
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=5+"%";
			td5.innerHTML=d.quote_rivision;
			
			var td6=cf.mkTag("td",tr);
			td6.className="right";
			td6.style.width=15+"%";
			td6.style.cursor="pointer";
			td6.innerHTML="[버전이력상세]";
			td6.onclick=function(){
				var op={pjcode : d.quote_project_code};
				callQuoteDetailData(op, function(data){
					data.salesQuoteRivisionList.trav(function(g,idx){
						if(!g.quote_project_code)g.quote_project_code="";
						if(!g.quote_name)g.quote_name="";
						if(!g.quote_file_name)g.quote_file_name="";
						if(!g.quote_rivision)g.quote_rivision="";
						if(!g.quote_user_name)g.quote_user_name="";
						if(!g.creation_date)g.creation_date="";
					});
					quoteDetailPop(d.quote_project_code,data.salesQuoteRivisionList);
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
function quoteDetailPop(str,obj){
	var con=document.createElement("div");
	con.style.width=900+"px";
	con.style.height=450+"px";
	con.style.position="absolute";
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con),	
		con1=cf.mkTag("div",con0);
	con1.style.width=900+"px";
	con1.style.height=450+"px";
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
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	con3.style.height=350+"px";
	con3.style.overflowY="auto";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	
	var con4_title=cf.mkTag("div",con4);
	con4_title.className="mini_title";
	con4_title.innerHTML="견적서 버전 리스트";
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
	
	var thead=cf.mkTag("div",con5);
	mkDetailhead(thead);
	
	var tbody=cf.mkTag("div",con5);
	mkDetailbody(tbody, obj);

	callPop(con);
};
function mkDetailhead(son){
	var table=cf.mkTag("table",son);
	table.style.width=100+"%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width=15+"%";
	th.innerHTML="Project code";
	var th=cf.mkTag("th", tr);
	th.style.width=23+"%";
	th.innerHTML="견적서명";
	var th=cf.mkTag("th", tr);
	th.style.width=30+"%";
	th.innerHTML="파일";
	var th=cf.mkTag("th", tr);
	th.style.width=5+"%";
	th.innerHTML="버전";
	var th=cf.mkTag("th", tr);
	th.style.width=10+"%";
	th.innerHTML="수정자";
	var th=cf.mkTag("th", tr);
	th.style.width=17+"%";
	th.className="right";
	th.innerHTML="수정일";
};
function mkDetailbody(son, obj){
	var table=cf.mkTag("table",son);
	table.style.width=100+"%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",table);
		var td1=cf.mkTag("td", tr);
		td1.className="pd10 txt_center";
		td1.style.width=15+"%";
		td1.innerHTML=d.quote_project_code;
		
		var td2=cf.mkTag("td", tr);
		td2.className="pd10";
		td2.style.width=23+"%";
		td2.innerHTML=d.quote_name;
		
		var td3=cf.mkTag("td", tr);
		td3.className="pd10";
		td3.style.width=30+"%";
		
		if(d.quote_file_name != '' && d.quote_file_name != null && d.quote_file_name != undefined){
			var aTagImg = cf.mkTag("img", td3);
			aTagImg.src = "/images/ico/ico_filedown.gif";
			aTagImg.onclick = function(){
				javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + d.quote_id));
			}
		}		
		var aTag = cf.mkTag("a", td3);
		//aTag.href = 'javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=' + d.quote_id + '"))';
		aTag.onclick = function(){
			javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + d.quote_id));
		}
		aTag.textContent = d.quote_file_name; 
		aTag.style.textDecoration="underline";
		aTag.style.cursor="pointer";
		
		var td4=cf.mkTag("td", tr);
		td4.style.textAlign="center";
		td4.style.width=5+"%";
		td4.innerHTML=d.quote_rivision;
		
		var td5=cf.mkTag("td", tr);
		td5.style.textAlign="center";
		td5.style.width=10+"%";
		td5.innerHTML=d.quote_user_name;
		
		var td6=cf.mkTag("td", tr);
		td6.className="right";
		td6.style.textAlign="center";
		td6.style.width=17+"%";
		td6.innerHTML=d.creation_date;
		
		if(i==0){
			cf.setCss(td1,{borderTop:0+"px"});
			cf.setCss(td2,{borderTop:0+"px"});
			cf.setCss(td3,{borderTop:0+"px"});
			cf.setCss(td4,{borderTop:0+"px"});
			cf.setCss(td5,{borderTop:0+"px"});
			cf.setCss(td6,{borderTop:0+"px"});
		}
	});
};
function quotePop(opt,data){
	var con=document.createElement("div");
	con.style.width=450+"px";
	if(!opt) con.style.height=237+"px";
	else con.style.height=269+"px";
	
	con.style.position="absolute";
	con.className="pop_add"
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	
	var con1=cf.mkTag("div",con0);
	con1.style.width=450+"px";
	if(!opt) con1.style.height=237+"px";
	else con1.style.height=269+"px";
	
	con1.style.border=2+"px solid black";
	con1.style.backgroundColor="white";
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	if(!opt) span.innerHTML="&nbsp&nbsp&nbsp&nbsp견적서 등록";
	else span.innerHTML="&nbsp&nbsp&nbsp&nbsp견적서 수정";
	
	var div=cf.mkTag("div",con1),
		span=cf.mkTag("sapn",div);
	div.className="descript asterisk pdl20";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";
	
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
	con3.className="my-container popmargin35";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
	
	if(!opt) mkAddTable(con5);
	else mkModiTable(con5,data);
	
	var con6=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con6),
		btn2=cf.mkTag("button",con6);	
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey small";
	btn2.className="ct-btn grey small";
	
	if(!opt)btn1.innerHTML="추가";
	else btn1.innerHTML="수정";
	btn2.innerHTML="취소";
	
	btn1.onclick=function(){
		quoteSave(con, opt);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function mkAddTable(son){
	var table=cf.mkTag("table",son);
	table.style.width=100+"%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width=100+"px";
	th.innerHTML="Project code";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.style.width=95+"%";
	ipt.readOnly=true;
	ipt.value="선택하세요.";
	ipt.onclick=getProductCodePop;
	var ipt=cf.mkTag("input",td);
	ipt.id="quoteid";
	ipt.type="hidden";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcodeid";
	ipt.type="hidden";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="견적서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="quotename";
	ipt.className="input_han";
	ipt.style.width=95+"%";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="파일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="uploadFile";
	ipt.type="file";
	ipt.style.width=95+"%";
};
function mkModiTable(son,data){
	var table=cf.mkTag("table",son);
	table.style.width=100+"%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width=100+"px";
	th.innerHTML="Project code";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.style.width=95+"%";
	ipt.value=data.quote_project_code;
	ipt.readOnly=true;
	cf.setCss(ipt,{width:95+"%",backgroundColor:"#eee"});
	var ipt=cf.mkTag("input",td);
	ipt.id="quoteid";
	ipt.type="hidden";
	ipt.value=data.quote_id;
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcodeid";
	ipt.type="hidden";
	ipt.value=data.quote_project_code_id;
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="견적서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="quotename";
	ipt.className="input_han";
	ipt.style.width=95+"%";
	ipt.value=data.quote_name;
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="파일";
	th.style.height = "64px";
	var span=cf.mkTag("span",th);
	var td=cf.mkTag("td",tr);
	td.rowSpan = "2";
	var aTagImg = cf.mkTag("img", td);
	aTagImg.src = "/images/ico/ico_filedown.gif";
	aTagImg.onclick = function(){
		javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + data.quote_id));
	}
	var aTag = cf.mkTag("a", td);
	aTag.onclick = function(){
		javascript:window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + data.quote_id));
	}
	aTag.style.textDecoration="underline";
	aTag.style.cursor="pointer";
	
	var con_file_name = data.quote_file_name; 
	if(con_file_name.length > 21){
		con_file_name = con_file_name.substring(0,21) + "...";
	}
	aTag.title = data.quote_file_name; 
	aTag.textContent = con_file_name;
	
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="uploadFile";
	ipt.type="file";
	ipt.style.marginTop = "5px";
	ipt.style.width=95+"%";
};