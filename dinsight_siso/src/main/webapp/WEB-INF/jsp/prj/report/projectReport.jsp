<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>
<c:set var="date" value="<%=new Date() %>"/>

<div class="search4" id="searchDiv"></div>
<!-- button start -->
<div class="btn_action" id="btn_check"></div>
<!--// button end -->

<!-- top table start -->
<div class="con_table">
	<div class="Wrap_table">
		<table style="width:100%" class="Normal_table" id="mm_head">
			<thead>
				<tr>
					<th width="39px" style="height:50px;" rowspan="2">No.</th>
					<th width="" rowspan="2">프로젝트명</th>
					<th width="84px">월<span style="font-size:10px; margin-left:5px;" id="mon_day"></span></th>
					<th width="84px">화<span style="font-size:10px; margin-left:5px;" id="tue_day"></span></th>
					<th width="84px">수<span style="font-size:10px; margin-left:5px;" id="wed_day"></span></th>
					<th width="84px">목<span style="font-size:10px; margin-left:5px;" id="thu_day"></span></th>
					<th width="84px">금<span style="font-size:10px; margin-left:5px;" id="fri_day"></span></th>
					<th width="84px">토<span style="font-size:10px; margin-left:5px;" id="sat_day"></span></th>
					<th width="84px">일<span style="font-size:10px; margin-left:5px;" id="sun_day"></span></th>
					<th width="84px" rowspan="2">합</th>
					<th width="139x" rowspan="2">이슈사항</th>
					<th width="79px" class="right" rowspan="2">상태</th>
				</tr>
				<tr>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_mon"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_tue"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_wed"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_thu"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_fri"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_sat"></div></th>
					<th><div class="pointer" onclick="statusPop(this)">▼</div><div id="status_sun"></div></th>
				</tr>
			</thead>
		</table>
		<div id="reporttb2" class="">
			<table style="width:100%" class="Normal_table">
				<tbody id="mm_contents" class="txtclr"></tbody>
			</table>
		</div>
		<div id="reporttb2_sum" class=""></div>
	</div>
</div>
<!-- top table end -->

<script src="/js/prj/report/reportfnc.js"></script>
<script src="/js/prj/report/reportpop.js"></script>
<script src="/js/prj/report/reportpages.js"></script>