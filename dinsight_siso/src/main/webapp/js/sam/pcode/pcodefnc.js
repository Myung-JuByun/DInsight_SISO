var DIVIDELIST;
var BRANDLIST;
var STATUSLIST;
var TYPELIST;
var DIVISIONUSERS;
var arr_list;
var checks = new Array();
var prev;
var pcode_prev;
var SELECT_brand;
var SELECT_status;
var SELECT_type;
var SELECT_user;
var searchString;
var STATUS_info;
var rowCount = true;

//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList() {
	//dateSelect();
	var obj = {year :CurrentDate[0],month :CurrentDate[1],name : "",type_cd : "",status_cd : "",brand_cd : "",user_id : "",closingYear:"",closingMonth:""};
	callProjectCodeData(obj, function(data) {
		DIVIDELIST = data.salesDividelist;
		BRANDLIST = data.brandList;
		STATUSLIST = data.salesStatusList;
		TYPELIST = data.salesTypeList;
		DIVISIONUSERS = data.divisionUsers;
		DIVISION = data.division;
		mkSearch();
		projectCodeList(data);
	});
	datePicker("input_date", "yy.mm.dd");
};
function dateSelect(){
	var year = document.getElementById("sh_sales_project_year");
	var month = document.getElementById("sh_sales_project_month");

	year.innerHTML = "";
	month.innerHTML = "";

	var date = new Date();
	var current_year = date.getFullYear() - 1;
	var current_month = date.getMonth();

	var op;

	year.className = "select_pop";
	createYearMonthDay("Y", 2013, "#sh_sales_project_year");

	month.className = "select_pop";
	op = cf.mkTag("option", month);
	op.value = "";
	op.innerHTML = "선택안함";

	for (var i = 0; i < 12; i++) {
		op = cf.mkTag("option", month);
		if (i < 9) {
			op.value = "0" + (i + 1);
		} else
			op.value = i + 1;
		op.innerHTML = i + 1;
		if (i == current_month) {
			op.selected = "selected";
		}
	}
};
function projectSearch() {
	var year = document.getElementById("sh_sales_project_year").value,
		month = document.getElementById("sh_sales_project_month").value,
		closingYear = document.getElementById("sh_closing_year").value,
		closingMonth = document.getElementById("sh_closing_month").value;
	if (!year && !month && !searchString.value && !SELECT_type.value
			&& !SELECT_status.value && !SELECT_brand.value
			&& !SELECT_user.value && !closingYear && !closingMonth) {
		generalPopOk2("검색조건이 없습니다.");
		return;
	}
	var obj={year:year,month:month,name:searchString.value,type_cd:SELECT_type.value,status_cd:SELECT_status.value,
			brand_cd:SELECT_brand.value,user_id:SELECT_user.value,closingYear:closingYear,closingMonth:closingMonth};
	callProjectCodeData(obj, function(data) {
		projectCodeList(data);
	});
};
function pcodeSave() {
	var type_cd = nullCheck("in_sales_type_cd");
	var company_id = nullCheck("in_company_id");
	var sales_divide_cd = nullCheck("in_sales_divide_cd");
	var brand_cd = nullCheck("in_brand_cd");
	var module = nullCheck("in_module");
	var sales_status_cd = nullCheck("in_sales_status_cd");
	var operation_cd = nullCheck("in_operation_cd");
	var user_id = nullCheck("in_user_id");
	var contract_estimate_price = nullCheck("in_contract_estimate_price");
	var cost_price = nullCheck("in_cost_price");

	if (type_cd) {
		generalPopOk2("구분을 선택하세요.", function() {
			var a = mkFocus("in_sales_type_cd");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (company_id) {
		generalPopOk2("고객사를 선택하세요.", function() {
			var a = mkFocus("in_company_id");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (sales_divide_cd) {
		generalPopOk2("ALC를 선택하세요.", function() {
			var a = mkFocus("in_sales_divide_cd");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (brand_cd) {
		generalPopOk2("Type을 선택하세요.", function() {
			var a = mkFocus("in_brand_cd");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (module) {
		generalPopOk2("제품을 입력하세요.", function() {
			var a = mkFocus("in_module");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (sales_status_cd) {
		generalPopOk2("영업현황을 선택하세요.", function() {
			var a = mkFocus("in_sales_status_cd");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (operation_cd) {
		generalPopOk2("사업부서를 선택하세요.", function() {
			var a = mkFocus("in_operation_cd");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (user_id) {
		generalPopOk2("담당영업을 선택하세요.", function() {
			var a = mkFocus("in_user_id");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (contract_estimate_price) {
		generalPopOk2("계약예정금액을 입력하세요.", function() {
			var a = mkFocus("in_contract_estimate_price");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}
	if (cost_price) {
		generalPopOk2("매입금액를 입력하세요.", function() {
			var a = mkFocus("in_cost_price");
			a.op.trav(function(d, i) {
				a.p[d].focus();
			});
		});
		return;
	}

	generalPop("저장하시겠습니까?", function() {
		//저장 전 영업현황 1.won disabled 된 항목을 삭제하고 저장 
		$("select[name=in_sales_status_cd] option").removeAttr('disabled'); 
		
		//저장
		var temp = $("input, select").serializeArray();
		
		$.ajax({
			url : "/sam/pcode/projectCodeSave",
			type : "POST",
			data : temp,
			success : function(data) {
				if (data != "success")
					generalPop(data);
				else
					generalPop("저장되었습니다.");
				projectSearch();
				$('.wrap-loading').hide(20);
			},
			beforeSend:function(){
				$('.wrap-loading').show();
			}
		});
	});
};
function pcodeDel() {
	var inputDisabled = $("#pcodeView").find(":disabled");
	inputDisabled.prop("disabled", false);
	var temp = $("#pcodeView").find(":has(:checkbox:checked)").find("input").serialize();
	var tempArray = $("#pcodeView").find(":has(:checkbox:checked)").find("input").serializeArray();
	var cnt = 0;
	inputDisabled.prop("disabled", true);

	checks.trav(function(d, i) {
		if (d.checked)
			cnt++;
	});

	if (cnt == 0)
		generalPopOk2("삭제할 project code를 선택하세요.");
	else {
		generalPop("삭제하시겠습니까?",function(){
			var prj_creator_cnt = 0;
			for (var k = 0; k < tempArray.length; k++) {
				var map = tempArray[k];
				var prj_creator_name = map.name;
				var prj_creator = map.value;
				if (prj_creator_name == "prj_creator" && prj_creator != login_userid) {
					generalPopOk2("자신이 등록한 데이터만 삭제 가능합니다.");
					return false;
				}
			}
			$.ajax({
				url : "/sam/pcode/projectCodeDel",
				type : "POST",
				data : temp,
				success : function(data) {
					var json = JSON.parse(data);
					var resultCode = json.resultCode;
					var result_project_code = json.projectcodevo.sales_project_code;
					if (resultCode != "0") {
						if (resultCode == "1")
							generalPopOk2("해당프로젝트코드<br/>"
									+ result_project_code
									+ " 는 <br/> P/J관리의 프로젝트관리에서 사용중입니다.");
						if (resultCode == "2")
							generalPopOk2("해당프로젝트코드<br/>"
									+ result_project_code
									+ " 는 <br/> 계약관리의 견적서등록에서 사용중입니다.");
						if (resultCode == "3")
							generalPopOk2("해당프로젝트코드<br/>"
									+ result_project_code
									+ " 는 <br/> 계약관리의 계약서등록에서 사용중입니다.");
						if (resultCode == "4")
							generalPopOk2("해당프로젝트코드<br/>"
									+ result_project_code
									+ " 는 <br/> 계약관리의 매출품의에서 사용중입니다.");
					} else {
						generalPopOk("삭제되었습니다.");
						var idx;
						checks.trav(function(d, i) {
									if (d.checked) {
										idx = i;
										cf.killTag(d.parentNode.parentNode);
									}
								});
						checks.splice(idx, 1);
					}
					$('.wrap-loading').hide(20);
					$(".CheckMode").prop('checked', false);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};
function companySave(prev_com_obj) {
	var companyname = pcode_prev;
	var companyid = pcode_prev.previousSibling;

	var ipt = document.createElement("input");
	ipt.name = "in_company_id";
	ipt.type = "hidden";
	ipt.value = prev_com_obj.company_id;

	//var td=document.createElement("td");
	companyname.innerHTML = prev_com_obj.company_name;

	companyid.replaceChild(ipt, companyid.childNodes[0]);
	companyid.style.display = "none";
	//companyname.replaceChild(td,companyname.childNodes[0]);

	document.getElementById("my_closs").onclick();
};
function checkMode(e) {
	if (e.checked) {
		checks.trav(function(d, i) {
			if (!d.checked)
				d.checked = true;
		});
	} else {
		checks.trav(function(d, i) {
			if (d.checked)
				d.checked = false;
		});
	}
};

function loadYearMonth(def1, def2) {
	createCalendar("Y", -7, ".in_sales_project_year");
	createYearMonthDay("M", "", ".in_sales_project_month");

	var setYear = document.getElementsByClassName("in_sales_project_year");
	setYear.trav(function(d) {
		var year = d.options;
		for (var i = 0, lng = year.length; i < lng; i++) {
			var f = year[i];
			if (def1 == f.value) {
				f.selected = "selected";
			}
		}
	});
	var setMonth = document
			.getElementsByClassName("in_sales_project_month");
	setMonth.trav(function(d) {
		var month = d.options;
		for (var i = 0, lng = month.length; i < lng; i++) {
			var f = month[i];
			if (def2 == f.value) {
				f.selected = "selected";
			}
		}
	});
};
/*function mkSelect(select, obj, def) {
	var op;

	select.className = "select_pop";
	op = cf.mkTag("option", select);
	op.value = "";
	op.innerHTML = "선택안함";

	if (obj == DIVISION) {
		obj.trav(function(d, i) {
			if (obj[i].code_id == "1501") {
				op = cf.mkTag("option", select);
				op.value = obj[i].code_id;
				op.innerHTML = obj[i].code_name;
				if (def && obj[i].code_id == def) {
					op.selected = "selected";
				}
			}
			if (obj[i].code_id == "1504") {
				op = cf.mkTag("option", select);
				op.value = obj[i].code_id;
				op.innerHTML = obj[i].code_name;
				if (def && obj[i].code_id == def) {
					op.selected = "selected";
				}
			}
		});
		return;
	}
	obj.trav(function(d, i) {
		op = cf.mkTag("option", select);
		op.value = obj[i].code_id;
		op.innerHTML = obj[i].code_name;
		if (def && obj[i].code_id == def) {
			op.selected = "selected";
		}
	});
};*/
function mkSearch() {
	SELECT_type.innerHTML = "";
	mkSelect(SELECT_type, TYPELIST,"",true);

	SELECT_status.innerHTML = "";
	mkSelect(SELECT_status, STATUSLIST,"",true);

	SELECT_brand.innerHTML = "";
	mkSelect(SELECT_brand, BRANDLIST,"",true);

	SELECT_user.innerHTML = "";
	mkSelect(SELECT_user, DIVISIONUSERS,"",true);
};
function mkFocus(obj) {
	var data = document.getElementsByName(obj);
	var a = [];
	data.trav(function(d, i) {
		if (!d.value)
			a.push(i);
	});
	return {
		p : data,
		op : a
	};
};
function nullCheck(obj) {
	var data = document.getElementsByName(obj);
	var a = false;
	data.trav(function(d, i) {
		if (!d.value)
			a = true;
	});
	return a;
};

//월요일 기준 : 년월주 표시
function realYearMonthWeek() {
	var date = new Date();
	
	var year = date.getFullYear();
	
	var month = date.getMonth() + 1;
	if(month < 10) month = "0" + month;
	
	var day = date.getDate();
	if(day < 10) day = "0" + day;
	
	compareNowDay = year+""+ month+""+ day;

	var compareNowDate = getSecofWeekMonday(compareNowDay);
	
	year = compareNowDate.substring(0, 4);
	month = compareNowDate.substring(4, 6);
	comMonthWeek = compareNowDate.substring(6,7);
	
	var result = year + month +"/"+ comMonthWeek;
	
	return result;
}