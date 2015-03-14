window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);                         //two important functions!
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");   //to caputrue all tables in web pages!
	return tables;
}
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {              //to set different rows with different color!
        for (var j = 0; j < (tables[i].childNodes[3].childNodes.length - 1)/2; j++) {
            if (j%2 == 1) tables[i].childNodes[3].childNodes[2*j + 1].style.backgroundColor = "LightGray";
        }
    }
    var thead = document.getElementsByTagName("th");
    for (var i = 0; i < thead.length; i++) {               //to bind thead elements with two event handlers: onmouseover and onmouseout!
    	thead[i].onmouseover = mouse_on;
    	thead[i].onmouseout=mouse_out;
    }
}
function mouse_out() {                                     //mouseout: change background color!
    this.style.backgroundColor = "DarkBlue";               //also remove the child element img!
    if (this.childNodes.length > 1) this.removeChild(this.lastChild);
}
function mouse_on() {                                      //mouseout: change background color!
    this.style.backgroundColor = "LightBlue";
    var p = this.parentNode.childNodes;
    var parentTable = this.parentNode.parentNode.parentNode;
    var i;
    for (i = 0; i < p.length; i++) {                       //to find which column was on!
        if (p[i] == this) break;
    }
    var column = (i + 1)/2;
    this.onclick = function() {                            //add click event to thead to trigger sort!
        if (this.childNodes.length == 1) {                 //if never click it, add the img!
            var pic = document.createElement("img");
            pic.setAttribute("src", "ascend.png");
            this.appendChild(pic);
            sort_table(parentTable, column, 0);            //sort in ascend way!
        } else {
            if (this.lastChild.getAttribute("src") == "ascend.png") {
                this.lastChild.setAttribute("src", "descend.png");
                sort_table(parentTable, column, 1);        //if click in second or third time....., change the image icon!
            } else {                                       //and sort the table in different ways!
                this.lastChild.setAttribute("src", "ascend.png");
                sort_table(parentTable, column, 0);
            }
        }
    }
}
function sort_table(parentTable, column, mode) {           //parentTable is the table node! column is the Column to sort by;mode stands for ascend or descend! 
    var array = [];
    var rows = parentTable.childNodes[3].childNodes;
    var rows_num = (rows.length - 1)/2;                    //the num of row.
    var cells_num = (rows[1].childNodes.length - 1)/2;     //the num of column.
    for (var i = 0; i < rows_num; i++) {
        var array_b = [];
        for (var j = 0; j < cells_num; j++) {
            array_b.push(rows[2*i + 1].childNodes[2*j + 1].innerHTML.toString());
        }
        array.push(array_b);                               //push all datas into an array whose element is a tuple(array)!
    }
    if (mode == 0) array.sort(function(a, b) { return a[column - 1] > b[column - 1];});
    else array.sort(function(a, b) { return a[column - 1] < b[column - 1];});
    for (var i = 0; i < rows_num; i++) {                   //sort according to the referred column with two modes!
        for (var j = 0; j < cells_num; j++) {
            rows[2*i + 1].childNodes[2*j + 1].innerHTML = array[i][j];
        }                                                  //return data to each row!
    }                                                      //the end!
}
