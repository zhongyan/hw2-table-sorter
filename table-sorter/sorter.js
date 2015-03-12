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

function makeTableSortable(table) {
	var tableHead = table.tHead.rows[0].cells;
	for (var i = 0; i < tableHead.length; i++) {
		tableHead[i].onclick = function(event) {
			var target = event.target || event.srcElement;
			var tableIndex = target.cellIndex;
			sortTable(table, tableIndex);
		}
	}
}

function sortTable(table, tableIndex) {
	var tableRows = new Array();
	var tableHead = table.tHead.rows[0].cells;
	for (var i = 0; i < table.tBodies[0].rows.length; i++) {
		tableHead[i].className = '';
		tableRows[i] = table.tBodies[0].rows[i];
	}
	if (table.sortedIndex == tableIndex) {
		tableRows.reverse();
		if (table.sortedAscend) {
			table.tHead.rows[0].cells[tableIndex].className = 'descend';
			table.sortedAscend = false;
		} else {
			table.tHead.rows[0].cells[tableIndex].className = 'ascend';
			table.sortedAscend = true;
		}
	}
	else {
		table.tHead.rows[0].cells[tableIndex].className = 'ascend';
		tableRows.sort(cmp(tableIndex));
		table.sortedAscend = true;
	}
	var frag = document.createDocumentFragment();
	for (var i = 0; i < tableRows.length; i++) {
		if (i%2) tableRows[i].className = 'alternate';
		else tableRows[i].className = '';
		frag.appendChild(tableRows[i]);
	}
	table.tBodies[0].appendChild(frag);
	console.log(tableRows);
	table.sortedIndex = tableIndex;
}

function cmp(tableIndex) {
	return function(item1, item2) {
		var v1 = item1.cells[tableIndex].textContent;
		var v2 = item2.cells[tableIndex].textContent;
		return v1 > v2;
	}
}
