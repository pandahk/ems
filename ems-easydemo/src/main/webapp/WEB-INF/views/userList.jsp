<%@ include file="common/common.jsp"%> 
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" charset="utf-8" >
<title>esayui tree page </title>


</head>
<body>


<!-- <table id="dd"  class="easyui-datagrid"
               toolbar="#toolbar" pagination="true"
               rownumbers="true" fitColumns="true" singleSelect="true">
        </table>
        
        <div id="toolbar">
          <a href="">aa</a>
        
        </div> -->
         
        
 <div data-options="region:'center',fit:true,border:false" >  
          <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'">新增</a>  
         <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">修改</a> 
         <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'">删除</a> 
        <table id="dg"></table>    
     </div>       
</body>

<script>
$(function(){
	loadData();
 
});

function loadData() {
	
	
	$('#dg').datagrid({
        url: '${ctx}/findAll',
        method : 'POST',
        pagination : true,
        pageSize : 10,
        rownumbers : true,
        singleSelect : true,
        columns:[[   
            {field:'account',title:'姓名',width:50}
           
        ]]
    }); 
	
	
	
	
	
}








/* $('#dd').datagrid('getPager').pagination({    
    pageSize: 10, //每页显示的记录条数，默认为10      
    pageList: [10, 15, 20, 25], //可以设置每页记录条数的列表    
    onSelectPage: function(pageNumber, pageSize) {    
        SearchTable(pageNumber, pageSize);//每次更换页面时触发更改     
    }    
});    
//默认刷新  
SearchTable(1,10); */


    
    
    
 /* function SearchTable(_pageNumber, _pageSize){  
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
              
    });  }    */
    


</script>
</html>