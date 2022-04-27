
//전역변수
/*
 * g_domain             : 페이지 호출시 기본경로
 */

var g_domain;

// 메인화면 로그인창 열기
function fn_openLayer(IdName, tpos, lpos){
	var pop = document.getElementById(IdName);
	Object.assign(pop.style, {display:"block", top:tpos + "px", left:lpos + "px"});
}

// 메인화면 로그인창 닫기
function fn_closeLayer(IdName){
	var pop = document.getElementById(IdName);
	pop.style.display = "none";
}	

//메인화면 로그인창 관리
(function (b) {
    b.fn.bPopup = function (z, F) {
        function K() {        	
            a.contentContainer = b(a.contentContainer || c);
            
            switch (a.content) {
            case 'iframe':
                var h = b('<iframe class="b-iframe" ' + a.iframeAttr + '></iframe>');
                h.appendTo(a.contentContainer);
                r = c.outerHeight(!0);
                s = c.outerWidth(!0);
                A();
                h.attr('src', a.loadUrl);
                k(a.loadCallback);
                break;
            case 'image':
                A();
                b('<img />') .load(function () {
                    k(a.loadCallback);
                    G(b(this));
                }) .attr('src', a.loadUrl) .hide() .appendTo(a.contentContainer);
                break;
            default:
                A(),
                b('<div class="b-ajax-wrapper"></div>') .load(a.loadUrl, a.loadData, function () {
                    k(a.loadCallback);
                    G(b(this));
                }) .hide() .appendTo(a.contentContainer);
            }
            
        }
        function A() {
            a.modal && b('<div class="b-modal ' + e + '"></div>') .css({
                backgroundColor: a.modalColor,
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0,
                zIndex: a.zIndex + t
            }) .appendTo(a.appendTo) .fadeTo(a.speed, a.opacity);
            D();
            c.data('bPopup', a) .data('id', e) .css({
                left: 'slideIn' == a.transition || 'slideBack' == a.transition ? 'slideBack' == a.transition ? g.scrollLeft() + u : - 1 * (v + s)  : l(!(!a.follow[0] && m || f)),
                position: a.positionStyle || 'absolute',
                top: 'slideDown' == a.transition || 'slideUp' == a.transition ? 'slideUp' == a.transition ? g.scrollTop() + w : x + - 1 * r : n(!(!a.follow[1] && p || f)),
                'z-index': a.zIndex + t + 1
            }) .each(function () {
                a.appending && b(this) .appendTo(a.appendTo);
            });
            
            H(!0);
        }
        function q() {
        	/*
        	a.modal && b('.b-modal.' + c.data('id')) .fadeTo(a.speed, 1, function () {
                b(this) .remove()
            });
            a.scrollBar || b('html') .css('overflow', 'auto');
            b('.b-modal.' + e) .unbind('click');
            g.unbind('keydown.' + e);
            d.unbind('.' + e) .data('bPopup', 0 < d.data('bPopup') - 1 ? d.data('bPopup') - 1 : null);
            c.undelegate('.bClose, .' + a.closeClass, 'click.' + e, q) .data('bPopup', null);
            H();
        	*/
            return !1;
        }
        function G(h) {
            var b = h.width(),
            e = h.height(),
            d = {
            };
            a.contentContainer.css({
                height: e,
                width: b
            });
            e >= c.height() && (d.height = c.height());
            b >= c.width() && (d.width = c.width());
            r = c.outerHeight(!0);
            s = c.outerWidth(!0);
            D();
            a.contentContainer.css({
                height: 'auto',
                width: 'auto'
            });
            d.left = l(!(!a.follow[0] && m || f));
            d.top = n(!(!a.follow[1] && p || f));
            c.animate(d, 250, function () {
                h.show();
                B = E();
            });
        }
        function L() {
            d.data('bPopup', t);
            c.delegate('.bClose, .' + a.closeClass, 'click.' + e, q);
            a.modalClose && b('.b-modal.' + e) .css('cursor', 'pointer') .bind('click', q);
            M || !a.follow[0] && !a.follow[1] || d.bind('scroll.' + e, function () {
                B && c.dequeue() .animate({
                    left: a.follow[0] ? l(!f)  : 'auto',
                    top: a.follow[1] ? n(!f)  : 'auto'
                }, a.followSpeed, a.followEasing)
            }) .bind('resize.' + e, function () {
                w = y.innerHeight || d.height();
                u = y.innerWidth || d.width();
                if (B = E()) clearTimeout(I),
                I = setTimeout(function () {
                    D();
                    c.dequeue() .each(function () {
                        f ? b(this) .css({
                            left: v,
                            top: x
                        })  : b(this) .animate({
                            left: a.follow[0] ? l(!0)  : 'auto',
                            top: a.follow[1] ? n(!0)  : 'auto'
                        }, a.followSpeed, a.followEasing);
                    });
                }, 50);
            });
            a.escClose && g.bind('keydown.' + e, function (a) {
                27 == a.which && q();
            });
        }
        function H(b) {
            function d(e) {
                c.css({
                    display: 'block',
                    opacity: 1
                }) .animate(e, a.speed, a.easing, function () {
                    J(b);
                });
            }
            switch (b ? a.transition : a.transitionClose || a.transition) {
            case 'slideIn':
                d({
                    left: b ? l(!(!a.follow[0] && m || f))  : g.scrollLeft() - (s || c.outerWidth(!0)) - C
                });
                break;
            case 'slideBack':
                d({
                    left: b ? l(!(!a.follow[0] && m || f))  : g.scrollLeft() + u + C
                });
                break;
            case 'slideDown':
                d({
                    top: b ? n(!(!a.follow[1] && p || f))  : g.scrollTop() - (r || c.outerHeight(!0)) - C
                });
                break;
            case 'slideUp':
                d({
                    top: b ? n(!(!a.follow[1] && p || f))  : g.scrollTop() + w + C
                });
                break;
            default:
                c.stop() .fadeTo(a.speed, b ? 1 : 0, function () {
                    J(b)
                })
            }
        }
        function J(b) {
            b ? (L(), k(F), a.autoClose && setTimeout(q, a.autoClose))  : (c.hide(), k(a.onClose), a.loadUrl && (a.contentContainer.empty(), c.css({
                height: 'auto',
                width: 'auto'
            })))
        }
        function l(a) {
            return a ? v + g.scrollLeft()  : v
        }
        function n(a) {
            return a ? x + g.scrollTop()  : x
        }
        function k(a) {
            b.isFunction(a) && a.call(c)
        }
        function D() {
            x = p ? a.position[1] : Math.max(0, (w - c.outerHeight(!0)) / 2 - a.amsl);
            v = m ? a.position[0] : (u - c.outerWidth(!0)) / 2;
            B = E()
        }
        function E() {
            return w > c.outerHeight(!0) && u > c.outerWidth(!0)
        }
        b.isFunction(z) && (F = z, z = null);
        var a = b.extend({
        }, b.fn.bPopup.defaults, z);
        a.scrollBar || b('html') .css('overflow', 'hidden');
        var c = this,
        g = b(document),
        y = window,
        d = b(y),
        w = y.innerHeight || d.height(),
        u = y.innerWidth || d.width(),
        M = /OS 6(_\d)+/i.test(navigator.userAgent),
        C = 200,
        t = 0,
        e,
        B,
        p,
        m,
        f,
        x,
        v,
        r,
        s,
        I;
        c.close = function () {
           a = this.data('bPopup');
           e = d.data('bPopup');
           q()	
        };
        return c.each(function () {
            b(this) .data('bPopup') || (k(a.onOpen), t = (d.data('bPopup') || 0) + 1, e = '__b-popup' + t + '__', p = 'auto' !== a.position[1], m = 'auto' !== a.position[0], f = 'fixed' === a.positionStyle, r = c.outerHeight(!0), s = c.outerWidth(!0), a.loadUrl ? K()  : A())
        })
    };
    b.fn.bPopup.defaults = {
        amsl: 50,
        appending: !0,
        appendTo: 'body',
        autoClose: !1,
        closeClass: 'b-save',
        content: 'ajax',
        contentContainer: !1,
        easing: 'swing',
        escClose: !0,
        follow: [
            !0,
            !0
        ],
        followEasing: 'swing',
        followSpeed: 500,
        iframeAttr: 'scrolling="no" frameborder="0"',
        loadCallback: !1,
        loadData: !1,
        loadUrl: !1,
        modal: !0,
        modalClose: !0,
        modalColor: '#000',
        onClose: !1,
        onOpen: !1,
        opacity: 0.7,
        position: [
            'auto',
            'auto'
        ],
        positionStyle: 'absolute',
        scrollBar: !0,
        speed: 250,
        transition: 'fadeIn',
        transitionClose: !1,
        zIndex: 9997
    }
}) (jQuery);

