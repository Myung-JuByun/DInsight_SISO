<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search"> 				
	<input value="2014" />년도 &nbsp;&nbsp;&nbsp;&nbsp;	
	<select id="" name="">
		<option >01</option>
		<option >02</option>
		<option >03</option>
		<option >04</option>
		<option >05</option>
		<option >06</option>
		<option >07</option>
		<option >08</option>
		<option >09</option>
		<option >10</option>
		<option >11</option>
		<option >12</option>
	</select>
	월
	&nbsp;&nbsp;&nbsp;&nbsp;
	<img src="<c:url value='/images/ico/bar.gif'/>" alt=""/>&nbsp;&nbsp;&nbsp;&nbsp;
	열 
	<select id="" name="">
		<option>계정</option>
		<option>02</option>
		<option>03</option>
		<option>04</option>
		<option>05</option>
		<option>06</option>
		<option>07</option>
		<option>08</option>
		<option>09</option>
		<option>10</option>
		<option>11</option>
		<option>12</option>
	</select>	
	
	<div class="btn_go">
		<a href=""><img src="<c:url value='/images/btn/btn_go.gif'/>" alt="조회" /></a>
	</div>
</div>
<!--// search end -->
	
<!-- button start -->	
<div class="btn_action">
	<ul>
		 <li class="last"><a href=""><img src="<c:url value='/images/btn/btn_savexl.gif'/>" alt="저장"/></a></li>
	</ul>
</div>
<!--// button end -->

<!--  Scroll table start -->
<div class="con_table">
	<div id="tableContainer" class="tableContainer2">
		<table class="scrollTable MonthTable">
			<thead>
				<tr>
					<th width="105"></th>
					<th width="70"></th>
					<th width="108">광고선전비</th>
					<th width="108">교육훈련비</th>
					<th width="108">국내여비교통비</th>
					<th width="108">보험료</th>
					<th width="108">복리후생비</th>
					<th width="108">비고</th>
					<th width="108">기타1</th>
					<th>기타2</th>
			   </tr>
			</thead>
			<tbody>  
    			<tr>
					<td width="105" rowspan="3" class="btn_use mt1">3D융합사업부 <a href=""><img src="<c:url value='/images/btn/btn_plus.gif'/>" alt="" /></a></td>
					<td width="70" class="mt2">홍길동</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108"></td>
	   			</tr>
	    		<tr>
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">557,300</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
	   			</tr>
				<tr>			
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">202,000</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
	   			</tr>
	   			<tr>
					<td colspan="2" class="sum1" align="center">3D융합사업부 합계</td>		
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
				</tr>
	   			<tr>
					<td width="105" rowspan="3" class="btn_use mt1">경영지원부 <a href=""><img src="<c:url value='/images/btn/btn_minus.gif'/>" alt="" /></a></td>
					<td width="70" class="mt2">홍길동</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108"></td>
				</tr>
			    <tr>
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">557,300</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
				</tr>
				<tr>
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">202,000</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
			   </tr>
			   <tr>
					<td colspan="2" class="sum1" align="center">경영지원부 합계</td>				
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
			   </tr>					   
			   <!--공공사업부 시작-->
			   <tr>
					<td width="105" rowspan="3" class="btn_use mt1">공공사업부 <a href=""><img src="<c:url value='/images/btn/btn_minus.gif'/>" alt="" /></a></td>
					<td width="70" class="mt2">홍길동</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108">6,000</td>
					<td width="108"></td>
					<td width="108"></td>
					<td width="108"></td>
				</tr>
			    <tr>
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">557,300</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
			   </tr>		
			    <tr>
					<td width="70" class="mt2">홍길동</td>
					<td width="108">광고선전비</td>
					<td width="108">교육훈련비</td>
					<td width="108">202,000</td>
					<td width="108">보험료</td>
					<td width="108">복리후생비</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
			   </tr>
			   <tr>
					<td colspan="2" class="sum1" align="center">공공사업부 합계</td>				
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108" class="sum2"></td>
					<td width="108" class="sum2">765,300</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
					<td width="108">비고</td>
			   </tr>
	   	   </tbody>
		</table>
	</div>
</div>
<!--  //table end -->