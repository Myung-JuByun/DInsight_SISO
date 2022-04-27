function jCON(obj){
	var l=this,	
		bx=cf.mkTag("div",obj.p);
	l.header=cf.mkTag("div",bx);
	var cl=cf.mkTag("div",bx);	
	l.body=cf.mkTag("div",bx);
	var cl2=cf.mkTag("div",bx);	
	l.footer=cf.mkTag("div",bx);
	
	this.delHeader=function(){
		l.header.style.display="none";
	};
	this.delFooter=function(){
		l.footer.style.display="none";
	};
	
	cf.setCss(cl,{clear:"both"});
	cf.setCss(cl2,{clear:"both"});
	cf.setCss(l.header,{width:"100%",height:"110px",position:"relative"});
	cf.setCss(l.body,{width:"100%",position:"relative"});
	cf.setCss(l.footer,{width:"100%",position:"relative"});
	cf.setCss(bx,{width:obj.w+"px",height:"100%"});
};

/*
var con=new jCON({
	p:document.body,
	w:cf.workareawidth,
	h:cf.workareaheight-200
});
*/