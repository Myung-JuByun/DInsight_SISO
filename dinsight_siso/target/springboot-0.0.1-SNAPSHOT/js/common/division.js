var prev;
var prev_user;
var DIVISIONS;
var MEMBERS;
var tree_menu;
var DIVISION_ROOT;
var CURRENT_DIVISION;
var CURRENT_DIVISION_MEMBERS=new Array();
var leaves=[];
var dirSrch;
var con;
obj={year:"",month:"",pjname : "",coname : "",username : ""};

function getEls(){
	cf.traverse(document.body,function(el){
		if(el.className=="tree_menu") tree_menu=el;
	});
};
///////////////////////////////////////////////////////////////////
//부서, 직원 출력
function dataProc(opt){
	if(opt){
		var dt=[];
		MEMBERS.trav(function(d,i){
			if(d.user_id){
				var mem={
					parent_cd:d.division_cd,
					division_cd:"mem_"+d.user_id,
					division_name:d.user_name,
					user_id:d.user_id
				};
				dt.push(mem);
			}
		});
		DIVISIONS.trav(function(d,i){
			dt.push(d);
		});
	}else{
		var dt=DIVISIONS;
	}
	
	var obj={};
	dt.trav(function(d,i){
		var str=d.division_cd;
		obj[str]=d;
		d.childNodes=[];
	});
	dt.trav(function(d,i){
		var str=d.parent_cd;
		if(str){
			obj[str].childNodes.push(d);
			d.parentNode=obj[str];
			d.division_level=(obj[str].division_level*1)+1;
		}else DIVISION_ROOT=d;
	});
};
function mkDivision(srch,con){
	tree_menu.style.width=100+"%";
	tree_menu.style.height=340+"px";
	tree_menu.style.overflowY="auto";
	tree_menu.style.overflowX="hidden";
		
	tree_menu.innerHTML="";
	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		if(srch) mkLeaf(el,tree_menu,cnt,srch,con);
		else mkLeaf(el,tree_menu,cnt,srch,con);
		cnt++;
	});
};
function mkLeaf(el,tree_menu,cnt,srch,con){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	//var str=el.parent_cd;
			
	var a=cf.mkTag("div",tree_menu);
	a.style.paddingTop=8+"px";
	a.style.paddingLeft=padLeft+"px";
	a.style.marginRight=20+"px";
	//a.style.backgroundColor="white";
	a.style.whiteSpace="nowrap";
	a.style.cursor="pointer";
	
	a.obj=el;
	a.idx=cnt;
	a.depth=el.division_level;
	a.chk=true;
	var memSrch=a.obj.division_cd.substr(0,3);
	
	if(memSrch=="mem"){
		var img=cf.mkTag("img",a);
		img.src="/images/ico/img_dot.gif";
		
	}else{
		var img=cf.mkTag("img",a);
		img.className="btn_tree";
		img.id="btn_tree";
		img.src="/images/exp_payment/tree_minus.gif";
		img.onclick=function(){
			var trg=this.parentNode;
			fold(trg);
			if(trg.chk) {
				this.src="/images/exp_payment/tree_plus.gif";
				trg.chk=false;
			}else {
				this.src="/images/exp_payment/tree_minus.gif";
				trg.chk=true;
			}
		};
		var span=cf.mkTag("span",a);
		span.innerHTML=" ";
		var img=cf.mkTag("img",a);
		img.src="/images/exp_payment/folder.gif";
	}
	
	var span=cf.mkTag("span",a);		
	span.innerHTML=" "+el.division_name+"&nbsp;&nbsp;&nbsp;&nbsp;";
	span.onclick=function(){
		var pa=this.parentNode;
		getMem(pa);

		if(!prev_user){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			prev_user.style.fontWeight="normal";
			prev_user.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		prev_user=this;
		prev_user.obj=pa.obj;
		prev_user.idx=cnt;
	};
	span.ondblclick=function(){
		var pa=this.parentNode;
		getMem(pa);

		if(!prev_user){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			prev_user.style.fontWeight="normal";
			prev_user.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		prev_user=this;
		prev_user.obj=pa.obj;
		prev_user.idx=cnt;		
		memberInsert(con);
	};
	if(el.division_name==srch){
		span.onclick();
		tree_menu.scrollTop=(a.idx*22);
	}
	leaves.push(a);
};

///////////////////////////////////////////////////////////////////
//부서만 출력
function dataDivisionProc(){
	var dt=DIVISIONS;
	var obj={};
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
function mkOnlyDivision(){
	tree_menu.style.width=100+"%";
	tree_menu.style.height=360+"px";
	tree_menu.style.overflowY="auto";
	tree_menu.style.overflowX="hidden";
		
	tree_menu.innerHTML="";
	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		mkDivisionLeaf(el,tree_menu,cnt);
		cnt++;
	});
};
function mkDivisionLeaf(el,tree_menu,cnt){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	//var str=el.parent_cd;
			
	a=cf.mkTag("div",tree_menu);
	a.style.paddingTop=8+"px";
	a.style.paddingLeft=padLeft+"px";
	a.style.marginRight=20+"px";
	a.style.backgroundColor="white";
	a.style.whiteSpace="nowrap";
	
	a.obj=el;
	a.idx=cnt;
	a.depth=el.division_level;
	a.chk=true;
	a.onclick=function(){
		getMem(this);
		mkMemberTable();
		if(prev==null){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			prev.style.fontWeight="normal";
			prev.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		prev=this;
	};
	if(a.obj.childNodes!=0){
		var img=cf.mkTag("img",a);
		img.className="btn_tree";			
		img.src="/images/exp_payment/tree_minus.gif";
		img.onclick=function(){
			var trg=this.parentNode;
			fold(trg);
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
	leaves.push(a);
};
//멤버리스트는 각페이지에서 오버라이드
function mkMemberTable(){
	var box=document.getElementById("userListView");
	box.innerHTML="";
	checks=new Array();
	
	var cnt=0;
	var ar=CURRENT_DIVISION_MEMBERS;
	ar.trav(function(d,i){
		mkTr(d);
		cnt++;
	});
	function mkTr(d){
		var tr=cf.mkTag("tr",box);
		tr.style.cursor="pointer";
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=5+"%";
		
		var ipt=cf.mkTag("input",td);
		ipt.type="checkbox";
		ipt.className="payment_id";
		ipt.name="payment_id";
		checks.push(ipt);
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=5+"%";
		td.innerHTML=cnt+1;
		
		var td=cf.mkTag("td",tr);
		td.width=10+"%";
		td.align="center";
		td.innerHTML=d.user_name;
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=14+"%";
		td.innerHTML=d.name_english;
		
		var td=cf.mkTag("td",tr);
		td.width=10+"%";
		td.align="center";
		td.innerHTML=d.login_id;
		
		var td=cf.mkTag("td",tr);
		td.width=14+"%";
		td.align="center";
		td.innerHTML=d.division_name;
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=7+"%";
		var strJob=d.job_title_name;
		if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
		td.innerHTML=strJob;
		
		var td=cf.mkTag("td",tr);
		td.width=20+"%";
		td.align="center";
		var span=cf.mkTag("span",td);
		span.innerHTML=d.email;
		span.style.width=95+"%";
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=7+"%";
		if(d.activate_yn=="0"){
			td.innerHTML="N";
		}else{
			td.innerHTML="Y";
		}
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width=7+"%";
		td.className="right";
		if(d.delete_yn=="0"){
			td.innerHTML="N";
		}else{
			td.innerHTML="Y";
		}
	};
};
//
function getMem(el){
	var obj=el.obj;
	var arr=MEMBERS;
	CURRENT_DIVISION=el.obj;
	CURRENT_DIVISION_MEMBERS=new Array();
	arr.trav(function(d,i){
		if(d.division_cd==obj.division_cd) CURRENT_DIVISION_MEMBERS.push(d);
	});
};
function divisionPop(opt){
	$.ajax({
		url: "/adm/auth/authInfoListAjax",
		type: "POST",
		async: true,
		dataType: 'json',
		success: function (data) {
			DIVISIONS=data.divisionList;
			MEMBERS=data.divisionUserList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		dataProc(true);
		callDiviPopCont(opt);
	};
	/*callDivisionMemberData(function(data){
		DIVISIONS=data.divisionList;
		MEMBERS=data.divisionUserList;
		dataProc(true);
		callDiviPopCont(opt);
	});	*/
	function callDiviPopCont(opt){
		var con=document.createElement("div");
		con.style.width=350+"px";
		con.style.height=494+"px";
		con.style.position="absolute";
		con.innerHTML="";
		con.id="divisionpop";
		
		var con0=cf.mkTag("div",con),		
			con1=cf.mkTag("div",con0);
		con1.style.width=350+"px";
		con1.style.height=494+"px";
		con1.style.border=2+"px solid black";
		con1.style.backgroundColor="white";
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="&nbsp&nbsp&nbsp&nbsp조직도";
		
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
		cf.setCss(con3,{paddingBottom:0+"px"});
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
		
		var srch=cf.mkTag("div",con4);
		srch.className="title3";
		var srch1=cf.mkTag("div",srch);
		dirSrch=cf.mkTag("input",srch1);
		dirSrch.placeholder="이름을 입력하세요  ex)홍길동";
		dirSrch.onkeypress=function(e){
			if(e.keyCode==13){
				divisionSrch();
			}
		};
		dirSrch.className="input_han";
		dirSrch.type="text";
		cf.setCss(srch,{marginBottom:10+"px"});
		cf.setCss(dirSrch,{width:240+"px",border:1+"px solid #dbdbdb",marginRight:12+"px"});
		
		var img=cf.mkTag("img",srch1);
		img.src="/images/btn/btn_search_small.gif";
		img.style.align="absmiddle";
		img.onclick=divisionSrch;
		
		var con5=cf.mkTag("div",con4);
		con5.className="Wrap_table";
		
		tree_menu=cf.mkTag("div",con5);
		tree_menu.className="tree_menu Normal_table";
		mkDivision("",con);
		
		var con6=cf.mkTag("div",con1),
			btn1=cf.mkTag("button",con6),
			span=cf.mkTag("span",con6),
			btn2=cf.mkTag("button",con6);

		con6.className="savebtn";
		btn1.className="ct-btn darkgrey small";
		btn1.innerHTML="추가";
		btn1.id="popbtn1";
		btn2.className="ct-btn grey small";
		btn2.innerHTML="취소";
		span.innerHTML="  ";
		btn1.onclick=function(){
			memberInsert(con);
		};		
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
			if(prev_user)prev_user="";
		};
		callPop(con);
	};
};
function divisionSrch(){
	var str=dirSrch.value,
		dv=document.getElementById("divisionpop");
	mkDivision(str,dv);	
};
function fold(l){
	leaves.trav(function(d,i){
		if(i>l.idx) return doFold(d,i);
	});
	function doFold(d,i){
		var cmp=l.depth-d.depth;
		if(cmp>=0) return true;
		if(l.chk){
			d.style.height=0+"px";
			d.style.paddingTop=0+"px";
			d.style.overflow="hidden";
		}else{
			var memSrch=d.obj.division_cd.substr(0,3);
			
			if(memSrch=="mem") d.childNodes[0].src="/images/ico/img_dot.gif";
			else d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
			d.style.height=14+"px";
			d.style.paddingTop=8+"px";
			d.style.overflow="";
		}
	};
};