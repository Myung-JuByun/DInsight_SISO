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
<form:form commandName="searchVO" method="post" id="searchForm" name="searchForm">
	<!--  table start -->
	<div class="con_table">
		<div class="Wrap_table">
			<div style="overflow-y:scroll;">
				<table style="width:802px" class="Normal_table">
					<thead>
						<tr>
							<th width="5%">No.</th>
							<th width="30%">제목</th>
							<th width="14%">상태</th>
							<th width="18%">기안</th>
							<th width="18%">기안일</th>
							<th width="15%" class="right">상세보기</th>
						</tr>
					</thead>	
				</table>
			</div>
			<div id="mhapprovaltb2" class="">
				<table style="width:802px" class="Normal_table">
					<tbody id="listView" class="txtclr">
					</tbody>
				</table>
			</div>
			
		</div>
	</div>
	<!--  //table end -->
</form:form>

<script src="/js/prj/approval/approvalfnc.js"></script>
<script src="/js/prj/approval/approvalpop.js"></script>
<script src="/js/prj/approval/approvalpages.js"></script>