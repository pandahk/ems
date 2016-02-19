$("#saveRefuse").click(function(){
	 var timestamp = Date.parse(new Date());
	 $.ajax({
			url : "../apply/selectApplyRefuseCancel?timestamp="+timestamp,
			type : "POST",
			data : {
				applyCode : $('#applyCode').val(),
				type : $('#type1').val()
			},
			success : function(data, status) {
				if (data) {
				  $("#refuseSubReason").combotree('setValue',data.subReason);
				  $("#remark1").textbox('setValue',data.remark);
				}
			}
	 });
      $("#addRefuseApplyDialog").css("display", "block").dialog({
			title:"拒绝申请",
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
					submitRefuseForm();		 					
				}
			},{
				text:'关闭',
				iconCls:'icon-cancel',
				handler:function(){
				$('#addRefuseApplyDialog').dialog('close');
			}
			}
			]
		});		     
		 $("#addRefuseApplyDialog").dialog('open');
		 getRefuseReason('refuseSubReason'); 
		
    });
function submitRefuseForm(){
			$("#currentTaskPeriod1").val(currentTaskPeriod);
	        $('#saveRefuseApplyForm').form('submit', {
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
						$.messager.alert('提示','保存拒绝申请信息成功','info',function(){
							colseCurTab();
						});
			    	}else{
			    		$.messager.alert('错误',"保存拒绝申请信息失败!","error");
			    	}  	  
			    },
		        error: function(status) {
		           	//alert(status.status);
		        	$.messager.progress('close');
		            $.messager.alert('错误',"保存拒绝申请信息失败！", "error");
		         }
			});	      
        }
function getRefuseReason(divId) {
    $('#'+divId).combotree( {
        //获取数据URL
        url : basepath+'/dict/findDictTree?appId=APPROVE&parentCode=900&status=1',
        required: true,
        //选择树节点触发事件
        onSelect : function(node) {
            //返回树对象
            var tree = $(this).tree;
            //选中的节点是否为叶子节点,如果不是叶子节点,清除选中
            var isLeaf = tree('isLeaf', node.target);
            if (!isLeaf) {
                //清除选中
                $('#'+divId).combotree('clear');
            }
        }
    });
}