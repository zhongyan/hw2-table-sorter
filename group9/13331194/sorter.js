window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

var Sorted;

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(target) {
	var obj = document.getElementsByTagName("th");
	if (Sorted == null) {
		Sorted = new Array(obj.length);
		for (var i = 0; i < obj.length; i++) {
			Sorted[i] = 0;
		}
	}
	for (var i = 0; i < obj.length; i++) {
		obj[i].onclick = sortCol;
	}
}

function sortCol() {
	var i, j, tmp, iCol, iNum;
	var target = this.parentNode.parentNode.parentNode;

	var obj = document.getElementsByTagName("th");
	for (i = 0; i < obj.length; i++) {
		if (obj[i] == this) {
			iNum = i;
			iCol = i%(target.rows[0].cells.length);
			break;
		}
	}

	var row = target.rows.length,
	    col = target.rows[0].cells.length;

	var A = new Array(row);
	for (i = 0; i < row; i++) {
		A[i] = new Array(col);
	}
	for (i = 0; i < row; i++) {
		for (j = 0; j < col; j++) {
			A[i][j] = target.rows[i].cells[j].innerHTML;
		}
	}

	if (Sorted[iNum] % 2 == 0) {  // Ascending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() > A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}

		reset(iNum, 1);
	} else {                      // Descending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() < A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}
		
		reset(iNum, 2);
	}

	for (i = 1; i < row; i++) {
		for (j = 0; j < col; j++) {
			target.rows[i].cells[j].innerHTML = A[i][j];
		}
	}
}

function reset(iNum, k) {
	var obj = document.getElementsByTagName("th");
	var tablesNum = document.getElementsByTagName("table").length;
	var st, ed;
	if (iNum >= obj.length/tablesNum) {
		st = obj.length/tablesNum;
		ed = obj.length;
	} else {
		st = 0;
		ed = obj.length/tablesNum;
	}

	for (i = st; i < ed; i++) {
		if (obj[i].childNodes.length > 1) obj[i].removeChild(obj[i].lastChild);
		if (i == iNum) {
			var img = document.createElement("img");
			if      (k == 1) img.src = "ascend.png";
			else if (k == 2) img.src = "descend.png";
			obj[i].appendChild(img);

			Sorted[iNum] = k;
			obj[iNum].style.backgroundColor = "rgb(128, 128, 255)";
		} else {
			Sorted[i] = 0;
			obj[i].style.backgroundColor = "rgb(0, 0, 160)";
		}
	}
}