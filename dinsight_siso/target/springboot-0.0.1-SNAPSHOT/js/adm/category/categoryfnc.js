var CATEGORY,CURRENT_CATEGORY,CATEGORY_ROOT=[],leaves=[],prev;

defaultLoadList();

function defaultLoadList(){
	callExpanseCategoryData(function (data){
		//dir(data);
		CATEGORY=data.GetResultData;
		dataProc();
		mkDivision();
	})
};
function dataProc(){
	CATEGORY_ROOT =new Array();
	
	var dt=CATEGORY;
	var obj={};
	dt.trav(function(d,i){
		var str=d.category_id;
		obj[str]=d;
		d.childNodes=[];
	});
	dt.trav(function(d,i){
		var str=d.parent_id;
		if(str!="0")	obj[str].childNodes.push(d);
		else CATEGORY_ROOT.push(d);
	});
};
function mkDivision(){
	var category_menu=document.getElementById("category_menu");
	var cnt=0;
	category_menu.innerHTML="";

	for(var i=0, lng=CATEGORY_ROOT.length; i<lng; i++){
		cf.traverse(CATEGORY_ROOT[i],function(el){
			mkLeaf(el,category_menu,cnt);
			cnt++;
		});
	}
};
function categoryDel(){	
	var childCheck = 0;
	for(var i=0,lng=CATEGORY.length; i<lng; i++){ 
		if(CATEGORY[i].parent_id==CURRENT_CATEGORY.category_id) { 
			childCheck += 1;
		}
	}
	
	if(childCheck > 0) {
		generalPop("하위 분류가 존재합니다. 하위분류를 삭제해주세요.");
		//return false;
	} else {
	
		if(!prev) generalPop("삭제할 분류를 선택하세요.");
		else{
			generalPop("삭제하시겠습니까?", function(){
				$.ajax({
					url: "/adm/category/deleteExpanseCategory",
					type: "POST",
					data:{
						"category_id" : CURRENT_CATEGORY.category_id
					},
					dataType: "text",
					success : function (data) {
						if(data != "success") generalPop(data);
						else generalPop("삭제되었습니다.");
						defaultLoadList();
						$('.wrap-loading').hide(20);
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
			});
		}//else
	}
};
function findCategryName(){
	var c_name;
	
	if(CURRENT_CATEGORY.parent_id=="0") c_name="전체";
	
	for(var i=0,lng=CATEGORY.length; i<lng; i++){ 
		if(CATEGORY[i].category_id==CURRENT_CATEGORY.parent_id) 
			c_name= CATEGORY[i].category_name;
		}
	return c_name;
};
function mkSelectCategory(select, def){
	var op;	
	$.ajax({
		  url: "/adm/category/selectAccountComboList",
		  type: "POST",
		  async: false,
		  dataType: 'json',
		  success: function (data) {			  
			data.trav(function(d,i){
				op=cf.mkTag("option",select);
				op.value=data[i].account_cd;
				op.innerHTML=data[i].account_name;
				if(def && data[i].account_cd==def){
					op.selected="selected";
				}
			});			  
			$('.wrap-loading').hide(20);
		  },
		  beforeSend:function(){
		  	$('.wrap-loading').show();
		  }
	});
};
