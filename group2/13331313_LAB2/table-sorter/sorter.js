/*a new edition with better code style is coming soon ^-^ */

function getALLTables () {
	return document.getElementsByTagName("table");
}

function comp(col) {
	return function compp(a, b) {
		if (a.cells[col].innerHTML < b.cells[col].innerHTML) return -1;
		else if (a.cells[col].innerHTML > b.cells[col].innerHTML) return 1;
		else return 0;
	};
}

function sortTable (col, table) {
	var arr = [];
	var heads = table.getElementsByTagName('th');
	for (var i = 1; i < table.rows.length; i++) arr[i-1] = table.rows[i];
	if (table.lsCol == col) {
		arr.reverse();
		table.arrow = !table.arrow;
	} else {
		arr.sort(comp(col));
		table.arrow = true;
		if (table.lsCol != -1) {
			heads[table.lsCol].style.backgroundColor="#031B7D";
		}
	}
	if (table.arrow == true) {
		heads[col].style.backgroundImage = "url(ascend.png)";
	} else {
		heads[col].style.backgroundImage = "url(descend.png)";
	}
	for (var i = 1; i < table.rows.length; i++) {
		if ((i-1)%2 == 1) arr[i-1].setAttribute('class', 'alternate');
		else arr[i-1].setAttribute('class', 'non-alternate');
		table.appendChild(arr[i-1]);
	}
	heads[col].style.backgroundColor="#A4B0FC";
	table.lsCol = col;
}

function makeTableSorttable(table) {
	var tableHeads = table.getElementsByTagName("th");
	for (var i = 0; i < tableHeads.length; i++) {
		(function(i) {tableHeads[i].onclick = function(){sortTable(i, table);}})(i);
	}
}

function makeAllTablesSorttable (tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].lsCol = -1;
		tables[i].arrow = true;
		makeTableSorttable(tables[i]);
	}
}

window.onload = function() {
	var tables = getALLTables();
	makeAllTablesSorttable(tables);
}
