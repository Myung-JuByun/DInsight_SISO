<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script type="text/javaScript" defer="defer">
	//페이지 자체 전역변수
	var pg_fix_saveform = ["group1Form","group2Form"];
	var pg_def_saveform = ["group3Form"];
	
	$(document).ready( function() {
	   //콤보 생성
	   fn_createCombo("121",pg_fix_saveform[0] + " #menu_authority","N");
	   fn_createCombo("121",pg_fix_saveform[1] + " #menu_authority","N");
	   fn_createCombo("121",pg_def_saveform[0] + " #menu-authority","N");
	   
	   fn_createMenuGroupCombo("1","","searchForm #level1_id","Y");
	   
	   //전역변수 설정
	   pfn_pvariables();
	   
	   //화면 테이블 초기화 설정
	   fn_table_init();   
	});
	
	//전역변수 설정
	function pfn_pvariables() {		
	   g_min_rowCnt         = 9;
	   g_def_table          = ["table3"];
	   g_fix_colm_table     = ["table1_1","table2_1"];
	   g_fix_data_table     = ["table1_2","table2_2"];
	   g_fix_colm_div       = ["Left_fix_content","Right_fix_content"];
	   g_fix_data_list_div  = ["Left_content","Right_content"];
	   g_fix_data_title_div = ["Left_content_title","Right_content_title"];
	}
	
	//행 추가
	function pfn_table_addRow(gubun,table_index,mode) {
		var level1Id = 0;
	    var level2Id = 0;
	    
		if (gubun == "fix") {
		   level1Id = $('#' + pg_fix_saveform[table_index] + ' #level1_id').val();
		   level2Id = $('#' + pg_fix_saveform[table_index] + ' #level2_id').val();
		} else {
		   level1Id = $('#' + pg_def_saveform[table_index] + ' #level1_id').val();
		   level2Id = $('#' + pg_def_saveform[table_index] + ' #level2_id').val();
		}
	    
		if (gubun == "fix" && table_index == 1) {
			if (isEmptyOrNull(level1Id) || level1Id == "0") {
				alert('<spring:message code="level1menu.select"/>');				
				return;
			}
		} else if (gubun == "def" && table_index == 0) {
			if (isEmptyOrNull(level1Id) || level1Id == "0" || isEmptyOrNull(level2Id) || level2Id == "0") {
		    	alert('<spring:message code="level2menu.select"/>');
		    	return;
			}
		}
		
		if (gubun == "fix") {
			fn_fix_table_addRow(table_index,mode);
		} else {
			fn_def_table_addRow(table_index,mode);
		}
	}
	
	//행 삭제
	function pfn_table_dropRow(gubun,table_index){
		var mode = "D";
		
		if (gubun == "fix") {
			fn_fix_table_dropRow(table_index,mode);
		} else {
			fn_def_table_dropRow(table_index,mode);	
		}
	} 
	
	//조회 클릭시
	function pfn_selectGroup(gubun,table_index){
		
		var fix_colm_table = "";
		
		if (gubun == "fix") {
			fix_colm_table = g_fix_colm_table[table_index];
		} else {
			fix_colm_table = g_def_table[table_index];
		}
		
		var menuLevel = 0;
		if (gubun == "fix" && table_index == "0") {
			menuLevel = 1;
		} else if (gubun == "fix" && table_index == "1") {
			menuLevel = 2;
		} else {
			menuLevel = 3;
		}
		
		var level1Id   = "0";
		var level2Id   = "0";
		var level1Name = "";
		
		if (gubun == "fix" && table_index == "0") {
			//조회버튼 클릭시
			level1Id   = $('#searchForm' + ' #level1_id'  ).val();
			level1Name = $('#searchForm' + ' #level1_name').val();
		} else if (gubun == "fix" && table_index == "1") {
			//틀고정 테이블 중분류 조회시
			level1Id   = $('#' + pg_fix_saveform[table_index] + ' #level1_id').val();
			level2Id   = $('#' + pg_fix_saveform[table_index] + ' #level2_id').val();
		} else if (gubun == "def" && table_index == "0") {
			//일반 테이블 소분류 조회시 
			level1Id   = $('#' + pg_def_saveform[table_index] + ' #level1_id').val();
			level2Id   = $('#' + pg_def_saveform[table_index] + ' #level2_id').val();
		}
		
		$('#searchSendForm' + ' #menu_level' ).val(menuLevel);
		$('#searchSendForm' + ' #level1_id'  ).val(level1Id);
		$('#searchSendForm' + ' #level1_name').val(level1Name);
		$('#searchSendForm' + ' #level2_id'  ).val(level2Id);
		
		var actionUrl            = "<c:url value='/adm/selectMenuList'/>";
		var formId               = "searchSendForm";
		var after_function_id    = "pfn_selectGroup_after";
		var after_function_param = [gubun,table_index];
		
		//조회버튼 클릭시 테이블 초기화 처리함
		if (gubun == "fix" && table_index == "0") {
			pfn_form_init(gubun,table_index);
			pfn_table_init(gubun,table_index);
		}
		//ajax 호출
		fn_callAjaxForm(actionUrl,formId,after_function_id,after_function_param);
		
	} 
	
	//조회 클릭 후 결과
	function pfn_selectGroup_after(json,gubun,table_index) {
		var jsonlength         = json.GetResultData.length;
	    var resultErrorYn      = json.GetResultErrorYn;
	    var table_list         = "";
	    var mode               = "S";
	    
	    if (gubun == "fix") {
	    	table_list = g_fix_colm_table[table_index] +"," + "#" + g_fix_data_table[table_index];
	    } else {
	    	table_list = g_def_table[table_index];
	    }
	    
	    if (!resultErrorYn) {
	       for (var i=0;i<jsonlength;i++) {
	          var menuId        = json.GetResultData[i].menu_id;
	          var menuName      = json.GetResultData[i].menu_name;
	          var menuUrl       = json.GetResultData[i].menu_url;
	          var menuImgUrl    = json.GetResultData[i].menu_imgUrl;
	          var menuAuthority = json.GetResultData[i].menu_authority;
	          var orderSeq      = json.GetResultData[i].order_seq;
	          var menuLevel     = json.GetResultData[i].menu_level;
	          var level1Id      = json.GetResultData[i].level1_id;
	          var level1Name    = json.GetResultData[i].level1_name;
	          var level2Id      = json.GetResultData[i].level2_id;
	          var level2Name    = json.GetResultData[i].level2_name;
	          
	          pfn_table_addRow(gubun,table_index,mode);
	          
	          $('#'+table_list).find(' tr:last #level1_name'   ).text(level1Name);
	          $('#'+table_list).find(' tr:last #level2_name'   ).text(level2Name); 
	          $('#'+table_list).find(' tr:last #menu_name'     ).val(menuName);
	          $('#'+table_list).find(' tr:last #menu_id'       ).val(menuId);
	          $('#'+table_list).find(' tr:last #menu_url'      ).val(menuUrl);
	          $('#'+table_list).find(' tr:last #menu_img_url'   ).val(menuImgUrl);
	          $('#'+table_list).find(' tr:last #menu_authority').val(menuAuthority);
	          $('#'+table_list).find(' tr:last #order_seq'     ).val(orderSeq);
	       }
	    }
	}
	
	//저장 클릭시
	function pfn_saveGroup(gubun,table_index){
		var actionUrl            = "<c:url value='/adm/saveMenuAdmin'/>";
		var formId               = "";
		var after_function_id    = "pfn_saveGroup_after";
		var after_function_param = [gubun,table_index];
		var procCnt   = 0;
		var sendYn    = false;
		
		if (gubun == "fix") {
			formId = pg_fix_saveform[table_index] ;
		} else {
			formId = pg_def_saveform[table_index] ;
		}
		
		var varFrom   = $('#'+formId);
		
		if (gubun == "fix") {
			if (fn_multi_fix_validateRequiredFields(varFrom,table_index)) {
				sendYn = true;
			}	
		} else {
			if (fn_multi_def_validateRequiredFields(varFrom,table_index)) {
				sendYn = true;
			}
		}
		
		if (sendYn) {
			//ajax 호출
			if (confirm('<spring:message code="confirm.save.ok"/>')) {
				fn_callAjaxForm(actionUrl,formId,after_function_id,after_function_param);	
			}
		}
	} 
	
	function pfn_saveGroup_after(json,gubun,table_index) {
		var resultErrorYn         = json.GetResultErrorYn;
		
		if (!resultErrorYn) {
			//table 초기화
			pfn_table_init(gubun,table_index);
			
			//조회
			pfn_selectGroup(gubun,table_index);
		}
	}
	
	/* 테이블 이벤트 처리후 호출 함수
	 * pfn_ + 테이블명 + _ + 이벤트명(click,moseover)
	 * 틀고정 테이블일 경우 틀고정 기준 테이블명으로 한다.
	 * object_index : 이벤트의 tr index
	 * table_index  : 테이블 index
	 * mode         : 이벤트아이디
	 */
	function pfn_table1_1_click(object_index,table_index,mode) {
		var gubun = "fix";
		var fix_colm_table = g_fix_colm_table[table_index];
		var tr_object_name = '#'+fix_colm_table + ' tr:eq('+object_index+')';
		var datamode = $(tr_object_name     + ' #dataMode').val();
		var menuId   = $(tr_object_name     + ' #menu_id').val();
		var level1Id = $('#'+pg_fix_saveform[table_index] + ' #level1_id').val();
		
		//테이블 초기화 
		after_table_index = parseInt(table_index)+1;
	    
		pfn_form_init (gubun,after_table_index);
		pfn_table_init(gubun,after_table_index);
		
		$("#" + pg_fix_saveform[after_table_index] + ' #level1_id').val(menuId);
		$("#" + pg_fix_saveform[after_table_index] + ' #level2_id').val(0);
		
		if (datamode != "I") {
			pfn_selectGroup(gubun,after_table_index);	
		}
	}
	
	 /* 테이블 이벤트 처리후 호출 함수
	  * pfn_ + 테이블명 + _ + 이벤트명(click,moseover)
	  * 틀고정 테이블일 경우 틀고정 기준 테이블명으로 한다.
	  * object_index : 이벤트의 tr index
	  * table_index  : 테이블 index
	  * mode         : 이벤트아이디
	  */
	function pfn_table2_1_click(object_index,table_index,mode) {
		var gubun = "def";
		var fix_colm_table = g_fix_colm_table[table_index];
		var tr_object_name = '#'+fix_colm_table + ' tr:eq('+object_index+')';
		
		var datamode   = $(tr_object_name).find(' #dataMode').val();
		var menuId     = $(tr_object_name).find(' #menu_id'  ).val();
		var level2Name = $(tr_object_name).find(' #menu_name').val();
		
		var level1Id   = $('#' + pg_fix_saveform[table_index] + ' #level1_id').val();
		var level1Name = $('#' + g_fix_colm_table[0] + ' .on_click').find('#menu_name').val();
		
		//소분류 테이블 초기화 
		var after_table_index = 0;
		pfn_table_init(gubun,after_table_index);
		pfn_form_init (gubun,after_table_index);
		
		$("#" + pg_def_saveform[after_table_index] + ' #level1_id').val(level1Id);
		$("#" + pg_def_saveform[after_table_index] + ' #level2_id').val(menuId);
		
		//대분류명 , 중분류명 설정
		$('#' + g_def_table[after_table_index] + ' #dataTr').find('#level1_name').text(level1Name);
		$('#' + g_def_table[after_table_index] + ' #dataTr').find('#level2_name').text(level2Name);
		
		if (datamode == "S") {
			pfn_selectGroup(gubun,after_table_index);	
		}
	}
	  
	  /* 대상 table 초기화
	   * 
	   */
	function pfn_table_init(gubun,table_index) {
	   var after_table_index = parseInt(table_index)+1;
	   var after_gubun       = "def";
	   
	   if (gubun == "fix" && table_index == "0") {
		   fn_fix_table_allRowDel(table_index);
		   fn_fix_table_allRowDel(after_table_index);
		   fn_def_table_allRowDel("0");
	   } else if (gubun == "fix" && table_index == "1") {
		   fn_fix_table_allRowDel(table_index);
		   fn_def_table_allRowDel("0");
	   } else {
		   fn_def_table_allRowDel(table_index);
	   }
	}
	  
	  /* 대상 form 초기화
	   * 
	   */
	function pfn_form_init(gubun,table_index) {
	   var after_table_index = parseInt(table_index)+1;
	   var after_gubun       = "def";
	   
	   if (gubun == "fix" && table_index == "0") {
		   pfn_form_set (gubun,after_table_index);
		   pfn_form_set (after_gubun,"0");
	   } else if (gubun == "fix" && table_index == "1") {
		   pfn_form_set (after_gubun,"0");
	   }
	   
	   pfn_form_set (gubun,table_index);
	}
	  
	function pfn_form_set(gubun,table_index) {
		var formId = "";
		var tableId = g_def_table[table_index];
		   
		if (gubun == "fix") {
		   formId  = pg_fix_saveform[table_index];
		   tableId = g_fix_colm_table[table_index];
		} else {
		   formId  = pg_def_saveform[table_index];
		   tableId = g_def_table[table_index];
		}
		   
	   $('#' + formId + ' #level1Id').val("0");
	   $('#' + formId + ' #level2Id').val("0");
		   
	   if (gubun == "def" && table_index == "0") {
	      $('#' + tableId + ' #dataTr').find('#level1_name').text("");
		  $('#' + tableId + ' #dataTr').find('#level2_name').text("");   
	   }
	}

