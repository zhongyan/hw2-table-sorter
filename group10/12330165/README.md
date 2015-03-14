12330165-李健华


我的js文件是通过 tagname 进行操作的， 所以可以对任何  格式为
<table>
    <thead>
        <tr>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>

的网站均试用， 因为时间的关系没有一个一个去试试看

最难的一部分就是排序的时候必须要给他一个根据第几列排序的 index 而 javascript 里默认的排序算法 array.sort(comparefunction) 的参数
comparefunction 只能有两个参数， 不能给出index 所以我就自己重新写了个冒泡排序， 虽然排序的效率不高， 但是数据量不大的时候应该可以对付对付。