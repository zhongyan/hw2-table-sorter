window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}

function makeTableSortable(table) {
    var heads = table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].cells;
    for (var i = 0; i < heads.length; ++i) {
        makeHeadSortable(heads[i], i, table, heads);
    }
}

function makeHeadSortable(head, index, table, heads) {
    head.onclick = function() {
        if (head.className == "")
            sortByIndex(table, index, true);
        else
            sortByIndex(table, index, false);
        changeHeadStyle(head, heads);
    }
}

function changeHeadStyle(head, heads) {
    if (head.className == "") {
        for (var i = 0; i < heads.length; ++i) {
            heads[i].className = "";
        }
        head.className += "increase";
    } else {
        head.className = "";
        head.className += "decrease";
    }
}

function sortByIndex(table, index, ascend) {
    var col;
    var items = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    if (ascend == true) {
        sortAscend(items, index);
    } else {
        sortDescend(items, index);
    }
}

function sortDescend(items, index) {
    for (var i = 0; i < items.length-1; ++i) {
        for (var j = 0; j < items.length-i-1; ++j) {
            if (items[j].cells[index].innerHTML < items[j+1].cells[index].innerHTML) {
                swap(items[j], items[j+1]);
            }
        }
    }
}

function sortAscend(items, index) {
    for (var i = 0; i < items.length-1; ++i) {
        for (var j = 0; j < items.length-i-1; ++j) {
            if (items[j].cells[index].innerHTML > items[j+1].cells[index].innerHTML) {
                swap(items[j], items[j+1]);
            }
        }
    }
}


function swap(item1, item2) {
    for (var i = 0; i < item2.cells.length; ++i) {
        var temp = item1.cells[i].innerHTML;
        item1.cells[i].innerHTML = item2.cells[i].innerHTML;
        item2.cells[i].innerHTML = temp;
    }
}