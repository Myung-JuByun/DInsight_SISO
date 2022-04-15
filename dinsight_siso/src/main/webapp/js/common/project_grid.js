//전역변수
/*
 * g_min_rowCnt         : 테이블의 스크롤 생성전 데이터 row 수
 * g_table              : 기본 테이블 목록
 * g_fix_colm_table     : 틀고정 테이블의 고정테이블
 * g_fix_data_table     : 틀고정 테이블의 데이터테이블
 * g_fix_colm_div       : 틀고정 테이블의 고정테이블 내용부분 DIV
 * g_fix_data_list_div  : 틀고정 테이블의 데이터테이블 내용부분 DIV
 * g_fix_data_title_div : 틀고정 테이블의 데이터테이블 제목부분 DIV
 */
var g_min_rowCnt;  
var g_def_table;
var g_fix_colm_table;
var g_fix_data_table;
var g_fix_colm_div;
var g_fix_data_list_div;
var g_fix_data_title_div;

//테이블 초기화
function fn_table_init() {
	//기본 테이블 초기화
	for (var i=0;i<g_def_table.length;i++ ) {
		fn_def_table_init(g_def_table[i]);
	}
	
	//틀고정 테이블 초기화
	for (var i=0;i<g_fix_colm_table.length;i++ ) {
		fn_fix_table_init(g_fix_colm_table[i],g_fix_data_table[i]);
	}
	
	//틀고정 테이블 div 초기화
	for (var i=0;i<g_fix_colm_div.length;i++ ) {
		fn_scrollMoveControll(i);
	}
}

//기본 테이블 초기화
function fn_def_table_init (table_id) {
	table_init_css(table_id);
	
	table_init_event(table_id);
}

/* 화면 로드시 틀고정 테이블  처리 */
function fn_fix_table_init(table_id,with_table_id) {
	var table_list = table_id + ',#' + with_table_id;
	table_init_css(table_list);
	
	table_init_event(table_id);
}

//테이블 초기화 css
function table_init_css(table_id) {
	$('#'+table_id).find(' #initTr,#dataTr').css("display", "none");
}

//테이블 이벤트
function table_init_event(table_id) {
	$('#'+table_id).bind("mouseout" , function(e){
		if (e.type == "mouseout") {
			$('#'+table_id).find(' tr').removeClass("mouse_over");
		}
	});
}

//화면 로드시 틀고정 테이블의 scroll 처리
function fn_scrollMoveControll(table_index) {
	 
	var fix_data_list_div  = g_fix_data_list_div[table_index];
	var fix_colm_div       = g_fix_colm_div[table_index];
	var fix_data_title_div = g_fix_data_title_div[table_index];
	
	 $('#'+fix_data_list_div).scroll(function () {
		 var top_point  = $('#'+fix_data_list_div).scrollTop();
		 var left_point = $('#'+fix_data_list_div).scrollLeft();

		 $('#'+fix_colm_div      ).animate({scrollTop:top_point}, 0);
		 $('#'+fix_data_title_div).animate({scrollLeft:left_point}, 0);
	});
}

//틀고정 테이블의 scroll 강제 이동 처리
function fn_scrollMove(object_id,add_top_point,add_left_point) {
   var top_point  = $('#'+object_id).scrollTop()  + add_top_point;
   var left_point = $('#'+object_id).scrollLeft() + add_left_point;
   
   $('#'+object_id).animate({scrollTop:top_point}, 0);
   $('#'+object_id).animate({scrollLeft:left_point}, 0);
   
}

//틀고정 테이블의 scroll 동기화
function fn_scrollSync(table_index) {
	fix_data_list_div  = g_fix_data_list_div[table_index];
	fix_colm_div       = g_fix_colm_div[table_index];
	fix_data_title_div = g_fix_data_title_div[table_index];
	
	var top_point  = $('#'+fix_data_list_div).scrollTop();
	var left_point = $('#'+fix_data_list_div).scrollLeft();
	 
	$('#'+fix_colm_div      ).animate({scrollTop:top_point  }, 0);
	$('#'+fix_data_title_div).animate({scrollLeft:left_point}, 0);
}

