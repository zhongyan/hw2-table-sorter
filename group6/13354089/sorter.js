window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	var title01 = tables[0].rows[0].cells[0];
	title01.onclick = function() { sorting(0,0,this,tables); };
    title01.onmouseout = function() { this.style.backgroundColor = '#000066'};


    var title02 = tables[0].rows[0].cells[1];
	title02.onclick = function() { sorting(0,1,this,tables); };
    title02.onmouseout = function() { this.style.backgroundColor = '#000066'};

    var title03 = tables[0].rows[0].cells[2];   
	title03.onclick = function() { sorting(0,2,this,tables); };
    title03.onmouseout = function() { this.style.backgroundColor = '#000066'};


	var title11 = tables[1].rows[0].cells[0];   
	title11.onclick = function() { sorting(1,0,this,tables); };
    title11.onmouseout = function() { this.style.backgroundColor = '#000066'};

	var title12 = tables[1].rows[0].cells[1]; 
	title12.onclick = function() { sorting(1,1,this,tables); };
    title12.onmouseout = function() { this.style.backgroundColor = '#000066'};

	var title13 = tables[1].rows[0].cells[2];
	title13.onclick = function() { sorting(1,2,this,tables); };
    title13.onmouseout = function() { this.style.backgroundColor = '#000066'};

}

    
function sorting(t,l,title,tables) {

    if(title.className == "descend"){
        title.className = "ascend";
        for (var i = 1; i <= 3 ; i++) {
            for (var j = 1; j <= 3-i ; j++) {
                if(tables[t].rows[j].cells[l].innerHTML < tables[t].rows[j+1].cells[l].innerHTML){
                    var v = tables[t].rows[j].innerHTML;
                    tables[t].rows[j].innerHTML = tables[t].rows[j+1].innerHTML;
                    tables[t].rows[j+1].innerHTML = v;
                }
            }
        }
    }

    else{
        title.className = "descend";

        for (var i = 1; i <= 3 ; i++) {
            for (var j = 1; j <= 3-i ; j++) {
                if(tables[t].rows[j].cells[l].innerHTML > tables[t].rows[j+1].cells[l].innerHTML){
                    var v = tables[t].rows[j].innerHTML;
                    tables[t].rows[j].innerHTML = tables[t].rows[j+1].innerHTML;
                    tables[t].rows[j+1].innerHTML = v;
                }
            }
        }
    }

}    

    
    	
 