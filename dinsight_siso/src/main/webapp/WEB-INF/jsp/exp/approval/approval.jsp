<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	.paddingRight {padding-right:10px;}
	.div_overflow_print {width:100%; height:836px; overflow-x:hidden; overflow-y:auto;}
</style>

<div class="search4" id="searchDiv"></div>
<!--// search end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div style="overflow-y:scroll;">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="5%">NO.</th>
						<th width="45%">제목</th>
						<th width="10%">상태</th>
						<th width="10%">기안</th>
						<th width="20%">기안일</th>
						<th width="10%" class="right">상세보기</th>
					</tr>
				</thead>
			</table>
		</div>
		
		<div class="codeTable" style="overflow-y:scroll;">
			<table class="Normal_table">
			<!-- 리스트 시작 -->
				<tbody id="listView" class="txtclr">
				</tbody>
				<!-- 리스트 끝 -->
			</table>
		</div>
	</div>
</div>
<!--  //table end -->

<script src="/js/exp/approval/approvalfnc.js"></script>
<script src="/js/exp/approval/approvalpages.js"></script>