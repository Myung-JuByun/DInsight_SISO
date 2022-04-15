<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	.tree_menu span:hover {color:blue; cursor:pointer}
</style>

<script src="/js/adm/expapproval/expapprovalpages.js"></script>
<script src="/js/adm/expapproval/expapprovalfnc.js"></script>

<form:form commandName="searchVO" method="post" id="searchForm" name="searchForm">
	<div class="search" id="searchDiv"></div>		
	<div class="Left_group">
		<!-- <div class="mini_title">
			부서/사원
		</div> -->
		<!--  table start -->
		<div class="left_table">
			<div class="Wrap_table">
				<table style="width:250px" class="Normal_table">
					<thead>
						<tr>
							<th class="right"> 부서/사원 명 </th>
						</tr>	
					</thead>
				</table>
				<div class="codeTable" style="height:466px;">
					<table style="width:250px" class="Normal_table">
						<tbody id="tree_menu">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="Right_group">
		<!-- button start -->
		<div class="btn_action">
			<ul>
				<li id="mile"><img src="/images/btn/btn_mil_off.gif" alt="마일리지"/></li>
				<li><a href="javascript:openPrint()"><img src="/images/btn/btn_print_on.gif" alt="인쇄"/></a></li>
				<li><a href="javascript:approvalRecall()"><img src="/images/btn/btn_recall_on.gif" alt="승인"/></a></li>
				<li><a href="javascript:approvalPermit()"><img src="/images/btn/btn_ok_on.gif" alt="승인"/></a></li>
			</ul>
		</div>
		<!--// button end -->
		<!--  table start -->
		<div class="Right_table">
		<div class="Wrap_table">
			<table class="Normal_table" >
				<thead>
					<tr>
						<th width="40ox">No.</th>
						<th width="80px">날짜</th>
						<th width="90px">구분</th>
						<th width="80px">분류 </th>
						<th width="90px">금액</th>
						<th >내역</th>
						<th width="80px" class="right">상태</th>
					</tr>
				</thead>
			</table>
			<div class="codeTable" style="overflow-y:scroll; height:466px;">
				<table class="Normal_table">
					<tbody id="approvalView">
					</tbody>
				</table>
			</div>
		</div>
		 </div>
		<!--  //table end -->
	</div>
</form:form>