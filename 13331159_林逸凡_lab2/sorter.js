window.onload = function() {
	var getAllTables = function() {
		var tables = document.getElementsByTagName("table");
		return tables;
	}

	var tables = getAllTables();

	var makeAllTableSortable = function(tables) {
		for (var e = 0; e < tables.length; e++) {
			if (tables[e].getElementsByTagName("th").length != 0) {
				var tableHeads = tables[e].getElementsByTagName("th");
				for (var i = 0; i < tableHeads.length; i++) {
					tableHeads[i].classList.add("tHead");
					tableHeads[i].addEventListener('click', changeStatus);
				}
			} else {
				for (var i = 0; i < tables[e].rows[0].cells.length; i++) {
					tables[e].rows[0].cells[i].classList.add("tHead")
					tables[e].rows[0].cells[i].addEventListener('click', changeStatus);
				}
			}
		}
	}

	var changeStatus = function(event) {
		var headOnclick = event.target;
		if (headOnclick.classList.contains("ascend")) {
			headOnclick.classList.add("descend");
			headOnclick.classList.remove("ascend");
			descend(headOnclick);
		} else if (headOnclick.contains("descend")) {
			headOnclick.classList.add("ascend");
			headOnclick.classList.remove("descend");
			ascend(headOnclick);
		} else {
//			var others = getTable(headOnclick).getElementsByTagName("th");
			var others = getTable(headOnclick).getElementsByClassName("tHead");
			for (var i = 0; i < others.length; i++) {
				others[i].classList.remove("ascend", "descend");
			}
			headOnclick.classList.add("ascend");
			ascend(headOnclick);
		}
	}

	var ascend = function(head) {
		currntTable = getTable(head);
		var idx = head.cellIndex;
		for (var i = 1; i < currntTable.rows.length-1; i++) {
			for (var j = currntTable.rows.length-1; j >= i; j--) {
				if (currntTable.rows[i].cells[idx].innerHTML > currntTable.rows[j].cells[idx].innerHTML) {
					swap(currntTable.rows[i], currntTable.rows[j]);
				}
			}
		}
	}

	var descend = function(head) {
		var currntTable = getTable(head);
		var idx = head.cellIndex;
		for (var i = 1; i < currntTable.rows.length-1; i++) {
			for (var j = currntTable.rows.length-1; j >= i; j--) {
				if (currntTable.rows[i].cells[idx].innerHTML < currntTable.rows[j].cells[idx].innerHTML) {
					swap(currntTable.rows[i], currntTable.rows[j]);
				}
			}
		}
	}

	var getTable = function(head) {
		var table = head.parentNode.parentNode.parentNode;
		return table;
	}

	var swap = function(row_a, row_b) {
		var temp;
		for (var i = 0; i < row_a.cells.length; i++) {
			temp = row_a.cells[i].innerHTML;
			row_a.cells[i].innerHTML = row_b.cells[i].innerHTML;
			row_b.cells[i].innerHTML = temp;
		}
	}

	makeAllTableSortable(tables);
}
