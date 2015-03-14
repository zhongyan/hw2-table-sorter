window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	//initialize todo
	var row1 = document.getElementById("todo").rows[0].cells;
	for (var i = 0; i < row1.length; i++) {
		row1[i].className = "to";
		var x = document.createElement("input");
		x.type = "image";
		x.src = "ascend.png";
		x.align = "right";
		x.name = "ascend";
		row1[i].appendChild(x);
		row1[i].onmouseover = function() {
			this.style.backgroundColor = "rgb(166,175,252)";
		}
		row1[i].onmouseout = function() {
			this.style.backgroundColor = "rgb(2,27,127)";
		}
	}
	
	//initialize staff
	var row2 = document.getElementById("staff").rows[0].cells;
	for (var i = 0; i < row2.length; i++) {
		row2[i].className = "st";
		var x = document.createElement("input");
		x.type = "image";
		x.src = "ascend.png";
		x.align = "right";
		x.name = "ascend";
		row2[i].appendChild(x);
		row2[i].onmouseover = function() {
			this.style.backgroundColor = "rgb(166,175,252)";
		}
		row2[i].onmouseout = function() {
			this.style.backgroundColor = "rgb(2,27,127)";
		}
	}

	//onclick function
	var y = document.getElementsByTagName("th");
	for (var i = 0; i < y.length; i++) {
		y[i].onclick = function() {
			var way;
			way = changeImg(this.className);
			//alert(way);
			sortTable(tables, this.className, way, this.innerHTML);
		}
	}
}

function changeImg(classname) {
	var result;
	var x = document.getElementsByTagName("th");
	var y = document.getElementsByTagName("input");
	for (var i = 0; i < x.length; i++) {
		if (x[i].className == classname) {
			if (y[i].name == "ascend") {
				y[i].name = "descend";
				y[i].src = "descend.png";
				result = "descend";
			} else {
				y[i].name = "ascend";
				y[i].src = "ascend.png";
				result = "ascend";
			}
		}
	}
	return result;
}

function sortTable(tables, classname, way, colname) {
	var table;
	//确定是哪个表格
	if (classname == "to") {
		table = tables[0];
	} else {
		table = tables[1];
	}
	//确定是哪一column
	var num;
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		if (table.rows[0].cells[i].innerHTML == colname) {
			num = i;
			break;
		}
	}
	//保存数据到col数组
	var raw = Array();
	for (var i = 1; i < table.rows.length; i++) {
		raw[i - 1] = new Array();
		for (var k = 0; k < table.rows[i].cells.length; k++) {
			raw[i - 1][k] = table.rows[i].cells[k].innerHTML;
		}
	}
	//确定顺序并排序
	var col = Array();
	var r;
	for (var i = 1; i < table.rows.length; i++) {
		col[i - 1] = table.rows[i].cells[num].innerHTML;
	}
	col.sort();
	if (way == "ascend") {
		for (var i = 1; i < table.rows.length; i++) {
			for (r = 0; r < table.rows.length; r++) {
				if (col[i - 1] == raw[r][num]) {
					break;
				}
			}
			for (var k = 0; k < table.rows[r + 1].cells.length; k++) {
				table.rows[i].cells[k].innerHTML = raw[r][k];
			}
		}
	} else {
		var h;
		for (var i = 1; i < table.rows.length; i++) {
			for (r = 0; r < table.rows.length; r++) {
				if (col[i - 1] == raw[r][num]) {
					break;
				}
			}
			for (var k = 0; k < table.rows[r + 1].cells.length; k++) {
				h = table.rows.length - i;
				table.rows[h].cells[k].innerHTML = raw[r][k];
			}
		}
	}
}
