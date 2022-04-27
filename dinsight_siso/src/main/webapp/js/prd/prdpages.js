
var defaultLoadList = function(){
	var p=document.getElementById("Center_wrap"),
		con=cf.mkTag("div",p);
	prdpages(con);
	prdLoadList01();
};

var prdpages = function(p){
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
	cf.setCss(iptdv,{width:"260px",float:"left",marginTop:"-25px",position:"absolute"});
	cf.setCss(sel1,{width:"60px",float:"left"});
	cf.setCss(str1,{marginTop:"5px",marginRight:"5px",float:"left"});
	cf.setCss(str2,{marginTop:"5px",marginLeft:"5px",float:"left"});
	cf.setCss(pagedv,{marginTop:"15px"});
	cf.setCss(tbhead,{width:"100%"});
	cf.setCss(tbcont,{width:"100%",height:cf.workareaheight*0.65+"px",minHeight:"450px",maxHeight:"600px",overflowY:"scroll"});
	//cf.setCss(wdv,{overflowY:"scroll"});
};

var mkDiv_srch = function(p){
	p.innerHTML="";	
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_year";
	mkYearSelect(select);
	span.innerHTML="년도";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"197px"});
	
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
	cf.setCss(ipt,{width:"80px"});
	cf.setCss(span,{paddingRight:"5px"});
	
	var bx3=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx3),
		ipt=cf.mkTag("input",bx3);
	span.innerHTML="Type";
	ipt.id="prd_type";
	ipt.onkeypress=function(e){
		if(e.keyCode==13)prdSrchList01();
	};
	cf.setCss(ipt,{width:"100px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx3,{paddingLeft:"35px"});
	
	var bx4=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx4),
		ipt=cf.mkTag("input",bx4);
	span.innerHTML="Prd. Number";
	ipt.id="prd_number";
	ipt.onkeypress=function(e){
		if(e.keyCode==13)prdSrchList01();
	};
	cf.setCss(ipt,{width:"100px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx4,{paddingLeft:"35px"});
	
	var bx5=cf.mkTag("div", line2),
		span=cf.mkTag("span",bx5),
		ipt=cf.mkTag("input",bx5);
		span.innerHTML="Portfolio";
		ipt.id="portfolio";
		ipt.onkeypress=function(e){
			if(e.keyCode==13)prdSrchList01();
		};
	cf.setCss(ipt,{width:"100px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx5,{paddingLeft:"35px"});	
	
	var bx6=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx6);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx6.className="cursor";
	bx6.onclick=function(){
		$("#sh_year").val(CurrentDate[0]);
		$("#trigram").val("");
		$("#prd_type").val("");
		$("#prd_number").val("");
		$("#portfolio").val("");
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = prdSrchList01;
	
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

var mkprd_page = function(p){
	p.innerHTML="";
	var cvr=cf.mkTag("div",p),
		leftpad,max_pages=prd_page.distinct(1);	
	if(prd_page.length==0){
		var dv=cf.mkTag("div",cvr);
		dv.innerHTML=1;
		dv.pg=1;
		cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold",border:"1px solid #c9c9c9"});
		cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",cursor:"pointer"});
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
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginRight:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
			
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
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginRight:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
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
				cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold",border:"1px solid #c9c9c9"});
				cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",cursor:"pointer",marginLeft:"-1px"});
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
					if(MAX_PAGE==1)cf.setCss(dv,{border:"1px solid #c9c9c9"});
					else{
						cf.setCss(dv,{border:"1px solid #c9c9c9"});
					}
					cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",cursor:"pointer",marginLeft:"-1px"});
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
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginLeft:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
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
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginLeft:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
		}
	}
	var cw=document.getElementById("Center_wrap").clientWidth;
	if(CUR_PAGE){
		leftpad=(cw/2)-(CUR_PAGE.plen*32)/2;
		if(prd_page.length>10)leftpad=leftpad-70;
	}else leftpad=(cw/2)-(1*32)/2;
	if(leftpad<0)leftpad=60;
	cf.setCss(cvr,{position:"relative",left:leftpad+"px",textAlign:"center",height:"32px",maxWidth:"480px"});
	cf.setCss(p,{position:"relative",width:"100%",paddingBottom:"0px",zIndex:99});
};

var mkList_head = function(p){
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
		cf.setCss(col,{background:"#fafafa",height:"32px",borderLeft:"1px solid #e3e3e3",borderRight:"1px solid #e3e3e3",borderTop:"0px",
			fontWeight:"600",textAlign:"center",fontSize:"12px"});
		if(j==10)cf.setCss(col,{borderRight:"0px"});
		if(j==0)cf.setCss(col,{borderLeft:"0px"});
	}
	
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
		}
		if(j==0)cf.setCss(col,{width:"49px"});
		else if(j==1)cf.setCss(col,{width:"89px"});
		else if(j==3)cf.setCss(col,{width:"99px"});
		else if(j==4)cf.setCss(col,{width:"119px"});
		else if(j==5)cf.setCss(col,{width:"139px"});
		else if(j==6||j==7||j==8||j==9)cf.setCss(col,{width:"79px"});
		else if(j==10)cf.setCss(col,{width:"85px"});
	};	
};

var mkList_body = function(p,data){
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
					cf.setCss(col,{borderTop:"0px"});
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
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
			cf.setCss(col,{borderTop:"0px"});
		}
		col.className="txtclr";
		if(j==0)cf.setCss(col,{width:"49px"});
		else if(j==1)cf.setCss(col,{width:"89px"});
		else if(j==3)cf.setCss(col,{width:"99px"});
		else if(j==4)cf.setCss(col,{width:"119px"});
		else if(j==5)cf.setCss(col,{width:"139px"});
		else if(j==6||j==7||j==8||j==9)cf.setCss(col,{width:"79px"});
		else if(j==10)cf.setCss(col,{width:"67px"});
		else if(j==11)cf.setCss(col,{display:"none"});
	}
};

