var codeList;

defaultLoadList();

//페이지 갱신할때 호출해야 하는 항목을 함수에 등록시킴
function defaultLoadList(){	
	var target = document.body;
	callCodeAdminData(function (data){
		codeList=data.codeList;
		var table;
		// traverse 지역함수 - table 객체 잡는 거.... 
		cf.traverse(target,function(el){
			if(el.tagName){					
				if(el.id == "groupView")
					table = el;
			}
		});			
		table.innerHTML="";			
		//data 를 삽입하기 위한 td 생성
		for(var i=0, lng=data.groupList.length; i<lng; i++){				
			var tr=cf.mkTag("tr",table),
				td1=cf.mkTag("td",tr),
				td2=cf.mkTag("td",tr);
			td1.className="txt_center";
			td2.className="txt_center right";
			tr.style.cursor="pointer";
			tr.style.backgroundColor="white";
			td1.style.width=100+"px";
			
			if(i==0){
				cf.setCss(td1,{borderTop:0+"px"});
				cf.setCss(td2,{borderTop:0+"px"});
			}
			
			td1.innerHTML=data.groupList[i].group_id;
			td2.innerHTML=data.groupList[i].group_name;
			
			var groupid=data.groupList[i].group_id,
				groupname=data.groupList[i].group_name,
				groupex=data.groupList[i].etc_explain;
			
			tr.group_id=groupid;
			tr.group_name=groupname;
			tr.etc_explain=groupex;
			tr.idx=i;
			
			tr.onclick=function(){					
				if(prev_g==null) this.style.backgroundColor="#edfafb";
				else{
					prev_g.style.backgroundColor="white";
					this.style.backgroundColor="#edfafb";
				}
				prev_g=this;
				
				var obj={group_id : this.group_id,group_name : this.group_name,etc_explain : this.etc_explain};
				codelist(codeList, obj);
			};
		}
	})
};
function groupDel(){
	if(!prev_g) generalPop("삭제할 그룹을 선택하세요.");
	else if(group_del) generalPop("코드 정보가 있습니다.");
	else{
		generalPop(prev_g.group_name+"그룹을 삭제하시겠습니까?", function(){			
			$.ajax({
				url: "/adm/code/deleteCmnGroupCode",
				type: "POST",
				data:{"group_id"	: prev_g.group_id},
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
};
function codeDel(){
	if(!prev_c) generalPop("삭제할 코드를 선택하세요.");
	else{
		generalPop(prev_c.code_name+" 코드를 삭제하시겠습니까?", function(){
			$.ajax({
				url: "/adm/code/deleteCmnCode",
				type: "POST",
				data:{"group_id": prev_g.group_id,"code_id"	: prev_c.code_id},
				dataType: "text",
				success : function (data) {
					if(data != "success") generalPop(data);
					else generalPop("삭제되었습니다.");
					defaultLoadList();
					var a=document.getElementById("groupView");
					a.children[prev_g.idx].onclick();
					$('.wrap-loading').hide(20);
				},
				beforeSend:function(){
					$('.wrap-loading').show();
				}
			});
		});
	}//else
};
function searchRESP(){
	callSubCustomerAdminData(obj, function (data){
		dir(data);
	});
};