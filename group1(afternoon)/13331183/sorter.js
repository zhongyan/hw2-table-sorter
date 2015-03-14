window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
};

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}

function toggleClass(selectedElem, allElems) {
    for (var i = 0; i < allElems.length; ++i) {
        if (allElems[i] != selectedElem) {
            allElems[i].className = allElems[i].className.replace("ascend", "");
            allElems[i].className = allElems[i].className.replace("descend", "");
        }
    }
    if (selectedElem.className.match(/ascend/)) {
        selectedElem.className = selectedElem.className.replace("ascend", "descend");
    } else {
        selectedElem.className = selectedElem.className.replace("descend", "");
        selectedElem.className += " ascend";
    }
}

function makeTableSortable(table) {
    var ths = table.getElementsByTagName("th");
    var tbodys = table.getElementsByTagName("tbody");
    var trs = tbodys[0].getElementsByTagName("tr");
    for (var i = 0; i < ths.length; ++i) {
        (function(i) {
            ths[i].onclick = function() {
                toggleClass(ths[i], ths);
                if (ths[i].className.match(/ascend/)) {
                    sortTable("ascend", i, trs, tbodys[0]);
                } else {
                    sortTable("descend", i, trs, tbodys[0]);
                }
            };
        })(i);
    }
}

function sortTable(sortType, num_th, trs, tbody) {
    var temp_trs = [];
    for (var i = 0; i < trs.length; ++i) {
        temp_trs.push(trs[i]);
    }
    temp_trs.sort(function(left, right) {
        if (sortType == "ascend") {
            return left.getElementsByTagName("td")[num_th].childNodes[0].nodeValue > right.getElementsByTagName("td")[num_th].childNodes[0].nodeValue;
        } else {
            return left.getElementsByTagName("td")[num_th].childNodes[0].nodeValue < right.getElementsByTagName("td")[num_th].childNodes[0].nodeValue;
        }
    });
    for (var i = 0; i < temp_trs.length; ++i) {
        if (i % 2 == 0) {
            temp_trs[i].className = temp_trs[i].className.replace("alternate", "");
        }
        if (i % 2 != 0 && !temp_trs[i].className.match(/alternate/)) {
            temp_trs[i].className += " alternate";
        }
        tbody.appendChild(temp_trs[i]);
    }
}