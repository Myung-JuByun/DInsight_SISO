var prev_tr, pop_prev_tr;
var PLACEOFBUSINESS, SALESCUSTOMER, YN, SALES;

function defaultLoadList(){	
	
	$.ajax({
		  url: "/alc/admin/alcSearchAdminListAjax",
		  type: "POST",
		  async: false,
		  dataType: "json",
		  success: function (data) {
			  PLACEOFBUSINESS = data.placeOfBusiness;
			  YN = data.yn;
			  SALES = data.sales;
		  }
	});
	
	//검색화면
	mkSearch();	
	//자동완성
	autocompleteCompanySearch();
}

//검색
function mkSearch(data){
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
	img.style.verticalAlign="middle";
	img.style.cursor="pointer";
	img.onclick=function(){
		companyPopSrch(0);
	};
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;년도&nbsp;&nbsp;";
	select=cf.mkTag("select",td);
	select.id="sh_year";
	select.name="sh_year";
	
	//년도
	createYearMonthDay("Y", "2013", "#sh_year");
	
	var td=cf.mkTag("td",tr),
	span=cf.mkTag("span",td);

	span.innerHTML="&nbsp;&nbsp;파훼&nbsp;&nbsp;";
	select=cf.mkTag("select",td);
	select.id="sh_destruction_yn";
	select.name="sh_destruction_yn";
	
	//
	mkSelect(select, YN);
	
	var td=cf.mkTag("td",tr),
	span=cf.mkTag("span",td);

	span.innerHTML="&nbsp;&nbsp;삭제&nbsp;&nbsp;";
	select=cf.mkTag("select",td);
	select.id="sh_delete_yn";
	select.name="sh_delete_yn";
	
	//
	mkSelect(select, YN);
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;사업장구분&nbsp;&nbsp;";
	select=cf.mkTag("select",td);
	select.id="sh_place_of_business";
	select.name="sh_place_of_business";
	
	//
	mkSelect(select, PLACEOFBUSINESS,"","Y");
	
	var td=cf.mkTag("td",tr),
		span=cf.mkTag("span",td);
	
	span.innerHTML="&nbsp;&nbsp;담당영업&nbsp;&nbsp;";
	select=cf.mkTag("select",td);
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
function alcModifyList(obj) {
	
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
			td.style.width=3+"%";
			var input=cf.mkTag("input",td);
			input.type="checkbox";
			input.id="in_alc_id";
			input.name="in_alc_id";
			input.value=d.alc_id;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.company_name;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.portfolio;
			
			var td=cf.mkTag("td",tr);
			td.style.width="7%";
			td.innerHTML=d.prd_number;
			
			var td=cf.mkTag("td",tr);
			td.style.width="5%";
			td.innerHTML=d.prd_type;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.trigram;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.portfolio_item_name;
			
			var td=cf.mkTag("td",tr);
			td.style.width="5%";
			td.innerHTML=d.destruction_yn;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			if(d.ordering_start_day==undefined) {
				td.innerHTML="";
			}else{
				td.innerHTML=d.ordering_start_day + " ~ " + d.ordering_end_day;
			}
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			td.innerHTML=d.install_company_id;
			
			var td=cf.mkTag("td",tr);
			td.style.width="5%";
			td.innerHTML=d.qty;
			
			var td=cf.mkTag("td",tr);
			td.style.width="10%";
			if(d.install_start_day==undefined) {
				td.innerHTML="";
			}else{
				td.innerHTML=d.install_start_day + " ~ " + d.invoice_end_day;
			}
			
			var td=cf.mkTag("td",tr);
			td.style.width="5%";
			if(d.install_identical_yn == '1') {
				td.innerHTML="Y";	
			} else{
				td.innerHTML="N";
				td.style.color="blue";
				td.style.fontWeight="bold";
				td.onclick=function (){
					alcAdminInstallCustomer(d);
				};
			}
			
		});
	}
}

