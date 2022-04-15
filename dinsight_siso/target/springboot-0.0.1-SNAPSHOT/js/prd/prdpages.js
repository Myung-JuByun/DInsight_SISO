
defaultLoadList();
function defaultLoadList(){
	var p=document.getElementById("Center_wrap"),
		con=cf.mkTag("div",p);
	prdpages(con);
	prdLoadList01();
};
function prdpages(p){
	var srchdv=cf.mkTag("div",p),
		btndv=cf.mkTag("div",p),
		iptdv=cf.mkTag("div",p),
		btnul=cf.mkTag("ul",btndv),
		li1=cf.mkTag("li",btnul),
		cl1=cf.mkTag("div",p),
		condv=cf.mkTag("div",p),
		wdv=cf.mkTag("div",condv),
		tbhead=cf.mkTag("div",wdv),
		tbcont=cf.mkTag("div",wdv),
		cl2=cf.mkTag("div",p),
		pagedv=cf.mkTag("div",p);
	//span1.innerHTML="※고객사명 선택시 상세정보를 확인하실 수 있습니다.";
	srchdv.className="search3";
	srchdv.id="searchDiv";
	btndv.className="btn_action";
	condv.className="con_table";
	wdv.className="Wrap_table";
	tbcont.id="prdTb01";
	pagedv.id="prd_page";
	var str1=cf.mkTag("div",iptdv),
		sel1=cf.mkTag("select",iptdv),
		str2=cf.mkTag("div",iptdv),
		btndv1=cf.mkTag("div",li1),
		img1=cf.mkTag("img",btndv1);
	mkPageSelect(sel1);
	sel1.id="rownum";
	sel1.onchange=function(){
		prdSrchList01();
	};
	str1.innerHTML="정렬";
	str2.innerHTML="개수";
	img1.alt="자료 올리기";
	img1.src="/images/btn/btn_exlup_on.gif";
	btndv1.onclick=function(){
		prdUploadPop();
		//prdLoadList03(true);
	};
	mkDiv_srch(srchdv);
	mkList_head(tbhead);
	mkList_body(tbcont,[]);
	mkprd_page(pagedv);
	
	cf.setCss(btndv1,{cursor:"pointer"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(iptdv,{width:260+"px",float:"left",marginTop:-25+"px",position:"absolute"});
	cf.setCss(sel1,{width:60+"px",float:"left"});
	cf.setCss(str1,{marginTop:5+"px",marginRight:5+"px",float:"left"});
	cf.setCss(str2,{marginTop:5+"px",marginLeft:5+"px",float:"left"});
	cf.setCss(pagedv,{marginTop:15+"px"});
	cf.setCss(tbhead,{width:100+"%"});
	cf.setCss(tbcont,{width:100+"%",height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px",overflowY:"scroll"});
	//cf.setCss(wdv,{overflowY:"scroll"});
};
function mkDiv_srch(p){
	p.innerHTML="";	
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_year";
	mkYearSelect(select);
	span.innerHTML="년도";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx2=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx2),
		ipt=cf.mkTag("input",bx2);
	span.innerHTML="Trigram";
	ipt.id="trigram";
	ipt.onkeypress=function(e){
		if(e.keyCode==13)prdSrchList01();
	};
	cf.setCss(ipt,{width:80+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	
	var bx3=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx3),
		ipt=cf.mkTag("input",bx3);
	span.innerHTML="Type";
	ipt.id="prd_type";
	ipt.onkeypress=function(e){
		if(e.keyCode==13)prdSrchList01();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px"});
	
	var bx4=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx4),
		ipt=cf.mkTag("input",bx4);
	span.innerHTML="Prd. Number";
	ipt.id="prd_number";
	ipt.onkeypress=function(e){
		if(e.keyCode==13)prdSrchList01();
	};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx5),
		ipt=cf.mkTag("input",bx5);
		span.innerHTML="Portfolio";
		ipt.id="portfolio";
		ipt.onkeypress=function(e){
			if(e.keyCode==13)prdSrchList01();
		};
	cf.setCss(ipt,{width:100+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});	
	
	var bx6=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx6);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx6.className="cursor";
	bx6.onclick=function(){
		document.getElementById("sh_year").value=CurrentDate[0];
		document.getElementById("trigram").value="";
		document.getElementById("prd_type").value="";
		document.getElementById("prd_number").value="";
		document.getElementById("portfolio").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = prdSrchList01;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left",paddingLeft:20+"px"});
};
function mkprd_page(p){
	p.innerHTML="";
	var cvr=cf.mkTag("div",p),
		leftpad,max_pages=prd_page.distinct(1);	
	if(prd_page.length==0){
		var dv=cf.mkTag("div",cvr);
		dv.innerHTML=1;
		dv.pg=1;
		cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold",border:1+"px solid #c9c9c9"});
		cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",cursor:"pointer"});
	}else{
		if(prd_page.length>10){
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML="<<";
			dv.onclick=function(){
				var chk;
				prd_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[0])generalPopOk2("더 이상 앞으로 이동할 수 없습니다.");
				else{
					var b;
					prd_page.trav(function(d,i){
						if(d[0]==1)b=d[3];
					});
					CUR_PAGE.navi=1;
					CUR_PAGE.pg=1;
					CUR_PAGE.sp=1;
					CUR_PAGE.plen=b;
					prdSrchPageList01();				
				}
			};
			cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",marginRight:10+"px",cursor:"pointer",border:1+"px solid #c9c9c9"});
			
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML="<";
			dv.val="-10";
			dv.onclick=function(){
				var chk;
				prd_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[0])generalPopOk2("더 이상 앞으로 이동할 수 없습니다.");
				else{
					var a,b;
					prd_page.trav(function(d,i){
						if(d[0]==CUR_PAGE.pg-10){
							a=d[2];
							b=d[3];
						}
					});
					CUR_PAGE.navi=CUR_PAGE.navi-1;
					CUR_PAGE.pg=a;
					CUR_PAGE.sp=a;
					CUR_PAGE.plen=b;
					prdSrchPageList01();				
				}
			};
			cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",marginRight:10+"px",cursor:"pointer",border:1+"px solid #c9c9c9"});
		}
		prd_page.trav(function(d,i){
			if(!CUR_PAGE&&i==0){
				var dv=cf.mkTag("div",cvr);
				dv.innerHTML=d[0];
				CUR_PAGE=dv;
				CUR_PAGE.pg=d[0];
				CUR_PAGE.navi=d[1];
				CUR_PAGE.sp=d[2];
				CUR_PAGE.plen=d[3];
				cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold",border:1+"px solid #c9c9c9"});
				cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",cursor:"pointer",marginLeft:-1+"px"});
			}else{
				if(d[1]==CUR_PAGE.navi){
					var dv=cf.mkTag("div",cvr);
					dv.innerHTML=d[0];
					dv.pg=d[0];
					dv.navi=d[1];
					dv.sp=d[2];
					dv.plen=d[3];
					dv.onclick=function(){
						if(CUR_PAGE)cf.setCss(CUR_PAGE,{backgroundColor:"#fff",color:"#222",fontWeight:"normal"});
						cf.setCss(this,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold"});
						CUR_PAGE=this;
						CUR_PAGE.pg=this.pg;
						CUR_PAGE.navi=this.navi;
						CUR_PAGE.sp=this.sp;
						CUR_PAGE.plen=this.plen;
						prdSrchPageList01();
					};
					if(CUR_PAGE&&CUR_PAGE.pg==d[0])cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold"});
					if(MAX_PAGE==1)cf.setCss(dv,{border:1+"px solid #c9c9c9"});
					else{
						cf.setCss(dv,{border:1+"px solid #c9c9c9"});
					}
					cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",cursor:"pointer",marginLeft:-1+"px"});
				}
			}
		});
		if(prd_page.length>10){
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML=">";
			dv.val="10";
			dv.onclick=function(){
				var chk,len=max_pages.length;
				prd_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[len-1])generalPopOk2("더 이상 뒤로 이동할 수 없습니다.");
				else{
					var a,b;
					prd_page.trav(function(d,i){
						if(d[0]==(CUR_PAGE.navi*10)+1){
							a=d[2];
							b=d[3];
						}
					});
					CUR_PAGE.navi=CUR_PAGE.navi+1;
					CUR_PAGE.pg=a;
					CUR_PAGE.sp=a;
					CUR_PAGE.plen=b;
					prdSrchPageList01();
				}
			};
			cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",marginLeft:10+"px",cursor:"pointer",border:1+"px solid #c9c9c9"});
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML=">>";
			dv.onclick=function(){
				var chk,len=max_pages.length;
				prd_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[len-1])generalPopOk2("더 이상 뒤로 이동할 수 없습니다.");
				else{
					var a,b;
					prd_page.trav(function(d,i){
						if(d[1]==max_pages[len-1]){
							a=d[2];
							b=d[3];
							return;
						}
					});
					CUR_PAGE.navi=max_pages[len-1];
					CUR_PAGE.pg=a;
					CUR_PAGE.sp=a;
					CUR_PAGE.plen=b;
					prdSrchPageList01();
				}
			};
			cf.setCss(dv,{float:"left",width:30+"px",height:23+"px",paddingTop:7+"px",marginLeft:10+"px",cursor:"pointer",border:1+"px solid #c9c9c9"});
		}
	}
	var cw=document.getElementById("Center_wrap").clientWidth;
	if(CUR_PAGE){
		leftpad=(cw/2)-(CUR_PAGE.plen*32)/2;
		if(prd_page.length>10)leftpad=leftpad-70;
	}else leftpad=(cw/2)-(1*32)/2;
	if(leftpad<0)leftpad=60;
	cf.setCss(cvr,{position:"relative",left:leftpad+"px",textAlign:"center",height:32+"px",maxWidth:480+"px"});
	cf.setCss(p,{position:"relative",width:100+"%",paddingBottom:0+"px",zIndex:99});
};
function mkList_head(p){
	p.innerHTML="";
	var tds=new TABLE({
		p:p,
		arr:[],
		mode:false,
		header:[["No.","Price list date","Portfolio","Trigram","Type","Prd. Number","PLC","ALC","QLC","YLC","상세보기"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j);				
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{background:"#fafafa",height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",borderTop:0+"px",
			fontWeight:"600",textAlign:"center",fontSize:12+"px"});
		if(j==10)cf.setCss(col,{borderRight:0+"px"});
		if(j==0)cf.setCss(col,{borderLeft:0+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
		}
		if(j==0)cf.setCss(col,{width:49+"px"});
		else if(j==1)cf.setCss(col,{width:89+"px"});
		else if(j==3)cf.setCss(col,{width:99+"px"});
		else if(j==4)cf.setCss(col,{width:119+"px"});
		else if(j==5)cf.setCss(col,{width:139+"px"});
		else if(j==6||j==7||j==8||j==9)cf.setCss(col,{width:79+"px"});
		else if(j==10)cf.setCss(col,{width:85+"px"});
	};	
};
function mkList_body(p,data){
	p.innerHTML="";
	prev_prd01="";
	if(!data||data.length==0){
		var tds=new TABLE({
			p:p,
			arr:[["조회된 데이터가 없습니다."]],
			mode:false,
			header:[],
			colspans:[{y:1, x:0, howmany:25}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					cf.setCss(col,{borderTop:0+"px"});
					commonstyle(row,i,col,j);
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:p,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					prd01_tablecellaction(tds,data,row,i,col,j);
					commonstyle(row,i,col,j);					
				}				
			});
		});
	}
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
			cf.setCss(col,{borderTop:0+"px"});
		}
		col.className="txtclr";
		if(j==0)cf.setCss(col,{width:49+"px"});
		else if(j==1)cf.setCss(col,{width:89+"px"});
		else if(j==3)cf.setCss(col,{width:99+"px"});
		else if(j==4)cf.setCss(col,{width:119+"px"});
		else if(j==5)cf.setCss(col,{width:139+"px"});
		else if(j==6||j==7||j==8||j==9)cf.setCss(col,{width:79+"px"});
		else if(j==10)cf.setCss(col,{width:67+"px"});
		else if(j==11)cf.setCss(col,{display:"none"});
	};
};
function prd01_tablecellaction(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==1){
		if(txt.length==10) txt="("+modiDate(txt.substring(1,9),".")+")";
		else if(txt.length==8)txt=modiDate(txt,".");
		else txt="-";
		col.innerHTML=txt;
	}else if(j==6||j==7||j==8||j==9){
		if(txt)col.innerHTML=comma(txt*1);
		else col.innerHTML="-";
	}else if(j==10){
		col.innerHTML="[상세보기]";
		col.onclick=function(){
			if(!prev_prd01){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_prd01.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_prd01=this.parentNode;
			prev_prd01.data=data[i];
			
			prdLoadList02({price_list_date:data[i][1],portfolio:data[i][2],prd_number:data[i][5],prd_type:data[i][4],trigram:data[i][3],revision:data[i][11]});
			prdLoadList02_rev({price_list_date:data[i][1],portfolio:data[i][2],prd_number:data[i][5],prd_type:data[i][4],trigram:data[i][3],revision:data[i][11]});
			prdInfoPop(data[i][2],data[i][11]);
		};
		cf.setCss(col,{cursor:"pointer"});//,textDecoration:"underline"
	}else col.innerHTML=txt;
	
	/*col.onmousedown=function(){
		if(!prev_prd01){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_prd01.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_prd01=this.parentNode;
		prev_prd01.data=data[i];
	};*/
	col.onmousemove=function(){
		if(!prev_prd01){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_prd01.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_prd01=this.parentNode;
		//prev_prd01.data=data[i];
	};
};
function prdUploadPop(chk){
	var con=document.createElement("div"),
		con1=cf.mkTag("div",con),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a),
		title=cf.mkTag("div",con1),
		con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con4),
		con6=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con6),
		btn2=cf.mkTag("button",con6);
	
	con.className="pop-mypage";	
	con1.id="pop_my";
	con2.className="my_top";
	span.innerHTML="엑셀 업로드";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	con3.className="my-container popmargin35";
	title.className="descript asterisk pdl20";
	title.innerHTML="* 표시는 필수 입력 항목입니다.";
	con4.className="con_table";	
	con5.className="Wrap_table";
	
	prdUploadPopTb01(con5);
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey normal";
	btn1.innerHTML="저장";
	btn1.onclick=function(){
		prdExcelSave(con);
	};	
	btn2.className="ct-btn grey normal";
	btn2.innerHTML="취소";
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};	
	cf.setCss(btn1,{marginRight:5+"px"});
	cf.setCss(con,{width:450+"px",height:203+"px",position:"absolute"});
	cf.setCss(con1,{width:450+"px",height:203+"px",border:2+"px solid black",backgroundColor:"white"});	
	cf.setCss(con3,{height:70+"px"});
	callPop(con);
};
function prdUploadPopTb01(p){
	p.innerHTML="";
	var table=cf.mkTag("table",p);
	table.style.width=100+"%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";	
	/*var tr1=cf.mkTag("tr",table),
		th1=cf.mkTag("th", tr1);
	th1.innerHTML="년도";
	
	var	span1=cf.mkTag("span",th1),
		td1=cf.mkTag("td",tr1),
		sel1=cf.mkTag("select",td1),
		span2=cf.mkTag("div",td1);
	span1.className="asterisk";
	span1.innerHTML="*";
	td1.className="pd10 right";
	sel1.id="chk_year";
	sel1.name="sh_year";
	span2.id="chk_str";
	mkYearSelect(sel1);
	sel1.onchange=function(){
		prdLoadList03();
	};*/
	var tr2=cf.mkTag("tr",table),
		th2=cf.mkTag("th", tr2);
	th2.innerHTML="파일";
	var	span3=cf.mkTag("span",th2),
		td2=cf.mkTag("td",tr2),
		ipt=cf.mkTag("input",td2);
	span3.className="asterisk";
	span3.innerHTML="*";
	td2.className="pd10 right";
	ipt.id="uploadFile";
	ipt.type="file";
	
	cf.setCss(ipt,{width:95+"%"});
	cf.setCss(th2,{width:100+"px"});
	//cf.setCss(sel1,{width:70+"px",float:"left"});
	//cf.setCss(span3,{width:150+"px",marginLeft:10+"px",marginTop:5+"px",float:"left"});
};
function prdInfoPop(str,rev){
	var con=document.createElement("div"),
		con1=cf.mkTag("div",con),
		con2=cf.mkTag("div",con1),
		con2_tit=cf.mkTag("span",con2);
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a),
		con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3);
		
	con.className="pop-mypage";	
	con1.id="pop_my";
	con2.className="my_top";
	con2_tit.innerHTML=str;
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	con3.className="my-container";
	
	cf.setCss(con,{width:970+"px",height:650+"px",position:"absolute"});
	cf.setCss(con1,{width:970+"px",height:650+"px",border:2+"px solid black",backgroundColor:"#fff"});
	cf.setCss(con3,{height:527+"px",paddingTop:25+"px"});
	
	prdInfoPopTb01(con4,str,rev);
	
	var con5=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con5);	
	con5.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn1.innerHTML="확인";
	//img1.src="/images/pop_btn/btn_cancel_big.gif";
	btn1.onclick=function(){
		cf.killTag(con.parentNode);	
	};	
	callPop(con);
};
function prdInfoPopTb01(p,str,rev){
	p.innerHTML="";
	var title1=cf.mkTag("div",p),
		topdv=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		title2=cf.mkTag("div",p),
		title2_1=cf.mkTag("div",title2),
		title2_2=cf.mkTag("div",title2),
		title2_3=cf.mkTag("div",title2),
		botdv=cf.mkTag("div",p);
	cl.className="clear";
	title1.className="mini_title";
	topdv.className="Wrap_table";
	title2.className="mini_title";
	botdv.className="Wrap_table";
	botdv.id="prdinfotb02";
	title2_2.id="rev_info";
	
	title1.innerHTML="Revision List";
	title2_1.innerHTML=str+"&nbsp;:&nbsp;&nbsp;revision&nbsp;";
	title2_2.innerHTML=rev;
	title2_3.innerHTML="&nbsp;상세보기";
	
	var res1=q.parse("select * from prdlist02_rev"),
		res2=q.parse("select * from prdlist02");
	callprdInfoPopTb01(topdv,res1.arr);
	callprdInfoPopTb02(botdv,res2.arr);
	
	cf.setCss(title2,{height:15+"px",marginTop:15+"px"});
	cf.setCss(title2_1,{float:"left"});
	cf.setCss(title2_2,{float:"left"});
	cf.setCss(title2_3,{float:"left"});
	cf.setCss(topdv,{height:298+"px"});
	cf.setCss(botdv,{height:166+"px"});
};
function callprdInfoPopTb01(p,data){
	p.innerHTML="";
	prev_prd02="";
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbbody=cf.mkTag("div",p);
	cl.className="clear";

	//head
	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["Rev.","Price list date","Portfolio","Trigram","Type","Prd. Number","PLC","ALC","QLC","YLC"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				headerstyle(row,i,col,j);
				commonstyle1(row,i,col,j);				
			}				
		});
	});
	function headerstyle(row,i,col,j){
		cf.setCss(col,{background:"#fafafa",height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",borderTop:0+"px",
			fontWeight:"600",textAlign:"center",fontSize:12+"px"});
		if(j==10)cf.setCss(col,{borderRight:0+"px"});
		if(j==0)cf.setCss(col,{borderLeft:0+"px"});
	};
	function commonstyle1(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
		}
		if(j==0)cf.setCss(col,{width:49+"px"});
		else if(j==1)cf.setCss(col,{width:89+"px"});
		else if(j==3)cf.setCss(col,{width:99+"px"});
		else if(j==4)cf.setCss(col,{width:119+"px"});
		else if(j==5)cf.setCss(col,{width:139+"px"});
		else if(j==6||j==7||j==8)cf.setCss(col,{width:79+"px"});
		else if(j==9){
			col.className="right";
			cf.setCss(col,{width:95+"px"});
		}
	};
	
	//body	
	if(!data||data.length==0){
		var tds=new TABLE({
			p:tbbody,
			arr:[["조회된 데이터가 없습니다."]],
			mode:false,
			header:[],
			colspans:[{y:1, x:0, howmany:25}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					cf.setCss(col,{borderTop:0+"px"});
					commonstyle2(row,i,col,j);
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbbody,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					prdpop_tablecellaction_01(tds,data,row,i,col,j);
					commonstyle2(row,i,col,j);					
				}				
			});
		});
	}
	function commonstyle2(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
			cf.setCss(col,{borderTop:0+"px"});
		}
		col.className="txtclr";
		if(j==0)cf.setCss(col,{width:49+"px"});
		else if(j==1)cf.setCss(col,{width:89+"px"});
		else if(j==3)cf.setCss(col,{width:99+"px"});
		else if(j==4)cf.setCss(col,{width:119+"px"});
		else if(j==5)cf.setCss(col,{width:139+"px"});
		else if(j==6||j==7||j==8)cf.setCss(col,{width:79+"px"});
		else if(j==9){
			col.className="right";
			cf.setCss(col,{width:79+"px"});
		}
	};	
	cf.setCss(tbbody,{height:265+"px",overflowY:"scroll"});
};
function prdpop_tablecellaction_01(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==1){
		if(txt.length==10) txt="("+modiDate(txt.substring(1,9),".")+")";
		else if(txt.length==8)txt=modiDate(txt,".");
		else txt="-";
		col.innerHTML=txt;
	}else if(j==6||j==7||j==8||j==9){
		if(txt)col.innerHTML=comma(txt*1);
		else col.innerHTML="-";
	}else col.innerHTML=txt;
	
	col.onclick=function(){
		var infotb=document.getElementById("prdinfotb02"),
			rev_info=document.getElementById("rev_info");
		if(!prev_prd02){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_prd02.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_prd02=this.parentNode;
		prdLoadList02({price_list_date:data[i][1],portfolio:data[i][2],prd_number:data[i][5],prd_type:data[i][4],trigram:data[i][3],revision:data[i][0]});
		
		rev_info.innerHTML=data[i][0];		
		var res=q.parse("select * from prdlist02");
		callprdInfoPopTb02(infotb,res.arr);		
	};
	/*col.onmousemove=function(){
		if(!prev_prd02){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_prd02.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_prd02=this.parentNode;
	};*/
	cf.setCss(col,{cursor:"pointer"});
};
function callprdInfoPopTb02(p,data){
	p.innerHTML="";
	if(!data||data.length==0){
		var data=[["Pricelist","","","","Currency","","Price list date",""],["Portfolio","","","","Prd. number","","Version",""],
		          ["Type","","","","Trigram","","",""],["Portfolio<br>item name","","","","","","",""],["PLC","","ALC","","QLC","","YLC",""]];
		//["SLC","","TBL2","","TBL3","","ULC",""],["XLC","","QRC","","ELC","","",""]
	}else{
		var data=[["Pricelist",data[0][0],"","","Currency",data[0][1],"Price list date",data[0][2]],
			      ["Portfolio",data[0][3],"","","Prd. number",data[0][4],"Version",data[0][5]],
		          ["Type",data[0][6],"","","Trigram",data[0][7],"",""],["Portfolio<br>item name",data[0][8],"","","","","",""],
		          ["PLC",data[0][9],"ALC",data[0][10],"QLC",data[0][11],"YLC",data[0][12]]];
		//["SLC",data[0][13],"TBL2",data[0][14],"TBL3",data[0][15],"ULC",data[0][16]],["XLC",data[0][17],"QRC",data[0][18],"ELC",data[0][19],"",""]
	}
	var tds=new TABLE({
		p:p,
		arr:data,
		mode:false,
		header:[],
		colspans:[{y:0, x:1, howmany:3},{y:1, x:1, howmany:3},{y:2, x:1, howmany:3},{y:2, x:5, howmany:3},{y:3, x:1, howmany:7},{y:6, x:5, howmany:3}],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0||j==2||j==4||j==6)headerstyle(row,i,col,j);
				prdpop_tablecellaction_02(tds,data,row,i,col,j);
				commonstyle(row,i,col,j);
			}				
		});
	});
	
	function headerstyle(row,i,col,j){
		cf.setCss(col,{background:"#fafafa",height:32+"px",borderLeft:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",borderTop:0+"px",
			fontWeight:"600",textAlign:"center",fontSize:12+"px"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
		}
		if(j==0||j==2||j==4||j==6)cf.setCss(col,{width:120+"px"});
		else cf.setCss(col,{width:103+"px",paddingLeft:10+"px",textAlign:"left"});
		
		if(j==0)cf.setCss(col,{borderLeft:0+"px"});
		else if(j==7)cf.setCss(col,{borderRight:0+"px"});
		else if(i==2||i==6){
			if(j==5)cf.setCss(col,{borderRight:0+"px"});
		}else if(i==3){
			if(j==1)cf.setCss(col,{borderRight:0+"px"});
		}
	};
};
function prdpop_tablecellaction_02(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(i==0&&j==7){
		if(txt.length==10) txt="("+modiDate(txt.substring(1,9),".")+")";
		else if(txt.length==8)txt=modiDate(txt,".");
		else txt="-";
		col.innerHTML=txt;
	}else if(i==4||i==5||i==6){
		if(j==0||j==2||j==4||j==6)col.innerHTML=txt;
		else{
			if(txt){
				col.innerHTML=comma(txt*1);
				col.className="alignright pdr10";
			}else col.innerHTML="-";	
		}
	}else{
		if(txt)col.innerHTML=txt;
		else col.innerHTML="-";
	}
};