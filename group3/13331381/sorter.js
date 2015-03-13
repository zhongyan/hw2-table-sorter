/*
 * make all tables sortable
 */

// call function
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

// get table elements from the web
function getAllTables() {
    return document.getElementsByTagName("table");
}

// make the tables sortable
function makeAllTablesSortable(tables) {
    // make a table sortable
    function makeTableSortable(table) {
        // render table head
        function renderHead(table, obj) {
            var theads = table.getElementsByTagName("th");
            for (var i = 0; i < theads.length; i++) {
                if (theads[i] != obj) {
                    theads[i].style.backgroundColor = "#000080";
                }
            }
            if (obj.className == "" || obj.className == "descend") {
                obj.style.background = "#a4b0fd url(ascend.png) no-repeat right";
            } else if (obj.className == "ascend") {
                obj.style.background = "#a4b0fd url(descend.png) no-repeat right";
            }
        }

        // sort table by given the table, thead, and column
        function sortTable(table, obj, index) {
            // exchange first's and second's html
            function exchangeInnerHtml(first, second) {
                var temp = first.innerHTML;
                first.innerHTML = second.innerHTML;
                second.innerHTML = temp;
            }

            // determine if row a and row b should exchange 
            function shouldExchange(a, b, ascend) {
                if (ascend) {
                    return a.innerHTML < b.innerHTML;
                } else {
                    return a.innerHTML > b.innerHTML;
                }
            }

            var rows = table.rows;
            var ascend = (obj.className == "" || obj.className == "descend");     // alert(ascend);
            if (obj.className == "ascend") ascend = false;

            // sort algorithm
            for (var i = 1; i < rows.length - 1; i++) {
                for (var j = i + 1; j < rows.length; j++) {
                    if ( shouldExchange(rows[j].cells[index], rows[i].cells[index], ascend) ) {
                        exchangeInnerHtml(rows[j], rows[i]);
                    }
                }
            }
        }

        // change className
        function changeClassName(obj) {
            if (obj.className == "") {
                obj.className = "ascend";
            } else if (obj.className == "ascend") {
                obj.className = "descend";
            } else if (obj.className == "descend") {
                obj.className = "ascend";
            }
        }

        var theads = table.getElementsByTagName("th");
        for (var i = 0; i < theads.length; i++) {
            theads[i].onclick = function (a, b, c) {
                return function () {
                    sortTable(a, b, c);
                    renderHead(a, b);
                    changeClassName(b);
                }
            }(table, theads[i], i);
        }
    }

    var length = tables.length;
    for (var i = 0; i < length; i++) {
        makeTableSortable(tables[i]);
    }
}


