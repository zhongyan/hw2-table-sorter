// 0 for none, 1 for ascending, -1 for descending
var flag = [0,0,0,0,0,0];

window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables(){
	var items = document.getElementsByTagName("table");
	return items;
}

function makeAllTablesSortable(item) {
    var theads = item[0].parentNode.getElementsByTagName("th");
    theads[0].onclick = function(){Ordered(0)};
    theads[2].onclick = function(){Ordered(2)};
    theads[3].onclick = function(){Ordered(3)};
    theads[4].onclick = function(){Ordered(4)};
    theads[1].onclick = function(){Ordered(1)};
    theads[5].onclick = function(){Ordered(5)};
}

// 将被点击列的项目截取并用sort()函数排序
function Ordered(index){
	var tds1 = document.getElementsByTagName("td");  // tds1.length = 18
	var items = [];
	// todo表截取
	if (index <=2) {
		for (var i = 0; i < 9; i++) {  //取被点击列的3行到 items[]
			if (i%3 == index%3)
			items.push(tds1[i].innerHTML);
		}
	// staff表截取
	} else {
		for (var i = 9; i < 18; i++) {  //取被点击列的3行到 items[]
			if (i%3 == index%3)
			items.push(tds1[i].innerHTML); // items.length = 3
		}
	}
	// 排序
	var compare = [];
	for (var j = 0; j < items.length; j++) {
		var tmp = [];
		tmp.push(items[j]);
		tmp.push(j);        // 对应index
		compare.push(tmp);  // compare[items[j], j]
	}
	compare.sort();
	changePos(compare, index);
}

// 按排序后的compare[]更改<td>的innerHTML
function changePos(compare, index){
	var list = [];
	var tbody = document.getElementsByTagName("tbody");
	  // todo
	if (index <= 2) {
		var s = 0;
	  // staff
	} else {
		var s = 1;
	}

	var kid = tbody[s].getElementsByTagName("tr");
	for (var i = 0; i < kid.length; i++) {
		var str = kid[compare[i][1]].innerHTML;
		list.push(str);
	}

	if (flag[index] == 0 || flag[index] == -1) {  // ascending
		for (var j = 0; j < kid.length; j++) {
			tbody[s].getElementsByTagName("tr")[j].innerHTML = list[j];
		}
	} else {  // descending
		for (var j = 0; j < kid.length; j++) {
			tbody[s].getElementsByTagName("tr")[j].innerHTML = list[kid.length-1-j];
		}
	}
	changeCss(index);
}

// 改变css
function changeCss(index){
	var ths = document.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
		if (flag[i] != 0) {  // change color and remove img
			var lastc = ths[i].lastChild.lastChild;
			ths[i].lastChild.remove(lastc);
		}
		ths[i].style.backgroundColor = "#00008B";
	}
	for (var i = 0; i < ths.length; i++) {
		if (i == index) {
			ths[i].style.backgroundColor = "rgba(166,166,255,1)";
			 // descending
			if (flag[index] == 1) {
				ths[i].innerHTML = ths[i].innerHTML + '<img src="descend.png">';
				ths[i].lastChild.style.float = "right";
				for (var k = 0; k < 6; k++) {
					flag[k] = 0;
				}
				flag[index] = -1;
			// ascending
			} else {
				ths[i].innerHTML = ths[i].innerHTML + '<img src="ascend.png">';
				ths[i].lastChild.style.float = "right";
				for (var k = 0; k < 6; k++) {
					flag[k] = 0;
				}
				flag[index] = 1;
			}
		}
	}
}