function getAllTables() {
    var tables = document.getElementsByTagName('table');
    return tables;
}

function sort_by_ascending(table, index) {    //ascend
    var tb = document.getElementById(table.id);
    var tds = document.getElementById(table.id).getElementsByTagName('td');
    for (var i = 0; i < tds.length; i += 3) {
        for (var j = 0; j < tds.length; j += 3) {
            if (tds[i + index].innerHTML < tds[j + index].innerHTML) {
                var temp = [tds[i].innerHTML, tds[i + 1].innerHTML, tds[i + 2].innerHTML];
                tds[i].innerHTML = tds[j].innerHTML;
                tds[i + 1].innerHTML = tds[j + 1].innerHTML;
                tds[i + 2].innerHTML = tds[j + 2].innerHTML;
                tds[j].innerHTML = temp[0];
                tds[j + 1].innerHTML = temp[1];
                tds[j + 2].innerHTML = temp[2];
            }
        }
    }
}

function sort_by_descending(table, index) {    //descend
    var tb = document.getElementById(table.id);
    var tds = document.getElementById(table.id).getElementsByTagName('td');
    for (var i = 0; i < tds.length; i += 3) {
        for (var j = 0; j < tds.length; j += 3) {
            if (tds[i + index].innerHTML > tds[j + index].innerHTML) {
                var temp = [tds[i].innerHTML, tds[i + 1].innerHTML, tds[i + 2].innerHTML];
                tds[i].innerHTML = tds[j].innerHTML;
                tds[i + 1].innerHTML = tds[j + 1].innerHTML;
                tds[i + 2].innerHTML = tds[j + 2].innerHTML;
                tds[j].innerHTML = temp[0];
                tds[j + 1].innerHTML = temp[1];
                tds[j + 2].innerHTML = temp[2];
            }
        }
    }
}

function makeAllTablesSortable(tables) {
    var ths = document.getElementsByTagName('th');
    var last_target = document.createElement('th');
    last_target.innerHTML = "x";

    for (var j = 0; j < ths.length; j++) {    //make tables sortable
        ths[j].onclick = function(e) {
            var target = e.srcElement ? e.srcElement : e.target;
            var index = target.cellIndex;
            var tb = target.parentNode.parentNode.parentNode;
            target.style.backgroundColor = '#6699FF';
            target.style.backgroundRepeat = 'no-repeat';
            target.style.backgroundPosition = '100%';

            if (last_target == target) {    //排序的栏目不变时
                if (target.className == 'a') {
                    target.classList.remove('a');
                    target.classList.add('d');
                    sort_by_descending(tb, index);
                    target.style.backgroundImage = 'url("descend.png")';
                } else {
                    target.classList.remove('d');
                    target.classList.add('a');
                    sort_by_ascending(tb, index);
                    target.style.backgroundImage = 'url("ascend.png")';
                }    
            } else {                        //排序的栏目变化时
                last_target.style.backgroundColor = '#000099';
                target.style.backgroundImage = 'url("ascend.png")';
                target.classList.add('a');
                if (last_target.innerHTML != 'x') {
                    if (target.className == 'a')
                        last_target.classList.remove('a');
                    else
                        last_target.classList.remove('d');
                }
                sort_by_ascending(tb, index);
                last_target = target;
            }
        }
    }
}

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}