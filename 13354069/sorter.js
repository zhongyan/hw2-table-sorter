window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTableSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		clickTh(tables[i]);
	}
}

function clickTh(table) {
	var ths = table.getElementsByTagName('th');
	for (var i = 0; i < ths.length; i++) {
		ths[i].onclick = function() {
			this.style.backgroundColor = '#aabccd';
			for (var j = 0; j < ths.length; j++) {
				if (j != this.cellIndex) {
					ths[j].style.backgroundColor = '#191970';
					ths[j].innerHTML = ths[j].innerHTML.split('<')[0];
				}
			}

			if (this.innerHTML[this.innerHTML.length - 8] == 'a' && this.innerHTML[this.innerHTML.length - 1] == '>') {
				this.innerHTML = this.innerHTML.split('<')[0] + "<img src='descend.png'  style='float:right' alt='descend'>";
				sortTable(table, this.cellIndex, 'down');
			} else {
				this.innerHTML = this.innerHTML.split('<')[0] + "<img src='ascend.png'  style='float:right' alt='ascend'>";
				sortTable(table, this.cellIndex, 'up');
			}
		}
	}
}

function sortTable(table, index, UorD) {
	var tds = table.getElementsByTagName('td');
	var num_of_column = table.getElementsByTagName('th').length, num_of_row = tds.length / num_of_column;
	var arr = [];
	for (var i = 0; i < num_of_row; i++) {
		arr[i] = tds[index + i * num_of_column];
	}

	if (UorD == 'up')  arr.sort(ascendSort);
	else arr.sort(descendSort);

	var parent = table.getElementsByTagName('tbody')[0];
	var nodeP = [], nodeC = [];
	for (var i = index, k = 0; i < tds.length; i += num_of_column, k++) {
		nodeP[k] = table.getElementsByTagName('td')[i].parentNode.cloneNode(true);
		nodeC[k] = table.getElementsByTagName('td')[i].cloneNode(true);
	}
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (nodeC[j].innerHTML == arr[i].innerHTML) {
				parent.replaceChild(nodeP[j], parent.getElementsByTagName('tr')[i]);
				break;
			}
		}
	}
}

function ascendSort(a, b) {
	return a.innerHTML > b.innerHTML;
}

function descendSort(a, b) { 
	return a.innerHTML < b.innerHTML;
}