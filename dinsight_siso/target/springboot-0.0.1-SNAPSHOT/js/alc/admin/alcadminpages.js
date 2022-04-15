var prev_tr, pop_prev_tr;

//검색
function mkSearch(){
	var srch = document.getElementById("searchDiv");
	srch.innerHTML="";
	
	var tb=cf.mkTag("table",srch),
		tr=cf.mkTag("tr",tb),
		td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td),
		input_hidden=cf.mkTag("input",td),
		input=cf.mkTag("input",td),
		span2=cf.mkTag("span",td),
		img=cf.mkTag("img",td);
	
	span.innerHTML="고객사&nbsp;&nbsp;";
	
	input_hidden.id="sh_company_id";
	input_hidden.name="sh_company_id";
	input_hidden.type="hidden";
	
	input.size=17;
	input.id="sh_company_name";
	input.name="sh_company_name";
	
	span2.innerHTML="&nbsp;";
	
	img.src="/images/ico/btn_search_small.png";
	img.align="absmiddle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0);
	};
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;년도&nbsp;&nbsp;";
	var select=cf.mkTag("select",td);
	select.id="sh_year";
	select.name="sh_year";
	
	//년도
	createYearMonthDay("Y", "2013", "#sh_year");
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;사업장구분&nbsp;&nbsp;";
	var select=cf.mkTag("select",td);
	select.id="sh_place_of_business";
	select.name="sh_place_of_business";
	
	//
	mkSelect(select, PLACEOFBUSINESS,"","Y");
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;담당영업&nbsp;&nbsp;";
	var select=cf.mkTag("select",td);
	select.id="sh_sales_customer";
	select.name="sh_sales_customer";
	
	//
	mkSelect(select, SALES,"","Y");
	
	var div=cf.mkTag("div",srch),
		img=cf.mkTag("img",div);
	
	div.className="btn_go";
	img.src="/images/btn/btn_go.gif";
	img.style.cursor="pointer";
	img.onclick=function(){
		alcAdminSearchList();
	};
}

//리스트
function alcList(obj) {
	
	var bodyList = document.getElementById("alcView");
	bodyList.innerHTML="";
	
	var len=obj.length;

	if(len==0){
		var tr=cf.mkTag("tr",bodyList);
		tr.style.textAlign="center";
		
		var td=cf.mkTag("td",tr);
		td.className="right";
		td.colSpan="7";
		td.innerHTML="조회된 데이터가 없습니다.";
		
	}else{
	
		obj.trav(function(d,i){
			//dir(d);
			
			var tr=cf.mkTag("tr",bodyList);
			tr.style.cursor="pointer";
			tr.style.textAlign="center";
			
			tr.onmousedown=function(){
				if(prev_tr==null){
					this.style.backgroundColor="#edfafb";
				}else{
					prev_tr.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev_tr=this;
				prev_tr.obj=d;
			};
			
			var td=cf.mkTag("td",tr);
			td.style.width=18+"%";
			td.innerHTML=d.portfolio;
			
			var td=cf.mkTag("td",tr);
			td.style.width=10+"%";
			td.innerHTML=d.prd_number;
			
			var td=cf.mkTag("td",tr);
			td.style.width=10+"%";
			td.innerHTML=d.prd_type;
			
			var td=cf.mkTag("td",tr);
			td.style.width=10+"%";
			td.innerHTML=d.trigram;
			
			var td=cf.mkTag("td",tr);
			td.style.width=20+"%";
			td.innerHTML=d.portfolio_item_name;
			
			var td=cf.mkTag("td",tr);
			td.style.width=5+"%";
			td.innerHTML=d.qty;
			
			var td=cf.mkTag("td",tr);
			td.style.width=10+"%";
			if(d.code_name==undefined) {
				td.innerHTML="";
			}else{
				td.innerHTML=d.code_name;
			}
			
			var td=cf.mkTag("td",tr);
			td.style.width=10+"%";
			if(d.user_name==undefined){
				td.innerHTML="";
			}else{
				td.innerHTML=d.user_name;
			}
			
			var td=cf.mkTag("td",tr);
			td.style.width=7+"%";
			td.innerHTML="[상세보기]";
			td.onclick=function (){
				alcAdminInstallCustomer(d);
			};
			
			/*var td=cf.mkTag("td",tr);
			td.style.width=15+"%";
			td.innerHTML=d.ordering_start_day + " ~ " + d.ordering_end_day;
			
			var td=cf.mkTag("td",tr);
			td.style.width=15+"%";
			td.innerHTML=d.install_start_day + " ~ " + d.invoice_end_day;
			
			var td=cf.mkTag("td",tr);
			td.style.width=5+"%";
			if(d.install_identical_yn == '1') {
				td.innerHTML="Y";	
			} else{
				td.innerHTML="N";
				td.style.color="blue";
				td.style.fontWeight="bold";
				td.onclick=function (){
					alcAdminInstallCustomer(d);
				};
			}*/
			
		});
	}
}

