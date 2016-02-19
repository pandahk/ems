$(function(){
	var p = $('#unTransferedTask').datagrid('getPager');
	
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
   
	var pageSize = $('#unTransferedTask').datagrid('getPager').data("pagination").options.pageSize;
	loadData(1,pageSize);//默认查询10条数据	
});
	function loadData(pageNo,pageSize){
      $.ajax({
           url: "../taskTransferInfo/findUnTransferedTask",
           type: "POST",
           data: {    	 		        	  
        	    currentPage: pageNo,
        	    pageSize: pageSize,
				name: $("#name").val(),
				taskPeriod: $("#taskPeriod").combobox('getValue'),
				userId:$("#currentTaskUser").combobox('getValue')
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
	           	   $('#unTransferedTask').datagrid('loadData',data); 
	           	 }
           	 }
          });
	}

function queryAll(){
	var pageSize = $('#unTransferedTask').datagrid('getPager').data("pagination").options.pageSize;
	
      $.ajax({
       url: "../taskTransferInfo/findUnTransferedTask",
       type: "POST",
       data: {
    	    currentPage: 1,
    	    pageSize: pageSize,
			name: $("#name").val(),
			taskPeriod: $("#taskPeriod").combobox('getValue'),
			userId:$("#currentTaskUser").combobox('getValue')
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
           	   $('#unTransferedTask').datagrid('loadData',data); 
	            //分页栏上跳转到第一页   
	           	$('#unTransferedTask').datagrid('getPager').pagination({pageNumber: 1}); 
           	 }
       	 }
      });
}
function dealTransferTask(){
	var date=new Date();
	var rows = $('#unTransferedTask').datagrid('getSelections');
	if (rows!=''&&rows.length>0){
		var ids = [];
		var count=0;
		for(var i=0; i<rows.length; i++){
			if(i!=0){
				if(rows[i].taskDefKey!=rows[i-1].taskDefKey){
					count++;
				}
			}
			ids.push(rows[i].applyCode);
		}
		//alert(ids.join(','));
		if(count>0){
			$.messager.alert("提示","请选择同一审批环节的案件进行转件！","info");
		}else{
			
			var jsonStrs=JSON.stringify(rows);
			$('#currentTaskDefKey').val(rows[0].taskDefKey);
			$('#taskPeriod > a').text(rows[0].taskName);
			
			$("#targetUser").combobox({
				valueField:'account',  
			    textField:'userName',
			    editable:false,
				url:"../taskTransferInfo/findUserByTaskPeriod?taskPeriod="+$('#currentTaskDefKey').val(),
				onSelect:function(){				
					$.ajax({
						url: "../taskTransferInfo/findTaskCountByUserPeriod",
						type: "POST",
						data: {
							userAccount:$("#targetUser").combobox('getValue')
						},
						success: function(data, status) {
							$('#currentTaskCount > a').text(data);
						}
					});
				}
		     });
		    $("#addTransferTaskDialog").css("display", "block").dialog({
					title:"案件转件",
					width: 400,
					height: 450,
					loadingMessage:"数据加载中...",
					closable:false,
					closed:true,
					modal: true,
					collapsible:false,
					minimizable:false,
					maximizable:false,
					buttons:[
					  {
						text:'保存',
						iconCls:'icon-save',
						handler:function(){ 
							deal(jsonStrs);		 					
						}
					},{
						text:'关闭',
						iconCls:'icon-cancel',
						handler:function(){
						$('#addTransferTaskDialog').dialog('close');
					}
					}
					]
				});		     
				 $("#addTransferTaskDialog").dialog('open');
	      }
	}else{
		$.messager.alert('提示', "未选择待转件案件!", "info");
	}
}
function deal(jsonStrs){
	if($("#targetUser").combobox('getValue')==''){
		$.messager.alert('提示', "转件接收人为空，无法转件!", "info");
	}else{
	$.messager.confirm("确认","确定转件到"+$("#targetUser").combobox('getText')+"吗？",function(r) {
	    if (r) { 
			 $.ajax({
			       url: "../taskTransferInfo/dealTransferTask",
			       type: "POST",
			       data: {
			    	   jsonStrs: jsonStrs,
			    	   userAccount: $("#targetUser").combobox('getValue'),
					   userName: $("#targetUser").combobox('getText'),
					   reasonCode:$("#transferReason").combobox('getValue'),
					   reasonDesc:$("#transferReason").combobox('getText'),
					   remark:$("#remark").textbox('getValue')
			       },
			       success: function(data, status) {
			    		 if(data!=''&&data.code=="0000"){
			    	    	loadData(1,10);
			    	    	$('#addTransferTaskDialog').dialog('close');
			    	    	$('#remark').textbox('setValue','');
			    	    	var reasonS = $('#transferReason').combobox('getData');
			    	    	$("#transferReason").combobox('select',reasonS[0].value);
			 				$.messager.alert('提示', "案件转件成功!", "info");	
			 				
			 			}else {
			 				$.messager.alert('错误', "案件转件失败,msg："+data.msg, "error");
			 			}
			 		},
			 		error : function(status) {
			 			// alert(status.status);
			 			$.messager.alert('错误', "案件转件失败!", "error");
			 		}
			      });
	    }
	 });
	}
}


