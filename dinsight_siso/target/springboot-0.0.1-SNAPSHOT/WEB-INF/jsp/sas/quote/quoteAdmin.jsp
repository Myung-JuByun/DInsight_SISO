<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>   
<%@page import="java.util.*" %>

<div class="search3" id="mksearch"></div>
<div class="btn_action" id="mkbtn"></div>

<!-- top table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div style="overflow-y:scroll;">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="5%">No.</th>
						<th width="15%">Project Code</th>
						<th width="30%">견적서명</th>
						<th width="35%">파일</th>
						<th width="5%">버전</th>
						<th width="15%" class="right">보기</th>
					</tr>

				</thead>
			</table>
		</div>
		<div class="codeTable" id="quoteTb" style="overflow-y:scroll;">
			<table class="Normal_table">
				<tbody id="quote_contents" class="txtclr"></tbody>
			</table>
		</div>
	</div>
</div>
<!-- top table end -->

<script src="/js/sas/quote/quotefnc.js"></script>
<script src="/js/sas/quote/quotepages.js"></script>