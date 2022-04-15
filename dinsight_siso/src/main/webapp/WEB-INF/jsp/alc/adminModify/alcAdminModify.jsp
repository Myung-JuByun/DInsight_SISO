<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<div class="search" id="searchDiv"></div>
<!--// search end -->

<!-- button start -->			
<div class="btn_action">
	<ul>
		<li><a href="javascript:alcAdminAddPop('M')"><img src="/images/btn/btn_modify_on.gif"     alt="수정"/></a></li>
	</ul>
</div>			
<!--// button end -->

<!--  table start -->
<div class="con_table">
	<div class="Wrap_table">
		<div style="overflow-y:scroll;">
			<table class="project_table Normal_table" style="text-align:center">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" id="allCheck" name="allCheck"></th>
						<th width="10%">고객사</th>
						<th width="10%">Portfolio</th>
						<th width="7%">Prd.Number</th>
						<th width="5%">Type</th>
						<th width="10%">Trigram</th>
						<th width="10%">Portfolio<br>Item Name</th>
						<th width="5%">파훼여부</th>
						<th width="10%">발주기간</th>
						<th width="10%">설치사</th>
						<th width="5%">copy</th>
						<th width="10%">설치기간</th>
						<th width="5%" class="right">설치사<br>동일여부</th>
					</tr>							
				</thead>
			</table>
		</div>
		<div style="overflow-y:scroll; height:364px;">
			<table class="project_table Normal_table" style="text-align:center">
				<tbody id="alcView"></tbody> 
			</table>
		</div>
	</div>
</div>
<!--  //table end -->	
			
<script src="/js/alc/adminModify/alcadminModify.js"></script>
<script src="/js/alc/adminModify/alcadminModifypages.js"></script>
<script src="/js/alc/adminModify/alcadminModifyfnc.js"></script>
<script src="/js/alc/adminModify/alcadminModifypop.js"></script>
<script>
	$(document).ready(function(){	
		defaultLoadList();
	});
</script>
