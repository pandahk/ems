$(function(){
    buildDg();
})

function buildDg(){
    $('#fundTransferListTable').datagrid({
        url: basepath + '/fundTransfer/findFundTransferList',
        columns:[[
            {field:'batchNo',title:'调拨单号',width:50},
            {field:'createdTime',title:'调拨生成时间',width:100,formatter:function(value,row,index){
                return defaultFormat(value);
            }},
            {field:'deductTime',title:'划扣时间',width:100,formatter:function(value,row,index){
                return defaultFormat(value);
            }},
            {field:'deductAmount',title:'划扣金额/元',width:100},
            {field:'status',title:'划扣状态',width:100,formatter: function (value,row,index) {
                if(value != '') {
                    return fundTransferTotalStatus(value);
                }
                return "";
            }},
            {field:'remark',title:'处理结果',width:100}
        ]]
    });
}

function reDeduct() {
    var row = $('#fundTransferListTable').datagrid('getSelected');
    if (row){
        if(row.status != '03') {
            $.messager.alert('提示','只有划扣失败的调拨单才可以手动划扣');
            return;
        }
        $.ajax({
            url : basepath + '/fundTransfer/reDeduct',
            type : 'post',
            dataType : 'json',
            data : {"batchNo":row.batchNo},
            success: function(data) {
                if(data != undefined && data.code == "0000") {
                    $('#fundTransferListTable').datagrid("reload");
                }else{
                    $.messager.alert('提示','划款失败，请稍后重试');
                }
            }
        })
    }else{
        $.messager.alert('提示','请选择调拨单');
    }
}