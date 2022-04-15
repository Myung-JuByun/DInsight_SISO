function TABLE(prm){
	/*
	new TABLE({
		p:con,
		arr:data[i],
		header:[
			["No.","NAME","JOB",""],
			["No.","","JOB","NAME"]
		],
		footer:[
			["SUM","","",""],
		],
		colspans:[
			{x:2, y:0, howmany:2},
			{x:2, y:4, howmany:2},
			{x:0, y:2, howmany:2}
		],
		rowspans:[
			{x:1, y:0, howmany:2},
			{x:2, y:4, howmany:3},
			{x:0, y:2, howmany:2}
		]
	});
	*/
	var dv=cf.mkTag("div",prm.p);
	var ar=new Array();
	if(prm.header){
		prm.header.trav(function(d,i){
			ar.push(d);
		});
	}
	prm.arr.trav(function(d,i){
		ar.push(d);
	});
	if(prm.footer){
		prm.footer.trav(function(d,i){
			ar.push(d);
		});
	}
	
	var tds=ar.mkTable({
		p:dv,
		r:prm.rowspans,
		c:prm.colspans,
		mode:prm.mode
	});
		
	var table=tds[0][0].parentNode.parentNode;
	table.border=0;
	
	return tds;
};



