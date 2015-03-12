window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
    var alltables = document.getElementsByTagName("table");
    return alltables
}

function makeAllTablesSortable(tables) {
    for (var t_ = 0; t_ < tables.length; t_++) {
        var ths_ = tables[t_].getElementsByTagName("th");
        for (var h_ = 0; h_ < ths_.length; h_++) {
            (function() {
            	var t = t_;
            	var h = h_;
            	var ths = ths_;
            	ths[h].onclick = function() {
            		console.log(ths[0]);
                   var alist = [];
                   var tbody = tables[t].getElementsByTagName("tbody")[0];
                   var trs = tbody.getElementsByTagName("tr");
                   for (var i = 0; i < ths.length; i++) {
                       alist[i] = [];
                       for (var r = 0; r < trs.length; r++) {
                           var tds = trs[r].getElementsByTagName("td");
                           alist[i].push(tds[i]);
                       }
                   }
                   if (check(ths[h]) == 1) {
                       descendsort(alist, h);
                       addClass(ths[h], 'descend');
                   } else {
                   	   ascendsort(alist, h);
                   	   addClass(ths[h], 'ascend');
                   }
            	}
            })();
        }
    }
}

function addClass(ele, val) {
	clearAll();
	if (!hasClass(ele, val))
		ele.className = ele.className+" "+val;
}

function removeClass(ele, val) {
	if (hasClass(ele, val)) {
		var reg = new RegExp('(\\s|^)'+val+'(\\s|$)');
       	ele.className = ele.className.replace(reg, '');
	}
}

function hasClass(ele, val) {
	if (ele.className && ele.className.match(new RegExp('(\\s|^)'+val+'(\\s|$)')))
		return true;
	else
		return false;
}

function check(ele) {
	if (hasClass(ele, "ascend")) return 1;
	else if (hasClass(ele, "descend")) return 0;
	else return 0;
}

function clearAll() {
	var ths = document.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
		removeClass(ths[i], "descend");
		removeClass(ths[i], "ascend");
	}
}

function ascendsort(ele, n) {
	clearAll();
	for (var i = 0; i < ele[n].length; i++) {
		console.log(ele.length);
        for (var j = ele[n].length-1; j > i; j--) {
            if (ele[n][j].innerHTML < ele[n][j-1].innerHTML) {
                for (var m = 0; m < ele.length; m++) {
					swap(ele[m][j], ele[m][j-1]);
				}
            }
        }
	}
}

function descendsort(ele, n) {
	clearAll();
	for (var i = 0; i < ele[n].length; i++) {
		console.log(ele.length);
        for (var j = ele[n].length-1; j > i; j--) {
            if (ele[n][j].innerHTML > ele[n][j-1].innerHTML) {
                for (var m = 0; m < ele.length; m++) {
					swap(ele[m][j], ele[m][j-1]);
				}
            }
        }
	}
}

function swap(ele1, ele2) {
	var temp = ele1.innerHTML;
	ele1.innerHTML = ele2.innerHTML;
	ele2.innerHTML = temp;
}