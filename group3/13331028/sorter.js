/*software process improvement
 week2 homework (table-sorter) javascript*/

$ = function(id) {
  return document.getElementById(id);
}
$$ = function(selector) {
  return document.querySelectorAll(selector);
}

// used to indicate the order of sorting
var ascend = 0, descend = 1;

function getAllTables() {
  return document.getElementsByTagName("table");
}

function changeTableRowColor(tables) {
  for (var j = 0; j < tables.length; j++) {
    var rows = tables[j].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      if (i % 2 == 0) {
        rows[i].className = "evenrow";
      } else {
        rows[i].className = "oddrow";
      }
    }
  }
}

function sortTable(table_id, thContent, order) {
  // get the number of rows and cols
  var thLen = $$("table#"+table_id+" th").length;
  var trLen = $$("table#"+table_id+" tr").length;
  
  // store data as a two-dimension array
  var dataArr = [];
  for (var i = 0; i < trLen; i++) {
    dataArr.push($(table_id).rows[i].cells);
  }

  // find which th is clicked
  var thNum;
  for (var i = 0; i < thLen; i++)
    if (dataArr[0][i].innerHTML == thContent)
      thNum = i;
  
  // sort the table
  for (var i = 1; i < trLen; i++)
    for (var j = i+1; j < trLen; j++)
      if (order == 0) {
        if (dataArr[i][thNum].innerHTML > dataArr[j][thNum].innerHTML)
          exchange(dataArr, i, j, thLen);
      } else {
        if (dataArr[i][thNum].innerHTML < dataArr[j][thNum].innerHTML)
          exchange(dataArr, i, j, thLen);
      }
}

function exchange(dataArr, i, j, thLen) {
  for (var k = 0; k < thLen; k++) {
    var temp = dataArr[i][k].innerHTML;
    dataArr[i][k].innerHTML = dataArr[j][k].innerHTML;
    dataArr[j][k].innerHTML = temp;
  }
}

function thClick(thObj, tableHeads) {
  return function() {
    // change the style of the clicked th and sort the table
    if (this.className == "upButton") {
      this.className = "downButton";
      sortTable(this.parentNode.parentNode.parentNode.id,
        this.innerHTML, descend);
    } else {
      this.className = "upButton";
      sortTable(this.parentNode.parentNode.parentNode.id,
        this.innerHTML, ascend);
    }

    // change the style of other th
    for (var j = 0; j < tableHeads.length; j++)
      if (tableHeads[j] != this)
        tableHeads[j].className = "";
  }
}

function makeAllTableSortable(tables) {
  changeTableRowColor(tables);

  // binding click on each table's heads
  var tableHeads = $$("table th");
  for (var i = 0; i < tableHeads.length; i++) {
    tableHeads[i].onclick = thClick(tableHeads[i], tableHeads);
  }
}

window.onload = function() {
  var tables = getAllTables(); 
  makeAllTableSortable(tables);
}

