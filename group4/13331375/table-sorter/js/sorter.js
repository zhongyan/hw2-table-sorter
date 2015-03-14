
function getAllTables() {
    return document.getElementsByTagName("table");
}

function writeFromTable(oneTable, allText, indexarray) {
  var columNum = oneTable.getElementsByTagName("th").length;
  var rowAllNum = oneTable.getElementsByTagName("tr").length;
  var tres =  oneTable.getElementsByTagName("tr");
  for (var i = 0; i < rowAllNum - 1; i++) {
    // 注意 出去第一行那个tr
    var tdes = tres[i+1].getElementsByTagName("td");
    for (var j = 0; j < columNum; j++) {
      tdes[j].innerHTML = allText[(indexarray[i])][j];
    }
  }

}



function readFromTable(oneTable) {
  var columNum = oneTable.getElementsByTagName("th").length;
  var rowAllNum = oneTable.getElementsByTagName("tr").length;
  var text = new Array();
  for (var i = 0; i < rowAllNum - 1; i++) {
    text[i] = new Array();
  }

  var tres =  oneTable.getElementsByTagName("tr");
  for (var i = 0; i < rowAllNum - 1; i++) {
    // 注意 出去第一行那个tr
    var tdes = tres[i+1].getElementsByTagName("td");
    for (var j = 0; j < columNum; j++) {
      text[i][j] = tdes[j].innerHTML;
    }
  }
  // alert(document.getElementsByClassName('alternate')[0].attributes.class.value);
  return text;
}


function compare(shuzuA, shuzuB) {
  for (var i = 0; i < shuzuA.length; i++) {
    if (parseInt(shuzuA[i]) != parseInt(shuzuB[i])) {
      return parseInt(shuzuA[i]) - parseInt(shuzuB[i]);
    }
  }
  return -1;

}

//  unfinished 默认升序
function standard(a, b) {
  var sign0 = '0';
  var sign9 = '9';
  if (a.substr(0,1).charCodeAt() >= sign0.charCodeAt() && a.substr(0,1).charCodeAt() <= sign9.charCodeAt() ) {

      var shuzuA = new Array();
      var shuzuB = new Array();
      if (a.indexOf(".") != -1) {
        shuzuA = a.split('.');
        shuzuB = b.split('.');
        return compare(shuzuA, shuzuB);
      }
      if (a.indexOf("/") != -1) {
        shuzuA = a.split('/');
        shuzuB = b.split('/');
        return compare(shuzuA, shuzuB);
      }
      if (a.indexOf("-") != -1) {
        shuzuA = a.split('-');
        shuzuB = b.split('-');
        // alert("shuzuA  " + shuzuA + '\n' + "shuzuB  "+ shuzuB + '\n');
        return compare(shuzuA, shuzuB);
      }
      if (a.indexOf(" ") != -1) {
        shuzuA = a.split(' ');
        shuzuB = b.split(' ');
        return compare(shuzuA, shuzuB);
      }
      return parseInt(a) - parseInt(b);
  } else {
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return a[i].charCodeAt() - b[i].charCodeAt();
      } else {

      }
    }
  }

  return -1;
}

function textToNum(columText,indexarray) {
    var index = new Array();
    for (var i = 0; i < indexarray.length; i++) {
      for (var j = 0; j < columText.length; j++) {
        if (indexarray[i] == columText[j]) {
          index[i] = j;
          break;
        }
      }
    }
    return index;
}


// index 为一第一列排序  indexarray存储排序应该按照这个行号text内荣
function ascOrder(allText, index, oneTable) {
  var columNum = oneTable.getElementsByTagName("th").length;
  var rowAllNum = oneTable.getElementsByTagName("tr").length;
  var tres =  oneTable.getElementsByTagName("tr");
  // 注意除去第一行
  var indexarray = new Array();
  var columText = new Array();
  var columText2 = new Array();
  for (var i = 0; i < rowAllNum-1; i++) {
    columText[i] = allText[i][index-1];
    columText2[i] = allText[i][index-1];
  }
  // alert("columText2" + columText2);

  //原来这里sort后自动就修改了columText
  // var columText2 = columText;
  indexarray = columText.sort(standard);
  var index = textToNum(columText2, indexarray);
  writeFromTable(oneTable, allText, index);
  writeFromTable(oneTable, allText, index);
}



