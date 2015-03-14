window.onload = function () {
    var todo = document.getElementById('todo');
    var staff = document.getElementById('staff');
    k = 0;
    sortCol = -1;
    todo_thead = todo.tHead.rows[0];
    staff_thead = staff.tHead.rows[0];

    todo.tBodies[0].rows[1].style.backgroundColor = 'lightgray';
    staff.tBodies[0].rows[1].style.backgroundColor = 'lightgray';

    todo_thead.cells[0].onclick = sort('todo', 0);
    todo_thead.cells[1].onclick = sort('todo', 1);
    todo_thead.cells[2].onclick = sort('todo', 2);

    staff_thead.cells[0].onclick = sort('staff', 0);
    staff_thead.cells[1].onclick = sort('staff', 1);
    staff_thead.cells[2].onclick = sort('staff', 2);
}


function sort (tableId, iCol) {
	return function () {
		this.parentNode.cells[0].style.backgroundImage = "";
		this.parentNode.cells[1].style.backgroundImage = "";
		this.parentNode.cells[2].style.backgroundImage = "";

		var sortTable = document.getElementById(tableId);
		var sortBody = sortTable.tBodies[0];
		var rows = sortBody.rows;  // 引用
		var arr = new Array();

		for (var i = 0; i < rows.length; i++) {
			arr.push(rows[i]);
		};

		if (sortCol == iCol) {
			arr.reverse();
		} else {
			if (k%2 == 0) {// 升序
				arr.sort(Compare(iCol));
			} else { 
				arr.sort(Compare1(iCol));
			}
		}

		k++;
		if (k%2 == 0) {
			this.style.backgroundImage = "url(ascend.png)";
		} else {
			this.style.backgroundImage = "url(descend.png)";
		}

		var oFragment = document.createDocumentFragment();// 创建文档碎片
		for (var i = 0; i < arr.length; i++) {
			oFragment.appendChild(arr[i]);
		};
		sortBody.appendChild(oFragment); // 原来有影响像吗？
		sortCol = iCol;

		sortBody.rows[0].style.backgroundColor = '';
		sortBody.rows[1].style.backgroundColor = 'lightgray';
		sortBody.rows[2].style.backgroundColor = '';
	}
}

function Compare (iCol) {
	return function CompareTRs (oTR1, oTR2) {
		var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
		var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	}
}

function Compare1 (iCol) {
	return function CompareTRs (oTR1, oTR2) {
		var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
		var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
		if (value1 > value2) {
			return -1;
		} else if (value1 < value2) {
			return 1;
		} else {
			return 0;
		}
	}
}

function convert (value) {
	return value.toString();
}