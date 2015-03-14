window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var table = [];

	//一次性获取所有的td标签
	table = document.getElementsByTagName("td");
	return table;
}

function makeAllTablesSortable(tables) {

	//分别计数两个table所被点击的次数
	var count1 = 0;
	var count2 = 0;

	//所有的th标签
	var ths = document.getElementsByTagName("th");

	//这里用的是比较直接粗暴的方法，其实可以通过对tables分次读取
	var todo1 = new Array("Paris Web 2007", "2007-11-15", "IBM La Defense / INSIA");
	var todo2 = new Array("Paris On Rails 2007", "2007-12-10", "Cite des Sciences");
	var todo3 = new Array("Burger Quiz party", "2007-04-14", "Volta");
	var staff1 = new Array("Richard", "Piacentini", "2007-03-27");
	var staff2 = new Array("Eric", "Daspet", "2007-03-28");
	var staff3 = new Array("Aurore", "Jaballah", "2007-03-15");
	var new_todo1 = [];
	var new_todo2 = [];
	var new_todo3 = [];
	var new_staff1 = [];
	var new_staff2 = [];
	var new_staff3 = [];

	//当todo表格被点击的时候执行
	document.getElementById("todo").onclick = function witchClick() {
		var e = window.event.target.innerHTML;
		var row = -1;

		//确定所被点击的列，并设置点击的变色效果
		for (var i = 0; i < 6; i++) {
			if (e == ths[i].innerHTML) {
				ths[i].style.backgroundColor = "rgb(164, 176, 252)";
				row = i;
			} else {
				ths[i].style.backgroundColor = "rgb(3, 27, 125)";
			}
		}

		//当被点击的内容是th中的某一个时执行
		if (row != -1) {

			//比较所选列的大小，这里也是用了很粗暴直接比较三个数大小的方法
			if (todo1[row] > todo2[row]) {
				if (todo1[row] > todo3[row]) {
					if (todo2[row] > todo3[row]) {
						new_todo1 = todo1;
						new_todo2 = todo2;
						new_todo3 = todo3;
					} else {
						new_todo1 = todo1;
						new_todo2 = todo3;
						new_todo3 = todo2;
					}
				} else {
					new_todo1 = todo3;
					new_todo2 = todo1;
					new_todo3 = todo2;
				}
			} else {
				if (todo1[row] > todo3[row]) {
					new_todo1 = todo2;
					new_todo2 = todo1;
					new_todo3 = todo3;
				} else {
					if (todo2[row] > todo3[row]) {
						new_todo1 = todo2;
						new_todo2 = todo3;
						new_todo3 = todo1;
					} else {
						new_todo1 = todo3;
						new_todo2 = todo2;
						new_todo3 = todo1;
					}
				}
			}

			//记录点击的次数，通过奇偶来判断是升序还是降序
			count1++;

			//若为偶数次点击则为降序
			if (count1%2 == 0) {
				//设置降序的icon
				ths[row].style.backgroundImage = "url('descend.png')";
				
				//按照降序的结果改变table中的值，此处tds表示的是tables中的下标，对于todo表格是从0开始
				var tds = 0;
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo1[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo2[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo3[j];
					tds++;
				}

			//以下为升序情况
			} else {

				//设置icon
				ths[row].style.backgroundImage = "url('ascend.png')";

				//按升序结果改变td内容
				var tds = 0;
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo3[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo2[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_todo1[j];
					tds++;
				}
			}
		}
	}


	//这是staff表格所被点击时的排序，与todo表格相同
	document.getElementById("staff").onclick = function witchClick() {
		var e = window.event.target.innerHTML;
		var row = -1;

		
		for (var i = 0; i < 6; i++) {
			if (e == ths[i].innerHTML) {
				ths[i].style.backgroundColor = "rgb(164, 176, 252)";
				row = i;
			} else {
				ths[i].style.backgroundColor = "rgb(3, 27, 125)";
			}
		}

		if (row != -1) {

			//将所得的row减去3才得到staff表格里的数据的下标
			row = row - 3;

			//比较所选列的大小
			if (staff1[row] > staff2[row]) {
				if (staff1[row] > staff3[row]) {
					if (staff2[row] > staff3[row]) {
						new_staff1 = staff1;
						new_staff2 = staff2;
						new_staff3 = staff3;
					} else {
						new_staff1 = staff1;
						new_staff2 = staff3;
						new_staff3 = staff2;
					}
				} else {
					new_staff1 = staff3;
					new_staff2 = staff1;
					new_staff3 = staff2;
				}
			} else {
				if (staff1[row] > staff3[row]) {
					new_staff1 = staff2;
					new_staff2 = staff1;
					new_staff3 = staff3;
				} else {
					if (staff2[row] > staff3[row]) {
						new_staff1 = staff2;
						new_staff2 = staff3;
						new_staff3 = staff1;
					} else {
						new_staff1 = staff3;
						new_staff2 = staff2;
						new_staff3 = staff1;
					}
				}
			}

			//记录staff表格所被点击的次数
			count2++;
			if (count2%2 == 0) {
				ths[row+3].style.backgroundImage = "url('descend.png')"
				
				//staff中的td数据在tables中是第十个及其之后的数据，故初始化下标为9
				var tds = 9;
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff1[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff2[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff3[j];
					tds++;
				}

			//升序情况
			} else {
				ths[row+3].style.backgroundImage = "url('ascend.png')";
				var tds = 9;
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff3[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff2[j];
					tds++;
				}
				for (var j = 0; j < 3; j++) {
					tables[tds].innerHTML = new_staff1[j];
					tds++;
				}
			}
		}
	}
}