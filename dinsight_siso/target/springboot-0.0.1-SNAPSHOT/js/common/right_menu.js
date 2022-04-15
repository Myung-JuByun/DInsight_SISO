
document.getElementById("Right_wrap").childNodes[1].childNodes[0].opt=false;
rightFold();

function rightFold(){
	var dv=document.getElementById("Right_wrap"),
		cdv=document.getElementById("Center_wrap"),
		list=document.getElementById("r_menu"),
		rightimg=document.getElementById("right00"),
		btn=dv.childNodes[1].childNodes[0];
	btn.opt=true;
	btn.onclick=function(){
		rightClick(btn.opt);
	};	
	cf.setCss(btn,{cursor:"pointer"});
	//cf.setCss(top_info,{marginRight:120+"px"});
	cf.setCss(list,{display:"none"});
	cf.setCss(dv,{minHeight:0+"px",height:0+"px"});
	cf.setCss(cdv,{width:83+"%"});
};
function rightClick(opt){
	var dv=document.getElementById("Right_wrap"),
		cdv=document.getElementById("Center_wrap"),
		list=document.getElementById("r_menu"),
		rightimg=document.getElementById("right00"),
		btn=dv.childNodes[1].childNodes[0];
	
	if(opt){
		rightimg.src="/images/main/right_00_open.gif";
		btn.opt=false;
		cf.setCss(btn,{cursor:"pointer"});
		//cf.setCss(top_info,{marginRight:0+"px"});
		cf.setCss(list,{display:"block"});
		cf.setCss(dv,{minHeight:928+"px",height:100+"%"});
		cf.setCss(cdv,{width:72+"%"});
	}else{
		rightimg.src="/images/main/right_00_hide.gif";
		btn.opt=true;
		cf.setCss(btn,{cursor:"pointer"});
		//cf.setCss(top_info,{marginRight:120+"px"});
		cf.setCss(list,{display:"none"});
		cf.setCss(dv,{minHeight:0+"px",height:0+"px"});
		cf.setCss(cdv,{width:83+"%"});
	}
};