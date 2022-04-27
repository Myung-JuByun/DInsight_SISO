var contractDetailPop = function(obj,opt){
	var con=document.createElement("div");	
	Object.assign(con.style, {width:"900px", height:"400px", position:"absolute"});
	con.innerHTML="";
	con.id="contract_detail_pop";
	
	var con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0);	
	Object.assign(con1.style, {width:"900px", height:"400px", border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2);
	con2.className="my_top";
	span.innerHTML="상세보기";
	
	var con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);
	con2_a.href="javascript:;";
	con2_a.className="my_top_closs";	
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3);
	con3.className="my-container";
	con3.style.height="350px";
	con3.style.overflowY="auto";
	con4.className="con_table";
	
	var con4_title=cf.mkTag("div",con4),
		str=cf.mkTag("div",con4_title);
	str.className="mini_title";
	str.innerHTML="계약서 버전 리스트";
	
	if(opt){
		var	btn_add=cf.mkTag("div",con4_title),
			btn_img=cf.mkTag("img",btn_add);
		btn_img.className="cursor";
		btn_img.src="/images/btn/btn_plus_on.gif";
		btn_img.onclick=function(){
			var data={
					contract_project_code:document.getElementById("pjcode").value,
					contract_id:"",
					contract_project_code_id:document.getElementById("pjcode_id").value,
					contract_name:"",
				};
			contractPop("prdsales",data);
		};
		cf.setCss(btn_add,{float:"right"});
	}
	
	var con5=cf.mkTag("div",con4),
		thead=cf.mkTag("div",con5),
		tbody=cf.mkTag("div",con5);
	con5.className="Wrap_table";
	tbody.id="contract_detail_pop_tbody";
	mkDetailhead(thead);
	mkDetailbody(tbody, obj);
	
	cf.setCss(str,{float:"left",paddingTop:"10px"});
	cf.setCss(con4_title,{height:"30px"});
	callPop(con);
}

var mkDetailhead = function(son){
	var table=cf.mkTag("table",son);
	table.style.width="100%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width="15%";
	th.innerHTML="Project code";
	var th=cf.mkTag("th", tr);
	th.style.width="23%";
	th.innerHTML="계약서명";
	var th=cf.mkTag("th", tr);
	th.style.width="30%";
	th.innerHTML="파일";
	var th=cf.mkTag("th", tr);
	th.style.width="5%";
	th.innerHTML="버전";
	var th=cf.mkTag("th", tr);
	th.style.width="10%";
	th.innerHTML="수정자";
	var th=cf.mkTag("th", tr);
	th.style.width="17%";
	th.className="right";
	th.innerHTML="수정일";
}

var mkDetailbody = function(son, obj){
	var table=cf.mkTag("table",son);
	table.style.width="100%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	obj.trav(function(d,i){
		var tr=cf.mkTag("tr",table);
		var td1=cf.mkTag("td", tr);
		td1.className="pd10 txt_center";
		td1.style.width="15%";
		td1.innerHTML=d.contract_project_code;
		
		var td2=cf.mkTag("td", tr);
		td2.className="pd10";
		td2.style.width="23%";
		td2.innerHTML=d.contract_name;
		
		var td3=cf.mkTag("td", tr);
		td3.className="pd10";
		td3.style.width="30%";
		
		if(d.contract_file_name != '' && d.contract_file_name != null && d.contract_file_name != undefined){
			var aTagImg = cf.mkTag("img", td3);
			aTagImg.src = "/images/ico/ico_filedown.gif";
			aTagImg.onclick = function(){
				window.open(encodeURI("/sas/contract/contractDownloadAjax?sh_contract_id=" + d.contract_id));
			};
		}
		
		var aTag = cf.mkTag("a", td3);
		//aTag.href = 'javascript:window.open(encodeURI("/sas/contract/contractDownloadAjax.do?sh_contract_id=' + d.contract_id + '"))';
		aTag.onclick = function(){
			window.open(encodeURI("/sas/contract/contractDownloadAjax?sh_contract_id=" + d.contract_id));
		};
		
		aTag.textContent = d.contract_file_name; 
		aTag.style.textDecoration="underline";
		aTag.style.cursor="pointer";
		
		var td4=cf.mkTag("td", tr);
		td4.style.textAlign="center";
		td4.style.width="5%";
		td4.innerHTML=d.contract_rivision;
		
		var td5=cf.mkTag("td", tr);
		td5.style.textAlign="center";
		td5.style.width="10%";
		td5.innerHTML=d.contract_user_name;
		
		var td6=cf.mkTag("td", tr);
		td6.className="right";
		td6.style.textAlign="center";
		td6.style.width="17%";
		td6.innerHTML=d.creation_date;
		
		if(i==0){
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
			cf.setCss(td5,{borderTop:"0px"});
			cf.setCss(td6,{borderTop:"0px"});
		}
	});
}

