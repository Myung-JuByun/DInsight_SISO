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
	span.innerHTML = "년";
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"280px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_project_month";
	select.name = "sh_project_month";
	mkMonthSelect(select,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_project_week";
	select.name = "sh_project_week";
	span.innerHTML = "주차";
	cf.setCss(select,{width:"50px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});

	var bx2 = cf.mkTag("div", line1);
	bx2.id = "weekDate";

	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick=function(){
		searchAdmin();
	};
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left",paddingTop:"5px",paddingLeft:"12px"});
}

function reportList(obj){	
	select_mon=new Array();
	select_tue=new Array();
	select_wed=new Array();
	select_thu=new Array();
	select_fri=new Array();
	select_sat=new Array();
	select_sun=new Array();

	var dv=document.getElementById("reporttb2"),
		box=document.getElementById("mm_contents");
	box.innerHTML="";
	cf.setCss(dv,{height:cf.workareaheight-386+"px",minHeight:"499px",overflowY:"scroll",overflowX:"hidden"});
	
	var len=obj.length;
	if(len==0){
		var tr=cf.mkTag("tr",box);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="12";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:"0px"});
	}else{
		var week=document.getElementById("weekDate"),
			searchDay=saveDate(week.innerHTML.substring(14,24));
		obj.trav(function(d,i){
			var tr=cf.mkTag("tr",box);
			tr.style.textAlign="center";
			
			if(compareNowDate>searchDay){
				tr.onclick = function () {
					generalPopOk2("제출기간이 지났습니다.");
				};
			}			
			var td1=cf.mkTag("td",tr);
			td1.style.width="39px";
			td1.innerHTML=i+1;
			var ipt=cf.mkTag("input",td1);
			ipt.className="iptCenter";
			ipt.placeholder=0;
			ipt.name="in_commute_id";
			ipt.value=d.commute_id;
			ipt.type="hidden";

			var td2=cf.mkTag("td",tr);
			td2.innerHTML=d.project_name;
			var ipt=cf.mkTag("input",td2);
			ipt.name="in_project_id";
			ipt.value=d.project_id;
			ipt.type="hidden";
			var ipt=cf.mkTag("input",td2);
			ipt.className="iptCenter";
			ipt.placeholder=0;
			ipt.name="in_project_name";
			ipt.value=d.project_name;
			ipt.type="hidden";
			
			var td3=cf.mkTag("td",tr);
			td3.style.width="84px";
			var ipt=cf.mkTag("input",td3);
			ipt.name="in_mon_status_cd";
			ipt.value=d.mon_status_cd;
			ipt.type="hidden";
			select_mon.push(ipt);
			var ipt=cf.mkTag("input",td3);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_mon_working_hour";
			ipt.size=8;
			ipt.value=d.mon_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("mon_sum"),
					hour=manSum("in_mon_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_mon_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td4=cf.mkTag("td",tr);
			td4.style.width="84px";
			var ipt=cf.mkTag("input",td4);
			ipt.name="in_tue_status_cd";
			ipt.value=d.tue_status_cd;
			ipt.type="hidden";
			select_tue.push(ipt);
			var ipt=cf.mkTag("input",td4);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_tue_working_hour";
			ipt.size=8;
			ipt.value=d.tue_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("tue_sum"),
					hour=manSum("in_tue_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_tue_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td5=cf.mkTag("td",tr);
			td5.style.width="84px";
			var ipt=cf.mkTag("input",td5);
			ipt.name="in_wed_status_cd";
			ipt.value=d.wed_status_cd;
			ipt.type="hidden";
			select_wed.push(ipt);
			var ipt=cf.mkTag("input",td5);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_wed_working_hour";
			ipt.size=8;
			ipt.value=d.wed_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("wed_sum"),
					hour=manSum("in_wed_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_wed_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td6=cf.mkTag("td",tr);
			td6.style.width="84px";
			var ipt=cf.mkTag("input",td6);
			ipt.name="in_thu_status_cd";
			ipt.value=d.thu_status_cd;
			ipt.type="hidden";
			select_thu.push(ipt);
			var ipt=cf.mkTag("input",td6);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_thu_working_hour";
			ipt.size=8;
			ipt.value=d.thu_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("thu_sum"),
					hour=manSum("in_thu_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_thu_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td7=cf.mkTag("td",tr);
			td7.style.width="84px";
			var ipt=cf.mkTag("input",td7);
			ipt.name="in_fri_status_cd";
			ipt.value=d.fri_status_cd;
			ipt.type="hidden";
			select_fri.push(ipt);
			var ipt=cf.mkTag("input",td7);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_fri_working_hour";
			ipt.size=8;
			ipt.value=d.fri_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("fri_sum"),
					hour=manSum("in_fri_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_fri_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td8=cf.mkTag("td",tr);
			td8.style.width="84px";
			var ipt=cf.mkTag("input",td8);
			ipt.name="in_sat_status_cd";
			ipt.value=d.sat_status_cd;
			ipt.type="hidden";
			select_sat.push(ipt);
			var ipt=cf.mkTag("input",td8);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_sat_working_hour";
			ipt.size=8;
			ipt.value=d.sat_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("sat_sum"),
					hour=manSum("in_sat_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_sat_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td9=cf.mkTag("td",tr);
			td9.style.width="84px";
			var ipt=cf.mkTag("input",td9);
			ipt.name="in_sun_status_cd";
			ipt.value=d.sun_status_cd;
			ipt.type="hidden";
			select_sun.push(ipt);
			var ipt=cf.mkTag("input",td9);
			ipt.className="iptCenter iptpadl0";
			ipt.placeholder=0;
			ipt.name="in_sun_working_hour";
			ipt.size=8;
			ipt.value=d.sun_working_hour;
			ipt.onchange=manhourSum;
			ipt.onkeyup=function(e){
				checkChar(e,this);
				var sumtd=document.getElementById("sun_sum"),
					hour=manSum("in_sun_working_hour"),
					mansum=document.getElementById("man_sum"),
					rowtd=document.getElementsByName("in_man_hour"),
					rowsum=manRowSum(i);
				
				sumtd.innerHTML=hour.sum.toFixed(1);
				rowtd[i].value=rowsum.sum.toFixed(1);
				mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				
				if(isNaN(rowsum.sum)){
					this.value="";
					sumtd.innerHTML=manSum("in_sun_working_hour").sum.toFixed(1);
					rowtd[i].value=manRowSum(i).sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);					
				}else{
					sumtd.innerHTML=hour.sum.toFixed(1);
					rowtd[i].value=rowsum.sum.toFixed(1);
					mansum.innerHTML=manSum("in_man_hour").sum.toFixed(1);
				}
			};
			ipt.onfocus=function(e){
				if(e.target.value*1==0)this.value="";
			};
			
			var td10=cf.mkTag("td",tr),
				ipt=cf.mkTag("input",td10);
			ipt.className="iptCenter iptpadl0";
			ipt.name="in_man_hour";
			ipt.readOnly=true;
			ipt.size=10;
			if(!d.man_hour) ipt.value="0.0";
			else ipt.value=(d.man_hour*1).toFixed(1);
			cf.setCss(ipt,{backgroundColor:"#fffeed",border:"0px",fontWeight:600});
			cf.setCss(td10,{width:"84px",backgroundColor:"#fffeed"});
			
			var td11=cf.mkTag("td",tr);
			td11.style.width="139px";
			var ipt=cf.mkTag("input",td11);
			ipt.name="in_issue_report";
			ipt.value=d.issue_report;
			ipt.onchange=manhourSum;
			cf.setCss(ipt,{width:"95%"});
			
			var td12=cf.mkTag("td",tr);
			td12.style.width="62px";
			td12.className="right";
			td12.innerHTML=d.status_cd_name;
			
			if(i==0){
				cf.setCss(td1,{borderTop:"0px"});
				cf.setCss(td2,{borderTop:"0px"});
				cf.setCss(td3,{borderTop:"0px"});
				cf.setCss(td4,{borderTop:"0px"});
				cf.setCss(td5,{borderTop:"0px"});
				cf.setCss(td6,{borderTop:"0px"});
				cf.setCss(td7,{borderTop:"0px"});
				cf.setCss(td8,{borderTop:"0px"});
				cf.setCss(td9,{borderTop:"0px"});
				cf.setCss(td10,{borderTop:"0px"});
				cf.setCss(td11,{borderTop:"0px"});
				cf.setCss(td12,{borderTop:"0px"});
			}
		});
		if(obj.length!=0){
			setStatus();
			prev_data=$("input, select").serialize();
		}
	}
};
function mkSumTb(){
	var p=document.getElementById("reporttb2_sum"),
		data=[["","합","","","","","","","","","",""]];
	p.innerHTML="";
	
	var tds=new TABLE({
		p:p,
		arr:data,
		mode:false,
		header:[],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				sumTb_tablecellaction(tds,data,row,i,col,j)
				cf.setCss(col,{backgroundColor:"#fffeed",fontWeight:600});
				commonstyle(row,i,col,j);
			}				
		});
	});
	
	var commonstyle = function(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="project_table Normal_table";
			cf.setCss(tb,{width:"100%",wordBreak:"break-all"});
		}
		col.className="txtclr";
		if(j==0)cf.setCss(col,{width:"39px",borderRight:"0px"});
		else if(j==2||j==3||j==4||j==5||j==6||j==7||j==8)cf.setCss(col,{width:"84px"});
		else if(j==9)cf.setCss(col,{width:"84px",borderRight:"0px"});
		else if(j==10)cf.setCss(col,{width:"140px",borderRight:"0px"});
		else if(j==11)cf.setCss(col,{width:"80px",borderRight:"0px"});
	};
	//cf.setCss(p,{height:31+"px"});
}

function sumTb_tablecellaction(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	if(j==2){
		col.id="mon_sum";
		var hour=manSum("in_mon_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==3){
		col.id="tue_sum";
		var hour=manSum("in_tue_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==4){
		col.id="wed_sum";
		var hour=manSum("in_wed_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==5){
		col.id="thu_sum";
		var hour=manSum("in_thu_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==6){
		col.id="fri_sum";
		var hour=manSum("in_fri_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==7){
		col.id="sat_sum";
		var hour=manSum("in_sat_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==8){
		col.id="sun_sum";
		var hour=manSum("in_sun_working_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else if(j==9){
		col.id="man_sum";
		var hour=manSum("in_man_hour");
		col.innerHTML=hour.sum.toFixed(1);
	}else col.innerHTML=txt;
}

function mkBtn(data){
	var btnDiv=document.getElementById("btn_check");
	btnDiv.innerHTML="";
	
	var cnt=0;
	data.trav(function(d,i){
		if(d.status_cd=="702"||d.status_cd=="703"||d.status_cd=="704"||d.status_cd=="705"||d.status_cd=="706")
			cnt++;
	});	
	var week=document.getElementById("weekDate"),
		searchDay=saveDate(week.innerHTML.substring(14,24));
	
	if(cnt>0||len==0||compareNowDate>searchDay){
		var ul=cf.mkTag("ul",btnDiv);
		
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.style.cursor="pointer";
		img.src="/images/btn/btn_inputall.gif";
		img.onclick=autoMHPop;
		
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.src="/images/btn/btn_save_off.gif";
		
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.style.cursor="pointer";
		
		if(cnt>0){
			img.src="/images/btn/btn_mh_submit_done.gif";
			img.onclick=function(){
				generalPopOk2("제출후에는 다시 제출할 수 없습니다.");
				return;
				
			};
		}else if(len==0){
			img.src="/images/btn/btn_mh_submit_done.gif";
			img.onclick=function(){
				generalPopOk2("제출 할 프로젝트가 없습니다.");
				return;
			};
		}else{
			img.src="/images/btn/btn_mh_submit_done.gif";
			img.onclick=function(){
				generalPopOk2("제출기간이 지났습니다.");
			}
		}
		
		var ipt=document.getElementsByTagName("input");
		ipt.trav(function(d,i){
			if(d.readOnly!=true){
				d.readOnly=true;
			}
		});
		var th=document.getElementsByTagName("th");
		th.trav(function(d,i){
			if(d.childNodes.length>1){
				d.childNodes[1].onclick="";
			}
		});
	}else{
		var ul=cf.mkTag("ul",btnDiv);
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.style.cursor="pointer";
		img.src="/images/btn/btn_inputall.gif";
		img.onclick=autoMHPop;
		
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.style.cursor="pointer";
		img.src="/images/btn/btn_save_on.gif";
		img.onclick=function(){
			reportSave();
		};
		
		var li=cf.mkTag("li",ul);
		var img=cf.mkTag("img",li);
		img.style.cursor="pointer";
		img.src="/images/btn/btn_mh_submit.gif";
		img.onclick=function(){
			reportSave(reportSubmit);
		};
		
		var th=document.getElementsByTagName("th");
		th.trav(function(d,i){
			if(d.childNodes.length>1){
				d.childNodes[1].onclick=function(){
					statusPop(this);	
				}
			}
		});
	}
};