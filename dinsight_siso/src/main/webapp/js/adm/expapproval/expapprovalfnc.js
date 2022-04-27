var DIVISIONS,MEMBERS,DIVISION_ROOT,CURRENT_DIVISION,CURRENT_DIVISION_MEMBERS=new Array(),
	APPROVAL,APPROVAL_MILEAGE,CURRENT_APPROVAL=new Array(),CURRENT_MILEAGE=new Array(),leaves=[],prev;

function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_year";
	select.name = "sh_expanse_year";
	span.innerHTML = "년";
	mkYearSelect(select,CurrentDate[0]);
	select.onchange=function(){
		expanseSearch();
	};
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"187px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_month";
	select.name = "sh_expanse_month";
	mkMonthSelect(select,CurrentDate[1]);
	select.onchange=function(){
		expanseSearch();
	};	
	span.innerHTML = "월";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(bx1,{float:"left"});
}

function defaultLoadList(){	
	var obj = {year :CurrentDate[0],month :CurrentDate[1]};	
	callexApprovalData(obj, function (data){
		approvalList(data);
	});
}

//검색
function expanseSearch() {
	var obj = {year : $("#sh_expanse_year").val(),month :$("#sh_expanse_month").val()};	
	callexApprovalData(obj, function (data){
		approvalList(data);
	});
}

//리스트 출력
function approvalList(data) {
	DIVISIONS=data.divisionList;
	MEMBERS=data.divisionUserList;
	APPROVAL=data.userExList;
	APPROVAL_MILEAGE=data.userExMList;
	
	dataProc(true);
	mkDivision();	
}

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
}
	
function mkDivision(){
	var tree_menu=document.getElementById("tree_menu");
	tree_menu.innerHTML="";
	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		mkLeaf(el,tree_menu,cnt);
		cnt++;
	});
}

function mkLeaf(el,tree_menu,cnt){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	var str=el.parent_cd;
			
	var a=cf.mkTag("div",tree_menu);
	cf.setCss(a, {paddingTop:"8px", paddingLeft:padLeft+"px", marginRight:"20px", whiteSpace:"nowrap", cursor:"pointer"});
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
		Object.assign(img, {className:"btn_tree", id:"btn_tree", src:"/images/exp_payment/tree_minus.gif"});
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
		getAprooval(pa);
		mkApprovalTable();
		mileageYN();
		
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
		prev.obj=pa.obj;
		prev.idx=cnt;
	};
	leaves.push(a);
}
	
function getMem(el){
	var obj=el.obj;
	var arr=MEMBERS;
	CURRENT_DIVISION=el.obj;
	CURRENT_DIVISION_MEMBERS=new Array();
	arr.trav(function(d,i){
		if(d.division_cd==obj.division_cd) CURRENT_DIVISION_MEMBERS.push(d);
	});
}

function getAprooval(data){
	var current_d=data.obj;
	var app=APPROVAL;
	var mile=APPROVAL_MILEAGE;
	
	CURRENT_APPROVAL=new Array();
	CURRENT_MILEAGE=new Array();
	
	app.trav(function(d,i){
		//debugger;
		if(d.creator==current_d.user_id){
			CURRENT_APPROVAL.push(d);
		}
	});
	mile.trav(function(d,i){
		if(d.creator==current_d.user_id) CURRENT_MILEAGE.push(d);
	});
}

function mkApprovalTable(){
	var approvalView=document.getElementById("approvalView");
	approvalView.innerHTML="";
	
	var cnt=0;
	var ar=CURRENT_APPROVAL;
	ar.trav(function(d,i){
		mkTr(d,i);
		cnt++;
	});
	if(cnt==0){
		var tr=cf.mkTag("tr",approvalView);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="7";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:"0px"});
	}	
	
	function mkTr(d,i){
		var tr=cf.mkTag("tr",approvalView);
				
		var td1=cf.mkTag("td",tr);
		td1.align="center";
		td1.width="40px";
		td1.innerHTML=cnt+1;
		
		var td2=cf.mkTag("td",tr);
		td2.align="center";
		td2.width="80px";
		td2.innerHTML=d.pay_day;
		
		var td3=cf.mkTag("td",tr);
		td3.align="center";
		td3.width="90px";
		td3.innerHTML=d.expanse_type_name;
		
		var td4=cf.mkTag("td",tr);
		td4.width="80px";
		td4.align="center";
		td4.innerHTML=d.category_name;
		
		var td5=cf.mkTag("td",tr);
		td5.align="right";
		td5.width="80px";
		td5.style.paddingRight="10px"
		td5.innerHTML=comma(d.payment);
		
		var td6=cf.mkTag("td",tr);
		td6.align="center";
		td6.innerHTML=d.expanse_name;
		
		var td7=cf.mkTag("td",tr);
		td7.width="63px";
		td7.align="center";
		td7.innerHTML=d.code_name;
		td7.className="right";
		
		if(i==0){
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
			cf.setCss(td5,{borderTop:"0px"});
			cf.setCss(td6,{borderTop:"0px"});
			cf.setCss(td7,{borderTop:"0px"});
		}
	};
}

