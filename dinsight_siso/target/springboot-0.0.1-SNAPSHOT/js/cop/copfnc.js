var CATEGORY,CONDITION,list_obj01,MAX_PAGE=1,CUR_PAGE,cop_page=new Array(),rownum=18;

function companyLoadList(){
	cop_page=new Array();
	CUR_PAGE="";
	MAX_PAGE="";
	var obj={searchString:"",page:1,rowNum:rownum},
		dv=document.getElementById("copTb01");	
	$.ajax({
		url: "/cop/customerAdminAjax",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			//CATEGORY=data.categoryList;
			//CONDITION=data.conditionList;
			list_obj01=data.customerList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		companyDataSet();
		if(MAX_PAGE){
			for(var i=0;i<MAX_PAGE;i++){
				var a=parseInt((i)/10);
				cop_page.push([i+1,a+1,(a*10)+1,0]);
			}
			var max_pages=cop_page.distinct(1),lenar=[];
			max_pages.trav(function(d,i){
				var cnt=0;
				cop_page.trav(function(f,g){
					if(d==f[1]){
						cnt++;
					}
				});
				lenar.push(cnt);
			});
			lenar.trav(function(f,g){
				cop_page.trav(function(d,i){
					if(g+1==d[1])d[3]=f;
				});
			});
		}
		var res=q.parse("select * from companylist01;");
			pdv=document.getElementById("cop_page");
		mkList_body(dv,res.arr);
		mkcop_page(pdv);
	};
	/*callCustomerAdminData(obj,function (data){
		CATEGORY=data.categoryList;
		CONDITION=data.conditionList;
		list_obj01=data.customerList;
	});
	companyDataSet();
	*/
};
function companySearchList(){
	cop_page=new Array();
	CUR_PAGE="";
	MAX_PAGE="";
	var cop_name=document.getElementById("searchString"),
		dv=document.getElementById("copTb01"),
		pdv=document.getElementById("cop_page"),
		obj={searchString:cop_name.value,page:1,rowNum:rownum};
	$.ajax({
		url: "/cop/customerAdminAjax",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			//CATEGORY=data.categoryList;
			//CONDITION=data.conditionList;
			list_obj01=data.customerList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		companyDataSet();
		if(MAX_PAGE){
			for(var i=0;i<MAX_PAGE;i++){
				var a=parseInt((i)/10);
				cop_page.push([i+1,a+1,(a*10)+1,0]);
			}
			var max_pages=cop_page.distinct(1),lenar=[];
			max_pages.trav(function(d,i){
				var cnt=0;
				cop_page.trav(function(f,g){
					if(d==f[1]){
						cnt++;
					}
				});
				lenar.push(cnt);
			});
			lenar.trav(function(f,g){
				cop_page.trav(function(d,i){
					if(g+1==d[1])d[3]=f;
				});
			});
		}
		var res=q.parse("select * from companylist01;");
			pdv=document.getElementById("cop_page");
		mkList_body(dv,res.arr);
		mkcop_page(pdv);
	};	
	/*callCustomerAdminData(obj,function (data){
		CATEGORY=data.categoryList;
		CONDITION=data.conditionList;
		list_obj01=data.customerList;
	});
	companyDataSet();
	if(MAX_PAGE){
		for(var i=0;i<MAX_PAGE;i++){
			var a=parseInt((i)/10);
			cop_page.push([i+1,a+1,(a*10)+1,0]);
		}
		var max_pages=cop_page.distinct(1),lenar=[];
		max_pages.trav(function(d,i){
			var cnt=0;
			cop_page.trav(function(f,g){
				if(d==f[1]){
					cnt++;
				}
			});
			lenar.push(cnt);
		});
		lenar.trav(function(f,g){
			cop_page.trav(function(d,i){
				if(g+1==d[1])d[3]=f;
			});
		});
	}
	mkList_body(dv);
	mkcop_page(pdv);*/
};
function copSrchPageList01(){
	var cop_name=document.getElementById("searchString"),
		dv=document.getElementById("copTb01"),
		pdv=document.getElementById("cop_page"),
		obj={searchString:cop_name.value,page:CUR_PAGE.pg,rowNum:rownum};
	$.ajax({
		url: "/cop/customerAdminAjax",
		type: "POST",
		data: obj,
		async: true,
		dataType: 'json',
		success: function (data) {
			//CATEGORY=data.categoryList;
			//CONDITION=data.conditionList;
			list_obj01=data.customerList;
			calldataset();
			$('.wrap-loading').hide(20);
		},beforeSend:function(){
			$('.wrap-loading').show();
		}
	});
	function calldataset(){
		companyDataSet();
		var res=q.parse("select * from companylist01;");
			pdv=document.getElementById("cop_page");
		mkList_body(dv,res.arr);
		mkcop_page(pdv);
	};	
	/*callCustomerAdminData(obj,function (data){
		list_obj01=data.customerList;
	});
	mkList_body(dv);
	mkcop_page(pdv);*/
};
function companyDataSet(){
	var ar=[];
	if(list_obj01&&list_obj01.length>0){
		list_obj01.trav(function(d,i){
			if(!d.company_name) d.company_name="";
			if(!d.company_eng) d.company_eng="";
			if(!d.chairman) d.chairman="";
			if(!d.sales_customer_user_id) d.sales_customer_user_id="";
			if(!d.sales_customer) d.sales_customer="";
			if(!d.business_category) d.business_category="";
			if(!d.business_condition) d.business_condition="";
			if(!d.company_reg_number)d.company_reg_number="";
			if(!d.corporate_number)d.corporate_number="";
			if(!d.site_id)d.site_id="";
			if(!d.company_file_id) d.company_file_id="";
			if(!d.company_file_name) d.company_file_name="";
			if(!d.company_file_path)d.company_file_path="";
			if(!d.phone_number) d.phone_number="";
			if(!d.fax) d.fax="";
			if(!d.address)d.address="";
			if(!d.address_eng) d.address_eng="";
			if(!d.charger_yn) d.charger_yn="";
			if(!d.company_yn)d.company_yn="";
			if(!d.company_id)d.company_id="";
			if(!d.build_mng_no)d.build_mng_no="";
			if(!d.zipcode)d.zipcode="";
			if(!d.creator)d.creator="";
			if(!d.post1)d.post1="";
			if(!d.post2)d.post2="";
			if(!d.company_reg_check)d.company_reg_check="";
			if(!d.etc)d.etc="";
			if(!d.user_name)d.user_name="";
			if(d.max_rn) MAX_PAGE=d.max_rn*1;
			ar.push([d.company_name,d.company_eng,d.chairman,d.sales_customer,d.business_category,d.business_condition,d.company_reg_number,d.corporate_number,d.site_id,
			         d.company_file_id,d.phone_number,d.fax,d.address,d.address_eng,d.charger_yn,d.company_yn,d.company_file_name,d.company_file_path,d.company_id,
			         d.zipcode,d.creator,d.post1,d.post2,d.company_reg_check,d.sales_customer_user_id,d.etc,d.user_name]);
		});
	}
	q.reg("companylist01",{
		arr:ar,
		header:["company_name","company_eng","chairman","sales_customer","business_category","business_condition","company_reg_number","corporate_number","site_id","company_file_id",
		        "phone_number","fax","address","address_eng","charger_yn","company_yn","company_file_name","company_file_path","company_id","zipcode","creator",
		        "post1","post2","company_reg_check","sales_customer_user_id","etc","user_name"],
		meta:["string","string","string","string","string","string","string","string","string","string","string","string","string","string","string","string","string"
		      ,"string","string","string","string","string","string","number","string","string","string"]
	});
};
function delOffMessage(){
	generalPopOk("삭제 권한이 없습니다.");
};
function companyDel(){	
	if(!prev){
		generalPop("삭제할 고객사를 선택하세요.");
	}if(prev.data[20] != login_userid){
		generalPop("등록된 사용자만 삭제가능합니다.");
		return false;
	}else{
		generalPop("삭제하시겠습니까?", function(){
			$.ajax({
				url: "/cop/deleteCustomerAdmin",
				type: "POST",
				data: {"company_id" : prev.data[18]},
				async: false,
				dataType: 'text',
				success: function (data) {
					if(data != "success"){
						if(data == "1")			generalPop(" 해당 고객사는 영업관리의 <br/> ProjectCode에서 사용중입니다. ");
						else if(data == "2")	generalPop(" 해당 고객사는 P/J관리의 <br/> 프로젝트관리에서 사용중입니다. ");
						else if(data == "3")	generalPop(" 해당 고객사는 계약관리의 <br/> 매출품의메뉴에서 사용중입니다. ");
					} 
					else generalPop("삭제되었습니다.",function(){
						companySearchList();
					});
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}
};
function checkMode(e){
	if(e.checked){
		com_checks.trav(function(d,i){
			if(!d.checked) d.checked=true;
		});
	}else{
		com_checks.trav(function(d,i){
			if(d.checked) d.checked=false;
		});
	}
};
