/*
 * @brief to make common table as an object so that can be sortable
 * @author kin_sang
 * @param 'heads'  it is the array of table heads 
 * @param 'gta' is the tmp var of the object to pass the dict
 * @param 'ascend' and 'descend' can be changed easily along with css 
 *
 * thakns for your instruction
 */

var ascend= 'arrowUp',
    descend= 'arrowDown';

var hasClass = function(ele, name) {
  return (ele.className.indexOf(name));
}

var addClass = function(ele, name) {
  if (hasClass(ele, name) == -1) {
    ele.className += ' ';
    ele.className += name;
  }
}

var delClass = function(ele, name) {
  if (hasClass(ele, name) != -1) {
    ele.className = ele.className.replace(name, '');    
  }
}

var allReset = function(thArr) {
  for (var i = 0; i < thArr.length; i++) {
    //thArr[i].className = "";
    delClass(thArr[i],  ascend);
    delClass(thArr[i],  descend);
  }
}

var sortableObj = function(dict) {
    this.dict = dict;
    this.ths = dict.table.getElementsByTagName('th');
    this.tr = dict.table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    this.listen();
}

sortableObj.prototype = {

  sort: function(chosen, modle) {
        var rowCount = this.dict.table.rows.length,
            table = this.dict.table;

        for (var i = 1; i < rowCount; i++) {
          for (var k = 1; k < rowCount - i; k++) {
            var a = table.rows[k].cells[chosen].innerHTML,
                b = table.rows[k+1].cells[chosen].innerHTML;
            if (modle == 'up' && a > b) {
              var tmp = table.rows[k].innerHTML;
              table.rows[k].innerHTML = table.rows[k+1].innerHTML;
              table.rows[k+1].innerHTML = tmp;
            } 
            if (modle == 'down' && a < b) {
              var tmp = table.rows[k].innerHTML;
              table.rows[k].innerHTML = table.rows[k+1].innerHTML;
              table.rows[k+1].innerHTML = tmp;
            } 
          }
        }
    },

  listen: function() {
       var heads = this.ths;
       var gta = this;
       for (var i = 0, len =  heads.length; i < len; i++) {
           (function(j) {
                heads[i].addEventListener('click', function() {
                 if (hasClass(heads[j],  ascend) == hasClass(heads[j],  descend)) {
                     allReset(heads);
                    addClass(heads[j],  ascend);
                    gta.sort(j, 'up');
                 } else if (hasClass(heads[j],  ascend) != -1) {
                     allReset(heads);
                    addClass(heads[j],  descend);
                    gta.sort(j, 'down');
                 } else {
                     allReset(heads);
                 }
               }, false);
           })(i);
       }
    }
    
};

var makeAllTablesSortable = function(tables) {
  for (var i = 0; i < tables.length; i++) {
    var tmpObj = new sortableObj({table:tables[i]});  
  }
}

var getAllTables = function() {
  return document.getElementsByTagName('table');
};

window.onload = function() {
  var tables = getAllTables();
  makeAllTablesSortable(tables);
}
