chk_submit();
function chk_submit(){
	var img_btn=document.getElementById("btn_submit"),
		chk=document.getElementsByName("chk_submit");
	if(chk.length>0){
		chk.trav(function(d,i){
			if(d.value=="702"||d.value=="703"){
				img_btn.src="/images/btn/btn_submit_done.gif";
			}else{
				img_btn.src="/images/btn/btn_submit.gif";
				img_btn.onclick=function(){
					expanseAdminFinalInsert();
				};
			}
		});
		//expanseAdminFinalInsert()
	}else{
		img_btn.onclick=function(){
			generalPop("경비/마일리지 저장 후 경비제출을 하실 수 있습니다.");
		};
	}
};