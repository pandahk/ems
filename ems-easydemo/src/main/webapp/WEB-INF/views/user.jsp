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

  <script type="text/javascript"> 
    // 表格数据源 
    var data = []; 
    // 用代码造30条数据 
    for (var i = 1; i < 31; ++i) { 
      data.push({ 
        "id":i, 
        "name":"Student" + i 
      }) 
    } 
    $(function () { 
      $("#dd").datagrid({ 
        title:"测试本地分页", 
        rownumbers:true, 
        fitColumns:true, 
        pagination:true, 
        data:data.slice(0,10), 
        columns:[ 
          [ 
            {field:'id', align:"center", title:"编号",width:100},
            {field:'name', align:"center", title:"姓名",width:100}
          ] 
        ] 
      }); 
      var pager = $("#dd").datagrid("getPager"); 
      pager.pagination({ 
        total:data.length, 
        onSelectPage:function (pageNo, pageSize) { 
          var start = (pageNo - 1) * pageSize; 
          var end = start + pageSize; 
          $("#dd").datagrid("loadData", data.slice(start, end)); 
          pager.pagination('refresh', { 
            total:data.length, 
            pageNumber:pageNo 
          }); 
        } 
      }); 
    }); 
  </script> 
</head> 
<body> 
<div id="dd"></div> 
</body> 
</html>