
window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

//找出所有表格
function getAllTables(){
	return document.getElementsByTagName("table");
}

/*把所有表格变为可排序的
 *tables：表格数组
 */
function makeAllTablesSortable(tables){
	for(var i = 0; i < tables.length; ++i){

		//找出所有可排序标签
		var threads = tables[i].getElementsByTagName("th");

		for(var j = 0; j < threads.length; ++j){

			//ascend用来记录排序方式
			threads[j].ascend = true;

			//index_1记录表格id
			threads[j].index_1 = i;

			//index_2记录排序位
			threads[j].index_2 = j;

			threads[j].onclick = sortElement;

			threads[j].onmouseover = function(){
				this.style.backgroundColor = "#a6affc";
				checkArrow(this.ascend, this);
				if(flag == null || flag != this){
					checkArrow(true, this);
				}
			}
			threads[j].onmouseout = function(){
				this.style.backgroundColor = "#021A7E";
				this.style.backgroundImage = "none";
			}
		}

		//css行与行间颜色差别
		var lines = tables[i].getElementsByTagName("tr");
		for(var j = 1; j < lines.length ; ++j){
			if(j % 2 == 0){
				lines[j].style.backgroundColor = "lightgray";
			}else{
				lines[j].style.backgroundColor = "white";
			}
		}
	}
}

//flag记录排序标签的改变，由此修改排序方式
var flag = null;


//对指定标签下的元素进行排序
function sortElement(){

	//获取当前表格
	var tables = getAllTables();
	var thisTable = tables[this.index_1];

	//获取每一行数据
	var tbody = thisTable.getElementsByTagName("tbody")[0];
	var lines = tbody.getElementsByTagName("tr");

	//list用作可排序的二维数组(一行表示一组数据)
	var list = new Array();
	for(var i = 0; i < lines.length; ++i){
		var elements = lines[i].getElementsByTagName("td");

		//tempLine数组储存每行的各数据元素
		var tempLine = new Array();
		for(var j = 0; j < elements.length; ++j){
			tempLine.push(elements[j].innerHTML);
		}

		//这里开一个tempLine数组而不直接push(elements)是为了避免浅拷贝！
		list.push(tempLine);
	}

	//flag记录排序标签的改变，一旦发生改变排序方式改为升序（优先序）
	if(flag == null || flag != this){
		flag = this;
		this.ascend = true;
	}

	//执行排序算法
	list = sortAlgorithm(this.ascend, list, this.index_2);

	//下次排序方式反转
	this.ascend = !this.ascend;

	//将排好序的list赋值回表格
	for(var i = 0; i < lines.length; ++i){
		var elements = lines[i].getElementsByTagName("td");
		for(var j = 0; j < elements.length; ++j){
			elements[j].innerHTML = list[i][j];
		}
	}
	checkArrow(this.ascend, this);
}


function checkArrow(flag, thread){
	if(flag){
		thread.style.backgroundImage="url(descend.png)";
	}
	else{
		thread.style.backgroundImage="url(ascend.png)";
	}
}


/*冒泡排序算法
 *flag：true-升序 false-降序
 *list：待排二位数组
 *index：排序位
 */
function sortAlgorithm(flag, list, index){
	for(var i = 0; i < list.length - 1; ++i){
		for(var j = 0; j < list.length - 1; ++j){
			if(flag == true){
				if(list[j][index] > list[j+1][index]){
					var temp = list[j];
					list[j] = list[j+1];
					list[j+1] = temp;
				}
			}
			else{
				if(list[j][index] < list[j+1][index]){
					var temp = list[j];
					list[j] = list[j+1];
					list[j+1] = temp;
				}
			}
		}
	}
	return list;
}