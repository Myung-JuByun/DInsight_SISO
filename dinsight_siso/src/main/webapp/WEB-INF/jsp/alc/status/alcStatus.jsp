<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/template/alcStatus" %>

<script src="/js/alc/status/alcstatus.js"></script>
<script src="/js/alc/status/alcstatuspages.js"></script>
<script src="/js/alc/status/alcstatusfnc.js"></script>
<script src="/js/alc/status/alcstatuspop.js"></script>
<script>
	new Vue({
		el : ".con_table",
		data : {
			yScroll : "overflow-y:scroll;",
			tCenter : "text-align:center",
			yScroll2 : this.yScroll + "height:364px;",
			tblClass : "project_table Normal_table",			
		}		
	});
	
	$(document).ready(function(){	
		defaultLoadList();
	});
</script>