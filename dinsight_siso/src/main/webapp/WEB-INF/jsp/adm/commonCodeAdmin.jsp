<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ include file="/template/adm/commonCodeAdmin" %>

<script src="/js/adm/code/codepages.js"></script>
<script src="/js/adm/code/codefnc.js"></script>
<script src="/js/adm/code/codepop.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : "#codeAdmin",
			data : {
				leftBtnList : [
					{func:"groupAdd()", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"groupModi()", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"groupDel()", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"}
				],
				rightBtnList : [
					{func:"codeAdd()", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"codeModi()", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"codeDel()", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"}
				],
				groupCode : "그룹코드",
				groupNm : "그룹명",
				code : "코드",
				codeNm : "코드명",
				attr1 : "속성",
				sortOrder : "정렬순서"
			}
		});
		
		defaultLoadList();
	});
</script>
