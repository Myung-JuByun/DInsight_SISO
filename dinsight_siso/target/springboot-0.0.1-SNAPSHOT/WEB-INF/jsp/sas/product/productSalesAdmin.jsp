<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search3" id="searchDiv"></div>
<div class="btn_action" id="mkbtn"></div>
<!-- top table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div style="overflow-y:scroll;">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="4%">No.</th>
						<th width="8%">작성일</th>
						<th width="15%">Project Code</th>
						<th width="12%">고객</th>
						<th width="6%">구분</th>
						<th width="12%">총계약금</th>
						<th width="11%">매입가</th>
						<th width="11%">영업이익</th>
						<th width="6%">차수</th>
						<th width="8%">상태</th>
						<th width="7%" class="right">보기</th>
					</tr>
					</thead>
			</table>
		</div>
		<div class="codeTable" id="prdTb" style="overflow-y:scroll;">
			<table class="Normal_table">
				<tbody id="product_contents" class="txtclr"></tbody>
			</table>
		</div>
	</div>
</div>
<!-- top table end -->

<script src="/js/sas/product/salespop1.js"></script>
<script src="/js/sas/product/salesfnc.js"></script>
<script src="/js/sas/product/salespages.js"></script>