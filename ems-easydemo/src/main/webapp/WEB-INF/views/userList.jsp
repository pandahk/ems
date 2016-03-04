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

<table id="grid"  class="easyui-datagrid"
               toolbar="#toolbar" pagination="true" method="GET"
               rownumbers="true" fitColumns="true" singleSelect="true">
        </table>
        
        
</body>
<script>
$(function(){
$('#grid').datagrid({
        url: '${ctx}/findAll',
        columns:[[
            {field:'sex',title:'ss',width:50}
        ]]
    });
    
})
    
</script>
</html>