/*13331236 谭笑*/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

var getAllTables = function() {
    return document.getElementsByTagName("table");
}

var makeAllTablesSortable = function(tables) {
    for (var i = 0; i < tables.length; i++) {
        display(tables[i]);
    }
}

var display = function(table) {
    console.log("Now executing Display\n");
    var columnList = table.getElementsByTagName("th");
    var columnNumbers = columnList.length;
    var rows = table.tBodies[0].rows;
    var rowNumbers = rows.length;
    var rowList = new Array();
    var rowListSize = 0;
    var tHead;
    for (var i = 0; i < rowNumbers; i++) {
        if (rows[i].getElementsByTagName("th").length != 0) {
            tHead = rows[i];
        } else {
            rowList[rowListSize] = rows[i];
            rowListSize++;
        }
    }
    var ascendImg = document.createElement("img"), descendImg = document.createElement("img");
    ascendImg.setAttribute("src", "ascend.png");
    descendImg.setAttribute("src", "descend.png");
    ascendImg.setAttribute("id", "ascend");
    descendImg.setAttribute("id", "descend");

    for (var c = 0; c < columnNumbers; c++) {
        (function(_c) {
            columnList[_c].onclick = function() {
                rowList.sort(ascendSort(_c)); //先进行排序
                if (columnList[_c].className == "ascend") { //已经从小到大排序时
                    for (var j = 0; j < columnNumbers; j++) {
                        columnList[j].className = "";
                        var image = document.getElementById("ascend");
                        if (image != undefined) {
                            image.parentNode.removeChild(image);
                        }
                    }
                    this.className = "descend";
                    this.appendChild(descendImg);
                    rowList.reverse();
                } else { //从大到小排序时或未排序时
                    for (var j = 0; j < columnNumbers; j++) {
                        columnList[j].className = "";
                        var image = document.getElementById("descend");
                        if (image != undefined) {
                            image.parentNode.removeChild(image);
                        }
                    }
                    columnList[_c].className = "ascend";
                    columnList[_c].appendChild(ascendImg);
                }
                //清空原有table的各行
                for (var i = 0; i < rowNumbers; i++) {
                    table.tBodies[0].removeChild(rows[0]);
                }
                //更新table的各行
                var newHead = document.createElement("tr");
                if (tHead != undefined) {
                    newHead = tHead;
                    table.tBodies[0].appendChild(newHead);
                }
                for (var i = 0; i < rowListSize; i++) {
                    var newRow = document.createElement("tr");
                    newRow = rowList[i];
                    table.tBodies[0].appendChild(newRow);
                }
                //偶数行高亮表示
                highlight(table.tBodies[0]);
            }
        })(c);
    }
}

var ascendSort = function(col) {
    return function (val1, val2) {
        var x1 = val1.getElementsByTagName("td")[col].firstChild.nodeValue;
        var x2 = val2.getElementsByTagName("td")[col].firstChild.nodeValue;
        //当表格中含有元素节点时
        if (x1 == null) {
            x1 = val1.getElementsByTagName("td")[col].firstChild.innerHTML;
        }
        if (x2 == null) {
            x2 = val2.getElementsByTagName("td")[col].firstChild.innerHTML;
        }
        //当表格中有数字时
        if (x1.match("%") && x2.match("%")) { //百分数
            x1 = parseFloat(x1);
            x2 = parseFloat(x2);
        }
        if (!isNaN(x1) && !isNaN(x2)) {
            x1 = Number(x1);
            x2 = Number(x2);
        }
        if (x1 < x2) {
            return -1;
        } else if (x1 > x2) {
            return 1;
        } else {
            return 0;
        }
    };
}

var highlight = function(tBody) {
    var rowLength = tBody.rows.length;
    for (var i = 0; i < rowLength; i++) {
        tBody.rows[i].className = "";
    }
    for (var i = 1; i < rowLength; i += 2) {
        if (tBody.rows[i].getElementsByTagName("th").length != 0) {
            i++;
        }
        tBody.rows[i].className = "alternate";
    }
}