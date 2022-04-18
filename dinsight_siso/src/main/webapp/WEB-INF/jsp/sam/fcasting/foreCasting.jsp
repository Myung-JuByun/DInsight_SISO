<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search4" id="searchDiv"></div>
<div class="btn_action">
	<div class="descript asterisk infobot"><span>* 표시는 필수 입력 항목입니다.</span></div>
	<ul>
		<li v-for="item in btnList" :id="item.id">
			<a href="javascript:void(0);"><img :src="item.btnImg" :class="item.imgClass" :alt="item.altText" /></a>
		</li>		
	</ul>
</div>
<div class="con_table">
	<div class="Wrap_table">
		<div class="pCodeTable" id="pCodeTable">
			<table style="width:1700px; table-layout:fixed;" class="scrollTable" id="Normal_table">
				<thead id="listhead">
					<tr>
						<th width="2%" style="text-Align:center;"><input id="checkAll" width="100%" name="checklist" type="checkbox"></th>
						<th width="8%">Project Code<span class="asterisk">*</span></th>
						<th width="3%">년</th>
						<th width="2%">월</th>
						<th width="2%">주차</th>
						<th width="4%">
							<select id="orderUserName" style="width:100%; height:28px; background:#fafafa;font-weight:bold;border:0;padding-left:20px" onchange="javascript:showSearchRow(this)">
								<option value="">담당전체</option>
							</select>
						</th>
						<th width="3%">
							<select id="orderSalesDivide" style="width:100%; height:28px; background:#fafafa;font-weight:bold;border:0;padding-left:5px" onchange="javascript:showSearchRow(this)">
								<option value="">ALC전체</option>
							</select>
						</th>
						<th width="3%">이슈</th>
						<th width="6%">
							<select id="orderSalesStatus" style="width:70%; height:28px; background:#fafafa;font-weight:bold;border:0;padding-left:5px" onchange="javascript:showSearchRow(this)">
								<option value="">영업현황전체</option>
							</select>
							<span class="asterisk">*</span>
						</th>
						<th width="4%">
							<select id="orderSalesType" style="width:70%; height:28px; background:#fafafa;font-weight:bold;border:0;padding-left:5px" onchange="javascript:showSearchRow(this)">
								<option value="">구분전체</option>
							</select>
							<span class="asterisk">*</span>
						</th>
						<th width="6%">고객사명</th>
						<th width="6%">Type</th>
						<th width="5%">제품</th>
						<th width="3%">수량<span class="asterisk">*</span></th>
						<th width="6%">계약금액<span class="asterisk">*</span></th>
						<th width="5%">매입금액<span class="asterisk">*</span></th>
						<th width="6%">영업이익<span class="asterisk">*</span></th>
						<th width="6%">
							<select id="orderContractYm" style="width:70%; height:28px; background:#fafafa;font-weight:bold;border:0;padding-left:5px" onchange="javascript:showSearchRow(this)">
								<option value="">계약시점전체</option>
							</select>
							<span class="asterisk">*</span>
						</th>
					</tr>
				</thead>
				<!-- 리스트 시작 -->
				<tbody id="listView" class="txtclr">
				</tbody>
				<!-- 리스트 끝 -->
			</table>
		</div>
	</div>
</div>

<script>
	new Vue({
		el : ".btn_action",
		data : {
			btnList : [
				{id:"btnCopy", btnImg:"/images/btn/btn_copy_on.gif", altText:"복사", imgClass:"img_copy"},
				{id:"btnAdd", btnImg:"/images/btn/btn_plus_on.gif", altText:"추가", imgClass:"img_plus"},
				{id:"btnDel", btnImg:"/images/btn/btn_del_on.gif", altText:"삭제", imgClass:"img_del"},
				{id:"btnSave", btnImg:"/images/btn/btn_save_on.gif", altText:"저장", imgClass:"img_save"},					
			]
		}	
	});
</script>
<script src="/js/sam/fcasting/fcastingfnc.js"></script>
<script src="/js/sam/fcasting/fcastingpages.js"></script>
