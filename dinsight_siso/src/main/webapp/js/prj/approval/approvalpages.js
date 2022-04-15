mkSearch();
defaultLoadList();

function mkSearch(){
	defaultCodeLoadList();
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span1=cf.mkTag("span",bx1),
		select1 = cf.mkTag("select", bx1),
		span2 = cf.mkTag("span", bx1);
	select1.id = "sh_expanse_year";
	select1.name = "sh_expanse_year";
	mkYearSelect(select1);
	span1.innerHTML = "MH 요청일";
	span2.innerHTML = "년";
	cf.setCss(select1,{width:70+"px"});
	cf.setCss(span1,{paddingRight:12+"px",fontWeight:"bold"});
	cf.setCss(span2,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:357+"px"});
	
	var	select2 = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select2.id = "sh_expanse_month";
	select2.name = "sh_expanse_month";
	mkMonthSelect(select2);
	span.innerHTML = "월";
	cf.setCss(select2,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var	select3 = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select3.id = "sh_expanse_week";
	select3.name = "sh_expanse_week";
	span.innerHTML = "주차";
	cf.setCss(select3,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2),
		select = cf.mkTag("select", bx2);
	span.innerHTML = "구분";
	select.id = "sh_status_cd";
	select.name = "sh_status_cd";
	mkSelect(select, STATUSLIST);
	cf.setCss(select,{width:60+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px"});
	
	var bx3 = cf.mkTag("div", line1);
	bx3.id = "weekDate";
	cf.setCss(bx3,{paddingLeft:12+"px",paddingTop:5+"px"});
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go.gif";
	img.onclick=function(){
		approvalSearch();
	};
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
};
function approvalList(data){
	var dv=document.getElementById("mhapprovaltb2");
	cf.setCss(dv,{height:cf.workareaheight-225+"px",minHeight:630+"px",overflowY:"scroll",overflowX:"hidden"});
	
	var con=document.createElement("div");
	con.style.width=820+"px";
	con.style.height=cf.workareaheight-170+"px";
	con.style.position="absolute";
	con.style.backgroundColor="white";
	
	var table=document.getElementById("listView");
	table.innerHTML="";
	
	var len=data.length;
	if(len==0){
		var tr=cf.mkTag("tr",table);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="6";
		td.innerHTML="조회된 데이터가 없습니다.";
		cf.setCss(td,{borderTop:0+"px"});
	}else{
		data.trav(function(d,i){
			var tr=cf.mkTag("tr",table);
			tr.style.textAlign="center";
			var td1=cf.mkTag("td",tr);
			td1.style.width=5+"%";
			td1.innerHTML=i+1;
			
			var td2=cf.mkTag("td",tr);
			td2.style.width=30+"%";
			td2.innerHTML=d.approval_name;
			
			var td3=cf.mkTag("td",tr);
			td3.style.width=14+"%";
			td3.innerHTML=d.status_cd_name;
			
			var td4=cf.mkTag("td",tr);
			td4.style.width=18+"%";
			td4.innerHTML=d.user_name;
			
			var td5=cf.mkTag("td",tr);
			td5.style.width=18+"%";
			td5.innerHTML=d.creation_date.substring(0,10);
		
			var td6=cf.mkTag("td",tr);
			td6.style.width=15+"%";
			var span=cf.mkTag("span",td6);
			span.style.cursor="pointer";
			span.innerHTML="[보기]";
			
			var userid = data[i].creator, 
			objectid = data[i].source_object_id,
			username = data[i].user_name,
			nodeid = data[i].node_id,
			approvalid = data[i].approval_id,
			finalexpanseappoint = data[i].final_expanse_appoint,
			ownerid = data[i].owner_id,
			statuscd = data[i].status_cd,
			divisionname=data[i].division_name;
			
			td6.userid=userid;
			td6.objectid=objectid;
			td6.username=username;
			td6.nodeid=nodeid;
			td6.approvalid=approvalid;
			td6.finalexpanseappoint=finalexpanseappoint;
			td6.ownerid=ownerid;
			td6.statuscd=statuscd;
			td6.divisionname=divisionname;

			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
				cf.setCss(td3,{borderTop:0+"px"});
				cf.setCss(td4,{borderTop:0+"px"});
				cf.setCss(td5,{borderTop:0+"px"});
				cf.setCss(td6,{borderTop:0+"px"});
			}
			
			td6.onclick=function(){
				var today = new Date();
				var lastday = today.getFullYear()+"년 "+(today.getMonth() + 1)+"월 "+ today.getDate()+"일";
				
				var obj = {
						year : $("#sh_expanse_year").val(),
						month : $("#sh_expanse_month").val(),
						week : $("#sh_expanse_week").val(),
						day : lastday,
						objectid : this.objectid,
						userid : this.userid,
						username : this.username,
						divisionname : this.divisionname,
						statuscd : this.statuscd,
						nodeid : this.nodeid,
						approvalid : this.approvalid,
						finalexpanseappoint : this.finalexpanseappoint
				}
				approvlaPop(con, obj);
			};
		});
	}
};