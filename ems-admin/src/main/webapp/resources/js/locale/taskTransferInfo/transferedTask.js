$(function(){
	var p = $('#transferedTask').datagrid('getPager');
	
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
   
	var pageSize = $('#transferedTask').datagrid('getPager').data("pagination").options.pageSize;
	loadData(1,pageSize);//默认查询10条数据	
});
	function loadData(pageNo,pageSize){
      $.ajax({
           url: "../taskTransferInfo/findTransferedTask",
           type: "POST",
           data: {    	 		        	  
        	    currentPage: pageNo,
        	    pageSize: pageSize,
				applyCode: $("#applyCode").val()				
           },
           success: function(data, status) {
        	   if(data){
        		   if (data) {
       				if(data.rows){
       					for(var i = 0;i<data.rows.length;i++){
       						var idCardNo = data.rows[i].idCardNo;
       						
       						if (idCardNo && idCardNo.length >= 14) {
       							var s1 = idCardNo.substring(0, 6);
       							var s2 = idCardNo.substring(6, 14);
       							var s3 = idCardNo.substring(14);
       							
       							data.rows[i].idCardNo = s1 + '********' + s3;
       						}
       					}
       				}
        		   }
	           	   $('#transferedTask').datagrid('loadData',data); 
	           	 }
           	 }
          });
	}

function queryAll(){
	var pageSize = $('#transferedTask').datagrid('getPager').data("pagination").options.pageSize;
	
      $.ajax({
       url: "../taskTransferInfo/findTransferedTask",
       type: "POST",
       data: {
    	    currentPage: 1,
    	    pageSize: pageSize,
    	    applyCode: $("#applyCode").val()
       },
       success: function(data, status) {
    	   if(data){
    		   if (data) {
   				if(data.rows){
   					for(var i = 0;i<data.rows.length;i++){
   						var idCardNo = data.rows[i].idCardNo;
   						
   						if (idCardNo && idCardNo.length >= 14) {
   							var s1 = idCardNo.substring(0, 6);
   							var s2 = idCardNo.substring(6, 14);
   							var s3 = idCardNo.substring(14);
   							
   							data.rows[i].idCardNo = s1 + '********' + s3;
   						}
   					}
   				}
    		   }
           	   $('#transferedTask').datagrid('loadData',data); 
	            //分页栏上跳转到第一页   
	           	$('#transferedTask').datagrid('getPager').pagination({pageNumber: 1}); 
           	 }
       	 }
      });
}



