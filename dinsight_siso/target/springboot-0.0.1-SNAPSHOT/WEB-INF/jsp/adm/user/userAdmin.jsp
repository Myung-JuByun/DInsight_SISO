<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style type="text/css">	.tree_menu span:hover {color:blue; cursor:pointer}</style>

<script src="/js/adm/user/userpages.js"></script>
<script src="/js/adm/user/userfnc.js"></script>
<script src="/js/adm/user/userpop.js"></script>

<form:form commandName="searchVO" method="post" id="searchForm" name="searchForm">
	<div class="Left_group2">
		<!-- button start -->	
		<div class="btn_action">
			<ul>
				 <li><a href="javascript:divisionAdd()"><img src="/images/btn/btn_plus_on.gif" alt="추가"/></a></li>
				 <li><a href="javascript:divisionModi()"><img src="/images/btn/btn_modify_on.gif" alt="수정"/></a></li>
				 <li><a href="javascript:divisionDel()"><img src="/images/btn/btn_del_on.gif" alt="삭제"/></a></li>
			</ul>
		</div>		
		<!--// button end -->

		<!--  table start -->
		<div class="left_table2" style="height:500px;">
			<table style="width:260px" class="Normal_table">
				<tr>
					<th class="right"> 부서명 </th>
				</tr>					
			</table>
			
			<table style="width:100%" >
				<tr>
					<td class="right">
						<div class="tree_menu" id="tree_menu">
						<!-- 트리메뉴 시작 -->
						<!-- 트리메뉴 끝 -->
						</div>
					</td>
				</tr>			
			</table>
		</div>
	
	</div>	
	
	<div class="Right_group2">
		<!-- button start -->			
		<div class="btn_action">
			<ul>
				 <li><a href="javascript:userAdd()"><img src="/images/btn/btn_plus_on.gif" alt="추가"/></a></li>
				 <li><a href="javascript:userModi()"><img src="/images/btn/btn_modify_on.gif" alt="수정"/></a></li>
				 <li><a href="javascript:userDel()"><img src="/images/btn/btn_del_on.gif" alt="삭제"/></a></li>
				 <li><a href="javascript:userHead()"><img src="/images/btn/btn_approval_on.gif" alt=""/></a></li>
				 <li><a href="javascript:userPass()"><img src="/images/btn/btn_reset_on.gif" alt="패스워드초기화"/></a></li>
			</ul>
		</div>			
		<!--// button end -->			

		<!--  table start -->
		<div class="Right_table3">
			<table class="Normal_table">
				<thead>
					<tr>
						<th width="39px"><input id="allchk" type="checkbox" class="CheckMode" onclick="GroupCheck('CheckMode', 'payment_id')"></th>
						<th width="39px"> No</th>
						<th width="99px">이름</th>
						<th width="99px">로그인 ID</th>
						<th>부서</th>
						<th width="89px">직책</th>
						<th width="79px">고용구분</th>
						<th width="59px">활성유무</th>
						<th width="59px" class="right">삭제유무</th>
					</tr>
				</thead>
			</table>
			<div id="userTb" style="height:467px; overflow-y:scroll;">
				<table class="Normal_table">
					<tbody id="userListView">
						<!-- 직원리스트 시작 -->
						<!-- 직원리스트 끝 -->
					</tbody>
				</table>
			</div>
		</div>
		<!--  //table end -->
	</div>
</form:form>