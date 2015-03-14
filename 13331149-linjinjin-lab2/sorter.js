window.onload = function() {
	makeAllTablesSortable();
}

function makeAllTablesSortable() {
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		//table = tables[i];
		for (var j = 1; j < tables[i].rows.length; j++) {
			//改变偶数行颜色
			if (j%2 == 0) {
				tables[i].rows[j].style.backgroundColor = "#BDBDBD"; 
			}
		}
		cols = tables[i].rows[0].cells.length;
		for (var j = 0; j < cols; j++) {
			th = tables[i].rows[0].cells[j];
			var para = document.createElement("span");
			th.appendChild(para);
			th.onclick = function() {
				table = this.parentNode.parentNode.parentNode;
				var datas = new Array;
				var rows = table.tBodies[0].rows;
				var iCol = this.cellIndex;
				for (var i = 0; i < rows.length; i++) {
					datas[i] = rows[i];
				}
				if (table.sortCol == iCol) {
					datas.reverse();
				} else {
				 	datas.sort(function(a, b) {
				 		return a.cells[iCol].innerHTML > b.cells[iCol].innerHTML;
				 	});
				}
				if (this.lastChild.className == "ascend-icon")
						this.lastChild.className = "descend-icon";
					else
						this.lastChild.className = "ascend-icon"; 
				var oFragment = document.createDocumentFragment();
				for (var k = 0; k < datas.length; k++) {
					datas[k].style.backgroundColor = "white";
					oFragment.appendChild(datas[k]);
				}
				table.tBodies[0].appendChild(oFragment);
				table.sortCol = iCol;
				for (var i = 0; i < rows.length; i++) {
					if (i%2 == 1) {
						rows[i].style.backgroundColor = "#BDBDBD"; 
					}
				}
			};
			th.onmouseover = function() {
				this.style.backgroundColor = "#CBEAEC";
				this.style.cursor = "pointer";
				this.childNodes[1].className = "ascend-icon";
			};
			th.onmouseout = function() {
				this.style.backgroundColor = "#120562";
			}
		}
	}
}
