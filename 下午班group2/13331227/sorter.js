window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

var time = 1;
var count = 1;
function getAllTables() {
	var t = document.getElementsByTagName("table");
	return t;
}
var check = 0;
function makeAllTablesSortable(tables) {
	for (var t = tables.length - 1; t >= 0; t--) {
	var rows = tables[t].rows;
	var thead = rows[0].cells;
	for (var i = 0; i <= thead.length - 1; i++) {
		thead[i].onmouseover = function() {
			this.style.backgroundColor = "#0066FF";
		}
		thead[i].onmouseout = function() {
			this.style.backgroundColor = "#0000CC";
			this.style.backgroundImage = "none";
		}         
			thead[i].onclick = (function(i, t) {

				return function() {
					var index = this.cellIndex;
					var myTable = this.parentNode.parentNode.parentNode;
					var myRows = new Array();
					for (var n = 0; n < myTable.tBodies[0].rows.length; n++) {
						myRows[n] = myTable.tBodies[0].rows[n];
					};

					if (check == 0) {
						this.style.backgroundImage = "url('ascend.png')";
						myRows.sort(
							function(a, b) {
								var value1 = a.cells[index].textContent;
	                    		var value2 = b.cells[index].textContent;
	                    		if (isNaN(value1)) return value1.localeCompare(value2);
	                   			else return value1 - value2;
							}
						);

						var nodes = this.parentNode.childNodes;
						for (var j = 0; j < nodes.length; j++)
							nodes[j].className = "";
						check = 1;

					} else {
	        			myRows.reverse();
	        			this.style.backgroundImage = "url('descend.png')";
	        		if (check == 0) check = 1;
	        		else check = 0
	        	}
				var fragment = document.createDocumentFragment();
	        	for (var k = 0; k < myRows.length; k++)
	            	fragment.appendChild(myRows[k]);
	        	myTable.tBodies[0].appendChild(fragment);
	        	Gray(myTable.tBodies[0].rows);
	        };
  			})(i, t);
}
}
}
//排序时，栏目奇偶行的背景色保持奇数白色、偶数浅灰色
function Gray(rows) {
	for (var g = 0; g < rows.length; g++) {
		rows[g].className = "";
		rows[g].style.backgroundColor = "none";
		if (g % 2 == 1) rows[g].style.backgroundColor = "#C8C8C8";
	};
}

