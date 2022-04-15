<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search4" id="searchDiv"></div>

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<table style="width:802px" class="Normal_table">
			<thead>
				<tr>
					<th width="10%">월</th>
					<th width="14%">개인법인</th>
					<th width="14%">개인신용</th>
					<th width="14%">개인현금</th>
					<th width="14%">공통법인</th>
					<th width="14%">마일리지</th>
					<th width="10%">합계</th>
					<th width="10%" class="right">진행상황</th>
				</tr>
			</thead>
			
			<!-- 리스트 시작 -->
			<tbody id="listView" class="txtclr">
			</tbody>
			<!-- 리스트 끝 -->
			
			<tfoot id="sumView" class="txtclr">
			</tfoot>
		</table>
	</div>
</div>
<!--  //table end -->

<script src="/js/exp/individual/individualfnc.js"></script>
<script src="/js/exp/individual/individualpages.js"></script>