function dscOrder(allText, index, oneTable) {
  var columNum = oneTable.getElementsByTagName("th").length;
  var rowAllNum = oneTable.getElementsByTagName("tr").length;
  var tres =  oneTable.getElementsByTagName("tr");
  // 注意除去第一行 因为那是表头
  var indexarray = new Array();
  var columText = new Array();
  var columText2 = new Array();
  for (var i = 0; i < rowAllNum-1; i++) {
    columText[i] = allText[i][index-1];
    columText2[i] = allText[i][index-1];
  }
  // alert("columText2" + columText2);
  //原来这里sort后自动就修改了columText
  // var columText2 = columText;  这样子 columText 修改  columText2也会自动修改
  // 就像类似引用；  这种用法只用在只读存储可以
  indexarray = columText.sort(standard);
  var index = textToNum(columText2, indexarray);
  writeFromTable(oneTable, allText, index);
  // 还要取反
  index = index.reverse();
  writeFromTable(oneTable, allText, index);
}

function myIndex(object) {
  var old_class = object.class;
  var sign = "ddddddddddddddddddddddd";
  var parent = object.parentNode;
  var tagName = object.nodeName;
  object.class  = sign;
  var objects = parent.getElementsByTagName(tagName);
  var i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].class == sign) {
      break;
    }
  }
  object.class = old_class;
  return i+1;
  // var string = document.getElementsByClassName(class)[0].attributes.class.value;
}


function createDscPng(oneth) {
  var div = document.createElement("div");
  var img = document.createElement("img");
  div.appendChild(img);
  img.src = "descend.png";
  img.className = "sortDsc";
  div.style.backgroundColor="rgb(3,27,125)";
  img.style.backgroundColor="rgb(3,27,125)";
  img.style.verticalAlign="middle";
  img.style.position="relative";
  img.style.left="12px";
  div.className="rightdivimg";
  var height = oneth.style.height;
  div.style.display = "inline-block";
  // 解决兼容性
  div.style.float="right";
  div.style.cssFloat = "right";
  div.style.floatStyle = "right";
  // img.style.float="right";

  oneth.appendChild(div);
  // div.style.style.float = "right";
}

function thOnmouse(oneTable,oneth, classname) {
  oneth.class = classname;
  var img = oneth.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
  var div = oneth.getElementsByTagName("div")[0];
  oneth.onmousemove = function(){
    this.style.backgroundColor="rgb(116, 108, 237)";
    div.style.backgroundColor="rgb(116, 108, 237)";
    img.style.backgroundColor="rgb(116, 108, 237)";
  }
  oneth.onmouseout = function(){
    this.style.backgroundColor="rgb(3,27,125)";
    div.style.backgroundColor="rgb(3,27,125)";
    img.style.backgroundColor="rgb(3,27,125)";
  }
  oneth.onclick = function() {
    var s = img.src;
    var string = s.substring(s.lastIndexOf("/")+1);
    var allText = readFromTable(oneTable);
    var index = myIndex(this);
    if (string == "descend.png") {
      img.src = "ascend.png";
      dscOrder(allText, index, oneTable);
    } else {
      img.src = "descend.png";
      ascOrder(allText, index, oneTable);
    }

  }

}


function makeAllTablesSortable(tables) {
    var size = tables.length;
    for (var i = 0; i < size; i++) {
      var oneTable = tables[i];
      var thes =  oneTable.getElementsByTagName("th");
      var length = thes.length;
      for (var j = 0; j < length; j++) {
        createDscPng(thes[j]);
        thOnmouse(oneTable, thes[j], i+"");
      }
    }

}




window.onload = function() {
  var tables = getAllTables();
  makeAllTablesSortable(tables);
}
