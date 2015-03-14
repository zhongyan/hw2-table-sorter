window.onload = function() {
	var tables = getALLTables();
	makeAllTablesSorttable(tables);
}

function getALLTables () {
	return document.getElementsByTagName("table");
}

function getCompare(index){
   return function(tr1,tr2){
    //获得第一行的值
    var val1=tr1.cells[index].innerHTML;
    //获得第二行的值
    var val2=tr2.cells[index].innerHTML;
    //比较两个值大小
    return val1.localeCompare(val2);
   }
  }

function sortTr (col, table) {
	var tableRow = [];
	var heads = table.getElementsByTagName('th');
	for (var i = 1; i < table.rows.length; i++) 
		tableRow[i-1] = table.rows[i];
	if (table.colNum == col) {
		tableRow.reverse();
		table.flag = !table.flag;
	} else {
		tableRow.sort(getCompare(col));
		table.flag = true;
		if (table.colNum != -1) {
			heads[table.colNum].style.backgroundColor="blue";
		}
	}
	if (table.flag == true) {
		heads[col].style.backgroundImage = "url(ascend.png)";
	} else {
		heads[col].style.backgroundImage = "url(descend.png)";
	}
	for (var i = 1; i < table.rows.length; i++) {
		if ((i-1)%2 == 1) tableRow[i-1].setAttribute('class', 'alternate');
		else tableRow[i-1].setAttribute('class', 'non-alternate');
		table.appendChild(tableRow[i-1]);
	}
	heads[col].style.backgroundColor="blue";
	table.colNum = col;
}

function makeTableSorttable(table) {
	var tableHeads = table.getElementsByTagName("th");
	for (var i = 0; i < tableHeads.length; i++) {
		(   function(i) {tableHeads[i].onclick = function(){sortTr(i, table);}}  )(i);
	}
}

function makeAllTablesSorttable (tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].colNum = -1;
		tables[i].flag = true;
		makeTableSorttable(tables[i]);
	}
}