//틀고정 테이블의 행추가
function fn_fix_table_addRow(table_index,mode){
	var fix_colm_table        = g_fix_colm_table[table_index];
	var fix_data_table        = g_fix_data_table[table_index];
	var fix_data_list_div     = g_fix_data_list_div[table_index];
	var fix_table_list        = fix_colm_table + ",#" + fix_data_table;
	var after_function = "";
	
	/* 틀고정을 위해서 추가한 tr 삭제 */
	if ($('#'+fix_colm_table + " tr").length == $('#'+fix_data_table + " tr").length + 1) {
		$('#'+fix_colm_table + " tr:last").remove();  
	}
	
	/* 데이터 row no 설정 */
    var listSeq = $('#'+fix_colm_table + " tr:not(.titleTr,#initTr,#dataTr,#delTr):last #listSeq").html();
    
    if (isEmptyOrNull(listSeq)) {
    	listSeq = "0";
    }
	
	/* 틀고정 기준 테이블 tr 추가 */
	var init_rowHtml_after = "<tr>" + $('#'+fix_colm_table + ' #dataTr').html() +  "</tr>";
	$('#'+fix_colm_table).append(init_rowHtml_after);
	
	/* 데이터 테이블 tr 추가 */
	var data_rowHtml_after = "<tr>" + $('#'+fix_data_table + ' #dataTr').html() + "</tr>";
	$('#'+fix_data_table).append(data_rowHtml_after);
	
	/* 데이터 row no 설정 */
    $('#'+fix_colm_table+' tr:last #listSeq').html(parseInt(listSeq)+1);
    
    /* 테이블 input 관련  기본값 및 css 처리 */
    fn_row_input_set($('#'+fix_colm_table + ' tr:last'),$('#'+fix_table_list).find(' tr:last'),mode);
    
	//틀고정에 대한 스크롤 위치을 맞추기 위한 빈 tr 추가
	if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length >= g_min_rowCnt +1 ) {
	   var init_rowHtml = "<tr>" + $('#'+fix_colm_table + ' #initTr').html() + "</tr>";
	   $('#'+fix_colm_table).append(init_rowHtml);
	}
	
	//TR 관련 이벤트 처리
	$('#'+fix_table_list).find('tr:last').bind("mouseover click change" , function(e){
		after_function = "pfn_" + fix_colm_table + "_"+e.type;
		var after_function_param = [$(this).index(),table_index,mode];
		
		if (e.type == "mouseover") {
			fn_table_mouseover(fix_table_list,$(this).index(),table_index,after_function_param,after_function);
		} else if (e.type == "click") {
			fn_table_click(fix_table_list,$(this).index(),table_index,after_function_param,after_function);
		} else if (e.type == "change") {
			fn_table_change(fix_table_list,$(this).index(),table_index,after_function_param,after_function);
		}
	});
	
	//그리드에 콤보관련 이벤트 처리
	$('#'+fix_table_list).find('tr:last select').bind("mousedown" , function(e){
		if (e.type == "mousedown") {
			fn_table_mousedown($(this));
		}
	});
	
	//tr 추가시 스크롤 위치를 조정한다.
	// listSeq * 33 현재 스크롤 위치에 상관없이 최대값을 설정해 최하단으로 이동
	if (!isEmptyOrNull(fix_data_list_div)) {
	   if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length == g_min_rowCnt +1 ) {
	      fn_scrollMove(fix_data_list_div,18,0);	
	   } else {
		  fn_scrollMove(fix_data_list_div,listSeq * 33,0);
	   }
	   
	   //스크롤 위치 동기화 처리
	   fn_scrollSync(table_index);
	}
} 

//일반 테이블의 행추가
function fn_def_table_addRow(table_index,mode){
	var table_id       = g_def_table[table_index];
	var after_function = "";
	
	/* 데이터 row no 설정 */
    var listSeq = $('#'+table_id + " tr:not(.titleTr,#initTr,#dataTr,#delTr):last #listSeq").html();
    if (isEmptyOrNull(listSeq)) {
    	listSeq = "0";
    }
	
	/* 데이터 테이블 tr 추가 */
	var data_rowHtml_after = "<tr>" + $('#'+table_id + ' #dataTr').html() + "</tr>";
	$('#'+table_id).append(data_rowHtml_after);
	
    $('#'+table_id +' tr:last #listSeq').html(parseInt(listSeq)+1);
    
    /* 테이블 input 관련  기본값 및 css 처리 */
    fn_row_input_set($('#'+table_id + ' tr:last'),$('#'+table_id).find(' tr:last'),mode);
    
	//TR 관련 이벤트 처리
	$('#'+table_id).find('tr:last').bind("mouseover click change" , function(e){
		after_function = "pfn_" + table_id + "_"+e.type;
		var after_function_param = [$(this).index(),table_index,mode];
		
		if (e.type == "mouseover") {
			fn_table_mouseover(table_id,$(this).index(),table_index,after_function_param,after_function);
		} else if (e.type == "click") {
			fn_table_click(table_id,$(this).index(),table_index,after_function_param,after_function);
		} else if (e.type == "change") {
			fn_table_change(table_id,$(this).index(),table_index,after_function_param,after_function);
		}
	});
	
	//그리드에 콤보관련 이벤트 처리
	$('#'+table_id).find('tr:last select').bind("mousedown" , function(e){
		if (e.type == "mousedown") {
			fn_table_mousedown($(this));
		}
	});
} 