var contractPop = function(flag,data){
	var con=document.createElement("div");	
	Object.assign(con.style, {width:"450px", height:(flag=="new")?"237px" : "269px", position:"absolute"});
	con.className="pop_add";
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con),
		con1=cf.mkTag("div",con0);	
	Object.assign(con1.style, {width:"450px", height:(flag=="new")?"237px" : "269px", border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1),
		span=cf.mkTag("span",con2);
	con2.className="my_top";
	if(flag=="new") span.innerHTML="&nbsp&nbsp&nbsp&nbsp계약서 등록";
	else span.innerHTML="&nbsp&nbsp&nbsp&nbsp계약서 수정";
	
	var div=cf.mkTag("div",con1),
		span=cf.mkTag("sapn",div);
	div.className="descript asterisk pdl20";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";

	var con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a);
	con2_a.href="javascript:;";
	con2_a.className="my_top_closs";
	Object.assign(con2_img, {src:"/images/pop_btn/btn_pop_close.png", id:"my_closs", alt:"닫기", align:"right"});
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	
	var con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con4);
	con3.className="my-container popmargin35";	
	con4.className="con_table";	
	con5.className="Wrap_table";
	
	if(flag=="new") mkAddTable(con5);
	else mkModiTable(con5,flag,data);
	
	var con6=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con6),
		btn2=cf.mkTag("button",con6);	
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey small";
	btn2.className="ct-btn grey small";
	
	if(flag=="new")btn1.innerHTML="추가";
	else btn1.innerHTML="수정";
	btn2.innerHTML="취소";
	btn1.onclick=function(){
		contractSave(con,flag);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:"5px"});
	callPop(con);
};

var mkAddTable = function(son){
	var table=cf.mkTag("table",son);
	table.style.width="100%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width="100px";
	th.innerHTML="Project code";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.style.width="95%";
	ipt.readOnly=true;
	ipt.value="선택하세요.";
	ipt.onclick= function() {
		getProductCodePop();
	};
	var ipt=cf.mkTag("input",td);
	ipt.id="contractid";
	ipt.type="hidden";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcodeid";
	ipt.type="hidden";
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="계약서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="contractname";
	ipt.className="input_han";
	ipt.style.width="95%";

	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.className="";
	th.innerHTML="파일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="uploadFile";
	ipt.type="file";
	ipt.style.width="95%";
};

var mkModiTable = function(son,flag,data){
	var table=cf.mkTag("table",son);
	table.style.width="100%";
	table.cellpadding=0;
	table.cellspacing=0;
	table.className="Normal_table";
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.style.width="35%";
	th.innerHTML="Project code";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcode";
	ipt.value=data.contract_project_code;
	ipt.readOnly=true;
	cf.setCss(ipt,{width:"95%",backgroundColor:"#eee"});
	/*ipt.onclick=function() {
		getProductCodePop("SUCCESS_Y");
	};*/
	var ipt=cf.mkTag("input",td);
	ipt.id="contractid";
	ipt.type="hidden";
	ipt.value=data.contract_id;
	var ipt=cf.mkTag("input",td);
	ipt.id="pjcodeid";
	ipt.type="hidden";
	ipt.value=data.contract_project_code_id;
	
	var tr=cf.mkTag("tr",table);
	var th=cf.mkTag("th", tr);
	th.innerHTML="계약서명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="contractname";
	ipt.className="input_han";
	ipt.style.width="95%";
	ipt.value=data.contract_name;
	
	var tr=cf.mkTag("tr",table),
		th=cf.mkTag("th", tr);
	th.className="";
	th.innerHTML="파일";
	th.style.height="64px";
	var span=cf.mkTag("span",th); 
	span.className="asterisk";
	span.innerHTML="*";
	
	var td=cf.mkTag("td",tr);
	td.className="pd10 right";
	td.rowSpan = "2";
	
	if(flag=="modi"){
		var	aTagImg = cf.mkTag("img", td),
			aTag = cf.mkTag("a", td);
		aTagImg.src = "/images/ico/ico_filedown.gif";
		aTagImg.onclick = function(){
			window.open(encodeURI("/sas/contract/contractDownloadAjax?sh_contract_id=" + data.contract_id));
		};
		aTag.onclick = function(){
			window.open(encodeURI("/sas/contract/contractDownloadAjax?sh_contract_id=" + data.contract_id));
		};
		aTag.style.textDecoration="underline";
		aTag.style.cursor="pointer";	
		var con_file_name = data.contract_file_name; 
		if(con_file_name.length > 21){
			con_file_name = con_file_name.substring(0,21) + "...";
		}
		aTag.textContent = con_file_name;
	}
	var ipt=cf.mkTag("input",td);
	ipt.id="uploadFile";
	ipt.type="file";
	ipt.style.marginTop = "5px";
	ipt.style.width="95%";
};