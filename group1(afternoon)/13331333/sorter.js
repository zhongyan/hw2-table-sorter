function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        Sort(tables[i]);
    }
}

function Sort(table) {
    var th = table.getElementsByTagName('th');
    var tr = table.getElementsByTagName('tr');
    var trArr = new Array();
    for (var k = 1; k < tr.length; ++k) {
        trArr.push(tr[k]);
    }
    for (var i = 0; i < th.length; ++i) {
        th[i].onclick = function() {
            for (var j = 0; j < th.length; ++j) {
                th[j].style.backgroundColor = "rgb(0, 0, 128)";
            }
            this.style.backgroundColor = "rgb(164, 176, 252)";
            if (this.className == "" || this.className == "descend") {
                this.className = "ascend";
                var col = this.cellIndex;
                trArr.sort(function(a, b) {
                    return a.cells[col].textContent > b.cells[col].textContent;
                });
            } else {
                this.className = "descend";
                trArr.reverse();
            }
            var tb = table.getElementsByTagName('tbody')[0];
            /* tb.firstChild.nextSibling is the fisrt row of the table */
            for (var k = trArr.length-1; k >= 0; --k) {
                tb.insertBefore(trArr[k], tb.firstChild.nextSibling);
            }
        };
    }
}

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}