window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		for (var j = 0; j < tables[i].rows[0].cells.length; j++) {
			tables[i].rows[0].cells[j].addEventListener("click", mySort);
		}
	}
}

function mySort() {
    var sort_way, new_table = new Array();
    var col = this.cellIndex, row = 1, row_ = 1;
	var	tbody = this.parentNode.parentNode;

    if (tbody.nodeName != 'TBODY') {
        tbody = tbody.nextSibling.nextSibling;
        row = row_ = 0;
    }

	for (var i = 0; i < this.parentNode.cells.length; i++) {
		if (this.parentNode.cells[i] != this) {
			this.parentNode.cells[i].className += "initial";
		}
	}

	if (this.className == "ascend") {
		this.className = "descend";
		sort_way = -1;
	} else {
		this.className = "ascend"
		sort_way = 1;
	}

	for (var index = 0; row < tbody.rows.length; row++, index++) {
		new_table[index] = new Array();
		for (var i = 0; i < tbody.rows[row].cells.length; i++) {
			new_table[index][i] = tbody.rows[row].cells[i].innerHTML;
		}
	}

	new_table.sort(function (a, b) {
        if (isNaN(a[col])) {
            return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? sort_way : -1 * sort_way);
        } else {
            return (a[col] - b[col]) * sort_way;
        }
	});

	for (var index = 0; row_ < tbody.rows.length; row_++, index++) {
		tbody.rows[row_].innerHTML = "<td>" + new_table[index].join("</td><td>") + "</td>";
	}
}