/*
	Author: ye jiaqi
	Time: 13 March 2015
*/

// making all tables sortable
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

// to get all tables in the web page
function getAllTables() {
	return document.getElementsByTagName("table");
}

// make the tables sortable by clicking on the table head
function makeAllTablesSortable(tables) {
	for(var i = 0; i < tables.length; i ++) {
		// get all table heads for each table
		var table_heads = tables[i].getElementsByTagName("th");
		// ther is someone who do not use the "th" tag
		if (table_heads.len == 0) {
			table_heads = tables[i].rows[0];
		}

		// give each thead an id to clarify each colum
		for(var j = 0; j < table_heads.length; j++) {
			table_heads[j].setAttribute("id", j);
		}

		// for each click on the the head, make a response
		for(var j = 0; j < table_heads.length; j++) {
			// give another function
			table_heads[j].onclick = function() {
				// this.parentNode.parentNode.parentNode means the table
				sort(this.parentNode.parentNode.parentNode, this);
			}
		}
	}
}

function sort(table, head) {
	var to_sort = [];
	head_id = head.id;
	row_len = table.rows.length;
	// get the Sequence if whether the table colum is already sorted or not
	Sequence = head.getAttribute("class");

	// get each row for sorting
	for(var i = 1; i < row_len; i++) {
		to_sort[i] = table.rows[i];
	}

	// sort it
	to_sort.sort(compare(Sequence));

	// prevent reference error
	for(var i = 0; i < row_len-1; i++) {
		to_sort[i] = to_sort[i].innerHTML;
	}

	// change the rows
	for(var i = 0; i < row_len-1; i++) {
		table.rows[i+1].innerHTML = to_sort[i];
	}

	// set other soeted colum to be none
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		table.rows[0].cells[i].setAttribute("class", "")
	}

	// set the Sequnce
	if(Sequence != "Ascending")
		head.setAttribute("class", "Ascending")
	else
		head.setAttribute("class", "Descending")

}

function compare(Sequence) {
	return function(row1,row2) {
		var value1 = row1.cells[head_id].innerHTML;
		var value2 = row2.cells[head_id].innerHTML;

		// use  diffrenet sorting method for different status

		if (value1 < value2) {
			return  (Sequence == "Ascending" ? 1 : -1);
		} else if (value1 > value2) {
			return  (Sequence == "Ascending" ? -1 : 1);
		} else  {
			return 0;
		}
	}
}