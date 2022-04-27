<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="/template/alc/alcAdmin" %>

<script src="/js/alc/admin/alcadminpages.js"></script>
<script src="/js/alc/admin/alcadminfnc.js"></script>
<script src="/js/alc/admin/alcadminpop.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				prdNo : "Prd.Number",
				pin : "Portfolio Item Name",
				busiPlace : "사업장",
				chargeSales : "담당영업",
				seeDetail : "상세보기"
			}
		});
		
		defaultLoadList();
	});
</script>