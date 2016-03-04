//影像上传保存银行卡信息
function saveBankCardInfo(){
	var contractPeriod = $('#contractPeriod').val();//签约期限
	var contractNo = $('#contractNo').val();//合同号
	//保存合同
	var loanCardNo = $('#loanCardNo').val();//放款银行账号
	var reLoanCardNo = $('#reLoanCardNo').val();//再次输入银行账号
	var loanBankCode =$("#loanBankCode").combobox('getValue');
	var loanCardNo = $('#loanCardNo').val();//放款银行账号
	var reLoanCardNo = $('#reLoanCardNo').val();//再次输入银行账号
	var loanBankAddress = $('#loanBankAddress').val();//放款银行开户行
	var repayBankCode = $("#repayBankCode").combobox('getValue');
	var repayCardNo = $('#repayCardNo').val();//扣款银行账号
	var reRepayCardNo = $('#reRepayCardNo').val();//再次输入扣款银行账号
	var repayBankAddress = $('#repayBankAddress').val();//扣款银行开户行
	var loanDate = $('#loanDate').datebox("getValue");//扣款银行开户行
	if($.trim(loanBankName)==""||$.trim(loanCardNo)==""
		||$.trim(reLoanCardNo)==""||$.trim(loanBankAddress)==""
		||$.trim(repayBankName)==""||$.trim(repayCardNo)==""
		||$.trim(reRepayCardNo)==""||$.trim(repayBankAddress)==""||$.trim(loanDate)==""){
		 $.messager.alert('提示',"银行账户信息未填写完全，请填写完毕后，再进行保存操作！");
		 return false;
	}
	var isLoanCarNo = isNaN($('#loanCardNo').val());
	var isReLoanCardNo = isNaN($('#reLoanCardNo').val());
	var isRepayCardNo = isNaN($('#repayCardNo').val());
	var isReRepayCardNo = isNaN($('#reRepayCardNo').val());
	//校验是否存在特殊字符
	if(isLoanCarNo){
		$.messager.alert('提示',"放款银行账号存在特殊字符，请修改后保存操作！");
		return false;
	}
	if(isReLoanCardNo){
		$.messager.alert('提示',"再次输入放款银行账号存在特殊字符，请修改后保存操作！");
		return false;
	}
	if(isRepayCardNo){
		$.messager.alert('提示',"扣款银行账号存在特殊字符，请修改后保存操作！");
		return false;
	}
	if(isReRepayCardNo){
		$.messager.alert('提示',"扣款银行账号存在特殊字符，请修改后保存操作！");
		return false;
	}
	//校验银行账号是否正确
	var reg = /^\d{16}|\d{19}$/; // 以19位数字开头，以19位数字结尾 
	if(!reg.test(loanCardNo)||loanCardNo.length>20){
		$.messager.alert('提示',"放款银行账号格式不对，请修改后保存操作！");
		return false;
	}
	if(!reg.test(reLoanCardNo)||reLoanCardNo.length>20){
		$.messager.alert('提示',"再次输入放款银行账号格式不对，请修改后保存操作！");
		return false;
	}
	if(!reg.test(repayCardNo)||repayCardNo.length>20){
		$.messager.alert('提示',"扣款银行账号格式不对，请修改后保存操作！");
		return false;
	}
	if(!reg.test(reRepayCardNo)||reRepayCardNo.length>20){
		$.messager.alert('提示',"再次输入扣款银行账号格式不对，请修改后保存操作！");
		return false;
	}
	if($.trim(loanCardNo)!=$.trim(reLoanCardNo)){
		$.messager.alert('提示',"两次填写放款银行账户不一致，请检查后再进行保存操作！");
		return false;
	}
	if($.trim(repayCardNo)!=$.trim(reRepayCardNo)){
		$.messager.alert('提示',"两次填写扣款银行账户不一致，请检查后再进行保存操作！");
		return false;
	}
	$("#loanBankName").attr("value",$("#loanBankCode").combobox('getText'));
	$("#repayBankName").attr("value",$("#repayBankCode").combobox('getText'));
	if($.trim(loanBankAddress).indexOf($.trim($("#loanBankCode").combobox('getText'))) == -1 ){
		$.messager.alert('提示',"放款银行开户行信息必须包括放款银行名称，请检查后再进行保存操作！");
		return false;
	}
	if($.trim(repayBankAddress).indexOf($.trim($("#repayBankCode").combobox('getText'))) == -1 ){
		$.messager.alert('提示',"扣款银行开户行信息必须包括扣款银行名称，请检查后再进行保存操作！");
		return false;
	}
	
	if(!checkConSignContracts()){
		return false;
	}
	
    $('#saveContractSigningForm').form('submit', {
		onSubmit: function(){
			  $.messager.progress({msg:'正在保存中,请稍后......'}); 					   
		},
	    success: function(data,status){
	    	$.messager.progress('close');
	    	var source = JSON.parse(data);
	    	if(source.code=='success'){
				window.location.reload();
	    	}else{
	    		$.messager.alert('错误',source.msg);
	    	}
	    },
        error: function(status) {
        	$.messager.progress('close');
            $.messager.alert('错误',"合同录入信息失败！");
         }
	});
}
