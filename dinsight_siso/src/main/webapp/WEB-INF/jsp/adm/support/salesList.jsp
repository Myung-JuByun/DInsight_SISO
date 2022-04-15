<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/js/adm/support/sales/salespages.js"></script>
<script src="/js/adm/support/sales/salesfnc.js"></script>

<!-- ContentStart -->
<div class="search3" id="searchDiv"></div>

<!-- button start -->			
<div class="btn_action">
	<ul>
		<li><img src="<c:url value='/images/btn/btn_delall_on.gif'/>" alt="delete all" id="delete_btn" onclick="javascript:delete_onclick()" style="cursor: pointer;"/></li>
		<li><img src="<c:url value='/images/btn/btn_exlup_on.gif'/>" id="img_exlup" class="img_exlup" alt="엑셀 업로드" onClick="javascript:excelUpload();" /></li>
	</ul>
</div>			
<!--// button end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div class="pCodeTable">
		   <table style="width:100%" class="scrollTable">
				<thead>
					<tr>
						<th width="3%">NO</th>
						<th width="9%">일자</th>
						<th width="12%">프로젝트 코드</th>
						<th width="7%">담당자</th>
						<th width="10%">거래처</th>
						<th width="12%">품목명</th>
						<th width="7%">품목구분</th>						
						<th width="10%">매출 공급가</th>
						<th width="10%">매출 세액</th>
						<th width="10%">매출 합계</th>						
						<th width="10%" class="right">품의상 GP</th>
					</tr>					
				</thead>
				<tbody id="salesView">
				</tbody>
			</table>
		</div>
	</div>
</div>
<!--  //table end -->
<!-- ContentEnd -->          