var checks,prev,arr_sub,dupFlag=false,dupNumber="",nameFlag=false,oriName="", cupFlag=false;

function defaultLoadList(){
	var p=document.getElementById("Center_wrap"),
		con=cf.mkTag("div",p);
	comanypages(con);
	companyLoadList();
}

function comanypages(p){
	var srchdv=cf.mkTag("div",p),
		btndv=cf.mkTag("div",p),
		infodv=cf.mkTag("div",btndv),
		span1=cf.mkTag("span",infodv),
		btnul=cf.mkTag("ul",btndv),
		li1=cf.mkTag("li",btnul),
		li2=cf.mkTag("li",btnul),
		li3=cf.mkTag("li",btnul),
		li4=cf.mkTag("li",btnul),
		//cl1=cf.mkTag("div",p),
		condv=cf.mkTag("div",p),
		wdv=cf.mkTag("div",condv),
		tbhead=cf.mkTag("div",wdv),
		tbcont=cf.mkTag("div",wdv),
		cl1=cf.mkTag("div",p),
		pagedv=cf.mkTag("div",p);
	span1.innerHTML="※고객사명 선택시 상세정보를 확인하실 수 있습니다.";
	srchdv.className="search4";
	srchdv.id="searchDiv";
	tbcont.id="copTb01";
	pagedv.id="cop_page";
	btndv.className="btn_action";
	infodv.className="descript asterisk infobot";
	condv.className="con_table";
	wdv.className="Wrap_table";
	
	var a1=cf.mkTag("a",li2),
		img1=cf.mkTag("img",a1),
		a2=cf.mkTag("a",li3),
		img2=cf.mkTag("img",a2),
		a3=cf.mkTag("a",li4),
		img3=cf.mkTag("img",a3);
	a1.href="javascript:companyAdd()";
	a2.href="javascript:companyModi()";
	a3.href="javascript:companyDel()";
	a3.id="companyDel";
	img1.alt="추가";
	img2.alt="수정";
	img3.alt="삭제";
	img1.src="/images/btn/btn_plus_on.gif";
	img2.src="/images/btn/btn_modify_on.gif";
	img3.src="/images/btn/btn_del_on.gif";
	
	mkDiv_srch(srchdv);
	mkList_head(tbhead);
	mkList_body(tbcont,[]);
	mkcop_page(pagedv);
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(pagedv,{marginTop:"15px"});
	//cf.setCss(tbhead,{width:1650+"px"});
	//cf.setCss(tbhead,{overflowY:"scroll"});
	//cf.setCss(tbcont,{width:1650+"px",height:cf.workareaheight*0.65+"px",minHeight:450+"px",maxHeight:600+"px"});
	//cf.setCss(tbcont,{overflowY:"scroll",height:"500px"});
	//cf.setCss(wdv,{overflow:"scroll"});
}

function mkDiv_srch(p){
	p.innerHTML="";	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span=cf.mkTag("span",bx1),
		ipt=cf.mkTag("input", bx1);

	span.innerHTML="고객사명";	
	ipt.id="searchString";
	ipt.className="input_han";
	ipt.onkeypress=function(e){
		if(e.keyCode==13){
			companySearchList();
		}
	};
	cf.setCss(ipt,{width:"130px"});
	cf.setCss(span,{paddingRight:"5px"});
	cf.setCss(bx1,{width:"192px"});
	
	var bx2=cf.mkTag("div", line1),
		img_re=cf.mkTag("img",bx2);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx2.className="cursor";
	bx2.onclick=function(){
		document.getElementById("searchString").value="";
	};
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go";
	img.src="/images/btn/btn_go.gif";
	img.style.cursor="pointer";
	img.onmousedown=companySearchList;
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left",paddingLeft:"20px"});
}

