function groupAdd() {
	var con=document.createElement("div");
	con.style.width="400px";
	con.style.height="225px";
	con.style.position="absolute";
	Object.assign(con.style, {width:"400px", height:"225px", position:"absolute"});
	
	con.innerHTML="";
	
	var con0=cf.mkTag("div",con);
	
	var con1=cf.mkTag("div",con0);
	con1.id="pop_group_add2";	
	Object.assign(con1.style, {border:"2px solid black", backgroundColor:"white"});
	
	var con2=cf.mkTag("div",con1);
	con2.className="my_top";
	var span=cf.mkTag("span",con2);
	span.innerHTML="그룹 추가"
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
				
	var con5=cf.mkTag("div",con4);
	con5.className="mini_title";
	con5.innerHTML="그룹 정보";
	
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	var tb1=cf.mkTag("table",con6);	
	Object.assign(tb1, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
	
	var tbd=cf.mkTag("tbody",tb1);
	var tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width="100px";
	td.className="right pd10";
	th.innerHTML="그룹 코드";
	var input=cf.mkTag("input",td);
	input.size="30";
	input.id="group_code";

	var	tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	td.className="right pd10";
	th.innerHTML="그룹명";
	var input=cf.mkTag("input",td);
	input.size="30";
	input.id="group_name";
	
	var	tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	td.className="right pd10";
	th.innerHTML="속성설명";
	var input=cf.mkTag("input",td);
	input.size="30";
	input.id="group_ex";
	
	var con7=cf.mkTag("div",con3),
		img1=cf.mkTag("img",con7),
		span=cf.mkTag("span",con7),
		img2=cf.mkTag("img",con7);
	
	con7.className="savebtn4";
	img1.style.cursor="pointer";
	img2.style.cursor="pointer";
	img1.src="/images/pop_btn/btn_pop_add.png";
	img2.src="/images/pop_btn/btn_pop_cancel.gif";
	span.innerHTML="  ";
	
	img1.onclick=function(){
		//추가
		var group_code=document.getElementById("group_code").value,
			group_name=document.getElementById("group_name").value,
			group_ex=document.getElementById("group_ex").value;
			
		generalPop("추가하시겠습니까?", function(){			
			$.ajax({
				url: "/adm/code/saveCmnGroupCodeOne",
				type: "POST",
				data:{"group_id": group_code,"group_name" : group_name,"etc_explain" : group_ex,"delete_yn" : "0"},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("추가되었습니다.");
					cf.killTag(con.parentNode);
					defaultLoadList();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	};
	img2.onclick=function(){
		cf.killTag(con.parentNode);
	};
	callPop(con);
};

function groupModi() {
	if(!prev_g) generalPop("수정할 그룹을 선택하세요.");
	else{
		var con=document.createElement("div");		
		Object.assign(con.style, {width:"400px", height:"225px", position:"absolute"});
		
		con.innerHTML="";
		
		var con0=cf.mkTag("div",con);
		
		var con1=cf.mkTag("div",con0);
		con1.id="pop_group_add2";				
		Object.assign(con1.style, {border:"2px solid black", backgroundColor:"white"});
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="그룹 수정"
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="그룹 정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);		
		Object.assign(tb1, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.className="right pd10";
		th.innerHTML="그룹 코드";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="group_code";
		input.value=prev_g.group_id;

		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="그룹명";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="group_name";
		input.value=prev_g.group_name;
		
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="속성설명";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="group_ex";
		input.value=prev_g.etc_explain;
		
		var con7=cf.mkTag("div",con3),
			img1=cf.mkTag("img",con7),
			span=cf.mkTag("span",con7),
			img2=cf.mkTag("img",con7);
		
		con7.className="savebtn4";
		img1.style.cursor="pointer";
		img2.style.cursor="pointer";
		img1.src="/images/pop_btn/btn_pop_modi.png";
		img2.src="/images/pop_btn/btn_pop_cancel.gif";
		span.innerHTML="  ";
		
		img1.onclick=function(){
			//추가
			var group_code=document.getElementById("group_code").value,
				group_name=document.getElementById("group_name").value,
				group_ex=document.getElementById("group_ex").value;
				
			generalPop("수정하시겠습니까?", function(){
				$.ajax({
					url: "/adm/code/saveCmnGroupCodeOne",
					type: "POST",
					data:{"group_id": group_code,"group_name" : group_name,"etc_explain" : group_ex,"delete_yn" : "0"},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("수정되었습니다.");
						cf.killTag(con.parentNode);
						defaultLoadList();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
			});
		};
		
		img2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		callPop(con);
	}//else
};

function codeAdd(){
	if(!prev_g) generalPop("그룹을 선택하세요.");
	else{
		var con=document.createElement("div");		
		Object.assign(con.style, {width:"400px", height:"225px", position:"absolute"});
		
		con.innerHTML="";
		
		var con0=cf.mkTag("div",con);
		
		var con1=cf.mkTag("div",con0);
		con1.id="pop_group_add2";
		Object.assign(con1.style, {border:"2px solid black", backgroundColor:"white"});
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="코드 추가"
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="코드 정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);
		Object.assign(tb1, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.className="right pd10";
		th.innerHTML="코드";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="code_id";

		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="코드명";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="code_name";
		
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="속성1";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="code_etc1";

		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="정렬순서";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="order_seq";
		
		var con7=cf.mkTag("div",con3),
			img1=cf.mkTag("img",con7),
			span=cf.mkTag("span",con7),
			img2=cf.mkTag("img",con7);
		
		con7.className="savebtn4";
		img1.style.cursor="pointer";
		img2.style.cursor="pointer";
		img1.src="/images/pop_btn/btn_pop_add.png";
		img2.src="/images/pop_btn/btn_pop_cancel.gif";
		span.innerHTML="  ";
		
		img1.onclick=function(){
			//추가
			var code_id=document.getElementById("code_id").value,
				code_name=document.getElementById("code_name").value,
				code_etc1=document.getElementById("code_etc1").value,
			    order_seq=document.getElementById("order_seq").value;
				
			generalPop("추가하시겠습니까?", function(){			
				$.ajax({
					url: "/adm/code/saveCmnCodeOne",
					type: "POST",
					data:{"group_id"	: prev_g.group_id,"code_id"	: code_id,"code_name" : code_name,"etc1" : code_etc1,"etc2" : "",
						"etc3" : "","etc4" : "","order_seq" : order_seq,"delete_yn" : "0"},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("추가되었습니다.");
						
						cf.killTag(con.parentNode);
						defaultLoadList();
						
						var a=document.getElementById("groupView");
						a.children[prev_g.idx].onclick();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
				
			});
		};
		img2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		callPop(con);
	}//else
}

function codeModi(){
	if(!prev_c || prev_c.group_id!=prev_g.group_id) generalPop("코드를 선택하세요.");
	else{
		var con=document.createElement("div");
		Object.assign(con.style, {width:"400px", height:"225px", position:"absolute"});		
		
		con.innerHTML="";
		
		var con0=cf.mkTag("div",con);
		
		var con1=cf.mkTag("div",con0);
		con1.id="pop_group_add2";		
		Object.assign(con1.style, {border:"2px solid black", backgroundColor:"white"});
		
		var con2=cf.mkTag("div",con1);
		con2.className="my_top";
		var span=cf.mkTag("span",con2);
		span.innerHTML="코드 수정"
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="코드 정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);
		Object.assign(tb1, {cellpadding:0, cellspacing:0, className:"Normal_table_pop"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.className="right pd10";
		th.innerHTML="코드";
		td.innerHTML=prev_c.code_id;

		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="코드명";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="code_name";
		input.value=prev_c.code_name;
		
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="속성1";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="code_etc1";
		input.value=prev_c.etc1;
		
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="정렬순서";
		var input=cf.mkTag("input",td);
		input.size="40";
		input.id="order_seq";
		input.value=prev_c.order_seq;
		
		var con7=cf.mkTag("div",con3),
			img1=cf.mkTag("img",con7),
			span=cf.mkTag("span",con7),
			img2=cf.mkTag("img",con7);
		
		con7.className="savebtn4";
		img1.style.cursor="pointer";
		img2.style.cursor="pointer";
		img1.src="/images/pop_btn/btn_pop_modi.png";
		img2.src="/images/pop_btn/btn_pop_cancel.gif";
		span.innerHTML="  ";
		
		img1.onclick=function(){
			//추가
			var code_name=document.getElementById("code_name").value,
				code_etc1=document.getElementById("code_etc1").value,
			    order_seq=document.getElementById("order_seq").value;
				
			generalPop("수정하시겠습니까?", function(){
				$.ajax({
					url: "/adm/code/saveCmnCodeOne",
					type: "POST",
					data:{"group_id"	: prev_g.group_id,"code_id"	: prev_c.code_id,"code_name" : code_name,"etc1" : code_etc1,"etc2" : "",
						"etc3" : "","etc4" : "","order_seq" : order_seq,"delete_yn" : "0"},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("수정되었습니다.");
						cf.killTag(con.parentNode);
						defaultLoadList();
						var a=document.getElementById("groupView");
						a.children[prev_g.idx].onclick();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
				defaultLoadList();
				var a=document.getElementById("groupView");
				a.children[prev_g.idx].onclick();
			});
		};		
		img2.onclick=function(){
			cf.killTag(con.parentNode);
		};
		callPop(con);
	}//else	
}