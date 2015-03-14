window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    var table_arr = document.getElementsByTagName("table");
    return table_arr;
}


function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var body = tables[i];
        k = 0;
        sortCol = -1;


        if (body.tHead != null) {
            for (var j = 1; j < body.tBodies[0].rows.length; j = j + 2) {
                body.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        } else {
            for (var j = 2; j < body.tBodies[0].rows.length; j = j + 2) {
                body.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        }

        for (var m = 0; m < body.getElementsByTagName('th').length; m++) {
            body.getElementsByTagName('th')[m].onclick = sort(body, m)
        };
    };
}


function sort(table_, iCol) {
    return function() {
        var sortTable = table_;
        for (var j = 0; j < sortTable.tBodies[0].rows.length; j++) {
            sortTable.tBodies[0].rows[j].style.backgroundColor = 'white';
        };

        for (var i = 0; i < this.parentNode.cells.length; i++) {
            this.parentNode.cells[i].style.backgroundImage = "";
        };


        var sortBody = sortTable.tBodies[0];
        var rows = sortBody.rows; // 引用
        var arr = new Array();

        if (sortTable.tHead != null) {
            for (var i = 0; i < rows.length; i++) {
                arr.push(rows[i]);
            };
        } else {
            for (var i = 1; i < rows.length; i++) {
                arr.push(rows[i]);
            };
        }


        if (sortCol == iCol) {
            arr.reverse();
        } else {
            if (k % 2 == 0) { // 升序
                arr.sort(Compare(iCol));
            } else {
                arr.sort(Compare1(iCol));
            }
        }

        k++;
        if (k % 2 == 1) {
            this.style.backgroundImage = "url(ascend.png)";
        } else {
            this.style.backgroundImage = "url(descend.png)";
        }

        var oFragment = document.createDocumentFragment(); // 创建文档碎片
        for (var i = 0; i < arr.length; i++) {
            oFragment.appendChild(arr[i]);
        };
        sortBody.appendChild(oFragment); // ************
        sortCol = iCol;

        if (sortTable.tHead != null) {
            for (var j = 1; j < sortTable.tBodies[0].rows.length; j = j + 2) {
                sortTable.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        } else {
            for (var n = 2; n < sortTable.tBodies[0].rows.length; n = n + 2) {
                sortTable.tBodies[0].rows[n].style.backgroundColor = 'lightgray';
            };
        }
    }
}

function Compare(iCol) {
    return function CompareTRs(oTR1, oTR2) {
        var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
        var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function Compare1(iCol) {
    return function CompareTRs(oTR1, oTR2) {
        var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
        var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
        if (value1 > value2) {
            return -1;
        } else if (value1 < value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function convert(value) {
    return value.toString();
}