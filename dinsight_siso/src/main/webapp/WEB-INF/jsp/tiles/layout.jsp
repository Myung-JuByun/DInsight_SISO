<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %> 
<%@ page import="java.util.*" %>

<!DOCTYPE html>
<html lang="ko">
	<tiles:insertAttribute name="common" />

	<body>
		<div id="Wrapper">
			<!-- left menu start-->
			<div id="Left_wrap">
				<tiles:insertAttribute name="left" />
			</div>		
			<!--//left menu end-->
			
			<div class="info" id="top_info"></div>
			<div class="clear"></div>
			
			<!-- Content start-->
			<div id="Center_wrap">
				<tiles:insertAttribute name="top" />
				<tiles:insertAttribute name="content" />			
			</div>
			<!-- Content end-->
			
			<!-- Rignt menu start-->
			<div id="Right_wrap">
				<tiles:insertAttribute name="right" />
			</div>
			<!--// right menu end-->
		</div>	
	</body>
</html>	