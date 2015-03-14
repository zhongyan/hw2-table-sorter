window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i=0; i < tables.length; i++) {
		//对第i个表格排序。
		makeITableSortable(tables[i]);
	}
}

function makeITableSortable(Itable) {
	var ItableHead = Itable.getElementsByTagName("th");
	var ItableCol = ItableHead.length;
	var ItableBody = Itable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var ItableRow = ItableBody.length;
	for (var j = 0; j < ItableCol; j++) {
		ItableHead[j].onclick = function(index) {
			return function() {
				//清除该表格其它列的排序属性，因为一个表格只会按一种方式排序。
				for (var j1 = 0; j1 < ItableCol; j1++) {
					if (j1 === index) {
						continue;
					}
					if (ItableHead[j1].className.search(/ascend/) !== -1) {
						ItableHead[j1].className = ItableHead[j1].className.substring(0, ItableHead[j1].className.length-7);
					} else if (ItableHead[j1].className.search(/descend/) !== -1) {
						ItableHead[j1].className = ItableHead[j1].className.substring(0, ItableHead[j1].className.length-8);
					}
				}
				//ascended为true表示已经升序排列，通过添加类选择器来修改排序界面。
				var ascended = false;
				if (ItableHead[index].className.search(/ascend/) !== -1) {
					ascended = true;
				}
				if (ascended) {
					ItableHead[index].className = ItableHead[index].className.substring(0, ItableHead[index].className.length-7);
					ItableHead[index].className += " descend";
				} else {
					if (ItableHead[index].className.search(/descend/) !== -1) {
						ItableHead[index].className = ItableHead[index].className.substring(0, ItableHead[index].className.length-8);
					}
					ItableHead[index].className += " ascend";
				}
				//对表格体排序。
				SortTable(ItableBody, index, ascended);
			}
		}(j);
	}
}

function SortTable(Table, Index, ascended) {
	for (var i1 = 0; i1 < Table.length-1; i1++) {
		var min = i1;
		for (var i2 = i1+1; i2 < Table.length; i2++) {
			//ascended为true,降序排列，否则升序排列。
			if (ascended) {
				if (Table[min].getElementsByTagName("td")[Index].innerHTML < Table[i2].getElementsByTagName("td")[Index].innerHTML) {
					min = i2;
				}
			} else {
				if (Table[min].getElementsByTagName("td")[Index].innerHTML > Table[i2].getElementsByTagName("td")[Index].innerHTML) {
					min = i2;
				}
			}
		}
		if (min !== i1) {
			var temp = Table[i1].innerHTML;
			Table[i1].innerHTML = Table[min].innerHTML;
			Table[min].innerHTML = temp;
		}
	}
}
