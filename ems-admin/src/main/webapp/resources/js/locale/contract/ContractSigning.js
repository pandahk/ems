$(function(){ 
	//页面加载时暂时关闭拒绝原因弹出框
	 $('#showRjRemark').window('close');
	 var status = $("#status").val();
	 if(status==""){
		 $('#contractPrint').linkbutton('disable');    //禁用按钮
		 $('#repaymentPrint').linkbutton('disable');    //禁用按钮
		 $('#pass').linkbutton('disable');    //禁用按钮
	 }
	 if($("#flag").val()=="0"||$("#flag").val()==null||$("#flag").val()==""){
		$("#flag").val("0");
	 }else{
		$("#flag").attr("checked","checked");
		$("#flag").val("1");
	 }
	 //日期只能选择今天或之后的
	 $('#loanDate').datebox().datebox('calendar').calendar({
			validator: function(date){
				var now = new Date();
				var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				var d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate()+10);
				return d1<=date;
			}
		});
	 
	 $('#refuse1').combotree({
		 onSelect : function(node) {
			var tree = $(this).tree;
            //选中的节点是否为叶子节点,如果不是叶子节点,清除选中
            var isLeaf = tree('isLeaf', node.target);
            if (!isLeaf) {
                //清除选中
                $('#refuse1').combotree('clear');
            }
		 }
	 });
});

function whichButton(e){
	//屏蔽键盘组合键（防止复制粘贴卡号）
	//alert(event.ctrlKey);
	e = window.event || e;  
    var keycode = e.keyCode || e.which;  
    if(e.ctrlKey || e.altKey || e.shiftKey  
        || keycode >= 112 && keycode <= 123 ){  
        if(window.event){// ie  
            try{e.keyCode = 0;}catch(e){}  
            e.returnValue = false;  
        }else{// ff  
            e.preventDefault();
        }  
    }
}

var otherContractsCount=0;
function isIe(){
	   return ("ActiveXObject" in window);
}
function isFF(){
	return navigator.userAgent.indexOf("Firefox")!=-1;
}

function isChrome(){
	return navigator.userAgent.indexOf("Chrome") > -1;
}
//复选框若勾选，‘扣款银行名称’，‘扣款银行账号’，‘扣款银行开户行’自动显示，并且和放款银行信息相同。
function isShowBank(){
	if($('#flag').is(':checked')){
//		$("#repayCardNo").attr("value",$('#loanCardNo').val());
//		$("#reRepayCardNo").attr("value",$('#reLoanCardNo').val());
		$("#repayBankCode").combobox("setValue",$("#loanBankCode").combobox('getValue'));
//    	$("#repayBankName").attr("value",$("#loanBankName").val());
//		$("#repayBankAddress").attr("value",$('#loanBankAddress').val());
		document.getElementById("repayCardNo").value=document.getElementById("loanCardNo").value;
		document.getElementById("reRepayCardNo").value=document.getElementById("reLoanCardNo").value;
		document.getElementById("repayBankName").value=document.getElementById("loanBankName").value;
		document.getElementById("repayBankAddress").value=document.getElementById("loanBankAddress").value;
	}else{
//		$("#repayCardNo").attr("value","");
//		$("#reRepayCardNo").attr("value","");
		$("#repayBankCode").combobox("setValue","");
//		$("#repayBankName").attr("value"," ");
//		$("#repayBankAddress").attr("value","");
		document.getElementById("repayCardNo").value="";
		document.getElementById("reRepayCardNo").value="";
		document.getElementById("repayBankName").value="";
		document.getElementById("repayBankAddress").value="";
	}
}

$('#fundChannelCode').combobox({
    valueField: 'value',
    textField: 'text',
    onSelect: function(rec){
    	showAmount();
	}
});

