var BRANDLIST,STATUSLIST,TYPELIST,DIVISIONUSERS,SELECT_brand,SELECT_status,SELECT_type,SELECT_user,searchString,prev;

function defaultLoadListInit(){
	//년월생성
	//dateSelect();
	var obj={sales_project_year : CurrentDate[0],sales_project_month : CurrentDate[1],company_name  : "",sales_type_cd : "",
			sales_status_cd : "",brand_cd : "",user_id : ""};
	 callQuoteAdminData(obj,function(data){
		quoteList(data.salesQuoteList);
		BRANDLIST=data.brandList;
		STATUSLIST=data.salesStatusList;
		TYPELIST=data.salesTypeList;
		DIVISIONUSERS=data.divisionUsers;
		mkSearch();
	});
};
function searchAdmin(){
	sales_project_month = document.getElementById("sh_quote_month").value
	var obj={sales_project_year : document.getElementById("sh_quote_year").value,sales_project_month : sales_project_month,company_name  : searchString.value,
			sales_type_cd : SELECT_type.value,sales_status_cd : SELECT_status.value,brand_cd : SELECT_brand.value,user_id : SELECT_user.value};	
	callQuoteAdminData(obj,function(data){
		quoteList(data.salesQuoteList);	
	}); 
};
function dateSelect(){
	var year=document.getElementById("sh_quote_year");
	var month=document.getElementById("sh_quote_month");
	
	year.innerHTML="";
	month.innerHTML="";
	
	var date=new Date();
	var current_year=date.getFullYear();
	var current_month=date.getMonth();
	
	var op;
	for(i=current_year;i>=2013;i--){
		op=cf.mkTag("option",year);
		op.value=i;
		op.innerHTML=i;
		if(i==current_year){
			op.selected="selected";
		}
	}	
	for(i=0;i<12;i++){
		op=cf.mkTag("option",month);
		op.value=i+1;
		op.innerHTML=i+1;
		if(i==current_month){
			op.selected="selected";
		}
	}
};
function mkSearch(){
	SELECT_type.innerHTML="";
	mkSelect(SELECT_type, TYPELIST,"",true);
	
	SELECT_status.innerHTML="";
	mkSelect(SELECT_status, STATUSLIST,"",true);
	
	SELECT_brand.innerHTML="";
	mkSelect(SELECT_brand, BRANDLIST,"",true);
	
	SELECT_user.innerHTML="";
	mkSelect(SELECT_user, DIVISIONUSERS,"",true);
};
function quoteSave(con, opt){
	var formData = new FormData();
	
	var pjcode=document.getElementById("pjcode").value;
	var pjcodeid=document.getElementById("pjcodeid").value;
	var quotename=document.getElementById("quotename").value;
	
	formData.append("uploadfile", $("#uploadFile")[0].files[0]);
	formData.append("in_quote_project_code", pjcode);
	formData.append("in_quote_project_code_id", pjcodeid);
	formData.append("in_quote_name", quotename);
	
	if(opt){
		formData.append("in_quote_file_id", prev.obj.quote_file_id);
		formData.append("in_quote_file_path", prev.obj.quote_file_path);
		formData.append("in_quote_file_name", prev.obj.quote_file_name);
	}
	
	var file=$("#uploadFile")[0].files[0];
	if(!pjcodeid){
		generalPopOk2("Project Code를 선택하세요.");
		return;
	}
	if(!quotename){
		generalPopOk2("견적서명을 입력하세요.");
		return;
	}
	if(!file && !opt){
		generalPopOk2("파일을 선택하세요.");
		return;
	}
	
	generalPop("저장하시겠습니까?", function(){
		$.ajax({
			url: "/sas/quote/saveSalesQuoteAjax",
			type: "POST",
			data: formData,
			dataType: "text",
			processData: false,
		    contentType: false,
			success : function (data) {
				var resultData = $.parseJSON(data);
				if(resultData.project_code_yn == "Y") generalPopOk("견적서의 버전이 업데이트 되었습니다.");
				else generalPopOk("저장되었습니다"); 
				cf.killTag(con.parentNode);
				searchAdmin();
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	});
};
function pjcodeSave(con){
	var pjcode=document.getElementById("pjcode");
	var pjcodeid=document.getElementById("pjcodeid");
	pjcode.value=prev_pjcode.sales_project_code;
	pjcodeid.value=prev_pjcode.sales_project_id;
	
	cf.killTag(con);
};
function companySave(prev_com_obj){
	if(!prev_com_obj) generalPopOk2("고객사를 선택하세요.");
	else searchString.value=prev_com_obj.company_name;
	document.getElementById("my_closs").onclick();
};