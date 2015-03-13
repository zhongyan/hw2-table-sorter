window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}
function getAllRows(table) {  // First row is the table header
    return table.getElementsByTagName('tr');
}

function sortTable(tableId, colId) {
    table = getAllTables(tableId)[tableId];
    type = table.getAttribute('type');
    sortCol = table.getAttribute('sortCol');
    rows = getAllRows(table);

    ths = rows[0].getElementsByTagName('th');
    th = ths[colId];

    // 重置所有表格头的背景色，并删除span中的img元素
    for (var i = 0; i < ths.length; i++) {
        img_todelete = ths[i].lastChild.firstChild;
        ths[i].style.backgroundColor = "#04187E";

        if (img_todelete != null)
            ths[i].lastChild.removeChild(img_todelete);
    }

    // th中根据排序顺序增加img，并改变其背景色
    img = document.createElement('img');

    if (type == '0' || type == '2') {
        type = '1';
        img.setAttribute('src', 'https://github.com/ChJJin/hw2-table-sorter/blob/master/table-sorter/ascend.png?raw=true');

        // 无网络时使用本地资源
        // img.setAttribute('src', 'ascend.png');

        table.setAttribute('type', '1');
    } else if (type == '1') {
        type = '2';
        img.setAttribute('src', 'https://github.com/ChJJin/hw2-table-sorter/blob/master/table-sorter/descend.png?raw=trueg');

        // 无网络时使用本地资源
        // img.setAttribute('src', 'descend.png');

        table.setAttribute('type', '2');
    }

    th.lastChild.appendChild(img);
    th.style.backgroundColor = "#A5AFFC";

    var rowsArray = new Array();
    for (var i = 0; i < rows.length - 1; i++) {
        rowsArray[i] = rows[i + 1];
    }

    if (sortCol != colId) {
        // 进行排序
        rowsArray.sort(function (row1, row2) {
            var item1 = row1.getElementsByTagName('td')[colId].innerText;
            var item2 = row2.getElementsByTagName('td')[colId].innerText;

            if (type == 1)
                return item1 > item2;
            else
                return item1 < item2;
        })
    } else {
        rowsArray.reverse();
    }

    var tableHTML = '';

    tableHTML += '<thead><tr>' + rows[0].innerHTML + '</tr></thead><tbody>';

    for (var i = 0; i < rowsArray.length; i++) {
        tableHTML += '</tr>';
        tableHTML += rowsArray[i].innerHTML;
        tableHTML += '</tr>';
    }
    tableHTML += '</tbody>';
    table.innerHTML = tableHTML;

    rows = getAllRows(table);
    // 给偶数行增添背景色
    numOfRows = rows.length;
    for (var j = 2; j < numOfRows; j += 2) {
        rows[j].bgColor = "#DADEDC";
    }
}

function isTableSortable(table) {
    return table.getElementsByTagName('th').length > 0;
}

function makeAllTablesSortable(tables) {
    numOfTables = tables.length;

    for (var i = 0; i < numOfTables; i++) {
        table = tables[i];

        // 通过是否包含th判断是否可排序
        if (!isTableSortable(table))
            continue;

        rows = getAllRows(table);

        // 为table设置一个参数type， 0 - unsorted， 1 - ascend, 2 - descend
        // 为table设置一个参数sortCol
        table.setAttribute('type', '0');
        table.setAttribute('sortCol', '-1');

        // 给偶数行增添背景色
        numOfRows = rows.length;
        for (var j = 2; j < numOfRows; j += 2) {
            rows[j].bgColor = "#DADEDC";
        }
        for (var j = 1; j < numOfRows; j += 2) {
            rows[j].bgColor = "#FFFFFF";
        }

        ths = rows[0].getElementsByTagName('th');
        numOfCols = ths.length;

        for (j = 0; j < numOfCols; j++) {
            ths[j].style.color = "#FFFFFF";
            ths[j].style.backgroundColor = "#04187E";

            // 给表格头的每一个th增加span用于存放img
            img_span = document.createElement('span');
            img_span.style.marginLeft = '10px';
            img_span.style.styleFloat = 'right';
            ths[j].appendChild(img_span);

            // 绑定点击事件
            ths[j].setAttribute('onClick', 'sortTable(' + i + ', ' + j + ')');
        }
    }
}

// makeAllTablesSortable(getAllTables());