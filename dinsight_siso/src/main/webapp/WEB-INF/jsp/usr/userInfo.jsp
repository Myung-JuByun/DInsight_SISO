<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<form:form commandName="searchVO" name="listForm" method="post">
	<input type="hidden" name="selectedId" />
	<div class="search">				
		<select id="searchMode" name="searchMode">
			<option value="userId">아이디</option>
			<option value ="userName">이름</option>
		</select>
		
		<input type="text" id="searchString" name="searchString" size="20"></input>			
		<div class="btn_go">
			<button type="submit"><img src="<c:url value='/images/btn/btn_go.gif'/>" alt="조회" /></button>
		</div>				
	</div>
	<!--// search end -->

	<!-- button start -->
	<div class="btn_action">
		<ul>
			<li>
				<a href="javascript:;">
					<img src="<c:url value='/images/btn/btn_exldown_on.gif'/>" alt="엑셀 다운로드" />
				</a>
			</li>
		</ul>
	</div>
	<!--// button end -->

	<!--  table start -->
	<div class="con_table">
		<div class="Wrap_table">
			<table style="width:802px" class="project_table Normal_table" style="text-align:center">
				<thead>
					<tr>
						<th width="37">순번</th>
						<th width="50">부서장여부</th>
						<th width="37">아이디</th>
						<th width="78">이름</th>
						<th width="70">이메일</th>
						<th width="40">부서코드</th>
						<th width="78">직급코드</th>
						<th width="55">활성여부</th>								
					</tr>
				</thead>
				<tbody>
				<c:forEach var="result" items="${resultList}" varStatus="status">
				<c:set value="${(searchVO.pageIndex-1)*searchVO.recordCountPerPage + status.count}" var="index"/>
				<c:set value="${paginationInfo.totalRecordCount - index + 1}" var="reverseIndex"/>
				<tr>
					<td align="center"><c:out value="${reverseIndex}"/></td>
					<td align="center"><c:out value="${result.head_yn}"/>&nbsp;</td>
					<td align="center"><a href="javascript:fn_egov_select('<c:out value="${result.login_id}"/>')"><c:out value="${result.login_id}"/></a></td>
					<td align="center"><c:out value="${result.user_name}"/>&nbsp;</td>
					<td align="center"><c:out value="${result.email}"/>&nbsp;</td>
					<td align="center"><c:out value="${result.division_cd}"/>&nbsp;</td>
					<td align="center"><c:out value="${result.job_title_cd}"/>&nbsp;</td>
					<td align="center"><c:out value="${result.activate_yn}"/>&nbsp;</td>
				</tr>
				</c:forEach>
				</tbody> 
			</table>
		</div>
	</div>			
	<!--  //table end -->
	
	<div class="pagination">
		<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fn_spring_link_page" />
		<form:hidden path="pageIndex" />
	</div>
</form:form>	

<script>	
	/* pagination 페이지 링크 function */
	function fn_spring_link_page(pageNo){
		document.listForm.pageIndex.value = pageNo;
		document.listForm.action = "<c:url value='/usr/userInfo'/>";
	   	document.listForm.submit();
	}
</script>
</html>