//define an function for table object
function getAllTables(){

	this.originalTable = document.getElementsByTagName('table');
	this.originalThead = document.getElementsByTagName('th');
	this.originalTbody = document.getElementsByTagName('td');
	this.continue = true;
	try{
		//if isn't exist a table,throw an error
		if (!this.originalTable[0]) throw new Error("It is not exist a table!");
		//if isn't exist a 'th',throw an error
		if (!this.originalThead[0]) {
			throw new Error("It is not exist a th tag!");
		}
		//if isn't exist a 'td',throw an error
		if (!this.originalTbody[0]) {
			throw new Error("It is not exist a td tag!");
		}
	}
	//error catch
	catch(err){
		var errorTxt = "";
		errorTxt="There was an error on this page.\n\n";
	  	errorTxt+="Error description: " + err.message + "\n\n";
	  	errorTxt+="Click OK to continue.\n\n";
	  	this.continue = false;
		alert(errorTxt)
	}
	return this.originalTable;
}

//add addSortObject as a prototype method for table object
function makeAllTablesSortable(allTables){
	if (this.continue)
		for (var i = 0; i < this.originalTable.length; i++) {
			with(this.originalTable[i]){
				this.originalThead = getElementsByTagName('th');
				var thLength = this.originalThead.length;
				for (var j = 0; j < thLength; j++) {
					this.originalThead[j].setAttribute('data-num', j);
					this.originalThead[j].setAttribute('data-sort','descend');
					//Attach click to 'th'
					this.originalThead[j].onclick = function(){
						var table = this;
						var offset = this.getAttribute('data-num');
						//To find its parents 'table'
						while(table.parentNode.tagName != 'BODY') {
							table = table.parentNode;
							if (table.tagName == 'TABLE') break;
						}					
			
						//descend
						if (this.getAttribute('data-sort') == 'descend') {
							this.setAttribute('data-sort', 'ascend');
							this.style.backgroundImage = 'url(ascend.png)';
							selectSort(table, offset, true);
						}
						//ascend
						else {
							this.setAttribute('data-sort', 'descend');
							this.style.backgroundImage = 'url(descend.png)';
							selectSort(table, offset, false);
						}					
					}
				}			
			}
		}	
}

//add selectSort as a prototype method for table object
function selectSort(table, offset, way){
	//select sort
	var tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	//if tbody contain th, we need to reduce it
	var thCount = 0;
	for (var i = 0; i < tr.length; i++) {
		if (tr[i].getElementsByTagName('th')[0]){
			thCount++;
		}
		else break;
	}
	
	for (var i = thCount; i < tr.length - 1; i++){
		var index = i;
		for (var j = i + 1; j < tr.length; j++) {
			var current = tr[index].getElementsByTagName('td')[offset].innerHTML;
			var temp = tr[j].getElementsByTagName('td')[offset].innerHTML;			
			//descend or ascend
			if (current > temp && way) {
				index = j;
			}
			else if (current < temp && !way) {
				index = j;
			}
		}
		if (index != i) {
			var node = tr[i].innerHTML;
			var node_ = tr[index].innerHTML;
			tr[index].innerHTML = node;
			tr[i].innerHTML = node_;					
		}
	}
}
/*
  The final load
*/
window.onload=function(){
	var table = getAllTables();
	makeAllTablesSortable(table);

}

