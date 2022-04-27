defaultLoadList();

//부서 리스트 출력
var divisionList = function(opt) {
	debugger;
	if(!opt){
		box=document.getElementById("userListView");
	}
	if(opt){
		defaultLoadList();
		return;
	}
	$.ajax({
		url: "/exp/payment/paymentTotalSearch",
		type: "POST",
		dataType: "json",
		data: {"sh_payment_type":select.value},
		async: false,
		success : function(data){
			pageInit(data);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};

var pageInit = function(data){	
	DIVISIONS=data.divisionList;
	MEMBERS=data.userList;
	GETTERS=data.receiveList;
	PREVLINE=data.paymentList;
	
	STACK_EX.delall();
	STACK_OK.delall();
	STACK_GET.delall();
	PREVLINE.trav(function(d,i){
		if(i==0) return;
		if(i==PREVLINE.length-1) STACK_OK.push(d);
		else STACK_EX.push(d); 
	});
	STACK_GET.push(GETTERS[0]);
	mkResult();
	dataProc();
	mkDivision();
};

var dataProc = function(){
	var dt=DIVISIONS;
	//make recursive data structure/////////////////
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
	///////////////////////////////////////////////
};

var mkDivision = function(){
	Object.assign(tree_menu.style, {width:"225px", height:"288px", overflowY:"auto", overflowX:"hidden"});	
	tree_menu.innerHTML="";
	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		mkLeaf(el,tree_menu,cnt);
		cnt++;
	});
	
	
};

var mkLeaf = function(el,tree_menu,cnt){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	var str=el.parent_cd;
			
	a=cf.mkTag("div",tree_menu);	
	cf.setCss(a, {paddingTop:"8px", paddingLeft:padLeft+"px", marginRight:"20px", backgroundColor:"white", whiteSpace:"nowrap"});
	
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

var getMem = function(el){
	var obj=el.obj;
	var arr=MEMBERS;
	CURRENT_DIVISION=el.obj;
	CURRENT_DIVISION_MEMBERS=new Array();
	arr.trav(function(d,i){
		if(d.division_cd==obj.division_cd) CURRENT_DIVISION_MEMBERS.push(d);
	});
};

var mkMemberTable = function(){
	box.innerHTML="";
	checks=new Array();
	
	var ar=getRealList();
	ar.trav(function(d,i){
		mkTr(d);
	});
	
	function mkTr(d){
		var tr=cf.mkTag("tr",box);
		tr.style.cursor="pointer";
		
		var td=cf.mkTag("td",tr);
		td.align="center";
		td.width="30px";
		
		var ipt=cf.mkTag("input",td);
		ipt.type="checkbox";
		ipt.className="payment_id";
		ipt.name="payment_id";
		checks.push(ipt);
		
		var td=cf.mkTag("td",tr);
		td.width="59px";
		td.align="center";
		td.innerHTML=d.user_name;
		
		var td=cf.mkTag("td",tr);
		td.width="49px";
		td.align="center";
		var strJob=d.job_title_name;
		if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
		td.innerHTML=strJob;
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.align="center";
		td.innerHTML=d.division_name;
	};
};

var fold = function(l){
	var btn_tree=l.getElementsByClassName("btn_tree");
	leaves.trav(function(d,i){
		if(i>l.idx) return doFold(d,i);
	});
	
	function doFold(d,i){
		var cmp=l.depth-d.depth;
		if(cmp>=0) return true;
		if(l.chk){
			Object.assign(d.style, {height:"0px", paddingTop:"0px", overflow:"hidden"});
		}else{
			if(btn_tree)
				d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
							
			Object.assign(d.style, {height:"14px", paddingTop:"8px", overflow:""});
		}
	};
};