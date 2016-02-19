$(function(){
    var applyCode = $("#applyCode").val();
    var product = $("#product").val();
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
    $('#firstCheckRecordList').panel({
        href:basepath+"/finalAppr/findFirstApprSummary?applyCode="+applyCode,
    });
    
    var tab = $('#finalappr_tabs').tabs('getTab',1);  // get selected panel
    $('#finalappr_tabs').tabs('update', {
        tab: tab,
        options: {
            href: basepath+"/image/approvalCheck?period=finalVerifyTask&applyCode="+applyCode+"&product="+product,  // the new content URL
        }
    });
	$("#backReason").combobox({
		 onChange:function(o){  
			 $("#back_reason_name").val($("option[value='"+o+"']").text());
         }
	});
	setInputNameValue("backReason");
	setInputNameValue("cancelInfo");
    getRefuseReason('refuse_reason1',true);
    getRefuseReason('refuse_reason2',false);
    getRefuseReason('refuse_reason3',false);
    getProduct();
    getRefuseReason('public_number',false);
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

function saveFinalApply(){
	$("input[name='applyBalance.monthlyOtherIncome']").val($("input[name='applyBalance.monthlyOtherIncome']").val().replace(",",""));
	$("input[name='applyBalance.monthlySalary']").val($("input[name='applyBalance.monthlySalary']").val().replace(",",""));
	$("input[name='applyBalance.yearlyIncome']").val($("input[name='applyBalance.yearlyIncome']").val().replace(",",""));
	$("input[name='applyBalance.mateIncome']").val($("input[name='applyBalance.mateIncome']").val().replace(",",""));
	//console.log($("input[name='applyBalance.mateIncome']").val());
	//return false;
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
    $("#final_customer_info").ajaxSubmit({
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
function submitFinalApply() {
    if(!canSubmit) {
        return;
    }
    //if(!$('#final_customer_info').form('validate')){
    //	return;
    //}
    canSubmit = false;
//    $.each($("#final_customer_info").find(".easyui-validatebox"), function () {
//        if(!$(this).validatebox("validate")) {
//            $(this).focus();
//            return false;
//        }
//    })
//    if(!$('#final_customer_info').form('validate')){
//    	canSubmit=true;
//    	return ;
//    }
    if($.trim($("#finalappr_opinion").val())==""){
        alert("请输入总体意见");
        canSubmit=true;
        return;
    }
    var index = $('#first_appr_check_tab').tabs('getTabIndex', $('#first_appr_check_tab').tabs('getSelected'))+1;
    var actionType;
    switch (index){
        case 1:
            if( $.trim($("#finalappr_approved_product").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择批核产品大类");
                canSubmit=true;
                return;
            }
            if($.trim($("#finalappr_approved_product_detail").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择批核产品小类");
                canSubmit=true;
                return;
            }
            if($.trim($("#finalappr_approved_amount").val())=="") {
                $.messager.alert('提示',"请输入到手金额");
                canSubmit=true;
                return;
            }
            if($.trim($("#finalappr_loan_life").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择批核产品期数");
                canSubmit=true;
                return;
            }
            actionType = "ACCEPT";
            break;
        case 2:
            if($.trim($("#refuse_reason1").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择拒绝原因");
                canSubmit=true;
                return;
            }
            actionType = "REFUSE";
            break;
        case 3:
            if($.trim($("#backReason").combobox("getValue"))=="") {
                $.messager.alert('提示',"请选择回退原因");
                canSubmit=true;
                return;
            }
            if($.trim($("#backInfo").val())=="") {
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
    $("#final_appr_check_form").ajaxSubmit({
        url : basepath + '/finalAppr/invokeFirstApply',
        dataType : 'json',
        type : 'post',
        error : function() {
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

function getProduct() {
    $('#finalappr_approved_product').combobox({
        url: basepath + '/firstAppr/findBaseProduct',
        valueField:'code',
        textField:'name',
        onSelect:function(record) {
            $("#check_form_approved_product_name").val(record.name);
            $('#finalappr_approved_product_detail').combobox("setValue","");
            $('#finalappr_approved_product_detail').combobox("reload",basepath+"/firstAppr/findProductByCatgCode?code="+record.code);
        },
        onLoadSuccess: function () {
            if($("#finalappr_approved_product").attr("firstappr_value") != "") {
                $("#finalappr_approved_product").combobox("select",$("#finalappr_approved_product").attr("firstappr_value"));
            }
        }
    });

    $('#finalappr_approved_product_detail').combobox({
        valueField:'code',
        textField:'name',
        onSelect:function(record) {
            $("#check_form_approved_sub_product_name").val(record.name);
            var phaseArray = record.phase.split(",");
            var result = [];
            for(var i=0; i < phaseArray.length; i++) {
                result.push({"id":phaseArray[i],"text":phaseArray[i]+"期"});
            }
            $('#finalappr_loan_life').combobox("loadData",result);
            $('#finalappr_approved_amount').numberbox({
                min:record.minAmount,
                max:record.maxAmount
            });
        }
    });

    $('#finalappr_loan_life').combobox({
        valueField:'id',
        textField:'text',
    });
}