</script>

<form:form method="post" id="searchSendForm" >
	<input type="hidden" id="menu_level" name="menu_level"   value="">
	<input type="hidden" id="level1_id" name="level1_id"     value="">
	<input type="hidden" id="level2_id" name="level2_id"     value="">
	<input type="hidden" id="level1_name" name="level1_name" value="">
</form:form>

<div class="search"> 
   <form:form method="post" id="searchForm" action="javascript:pfn_selectGroup('fix','0')" >
   		대메뉴&nbsp;&nbsp;<select id="level1_id" name="level1_id" title="대메뉴"></select>&nbsp;&nbsp;
        대메뉴명&nbsp;&nbsp;<input id="level1_name" name="level1_name" />
        <div class="btn_go">
        	<a href="javascript:pfn_selectGroup('fix','0')"><img src="<c:url value='/images/btn/btn_go.gif'/>" alt="조회" /></a>
        </div>
   </form:form>
</div>

<div class="Left_group3">
	<!-- button start -->
	<div class="btn_action">
		<ul>
			<li><a href="javascript:pfn_table_addRow('fix','0','I')"><img src="<c:url value='/images/btn/btn_plus_on.gif'/>" alt="추가"/></a></li>
            <li><a href="javascript:pfn_table_dropRow('fix','0')"><img src="<c:url value='/images/btn/btn_del_on.gif'/>" alt="삭제"/></a></li>
            <li><a href="javascript:pfn_saveGroup('fix','0')"><img src="<c:url value='/images/btn/btn_save_on.gif'/>" alt="저장"/></a></li>
        </ul>
	</div>
