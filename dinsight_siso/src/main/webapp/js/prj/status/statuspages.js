mkSearchDiv();
defaultLoadList();
function mkSearchDiv(){
	var p=document.getElementById("searchDiv");
	p.innerHTML = "";
	
	var srch=cf.mkTag("div",p),
		line1 = cf.mkTag("div",srch),
		bx1 = cf.mkTag("div", line1),
		span1 = cf.mkTag("span", bx1),
		select1 = cf.mkTag("select", bx1),
		span2 = cf.mkTag("span", bx1);
	span1.innerHTML = "보고주차";
	span2.innerHTML = "년";
	select1.id = "sh_report_yy";
	select1.name = "sh_report_yy";
	mkYearSelect(select1,CurrentDate[0]);
	cf.setCss(select1,{width:70+"px"});
	cf.setCss(span1,{paddingRight:12+"px"});
	cf.setCss(span2,{paddingRight:12+"px",marginLeft:5+"px"});
	cf.setCss(bx1,{width:337+"px"});
	
	var	select2 = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select2.id = "sh_report_mm";
	select2.name = "sh_report_mm";
	mkMonthSelect(select2,CurrentDate[1]);
	span.innerHTML = "월";
	cf.setCss(select2,{width:60+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});
	
	var	select3 = cf.mkTag("select", bx1),
		span = cf.mkTag("span", bx1);
	select3.id = "sh_report_week";
	select3.name = "sh_report_week";
	span.innerHTML = "주차";
	cf.setCss(select3,{width:50+"px"});
	cf.setCss(span,{paddingRight:12+"px",marginLeft:5+"px"});	
	
	var bx2 = cf.mkTag("div", line1);
	//bx2.id = "weekDate";
	
	var bx3=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx3),
		ipt=cf.mkTag("input", bx3);
	span.innerHTML = "프로젝트명";
	ipt.id = "sh_project_name";
	ipt.name = "sh_project_name";
	ipt.className="input_han";
	ipt.type="text";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			getProjectStatusList();
		}
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx3,{paddingLeft:21+"px"});
	
	var bx4=cf.mkTag("div", line1),
		span=cf.mkTag("span", bx4),
		ipt=cf.mkTag("input", bx4);
	span.innerHTML = "고객사명";
	ipt.type="text";
	ipt.id = "sh_company_name";
	ipt.name = "sh_company_name";
	ipt.className="input_han";
	ipt.type="text";
	ipt.onkeypress = function(e) {
		if (e.keyCode == 13) {
			getProjectStatusList();
		}
	};
	cf.setCss(ipt,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx4,{paddingLeft:35+"px"});

	var cl1=cf.mkTag("div",srch),
		line2 = cf.mkTag("div",srch),
		bx5=cf.mkTag("div", line2),
		span = cf.mkTag("span", bx5),
		select1=cf.mkTag("select", bx5),
		select2=cf.mkTag("select", bx5),
		select3=cf.mkTag("select", bx5),
		select4=cf.mkTag("select", bx5),
		select5=cf.mkTag("select", bx5);
	span.innerHTML = "투입인원현황";
	select1.id="sh_project_member_id";
	select1.name="sh_project_member_id";
	select2.id="sh_job_type";
	select2.name="sh_job_type";
	select3.id="sh_employee_type";
	select3.name="sh_employee_type";
	select4.id="sh_role_type";
	select4.name="sh_role_type";
	select5.id="sh_stay_type";
	select5.name="sh_stay_type";
	
	cf.setCss(select1,{width:100+"px",marginRight:12+"px"});
	cf.setCss(select2,{width:80+"px",marginRight:12+"px"});	
	cf.setCss(select3,{width:80+"px",marginRight:12+"px"});
	cf.setCss(select4,{width:80+"px",marginRight:12+"px"});
	cf.setCss(select5,{width:80+"px"});
	cf.setCss(span,{paddingRight:12+"px"});
	
	var bx6=cf.mkTag("div", line2),
		span=cf.mkTag("span", bx6),
		select=cf.mkTag("select", bx6);
	span.innerHTML = "전체보기";
	select.id = "sh_manday_zero";
	select.name = "sh_manday_zero";
	mkSelectYN(select);
	
	//cf.setCss(select,{width:130+"px"});
	cf.setCss(span,{paddingRight:5+"px"});
	cf.setCss(bx6,{paddingLeft:35+"px"});
	
	var bx7=cf.mkTag("div", line2),
		img_re=cf.mkTag("img",bx7);
	img_re.src="/images/btn/btn_refresh_icon.gif";
	bx7.className="cursor";
	bx7.onclick=function(){
		document.getElementById("sh_report_yy").value=CurrentDate[0];
		document.getElementById("sh_report_mm").value=CurrentDate[1];
		initView();
		document.getElementById("sh_project_name").value="";
		document.getElementById("sh_company_name").value="";
		document.getElementById("sh_project_member_id").value="";
		document.getElementById("sh_job_type").value="";
		document.getElementById("sh_employee_type").value="";
		document.getElementById("sh_role_type").value="";
		document.getElementById("sh_stay_type").value="";
		document.getElementById("sh_manday_zero").value="0";
	};
	
	var div = cf.mkTag("div", srch),
		img = cf.mkTag("img", div);
	div.className = "btn_go2 cursor";
	img.src = "/images/btn/btn_go3.gif";
	img.onclick = getProjectStatusList;
	
	cf.setCss(srch,{marginLeft:20+"px"});
	cf.setCss(cl1,{clear:"both"});
	cf.setCss(line2,{marginTop:5+"px"});
	cf.setCss(bx1,{float:"left"});
	cf.setCss(bx2,{float:"left"});
	cf.setCss(bx3,{float:"left"});
	cf.setCss(bx4,{float:"left"});
	cf.setCss(bx5,{float:"left"});
	cf.setCss(bx6,{float:"left"});
	cf.setCss(bx7,{float:"left",paddingLeft:20+"px"});
};
function setResultData ( data ) {
	var dv=document.getElementById("statustb2"),
		dataList = data.projectStatusList,obj = [0],HTML = "",prevProjectName = "";
	cf.setCss(dv,{height:cf.workareaheight-355+"px",minHeight:530+"px",overflowY:"scroll",overflowX:"hidden"});
	
	if ( dataList.length == 0 ) {
		HTML = "<tr><td colspan='19' class='right' align='center'>조회된 데이터가 없습니다.</td></tr>";
	} else {
		for ( var Idx = 0 ; Idx < dataList.length ; Idx ++ ) {
			var projectName 	=	dataList[Idx].project_name;
			var reportYear 		=	dataList[Idx].report_yy + " 년";
			var reportMonth		=	dataList[Idx].report_mm + " 월";
			var reportWeek		=	dataList[Idx].report_week + "주차";
			var companyName		=	dataList[Idx].company_name;
			if ( prevProjectName ==  projectName ) {
				projectName = 	"&nbsp;";
				reportYear 	=	"&nbsp;";
				reportMonth	=	"&nbsp;";
				reportWeek	=	"&nbsp;";	
				companyName	=	"&nbsp;";
			} else {
				prevProjectName = projectName;
			}
			
			if ( ( dataList[Idx].user_name == null ) ||  ( dataList[Idx].user_name == "" ) ){
				if ( dataList[Idx].project_name == "총합" ) {
					HTML 	+= 	"	<tr class='sum'>";
				} else {
					HTML 	+= 	"	<tr class='hColor'>";
				}
			} else {
				HTML 	+= 	"	<tr>";
			}
			
			HTML 	+= 	"		<td width='5%'>" + reportYear + "</td>"
					+	"		<td width='4%'>" + reportMonth + "</td>"
					+	"		<td width='4%'>" + reportWeek + "</td>"
					+	"		<td width='15%'>" + projectName + "</td>"
					+	"		<td width='10%'>" + companyName + "</td>"
					+	"		<td width='7%'>" + dataList[Idx].user_name + "</td>"
					+	"		<td width='5%'>" + dataList[Idx].jobTypeName + "</td>"
					+	"		<td width='5%'>" + dataList[Idx].employeeTypeName + "</td>"
					+	"		<td width='5%'>" + dataList[Idx].roleTypeName + "</td>"
					+	"		<td width='5%'>" + dataList[Idx].stayTypeName + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].mon_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].tue_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].wed_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].thu_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].fri_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].sat_working_day + "</td>"
					+	"		<td width='3%'>" + dataList[Idx].sun_working_day + "</td>"
					+	"		<td width='5%'>" + dataList[Idx].man_day + "</td>"
					+	"		<td width='5%' class='right'>" + dataList[Idx].man_month + "</td>"
					+	"	</tr>";
		}
	}
	$("#projectStatusDataTable").append(HTML);
};
function reSetDataArea() {
	$("#projectStatusDataTable")[0].innerHTML = "";
};
function searchMemberHTML( eleName, data) {
	var jsonLength = data.length;
	$(eleName).find("option").remove();
	$(eleName).append ( "<option value=''>성명</option>" );
	for ( var cnt = 0 ; cnt < jsonLength ; cnt ++ ) {
		$(eleName).append ( "<option value='" + data[cnt].sh_project_member_id + "'>" + data[cnt].sh_project_member_name + "</option>" );
	}
};
function searchCodeHTML( eleName, defaultValue, data) {
	var jsonLength = data.length;
	$(eleName).find("option").remove();
	$(eleName).append ( "<option value=''>"+defaultValue+"</option>" );
	for ( var cnt = 0 ; cnt < jsonLength ; cnt ++ ) {
		$(eleName).append ( "<option value='" + data[cnt].code_id + "'>" + data[cnt].code_name + "</option>" );
	}
};
function excelDownload() {
	var searchArray = $("input, select").serializeArray();
	var dataArray 	= 	new Array();
	
	var oInfo		=	new Object();
	oInfo["name"]	=	"project_member_name";
	if ( $("#sh_project_member_id option:selected").index() == 0 ) {
		oInfo["value"] = "";	
	} else {
		oInfo["value"]	=	$("#sh_project_member_id option:selected").text();
	}
	searchArray.push(oInfo);
	
	oInfo		=	new Object();
	oInfo["name"]	=	"search_job_type";
	if ( $("#sh_job_type option:selected").index() == 0 ) {
		oInfo["value"] = "";	
	} else {
		oInfo["value"]	=	$("#sh_job_type option:selected").text();
	}
	searchArray.push(oInfo);

	oInfo		=	new Object();
	oInfo["name"]	=	"search_employee_type";
	if ( $("#sh_employee_type option:selected").index() == 0 ) {
		oInfo["value"] = "";	
	} else {
		oInfo["value"]	=	$("#sh_employee_type option:selected").text();
	}
	searchArray.push(oInfo);

	oInfo		=	new Object();
	oInfo["name"]	=	"search_role_type";
	if ( $("#sh_role_type option:selected").index() == 0 ) {
		oInfo["value"] = "";	
	} else {
		oInfo["value"]	=	$("#sh_role_type option:selected").text();
	}
	searchArray.push(oInfo);
	
	oInfo		=	new Object();
	oInfo["name"]	=	"search_stay_type";
	if ( $("#sh_stay_type option:selected").index() == 0 ) {
		oInfo["value"] = "";	
	} else {
		oInfo["value"]	=	$("#sh_stay_type option:selected").text();
	}
	searchArray.push(oInfo);	

	var idx = 0;
	$("#dataTitle tr").each(function(i) {
		var tr = $(this);
		
		if ( idx == 0 ) {
			var dataInfo = new Object();
			tr.find("th").each(function(j,k) {
				if ( j == 17 ) {
					dataInfo["code_name" + j] = 'M/D 합계';
					dataInfo["code_name" + ( j + 1 ) ] = 'M/M 합계';
				} else {
					dataInfo["code_name" + j] = k.innerText;
				}
			});		
			dataArray.push(dataInfo);
		}
		idx ++;
	});	
	$("#projectStatusDataTable tr").each(function(i) {
		var tr = $(this);
		
		var dataInfo = new Object();
		tr.find("td").each(function(j,k) {
			dataInfo["code_name" + j] = k.innerText;
		});		
		dataArray.push(dataInfo);
	});
	
	var schData 	=	new	Object();
	schData.search 	=	searchArray;
	
	var ptrData		=	new Object();
	ptrData.data	=	dataArray;
	
	var outData = JSON.stringify(ptrData);
	var searchData = JSON.stringify(schData);

    var form = "<form id='excelForm' action='/prj/status/projectStatusExcelDown.do' method='post'>";
    form += "<input type='hidden' name='searchParam' value='"+searchData+"' />";
    form += "<input type='hidden' name='data' value='"+outData+"' />";    
    form += "</form>"; 
    jQuery(form).appendTo("body").submit().remove();	
};