<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>

<div class="search4" id="searchDiv"></div>
<!-- button start -->
<div class="btn_action">
	<ul>
		 <li><a href="javascript:prjAdd()"><img src="/images/btn/btn_plus_on.gif" alt="추가"/></a></li>
		 <li><a href="javascript:prjModi()"><img src="/images/btn/btn_modify_on.gif" alt="수정"/></a></li>
		 <li><a href="javascript:prjDel()"><img src="/images/btn/btn_del_on.gif" alt="삭제"/></a></li>
	</ul>
</div>
<!--// button end -->

<!-- top table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div style="overflow-y:scroll;">
			<table class="Normal_table" style="width:100%; table-layout:fixed">
				<thead>
					<tr>
						<th width="3%" rowspan="2"><input type="checkbox" class="CheckMode" onclick="checkMode(this)"></th>
						<th width="3%" rowspan="2">No.</th>
						<th width="10%" rowspan="2">Project Code</th>
						<th width="10%" rowspan="2">프로젝트명</th>							
						<th width="6%" rowspan="2">구분</th>
						<th width="14%" colspan="2">프로젝트</th>
						<th width="5%">계약</th>
						<th width="21%" colspan="3">고객사</th>
						<th width="10%" rowspan="2">관련부서</th>
						<th width="10%" rowspan="2" class="right">계약금액(만)</th>
					</tr>
					<tr>
						<th width="7%">시작일</th>
						<th width="7%">종료일</th>
						<th>(M/M)</th>
						<th width="7%">고객사명</th>
						<th width="7%">담당자</th>					   
						<th width="7%">연락처</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="overflow-y:scroll; height:250px;">
			<table class="Normal_table" style="width:100%; table-layout:fixed">
				<tbody id="pj_contents" class="txtclr"></tbody>
			</table>
		</div>
	</div>
</div>
<!-- top table end -->

<!-- button start -->
<div class="btn_action" id="btn_info">
	<div class="descript asterisk infobot">* 표시는 필수 입력 항목입니다.</div>
	<ul>
		 <li><img src="/images/btn/btn_plus_off.gif" alt="X"/></li>
		 <li><img src="/images/btn/btn_del_off.gif" alt="X"/></li>
		 <li><img src="/images/btn/btn_save_off.gif" alt="X"/></li>
	</ul>
</div>
<!--// button end -->

<!-- bottom table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div class="Project_info_title" id="pj_info_title">프로젝트 투입정보(상위 Grid 내 선택된 정보값)</div>
		<div style="overflow-y:scroll;">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="5%"><input type="checkbox" class="CheckMode" onclick="checkMode(this,true)"></th>
						<th width="5%">No.</th>
						<th width="15%">사원명<span class="asterisk">*</span></th>
						<th width="10%">역할<span class="asterisk">*</span></th>
						<th width="15%">상주상태<span class="asterisk">*</span></th>
						<th width="20%">투입 시작일<span class="asterisk">*</span></th>
						<th width="20%">투입 종료일<span class="asterisk">*</span></th>
						<th width="10%" class="right">계약 M/M</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="overflow-y:scroll; min-height:100px;" id="contents">
			<table class="Normal_table">
				<tbody id="pj_info_contents" class="txtclr"></tbody>
			</table>
		</div>
	</div>
</div>
	<!-- bottom table end -->
<script src="/js/prj/admin/adminfnc.js"></script>
<script src="/js/prj/admin/adminpop.js"></script>
<script src="/js/prj/admin/adminpages.js"></script>		