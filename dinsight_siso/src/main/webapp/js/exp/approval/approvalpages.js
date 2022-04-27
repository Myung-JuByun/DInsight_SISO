function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		title=cf.mkTag("div", line1),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	title.innerHTML = "경비 지급 요청일";
	select.id = "sh_expanse_year";
	select.name = "sh_expanse_year";
	span.innerHTML = "년";
	select.onchange=function(){
		approvalSearch();
	};
	cf.setCss(select,{width:"70px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	cf.setCss(bx1,{width:"187px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id = "sh_expanse_month";
	select.name = "sh_expanse_month";
	//mkMonthSelect(select,CurrentDate[1],true);
	select.onchange=function(){
		approvalSearch();
	};	
	span.innerHTML = "월";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"12px",marginLeft:"5px"});
	
	var bx2=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx2);
		select=cf.mkTag("select", bx2);
	select.id="sh_status_cd";
	select.name="sh_status_cd";
	mkSelect(select,STATUS);
	select.onchange=function(){
		approvalSearch();
	};	
	span.innerHTML = "구분";
	cf.setCss(select,{width:"60px"});
	cf.setCss(span,{paddingRight:"5px"});
	
	cf.setCss(srch,{marginLeft:"20px"});
	cf.setCss(title,{float:"left",fontWeight:"bold",paddingRight:"12px",paddingTop:"6px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left",marginLeft:"21px"});
}

function setDate(){
	var year=document.getElementById("sh_expanse_year"),
		month=document.getElementById("sh_expanse_month");
	if(srch_obj){
		mkYearSelect(year,srch_obj.year);
		mkMonthSelect(month,srch_obj.month);
	}else{
		mkYearSelect(year);
		mkMonthSelect(month);
	}
}

function noDataList(){
	var dv=document.getElementById("listView");
	dv.innerHTML="";
	var tr = crTag("tr",dv),				
		td0 = crTag("td",tr);
	td0.colSpan=6;
	td0.className="right txt_center";
	td0.innerHTML="조회된 데이터가 없습니다.";
	cf.setCss(td0,{borderTop:"0px"});
}

function approvalList(target,data){
	var con=document.createElement("div");
	Object.assign(con.style, {width:"820px", height:(cf.workareaheight-60)+"px", position:"absolute", backgroundColor:"white"});
	var table;
	// traverse 지역함수 - table 객체 잡는 거.... 
	traverse(target,function(el){
		if(el.tagName){					
			if(el.id == "listView")
				//el.innerHTML="";
				table = el;
		}
	});
	//data 를 삽입하기 위한 td 생성
	
	table.innerHTML="";
	for(var i=0, lng=data.length; i<lng; i++){
		var tr = crTag("tr",table);					
		var td0 = crTag("td",tr);
		td0.className="txt_center";
		td0.style.width="5%";
		var td1 = crTag("td",tr);
		td1.className="txt_center";
		td1.style.width="45%";
		var td2 = crTag("td",tr);
		td2.className="txt_center";
		td2.style.width="10%";
		var td3 = crTag("td",tr);
		td3.className="txt_center";
		td3.style.width="10%";
		var td4 = crTag("td",tr);
		td4.className="txt_center";
		td4.style.width="20%";
		var td5 = crTag("td",tr);
		td5.className="txt_center right";
		td5.style.width="10%";

		td0.innerHTML = i+1;
		td1.innerHTML = data[i].approval_name;
		td2.innerHTML = data[i].status_cd_name;
		td3.innerHTML = data[i].user_name;
		td4.innerHTML = data[i].creation_date;
		td5.innerHTML = "[보기]";
		td5.style.cursor="pointer";

		var creator = data[i].creator, 
			objectid = data[i].source_object_id,
			username = data[i].user_name,
			divisionname = data[i].division_name,
			nodeid = data[i].node_id,
			approvalid = data[i].approval_id,
			finalexpanseappoint = data[i].final_expanse_appoint,
			ownerid = data[i].owner_id,
			statuscd = data[i].status_cd;
		
		td5.creator=creator;
		td5.objectid=objectid;
		td5.username=username;
		td5.divisionname=divisionname;
		td5.nodeid=nodeid;
		td5.approvalid=approvalid;
		td5.finalexpanseappoint=finalexpanseappoint;
		td5.ownerid=ownerid;
		td5.statuscd=statuscd;
		
		td5.onclick = function (){	
			//검색년월의 마지막날
			var today = new Date();
			var lastday = today.getFullYear()+"년 "+(today.getMonth() + 1)+"월 "+ today.getDate()+"일";
			
			var obj = {
					year : $("#sh_expanse_year").val(),
					month : $("#sh_expanse_month").val(),
					day : lastday,
					creator : this.creator,
					objectid : this.objectid,
					username : this.username,
					divisionname : this.divisionname,
					nodeid : this.nodeid,
					approvalid : this.approvalid,
					finalexpanseappoint : this.finalexpanseappoint,
					ownerid : this.ownerid,
					statuscd : this.statuscd
			};
			mkPrint(con, true, obj);
			callPop(con);
		};
		if(i==0){
			cf.setCss(td0,{borderTop:"0px"});
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
			cf.setCss(td5,{borderTop:"0px"});
		}
	}
};