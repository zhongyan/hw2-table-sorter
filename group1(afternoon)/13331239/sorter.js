window.onload = function()
{
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables()
{
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables)
{
	for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}
function makeTableSortable(table)
{
	var name = table.id;
	var ths = table.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
		(function(i)
		{
			ths[i].onclick = function()
			{
				sortTable(name, i);
			};
		})(i);
	};
}
var first = 0;
var second = 0;
function sortTable(sTableid,iCol)
{
	var oTable = document.getElementById(sTableid);
	var oTbody = oTable.tBodies[0];
	var colDataRows = oTbody.rows;
	colDataRows[1].style.backgroundColor = "white";

	var tr = new Array();
	for (var i = 0; i < colDataRows.length; i++) {
		tr.push(colDataRows[i]);
	};


	if (oTable.sortCol == iCol)
	{
		tr.reverse();
		if (sTableid == "todo") {
			if ((first++) % 2 == 0)
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
			else
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('descend.png')";
		}
		else if (sTableid == "staff") {
			if ((second++) % 2 == 0)
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
			else
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('descend.png')";
		}
	}
	else
	{
		tr.sort(Compare(iCol));
		//oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
		if (sTableid == "todo") {
			if ((first++) % 2 == 0)
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
			else
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('descend.png')";
		}
		else if (sTableid == "staff") {
			if ((second++) % 2 == 0)
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
			else
				oTable.rows[0].cells[iCol].style.backgroundImage = "url('descend.png')";
		}
	}
	var oFragment = document.createDocumentFragment();
	for (var i = 0; i < tr.length; i++) {
		oFragment.appendChild(tr[i]);
	};

	oTbody.appendChild(oFragment);
	oTable.sortCol = iCol;
	colDataRows[1].style.backgroundColor = "#d9d6c3";
	/*oTable.rows[0].cells.onmouseout = function() {
		for (var i = 0; i < oTable.rows[0].cells.length; i++) {
			oTable.rows[0].cells[0].style.backgroundImage = "none";
		};
	}*/
}

function Compare(iCol)
{
	return function compare(oTR1, oTR2)
	{
		var value1 = oTR1.cells[iCol].firstChild.nodeValue;
		var value2 = oTR2.cells[iCol].firstChild.nodeValue;
		if (value1 > value2) {
			return 1;
		} else if (value1 < value2)
		{
			return -1;
		} else {
			return 0;
		}
	}
}