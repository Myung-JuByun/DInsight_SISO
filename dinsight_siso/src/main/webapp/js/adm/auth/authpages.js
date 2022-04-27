var PREV_BUTTON;
var GRANT;

function defaultLoadList(){		
	callDivisionMemberData(function(data){
		DIVISIONS=data.divisionList;
		MEMBERS=data.divisionUserList;
		GRANT=data.grantList;
		
		getEls();
		dataDivisionProc();
		mkOnlyDivision();
		authButtonDiv();
	});
	tree_menu.style.height="466px";
}

//멤버 리스트
function mkMemberTable(){
	var box=document.getElementById("userListView");
	box.innerHTML="";
	
	var cnt=0;
	var ar=CURRENT_DIVISION_MEMBERS;
	ar.trav(function(d,i){
		if(d.delete_yn == 0){
			mkTr(d,i);
			cnt++;
		}
	});
	
	function mkTr(d,idx){
		var tr=cf.mkTag("tr",box);
		tr.style.cursor="pointer";
		
		var td1=cf.mkTag("td",tr);
		td1.align="center";
		td1.width="27px";
		
		var ipt=cf.mkTag("input",td1);
		ipt.type="checkbox";
		ipt.className="in_user_id";
		ipt.name="in_user_id";
		ipt.value=d.user_id;
		if($("input:checkbox[name='UserCheckMode']").is(":checked")){
			ipt.checked=true;
		}
		
		var td2=cf.mkTag("td",tr);
		td2.align="center";
		td2.innerHTML=d.user_name;
		
		var td3=cf.mkTag("td",tr);
		td3.align="center";
		td3.width="79px";
		var strJob=d.job_title_name;
		if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
		td3.innerHTML=strJob;
				
		var td4=cf.mkTag("td",tr);
		td4.width="97px";
		td4.align="center";
		td4.className="right";
		td4.innerHTML=d.division_name;
		
		if(idx==0){
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
		}
	};
	
	if($("input:checkbox[name='UserCheckMode']").is(":checked")){
		viewAuth(true);
	}
}

//권한버튼
function authButtonDiv(){
	var div=document.getElementById("authBtn");
	div.innerHTML= "";	
	var	topDiv=cf.mkTag("div", div),
		ch=(545-(38*(GRANT.length-1)))/2;	
	if(!isNumber(ch))ch=140;
	
	cf.setCss(topDiv,{overflow:"auto",paddingTop:ch-20+"px"});
	cf.setCss(div,{width:"100%",height:"545px",textAlign:"center",paddingTop:"20px"});
	
	GRANT.trav(function(d){
		if(d.code_name != "일반") {
			var button=cf.mkTag("button", topDiv);
			button.className="ct-btn darkgrey normal";
			button.style.width="130px";
			button.innerHTML=d.code_name +"&nbsp;&nbsp;&nbsp;>";
			button.onmouseover=function(){
				if(PREV_BUTTON==null){
					this.className="ct-btn grey normal";
				}else{
					PREV_BUTTON.className="ct-btn darkgrey normal";
					this.className="ct-btn grey normal";
				}			
				PREV_BUTTON=this;
			};
			button.onclick=function(){
				authSave(d);
			};
			
			var span=cf.mkTag("div", topDiv);
			span.style.height="10px";
		}
	});
	
	var bottomDiv=cf.mkTag("div",div),	
		button=cf.mkTag("button", bottomDiv);
	button.className="ct-btn red normal";
	button.innerHTML="메뉴 권한설정";
	button.onclick=authPop;
	cf.setCss(button,{width:"130px"});
	cf.setCss(bottomDiv,{width:"100%",paddingTop:"36px",position:"absolute",bottom:0,textAlign:"center"});
}

//설정 권한 리스트
function authViewTable(obj){
	$("input:checkbox[name='AuthCheckMode']").prop("checked", false);
	var box=document.getElementById("authList");
	box.innerHTML="";
	
	var cnt=0;
	obj.trav(function(d,i){
		mkTr(d,i);
		cnt++;
	});
	
	function mkTr(d,idx){
		var tr=cf.mkTag("tr",box);
		tr.style.cursor="pointer";
		
		var td1=cf.mkTag("td",tr);
		td1.align="center";
		td1.width="27px";
		
		var ipt1=cf.mkTag("input",td1),
			ipt2=cf.mkTag("input",td1);
		ipt1.type="checkbox";
		ipt1.className="in_grant_user_id";
		ipt1.name="in_grant_user_id";
		ipt1.value=d.grant_id+"@"+d.user_id;		
		ipt2.type="hidden";
		ipt2.name="in_grant_id";
		ipt2.value=d.grant_id;
		
		var td2=cf.mkTag("td",tr);
		td2.width="59px";
		td2.align="center";
		td2.innerHTML=d.user_name;
		
		var td3=cf.mkTag("td",tr);
		td3.align="center";
		td3.innerHTML=d.division_name;
		
		var td4=cf.mkTag("td",tr);
		td4.align="center";
		td4.width="67px";
		td4.className="right";
		td4.innerHTML=d.grant_name;
		
		if(idx==0){
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
		}
	};
};