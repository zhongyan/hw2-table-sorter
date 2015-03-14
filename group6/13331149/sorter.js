window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

//get All tables in the page
function getAllTables() {
	return tables = document.getElementsByTagName("table");
}

//change the color in even rows
function ChangeRowsColor(table) {
	for (var j = 1; j < table.rows.length; j++) {
		if (j%2 == 0) {
			table.rows[j].style.backgroundColor = "#BDBDBD"; 
		}
	}
}

//sort the table by iCol
function SortTable(table, iCol, rows) {
	var datas = new Array;
	for (var i = 0; i < rows.length; i++) {
		datas[i] = rows[i];
	}
	if (table.sortCol == iCol) {
		datas.reverse();
	} else {
	 	datas.sort(compEle(iCol));
	}
	return datas;
}

//compare two element
function compEle(iCol) {
	 return function(a, b) {
	 	a.cells[iCol].innerHTML > b.cells[iCol].innerHTML;
	 }
}

//show the sorted table
function ShowNewTable(table, datas, rows) {
	var oFragment = document.createDocumentFragment();
	for (var k = 0; k < datas.length; k++) {
		datas[k].style.backgroundColor = "white";
		oFragment.appendChild(datas[k]);
	}
	table.tBodies[0].appendChild(oFragment);
	for (var i = 0; i < rows.length; i++) {
		if (i%2 == 1) {
			rows[i].style.backgroundColor = "#BDBDBD"; 
		}
	}
}

//change the th stley.
function ChangeThStyle(th) {
	if (th.lastChild.className == "ascend-icon")
		th.lastChild.className = "descend-icon";
	else
		th.lastChild.className = "ascend-icon"; 
}

function createIco(th) {
	var para = document.createElement("span");
	th.appendChild(para);
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		ChangeRowsColor(tables[i]);
		
		cols = tables[i].rows[0].cells.length;
		for (var j = 0; j < cols; j++) {
			th = tables[i].rows[0].cells[j];
			createIco(th)
			//listen:sort table when click th
			th.onclick = function() {
				var table = this.parentNode.parentNode.parentNode;
				var iCol = this.cellIndex;
				var datas;
				var rows = table.tBodies[0].rows;

				ChangeThStyle(this);
				datas = SortTable(table, iCol, rows);
				ShowNewTable(table, datas, rows);
				table.sortCol = iCol;
			};
			//init table style
			th.onmouseover = function() {
				this.style.backgroundColor = "#CBEAEC";
				this.style.cursor = "pointer";
				this.childNodes[1].className = "ascend-icon";
			};
			//init table style
			th.onmouseout = function() {
				this.style.backgroundColor = "#120562";
			}
		}
	}
}
