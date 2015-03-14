window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++)
		tables[i].className += "table" + i;
	return tables;
}

function makeAllTableSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		tHead = tables[i].getElementsByTagName("th");
		for (var j = 0; j < tHead.length; j++) {
			tHead[j].className = j;
			tHead[j].innerHTML += "<img src='./descend.png' alt='as' class='descend'><img src='./ascend.png' alt='as' class='ascend'>";
			tHead[j].onclick = function() {
				if (this.id != "ascend"){
					this.id = "ascend";
				} else {
					this.id = "descend";
				}
				sortTable(this.parentNode.parentNode.parentNode.className, parseInt(this.className));
			}
			tHead[j].onmouseover = function() {
				this.style.backgroundColor = "#CCDDFF";
				if (this.id == "ascend") {
					this.getElementsByClassName("descend")[0].style.display="inherit";
					this.getElementsByClassName("ascend")[0].style.display="none";
				}
				else {
					this.getElementsByClassName("ascend")[0].style.display="inherit";
					this.getElementsByClassName("descend")[0].style.display="none";
				}
			}
			tHead[j].onmouseout = function() {
				this.style.backgroundColor = "#000088";
			}
		}
	}
}



 //用于sort比较字符串
 function compareCols(col) {
	  return function compareTrs(tr1, tr2) {
	   value1 = tr1.cells[col].innerHTML;
	   value2 = tr2.cells[col].innerHTML;
	   if (value1 < value2) {
	    return -1;
	   } else if (value1 > value2) {
	    return 1;
	   } else {
	    return 0;
	   }
	  };
 }
 //对表格进行排序
function sortTable(tablecn, col) {
	var table = document.getElementsByClassName(tablecn);
	var tbody = table[0].tBodies[0];
	var tr = tbody.rows; 
	var trValue = new Array();
	for (var i=0; i<tr.length; i++ ) {
		trValue[i] = tr[i];  //将表格中各行的信息存储在新建的数组中
	}
	if (tbody.sortCol == col) {
		trValue.reverse(); //如果该列已经进行排序过了，则直接对其反序排列
	} else {
		trValue.sort(compareCols(col));
	}
	var fragment = document.createDocumentFragment();  //新建一个代码片段，用于保存排序后的结果
	for (var i=0; i<trValue.length; i++ ) {
		fragment.appendChild(trValue[i]); //有问题???????????????
	}
	tbody.appendChild(fragment);
	tbody.sortCol = col;
 }