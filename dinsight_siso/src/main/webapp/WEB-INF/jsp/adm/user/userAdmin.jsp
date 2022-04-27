<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">	.tree_menu span:hover {color:blue; cursor:pointer}</style>

<%@ include file="/template/adm/userAdmin" %>

<script src="/js/adm/user/userpages.js"></script>
<script src="/js/adm/user/userfnc.js"></script>
<script src="/js/adm/user/userpop.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : "#searchForm",
			data : {
				department : "부서명",
				name : "이름",
				loginId : "로그인ID",
				position : "직책",
				emplDiv : "고용구분",
				activeYn : "활성유무",
				delYn : "삭제유무",
				btnList : [
					{func:"divisionAdd()", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"divisionModi()", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"divisionDel()", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"}
				],
				rightBtnList : [
					{func:"userAdd()", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가"},
					{func:"userModi()", btnImg:"/images/btn/btn_modify_on.gif", altText:"수정"},
					{func:"userDel()", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제"},
					{func:"userHead()", btnImg:"/images/btn/btn_approval_on.gif", altText:"ID승인"},
					{func:"userPass()", btnImg:"/images/btn/btn_reset_on.gif", altText:"패스워드 초기화"}
				]
			}
		});
		
		getEls();
		defaultLoadList();
	});
</script>