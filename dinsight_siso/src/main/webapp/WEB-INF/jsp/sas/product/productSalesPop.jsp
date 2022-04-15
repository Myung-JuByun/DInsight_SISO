<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragma","no-cache");
response.setDateHeader("Expires",-1);
if (request.getProtocol().equals("HTTP/1.1"))
response.setHeader("Cache-Control", "no-cache"); 
%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>디인사이트 SISO 인트라넷에 오신것을 환영합니다</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Pragma" content="no-cache"> 
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
	<meta http-equiv="Expires" content="-1">
	
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/ui-1.11.0/jquery-ui.css'/>" media="all" />
	<link type="text/css" rel="stylesheet" href="/css/siso.css"/>
	<link type="text/css" rel="stylesheet" href="/css/button.css"/>
	<link type="text/css" rel="stylesheet" href="/css/print.css" media="print" />
	<link type="text/css" rel="stylesheet" href="/css/popup.css" />
	<script src="<c:url value='/js/jquery/jquery-1.11.0.min.js'/>"></script>
	<script src="<c:url value='/js/jquery/ui-1.11.0/jquery-ui.js'/>"></script>
	<script src="<c:url value='/js/jquery/ajaxupload.js'/>"></script>
	<%-- <script src="<c:url value='/js/jquery/jquery-ui.custom.js'/>"></script> --%>
	<script src="<c:url value='/js/jquery/jquery.number.js'/>"></script>
	<script src="<c:url value='/js/jquery/jquery.print.js'/>"></script>
	<script src="/js/common/jCommonSE.js"></script>
	<script src="/js/common/jWidget.js"></script>
	<script src="/js/common/jSQL.js"></script>
	<script src="/js/common/jTABLE.js"></script>
	<script src="/js/common/jTab.js"></script>
	<script src="/js/common/jcon.js"></script>
	<script src="/js/common/jcon_ver.js"></script>
	<script src="/js/common/sisoData.js"></script>
	<script src="/js/common/siso.js"></script>
	<script src="/js/common/jcallpop.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/common/project_util.js"></script>
	<script src="/js/common/project_grid.js"></script>
	<script src="/js/common/project_code.js"></script>
	<script src="/js/common/company.js"></script>
	<script src="/js/common/quotepop.js"></script>
	<script src="/js/common/contractSrchPop.js"></script>
	<script src="/js/common/division.js"></script>
	<c:choose>
	 	<c:when test="${menuInfo.loginVO != null }">
	 		<c:set value='${menuInfo.loginVO}' var="loginVO" />
	 		<script type="text/javaScript">
	 			var LOGINFO={
 					userid:"<c:out value="${loginVO.user_id}"/>",
 					name:"<c:out value="${loginVO.user_name}"/>",
					division:"<c:out value="${loginVO.division_name}"/>",
					job:"<c:out value="${loginVO.job_title_name}"/>",
					id:"<c:out value="${loginVO.login_id}"/>",
					grant_id:"<c:out value="${loginVO.grant_id}"/>"
				};	 			
	 		</script>
	 	</c:when>
	 	<c:otherwise>
	 		<c:set value='${loginVO}' var="loginVO" />
	 		<script type="text/javaScript">
	 			var LOGINFO={
 					userid:"<c:out value="${loginVO.user_id}"/>",
 					name:"<c:out value="${loginVO.user_name}"/>",
					division:"<c:out value="${loginVO.division_name}"/>",
					job:"<c:out value="${loginVO.job_title_name}"/>",
					id:"<c:out value="${loginVO.login_id}"/>",
					grant_id:"<c:out value="${loginVO.grant_id}"/>"
				};
	 		</script>
	 	</c:otherwise>
	</c:choose>
</head>
<div class="wrap-loading-pop hide">
    <div><img src="/images/common/loading_bar1.gif" /></div>
</div>
<script src="/js/sas/contract/contractfnc.js"></script>
<script src="/js/sas/contract/contractpop.js"></script>
<script src="/js/common/productsalespop.js"></script>
<script src="/js/sas/product/salesfnc.js"></script>
<script src="/js/sas/product/salespopfnc.js"></script>
<script src="/js/sas/product/salespop2.js"></script>