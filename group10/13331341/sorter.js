//Table Sorter, making all tables sortable

//Get all the tables in the html file
function getAllTables() {
    return document.getElementsByTagName('table');
}

//change the background of the table
function changeBackground(table, col) {
    var tth = table.getElementsByTagName('th');
    for (var i = 0; i < tth.length; i++) {
        if (i != col) {
            tth[i].className ='';
        } else {
            if (tth[i].className == '') {
                tth[i].className = 'ascend';
            } else if (tth[i].className == 'ascend') {
                tth[i].className = 'descend';
            } else {
                tth[i].className = 'ascend';
            }
        }
    }
    var trows = table.tBodies[0].rows;
    for (var i = 0; i < trows.length; i++) {
        if (i % 2 != 0) {
            trows[i].className = 'alternate';
        } else {
            trows[i].className = '';
        }
    }
}

//sort all the tables
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var tbody = tables[i].tBodies[0];
        var trows = tbody.rows;
        var temp = new Array();
        for (var j = 0; j < trows.length; j++) {
            temp[j] = trows[j];
        }
        var tth = tables[i].getElementsByTagName('th');
        for (var j = 0; j < tth.length; j++) {
            tth[j].onclick = function(tbody, temp, i, j) {
                return function() {
                    if (tbody.sortCol == j) {
                        temp.reverse();// if it's not the first time to sort j col of the table
                    } else {
                        temp.sort(function(tr1, tr2) {
                            var value1 = tr1.cells[j].innerHTML;
                            var value2 = tr2.cells[j].innerHTML;
                            return value1.localeCompare(value2);
                        });// for the first time ,sort the table
                    }  
                    var newfrag = document.createDocumentFragment();//add new fragment
                    for (var k = 0; k < temp.length; k++ ) {
                        newfrag.appendChild(temp[k]);
                    }
                    tbody.appendChild(newfrag);
                    tbody.sortCol = j;
                    changeBackground(tables[i], j);
                };
            }(tbody, temp, i, j);
        }
    }
}

window.onload =function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
