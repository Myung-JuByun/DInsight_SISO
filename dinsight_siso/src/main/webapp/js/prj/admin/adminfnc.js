var select_PJCODE,select_COMPANYNAME,select_DIVISION,select_RESP,select_PAYMENT,STATUS,ROLELIST,STAY,PJCODE,COMPANYNAME,RESP,
	BRANDLIST,STATUSLIST,TYPELIST,DIVISIONUSERS,prev,prev_pjcode,DIVISIONS_op,
	checks=new Array(),info_checks=new Array(),rowCount=true;

function defaultLoadList(){
	//년월생성dateSelect();
	var obj={year : CurrentDate[0],month :CurrentDate[1],pjname : "",coname : "",username : ""},
		dv=document.getElementById("contents");
	callProjectAdminData(obj, function(data){
		PJCODE=data.projectNameList;
		//COMPANYNAME=data.companySearchList;
		STATUS=data.salesStatusCdList;
		STAY=data.stayStatusCdList;
		DIVISIONS_op=data.divisionList;
		var obj=data.projectList;
		prjList(obj);
	});
	
	var ar=[];
	DIVISIONS_op.trav(function(d,i){
		if(d.operation_yn==1)ar.push(d);
	});
	DIVISIONS_op=ar;
	cf.setCss(dv,{height:cf.workareaheight/4+"px"});
};
function searchAdmin(){
	var pjName=document.getElementById("search_pjName").value,
		companyName=document.getElementById("search_companyName").value,
		year=document.getElementById("sh_project_year").value,
		month=document.getElementById("sh_project_month").value,
		obj={year : year,month : month,pjname : pjName,coname : companyName};	
	callProjectAdminData(obj, function(data){
		//dir(data);
		var obj=data.projectList;
		prjList(obj);
	});
};
/*function dateSelect(){
	var year=document.getElementById("sh_project_year");
	var month=document.getElementById("sh_project_month");
	
	year.innerHTML="";
	month.innerHTML="";
	
	var date=new Date();
	var current_year=date.getFullYear()-1;
	var current_month=date.getMonth();
	
	createYearMonthDay("Y", 2013, "#sh_project_year");
	var op;
	for(i=0;i<12;i++){
		op=cf.mkTag("option",month);
		op.value=i+1;
		op.innerHTML=i+1;
		if(i==current_month){
			op.selected="selected";
		}
	}
};*/
function modiDate(data,opt){
	var y=data.substring(0,4);
	var m=data.substring(4,6);
	var d=data.substring(6,8);
	
	if(opt)	var date=y+"."+m+"."+d;
	else var date=y+"-"+m+"-"+d;
	return date;
};
function mkSelect(select, obj, def){
	var op;
	select.className= "select_pop";
	op=cf.mkTag("option",select);
	op.value="";
	op.innerHTML="선택안함";

	if(obj==DIVISIONS_op){
		obj.trav(function(d,i){			
			op=cf.mkTag("option",select);
			op.value=obj[i].division_cd;
			op.innerHTML=obj[i].division_name;
			if(def && obj[i].division_name==def){
				op.selected="selected";
			}
		});
		return;
	}
	if(obj==RESP){
		if(!RESP) return;
		obj.trav(function(d,i){
			op=cf.mkTag("option",select);
			op.value=d.customer_id;
			op.innerHTML=d.customer_name;
			if(def && d.customer_id==def){
				op.selected="selected";
			}
		});
	}else {
		obj.trav(function(d,i){
			op=cf.mkTag("option",select);
			op.value=d.code_id;
			op.innerHTML=d.code_name;
			if(def && d.code_id==def){
				op.selected="selected";
			}
		});
	}
};
function prjSave(con){
	var stat=document.getElementById("in_status");
	if(!stat.value){
		generalPopOk2("구분을 선택하세요.",function(){
			stat.focus();
		});
		return;
	}
	
	var pjcode=document.getElementById("in_pjcode");
	if(stat.value==01&&!pjcode){
		generalPopOk2("프로젝트 코드를 선택하세요.");
		return;
	}
	
	var in_pjid=document.getElementById("in_pjid");
	
	var pjname=document.getElementById("in_pjname");
	if(!pjname.value){
		generalPopOk2("프로젝트명을 입력하세요.",function(){
			pjname.focus();
		});
		return;
	}
	
	var companyid=document.getElementById("companyid");
	if(stat==02&&!companyid){
		generalPopOk2("고객사를 선택하세요.");
		return;
	}
	
	var stay=document.getElementById("in_stay");
	var start=document.getElementById("in_start");
	var end=document.getElementById("in_end");
	var contract=document.getElementById("in_contract");
	var division=document.getElementById("in_division");
	var operation=document.getElementById("in_opertaion_code");
	var staffname=document.getElementById("in_staff_name");
	var staffphone=document.getElementById("in_staff_phone_number");
		
	if(!companyid||!companyid.value){
		generalPopOk2("고객사를 선택하세요.");
		return;
	}else if(!start.value){
		generalPopOk2("시작일을 선택하세요.",function(){
			start.focus();
		});
		return;
	}else if(!end.value){
		generalPopOk2("종료일을 선택하세요.",function(){
			end.focus();
		});
		return;
	}else if(!staffname.value){
		generalPopOk2("담당자를 입력하세요.",function(){
			staffname.focus();
		});
		return;
	}else if(!staffphone.value){
		generalPopOk2("담당자 연락처를 입력하세요.",function(){
			staffphone.focus();
		});
		return;
	}else if(!contract.value){
		generalPopOk2("계약금액을 입력하세요.",function(){
			contract.focus();
		});
		return;
	}else if(!division.value){
		generalPopOk2("부서를 선택하세요.",function(){
			division.focus();
		});
		return;
	}
	//debugger;
	generalPop("저장하시겠습니까?", function(){
		$.ajax({
			url: "/prj/admin/projectAdminInsertAjax",
			type: "POST",
			data:{
				"in_project_id"	: in_pjid.value,
				"in_project_code" : pjcode.value,
				"in_sale_dev_cd" : stat.value,
				"in_staff_name" : staffname.value,
				"in_staff_phone_number" : staffphone.value,
				"in_project_name" : pjname.value,
				"in_company_id" : companyid.value,
				//"in_man_month" : mm.value,
				"in_start_day" : start.value,
				"in_end_day" : end.value,
				"in_contract_price" : uncomma(contract.value)*10000,
				//"in_customer_id" : respid.value,
				"in_division_cd" : division.value,
				"in_opertaion_code" : operation.value
				//"in_mobile" : mobile
			},
			dataType: "text",
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPop("저장되었습니다.");
				cf.killTag(con.parentNode);
				searchAdmin();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
};
function prjDel(){
	var temp = $("#pj_contents").find(":has(:checkbox:checked)").find("input").serialize();
	var cnt=0;
	//dir(temp);
	checks.trav(function(d,i){
		if(d.checked) cnt++;	
	});	
	if(cnt==0)generalPopOk2("삭제할 project를 선택하세요.");
	else{
		generalPop("삭제하시겠습니까?", function(){
			$.ajax({
				url: "/prj/admin/projectAdminDelAjax",
				type: "POST",
				data: temp ,
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
					var idx;
					checks.trav(function(d,i){
						if(d.checked){
							idx=i;
							cf.killTag(d.parentNode.parentNode);
						}
					});
					checks.splice(idx,1);
					searchAdmin();
					$('.wrap-loading').hide(20);
		   		},
		   		beforeSend:function(){
		   			$('.wrap-loading').show();
		   		}
			});
		});
	}
};
function pjcodeSave(con){
	var ipt=document.createElement("input");
	ipt.value=prev_pjcode.sales_project_code;
	ipt.id="in_pjcode";
	ipt.style.width=120+"px";
	ipt.readOnly=true;
	select_PJCODE.replaceChild(ipt,select_PJCODE.childNodes[0]);
	ipt.onclick=getProductCodePop;
				
	select_COMPANYNAME.childNodes[0].value=prev_pjcode.company_name;
	select_COMPANYNAME.childNodes[0].readOnly=true;
	
	var in_pjname=document.getElementById("in_pjname");
	in_pjname.value=prev_pjcode.module;
	
	var companyid=document.getElementById("companyid");
	companyid.value=prev_pjcode.company_id;
				
	select_PAYMENT.childNodes[0].readOnly=true;
	select_PAYMENT.childNodes[0].value=comma((prev_pjcode.contract_estimate_price/10000));
	
	cf.setCss(select_PJCODE,{textAlign:"left"});
	
	var def=prev_pjcode.operation_cd_name;
	var select=document.createElement("select");
	select.style.width=120+"px";
	mkSelect(select,DIVISIONS,def);
	select.id="in_division";
	select_DIVISION.replaceChild(select, select_DIVISION.childNodes[0]);
	var ipt_op=cf.mkTag("input",select_DIVISION);
	ipt_op.type="hidden";
	ipt_op.id="in_opertaion_code";
	select.onchange=function(e){
		var idx=e.target.selectedIndex,def = e.target.childNodes[idx].innerHTML;
		if(def.indexOf("전략")>=0||def.indexOf("솔루션")>=0||def.indexOf("M&S")>=0||def.indexOf("공공")>=0){
			ipt_op.value = "R";
		}else ipt_op.value = "T";
	};	
	cf.killTag(con);
};
function prjinfoDel(){
	var temp = $("#pj_info_contents").find(":has(:checkbox:checked)").find("input").serialize();
	var cnt=0;
	
	info_checks.trav(function(d,i){
		if(d.checked) cnt++;
	});
	
	//dir(temp);
	if(cnt==0) generalPopOk2("삭제할 사원을 선택하세요.");
	else{
		generalPop("삭제하시겠습니까?", function(){			
			$.ajax({
				url: "/prj/admin/projectAdminMemberDelAjax",
				type: "POST",
				data: temp,
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
					var idx;
					info_checks.trav(function(d,i){
						if(d.checked){
							idx=i;
							cf.killTag(d.parentNode.parentNode);
						}
					});
					info_checks.splice(idx,1);
					prev.onclick();
					//searchAdmin();
					$('.wrap-loading').hide(20);
		   		},
		   		beforeSend:function(){
		   			$('.wrap-loading').show();
		   		}
			});
		});
	}
};
function prjinfoSave(){
	var role=document.getElementsByName("din_role_cd"),
		len=role.length;
	
	if(len==0){
		generalPopOk2("저장할 인원이 없습니다.");
		return;
	}
	
	var cnt=0;
	role.trav(function(d,i){
		if(!d.value) cnt++;
	});
	if(cnt>0){
		generalPopOk2("역할을 선택하세요.",function(){
			role.trav(function(d,i){
				if(!d.value) d.focus();
			});
		});
		return;
	}

	var stay=document.getElementsByName("din_stay_status_cd");
	var ct=0;
	stay.trav(function(d,i){
		if(!d.value) ct++;
	});
	if(ct>0){
		generalPopOk2("상태를 선택하세요.",function(){
			stay.trav(function(d,i){
				if(!d.value) d.focus();
			});
		});
		return;
	}
	
	var st_day=document.getElementsByName("din_job_start_day");
	var ct=0;
	st_day.trav(function(d,i){
		if(!d.value) ct++;
	});
	if(ct>0){
		generalPopOk2("투입시작일 선택하세요.",function(){
			st_day.trav(function(d,i){
				if(!d.value) d.focus();
			});
		});
		return;
	}
	
	var end_day=document.getElementsByName("din_job_end_day");
	var ct=0;
	end_day.trav(function(d,i){
		if(!d.value) ct++;
	});
	if(ct>0){
		generalPopOk2("투입종료일 선택하세요.",function(){
			end_day.trav(function(d,i){
				if(!d.value) d.focus();
			});
		});
		return;
	}	
	generalPop("저장하시겠습니까?", function(){
		st_day.trav(function(d,i){
			var b=d.value;
			var bY=b.substring(0,4);
			var bM=b.substring(5,7);
			var bD=b.substring(8,10);
			d.value=bY+bM+bD;
		});
		
		end_day.trav(function(d,i){
			var b=d.value;
			var bY=b.substring(0,4);
			var bM=b.substring(5,7);
			var bD=b.substring(8,10);
			d.value=bY+bM+bD;
			if(!d.value) ct++;
		});
		
		var temp = $("#pj_info_contents").find("input, select").serialize();
		
		$.ajax({
			url: "/prj/admin/projectAdminMemberSaveAjax",
			type: "POST",
			data: temp,
			success : function (data) {
				if(data != "success") generalPop(data);
				else generalPop("저장되었습니다.");
				searchAdmin();
				var a=document.getElementById("pj_contents");
				a.children[prev.idx].onclick();
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	});
};
function companySave(prev_company_obj){
	select_COMPANYNAME.innerHTML="";
	select_COMPANYNAME.style.textAlign="";
	var input=cf.mkTag("input",select_COMPANYNAME);
	input.id="in_companyname";
	input.size="19";
	input.value=prev_company_obj.company_name;
	input.readOnly=true;
	input.onclick=function(){
		companyPopSrch(0);
	};
	
	var ipt=cf.mkTag("input",select_COMPANYNAME);
	ipt.type="hidden";
	ipt.id="companyid";
	ipt.value=prev_company_obj.company_id;

	document.getElementById("my_closs").onclick();
};
function checkMode(e,opt){
	if(!opt){
		if(e.checked){
			checks.trav(function(d,i){
				if(!d.checked) d.checked=true;
			});
		}else{
			checks.trav(function(d,i){
				if(d.checked) d.checked=false;
			});
		}
	}else{
		if(e.checked){
			info_checks.trav(function(d,i){
				if(!d.checked) d.checked=true;
			});
		}else{
			info_checks.trav(function(d,i){
				if(d.checked) d.checked=false;
			});
		}
	}
};
function dateCheck(stat,endd,flag){
	if(!stat.value){
		generalPopOk2("시작일을 먼저 선택하세요");
		endd.value="";
		return;
	}
	
	var end=endd.value;
	var endY=end.substring(0,4);
	var endM=end.substring(5,7);
	var endD=end.substring(8,10);
	var set=endY+"/"+endM+"/"+endD;		
	var enddate=new Date(set);	
	
	var startY=stat.value.substring(0,4);
	var startM=stat.value.substring(5,7);
	var startD=stat.value.substring(8,10);
	var set2=startY+"/"+startM+"/"+startD;		
	var startdate=new Date(set2);
	
	var m=enddate-startdate;
	var a=endY+""+endM+""+endD;	
	var b=startY+""+startM+""+startD;
	if(flag=="E"){
		if(prev.obj.start_day>b){
			generalPopOk2("프로젝트 시작일보다 이전입니다.");
			stat.value=modiDate(prev.obj.start_day);
			return;
		}
		if(prev.obj.end_day<a){
			generalPopOk2("프로젝트 종료일보다 이후입니다.");
			endd.value=modiDate(prev.obj.end_day);
			return;
		}
		if(m<0){
			generalPopOk2("프로젝트 시작일보다 이전입니다.");
			endd.value=modiDate(prev.obj.end_day);
			return;
		}
	}else if(flag=="S"){
		if(prev.obj.start_day>b){
			generalPopOk2("프로젝트 시작일보다 이전입니다.");
			stat.value=modiDate(prev.obj.start_day);
			return;
		}
		if(prev.obj.end_day<a){
			generalPopOk2("프로젝트 종료일보다 이후입니다.");
			endd.value=modiDate(prev.obj.end_day);
			return;
		}
		if(m<0){
			generalPopOk2("프로젝트 종료일보다 이후입니다.");
			stat.value=modiDate(prev.obj.start_day);
			return;
		}
	}else if(flag=="PS"){
		if(m<0){
			generalPopOk2("시작일이 종료일보다 이후입니다.");
			stat.value="";
			return;
		}
	}else if(flag=="PE"){
		if(m<0){
			generalPopOk2("종료일이 시작일보다 이전입니다.");
			endd.value="";
			return;
		}
	}else return;
};