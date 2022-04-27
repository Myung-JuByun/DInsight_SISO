function jVCON(obj){
	var l=this,	
		bx=cf.mkTag("div",obj.p);
	l.left=cf.mkTag("div",bx);
	l.center=cf.mkTag("div",bx);
	l.right=cf.mkTag("div",bx);
	
	this.delRight=function(){
		l.right.style.display="none";
	};
	this.delLeft=function(){
		l.left.style.display="none";
	};
	
	cf.setCss(l.left,{
		width:obj.lw+"px",
		//height:obj.h,
		float:"left",
		//backgroundColor:"#eee"
	});
	cf.setCss(l.right,{
		width:obj.rw+"px",
		//height:obj.h,
		float:"left",
		//backgroundColor:"#eee"
	});
	cf.setCss(l.center,{
		width:obj.cw+"px",
		//height:obj.h,
		float:"left",
		//backgroundColor:"#fff"
	});
	cf.setCss(bx,{
		width:obj.w+"px",
		height:"100%",
		
		//backgroundColor:"#fff",
		margin:"0 auto"
		//overflowY:obj.overY
	});
};
/*
var dv=new jVCON({
	p:con.body,
	w:1200,
	cw:975,
	lw:180,
	rw:100
});
*/