//计算合同金额
function showAmount(){
	if($.trim($('#applyAmount').val())==""){
		$.messager.alert('错误',"期望金额不能为空！");
		return false;
	}
	if($.trim($('#applyAmount').val())<=100){            
		$.messager.alert('错误',"期望金额必须大于100！");
		return false;
	}
	var amountCheck=/^[0-9]*(\.[0-9]{1,2})?$/;
	if(!amountCheck.test($('#applyAmount').val())){
		$.messager.alert('错误',"期望金额格式错误！");
		$("#applyAmount").val("");
		return false;
	}
	if(Number($('#applyAmount').val())>Number($("#loanAmount").val())){
		$.messager.alert('错误',"期望金额只能改小，修改的金额不能超过‘审批金额’！");
		return false;
	}
	var applyAmount = $('#applyAmount').val();//期望金额
	var contractPeriod = $('#contractPeriod').val();//签约期限
	var appylProductNo = $('#appylProductNo').val();//产品号
	var contractNo = $('#contractNo').val();//合同号
	var applyNo = $('#applyCode').val();//申请单号
//	var fundChannelCode = $('#fundChannelCode').val();//渠道
	var fundChannelCode = $('#fundChannelCode').combobox('getValue');
	var loanDate = $('#loanDate').datebox("getValue");//放款日期
	 $.ajax({
  		url: "../contract/showAmount",
  		type: "POST",
  		data: {    	 		        	  
  			applyAmount: applyAmount,
  			contractPeriod: contractPeriod,
  			appylProductNo: appylProductNo,
  			contractNo: contractNo,
  			applyNo:applyNo,
  			fundChannelCode:fundChannelCode,
  			loanDate:loanDate
  		      },
  		success: function(data, status) {
	    	var dataObj=eval("("+data+")");
	    	if(dataObj.msg=='success'){
	    		$("#contractAmount").attr("value",dataObj.contractAmount);
	    		$("#netAmount").attr("value",dataObj.netAmount);
	    	}else{
	    		//$.messager.alert('错误',"计算失败!");
	    	}
  		},
  		error: function(status) {
        	$.messager.alert('错误',"计算失败！");
  		}
   });
}

//计算资金渠道
//function showFundChannel(contractPeriod,contractNo){
//	var applyNo = $('#applyCode').val();//申请单号
//	 $.ajax({
//  		url: "../contract/showFundChannel",
//  		type: "POST",
//  		data: {    	 		        	  
//  			contractNo: contractNo,
//  			applyNo:applyNo,
//  			contractPeriod: contractPeriod
//  		      },
//  		success: function(data, status) {
//	    	var dataObj=eval("("+data+")");
//	    	if(dataObj.msg=='success'){
//	    		$("#fundChannel").attr("value",dataObj.code);
//	    		$("#fundChannelName").attr("value",dataObj.name);
//	    	}else{
//	    		//$.messager.alert('错误',"计算失败!");
//	    	}
//  		},
//  		error: function(status) {
////  		        	$.messager.alert('错误',"计算失败！");
//  		}
//   });
//}

