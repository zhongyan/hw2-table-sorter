/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2015-03-13 21:39:01
*/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}

var shortedth = new Array();
/* shortedth[i][j] 代表了第i个table下第j个thead(或tbody)的排序情况
 * = 0  表示未进行排序
 * = +n 表示根据第n栏进行顺序排序
 * = -n 则是根据第n栏进行逆序排序
 */

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        shortedth[i] = new Array();

        // oThead表示所有的thead
        var oThead = tables[i].getElementsByTagName('thead');

        // 有thead则根据thead排序，没有则根据tbody进行排序
        if (oThead.length == 0) oThead = tables[i].getElementsByTagName("tbody");
        for (var j = 0; j < oThead.length; j++) {  // 则对thead进行遍历
            shortedth[i][j] = 0;

            // 对thead下的所有th或者td进行事件绑定,默认thead或者tbody之下不是th就是td
            var oTh = oThead[j].getElementsByTagName('th');
            if (oTh.length == 0) oTh = oThead[j].getElementsByTagName('td');
            for (var k = 0; k < oTh.length; k++) {
                oTh[k].addEventListener('click', toShort);
                oTh[k].i = i; oTh[k].j = j; oTh[k].k = k;
            }
        }
    }
}

function toShort(event) {
    /* 适用以下结构
     * thead->tr->th  tbody->tr->td
     * tbody->tr->th  tbody->tr->td
     * tbody->tr->td  tbody->tr->td  // 比如王老师的eden..
     *
     */
    var tables = getAllTables();
    var theTbody = tables[this.i].tBodies[this.j];
    var oTr = theTbody.rows;
    var nothead = false;

    var theThead;
    if (tables[this.i].getElementsByTagName('thead').length == 0) {
        theThead = tables[this.i].getElementsByTagName('tbody')[this.j];
        nothead = true;
    } else {
        theThead = tables[this.i].getElementsByTagName('thead')[this.j]
    }

    // 排序核心代码
    var tempTr = new Array();
    for(var i = 0; i + nothead < oTr.length; i++) // 没有thead则从第二行开始排序
        tempTr[i] = oTr[i + nothead];
    if (Math.abs(shortedth[this.i][this.j]) == Math.abs(this.k) + 1)
        tempTr.reverse();       // 如果是已排序的则只要翻转一次就好
    else
        tempTr.sort(getcmp(this.k)); // 如果不是则调用sort函数并传入比较函数进行排序

    // 对tbody进行更新
    var newTr = document.createDocumentFragment();
    if (nothead) newTr.appendChild(oTr[0]);
    for(var i = 0; i < tempTr.length; i++)
        newTr.appendChild(tempTr[i]);
    theTbody.appendChild(newTr);

    // 更新tr背景色和th
    var firsttr = nothead ? 1 : 0; // tr背景色变化
    for (var j = firsttr; j < oTr.length; j++) {
        if ((j+firsttr) % 2) oTr[j].style.backgroundColor = "#FFE4E1";
        else oTr[j].style.backgroundColor = "white";
    }

    var oTh = theThead.getElementsByTagName('th');
    if (oTh.length == 0)
        oTh = theThead.getElementsByTagName('tr')[0].getElementsByTagName('td');

    if (shortedth[this.i][this.j] != 0) // 对本列中进行过排序的th进行初始化
        oTh[Math.abs(shortedth[this.i][this.j])-1].className = "";

    if (shortedth[this.i][this.j] == this.k + 1) {
        this.className = "down";
        shortedth[this.i][this.j] = -this.k - 1;
    } else {
        this.className = "up";
        shortedth[this.i][this.j] = this.k + 1;
    }
}

function getcmp(k) { // 比较函数
    return function cmp(tr1, tr2) {
        var val1, val2;
        val1 = tr1.cells[k].textContent; // 取元素的文本内容
        val2 = tr2.cells[k].textContent;
        if (!isNaN(Number(val1))) { // 对数字进行排序，从而不会出现10出现在2前面的问题
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else return 0;
    }
}

/*var tables = getAllTables();
makeAllTablesSortable(tables);*/