//금일 기준으로 날자 계산 
function to_day_Gap(field,amount) {
	var today = new Date();
	var today_year = today.getFullYear();
	var today_month = today.getMonth() + 1 + "";
	var today_day = today.getDate() + "";
	
	if (today_month < 10) {
		today_month = "0" + today_month;
	}
	
	if (today_day < 10) {
		today_day = "0" + today_day;
	}
	
	var dateParam = today_year + "-" + today_month + "-" + today_day;
	
	return getDateGap(field, amount, dateParam, 'yyyy-MM-dd');
}

//-----------------------------------------------------------------------------
//Date 날짜 계산 헬퍼.
//- field     : "D" - 일, "W" - 주, "M" - 월, "Y" - 년 (대소문자 구분 없음)
//- amount    : DIFF 값
//- dateParam : 날짜 (string형);
//- format    : 날짜 포맷
//- "yyyy" - 년
//- "MM" - 월
//- "dd" - 일
//- "hh" - 시
//- "mm" - 분
//- "ss" - 초
//@return : 날짜
//-----------------------------------------------------------------------------
function getDateGap(field, amount, dateParam, format) {
 var date1;
 var format;

 if (!(new RegExp(/^[YMWD]$/i).test(field))) {
     alert("getDateGap(): Invaild field mark specified.");
     return;
 }

 if (!dateParam) {
     alert("getDateGap(): date param is null.");
     return;
 }

 if (typeof (dateParam) == "string") {
     date1 = dateParam.toDate();
 }

 var instrestedDate = date1;

 format = (format) ? format : "yyyy-MM-dd";
 field = field.toUpperCase();

 switch (field) {
 case "Y":
     instrestedDate.setYear(instrestedDate.getFullYear() + amount);
     break;

 case "M":
     instrestedDate.setMonth(instrestedDate.getMonth() + amount);
     break;

 case "W":
     instrestedDate.setDate(instrestedDate.getDate() + (amount * 7));
     break;

 case "D":
     instrestedDate.setDate(instrestedDate.getDate() + amount);
     break;
 }

 return instrestedDate.format(format);
};

