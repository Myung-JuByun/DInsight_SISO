var prev_g,prev_c,group_del;

function codelist(data, obj){
	var target = document.body,table;	
	cf.traverse(target,function(el){
		if(el.tagName){					
			if(el.id == "codeView")
				table = el;
		}
	});
	table.innerHTML="";	
	group_del=false;
	
	var ar=[];
	codeList.trav(function(d,i){
		if(d.group_id==obj.group_id) ar.push(d);
	});
	ar.trav(function(d,i){
		var tr=cf.mkTag("tr",table),
			td1=cf.mkTag("td",tr),
			td2=cf.mkTag("td",tr),
			td3=cf.mkTag("td",tr),
			td4=cf.mkTag("td",tr);
	
		td1.className="txt_center";
		td2.className="txt_center";
		td3.className="txt_center";
		td4.className="txt_center right";
	
		td1.style.width=80+"px";
		td2.style.width=170+"px";
		td3.style.width=310+"px";
		
		if(i==0){
			cf.setCss(td1,{borderTop:0+"px"});
			cf.setCss(td2,{borderTop:0+"px"});
			cf.setCss(td3,{borderTop:0+"px"});
			cf.setCss(td4,{borderTop:0+"px"});
		}
		
		td1.innerHTML=d.code_id;
		td2.innerHTML=d.code_name;
		td3.innerHTML=d.etc1;
		td4.innerHTML=d.order_seq;
		
		group_del=true;
		
		var codeid=d.code_id,
			codename=d.code_name,
			codeetc=d.etc1,
		    orderseq=d.order_seq;
		
		tr.group_id=prev_g.group_id;
		tr.code_id=codeid;
		tr.code_name=codename;
		tr.etc1=codeetc;
		tr.order_seq=orderseq;
		
		tr.onclick=function(){
			if(prev_c==null) this.style.backgroundColor="#edfafb";
			else{
				prev_c.style.backgroundColor="white";
				this.style.backgroundColor="#edfafb";
			}
			prev_c=this;
		};
	});
};