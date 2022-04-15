<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	#detailList td {word-wrap:break-word;}
</style>

<form:form commandName="searchVO" method="post" id="searchForm" name="searchForm">
	<div class="search4" id="searchDiv"></div>
	<div class="search_detail">					
		<div class="group_wrap"> 
			<div class="Wrap_table" style="margin-bottom:32px;">
				<table style="width:100%">
					<tr>
						<th class="right">사업부</th>
						<th width="40px" class="right">
							<input type="checkbox" name="CheckMode1" class="CheckMode1" onclick="GroupCheck('CheckMode1', 'sh_division_cd')">
						</th>
					</tr>
				</table>
				<div id="searchDivision" style="height:96px; overflow-y:scroll; background:#fff;">
					<!-- 사업부 시작 -->
					<!-- 사업부 끝 -->
				</div>
			</div>
			<div class="Wrap_table">
				<table style="width:100%">
					<tr>
						<th class="right">구분</th>
						<th width="25px" class="right">
							<input type="checkbox" name="CheckMode2" class="CheckMode2" onclick="GroupCheck('CheckMode2', 'sh_sales_type_cd')">
						</th>
					</tr>
				</table>
				<div id="searchSalesType">
					<!-- 구분 시작 -->
					<!-- 구분 끝 -->
				</div>
			</div>			
		</div>		
		<div class="group_wrap">
			<div class="Wrap_table" style="margin-bottom:32px;">
				<table style="width:100%">
					<tr>
						<th class="right">계약시점</th>
						<th width="40px" class="right">
							<input type="checkbox" name="CheckMode3" class="CheckMode3" onclick="GroupCheck('CheckMode3', 'sh_contract_ym')">
						</th>
					</tr>
				</table>
				<div id="searchContractYm" style="height:96px; overflow-y:scroll;">
					<!-- 계약시점 시작 -->
					<!-- 계약시점 끝 -->
				</div>
			</div>
			<div class="Wrap_table" >
				<table style="width:100%">
					<tr>
						<th class="right">이슈여부</th>
						<th width="25px" class="right">
							<input type="checkbox" name="CheckMode4" class="CheckMode4" onclick="GroupCheck('CheckMode4', 'sh_issue_yn')">
						</th>
					</tr>
				</table>
				<div id="searchIssueYn">
					<!-- 이슈여부 시작 -->
					<!-- 이슈여부 끝 -->
				</div>
			</div>
		</div>
      	<div class="group_wrap">
			<div class="Wrap_table">
				<table style="width:100%">
					<tr>
						<th class="right">영업 Status</th>
						<th width="25px" class="right">
							<input type="checkbox" name="CheckMode5" class="CheckMode5" onclick="GroupCheck('CheckMode5', 'sh_sales_status_cd')">
						</th>
					</tr>
				</table>
				<div id="searchSalesStatus">
					<!-- 영업 Status 시작 -->
					<!-- 영업 Status 끝 -->
				</div>
			</div>		
		</div>						
      	<div class="group_wrap"> 
			<div class="Wrap_table">
				<table style="width:100%">
					<tr>
						<th class="right">담당영업</th>
						<th width="40px" class="right">
							<input type="checkbox" name="CheckMode6" class="CheckMode6" onclick="GroupCheck('CheckMode6', 'sh_user_id')">
						</th>
					</tr>
				</table>
				<div id="searchDivisionUser" style="height:232px; overflow-y:scroll; background:#fff;">
					<!-- 담당영업 시작 -->
					<!-- 담당영업 끝 -->
				</div>
			</div>
		
		</div>
	</div>
	<div class="btn_action">
		<div class="infobot" style="font-size: 13px; padding-left:5px;font-weight: bold;"><span>Sales Status</span></div>
		<ul>
			<li><a href="javascript:excelDataSend()"><img src="/images/btn/excel_down.gif" alt="엑셀 다운로드" /></a></li>
		</ul>
	</div>
	<div class="con_table">
		<!--  table start -->
		<div class="Wrap_table" >
			<!--  top -->
			<!--  scroll area -->
			<div id="mainTitle" style="overflow-y:scroll;">
				<table class="Normal_table">
					<tr>
						<th width="13%">사업부</th>
						<th width="12%">담당영업</th>
						<th width="20%">계약 금액</th>
						<th width="15%">영업 이익</th>
						<th width="12%">영업 이익률(%)</th>					   
						<th width="12%">전체 매출대비(%)</th>
						<th width="16%" class="right">전체 영업 이익 대비(%)</th>
					</tr>
				</table>
			</div>
			<div id="mainList" class="txtclr" style="height:297px; overflow-y:scroll;">
				<!-- Sales Status 시작 -->
				<!-- Sales Status 끝 -->
			</div>
			<!--  bottom -->
			<div id="mainSumList" class="txtclr" style="overflow-y:scroll; height:34px;">
				<!-- Sales Status 합계 시작 -->
				<!-- Sales Status 합계 끝 -->
			</div>
		</div>
	</div>
	<!--  //table end -->		
	<div class="btn_action alignright" style="height:45px;">
		<a href="javascript:;" onclick="showDetail(); return false;"><img src="/images/btn/btn_detail_open.gif" id="detailShowImg" alt="show"/></a>
	</div>
	<!--상세보기 테이블 -->
	<div class="Show_detail hide">
		<!--  table start -->
		<div class="Wrap_table" >
			<div class="detail_title">Sales Status 현황</div>
			<!--  top -->
			<!--  scroll area -->
			<div id="detailTitle" style="overflow-y:scroll;">
				<table class="Normal_table">
					<tr>
						<th width="10%">사업부</th>
						<th width="10%">담당영업</th>
						<th width="8%">계약시점</th>
						<th width="5%">ALC</th>
						<th width="12%">영업현황</th>					   
						<th width="5%">구분</th>
						<th width="8%">고객사명</th>
						<th width="7%">Type</th>
						<th width="10%">제품</th>
						<th width="5%">수량</th>
						<th width="10%">계약 금액</th>
						<th width="10%" class="right">영업 이익</th>
					</tr>
				</table>
			</div>
			
			<div id="detailList" class="txtclr" style="height:297px; overflow-y:scroll;">
				<!-- Sales Status 현황 시작 -->
				<!-- Sales Status 현황 끝 -->
			</div>
			
			<div id="detailSumList" class="txtclr" style="overflow-y:scroll; height:34px;">
				<!-- Sales Status 현황 합계 시작 -->
				<!-- Sales Status 현황 합계 끝 -->
			</div>			
		</div>
		
		<div style="height:30px"></div>		
	</div>
	<!--//상세보기 테이블 -->	
</form:form>

<script src="/js/sam/fcastingstatus/fcastingstatusfnc.js"></script>
<script src="/js/sam/fcastingstatus/fcastingstatuspages.js"></script>