<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<div class="search3" id="searchDiv"></div>

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div :style="yScroll">
			<table :class="tblClass" :style="tCenter">
				<thead>
					<tr>
						<th width="5%">No.</th>
						<th width="10%">고객사</th>
						<th width="10%">Project Code</th>
						<th width="15%">Portfolio</th>
						<th width="10%">Prd.Number</th>
						<th width="10%">Type</th>
						<th width="10%">Trigram</th>
						<th width="15%">Portfolio<br>Item Name</th>
						<th width="5%">copy</th>
						<th width="10%" class="right">상세보기</th>
					</tr>							
				</thead>
			</table>
		</div>
		<div :style="yScroll2">
			<table :class="tblClass" :style="tCenter">
				<tbody id="alcStatusView" class="txtclr">
				</tbody> 
			</table>
		</div>
	</div>
</div>
<!--  //table end -->	

<script src="/js/alc/status/alcstatus.js"></script>
<script src="/js/alc/status/alcstatuspages.js"></script>
<script src="/js/alc/status/alcstatusfnc.js"></script>
<script src="/js/alc/status/alcstatuspop.js"></script>
<script>
	new Vue({
		el : ".con_table",
		data : {
			yScroll : "overflow-y:scroll;",
			tCenter : "text-align:center",
			yScroll2 : this.yScroll + "height:364px;",
			tblClass : "project_table Normal_table",			
		}		
	});
	
	$(document).ready(function(){	
		defaultLoadList();
	});
</script>