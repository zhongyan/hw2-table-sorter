function Sort(TableId, Col) {
	var Table = document.getElementById(TableId);
	var Tbody = Table.tBodies[0];
	var Thead = Table.getElementsByTagName("th");
	var Rows = Tbody.rows;
	var Arr = new Array;
	for (var i = 0; i < Rows.length; i++) {
		Arr[i] = Rows[i];
	}
	if (Thead[Col].className == "ascend") {
		Thead[Col].className = "descend";
		Arr.reverse();
	} else if (Thead[Col].className == "descend") {
		Thead[Col].className = "ascend";
		Arr.reverse();
	} else {
		for (var i = 0; i < 3; i++) {
			if (i != Col)
				Thead[i].className = "";
			else
				Thead[i].className = "ascend";
		}
		Arr.sort(CustomCompare(Col));
		Arr[0].className = "";
		Arr[1].className = "alternate";
		Arr[2].className = "";
	}
	var frag = document.createDocumentFragment();
	for (var i = 0; i < Arr.length; i++) {
		frag.appendChild(Arr[i]);
	}
	Tbody.appendChild(frag);
	/*for (var i = 0; i < Arr.length; i++) {
		Tbody.appendChild(Arr[i]);
	}*/
}
function CustomCompare(Col){
	return function CompareTRs(TR1,TR2){
		var value1 = TR1.cells[Col].firstChild.nodeValue;
		var value2 = TR2.cells[Col].firstChild.nodeValue;
		if(value1 < value2)
			return -1;
		else if(value1 > value2)
			return 1;
		else
			return 0;
	};
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function Click() {
	Sort(this.TableId, this.Col)
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var head = tables[i].getElementsByTagName("th");
		for (var j = 0; j < head.length; j++) {
			if (i == 0)
				head[j].TableId = "todo";
			else
				head[j].TableId = "staff";
			head[j].Col = j;
			head[j].onclick = Click;
		}
	}
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
