### 功能限制

1. 假设table元素内第一行是表头（即第一个tr里是几个th），不用考虑thead与tbody，下面成功的网站都是满足此要求的
2. 测试其它网站时直接把sorter.js文件复制粘贴到chrome的console里回车，再执行makeAllTablesSortable(getAllTables());即可

### 经过测试能够对其中的表格进行排序的网站有：
    
1. http://ss.sysu.edu.cn/~pml/se305/2015sp/
2. http://www.w3school.com.cn/html/html_tables.asp#more_examples
3. http://www.w3school.com.cn/html/html_lists.asp
4. http://www.w3school.com.cn/aspnet/mvc_htmlhelpers.asp

    * makeAllTablesSortable函数会把表格都设置成和例子一样的样式
    * 为了测试其它网站时能够显示图标，src属性设置为github上对应的url,所以第一次点击进行排序图标出来的可能慢一点，如果没有联网的话就不能看到图标了。
