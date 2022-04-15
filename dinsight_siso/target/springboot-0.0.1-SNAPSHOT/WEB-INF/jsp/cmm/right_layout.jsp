<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<a href="javascript:void(0)" style="cursor:default"><img src="/images/main/right_00_hide.gif" alt="전체메뉴보기" id="right00"/></a>
<div id="r_menu" style="display: none;">
<ul>
<c:forEach var="result" items="${menuInfo.mainMenu}" varStatus="status">
	<c:choose>
		<c:when test="${result.chkMenu == 'N'}">
		<li>
			<a href="javascript:generalPop('권한이 없습니다.') ">
			<img src="<c:url value='${result.menu_img_url}'/>" alt="<c:out value='${result.menu_name}'/>" />
			</a>
		</li>
		</c:when>
	   	<c:otherwise>
	   	<li>
	   		<a href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>') ">
			<img src="<c:url value='${result.menu_img_url}'/>" alt="<c:out value='${result.menu_name}'/>" />
			</a>
		</li>
	   	</c:otherwise>
	</c:choose>
</c:forEach>
</ul>
</div>
<script src="/js/common/right_menu.js"></script>


