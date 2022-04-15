<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>
<c:set var="date" value="<%=new Date() %>"/>

<style type="text/css">
	.div_overflow_main {width:100%; height:364px; overflow-x:hidden; overflow-y:scroll;}
	.div_overflow_y_scroll {overflow-y:scroll;}
</style>

<!-- search start -->
<div class="search3" id="searchDiv"></div>
<!--// search end -->

<!-- button start -->
<div class="btn_action">
	<div class="descript infobot" id="weekDate"></div>
	<ul>
		 <li class="last"><img src="/images/btn/btn_exldown_on.gif" alt="엑셀다운로드" style="cursor:pointer" onclick="javascript:excelDownload();"></li>
	</ul>
</div>
<!--// button end -->

<!--//레이어 팝업 사용시 위치 -->

<!-- table start-->	
<div class="con_table">
	<div class="Wrap_table">
		<div class="div_overflow_y_scroll">		
			<table class="Normal_table" style="border:0;">
				<thead class="" id="dataTitle">
					<tr>
						<th rowspan="2" width="5%">보고년</th>
						<th rowspan="2" width="4%">보고월</th>
						<th rowspan="2" width="4%">보고주</th>
						<th rowspan="2" width="15%">프로젝트명</th>
						<th rowspan="2" width="10%">고객사명</th>
						<th rowspan="2" width="7%">성명</th>
						<th rowspan="2" width="5%">직급</th>
						<th rowspan="2" width="5%">고용</th>
						<th rowspan="2" width="5%">역할</th>
						<th rowspan="2" width="5%">상주상태</th>
						<th rowspan="2" width="3%">월</th>
						<th rowspan="2" width="3%">화</th>
						<th rowspan="2" width="3%">수</th>
						<th rowspan="2" width="3%">목</th>
						<th rowspan="2" width="3%">금</th>
						<th rowspan="2" width="3%">토</th>
						<th rowspan="2" width="3%">일</th>						
						<th colspan="2" width="10%" class="right">합계</th>
					</tr>
					<tr>
						<th width="5%">M/D</th>
						<th width="5%" class="right">M/M</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="statustb2" class="">
			<table class="Normal_table" style="border:0;">
				<tbody class="txtclr" style="text-align:center;" id="projectStatusDataTable">
				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- table end-->

<script src="/js/prj/status/statusfnc.js"></script>
<script src="/js/prj/status/statuspages.js"></script>