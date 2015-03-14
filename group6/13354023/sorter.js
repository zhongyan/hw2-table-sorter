function markEvenRow(table) {
  var pattern = new RegExp('(^|\\s)*alternate(\\s|$)*');
  for (var i = 1; i < table.rows.length; i++) {
    if (i % 2) {  // Odd Row
      // unmark
      table.rows[i].className = table.rows[i].className.replace(pattern, '');
    } else if(!pattern.test(table.rows[i].className)) {  // Even Row Not Marked
      // mark
      table.rows[i].className += ' alternate';
    }
  }
}

// Sort the 'contents' of the 'table' according to column number 'col'
function sortTable(table, contents, col) {
  var head = table.rows[0];  // Acquire the table head
  var pattern1 = new RegExp('(^|\\s)*ascend(\\s|$)*');
  var pattern2 = new RegExp('(^|\\s)*descend(\\s|$)*');

  // Clear the style of all column head
  var clearColumnStyle = function() {
    for (var i = 0; i < head.cells.length; i++) {
      head.cells[i].className = head.cells[i].className.replace(pattern1, '');
      head.cells[i].className = head.cells[i].className.replace(pattern2, '');
    }
  };

  // Decide previous order of the column
  if (pattern1.test(head.cells[col].className)) { // Already ascend
    // Set new style to column head
    clearColumnStyle();
    head.cells[col].className += ' descend';
    // Sort table contents
    contents.sort(function(a, b) {
      if (isNaN(a.cells[col].innerHTML) || isNaN(b.cells[col].innerHTML)) {
        // Sort for strings
        return b.cells[col].innerHTML.localeCompare(a.cells[col].innerHTML);
      } else {
        // Sort for numbers
        var x = parseInt(a.cells[col].innerHTML, 10);
        var y = parseInt(b.cells[col].innerHTML, 10);
        return y - x;
      }
    });
  } else {  // Already descend or has no order
    clearColumnStyle();
    head.cells[col].className += ' ascend';
    contents.sort(function(a, b) {
      if (isNaN(a.cells[col].innerHTML) || isNaN(b.cells[col].innerHTML)) {
        return a.cells[col].innerHTML.localeCompare(b.cells[col].innerHTML);
      } else {
        var x = parseInt(a.cells[col].innerHTML, 10);
        var y = parseInt(b.cells[col].innerHTML, 10);
        return x - y;
      }
    });
  }
  // Update the contents of the table
  for (var i = 0; i < contents.length; i++) {
    table.appendChild(contents[i]);
  }
}


function makeAllTablesSortable(tables) {
  var i, j;  // loop index

  // Bind onclick event to the 'col' column of the table
  // id:table's index, contents:table's data array, col: column number
  var setClick = function(id, contents, col) {
    tables[id].rows[0].cells[col].onclick = function() {
      sortTable(tables[id], contents, col);
      markEvenRow(tables[id]);
    };
  };

// For each table in the page
  for (i = 0; i < tables.length; i++) {
    markEvenRow(tables[i]);
    // Obtain data from the DOM Table
    var table = tables[i].rows;
    // Copy the data into an array to sort
    var contents = [];
    for (j = 0; j < table.length; j++) {
      contents[j] = table[j];
    }
    // Table head should not be sorted
    contents.splice(0, 1);
    // For each column cell in the head, set the onclick event
    for (j = 0; j < tables[i].rows[0].cells.length; j++) {
      setClick(i, contents, j);
    }
  }
}

function getAllTables() {
  return document.getElementsByTagName('table');
}

window.onload = function() {
  var tables = getAllTables();
  makeAllTablesSortable(tables);
};