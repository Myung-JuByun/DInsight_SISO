var BRANDLIST,STATUSLIST,TYPELIST,DIVISIONUSERS,SELECT_brand,SELECT_status,SELECT_type,SELECT_user,searchString,prev;

var defaultLoadList = function(){
	var obj={sales_project_year:CurrentDate[0],sales_project_month:CurrentDate[1],company_name:"",sales_type_cd:"",sales_status_cd:"",brand_cd:"",user_id:""};
	//년월생성
	//dateSelect();
	callContractAdminData(obj,function(data){
		contractList(data.salesContractList);
		BRANDLIST=data.brandList;
		STATUSLIST=data.salesStatusList;
		TYPELIST=data.salesTypeList;
		DIVISIONUSERS=data.divisionUsers;		
		mkSearch();
	});
};

var searchAdmin = function(){
	sales_project_month = $("#sh_contract_month").val();
	
	if(sales_project_month.length <= 1)
		sales_project_month = "0" + sales_project_month;
				
	var obj={
		sales_project_year : $("#sh_contract_year").val(),
		sales_project_month : sales_project_month,
		company_name  : searchString.value,
		sales_type_cd : SELECT_type.value,
		sales_status_cd : SELECT_status.value,
		brand_cd : SELECT_brand.value,
		user_id : SELECT_user.value
	};
	
	callContractAdminData(obj,function(data){
		contractList(data.salesContractList);
	});
};

var contractSave = function(con, flag){
	var formData = new FormData();
	
	var pjcode=$("#pjcode").val();
	var pjcodeid=$("#pjcodeid").val();
	var contractname=$("#contractname").val();
	
	formData.append("uploadfile", $("#uploadFile")[0].files[0]);
	formData.append("in_contract_project_code", pjcode);
	formData.append("in_contract_project_code_id", pjcodeid);
	formData.append("in_contract_name", contractname);
	if(flag=="modi"){
		formData.append("in_contract_file_id", prev.obj.contract_file_id);
		formData.append("in_contract_file_path", prev.obj.contract_file_path);
		formData.append("in_contract_file_name", prev.obj.contract_file_name);
	}
	
	var file=$("#uploadFile")[0].files[0];
	if(!pjcodeid){
		generalPopOk2("Project Code를 선택하세요.");
		return;
	}
	if(!contractname){
		generalPopOk2("견적서명을 입력하세요.");
		return;
	}
	if(!file &&(flag=="new")){
		generalPopOk2("파일을 선택하세요.");
		return;
	}
	
	if(flag=="prdsales"){
		var box = $("#contract_detail_pop"),			
			tbody = document.getElementById("contract_detail_pop_tbody"),
			obj = {pjcode:$("#pjcode").val()},
			ContractList;
		$("#contract_name").val(contractname);
		
		generalPop("저장하시겠습니까?", function(){
			$.ajax({
				url: "/sas/Contract/saveSalesContractAjax",
				type: "POST",
				data: formData,
				dataType: "text",
				processData: false,
				contentType: false,				    
				success : function (data) {
					var resultData = $.parseJSON(data);
					if(resultData.status == "success"){
						if(resultData.project_code_yn == "Y") generalPopOk("계약서의 버전이 업데이트 되었습니다.");
						else generalPopOk("저장되었습니다");
						
						callContractDetailData(obj,function(data){
							ContractList=data.salesContractRivisionList;
						});
						mkDetailbody(tbody,ContractList);
					}
					cf.killTag(con.parentNode);
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
		
		//cf.killTag(box.parentNode);
	}else{
		generalPop("저장하시겠습니까?", function(){
			$.ajax({
				url: "/sas/Contract/saveSalesContractAjax",
				type: "POST",
				data: formData,
				dataType: "text",				
				processData: false,
			    contentType: false,
				success : function (data) {
					var resultData = $.parseJSON(data);
					if(resultData.status == "success"){
						if(resultData.project_code_yn == "Y") generalPopOk("계약서의 버전이 업데이트 되었습니다.");
						else generalPopOk("저장되었습니다");
					}
					cf.killTag(con.parentNode);
					searchAdmin();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};
function pjcodeSave(con){
	var pjcode=document.getElementById("pjcode");
	pjcode.value=prev_pjcode.sales_project_code;
	
	var pjcodeid=document.getElementById("pjcodeid");
	pjcodeid.value=prev_pjcode.sales_project_id;
	
	cf.killTag(con);
};
function companySave(prev_com_obj){
	if(!prev_com) generalPopOk2("고객사를 선택하세요.");
	else searchString.value=prev_com_obj.company_name;
	
	document.getElementById("my_closs").onclick();
};
function dateSelect(){
	var year=document.getElementById("sh_contract_year");
	var month=document.getElementById("sh_contract_month");
	
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