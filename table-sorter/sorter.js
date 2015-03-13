/*
 * Author: Yuheng Deng
 * Date: 2015-03-12
 * E-mail: dengyh071@gmail.com
 * Description: The javascript to make the table sortable
 */

var hasPicture = true;

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    var tables;
    tables = document.getElementsByTagName('table');
    return tables;
}

function makeAllTablesSortable(tables) {
    var index;
    for (index = 0; index < tables.length; index++) {
        makeTableSortable(tables[index]);
    }
}

function makeTableSortable(table) {
    var tableHeads, index;
    tableHeads = table.getElementsByTagName('th');
    for (index = 0; index < tableHeads.length; index++) {
        (function() {
            addEventToTableHead(index, tableHeads, table);
        })();
    }
}

function addEventToTableHead(column, tableHeads, table) {
    var columnCount = tableHeads.length;
    tableHeads[column].addEventListener('click', function() {
        if (tableHeads[column].id === '' || tableHeads[column].id === 'descend') {
            tableHeads[column].id = 'ascend';
        } else {
            tableHeads[column].id = 'descend';
        }
        var sortType = tableHeads[column].id;
        sortTableByColumn(column, columnCount, table, sortType);
        if (typeof(hasPicture) !== 'undefined' && hasPicture) {
            changeTableHeadStyle(column, tableHeads, sortType);
        }
    });
    tableHeads[column].style.cursor = 'pointer';
}

function sortTableByColumn(column, columnCount, table, sortType) {
    var tableDataList = getDataFromTable(columnCount, table);
    sortTable(column, columnCount, tableDataList, sortType);
}

function getDataFromTable(columnCount, table) {
    var dataCells = table.getElementsByTagName('td');
    var dataList = [];
    var rowData;
    for (var i = 0; i < dataCells.length; i++) {
        rowData = [];
        for (var j = 0; j < columnCount; j++) {
            rowData.push(dataCells[i + j]);
        }
        i += columnCount - 1;
        dataList.push(rowData);
    }
    return dataList;
}

function sortTable(column, columnCount, tableDataList, sortType) {
    for (var i = 0; i < tableDataList.length - 1; i++) {
        for (var j = i + 1; j < tableDataList.length; j++) {
            var swapFlag = tableDataList[i][column].innerHTML > tableDataList[j][column].innerHTML;
            if (sortType === 'descend') {
                swapFlag = !swapFlag;
            }
            if (swapFlag) {
                swapRow(tableDataList[i], tableDataList[j], columnCount);
            }
        }
    }
}

function swapRow(row1, row2, columnCount) {
    for (var i = 0; i < columnCount; i++) {
        var temp = row1[i].innerHTML;
        row1[i].innerHTML = row2[i].innerHTML;
        row2[i].innerHTML = temp;
    }
}

function changeTableHeadStyle(column, tableHeads, sortType) {
    initializeTableHeadStyle(tableHeads, column);
    tableHeads[column].style.backgroundColor = 'rgba(165,175,255,1)';
    tableHeads[column].style.paddingRight = '0';
    var image = document.createElement('img');
    image.style.float = 'right';
    image.style.marginRight = '4px';
    image.style.marginLeft = '4px';
    image.src = sortType + '.png';
    image.id = 'sort-type';
    tableHeads[column].appendChild(image);
}

function initializeTableHeadStyle(tableHeads, column) {
    for (var i = 0; i < tableHeads.length; i++) {
        var images = tableHeads[i].getElementsByTagName('img');
        for (var j = 0; j < images.length; j++) {
            tableHeads[i].removeChild(images[j]);
        }
        tableHeads[i].style.paddingRight = '24px';
        tableHeads[i].style.backgroundColor = 'rgba(3,3,128,1)';
        // Clear the status of the last click event of another column
        // if (column !== i) {
        //   tableHeads[i].id = '';
        // }
    }
}