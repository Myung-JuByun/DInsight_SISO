<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="layer">
	<div class="bg"></div>
	<div id="mileage_pop" class="pop-layer movePopup" style="width:77%; height:600px">
		<div class="mil_top my_top"> 마일리지 입력 <a href="javascript:;" class="layerClose"><img src="/images/pop_btn/btn_pop_close.png" alt="닫기" align="right" style="padding-right:10px"/></a> </div>
		<div class="mil-container">				
			<%@ include file="/template/expanseMileage" %>
		</div>
	</div>
</div>