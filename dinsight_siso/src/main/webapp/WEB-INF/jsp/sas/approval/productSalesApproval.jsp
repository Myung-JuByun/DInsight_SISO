<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search4" id="searchDiv"></div>

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
		<div class="codeTable" style="overflow-y:scroll;">
			<table style="width:802px" class="Normal_table">
				<tbody id="approvalView" class="txtclr">
				</tbody>
			</table>
		</div>		
	</div>
</div>
<!--  //table end -->

<script src="/js/sas/approval/prdsalesapproval.js"></script>
<script src="/js/sas/approval/prdsalesapprovalpages.js"></script>
<script src="/js/sas/approval/prdsalesapprovalfnc.js"></script>
<script>
	$(document).ready(function(){	
		defaultLoadList();
	});
</script>