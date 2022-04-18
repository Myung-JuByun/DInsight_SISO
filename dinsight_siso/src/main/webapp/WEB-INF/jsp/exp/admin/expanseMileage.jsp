<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="layer">
	<div class="bg"></div>
	<div id="mileage_pop" class="pop-layer movePopup" style="width:77%; height:600px">
		<div class="mil_top my_top"> 마일리지 입력 <a href="#" class="layerClose"><img src="/images/pop_btn/btn_pop_close.png" alt="닫기" align="right" style="padding-right:10px"/></a> </div>
		<div class="mil-container">				
			<div id="expanseMilBtn" class="btn_action">
				<ul>
					<li v-for="(item, index) in btnList" :class="{'last':index == btnList.length - 1}">
						<a href="javascript:;" :onclick="item.func"><img :src="item.btnImg" :alt="item.altText" :class="item.imgClass" /></a>
					</li>					
				</ul>
			</div>
			<!--// button end -->
			
			<!--  table start -->
			<div class="con_table div_overflow_mileage">
				<div class="Wrap_table">
					<table class="Normal_table">
						<thead>
							<tr>
								<th width="37"><input type="checkbox" name="CheckMileageMode" class="CheckMileageMode" value="Y" onclick="GroupCheck('CheckMileageMode', 'mileage_id')"></th>
								<th width="37">No</th>
								<th width="110">날짜</th>
								<th width="200">이동목적</th>
								<th width="100">출발지</th>
								<th width="100">경유지</th>
								<th width="100">도착지</th>
								<th width="100">유종</th>
								<th width="60">거리</th>
								<th width="80" class="right">합계</th>
							</tr>
						</thead>
						<tbody>
							<tr class="copyRowLayer hide">
								<td class="txt_center2"><input type="checkbox" name="mileage_id" class="mileage_id"></td>
								<td class="txt_center mileageListIndex">
									<input type="hidden" name="in_mileage_id" class="in_mileage_id" />
									<input type="hidden" name="in_oil_cd_temp" class="in_oil_cd_temp" />							
								</td>
								<td class="txt_center"><input name="in_drive_day" class="in_drive_day input_date" readonly></td>
								<td class="txt_center"><input name="in_purpose" class="in_purpose" title="이동목적"></td>
								<td class="txt_center"><input name="in_start_point" class="in_start_point" title="출발지점"></td>
								<td class="txt_center"><input name="in_via_point" class="in_via_point" title="경유지"></td>
								<td class="txt_center"><input name="in_end_point" class="in_end_point" title="도착지점"></td>
								<td class="txt_center">
									<div class="styled-select" style="width:100%;">
										<select name="in_oil_cd" class="in_oil_cd" title="유종" style="width:150%;"></select>
									</div>
								</td>
								<td class="txt_center"><input name="in_distance" class="in_distance price" title="거리" /></td>
								<td class="txt_center right"><input name="in_cost" class="in_cost price" title="경비" readonly /></td>
							</tr>
						</tbody>
						<tbody id="refreshLayer">
							<tr class="listRowLayer hide">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td class="right"></td>
							</tr>
						
							<c:forEach var="resultMileage" items="${resultMileageList}" varStatus="statusMileage">
								<c:set value="${(searchVO.pageIndex-1)*searchVO.recordCountPerPage + statusMileage.count}" var="indexMileage" />
								<c:set value="${fn:substring(resultMileage.drive_day, 4, 6)}" var="stm_month" />
								<c:set value="${fn:substring(resultMileage.drive_day, 6, 8)}" var="stm_day" />
								<tr class="listRowLayer">
									<td class="txt_center2"><input type="checkbox" name="mileage_id" class="mileage_id" value="<c:out value="${resultMileage.mileage_id}" />"></input></td>
									<td class="txt_center mileageListIndex">
										<c:out value="${indexMileage}" />
										<input type="hidden" name="in_mileage_id" class="in_mileage_id" value="<c:out value="${resultMileage.mileage_id}" />" />
										<input type="hidden" name="in_oil_cd_temp" class="in_oil_cd_temp" value="<c:out value="${resultMileage.oil_cd}" />" />									
									</td>
									<td class="txt_center"><input name="in_drive_day" class="in_drive_day input_date" value="<c:out value="${stm_month}-${stm_day}" />" readonly></input></td>
									<td class="txt_center"><input name="in_purpose" class="in_purpose" title="이동목적" value="<c:out value="${resultMileage.purpose}" />"></input></td>
									<td class="txt_center"><input name="in_start_point" class="in_start_point" title="출발지점" value="<c:out value="${resultMileage.start_point}" />"></input></td>
									<td class="txt_center"><input name="in_via_point" class="in_via_point" title="경유지" value="<c:out value="${resultMileage.via_point}" />"></input></td>
									<td class="txt_center"><input name="in_end_point" class="in_end_point" title="도착지점" value="<c:out value="${resultMileage.end_point}" />"></input></td>
									<td class="txt_center">
										<div class="styled-select" style="width:100%;">
											<select name="in_oil_cd" class="in_oil_cd" title="유종" style="width:150%;"></select>
										</div>
									</td>
									<td class="txt_center"><input name="in_distance" class="in_distance price" title="거리" value="<c:out value="${resultMileage.distance}" />"></input></td>
									<td class="txt_center right"><input name="in_cost" class="in_cost price" title="경비" value="<c:out value="${resultMileage.cost}" />" readonly></input></td>
								</tr>
							</c:forEach>
						</tbody>	
						<tfoot>
							<tr>
								<td class="sum" colspan="7">합계</td>
								<td class="sum">&nbsp;</td>
								<td class="sum_cost"><input id="sum_mileageDistance" name="sum_mileageDistance" class="price" style="padding-left:0px" title="금액" readonly></td>
								<td class="sum_cost"><input id="sum_mileagePrice" name="sum_mileagePrice" class="price" style="padding-left:0px" title="금액" readonly></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			<!--  //table end -->
		</div>
	</div>
</div>