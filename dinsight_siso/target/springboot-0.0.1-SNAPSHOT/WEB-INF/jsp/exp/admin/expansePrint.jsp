<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="layerPrint hide">
	<div id="Layer_Center_wrap">
		<!--인쇄 popup-->
		<div id="pop_print" class="pop_print" style="width:800px; height:900px">
		
				<div class="prt_top">	&nbsp;&nbsp;&nbsp;&nbsp;경비 지급 요청서 <a href="#" class="printClose"><img src="/images/pop_btn/btn_pop_close.gif" alt="닫기" align="right"/></a> </div>
				
				<div id="printArea" class="div_overflow_print">
				
					<!--인쇄표지-->
					<div id="print_page_1">
						<div class="prt_title"> <c:out value='${params.sh_expanse_year}'/>년 <c:out value='${params.sh_expanse_month}'/>월 경비</div>
						<div class="prt_lnr">
							<div class="prt_left">
								<div class="table_left">
									<table style="width:229px;" class="Normal_table">
									<tr height="32">
										<th	width="100">부서</th>
										<td	class="right">&nbsp;&nbsp;&nbsp;<c:out value='${loginVO.divisionName}'/></td>
									</tr>
									<tr height="32">
										<th>성명</th>
										<td	class="right">&nbsp;&nbsp;&nbsp;<c:out value='${loginVO.userName}'/> <c:out value='${loginVO.jobTitleName}'/></td>
									</tr>
									<tr height="32">
										<th>일자</th>
										<td	class="right">&nbsp;&nbsp;&nbsp;<c:out value='${params.sh_expanse_year}'/>년 <c:out value='${params.sh_expanse_month}'/>월</td>
									</tr>
									</table>
								</div>
							</div>
							<div class="prt_right">
								<div class="table_right">
									<table style="width:487px; height:100px" class="Normal_table">
									<tr height="32">
										<th width="32" rowspan="2">결<br/><br/>재</th>
										<th width="90">담당</th>
										<th width="90">검토</th>
										<th width="90">검토</th>
										<th width="90">검토</th>
										<th width="90" class="right">승인</th>
									</tr>
									<tr align="center" height="65">
										<td id="print_payment_0"></td>
										<td id="print_payment_1"></td>
										<td id="print_payment_2"></td>
										<td id="print_payment_3"></td>
										<td id="print_payment_4" class="right"></td>
									</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="prt_con">
							<div class="pop_table2">
								<table class="Normal_table">
								<tr>
									<th width="300">구분</th>
									<th width="300">금액</th>
									<th class="right">비고</th>
								</tr>
								
								<c:forEach var="resultPrint" items="${typeList}" varStatus="statusPrint">
								<tr>
									<td><c:out value="${resultPrint.codeName}" /></td>
									<td id="print_top_price_<c:out value="${resultPrint.codeId}" />" class="cost paddingright">0</td>
									<td class="right"></td>
								</tr>
								</c:forEach>
								
								<tr>
									<td>마일리지</td>
									<td id="print_top_price_mileage" class="cost paddingright">0</td>
									<td class="right"></td>
								</tr>
								
								<tr>
									<td class="sum">총계</td>
									<td id="print_top_total_price" class="sum_cost paddingright">0</td>
									<td class="sum"></td>
								</tr>
							  	</table>
							</div>
						</div>
						<div class="prt_text">
							위 금액을 청구하오니 결재 바랍니다.<br /><br />
							<c:out value='${params.sh_expanse_year}'/>년 <c:out value='${params.sh_expanse_month}'/>월 <c:out value='${params.expanse_day}'/>일
						</div>
						
						<div class="prt_page">
							<div class="page_table">
								<table style="width:100%">
									<tr>
										<td class="page_left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td class="page_con"><B>1</B> / <span class='printTotalCnt'>5</span></td>
										<td class="page_right"><a href="javascript:goMove('next', '1')"><img src="/images/btn/btn_next.gif" alt="다음 페이지"></a></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<!--//인쇄표지 end-->
					
					<!--인쇄상세(마일리지 제외)-->
					<div id="print_body">
						<!-- 인쇄 상세시작 -->
						<!-- 인쇄 상세끝 -->
					</div>
					<!--//인쇄상세(마일리지 제외) end-->
					
					<!--인쇄상세(마일리지)-->
					<div id="print_body_mileage">
							<!-- 인쇄(마일리지) 상세시작 -->
							<!-- 인쇄(마일리지) 상세끝 -->
					</div>
					<!--//인쇄상세(마일리지) end-->
				
				</div>
				
				<div class="prt_bottom" onclick="javascript:goPrint()" style="cursor:pointer">인쇄하기</div>
		
		</div>
		<!--//인쇄 popup end-->
	</div>

</div>