<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	img {cursor: pointer}
</style>

<div class="search3" id="searchDiv"></div>
<!--// search end -->

<!-- button start -->
<div class="btn_action">
	<div class="descript asterisk infobot">
		<span>* 표시는 필수 입력 항목입니다.</span>
	</div>
	<ul>
		<li><a href="javascript:pcodeAdd()"><img src="/images/btn/btn_plus_on.gif" alt="추가" /></a></li>
		<li><a href="javascript:pcodeDel()"><img src="/images/btn/btn_del_on.gif" alt="삭제" /></a></li>
		<li><a href="javascript:pcodeSave()"><img src="/images/btn/btn_save_on.gif" alt="저장" /></a></li>
	</ul>
</div>
<!--// button end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div class="pCodeTable" id="pCodeTable">
			<table style="width:1700px" class="scrollTable">
				<thead>
					<tr>
						<th width="2%"><input type="checkbox" class="CheckMode"
							onclick="checkMode(this)"></th>
						<th width="4%">년도</th>
						<th width="3%">월</th>
						<th width="5%">구분<span class="asterisk">*</span></th>
						<th width="8%">고객사명<span class="asterisk">*</span></th>
						<th width="4%">ALC<span class="asterisk">*</span></th>
						<th width="7%">Type<span class="asterisk">*</span></th>
						<th width="7%">제품<span class="asterisk">*</span></th>
						<!-- <th width="6%">추정금액<span class="asterisk">*</span></th> -->
						<th width="7%" id="status_info"><div>영업 현황&nbsp;</div></th>
						<th width="5%">Closing</th>
						<th width="6%">부서<span class="asterisk">*</span></th>
						<th width="6%">담당영업<span class="asterisk">*</span></th>
						<th width="8%">Project Code</th>
						<th width="7%">계약예정금액<span class="asterisk">*</span></th>
						<th width="7%">매입금액<span class="asterisk">*</span></th>
						<th width="7%">영업이익</th>
						<th width="4%">완료여부</th>
						<th width="5%" class="right">수정자</th>
					</tr>
				</thead>
				<tbody id="pcodeView" class="txtclr">
				</tbody>
			</table>
		</div>
	</div>
</div>
<!--  //table end -->

<script>
	var login_userid = "<c:out value='${loginVO.user_id}' />";
</script>
<script src="/js/sam/pcode/pcodefnc.js"></script>
<script src="/js/sam/pcode/pcodepages.js"></script>