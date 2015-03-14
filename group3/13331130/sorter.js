window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

//获取所有表格
function getAllTables() {
    return document.getElementsByTagName("table");
}

var isAsc = true; //判断是否是升序
function makeAllTablesSortable(tables) { //冒泡排序
    for (var i = 0; i < tables.length; i++) {
        var headCells = tables[i].getElementsByTagName("th");
        for (var j = 0; j < headCells.length; j++) {
            headCells[j].addEventListener("click", sortTable);
            addImg(headCells[j]);
        }  
    }
}

function sortTable() {
    var newRows = [], rows = []; 
    var colIndex = this.cellIndex;
    var temp = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
    
    for (var i = 1; i < temp.length; i++) //除去表格第一行，即表头
        rows[i - 1] = temp[i];
    
    setImgStyle(this);

    for (var i = 0; i < rows.length; i++) {  //将表格内容存入二维数组
        newRows[i] = [];
        for (var j = 0; j < rows[i].cells.length; j++)
            newRows[i][j] = rows[i].cells[j].innerHTML;
    }

    newRows.sort(function (rowA, rowB) { //设置排序方法
        if (isNaN(rowA[colIndex]))
            return rowA[colIndex] > rowB[colIndex];
        else
            return parseInt(rowA[colIndex]) > parseInt(rowB[colIndex]); //针对数值数据
    })

    if (isAsc) {
        isAsc = false;
    } else {
        isAsc = true;
        newRows.reverse();
    }

    for (var i = 0; i < rows.length; i++) //更新DOM中表格内容
        rows[i].innerHTML = "<td>" + newRows[i].join("</td><td>") + "</td>"
}

function addImg(elem) { //添加箭头图片
	var asc = document.createElement("img");
	var desc = document.createElement("img");
	asc.src = "img/ascend.png";
	desc.src = "img/descend.png";
	elem.appendChild(asc);
	elem.appendChild(desc);
}

function setImgStyle(elem) { //设置图片是否显示
	var headCellsImgs = elem.parentNode.getElementsByTagName("img"); //表格中的所有图片
	var imgs = elem.getElementsByTagName("img"); //当前点击的表格中的图片

	for (var i = 0; i < headCellsImgs.length; i++)
		headCellsImgs[i].className = "";

	if (isAsc)
		imgs[0].className = "see";
	else
		imgs[1].className = "see";
}