//-----------------------------------------------------------------------------
//주어진 폼(form)의 필수 입력 필드 누락여부를 확인
//@return : none
//-----------------------------------------------------------------------------

function fn_multi_fix_validateRequiredFields(form,table_index) {
	 var fix_colm_table    = g_fix_colm_table[table_index];
	 var fix_data_table    = g_fix_data_table[table_index];
	 var table_id          = fix_colm_table + ",#" + fix_data_table;
	 var requiredFields = $("#"+ table_id).find(" tr:not(#initTr,#dataTr,#delTr) input.required");
	 var inputFields    = $("#"+ table_id).find(" tr:not(#initTr,#dataTr,#delTr) input");
	 
	 var return_value = fn_validateRequiredFields(table_id,requiredFields,inputFields)

	return return_value;
};
function fn_multi_def_validateRequiredFields(form,table_index) {
   var table_id       = g_def_table[table_index];
   var requiredFields = $("#"+ table_id).find(" tr:not(#initTr,#dataTr,#delTr) input.required");
   var inputFields    = $("#"+ table_id).find(" tr:not(#initTr,#dataTr,#delTr) input");
   
   var return_value = fn_validateRequiredFields(table_id,requiredFields,inputFields)
   return return_value;
};
function fn_validateRequiredFields(table_id,requiredFields,inputFields) {
	
	
	var procCnt = 0;
	 
	 $("#"+table_id).find(" #dataMode").each(function(i) {
	    if ($(this).val() == 'I' || $(this).val() == 'U' || $(this).val() == 'D') {
	       procCnt++;
	    }
	});
	 
	if (procCnt == 0) {
		
	   alert(errors.no.data);
	   return false;
	}
	 
	for (var i = 0; i < requiredFields.length; i++) {
	   var o = requiredFields[i];
	     
	   if (isEmptyOrNull($(o))) {
		  alert(errors.required($(o).attr("title")));
	      $(o).focus();
	         
	      return false;
	   }
	}
	
	for (var i = 0; i < inputFields.length; i++) {
		var o = inputFields[i];
		
		var maxbyte = 0;
		var txtType = "";
		
		try {
			maxbyte = parseInt($(o).attr("maxbyte"));
			txtType = $(o).attr("txtType");
		} catch(e) {
			maxbyte = 0;
			txtType = "0";
		}
		
		if (txtType == "int") {
		   if (!$(o).attr("value").isNumeric()) {
		      alert(errors.numbers($(o).attr("title")));
		      $(o).focus();
				
			   return false;	
		   }
		}
		
		if (maxbyte > 0 ) {
		   if ($(o).attr("value").byteLength() > maxbyte) {
		      alert(errors.max.byte(maxbyte,$(o).attr("title")));
		      $(o).focus();
	          
		      return false;
		   }
		}
	}
	
	return true;
};
//공통코드콤보 설정
function fn_createCombo(group_id,object_id,all_yn){
	var comboUrl = g_domain + "cmmn/selectCmnCodeCombo";
	var paramId    = ["groupId","groupName"];
	var paramValue = [group_id,$('#'+object_id).attr("title")];
	var mode       = "def";
	
	fn_createComboAjax(comboUrl,paramId,paramValue,mode,object_id,all_yn);
};
//메뉴콤보 설정
function fn_createMenuGroupCombo(group_level,group_id,object_id,all_yn) {
	var comboUrl = g_domain + "cmmn/selectCmnMenuCombo";
	var paramId    = ["groupLevel","groupId","groupName"];
	var paramValue = [group_level  ,group_id ,$('#'+object_id).attr("title")];
	var mode       = "def";
	
	fn_createComboAjax(comboUrl,paramId,paramValue,mode,object_id,all_yn);
};
//날자 콤보 설정
function fn_dateCombo(object_id, fr_date, to_date,all_yn) {
	 
	 var combo_id   = Array();
	 var combo_name = Array();
	 var group_id   = Array();
	 var mode       = "def";
	 var max_group  = 0;
	 
	 for (var i=0;i<getDiffDays(fr_date, to_date)+1;i++) {
		 group_id[i]   = "0";
		 combo_id[i]   = getDateGap("D", i, fr_date, 'yyyyMMdd');
		 combo_name[i] = getDateGap("D", i, fr_date, 'yyyy-MM-dd');
	 }
	 
	 fn_createComboSet(object_id,combo_id,combo_name,group_id,max_group,mode,all_yn);
	 
};
//카테고리 콤보 설정
function fn_createExpCategoryCombo(group_level,group_id,object_id,all_yn) {
	var comboUrl   = g_domain + "cmmn/selectCmnExpCategoryCombo";
	var paramId    = ["groupLevel","groupId","groupName"];
	var paramValue = [group_level  ,group_id ,$('#'+object_id).attr("title")];
	var mode       = "def";
	
	if (group_level == "0") {
		mode = "grp";
	}
	
	fn_createComboAjax(comboUrl,paramId,paramValue,mode,object_id,all_yn);
};
//메뉴이동 처리
function fn_pageMove(menu_id,menu_url) {
	var comboUrl = g_domain + "cmmn/selectPageInfo";
	var paramId    = ["menu_id","menu_url"];
	var paramValue = [menu_id  ,menu_url];
	
	var after_function_id    = "fn_pageMoveAction";
	var after_function_param = [menu_id,menu_url];
	fn_callAjaxParam(comboUrl,paramId,paramValue,after_function_id,after_function_param);
};
//메뉴콤보 설정
//menu_url 오류시 이동하는 페이지 url
function fn_pageMoveAction(json,menu_id,menu_url) {
	var resultData    = json.GetResultData;
	var resultErrorYn = json.GetResultErrorYn;
	var menu_url      = resultData.menu_url;
	var menu_level    = resultData.menu_level;
	var subMenuObj    = resultData.subMenu;
	var subMenulength = "";
	var level2Obj     = $('.menu'+ " #level2Menu");
	
	if(resultData.subMenu)subMenulength = resultData.subMenu.length;
	
	//menu_url=null , menu_level = 0 인 경우에는 화면에 접근불가능한 경우
	//menu_url!=null : 정상적인 페이지 이동 및 오류시 페이지 이동
	if (isEmptyOrNull(menu_url)) {
		if (menu_level == "1") {
			//초기화
			level2Obj.html(''); 
			
			//level2 menu 설정
			for (var i=0;i<subMenulength;i++) {
				var menuId   = subMenuObj[i].menu_id;
				var menuUrl  = subMenuObj[i].menu_url;
				var menuName = subMenuObj[i].menu_name;
				var call_function = "fn_pageMove('"+menuId+"','"+menuUrl+"')";

				level2Obj.append("<li><a href=javascript:"+call_function+">"+menuName+"</a></li>");
			}
		} else if (menu_level == "2") {
		  //차후에 3 level 디자인이 나오면 설정한다.	
		}
	} else {
		if(menu_url.startsWith("/")){
			menu_url = menu_url.substring(1);
    	}
		
		location.href = g_domain + menu_url;
	} 
};
function fn_layoutMove(menu_level,menu_url) {
	
};
//AJAX 파라미터 기준 호출
function fn_callAjaxParam(comboUrl,paramId,paramValue,after_function_id,after_function_param){
	var paramData = "";
	
    $.ajax({
    type: "POST",
    url: comboUrl,
    data: { "paramId[]" : paramId , "paramValue[]" : paramValue },
    async: false,
	    success: function(msg){
	       var json                  = eval('(' + msg + ')');
           var jsonlength            = json.GetResultData.length;           
           var resultErrorYn         = json.GetResultErrorYn;
           var resultMsg             = json.GetResultMsg;
           var resultErrorMoveUrl    = json.GetResultErrorMoveUrl;                               
            
           //호출 결과 관련 선처리
           fn_ajax_result(json);
            
           //후처리 함수 호출
           fn_ajax_afterFunction(json,after_function_id,after_function_param);
	    } // success
    });	
};
//AJAX 파라미터 기준 호출
function fn_callAjaxForm(comboUrl,formId,after_function_id,after_function_param) {
	
	$.ajax({
    type: "POST",
    url: comboUrl,
    data: $('#' + formId).serialize(),
    async: false,
	    success: function(msg){
	    	var json                  = eval('(' + msg + ')');
            var jsonlength            = json.GetResultData.length;           
            var resultErrorYn         = json.GetResultErrorYn;
            var resultMsg             = json.GetResultMsg;
            var resultErrorMoveUrl    = json.GetResultErrorMoveUrl; 
            
            //호출 결과 관련 선처리
            fn_ajax_result(json);
            
            //후처리 함수 호출
            fn_ajax_afterFunction(json,after_function_id,after_function_param);
	    }
    });	
};
//AJAX 파라미터 기준 호출
function fn_callFileUpAjaxForm(comboUrl,formId,after_function_id,after_function_param) {

	$.ajax({
			type: "POST",
		    url: comboUrl,
		    data: $('#' + formId).serialize(),
		    async: false,
		    enctype:'multipart/form-data',
		    success: function(msg){
		    	var json                  = eval('(' + msg + ')');
	            var jsonlength            = json.GetResultData.length;           
	            var resultErrorYn         = json.GetResultErrorYn;
	            var resultMsg             = json.GetResultMsg;
	            var resultErrorMoveUrl    = json.GetResultErrorMoveUrl; 
	            
	            //호출 결과 관련 선처리
	            fn_ajax_result(json);
	            
	            //후처리 함수 호출
	            fn_ajax_afterFunction(json,after_function_id,after_function_param);
		    }
	 });
};
//AJAX 공통코드 콤보 생성
function fn_createComboAjax(comboUrl,paramId,paramValue,mode,object_id,all_yn){
	var after_function_id    = "fn_createComboHtml";
	var after_function_param = [object_id,all_yn,mode];
	fn_callAjaxParam(comboUrl,paramId,paramValue,after_function_id,after_function_param);
};	
//AJAX 데이터로 콤보박스 그리기
function fn_createComboHtml(json,object_id,all_yn,mode){
	
	var jsonlength = json.GetResultData.length;
	var group_id    = Array();
	var combo_id    = Array();
	var combo_name  = Array();
	var max_group   = 0;
	
	for(var i=0; i<jsonlength; i++){  
		group_id[i]   = parseInt(json.GetResultData[i].group_id);
		combo_id[i]   = json.GetResultData[i].code_id;
		combo_name[i] = json.GetResultData[i].code_name;
		
		if (group_id[i] > max_group) {
			max_group = group_id[i];
		}
	}
	
	fn_createComboSet(object_id,combo_id,combo_name,group_id,max_group,mode,all_yn);
};
//input 데이터로 콤보박스 그리기
function fn_createComboSet(object_id,combo_id,combo_name,group_id,max_group,mode,all_yn){
	
	//콤보박스  초기화
	fn_combo_allRowDel(object_id);
	
	//최상단 row 추가
	if (all_yn == 'Y') {
		try {
			$('#'+object_id).append("<option value=''>"+page.all+"</option>");
		} catch(e) {
			
		}
	}
	
	try {
		for(var i=0; i<combo_id.length; i++){  
		    var isOverLap    = false; 		
			var code_id      = combo_id[i];
			var code_name    = combo_name[i];
			var group_level  = group_id[i];
			
			if (mode == "def") {
			   $('#'+object_id).append("<option value='"+code_id+"'>"+code_name+"</option>");	
			} else if (mode == "grp") {
				var level_point = "";
				
			   for (var j=2;j<=group_level;j++) {
				   level_point = "&nbsp;" + level_point;
			   }
			   
			   code_name = level_point + code_name;
			   
			   if (max_group == group_level) {
				   $('#'+object_id).append("<option value='"+code_id+"'>&nbsp;&nbsp;"+code_name+"</option>");
			   } else {
				   $('#'+object_id).append("<optgroup label='"+code_name+"'>" + "</optgroup>");
			   }
			}
		}
	} catch(e) {
		alert(e);
	}
};
//콤보박스  초기화
function fn_combo_allRowDel(object_id) {
   $('#'+object_id + ' option' ).remove();
}

