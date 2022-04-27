//검색
function alcAdminSearchList(check) {	
	if(!check){		
		if($("#sh_company_name").val()==""){			
			generalPop("고객사를 선택하세요.");			
		} else{
			var temp = $("#searchDiv").find("input, select").serializeArray();
			//dir(temp);
		
			$.ajax({
				  url: "/alc/admin/alcAdminListAjax",
				  type: "POST",
				  data: temp,
				  dataType: "json",
				  success: function (data) {
					  dir(data);
					  alcModifyList(data.alcAdminList);
				  }
			});
		}
		
	} else {		
		if($("#sh_company_name").val()!=""){			
			var temp = $("#searchDiv").find("input, select").serializeArray();
			//dir(temp);
		
			$.ajax({
				  url: "/alc/admin/alcAdminListAjax",
				  type: "POST",
				  data: temp,
				  dataType: "json",
				  success: function (data) {
					  dir(data);
					  alcModifyList(data.alcAdminList);
				  }
			});
		}
	}	
}

//설치사
function alcAdminInstallCustomer(obj){
	if(obj.place_of_business==undefined) obj.place_of_business="";
	if(obj.sales_customer==undefined) obj.sales_customer="";
	

	var temp = "sh_company_id=" + obj.company_id + "&sh_year=" + obj.alc_year;
	temp += "&sh_place_of_business=" + obj.place_of_business + "&sh_sales_customer=" +obj.sales_customer;
	temp += "&portfolio=" + obj.portfolio.replace("&","%26") + "&prd_number=" + obj.prd_number.replace("&","%26") + "&prd_type=" + obj.prd_type.replace("&","%26") + "&trigram=" + obj.trigram.replace("&","%26");
	
	//dir(temp);
	
	$.ajax({
		  url: "/alc/admin/alcAdminInstallCustomerListAjax",
		  type: "POST",
		  data: temp,
		  dataType: "json",
		  success: function (data) {
			  alcInstallCustomerPop(temp, data.alcAdminList, data.alcAdminInstallCustomerList);
		  }
	});
}

//고객사 검색에 검색값 넣기
function companySave(obj){
	
	if(obj){
		$("#sh_company_id").val(obj.company_id);
		$("#sh_company_name").val(obj.company_name);
	} else {
		generalPop("고객사를 선택하세요.");
	}
	
	$("#my_closs").trigger("click");
};

//고객사 검색에 검색값 넣기(ALC 등록 팝업)
function alcCompanySave(obj){	
	if(obj) {
		$("#company_id").val(obj.company_id);
		$("#company_name").val(obj.company_name);
		
		if($("#install_identical_yn").val() == "1"){
			$("#install_company_id").val(obj.company_id);
			$("#install_company_name").val(obj.company_name);
		}
	} else {
		generalPop("고객사를 선택하세요.");
	}
	
	$("#my_closs").trigger("click");
};

//설치사 검색에 검색값 넣기(ALC 등록 팝업)
function alcInstallCompanySave(obj){
	
	if(!obj) generalPop("고객사를 선택하세요.");
	else {
		document.getElementById("install_company_id").value=obj.company_id;
		document.getElementById("install_company_name").value=obj.company_name;
	}
	
	$("#my_closs").trigger("click");
};

//필수입력값 표시
function asterisk(con){
	var span=cf.mkTag("span",con);
	span.className="asterisk";
	span.innerHTML="*";
}

//ALC관리등록 팝업 - 발주기간 복사
function copyOrderDate(){
	/*dir($("#ordering_identical_yn").prop("checked"));
	
	if($("#ordering_identical_yn").prop("checked") == true) {
		
		$('#ordering_day').datepicker({onClose: function(dateText) {
            var myDate = $(this).datepicker('getDate');
            dir(myDate);
      }});
	}*/
}

//ALC관리등록 팝업 - 발주기간 복사
function copyDate(obj){	
	if(obj.checked == true) {
		$("#install_day").val($("#ordering_day").val());
		$("#install_day").datepicker( "destroy");
	} else {
		$("#install_day").val("");
		datePickerMultiMonth("input_multi_date", "yymmdd", 2);
	}
}

//견적서 파일 선택
function alcInstallQuoteSearch(obj) {
	if(obj) { 
		$("#quote_file_name").val(obj[2]);
		$("#quote_id").val(obj[4]);
	} else {
		generalPop("견적서 파일을 선택하세요.");
	}
	
	$("#my_closs").trigger("click");
}

//계약서 파일 선택
function alcInstallContractSearch(obj){
	if(obj) {
		$("#contract_file_name").val(obj[2]);
		$("#contract_id").val(obj[4]);		
	} else {
		generalPop("계약서 파일을 선택하세요.");
	}
	
	$("#my_closs").trigger("click");
}

