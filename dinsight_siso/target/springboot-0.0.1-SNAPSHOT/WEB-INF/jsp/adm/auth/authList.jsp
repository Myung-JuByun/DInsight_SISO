<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	.tree_menu span:hover {color:blue; cursor:pointer}
</style>

<script src="/js/common/division.js"></script>
<script src="/js/common/menu.js"></script>
<script src="/js/adm/auth/auth.js"></script>
<script src="/js/adm/auth/authpages.js"></script>
<script src="/js/adm/auth/authfnc.js"></script>
<script src="/js/adm/auth/authpop.js"></script>
<script type="text/javaScript" defer="defer">
	$(document).ready(function() {
		defaultLoadList();
	});
</script>

<div class="Left_group2">
	<div class="title2">조직도</div>

	<!--  table start -->
	<div class="left_table2" style="margin-top:0px; height:500px;">
		<table class="Normal_table">
			<tr>
				<th class="right"> 부서명 </th>
			</tr>					
		</table>
		
		<table style="width:100%">
			<tr>
				<td class="right">
					<div class="tree_menu" id="tree_menu" style="height:466px;">
					<!-- 트리메뉴 시작 -->
					<!-- 트리메뉴 끝 -->
					</div>
				</td>
			</tr>			
		</table>
	</div>		
</div>

<span style="width:10px;float:left">&nbsp;</span>

<div class="Left_group2">
	<div class="title2">이름</div>

	<!--  table start -->
	<div class="left_table2" style="margin-top:0px; height:500px;">
		<table class="Normal_table">
			<thead>
				<tr>
					<th width="27px"><input type="checkbox" name="UserCheckMode" class ="UserCheckMode" value="Y" onclick="GroupCheck('UserCheckMode', 'in_user_id')"></th>
					<th>이름</th>
					<th width="79px">직위</th>
					<th width="114px" class="right">부서</th>
				</tr>
			</thead>
		</table>
		<div style="overflow-y:scroll; height:467px;">
			<table class="Normal_table">
				<tbody id="userListView">
					<!-- 직원리스트 시작 -->
					<!-- 직원리스트 끝 -->
				</tbody>
			</table>
		</div>
	</div>
	<!--  //table end -->
	
	<div class="savebtn" style="text-align:right;"><button class="ct-btn red normal" onclick="viewAuth()">설정권한 보기</button></div>
</div>

<span style="width:10px;float:left">&nbsp;</span>

<div style="float:left;width:15%;position:relative">
	<!--  table start -->
	<div class="left_table2" style="margin-top:10px;">
		<div id="authBtn"></div>
	</div>
	<!--  //table end -->
</div>

<span style="width:10px;float:left">&nbsp;</span>

<div class="Left_group2">
	<div class="title2">설정권한</div>

	<!--  table start -->
	<div class="left_table2" style="margin-top:0px; height:500px;">
		<table class="Normal_table">
			<thead>
				<tr>
					<th width="27px"><input type="checkbox" name="AuthCheckMode" class ="AuthCheckMode" value="Y" onclick="GroupCheck('AuthCheckMode', 'in_grant_user_id')"></th>
					<th width="59px">이름</th>
					<th>부서</th>
					<th width="84px" class="right">권한</th>
				</tr>
			</thead>
		</table>
		<div style="overflow-y:scroll; height:467px;">
			<table class="Normal_table">
				<tbody id="authList">
					<!-- 설정권한 리스트 시작 -->
					<!-- 설정권한 리스트 끝 -->
				</tbody>
			</table>
		</div>
	</div>
	<!--  //table end -->
	
	<div class="savebtn" style="text-align:right;"><button class="ct-btn red normal" onclick="delAuth()">삭제</button></div>
</div>		