var prd01_tablecellaction = function(tds,data,row,i,col,j){
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

var prdUploadPop = function(chk){
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
	con2_a.href="javascript:;";
	con2_a.className="my_top_closs";
	
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
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
	cf.setCss(btn1,{marginRight:"5px"});
	cf.setCss(con,{width:"450px",height:"203px",position:"absolute"});
	cf.setCss(con1,{width:"450px",height:"203px",border:"2px solid black",backgroundColor:"white"});	
	cf.setCss(con3,{height:"70px"});
	callPop(con);
};

var prdUploadPopTb01 = function(p){
	p.innerHTML="";
	
	var table=cf.mkTag("table",p);
	table.style.width="100%";
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table"});
	
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
	
	cf.setCss(ipt,{width:"95%"});
	cf.setCss(th2,{width:"100px"});
	//cf.setCss(sel1,{width:70+"px",float:"left"});
	//cf.setCss(span3,{width:150+"px",marginLeft:10+"px",marginTop:5+"px",float:"left"});
};

var prdInfoPop = function(str,rev){
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
	con2_a.href="javascript:;";
	con2_a.className="my_top_closs";
	
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	con3.className="my-container";
	
	cf.setCss(con,{width:"970px",height:"650px",position:"absolute"});
	cf.setCss(con1,{width:"970px",height:"650px",border:"2px solid black",backgroundColor:"#fff"});
	cf.setCss(con3,{height:"527px",paddingTop:"25px"});
	
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

var prdInfoPopTb01 = function(p,str,rev){
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
	
	cf.setCss(title2,{height:"15px",marginTop:"15px"});
	cf.setCss(title2_1,{float:"left"});
	cf.setCss(title2_2,{float:"left"});
	cf.setCss(title2_3,{float:"left"});
	cf.setCss(topdv,{height:"298px"});
	cf.setCss(botdv,{height:"166px"});
};

var callprdInfoPopTb01 = function(p,data){
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
		cf.setCss(col,{background:"#fafafa",height:"32px",borderLeft:"1px solid #e3e3e3",borderRight:"1px solid #e3e3e3",borderTop:"0px",
			fontWeight:"600",textAlign:"center",fontSize:"12px"});
		if(j==10)cf.setCss(col,{borderRight:"0px"});
		if(j==0)cf.setCss(col,{borderLeft:"0px"});
	};
	
	function commonstyle1(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
		}
		if(j==0)cf.setCss(col,{width:"49px"});
		else if(j==1)cf.setCss(col,{width:"89px"});
		else if(j==3)cf.setCss(col,{width:"99px"});
		else if(j==4)cf.setCss(col,{width:"119px"});
		else if(j==5)cf.setCss(col,{width:"139px"});
		else if(j==6||j==7||j==8)cf.setCss(col,{width:"79px"});
		else if(j==9){
			col.className="right";
			cf.setCss(col,{width:"95px"});
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
					cf.setCss(col,{borderTop:"0px"});
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
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
			cf.setCss(col,{borderTop:"0px"});
		}
		col.className="txtclr";
		if(j==0)cf.setCss(col,{width:"49px"});
		else if(j==1)cf.setCss(col,{width:"89px"});
		else if(j==3)cf.setCss(col,{width:"99px"});
		else if(j==4)cf.setCss(col,{width:"119px"});
		else if(j==5)cf.setCss(col,{width:"139px"});
		else if(j==6||j==7||j==8)cf.setCss(col,{width:"79px"});
		else if(j==9){
			col.className="right";
			cf.setCss(col,{width:"79px"});
		}
	};	
	cf.setCss(tbbody,{height:"265px",overflowY:"scroll"});
};

var prdpop_tablecellaction_01 = function(tds,data,row,i,col,j){
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
		var res=q.parse("select * from tb_product");
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

var callprdInfoPopTb02 = function(p,data){
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
		cf.setCss(col,{background:"#fafafa",height:"32px",borderLeft:"1px solid #e3e3e3",borderRight:"1px solid #e3e3e3",borderTop:"0px",
			fontWeight:"600",textAlign:"center",fontSize:"12px"});
	};
	
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
		}
		if(j==0||j==2||j==4||j==6)cf.setCss(col,{width:"120px"});
		else cf.setCss(col,{width:"103px",paddingLeft:"10px",textAlign:"left"});
		
		if(j==0)cf.setCss(col,{borderLeft:"0px"});
		else if(j==7)cf.setCss(col,{borderRight:"0px"});
		else if(i==2||i==6){
			if(j==5)cf.setCss(col,{borderRight:"0px"});
		}else if(i==3){
			if(j==1)cf.setCss(col,{borderRight:"0px"});
		}
	};
};

var prdpop_tablecellaction_02 = function(tds,data,row,i,col,j){
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