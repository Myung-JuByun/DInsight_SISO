<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="">
	<!-- button start -->
	<!--  <div class="btn_action">
		<ul>
			 <li><a href="javascript:categoryAdd()"><img src="<c:url value='/images/btn/btn_plus_on.gif'/>" alt="추가"/></a></li>
			 <li><a href="javascript:categoryModi()"><img src="<c:url value='/images/btn/btn_modify_on.gif'/>" alt="수정"/></a></li>
			 <li><a href="javascript:categoryDel()"><img src="<c:url value='/images/btn/btn_del_on.gif'/>" alt="삭제"/></a></li>
		</ul>
	</div>-->
	<!--// button end -->

	<!--  table start -->
	<div class="center_table">
		<table class="Normal_table">
			<thead>
			<tr>
				<th width="398px">분류명 </th>
				<th class="right">계정과목</th>
			</tr>
			</thead>
		</table>
		<div class="scrolltest">
			<div class="category_menu" id="category_menu">
			</div>
		</div>
	</div>
</div>

<script src="/js/adm/category/categorypages.js"></script>
<script src="/js/adm/category/categoryfnc.js"></script>