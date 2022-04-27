function prjAdd(){
	var con=document.createElement("div");
	con.className="pop_add";
	con.innerHTML="";	
	Object.assign(con.style, {width:"600px", height:"336px", position:"absolute"});
	
	var con0=cf.mkTag("div",con);	
	var con1=cf.mkTag("div",con0);	
	Object.assign(con1.style, {width:"600px", height:"336px", border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="&nbsp&nbsp&nbsp&nbsp프로젝트 등록";
	
	var div=cf.mkTag("div",con1),
		span=cf.mkTag("sapn",div);
	div.className="descript asterisk pdl20";
	span.innerHTML="* 표시는 필수 입력 항목입니다.<br>";
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container popmargin35";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
	
	var con5=cf.mkTag("div",con4);
	con5.className="Wrap_table";
	
	var headTable=mkAddTable(con5);
	
	var con6=cf.mkTag("div",con3),
		btn1=cf.mkTag("button",con6),
		btn2=cf.mkTag("button",con6);
	con6.className="savebtn";
	btn1.className="ct-btn darkgrey small";
	btn2.className="ct-btn grey small";
	btn1.innerHTML="추가";
	btn2.innerHTML="취소";
	btn1.onclick=function(){
		prjSave(con);
	};		
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	callPop(con);
	cf.setCss(btn1,{marginRight:5+"px"});
	datePicker("input_date", "yy-mm-dd");
}

function prjModi(){
	if(!prev) generalPopOk2("수정할 Project를 선택하세요.");
	else{
		var con=document.createElement("div");
		con.className="pop_add";
		con.innerHTML="";
		Object.assign(con.style, {width:"600px", height:"336px", position:"absolute"});
		
		var con0=cf.mkTag("div",con);		
		var con1=cf.mkTag("div",con0);		
		Object.assign(con1.style, {width:"600px", height:"336px", border:"2px solid black", backgroundColor:"white"});		
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="&nbsp&nbsp&nbsp&nbsp프로젝트 수정";
		
		var div=cf.mkTag("div",con1),
		span=cf.mkTag("sapn",div);
		div.className="descript asterisk pdl20";
		span.innerHTML="* 표시는 필수 입력 항목입니다.";
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container popmargin35";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
		
		var con5=cf.mkTag("div",con4);
		con5.className="Wrap_table";
		
		var headTable=mkModiTable(con5);
		
		var con6=cf.mkTag("div",con3),
			btn1=cf.mkTag("button",con6),
			btn2=cf.mkTag("button",con6);
		con6.className="savebtn";
		btn1.className="ct-btn darkgrey small";
		btn2.className="ct-btn grey small";
		btn1.innerHTML="수정";
		btn2.innerHTML="취소";
		
		btn1.onclick=function(){
			prjSave(con);
		};			
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		callPop(con);
		cf.setCss(btn1,{marginRight:5+"px"});
		datePicker("input_date", "yy-mm-dd");
	}
}

function mkAddTable(p){
	var table=cf.mkTag("table",p);
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
	
	var tr1=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr1);
	th.style.width="100px";
	th.innerHTML="구분";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr1);
	td.className="pd10";
	td.style.width="149px";
	var select=cf.mkTag("select",td);
	select.id="in_status";
	select.style.width="120px";
	mkSelect(select,STATUS);
	
	var set;
	select.onchange=function(){
		set=this;
		select_PJCODE.innerHTML="";
		select_COMPANYNAME.innerHTML="";
		select_PAYMENT.innerHTML="";
		
		if(set.value=="01"){
			select_PJCODE.style.textAlign="center";
			var span=cf.mkTag("span",select_PJCODE);
			span.style.cursor="pointer";
			span.innerHTML="선택하세요.";
			span.onclick=function(){
				getProductCodePop();
			};
			
			select_COMPANYNAME.style.textAlign="";
			var input=cf.mkTag("input",select_COMPANYNAME);
			input.id="in_companyname";
			input.style.width="120px";
			input.readOnly=true;
			var ipt=cf.mkTag("input",td);
			ipt.type="hidden";
			ipt.id="companyid";
						
			var input=cf.mkTag("input",select_PAYMENT);
			input.id="in_contract";
			input.style.width="110px";
			input.readOnly=true;
			input.className="payment_input";

		}else{
			//개발
			select_PJCODE.style.textAlign="";
			var input=cf.mkTag("input",select_PJCODE);
			input.style.width="120px";
			input.id="in_pjcode";
			input.disabled=true;
			
			select_COMPANYNAME.style.textAlign="center";
			var span=cf.mkTag("span",select_COMPANYNAME);
			span.style.cursor="pointer";
			span.innerHTML="선택하세요.";
			span.onclick=function(){
				companyPopSrch(0);
			};
						
			var input=cf.mkTag("input",select_PAYMENT);
			input.id="in_contract";
			input.style.width="110px";
			input.className="payment_input";
			paymentSet(input);
			input.onkeyup=function(e){
				checkChar(e,this);
				this.value=comma(uncomma(e.target.value));
			};
		}
	};
	
	var th=cf.mkTag("th",tr1);
	th.style.width="100px";
	th.innerHTML="Project Code";
	select_PJCODE=cf.mkTag("td",tr1);
	select_PJCODE.className="pd10 right";
	select_PJCODE.style.cursor="pointer";
	var input=cf.mkTag("input",select_PJCODE);
	input.id="in_pjcode";
	input.disabled=true;
	cf.setCss(input,{width:"120px",backgroundColor:"#eee"});
	
	var tr2=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr2);
	th.innerHTML="프로젝트명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr2);
	td.className="pd10  right";
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="in_pjname";
	cf.setCss(input,{width:"400px"});
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.id="in_pjid";
	
	var tr3=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr3);
	th.innerHTML="고객사";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	select_COMPANYNAME=cf.mkTag("td",tr3);
	select_COMPANYNAME.className="pd10";
	var input=cf.mkTag("input",select_COMPANYNAME);
	input.id="in_companyname";
	input.disabled=true;
	cf.setCss(input,{width:"120px",backgroundColor:"#eee"});
	
	var th=cf.mkTag("th",tr3);
	th.innerHTML="계약(M/M)";
	var td=cf.mkTag("td",tr3);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="in_mm";
	ipt.readOnly=true;
	cf.setCss(ipt,{width:"120px",backgroundColor:"#eee"});
	
	var tr4=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr4);
	th.innerHTML="시작일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr4);
	td.className="pd10";
	var ipt_s=cf.mkTag("input",td);
	ipt_s.id="in_start";
	ipt_s.className="input_date";
	ipt_s.readOnly=true;
	cf.setCss(ipt_s,{width:"120px"});
	
	var th=cf.mkTag("th",tr4);
	th.innerHTML="종료일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr4);
	td.className="pd10  right";
	var ipt_e=cf.mkTag("input",td);
	ipt_e.id="in_end";
	ipt_e.className="input_date";
	ipt_e.readOnly=true;
	cf.setCss(ipt_e,{width:"120px"});
	
	ipt_s.onchange=function(){
		dateCheck(ipt_s,ipt_e,"PS");
	};
	ipt_e.onchange=function(){
		dateCheck(ipt_s,ipt_e,"PE");
	};
	
	var tr5=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr5);
	th.innerHTML="프로젝트 담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr5),
		ipt=cf.mkTag("input",td);
	td.className="pd10";
	ipt.id="in_staff_name";
	cf.setCss(ipt,{width:"120px"});
	
	var th=cf.mkTag("th",tr5);
	th.innerHTML="담당자 연락처";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr5),
		ipt=cf.mkTag("input",td);
	td.className="pd10 right";
	ipt.id="in_staff_phone_number";
	cf.setCss(ipt,{width:"120px"});
	
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeyup=function(e){
		checkChar(e,this);
	};
	phoneSet(ipt);
	
	var tr6=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr6);
	th.innerHTML="관련부서";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	select_DIVISION=cf.mkTag("td",tr6);
	select_DIVISION.className="pd10";
	var select=cf.mkTag("select",select_DIVISION);
	select.id="in_division";
	cf.setCss(select,{width:"120px"});
	mkSelect(select,DIVISIONS_op);
	var ipt_op=cf.mkTag("input",select_DIVISION);
	ipt_op.type="hidden";
	ipt_op.id="in_opertaion_code";
	select.onchange=function(e){
		var idx=e.target.selectedIndex,def = e.target.childNodes[idx].innerHTML;
		if(def.indexOf("전략")>=0||def.indexOf("솔루션")>=0||def.indexOf("M&S")>=0||def.indexOf("공공")>=0){
			ipt_op.value = "R";
		}else ipt_op.value = "T";
	};
	
	var th=cf.mkTag("th",tr6);
	th.innerHTML="계약금액(만)";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	select_PAYMENT=cf.mkTag("td",tr6);
	select_PAYMENT.className="pd10 right";
	var input=cf.mkTag("input",select_PAYMENT);
	input.id="in_contract";
	input.readOnly=true;
	cf.setCss(input,{width:"120px"});
}