function mkcop_page(p){
	p.innerHTML="";
	var cvr=cf.mkTag("div",p),
		leftpad,max_pages=cop_page.distinct(1);	
	if(cop_page.length==0){
		var dv=cf.mkTag("div",cvr);
		dv.innerHTML=1;
		dv.pg=1;
		cf.setCss(dv,{backgroundColor:"#898989",color:"#fff",fontWeight:"bold",border:"1px solid #c9c9c9"});
		cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",cursor:"pointer"});
	}else{
		if(cop_page.length>10){
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML="<<";
			dv.onclick=function(){
				var chk;
				cop_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[0])generalPopOk2("더 이상 앞으로 이동할 수 없습니다.");
				else{
					var b;
					cop_page.trav(function(d,i){
						if(d[0]==1)b=d[3];
					});
					CUR_PAGE.navi=1;
					CUR_PAGE.pg=1;
					CUR_PAGE.sp=1;
					CUR_PAGE.plen=b;
					copSrchPageList01();				
				}
			};
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginRight:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
			
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML="<";
			dv.val="-10";
			dv.onclick=function(){
				var chk;
				cop_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[0])generalPopOk2("더 이상 앞으로 이동할 수 없습니다.");
				else{
					var a,b;
					cop_page.trav(function(d,i){
						if(d[0]==CUR_PAGE.pg-10){
							a=d[2];
							b=d[3];
						}
					});
					CUR_PAGE.navi=CUR_PAGE.navi-1;
					CUR_PAGE.pg=a;
					CUR_PAGE.sp=a;
					CUR_PAGE.plen=b;
					copSrchPageList01();				
				}
			};
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginRight:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
		}
		
		cop_page.trav(function(d,i){
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
						copSrchPageList01();
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
		
		if(cop_page.length>10){
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML=">";
			dv.val="10";
			dv.onclick=function(){
				var chk,len=max_pages.length;
				cop_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[len-1])generalPopOk2("더 이상 뒤로 이동할 수 없습니다.");
				else{
					var a,b;
					cop_page.trav(function(d,i){
						if(d[0]==CUR_PAGE.navi+10){
							a=d[2];
							b=d[3];
						}
					});
					CUR_PAGE.navi=CUR_PAGE.navi+1;
					CUR_PAGE.pg=a;
					CUR_PAGE.sp=a;
					CUR_PAGE.plen=b;
					copSrchPageList01();
				}
			};
			
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginLeft:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
			
			var dv=cf.mkTag("div",cvr);
			dv.innerHTML=">>";
			dv.onclick=function(){
				var chk,len=max_pages.length;
				cop_page.trav(function(d,i){
					if(d[0]==CUR_PAGE.pg) chk=d[1];
				});
				if(chk==max_pages[len-1])generalPopOk2("더 이상 뒤로 이동할 수 없습니다.");
				else{
					var a,b;
					cop_page.trav(function(d,i){
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
					copSrchPageList01();
				}
			};
			cf.setCss(dv,{float:"left",width:"30px",height:"23px",paddingTop:"7px",marginLeft:"10px",cursor:"pointer",border:"1px solid #c9c9c9"});
		}
	}
	var cw=document.getElementById("Center_wrap").clientWidth;
	if(CUR_PAGE){
		leftpad=(cw/2)-(CUR_PAGE.plen*32)/2;
		if(cop_page.length>10)leftpad=leftpad-70;
	}else leftpad=(cw/2)-(1*32)/2;
	if(leftpad<0)leftpad=60;

	cf.setCss(cvr,{position:"relative",left:leftpad+"px",textAlign:"center",height:"32px",maxWidth:"480px"});
	cf.setCss(p,{position:"relative",width:"100%",paddingBottom:"0px",zIndex:99});
}

function mkList_head(p){
	p.innerHTML="";
	var tb=cf.mkTag("table",p),
		thead=cf.mkTag("thead",tb),
		th1=cf.mkTag("th",thead),
		th4=cf.mkTag("th",thead),
		th7=cf.mkTag("th",thead),
		th8=cf.mkTag("th",thead),
		th9=cf.mkTag("th",thead),
		//th10=cf.mkTag("th",thead),
		th11=cf.mkTag("th",thead),
		//th12=cf.mkTag("th",thead),
		th14=cf.mkTag("th",thead),
		th15=cf.mkTag("th",thead),
		th16=cf.mkTag("th",thead),
		th17=cf.mkTag("th",thead);
	th17.className="right";
	th1.innerHTML="고객사명(한글)";
	th4.innerHTML="영업담당";
	th7.innerHTML="사업자등록번호";
	th8.innerHTML="법인번호";
	th9.innerHTML="Site ID";
	//th10.innerHTML="사업자</br>등록증";
	th11.innerHTML="전화번호";
	//th12.innerHTML="Fax";
	th14.innerHTML="주소";
	th15.innerHTML="거래처여부";
	th16.innerHTML="고객사여부";
	th17.innerHTML="등록자";
	
	tb.cellPadding="0px";
	tb.cellSpacing="0px";
	tb.className="project_table Normal_table";

	cf.setCss(th1,{width:"119px"});
	cf.setCss(th4,{width:"109px"});
	cf.setCss(th7,{width:"119px"});
	cf.setCss(th8,{width:"119px"});
	cf.setCss(th9,{width:"119px"});
	//cf.setCss(th10,{width:49+"px"});
	cf.setCss(th11,{width:"109px"});
	//cf.setCss(th12,{width:109+"px"});
	cf.setCss(th15,{width:"44px"});
	cf.setCss(th16,{width:"44px"});
	cf.setCss(th17,{width:"109px"});
	cf.setCss(tb,{width:"100%",textAlign:"center"});
}

function mkList_body(p,data){
	p.innerHTML="";
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
					commonstyle(row,i,col,j);
					col.className="right";
				}				
			});
		});
	}else{
		var len=data.length;
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
					com01_tablecellaction(tds,data,row,i,col,j);
					commonstyle(row,i,col,j);
					if(j==26)col.className="right";
				}				
			});
		});
	}
	
	var commonstyle = function(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
			cf.setCss(col,{borderTop:"0px"});
		}
		if(j==0)cf.setCss(col,{width:"119px"});
		if(j==3)cf.setCss(col,{width:"109px"});
		else if(j==6)cf.setCss(col,{width:"119px"});
		else if(j==7)cf.setCss(col,{width:"119px"});		
		else if(j==8)cf.setCss(col,{width:"119px"});
		else if(j==10)cf.setCss(col,{width:"109px"});
		else if(j==12)cf.setCss(col,{textAlign:"left",paddingLeft:"10px"});
		else if(j==14 || j==15)cf.setCss(col,{width:"44px"});
		else if(j==26)cf.setCss(col,{width:"109px"});
		else if(j==1||j==2||j==4||j==5||j==9||j==11||j==13||j>=16)cf.setCss(col,{display:"none"});
	};
}

