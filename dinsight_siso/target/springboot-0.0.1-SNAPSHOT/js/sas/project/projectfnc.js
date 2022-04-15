var STATUS_info,STATUSLIST;

//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList(){	
	statusInfo();
	imgDisable();
	//년월생성
	var temp = $("input, select").serialize();	
	//데이터 검색
	$.ajax({
		url: "/sas/project/prjcodeConvertList",
		type: "POST",
		data: temp,
		dataType: "json",
		success : function (data) {
			STATUSLIST = data.salesStatusList;
			searchCodeHTML("#sh_sales_type_cd", data.salesTypeList, "Y");
			searchCodeHTML("#sh_sales_status_cd", data.salesStatusList, "Y");
			searchCodeHTML("#sh_brand_cd", data.brandList, "Y");
			searchCodeHTML("#sh_user_id", data.divisionUsers, "Y");
			dataShowList("#pcodeView", data.pCodeList);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});	
};
//검색 조건 생성
function searchCodeHTML(appendId, data, defaultkey) {	
	var jsonLength = data.length,
	HTML = "";	
	if(defaultkey == "Y")HTML += "<option value=''>선택안함</option>";		
	for(var cnt =0; cnt<jsonLength; cnt++) {		
		HTML += "<option value='" + data[cnt].codeId + "'>" + data[cnt].codeName + "</option>";
	}	
	$(appendId).append(HTML);
};
//검색
function formSearch() {
	imgDisable();
	var temp = $("input, select").serialize();
	//데이터 검색
	$.ajax({
		url: "/sas/project/prjcodeConvertList",
		type: "POST",
		data: temp,
		dataType: "json",
		success : function (data) {
			//리스트
			dataShowList("#pcodeView", data.pCodeList);
			$('.wrap-loading').hide(20);
		},
		beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
};
//Success 전환
function formSubmit() {
	var checkYN = "N";
	$("#pcodeView .in_sales_project_id").each(function() {
		
		if($(this).is(":checked")) {
			checkYN = "Y";
		}
	});
	if(checkYN == "N") {
		generalPopOk2("전환할 항목을 선택해주세요.");
		return false;
	} else {
		generalPop("Success 전환을 하시겠습니까?", function (){
			var temp1 = $("input, select").serialize();
			//데이터 검색
			$.ajax({
				url: "/sas/project/projectCodeSuccess",
				type: "POST",
				data: temp1,
				success : function (data) {
					//검색
					formSearch();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
			$("input:checkbox[class=CheckMode]").prop("checked", false);
			return false;
		});
	}
};
//Success show/hide 처리
function imgDisable() {
	if($("#win_gb").val() == "1") {
		$("#successImg").hide();
	} else {
		$("#successImg").show();
	}
};
function companySave(prev_com_obj){
	if(!prev_com) generalPopOk2("고객사를 선택하세요.");
	else document.getElementById("sh_company_name").value=prev_com_obj.company_name;
	
	document.getElementById("my_closs").onclick();
};