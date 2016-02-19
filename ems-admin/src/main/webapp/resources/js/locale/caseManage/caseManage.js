$(function(){
	$('#caseManage').datagrid({
		onDblClickRow: function (rowIndex, rowData) {
			if($("#can_open_detail").val() != 1) {
				window.open("../caseInfo/caseView?applyCode="+rowData.applyNo);
			}
		}
	})
	var p = $('#caseManage').datagrid('getPager');
	$(p).pagination({
		displayMsg:'当前显示从{from}到{to}共{total}记录',
		beforePageText:'第',
		afterPageText:'页，共{pages}页',
		loading:false,
		onSelectPage:function(pageNumber, pageSize)
		{
			loadData(pageNumber,pageSize);
	    }			
	});
   
	var pageSize = $('#caseManage').datagrid('getPager').data("pagination").options.pageSize;
	loadData(1,pageSize);//默认查询10条数据
	function loadData(pageNo,pageSize){
      $.ajax({
           url: "../caseManagement/queryPage",
           type: "POST",
           data: {    	 		        	  
				pageNumber: pageNo,
				pageSize: pageSize,
				carName: $("#carName").val(),
		    	carNo: $("#carNo").val(),
		    	pName: $("#pName").combobox('getValue')
           },
           success: function(data, status) {
	           	 if(data){
	           	   $('#caseManage').datagrid('loadData',data); 
	           	 }
           	 }
          });
	}
});

function queryAll(){
	var pageSize = $('#caseManage').datagrid('getPager').data("pagination").options.pageSize;
      $.ajax({
       url: "../caseManagement/queryPage",
       type: "POST",
       data: {
			pageNumber: 1,
			pageSize: pageSize,
			carName: $("#carName").val(),
	    	carNo: $("#carNo").val(),
	    	pName: $("#pName").combobox('getValue')
       },
       success: function(data, status) {
    	   if(data){
           	   $('#caseManage').datagrid('loadData',data); 
	            //分页栏上跳转到第一页   
	           	$('#caseManage').datagrid('getPager').pagination({pageNumber: 1}); 
           	 }
       	 }
      });
}

