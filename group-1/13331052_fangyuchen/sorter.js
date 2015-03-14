

//一开始的时候就想错了，没有循环判断哪一个表头被点击，导致后来都不知道该按照谁来排序。
//我只是一个丑逼。大爷大娘求给个建议好伐。。

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {                          
    return document.getElementByTagName("table");
}

function makeAllTablesSortable(tables) {
    document.getElementByTagName("th").onclick = sortTable;        //点击th的单元格触发排序事件

    function sortTable() {                             //声明对每张表进行排序的函数sortTable
		var oTable_1 = tables[0];                      //获得表，一共有两张
		var oTable_2 = tables[1];                     

		var oTbody_1 = oTable_1.tBodies[0];   //获得放数据的body，因为该表格只有一个tbody,所以直接用[0]
		var oTbody_2 = oTable_2.tBodies[0];   

	    var oRows_1 = oTbody_1.rows;          //获得tbody里面的所有tr
	    var oRows_2 = oTable_2.rows;          

	    var oTR_1 = new Array();              //声明数组
	    var oTR_2 = new Array();

	    for(var i = 0; i < oRows_1.length; i++) {    //将tr依次放入数组中
	    	oTR_1[i] = oRows_1[i];
	    }
	    for(var i = 0; i < oRows_2.length; i++) {
	    	oTR_2[i] = oRows_2[i];
	    }
        

	    oTR_1.sort();                                      //调用排序函数
	    oTR_2.sort();

	    var oFragement_1 = document.createDocumentFragment();//创建文档碎片,用来存放排好的tr
	    for(var i = 0; i < oTR_1.length; i++)
	    {
	         oFragement_1.appendChild(oTR_1[i]);//将tr绑定到碎片上.
	    }
	    oTbody_1.appendChild(oFragement_1);//将碎片绑定在表格上

	    var oFragement_2 = document.createDocumentFragment();
	    for(var i = 0; i < oTR_2.length; i++)
	    {
	         oFragement_2.appendChild(oTR_2[i]);
	    }
	    oTbody_2.appendChild(oFragement);
    }
}

function sort() {
    
}



