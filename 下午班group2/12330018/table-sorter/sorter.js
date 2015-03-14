// 12330018-chenjiyun

window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables(){
	// arr存放th元素
	var arr = new Array();
	arr = document.getElementsByTagName("th");
	return arr;
}

//flag defines ascend(0) or descend(1) 
var flag = [1,1,1,1,1,1];
function makeAllTablesSortable(tables){

    // 鼠标悬浮事件
	for(var i=0; i<tables.length;i++){
		// mouseover
		(function(i) {
			tables[i].addEventListener("mouseenter",function(){
				this.style.backgroundColor="rgb(166,175,252)";
				triangle(this,i);
			})

			// mouseout
			tables[i].addEventListener("mouseleave",function(){
				this.style.backgroundColor="rgb(2,28,125)";
				if(this.getElementsByTagName("img")[0])
					this.removeChild(this.getElementsByTagName("img")[0]);
			})

			// 鼠标点击事件
			tables[i].addEventListener("click",function(){
				if(flag[i] == 1){
					Descend(tables[i],i);
					flag[i] = 0;
				}
				else{
					Ascend(tables[i],i);
					flag[i] = 1;
				}
				triangle(this,i);
			},true)
		})(i)
		
	}
}
// 小三角
function triangle(ob,i){
	var descend = document.createElement("img");
	descend.className = "triangle";
	descend.src = "descend.png";
	var ascend = document.createElement("img");
	ascend.className = "triangle";
	ascend.src = "ascend.png";

	// 删除原有的三角
	if(ob.getElementsByTagName("img")[0])
		ob.removeChild(ob.getElementsByTagName("img")[0]);

	if(flag[i] == 1){
		ob.appendChild(descend);
    }else{
    	ob.appendChild(ascend);
    }
}
// 降序
function Descend(tg,i){
	// 排序
	var myarr = getCols(tg,i);
	myarr.sort();
	backCol(tg,i,myarr);
}
// 升序
function Ascend(tg,i){
	var myarr = getCols(tg,i);
	myarr.reverse();
	backCol(tg,i,myarr);
}

// 获取需要排序的列
function getCols(tg,index){
	var table = tg.parentNode.parentNode.parentNode;
	var table_cols = table.getElementsByTagName("td");
	var table_width = table.getElementsByTagName("th").length;
	var myarr = new Array();

	for(var i = index; i < table_cols.length; ){
		myarr.push(table_cols[i].innerHTML);
		i+=table_width;
	}
	return myarr;
}

// 把排好序的字段放回table
function backCol(tg,index,myarr){
	var table = tg.parentNode.parentNode.parentNode;
	var table_cols = table.getElementsByTagName("td");
	var table_width = table.getElementsByTagName("th").length;

	for(var i = index; i < table_cols.length; ){
		table_cols[i].innerHTML = myarr.shift();
		i+=table_width;
	}
}