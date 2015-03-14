// 获取页面中所有表格
function getAllTables() {
  var tables = document.getElementsByTagName('table');
  return tables;
}

// 给每个表格增加点击事件发生时应调用的方法
function makeAllTablesSortable(tables) {
  for (var i = 0; i < tables.length; i++) {
    tableClickEventListening(tables[i]);
  }
  
}

// 表头被点击时，有样式的变化以及表格被排序
function tableClickEventListening(table) {
  var thRows = table.tHead.rows[0].cells;

  for (var i = 0; i < thRows.length; i++) {
    thRows[i].index = i;
    thRows[i].onclick = function() {

      // 布尔变量checked记录当前点击的单元格是否已升序
      var checked = false;
      if (this.className == "ascend") {
        checked = true;
      }

      // 恢复所有单元格样式
      for (var i = 0; i < thRows.length; i++) {
        thRows[i].className = "";                 
      }

      // 若之前状态是升序，则点击的单元格降序高亮，否则升序高亮
      if (checked) {
        this.className = "descend";               
      } else {
        this.className = "ascend";
      }

      // 调用排序方法
      SortTheTable(table, this.index);
    }
  }
}

// 排序方法
function SortTheTable(table, iCol) {
  var aTrs = new Array;
  var oTbody = table.tBodies[0];
  var colRows = oTbody.rows;

  // 将表格的每一行放入新数组
  for (var i = 0; i < colRows.length; i++) {
    aTrs[i] = colRows[i];
  }

  if (table.sortCol == iCol) {
    // 上一次排序的列和现在需要排序的列如果相同，直接将表格转置
    aTrs.reverse();                  
  } else {
    // 调用sort方法并传入排序函数
    aTrs.sort(compareEle(iCol));
  }

  // 将新表格的偶数行设置为灰色
  var oFragment = document.createDocumentFragment();
  for (var i = 0; i < aTrs.length; i++) {
    if (i % 2 != 0) {
      aTrs[i].className = "alternate";
    } else {
      aTrs[i].className = "";
    }
    oFragment.appendChild(aTrs[i]);
  }
  // 重新生成表格
  oTbody.appendChild(oFragment);

  // 记录最后一次排序的索引，以便下一次有机会直接转置表格
  table.sortCol = iCol;
}

// 排序函数
function compareEle(iCol) {
  return function(oTR1, oTR2) {
    // 取出待排序两行被点击的列的文本，进行比较
    var v1 = oTR1.cells[iCol].textContent;      
    var v2 = oTR2.cells[iCol].textContent;
    if (v1 < v2) {
      return -1;
    } else if (v1 > v2) {
      return 1;
    } else {
      return 0;
    }
  };
}

// 在console里调用时，需要把外层的 window.onload = function() {} 去掉
window.onload = function() {
  var tables = getAllTables();
  makeAllTablesSortable(tables);
}
