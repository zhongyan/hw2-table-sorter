function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var p0 = 0; p0 < tables.length; p0++) {
		var ths0 = tables[p0].getElementsByTagName("th");
		for (var q0 = 0; q0 < ths0.length; q0++) {
			// 闭包
			(function(p, q, ths) {
				ths[q].onclick = function() {
					var tbody = tables[p].getElementsByTagName("tbody")[0];
					
					if (hasClass(ths[q], "ascend")) {
						descendSorted(tables[p], q);
						addClass(ths[q], "descend");
					} else {
						ascendSorted(tables[p], q);
						addClass(ths[q], "ascend");
					}
				}
			})(p0, q0, ths0);
		}
	}
} 


// 升降排序（冒泡）
function ascendSorted(table, count) {
	clearAll(table);

	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length-i; j++) {
			if (table.rows[j].cells[count].innerHTML > table.rows[j+1].cells[count].innerHTML) {
				swap(table.rows[j], table.rows[j+1]);
			}
		}
	}
}

function descendSorted(table, count) {
	clearAll(table);

	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length-i; j++) {
			if (table.rows[j].cells[count].innerHTML < table.rows[j+1].cells[count].innerHTML) {
				swap(table.rows[j], table.rows[j+1]);
			}
		}
	}
}

// 交换内容
function swap(ele1, ele2) {
	var tem = ele1.innerHTML;
	ele1.innerHTML = ele2.innerHTML;
	ele2.innerHTML = tem;
}

// 清除当前table所有class
function clearAll(table) {
	var ths = table.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
		removeClass(ths[i], "descend");
		removeClass(ths[i], "ascend");
	}
}


// 添加、删除、判断是否有class
function addClass(ele, val) {
	if (!hasClass(ele, val))
		ele.className = ele.className+" "+val;
}

function removeClass(ele, val) {
	if (hasClass(ele, val)) {
		var reg = new RegExp('(\\s|^)'+val+'(\\s|$)');
       	ele.className = ele.className.replace(reg, '');
	}
}

function hasClass(ele, val) {
	if (ele.className && ele.className.match(new RegExp('(\\s|^)'+val+'(\\s|$)')))
		return true;
	else
		return false;
}


// 主入口
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

