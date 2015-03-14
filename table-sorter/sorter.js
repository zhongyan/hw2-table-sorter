window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables () {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable (tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}

function makeTableSortable (table) {
    var headings = table.getElementsByTagName("th");
    for (var i = 0; i < headings.length; ++i) {
        headings[i].onclick = sortByThisColumn;
    }
}

function sortByThisColumn () {
    var 
        list = this.classList
      , keyIndex
      , siblings = this.parentNode.getElementsByTagName("th")
    ;
    /*get keyIndex*/
    for (var i = 0; i < siblings.length; ++i)
        if (siblings[i].isSameNode(this))
            keyIndex = i;
    /*set class attribute*/
    if (list.contains("ascend") || list.contains("descend")) {
        /*already sorting this column*/
        list.toggle("ascend");
        list.toggle("descend");
    } else {
        /*remove siblings' class*/
        for (var i = 0; i < siblings.length; ++i)
            siblings[i].className = "";
        this.className = "ascend";
    }
    doSort(this, keyIndex);
}

function doSort(column, keyIndex) {
    var targetTable = column.parentNode;
    while (targetTable.tagName.toLowerCase() != "table")
        targetTable = targetTable.parentNode;
    var
        siblings = targetTable.getElementsByTagName("th")
      , targetTbody = targetTable.getElementsByTagName("tbody")[0]
      , rows = targetTbody.getElementsByTagName("tr")
      , lowerBound = 0
      , compare = getCompareFunction(column, keyIndex)
    ;
    /*sometimes the table doesn't have <thead> and the first row is its head*/
    if (targetTable.getElementsByTagName("thead").length == 0)
        lowerBound = 1;

    /*insertion sort*/
    for (var i = lowerBound + 1, j, temp; i < rows.length; ++i) {
        temp = rows[i];
        j = i;
        targetTbody.removeChild(rows[i]);
        while (j > lowerBound && compare(temp, rows[j - 1]))
            --j;
        if (j == rows.length)
            targetTbody.appendChild(temp);
        else
            targetTbody.insertBefore(temp, rows[j]);
    }

    /*set style*/
    rows = targetTbody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i += 2)
        rows[i].className = "";
    for (var i = 1; i < rows.length; i += 2)
        rows[i].className = "alternate";
}

function getCompareFunction (column, keyIndex) {
    if (column.classList.contains("ascend"))
        return function (a, b) {
            return a.getElementsByTagName("td")[keyIndex].textContent
                    < b.getElementsByTagName("td")[keyIndex].textContent;
        };
    else
        return function (a, b) {
            return a.getElementsByTagName("td")[keyIndex].textContent
                    > b.getElementsByTagName("td")[keyIndex].textContent;
        }
}
