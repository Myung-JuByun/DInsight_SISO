<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : springSampleRegister.jsp
  * @Description : Sample Register 화면
  * @Modification Information  
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<c:set var="registerFlag" value="${empty sampleVO.id ? '등록' : '수정'}"/>
<title>Sample <c:out value="${registerFlag}"/> </title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/sample.css'/>"/>

<!--For Commons Validator Client Side-->
<script type="text/javascript" src="<c:url value='/cmmn/validator'/>"></script>
<validator:javascript formName="sampleVO" staticJavascript="false" xhtml="true" cdata="false"/>

<script type="text/javaScript" language="javascript" defer="defer">
<!--
/* 글 목록 화면 function */
function fn_spring_selectList() {
   	document.detailForm.action = "<c:url value='/sample/springSampleList'/>";
   	document.detailForm.submit();
}

/* 글 삭제 function */
function fn_spring_delete() {
   	document.detailForm.action = "<c:url value='/sample/deleteSample'/>";
   	document.detailForm.submit();
}

/* 글 등록 function */
function fn_spring_save() {
	frm = document.detailForm;
	if(!validateSampleVO(frm)){
        return;
    }else{
    	frm.action = "<c:url value="${registerFlag == '등록' ? '/sample/addSample' : '/sample/updateSample'}"/>";
        frm.submit();
    }
}

-->
</script>
</head>
<body style="text-align:center; margin:0 auto; display:inline; padding-top:100px;">

<form:form commandName="sampleVO" name="detailForm">
<div id="content_pop">
	<!-- 타이틀 -->
	<div id="title">
		<ul>
			<li><img src="<c:url value='/images/spring/example/title_dot.gif'/>" alt=""/> 카테고리<c:out value="${registerFlag}"/></li>
		</ul>
	</div>
	<!-- // 타이틀 -->
	<div id="table">
	<table width="100%" border="1" cellpadding="0" cellspacing="0" style="bordercolor:#D3E2EC; bordercolordark:#FFFFFF; BORDER-TOP:#C2D0DB 2px solid; BORDER-LEFT:#ffffff 1px solid; BORDER-RIGHT:#ffffff 1px solid; BORDER-BOTTOM:#C2D0DB 1px solid; border-collapse: collapse;">
		<colgroup>
			<col width="150"/>
			<col width=""/>
		</colgroup>
		<c:if test="${registerFlag == '수정'}">
		<tr>
			<td class="tbtd_caption"><label for="id">카테고리ID</label></td>
			<td class="tbtd_content">
				<form:input path="id" cssClass="essentiality" maxlength="10" readonly="true" />
			</td>
		</tr>
		</c:if>
		<tr>
			<td class="tbtd_caption"><label for="name">카테고리명</label></td>
			<td class="tbtd_content">
				<form:input path="name" maxlength="30" cssClass="txt"/>
				&nbsp;<form:errors path="name" />
			</td>
		</tr>
		<tr>
			<td class="tbtd_caption"><label for="useYn">사용여부</label></td>
			<td class="tbtd_content">
				<form:select path="useYn" cssClass="use">
					<form:option value="Y" label="Yes" />
					<form:option value="N" label="No" />
				</form:select>
			</td>
		</tr>
		<tr>
			<td class="tbtd_caption"><label for="description">Description</label></td>
			<td class="tbtd_content">
				<form:textarea path="description" rows="5" cols="58" />
					&nbsp;<form:errors path="description" /></td>
		</tr>
		<tr>
			<td class="tbtd_caption"><label for="regUser">등록자</label></td>
			<td class="tbtd_content">
				<form:input path="regUser" maxlength="10" cssClass="txt"  />
				&nbsp;<form:errors path="regUser" /></td>
		</tr>
	</table>
  </div>
	<div id="sysbtn">
		<ul>
			<li><span class="btn_blue_l"><a href="javascript:fn_spring_selectList();">List</a><img src="<c:url value='/images/springframework/example/btn_bg_r.gif'/>" style="margin-left:6px;" alt=""/></span></li>
			<li><span class="btn_blue_l"><a href="javascript:fn_spring_save();"><c:out value='${registerFlag}'/></a><img src="<c:url value='/images/springframework/example/btn_bg_r.gif'/>" style="margin-left:6px;" alt=""/></span></li>
			<c:if test="${registerFlag == '수정'}">
			<li><span class="btn_blue_l"><a href="javascript:fn_spring_delete();">삭제</a><img src="<c:url value='/images/springframework/example/btn_bg_r.gif'/>" style="margin-left:6px;" alt=""/></span></li>
			</c:if>
			<li><span class="btn_blue_l"><a href="javascript:document.detailForm.reset();">Reset</a><img src="<c:url value='/images/springframework/example/btn_bg_r.gif'/>" style="margin-left:6px;" alt=""/></span></li></ul>
	</div>
</div>
<!-- 검색조건 유지 -->
<input type="hidden" name="searchCondition" value="<c:out value='${searchVO.searchCondition}'/>"/>
<input type="hidden" name="searchKeyword" value="<c:out value='${searchVO.searchKeyword}'/>"/>
<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
</form:form>
</body>
</html>