//테이블의 행추가시 css 및 공통값 설정
function fn_row_input_set(colm_object,all_object,mode) {
	if (mode == "S") {
		$(colm_object).find('#dataMode').val(mode);
	    
		fn_row_input_css(all_object,false);
	} else if (mode == "I") {
		$(colm_object).find('#dataMode').val(mode);
        
        fn_row_input_css(all_object,true);
	} else if (mode == "D") {
		$(colm_object).find('#dataMode').val(mode);
	}
}

//테이블의 행추가시 css 설정
function fn_row_input_css(object_id,input_yn) {
	
	if (input_yn) {
		$(object_id).find('input' ).css('border-width', '1px');
	} else {
		$(object_id).find('input' ).css('border-width', '0px');
		$(object_id).find('select').css('border-width', '0px');
	}
}

//테이블 마우스 오버 이벤트
function fn_table_mouseover(table_list,object_index,table_index,after_function_param,after_function) {
	$('#'+table_list).find(' tr').removeClass("mouse_over");
	
	if ($('#'+table_list).find('tr:eq(' + object_index + ')').attr('class') != 'on_click') {
		$('#'+table_list).find('tr:eq(' + object_index + ')').attr('class','mouse_over');
	}
	
	try {
		fn_afterFunction(after_function,after_function_param);
	} catch(e) {
		
	}
}

//테이블 마우스 클릭 이벤트 
function fn_table_click(table_list,object_index,table_index,after_function_param,after_function) {
	
	$('#'+table_list).find(' tr').removeClass("on_click");
	
	$('#'+table_list).find('tr:eq(' + object_index + ')').attr('class','on_click');
	
	try {
		fn_afterFunction(after_function,after_function_param);
	} catch(e) {
		
	}
	
	fn_row_input_css($('#'+table_list).find('tr:eq(' + object_index + ')'),true);
	
}

//테이블 수정시 이벤트 
function fn_table_change(table_list,object_index,table_index,after_function_param,after_function) {
	var mode = $('#'+table_list).find('tr:eq(' + object_index + ') #dataMode').val();
	
	if (mode == "S") {
		$('#'+table_list).find('tr:eq(' + object_index + ') #dataMode').val("U");	
	}
	
	try {
		fn_afterFunction(after_function,after_function_param);
	} catch(e) {
		
	}
}


//테이블 마우스 down 시 combo 컨트롤
function fn_table_mousedown(row_object_id) {
	$(row_object_id).css("width", "100%");
	$(row_object_id).css('border-width', '1px');
}

//틀고정 테이블 tr 전체 삭제
function fn_fix_table_allRowDel(table_index) {
	var fix_colm_table        = g_fix_colm_table[table_index];
	var fix_data_table        = g_fix_data_table[table_index];
	var fix_table_list        = fix_colm_table + ",#" + fix_data_table;
	
	fn_table_allRowDel(fix_table_list);
}

//일반 테이블 tr 전체 삭제
function fn_def_table_allRowDel(table_index) {
	var table_id       = g_def_table[table_index];
	
	fn_table_allRowDel(table_id);
}

//테이블 tr 전체 삭제
function fn_table_allRowDel(object_id) {
	$('#'+object_id).find("tr:not(.titleTr,#initTr,#dataTr)").remove();  
}

//틀고정 테이블 tr 삭제
function fn_fix_table_dropRow(table_index,mode) {
	var fix_colm_table    = g_fix_colm_table[table_index];
	var fix_data_table    = g_fix_data_table[table_index];
	var fix_table_list    = fix_colm_table + ",#" + fix_data_table;
	
	//tr 삭제 기준
	//var tr_object_id = 'tr:not(#initTr,#dataTr,#delTr):last'; // 최하위
	var tr_object_id = '.on_click'; // 선택한 tr
	
	if ($('#'+fix_colm_table).find(tr_object_id).length == 0) {
		alert("삭제할 ROW 를 선택해 주세요.");
		return;
	}
	
	//틀고정을 위한 빈 tr 을 제거
	if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length >= (g_min_rowCnt+1)) {
	   $('#'+fix_colm_table + " tr:last").remove();
	}
	
	//삭제할 tr의 mode
	var del_mode = $('#'+fix_colm_table).find(tr_object_id + " #dataMode").val();
	
	//삭제할 tr의 mode
	if (del_mode == "I") {
		$('#'+fix_table_list).find(tr_object_id).remove();
	} else {
		$('#'+fix_table_list).find(tr_object_id).attr("id","delTr");
		$('#'+fix_table_list).find(" #delTr").css("display","none");
		$('#'+fix_colm_table).find(tr_object_id + " #dataMode").val("D");
	}
	
	//틀고정에 대한 스크롤 위치을 맞추기 위한 빈 tr 추가
	if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length >= (g_min_rowCnt+1)) {
		var init_rowHtml_after = "<tr>" + $('#'+fix_colm_table + ' #initTr').html() + "</tr>";
		$('#'+fix_colm_table).append(init_rowHtml_after);
	}
	
	fn_scrollSync(table_index);
	
}

