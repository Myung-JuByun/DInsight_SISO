<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/js/adm/support/purchase/purchasepages.js"></script>
<script src="/js/adm/support/purchase/purchasefnc.js"></script>

<div class="search3" id="searchDiv"></div>
	<!-- button start -->
	<div class="btn_action">
		<ul>
			<li><img src="../images/btn/btn_delall_on.gif" alt="delete all" id="delete_btn" onclick="delete_onclick()" style="cursor: pointer;"/></li>
			<li><img src="<c:url value='/images/btn/btn_exlup_on.gif'/>" id="img_exlup" class="img_exlup" alt="엑셀 업로드" onClick="javascript:excelUpload();"/></li>
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
							<th width="5%">NO</th>
							<th width="10%">일자</th>
							<th width="15%">프로젝트 코드</th>
							<th width="8%">담당</th>
							<th width="12%">매입처</th>
							<th width="10%">품목명</th>
							<th width="10%">매출처</th>
							<th width="10%">매입 공급가</th>
							<th width="10%">매입세액</th>
							<th width="10%" class="right">매입 합계</th>							
						</tr>
					</thead>
					<tbody id="purchaseView">
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!--  //table end -->
</body>
</html>