<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>

<script>
	var login_userid = "<c:out value='${loginVO.user_id}' />";
	
	$(document).ready(function(){
		var input = $("<input></input>");
		input.attr({type:"hidden", name:"selectedId"});		
		input.appendTo("body");
	});
</script>
<script src="/js/prd/prdfnc.js"></script>
<script src="/js/prd/prdpages.js"></script>