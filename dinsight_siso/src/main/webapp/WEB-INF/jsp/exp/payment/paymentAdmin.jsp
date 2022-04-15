<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">
	img {vertical-align: middle;}
	.paddingLeft {padding-left:5px;}
	.selected {color:blue}
	.confirm_div ul li:hover {color:blue; cursor:pointer}
	.tree_menu span:hover {color:blue; cursor:pointer}
</style>

<div class="search">
	<table>
		<tr>
			<td style="font-weight: bold">결재 요청 구분&nbsp;&nbsp;&nbsp;&nbsp;</td>
			<td>
				<select name="sh_payment_type" class="sh_payment_type select2" title="결재요청구분" onchange="">
					<option value="01">경비</option>
					<option value="02">프로젝트</option>
					<option value="03">M/H</option>
				</select>
			</td>
		</tr>
	</table>
</div>
<!--// search end -->

<div class="Left_wrap2">
<!--  table start -->

	<div class="Left_group4_3">
		<div class="title2">조직도</div>
		<div class="left_table4">
			<table class="Normal_table">
				<tr height="158px">
					<td class="right">
						<div class="tree_menu" id="tree_menu">
						<!-- 트리메뉴 시작 -->
						<!-- 트리메뉴 끝 -->
						</div>
					</td>
				</tr>
				<tr>
					<td class="right end"  align="right">
						<a href="javascript:treeView('Y')"><img src="/images/exp_payment/btn_openall.gif"alt="전체펼침" /></a>
						<a href="javascript:treeView('N')"><img src="/images/exp_payment/btn_closeall.gif"alt="전체닫기" /></a>
					</td>
				</tr>
			</table>
		</div>
	</div>		

	<!--2nd table start -->
	<div class="Left_group4">
		<div class="title3">
			<div class="group_search"><input type="text" name="" id="" size="33" value="  이름을 입력하세요  ex)홍길동" style="border:1px solid #dbdbdb;">&nbsp; <img src="/images/ico/btn_search_small.gif" alt="search" style="vertical-align:middle"></div>
		</div>
		<div class="left_table4">
			<table class="Normal_table">
				<tr>
					<th width="31px"></th>
				 	<th width="60px">이름</th>
				 	<th width="50px">직위</th>
				 	<th width="90px" class="right">부서</th>
				 	<th width="10px" class="right">&nbsp;</th>
				</tr>
				<tr height="220px">
					<td colspan="5" class="right">
						<div style="height:255px;overflow:auto;">
							<table class="Normal_table">
								<tbody id="userListView">
								<!-- 직원리스트 시작 -->
								<!-- 직원리스트 끝 -->
								</tbody>
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td align="right" colspan="4" class="right end">
						<a href="javascript:GroupCheckMode('Y','payment_id')"><img src="/images/exp_payment/btn_selectall.gif" alt="" /></a>
						<a href="javascript:GroupCheckMode('N','payment_id')"><img src="/images/exp_payment/btn_deselectall.gif" alt="" /></a>
					</td>
				</tr>
			</table>
		</div>
	</div>

	<!--3rd btns start -->
	<div class="Left_group5">
		<ul>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_ex.gif" alt="검토"/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_ok.gif" alt="승인"/></a></li>
		</ul>
	</div>
	<!--//3rd btns end -->
</div>
<!--//left end -->

<!--결재선 순서 지정 -->
<div class="Right_group4">
	<div class="title2">결재선(순서 ▼)</div>
	<div class="confirm_div">
		<ul>			
		</ul>
	</div>
	<div class="confirm_btns">
		<ul>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_up.gif" alt=""/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_down.gif" alt=""/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_top.gif" alt=""/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_bottom.gif" alt=""/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_del.gif" alt=""/></a></li>
			<li><a href="javascript:void(0)"><img src="/images/exp_payment/btn_delall.gif" alt=""/></a></li>
		</ul>
	</div>
</div>
<!--//결재선 순서 지정 end -->

<div class="clear"></div>

<div class="Wrap_table2">
   <table class="Normal_table">
	   <tbody>
		   <tr>
			   <th width="80"> 결재 </th>
			   <td class="right pd10">
					<table style="height:60px" class="in_table">
						<tr></tr>
						<tr></tr>
					</table>
				</td>
			</tr>
			<tr>
				<th width="80" class="non-bt"> 수신 </th>
				<td class="right pd10 " style="border-bottom:none;">
					<table style="height:60px" class="in_table">
						<tr></tr>
						<tr></tr>
					</table>
				</td>
			</tr>
		</tbody>
	 </table>
</div>
<!--  //table end -->

<div class="savebtn">
	<a href="javascript:btnSaveClick('Y')"><img src="/images/btn/btn_save_big.gif" alt="저장" /></a>
	<a href="javascript:btnSaveClick('N')"><img src="/images/btn/btn_cancel_big.gif" alt="취소" /></a>
</div>	

<script src="/js/exp/payment/paymentfnc.js"></script>
<script src="/js/exp/payment/paymentpages.js"></script>