function com01_tablecellaction(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==0||j==1){
		col.innerHTML=txt;
		col.onclick=function(){
			if(prev==null){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev=this.parentNode;
			prev.company_id=data[i][25];
			prev.data=data[i];
			companyListPop();
		};
		cf.setCss(col,{cursor:"pointer"});
	}else if(j==9){
		if(txt){
			var img=cf.mkTag("img",col);
			img.src="/images/ico/ico_filedown.gif";
			img.onclick=function(){
				window.open(encodeURI("/cop/companyDownloadAjax?sh_company_id=" +data[i][18]));
			};
			cf.setCss(img,{padding:0+"px",cursor:"pointer"});
		}//else img.src="/images/ico_filedown.gif";
		
	}else if(j==14||j==15){
		var yn="";
		if(txt=="0") yn="N";
		else if(txt=="1") yn="Y";
		col.innerHTML=yn;
	}else col.innerHTML=txt;
	
	col.onmousedown=function(){
		if(prev==null){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev=this.parentNode;
		prev.data=data[i];
		if(prev.data[20] != login_userid){
			var delAtagEl = document.getElementById("companyDel");
			delAtagEl.children[0].src = "/images/btn/btn_del_off.gif";
			delAtagEl.href = "javascript:delOffMessage()";
			
		}else{
			var delAtagEl = document.getElementById("companyDel");
			delAtagEl.children[0].src = "/images/btn/btn_del_on.gif";
			delAtagEl.href = "javascript:companyDel()";
		}
	};
};
