
	function getAllTables() {
		return document.getElementsByTagName("table");
	}

	function sortTable(sid, sCol ,dataType) {
		return function () {
		    var oTable = document.getElementById(sid);
			var oBody = oTable.tBodies[0];
			var oRows = oBody.rows;
			var arr = new Array();
			for (var j = 0; j < oRows.length; j++)
				arr[j] = oRows[j];
			
			if (oTable.sortCol == sCol)
				arr.reverse();
			else 
				arr.sort(gCompare(sCol, dataType));
			var oFragment = document.createDocumentFragment();
			for (var j = 0; j < arr.length; j++)
				oFragment.appendChild(arr[j]);
			oBody.appendChild(oFragment);
			oTable.sortCol = sCol;
			for (var i = 0; i < 3; i++) {
			oTable.tBodies[0].rows[1].cells[i].style.backgroundColor = "rgb(221,221,221)";
			oTable.tBodies[0].rows[0].cells[i].style.backgroundColor = "rgb(255,255,255)";
			oTable.tBodies[0].rows[2].cells[i].style.backgroundColor = "rgb(255,255,255)";
	}
			for (var i = 0; i < 2; i++) {
				if (oTable.tBodies[0].rows[i].cells[sCol].firstChild.nodeValue < oTable.tBodies[0].rows[i+1].cells[sCol].firstChild.nodeValue) {
					oTable.tHead.rows[0].cells[sCol].style.backgroundImage = "url(ascend.png)";
					break;
				} else if (i == 1) 
				oTable.tHead.rows[0].cells[sCol].style.backgroundImage = "url(descend.png)";
			}

		}
	}
	

	function convert(svalue, dataType) {
		switch(dataType) {
			case "int":
			return parseInt(svalue);
			default:
			return svalue.toString();
		}
	}

	function gCompare(sCol, dataType) {
		return function Compare(tone, ttwo) {
			var a  = convert(tone.cells[sCol].firstChild.nodeValue, dataType);
			var b  = convert(ttwo.cells[sCol].firstChild.nodeValue, dataType);
			return (a > b);
		}
	}

	function makeAllTablesSortable(tables) {
		for (var i = 0; i < 3; i++) {
		tables[0].tHead.rows[0].cells[i].onclick = sortTable("todo", i);
		tables[1].tHead.rows[0].cells[i].onclick = sortTable("staff", i);
	}
}


window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	for (var i = 0; i < 3; i++) {
		tables[0].tBodies[0].rows[1].cells[i].style.backgroundColor = "rgb(221,221,221)";
		tables[1].tBodies[0].rows[1].cells[i].style.backgroundColor = "rgb(221,221,221)";
	}
}