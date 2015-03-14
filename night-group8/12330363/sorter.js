/**
  * JavaScript entry
  */
window.onload = function() {
  var tables = getAllTables();
  makeAllTablesSortable(tables);
}

function getAllTables() {
  return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
  for (var i = 0; i < tables.length; i++) {
    // get all table heads
    var tHeads = tables[i].tHead.getElementsByTagName("th");
    setTableHeadStyle(tHeads);
    // add a click event listener for each head in each table
    for (var j = 0; j < tHeads.length; j++) {
      makeTableHeadClickable(tHeads[j], tables[i], j);
    }
    //setAlternateRows(tables[i]);
  }
}

function setTableHeadStyle(ths) {
  for (var i = 0; i < ths.length; i++) {
    // add a span to contain the arrow icon
    var indicator = document.createElement("span");
    indicator.className = "indicator";
    var indicatorImg = document.createElement("img");
    indicatorImg.src = "./ascend.png";
    indicator.appendChild(indicatorImg);
    ths[i].appendChild(indicator);
  }
}

function makeTableHeadClickable(th, table, col) {
  /* When mouse click the head row */
  // initially, the sorting order should be ascending
  var isAscending = true;

  /**
    * 1) Style changes:
    *    BG color changes;
    *    Arrow icon shows.
    */
  th.addEventListener("click", function() {
    // clear other head rows' style
    if (document.getElementById("active")) {
      var active = document.getElementById("active");
      active.id = "";
    }
    // set the current active th's style
    th.id = "active";
    var indicator = th.getElementsByTagName("span")[0];
    indicator.id = "active-indicator";
    var indicatorImg = indicator.getElementsByTagName("img")[0];
    indicatorImg.src = isAscending ? "./ascend.png" : "./descend.png";
    isAscending = !isAscending;
  });

  /**
    * 2) rows are sorted by the selected column
    */
  th.addEventListener("click", function() {
    sortTable(table, col, isAscending);
  });
}

function sortTable(table, col, isAscending) {
  var arr = [];
  var tBodies = table.rows;
  for (var i = 1; i < tBodies.length; i++) {
    arr.push(tBodies[i]);
  }
  arr.sort(function(a, b) {
    if (isAscending) {
      return (a.cells[col].innerHTML <= b.cells[col].innerHTML);
    } else {
      return (a.cells[col].innerHTML > b.cells[col].innerHTML);
    }
  });
  // change table contents accordingly
  var newRows = [];
  for (var i = 0; i < arr.length; i++) {
    newRows.push("" + arr[i].innerHTML);
  }
  for (var i = 1; i < tBodies.length; i++) {
    tBodies[i].innerHTML = newRows[i - 1];
  }
}

function setAlternateRows(table) {
  // change all even indexed, non-head rows with specified class name
  var tBodies = table.rows;
  for (var i = 1; i < tBodies.length; i++) {
    if (i % 2 == 0) {
      tBodies[i].className = "alternate";
    } else {
      tBodies[i].className = "";
    }
  }
}
