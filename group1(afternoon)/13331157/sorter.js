/**
 * FileName: sorter.js;
 * Author: linyiting;
 */

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].getElementsByTagName('th');
        for (var j = 0; j < ths.length; j++) {
            ths[j].tableNum = i;    //tableNum属性记录ths[j]所在的表格
            ths[j].onclick = function (j) {    //使用闭包
                return function() {
                    var table = tables[this.tableNum];
                    sortFunc(table, j);    //进行排序
                    setStyle(table, j);    //改变样式
                }
            }(j);
        }
    }
}
/**
 * sort fuction
 */
function sortFunc(table, index) {
    var rows = [];
    var ths = table.getElementsByTagName('th');
    for(var count = 0; count < table.tBodies[0].rows.length; count++)
        rows[count] = table.tBodies[0].rows[count];

    var currentClass = ths[index].className;
    rows.sort(function(row1, row2) {    //对rows[]数组进行排序，使用数组的sort方法
        var str1 = row1.cells[index].innerHTML;
        var str2 = row2.cells[index].innerHTML;
        if (currentClass == '' || currentClass == 'descend-style') {
            return str1.localeCompare(str2);
        } else {
            return str2.localeCompare(str1);
        }
    });

    for(var count = 0; count < rows.length; count++) //将rows[]的添加为table.tBodies[0]子节点
        table.tBodies[0].appendChild(rows[count]);
}
/**
 * change the style of the table
 */
function setStyle(table, index) {
    var ths = table.getElementsByTagName('th');
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < ths.length; i++) {
        if (i == index) {
            if (ths[i].className == '' || ths[i].className == 'descend-style')
                ths[index].className = 'ascend-style';
            else
                ths[index].className = 'descend-style';
        } else {
            ths[i].className = '';
        }
    }
    for (var i = 0; i < rows.length; i++) {
        rows[i].className = '';
        if (i%2 == 1) {
            rows[i].className = 'alternate';
        }
    }
}
