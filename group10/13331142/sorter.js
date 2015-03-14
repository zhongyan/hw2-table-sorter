window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].getElementsByTagName("th");
        for (var j = 0; j < ths.length; j++) {
            ths[j].onclick = function(i, j) {
            	return function() {
            	    sortTable(tables[i], j);
            	    if (tables[0].id == "todo") {  //因为要兼容其他网页的表格，如果不是作业网页则不改变样式
                        titleBackground(tables[i], j);
                    }
                };
            }(i, j);  // 这里因为闭包的一些影响，用一个自执行函数，避免i,j的值始终为length;
        }
    }
}

function sortTable(Itable, Icol) {
    var tbody = Itable.tBodies[0];
    var tr = Itable.getElementsByTagName('tr');

    var trValue = new Array();
    for (var i=1; i<tr.length; i++ ) {  //这里第一个tr是表头，不改变
        trValue[i-1] = tr[i];
    }

    if (tbody.sortCol == Icol) {
        trValue.reverse();
    } else {
        trValue.sort(function(tr1, tr2) {
            var value1 = tr1.cells[Icol].innerHTML;
            var value2 = tr2.cells[Icol].innerHTML;
            return value1.localeCompare(value2);
        });
    }  
    var fragment = document.createDocumentFragment();
    for (var i=0; i<trValue.length; i++ ) {
        fragment.appendChild(trValue[i]);
    }
    tbody.appendChild(fragment);
    tbody.sortCol = Icol;
}

function titleBackground(Itable, Icol) {  //进行样式的修改
	var tr = Itable.getElementsByTagName('tr');
	for (var i = 1; i < tr.length; i++) {
        if (i%2 == 0) {
            tr[i].className = "alternate";
        } else {
            tr[i].className = "";
        }
    }
    var ths = Itable.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
        if (i == Icol) {
            if (ths[i].className == ""||ths[i].className == "downSort") {
                ths[i].className = "upSort";
            } else if (ths[i].className == "upSort") {
                ths[i].className = "downSort";
            }
        } else {
            ths[i].className = "";
        }
    }
}
