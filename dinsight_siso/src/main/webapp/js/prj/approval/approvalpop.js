function approvlaPop(con, obj){
	var sh_expanse_year=obj.year, sh_expanse_month=obj.month, sh_expanse_week=obj.week, expanse_day=obj.day,sh_user_id=obj.userid,source_object_id = obj.objectid;
	var	dataPLineList,//결재라인 데이터
		dataMHheadList,dataMHList,dataStatus;
	var lineF,lineArr,lineE,lineTDs;
	
	callProjectApprovalDetailData(obj,function(data){
		dataPLineList=data.paymentLineList;
		dataMHList=data.mhList;
		dataStatus=data.statusList;
	});	
	dataProc();
	mkPageFront();
	
	var dataProc = function(){
		lineF=dataPLineList[0];
		lineArr=new Array();
		lineE=dataPLineList[dataPLineList.length-1];
		
		dataPLineList.trav(function(d,i){
			if(!(i==0 || i==dataPLineList.length-1))
				lineArr.push(d);
		});
		
		var ln=lineArr.length,
		n=ln-3, 
		chk=n>0?true:false;
		
		n=Math.abs(n);
		while(n){
			chk?lineArr.shift():lineArr.unshift({user_name:"", status_name:""});
			n--;
		}
		lineArr.unshift(lineF);
		lineArr.push(lineE);
	};
	
	var mkPageFront = function(){
		con.innerHTML="";
		//con.style.overflow="auto";
		var hdr=mkHdr(),
			con2=hdr.con2,
			con4=hdr.con4,
			con5=hdr.con5;
		
		var bdy=mkBody(con5),
			con13_tbl=bdy.con13_tbl,
			con14=bdy.con14;
		
		mkPtr(con5.parentNode);
		dataSpread();
		
		var dataSpread = function(){
			var mon=0,tue=0,wed=0,thu=0,fri=0,sat=0,sun=0,tot=0;
			if(lineArr[0])
				lineTDs.trav(function(d,i){
					d.innerHTML="<span class='lh'>"+lineArr[i].user_name+"<br />"+lineArr[i].status_name+"</span>";
				});
			
			dataMHList.trav(function(d,i){
				if(i==0) {
					dataMHheadList.trav(function(g,f){
						var div=cf.mkTag("div",g);
						var span=cf.mkTag("span",div);
						if(f==1)span.innerHTML=setStatus(d.mon_status_cd);
						if(f==2)span.innerHTML=setStatus(d.tue_status_cd);
						if(f==3)span.innerHTML=setStatus(d.wed_status_cd);
						if(f==4)span.innerHTML=setStatus(d.thu_status_cd);
						if(f==5)span.innerHTML=setStatus(d.fri_status_cd);
						if(f==6)span.innerHTML=setStatus(d.sat_status_cd);
						if(f==7)span.innerHTML=setStatus(d.sun_status_cd);
					});
				}				
				var tr=cf.mkTag("tr",con13_tbl),
					td=cf.mkTag("td",tr);
				td.innerHTML=d.project_name;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.mon_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.tue_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.wed_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.thu_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.fri_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.sat_working_hour;
				var td=cf.mkTag("td",tr);
				td.innerHTML=d.sun_working_hour;
				var td=cf.mkTag("td",tr);
				td.className="sum right";
				td.innerHTML=d.man_hour;
				
				mon+=d.mon_working_hour*1;
				tue+=d.tue_working_hour*1;
				wed+=d.wed_working_hour*1;
				thu+=d.thu_working_hour*1;
				fri+=d.fri_working_hour*1;
				sat+=d.sat_working_hour*1;
				sun+=d.sun_working_hour*1;
				tot+=d.man_hour*1;
			});
			
			var tr=cf.mkTag("tr",con13_tbl),
				td1=cf.mkTag("td",tr),
				td2=cf.mkTag("td",tr),
				td3=cf.mkTag("td",tr),
				td4=cf.mkTag("td",tr),
				td5=cf.mkTag("td",tr),
				td6=cf.mkTag("td",tr),
				td7=cf.mkTag("td",tr),
				td8=cf.mkTag("td",tr),
				td9=cf.mkTag("td",tr);
			
			tr.className="sum";
			td9.className="right";
			
			td1.innerHTML="합";
			td2.innerHTML=mon.toFixed(1);
			td3.innerHTML=tue.toFixed(1);
			td4.innerHTML=wed.toFixed(1);
			td5.innerHTML=thu.toFixed(1);
			td6.innerHTML=fri.toFixed(1);
			td7.innerHTML=sat.toFixed(1);
			td8.innerHTML=sun.toFixed(1);
			td9.innerHTML=tot.toFixed(1);
			
			Object.assign(con14.style, {paddingTop:"50px", paddingBottom:"50px", fontSize:"14px"});
			con14.innerHTML="위 내용을 결재 바랍니다.<br/><br/><br/>"+expanse_day;
		};
	};
	
	var setStatus = function(st){
		var status;
		dataStatus.trav(function(d,i){
			if(d.code_id==st)
				status=d.code_name;
		});
		return status;
	};	
	
	var mkTr = function(str,str1,p){
		var tr=cf.mkTag("tr",p);
		tr.height=32;
		var th=cf.mkTag("th",tr);
		th.width=100;
		th.innerHTML=str;
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.style.paddingLeft="10px";
		td.innerHTML=str1;
	};
	
	var mkHdr = function(str){
		if(str) str="["+str+"]";
		else str="";
		
		var con1=cf.mkTag("div",con);
		con1.id="Layer_Center_wrap";
		
		var con2=cf.mkTag("div",con1);
		con2.id="pop_print";
		con2.className="pop_print";		
		Object.assign(con2.style, {width:"820px", height:cf.workareaheight-170+"px", backgroundColor:"white", border:"2px solid black"});
		
		var con3=cf.mkTag("div",con2);
		con3.className="prt_top";
		
		var con3_text=cf.mkTag("span",con3);
		con3_text.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;MH 승인 요청서";
		
		var con3_a=cf.mkTag("a",con3);
		con3_a.href="javascript:;";
		con3_a.className="printClose";
		
		var con3_img=cf.mkTag("img",con3_a);
		con3_img.src="/images/pop_btn/btn_pop_close.png";
		con3_img.alt="닫기";
		con3_img.align="right";
		Object.assign(con3_img, {src:"/images/pop_btn/btn_pop_close.png", alt:"닫기", align:"right"});
		con3_img.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		var con4=cf.mkTag("div",con2);
		con4.id="printArea";
		
		var con5=cf.mkTag("div",con4);
		con5.id="print_page_1";
		con5.className="div_overflow_print";
		con5.style.height=cf.workareaheight-290+"px";
		
		var con6=cf.mkTag("div",con5);
		con6.className="prt_title";
		con6.innerHTML=sh_expanse_year+"년 "+sh_expanse_month+"월 "+sh_expanse_week+"주 MH"+str;
		
		return {con2:con2, con4:con4, con5:con5};
	};
	
	var mkTitle = function(son,str){
		var con6=cf.mkTag("div",son);
		con6.className="prt_title next_print_page";
		con6.innerHTML=str;
	};
	
	var mkBody = function(son){
		var con7=cf.mkTag("div",son);
		con7.className="prt_lnr";
		
		var con8=cf.mkTag("div",con7);
		con8.className="prt_left";
		var con9=cf.mkTag("div",con8);
		con9.className="table_left";
		
		var con9_tbl=cf.mkTag("table",con9);		
		Object.assign(con9_tbl, {cellpadding:0, cellspacing:0, width:"229px", className:"Normal_table"});
		
		mkTr("부서",obj.divisionname,con9_tbl);
		mkTr("성명",obj.username,con9_tbl);
		mkTr("일자",expanse_day,con9_tbl);
		
		var con10=cf.mkTag("div",con7);
		con10.className="prt_right";
		var con11=cf.mkTag("div",con10);
		con11.className="table_right";
		
		var con11_tbl=cf.mkTag("table",con11);
		Object.assign(con11_tbl, {cellpadding:0, cellspacing:0, width:"487px", height:"100px", className:"Normal_table"});
		
		var con11_tbl_tr=cf.mkTag("tr",con11_tbl);
		con11_tbl_tr.height=32;
		
		var str=["결<br /><br />재", "담당","검토","검토","검토","승인"];
		str.trav(function(d,i){
			var th=cf.mkTag("th",con11_tbl_tr);
			th.width=90;
			if(i==0){
				th.width=32;
				th.rowSpan=2;
			}else if(i==str.length-1){
				th.className="right";
			}
			th.innerHTML=d;
		});
		
		var con11_tbl_tr1=cf.mkTag("tr",con11_tbl);
		con11_tbl_tr1.align="center";
		
		var str=["","","","","",""];
		lineTDs=new Array();
		str.trav(function(d,i){
			if(i!=0){
				var td=cf.mkTag("td",con11_tbl_tr1);
				td.style.height="65px";
				if(i==str.length-1){
					td.className="right";
				}
				lineTDs.push(td);
			}
		});
		
		var con12=cf.mkTag("div",son);
		con12.style.minHeight = "200px";
		con12.className="prt_con";
		var con13=cf.mkTag("div",con12);
		con13.className="pop_table2";
		
		var con13_tbl=cf.mkTag("table",con13);
		Object.assign(con13_tbl, {cellpadding:0, cellspacing:0, width:"100%", className:"Normal_table"});
		
		var week=document.getElementById("weekDate"),
			st=week.innerHTML.substring(1,11),
			ar=["프로젝트명","월","화","수","목","금","토","일","합"],
			ar2=["mon","tue","wed","thu","fri","sat","sun"];
		st=st.replace(/[.]/g,"-");
		var d_day=new Date(st),
			ar3=[];
		ar.trav(function(d,i){
			if(i==0) var a=d_day;
			else var a=d_day.setDate(d_day.getDate()+1);
			ar3.push(new Date(a));
		});
		
		dataMHheadList=new Array();
		st=st.replace(/[.]/g,"-");
		
		var con13_tbl_tr=cf.mkTag("tr",con13_tbl);
		ar.trav(function(d,i){
			var th=cf.mkTag("th",con13_tbl_tr);
			th.innerHTML=d;
			
			if(i==ar.length-1)th.className="right";			
			else if(i==0)th.style.width="20%";
			else{
				th.style.width="10%";
				var span=cf.mkTag("span",th);
				span.id=ar2[i]+"_day";
				
				var	smonth=ar3[i].getMonth()+1,
					sday=ar3[i].getDate();		
				span.innerHTML="("+smonth+"/"+sday+")";
				span.innerHTML="("+smonth+"/"+sday+")";
				cf.setCss(span,{fontSize:"10px",marginLeft:"5px"});
			}			
			dataMHheadList.push(th);
		});
		
		var con14=cf.mkTag("div",son);
		con14.className="prt_text";
		
		return {con13_tbl:con13_tbl, con14:con14};
	};
	
	var mkPtr = function(son){
		var con19=cf.mkTag("div",son);
		con19.className="prt_btns";
		con19.style.backgroundColor="white";
		con19.innerHTML = "";
		if(obj.statuscd=="1701"){
			var btn_bar=cf.mkTag("span",con19),
				btn_permit=cf.mkTag("button",con19),
				space=cf.mkTag("span",con19),
				btn_return=cf.mkTag("button",con19),
				img_btn_bar=cf.mkTag("img",btn_bar);
			
			btn_permit.className="ct-btn blue large";
			btn_permit.innerHTML="승인";
			btn_return.className="ct-btn red large";
			btn_return.innerHTML="반려";
			space.innerHTML="&nbsp;&nbsp;";
			
			img_btn_bar.src="/images/ico/print_bar.gif";
			img_btn_bar.style.paddingBottom=20+"px";
			img_btn_bar.style.align="center";
			
			btn_permit.param={
				node_id : obj.nodeid,
				source_object_id : obj.objectid,
				approval_id : obj.approvalid,
				final_expanse_appoint : obj.finalexpanseappoint
			};
			btn_permit.onclick=function(){
				approval_permit(this,con);
			};

			btn_return.param={
				node_id : obj.nodeid,
				source_object_id : obj.objectid,
				approval_id : obj.approvalid
				};
			btn_return.onclick=function(){
				approval_return(this,con);
			};
		}
	};
	callPop(con);
};