var prev_qpop;
/*
 * quoteSrchPop(fnc); 로 견적서 조회 팝업을 실행한다.
 * fnc는 견적서 저장 함수
 * fnc(prev_qpop.data);
 * 
 * 화면 js 에서 저장 함수 function fnc(obj){}; 를 정의 하여 사용
 * 
 * prev_qpop.data : 선택한 견적서 정보 배열
 * prev_qpop.info : 선택한 견적서 정보 배열정보
 */
function quotePopDefault(){
	var obj={sales_project_year : "",sales_project_month : "",company_name  : "",sales_type_cd : "",
			sales_status_cd : "",brand_cd : "",user_id : ""};
	callQuoteAdminData(obj,function(data){
		quotepop_obj=data.salesQuoteList;
		quotepop_brand=data.brandList;
		quotepop_status=data.salesStatusList;
		quotepop_type=data.salesTypeList;
		quotepop_user=data.divisionUsers;
	});
	quotePopDataSet();
};
function quotePopSrch(){
	var sh_quote_year=document.getElementById("sh_quote_year"),
		sh_quote_month=document.getElementById("sh_quote_month"),
		quote_company_name=document.getElementById("quote_company_name"),
		quote_sales_type_cd=document.getElementById("quote_sales_type_cd"),
		quote_sales_status_cd=document.getElementById("quote_sales_status_cd"),
		quote_brand_cd=document.getElementById("quote_brand_cd"),
		quote_user_id=document.getElementById("quote_user_id"),
		dv=document.getElementById("quotepoplist01"),
		obj={sales_project_year:sh_quote_year.value,sales_project_month:sh_quote_month.value,company_name:quote_company_name.value,
				sales_type_cd:quote_sales_type_cd.value,sales_status_cd : quote_sales_status_cd.value,brand_cd:quote_brand_cd.value,user_id : quote_user_id.value};
	callQuoteAdminData(obj,function(data){
		quotepop_obj=data.salesQuoteList;
	});
	quotePopDataSet();
	var res=q.parse("select * from quotepoplist01;");
	mkDiv_Quote(dv,res.arr);
};
function quotePopDataSet(){
	var ar=[];
	if(quotepop_obj&&quotepop_obj.length>0){
		quotepop_obj.trav(function(d,i){
			if(!d.quote_project_code)d.quote_project_code="";
			if(!d.quote_name)d.quote_name="";
			if(!d.quote_rivision)d.quote_rivision="";
			if(!d.quote_file_name)d.quote_file_name="";
			if(!d.quote_file_id)d.quote_file_id="";
			if(!d.quote_file_path)d.quote_file_path="";
			if(!d.quote_id)d.quote_id="";
			ar.push([d.quote_project_code,d.quote_name,d.quote_file_name,d.quote_rivision,d.quote_id,d.quote_file_id,d.quote_file_path]);
		});
	}
	q.reg("quotepoplist01",{
		arr:ar,
		header:["quote_project_code","quote_name","quote_file_name","quote_rivision","quote_id","quote_file_id","quote_file_path"],
		meta:["string","string","string","string","string","string","string"]
	});	
};
function quoteSrchPop(fnc){
	quotePopDefault();
	var con=document.createElement("div"),
		con1=cf.mkTag("div",con),
		con2=cf.mkTag("div",con1),
		con2_tit=cf.mkTag("span",con2);
		con2_a=cf.mkTag("a",con2),
		con2_img=cf.mkTag("img",con2_a),
		con3=cf.mkTag("div",con1),
		con4=cf.mkTag("div",con3),
		title=cf.mkTag("div",con3),
		con5=cf.mkTag("div",con3);
		
	con.className="pop-mypage";	
	con1.id="pop_my";
	con2.className="my_top";
	con2_tit.innerHTML="견적서 조회";
	con2_a.href="#";
	con2_a.className="my_top_closs";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.id="my_closs";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(con.parentNode);
	};
	con3.className="my-container";
	con4.className="con_table";
	title.className="mini_title";
	title.innerHTML="견적서 정보";	
	con5.className="Wrap_table";

	var res=q.parse("select * from quotepoplist01;");
	mkDiv_QuoteSrch(con4);
	mkDiv_Quote(con5,res.arr,fnc);
	
	cf.setCss(con,{width:1150+"px",height:cf.workareaheight-100+"px",position:"absolute"});
	cf.setCss(con1,{width:1150+"px",height:cf.workareaheight-100+"px",border:2+"px solid black",backgroundColor:"#fff"});
	cf.setCss(con3,{height:cf.workareaheight-230+"px",paddingTop:25+"px"});
	cf.setCss(con5,{height:cf.workareaheight-362+"px",overflowY:"auto"});
	cf.setCss(title,{paddingTop:20+"px"});
	
	var con7=cf.mkTag("div",con1),
		btn1=cf.mkTag("button",con7),
		btn2=cf.mkTag("button",con7);
	con7.className="savebtn";
	btn1.className="ct-btn darkgrey large";
	btn1.innerHTML="저장";
	btn1.onclick=function(){
		if(!prev_qpop){
			generalPopOk("견적서를 선택하세요.");
		}else fnc(prev_qpop.data);
	};	
	btn2.className="ct-btn grey large";
	btn2.innerHTML="취소";
	btn2.onclick=function(){
		cf.killTag(con.parentNode);	
	};
	cf.setCss(btn1,{marginRight:5+"px"});
	callPop(con);
};
function mkDiv_QuoteSrch(p){
	p.innerHTML="";
	p.className="search_pop3";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_quote_year";
	select.name="sh_quote_year";
	mkYearSelect(select);
	span.innerHTML = "년";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:197+"px"});
	
	var	select = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select.id="sh_quote_month";
	select.name="sh_quote_month";
	mkMonthSelect(select,CurrentDate[1],true);
	span.innerHTML="월";
	cf.setCss(select,{width:70+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var bx2 = cf.mkTag("div", line1),
		span = cf.mkTag("span", bx2),
		ipt=cf.mkTag("input",bx2);
	span.innerHTML = "고객사명";
	ipt.id="quote_company_name";
	ipt.type="text";
	ipt.className="input_han";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			quotePopSrch();
		}
	};
	var img=cf.mkTag("img",bx2);
	img.src="/images/ico/btn_search_small.png";
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0,quoteComSave);
	};	
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx2,{paddingLeft:21+"px",width:210+"px"});
	
	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx3 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx3),
		select=cf.mkTag("select",bx3);
	span.innerHTML = "구분";
	select.id="quote_sales_type_cd";
	mkSelect(select,quotepop_brand,"",true);
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	
	var bx4 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx4),
		select=cf.mkTag("select",bx4);
	span.innerHTML = "영업현황";
	select.id="quote_sales_status_cd";
	mkSelect(select,quotepop_status,"",true);
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});
	
	var bx5 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		select=cf.mkTag("select",bx5);
	span.innerHTML = "Type";
	select.id="quote_brand_cd";
	mkSelect(select,quotepop_type,"",true);
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx5,{paddingLeft:35+"px"});
	
	var bx6 = cf.mkTag("div", line2),
		span = cf.mkTag("span", bx6),
		select=cf.mkTag("select",bx6);
	span.innerHTML = "담당영업";
	select.id="quote_user_id";
	mkSelect(select,quotepop_user,"",true);
	cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx6,{paddingLeft:35+"px"});
	
	var bx7 = cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx7);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx7.className="cursor";
	bx7.onclick=function(){
		document.getElementById("sh_quote_year").value=CurrentDate[0];
		document.getElementById("sh_quote_month").value=CurrentDate[1];
		document.getElementById("quote_company_name").value="";
		document.getElementById("quote_sales_type_cd").value="";
		document.getElementById("quote_sales_status_cd").value="";
		document.getElementById("quote_brand_cd").value="";
		document.getElementById("quote_user_id").value="";
	};
	
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	div.className="btn_go2 cursor";
	img.src="/images/btn/btn_go3.gif";
	img.style.cursor="pointer";
	img.onclick=quotePopSrch;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(div,{position:"absolute",top:0,right:0});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left",paddingLeft:20+"px"});
};
function mkDiv_Quote(p,data,fnc){
	prev_qpop="";
	p.innerHTML="";
	p.id="quotepoplist01";
	if(!data||data.length==0){
		var tds=new TABLE({
			p:p,
			arr:[["조회된 데이터가 없습니다."]],
			mode:false,
			header:[["Project Code","견적서명","파일","버전"]],
			colspans:[{y:1, x:0, howmany:25}],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					if(i==0)headerstyle(row,i,col,j);
					else col.className="right";
					commonstyle(row,i,col,j);
				}
			});
		});
	}else{
		var tds=new TABLE({
			p:p,
			arr:data,
			mode:false,
			header:[["Project Code","견적서명","파일","버전"]],
			colspans:[],
			rowspans:[]
		});
		tds.trav(function(row,i){
			row.trav(function(col,j){
				if(col!=undefined){
					if(i==0)headerstyle(row,i,col,j);
					else quote01_tablecellaction(tds,data,row,i,col,j,fnc);					
					commonstyle(row,i,col,j);					
				}				
			});
		});
	}	
	function headerstyle(row,i,col,j){
		cf.setCss(col,{background:"#fafafa",fontSize:12+"px",fontWeight:"600"});
	};
	function commonstyle(row,i,col,j){
		if(i==0){
			var tb=col.parentNode.parentNode;
			tb.cellPadding="0px";
			tb.cellSpacing="0px";
			tb.className="Normal_table";
			cf.setCss(tb,{width:100+"%",wordBreak:"break-all"});
		}
		if(j==0)cf.setCss(col,{width:249+"px"});
		else if(j==1)cf.setCss(col,{width:269+"px"});
		else if(j==3){
			cf.setCss(col,{width:99+"px"});
			col.className="right";
		}
	};
};
function quote01_tablecellaction(tds,data,row,i,col,j,fnc){
	var txt=col.innerHTML;
	col.innerHTML="";
	cf.setCss(col,{corsor:"default"});
	
	if(j==2){
		var div=cf.mkTag("div",col),
			img=cf.mkTag("img",div),
			str=cf.mkTag("div",div);
		img.src="/images/ico/ico_filedown.gif";
		str.innerHTML=txt;
		div.onclick=function(){
			window.open(encodeURI("/sas/quote/quoteDownloadAjax.do?sh_quote_id=" + data[i-1][4]));
		};
		cf.setCss(img,{float:"left",marginRight:3+"px",marginLeft:3+"px"});
		cf.setCss(str,{float:"left",textDecoration:"underline",cursor:"pointer"});
	}else col.innerHTML=txt;
	
	col.onclick=function(){
		if(!prev_qpop){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_qpop.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_qpop=this.parentNode;
		prev_qpop.data=data[i-1];
		prev_qpop.info=["quote_project_code","quote_name","quote_file_name","quote_rivision","quote_id","quote_file_id","quote_file_path"];
	};
	col.ondblclick=function(){
		if(!prev_qpop){
			this.parentNode.style.backgroundColor="#edfafb";
		}else{
			prev_qpop.style.backgroundColor="white";
			this.parentNode.style.backgroundColor="#edfafb";
		}
		prev_qpop=this.parentNode;
		prev_qpop.data=data[i-1];
		
		if(fnc)fnc(prev_qpop.data);
	};
};
function quoteComSave(obj){
	var cname=document.getElementById("quote_company_name"),
		con=document.getElementById("scrFull");
	if(cname){
		cname.value=obj.company_name;
		cf.killTag(con.parentNode);
	}
};