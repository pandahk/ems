$(function(){
    var applyCode = $("#applyCode").val();
    var product = $("#product").val();
    var period = $("#apprPeriodInput").val();
    $('#applyBaseInfo').panel({
        href:basepath+"/firstAppr/findCustomerBaseInfo?applyCode="+applyCode,
        onLoad:function(){
            $("#is_applyBaseInfo_success").val(1);
        }
    });
    $('#applyAssetsInfo').panel({
        href:basepath+"/firstAppr/findApplyAssetsInfo?applyCode="+applyCode,
        onLoad:function(){
            $("#is_applyAssets_success").val(1);
        }
    });
    $('#applyEmpInfo').panel({
        href:basepath+"/firstAppr/findCustomerEmpInfo?applyCode="+applyCode,
        onLoad:function(){
            $("#is_applyEmpInfo_success").val(1);
        }
    });
    $('#approvalCheckResult').panel({
        href:basepath+"/firstAppr/findApprovalCheckResult?applyCode="+applyCode,
        onLoad:function(){
        }
    });
    $('#applyInfo').panel({
        href:basepath+"/firstAppr/findApplyinfo?applyCode="+applyCode,
        onLoad:function(){
            $("#is_applyInfo_success").val(1);
        }
    });
    $('#applyContactInfo').panel({
        href:basepath+"/firstAppr/findApplyContacts?applyCode="+applyCode,
        onLoad:function(){
            $("#is_applyContactInfo_success").val(1);
        }
    });
    $('#applyInfoRemark').panel({
        href:basepath+"/firstAppr/findApplyInfoRemark?applyCode="+applyCode,
    });
    var tab = $('#tabsdiv').tabs('getTab',1);  // get selected panel
    $('#tabsdiv').tabs('update', {
        tab: tab,
        options: {
            href: basepath+"/image/approvalCheck?period="+period+"&applyCode="+applyCode+"&product="+product,  // the new content URL
        }
     });
	setInputNameValue("backReason");
	setInputNameValue("cancelInfo");
    getRefuseReason('refuse_reason1',true);
    getRefuseReason('refuse_reason2',false);
    getRefuseReason('refuse_reason3',false);
});
function setInputNameValue(name){
	$("#"+name).combobox({
		 onChange:function(o){  
			 $("#"+name+"_name").val($("option[value='"+o+"']").text());
        }
	});
}

function getRefuseReason(divId,isRequired) {
    $('#'+divId).combotree( {
        //获取数据URL
        url : basepath+'/dict/findDictTree?appId=APPROVE&parentCode=800&status=1',
        required: isRequired,
        //选择树节点触发事件
        onSelect : function(node) {
        	$('#'+divId+"_name").val(node.text);
            //返回树对象
            var tree = $(this).tree;
            //选中的节点是否为叶子节点,如果不是叶子节点,清除选中
            var isLeaf = tree('isLeaf', node.target);
            if (!isLeaf) {
                //清除选中
            	$('#'+divId+"_name").val('');
                $('#'+divId).combotree('clear');
            }
        }
    });
}

function saveFirstApply(){
    if($("#is_applyBaseInfo_success").val() != 1) {
        $.messager.alert('提示',"保存失败");
        return false;
    }
    if($("#is_applyEmpInfo_success").val() != 1) {
        $.messager.alert('提示',"保存失败");
        return false;
    }
    if($("#is_applyInfo_success").val() != 1) {
        $.messager.alert('提示',"保存失败");
        return false;
    }
    if($("#is_applyContactInfo_success").val() != 1) {
        $.messager.alert('提示',"保存失败");
        return false;
    }
    if($("#is_applyAssets_success").val() != 1) {
        $.messager.alert('提示',"保存失败");
        return false;
    }
    $("#first_customer_info").ajaxSubmit({
        url : basepath + '/firstAppr/saveFirstApply',
        dataType : 'json',
        type : 'post',
        success : function(data) {
            if(data.code == "0000") {
                window.location.reload();
            } else {
                $.messager.alert('提示',data.msg);
            }
        }
    })
}

