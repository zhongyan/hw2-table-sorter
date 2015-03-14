// traverse an Object(DOM elements set) and do something(cb)
Object.prototype.myEach = function(cb) {
    for (var i = 0; i < this.length; i++) {
        cb(this[i], i);
    }
}

// get all DOM tables in the document
var getAllTables = function() {
    return document.getElementsByTagName('table');
}

// the main module, provided the function 'makeAllTablesSortable'
var makeAllTablesSortable = (function() {
    // ps: 'rows' means the array table while 'trs' means the DOM table

    // sort an array table according to the given index
    var sortArrayTable = function(rows, index, asc) {
        rows.sort(function(rowa, rowb) {
            if (asc) {
                // return rowa[index] >= rowb[index];
                return rowa[index].localeCompare(rowb[index]);
            } else {
                // return rowa[index] <= rowb[index];
                return rowb[index].localeCompare(rowa[index]);
            }
        });
    }
    
    // set a DOM table with the given array table
    var setDOMTable = function(trs, rows) {
        for (var i = 0; i < trs.length; i++) {
            var tr = trs[i];
            var tds = tr.getElementsByTagName('td');
            var row = rows[i];
            for (var j = 0; j < tds.length; j++) {
                var td = tds[j];
                var col = row[j];
                td.innerHTML = col;
            }
        }
    }
    
    // read a DOM table returning an array table
    var readDOMTable = function(trs) {
        var rows = [];
        trs.myEach(function(tr) {
            var row = [];
            var tds = tr.getElementsByTagName('td');
            tds.myEach(function(td) {
                var value = td.innerHTML;
                row.push(value);
            });
            rows.push(row);
        });
        return rows;
    }
    
    // sort a DOM table with the given index
    var sortDOMTable = function(table, index, asc) {
        var _trs = table.getElementsByTagName('tr');
        var trs = [];
        // skip the header
        for (var i = 1; i < _trs.length; i++) {
            trs.push(_trs[i])
        }
        var rows = readDOMTable(trs);
        sortArrayTable(rows, index, asc);
        setDOMTable(trs, rows);
    }

    // the entrance function
    var makeAllTablesSortable = function (tables) {
        tables.myEach(function(table) {
            var header = table.getElementsByTagName('tr')[0];
            var ths = header.getElementsByTagName('th');
            // init the sorter
            ths.myEach(function(th) {
                th.setAttribute('asc', 'null');
            });
            // handle click event
            header.onclick = function(e) {
                var table = this.parentNode;
                if (table.tagName != 'TABLE') {
                    table = table.parentNode;
                }
                var ths = this.getElementsByTagName('th');
                var target = e.target;
                // the index of the clicked header cell
                var index = target.cellIndex;
                // set the header
                ths.myEach(function(th, i) {
                    if (i == index) {
                        if (th.getAttribute('asc') == 'null') {
                            th.setAttribute('asc', 'true');
                        } else {
                            var asc = th.getAttribute('asc') == 'true';
                            asc = !asc;
                            th.setAttribute('asc', asc.toString());
                        }
                    } else {
                        th.setAttribute('asc', 'null');
                    }
                });

                sortDOMTable(table, index, target.getAttribute('asc') == 'true');
            }
        });
    }
    
    return makeAllTablesSortable;
})();

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
