<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script>
	function pfn_logout() {
		var comboUrl = "<c:url value='/sys/actionLogout'/>";
		var paramId  = "";
		var paramValue = "";
		var after_function_id = "pfn_logout_after";
		var after_function_param = "";
		
		fn_callAjaxParam(comboUrl,paramId,paramValue,after_function_id,after_function_param);
	}
	
	function pfn_logout_after(json) {
		var resultErrorYn  = json.GetResultErrorYn;
		var resultMsg      = json.GetResultMsg;
		var moveUrl        = json.GetResultErrorMoveUrl
		
		//if (resultMsg != "")alert(resultMsg);
		if (resultMsg != "")generalPopOk(resultMsg);
		if (moveUrl != "")location.href = g_domain;
	}
	
	function get_mypage_info(){	
		if("${menuInfo.loginVO}" != null && "${menuInfo.loginVO}" != '')
			userInfo = "${menuInfo.loginVO.user_id}";
		else 
			userInfo = "${loginVO.user_id}";	
		//데이터 검색
		$.ajax({
			url: "/adm/user/userInfo",
			type: "POST",
			data: {user_id: userInfo},
			dataType: "json",
			success : function (data) {
				result = data.userList;
				pfn_mypage(result);
			}
		});
	}
 </script>
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

<style type="text/css">
	.info img {cursor:pointer}
	.my-container img {cursor:pointer}
</style>
<jsp:include page="payment_pop.jsp" flush="true"/>
<script src="/js/common/top_menu.js"></script>
<div class="clear"></div>

<!-- Content head start -->
<c:if test="${not empty menuInfo.level1_name }">
	<div class="head_title">
		<div class="path"><img src="<c:url value='/images/ico/ico_navi.gif'/>" alt="navigation_icon" style="vertical-align:middle"/> <c:out value='${menuInfo.level1_name}'/> > <span><c:out value='${menuInfo.level2_name}'/></span> </div>
		<h2><c:out value='${menuInfo.level2_name}'/></h2>	
	</div>
</c:if>

