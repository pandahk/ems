$(function(){
    $("#applyContactsTableId").datagrid({
        url: basepath + "/caseInfo/getApplyContacts?applyCode="+$("#applyNo").val(),
        columns:[[
            {field:'id',title:'编号',width:80,
                formatter:function(value,row,index){
                    return index + 1;
                }},
            {field:'contactName',title:'姓名',width:100},
            {field:'mobileNo',title:'联系电话',width:250},
            {field:'relation',title:'关系',width:175,
                formatter:function(value,row,index){
                    return getNameByDictCode(value);
                }},
            {field:'descrption',title:'备注',width:600}
        ]],
        singleSelect:true
    });
});

function getNameByDictCode(code) {
	var display ='';
    $.ajax({
        url : basepath + '/dict/findOptionitemByCode?code='+code,
        dataType : 'json',
        type : 'get',
        async : false,
        success : function(data) {
            if(data != undefined && data.itemNameZh != "") {
            	display = data.itemNameZh;
            }
        }
    });
    return display;
}
