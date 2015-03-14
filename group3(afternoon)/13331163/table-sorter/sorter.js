function changeTableLineColor(oTable) {
	var oTbody = oTable.getElementsByTagName("tbody")[0];
	var aTr = oTbody.getElementsByTagName("tr");
	var color = "#CCC";
	for (var i = 0; i < aTr.length; i++) {
		if (i % 2 == 1) {
			aTr[i].style.backgroundColor = color;
		} else {
			aTr[i].style.backgroundColor = '';
		}
	}
}

// 改变表头, col表示被点击的th的位置
function changeTableHead(oTable, col) {
	// var oThead = oTable.getElementsByTagName("thead")[0];
	// var oTr = oThead.getElementsByTagName("tr")[0];
	// var aTh = oTr.getElementsByTagName("th");
	var aTh = oTable.getElementsByTagName("th");

	if (aTh[col].sortTime == 0) {
		for (var i = 0; i < aTh.length; i++) {
			if (i != col) {
				aTh[i].style.background = "#000099";
				aTh[i].sortTime = 0;
			}
		}
		aTh[col].style.background = "#99CCFF url(ascend.png) no-repeat right";
		aTh[col].sortTime = 1;
	} else if (aTh[col].sortTime == 1) {
		aTh[col].style.background = "#99CCFF url(descend.png) no-repeat right";
		aTh[col].sortTime = 2;
	} else if (aTh[col].sortTime == 2) {
		aTh[col].style.background = "#99CCFF url(ascend.png) no-repeat right";
		aTh[col].sortTime = 1;
	}
}


//  排序时的比较函数
function greater(first, second) {
	return first > second;
}

function less(first, second) {
	return first < second;
}

// 排序算法-冒泡排序
function mySort(aTr, col, cmp) {
	var arr = new Array();
	var arrTemp;
	for (var i = 0; i < aTr.length; i++) {
		arrTemp = aTr[i].getElementsByTagName("td");
		arr.push(arrTemp[col].innerHTML);
	}

	for (var i = arr.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			if (cmp(arr[j], arr[j+1])) {
				var temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				temp = aTr[j].innerHTML;
				aTr[j].innerHTML = aTr[j+1].innerHTML;
				aTr[j+1].innerHTML = temp;
			}
		}
	}

}

// col表示排序时的比较列
function sortTable(oTable, itself) {
	var col = itself.index;

	var oTbody = oTable.getElementsByTagName("tbody")[0];
	var aTr = oTbody.getElementsByTagName("tr");

	if (itself.sortTime == 1) {
		mySort(aTr, itself.index, greater);
	} else if (itself.sortTime == 2) {
		mySort(aTr, itself.index, less);
	}
}

// 使table可排序化
function setSortableTable(oTable) {
	var aTh = oTable.getElementsByTagName("th");
	for (var i = 0; i < aTh.length; i++) {
		aTh[i].sortTime = 0;
		aTh[i].index = i;
		aTh[i].onclick = function() {
			changeTableHead(oTable, this.index);
			sortTable(oTable, this);
		}
	}
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		// 改变table行的颜色
		changeTableLineColor(tables[i]);
		// 使table可排序
		setSortableTable(tables[i]);
	}
};

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}