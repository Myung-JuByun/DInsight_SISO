<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script type="text/javascript">
	var refRowCount = 0;
	var refCon;
	
	function familyToggle(fam) {
		var familyArea = $("#" + fam);
		
		if(familyArea.css("display")=="block"){
			$("#linkPlus").show();
			$("#linkMinus").hide();
			familyArea.hide();
		} else {
			$("#linkPlus").hide();
			$("#linkMinus").show();
			familyArea.show();
		}
	}
	
	function goMain(){
		window.location.href = "/main";
	}
	
	function refPop(){
		callExpanseReferenceData(function(data){
		   referencePop(data);
		});
	}
   
	function referencePop(obj){
		refRowCount = obj.refList.length;
		refArrList = new Array();
	   
		refCon=document.createElement("div");
		refCon.style.width=800+"px";
		refCon.style.height=450+"px";
		refCon.style.position="absolute";
		refCon.innerHTML="";
		
		var con0=cf.mkTag("div",refCon),
			con1=cf.mkTag("div",con0);
		con1.style.width=800+"px";
		con1.style.height=450+"px";
		con1.style.border=2+"px solid black";
		con1.style.backgroundColor="white";
		
		var con2=cf.mkTag("div",con1),
			span=cf.mkTag("span",con2);
		con2.className="my_top";
		span.innerHTML="&nbsp&nbsp&nbsp&nbsp자료실";
		
		var con2_a=cf.mkTag("a",con2),
			con2_img=cf.mkTag("img",con2_a);
		con2_a.href="#";
		con2_a.className="my_top_closs";
		con2_img.src="/images/pop_btn/btn_pop_close.png";
		con2_img.id="my_closs";
		con2_img.alt="닫기";
		con2_img.align="right";
		con2_img.onclick=function(){
			cf.killTag(refCon.parentNode);
		};
		
		var con3=cf.mkTag("div",con1);
		con3.className="my-container";
		con3.style.height=375+"px";
		con3.style.overflowY="auto";
		
		var con4=cf.mkTag("div",con3);
		con4.className="con_table";
		
		if(obj.isMng == "Y"){
			var con4_title=cf.mkTag("div",con4);
			con4_title.className="btn_action";
			con4_title.style.paddingBottom=15+"px";
			
			var con4_ul=cf.mkTag("ul",con4_title);
			var con4_li1=cf.mkTag("li",con4_ul);
			var con4_li1a=cf.mkTag("a",con4_li1);
			con4_li1a.onclick=function(){
				addRefRow();
				var tbd = document.getElementById("referenceView");
				tbd.childNodes.trav(function(tr,idx){
					if(idx==0){
						tr.childNodes.trav(function(td,num){
							cf.setCss(td,{borderTop:0+"px"});
						});
					}
				});
			};
			var con4_li1aimg=cf.mkTag("img",con4_li1a);
			con4_li1aimg.className="img_plus";
			con4_li1aimg.src="<c:url value='/images/btn/btn_plus_on.gif'/>";
			con4_li1aimg.alt="추가";
	
			var con4_li2=cf.mkTag("li",con4_ul);
			var con4_li2a=cf.mkTag("a",con4_li2);
			con4_li2a.onclick=function(){
				delRefRow();
				var tbd = document.getElementById("referenceView");
				tbd.childNodes.trav(function(tr,idx){
					if(idx==0){
						tr.childNodes.trav(function(td,num){
							cf.setCss(td,{borderTop:0+"px"});
						});
					}
				});
			};
			var con4_li2aimg=cf.mkTag("img",con4_li2a);
			con4_li2aimg.className="img_del";
			con4_li2aimg.src="<c:url value='/images/btn/btn_del_on.gif'/>";
			con4_li2aimg.alt="삭제";
			
			var con4_li3=cf.mkTag("li",con4_ul);
			var con4_li3a=cf.mkTag("a",con4_li3);
			con4_li3a.onclick=function(){
				generalPop("저장하시겠습니까?", function(){
					saveRef();
				});
			};
			var con4_li3aimg=cf.mkTag("img",con4_li3a);
			con4_li3aimg.className="img_save";
			con4_li3aimg.src="<c:url value='/images/btn/btn_save_on.gif'/>";
			con4_li3aimg.alt="저장";
		}
		
		var con5=cf.mkTag("div",con4);
		con5.className="Wrap_table";
		
		var thead=cf.mkTag("div",con5);
		thead.style.overflowY="scroll";
		mkRefDetailhead(thead);
		
		var tbody=cf.mkTag("div",con5);
		tbody.style.height=280+"px";
		tbody.style.overflowY="scroll";
		mkRefDetailbody(tbody, obj);

		callPop(refCon);
		
		obj.refList.trav(function(d,i){
			refArrList.push(["",d.reference_file_path, d.reference_file_name, d.creator_name, d.modifier_name]);
		});
		setRefInputValue(refArrList);
	}
   
	function setRefInputValue(arr){
		refChecks = new Array();
		arr.trav(function(d,i){
			d.trav(function (d1,i){
				refChecks.push();
			}); 
	 	});
	}
	
	function mkRefDetailhead(son){
		var table=cf.mkTag("table",son);
		table.style.width=100+"%";
		table.cellpadding=0;
		table.cellspacing=0;
		table.className="Normal_table";
		
		var tr=cf.mkTag("tr",table),
			th=cf.mkTag("th", tr);
		th.style.width=10+"%";
		var ipt=cf.mkTag("input", th);
		ipt.className="refCheckMode";
		ipt.type="checkbox";
		ipt.onclick=function(){
			GroupCheck('refCheckMode', 'reference_id');
		};
		var th=cf.mkTag("th", tr);
		th.style.width=50+"%";
		th.innerHTML="파일명";
		var th=cf.mkTag("th", tr);
		th.style.width=20+"%";
		th.innerHTML="등록자";
		var th=cf.mkTag("th", tr);
		th.style.width=20+"%";
		th.className="right";
		th.innerHTML="등록일";
	}
	
	function mkRefDetailbody(son, obj){
		var table=cf.mkTag("table",son);
		table.style.width=100+"%";
		table.cellpadding=0;
		table.cellspacing=0;
		table.className="Normal_table";
		table.id="referenceView";
		
		if(obj.refList.length==0){
			var tr=cf.mkTag("tr",table),
				td1=cf.mkTag("td", tr);
			td1.style.textAlign="center";
			td1.innerHTML="조회된 데이터가 없습니다.";
			cf.setCss(td1,{borderTop:0+"px"});
		}else{
			obj.refList.trav(function(d,i){
				var tr=cf.mkTag("tr",table),
					td1=cf.mkTag("td", tr);
				td1.className="center";
				td1.style.width=10+"%";
				td1.style.textAlign="center";
				var ipt = cf.mkTag("input", td1);
				ipt.type = "checkbox";
				ipt.className="reference_id";
				ipt.value=d.reference_room_id;
				
				var td2=cf.mkTag("td", tr);
				td2.className="pd10";
				td2.style.width=50+"%";
				
				if(d.reference_file_name != '' && d.reference_file_name != null && d.reference_file_name != undefined){
					var aTagImg = cf.mkTag("img", td2);
					aTagImg.src = "/images/ico/ico_filedown.gif";
					aTagImg.onclick = function(){
						javascript:window.open(encodeURI("/exp/reference/referenceDownloadAjax.do?reference_file_id=" + d.reference_file_id));
					};
				}		
				var aTag = cf.mkTag("a", td2);
				aTag.onclick = function(){
					javascript:window.open(encodeURI("/exp/reference/referenceDownloadAjax.do?reference_file_id=" + d.reference_file_id));
				};
				aTag.textContent = d.reference_file_name; 
				aTag.style.textDecoration="underline";
				aTag.style.cursor="pointer";
				
				var td3=cf.mkTag("td", tr);
				td3.style.textAlign="center";
				td3.style.width=20+"%";
				td3.innerHTML=d.creator_name;
				
				var td4=cf.mkTag("td", tr);
				td4.className="right";
				td4.style.textAlign="center";
				td4.style.width=20+"%";
				td4.innerHTML=d.creation_date;
				
				if(i==0){
					cf.setCss(td1,{borderTop:0+"px"});
					cf.setCss(td2,{borderTop:0+"px"});
					cf.setCss(td3,{borderTop:0+"px"});
					cf.setCss(td4,{borderTop:0+"px"});
				}
			});
		}
	}
	
	function addRefRow(){
		var tbd = document.getElementById("referenceView");
		if(refRowCount == 0)
			tbd.innerHTML = "";
		
		var tr = cf.mkTag("tr", tbd),
			td1 = cf.mkTag("td", tr);
		td1.style.textAlign="center";
		td1.style.width=10+"%";
		
		var ipt1 = cf.mkTag("input", td1);
		ipt1.type = "checkbox";
		ipt1.className="reference_id";
		ipt1.value="0";
		
		var td2 = cf.mkTag("td", tr);
		td2.style.paddingLeft="10px";
		td2.style.width=50+"%";
		
		var ipt2 = cf.mkTag("input", td2);
		ipt2.type = "file";
		ipt2.style.width="90%";
		
		var td3 = cf.mkTag("td", tr);
		td3.style.width=20+"%";
		
		var td4 = cf.mkTag("td", tr);
		td4.className="right";
		td4.style.width=20+"%";
	}
	
	function delRefRow(){
		var temp = $("#referenceView input:checked");
		var deleteIds = new Array();
		
		if($("#referenceView input:checked").length == 0){
			generalPop("삭제할 자료를 선택하세요.");
		}else{
			generalPop("삭제하시겠습니까?",function(){
				$.each(temp, function(idx,val){
					if($(this).val() != "0"){
						deleteIds.push($(this).val());
					}else{
						$(this).parent().parent().remove();
					}
				});
				var formData = new FormData();
				formData.append("reference_room_ids", deleteIds);
				
				if(deleteIds.length > 0){
					$.ajax({
						url : "/exp/reference/deleteReferenceAjax",
						type : "POST",
						data : formData,
						dataType: "text",
						processData: false,
					    contentType: false,
						success : function(data) {
							var json = JSON.parse(data);
							var resultCode = json.resultCode;
							if(resultCode == "success"){
								$.each(temp, function(idx, value){
									$(this).parent().parent().remove();
								});
								$('.wrap-loading').hide(20);
								generalPopOk("삭제되었습니다.");
							}
						},
						beforeSend:function(){
							$('.wrap-loading').show();
						}
					});
				}
			});
		}
	}
	
	function saveRef(){
		// 신규 추가된 데이터만 선택
		$.each($("#referenceView input[type=checkbox]"), function(idx, val){
			if($(this).val() == "0"){
				var formData = new FormData();
				formData.append("uploadfile", $(this).closest("tr").find("input[type=file]")[0].files[0]);
				$.ajax({
					url: "/exp/reference/saveReferenceAjax",
					type: "POST",
					data: formData,
					dataType: "text",
					processData: false,	//돔 데이터로 보내기위한 세팅
				    contentType: false,	//돔 데이터로 보내기위한 세팅
					success : function (data) {
						var resultData = $.parseJSON(data);
						if(resultData.status == "success"){
							$('.wrap-loading').hide(20);
							generalPopOk("저장되었습니다.", function(){
									cf.killTag(refCon.parentNode);
									refPop();
							});
						}
					},
					beforeSend:function(){
						$('.wrap-loading').show();
					}
				});
			}
		});
	}
