/*
 * Author: Yuheng Deng
 * Date: 2015-03-12
 * E-mail: dengyh071@gmail.com
 * Description: The javascript to make the table sortable
 */

var flag = true;

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
    sortTableByColumn(column, columnCount, table);
  });
  tableHeads[column].style.cursor = 'pointer';
}

function sortTableByColumn(column, columnCount, table) {
  var tableDataList = getDataFromTable(columnCount, table);
  sortTable(column, columnCount, tableDataList);
  flag = !flag;
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

function sortTable(column, columnCount, tableDataList) {
  for (var i = 0; i < tableDataList.length - 1; i++) {
    for (var j = i + 1; j < tableDataList.length; j++) {
      var swapFlag = tableDataList[i][column].innerHTML > tableDataList[j][column].innerHTML;
      if (!flag) {
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