</div>
     <!--// button end -->
     <!--  table start -->
<form:form method="post" id="group1Form" >
     <input type="hidden" id="menu_level" name="menu_level" value="1">
     <input type='hidden' id='level1_id' name='level1_id' value='0'></input>
     <input type='hidden' id='level2_id' name='level2_id' value='0'></input>
     <div class="Left_fix_title_table" id="Left_fix_title">
     	<table style="width:125px" class="Normal_table">
	        <tr>
	           <th width="25"> NO.</th>
	           <th width="100"> 대메뉴명 </th>
	        </tr>
        </table>
     </div>
     <div class="Left_fix_content_table" id="Left_fix_content">                            
        <table style="width:125px; table-layout:fixed" class="Normal_table" id="table1_1">
	        <tr id="initTr">
	        	<td width="25"></td>
	        	<td width="100"></td>
	        </tr>
	        <tr id="dataTr" height="30">
	        	<td width="25" class="txt_center" id='listSeq'></td>
	        	<td width="100" class="txt_center">
	        		<input id="menu_name" name="menu_name" class="required" title="대메뉴명" style="width:95%;" maxLength="50" type="text" />
	           		<input type='hidden' id='dataMode' name='dataMode' value='' />
	        		<input type='hidden' id='menu_id'   name='menu_id'   value='0' />
	        	</td>
	        </tr>
        </table>
     </div> 
     
     <div class="center_dot" style="background:../images/ico/bg_dot.gif"></div>
     
     <div class="Left_content_title_table" id="Left_content_title">
        <table style="width:470px; table-layout:fixed" class="Normal_table">
        	<tr>
        		<th width="80">권한</th>
        		<th width="80">순&ensp;서</th>
        		<th width="200">URL</th>
        		<th width="200">이미지</th>
        	</tr>
        </table>
     </div>
     <div class="Left_content_table" id="Left_content">
     	<table class="Normal_table" style="width:450px; table-layout:fixed" id="table1_2">
	        <tr id="initTr">
	           <td width="80"></td>
	           <td width="200"></td>
	           <td width="80"></td>
	           <td width="180"></td>
	        </tr>
	        <tr id="dataTr" height="30">
	           <td width="80" class="txt_center"><div class="styled-select" style="width:95%;height:95%;"><select id="menuAuthority" name="menuAuthority" title="권한" style="width:150%;height:100%;" class="required"></select></div></td>
	           <td width="80" class="txt_center"><input id="order_seq" name="order_seq" style="width:95%" title="순 서" maxLength="10" type="tel" /></td>
	           <td width="200" class="txt_center"><input id="menu_url" name="menu_url" style="width:95%" title="URL" maxLength="50" type="text" /></td>
	           <td width="180" class="txt_center"><input id="menu_img_url" name="menu_img_url" style="width:95%" title="이미지" maxLength="50" type="text" /></td>
	        </tr>     
        </table>
     </div>