//ajax 호출 결과 관련 선처리
function fn_ajax_result(json) {
   var resultErrorYn         = json.GetResultErrorYn;
   var resultMsg             = json.GetResultMsg;
   var resultErrorMoveUrl    = json.GetResultErrorMoveUrl; 

   if (resultErrorYn) {
      if (!isEmptyOrNull(resultMsg)) {
         //alert(resultMsg);
    	  generalPopOk(resultMsg, function(){
    		  location.href="/";
    	  });
      }
      
      if (!isEmptyOrNull(resultErrorMoveUrl)) {
         if(resultErrorMoveUrl.startsWith("/")){
    	    resultErrorMoveUrl = resultErrorMoveUrl.substring(1);
    	 }
    	 
         actionUrl = g_domain + resultErrorMoveUrl;   
         
         location.href = actionUrl;
      }
   } else {
	   if (!isEmptyOrNull(resultMsg)) {
         //alert(resultMsg);
		   generalPopOk(resultMsg);
      }
   }
};
//function , param 정보를 string 형식으로 return
function fn_afterFunction(function_id,param_list) {
	var paramComma = fn_list_param(param_list)
	var function_string = "";
	
	if (!isEmptyOrNull(function_id) && !isEmptyOrNull(paramComma)) {
		eval(function_id + "( " + paramComma + ");");
    }
};
//function , param 정보를 string 형식으로 return
function fn_ajax_afterFunction(json,function_id,param_list) {
	var paramComma = fn_list_param(param_list)
	var function_string = "";
	
	if (!isEmptyOrNull(function_id)) {
       if (isEmptyOrNull(paramComma)) {
          eval(function_id + "( json );");
       } else {
          eval(function_id + "( json , " + paramComma + ");");
       }
    }
};
//param 의 배열정보를 string 형식으로 return
function fn_list_param(param_list) {
	var paramComma = "";
	
	for (var i=0;i<param_list.length;i++) {
		if (i > 0) {
			paramComma = paramComma + ",";
		}
		
		paramComma = paramComma + "'" + param_list[i] + "'"
	}
	
	return paramComma;
};
function fn_fileUp(fileObj) {
	$('#'+fileObj).click();
};