window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++)
		makeTableSortable(tables[i]);
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var th = tables[i].getElementsByTagName("th");
		for (var j = 0; j < th.length; j++) {
			(function(i, j, th) {
				th[j].onclick = function() {
					if (th[j].className == "ascend") {
						Sort(tables[i], j, 0);
						th[j].className = "descend";
					} else {
						Sort(tables[i], j, 1);
						th[j].className = "ascend";
					}
				}
			})(i, j, th);
		}
	}
} 


function Sort(table, count, order) {
	var th = table.getElementsByTagName("th");
	for(var i = 0; i < th.length; i++) {
		th[i].className = "";
	}
	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length - i; j++) {
			if(order == 1) {
				if (table.rows[j].cells[count].innerHTML > table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			} else {
				if (table.rows[j].cells[count].innerHTML < table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			}
		}
	}
}

function swap(a, b) {
	var temp = a.innerHTML;
	a.innerHTML = b.innerHTML;
	b.innerHTML = temp;
}
