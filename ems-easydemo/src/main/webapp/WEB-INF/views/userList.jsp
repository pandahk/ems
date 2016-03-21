<%@ include file="common/common.jsp"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>esayui tree page </title>


</head>
<body>


<table id="dd"  class="easyui-datagrid"
               toolbar="#toolbar" pagination="true"
               rownumbers="true" fitColumns="true" singleSelect="true">
        </table>
        
        <div id="toolbar">
          <a href="">aa</a>
        
        </div>
         
        
 <div id="mm"></div>
</body>


<script>
$(function(){
 $('#dd').datagrid({
        url: '${ctx}/findAll',
        method : 'POST',
        pagination : true,
        pageSize : 10,
        queryParams : {
		},
        rownumbers : true,
        singleSelect : true,
        columns:[[   
            {field:'name',title:'ss',width:50},
            {field:'email',title:'email',width:50}
        ]]
    }); 
    
/* $('#dd').datagrid('getPager').pagination({    
    pageSize: 10, //每页显示的记录条数，默认为10      
    pageList: [10, 15, 20, 25], //可以设置每页记录条数的列表    
    onSelectPage: function(pageNumber, pageSize) {    
        SearchTable(pageNumber, pageSize);//每次更换页面时触发更改     
    }    
});    
//默认刷新  
SearchTable(1,10); */

})
    
    
    
 function SearchTable(_pageNumber, _pageSize){  
    var dg =$('#dd');    
    var pager =dg.datagrid('getPager');    
    
    //查询条件写在这里,需附带页码信息  
    $.post('${ctx}/findAll', {page:_pageNumber-1,size:_pageSize}, function(data) {   
  
        $('#dd').datagrid('loadData', data.content);  
      
        //注意此处从数据库传来的data数据有记录总行数的total列    
        var _total = data.totalElements;    
        pager.pagination({    
            //更新pagination的导航列表各参数    
            total: _total,//总数    
            pageSize: _pageSize,//行数    
            pageNumber: _pageNumber//页数    
        });    
              
    });    
}     
</script>
</html>