var rowCount=true,selcflag=false; 

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
function addSel(con,data){
	var sel=cf.mkTag("select",con);
	if(data){
		data.trav(function(d,i){
			var op=cf.mkTag("option",sel);
			op.value=i;
			op.innerHTML=d;
		});
	}
	return sel;
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
		action: '/adm/purchaseExceluploadAjax.do', 
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
			$('.wrap-loading').hide(20);
			//cf.killTag(conLoa.parentNode);
			var resultMsg = response;
			if(resultMsg != "fail"){
				//결과리턴
				result = JSON.parse(response);
	        	
	        	if(result.length>0){ 
	        		rowCount=false;
	        	}else{
	        		rowCount=true;
	        	}
	        	setInputValue(result);
	        	generalPop("데이터 저장에 성공하였습니다.<br/>입력 데이터를 확인하세요.");
			}else{
				generalPop("업로드 파일에 문제가 있습니다. <br/>데이터를 확인하시기 바랍니다.");
			}
		}
	});		
};
function selcChange(){
	selcflag = false;
};
function deletePurchaseList(){
	var ipt_purchase_project_code=document.getElementById("ipt_purchase_project_code");
	var ipt_creditor_name=document.getElementById("ipt_creditor_name");
	var ipt_debtor_name=document.getElementById("ipt_debtor_name");
	var ipt_purchase_staff_name=document.getElementById("ipt_purchase_staff_name");
	var yearSelc=document.getElementById("prev_purchase_year");
	var monthSelc=document.getElementById("prev_purchase_month");
	var yearSelc2=document.getElementById("next_purchase_year");
	var monthSelc2=document.getElementById("next_purchase_month");
	var inputStartDate=yearSelc.value+"-"+monthSelc.value;
	var inputEndDate=yearSelc2.value+"-"+monthSelc2.value;
	
	$.ajax({
		url: "/adm/purchaseDeleteAjax",
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
function delete_onclick(){
	if(selcflag)generalPop("모든 DATA가 삭제됩니다. 삭제하시겠습니까?", deletePurchaseList);
	else generalPop("조회 버튼을 눌러 데이터를 확인 하신 후<br/>삭제 하시기 바랍니다.");
};
function defaultLoadList(){
	var ipt_purchase_project_code=document.getElementById("ipt_purchase_project_code");
	var ipt_creditor_name=document.getElementById("ipt_creditor_name");
	var ipt_debtor_name=document.getElementById("ipt_debtor_name");
	var ipt_purchase_staff_name=document.getElementById("ipt_purchase_staff_name");
	var yearSelc=document.getElementById("prev_purchase_year");
	var monthSelc=document.getElementById("prev_purchase_month");
	var yearSelc2=document.getElementById("next_purchase_year");
	var monthSelc2=document.getElementById("next_purchase_month");
	var inputStartDate=yearSelc.value+"-"+monthSelc.value;
	var inputEndDate=yearSelc2.value+"-"+monthSelc2.value;

	$.ajax({
		url: "/adm/purchaseSelectAjax",
		type: "POST",
		data: {startDate : inputStartDate,endDate : inputEndDate,purchase_project_code: ipt_purchase_project_code.value,
			creditor_name  : ipt_creditor_name.value,debtor_name :	ipt_debtor_name.value,purchase_staff_name : ipt_purchase_staff_name.value},
		dataType: "json",
		success : function (data) {
        	if(data.length>0)rowCount=false;
        	else rowCount=true;    	
			setInputValue(data);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};