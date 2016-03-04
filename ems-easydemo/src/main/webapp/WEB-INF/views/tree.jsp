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

<ul id="tt" class="easyui-tree">
    <li>
		<span>Folder</span>
		<ul>
			<li>
				<span>Sub Folder 1</span>
				<ul>
					<li><span><a href="#">File 11</a></span></li>
					<li><span>File 12</span></li>
					<li><span>File 13</span></li>
				</ul>
			</li>
			<li><span>File 2</span></li>
			<li><span>File 3</span></li>
		</ul>
	</li>
    <li><span>File21</span></li>
</ul>


<ul id="tt2"></ul>
=====================
<ul id="tt3"></ul>


<div id="mm" class="easyui-menu" style="width:120px;">
	<div onclick="append()" data-options="iconCls:'icon-add'">Append</div>
	<div onclick="remove()" data-options="iconCls:'icon-remove'">Remove</div>
</div>
</body>
<script>




$("#tt").hide();
$("#tt2").tree({
   method:'get',
   onBeforeLoad:function(node, param){
     //alert(23)
   },
   url:'${ctx}/resources/json/tree_data1.json'
})


$('#tt3').tree({
		"animate":true,
		"checkbox":true,
		lines:true,
		dnd:true,
		cascadeCheck:true,
		formatter:function(node){
			return node.text+"_"+node.id;
		},
		data: [{
		    "id": 1,
			text: 'Item1',
			"state": 'closed',
			"iconCls":"icon-ok",
			children: [{
			   "id": 10,
				text: 'Item11',
				
			},{
				"id": 11,
				text: 'Item12'
			}]
	},{
		text: 'Item2'
	}]
});
$('#tt3').tree({
	//onDblClick: function(node){
		//alert(node.text);  // alert node text property when clicked
	//}
	
	//onSelect:function(node){
	 //  alert(node.text);
	
	//}
	
	onContextMenu: function(e, node){
		e.preventDefault();
		// select the node
		$('#tt3').tree('select', node.target);
		// display context menu
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	}
});
</script>
</html>