</script>
									
<div class="logo">
	<c:choose>
		<c:when test="${serverIp=='211.232.93.54'}">
			<img src="<c:url value='/images/main/logo.gif'/>" alt="logo" />
		</c:when>
		<c:otherwise>
			<img src="<c:url value='/images/main/logo.gif'/>" alt="logo" onclick="goMain();" style="cursor:pointer"/>
		</c:otherwise>
	</c:choose>
</div>

<img src="<c:url value='/images/main/left_title.gif'/>" alt="intranet system" />
<div class="menu">
	<ul id="level2Menu">
       <!-- 개인경비 class="on" -->
        <c:forEach var="result" items="${menuInfo.subMenu}" varStatus="status">
        	<c:choose>
	    		<c:when test="${menuInfo.level2_id == result.menu_id}">
	    			<li class="on"><c:out value='${result.menu_name}' escapeXml="false" /></li>
	    		</c:when>
	    		<c:otherwise>
	    			<c:choose>
	    				<c:when test="${result.level1_id == '9' && (result.menu_id == '39' || result.menu_id == '40' || result.menu_id == '46' || result.menu_id == '44' || result.menu_id == '45')}"> <!-- || result.menuId == '44' || result.menuId == '45'  -->
	    					<li><a href="javascript:generalPop('준비중입니다.')"><c:out value='${result.menu_name}' escapeXml="false" /></a></li>
	    				</c:when>
	    				<c:otherwise>
	    					<c:choose>
	    						<c:when test="${result.chkMenu == 'N'}">
	    							<li><a href="javascript:generalPop('권한이 없습니다.')"><c:out value='${result.menu_name}' escapeXml="false" /></a></li>	
	    						</c:when>
								<c:otherwise>
									<li><a href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>') "><c:out value='${result.menu_name}' escapeXml="false" /></a></li>
								</c:otherwise>		    					
	    					</c:choose>
	    				</c:otherwise>
	    			</c:choose>
	    		</c:otherwise>
	    	</c:choose>
	    </c:forEach> 
	</ul>
