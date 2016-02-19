$(function(){
    $("#approval_check_result_list").datagrid({
        url: basepath + "/caseInfo/findApprovalListByApplyCodeForBranch?applyCode="+$("#check_result_list_apply_code").val(),
        columns:[[
            {field:'periodName',title:'节点',width:80},
            {field:'checkResultEnum',title:'审批结果',width:100},
            {field:'refuseInfoStr',title:'拒绝/回退原因',width:650,
                formatter:function(value,row,index){
                    str = '';
                    if(row.backReason != null && row.backReason != "" ) {
                        if(row.backInfo != null && row.backInfo != ""){
                            str = row.backReasonStr + ":" + row.backInfo;
                        }
                    }else {
                        str = row.firstReason;
                    }
                    return str;
                }},
            {field:'createdTimeStr',title:'提交时间',width:125},
        ]],
        singleSelect:true
    })
})