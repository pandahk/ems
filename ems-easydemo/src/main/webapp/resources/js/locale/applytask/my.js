function getSelected(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        //$.messager.alert('申请单号','申请单号'+ row.applyCode);
    	var len=row.applyCode.length;
        var tabName =  row.taskName+'-'+row.name+'('+(row.applyCode).substring(len-6,len)+')';
        var url = "";
        if('inputTask' === row.taskDefKey || 'inputCheckTask' === row.taskDefKey){
            url = basepath+"/apply/view?applyCode="+row.applyCode+"&period="+row.taskDefKey;
        }
        if('verifyReturnTask' === row.taskDefKey){
            url = basepath+"/apply/returnCase?applyCode="+row.applyCode+"&period="+row.taskDefKey;
        }
        if('firstVerifyTask' === row.taskDefKey || 'finalReturnTask' == row.taskDefKey){
            url = basepath+"/firstAppr/firstAppr?applyCode="+row.applyCode+"&period="+row.taskDefKey;
        }
        if('finalVerifyTask' === row.taskDefKey ){
            url = basepath+"/finalAppr/finalAppr?applyCode="+row.applyCode;
        }
        if('signContractTask' === row.taskDefKey ){
            url = basepath+"/contract/contractSigning?applyNo="+row.applyCode;
        }
        if('uploadContractTask' == row.taskDefKey){
        	url = basepath + "/contract/contractSigningFile?applyNo="+row.applyCode;
        }
        if(url !== ""){
            addTab(tabName,url);
        }
    }else{
        $.messager.alert('提示','请选择任务');
    }
}

function taskNameStyle(value, row, index) {
	if (row.taskDefKey == "finalReturnTask" || row.taskDefKey == "verifyReturnTask") {
		return "color:red;";
	}
}


function doSearch(){
	$('#dg').datagrid('load',{
		name: encodeURI($('#name').val())
	});
}