<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search"> 			
	<input value="2014"> 년도 &nbsp;&nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp;&nbsp;
	<img src="<c:url value='/images/ico/bar.gif'/>" alt="">&nbsp;&nbsp;&nbsp;&nbsp;행&nbsp;&nbsp;
	<select id="" name="">
		<option>분류항목</option>
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
	&nbsp;&nbsp;열 
	<select id="" name="">
		<option>월</option>
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
		<a href="javascript:;"><img src="<c:url value='/images/btn/btn_go.gif'/>" alt="조회"></a>
	</div>
</div>
<!--// search end -->

<!-- button start -->
<div class="btn_action">
	<ul>
		 <li class="last"><a href=""><img src="<c:url value='/images/btn/btn_savexl.gif'/>" alt="저장"></a></li>
	</ul>
</div>
<!--// button end -->

<!--//레이어 팝업 사용시 위치 -->

<!-- table start-->	
<div id="tableContainer" class="tableContainer">		
	<table class="scrollTable" style="width:100%">
		<thead class="fixedHeader">
			<tr class="alternateRow">
				<th style="border-left:none;"></th>
				<th></th>
				<th></th>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>
				<th>7</th>
				<th>8</th>
				<th>9</th>
				<th>10</th>
				<th>11</th>
				<th>12</th>
				<th style="border-right:none;" class="last">합계</th>
			</tr>
		</thead>
		<tbody class="scrollContent">
			<tr>
				<td rowspan="18" class="btn_img t2" style="position:relative;">일반경비<a href=""><img src="<c:url value='/images/btn/btn_plus.gif'/>" alt="" /></a></td>
				<td rowspan="3"class="btn_img t2" >
	
				교통비<a href=""><img src="<c:url value='/images/btn/btn_plus.gif'/>" alt="" /></a>
				
				</td>
				<td class="t1">소액교통</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td class="mouse_over">884,530&nbsp;&nbsp;</td>
				<td class="on_click">884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>6&nbsp;</td>
				<td>7&nbsp;</td>
				<td>8&nbsp;</td>
				<td>9&nbsp;</td>
				<td>10&nbsp;</td>
				<td>11&nbsp;</td>
				<td>12&nbsp;</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				
				
				<td class="t1">철도</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td class="mouse_over">884,530&nbsp;&nbsp;</td>
				<td class="on_click">884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				
				
				<td class="t1">항공</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td class="mouse_over">884,530&nbsp;&nbsp;</td>
				<td class="on_click">884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>				
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<!--교통비 끝-->
			
			<tr>
				
				<td rowspan="5" class="t3 btn_img"> 기타 <a href=""><img src="<c:url value='/images/btn/btn_minus.gif'/>" alt="" /></a></td>
				<td class="t1">광고선전비</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="t1">도서구입</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="t1">인증시험</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="t1">잡비</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="t1">지급수수료</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2">12,108,230&nbsp;&nbsp;</td>
			</tr>			
			<!--기타경비 끝-->
			<tr>
				<td rowspan="10" class="t2 btn_img">복리후생비 <a href=""><img src="<c:url value='/images/btn/btn_plus.gif'/>" alt="" /></a></td>
				<td class="t1">교육비</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="alternateRow">
				<td class="t1">식대비</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr>
				<td class="t1">기타복리</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="alternateRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="normalRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
	            <td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="alternateRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="normalRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="alternateRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="normalRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>
			<tr class="alternateRow">
				<td class="t1">기타</td>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>7</td>
				<td>8</td>
				<td>9</td>
				<td>10</td>
				<td>11</td>
				<td>12</td>
				<td class="last sum2"></td>
			</tr>		
		</tbody>
	</table>
</div>
<!-- table end-->	