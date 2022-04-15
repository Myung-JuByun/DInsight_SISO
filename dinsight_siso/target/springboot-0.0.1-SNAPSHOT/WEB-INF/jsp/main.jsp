<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
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
	
	<link rel="shortcut icon" href="images/dinsight.ico">
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/ui-1.11.0/jquery-ui.css'/>" media="all" />
	<link type="text/css" rel="stylesheet" href="/css/main.css" />
	<link type="text/css" rel="stylesheet" href="/css/button.css"/>
	<script src="<c:url value='/js/jquery/jquery-1.11.0.min.js'/>"></script>
	<script src="<c:url value='/js/jquery/ui-1.11.0/jquery-ui.js'/>"></script>
	<script src="<c:url value='/js/jquery/ajaxupload.js'/>"></script>
	<%-- <script src="<c:url value='/js/jquery/ui-1.9.2/jquery-ui.js'/>"></script> --%>
	<%-- <script src="<c:url value='/js/jquery/jquery-ui.custom.js'/>"></script> --%>
	<script src="<c:url value='/js/jquery/jquery.number.js'/>"></script>
	<script src="<c:url value='/js/jquery/jquery.print.js'/>"></script>
	<script src="/js/common/jCommonSE.js"></script>
	<script src="/js/common/jWidget.js"></script>
	<script src="/js/common/jSQL.js"></script>
	<script src="/js/common/sisoData.js"></script>
	<script src="/js/common/siso.js"></script>
	<script src="/js/common/jcallpop.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/common/project_util.js"></script>
	<script src="/js/common/project_grid.js"></script>
	<%
	siso.sys.service.LoginVO user = (siso.sys.service.LoginVO) siso.cmmn.util.SpringUserDetailsHelper.getAuthenticatedUser();
		pageContext.setAttribute("userInfo", user);
	%>
	
	<script>
		$(document).ready( function(){
			var user_info = "${userInfo}";
			//전역변수 설정
			pvariables();
			
			if(user_info == null || user_info == "") {
				$('#pop_up_login').bPopup();
				$("#loginId").focus();
			}
			
			//login_info();
		});
		
		function pvariables(){
			g_domain             = "<c:url value='/'/>";
		};
	</script>
</head>

<c:set var="serverIp" value="${pageContext.request.localAddr}"></c:set>
<div id="Wrapper">

	<!-- left menu start-->
	<div id="Left_wrap">
		<div class="logo">
			<a href="/"><img src="<c:url value='/images/main/logo.svg'/>" alt="logo" style="height:60px"/></a>
		</div>
		<img src="<c:url value='/images/main/left_title.gif'/>" alt="intranet system" />

		<div class="menu">
			<ul id="level2Menu"></ul>
		</div>

		<div class="m_footer">

			<!--패밀리 사이트 시작-->
			<div class="family">
				<h3>
					<a id="familyToggle" href="javascript:;" onclick="familyToggle('familyList');"> <!-- 자바스크립트가 안될때는 해당사이트로 간다 -->
						<img id="linkPlus" src="<c:url value='/images/main/left_link_plus.png'/>" alt="사이트 링크 보이기" />
		    			<img id="linkMinus" src="<c:url value='/images/main/left_link_minus.png'/>" alt="사이트 링크 숨기기" style="display:none" />											
					</a>
				</h3>

				<dl id="familyList" style="display: none;">
					<dt></dt>
					<dd>
						<a target="_blank"
							href="https://wp.tbizpoint.co.kr/service/login/wpLogin.do"
							title="새창으로 이동합니다">그룹웨어</a> <a target="_blank"
							href="http://www.dinsight.kr" title="새창으로 이동합니다">디인사이트</a>
					</dd>
				</dl>
			</div>
			<!--//패밀리 사이트 끝-->

			<br/>
			<p>(주)디인사이트<br/> Copyright(C) 2022<br/> All Rights Reserved.</p>
		</div>
	</div>
	<!--//left menu end-->
	<!-- Main start-->
	<div class="info" id="top_info"></div>
	<div class="clear"></div>
	<div id="Main_wrap">
		<c:if test="${loginVO != null && loginVO != ''}">
			<jsp:include page="cmm/top_layout.jsp" flush="true" />
		</c:if>
		
		<c:forEach var="result" items="${menuInfo.mainMenu}" varStatus="status">				
			<c:choose>
				<c:when test="${result.menu_img_url eq '/images/main/right_01.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="em">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_em.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="em">
							<a href="javascript:generalPop('권한이 없습니다.')"><img
								src="<c:url value='/images/main/main_em.gif'/>"
								alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_05.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="cr">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_cr.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="cr">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_cr.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_06.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="cr2">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_sm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="cr2">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_sm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_04.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="cm">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_cm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" style="width:484px;height:200px" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="cm">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_cm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" style="width:484px;height:200px" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_03.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="pm">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_pm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="pm">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_pm.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_10.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="alc">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_alc.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class=alc>
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_alc.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_007.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="da">
								<a
									href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_da.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" style="width:242px;height:200px" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="da">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_da.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" style="width:242px;height:200px" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
				<c:when test="${result.menu_img_url eq '/images/main/right_11.gif'}">
					<c:choose>
						<c:when test="${result.chkMenu eq 'Y'}">
							<div class="pm2">
								<a href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')"><img
									src="<c:url value='/images/main/main_pm2.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
						</c:when>
		   				<c:otherwise>
		   					<div class="pm2">
								<a href="javascript:generalPop('권한이 없습니다.')"><img
									src="<c:url value='/images/main/main_pm2.gif'/>"
									alt="<c:out value='${result.menu_name}'/>" /></a>
							</div>
		   				</c:otherwise>
					</c:choose>
				</c:when>
			</c:choose>
		</c:forEach>
		<div class="da">
			<a href="javascript:generalPop('준비중입니다.')">
			<img src="/images/main/main_da.gif" alt="" style="width:243px;height:200px" /></a>
		</div>
		<div class="main_title">
			<img src="/images/main/main_title.gif" alt="인트라넷시스템" />
		</div>
	</div>

	<!-- Rignt menu start-->
	<div id="Right_wrap">
		<a href="javascript:void(0)" style="cursor: default"><img
			src="/images/main/right_00.gif" alt="전체메뉴보기" /></a>
		<ul>
			<c:forEach var="result" items="${menuInfo.mainMenu}" varStatus="status">
				<c:choose>
					<c:when test="${result.chkMenu eq 'N'}">
						<li>
							<a href="javascript:generalPop('권한이 없습니다.')">
							<img src="<c:url value='${result.menu_img_url}'/>" alt="<c:out value='${result.menu_name}'/>" />
							</a>
						</li>
					</c:when>
	   				<c:otherwise>
	   					<li>
							<a href="javascript:fn_pageMove('<c:out value='${result.menu_id}'/>','<c:out value='${result.menu_url}'/>')">
							<img src="<c:url value='${result.menu_img_url}'/>" alt="<c:out value='${result.menu_name}'/>" />
							</a>
						</li>
	   				</c:otherwise>
				</c:choose>
			</c:forEach>
		</ul>
	</div>
	<!--// right menu end-->

</div>
<!-- popup start-->
<jsp:include page="login_pop.jsp" flush="true" />
<!-- popup end-->
</body>
</html>