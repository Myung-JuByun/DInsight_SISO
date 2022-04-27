//검색
function alcStatusSearchList() {	
	if($("#sh_license_year").val() != "" && $("#sh_license_month").val() == "") {	
		generalPop(" License Date 월을 선택하세요.");				
	} else if($("#sh_license_year").val() == "" && $("#sh_license_month").val() != "") {		
		generalPop(" License Date 년도를 선택하세요.");			
	} else {
		var temp = $("#searchDiv").find("input, select").serializeArray();
		//dir(temp);
	
		$.ajax({
			  url: "/alc/status/alcStatusList",
			  type: "POST",
			  data: temp,
			  dataType: "json",
			  success: function (data) {
				  alcStatusList(data.alcStatusList);
			  }
		});
	}
}

//설치사
function alcStatusDetail(obj){
	var temp = "company_id=" + obj.company_id + "&sh_year=" + obj.alc_year;
	temp += "&contract_number_id=" + obj.contract_number_id;
	temp += "&portfolio=" + obj.portfolio.replace("&","%26") + "&prd_number=" + obj.prd_number.replace("&","%26") + "&prd_type=" + obj.prd_type.replace("&","%26") + "&trigram=" + obj.trigram.replace("&","%26");
	
	$.ajax({
		  url: "/alc/status/alcStatusDetailList",
		  type: "POST",
		  data: temp,
		  dataType: "json",
		  success: function (data) {
			  alcStatusDetailPop(temp, data.alcStatusDetailList, data.alcStatusDetailInstallCustomerList);
		  }
	});
}

//고객사 검색에 검색값 넣기
function companySave(obj){	
	if(!obj) generalPop("고객사를 선택하세요.");
	else {
		document.getElementById("sh_company_id").value=obj.company_id;
		document.getElementById("sh_company_name").value=obj.company_name;
	}
	document.getElementById("my_closs").onclick();
};

//계약서 번호
function pjcodeSave(con){
	
	if(!prev_pjcode) generalPop("Project Code를 선택하세요.");
	else {
		document.getElementById("sh_contract_number_id").value=prev_pjcode.sales_project_id;
		document.getElementById("contract_number").value=prev_pjcode.sales_project_code;
	}
	cf.killTag(con);
};

//자동완성 기능(고객사, 설치사)
function autocompleteCompanySearch(){	
	$("#sh_company_name, #company_name, #install_company_name").autocomplete({
		source : function( request, response ) {
			
			$.ajax({
                type: "POST",
                url: "/cop/customerAdminAjax",
                dataType: "json",
                //request.term = $("#autocomplete").val()
                data: {"searchString": request.term},
                success: function(data) {
                	
                	//dir(data);
                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response( 
                        $.map(data.customerList, function(item) {
                        	
                        	//dir(item);
                            return {
                            	label: item.company_name,
                            	company_id: item.company_id
                            };
                        })
                    );
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 1,
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	
        	if(this.name == "sh_company_name") {
        		$("#sh_company_id").val(ui.item.company_id);
                $("#sh_company_name").val(ui.item.label);
        	}
        	
        	if(this.name == "company_name") {
        		$("#company_id").val(ui.item.company_id);
                $("#company_name").val(ui.item.label);
                $("#install_company_id").val(ui.item.company_id);
                $("#install_company_name").val(ui.item.label);
        	}
        	
        	if(this.name == "install_company_name") {
        		$("#install_company_id").val(ui.item.company_id);
                $("#install_company_name").val(ui.item.label);
        	}
            return false;
        },
        open: function(){
            $(this).autocomplete('widget').css({"z-index":"10000","max-height":"200px", "overflow-y":"auto", "overflow-x":"hidden", "width":"200px", "height":"200px"});
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
}

//계약서 파일 리스트
function alcStatusFileList(searchString){	
	var url = "/alc/status/alcStatusDetailContractFileList";
	
	$.ajax({
		  url: url,
		  type: "POST",
		  data: searchString,
		  dataType: "json",
		  success: function (data) {
			  
			  alcStatusInstallCustomerFileListPop(data.alcStatusDetailFileList);
		  }
	});
}