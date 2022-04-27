var MENU, MENU_ROOT;

$.ajax({
	  url: "/adm/auth/authMenuListAjax",
	  type: "POST",
	  dataType: "json",
	  success: function (data) {
		  MENU=data.menuList;
	  }
});

function dataMenuProc(){	
	var dt=MENU;	
	var rootMenu={
		menuId:"9999",
		menuName:"ROOT",
		menuUrl:"",
		orderSeq:"0",
		menuLevel:"0",
		level1Id:""
	};
	
	dt.unshift(rootMenu);		
	
	var obj={};
	dt.trav(function(d,i){
		var str=d.menuId;
		obj[str]=d;
		d.childNodes=[];
	});
	dt.trav(function(d,i){
		var str;
		if(d.menuLevel == 1) str="9999";
		else str=d.level1Id;
		
		if(str){
			obj[str].childNodes.push(d);
			d.parentNode=obj[str];
		}else MENU_ROOT=d;
	});
};

function mkMenu(){
	var checkbox_menu_tree = $("#checkbox_menu_tree")[0];
	Object.assign(checkbox_menu_tree.style, {width:"100%", height:"460px", overflowY:"auto", overflowX:"hidden", border:"none"});	
	checkbox_menu_tree.innerHTML="";
	
	var cnt=0;
	cf.traverse(MENU_ROOT,function(el){
		if(cnt>0){
			mkMenuLeaf(el,checkbox_menu_tree,cnt);
		}
		cnt++;
	});
}

function mkMenuLeaf(el,tree_menu,cnt){	
	var indent=25;
	var padLeft=(indent*el.menuLevel*1);
			
	a=cf.mkTag("div",tree_menu);	
	cf.setCss(a, {paddingTop:"2px", paddingLeft:padLeft+"px", marginRight:"20px", backgroundColor:"white", whiteSpace:"nowrap"});
	
	a.obj=el;
	a.idx=cnt;
	a.depth=el.menuLevel;
	a.chk=true;
	a.onclick=function(){		
		if(prev==null){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			prev.style.fontWeight="bold";
			prev.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		prev=this;
	};
		
	var span=cf.mkTag("span",a);
	span.style.fontWeight="bold";
	span.innerHTML=" "+"<label><input type='checkbox' name='in_menu_id' value='"+el.menuId+"'>"+" "+el.menuName.replace(/(<([^>]+)>)/ig,"")+"</label>&nbsp;";
	leaves.push(a);
};