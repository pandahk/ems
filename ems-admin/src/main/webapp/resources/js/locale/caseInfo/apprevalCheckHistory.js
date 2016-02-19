$(function(){
    $("#approval_check_result_list").datagrid({
        url: basepath + "/caseInfo/inputCheckHistoryResults?applyCode="+$("#check_result_list_apply_code").val(),
        columns:[[
            {field:'periodName',title:'节点',width:80},
            {field:'checkResultEnum',title:'审批结果',width:100,styler:function(value,row,index){
            	if (row.checkResultType == "BACK") {
            		return "color:red;";
            	}
            }},
            {field:'refuseInfoStr',title:'拒绝/回退原因',width:350,
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
                    if(row.refuseInfoStr != null && row.refuseInfoStr != ""){
                    	if(str != ''){
                    		str = str + ','
                    	}
                    	str = str + row.refuseInfoStr;
                    }
                    return str;
                }},
            {field:'opinion',title:'审批意见',width:350,
            	formatter:function(value,row,index){
            		//如果登錄用戶是初審身份 
            		if($("#check_role").val() =="firstVerifyTask" || $("#check_role").val() == "finalReturnTask"){
            			//过滤终审信息
            			if(row.period == "finalVerifyTask"){
            				return null;
            			}
            		}
                    return value;
                }},
            {field:'createdTimeStr',title:'提交时间',width:125},
            {field:'createdUserName',title:'提交人',width:80},
        ]],
        singleSelect:true
    })
})