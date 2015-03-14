window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeAllTablesSortable(tables) {
    var shortedth = new Array();
    
    function toShort(event) {
        // 找到调用的th的i, j, k编号
        var tables = getAllTables();
        var mTable = this.parentNode.parentNode.parentNode;
        var mThead = this.parentNode.parentNode;
        var mTh = this;
        for (var i = 0; i < tables.length && tables[i].innerHTML != mTable.innerHTML; i++);
        var oThead = tables[i].getElementsByTagName('thead');
        for (var j = 0; j < oThead.length && oThead[j].innerHTML != mThead.innerHTML; j++);
        var oTbody = tables[i].tBodies[j];
        var oTh = oThead[j].getElementsByTagName('th');
        for (var k = 0; k < oTh.length && oTh[k].innerHTML != mTh.innerHTML; k++);

        // 排序并更新tbody
        var oTr = oTbody.rows;
        var retr = new Array();
        for(var ii = 0; ii < oTr.length; ii++)
            retr[ii] = oTr[ii];
        if (shortedth[i][j] == k+1 || shortedth[i][j] == -k-1) {
            retr.reverse();
        } else {
            retr.sort(getcmp(k)); // 调用sort函数并传入比较函数进行排序
        }
        var reFrag = document.createDocumentFragment();
        for(var ii = 0; ii < retr.length; ii++)
            reFrag.appendChild(retr[ii]);
        oTbody.appendChild(reFrag);

        // 更新tr背景色和th
        var ooTr = oTbody.getElementsByTagName('tr');
        for (var j2 = 0; j2 < ooTr.length; j2++) {
            if (j2 % 2) ooTr[j2].style.backgroundColor = "#E0E0E0";
            else ooTr[j2].style.backgroundColor = "white";
        }

        for (var i2 = 0; i2 < oTh.length; i2++) {
            oTh[i2].style.backgroundColor = "#000088";
            oTh[i2].style.backgroundImage = 'none';
        }  

        if (shortedth[i][j] == k+1) { // 点击的列表已是升序时不同处理
            this.style.backgroundImage = 'url("descend.png")';
            this.style.backgroundRepeat = 'no-repeat';
            this.style.backgroundPosition = 'right';
            this.style.cursor = 'pointer';
            shortedth[i][j] = -k-1;
        } else {
            this.style.backgroundImage = 'url("ascend.png")';
            this.style.backgroundRepeat = 'no-repeat';
            this.style.backgroundPosition = 'right';
            this.style.cursor = 'pointer';
            shortedth[i][j] = k+1;
        }
        this.style.backgroundColor = "#B0C4DE";
    }

    function getcmp(k) { // 比较函数
        return function cmp(tr1, tr2) {
            var val1, val2;
            val1 = tr1.cells[k].textContent; // 取元素的文本内容
            val2 = tr2.cells[k].textContent;
            if (val1 < val2) return -1;
            else if (val1 > val2) return 1;
            else return 0;
        }
    }

    for (var i = 0; i < tables.length; i++) {
        shortedth[i] = new Array();
        var Thead = tables[i].getElementsByTagName('thead');
        for (var j = 0; j < Thead.length; j++) {
            shortedth[i][j] = 0;
            var Th = Thead[j].getElementsByTagName('th');
            for (var k = 0; k < Th.length; k++)
                Th[k].addEventListener('click', toShort);
        }
    }
}

