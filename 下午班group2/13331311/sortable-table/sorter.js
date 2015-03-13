window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		makeTableSortable(tables[i]);
		tables[i].cellPadding = 0;
		tables[i].cellSpacing = 0;
		changeColor(tables[i].tBodies[0].rows);
	};
}

function makeTableSortable(table) {
	for (var i = table.rows[0].cells.length - 1; i >= 0; i--) {
		table.rows[0].cells[i].onclick = function() {
			var index = this.cellIndex;
			var myTable = this.parentNode.parentNode.parentNode;
			var myRows = new Array();
			for (var i = 0; i < myTable.tBodies[0].rows.length; i++) {
				myRows[i] = myTable.tBodies[0].rows[i];
			};

			if (this.className == "") {
				myRows.sort(
					function(a, b) {
						var value1 = a.cells[index].textContent;
	                    var value2 = b.cells[index].textContent;
	                    if (isNaN(value1))
	                   		return value1.localeCompare(value2);
	                   	else {
	                   		return value1 - value2;
	                   	}
					}
				);

				var nodes = this.parentNode.childNodes;
				for (var i = 0; i < nodes.length; i++)
					nodes[i].className = "";
				this.className = "AscendTh";

			} else {
	        	myRows.reverse();
	        	
	        	if (this.className == "AscendTh")
	        		this.className = "DescendTh";
	        	else
	        		this.className = "AscendTh";
	        }

			var fragment = document.createDocumentFragment();
	        for (var i = 0; i < myRows.length; i++)
	            fragment.appendChild(myRows[i]);
	        myTable.tBodies[0].appendChild(fragment);
	        
	        changeColor(myTable.tBodies[0].rows);
		}
	}
}

function changeColor(rows) {
	for (var i = 0; i < rows.length; i++) {
		rows[i].className = "";
		if (i % 2 == 1)
			rows[i].className = "even";
	};
}