function mkModiTable(p){
	var table=cf.mkTag("table",p);	
	Object.assign(table, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
	
	var tr1=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr1);
	th.style.width="100px";
	th.innerHTML="구분";
	var td=cf.mkTag("td",tr1);
	td.className="pd10";
	td.innerHTML=prev.obj.sale_dev_name;
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.id="in_status";
	ipt.value=prev.obj.sale_dev_cd;
	
	var th=cf.mkTag("th",tr1);
	th.style.width="100px";
	th.innerHTML="Project Code";
	select_PJCODE=cf.mkTag("td",tr1);
	select_PJCODE.className="pd10 right";
	select_PJCODE.style.cursor="pointer";
	var ipt=cf.mkTag("input",select_PJCODE);
	ipt.value=prev.obj.project_code;
	ipt.id="in_pjcode";
	ipt.readOnly=true;
	cf.setCss(ipt,{width:"120px",backgroundColor:"#eee"});
	
	var tr2=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr2);
	th.innerHTML="프로젝트명";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr2);
	td.className="pd10 right" ;
	td.colSpan="3";
	var input=cf.mkTag("input",td);
	input.id="in_pjname";
	input.value=prev.obj.project_name;
	cf.setCss(input,{width:"394px"});
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.id="in_pjid";
	ipt.value=prev.obj.project_id;
	
	var tr3=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr3);
	th.innerHTML="고객사";
	select_COMPANYNAME=cf.mkTag("td",tr3);
	select_COMPANYNAME.className="pd10";
	var ipt=cf.mkTag("input",select_COMPANYNAME);
	ipt.id="in_companyname";
	ipt.readOnly=true;
	ipt.value=prev.obj.company_name;
	cf.setCss(ipt,{width:"120px",backgroundColor:"#eee"});
	var ipt=cf.mkTag("input",td);
	ipt.type="hidden";
	ipt.id="companyid";
	ipt.value=prev.obj.company_id;
	
	var th=cf.mkTag("th",tr3);
	th.innerHTML="계약(M/M)";
	var td=cf.mkTag("td",tr3);
	td.className="pd10 right";
	var ipt=cf.mkTag("input",td);
	ipt.id="in_mm";
	ipt.value=prev.obj.man_month;
	ipt.readOnly=true;
	cf.setCss(ipt,{width:"120px",backgroundColor:"#eee"});
	
	var tr4=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr4);
	th.innerHTML="시작일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr4);
	td.className="pd10";
	var ipt_s=cf.mkTag("input",td);
	ipt_s.value=modiDate(prev.obj.start_day);
	ipt_s.id="in_start";
	ipt_s.className="input_date";
	ipt_s.readOnly=true;
	cf.setCss(ipt_s,{width:"120px"});
	
	var th=cf.mkTag("th",tr4);
	th.innerHTML="종료일";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr4);
	td.className="pd10 right";
	var ipt_e=cf.mkTag("input",td);
	ipt_e.value=modiDate(prev.obj.end_day);
	ipt_e.id="in_end";
	ipt_e.className="input_date";
	ipt_e.readOnly=true;
	cf.setCss(ipt_e,{width:"120px"});	
	ipt_s.onchange=function(){
		dateCheck(ipt_s,ipt_e,"PS");
	};
	ipt_e.onchange=function(){
		dateCheck(ipt_s,ipt_e,"PE");
	};
	
	var tr5=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr5);
	th.innerHTML="프로젝트 담당자";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr5),
		ipt=cf.mkTag("input",td);
	td.className="pd10";
	ipt.id="in_staff_name";
	ipt.value=prev.obj.staff_name;
	cf.setCss(ipt,{width:"120px"});
	
	var th=cf.mkTag("th",tr5);
	th.innerHTML="담당자 연락처";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	var td=cf.mkTag("td",tr5),
		ipt=cf.mkTag("input",td);
	td.className="pd10 right";
	ipt.id="in_staff_phone_number";
	ipt.value=prev.obj.staff_phone_number;
	cf.setCss(ipt,{width:"120px"});
	ipt.onblur=function(e){
		chk_tel(e.target,this);
	};
	ipt.onkeyup=function(e){
		checkChar(e,this);
	};
	phoneSet(ipt);
	
	var tr6=cf.mkTag("tr",table);
	var th=cf.mkTag("th",tr6);
	th.innerHTML="관련부서";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	select_DIVISION=cf.mkTag("td",tr6);
	select_DIVISION.className="pd10";
	var select=cf.mkTag("select",select_DIVISION);
	select.id="in_division";
	cf.setCss(select,{width:"120px"});
	var def=prev.obj.division_name;
	mkSelect(select,DIVISIONS_op, def);
	var ipt_op=cf.mkTag("input",select_DIVISION);
	ipt_op.type="hidden";
	ipt_op.id="in_opertaion_code";
	select.onchange=function(e){
		var idx=e.target.selectedIndex,def = e.target.childNodes[idx].innerHTML;
		if(def.indexOf("전략")>=0||def.indexOf("솔루션")>=0||def.indexOf("M&S")>=0||def.indexOf("공공")>=0){
			ipt_op.value = "R";
		}else ipt_op.value = "T";
	};
	
	var th=cf.mkTag("th",tr6);
	th.innerHTML="계약금액(만)";
	var span=cf.mkTag("span",th);
	span.className="asterisk";
	span.innerHTML="*";
	select_PAYMENT=cf.mkTag("td",tr6);
	select_PAYMENT.className="pd10 right";
	var input=cf.mkTag("input",select_PAYMENT);
	input.id="in_contract";
	input.className="payment_input";
	input.value=comma(prev.obj.contract_price/10000);
	cf.setCss(input,{width:"110px"});
	if(prev.obj.sale_dev_cd=="01"){
		input.readOnly=true;
	}else{
		input.onkeyup=function(e){
			checkChar(e,this);
			this.value=comma(uncomma(e.target.value));
		};
	}
};