//설치사 동일일 경우 copy 복사(사용안함)
function qtyCopy(){	
	if($("#install_identical_yn").val()=="1")
		$("#sub_qty").val($("#qty").val());	
}

//alc 추가 - 입력폼(설치사 부분) - 설치사추가한 리스트 삭제
function alcInstallCustomerDel(con){	
	if(pop_prev_tr==null){
		generalPop("삭제할 설치사를 선택하세요.");
		return;
	}
	
	generalPop("삭제하시겠습니까?", function(){		
		cf.killTag(pop_prev_tr);		
		pop_prev_tr=null;
	});
	
}

//alc관리저장
function alcSave(con){	
	if($("#company_id").val()==""){
		generalPop("고객사를 입력하세요.");
		$("#company_name").focus();
		return;
	}
	
	if($("#portfolio").val()==""){
		generalPop("Portfolio를 입력하세요.");
		$("#portfolio").focus();
		return;
	}
	
	if($("#prd_number").val()==""){
		generalPop("Prd. Number를 입력하세요.");
		$("#prd_number").focus();
		return;
	}
	
	if($("#prd_type").val()==""){
		generalPop("Type을 입력하세요.");
		$("#prd_type").focus();
		return;
	}
	
	if($("#trigram").val()==""){
		generalPop("Trigram을 입력하세요.");
		$("#trigram").focus();
		return;
	}
	
	if($("#portfolio_item_name").val()==""){
		generalPop("Portfolio Item Name을 입력하세요.");
		$("#portfolio_item_name").focus();
		return;
	}
	
	//설치사 동일이면
	if($("#install_identical_yn").val()=="1"){		
		if($("#install_company_id").val()==""){
			generalPop("설치사를 입력하세요.");
			$("#install_company_name").focus();
			return;
		}
		
		if($("#sub_qty").val()==""){
			generalPop("설치사 수량을 입력하세요.");
			$("#sub_qty").focus();
			return;
		}
		
		if($("#ordering_day").val()==""){
			generalPop("발주기간을 입력하세요.");
			return;
		}
		
		if($("#license_date").val()==""){
			generalPop("License Date를 입력하세요.");
			return;
		}
		
		if($("#list_price").val()==""){
			generalPop("List Price를 입력하세요.");
			$("#list_price").focus();
			return;
		}
		
	}else{
		
		if($("#install_customer_body").children().length==0){
			generalPop("설치사를 추가해주세요.");
			return;
		}
	}
	
	generalPop("저장하시겠습니까?", function(){		
		var temp = $("#con_table").find("input, select").serializeArray();
		
		//dir(temp);
		
		$.ajax({
			  url: "/alc/admin/alcAdminInsertAjax",
			  type: "POST",
			  data: temp,
			  success: function () {
				  alcAdminSearchList("n");
				  cf.killTag(con.parentNode);
			  }
		});
	});
	
}

