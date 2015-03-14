//13331203  牛仁鹏
//url:http://acdream.info/ranklist
//第二部分url：http://www.w3school.com.cn/tiy/loadtext.asp?f=html_tbody  
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
    	makeTableSortable(tables[i]);
    }
}
//使一个表格可以排序
function makeTableSortable(item) {
    var thead = item.getElementsByTagName("thead")[0];
    var ths = thead.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
    	ths[i].onclick = function() {
    		clickTable(this, this.cellIndex+1);
    	}
    }
}
//对表格进行点击
//item为表格的单元格
//key为关键字，第key列
function clickTable(item, key) {
    var Table = item.parentNode.parentNode.parentNode;
    if (item.className == "") {
    	for (var i = 0; i < Table.getElementsByTagName("th").length; i++) {
    		Table.getElementsByTagName("th")[i].className = "";
    	}
    	sortTable(Table, key, function(a, b){
            if (a >= b) return true;
            else return false;
    	});
    	item.className = "up";
    } else if (item.className == "up") {
        sortTable(Table, key, function(a, b) {
        	if (a <= b) return true;
        	else return false;
        });
        item.className = "down"
    } else if (item.className == "down") {
        sortTable(Table, key, function(a, b){
            if (a >= b) return true;
            else return false;
    	});
    	item.className = "up";
    } else {
    	return;
    }
}
//对一个表格进行排序
//item为将进行排序的table
//key为关键字，即第key列
//mode为函数指针，规定排列的方式
function sortTable(item, key, mode) {
    var tbody = item.getElementsByTagName("tbody")[0];
    var trs = tbody.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
    	for (var j = 0; j < trs.length-1; j++) {
    		var td1 = trs[j].getElementsByTagName("td")[key-1];
    		var td2 = trs[j+1].getElementsByTagName("td")[key-1];
            if (!mode(td1.innerHTML,td2.innerHTML)) {
            	swapTr(trs[j], trs[j+1]);
            }
    	}
    }
}
//交换两行内容
function swapTr(tr1, tr2) {
    var tds1 = tr1.getElementsByTagName("td");
    var tds2 = tr2.getElementsByTagName("td");
    var temp;
    for (var i = 0; i < tds1.length; i++) {
        temp = tds1[i].innerHTML;
        tds1[i].innerHTML = tds2[i].innerHTML;
        tds2[i].innerHTML = temp;
    }
}