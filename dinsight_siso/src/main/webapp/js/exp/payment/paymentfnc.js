var DIVISIONS,MEMBERS,DIVISION_ROOT,CURRENT_DIVISION,CURRENT_DIVISION_MEMBERS=new Array(),CURRENT_SEARCH_MEMBERS=new Array(),
	leaves=[],tree_menu,box,dirSrch,btnDirSrch,memSrch,btnMemSrch,checks,btnPushEx,btnPushOk,confirm_div,select,
	STACK_EX=new STACK(3),STACK_OK=new STACK(1),TACK_GET=new STACK(1),
	tbl_confirm,tbl_getter,focusedMemberfocusedIdx,btnUp,btnDown,btnTop,btnBottom,btnDel,btnDelall,btnSave,prev;

//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList(){
	getEls();
	divisionList();		
};
//검색
function formSearch() {
	$("#searchForm").submit();
};
function getEls(){
	var in_table=new Array();
	var inputs=new Array();
	var imgs=new Array();
	var contents=document.getElementById("contents");
	
	cf.traverse(document.body,function(el){
		if(el.className=="tree_menu") tree_menu=el;
		if(el.className=="confirm_div") confirm_div=el;
		if(el.className=="in_table") in_table.push(el);
		if(el.name=="sh_payment_type") select=el;
		if(el.tagName=="INPUT" && el.type=="text") inputs.push(el);
		if(el.src && el.src.indexOf("/images/ico/btn_search_small.gif")!=-1) imgs.push(el);
		if(el.src && el.src.indexOf("/images/exp_payment/btn_ex.gif")!=-1) btnPushEx=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_ok.gif")!=-1) btnPushOk=el;
		
		if(el.src && el.src.indexOf("/images/exp_payment/btn_up.gif")!=-1) btnUp=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_down.gif")!=-1) btnDown=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_top.gif")!=-1) btnTop=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_bottom.gif")!=-1) btnBottom=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_del.gif")!=-1) btnDel=el;
		if(el.src && el.src.indexOf("/images/exp_payment/btn_delall.gif")!=-1) btnDelall=el;
		
		if(el.src && el.src.indexOf("/images/pop_btn/btn_save_big.gif")!=-1) btnSave=el;
	});
	
	select.onchange=selectChange;
	
	btnDirSrch=imgs[0];
	dirSrch=inputs[0];
	dirSrch.onclick=function(){
		dirSrch.value="";
		
	};
	dirSrch.onkeypress=function(e){
		e.preventDefault();
		if(e.keyCode==13){
			btnDirSrchClick();
		}
	};
	btnDirSrch.onclick=btnDirSrchClick;
	/*
	btnMemSrch=imgs[1];
	memSrch=inputs[1];
	btnMemSrch.onclick=btnMemSrchClick;
	*/
	btnPushEx.onclick=btnPushExClick;
	btnPushOk.onclick=btnPushOkClick;
	
	tbl_confirm=in_table[0];
	tbl_getter=in_table[1];
	
	btnUp.onclick=btnUpClick;
	btnDown.onclick=btnDownClick;
	btnTop.onclick=btnTopClick;
	btnBottom.onclick=btnBottomClick;
	btnDel.onclick=btnDelClick;
	btnDelall.onclick=btnDelallClick;
	
	btnSave.onclick=btnSaveClick;
};
function selectChange(){
	divisionList(true);
};
function btnSaveClick(flag){		
	if(flag=="Y"){
		if(STACK_OK.arr.length==0){
			generalPop("승인자를 지정해 주세요.");
			return;
		}
		generalPop("저장하시겠습니까?",function(){
			var ex=new Array();
			STACK_EX.arr.trav(function(d,i){
				ex.push([d.user_name, d.job_title]);
			});
			
			var obj={
				self:PREVLINE[0],
				ex:STACK_EX.arr,
				ok:STACK_OK.arr,
				rc:STACK_GET.arr,
				type:select.value
			};
			//log(JSON.stringify(obj));
			$.ajax({
				url: "/exp/payment/paymentAdminInsert",
				type: "POST",
				data:{"data":JSON.stringify(obj)},
				dataType: "json",
				async: false,
				success : function(data){
					divisionList();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		//	generalPop("저장완료");
		});
	}else{
		//취소시 경비입력창
		if (flag=="N") location.href="../../../exp/admin/expanseAdmin";
		return;
	}
};
function btnUpClick(){
	opButton(0);
};
function btnDownClick(){
	opButton(1);
};
function btnTopClick(){
	opButton(2);
};
function btnBottomClick(){
	opButton(3);
};
function btnDelClick(){
	
	var li=focusedMember;
	var st=li.st;
	
	if(st==STACK_OK)
		st.delall();
	else{
		st.del(li.idx);
		if(focusedIdx==st.arr.length) focusedIdx--;
	}
	mkResult();
};
function btnDelallClick(){
	STACK_EX.delall();
	STACK_OK.delall();
	mkResult();
};
function opButton(opt){
	
	var li=focusedMember;
	var st=li.st;
	var el=st.arr[focusedIdx];
	st.del(focusedIdx);
	
	if(opt==0){
		if(focusedIdx!=0) focusedIdx--;
		st.insert(focusedIdx,el);
	}else if(opt==1){
		if(focusedIdx!=st.arr.length) focusedIdx++;
		st.insert(focusedIdx,el);
	}else if(opt==2){
		focusedIdx=0;
		st.insert(focusedIdx,el);
	}else if(opt==3){
		focusedIdx=st.arr.length;
		st.insert(focusedIdx,el);
	}
	mkResult();
};
function btnDirSrchClick(){
	var a1=dirSrch.value;
	var a3;
	MEMBERS.trav(function(d,i){
		var a2=d.user_name;
		if(a1==a2){
			a3=d.division_cd;
			return true;
		}
	});
	if(a1!=""&&!a3) generalPop("찾는 사람이 없습니다.");
	
	leaves.trav(function(d,i){
		var a4=d.obj.division_cd;
		if(a3==a4) d.onclick();
	});
	btnMemSrchClick();
}
function getRealList(){
	var ar=CURRENT_DIVISION_MEMBERS;
	if(CURRENT_SEARCH_MEMBERS && CURRENT_SEARCH_MEMBERS.length>0) ar=CURRENT_SEARCH_MEMBERS;
	return ar;
};
function btnMemSrchClick(){
	var arr=CURRENT_DIVISION_MEMBERS;
	var val=dirSrch.value;
	if(CURRENT_SEARCH_MEMBERS) CURRENT_SEARCH_MEMBERS=new Array();
	arr.trav(function(d,i){
		var dvName=d.division_name;
		var memName=d.user_name;
		var title=d.job_title_name;
		if(val==dvName || val==memName) CURRENT_SEARCH_MEMBERS.push(d);
	});
	//dir(CURRENT_SEARCH_MEMBERS);
	mkMemberTable();
};
function btnPushExClick(){
	var ar=getRealList();
	var cnt=0;
	var ch=0;
	checks.trav(function(d,i){
		if(d.checked) {
			STACK_EX.push(ar[i]);
			ch++;
		}
		
		cnt++;
	});
	
	if(ch>3) generalPop("검토자는 최대 3명까지 지정 가능합니다.");
	mkResult();
};
function btnPushOkClick(){
	var ar=getRealList();
	if(STACK_OK.arr.length!=0){
		generalPop("승인변경은 승인자를 삭제한 후에 가능합니다.");
		return;
	}
	checks.trav(function(d,i){
		if(d.checked) STACK_OK.push(ar[i]);
	});
	mkResult();
};
function STACK(num){
	this.arr=new Array();
	this.limit=num;
	this.push=function(el){
		this.arr.push(el);
		if(this.arr.length>this.limit) this.arr.shift();
	};
	this.del=function(idx){
		this.arr.splice(idx,1);
	};
	this.delall=function(idx){
		this.arr=new Array();
	};
	this.insert=function(idx,el){
		this.arr.splice(idx,0,el);
	};
};
function mkResult(idx){
	var ul=confirm_div.children[0];
	ul.innerHTML="";
	
	tbl_confirm.children[0].children[0].innerHTML="";
	tbl_confirm.children[0].children[1].innerHTML="";
	
	tbl_getter.children[0].children[0].innerHTML="";
	tbl_getter.children[0].children[1].innerHTML="";
	
	var ar=STACK_EX.arr;
	ar.trav(function(d,i){
		mkLi(d,i,STACK_EX,true);
		mkTbl(d,i,STACK_EX,"검토 ",true);
	});
	
	var ar=STACK_OK.arr;
	ar.trav(function(d,i){
		mkLi(d,i,STACK_OK,false);
		mkTbl(d,i,STACK_OK,"승인 ",true);
	});
	
	var ar=STACK_GET.arr;
	ar.trav(function(d,i){
		mkTbl(d,i,STACK_GET,"수신 ",false);
	});
	
	function mkTbl(d,i,st,str,opt){
		
		tbl=opt?tbl_confirm:tbl_getter;
		trTh=tbl.children[0].children[0];
		trTd=tbl.children[0].children[1];
		
		var th=cf.mkTag("th",trTh);
		th.style.width=80+"px";
		//th.style.backgroundColor="#fafafa";
		var txt=cf.mkTag("span",th);
		txt.innerHTML=str;
		if(st!=STACK_GET){
			var img=cf.mkTag("img",th);
			img.src="/images/exp_payment/btn_x.gif";
			img.alt="X";
			img.style.verticalAlign="middle";
			img.idx=i;
			img.opt=opt;
			img.st=st;
			img.onclick=function(){
				this.st.del(this.idx);
				mkResult();
			};
		}
		
		var td=cf.mkTag("td",trTd);
		td.style.textAlign="center";
		var str=d.job_title_name;
		if(str && str.length>3) str=d.job_title_name.substring(0,2);
		if(!str) str="";
		td.innerHTML=d.user_name+" "+str;
		
	};
	
	function mkLi(d,i,st,opt){
		var li=cf.mkTag("li",ul);
		if(opt){
			if(focusedIdx==undefined && i==0){
				focusedMember=li;
				focusedIdx=i;
			}
			if(focusedIdx!=undefined && focusedIdx==i){ 
				focusedMember=li; 
				li.style.color="green";
			}
		}
		li.idx=i; 
		li.st=st;
		li.opt=opt;
		li.onclick=function(){
			//this.style.backgroundColor="gray";
			if(this.opt){
				if(focusedMember) focusedMember.style.color="black";
				this.style.color="green";
				focusedIdx=this.idx;
				focusedMember=this.opt?this:undefined;
			}else{
				if(focusedMember) focusedMember.style.color="black";
				this.style.color="green";
				focusedMember=this;
			}
		};
		
		var name=d.user_name;
		var position=d.job_title_name;
		var part=d.division_name;
		
		var str=opt?"<img src='/images/exp_payment/btn_pay01.gif'/>":"<img src='/images/exp_payment/btn_pay02.gif'/>";
		
		if(position && position.length>3) position=position.substring(0,2);
		
		li.innerHTML=str+"&nbsp;"+name+"&nbsp;"+position+"&nbsp;"+"("+part+")";
	};
};
//직원리스트 모두선택, 모두해제
function GroupCheckMode(flag, GroupClassName) {
	if(flag == "Y"){
		$("input:checkbox[class=" + GroupClassName + "]").prop("checked", true);
	}else{
		$("input:checkbox[class=" + GroupClassName + "]").prop("checked", false); 
	}
};
function treeView(flag){
	debugger;
	var tree=document.getElementById("tree_menu"),
		img=tree.childNodes[0].childNodes[0];
	
	if(flag=="Y"){
		if(!img.parentNode.chk){
			img.onclick();
		}
		if(prev!=null){
			var a=prev.getElementsByClassName("btn_tree");
			if(a){
				img.parentNode.chk=false;
				img.onclick();
			}
		}
	}else{
		if(img.parentNode.chk){
			img.onclick();
		}
	}
};