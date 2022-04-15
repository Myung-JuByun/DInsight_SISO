<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="Left_group2">
	<!-- button start	
	<div class="btn_action">
		<ul>
			<li><a href="javascript:groupAdd()"><img src="/images/btn/btn_plus_off.gif" alt="추가"/></a></li>
			<li><a href="javascript:groupModi()"><img src="/images/btn/btn_modify_off.gif" alt="수정"/></a></li>
			<li><a href="javascript:groupDel()"><img src="/images/btn/btn_del_off.gif" alt="삭제"/></a></li>
		</ul>
	</div>-->	
	<!--// button end -->
	<!--  table start -->
	<div class="left_table2" style="margin-top:15px;">
		<div class="">
			<table style="width:250px;" class="Normal_table">
				<thead>
				<tr>
					<th width="100"> 그룹코드 </th>
					<th class="right"> 그룹명 </th>
				</tr>
				</thead>
			</table>
			<div class="codeTable">
				<table style="width:250px;" class="Normal_table">
					<tbody id="groupView">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="Right_group2">
	<!-- button start 
	<div class="btn_action">
		<ul>
			<li><a href="javascript:codeAdd()"><img src="/images/btn/btn_plus_off.gif" alt="추가"/></a></li>
			<li><a href="javascript:codeModi()"><img src="/images/btn/btn_modify_off.gif" alt="수정"/></a></li>
			<li><a href="javascript:codeDel()"><img src="/images/btn/btn_del_off.gif" alt="삭제"/></a></li>
		</ul>
	</div>-->
	<!--// button end -->
	<!--  table start -->
	<div class="Right_table2" style="margin-top:15px;">
		<div class="">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="80px"> 코드 </th>
						<th width="170px"> 코드명 </th>
						<th width="310px">속성1</th>
						<th class="right" width="">정렬순서</th>
					</tr>
				</thead>
			</table>
			<div class="codeTable">
				<table class="Normal_table">
					<tbody id="codeView">
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!--  //table end -->
</div>

<script src="/js/adm/code/codepages.js"></script>
<script src="/js/adm/code/codefnc.js"></script>
<script src="/js/adm/code/codepop.js"></script>
