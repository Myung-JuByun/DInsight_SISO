function mkDivision(){
	Object.assign(tree_menu.style, {width:"100%", height:"466px", overflowY:"auto", overflowX:"hidden"});
	tree_menu.innerHTML="";	
	var cnt=0;
	cf.traverse(DIVISION_ROOT,function(el){
		mkLeaf(el,tree_menu,cnt);
		cnt++;
	});
}

function mkLeaf(el,tree_menu,cnt){
	var indent=15;
	var padLeft=(indent*el.division_level*1);
	var str=el.parent_cd;
			
	a=cf.mkTag("div",tree_menu);	
	cf.setCss(a, {paddingTop:"8px", paddingLeft:padLeft+"px", marginRight:"20px", backgroundColor:"white", whiteSpace:"nowrap"});
	
	a.obj=el;
	a.idx=cnt;
	a.depth=el.division_level;
	a.chk=true;
	a.onclick=function(){
		getMem(this);
		mkMemberTable();
		if(prev==null){
			this.style.fontWeight="bold";
			this.style.color="green";
		}else{
			prev.style.fontWeight="normal";
			prev.style.color="black";
			this.style.fontWeight="bold";
			this.style.color="green";
		}
		prev=this;
	};
	
	if(prev&&(prev.obj.division_name==el.division_name)){
		a.style.fontWeight="bold";
		a.style.color="green";
		prev=a;
	}
	
	if(a.obj.childNodes!=0){
		var img=cf.mkTag("img",a);
		img.className="btn_tree";			
		img.src="/images/exp_payment/tree_minus.gif";
		img.onclick=function(){
			var trg=this.parentNode;
			fold(trg);
			if(trg.chk) {
				this.src="/images/exp_payment/tree_plus.gif";
				trg.chk=false;
			}else {
				this.src="/images/exp_payment/tree_minus.gif";
				trg.chk=true;
			}
			
		};
	}else {
		var img=cf.mkTag("img",a);
		img.src="/images/exp_payment/tree_blank.gif";
	}
	
	var span=cf.mkTag("span",a);
	span.innerHTML=" "+"<img src='/images/exp_payment/folder.gif' />"+" "+el.division_name+"&nbsp;&nbsp;&nbsp;&nbsp;";
	leaves.push(a);
}

function getMem(el){
	var obj=el.obj;
	var arr=MEMBERS;
	CURRENT_DIVISION=el.obj;
	CURRENT_DIVISION_MEMBERS=new Array();
	arr.trav(function(d,i){
		if(d.division_cd==obj.division_cd) CURRENT_DIVISION_MEMBERS.push(d);
	});
}

function mkMemberTable(){
	box.innerHTML="";
	checks=new Array();
	
	var cnt=0,ar=CURRENT_DIVISION_MEMBERS,
		allchk=document.getElementById("allchk");
	if(prev&&allchk&&allchk.checked==true)allchk.checked=false;
	
	ar.trav(function(d,i){
		mkTr(d,i);
		cnt++;
	});
	
	function mkTr(d,idx){
		var tr=cf.mkTag("tr",box),
			td1=cf.mkTag("td",tr),
			ipt=cf.mkTag("input",td1);
		td1.align="center";
		td1.width="39px";		
		ipt.type="checkbox";
		ipt.className="payment_id";
		ipt.name="payment_id";
		checks.push(ipt);
		ipt.onclick=function(){
			if(!prev_mem){
				this.parentNode.parentNode.style.backgroundColor="#edfafb";
			}else{
				prev_mem.style.backgroundColor="white";
				this.parentNode.parentNode.style.backgroundColor="#edfafb";
			}
			prev_mem=this.parentNode.parentNode;
			prev_mem.obj=d;
			if(this.checked)this.checked=false;
			else this.checked=true;
		};		
		tr.style.cursor="pointer";
		tr.onclick=function(){
			var ipt_chk=this.childNodes[0].childNodes[0];
			if(!prev_mem){
				this.style.backgroundColor="#edfafb";
			}else{
				prev_mem.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_mem=this;
			prev_mem.obj=d;
			if(ipt_chk.checked)ipt_chk.checked=false;
			else ipt_chk.checked=true;
		};
		
		var td2=cf.mkTag("td",tr);
		td2.align="center";
		td2.width="39px";
		td2.innerHTML=cnt+1;
		
		var td3=cf.mkTag("td",tr);
		td3.width="99px";
		td3.align="center";
		td3.innerHTML=d.user_name;

		var td4=cf.mkTag("td",tr);
		td4.width="99px";
		td4.align="center";
		td4.innerHTML=d.login_id;
		
		var td5=cf.mkTag("td",tr);
		//td5.width=129+"px";
		td5.align="center";
		td5.innerHTML=d.division_name;
		
		var td6=cf.mkTag("td",tr),
			strJob=d.job_title_name;
		td6.align="center";
		td6.width="89px";
		if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
		td6.innerHTML=strJob;
		
		var td7=cf.mkTag("td",tr);
		td7.align="center";
		td7.width="79px";
		var span=cf.mkTag("span",td7);
		span.innerHTML=d.employ_type_name;
		span.style.width="95%";
		
		var td8=cf.mkTag("td",tr);
		td8.align="center";
		td8.width="59px";
		if(d.activate_yn=="0")td8.innerHTML="N";
		else td8.innerHTML="Y";		
		
		var td9=cf.mkTag("td",tr);
		td9.align="center";
		td9.width="42px";
		td9.className="right";
		if(d.delete_yn=="0")td9.innerHTML="N";
		else{
			td9.innerHTML="Y";
			td9.className="asterisk txtbold";
		}
		
		if(idx==0){
			cf.setCss(td1,{borderTop:"0px"});
			cf.setCss(td2,{borderTop:"0px"});
			cf.setCss(td3,{borderTop:"0px"});
			cf.setCss(td4,{borderTop:"0px"});
			cf.setCss(td5,{borderTop:"0px"});
			cf.setCss(td6,{borderTop:"0px"});
			cf.setCss(td7,{borderTop:"0px"});
			cf.setCss(td8,{borderTop:"0px"});
			cf.setCss(td9,{borderTop:"0px"});
		}
	};
}

function fold(l){
	var btn_tree=document.getElementById("btn_tree");
	
	leaves.trav(function(d,i){
		if(i>l.idx) return doFold(d,i);
	});
	
	function doFold(d,i){
		var cmp=l.depth-d.depth;
		if(cmp>=0) return true;
		
		if(l.chk){
			Object.assign(d.style, {height:"0px", paddingTop:"0px", overflow:"hidden"});			
		}else{
			if(btn_tree)
				d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
				
			Object.assign(d.style, {height:"14px", paddingTop:"8px", overflow:""});
		}
	};
};
