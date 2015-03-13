function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    var theads = new Array(1), ths;
    function sort(table) {
        var ths = table.getElementsByTagName("th");
        var thid = -1;
        for (i = ths.length - 1; i >= 0 && thid == -1; --i)
            if (ths[i].className.match(RegExp('(\\s|^)sortByThis(\\s|$)'))) {
                thid = i;
                ths[i].className = ths[i].className.replace(RegExp('(\\s|^)sortByThis(\\s|$)'), "")
            }
        var dir = !!ths[thid].className.match(RegExp('(\\s|^)ascend(\\s|$)'))
        var tbody = table.getElementsByTagName("tbody");
        var trs = tbody[0].getElementsByTagName("tr");
        var tds = new Array(trs.length);
        var temp;
        for (i = trs.length - 1; i >= 0; --i)
            tds[i] = trs[i].getElementsByTagName("td");
        var flag = true;
        for (i = trs.length - 1; i >= 0 && flag; --i) {
            flag = false;
            for (j = 0; j < i; ++j)
                if (tds[j][thid].innerHTML > tds[j + 1][thid].innerHTML ^ dir) {
                    flag = true;
                    for (k in tds[j]) {
                        temp = tds[j][k].innerHTML;
                        tds[j][k].innerHTML = tds[j + 1][k].innerHTML;
                        tds[j + 1][k].innerHTML = temp;
                    }
                }
        }
        for (i = ths.length - 1; i >= 0; --i)
            ths[i].className = ths[i].className.replace(RegExp('(\\s|^)((ascend)|(descend))(\\s|$)', ""));
        if (dir)
            ths[thid].className += " descend";
        else
            ths[thid].className += " ascend";
    }
    for (index = tables.length - 1; index >= 0; --index) {
        theads = tables[index].getElementsByTagName("thead");
        ths = theads[0].getElementsByTagName("th");
        for (i = ths.length - 1; i >= 0; --i) {
            ths[i].onclick = function () {
                this.className += " sortByThis";
                sort(this.parentNode.parentNode.parentNode);
            }
        }
    }
}

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}