var GRANT;

function defaultLoadList(){		
	callDivisionMemberData(function(data){
		DIVISIONS=data.divisionList;
		MEMBERS=data.divisionUserList;
		GRANT=data.grantList;
		
		getEls();
		dataDivisionProc();
		mkOnlyDivision();
		authButtonDiv();
	});
	tree_menu.style.height=466+"px";
};