<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/template/exp/indivisualStatus" %>

<script src="/js/exp/individual/individualfnc.js"></script>
<script src="/js/exp/individual/individualpages.js"></script>
<script>
	$(document).ready(function(){
		new Vue({
			el : ".con_table",
			data : {
				month : "월",
				pCoproration : "개인법인",
				pCredit : "개인신용",
				pCash : "개인현금",
				commonCop : "공통법인",
				mileage : "마일리지",
				tot : "합계",
				processState : "진행상황"
			}
		});
		
		mkSearchDiv();
		defaultLoadList();
	});
</script>