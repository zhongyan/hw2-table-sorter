/*
  ekuri wrote this sorter.js on 2015-3-11
  this js try to sort the data of a table to ascend or descend order
  laterly written on 2015-3-13
*/

window.onload = function () {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
};

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	var thArray = document.getElementsByTagName("th");
	 for (var count = 0; count < thArray.length; count++) {
		 thArray[count].onclick = function s() {
			 sortBy(this, tables);
		 };
	 }
}

  // sort the table by the given thead of colume: target
function sortBy(target, tables) {
	
	// find the table that hold target
	for (var count = 0; count < tables.length; count++) {
		for (var temp = 0; temp < tables[count].cells.length; temp++) {
			if (target == tables[count].cells[temp]) {
				sortTable(tables[count], temp)
			}
		}
	}
}

  // the main function that sort the table, colume is the colume of the table that being selected
function sortTable(target, colume)
{
  // get the tr child of the table
  var trChild = target.childNodes[1].childNodes[1];
  
  // set initial backgroundColor of all heads of the table
  // the color should be changed only when it was selected
  for (var count = 0; count * 2 + 1 < trChild.childNodes.length; count++) {
	  var tempChild = trChild.childNodes[count * 2 + 1];
	  tempChild.style.backgroundColor = "#000077";
  }
  
  // get the th child which is selected
  var targetChild = trChild.childNodes[colume * 2 + 1];
  // change the backgroundColor of selected th to shallow blue
  targetChild.style.backgroundColor = "#AAAAFF";
  
  // record and find the state of order, descend or ascend
  var descend;
  if (targetChild.style.backgroundImage.match("ascend")) {
	  targetChild.style.backgroundImage = "url('descend.png')";
	  descend = true;
  } else {
	  targetChild.style.backgroundImage = "url('ascend.png')";
	  descend = false;
  }
  
  // set backgroundImage to right top of th and no repeat
  // note that image will auto repeat if the it is not big enough
  targetChild.style.backgroundPosition = "right top";
  targetChild.style.backgroundRepeat = "no-repeat";
  
  // get the data in the table and store it into an array
  var arr = getArray(target);
  
  // sort the data in the array
  sortData(arr, colume, descend);
  
  // write data back to the table
  updateTableData(target, arr);
}

  // the function below try to get the data in the table
  // the data will store in an array which will be returned
function getArray(target) {
	var arr = new Array();
	for (var count = 1; count < target.rows.length; count++) {
		var row = new Array();
		for (var temp = 0; temp < target.rows[count].cells.length; temp++) {
			row[temp] = target.rows[count].cells[temp].innerHTML;
		}
		arr[count - 1] = row;
	}
	return arr;
}

  // the function below will write the data in the given array to the given table
  // the data in the table will be overwritten
function updateTableData(tableObj, dataArray) {
	for (var count = 1; count < tableObj.rows.length; count++) {
		for (var temp = 0; temp < tableObj.rows[0].cells.length; temp++) {
			tableObj.rows[count].cells[temp].innerHTML = dataArray[count - 1][temp];
		}
	}
}

  // the function below will sort the data in the given array to given order
  // the order should be ascend (method == false) or descend (method == true)
  // colume is the colume of the table that need to be compared
function sortData(arr, colume, method) {
	var flag;
	
	// selection sort
	for (var count = 0; count < arr.length; count++) {
		flag = count;
		var tempRow;
		for (var temp = count; temp < arr.length; temp++) {
			if (method) {
				if (arr[flag][colume] < arr[temp][colume])
				flag = temp;
			} else {
				if (arr[flag][colume] > arr[temp][colume])
				flag = temp;
			}
		}
		
		// swap data
		tempRow = arr[flag];
		arr[flag] = arr[count];
		arr[count] = tempRow;
	}
}