//保存
function save(){
	//保存前获取最佳资金渠道
	if($.trim($('#applyAmount').val())==""){                  
		$.messager.alert('错误',"期望金额不能为空！");
		return false;
	}
	if($.trim($('#applyAmount').val())<=100){
		$.messager.alert('错误',"期望金额必须大于100！");
		return false;
	}
	var amountCheck=/^[0-9]*(\.[0-9]{1,2})?$/;
	if(!amountCheck.test($('#applyAmount').val())){
		$.messager.alert('错误',"期望金额格式错误！");
		$("#applyAmount").val("");
		return false;
	}
	if(Number($('#applyAmount').val())>Number($("#loanAmount").val())){
		$.messager.alert('错误',"期望金额只能改小，修改的金额不能超过‘审批金额’！");
		return false;
	}
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
	$("#fundChannelName").attr("value",$("#fundChannelCode").combobox('getText'));
	
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
//	    		$('#contractPrint').linkbutton('enable');    //启用按钮
//	    		$('#repaymentPrint').linkbutton('enable');    //启用按钮
//	    		$('#pass').linkbutton('enable');    //启用按钮
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

function nopass(){
	//弹出拒绝原因提示
    $('#showRjRemark').window('open');
}

//拒绝
function rjOk(){
	if($.trim($("#refuse1").combobox('getValue'))==""){
    	$.messager.alert('提示',"拒绝原因不能为空！");
		return false;
    }
	var t = $("#refuse1").combotree('tree'); // 得到树对象  
    var n = t.tree('getSelected'); // 得到选择的节点  
    var refuseValue= n.text;
	if($("#refuse1").combobox('getValue')=="SR1201"&&$.trim($('#remark1').val())==""){
		$.messager.alert('提示',"当拒绝原因选择其它时，则拒绝情况描述必须填写！");
		return false;
	}
	if($.trim($('#remark1').val()).length>100){
		$.messager.alert('提示',"拒绝原因情况描述必须在100字以内！");
		return false;
	}
	$.ajax({
       url: "../contract/nopass",
       type: "POST",
       data: {
    	  applyNo:$("#applyCode").val(),
    	  reasonId: $("#reasonId").val(),
    	  refuse1:  $("#refuse1").combobox("getValue"),//一级原因
    	  refuseName1:  $("#refuse1").combobox("getText"),//一级原因
    	  remark: $("#remark1").val()
       },
       success: function(data, status) {
    	   if(data=='success'){
	    	   $.messager.alert('提示',"录入拒绝信息成功!");
	    	   colseCurTab();//关闭tab
	    	}else{
	    		$.messager.alert('错误',"录入拒绝信息失败!");
	    	}
    	  $('#showRjRemark').window('close');
       	 }
    });
}

//签约取消
function signCancel(){
	//弹出取消原因提示
    $('#showCancelRemark').window('open');
}

//签约取消
function cancelOk(){
	var refuse3 = $("#refuse3").combobox('getText');
	if(refuse3==""){
    	$.messager.alert('提示',"取消原因不能为空！");
		return false;
    }
	if($("#refuse3").combobox('getValue')=="117"&&$.trim($.trim($('#remark2').val()))==""){
		$.messager.alert('提示',"当取消原因选择其它时，则取消情况描述必须填写！");
		return false;
	}
	if($.trim($('#remark2').val()).length>100){
		$.messager.alert('提示',"取消原因情况描述必须在100字以内！");
		return false;
	}
	$.ajax({
       url: "../contract/signCancel",
       type: "POST",
       data: {
    	 applyNo:$("#applyCode").val(),
    	   reasonId: $("#reasonId").val(),
    	   refuse1: $("#refuse3").combobox('getValue'),//一级原因
		   refuseName1: $("#refuse3").combobox('getText'),//一级原因
    	   remark: $('#remark2').val()
       },
       success: function(data, status) {
    	   	if(data=='success'){
	    	   $.messager.alert('提示',"签约取消录入信息成功！");
	    	   colseCurTab();//关闭tab
	    	}else{
	    		$.messager.alert('错误',"签约取消录入信息失败！");
	    	}
    	   	$('#showCancelRemark').window('close');
       	 }
    });
}


//合同打印预览
function contractPrint(){
	window.open("../contract/contractPrint?applyNo="+$("#applyNo").val());
}

//还款计划打印预览
function repaymentPrint(){
	window.open("../contract/repayPlan?applyNo="+$("#applyNo").val());
}

//影像上传
function showFile(){
	if ($('#videoFile').tabs('exists', "影像文件材料")){
        $('#videoFile').tabs('select', "影像文件材料");
    } else {
    	//弹出影像资料文件Tab
		$('#videoFile').tabs('add',{
			title: '影像文件材料',
			content: '<iframe width="100%" scrolling="auto" height="1030" src="'+fileSystem+'/image/uploadview?applyCode='+$("#applyCode").val()+'&product='+$("#appylProductNo_send").val()+'&period=uploadContractTask"></iframe>',
			closable: true
		});
    }
}

//影像查看
function showViewFile(){
	if ($('#videoFile').tabs('exists', "查看影像文件材料")){
        $('#videoFile').tabs('select', "查看影像文件材料");
    } else {
    	//弹出影像资料文件Tab
		$('#videoFile').tabs('add',{
			title: '查看影像文件材料',
			content: '<iframe width="100%" scrolling="auto" height="1030" src="'+fileSystem+'/image/caseImageCheck?applyCode='+$("#applyCode").val()+'&product='+$("#appylProductNo_send").val()+'&period=uploadContractTask"></iframe>',
			closable: true
		});
    }
}

//签约未上传
function signPass(){
	var falge = $.messager.confirm('提示','确认签约合同？',function(isOk){
	    if (isOk){
	    	if($.trim($('#applyAmount').val())==""){
        		$.messager.alert('错误',"期望金额不能为空！" 	);
        		return false;
        	}
        	var amountCheck=/^[0-9]*(\.[0-9]{1,2})?$/;
        	if(!amountCheck.test($('#applyAmount').val())){
        		$.messager.alert('错误',"期望金额格式错误！");
        		$("#applyAmount").val("");
        		return false;
        	}
        	if(Number($('#applyAmount').val())>Number($("#loanAmount").val())){
        		$.messager.alert('错误',"期望金额只能改小，修改的金额不能超过‘审批金额’！");
        		return false;
        	}
        	var contractNo = $('#contractNo').val();//合同号
        	var applyAmount = $('#applyAmount').val();//期望金额
        	var netAmount = $('#netAmount').val();//到手金额
        	var contractAmount = $('#contractAmount').val();//签约金额
        	var contractPeriod = $('#contractPeriod').val();//借款期限
        	var appylProductNo = $('#appylProductNo').val();//产品
        	var fundChannelCode = $('#fundChannelCode').combobox('getValue');//渠道
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
        	var name = $('#name').val();//客户姓名
        	var idCardNo = $('#idCardNo').val();//证件号
        	var loanPurpose = $('#loanPurpose').val();//借款用途
        	var fundChannelName = $('#fundChannelCode').combobox('getText');//渠道名称
        	var flag = $('#flag').val();//同放款信息
        	var applyNo = $('#applyCode').val();//申请单号
        	$("#loanBankName").attr("value",$("#loanBankCode").combobox('getText'));
        	$("#repayBankName").attr("value",$("#repayBankCode").combobox('getText'));
        	var loanBankName = $("#loanBankName").val();
        	var repayBankName = $("#repayBankName").val();
        	if($.trim(loanBankName)==""||$.trim(loanCardNo)==""
        		||$.trim(reLoanCardNo)==""||$.trim(loanBankAddress)==""
        		||$.trim(repayBankName)==""||$.trim(repayCardNo)==""
        		||$.trim(reRepayCardNo)==""||$.trim(repayBankAddress)==""||$.trim(loanDate)==""){
        		 $.messager.alert('提示',"银行账户信息未填写完全，请填写完毕后，再进行保存操作！");
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
    		if($.trim(loanBankAddress).indexOf($.trim($("#loanBankCode").combobox('getText'))) == -1 ){
        		$.messager.alert('提示',"放款银行开户行信息必须包括放款银行名称，请检查后再进行保存操作！");
        		return false;
        	}
        	if($.trim(repayBankAddress).indexOf($.trim($("#repayBankCode").combobox('getText'))) == -1  ){
        		$.messager.alert('提示',"扣款银行开户行信息必须包括扣款银行名称，请检查后再进行保存操作！");
        		return false;
        	}
        	if(!checkConSignContracts()){
        		return false;
        	}
        	 $.messager.progress({msg:'正在签约中,请稍后......'});
        	 $.ajax({
     	  		url: "../contract/pass",
     	  		type: "POST",
     	  		data: {    	 		        	  
     	  			contractNo: contractNo,
     	  			applyAmount: applyAmount,
     	  			contractPeriod: contractPeriod,
     	  			contractAmount:contractAmount,
     	  			netAmount:netAmount,
     	  			appylProductNo: appylProductNo,
     	  			fundChannelCode:fundChannelCode,
     	  			fundChannelName:fundChannelName,
     	  			flag:flag,
     	  			applyNo:applyNo,
     	  			loanCardNo: loanCardNo,
     	  			loanBankCode: loanBankCode,
     	  			loanBankAddress: loanBankAddress,
     	  			repayBankCode:repayBankCode,
     	  			repayCardNo: repayCardNo,
     	  			repayBankAddress: repayBankAddress,
     	  			loanDate: loanDate,
     	  			loanBankName: loanBankName,
     	  			repayBankName:repayBankName,
     	  			idCardNo:idCardNo,
     	  			name:name,
     	  			loanPurpose:loanPurpose
     	  		      },
     	  		success: function(data, status) {
	  		    	$.messager.progress('close');
	  		    	var code=data.code;
	  		    	var msg=data.msg;
	                if(code == "success"){
	                    $.messager.alert('提示',msg);
	                    colseCurTab();//关闭tab
	                }else{
	                	$.messager.alert('错误',msg);
	                }
     	  		},
     	  		error: function(status) {
 		        	$.messager.progress('close');
 		        	$.messager.alert('错误',"签约失败！");
     	  		}
     	   });
	    }
	});
}

//提交
function signPassFile(){
	if(!checkConSignContracts()){
		return false;
	}
	$.messager.confirm('提示','确认提交?',function(isOk){
	    if (isOk){
	    	var contractNo = $('#contractNo').val();//合同号
        	var appylProductNo = $('#appylProductNo').val();//产品
        	var applyNo = $('#applyCode').val();//申请单号
        	 $.messager.progress({msg:'正在提交中,请稍后......'});
        	 $.ajax({
     	  		url: "../contract/passFile",
     	  		type: "POST",
     	  		data: {    	 		        	  
     	  			contractNo: contractNo,
     	  			appylProductNo: appylProductNo,
     	  			applyNo:applyNo
     	  		      },
     	  		success: function(data, status) {
	  		    	$.messager.progress('close');
	  		    	var code=data.code;
	  		    	var msg=data.msg;
	                if(code == "success"){
	                    $.messager.alert('提示',msg);
	                    colseCurTab();//关闭tab
	                }else{
	                	$.messager.alert('错误',msg);
	                }
     	  		},
     	  		error: function(status) {
 		        	$.messager.progress('close');
 		        	$.messager.alert('错误',"提交失败！");
     	  		}
     	   });
	    }
	});

}