</form:form>
 
<div class="Right_group3">
   <!-- button start -->
   <div class="btn_action">
      <ul>
         <li><a href="javascript:pfn_table_addRow('fix','1','I')"><img src="<c:url value='/images/btn/btn_plus_on.gif'/>" alt="추가"/></a></li>
         <li><a href="javascript:pfn_table_dropRow('fix','1')"><img src="<c:url value='/images/btn/btn_del_on.gif'/>" alt="삭제"/></a></li>
         <li><a href="javascript:pfn_saveGroup('fix','1')"><img src="<c:url value='/images/btn/btn_save_on.gif'/>" alt="저장"/></a></li>
      </ul>
   </div>
</div>
                                          
<!--  table start -->
<form:form method="post" id="group2Form" >  
	<input type="hidden" id="menu_level" name="menu_level" value="2">
	<input type='hidden' id='level1_id' name='level1_id' value='0'></input>
	<input type='hidden' id='level2_id' name='level2_id' value='0'></input>
	
	<div class="Right_fix_title_table" id="Right_fix_title">                            
        <table style="width:125px" class="Normal_table">
	        <tr>
	           <th width="25">NO.</th>
	           <th width="125">중메뉴명</th>
	        </tr>
        </table>
     </div>
     <div class="Right_fix_content_table" id="Right_fix_content">                            
        <table style="width:125px" class="Normal_table" id="table2_1">
	        <tr id="initTr">
	           <td width="25"></td>
	           <td width="100"></td>
	        </tr>
	        <tr id="dataTr" height="30">
	        	<td width="25" class="txt_center" id='listSeq'></td>
	        	<td width="100" class="txt_center">
		        	<input id="menuName" name="menuName" class="required" title="중메뉴명" style="width:95%;" maxLength="50" type="text" />
		        	<input type="hidden" id="dataMode" name="dataMode" value="" />
		        	<input type="hidden" id="menu_id" name="menu_id" value="0" />
		        </td>
        </tr>
        </table>
     </div>
     <div class="Right_content_title_table" id="Right_content_title">
     	<table style="width:470px; table-layout:fixed" class="Normal_table">
     		<tr>
        		<th width="80">권한</th>
        		<th width="80">순&ensp;서</th>
        		<th width="200">URL</th>
        		<th width="200">이미지</th>
        	</tr>
        </table>
     </div>
     <div class="Right_content_table" id="Right_content">                            
        <table style="width:450px; table-layout:fixed" class="Normal_table" id="table2_2">
	        <tr id="initTr">
	           <td width="80"></td>
	           <td width="200"></td>
	           <td width="80"></td>
	           <td width="180"></td>
	        </tr>
	        <tr id="dataTr" height="30">
	           <td width="80" class="txt_center"><div class="styled-select" style="width:95%;height:95%;"><select id="menu_authority" name="menu_authority" title="권한" style="width:150%;height:100%;" class="required"></select></div></td>
	           <td width="80" class="txt_center"><input id="order_seq" name="order_seq" style="width:95%" title="순 서" maxLength="10" type="tel" /></td>
	           <td width="200" class="txt_center"><input id="menu_url" name="menu_url" style="width:95%" title="URL" maxLength="50" type="text" /></td>
	           <td width="180" class="txt_center"><input id="menu_img_url" name="menu_img_url" style="width:95%" title="이미지" maxLength="50" type="text" /></td>
	        </tr> 
        </table>
     </div>
