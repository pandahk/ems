$(function(){
    $("#approval_check_result_list").datagrid({
        url: basepath + "/apply/inputCheckResults?applyCode="+$("#check_result_list_apply_code").val(),
        columns:[[
            {field:'periodName',title:'节点',width:80},
            {field:'checkResultEnum',title:'审批结果',width:100,styler:function(value,row,index){
            	if (row.checkResultType == "BACK") {
            		return "color:red;";
            	}
            }},
            {field:'refuseInfoStr',title:'回退原因',width:350,
                formatter:function(value,row,index){
                	str = '';
                    if(row.backReasonStr != null && row.backReasonStr != "") {
                    	str = row.backReasonStr;
                    }
                    if(row.backInfo != null && row.backInfo != ""){
                    	if(str != ''){
                    		str = str + ','
                    	}
                    	str = str + row.backInfo;
                    }
                    return str;
                }},
            {field:'createdTimeStr',title:'提交时间',width:125},
        ]],
        singleSelect:true
    })
})