//자동완성 기능(고객사, 설치사)
function autocompleteCompanySearch(){	
	$("#sh_company_name, #company_name, #install_company_name").autocomplete({
		source : function( request, response ) {
			//dir(request);
			//dir(response);
			//dir(request.term);
			dir(this);
			dir(this.element[0].name);
			dir($(this));
			
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
        	
        	dir(this.name);
        	
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
	/*.autocomplete( "instance" )._renderItem = function( ul, item ) {
		
		return $( "<li>" )
        //.append( "<a>" + item.label + "<br>" + item.value + "<br>" + item.desc1+ "<br>" + item.desc2 + "<br>" + item.desc3 +"</a>" )
      	.append("<div class='Wrap_table'><table class='Normal_table_pop'>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Portfolio</td><td colspan='3' class='pd10' style='color:blue;font-weight:bold'>"+item.label+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold' width='20%'>Prd. Number</td><td width='30%' class='pd10'>"+item.prd_number+"</td><td style='text-align:center;font-weight:bold' width='20%'>Type</td><td class='pd10' width='30%'>"+item.prd_type+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Trigram</td><td class='pd10'>"+item.trigram+"</td><td style='text-align:center;font-weight:bold'>Portfolio Item Name</td><td class='pd10'>"+item.portfolio_item_name+"</td></tr>"
      			+"</table></div>"
      			+"<br")
      	.appendTo( ul );
	};	*/
}

//자동완성 기능(Portfolio)
function autocompletePortfolioSearch(){
	
	$("#portfolio").autocomplete({
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/alc/admin/alcAdminProductCategorySearchAjax",
                dataType: "json",
                //request.term = $("#autocomplete").val()
                data: {"portfolio": $("#portfolio").val()},
                success: function(data) {
                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response( 
                        $.map(data.selectAlcAdminProductCategorySearch, function(item) {
                        	
                        	//dir(item);
                            return {
                            	label: item.portfolio,
                            	prd_number: item.prd_number,
                            	prd_type: item.prd_type,
                            	trigram: item.trigram,
                            	portfolio_item_name: item.portfolio_item_name,
                            	list_price: item.list_price
                            };
                        })
                    );
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	
        	$("#portfolio").val(ui.item.label);
            $("#prd_number").val(ui.item.prd_number);
            $("#prd_type").val(ui.item.prd_type);
            $("#trigram").val(ui.item.trigram);
            $("#portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#temp_list_price").val(ui.item.list_price);
            if($("#install_identical_yn").val()=="1") {
            	$("#list_price").val(ui.item.list_price);
            }
            return false;
        },
        open: function(){
            $(this).autocomplete('widget').css({"z-index":"10000","max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"500px", "height":"300px"});
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	})
	.autocomplete( "instance" )._renderItem = function( ul, item ) {
		
		return $( "<li>" )
        //.append( "<a>" + item.label + "<br>" + item.value + "<br>" + item.desc1+ "<br>" + item.desc2 + "<br>" + item.desc3 +"</a>" )
      	.append("<div class='Wrap_table'><table class='Normal_table_pop'>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Portfolio</td><td colspan='3' class='pd10' style='color:blue;font-weight:bold'>"+item.label+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold' width='20%'>Prd. Number</td><td width='30%' class='pd10'>"+item.prd_number+"</td><td style='text-align:center;font-weight:bold' width='20%'>Type</td><td class='pd10' width='30%'>"+item.prd_type+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Trigram</td><td class='pd10'>"+item.trigram+"</td><td style='text-align:center;font-weight:bold'>Portfolio Item Name</td><td class='pd10'>"+item.portfolio_item_name+"</td></tr>"
      			+"</table></div>"
      			+"<br")
      	.appendTo( ul );
	};	
}

//자동완성 기능(Trigram)
function autocompleteTrigramSearch(){
	
	$("#trigram").autocomplete({
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/alc/admin/alcAdminProductCategorySearchAjax",
                dataType: "json",
                //request.term = $("#autocomplete").val()
                data: {"trigram": $("#trigram").val()},
                success: function(data) {
                	
                	//dir(data.selectAlcAdminProductCategorySearch);
                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response( 
                        $.map(data.selectAlcAdminProductCategorySearch, function(item) {
                        	
                        	//dir(item);
                            return {
                            	portfolio: item.portfolio,
                            	prd_number: item.prd_number,
                            	prd_type: item.prd_type,
                            	label: item.trigram,
                            	portfolio_item_name: item.portfolio_item_name,
                            	list_price: item.list_price
                            };
                        })
                    );
                }
           });
		},
		//조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	
        	$("#portfolio").val(ui.item.portfolio);
            $("#prd_number").val(ui.item.prd_number);
            $("#prd_type").val(ui.item.prd_type);
            $("#trigram").val(ui.item.label);
            $("#portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#temp_list_price").val(ui.item.list_price);
            if($("#install_identical_yn").val()=="1") {
            	$("#list_price").val(ui.item.list_price);
            }
            
            return false;
        },
        open: function(){
            $(this).autocomplete('widget').css({"z-index":"10000","max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"500px", "height":"300px"});
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	})
	.autocomplete( "instance" )._renderItem = function( ul, item ) {		
		return $( "<li>" )
        //.append( "<a>" + item.label + "<br>" + item.value + "<br>" + item.desc1+ "<br>" + item.desc2 + "<br>" + item.desc3 +"</a>" )
      	.append("<div class='Wrap_table'><table class='Normal_table_pop'>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Portfolio</td><td colspan='3' class='pd10'>"+item.portfolio+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold' width='20%'>Prd. Number</td><td width='30%' class='pd10'>"+item.prd_number+"</td><td style='text-align:center;font-weight:bold' width='20%'>Type</td><td class='pd10' width='30%'>"+item.prd_type+"</td></tr>"
      			+"<tr><td style='text-align:center;font-weight:bold'>Trigram</td><td class='pd10' style='color:blue;font-weight:bold'>"+item.label+"</td><td style='text-align:center;font-weight:bold'>Portfolio Item Name</td><td class='pd10'>"+item.portfolio_item_name+"</td></tr>"
      			+"</table></div>"
      			+"<br")
      	.appendTo( ul );
	};	
}

//견적서, 계약서 파일 리스트
function alcAdminfileList(searchString, mode){	
	var url;
	
	if(mode == "quite")
		url="/alc/admin/alcAdminDetailQuiteFileList";
	else
		url="/alc/admin/alcAdminDetailContractFileList";	
	
	$.ajax({
		  url: url,
		  type: "POST",
		  data: searchString,
		  dataType: "json",
		  success: function (data) {			  
			  alcInstallCustomerFileListPop(mode, data.alcAdminDetailFileList);
		  }
	});
	
}

