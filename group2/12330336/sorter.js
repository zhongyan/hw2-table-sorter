

window.onload = function() {
	var tables = getALLTables();
	makeAllTablesSortable(tables);
}

function getALLTables () {
	return document.getElementsByTagName("table");
}

function Sortable(table) {
	var th = table.getElementsByTagName("th");
	for (var i = 0; i < th.length; i++) {
		(function(i) {
			th[i].onclick = function(){
				sort_(i, table);
			}
		})(i);
	}
}

function makeAllTablesSortable (tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].col = -1;
		tables[i].pattern = true;
		Sortable(tables[i]);
	}
	
}
function cmp(col) {
	return function cmp(a, b) {
		if (a.cells[col].innerHTML < b.cells[col].innerHTML) 
			return -1;
		else if (a.cells[col].innerHTML > b.cells[col].innerHTML) 
			return 1;
		else 
			return 0;
	};
}

function sort_ (col, table) {
	var heads = table.getElementsByTagName('th');
	var row_ = [];
	for (var i = 0; i < table.rows.length-1; i++) 
		row_[i] = table.rows[i+1];
	if (table.col == col) {
		table.pattern = !table.pattern;
		row_.reverse();
	} else {
		row_.sort(cmp(col));
		table.pattern = true;
		if (table.col != -1) {
			heads[table.col].style.backgroundColor="#031B7D";
		}
	}	
	for (var i = 1; i < table.rows.length; i++) {
		if (i%2 == 0) 
			row_[i-1].style.backgroundColor=" #ddd";
		else 
			row_[i-1].style.backgroundColor = "#FFFFFF";
		table.appendChild(row_[i-1]);
	}
	if (table.pattern == true) {
		heads[col].style.backgroundImage = "url(ascend.png)";
		heads[col].style.backgroundRepeat = "no-repeat";
		heads[col].style.backgroundPosition = "center right"
		heads[col].style.backgroundColor="#A4B0FC";	
	} else {
		heads[col].style.backgroundImage = "url(descend.png)";
		heads[col].style.backgroundRepeat = "no-repeat";
		heads[col].style.backgroundPosition = "center right"
		heads[col].style.backgroundColor="#A4B0FC";	
	}	
	table.col = col;
}