function fold(l){
	leaves.trav(function(d,i){
		if(i>l.idx) return doFold(d,i);
	});
	
	function doFold(d,i){
		var cmp=l.depth-d.depth;
		if(cmp>=0) return true;
		if(l.chk){			
			Object.assign(d.style, {height:"0px", paddingTop:"0px", overflow:"hidden"});
		}else{
			var memSrch=d.obj.division_cd.substr(0,3);
			
			if(memSrch=="mem") d.childNodes[0].src="/images/ico/img_dot.gif";
			else d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
			Object.assign(d.style, {height:"14px", paddingTop:"8px", overflow:""});
		}
	};
}

function mileagePop(){
	if(CURRENT_MILEAGE.length==0) generalPop("마일리지가 없습니다.");
	else{
		var con=document.createElement("div");
		con.innerHTML="";
		Object.assign(con.style, {width:"800px", height:"600px", position:"absolute"});
		
		var con0=cf.mkTag("div",con);
		
		var con1=cf.mkTag("div",con0);
		con1.id="mileage_pop";
		con1.className="pop-layer2";		
		Object.assign(con1.style, {width:"800px", height:"600px", border:"2px solid black", backgroundColor:"white"});
		
		var con2=cf.mkTag("div",con1);
		con2.className="mil_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="&nbsp&nbsp&nbsp&nbsp마일리지";
		
		var con2_a=cf.mkTag("a",con2);
		con2_a.href="#";
		con2_a.className="layerClose";
		var con2_img=cf.mkTag("img",con2_a);		
		con2_img.style.paddingRight="5px";
		Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", alt:"닫기", align:"right"});
		
		con2_img.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		var con3=cf.mkTag("div",con1);
		con3.className="mil-container";
		con3.style.overflowY="auto";
		con3.style.height="525px";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table div_overflow_mileage";
					
		var con5=cf.mkTag("div",con4);
		con5.className="Wrap_table";
						
		var tb1=cf.mkTag("table",con5);		
		Object.assign(tb1, {cellpadding:0, cellspacing:0, className:"Normal_table"});
		
		var tr=cf.mkTag("tr",tb1);
		var th=cf.mkTag("th",tr);
		th.style.width="5%";
		th.innerHTML="No.";
		
		var th=cf.mkTag("th",tr);
		th.style.width="10%";
		th.innerHTML="날짜";
		
		var th=cf.mkTag("th",tr);
		th.style.width="15%";
		th.innerHTML="이동목적";
		
		var th=cf.mkTag("th",tr);
		th.style.width="15%";
		th.innerHTML="출발지";
		
		var th=cf.mkTag("th",tr);
		th.style.width="15%";
		th.innerHTML="경유지";
		
		var th=cf.mkTag("th",tr);
		th.style.width="15%";
		th.innerHTML="도착지";
		
		var th=cf.mkTag("th",tr);
		th.style.width="10%";
		th.innerHTML="유종";
		
		var th=cf.mkTag("th",tr);
		th.style.width="7%";
		th.innerHTML="거리";
		
		var th=cf.mkTag("th",tr);
		th.style.width="8%";
		th.className="right";
		th.innerHTML="합계";
				
		var tb2=cf.mkTag("table",con5);
		Object.assign(tb2, {cellpadding:0, cellspacing:0, className:"Normal_table"});
		
		var sum_cost=0;
		var sum_distance=0;
		var cnt=0;
		
		CURRENT_MILEAGE.trav(function(d,i){
			cnt++;
			
			var tr=cf.mkTag("tr",tb2);
			
			var td=cf.mkTag("td",tr);
			td.style.width="5%";
			td.innerHTML=cnt;
			td.className="txt_center mileageListIndex"
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.drive_day;
			td.className="txt_center"
			
			var td=cf.mkTag("td",tr);
			td.style.width="15%";
			td.innerHTML=d.purpose;
			td.className="txt_center"
			
			var td=cf.mkTag("td",tr);
			td.style.width="15%";
			td.innerHTML=d.start_point;
			td.className="txt_center"
			
			var td=cf.mkTag("td",tr);
			td.style.width="15%";
			td.innerHTML=d.via_point;
			td.className="txt_center"
			
			var td=cf.mkTag("td",tr);
			td.style.width="15%";
			td.innerHTML=d.end_point;
			td.className="txt_center"
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.oil_cd_name;
			td.className="txt_center"
			
			
			var td=cf.mkTag("td",tr);
			td.style.width="7%";
			td.innerHTML=d.distance;
			td.align="right";
			td.style.paddingRight="5px";
			
			var td=cf.mkTag("td",tr);
			td.style.width="8%";
			td.align="right";
			td.className="right";
			td.style.paddingRight="5px";
			td.innerHTML=comma(d.cost);
			
			sum_cost=sum_cost+d.cost*1;
			sum_distance=sum_distance+d.distance*1;
										
		});
		
		//var con7=cf.mkTag("div",con5);
		var tfoot=cf.mkTag("tfoot",tb2);
		var tr=cf.mkTag("tr",tfoot);
		
		var td=cf.mkTag("td",tr);
		td.className="sum";
		td.colSpan=7;
		td.innerHTML="합계";
		
		var td=cf.mkTag("td",tr);
		td.style.width="7%";
		td.className="sum_cost";
		td.innerHTML=sum_distance;
		
		var td=cf.mkTag("td",tr);
		td.style.width="8%";
		td.className="sum_cost";
		td.innerHTML=comma(sum_cost);
		
		callPop(con);
	}
}
	
