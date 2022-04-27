var mkLeaf = function(el,category_menu,cnt){
	a=cf.mkTag("div",category_menu);
	a.style.backgroundColor="white";
	a.className="wrap_depth";
	
	a.obj=el;
	a.onclick=function(){		
		CURRENT_CATEGORY=el;		
		if(prev==null){
		//	debugger;
			this.style.backgroundColor="#edfafb";
		}else{
			prev.style.backgroundColor="white";
			this.style.backgroundColor="#edfafb";
		}
		prev=this;
	};
	
	var div1=cf.mkTag("div",a),
		div2=cf.mkTag("div",a),
		img=cf.mkTag("img",div1),
		span1=cf.mkTag("span",div1),
		span2=cf.mkTag("span",div2);
	
	if(el.category_level=="1"){
		div1.className="depth1";
		img.src="/images/btn/btn_minus.gif";
		span1.innerHTML=" &nbsp"+el.category_name;
		span2.innerHTML="&nbsp";
	}else if(el.category_level=="2"){
		div1.className="depth2";
		img.src="/images/btn/btn_minus.gif";
		span1.innerHTML=" &nbsp"+el.category_name;
		span2.innerHTML="&nbsp";
	}else{
		div1.className="depth3";
		div2.className="depth_second";
		img.src="/images/ico/img_dot.gif";
		span1.innerHTML=" &nbsp"+el.category_name;
		span2.innerHTML=el.account_name;
	}	
	leaves.push(a);
}

var categoryAdd = function(){
	var c_name,
		parent_id;
	
	if(!CURRENT_CATEGORY){
		c_name="전체";
		parent_id="0";
	}else if(CURRENT_CATEGORY.category_level=="3"){
		generalPop("더이상 하위분류를 추가할 수 없습니다.");
		return;
	}else{
		c_name=CURRENT_CATEGORY.category_name;
		parent_id=CURRENT_CATEGORY.category_id;
	}
	
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
	span.innerHTML="분류 추가"
	
	var con3=cf.mkTag("div",con1);
	con3.className="my-container";
	
	var con4=cf.mkTag("div",con3);
	con4.className="con_table";
				
	var con5=cf.mkTag("div",con4);
	con5.className="mini_title";
	con5.innerHTML="분류 정보";
	
	var con6=cf.mkTag("div",con4);
	con6.className="Wrap_table";
	
	var tb1=cf.mkTag("table",con6);	
	Object.assign(tb1, {cellpadding:0, cellspaceing:0, className:"Normal_table_pop"});
	
	var tbd=cf.mkTag("tbody",tb1);
	var tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	th.style.width="100px";
	td.className="right pd10";
	td.id="pcategory_id";
	th.innerHTML="상위 분류";
	td.innerHTML=c_name;

	var	tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	td.className="right pd10";
	th.innerHTML="분류명";
	var input=cf.mkTag("input",td);
	input.size="30";
	input.id="category_name";
	
	var	tr=cf.mkTag("tr",tbd),
		th=cf.mkTag("th",tr),
		td=cf.mkTag("td",tr);
	td.className="right pd10";
	th.innerHTML="계정과목";
	if(prev&&CURRENT_CATEGORY.category_level=="2"){
		var select=cf.mkTag("select",td);
		select.id="title_account";
		select.className="select_pop";
		mkSelectCategory(select);
	}
	
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
		var category_name=$("#category_name").val(),
			account_cd,
			cate_level;
		
		if(prev&&CURRENT_CATEGORY.category_level=="2")	
			account_cd = $("#title_account").val();
		else account_cd="";
		
		if(CURRENT_CATEGORY)	cate_level=Number(CURRENT_CATEGORY.category_level)+1;
		else cate_level=1;
			
		generalPop("추가하시겠습니까?", function(){			
			$.ajax({
				url: "/adm/category/saveExpanseCategory",
				type: "POST",
				data:{
					"catagory_id" : "",
					"category_name"	: category_name,
					"category_level" : String(cate_level),
					"parent_id" : parent_id,
					"account_cd" : account_cd,
					"default_expanse_class" :  "0",
					"delete_yn" : "0"
				},
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
}

var categoryModi = function(){
	if(!prev) generalPop("상위분류를 선택하세요.");
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
		span.innerHTML="분류 수정"
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
					
		var con5=cf.mkTag("div",con4);
		con5.className="mini_title";
		con5.innerHTML="분류 정보";
		
		var con6=cf.mkTag("div",con4);
		con6.className="Wrap_table";
		
		var tb1=cf.mkTag("table",con6);
		Object.assign(tb1, {cellpadding:0, cellspaceing:0, className:"Normal_table_pop"});
		
		var tbd=cf.mkTag("tbody",tb1);
		var tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		th.style.width="100px";
		td.className="right pd10";
		td.id="pcategory_id";
		th.innerHTML="상위 분류";
		td.innerHTML=findCategryName();

		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="분류명";
		var input=cf.mkTag("input",td);
		input.size="30";
		input.id="category_name";
		input.value=CURRENT_CATEGORY.category_name;
		
		var	tr=cf.mkTag("tr",tbd),
			th=cf.mkTag("th",tr),
			td=cf.mkTag("td",tr);
		td.className="right pd10";
		th.innerHTML="계정과목";
		
		if(prev&&CURRENT_CATEGORY.category_level=="3"){
			var select=cf.mkTag("select",td);
			select.id="title_account";
			select.className="select_pop";
			
			if(prev.obj.account_cd){
				def=prev.obj.account_cd;
				mkSelectCategory(select, def);
			}else mkSelectCategory(select);
		}
		
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
			var category_name=document.getElementById("category_name").value,
				account_cd;
		
			if(prev&&CURRENT_CATEGORY.category_level=="3"){
				account_cd=document.getElementById("title_account").value;
			}else account_cd="";
			
			generalPop("수정하시겠습니까?", function(){				
				$.ajax({
					url: "/adm/category/saveExpanseCategory",
					type: "POST",
					data:{
						"category_id" : CURRENT_CATEGORY.category_id,
						"category_name"	: category_name,
						"category_level" : CURRENT_CATEGORY.category_level,
						"parent_id" : CURRENT_CATEGORY.parent_id,
						"account_cd" : account_cd,
						"default_expanse_class" : CURRENT_CATEGORY.default_expanse_class,
						"delete_yn" : "0"
					},
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
	}
}