//일반 테이블 tr 삭제
function fn_def_table_dropRow(table_index,mode) {
	var table_id       = g_def_table[table_index];
	var tr_object_id = '.on_click'; // 선택한 tr
	
	if ($('#'+table_id).find(tr_object_id).length == 0) {
		alert("삭제할 ROW 를 선택해 주세요.");
		return;
	}
	
	//삭제할 tr의 mode
	var del_mode = $('#'+table_id).find(tr_object_id + " #dataMode").val();
	
	//삭제할 tr의 mode
	if (del_mode == "I") {
		$('#'+table_id).find(tr_object_id).remove();
	} else {
		$('#'+table_id).find(tr_object_id).attr("id","delTr");
		$('#'+table_id).find(" #delTr").css("display","none");
		$('#'+table_id).find(tr_object_id + " #dataMode").val("D");
	}
}

/* 테이블 tr 삭제
 * 최하위 tr 삭제
 
function fn_fix_table_dropRow(table_index,mode) {
	var fix_colm_table    = g_fix_colm_table[table_index];
	var fix_data_table    = g_fix_data_table[table_index];
	var fix_table_list    = fix_colm_table + ",#" + fix_data_table;
	
	//틀고정을 위한 빈 tr 을 제거
	if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length >= (g_min_rowCnt+1)) {
	   $('#'+fix_colm_table + " tr:last").remove();
	}
	
	//삭제할 tr의 mode
	var del_mode = $('#'+fix_colm_table).find(" tr:not(#initTr,#dataTr,#delTr):last #dataMode").val()
	
	//삭제할 tr의 mode
	if (del_mode == "I") {
		$('#'+fix_table_list).find(" tr:not(#initTr,#dataTr,#delTr):last").remove();
	} else {
		$('#'+fix_table_list).find(" tr:not(#initTr,#dataTr,#delTr):last").attr("id","delTr");
		$('#'+fix_table_list).find(" #delTr").css("display","none");
	}
	
	//틀고정에 대한 스크롤 위치을 맞추기 위한 빈 tr 추가
	if ($('#'+fix_data_table + " tr:not(#initTr,#dataTr,#delTr)").length >= (g_min_rowCnt+1)) {
		var init_rowHtml_after = "<tr>" + $('#'+fix_colm_table + ' #initTr').html() + "</tr>";
		$('#'+fix_colm_table).append(init_rowHtml_after);
	}
	
	fn_scrollSync(table_index);
	
}
*/

//틀고정 테이블 셋팅
/*
function fn_fix_table_set(object_idList,init_rowHtmlList,after_function) {
	for (var i=0;i<object_idList.length;i++) {
		var object_id            = object_idList[i];
		var init_rowHtmlDetail   = init_rowHtmlList[i];
		//테이블의 모든 tr 을 제거한다.
		fn_table_allRowDel(object_id);
		
		//테이블의 모든 tr를 설정한다.
		for (var j=0;j<init_rowHtmlDetail.length;j++) {
		   var init_rowHtml_after = "<tr>" + init_rowHtmlDetail[j] + "</tr>";
		   
		   $('#'+object_id).append(init_rowHtml_after);
		}
		
		//틀고정 테이블의 한 row 추가함(화면에서 스크롤을 맞추기 위함)
		if (i==0) {
			init_rowHtml_after = "<tr>" + $('#'+object_id + ' #initTr').html() + "</tr>";
			$('#'+object_id).append(init_rowHtml_after);
		}
	}
}
*/
//틀고정 테이블 빈공백 초기화 
/*
function fn_fix_table_init(object_idList,min_rowCnt,after_function) {
	table_init_css();
	
	/* 빈 공백 채우기 
	for (var i=0;i<object_idList.length;i++) {
		var object_id            = object_idList[i];
		var init_rowHtml_after = "<tr>" + $('#'+object_idList[i] + ' #initTr').html() + "</tr>";
		
		//테이블의 모든 tr 을 제거한다.
		fn_table_allRowDel(object_id);
		
		//테이블의 모든 tr를 설정한다.
		for (var j=0;j<min_rowCnt;j++) {
		   $('#'+object_id).append(init_rowHtml_after);
		}
		
		if (i==0) {
			init_rowHtml_after = "<tr>" + $('#'+object_id + ' #initTr').html() + "</tr>";
			$('#'+object_id).append(init_rowHtml_after);
		}
	}
}
*/