function approvalRecall(){
	if(!prev){
		generalPop("회수할 사원을 선택하세요.");
	}else{
		
		if(CURRENT_APPROVAL.length=="0"&&CURRENT_MILEAGE.length=="0"){
			generalPop("회수할 내역이 없습니다.");
			return;
		}
		
		if(CURRENT_APPROVAL.length!="0"&&CURRENT_APPROVAL[0].code_name=="지급 승인"){
			generalPop("경비를 지급하여 회수 할 수 없습니다.");
			return;
		}
		
		var approval;
		var monthly;
		
		if(CURRENT_APPROVAL.length!="0"){
			approval=CURRENT_APPROVAL[0].approval_id;
			monthly=CURRENT_APPROVAL[0].expanse_monthly_id;
		}
		if(CURRENT_MILEAGE.length!="0"){
			approval=CURRENT_MILEAGE[0].approval_id;
			monthly=CURRENT_MILEAGE[0].expanse_monthly_id;
		}

		generalPop("회수 하시겠습니까?", function(){
			$.ajax({
				url: "/adm/expapproval/payApprovalCancel",
				type: "POST",
				data:{
					"approval_id" : approval,
					"expanse_monthly_id" : monthly
				},
				dataType: "text",
				success : function (data) {
					if(data != "success")
						generalPop(data);
					defaultLoadList();
					var a=document.getElementById("tree_menu");
					a.children[prev.idx].children[1].onclick();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
}

function approvalPermit(){
	if(CURRENT_APPROVAL.length==0&&CURRENT_MILEAGE.length==0) generalPop("승인할 내역이 없습니다.");
	else{
		var nodeid,
			monthlyid;
		
		if(CURRENT_APPROVAL.length==0&&CURRENT_MILEAGE.length>0){
			nodeid=CURRENT_MILEAGE[0].node_id;
			monthlyid=CURRENT_MILEAGE[0].expanse_monthly_id;
		}else{
			nodeid=CURRENT_APPROVAL[0].node_id;
			monthlyid=CURRENT_APPROVAL[0].expanse_monthly_id;
		}
		
		generalPop("경비 지급 하시겠습니까?", function(){
			$.ajax({
				url: "/adm/expapproval/payApprovalPermit",
				type: "POST",
				data:{
					"node_id" : nodeid,
					"expanse_monthly_id" : monthlyid
				},
				dataType: "text",
				success : function (data) {
					if(data != "success")
						generalPop(data);
					defaultLoadList();
					var a=document.getElementById("tree_menu");
					a.children[prev.idx].children[1].onclick();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
}

function openPrint(){
	if(CURRENT_APPROVAL.length==0&&CURRENT_MILEAGE.length==0) generalPop("내역이 없습니다.");
	else{
		var con=document.createElement("div");
		Object.assign(con.style, {height:"820px", height:cf.workareaheight-60+"px", position:"absolute", backgroundColor:"white"});
		
		var creator,
			monthlyid;
		
		if(CURRENT_APPROVAL.length==0&&CURRENT_MILEAGE.length>0){
			creator=CURRENT_MILEAGE[0].creator;
			monthlyid=CURRENT_MILEAGE[0].expanse_monthly_id;
			username=prev.obj.division_name
		}else{
			creator=CURRENT_APPROVAL[0].creator;
			monthlyid=CURRENT_APPROVAL[0].expanse_monthly_id;
			username=prev.obj.division_name;
		}
		
		var dn=CURRENT_DIVISION.division_name;
		if(CURRENT_DIVISION.division_cd.substring(0,3)=="mem"){
			dn=CURRENT_DIVISION.parentNode.division_name;
		}
		
		var today = new Date();
		var lastday = today.getFullYear()+"년 "+(today.getMonth() + 1)+"월 "+ today.getDate()+"일";
			
		var obj = {
				year : $("#sh_expanse_year").val(),
				month : $("#sh_expanse_month").val(),
				day : lastday,
				creator : creator,
				objectid : monthlyid, //
				username : username, //
				divisionname : dn
		}
		mkPrint(con, false, obj);
		callPop(con);
	}//else
}

function mileageYN(){
	var mile=document.getElementById("mile");
	mile.innerHTML="";
		
	var img=cf.mkTag("img",mile);
	img.alt="마일리지";
	
	if(CURRENT_MILEAGE.length==0){
		img.onclick=mileagePop;
		img.src="/images/btn/btn_mil_off.gif";
	}else{
		img.onclick=mileagePop;
		img.src="/images/btn/btn_mil_on.gif";
		img.style.cursor="pointer";
	}
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}