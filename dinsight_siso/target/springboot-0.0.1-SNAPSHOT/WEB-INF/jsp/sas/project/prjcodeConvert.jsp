<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	img {cursor:pointer}
	.price_padding {text-align:right; padding-right:10px}
</style>


<div class="search3" id="searchDiv"></div>

<!-- button start -->
<div class="btn_action">
	<ul>
		<li><a href="javascript:;" onclick="formSubmit(); return false;"><img src="/images/btn/btn_sucess_on.gif" id="successImg" alt="추가"/></a></li>
	</ul>
</div>
<!--// button end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div class="pCodeTable" id="pCodeTable">
		   <table style="width:1700px" class="scrollTable">
				<thead>
					<tr>
						<th width="2%"><input type="checkbox" class="CheckMode" onclick="GroupCheck('CheckMode', 'in_sales_project_id')"></th>
						<th width="3%">년도</th>
						<th width="3%">월</th>
						<th width="10%">Project Code</th>
						<th width="5%">구분</th>
						<th width="8%">고객사명</th>
						<th width="7%">Type</th>
						<th width="7%">제품</th>
						<th width="7%">Success</th>
						<th width="6%" id="status_info"><div>영업 현황&nbsp;</div></th>
						<th width="7%">담당</th>
						<th width="8%">계약금액</th>
						<th width="8%">매입금액</th>
						<th width="8%">영업이익</th>
						<th width="7%" class="right">Closing</th>
					</tr>
				</thead>
				<tbody id="pcodeView" class="txtclr">
				</tbody>
			</table>
		</div>
	</div>
</div>
<!--  //table end -->

<script src="/js/sas/project/projectfnc.js"></script>
<script src="/js/sas/project/projectpages.js"></script>