var canSubmit=true;
function submitFirstApply() {
    if(!canSubmit) {
        return;
    }
    canSubmit = false;
    //if(!validVlaue()) {
    //    canSubmit=true;
    //    return;
    //}
//    var isValidate = true;
//    $.each($("#first_customer_info").find(".easyui-validatebox"), function () {
//        if(!$(this).validatebox("isValid")) {
//        	isValidate = false;
//        }
//    });
//    if(!isValidate) {
//    	canSubmit=true;
//    	return;
//    }
//    if(!$('#first_customer_info').form('validate')){
//    	canSubmit=true;
//    	return ;
//    }
    if($.trim($("#firstappr_opinion").val())==""){
        alert("请输入总体意见");
        canSubmit=true;
        return;
    }
    var index = $('#first_appr_check_tab').tabs('getTabIndex', $('#first_appr_check_tab').tabs('getSelected')) + 1;
    var actionType;
    switch (index){
        case 1:
            if($.trim($("#approved_product").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择拟批核产品");
                canSubmit=true;
                return;
            }
            actionType = "ACCEPT";
            break;
        case 2:
            if($.trim($("#refuse_reason1").combobox("getValue")) == "") {
                $.messager.alert('提示',"请选择拒绝原因");
                canSubmit=true;
                return;
            }
            actionType = "REFUSE";
            break;
        case 3:
            if($.trim($("#backReason").combobox("getValue")) =="") {
                $.messager.alert('提示',"请选择回退原因");
                canSubmit=true;
                return;
            }
            if($.trim($("#backInfo").val()) =="") {
                $.messager.alert('提示',"请输入回退告知内容");
                canSubmit=true;
                return;
            }
            actionType = "BACK";
            break;
        case 4:
            if($.trim($("#cancelInfo").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择取消原因");
                canSubmit=true;
                return;
            }
            actionType = "CANCEL";
            break;
           
    }
    $("#actionType").val(actionType);
    $("#first_appr_check_form").ajaxSubmit({
        url : basepath + '/firstAppr/invokeFirstApply',
        dataType : 'json',
        type : 'post',
        error : function(){
            canSubmit=true;
        },
        success : function(data) {
            canSubmit=true;
            if(data.code == "0000") {
                $.messager.alert('提交成功','提交成功','info',function(){
                    colseCurTab();
                });
            } else {
                $.messager.alert('提示',data.msg);
            }
        }
    })
}
function validVlaue(){
	var con=0;	
	var jobCompanyName0=$('#jobCompanyName0').val();
	var jobCompanyPhone0=$('#jobCompanyPhone0').val();
	var jobCertifyTitle0=$('#jobCertifyTitle0').val();
	var province0=$('#province0').combobox('getValue');
	var city0=$('#city0').combobox('getValue');
	var detailAdress0=$('#detailAdress0').val();
	var temp0=jobCompanyName0==''||jobCompanyPhone0==''||jobCertifyTitle0==''||province0==''||city0==''||detailAdress0=='';
	var province1=$('#province1').combobox('getValue');
	var city1=$('#city1').combobox('getValue');
	var detailAdress1=$('#detailAdress1').val();
	var temp1=province1==''||city1==''||detailAdress1=='';
    var tempOther=0;

	for(var i=0;i<otherContractsCount;i++){
		if($('#contactName'+(i+3)).val()!=''){
			con++;
		}
		if($('#jobCompanyName'+(i+3)).val()==''||$('#contactName'+(i+3)).val()==''||$('#mobileNo'+(i+3)).val()==''){
			tempOther++;
		}
	}
	
	if($('#contactName1').val()==''){
		$.messager.alert('提示','直系亲属联系人必须填写','info');
		return false;
	}else if($('#contactName2').val()==''){
		$.messager.alert('提示','工作证明人必须填写','info');
		return false;
	}else if($('#mobileNo1').val()==''){
		$.messager.alert('提示','直系亲属联系人手机号码必须填写','info');
		return false;
	}else if($('#mobileNo2').val()==''){
		$.messager.alert('提示','工作证明人手机号码必须填写','info');
		return false;
	}else if($('#jobCertifyTitle2').val()==''){
		$.messager.alert('提示','工作证明人的部门职务必须填写','info');
		return false;	
	}else if(temp1){
		$.messager.alert('提示','直系亲属的住址信息必须填写','info');
		return false;	
	}else if(con>=1&&tempOther>=1){
		$.messager.alert('提示','其他联系人的姓名,单位名称及手机号码信息必须填写','info');
		return false;	
	}else if($('#marriage').combobox('getText')!='已婚'&&$('#contactName0').val()!=''){
		$.messager.alert('提示','该客户不是已婚客户','info');
		return false;
	}else if($('#marriage').combobox('getText')=='已婚'&&$('#contactName0').val()==''){
		$.messager.alert('提示','配偶联系人必须填写','info');
		return false;
	}else if($('#marriage').combobox('getText')=='已婚'&&$('#mateIdCardNo').val()==''){					
		$.messager.alert('提示','配偶身份证信息必须填写','info');
		return false;
	}else if($('#marriage').combobox('getText')=='已婚'&&$('#mobileNo0').val()==''){					
		$.messager.alert('提示','配偶手机号信息必须填写','info');
		return false;
	}else if($('#marriage').combobox('getText')=='已婚'&&$("#isEmployed0").is(":checked")&&temp0){
		$.messager.alert('提示','配偶单位名称，单位电话，地址，职务必须填写','info');
		return false;
	}else if($('#marriage').combobox('getText')=='已婚'&&con<1){
		$.messager.alert('提示','联系人至少填写四个','info');
		return false;
	}else if($('#marriage').combobox('getText')!='已婚'&&con<2){
		$.messager.alert('提示','联系人至少填写四个','info');
		return false;	
	}else{
	    return true;
	}
}
