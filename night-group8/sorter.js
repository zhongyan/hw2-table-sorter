function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    label = new Array;
	for(var i = 0; i < tables.length; i++) {
		this_table = tables[i];
        label[i] = this_table.getElementsByTagName("th");
		for(var j = 0; j < label[i].length; j++) {
            label[i][j].isclick = false;
			label[i][j].sorted = true;
            label[i][j].table_id = i;
            label[i][j].col = j;
            label[i][j].onclick = sort;
            label[i][j].onmouseover = function() {
                this.style.backgroundColor = "rgb(164, 176, 252)";
            }
            label[i][j].onmouseout = function() {     
                if(!label[this.table_id][this.col].isclick) {
                    this.style.backgroundColor = "rgb(0, 0, 128)";
                }
            }
		}
	}
}

function sort() {
    for(var i = 0; i < label[this.table_id].length; i++) {
        label[this.table_id][i].isclick = false;
    }
    label[this.table_id][this.col].isclick = true;
	tables = getAllTables();
    var imgArr = ["ascend.png", "descend.png"];
    table_body = tables[this.table_id].getElementsByTagName("tbody");
    value_of_this_row = table_body[0].getElementsByTagName("tr");
    label[this.table_id][this.col].sorted = !label[this.table_id][this.col].sorted;
    for(var i = 0; i < label[this.table_id].length; i++) {
        tables[this.table_id].getElementsByTagName("th")[i].style.backgroundColor = "rgb(0, 0, 128)";
    }
    tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundColor = "rgb(164, 176, 252)";
    
    if(!label[this.table_id][this.col].sorted) {
        tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundImage = "url(" + imgArr[0] + ")";
    } else {
        tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundImage = "url(" + imgArr[1] + ")";
    }
    bubble_sort(this.table_id, this.col, value_of_this_row);
}

function bubble_sort(Table_Id, Col, Value) {
	list = new Array;
    for(var i = 0; i < Value.length; i++) {
        list[i] = Value[i].getElementsByTagName("td")[Col];
    }
    for(var i = 0; i < list.length; i++) {
    	for(var j = i + 1; j < list.length; j++) {
    		if(!label[Table_Id][Col].sorted) {
    		    if(list[i].innerHTML > list[j].innerHTML) {
                    var middle = list[i];
                    list[i] = list[j];
                    list[j] = middle;
                    middle = Value[i].innerHTML;
                    Value[i].innerHTML = Value[j].innerHTML;
                    Value[j].innerHTML = middle;
                }
    		} else {
    			if(list[i].innerHTML < list[j].innerHTML) {
                    var middle = list[i];
                    list[i] = list[j];
                    list[j] = middle;
                    middle = Value[i].innerHTML;
                    Value[i].innerHTML = Value[j].innerHTML;
                    Value[j].innerHTML = middle;
                }
    		}
    	}
    }
}

window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
