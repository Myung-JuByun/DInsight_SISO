var PREV_TR, CURRENT_AUTH;

//메뉴 권한설정
function authPop(){	
	var con=$("<div></div>");
	con.html("");
	con.css({width:"1000px", height:"660px", position:"absolute"});	
	
	var con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0);
	con0.className="pop-mypage";
	con1.id="pop_my";	
	cf.setCss(con1, {width:"1000px", height:"660px", border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2);
	con2.className="my_top";
	span.innerHTML="메뉴 권한설정";
		
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	
	var con2_img=cf.mkTag("img",con2_a);	
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs1", alt:"닫기", align:"right"});
	con2_img.onmousedown=function(e){
		CURRENT_AUTH=null;
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	//con3.style.height=cf.workareaheight-140+"px";
	con3.style.overflowY="auto";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	con4.id="con_table";
	
	//상세화면 그리기
	authViewPop(con4);	
	callPop(con);
	
	//메뉴 트리 생성
	dataMenuProc();
	mkMenu();
}

function authViewPop(con){	
	//권한
	var authDiv=cf.mkTag("div",con);	
	cf.setCss(authDiv, {float:"left", width:"32%", position:"relative"});
	
	var div=cf.mkTag("div",authDiv);
	div.className="title2";
	div.innerHTML="권한";
	
	var div=cf.mkTag("div",authDiv);	
	cf.setCss(div, {width:"100%", height:"500px", borderTop:"2px solid black", borderBottom:"2px solid black", marginTop:"10px", overflow:"auto"});
	
	var table=cf.mkTag("table", div);	
	Object.assign(table, {cellPadding:0, cellSpacing:0, width:"260px", className:"Normal_table"});
	
	var thead=cf.mkTag("thead", table);
	var tr=cf.mkTag("tr", thead);
	var th=cf.mkTag("th", tr);
	th.innerHTML="권한";
	var th=cf.mkTag("th", tr);
	th.className="right";
	th.innerHTML="설명";
	
	var tbody=cf.mkTag("tbody", table);
	tbody.id="authPopList";
	
	//권한리스트 테이블
	GRANT.trav(function(d){		
		var tr=cf.mkTag("tr", tbody);
		tr.style.textAlign="center";
		tr.style.cursor="pointer";
		tr.onclick=function(){
			if(PREV_TR==null){
				//this.style.fontWeight="bold";
				//this.style.color="green";
				this.style.backgroundColor="#edfafb";
			}else{
				//PREV_TR.style.fontWeight="bold";
				//PREV_TR.style.color="black";
				PREV_TR.style.backgroundColor="white";
				//this.style.fontWeight="bold";
				//this.style.color="green";
				this.style.backgroundColor="#edfafb";
			}
			PREV_TR=this;
			
			//설정 메뉴 권한 리스트
			viewSaveMenuAtuhList(d);
			
			CURRENT_AUTH=d;
		};
		
		var td=cf.mkTag("td", tr);
		td.innerHTML=d.code_name;
		var td=cf.mkTag("td", tr);
		td.className="right";
		td.innerHTML=d.etc1;
	});
	
	var buttonDiv=cf.mkTag("div", authDiv);
	buttonDiv.style.textAlign="right";
	buttonDiv.style.paddingTop="10px";
	
	var button=cf.mkTag("div", buttonDiv);
	button.className="ct-btn grey normal";
	button.innerHTML="추가";
	button.onclick=function(){
		authAddPop(); //권한추가
	};
	
	var span=cf.mkTag("span", buttonDiv);
	span.style.width="10px";
	span.innerHTML="&nbsp;";
	
	var button=cf.mkTag("div", buttonDiv);
	button.className="ct-btn grey normal";
	button.innerHTML="삭제";
	button.onclick=function(){
		authDelSave(CURRENT_AUTH); //권한삭제
	};
	
	var span=cf.mkTag("span", con);
	span.style.width="2%";
	span.style.float="left";
	span.innerHTML="&nbsp;";
	
	//메뉴 트리
	var treeDiv=cf.mkTag("div",con);	
	cf.setCss(treeDiv, {float:"left", width:"32%", position:"relative"});
	
	var div=cf.mkTag("div",treeDiv);
	div.className="title2";
	div.innerHTML="&nbsp;";
	
	var div=cf.mkTag("div",treeDiv);
	cf.setCss(div, {width:"100%", height:"500px", borderTop:"2px solid black", borderBottom:"2px solid black", marginTop:"10px", overflow:"auto"});
	
	var table=cf.mkTag("table", div);
	Object.assign(table, {cellPadding:0, cellSpacing:0, width:"260px", className:"Normal_table"});
	
	var tr=cf.mkTag("tr", table);
	var th=cf.mkTag("th", tr);
	th.className="right";
	th.innerHTML="메뉴";
	
	var div=cf.mkTag("div",div);
	div.id="checkbox_menu_tree"; //메뉴 트리 id
	
	var buttonDiv=cf.mkTag("div", treeDiv);
	buttonDiv.style.textAlign="right";
	buttonDiv.style.paddingTop="10px";
	
	var button=cf.mkTag("div", buttonDiv);
	button.className="ct-btn grey normal";
	button.innerHTML="저장";
	button.onclick=function(){
		saveMenuAuth(CURRENT_AUTH);
	};
	
	var span=cf.mkTag("span", con);
	span.style.width="2%";
	span.style.float="left";
	span.innerHTML="&nbsp;";
	
	//메뉴 권한 리스트
	var menuDiv=cf.mkTag("div",con);
	cf.setCss(menuDiv, {float:"left", width:"32%", position:"relative"});
	
	var div=cf.mkTag("div",menuDiv);
	div.className="title2";
	div.innerHTML="권한 리스트";
	
	var div=cf.mkTag("div",menuDiv);	
	cf.setCss(div, {width:"100%", height:"500px", borderTop:"2px solid black", borderBottom:"2px solid black", marginTop:"10px", overflow:"auto"});
	
	var table=cf.mkTag("table", div);
	Object.assign(table, {cellPadding:0, cellSpacing:0, width:"260px", className:"Normal_table"});
	
	var thead=cf.mkTag("thead", table);
	var tr=cf.mkTag("tr", thead);
	var th=cf.mkTag("th", tr);
	th.width="13%";
	
	var input=cf.mkTag("input", th);
	input.type="checkbox";
	input.name="menuCheckMode";
	input.className="menuCheckMode";
	input.onclick=function(){
		GroupCheck('menuCheckMode', 'in_menu_id');
	};
	
	var th=cf.mkTag("th", tr);
	th.width="62%"
	th.innerHTML="설정메뉴";
	
	var th=cf.mkTag("th", tr);
	th.className="right";
	th.width="25%"
	th.innerHTML="권한";
	
	var tbody=cf.mkTag("tbody", table);
	tbody.id="viewSaveMenuAtuhList"; //메뉴 설정 권한 리스트
	
	var buttonDiv=cf.mkTag("div", menuDiv);
	buttonDiv.style.textAlign="right";
	buttonDiv.style.paddingTop="10px";
	
	var button=cf.mkTag("div", buttonDiv);
	button.className="ct-btn grey normal";
	button.innerHTML="삭제";
	button.onclick=function(){
		delMenuAuth(CURRENT_AUTH);
	};
}

//권한리스트 테이블
function authList(obj){	
	var tbody=document.getElementById("authPopList");
	tbody.innerHTML="";
	
	obj.trav(function(d){		
		var tr=cf.mkTag("tr", tbody);
		tr.style.textAlign="center";
		tr.style.cursor="pointer";
		tr.onclick=function(){
			if(PREV_TR==null){
				//this.style.fontWeight="bold";
				//this.style.color="green";
				this.style.backgroundColor="#edfafb";
			}else{
				//PREV_TR.style.fontWeight="bold";
				//PREV_TR.style.color="black";
				PREV_TR.style.backgroundColor="white";
				//this.style.fontWeight="bold";
				//this.style.color="green";
				this.style.backgroundColor="#edfafb";
			}
			PREV_TR=this;
			
			//설정 메뉴 권한 리스트
			viewSaveMenuAtuhList(d);
			
			CURRENT_AUTH=d;
		};
		
		var td=cf.mkTag("td", tr);
		td.innerHTML=d.code_name;
		var td=cf.mkTag("td", tr);
		td.className="right";
		td.innerHTML=d.etc1;
	});
}

//메뉴권한 설정 리스트
function viewMenuAuth(obj){	
	var tbody=document.getElementById("viewSaveMenuAtuhList");
	tbody.innerHTML="";
	
	obj.trav(function(d){
		var tr=cf.mkTag("tr", tbody);
		
		var td=cf.mkTag("td", tr);
		td.style.textAlign="center";
		
		var input=cf.mkTag("input", td);
		input.type="checkbox";
		input.name="in_menu_id";
		input.className="in_menu_id";
		if($("input:checkbox[name='menuCheckMode']").is(":checked")){
			input.checked=true;
		}
		input.value=d.grant_id+"@"+d.menu_id;
		
		var td=cf.mkTag("td", tr);
		if(d.menu_level == 1){
			td.style.paddingLeft=10*d.menu_level*1+"px";
			td.style.fontWeight="bold";
		}else{
			td.style.paddingLeft=(10*d.menu_level*1)+10+"px";
			td.style.fontWeight="normal";
		}
		td.innerHTML=d.menu_name.replace(/(<([^>]+)>)/ig,"");
		
		var td=cf.mkTag("td", tr);
		td.className="right";
		td.style.textAlign="center";
		td.innerHTML=d.grant_name;
	});
};
//권한추가 팝업
function authAddPop(){
	var con=document.createElement("div");
	con.html("");
	con.css({width:"400px", height:cf.workareaheight-480+"px", position:"absolute"});	
	
	var con0=cf.mkTag("div",con);
	con0.className="pop-mypage";
	
	var con1=cf.mkTag("div",con0);	
	con1.css({width:"400px", border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="권한추가";
		
	var con2_a=cf.mkTag("a",con2);
	con2_a.href="#";
	con2_a.className="my_top_closs";
	
	var con2_img=cf.mkTag("img",con2_a);
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs2", alt:"닫기", align:"right"});
	con2_img.onmousedown=function(e){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	//con3.style.height=cf.workareaheight-140+"px";
	//con3.style.overflowY="auto";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	con4.id="con_auth_table";
	
	//상세화면 그리기
	authAddViewTable(con4);
	
	var con5=cf.mkTag("div",con3);
	con5.className="savebtn";
	
	var button=cf.mkTag("button",con5);
	button.className="ct-btn darkgrey normal";
	button.innerHTML="저장";
	button.onclick=function(){
		 authAddSave(con); //저장
	};
	
	var span=cf.mkTag("span",con5);
	span.innerHTML=" ";
	
	var button=cf.mkTag("button",con5);
	button.className="ct-btn darkgrey normal";
	button.innerHTML="취소";
	button.onclick=function(){
		cf.killTag(con.parentNode);
	};	
	
	callPop(con);
}

//상세보기 - 권한추가
function authAddViewTable(con) {	
	var table=cf.mkTag("table",con);	
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.width="20%";
	th.style.textAlign="center";
	th.innerHTML="권한";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10";
	td.style.width="30%";
	
	var input=cf.mkTag("input",td);
	input.style.width="90%";
	input.id="grant_name";
	input.name="grant_name";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr);
	th.style.textAlign="center";
	th.innerHTML="설명";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	
	var input=cf.mkTag("input",td);
	input.style.width="90%";
	input.id="grant_explain";
	input.name="grant_explain";
};