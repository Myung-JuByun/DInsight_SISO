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
					  alcList(data.alcAdminList);
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
					  alcList(data.alcAdminList);
				  }
			});
		}
	}	
}

//설치사
function alcAdminInstallCustomer(obj){
	
	//dir(obj);
	
	if(obj.place_of_business==undefined) obj.place_of_business="";
	if(obj.sales_customer==undefined) obj.sales_customer="";
	

	//var temp = $("#searchDiv").find("input, select").serialize();
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
	
	if(!obj) generalPop("고객사를 선택하세요.");
	else {
		document.getElementById("sh_company_id").value=obj.company_id;
		document.getElementById("sh_company_name").value=obj.company_name;
	}
	document.getElementById("my_closs").onclick();
};

//고객사 검색에 검색값 넣기(ALC 등록 팝업)
function alcCompanySave(obj){
	
	if(!obj) generalPop("고객사를 선택하세요.");
	else {
		document.getElementById("company_id").value=obj.company_id;
		document.getElementById("company_name").value=obj.company_name;
		
		if(document.getElementById("install_identical_yn").value == "1"){
			document.getElementById("install_company_id").value=obj.company_id;
			document.getElementById("install_company_name").value=obj.company_name;
		}
	}
	document.getElementById("my_closs").onclick();
};

//설치사 검색에 검색값 넣기(ALC 등록 팝업)
function alcInstallCompanySave(obj){
	
	if(!obj) generalPop("고객사를 선택하세요.");
	else {
		document.getElementById("install_company_id").value=obj.company_id;
		document.getElementById("install_company_name").value=obj.company_name;
	}
	document.getElementById("my_closs").onclick();
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
	if(!obj) generalPop("견적서 파일을 선택하세요.");
	else {
		document.getElementById("quote_file_name").value=obj[2];
		document.getElementById("quote_id").value=obj[4];
	}
	document.getElementById("my_closs").onclick();
}

//계약서 파일 선택
function alcInstallContractSearch(obj){
	if(!obj) generalPop("계약서 파일을 선택하세요.");
	else {
		document.getElementById("contract_file_name").value=obj[2];
		document.getElementById("contract_id").value=obj[4];
	}
	document.getElementById("my_closs").onclick();
}

