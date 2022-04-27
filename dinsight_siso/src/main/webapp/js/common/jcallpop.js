var SCREEN_SIZE_WIDTH=cf.workareawidth;
	SCREEN_SIZE_HEIGHT=cf.workareaheight;

function callPop(con){	
	con.className="movePopup";
	
	var w=SCREEN_SIZE_WIDTH, h=SCREEN_SIZE_HEIGHT;
	var cvr=cf.mkAbsoluteDiv(0,0,w,h,document.body);	
	cf.setCss(cvr, {position:"fixed", backgroundColor:"rgba(0,0,0,0.5)", zIndex:10000, overflow:"hidden"});
	
	var nf=cf.getxywhfromdiv(con);
	con.style.left=(w/2-nf.w/2)+"px";
	
	if(nf.mh>0&&nf.h>=nf.mh)con.style.top=(h/2-nf.mh/2)+"px";
	else con.style.top=(h/2-nf.h/2)+"px";
	cvr.appendChild(con);
	
	cvr.onclick=function(){
		//cf.killTag(this);
	};
	
	$(".my_top").css("cursor","move");
	$(".movePopup").draggable({ handle: ".my_top" });
};
function generalPop(msg,fnc,opt){
	if(msg.indexOf('에러') > -1) {
		$('.wrap-loading').addClass('hide');
	}	
	var con=document.createElement("div"),
		con2=cf.mkTag("div",con),
		con3=cf.mkTag("div",con2),
		cen=cf.mkTag("center",con2),
		btn1=cf.mkTag("button",cen);
	
	if(fnc){
		var	spc=cf.mkTag("span",cen),
			btn2=cf.mkTag("button",cen);
	}
	
	con2.className="popup_alert";
	con3.className="popup_alert_msg";
	con3.innerHTML="<br/>"+msg+"<br/><br/><br/>";
	
	btn1.className="ct-btn red small";
	btn1.innerHTML="확인";
	btn1.id="popbtn1";
	if(!opt && fnc){
		btn2.className="ct-btn grey small";
		btn2.innerHTML="취소";
		spc.innerHTML="&nbsp;&nbsp;";
		
		btn2.onclick=function(){
			cf.killTag(con.parentNode);
		};
	}	
	btn1.onclick=function(){
		if(fnc)	fnc();
		cf.killTag(con.parentNode);
	};

	cf.setCss(con3,{margin:"0 auto",textAlign:"center"});
	cf.setCss(con2,{borderRadius:"5px",backgroundColor:"#fff"});
	cf.setCss(con,{position:"absolute",width:"300px",height:"151px"});
	callPop(con);
	keydefault();
};
function generalPop2(msg,str1,str2,fnc1,fnc2){
	var pcon=document.createElement("div"),
		con2=cf.mkTag("div",pcon),
		con2_a=cf.mkTag("div",con2),
		con2_img=cf.mkTag("img",con2_a),
		con3=cf.mkTag("div",con2),
		cen=cf.mkTag("div",con2),
		btn_s=cf.mkTag("button",cen),
		spc=cf.mkTag("span",cen),
		btn_e=cf.mkTag("button",cen);
	
	con2.className="popup_alert";
	con3.className="popup_alert_msg";
	con2_a.href="#";
	con2_img.src="/images/pop_btn/btn_pop_close.png";
	con2_img.alt="닫기";
	con2_img.align="right";
	con2_img.onclick=function(){
		cf.killTag(pcon.parentNode);
	};	
	
	con3.innerHTML=""+msg+"</br>";
	btn_s.className="ct-btn grey small";
	btn_s.innerHTML=str1;
	btn_s.id="popbtn1";
	spc.innerHTML="&nbsp;&nbsp;";
	btn_e.className="ct-btn darkgrey small";
	btn_e.innerHTML=str2;
	
	btn_s.focus();
	
	btn_s.onclick=function(){
		if(fnc1)fnc1();
		cf.killTag(pcon.parentNode);
	};
	btn_e.onclick=function(){
		if(fnc2)fnc2();
		cf.killTag(pcon.parentNode);
	};
	
	cf.setCss(con2_a,{position: "absolute",top:0,right:0,padding:"10px",cursor:"pointer",});
	cf.setCss(con3,{textAlign:"center",paddingTop:"20px",height:"50px",lineHeight:1});
	cf.setCss(con2,{borderRadius:"7px",backgroundColor:"#fff",border:"1px solid #626262"});
	cf.setCss(pcon,{position:"absolute",width:"300px",height:"151px"});
	cf.setCss(cen,{paddingBottom:"20px",textAlign:"center",});	
	callPop(pcon);
	keydefault();
};
function generalPopOk(msg,fnc){
	var con=document.createElement("div"),
		con2=cf.mkTag("div",con),
		con3=cf.mkTag("div",con2),
		con4=cf.mkTag("div",con2),
		btn1=cf.mkTag("button",con4);
	
	con2.className="popup_alert";
	con3.className="popup_alert_msg";
	con3.innerHTML="<br/>"+msg+"<br/><br/><br/>";
	
	btn1.className="ct-btn red small";
	btn1.innerHTML="확인";
	btn1.id="popbtn1";
	btn1.onclick=function(){
		if(fnc)	fnc();
		cf.killTag(con.parentNode);
	};

	cf.setCss(con3,{margin:"0 auto"});
	cf.setCss(con2,{borderRadius:"7px",backgroundColor:"#fff"});
	cf.setCss(con,{position:"absolute",width:"300px",height:"151px"});
	callPop(con);
	keydefault();
};
function generalPopOk2(msg,fnc){
	var con=document.createElement("div"),
		con2=cf.mkTag("div",con),
		con3=cf.mkTag("div",con2),
		con4=cf.mkTag("div",con2),
		btn1=cf.mkTag("button",con4);
	
	con2.className="popup_alert";
	con3.className="popup_alert_msg";
	con3.innerHTML="<br/><img src='/images/ico/icon_alert.gif' style='vertical-align: middle;''>"+msg+"<br/><br/><br/>";
	
	btn1.className="ct-btn red small";
	btn1.innerHTML="확인";
	btn1.id="popbtn1";
	btn1.onclick=function(){
		if(fnc)	fnc();
		cf.killTag(con.parentNode);
	};

	cf.setCss(con3,{margin:"0 auto"});
	cf.setCss(con2,{borderRadius:"7px",backgroundColor:"#fff"});
	cf.setCss(con,{position:"absolute",width:"300px",height:"151px"});
	callPop(con);
	keydefault();
};