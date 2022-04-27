<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>
<c:set var="date" value="<%=new Date() %>"/>

<style type="text/css">
	.div_overflow_main {width:100%; height:364px; overflow-x:hidden; overflow-y:scroll;}
	.div_overflow_y_scroll {overflow-y:scroll;}
</style>

<%@ include file="/template/prj/projectStatus" %>

<script src="/js/prj/status/statusfnc.js"></script>
<script src="/js/prj/status/statuspages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				tot:"합계",
				md:"M/D",
				mm:"M/M",
				dataTh:[
					{width:"5%", name:"보고년"}, {width:"4%", name:"보고월"}, {width:"4%", name:"보고주"}, {width:"15%", name:"프로젝트명"},
					{width:"10%", name:"고객사명"}, {width:"7%", name:"성명"}, {width:"5%", name:"직급"}, {width:"5%", name:"고용"},
					{width:"5%", name:"역할"}, {width:"5%", name:"상주상태"}, {width:"3%", name:"월"}, {width:"3%", name:"화"},
					{width:"3%", name:"수"}, {width:"3%", name:"목"}, {width:"3%", name:"금"}, {width:"3%", name:"토"}, {width:"3%", name:"일"}
				]
			}
		});
		
		mkSearchDiv();
		defaultLoadList();
	});
</script>