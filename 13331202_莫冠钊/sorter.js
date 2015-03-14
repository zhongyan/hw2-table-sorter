window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	var i, ths, j, trs;
	for (i = 0; i < tables.length; i++) {
		ths = tables[i].getElementsByTagName("th");
		trs = tables[i].getElementsByTagName("tr");
		for (j = 0; j < ths.length; j++) {
			/*用Attribute来完成传参数的目的,因为在循环里事件传的参数会按照变量最后出现的值来传*/
			ths[j].setAttribute("table_num", i);
			ths[j].setAttribute("col", j);
			ths[j].setAttribute("trs_num", trs.length-1);
			ths[j].setAttribute("ths_num", ths.length);
			ths[j].onclick = function() {
				click_event(this, tables);
			};
		}
	}
}

function click_event(th, tables) {
	/*取出参数*/
	var trs_num = th.getAttribute("trs_num");
	var table_num = th.getAttribute("table_num");
	var col = th.getAttribute("col");
	var ths_num = th.getAttribute('ths_num');

	 /*改变选中的标签样式，并将其他标签恢复样式*/
	recovery_style(table_num, col, tables, ths_num);  
	if (th.classList.contains('ascend')) {
		th.classList.remove('ascend');
		th.classList.add('descend');
	} else {
		th.classList.remove('descend');
		th.classList.add('ascend');
	}

	/*开始进行排序*/
	var is_ascend = (th.classList.contains('ascend'));    //决定进行升降序
	sort_table(table_num, col, is_ascend, trs_num);
}

function recovery_style(table_num, col, tables, trs_num) {
	for (var index = 0; index < trs_num; index++) {
		if (index != col) {
			tables[table_num].rows[0].cells[index].classList.remove("ascend");
			tables[table_num].rows[0].cells[index].classList.remove("descend");
		}
	}
}

function sort_table(table_num, col, is_ascend, trs_num) {
	var table = getAllTables()[table_num];
	var i, j, temp;
	for (i = 1; i <= trs_num; i++) {
		for (j = 1; j <= trs_num-1; j++) {
			if ((is_ascend&&table.rows[j].cells[col].innerHTML > table.rows[j+1].cells[col].innerHTML)||
				(!is_ascend&&table.rows[j].cells[col].innerHTML < table.rows[j+1].cells[col].innerHTML)) {
				temp = table.rows[j].innerHTML;
				table.rows[j].innerHTML = table.rows[j+1].innerHTML;
				table.rows[j+1].innerHTML = temp;
			}
		}
	}
}

