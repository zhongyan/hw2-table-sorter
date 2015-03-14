//声明一个二维数组来记录每个表格的每个head的点击次数
var click_time = [];

//获取表格对象，设置表格偶数行的背景颜色
var getAllTables = function() {
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++){
        click_time[i] = new Array();
        row_color_change(tables[i]);
    }
    return tables;
}

//设置表格偶数行背景颜色
function row_color_change(table) {
    var t_head = table.getElementsByTagName("th");
    var t_detail = table.getElementsByTagName("td");
    for (var i = 0; i < t_detail.length; i++) {
        if (Math.floor(i/t_head.length)%2 == 1)
            t_detail[i].style.backgroundColor = "rgb(221,221,221)";
    }
}

function is_sorted(table, i_head) {
    var t_head = table.getElementsByTagName("th");
    var t_detail = table.getElementsByTagName("td");
    var data = new Array();
    for (var j = 0; j < t_detail.length/t_head.length; j++)
        data[j] = new Array();
    var s = 0;
    for (var j = 0; j < t_detail.length/t_head.length; j++) {
        for (var k = 0; k < t_head.length; k++) {
            data[j][k] = t_detail[s].innerHTML;
            s++;
        }
    }
    //判断是否为降序
    for (var i = 0; i < t_detail.length/t_head.length-1; i++) {
        if (data[i+1][i_head] > data[i][i_head])
            break;
        if (i == t_detail.length/t_head.length-2 && data[i+1][i_head] <= data[i][i_head])
            return "descending";
    }
    //判断是否为升序
    for (var i = 0; i < t_detail.length/t_head.length-1; i++) {
        if (data[i+1][i_head] < data[i][i_head])
            break;
        if (i == t_detail.length/t_head.length-2 && data[i+1][i_head] >= data[i][i_head])
            return "ascending";
    }
    return "unsorted";
}

function makeTableSortable(table_i, num) {
	var t_head = table_i.getElementsByTagName("th");
	var t_detail = table_i.getElementsByTagName("td");
	//1.储存信息
    var head_data = new Array();
    for (var j = 0; j < t_head.length; j++)
        head_data[j] = t_head[j].innerHTML;
	var data = new Array();
	for (var j = 0; j < t_detail.length/t_head.length; j++)
		data[j] = new Array();
	var s = 0;
	for (var j = 0; j < t_detail.length/t_head.length; j++) {
		for (var k = 0; k < t_head.length; k++) {
			data[j][k] = t_detail[s].innerHTML;
			s++;
		}
	}
	//2.触发事件
    //使用回调函数，传递参数i
    for (var i = 0; i < t_head.length ; i++) {
        t_head[i].onclick = call_back(i, num);
        t_head[i].onmouseover = call_back1(table_i, i);
        t_head[i].onmouseout = call_back2(table_i, i);
    }
    //回调函数,排序
    function call_back(par, num) {
    	return function() {
            var i = par;
            if (click_time[num][i] == undefined || click_time[num][i] == 1) {
                click_time[num][i] = 2;	
            	//升序排序
                t_head[i].innerHTML =head_data[i] + "<img src='ascend.png'/>";
                for (var j = 0; j < t_detail.length/t_head.length; j++) {
            	    for (var k = 0; k < t_detail.length/t_head.length-1; k++) {
            		    if (data[k][i] <= data[k+1][i]) {
            			    var temp = data[k];
            			    data[k] = data[k+1];
            			    data[k+1] = temp;
            		    }
            	    }
                }
            } else {
            	click_time[num][i] = 1;
            	//降序排序
                t_head[i].innerHTML =head_data[i] + "<img src='descend.png'/>";
            	for (var j = 0; j < t_detail.length/t_head.length; j++) {
            	    for (var k = 0; k < t_detail.length/t_head.length-1; k++) {
            		    if (data[k][i] >= data[k+1][i]) {
            			    var temp = data[k];
            			    data[k] = data[k+1];
            			    data[k+1] = temp;
            		    }
            	    }
                }
            }
            //对表格内容重新输入
            var s = 0;
	        for (var j = 0; j < t_detail.length/t_head.length; j++) {
		        for (var k = 0; k < t_head.length; k++) {
			        t_detail[s].innerHTML = data[j][k];
			        s++;
		        }
	        }
    	};
    }
    //鼠标在标题上时背景颜色改变，出现升序或降序图标
    function call_back1(table, i_head) {
        return function() {
            var t_head = table.getElementsByTagName("th");
            t_head[i_head].style.backgroundColor = "rgb(164,176,252)";
            if (is_sorted(table, i_head) == "descending")
                t_head[i_head].innerHTML += "<img src='descend.png'/>";
            if (is_sorted(table, i_head) == "ascending")
                 t_head[i_head].innerHTML += "<img src='ascend.png'/>";
            if (is_sorted(table, i_head) == "unsorted"){}
        };
    }
    //鼠标移开标题时背景颜色恢复
    function call_back2(table, i_head) {
        return function() {
            var t_head = table.getElementsByTagName("th");
            t_head[i_head].style.backgroundColor = "rgb(3, 27, 127)";
            if (is_sorted(table, i_head) == "descending")
                t_head[i_head].innerHTML = head_data[i_head];
            if (is_sorted(table, i_head) == "ascending")
                 t_head[i_head].innerHTML = head_data[i_head];
            if (is_sorted(table, i_head) == "unsorted"){}
        };
    }

}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++)
    	makeTableSortable(tables[i], i);
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
