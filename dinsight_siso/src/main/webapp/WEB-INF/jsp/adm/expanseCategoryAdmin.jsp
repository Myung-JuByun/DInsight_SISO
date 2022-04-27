<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ include file="/template/adm/expanseCategoryAdmin" %>

<script src="/js/adm/category/categorypages.js"></script>
<script src="/js/adm/category/categoryfnc.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : "#categoryAdmin",
			data : ({
				btnList : [
					{func:"categoryAdd();", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"categoryModi();", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"categoryDel();", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"}
				],
				categoryNm : "분류명",
				accountClass : "계정과목"
			})
		});
		
		defaultLoadList();
	});
</script>