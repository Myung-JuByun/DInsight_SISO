<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script type="text/javaScript" language="javascript" defer="defer">

	function viewHTML() {	
		var HTML ="",
			conH=cf.workareaheight-223;
		
		HTML += "<div id='approval_pop' style='height:"+conH+"px; max-height:557px; width:1030px; overflow-y:auto'>";
		HTML += "	<!--//Content head end -->";
		HTML += "	<div class='search' style='width:990px;'>";
		HTML += "		<table>";
		HTML += "			<tr>";
		HTML += "				<td style='font-weight: bold'>결재 요청 구분&nbsp;&nbsp;&nbsp;&nbsp;</td>";
		HTML += "				<td>";
		HTML += "					<select name='sh_payment_type' class='sh_payment_type select2'>";
		//HTML += "						<option value='01'>경비</option>";
		//HTML += "						<option value='02'>프로젝트</option>";
		//HTML += "						<option value='03'>M/H</option>";
		//HTML += "						<option value='04'>매입/매출</option>";
		HTML += "					</select>";
		HTML += "				</td>";
		HTML += "			</tr>";
		HTML += "		</table>";
		HTML += "	</div>";
		HTML += "	<!--// search end -->";
		HTML += "	";
		HTML += "	<div class='Left_wrap2'>";
		HTML += "	<!--  table start -->";
		HTML += "	";
		HTML += "		<div class='Left_group4_3'>";
		HTML += "			<div class='title2'>조직도</div>";
		HTML += "			<div class='left_table4'>";
		HTML += "				<table class='Normal_table'>";
		HTML += "	";
		HTML += "					<tr height='138px'>";
		HTML += "						<td class='right'>";
		HTML += "							<div class='POP_tree_menu' id='POP_tree_menu'>";
		HTML += "							<!-- 트리메뉴 시작 -->";
		HTML += "							<!-- 트리메뉴 끝 -->";
		HTML += "							</div>";
		HTML += "						</td>";
		HTML += "					</tr>";
		HTML += "					<tr>";
		HTML += "						<td class='right end'  align='right'>";
		HTML += "							<a href='javascript:PaymentTreeView(\"Y\")'><img src='/images/exp_payment/btn_openall.gif'alt='전체펼침' /> </a>";
		HTML += "							<a href='javascript:PaymentTreeView(\"N\")'><img src='/images/exp_payment/btn_closeall.gif'alt='전체닫기' /></a>";
		HTML += "						</td>";
		HTML += "					</tr>";
		HTML += "				</table>";
		HTML += "			</div>";
		HTML += "		</div>		";
		HTML += "	";
		HTML += "		<!--2nd table start -->";
		HTML += "		<div class='Left_group4'>";
		HTML += "			<div class='title3'>";
		HTML += "				<div class='group_search'><input type='text' name='search_user_name' id='search_user_name' size='30' value='  이름을 입력하세요  ex)홍길동' style='border:1px solid #dbdbdb;'><img src='/images/ico/btn_search_small.gif' name='search_img_user_name' alt='search' align='absmiddle'></div>";
		HTML += "			</div>";
		HTML += "			<div class='left_table4'>";
		HTML += "				<table class='Normal_table'>";
		HTML += "					<tr>";
		HTML += "						<th width='31px'></th>";
		HTML += "						<th width='60px'>이름</th>";
		HTML += "						<th width='50px'>직위</th>";
		HTML += "						<th width='90px' class='right'>부서</th>";
		HTML += "						<th width='10px' class='right'>&nbsp;</th>";
		HTML += "					</tr>";
		HTML += "					<tr height='150px'>";
		HTML += "						<td colspan='5' class='right'>";
		HTML += "							<div style='height:150px;overflow:auto;'>";
		HTML += "								<table class='Normal_table'>";
		HTML += "								<tbody id='userListPopView'>";
		HTML += "									<!-- 직원리스트 시작 -->";
		HTML += "									<!-- 직원리스트 끝 -->";
		HTML += "								</tbody>";
		HTML += "								</table>";
		HTML += "							</div>";
		HTML += "						</td>";
		HTML += "					</tr>";
		HTML += "					<tr>";
		HTML += "						<td align='right' colspan='4' class='right end'>";
		HTML += "							<a href='javascript:PaymentGroupCheckMode(\"Y\",\"payment_id\")'><img src='/images/exp_payment/btn_selectall.gif' alt='' /></a>";
		HTML += "							<a href='javascript:PaymentGroupCheckMode(\"N\",\"payment_id\")'><img src='/images/exp_payment/btn_deselectall.gif' alt='' /></a>";
		HTML += "					</td>";
		HTML += "					</tr>";
		HTML += "				</table>";
		HTML += "			</div>";
		HTML += "		</div>";
		HTML += "	";
		HTML += "		<!--3rd btns start -->";
		HTML += "		<div class='Left_group5'>";
		HTML += "			<ul>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_ex.gif' alt='검토'/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_ok.gif' alt='승인'/></a></li>";
		HTML += "			</ul>";
		HTML += "		</div>";
		HTML += "		<!--//3rd btns end -->";
		HTML += "	</div>";
		HTML += "	<!--//left end -->";
		HTML += "	";
		HTML += "	<!--결재선 순서 지정 -->";
		HTML += "	<div class='Right_group4'>";
		HTML += "		<div class='title2'>결재선(순서 ▼)</div>";
		HTML += "		<div class='POP_confirm_div'>";
		HTML += "			<ul>";
		HTML += "				";
		HTML += "			</ul>";
		HTML += "		</div>";
		HTML += "		<div class='confirm_btns'>";
		HTML += "			<ul>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_up.gif' alt=''/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_down.gif' alt=''/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_top.gif' alt=''/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_bottom.gif' alt=''/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_del.gif' alt=''/></a></li>";
		HTML += "				<li><a href='javascript:void(0)'><img src='/images/exp_payment/btn_delall.gif' alt=''/></a></li>";
		HTML += "			</ul>";
		HTML += "		</div>";
		HTML += "	</div>";
		HTML += "	<!--//결재선 순서 지정 end -->";
		HTML += "	";
		HTML += "	<div class='clear'></div>";
		HTML += "	";
		HTML += "	<div class='Wrap_table2'>";
		HTML += "	   <table class='Normal_table'>";
		HTML += "		   <tbody>";
		HTML += "		   <tr>";
		HTML += "			   <th width='80'> 결재 </th>";
		HTML += "			   <td class='right pd10'>";
		HTML += "					<table height='60' class='in_table'>";
		HTML += "						<tr>";
		HTML += "							";
		HTML += "						</tr>";
		HTML += "						<tr>";
		HTML += "							";
		HTML += "						</tr>";
		HTML += "					</table>";
		HTML += "				</td>";
		HTML += "			</tr>";
		HTML += "			<tr>";
		HTML += "				<th width='80' class='non-bt'> 수신 </th>";
		HTML += "				<td class='right pd10 ' style='border-bottom:none;'>";
		HTML += "					<table height='60' class='in_table'>";
		HTML += "						<tr>";
		HTML += "							";
		HTML += "						</tr>";
		HTML += "						<tr>";
		HTML += "							";
		HTML += "						</tr>";
		HTML += "					</table>";
		HTML += "				</td>";
		HTML += "			</tr>";
		HTML += "			</tbody>";
		HTML += "		 </table>";
		HTML += "	</div>";
		HTML += "	<!--  //table end -->";
		HTML += "</div>";
		
		return HTML;
	}
	
	var POP_DIVISIONS,POP_MEMBERS,POP_DIVISION_ROOT,POP_CURRENT_DIVISION,POP_CURRENT_DIVISION_MEMBERS=new Array(),POP_CURRENT_SEARCH_MEMBERS=new Array(),	
		POP_STACK_EX=new PaymentSTACK(3),POP_STACK_OK=new PaymentSTACK(1),POP_STACK_GET=new PaymentSTACK(1),
		POP_leaves=[],POP_select,POP_tree_menu,POP_box,POP_dirSrch,POP_btnDirSrch,POP_memSrch,POP_btnMemSrch,POP_checks,POP_btnPushEx,POP_btnPushOk,
		POP_confirm_div,POP_tbl_confirm,POP_tbl_getter,POP_focusedMember,POP_focusedIdx,
		POP_btnUp, POP_btnDown, POP_btnTop, POP_btnBottom,POP_btnDel,POP_btnDelall,POP_btnSave,POP_prev,POP_paymentType;
	
	function paymentPop(){
		var con=document.createElement("div");
		con.id="paymentTopLayer";
		con.innerHTML="";
		cf.setCss(con,{position:"absolute",width:1055+"px",height:cf.workareaheight-105+"px",maxHeight:655+"px"});
		
		var con0=cf.mkTag("div",con),
			con1=cf.mkTag("div",con0),
			con2=cf.mkTag("div",con1),
			span=cf.mkTag("span",con2),
			con2_a=cf.mkTag("a",con2),
			con2_img=cf.mkTag("img",con2_a);
		con0.className="pop-mypage";
		con1.id="pop_my";
		con2.className="my_top";
		span.innerHTML="결재선 지정";
		con2_a.href="#";
		con2_a.className="my_top_closs";
		con2_img.src="/images/pop_btn/btn_pop_close.png";
		con2_img.id="my_closs";
		con2_img.alt="닫기";
		con2_img.align="right";
		con2_img.onclick=function(){
			cf.killTag(con.parentNode);
		};
		
		cf.setCss(con1,{width:1055+"px",height:cf.workareaheight-105+"px",maxHeight:655+"px",border:2+"px solid black",backgroundColor:"#fff"});
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		con3.id="contents";
		con3.innerHTML=eval("viewHTML()");		
		cf.setCss(con3,{overflowY:"auto",height:cf.workareaheight-203+"px",maxHeight:557+"px"});
		
		
		var con4=cf.mkTag("div",con1),
			btn1=cf.mkTag("button",con4),
			btn2=cf.mkTag("button",con4);
		con4.className="savebtn";
		btn1.className="ct-btn darkgrey large";
		btn1.id="savebtn";
		btn1.innerHTML="저장";
		btn1.onclick=function(){
			PaymentBtnSaveClick("Y");
		};	
		btn2.className="ct-btn grey large";
		btn2.innerHTML="취소";
		btn2.onclick=function(){
			cf.killTag(con.parentNode);	
		};
		cf.setCss(btn1,{marginRight:5+"px"});
		
		callPop(con);
		
		defaultPopLoadList();		
		mkDivSelectBox($(".sh_payment_type")[0], POP_paymentType);
	};	
	//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
	function defaultPopLoadList(){
		PaymentGetEls();
		PaymentDivisionList();
	};	
	function PaymentGetEls(){
		var in_table=new Array(),inputs=new Array(),imgs=new Array(),contents=document.getElementById("contents");
		
		cf.traverse(document.body,function(el){
			if(el.className=="POP_tree_menu") POP_tree_menu=el;
			if(el.className=="POP_confirm_div") POP_confirm_div=el;
			if(el.className=="in_table") in_table.push(el);
			if(el.name=="sh_payment_type") POP_select=el;
			if(el.name=="search_user_name") inputs.push(el);
			if(el.name=="search_img_user_name") imgs.push(el);
			if(el.src && el.src.indexOf("/images/exp_payment/btn_ex.gif")!=-1) POP_btnPushEx=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_ok.gif")!=-1) POP_btnPushOk=el;			
			if(el.src && el.src.indexOf("/images/exp_payment/btn_up.gif")!=-1) POP_btnUp=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_down.gif")!=-1) POP_btnDown=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_top.gif")!=-1) POP_btnTop=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_bottom.gif")!=-1) POP_btnBottom=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_del.gif")!=-1) POP_btnDel=el;
			if(el.src && el.src.indexOf("/images/exp_payment/btn_delall.gif")!=-1) POP_btnDelall=el;
			
			//if(el.id=="savebtn") POP_btnSave=el;
		});
		
		POP_select.onchange=PaymentSelectChange;		
		POP_btnDirSrch=imgs[0];
		POP_dirSrch=inputs[0];
		POP_dirSrch.onclick=function(){
			POP_dirSrch.value="";			
		};
		POP_dirSrch.onkeypress=function(e){
			e.preventDefault();
			if(e.keyCode==13){
				PaymentBtnDirSrchClick();
			}
		};
		POP_btnDirSrch.onclick=PaymentBtnDirSrchClick;
		POP_btnPushEx.onclick=PaymentBtnPushExClick;
		POP_btnPushOk.onclick=PaymentBtnPushOkClick;
		
		POP_tbl_confirm=in_table[0];
		POP_tbl_getter=in_table[1];
		
		POP_btnUp.onclick=PaymentBtnUpClick;
		POP_btnDown.onclick=PaymentBtnDownClick;
		POP_btnTop.onclick=PaymentBtnTopClick;
		POP_btnBottom.onclick=PaymentBtnBottomClick;
		POP_btnDel.onclick=PaymentBtnDelClick;
		POP_btnDelall.onclick=PaymentBtnDelallClick;
		
		//POP_btnSave.onclick=PaymentBtnSaveClick;
	};	
	function PaymentSelectChange(){
		PaymentDivisionList(true);
	};	
	function PaymentBtnSaveClick(flag){		
		if(flag=="Y"){
			if(POP_STACK_OK.arr.length==0){
				generalPop("승인자를 지정해 주세요.");
				return;
			}
			generalPop("저장하시겠습니까?",function(){
				var ex=new Array();
				POP_STACK_EX.arr.trav(function(d,i){
					ex.push([d.user_name, d.job_title]);
				});
				
				var obj={
					self:PREVLINE[0],
					ex:POP_STACK_EX.arr,
					ok:POP_STACK_OK.arr,
					rc:POP_STACK_GET.arr,
					type:POP_select.value
				};
				//log(JSON.stringify(obj));
				$.ajax({
					url: "/exp/payment/paymentAdminInsert",
					type: "POST",
					data:{"data":JSON.stringify(obj)},
					dataType: "json",
					async: false,
					success : function(data){
						//dir(data);
						PaymentDivisionList();
					}
				});
				generalPop("저장하였습니다.");
			});
		}else{
			//취소시 경비입력창
			//if (flag=="N") location.href="../../../exp/admin/expanseAdmin";
			var topLayer=document.getElementById("pop-mypage");
			
		
			if (flag=="N") cf.killTag(paymentTopLayer.parentNode);
			return;
		}
	};
	
	function PaymentBtnUpClick(){
		PaymentOpButton(0);
	};
	
	function PaymentBtnDownClick(){
		PaymentOpButton(1);
	};
	
	function PaymentBtnTopClick(){
		PaymentOpButton(2);
	};
	
	function PaymentBtnBottomClick(){
		PaymentOpButton(3);
	};
	
	function PaymentBtnDelClick(){
		
		var li=POP_focusedMember;
		var st=li.st;
		
		if(st==POP_STACK_OK)
			st.delall();
		else{
			st.del(li.idx);
			if(POP_focusedIdx==st.arr.length) POP_focusedIdx--;
		}
		PaymentMkResult();
	};
	
	function PaymentBtnDelallClick(){
		POP_STACK_EX.delall();
		POP_STACK_OK.delall();
		PaymentMkResult();
	};
	
	function PaymentOpButton(opt){
		
		var li=POP_focusedMember;
		var st=li.st;
		var el=st.arr[POP_focusedIdx];
		st.del(POP_focusedIdx);
		
		if(opt==0){
			if(POP_focusedIdx!=0) POP_focusedIdx--;
			st.insert(POP_focusedIdx,el);
		}else if(opt==1){
			if(POP_focusedIdx!=st.arr.length) POP_focusedIdx++;
			st.insert(POP_focusedIdx,el);
		}else if(opt==2){
			POP_focusedIdx=0;
			st.insert(POP_focusedIdx,el);
		}else if(opt==3){
			POP_focusedIdx=st.arr.length;
			st.insert(POP_focusedIdx,el);
		}
		PaymentMkResult();
	};
	
	function PaymentBtnDirSrchClick(){
		var a1=POP_dirSrch.value, a3,
			treedv=document.getElementById("POP_tree_menu");
		POP_MEMBERS.trav(function(d,i){
			var a2=d.user_name;
			if(a1==a2){
				a3=d.division_cd;
				return true;
			}
		});
		if(a1!=""&&!a3) generalPop("찾는 사람이 없습니다.");
		
		POP_leaves.trav(function(d,i){
			var a4=d.obj.division_cd;
			if(a3==a4){
				d.onclick();
				treedv.scrollTop=(i*22);
			}
		});
		PaymentBtnMemSrchClick();
	};
	
	function PaymentGetRealList(){
		var ar=POP_CURRENT_DIVISION_MEMBERS;
		if(POP_CURRENT_SEARCH_MEMBERS && POP_CURRENT_SEARCH_MEMBERS.length>0) ar=POP_CURRENT_SEARCH_MEMBERS;
		return ar;
	};
	
	function PaymentBtnMemSrchClick(){
		var arr=POP_CURRENT_DIVISION_MEMBERS;
		var val=POP_dirSrch.value;
		if(POP_CURRENT_SEARCH_MEMBERS) POP_CURRENT_SEARCH_MEMBERS=new Array();
		arr.trav(function(d,i){
			var dvName=d.division_name;
			var memName=d.user_name;
			var title=d.job_title_name;
			if(val==dvName || val==memName) POP_CURRENT_SEARCH_MEMBERS.push(d);
		});
		//dir(POP_CURRENT_SEARCH_MEMBERS);
		PaymentMkMemberTable();
	};
	
	function PaymentBtnPushExClick(){
		var ar=POP_CURRENT_DIVISION_MEMBERS,cnt=0,ch=0,chk=false;
		POP_checks.trav(function(d,i){
			if(d.checked) {
				if(LOGINFO.userid==ar[i].user_id)chk=true;
				else{
					POP_STACK_EX.push(ar[i]);
					ch++;
				}
			}			
			cnt++;
		});		
		if(chk)generalPop("자기자신은 검토자로 넣을 수 없습니다.");
		else{
			if(ch>3)generalPop("검토자는 최대 3명까지 지정 가능합니다.");
			PaymentMkResult();
		}
	};
	
	function PaymentBtnPushOkClick(){
		var ar=POP_CURRENT_DIVISION_MEMBERS;
		if(POP_STACK_OK.arr.length!=0){
			generalPop("승인변경은 승인자를 삭제한 후에 가능합니다.");
			return;
		}
		POP_checks.trav(function(d,i){
			if(d.checked) POP_STACK_OK.push(ar[i]);
		});
		PaymentMkResult();
	};
	
	function PaymentSTACK(num){
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
	
	function PaymentMkResult(idx){
		var ul=POP_confirm_div.children[0];
		ul.innerHTML="";
		
		POP_tbl_confirm.children[0].children[0].innerHTML="";
		POP_tbl_confirm.children[0].children[1].innerHTML="";
		
		POP_tbl_getter.children[0].children[0].innerHTML="";
		POP_tbl_getter.children[0].children[1].innerHTML="";
		
		var ar=POP_STACK_EX.arr;
		ar.trav(function(d,i){
			PaymentMkLi(d,i,POP_STACK_EX,true);
			PaymentMkTbl(d,i,POP_STACK_EX,"검토",true);
		});
		
		var ar=POP_STACK_OK.arr;
		ar.trav(function(d,i){
			PaymentMkLi(d,i,POP_STACK_OK,false);
			PaymentMkTbl(d,i,POP_STACK_OK,"승인",true);
		});
		
		var ar=POP_STACK_GET.arr;
		ar.trav(function(d,i){
			PaymentMkTbl(d,i,POP_STACK_GET,"수신",false);
		});
		
		function PaymentMkTbl(d,i,st,str,opt){
			
			tbl=opt?POP_tbl_confirm:POP_tbl_getter;
			trTh=tbl.children[0].children[0];
			trTd=tbl.children[0].children[1];
			
			var th=cf.mkTag("th",trTh);
			th.style.width=80+"px";
			//th.style.backgroundColor="#fafafa";
			var txt=cf.mkTag("span",th);
			txt.innerHTML=str;
			if(st!=POP_STACK_GET){
				var img=cf.mkTag("img",th);
				img.src="/images/exp_payment/btn_x.gif";
				img.alt="X";
				img.align="absmiddle";
				img.idx=i;
				img.opt=opt;
				img.st=st;
				img.onclick=function(){
					this.st.del(this.idx);
					PaymentMkResult();
				};
			}
			
			var td=cf.mkTag("td",trTd);
			td.style.textAlign="center";
			var str=d.job_title_name;
			if(str && str.length>3) str=d.job_title_name.substring(0,2);
			if(!str) str="";
			td.innerHTML=d.user_name+" "+str;
			
		};
		
		function PaymentMkLi(d,i,st,opt){
			var li=cf.mkTag("li",ul);
			if(opt){
				if(POP_focusedIdx==undefined && i==0){
					POP_focusedMember=li;
					POP_focusedIdx=i;
				}
				if(POP_focusedIdx!=undefined && POP_focusedIdx==i){ 
					POP_focusedMember=li; 
					li.style.color="green";
				}
			}
			li.idx=i; 
			li.st=st;
			li.opt=opt;
			li.onclick=function(){
				//this.style.backgroundColor="gray";
				if(this.opt){
					if(POP_focusedMember) POP_focusedMember.style.color="black";
					this.style.color="green";
					POP_focusedIdx=this.idx;
					POP_focusedMember=this.opt?this:undefined;
				}else{
					if(POP_focusedMember) POP_focusedMember.style.color="black";
					this.style.color="green";
					POP_focusedMember=this;
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
	
	//부서 리스트 출력
	function PaymentDivisionList(opt) {
		
		if(!opt){
			POP_box=document.getElementById("userListPopView");
		}
		if(opt){
			defaultPopLoadList();
			return;
		}
		
		var searchString ="";
		
		if(!POP_select.value) {
			searchString = "01";
		} else {
			searchString = POP_select.value;
		}
		
		$.ajax({
			url: "/exp/payment/paymentTotalSearch",
			type: "POST",
			dataType: "json",
			data: {"sh_payment_type":searchString},
			async: false,
			success : function(data){
				PaymentPageInit(data);
			}
		});
	};
	
	function PaymentPageInit(data){		
		POP_DIVISIONS=data.divisionList;
		POP_MEMBERS=data.userList;
		GETTERS=data.receiveList;
		PREVLINE=data.paymentList;
		POP_paymentType=data.paymentTypeList;
		
		POP_STACK_EX.delall();
		POP_STACK_OK.delall();
		POP_STACK_GET.delall();
		PREVLINE.trav(function(d,i){
			if(i==0) return;
			if(i==PREVLINE.length-1) POP_STACK_OK.push(d);
			else POP_STACK_EX.push(d); 
		});
		POP_STACK_GET.push(GETTERS[0]);
		PaymentMkResult();
		PaymentDataProc();
		PaymentMkDivision();
	};
	
	function PaymentDataProc(){
		var dt=POP_DIVISIONS;
		//make recursive data structure/////////////////
		var obj={};
		dt.trav(function(d,i){
			var str=d.division_cd;
			obj[str]=d;
			d.childNodes=[];
		});
		dt.trav(function(d,i){
			var str=d.parent_cd;
			if(str)	obj[str].childNodes.push(d);
			else POP_DIVISION_ROOT=d;
		});
		///////////////////////////////////////////////
	};
	
	function PaymentMkDivision(){
		POP_tree_menu.style.width=225+"px";
		POP_tree_menu.style.height=180+"px";
		POP_tree_menu.style.overflowY="auto";
		POP_tree_menu.style.overflowX="hidden";
			
		POP_tree_menu.innerHTML="";
		
		var cnt=0;
		cf.traverse(POP_DIVISION_ROOT,function(el){
			PaymentMkLeaf(el,POP_tree_menu,cnt);
			cnt++;
		});
	};
	
	function PaymentMkLeaf(el,POP_tree_menu,cnt){
		var indent=15;
		var padLeft=(indent*el.division_level*1);
		var str=el.parent_cd;
				
		a=cf.mkTag("div",POP_tree_menu);
		a.style.paddingTop=8+"px";
		a.style.paddingLeft=padLeft+"px";
		a.style.marginRight=20+"px";
		a.style.backgroundColor="white";
		a.style.whiteSpace="nowrap";
		
		a.obj=el;
		a.idx=cnt;
		a.depth=el.division_level;
		a.chk="true";
		a.onclick=function(){
			PaymentGetMem(this);
			PaymentMkMemberTable(true);
			if(POP_prev==null){
				this.style.fontWeight="bold";
				this.style.color="green";
			}else{
				POP_prev.style.fontWeight="normal";
				POP_prev.style.color="black";
				this.style.fontWeight="bold";
				this.style.color="green";
			}
			POP_prev=this;
		};
		if(a.obj.childNodes!=0){
			var img=cf.mkTag("img",a);
			img.className="pop_btn_tree";			
			img.src="/images/exp_payment/tree_minus.gif";
			img.onclick=function(){
				var trg=this.parentNode;
				//dir(trg);
				PaymentFold(trg);	
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
		cf.setCss(span,{cursor:"pointer"});
		POP_leaves.push(a);
	};
	
	function PaymentGetMem(el){
		var obj=el.obj;
		var arr=POP_MEMBERS;
		POP_CURRENT_DIVISION=el.obj;
		POP_CURRENT_DIVISION_MEMBERS=new Array();
		arr.trav(function(d,i){
			if(d.division_cd==obj.division_cd) POP_CURRENT_DIVISION_MEMBERS.push(d);
		});
	};
	
	function PaymentMkMemberTable(opt){
		POP_box.innerHTML="";
		POP_checks=new Array();
		
		var ar;
		if(!opt) ar=PaymentGetRealList();
		else ar=POP_CURRENT_DIVISION_MEMBERS;
		
		//조회 후 검토, 승인시 잘못된 직원이 결제선에 들어가 조회한 항목을 새로 배열에 넣음
		POP_CURRENT_DIVISION_MEMBERS=new Array();
		POP_CURRENT_DIVISION_MEMBERS = ar;
		//
		
		ar.trav(function(d,i){
			PaymentMkTr(d);
		});
		function PaymentMkTr(d){
			var tr=cf.mkTag("tr",POP_box);
			tr.style.cursor="pointer";
			
			var td=cf.mkTag("td",tr);
			td.align="center";
			td.width=30+"px";
			
			var ipt=cf.mkTag("input",td);
			ipt.type="checkbox";
			ipt.className="payment_id";
			ipt.name="payment_id";
			POP_checks.push(ipt);
			
			var td=cf.mkTag("td",tr);
			td.width=59+"px";
			td.align="center";
			td.innerHTML=d.user_name;
			
			var td=cf.mkTag("td",tr);
			td.width=49+"px";
			td.align="center";
			var strJob=d.job_title_name;
			if(strJob && strJob.length>3) strJob=strJob.substring(0,2);
			td.innerHTML=strJob;
			
			var td=cf.mkTag("td",tr);
			td.className="right";
			td.align="center";
			td.innerHTML=d.division_name;
		};
	};
	
	function PaymentFold(l){
		var btn_tree=l.getElementsByClassName("pop_btn_tree");
		POP_leaves.trav(function(d,i){
			//dir(d);
			
			if(i>l.idx) return PaymentdoFold(d,i);
		});
	
		function PaymentdoFold(d,i){
			var cmp=l.depth-d.depth;
			if(cmp>=0) return true;
			if(l.chk){
				d.style.height=0+"px";
				d.style.paddingTop=0+"px";
				d.style.overflow="hidden";
			}else{
				/*	2015-07-28	tree 내 최하위 폴더 마이너스 이미지 삭제 (김혜림) 
				if(btn_tree){
					d.childNodes[0].src="/images/exp_payment/tree_minus.gif";
				}
				*/
				d.style.height=14+"px";
				d.style.paddingTop=8+"px";
				d.style.overflow="";
			}
		};
	};

	//직원리스트 모두선택, 모두해제
	function PaymentGroupCheckMode(flag, GroupClassName) {
		
		var checkboxes = document.getElementsByClassName(GroupClassName);
		
		if(flag == "Y"){
			for(var i=0, n=checkboxes.length;i<n;i++) {
		    	checkboxes[i].checked = true;
		  	}
		}else{
			for(var i=0, n=checkboxes.length;i<n;i++) {
		    	checkboxes[i].checked = false;
		  	} 
		}
	};
	
	function PaymentGroupCheckModeBackup(flag, GroupClassName) {
		if(flag == "Y"){
			$("input:checkbox[class=" + GroupClassName + "]").prop("checked", true);
		}else{
			$("input:checkbox[class=" + GroupClassName + "]").prop("checked", false); 
		}
	};

	function PaymentTreeView(flag){		
		var tree=document.getElementById("POP_tree_menu"),
			img=tree.childNodes[0].childNodes[0];
			//dir(tree);
		
		if(flag=="Y"){ //전체펼침
			if(!img.parentNode.chk)img.onclick();
			
			if(POP_prev!=null){
				var a=POP_prev.getElementsByClassName("pop_btn_tree");
				if(a){
					img.parentNode.chk=false;
					img.onclick();
				}				
			}
		}else{
			if(img.parentNode.chk)img.onclick();			
		}
	};
	
	//셀렉트 박스 생성(현재 레이어에서만 사용하도록 추가함)
	function mkDivSelectBox(select, obj, def, opt){
		var op;	
		//select.className="select_pop";
		if(opt){
			op=cf.mkTag("option",select);
			op.value="";
			op.innerHTML="선택안함";
		}
		
		obj.trav(function(d,i){
			op=cf.mkTag("option",select);
			op.value=obj[i].codeId;
			op.innerHTML=obj[i].codeName;
			if(def && obj[i].codeId==def){
				op.selected="selected";
			}
		});
	};
	
</script>

	