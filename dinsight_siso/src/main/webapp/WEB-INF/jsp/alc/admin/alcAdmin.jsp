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
<!-- <div class="descript"><span>Product</span></div> -->
	<ul>
		<li></li>
		<li><a href="javascript:alcAdminAddPop('A')"><img src="/images/btn/btn_plus_on.gif"    alt="추가"/></a></li>
		<!-- <li><a href="javascript:alcAdminAddPop('M')"><img src="/images/btn_modify_on.gif"     alt="수정"/></a></li> -->
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
						<th width="18%">Portfolio</th>
						<th width="10%">Prd.Number</th>
						<th width="10%">Type</th>
						<th width="10%">Trigram</th>
						<th width="20%">Portfolio Item Name</th>
						<th width="5%">Copy</th>
						<th width="10%">사업장</th>
						<th width="10%">담당영업</th>
						<th width="7%" class="right">상세보기</th>
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

<script src="/js/alc/admin/alcadmin.js"></script>
<script src="/js/alc/admin/alcadminpages.js"></script>
<script src="/js/alc/admin/alcadminfnc.js"></script>
<script src="/js/alc/admin/alcadminpop.js"></script>
<script>
	$(document).ready(function(){	
		defaultLoadList();
	});
</script>