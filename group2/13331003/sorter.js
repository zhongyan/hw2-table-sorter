window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return tables = document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		SortTable(tables[i]);
	}
}

function SortTable(table) {
	var th = table.tHead.rows[0].cells;
	for (var i = 0; i < th.length; i++) {
		th[i].index = i;
		th[i].onclick = function() {
			var checked = false;
			//判断表格是否已经升序排序
			if (this.className == "ascend") {
				checked = true;
			} 
			for (var j = 0; j < th.length; j++) {
				th[j].className = "";       
			}
			if (checked) {
				this.className = "descend";
			} else {
				this.className = "ascend";
			}
			SortIt(table, this.index);
		}
	}
}

function SortIt(table, th) {
	var tableBody = table.tBodies[0];
	var table_rows = tableBody.rows;
	var rows = [];

	//复制表格的每一行
	for(var i = 0; i < table_rows.length; i++) {
		rows[i] = table_rows[i];
	}

	if (th == table.sortCol) {
		//如果已经排序好，则倒序排序
		rows.reverse();
	} else {
		rows.sort(SortFunction(th));
	}

	var thFragment = document.createDocumentFragment();

	for (var i = 0; i < rows.length; i++) {
		if (i % 2 != 0) {
			//偶数行灰色
			rows[i].className = "alternate";        
		} else {
			rows[i].className = "";
		}
		thFragment.appendChild(rows[i]);
	}
	tableBody.appendChild(thFragment);  

	table.sortCol = th;
}

//每一项的比较
function SortFunction(th) {
	return function(row1, row2) {
		var r1 = row1.cells[th].textContent;
		var r2 = row2.cells[th].textContent;
		if (r1 < r2) {
			return -1;
		} else if (r1 > r2) {
			return 1;
		} else {
			return 0;
		}
	}
}