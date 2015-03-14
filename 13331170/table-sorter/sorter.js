window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
};

function makeAllTablesSortable(tables) {
	var colums_record = [];
	for (var i = 0; i < tables.length; i++) {
   		var colums = tables[i].rows[0].cells.length;
   		colums_record.push(colums);
	};
	// 获取对应table的列数
	var tables_record = 0;
	var colums_counter = 0;
	var th = document.getElementsByTagName("th");
	for (var th_counter = 0; th_counter < th.length; th_counter++, colums_counter++) {
		if (colums_counter == colums_record[tables_record]) {
			tables_record++;
			colums_counter = 0;
		}
		(function(th_counter, tables_record, colums_counter) {
		th[th_counter].onclick = function() {
			mySort(tables, th_counter, tables_record, colums_counter);
			// 传入被点击列的th所在表序数，列序数与所有th中的序数
		};
		})(th_counter, tables_record, colums_counter);
	};
};

function compare(str1, str2, flag) {
	var isNum = !(isNaN(str1) || isNaN(str2));
	var val1, val2;
	if (isNum == true) {
		val1 = parseFloat(str1);
		val2 = parseFloat(str2);
	} // 对数字进行预处理
	if (flag == "UpSort") {
		if (isNum == true && val1 > val2) {
			return true;
		}
		if (isNum == false && str1 > str2) {
			return true;
		}
	}
	if (flag == "DownSort") {
		if (isNum == true && val1 < val2) {
			return true;
		}
		if (isNum == false && str1 < str2) {
			return true;
		}
	}
	return false; // 对其进行比较
};

function mySort(tables, th_counter, tables_record, colums_counter) {
	var table = tables[tables_record];
	var ths = document.getElementsByTagName("th");
	var th = ths[th_counter];
	if (th.id != "UpSort") {
		th.id = "UpSort";
	} else {
		th.id = "DownSort";
	} // 设置排序方式
	var rowNum = table.rows.length;
	for (var i = 1; i < rowNum; i++) {
		for (var j = i+1; j < rowNum; j++) {
			if (compare(table.rows[i].cells[colums_counter].textContent, table.rows[j].cells[colums_counter].textContent, th.id)) {
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
			};
		};
	};
	// 冒泡排序
	for (var i = 0; i < ths.length; i++) {
		ths[i].className = "NoSort";
	};
	if (th.id == "UpSort") th.className = "UpSort";
	else th.className = "DownSort";
	// css格式修改
};
