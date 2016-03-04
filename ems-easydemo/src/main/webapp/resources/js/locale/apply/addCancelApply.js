$("#saveCancel").click(function(){
	 var timestamp = Date.parse(new Date());
		 $.ajax({
				url : "../apply/selectApplyRefuseCancel?timestamp="+timestamp,
				type : "POST",
				data : {
					applyCode : $('#applyCode').val(),
					type : $('#type2').val()
				},
				success : function(data, status) {
					if (data) {
					  $("#cancelReason").combobox('setValue',data.reason);
					  $("#remark2").textbox('setValue',data.remark);
					}
				}
		 });
      $("#addCancelApplyDialog").css("display", "block").dialog({
			title:"取消申请",
			width: 400,
			height: 240,
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
					submitCancelForm();		 					
				}
			},{
				text:'关闭',
				iconCls:'icon-cancel',
				handler:function(){
				$('#addCancelApplyDialog').dialog('close');
			}
			}
			]
		});		      
		 $("#addCancelApplyDialog").dialog('open');
		 
    });
function submitCancelForm(){
	        $("#currentTaskPeriod2").val(currentTaskPeriod);
	        $('#saveCancelApplyForm').form('submit', {
				onSubmit: function(){
					  $.messager.progress({msg:'正在保存中,请稍后......'}); 					   
					  if($(this).form('enableValidation').form('validate'))
					  {						
						return true;  
					  }else{
						 $.messager.progress('close');
						 return false; 
					  }
				},
			    success: function(data,status){ 
			    	$.messager.progress('close');
			    	if(data=='success'){
						$.messager.alert('提示','保存取消申请信息成功','info',function(){
							colseCurTab();
						});
			    	}else{
			    		$.messager.alert('错误',"保存取消申请信息失败!","error");
			    	}
			    },
		        error: function(status) {
		           	//alert(status.status);
		        	$.messager.progress('close');
		            $.messager.alert('错误',"保存取消申请信息失败！", "error");
		         }
			});	      
        }


