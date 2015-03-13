window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
};

function getAllTables(){
    var table = document.getElementsByTagName("table");
    return table;
};

function makeAllTablesSortable(tables){
	for (i = 0; i < tables.length; i++) {
		heads = tables[i].tHead.getElementsByTagName("th");
		for (j = 0; j < heads.length; j++) {
			heads[j].addEventListener("click", sortIt);	     
		}		
	}
};

function sortIt(){
	var col = this.cellIndex;
	var tb = this.parentNode.parentNode.parentNode;
	var bodyl = tb.tBodies[0].children.length;
	var rows = [];
	for (var i=0; i<bodyl; i++ ) {
			rows.push(tb.tBodies[0].children[0]);
			tb.tBodies[0].removeChild(tb.tBodies[0].children[0]);
	} //copy tbody to array, and delete the rows of table
	if(this.children.length==0){ // if this column has never been sorted, ascend it.
        for(var i=0; i<this.parentNode.children.length; i++){
        this.parentNode.children[i].style.backgroundColor="blue";
        if( this.parentNode.children[i].children.length>0){
        	this.parentNode.children[i].removeChild(this.parentNode.children[i].children[0]);
        }      
		}
		this.style.backgroundColor = "lightblue";
		this.innerHTML=this.innerHTML+'<img src="ascend.png" alt="ascend"/>';
        this.children[0].style.float="right";
    	for (var i=0; i<rows.length; i++ ) {  //
        	var temp;
        	for (var j=i+1; j<rows.length; j++ ){
        		if(rows[i].children[col].innerHTML > rows[j].children[col].innerHTML) {
        			temp = rows[i];
        			rows[i]=rows[j];
        			rows[j]=temp;
        		}
        	}
        	tb.tBodies[0].appendChild(rows[i]);             
    	}  //sort by string
	} else { // this column has been sorted, reverse it.
		rows.reverse();
		for (var i=0; i<rows.length; i++){
			tb.tBodies[0].appendChild(rows[i]);
		}
		if(this.children[0].alt=="ascend"){
			this.children[0].src="descend.png";
			this.children[0].alt="descend";
		} else {
			this.children[0].src="ascend.png";
			this.children[0].alt="ascend";
		}
	}
};
