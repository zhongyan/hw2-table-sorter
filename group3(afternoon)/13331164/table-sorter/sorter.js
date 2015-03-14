window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (i = 0; i < tables.length; i++) {
		(function(i) {
		trow_ = tables[i].getElementsByTagName("tr");
		thead_ = tables[i].getElementsByTagName("th");
		for (j = 0; j < thead_.length; j++) {
		(function(j) {
			thead_[j].onclick = function() {   // 点击事件
		// 进入排序函数，其中i是第i个table，j是第j列(需要进行排序的列)
				sort_table(i, j);
			};
		})(j);
		}
		})(i);
	}
}

var sortCol; // sortCol用来记录上一次排序的列

function sort_table(table_No, col_No) {   // 排序函数
	var tables = getAllTables();
	var tbody = tables[table_No].tBodies[0];
	var th_ = tables[table_No].getElementsByTagName("th"); // 目标排序table的所有th
	var all_th = document.getElementsByTagName("th");  // html中所有的th
	var th = th_[col_No];   // 目标排序的th
	trow_ = tables[table_No].rows;
	pre_temp = new Array;   // 目标排序table的所有的行
	for (var i = 1; i < trow_.length; i++) {
		pre_temp[i-1] = trow_[i];
	}
	if (sortCol == col_No) {
        pre_temp.reverse();  // 如果上一次已经排序，则反向排序
    } else {
		pre_temp.sort(Compare(col_No));  // 排序
	}
	// 设置好所有th/tr的classname
    for (i = 0; i < pre_temp.length; i++) {
    	if(i % 2 == 1)
        	pre_temp[i].className = 'alternate'; //table偶数行格式
        else
        	pre_temp[i].className = '';
        tbody.appendChild(pre_temp[i]);
    }
    sortCol = col_No;
    class_name = th_[col_No].className;
    for (i = 0; i < all_th.length; i++) {
    	all_th[i].className = 'nochange';  // 其他的th格式不变
    }
    // 目标排序th的class
    if (class_name == 'Descend' || class_name == 'nochange') {
    	th_[col_No].className = 'Ascend';
    } else if (class_name == '') {
    	th_[col_No].className = 'Ascend';
    }
     else if (class_name == 'Ascend') {
    	th_[col_No].className = 'Descend';
    }
}

//比较函数
function Compare(col_No) {
    return  function (oTR1, oTR2) {
        var Value1 = changeType(oTR1.cells[col_No].textContent);
        var Value2 = changeType(oTR2.cells[col_No].textContent);
        if (Value1 < Value2) {
            return -1;
        } else if (Value1 > Value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

function changeType(obj) {  // 转换类型
    if (isNaN(obj))
        return obj.toString();
    else
        return parseFloat(obj);

}