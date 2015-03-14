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
			/*用Attribute来完成传参数的目的,因为在循环里click事件传的参数会按照循环里变量最后出现的值来传*/
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
			if (judge(table.rows[j].cells[col], table.rows[j+1].cells[col], is_ascend)) {
				swap(table.rows[j], table.rows[j+1]);
			}
		}
	}
}

/*判断是否需要改变位置*/
function judge(a, b, is_ascend) {
	/*先把该标签的HTML空格去除，以便下面正则表达式检查数字(sicily上的HTML某些数字左右是有空格的)*/
	var a_rm_white = a.innerHTML.replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");
	var b_rm_white = b.innerHTML.replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");
	/*用正则表达式来判断是否为数字(包括正负整数或浮点数)*/
	var re = /^(-?\d+)(\.\d+)?$/;
	if (re.test(a_rm_white)&&re.test(b_rm_white)) {
		if (is_ascend) {
			return parseFloat(a.innerHTML) > parseFloat(b.innerHTML);
		} else {
			return parseFloat(a.innerHTML) < parseFloat(b.innerHTML);
		}
	} else {
		if (is_ascend) {
			return a.innerHTML > b.innerHTML;
		} else {
			return a.innerHTML < b.innerHTML;
		}
	}
}

/*交换位置*/
function swap(a, b) {
	var temp = a.innerHTML;
	a.innerHTML = b.innerHTML;
	b.innerHTML = temp;
}
