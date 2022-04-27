function PAGES(prm){
	
	//CAUTION:: frame의 크기 변화는 반드시 페이지스에 반영되어야 한다.
	var l=this;
	var tabs=new Array();
	var prev;
	
	var cvr=cf.mkTag("div",prm.p);
	var head=cf.mkTag("div",cvr);
	var body=cf.mkTag("div",cvr);
	
	this.body=body;
	this.page;
	this.add=function(obj){
		mkTab(obj,false);
	};
	this.del=function(idx){
		
	};
	this.focus=function(idx){
		tabs[idx].onclick();
	};
	this.con=function(obj){
		obj.onclick(this.body);
	};
	
	cvrStyle();
	headStyle();
	bodyStyle();
	
	function mkTab(obj,opt,idx){
		var tab=cf.mkTag("div",head);
		tabStyle(tab);
		tab.innerHTML=obj.filename;
		tab.obj=obj;
		tab.onclick=function(e){
			if(e){
				var target=e.target || e.srcElement;
				if(target!=this) return;
			}
			if(prev){
				cf.setCss(prev,{
					color:"#b2b2b2",
					backgroundColor:"#f0f0f0",
					borderBottom:1+"px solid #f0f0f0",
					borderTop:1+"px solid #e5e5e5",
					borderRight:1+"px solid #e5e5e5",
					borderLeft:1+"px solid #e5e5e5",
					//backgroundColor:"#f0f0f0",
				    backgroundImage:"linear-gradient(to top, #f0f0f0 0%, #f0f0f0 0%)"
				});
			}
			cf.setCss(this,{
				borderBottom:2+"px solid #fcfcfc",
				borderTop:1+"px solid #7d8089",
				borderRight:1+"px solid #7d8089",
				borderLeft:1+"px solid #7d8089",
				color:"#666",
			    backgroundImage:"linear-gradient(to top, rgb(247,247,247) 0%, rgb(255,255,255) 100%)",
			});
			/*
			 cf.setCss(this,{
				borderBottom:2+"px solid #abbf50",
				borderTop:1+"px solid #abbf50",
				borderRight:1+"px solid #abbf50",
				borderLeft:1+"px solid #abbf50",
				color:"#fff",
				backgroundColor:"#abbf50",
			});
			*/
			prev=this;
			l.con(this.obj);
		};
		if(opt) tab.onclick();
		tabs.push(tab);
	};
	function cvrStyle(){
		cf.setCss(cvr,{
			position:"relative",
			width:"100%",
			height:"100%"
		});
	};
	function bodyStyle(){
		cf.setCss(body,{
			position:"relative",
			height:prm.h+"px",
			overflow:"hidden",
			borderLeft:"1px solid gray",
			borderRight:"1px solid gray",
			borderBottom:"1px solid gray"
		});
		//body.bg("#eee");
	};
	function headStyle(){
		cf.setCss(head,{
			height:"35px",
			position:"relative",
			borderBottom:"1px solid #6c7386",
			//zIndex:1
		});
	/*	var line=cf.mkTag("div",head);
		cf.setCss(line,{
			width:100+"%",
			height:2+"px",
			position:"absolute",
			bottom:0,
			zIndex:1
		});
		line.bg("#a1a1a1");*/
	};
	
	function tabStyle(tab){		
		if(prm.tabW){
			cf.setCss(tab,{width:prm.tabW+"px",});
		}else cf.setCss(tab,{width:"158px",});
		
		cf.setCss(tab,{
			color:"#b2b2b2",
			backgroundColor:"#f0f0f0",
			borderBottom:"1px solid #f0f0f0",
			borderTop:"1px solid #e5e5e5",
			borderRight:"1px solid #e5e5e5",
			borderLeft:"1px solid #e5e5e5",
		    backgroundImage:"linear-gradient(to top, #f0f0f0 0%, #f0f0f0 0%)",			
			height:"25px",
			float:"left",
			paddingTop:"8px",
			fontWeight:"bold",
			textAlign:"center",
			marginRight:"1px",
			zIndex:10,
			cursor:"pointer",
		});
		//tab.bg("#f4f4f4");
	};
};