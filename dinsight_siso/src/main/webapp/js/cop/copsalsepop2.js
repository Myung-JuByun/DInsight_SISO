var DIVISIONS,DIVISION_ROOT,MEMBERS,CURRENT_DIVISION,CURRENT_DIVISION_MEMBERS=new Array(),CURRENT_SEARCH_MEMBERS=new Array(),
	leaves,sc_prev,sc_checks1=new Array(),sc_checks2=new Array(),prev_scmem1,prev_scmem2,gLastUser=new Array();
function salesCustomerLoadList(){
	var ar=[],gPrev = document.getElementById("sales_customer").value,
		userIds=gPrev.split(",");
	CallCopDivisionData(function(data){
		DIVISIONS=data.divisionList;
		MEMBERS=data.userList;
	});
	
	if(MEMBERS && MEMBERS.length>0){		
		MEMBERS.trav(function(d,i){
			if(!d.user_id)d.user_id="";
			if(!d.user_name)d.user_name="";
			if(!d.job_title_name)d.job_title_name="";
			if(!d.division_name)d.division_name="";
			if(!d.company_id)d.company_id="";
			ar.push([d.user_id,d.user_name,d.job_title_name,d.division_name,d.company_id]);
		});
	}	
	q.reg("scmemlist01",{
		arr:ar,
		header:["user_id","user_name","job_title_name","division_name","company_id"],
		meta:["string","string","string","string","string"]
	});	
	userIds.trav(function(d, i) {
		var temp = getUserInfoById2(d).arr[0];
		if(temp!=undefined) gLastUser.push(temp);
	});	
	if (!gLastUser||gLastUser.length==0||gLastUser[0].length==0){
		gLastUser = [];
	}	
};
function scTreeDateSet(){
	scDataProc();
	scMkDivision();
};
function scDataProc(){
	var dt=DIVISIONS,obj={};
	dt.trav(function(d,i){
		var str=d.division_cd;
		obj[str]=d;
		d.childNodes=[];
	});
	dt.trav(function(d,i){
		var str=d.parent_cd;
		if(str)	obj[str].childNodes.push(d);
		else DIVISION_ROOT=d;
	});
};
function scMkDivision(){
	tree_menu.style.width=255+"px";
	tree_menu.style.height=180+"px";
	tree_menu.style.overflowY="auto";
	tree_menu.style.overflowX="hidden";		
	tree_menu.innerHTML="";	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		scMkLeaf(el,tree_menu,cnt);
		cnt++;
	});
};
function scMkLeaf(el,tree_menu,cnt){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	var str=el.parent_cd;
			
	a=cf.mkTag("div",tree_menu);
	a.style.paddingTop=8+"px";
	a.style.paddingLeft=padLeft+"px";
	a.style.marginRight=20+"px";
	a.style.backgroundColor="white";
	a.style.whiteSpace="nowrap";
	
	a.obj=el;
	a.idx=cnt;
	a.depth=el.division_level;
	a.chk="true";
	a.onclick=function(){
		scGetMem(this);
		scMkMemberTable(true);
		if(sc_prev==null){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			sc_prev.style.fontWeight="normal";
			sc_prev.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		sc_prev=this;
	};
	if(a.obj.childNodes!=0){
		var img=cf.mkTag("img",a);
		img.className="pop_btn_tree";			
		img.src="/images/exp_payment/tree_minus.gif";
		img.onclick=function(){
			var trg=this.parentNode;
			//dir(trg);
			scFold(trg);	
			if(trg.chk) {
				this.src="/images/exp_payment/tree_plus.gif";
				trg.chk=false;
				
			}else {
				this.src="/images/exp_payment/tree_minus.gif";
				trg.chk=true;
			}
			
		};
	}else {
		var img=cf.mkTag("img",a);
		img.src="/images/exp_payment/tree_blank.gif";
	}
	
	var span=cf.mkTag("span",a);
	span.innerHTML=" "+"<img src='/images/exp_payment/folder.gif' />"+" "+el.division_name+"&nbsp;&nbsp;&nbsp;&nbsp;";
	cf.setCss(span,{cursor:"pointer"});
	leaves.push(a);
};
function scFold(l){
	var btn_tree=l.getElementsByClassName("pop_btn_tree");
	leaves.trav(function(d,i){	
		if(i>l.idx) return PaymentdoFold(d,i);
	});
	function PaymentdoFold(d,i){
		var cmp=l.depth-d.depth;
		if(cmp>=0) return true;
		if(l.chk){
			d.style.height=0+"px";
			d.style.paddingTop=0+"px";
			d.style.overflow="hidden";
		}else{
			/*	2015-07-28	tree 내 최하위 폴더 마이너스 이미지 삭제 (김혜림) 
			if(btn_tree){
				d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
			}
			*/
			d.style.height=14+"px";
			d.style.paddingTop=8+"px";
			d.style.overflow="";
		}
	};
};
function scTreeView(flag){		
	var tree=document.getElementById("tree_menu"),
		img=tree.childNodes[0].childNodes[0];
	
	if(flag=="Y"){ //전체펼침
		if(!img.parentNode.chk)img.onclick();
		
		if(POP_prev!=null){
			var a=sc_prev.getElementsByClassName("pop_btn_tree");
			if(a){
				img.parentNode.chk=false;
				img.onclick();
			}				
		}
	}else{
		if(img.parentNode.chk)img.onclick();			
	}
};
function scGetRealList(){
	var ar=CURRENT_DIVISION_MEMBERS;
	if(CURRENT_SEARCH_MEMBERS && CURRENT_SEARCH_MEMBERS.length>0) ar=CURRENT_SEARCH_MEMBERS;
	return ar;
};
function scGetMem(el){
	var obj=el.obj;
	var arr=MEMBERS;
	CURRENT_DIVISION=el.obj;
	CURRENT_DIVISION_MEMBERS=new Array();
	arr.trav(function(d,i){
		if(d.division_cd==obj.division_cd)CURRENT_DIVISION_MEMBERS.push(d);
	});
};
function getUserInfoById2(id) {
	var qry = "select * from scmemlist01 where user_id="+ id +";";
	return q.parse(qry);
};
function scMemAdd(){	
	var isDuplicated=false,duplicateUser=[],finalUser=[];	
	for (var i = 0; i < sc_checks1.length; i++) {
		var cObj = sc_checks1[i];
		if(cObj[0].checked){
			if(gLastUser.length >0){
				for (var j = 0; j < gLastUser.length; j++) {					
					var d2 = gLastUser[j];
					if (cObj[1][0] == d2[0] && cObj[1][1] == d2[1] && cObj[1][2] == d2[2] && cObj[1][2] == d2[2]){ // 0 : 사번, 1: 이름 2 : 직급, 3: 부서
						isDuplicated = true;
						duplicateUser.push(d2[1]);
						break;
					}else finalUser.push(cObj[1]);
				}
			}else finalUser.push(cObj[1]);
		}
	}
	if (isDuplicated) {
		generalPopOk("이미 추가된 사용자가 있습니다.");
	}

	testar=finalUser;
	
	finalUser.distinct(0).trav(function(d, i) {
		var temp = getUserInfoById2(d).arr[0];
		if(!duplicateUser.length) gLastUser.push(temp); 
	});
	callscTb2(document.getElementById("usertb2"), gLastUser);
};
function scMemSave(p){
	var split="",arrlength=0,
		sales_customer_layer = document.getElementById("sales_customer_layer"),
		sales_customer = document.getElementById("sales_customer").value;
	sales_customer = "";
	document.getElementById("sales_customer_layer").innerHTML = "";
		
	if(sales_customer!=""){
		var arr=sales_customer.split(",");
		arrlength=arr.length;
	}	
	gLastUser.trav(function(d, i){
		if(arrlength>0){
			var addYn = 0;
			arr.trav(function(j,k){
				if(j==d[0])addYn = 1;				
			});
			if(addYn == 0){
				split=",";
				sales_customer += split + d[0];
				
				var div=cf.mkTag("div", sales_customer_layer);
				div.style.float="left";
				div.innerHTML = d[1];
				var span=cf.mkTag("span", div);
				span.style.paddingLeft="5px";
				var img=cf.mkTag("img", span);
				img.src="/images/common/btn_x.gif";
				img.onclick=function(){
					salesCustomerDel2(div, d[0]);
				};
				cf.setCss(img,{marginRight:7+"px"});
			}
		} else {
			sales_customer += split + d[0];
			split=",";
			
			var div=cf.mkTag("div", sales_customer_layer);
			div.style.float="left";
			div.innerHTML = d[1];
			var span=cf.mkTag("span", div);
			span.style.paddingLeft="5px";
			var img=cf.mkTag("img", span);
			img.src="/images/common/btn_x.gif";
			img.onclick=function() {
				salesCustomerDel2(div, d[0]);
			};
			cf.setCss(img,{marginRight:7+"px"});
		}
	});
	document.getElementById("sales_customer").value=sales_customer;
	cf.killTag(p.parentNode);
};
function salesCustomerLayer2(ele, data, dataUserid){
	var arrData = data.split(","),arrDataUserid = dataUserid.split(","),userid="";
	
	for(var i=0; i<arrData.length; i++){
		userid = arrDataUserid[i];
		var div = cf.mkTag("div", ele),
			span= cf.mkTag("span", div);
		div.style.float="left";		
		span.style.paddingLeft="5px";
		
		if(i==arrData.length-1)div.innerHTML=arrData[i];
		else if(!data)div.innerHTML="";
		else div.innerHTML=arrData[i]+",&nbsp;";
		
		if(arrData[i]!=""){
			var img= cf.mkTag("img", span);
			img.src="/images/common/btn_x.gif";
			img.userid=userid;
			img.div=div;
			img.onclick=function() {
				salesCustomerDel(this.div, this.userid);
			};
			cf.setCss(img,{marginRight:7+"px"});
		}
	}
};
function salesCustomerDel2(ele, userid){
	cf.killTag(ele);
	var salesCustomer=document.getElementById("sales_customer").value;
	var res=salesCustomer.split(",");
	var html="";
	var split="";
	for (var i=0; i<res.length; i++) {
		if(res[i]!=userid){
			html += split + res[i];
			split=",";
		}		
	}
	document.getElementById("sales_customer").value=html;
};
function scMemBtnDirSrchClick(){
	var a1=document.getElementById("sc_user_name").value, a3,
		treedv=document.getElementById("tree_menu");
	MEMBERS.trav(function(d,i){
		var a2=d.user_name;
		if(a1==a2){
			a3=d.division_cd;
			return true;
		}
	});
	if(a1!=""&&!a3){
		generalPopOk("찾는 사람이 없습니다.",function(){
			document.getElementById("sc_user_name").focus();
		});
	}
	
	leaves.trav(function(d,i){
		var a4=d.obj.division_cd;
		if(a3==a4){
			d.onclick();
			treedv.scrollTop=(i*22);
		}
	});
	scMemBtnMemSrchClick();
};
function scMemBtnMemSrchClick(){
	var arr=CURRENT_DIVISION_MEMBERS;
	var val=document.getElementById("sc_user_name").value;
	if(CURRENT_SEARCH_MEMBERS) CURRENT_SEARCH_MEMBERS=new Array();
	arr.trav(function(d,i){
		var dvName=d.division_name;
		var memName=d.user_name;
		var title=d.job_title_name;
		if(val==dvName || val==memName) CURRENT_SEARCH_MEMBERS.push(d);
	});
	//dir(CURRENT_SEARCH_MEMBERS);
	scMkMemberTable();
};
function scMkMemberTable(opt){
	var box=document.getElementById("usertb1"),
		allchk=document.getElementById("allchk");
	if(sc_prev&&allchk&&allchk.checked==true)allchk.checked=false;
	
	box.innerHTML="";
	sc_checks1=new Array();
	
	var ar;
	if(!opt) ar=scGetRealList();
	else ar=CURRENT_DIVISION_MEMBERS;
	
	ar.trav(function(d,i){
		scMkTr(d,i);
	});
	function scMkTr(d,idx){
		var tr=cf.mkTag("tr",box);
		tr.style.cursor="pointer";
		
		var td1=cf.mkTag("td",tr);
		td1.align="center";
		td1.width=30+"px";
		
		var ipt=cf.mkTag("input",td1);
		ipt.type="checkbox";
		ipt.className="sc_id1";
		ipt.name="sc_id1";
		sc_checks1.push([ipt,[d.user_id,d.user_name,d.job_title_name,d.division_name,d.company_id],""]);
		
		var td2=cf.mkTag("td",tr);
		td2.width=65+"px";
		td2.align="center";
		td2.innerHTML=d.user_name;
		
		var td3=cf.mkTag("td",tr);
		td3.width=70+"px";
		td3.align="center";
		var strJob=d.job_title_name;
		if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
		td3.innerHTML=strJob;
		
		var td4=cf.mkTag("td",tr);
		td4.className="right";
		td4.align="center";
		td4.innerHTML=d.division_name;
		
		ipt.onclick=function(){
			if(!prev_scmem1){
				this.parentNode.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_scmem1.style.backgroundColor="white";
				this.parentNode.parentNode.style.backgroundColor="#edfafb";
			}
			prev_scmem1=this.parentNode.parentNode;
			prev_scmem1.obj=d;
			if(this.checked)this.checked=false;
			else this.checked=true;
		};		
		tr.onclick=function(){
			var ipt_chk=this.childNodes[0].childNodes[0];
			if(!prev_scmem1){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_scmem1.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_scmem1=this;
			prev_scmem1.obj=d;
			if(ipt_chk.checked)ipt_chk.checked=false;
			else ipt_chk.checked=true;
		};
		
		if(idx==0){
			cf.setCss(td1,{borderTop:0+"px"});
			cf.setCss(td2,{borderTop:0+"px"});
			cf.setCss(td3,{borderTop:0+"px"});
			cf.setCss(td4,{borderTop:0+"px"});
		}
	};
};
function salesCustomerPop(){
	salesCustomerLoadList();
	var con=document.createElement("div");
	con.id="paymentTopLayer";
	cf.setCss(con,{position:"absolute",width:1055+"px",height:cf.workareaheight-115+"px",maxHeight:655+"px"});
	
	var	con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2),
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a),
		con3=cf.mkTag("div",con1);
	
	con0.className="pop-mypage";
	con1.id="pop_my";
	con2.className="my_top";
	span.innerHTML="영업담당자";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
		gLastUser=[];
	};
	con3.className="my-container Left_wrap2";
	con3.id="contents";
	mkDiv_sc(con3);
	
	cf.setCss(con1,{width:1055+"px",height:cf.workareaheight-115+"px",maxHeight:655+"px",border:2+"px solid black",backgroundColor:"#fff"});
	cf.setCss(con3,{overflowY:"auto",height:cf.workareaheight-213+"px",maxHeight:557+"px"});
	
	var con4=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con4),
		btn2=cf.mkTag("button",con4);
	con4.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn1.id="savebtn";
	btn1.innerHTML="저장";
	btn1.onclick=function(){
		if(sc_checks2.length==0)generalPopOk("추가 할 영업담당자가 없습니다.");
		else{
			generalPop("영업담당자를 추가 하시겠습니까?", function(){
				scMemSave(con);
				gLastUser=[];
			});
		}
	};	
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
		gLastUser=[];
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	
	callPop(con);	
	//defaultPopLoadList();
};
function mkDiv_sc(p){
	p.innerHTML="";
	
	var top=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		bot=cf.mkTag("div",p),
		ldiv=cf.mkTag("div",bot),
		ldiv_tit=cf.mkTag("div",ldiv),
		ldiv_tb=cf.mkTag("div",ldiv),
		ldiv_tb_tree=cf.mkTag("div",ldiv_tb),
		ldiv_btn=cf.mkTag("div",ldiv_tb),
		mdiv1=cf.mkTag("div",bot),
		mdiv1_tit=cf.mkTag("div",mdiv1),
		mdiv1_tb=cf.mkTag("div",mdiv1),
		mdiv2=cf.mkTag("div",bot),
		rdiv=cf.mkTag("div",bot),
		rdiv_tit=cf.mkTag("div",rdiv),
		rdiv_tb=cf.mkTag("div",rdiv);
	cl1.className="clear";
	bot.className="Left_wrap2";
	ldiv_tit.className="title2";
	mdiv1_tit.className="title2";
	rdiv_tit.className="title2";
	ldiv.className="Left_group4_3_scpop";
	ldiv_tb.className="left_table4";
	mdiv1.className="Left_group4_scpop";
	mdiv1_tb.className="left_table4";
	mdiv2.className="Left_group5_scpop";
	rdiv.className="Right_group4_scpop";
	rdiv_tb.className="left_table4";
	srchDiv_sc(top);
	ldiv_tit.innerHTML="조직도";
	rdiv_tit.innerHTML="영업담당자 선택";	
	mkTbHead_sc(mdiv1_tb,true);
	//mkTbHead_sc(rdiv_tb);
	callscTb2(rdiv_tb,gLastUser);
	ldiv_tb_tree.id="tree_menu";
	tree_menu=ldiv_tb_tree;
	
	var btn1=cf.mkTag("div",ldiv_btn),
		btn1_img=cf.mkTag("img",btn1),
		btn2=cf.mkTag("div",ldiv_btn),
		btn2_img=cf.mkTag("img",btn2);
	btn1_img.src="/images/exp_payment/btn_openall.gif";
	btn2_img.src="/images/exp_payment/btn_closeall.gif";
	btn1.className="cursor";
	btn2.className="cursor";
	btn1_img.onclick=function(){
		scTreeView("Y");
	};
	btn2_img.onclick=function(){
		scTreeView("N");
	};
	
	var btn3=cf.mkTag("div",mdiv2),
		btn3_img=cf.mkTag("img",btn3),
		btn4=cf.mkTag("div",mdiv2),
		btn4_img=cf.mkTag("img",btn4);
	btn3_img.src="/images/btn/btn_pop_select.gif";
	btn4_img.src="/images/btn/btn_pop_delect.gif";
	btn3.className="cursor";
	btn4.className="cursor";
	
	btn3_img.onclick=function(){
		var a=juSel_sc(sc_checks1,true),chk=true;		
		if(a.opt){
			gLastUser.trav(function(d,i){
				sc_checks1.trav(function(g,f){
					if(d[0]==g[1][0]) chk=false;
				});
			});			
		}		
		if(!a.opt)generalPopOk("영업담당자를 선택하세요.");
		//else if(!chk)generalPopOk("이미 추가된 사용자가 있습니다.");
		else scMemAdd();
		
	};
	btn4_img.onclick=function(){
		var a=juSel_sc(sc_checks2,true);		
		if(!a.opt)generalPopOk("삭제할 영업담당자를 선택하세요.");
		else{
			var salesArry = document.querySelectorAll(".sc_id2"),
				checkSalesArry = []; 

			for (i = 0; i < salesArry.length;i ++) {
				if (salesArry[i].checked) {
					checkSalesArry.push(salesArry[i].value);
				}			
			}	
			for (i = 0; i < gLastUser.length; i++) {
				for (j = 0; j < checkSalesArry.length; j++){					
					if (gLastUser[i] && gLastUser[i][0] == checkSalesArry[j])  {
						delete gLastUser[i];						
					}
				}
			}
			gLastUser.clean();
			var targetDiv = document.getElementById("usertb2");
			if (gLastUser.length > 0)
				callscTb2(targetDiv,gLastUser);
			else callscTb2(targetDiv);
		}
	};
	
	//조직도 구성
	scTreeDateSet();
	
	cf.setCss(ldiv_btn,{width:255+"px",height:32+"px",paddingTop:7+"px",borderTop:1+"px solid #e3e3e3"});
	cf.setCss(btn1,{position:"absolute",right:90+"px"});
	cf.setCss(btn2,{position:"absolute",right:20+"px"});
	cf.setCss(btn4,{marginTop:5+"px"});
	cf.setCss(ldiv_tb_tree,{height:cf.workareaheight-395-50+"px",maxHeight:370+"px"});
	cf.setCss(ldiv_tb,{height:cf.workareaheight-395+"px"});
	cf.setCss(mdiv1_tb,{height:cf.workareaheight-395+"px"});
	cf.setCss(rdiv_tb,{height:cf.workareaheight-395+"px"});
};
function mkTbHead_sc(p,opt){
	var tb1=cf.mkTag("table",p),
		tr1=cf.mkTag("tr",tb1),
		tr1_th1=cf.mkTag("th",tr1),
		tr1_th1_ipt=cf.mkTag("input",tr1_th1),
		tr1_th2=cf.mkTag("th",tr1),
		tr1_th3=cf.mkTag("th",tr1),
		tr1_th4=cf.mkTag("th",tr1),
		tr2=cf.mkTag("tr",tb1),
		tr2_td1=cf.mkTag("td",tr2),
		tr2_td1_div=cf.mkTag("div",tr2_td1),
		tr2_td1_div_tb=cf.mkTag("table",tr2_td1_div),
		tr2_td1_div_tb_tbody=cf.mkTag("tbody",tr2_td1_div_tb);
	tr1_th2.innerHTML="이름";
	tr1_th3.innerHTML="직위";
	tr1_th4.innerHTML="부서";
	tr2_td1.colSpan="5";
	tr1_th4.className="right";
	tr2_td1.className="right";
	tr1_th1_ipt.id="allchk";
	tr1_th1_ipt.type="checkbox";
	tr1_th1_ipt.className="CheckMode";
	if(opt){
		tb1.className="Normal_table";
		tr2_td1_div_tb.className="Normal_table";
		tr1_th1_ipt.onclick=function(){
			GroupCheck('CheckMode','sc_id1');
		};
		tr2_td1_div_tb_tbody.id="usertb1";
		var tr=cf.mkTag("tr",tr2_td1_div_tb_tbody),
			td=cf.mkTag("td",tr);
		td.className="right";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{textAlign:"center",borderTop:0+"px"});
	}else{
		tr1_th1_ipt.onclick=function(){
			GroupCheck('CheckMode','sc_id2');
		};
		tr2_td1_div_tb_tbody.id="usertb2";
	}
	
	cf.setCss(tr1_th1,{width:30+"px"});
	cf.setCss(tr1_th2,{width:65+"px"});
	cf.setCss(tr1_th3,{width:70+"px"});
	cf.setCss(tr2_td1,{border:0+"px"});
	cf.setCss(tr2_td1_div,{height:cf.workareaheight-425+"px",maxHeight:378+"px",overflowY:"auto"});
};
function srchDiv_sc(p){
	p.innerHTML="";
	p.className="search_pop4";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span=cf.mkTag("span",bx1),
		ipt=cf.mkTag("input", bx1);
	
	span.innerHTML="담당자";	
	ipt.id="sc_user_name";
	ipt.className="input_han";
	ipt.onkeypress=function(e){
		if(e.keyCode==13){
			if(e.target.value.length==0){
				generalPopOk("검색어를 입력하세요.",function(){
					document.getElementById("sc_user_name").focus();
				});
			}else scMemBtnDirSrchClick();
		}
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	//cf.setCss(bx1,{width:192+"px"});

	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go2 cursor";
	img.src="/images/btn/btn_go2.gif";
	img.style.cursor="pointer";
	img.onmousedown=function(){		
		if(ipt.value.length==0){
			generalPopOk("검색어를 입력하세요.",function(){
				document.getElementById("sc_user_name").focus();
			});
		}else scMemBtnDirSrchClick();
	};	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(p,{marginTop:25+"px"});
};
function callscTb2(p,data){
	prev_scmem2="";
	p.innerHTML="";	
	p.id="usertb2";	
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbcont=cf.mkTag("div",p);
	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["","이름","직위","부서"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0){
					var ipt=cf.mkTag("input",col);
					ipt.type="checkbox";
					ipt.className="CheckMode";
					ipt.onclick=function(){
						GroupCheck('CheckMode','sc_id2');
					};
				}
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j,true);				
			}				
		});
	});//head
	
	if(!data||data.length==0){
		var tds=new TABLE({
			p:tbcont,
			arr:[["선택된 담당자가 없습니다.","","",""]],
			mode:false,
			header:[],
			colspans:[{y:0, x:0, howmany:4}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:0+"px solid #e3e3e3",});
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbcont,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					sc_tablecellaction02(tds,data,row,i,col,j);
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",});
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}
	function headerstyle(row,i,col,j){
		cf.setCss(col,{fontWeight:"bold",backgroundColor:"#fafafa",height:30+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3"});
	};
	function commonstyle(row,i,col,j,opt){
		if(opt){
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
				tb.id="tbH";
			}
			if(j==0)cf.setCss(col,{width:30+"px"});
			else if(j==1)cf.setCss(col,{width:65+"px"});
			else if(j==2)cf.setCss(col,{width:70+"px"});
			else if(j==3) cf.setCss(col,{borderRight:0+"px solid #e3e3e3"});
		}else{
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
			}
			if(j==0) cf.setCss(col,{width:30+"px"});
			else if(j==1)cf.setCss(col,{width:65+"px"});
			else if(j==2) cf.setCss(col,{width:70+"px"});
			else if(j==3) cf.setCss(col,{borderRight:0+"px solid #e3e3e3"});
			else if(j==4) cf.setCss(col,{display:"none"});
		}		
	};
	cf.setCss(cl,{clear:"both"});
	cf.setCss(tbhead,{height:31+"px",});	
	cf.setCss(tbcont,{overflowY:"auto",height:145+"px",borderBottom:0+"px solid #272727",borderLeft:0+"px solid #e3e3e3",marginBottom:0+"px",});
};
function sc_tablecellaction02(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(j==0){
		var ipt=cf.mkTag("input",col);
		ipt.type="checkbox";
		ipt.className="sc_id2";
		ipt.id="sc_id2";
		ipt.name="sc_id2";
		ipt.value=txt;
		sc_checks2.push([ipt,data[i],""]);
		col.onclick=function(){
			if(!prev_scmem2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_scmem2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_scmem2=this.parentNode;
			prev_scmem2.idx=i;
			prev_scmem2.data=data[i];
		};
	}else{
		col.innerHTML=txt;
		col.className="cursor2";
		col.onclick=function(){
			var chk=this.parentNode.childNodes[0].childNodes[0];
			if(!prev_scmem2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_scmem2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			if(chk.checked==true)chk.checked=false;
			else chk.checked=true;
			prev_scmem2=this.parentNode;
			prev_scmem2.idx=i;
			prev_scmem2.data=data[i];
		};
	}
};
//obj를 돌면서 체크되어 잇는지 확인
function juSel_sc(obj,op){
	//체크박스에 선택된 값이 있는지 판단
	var opt=false,
		cnt=0,
		val=[];
	if(!op){
		obj.trav(function(d,i){
			if(d.checked){
				cnt++;
				val.push(d.value);
			}
		});
	}else{
		obj.trav(function(d,i){
			if(d[0].checked){
				cnt++;
				val.push(d[0].value);
			}
		});
	}
	if(cnt>0) opt=true;	
	return {opt:opt, val:val};
};