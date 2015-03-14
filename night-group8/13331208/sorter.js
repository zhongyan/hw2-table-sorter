window.onload = function() {
	var tables = getAllTables();
	makeALLTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function tableSorter(table) {
	this.table = table;
	this.mode = "descend";
	this.getTitles = function() {
		return this.table.rows[0].cells;
	}
 	this.setClickedEvent = function() {
 		var titles = this.getTitles();
 		var curSorter = this;
		for (var i = 0; i < titles.length; i++) {
			titles[i].addEventListener("click", function() {
				if (this.className == "") {
					curSorter.mode = "descend";
				}
				this.className = curSorter.getClickedPatern();
				var curIndex = curSorter.getIndexByTitle(this.innerHTML);
				if (curIndex != -1) {
					curSorter.sortByCol(curIndex);
				}
			});
		}
	}
	this.getClickedPatern = function() {
		this.clearALLPattern();
		if (this.mode == "descend") {
			this.mode = "ascend";
		} else {
			this.mode = "descend";
		}
		return this.mode;
	}
	this.clearALLPattern = function() {
		var titles = document.getElementsByTagName("th");
		for (var i = 0; i < titles.length; i++) {
			titles[i].className = "";
		}
	}
	this.getIndexByTitle = function(indexByTitle) {
		var titles = this.getTitles();
		var index = -1;
		for (var i = 0; i < titles.length; i++) {
			if (indexByTitle == titles[i].innerHTML) {
				index = i;
				return index;
			}
		}
	}
	this.sortByCol = function(index, cur) {
		var rowsArray = [];
		var k = 0;
		if (this.table.tBodies[0].rows[0].innerHTML == this.table.rows[0].innerHTML)
			k = 1;
		for (var i = k; i < this.table.tBodies[0].rows.length; i++) {
			rowsArray.push(this.table.tBodies[0].rows[i]);
		}
		var curMode = this.mode;
		rowsArray.sort(function(tr1, tr2) {
	        var a = tr1.cells[index].textContent.replace(/\W/g, "");
	        var b = tr2.cells[index].textContent.replace(/\W/g, "");
	        return (curMode == "ascend" ? a>b : a<b);
	    });
	    for (var i = 0; i < rowsArray.length; i++) {
	        this.table.tBodies[0].appendChild(rowsArray[i]);
	    }
	}
}

function makeALLTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		sortable = new tableSorter(tables[i]);
		sortable.setClickedEvent();
	}
}
