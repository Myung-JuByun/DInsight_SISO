<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search3" id="searchDiv"></div>
<!-- button start -->
<div class="btn_action">
	<!-- ul>
		<li><a href="#" onclick="formSubmit(); return false;"><img src="/images/btn_exldown_on.gif" alt="엑셀다운로드" onclick="javascript:excelDownload();"></a></li>
	</ul-->
</div>
<!--// button end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div class="pCodeTable">
		   <table style="width:100%" class="scrollTable">
				<thead>
					<tr>
						<th width="1%">NO</th>
						<th width="4%">프로젝트 코드</th>
						<th width="3%">담당자</th>
						<th width="6%">매출처</th>
						<th width="3%">매출 공급가</th>
						<th width="3%">매입 공급가</th>
						<th width="3%">품의상 GP</th>
						<th width="3%">GP정산</th>
					</tr>
				</thead>
				<tbody id="statusBody">
				</tbody>
				<tfoot>
					<tr>
						<td colspan="4" style="text-align:center;">합계</td>
						<td id="sales_total" style="text-align:center;"></td>
						<td id="purchase_total" style="text-align:right;"></td>
						<td id="gp1_total" style="text-align:right;"></td>
						<td id="gp2_total" style="text-align:right;"></td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</div>