</div>
<%-- <div class="exal_down"><a href="#" onclick="window.open(encodeURI('<c:url value='/cmm/fms/FileOnlyDown'/>'))"><img src="<c:url value='/images/main/down_exal.gif'/>" alt="엑셀다운로드" /></a></div> --%>
<div class="exal_down"><a href="javascript:;" onclick="refPop();"><img src="<c:url value='/images/main/down_file.gif'/>" alt="자료실" /></a></div>
<div class="m_footer">
	<!--패밀리 사이트 시작-->
	<div class="family">
		<h3>
			<a id="familyToggle" href="javascript:;" onclick="familyToggle('familyList');">
				<!-- 자바스크립트가 안될때는 해당사이트로 간다 -->
				<img id="linkPlus" src="<c:url value='/images/main/left_link_plus.png'/>" alt="사이트 링크 보이기" />
				<img id="linkMinus" src="<c:url value='/images/main/left_link_minus.png'/>" alt="사이트 링크 숨기기" style="display:none" />
  			</a>
		</h3>
		<dl id="familyList" style="display: none;">
			<dt></dt>
	   		<dd>
	   			<a target="_blank" href="https://wp.tbizpoint.co.kr/service/login/wpLogin.do" title="새창으로 이동합니다">그룹웨어</a>
	   			<a target="_blank" href="http://www.dinsight.kr" title="새창으로 이동합니다">디인사이트</a>
	   		</dd>
		</dl>
	</div>
	<!--//패밀리 사이트 끝-->
	<br/>
	<p>(주)디인사이트<br/>
	Copyright(C) 2022<br/>
	All Rights Reserved.</p>
</div>  

<script src="/js/common/sisoData.js"></script>