</form:form> 
<!--  //table end -->

<form:form method="post" id="group3Form" >
	<input type="hidden" id="menu_level" name="menu_level" value="3" />
	<input type='hidden' id='level1_id' name='level1_id' value='0' />
	<input type='hidden' id='level2_id' name='level2_id' value='0' />
	<div class="bottom_content" id="bottom_content">   
		<div class="btn_action">
			<ul>
	        	<li><a href="javascript:pfn_table_addRow('def','0','I')"><img src="<c:url value='/images/btn/btn_plus_on.gif'/>" alt="추가"/></a></li>
		        <li><a href="javascript:pfn_table_dropRow('def','0')"><img src="<c:url value='/images/btn/btn_del_on.gif'/>" alt="삭제"/></a></li>
		        <li><a href="javascript:pfn_saveGroup('def','0')"><img src="<c:url value='/images/btn/btn_save_on.gif'/>" alt="저장"/></a></li>
	     	</ul>
     	</div>
	</div>
	<div class="bottom_content_table">
		<table class="Normal_table" id="table3">
			<tr id="titleTr">
				<th width="35">No</th>
				<th width="100">대메뉴</th>
				<th width="100">중메뉴</th>
				<th width="100">소메뉴</th>
				<th width="80">권한</th>
				<th width="80">순 서 </th>
				<th width="200">URL</th>
				<th width="200">이미지</th>
			</tr>
			<tr id="initTr">
				<td width="35"></td>
				<td width="100"></td>
				<td width="100"></td>
				<td width="100"></td>
				<td width="80"></td>
				<td width="80"></td>
				<td width="200"></td>
				<td width="200"></td>
	        </tr>
	        <tr id="dataTr" height="30">
	        	<td width="35" class="txt_center"  id='listSeq'></td>
	        	<td width="100" class="txt_center" id='level1Name'></td>
	        	<td width="100" class="txt_center" id='level2Name'></td>
	        	<td width="100" class="txt_center">
	        		<input id="menu_name" name="menu_name" class="required" title="소메뉴명" style="width:95%;" maxLength="50" type="text" />
	        		<input type="hidden" id="dataMode" name="dataMode" value="" />
	        		<input type="hidden" id="menu_id" name="menu_id" value="0" />	           
	           	</td>
	           	<td width="80" class="txt_center">
	           		<div class="styled-select" style="width:95%;height:95%;">
	           			<select id="menu_authority" name="menu_authority" style="width:150%;height:100%;" class="required" title="권한"></select>
	           		</div>
	           	</td>
	           	<td width="80" class="txt_center"><input id="order_seq" name="order_seq" style="width:95%" title="순 서" maxLength="10" type="text" /></td>
	           	<td width="200" class="txt_center"><input id="menu_url" name="menu_url" style="width:95%" title="URL" maxLength="50" type="text" /></td>
	           	<td width="200" class="txt_center"><input id="menu_img_url" name="menu_img_url" style="width:95%" title="이미지" maxLength="50" type="text" /></td>
	        </tr>
        </table>
	</div>
	<!--  //table end -->	
  </form:form>                                          
