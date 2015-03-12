window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++)
		makeTableSortable(tables[i]);
}

function makeTableSortable(table) {
	var tableHead = table.tHead.rows[0].cells;
	for (var i = 0; i < tableHead.length; i++) {
		tableHead[i].onclick = function(event) {
			var target = event.target || event.srcElement;
			var tableIndex = target.cellIndex;		//获取当前被点击的列
			sortTable(table, tableIndex);		//调用sortTable方法为当前表格排序
		}
	}
}

function sortTable(table, tableIndex) {
	var tableHead = table.tHead.rows[0].cells;		//获取待排序table的所有th
	for (var i = 0; i < tableHead.length; i++)
		tableHead[i].className = '';		//重置所有th的高亮以及箭头样式

	var tableRows = new Array();
	for (var i = 0; i < table.tBodies[0].rows.length; i++)
		tableRows[i] = table.tBodies[0].rows[i];		//新开一个数组装载待排序table的row

	if (table.sortedIndex == tableIndex) {		//如果当前点击的列和上一次相同
		tableRows.reverse();		//直接把数组颠倒顺序
		if (table.sortedAscend) {
			table.tHead.rows[0].cells[tableIndex].className = 'descend';		//如果当前是升序就改为降序
			table.sortedAscend = false;
		} else {
			table.tHead.rows[0].cells[tableIndex].className = 'ascend';		//否则改为升序
			table.sortedAscend = true;
		}
	}
	else {		//第一次点击的时候由于sortedIndex未定义，将执行该情况，并设置为升序
		table.tHead.rows[0].cells[tableIndex].className = 'ascend';
		tableRows.sort(cmp(tableIndex));		//调用自定义的cmp方法进行排序
		table.sortedAscend = true;
	}

	var frag = document.createDocumentFragment();
	for (var i = 0; i < tableRows.length; i++) {
		if (i%2) tableRows[i].className = 'alternate';		//对偶数行设置灰色背景颜色
		else tableRows[i].className = '';
		frag.appendChild(tableRows[i]);
	}

	table.tBodies[0].appendChild(frag);
	console.log(tableRows);		//调试使用
	table.sortedIndex = tableIndex;
}

function cmp(tableIndex) {
	return function(item1, item2) {
		var v1 = item1.cells[tableIndex].textContent;
		var v2 = item2.cells[tableIndex].textContent;
		return v1 > v2;
	}
}
