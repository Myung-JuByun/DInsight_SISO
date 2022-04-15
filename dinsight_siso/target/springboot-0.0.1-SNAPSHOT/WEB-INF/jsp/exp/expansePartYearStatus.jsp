<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="search"> 
	<table>
		<tr>
			<td><input />년도</td>
			<td>&nbsp;&nbsp;&nbsp;&nbsp;
				<select id="" name="">
					<option>01</option>
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
				</select>월
			</td>
		</tr>
	</table>
	<div class="btn_go">
		<a href="javascript:;"><img src="<c:url value='/images/btn/btn_go.gif'/>" alt="조회" /></a>
	</div>
</div>
<!--// search end -->

<!-- button start -->

<div class="btn_action">
	<ul>
		 <li><a href=""><img src="<c:url value='/images/btn/btn_exldown_on.gif'/>" alt="엑셀 다운로드"/></a></li>
	</ul>
</div>

<!--// button end -->

<!--  table start -->
<div id="tableContainer" class="tableContainer">
	<table class="scrollTable" style="width:100%; border:0;">
		<thead>
			<tr>
			    <th style="border-left:none;width:80px;" rowspan="3" ></th>
				<th style="border-right:none;" class="last" colspan="8">일반경비</th>
			</tr>
			<tr class="alternateRow">
				<th>교육비</th>
				<th>복리후생비</th>
				<th>운반비</th>
				<th colspan="4">자가운전비</th>
				<th style="border-right:none;" class="last">기타생락</th>
			</tr>
			<tr class="alternateRow">
			    <th>소액교통</th>
				<th>식대비</th>
				<th>택배비</th>
				<th>마일리지(자차운행)</th>
				<th>주유비</th>
				<th>주차비</th>
				<th>통행료</th>
				<th style="border-right:none;" class="last">기타생락</th>
			</tr>
		</thead>
		<tbody class="scrollContent">
			<tr class="mouse_over">
				<td class="btn_img t2" style="position:relative;">1월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr class="on_click">
				<td class="btn_img t2" style="position:relative;">2월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">3월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">4월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">5월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">6월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">7월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">8월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">9월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">10월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">11월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
			<tr>
				<td class="btn_img t2" style="position:relative;">12월</td>
				<td>1,884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>884,530&nbsp;&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;</td>
				<td>0&nbsp;&nbsp;</td>
			</tr>
		</tbody>
	</table>
</div>
<!--  //table end -->

<script>
	function fn_selectGudsAjax(){
		var keyarray = new Array();
	    var arg1=$('#expanseYear').val();
	    var arg2=$('#expanseMonth').val();
	    
	    $.ajax({
		    type: "POST",
		    url: "/siso/exp/selectExpanseAdmin",
		    data: { "expanseYear" : arg1 },
		    success: function(msg){
				var json = eval('(' + msg + ')');
				var jsonlength = json.GetExpanseData.length;			    
				alert(msg);
				alert(json);
				alert(jsonlength);
				alert('값=' + json.GetExpanseData[0].expanseYear);
		
				//Json의 값이 있으면 실행
				if(jsonlength > 0){
				      for(var i=0; i<jsonlength; i++){  
				 	   var isOverLap = false;			              
				 	   alert(json[i].expanseYear);
				      }
				}			     
				alert(isOverLap);		       
				if(!isOverLap){}
				$('.wrap-loading').hide(20);
	   		},
	   		beforeSend:function(){
	   			$('.wrap-loading').show();
	   		}
		});
	}

</script>