//설치사 동일일 경우 copy 복사(사용안함)
function qtyCopy(){
	
	if($("#install_identical_yn").val()=="1"){
		$("#sub_qty").val($("#qty").val());
	}
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

//자동완성 기능(Portfolio)
function autocompletePortfolioSearch(){
	
	$.widget("custom.mcautocomplete", $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	        this.widget().css({"z-index":"10000","max-width":"850px", "max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"850px", "height":"300px"});
	    },
	    _renderMenu: function (ul, items) {
	        var self = this;
	        if (this.options.showHeader) {
	        	var td = "";
	        	$.each(this.options.columns, function (index, item) {
	            	td += "<td class='pd10' width='"+item.width+"'>" + item.name + "</td>";
	            });
	        	
	            var table = $("<table class='Normal_table_pop ui-widget-header'></table>");
	            table.append("<tr>"+td+"</tr>");
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	    	var td = "";
	    	var style="";
	    	
	    	$.each(this.options.columns, function (index, column) {
	    		if(column.name == "Portfolio"){
	    			style="style='color:green;'";
	    		}else{
	    			style="";
	    		}
	            td += "<td class='pd10' "+style+" width='"+column.width+"'>" + item[column.valueField ? column.valueField : index] + "</td>";
	        });
	    	
	    	return $("<li style='list-style-image:none;padding:0 0 0 0'>")
	    	.data('ui-autocomplete-item', item)
	      	.append("<table class='Normal_table_pop'>"
	      			+"<tr>"+ td +"</tr>"
	      			+"</table>")
	      	.appendTo(ul);
	    }
	});
	
	$("#portfolio").mcautocomplete({
		showHeader: true,
	    columns: [{
	        name: 'Portfolio',
	        width: '28%',
	        valueField: 'portfolio'
	    }, {
	        name: 'Prd. Number',
	        width: '15%',
	        valueField: 'prd_number'
	    }, {
	        name: 'Trigram',
	        width: '10%',
	        valueField: 'trigram'
	    }, {
	        name: 'Type',
	        width: '13%',
	        valueField: 'prd_type'
	    }, {
	        name: 'Portfolio Item Name',
	        width: '34%',
	        valueField: 'portfolio_item_name'
	    }],
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/alc/admin/alcAdminProductCategorySearchAjax",
                dataType: "json",
                data: {"portfolio": $("#portfolio").val()},
                success: function(data) {
                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                	response(data.selectAlcAdminProductCategorySearch);
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
            $("#trigram").val(ui.item.trigram);
            $("#portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#temp_list_price").val(ui.item.list_price);
            if($("#install_identical_yn").val()=="1") {
            	$("#list_price").val(ui.item.list_price);
            }
            return false;
        },
        open: function(){
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
}

//자동완성 기능(Trigram)
function autocompleteTrigramSearch(){
	
	$.widget("custom.mcautocomplete", $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	        this.widget().css({"z-index":"10000","max-width":"850px", "max-height":"300px", "overflow-y":"auto", "overflow-x":"hidden", "width":"850px", "height":"300px"});
	    },
	    _renderMenu: function (ul, items) {
	        var self = this;
	        if (this.options.showHeader) {
	        	var td = "";
	        	$.each(this.options.columns, function (index, item) {
	            	td += "<td class='pd10' width='"+item.width+"'>" + item.name + "</td>";
	            });
	        	
	            var table = $("<table class='Normal_table_pop ui-widget-header'></table>");
	            table.append("<tr>"+td+"</tr>");
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	    	var td = "";
	    	var style="";
	    	
	    	$.each(this.options.columns, function (index, column) {
	    		if(column.name == "Trigram"){
	    			style="style='color:green;'";
	    		}else{
	    			style="";
	    		}
	            td += "<td class='pd10' "+style+" width='"+column.width+"'>" + item[column.valueField ? column.valueField : index] + "</td>";
	        });
	    	
	    	return $("<li style='list-style-image:none;padding:0 0 0 0'>")
	    	.data('ui-autocomplete-item', item)
	      	.append("<table class='Normal_table_pop'>"
	      			+"<tr>"+ td +"</tr>"
	      			+"</table>")
	      	.appendTo(ul);
	    }
	});
	
	$("#trigram").mcautocomplete({
		showHeader: true,
	    columns: [{
	        name: 'Portfolio',
	        width: '28%',
	        valueField: 'portfolio'
	    }, {
	        name: 'Prd. Number',
	        width: '15%',
	        valueField: 'prd_number'
	    }, {
	        name: 'Trigram',
	        width: '10%',
	        valueField: 'trigram'
	    }, {
	        name: 'Type',
	        width: '13%',
	        valueField: 'prd_type'
	    }, {
	        name: 'Portfolio Item Name',
	        width: '34%',
	        valueField: 'portfolio_item_name'
	    }],
		source : function( request, response ) {
			$.ajax({
                type: "POST",
                url: "/alc/admin/alcAdminProductCategorySearchAjax",
                dataType: "json",
                data: {"trigram": $("#trigram").val()},
                success: function(data) {
                	
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                	response(data.selectAlcAdminProductCategorySearch);
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
            $("#trigram").val(ui.item.trigram);
            $("#portfolio_item_name").val(ui.item.portfolio_item_name);
            $("#temp_list_price").val(ui.item.list_price);
            if($("#install_identical_yn").val()=="1") {
            	$("#list_price").val(ui.item.list_price);
            }
            return false;
        },
        open: function(){
            return false;
        },
        focus: function(event, ui) {
        	return false;
        }
	});
}

//견적서, 계약서 파일 리스트
function alcAdminfileList(searchString, mode){
	
	var url;
	
	if(mode == "quite") {
		url="/alc/admin/alcAdminDetailQuiteFileList";
	}else{
		url="/alc/admin/alcAdminDetailContractFileList";
	}
	
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

