mkSearchDiv();
defaultLoadList();
function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_project_year";
	select.name = "sh_project_year";
	mkYearSelect(select,CurrentDate[0]);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_project_month";
	select.name = "sh_project_month";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});

	var bx2=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx2),
		ipt=cf.mkTag("input", bx2);
	span.innerHTML = "프로젝트명";
	ipt.id = "search_pjName";
	ipt.name = "search_pjName";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			searchAdmin();
		}
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px"});
	
	var bx3=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx3),
		ipt=cf.mkTag("input", bx3);
	span.innerHTML = "고객사명";
	ipt.type="text";
	ipt.id = "search_companyName";
	ipt.name = "search_companyName";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			searchAdmin();
		}
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:35+"px"});

	var bx4=cf.mkTag("div", line1),
		img_re=cf.mkTag("img",bx4);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx4.className="cursor";
	bx4.onclick=function(){
		document.getElementById("sh_project_year").value=CurrentDate[0];
		document.getElementById("sh_project_month").value=CurrentDate[1];
		document.getElementById("search_pjName").value="";
		document.getElementById("search_companyName").value="";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick = searchAdmin;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left",paddingLeft:20+"px"});
};
function prjList(data){
	checks=new Array();
	var div=document.getElementById("pj_contents");
	div.innerHTML="";
	var info=document.getElementById("pj_info_contents");
	info.innerHTML="";
	var len=data.length;
	
	if(len==0){
		var tr=cf.mkTag("tr",div);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="19";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
	}else{
		data.trav(function(d,i){
			var tr=cf.mkTag("tr",div);
			tr.style.textAlign="center";
			tr.idx=i;
			tr.style.cursor="pointer";
			tr.onclick=function(){
				btnOn();
				
				if(prev==null){
					this.style.backgroundColor="#edfafb";
				}else{
					prev.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev=this;
				prev.obj=d;
				
				var title=document.getElementById("pj_info_title");
				title.innerHTML="";
				title.innerHTML=prev.obj.project_name+" (투입정보)";				
				var op={pjid : prev.obj.project_id};				
				callProjectBottomData(op, function(data){
					var list=data.projectMemberList
					ROLELIST=data.roleList;
					prjInfoList(list);
				});
			};
			
			var td1=cf.mkTag("td",tr);
			td1.style.width="3%";
			var ipt=cf.mkTag("input",td1);
			ipt.type="checkbox";
			ipt.name="mo_project_id";
			ipt.value=d.project_id;
			//ipt.obj=d.project_id;
			checks.push(ipt); 
			
			var td2=cf.mkTag("td",tr);
			td2.style.width="3%";
			td2.innerHTML=i+1;
			
			var td3=cf.mkTag("td",tr);
			td3.style.width="10%";
			td3.innerHTML=d.project_code;
			
			var td4=cf.mkTag("td",tr);
			td4.style.width="10%";
			td4.innerHTML=d.project_name;
				
			var td5=cf.mkTag("td",tr);
			td5.style.width="6%";
			td5.innerHTML=d.sale_dev_name;
			
			var td6=cf.mkTag("td",tr);
			td6.style.width="7%";
			var date=modiDate(d.start_day);
			td6.innerHTML=date;
			
			var td7=cf.mkTag("td",tr);
			td7.style.width="7%";
			var date=modiDate(d.end_day);
			td7.innerHTML=date;
			
			var td8=cf.mkTag("td",tr);
			td8.style.width="5%";
			td8.innerHTML=d.man_month;
			
			var td9=cf.mkTag("td",tr);
			td9.style.width="7%";
			td9.innerHTML=d.company_name;
			
			var td10=cf.mkTag("td",tr);
			td10.style.width="7%";
			td10.innerHTML=d.staff_name;
			
			var td11=cf.mkTag("td",tr);
			td11.style.width="7%";
			td11.innerHTML=d.staff_phone_number;
			
			var td12=cf.mkTag("td",tr);
			td12.style.width="10%";
			td12.innerHTML=d.division_name;
			
			var td13=cf.mkTag("td",tr);
			td13.style.width="10%";
			td13.className="right payment_input";
			td13.innerHTML=comma(d.contract_price/10000);
			
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
				cf.setCss(td7,{borderTop:0+"px"});
				cf.setCss(td8,{borderTop:0+"px"});
				cf.setCss(td9,{borderTop:0+"px"});
				cf.setCss(td10,{borderTop:0+"px"});
				cf.setCss(td11,{borderTop:0+"px"});
				cf.setCss(td12,{borderTop:0+"px"});
				cf.setCss(td13,{borderTop:0+"px"});
			}
		});
	}
};
function prjInfoList(data){
	info_checks=new Array();	
	var div=document.getElementById("pj_info_contents");
	div.innerHTML="";
	
	if(data.length>0) rowCount=false;
	else rowCount=true;
	
	if(rowCount){
		var tr=cf.mkTag("tr",div);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="7";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
		rowCount=false;
	}else{
		data.trav(function(d,i){
			if(!d.member_id)d.member_id="";
			if(!d.project_id)d.project_id="";
			if(!d.user_name)d.user_name="";
			if(!d.role_cd)d.role_cd="";
			if(!d.stay_status_cd)d.stay_status_cd="";
			if(!d.job_start_day)d.job_start_day="";
			if(!d.job_end_day)d.job_end_day="";
			if(!d.man_month)d.man_month="";
			
			var tr=cf.mkTag("tr",div);
			tr.style.textAlign="center";
			var td1=cf.mkTag("td",tr);
			td1.style.width=5+"%";
			var ipt=cf.mkTag("input",td1);
			ipt.type="checkbox";
			info_checks.push(ipt); 
			var ipt=cf.mkTag("input",td1);
			ipt.type="hidden";
			ipt.name="member_id";
			ipt.value=d.member_id;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width=5+"%";
			td2.innerHTML=i+1;
			var ipt=cf.mkTag("input",td2);
			ipt.type="hidden";
			ipt.value=d.project_id;
			ipt.name="din_project_id";
			
			var td3=cf.mkTag("td",tr);
			td3.style.width=15+"%";
			td3.innerHTML=d.user_name;
			var ipt=cf.mkTag("input",td3);
			ipt.type="hidden";
			ipt.value=d.user_id;
			ipt.name="din_user_id";
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=10+"%";
			var select=cf.mkTag("select",td4);
			select.style.width=90+"%";
			select.name="din_role_cd";
			var def=d.role_cd;
			mkSelect(select,ROLELIST,def);
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=15+"%";
			var select=cf.mkTag("select",td5);
			select.style.width=90+"%";
			select.name="din_stay_status_cd";
			var def=d.stay_status_cd;
			mkSelect(select,STAY,def);
			
			var td6=cf.mkTag("td",tr);
			td6.style.width=20+"%";
			var ipt_s=cf.mkTag("input",td6);
			ipt_s.style.width=95+"%";
			ipt_s.name="din_job_start_day";
			ipt_s.className="input_date";
			ipt_s.readOnly=true;
			ipt_s.value=modiDate(d.job_start_day);
					
			var td7=cf.mkTag("td",tr);
			td7.style.width=20+"%";
			var ipt_e=cf.mkTag("input",td7);
			ipt_e.style.width=95+"%";
			ipt_e.name="din_job_end_day";
			ipt_e.className="input_date";
			ipt_e.readOnly=true;
			ipt_e.value=modiDate(d.job_end_day);
			
			ipt_s.onchange=function(){
				dateCheck(ipt_s,ipt_e,'S');
			};
			ipt_e.onchange=function(){
				dateCheck(ipt_s,ipt_e,'E');
			};
			
			var td8=cf.mkTag("td",tr);
			td8.style.width=10+"%";
			td8.className="right";
			var ipt=cf.mkTag("input",td8);
			ipt.style.width=90+"%";
			ipt.value=d.man_month;
			ipt.name="din_man_month";
			ipt.placeholder="0.0";
			ipt.className="iptpadl0 iptCenter";
			ipt.onkeyup=function(e){
				checkChar(e,this);
				if(isNaN(e.target.value))this.value="";
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
				cf.setCss(td7,{borderTop:0+"px"});
				cf.setCss(td8,{borderTop:0+"px"});
			}
		});
		datePicker("input_date", "yy-mm-dd");
		rowCount=true;
	}
};
function memberInsert(con){
	var userid=document.getElementsByName("din_user_id"),
		memchk=true;
	userid.trav(function(d,i){
		if(prev_user&&d.value==prev_user.obj.user_id)memchk=false;
	});
	
	if(!prev_user)generalPopOk2("사원을 선택하세요.");
	else if(prev_user.obj.division_cd.indexOf("mem_")<0)generalPopOk2("사원을 선택하세요.");
	else if(!memchk)generalPopOk2("중복된 사원입니다.")
	else{
		var user=prev_user.obj;
		var div=document.getElementById("pj_info_contents");
		if(!rowCount)	div.innerHTML="";

		var tr=cf.mkTag("tr",div);
		tr.style.textAlign="center";
		var td=cf.mkTag("td",tr);
		td.style.width=5+"%";
		var ipt=cf.mkTag("input",td);
		ipt.type="checkbox";
		info_checks.push(ipt);
		var ipt=cf.mkTag("input",td);
		ipt.type="hidden";
		ipt.name="member_id";
		
		var td=cf.mkTag("td",tr);
		td.style.width=5+"%";
		td.innerHTML=div.childNodes.length;
		var ipt=cf.mkTag("input",td);
		ipt.type="hidden";
		ipt.value=prev.obj.project_id;
		ipt.name="din_project_id";
		
		var td=cf.mkTag("td",tr);
		td.style.width=15+"%";
		td.innerHTML=user.division_name;
		var ipt=cf.mkTag("input",td);
		ipt.type="hidden";
		ipt.name="din_user_id";
		ipt.value=user.user_id;
		
		var td=cf.mkTag("td",tr);
		td.style.width=10+"%";
		var select=cf.mkTag("select",td);
		select.style.width=90+"%";
		select.name="din_role_cd";
		mkSelect(select,ROLELIST);
		
		var td=cf.mkTag("td",tr);
		td.style.width=15+"%";
		var select=cf.mkTag("select",td);
		select.style.width=90+"%";
		select.name="din_stay_status_cd";
		mkSelect(select,STAY);
		
		var td=cf.mkTag("td",tr);
		td.style.width=20+"%";
		var ipt_s=cf.mkTag("input",td);
		ipt_s.style.width=95+"%";
		ipt_s.name="din_job_start_day";
		ipt_s.className="input_date";
		ipt_s.value=modiDate(prev.obj.start_day);
		ipt_s.readOnly=true;
		
		var td=cf.mkTag("td",tr);
		td.style.width=20+"%";
		var ipt_e=cf.mkTag("input",td);
		ipt_e.style.width=95+"%";
		ipt_e.name="din_job_end_day";
		ipt_e.className="input_date";
		ipt_e.value=modiDate(prev.obj.end_day);
		ipt_e.readOnly=true;
		
		ipt_s.onchange=function(){
			dateCheck(ipt_s,ipt_e,'S');
		};
		ipt_e.onchange=function(){
			dateCheck(ipt_s,ipt_e,'E');
		};
		
		var td=cf.mkTag("td",tr);
		td.style.width=10+"%";
		td.className="right";
		var ipt=cf.mkTag("input",td);
		ipt.style.width=90+"%";
		ipt.name="din_man_month";
		ipt.placeholder="0.0";
		ipt.className="iptpadl0 iptCenter";
		ipt.onkeyup=function(e){
			checkChar(e,this);
			if(isNaN(e.target.value))this.value="";
		};
		ipt.onfocus=function(e){
			if(e.target.value*1==0)this.value="";
		};
		
		cf.killTag(con.parentNode);
	}
	datePicker("input_date", "yy-mm-dd");
	rowCount=true;
	prev_user="";
};
function btnOn(){
	var btn=document.getElementById("btn_info");
	btn.innerHTML="";
	
	var div=cf.mkTag("div",btn),
		span=cf.mkTag("sapn",div);
	div.className="descript asterisk";
	span.innerHTML="* 표시는 필수 입력 항목입니다.";
	
	var ul=cf.mkTag("ul",btn);
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_plus_on.gif";
	img.style.cursor="pointer";
	img.alt="추가";
	img.onclick=divisionPop;
	
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_del_on.gif";
	img.style.cursor="pointer";
	img.alt="삭제";
	img.onclick=prjinfoDel;
	
	var li=cf.mkTag("li",ul);
	var img=cf.mkTag("img",li);
	img.src="/images/btn/btn_save_on.gif";
	img.style.cursor="pointer";
	img.alt="저장";
	img.onclick=prjinfoSave;
	
//	var title=document.getElementById("pj_info_title");
//	title.innerHTML="";
//	title.innerHTML=prev.obj.project_name;
};