var rowCount=true,selcflag=false,select_div_idx = 0;

excelUpload();
mkSearchDiv();
defaultLoadList();

function dateSelect(yearSelc,monthSelc){
	var date = new Date(),
		year = date.getFullYear() + "",
		month = date.getMonth() + 1;
	
	if(month < 10) month = "0" + month;
	else month = month + "";
	
	createYearMonthDay("Y", 2013, yearSelc);
	createYearMonthDay("M", 1, monthSelc);
	
	for(var i=0 ; i<yearSelc.options.length ; i++){
		if(yearSelc.options[i].value == year) yearSelc.options[i].selected = true;
	}
	
	for(var i=0 ; i<monthSelc.options.length ; i++){
		if(monthSelc.options[i].value == month) monthSelc.options[i].selected = true;
	}
};
function excelUpload(){
	var button = $('#img_exlup');
	var conLoa = document.createElement("div");
	conLoa.id="lodingTest";
	conLoa.style.position="absolute";
	conLoa.style.width="110px";
	conLoa.style.height="100px";
	conLoa.style.display = "block";
	conLoa.style.top = "50px";
	conLoa.style.left = "50px";
	
	new AjaxUpload(button, {
		action: '/adm/salesExceluploadAjax.do', 
		name: 'fileNm',
		onSubmit : function(file, ext){
			//여기서 loading바 보여주기
			//conLoa.innerHTML="";
			//var loadingImg=cf.mkTag("img",conLoa);
			//loadingImg.src="/images/loading_09.GIF";
			//callPop(conLoa);
			$('.wrap-loading').show();
	        if (!(/xlsx|xls/i).test(ext)) {
	        	generalPop('엑셀파일만 가능합니다');
	        	return false;
	        }
		},
		onComplete: function(file, response){
			//cf.killTag(conLoa.parentNode);
			$('.wrap-loading').hide(20);
			//결과리턴
			var resultMsg = response;
			if(resultMsg != "fail"){
				result = JSON.parse(response);
				
				setSelectBox(result.item_div_list);
				setInputValue(result.salesList);        	
	        	
	        	generalPop("데이터 저장에 성공하였습니다.<br/>입력 데이터를 확인하세요.");
	       
			}else{
				generalPop("업로드 파일에 문제가 있습니다. <br/>데이터를 확인하시기 바랍니다.");
			}
		},
	});
};
function selcChange(){
	selcflag=false;
};
function delete_onclick(){
	if(selcflag){
		generalPop("모든 DATA가 삭제됩니다. 삭제하시겠습니까?", deleteSalesList);
	}else {
		generalPop("조회 버튼을 눌러 데이터를 확인 하신 후<br/>삭제 하시기 바랍니다.");
	}
};
function deleteSalesList() {
	var ipt_sales_project_code=document.getElementById("ipt_sales_project_code");
	var ipt_item_div_name=document.getElementById("ipt_item_div_name");
	var ipt_sales_client_name=document.getElementById("ipt_sales_client_name");
	var ipt_sales_staff_name=document.getElementById("ipt_sales_staff_name");

	var yearSelc=document.getElementById("prev_sales_year");
	var monthSelc=document.getElementById("prev_sales_month");
	var yearSelc2=document.getElementById("next_sales_year");
	var monthSelc2=document.getElementById("next_sales_month");
	
	var inputStartDate=yearSelc.value+"-"+monthSelc.value;
	var inputEndDate=yearSelc2.value+"-"+monthSelc2.value;

	$.ajax({//
		url: "/adm/salesDeleteAjax",
		type: "POST",
		data: {startDate : inputStartDate,endDate : inputEndDate},
		async: false,
		success: function (data) {			  
		generalPopOk("삭제되었습니다.");
			defaultLoadList();
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		},
		error:function(request,status,error){
			$('.wrap-loading').hide(20);
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
};
function defaultLoadList(){
	var ipt_sales_project_code=document.getElementById("ipt_sales_project_code");
	var ipt_item_div_name=document.getElementById("ipt_item_div_name");
	var ipt_sales_client_name=document.getElementById("ipt_sales_client_name");
	var ipt_sales_staff_name=document.getElementById("ipt_sales_staff_name");

	var item_div_select = ipt_item_div_name.value;
	if ( item_div_select == '전체' ) {
		item_div_select = "";
	}

	var yearSelc=document.getElementById("prev_sales_year");
	var monthSelc=document.getElementById("prev_sales_month");
	var yearSelc2=document.getElementById("next_sales_year");
	var monthSelc2=document.getElementById("next_sales_month");
	
	var inputStartDate=yearSelc.value+"-"+monthSelc.value;
	var inputEndDate=yearSelc2.value+"-"+monthSelc2.value;
	select_div_idx = ipt_item_div_name.selectedIndex;
	
	$.ajax({
		url: "/adm/salesSelectAjax",
		type: "POST",
		data: {startDate : inputStartDate,endDate : inputEndDate,sales_project_code: ipt_sales_project_code.value,item_div_name  : item_div_select,
			sales_client_name :	ipt_sales_client_name.value,sales_staff_name : ipt_sales_staff_name.value},
		dataType: "json",
		success : function (data) {
			setSelectBox(data.item_div_list);
			setInputValue(data.salesList);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});	
	selcflag = true;
};
function setSelectBox( data) {
	var ipt_item_div_name=document.getElementById("ipt_item_div_name");
	ipt_item_div_name.innerHTML = "";
	var op = cf.mkTag("option",ipt_item_div_name);
	op.value = "";
	op.innerHTML = "전체";

	data.trav(function(d,i){
		var op=cf.mkTag("option",ipt_item_div_name);
				op.value=d.item_div_list;
				op.innerHTML=d.item_div_list;
	});
	
	if ( select_div_idx > 0 ) {
		ipt_item_div_name.selectedIndex = select_div_idx;
	}
};