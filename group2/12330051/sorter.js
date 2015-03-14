
function makeAllTablesSortable(tabled) {
  new sorter(tabled);
}
function sorter(table)
{
    this.Table = table;
    if(this.Table.rows.length <= 1)
    {
        return;
    }
    this.Init();
}

sorter.prototype = {
    Init : function()//初始化表格的信息和操作
    {
        this.Rows = [];
        this.Header = [];
        this.ViewState = [];
        this.LastSorted = null;
        this.NormalCss = "NormalCss";
        this.SortAscend = "SortAscend";
        this.SortDescend = "SortDescend";
        for(var x = 0; x < this.Table.rows.length; x++)
        {
            this.Rows.push(this.Table.rows[x]);
        }
        this.Header = this.Rows.shift().cells;
        for(var rowIndex = 0; rowIndex < this.Header.length; rowIndex++)
        {
            
            if(rowIndex >= this.Header.length)
            {
                continue;
            }
            this.ViewState[rowIndex] = 0;
            this.Header[rowIndex].onclick = this.ReturnFunction(this, "Sort", rowIndex);
        }
    },
    ReturnFunction : function(variable,method,param)//取得指定对象的指定方法.
    {
        return function()
        {
            variable[method](param);
        }
    },
    Sort : function(column)//执行排序.
    {
        if(this.LastSorted)
        {
            this.LastSorted.className = this.NormalCss;
        }
        
        this.Rows.sort(
        function(row1, row2)
        {
            var value1,value2;
            value1 = row1.cells[column].innerHTML;
            value2 = row2.cells[column].innerHTML;
            if(value1 == value2)
            {
                return 0;
            }
            else if(value1 > value2){
			    return 1
			}
			else
			    return -1
        })
        if(this.ViewState[column])
        {
            this.Rows.reverse();
            this.ViewState[column] = 0;
            this.Header[column].className = this.SortDescend;
        }
        else
        {
            this.ViewState[column] = 1;
            this.Header[column].className = this.SortAscend;
        }
        this.LastSorted = this.Header[column];
        var frag = document.createDocumentFragment();
        for(var x = 0; x < this.Rows.length; x++)
        {
            frag.appendChild(this.Rows[x]);
        }
        this.Table.tBodies[0].appendChild(frag);
    },
}