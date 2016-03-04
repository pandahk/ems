function getSelected(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        //$.messager.alert('申请单号','申请单号'+ row.applyCode);
        //window.open(basepath+"/apply/applytask/takeTask?applyCode="+row.applyCode+"&taskDefKey="+row.taskDefKey);
        $.ajax({
            url: basepath+"/applytask/takeTask",
            type: "POST",
            data: {
                applyCode:row.applyCode,
                taskDefKey:row.taskDefKey
            },
            success: function(data, status) {
                //data = $.parseJSON(data);
                if(data.code === "0000"){
                	$.messager.alert('提示',"任务领取成功！","info");
                    location.reload();
                }
                else{
                    $.messager.alert('',data.msg);
                }
            }
        });
    }else{
        $.messager.alert('提示','请选择任务');
    }
}

function taskNameStyle(value, row, index) {
	if (row.taskDefKey == "finalReturnTask" || row.taskDefKey == "verifyReturnTask") {
		return "color:red;";
	}
}