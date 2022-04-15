var prev_plan, chk_add=new Array(),chk_plan=new Array(),chk_del=new Array(),
poppjt_obj,chk_pjt=new Array(), chk_pjt2=new Array();

gLastUser = [];

function getUserInfoById(id) {
	var qry = "select * from salespoplist01 where user_id="+ id +";";
	return q.parse(qry);
};
function salesSrchPop(fnc){
	gLastUser=[];
	var gPrev = document.getElementById("sales_customer").value,
		userIds=gPrev.split(","),	// 이미 저장된 사용자 id 스트링 (ex : 122,215)
		prevUser = [],				// userIds에서 추출한 id를 바탕으로 로컬 db에서 가져온 사용자 정보 오브젝트
		allUserList = [],
		filteredList = [];
	
	//dataset
	CallSalesCustomerData({user_name: ""},function(data){
		allUserList = data.salesCustomerList;
	});
	
	if(allUserList && allUserList.length > 0){		
		allUserList.trav(function(d,i){
			if(!d.user_id)d.user_id="";
			if(!d.user_name)d.user_name="";
			if(!d.code_name)d.code_name="";
			if(!d.division_name)d.division_name="";
			if(!d.company_id)d.company_id="";
			filteredList.push([d.user_id,d.user_name,d.code_name,d.division_name,d.company_id]);
		});
	}	
	q.reg("salespoplist01",{
		arr:filteredList,
		header:["user_id","user_name","code_name","division_name","company_id"],
		meta:["string","string","string","string","string"]
	});	
	
	userIds.trav(function(d, i) {
		var temp = getUserInfoById(d).arr[0];
		if(temp!=undefined) gLastUser.push(temp);
	});
	
	if (!gLastUser || gLastUser.length == 0 || gLastUser[0].length == 0) {
		gLastUser = [];
		console.log("no prev user");
	}
	
	chk_add=new Array();
	chk_plan=new Array();
	prev_plan="";
	prev_plan2="";
	var con=document.createElement("div"),
		con0=cf.mkTag("div",con),	
		con1=cf.mkTag("div",con0),
		con2=cf.mkTag("div",con1),
		con2_tit=cf.mkTag("span",con2);
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a),
		con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con1),
		title=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con3);	
	//con0.className="pop-mypage";
	con1.id="pop_my";
	con2.className="my_top";
	con2_tit.innerHTML="영업담당자";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};	
	pjtTb(con3);
	
	var btn1=cf.mkTag("button",con4),
		btn2=cf.mkTag("button",con4);
	con4.className="savebtn";
	btn1.className="ct-btn darkgrey normal";
	btn2.className="ct-btn grey normal";
	btn1.innerHTML="확인";
	btn2.innerHTML="취소";
	btn1.onclick=function(){		
		if(chk_pjt2.length==0)	generalPopOk("추가 할 영업담당자가 없습니다.");
		else{
			generalPop("영업담당자를 추가 하시겠습니까?", function(){
				hourplanpjtSave(con);
			});
		}
	};
	btn2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	//cf.setCss(con4,{textAlign: "center",paddingTop:20+"px",paddingBottom:10+"px",});	
	cf.setCss(con,{width:500+"px",height:cf.workareaheight-252+"px",position:"absolute"});
	cf.setCss(con1,{width:500+"px",height:cf.workareaheight-252+"px",border:2+"px solid black",backgroundColor:"#fff"});
	cf.setCss(con3,{width:500+"px",height:cf.workareaheight-350+"px",overflowY:"auto"});
	cf.setCss(title,{paddingTop:20+"px"});
	
	callPop(con);
};
function hourplanpjtSave(p){
	var split="",arrlength=0,
		sales_customer_layer = document.getElementById("sales_customer_layer"),
		sales_customer = document.getElementById("sales_customer").value;
	sales_customer = "";
	document.getElementById("sales_customer_layer").innerHTML = "";
		
	if(sales_customer!=""){
		var arr=sales_customer.split(",");
		arrlength=arr.length;
	}	
	gLastUser.trav(function(d, i){
		if(arrlength>0){
			var addYn = 0;
			arr.trav(function(j,k){
				if(j==d[0]){
					addYn = 1;
				}
			});
			if(addYn == 0){
				split=",";
				sales_customer += split + d[0];
				
				var div=cf.mkTag("div", sales_customer_layer);
				div.style.float="left";
				div.innerHTML = d[1];
				var span=cf.mkTag("span", div);
				span.style.paddingLeft="5px";
				var img=cf.mkTag("img", span);
				img.src="/images/common/btn_x.gif";
				img.onclick=function() {
					salesCustomerDel(div, d[0]);
				};
			}
		} else {
			sales_customer += split + d[0];
			split=",";
			
			var div=cf.mkTag("div", sales_customer_layer);
			div.style.float="left";
			div.innerHTML = d[1];
			var span=cf.mkTag("span", div);
			span.style.paddingLeft="5px";
			var img=cf.mkTag("img", span);
			img.src="/images/common/btn_x.gif";
			img.onclick=function() {
				salesCustomerDel(div, d[0]);
			};
		}
	});
	document.getElementById("sales_customer").value=sales_customer;
	cf.killTag(p.parentNode);
};
function salesCustomerLayer(ele, data, dataUserid){
	var arrData = data.split(","),arrDataUserid = dataUserid.split(","),userid="";
	
	for(var i=0; i<arrData.length; i++){
		userid = arrDataUserid[i];
		var div = cf.mkTag("div", ele),
			span= cf.mkTag("span", div);
		div.style.float="left";
		div.innerHTML=arrData[i];
		span.style.paddingLeft="5px";
		
		if(arrData[i]!=""){
			var img= cf.mkTag("img", span);
			img.src="/images/common/btn_x.gif";
			img.userid=userid;
			img.div=div;
			img.onclick=function() {
				salesCustomerDel(this.div, this.userid);
			};
		}		
	}
};
function salesCustomerDel(ele, userid){
	cf.killTag(ele);
	var salesCustomer=document.getElementById("sales_customer").value;
	var res=salesCustomer.split(",");
	var html="";
	var split="";
	for (var i=0; i<res.length; i++) {
		if(res[i]!=userid){
			html += split + res[i];
			split=",";
		}		
	}
	document.getElementById("sales_customer").value=html;
};
function pjtTb(p){
	p.innerHTML="";
	var tit=cf.mkTag("div",p),
		topdv=cf.mkTag("div",p),
		cl1=cf.mkTag("div",p),
		middiv=cf.mkTag("div",p),
		imgdv=cf.mkTag("div",middiv),
		img=cf.mkTag("img",imgdv),
		str=cf.mkTag("div",middiv),
		btndv1=cf.mkTag("div",middiv),
		btn1=cf.mkTag("div",btndv1),
		cl2=cf.mkTag("div",middiv),
		tb1=cf.mkTag("div",middiv),
		cl3=cf.mkTag("div",p),
		botdv=cf.mkTag("div",p),
		btndv2=cf.mkTag("div",botdv),
		btn2=cf.mkTag("div",btndv2),
		cl4=cf.mkTag("div",botdv),
		tb2=cf.mkTag("div",botdv);
		tit.innerHTML="";
	
	btn1.className="ct-btn darkgrey small";
	btn1.innerHTML="선택";
	btn1.onclick=function(){
		var a=juSel_sc_sc(chk_pjt,true);
		if(!a.opt)	generalPopOk("영업담당자를 선택하세요.");
		else hourplanpjtAdd();
	};
	
	btn2.className="ct-btn grey small";
	btn2.innerHTML="삭제";
	btn2.onclick=function(){
		var a=juSel_sc(chk_pjt2,true);		
		if(!a.opt)	generalPopOk("삭제할 영업담당자를 선택하세요.");
		else{
			var salesArry = document.querySelectorAll(".cop_sales_plan"),
				checkSalesArry = []; 

			for (i = 0; i < salesArry.length;i ++) {
				if (salesArry[i].checked) {
					checkSalesArry.push(salesArry[i].value);
				}			
			}	
			for (i = 0; i < gLastUser.length; i++) {

				for (j = 0; j < checkSalesArry.length; j++){
					
					if (gLastUser[i] && gLastUser[i][0] == checkSalesArry[j])  {
						delete gLastUser[i];						
					}
				}
			}
			gLastUser.clean();
			var targetDiv = document.getElementById("salespoplist02");
			if (gLastUser.length > 0)
				callpjtTb2(targetDiv,gLastUser);
			else
				callpjtTb2(targetDiv);
		}		
	};
	callpjtSrch(topdv);
	callpjtTb1(tb1);
	
	if(gLastUser.length > 0)callpjtTb2(tb2, gLastUser);
	else callpjtTb2(tb2);
	
	cf.setCss(tit,{paddingTop:15+"px",marginLeft:20+"px"});
	cf.setCss(botdv,{borderTop:1+"px solid #e3e3e3",marginTop:20+"px",paddingLeft:25+"px",paddingRight:25+"px",paddingTop:5+"px"});
	cf.setCss(middiv,{marginLeft:25+"px",marginRight:25+"px",marginBottom:0+"px"});
	cf.setCss(topdv,{marginLeft:25+"px",marginRight:25+"px",marginBottom:5+"px"});
	cf.setCss(imgdv,{float:"left",paddingTop:13+"px",paddingRight:5+"px"});
	cf.setCss(str,{float:"left",paddingTop:15+"px"});
	cf.setCss(btndv1,{float:"right",marginTop:5+"px",marginBottom:5+"px"});
	cf.setCss(btndv2,{float:"right",marginTop:5+"px",marginBottom:5+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(cl3,{clear:"both"});
	cf.setCss(cl4,{clear:"both"});
};
function callpjtSrch(p){
	p.innerHTML="";
	var div=cf.mkTag("div",p),
		srch=cf.mkTag("div",div),
		imgdv=cf.mkTag("div",p),
		img=cf.mkTag("img",imgdv);
	img.className="btn_go2";
	img.src="/images/btn/btn_go2.gif";
	img.onclick=function(){
		hourplanpjtSrch();
		var qty="select * from salespoplist01;",
			res=q.parse(qty);
		
		var a=document.getElementById("salespoplist01");
		callpjtTb1(a,res.arr);
	};
	
	var str=cf.mkTag("div",srch),
	ipt=cf.mkTag("input",srch);
	str.innerHTML="담당자";
	ipt.id="user_name";	
	ipt.className="input_han";
	ipt.onkeypress=function(e){		
		if(e.keyCode==13){
			hourplanpjtSrch();
			var qty="select * from salespoplist01;",
				res=q.parse(qty);
			
			var a=document.getElementById("salespoplist01");
			callpjtTb1(a,res.arr);
		}
	};
	
	cf.setCss(str,{float:"left",paddingRight:7+"px",paddingTop:13+"px"});//,fontWeight:"bold"
	cf.setCss(ipt,{float:"left",width:200+"px",marginTop:7+"px"});	
	cf.setCss(srch,{float:"left",paddingTop:15+"px",paddingLeft:20+"px"});
	cf.setCss(imgdv,{paddingTop:22+"px",paddingRight:5+"px",cursor:"pointer"});//float:"right",
	cf.setCss(p,{height:71+"px",border:2+"px solid #a1a1a1"});
};
function callpjtTb1(p,data){
	p.innerHTML="";
	p.id="salespoplist01";
	chk_pjt=new Array();
	
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbcont=cf.mkTag("div",p);

	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["","이름","직위","부서"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0){
					var ipt=cf.mkTag("input",col);
					ipt.type="checkbox";
					ipt.className="CheckMode";
					ipt.onclick=function(){
						GroupCheck('CheckMode','cop_sales_code');
					};
				}
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j,true);				
			}				
		});
	});//head
	
	if(!data||salsepop_obj.length==0){
		var tds=new TABLE({
			p:tbcont,
			arr:[["조회된 데이터가 없습니다.","","","",]],
			mode:false,
			header:[],
			colspans:[{y:0, x:0, howmany:4}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					commonstyle(row,i,col,j);
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",});					
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbcont,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					//
					plan_tablecellaction_pop01(tds,data,row,i,col,j);
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",});
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}	
	function headerstyle(row,i,col,j){
		cf.setCss(col,{fontWeight:"bold",backgroundColor:"#fafafa",height:33+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3"});
	};
	function commonstyle(row,i,col,j,opt){
		if(opt){
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
				tb.id="tbH";
				cf.setCss(tb,{
					backgroundColor:"#fff",
					borderLeft:1+"px solid #e3e3e3",
					borderTop:2+"px solid #272727",
				});
			}
			if(j==0)cf.setCss(col,{width:29+"px"});
			else if(j==2)cf.setCss(col,{width:139+"px"});
			else if(j==3)cf.setCss(col,{width:139+"px"});
		}else{
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
			}
			if(j==0)cf.setCss(col,{width:29+"px"});
			else if(j==1)cf.setCss(col,{paddingLeft:10+"px",textAlign:"left"});
			else if(j==2)cf.setCss(col,{width:139+"px"});
			else if(j==3)cf.setCss(col,{width:122+"px",borderRight:1+"px solid #e3e3e3"});
			else if(j==4)cf.setCss(col,{display:"none"});
		}		
	};	
	cf.setCss(cl,{clear:"both"});
	cf.setCss(tbhead,{height:36+"px",});	
	cf.setCss(tbcont,{overflowY:"scroll",height:145+"px",borderBottom:1+"px solid #272727",borderLeft:1+"px solid #e3e3e3",marginBottom:25+"px",});
};
function callpjtTb2(p,data){
	prev_plan2="";
	p.innerHTML="";	
	p.id="salespoplist02";	
	var tbhead=cf.mkTag("div",p),
		cl=cf.mkTag("div",p),
		tbcont=cf.mkTag("div",p);
	var tds=new TABLE({
		p:tbhead,
		arr:[],
		mode:false,
		header:[["","이름","직위","부서"]],
		colspans:[],
		rowspans:[]
	});
	tds.trav(function(row,i){
		row.trav(function(col,j){
			if(col!=undefined){
				if(j==0){
					var ipt=cf.mkTag("input",col);
					ipt.type="checkbox";
					ipt.className="CheckMode";
					ipt.onclick=function(){
						GroupCheck('CheckMode','cop_sales_plan');
					};
				}
				headerstyle(row,i,col,j);
				commonstyle(row,i,col,j,true);				
			}				
		});
	});//head
	
	if(!data||data.length==0){
		var tds=new TABLE({
			p:tbcont,
			arr:[["선택된 데이터가 없습니다.","","",""]],
			mode:false,
			header:[],
			colspans:[{y:0, x:0, howmany:4}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",});
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}else{
		var tds=new TABLE({
			p:tbcont,
			arr:data,
			mode:false,
			header:[],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					plan_tablecellaction_pop02(tds,data,row,i,col,j);
					cf.setCss(col,{height:31+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3",});
					commonstyle(row,i,col,j,opt);
				}				
			});
		});
	}
	function headerstyle(row,i,col,j){
		cf.setCss(col,{fontWeight:"bold",backgroundColor:"#fafafa",height:33+"px",borderBottom:1+"px solid #e3e3e3",borderRight:1+"px solid #e3e3e3"});
	};
	function commonstyle(row,i,col,j,opt){
		if(opt){
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
				tb.id="tbH";
				cf.setCss(tb,{backgroundColor:"#fff",borderLeft:1+"px solid #e3e3e3",borderTop:2+"px solid #272727"});
			}
			if(j==0)cf.setCss(col,{width:29+"px",});
			else if(j==2)cf.setCss(col,{width:139+"px",});
			else if(j==3)cf.setCss(col,{width:139+"px",});
		}else{
			if(i==0){
				var tb=col.parentNode.parentNode;
				tb.cellSpacing="0px";
			}
			if(j==0) cf.setCss(col,{width:29+"px"});
			else if(j==1)cf.setCss(col,{paddingLeft:10+"px",textAlign:"left"});
			else if(j==2) cf.setCss(col,{width:139+"px"});
			else if(j==3) cf.setCss(col,{width:122+"px",borderRight:1+"px solid #e3e3e3"});
			else if(j==4) cf.setCss(col,{display:"none"});
		}		
	};
	cf.setCss(cl,{clear:"both"});
	cf.setCss(tbhead,{height:36+"px",});	
	cf.setCss(tbcont,{overflowY:"scroll",height:145+"px",borderBottom:1+"px solid #272727",borderLeft:1+"px solid #e3e3e3",marginBottom:0+"px",});
};
function hourplanpjtSrch(){
	var name=document.getElementById("user_name"),
		obj={user_name:name.value};
	
	CallSalesCustomerData(obj,function(data){
		salsepop_obj=data.salesCustomerList;
	});
	var ar=[];
	if(salsepop_obj&&salsepop_obj.length>0){
		salsepop_obj.trav(function(d,i){
			if(!d.user_id)d.user_id="";
			if(!d.user_name)d.user_name="";
			if(!d.code_name)d.code_name="";
			if(!d.division_name)d.division_name="";
			if(!d.company_id)d.company_id="";
			ar.push([d.user_id,d.user_name,d.code_name,d.division_name,d.company_id]);
		});
	}
	q.reg("salespoplist01",{
		arr:ar,
		header:["user_id","user_name","code_name","division_name","company_id"],
		meta:["string","string","string","string","string"]
	});	
};
function hourplanpjtAdd(){	
	var isDuplicated=false,duplicateUser=[],finalUser=[];	
	for (var i = 0; i < chk_pjt.length; i++) {
		var cObj = chk_pjt[i];
		if (cObj[0].checked) {			
			if(gLastUser.length > 0 ){
				for (var j = 0; j < gLastUser.length; j++) {					
					var d2 = gLastUser[j];
					if (cObj[1][0] == d2[0] && cObj[1][1] == d2[1] && cObj[1][2] == d2[2] && cObj[1][2] == d2[2]){ // 0 : 사번, 1: 이름 2 : 직급, 3: 부서
						isDuplicated = true;
						duplicateUser.push(d2[1]);
						break;
					}else finalUser.push(cObj[1]);
				}
			}else finalUser.push(cObj[1]);
		} 
	}
	
	if (isDuplicated) {
		generalPopOk(duplicateUser.join("님,") + "은 이미 추가된 사용자입니다.");
		console.log(duplicateUser.length + "명의 사용자가 중복되어 제외하였음 ->" + duplicateUser.join("님,"));
	}

	finalUser.distinct(0).trav(function(d, i) {
		var temp = getUserInfoById(d).arr[0];
		if(!duplicateUser.length) gLastUser.push(temp); 
	});
	callpjtTb2(document.getElementById("salespoplist02"), gLastUser);
};
function plan_tablecellaction_pop01(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(j==0){
		var ipt=cf.mkTag("input",col);
		ipt.type="checkbox";
		ipt.className="cop_sales_code";
		ipt.id="cop_sales_code";
		ipt.name="cop_sales_code";
		ipt.value=txt;
		chk_pjt.push([ipt,data[i],""]);
		col.onclick=function(){
			if(!prev_plan){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_plan.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_plan=this.parentNode;
			prev_plan.idx=i;
			prev_plan.data=data[i];
		};
	}else{
		col.innerHTML=txt;
		col.className="cursor";
		col.onclick=function(){
			var chk=this.parentNode.childNodes[0].childNodes[0];
			if(!prev_plan){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_plan.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			if(chk.checked==true)chk.checked=false;
			else chk.checked=true;
			prev_plan=this.parentNode;
			prev_plan.idx=i;
			prev_plan.data=data[i];
		};	
	}
};
function plan_tablecellaction_pop02(tds,data,row,i,col,j){
	var txt=col.innerHTML;
	col.innerHTML="";
	
	if(j==0){
		var ipt=cf.mkTag("input",col);
		ipt.type="checkbox";
		ipt.className="cop_sales_plan";
		ipt.id="cop_sales_plan";
		ipt.name="cop_sales_plan";
		ipt.value=txt;
		chk_pjt2.push([ipt,data[i],""]);
		col.onclick=function(){
			if(!prev_plan2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_plan2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			prev_plan2=this.parentNode;
			prev_plan2.idx=i;
			prev_plan2.data=data[i];
		};
	}else{
		col.innerHTML=txt;
		col.className="cursor2";
		col.onclick=function(){
			var chk=this.parentNode.childNodes[0].childNodes[0];
			if(!prev_plan2){
				this.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_plan2.style.backgroundColor="white";
				this.parentNode.style.backgroundColor="#edfafb";
			}
			if(chk.checked==true)chk.checked=false;
			else chk.checked=true;
			prev_plan2=this.parentNode;
			prev_plan2.idx=i;
			prev_plan2.data=data[i];
		};
	}
};
