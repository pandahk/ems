$(function(){
    findPhoneCheckNameList();
    loadImageCheckResult();
    findApprovalCheckResult();
    findFirstApprProduct();
    findFinaltApprProduct();
    findTaskTransferHistory();
    findReconsiderationList();
})

function findFirstApprProduct(){
    $('#apply_first_check_result').panel({
        href:basepath+"/caseManagementAppr/findFirstApprProduct?applyCode="+ $("#apply_code").val(),
    });
}
function findFinaltApprProduct(){
    $('#apply_final_check_result').panel({
        href:basepath+"/caseManagementAppr/findFinaltApprProduct?applyCode="+ $("#apply_code").val(),
    });
}

function findApprovalCheckResult(){
    $("#approval_check_result_list").datagrid({
        url: basepath + "/caseManagementAppr/approvalCheckResultAppr?applyCode="+$("#apply_code").val(),
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
            {field:'refuseInfoStr',title:'拒绝/回退/取消原因',width:150,
                formatter:function(value,row,index){
                    if(row.refuseInfoStr != null && row.refuseInfoStr != "") {
                        return row.refuseInfoStr;
                    }else if(row.backReasonStr && row.backReasonStr != "") {
                        return row.backReasonStr;
                    } else if(row.cancelInfoName != "") {
                        return row.cancelInfoName;
                    } else {
                        return "";
                    }
                }},
//          {field:'approvedProductStr',title:'拟批核产品',width:200},
            {field:'opinion',title:'审批意见',width:350},
            {field:'backInfo',title:'回退告知内容',width:350},
            {field:'createdTimeStr',title:'提交时间',width:160},
            {field:'createdUserName',title:'操作人',width:60},
        ]],
        singleSelect:true
    })
}


function findPhoneCheckNameList() {
    var applyCode = $("#apply_code").val();
    $.ajax({
        url : basepath + '/phoneCheck/findPhoneCheckNameList?applyCode='+applyCode,
        dataType : 'json',
        type : 'get',
        success : function(data) {
            if(data == undefined || data == null || data.length == 0) {
                $("#phone_check_tab").html("当前没有电核历史");
                return;
            }
            $("#phone_check_tab").tabs();

            $.each(data,function(i,value){
                $("#phone_check_tab").tabs('add',{
                    title : function(){
                        if(value.name == ''){
                            return value.relation;
                        }else{
                            return value.relation + "-" + value.name;
                        }
                    },
                    href : basepath + '/phoneCheck/findPhoneCheckListByParam?applyCode='+applyCode+"&name="+value.name + "&relation=" + value.relation,
                });
            })
        }
    })
}

function loadImageCheckResult(applyCode){
    var applyCode = $("#apply_code").val();
    $.ajax({
        url: "../caseManagementAppr/findImageCheckRecordAppr",
        type: "POST",
        data: {
            applyCode:applyCode
        },
        success: function(data, status) {
            if(data){
                $('#imageCheckRecordList').datagrid('loadData',data);
                $('#imageCheckRecordList').datagrid('loaded');
            }
        }
    });
}
function findTaskTransferHistory(){
	$("#taskTransferInfoList").datagrid({
        url: basepath + "/taskTransferInfo/findTransferedTaskList?applyCode="+$("#apply_code").val(),
        nowrap : false,
        columns:[[
            {field:'taskCurrentPeriodName',title:'审批节点',width:180},
            {field:'originUserName',title:'原审批员',width:180},
            {field:'targetUserName',title:'现审批员',width:180},
            {field:'reasonDesc',title:'转件原因',width:180},
            {field:'remark',title:'转件备注',width:350},
            {field:'taskTransferTime',title:'转件时间',width:180},
            {field:'createdUserName',title:'转件操作人',width:180}
        ]],
        singleSelect:true
    })
}

function findReconsiderationList() {
	$("#reconsiderationList").datagrid(
			{
				url : basepath
						+ "/reconsideration/queryReconsiderHis?applyCode="
						+ $("#apply_code").val(),
				nowrap : false,
				columns : [ [ {
					field : 'apprCheckResultId',
					title : '复议类型',
					width : 180,
					formatter : function(value, row, index) {
						if (value) {
							return "提额复议";
						} else {
							return "拒绝复议";
						}
					}
				}, {
					field : 'createdTime',
					title : '复议时间',
					width : 180
				}, {
					field : 'remark',
					title : '复议备注',
					width : 350
				}, {
					field : 'createdUserName',
					title : '复议发起人',
					width : 180
				} ] ],
				singleSelect : true
			})
}
function formatValue(val,row){
    if(val=='INVALID'){
        return '无效';
    }else if(val=='VALID'){
        return '有效';
    }else if(val=='NO_PROVIDE'){
        return '未提供';
    }else if(val=='FORGE'){
        return '伪造';
    }
}