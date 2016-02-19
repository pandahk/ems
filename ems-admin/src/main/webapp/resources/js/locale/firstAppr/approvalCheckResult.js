$(function(){
	var apprPeriodInput = $("#apprPeriodInput");
	if(apprPeriodInput){
		var period = apprPeriodInput.val();// 获取节点Key
	}
	if(!period||$.trim(period)==null){// 若无法获取则当终审处理
		period = 'finalVerifyTask';
	}
    $("#approval_check_result_list").datagrid({
        url: basepath + "/firstAppr/approvalCheckResults?applyCode="+$("#check_result_list_apply_code").val()+"&period="+period,
        nowrap : false,
        columns:[[
            {field:'periodName',title:'节点',width:80,styler:function(value, row, index) {
            	if (row.period == "finalReturnTask" || row.period == "verifyReturnTask") {
            		return "color:red;";
            	}
            }},
            {field:'checkResultEnum',title:'审批结果',width:100,styler:function(value,row,index){
            	if (row.checkResultType == "BACK") {
            		return "color:red;";
            	}
            }},
            {field:'refuseInfoStr',title:'拒绝/回退原因',width:150,
                formatter:function(value,row,index){
                    if(row.refuseInfoStr != null && row.refuseInfoStr != "") {
                        return row.refuseInfoStr;
                    }else if(row.backReasonStr != "") {
                        return row.backReasonStr;
                    } else {
                        return "";
                    }
                }},
//          {field:'approvedProductStr',title:'拟批核产品',width:200},
            {field:'opinion',title:'审批意见',width:650},
            {field:'backInfo',title:'回退告知内容',width:350},
            {field:'createdTimeStr',title:'提交时间',width:160},
            {field:'createdUserName',title:'操作人',width:60},
        ]],
        singleSelect:true
    })
})