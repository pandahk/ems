function checkConSignContracts(){
	
	var recordCount =0;
	if($('input[name="contactName"]') != null && $('input[name="contactName"]') !=''){
		recordCount = $('input[name="contactName"]').length;
	}
	if(recordCount == 0 && $("#isHasConSignContracts").prop('checked') == false){
		$.messager.alert('提示',"请添加联系人！");
		return false;
	}
	if(recordCount > 0 && $("#isHasConSignContracts").prop('checked') == true){
		$.messager.alert('提示',"请删除联系人信息或者取消勾选客户无法提供联系人信息！");
		return false;
	}
	if($("#isHasConSignContracts").prop('checked') == true){
		var faceSignContactsRemark = $.trim($("#faceSignContactsRemark").val());
		if(faceSignContactsRemark == ''){
			$.messager.alert('提示',"请填写客户无法提供联系人-备注信息！");
			return false;
		}
	}
	
	var canSubmit=true;
	$('input[name="contactName"]').each(function() {
		if($.trim($(this).val())==''){
			$.messager.alert('提示',"联系人信息-姓名不能为空，请检查后再进行保存操作！");
			canSubmit=false;
		}
	});
	if(!canSubmit){
		return false;
	}
	
	$('input[name="mobileNo"]').each(function() {
		if($.trim($(this).val())==''){
			$.messager.alert('提示',"联系人信息-手机号码不能为空，请检查后再进行保存操作！");
			canSubmit=false;
		}
	});
	if(!canSubmit){
		return false;
	}
	
	$('input[name="contactsType"]').each(function() {
		if($.trim($(this).val())==''){
			$.messager.alert('提示',"联系人信息-关系不能为空，请检查后再进行保存操作！");
			canSubmit=false;
		}
	});
	if(!canSubmit){
		return false;
	}
	
	$('input[name="relation"]').each(function() {
		if($.trim($(this).val())==''){
			$.messager.alert('提示',"联系人信息-关系不能为空，请检查后再进行保存操作！");
			canSubmit=false;
		}
	});
	if(!canSubmit){
		return false;
	}
	return true;
}


var applyContactsList = eval($("#applyContacts").val());
if(applyContactsList == null || applyContactsList == ''){
	$("#applyContactsIndex").val(-1);
}else{
	$("#applyContactsIndex").val(applyContactsList.length -1);
	for (var i = 0; i < applyContactsList.length; i++) {
		var otherContractsCount = i;
		var applyContacts = applyContactsList[i];
		var adddiv = '<tr>'
				+ '<td  width="2%"><input type="hidden" name="applyContactsId" id="applyContactsId'
				+ otherContractsCount
				+ '" value="'
				+ applyContacts.id
				+ '"><div onclick="javascript:remov(this)" class = "easyui-linkbutton" id="remove'
				+ otherContractsCount
				+ '"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'
				+ '<td  width="4%"  style="font-size:12px; ">姓名<a style="color:red">*</a>：</td>'
				+ '<td  width="17%" align="left" >'
				+ '<input type="text"name="contactName" value="'
				+ applyContacts.contactName
				+ '" id="contactName'
				+ otherContractsCount
				+ '"  class="easyui-validatebox textbox" style="width:80%;"/>'
				+ '</td>'
				+ '<td  width="6%"  style="font-size:12px; ">手机号码<a style="color:red">*</a>：</td>'
				+ '<td  width="17%" align="left" >'
				+ '<input type="text" name="mobileNo" maxlength="15"   value="'
				+ applyContacts.mobileNo
				+ '" id="mobileNo'
				+ otherContractsCount
				+ '" class="input input-boder-color easyui-validatebox textbox" style="width:80%;"/>'
				+ '</td>'
				+ '<td  width="6%"  style="font-size:12px; ">关系<a style="color:red">*</a>：</td>'
				+ '<td  width="5%" align="left" >'
				+ '<input type="text" name="contactsType"  value="'
				+ applyContacts.contactsType
				+ '"  id="contactsType'
				+ otherContractsCount
				+ '" class="input input-boder-color"style="width:100px;"/>'
				+ '</td><td  width="10%"  align="left" >'
				+ '<input type="text" name="relation"  value="'
				+ applyContacts.relation
				+ '"  id="relation'
				+ otherContractsCount
				+ '" class="input input-boder-color"style="width:100px;"/>'
				+ '</td>'
				+ '<td  width="6%"  style="font-size:12px; ">备注：</td>'
				+ '<td  width="17%" align="left">'
				+ '<input type="text" name="descrption"  value="'
				+ applyContacts.descrption
				+ '" id="descrption'
				+ otherContractsCount
				+ '"class="input input-boder-color" style="width:80%;"/>'
				+ '</td>'
				+ '</tr> ';
		$("#customerContacts").append(adddiv);
	
		$("#contactsType" + otherContractsCount).combobox(
		{
			valueField : 'itemCode',
			textField : 'itemNameZh',
			editable : false,
			data: [{
				itemCode: 'familyRelation',
				itemNameZh: '直系联系人'
			},{
				itemCode: 'mateRelation',
				itemNameZh: '配偶'
			},{
				itemCode: 'jobRelation',
				itemNameZh: '工作证明人'
			},{
				itemCode: 'otherRelation',
				itemNameZh: '其它联系人'
			}],
			onSelect: function(rec){
				$('#relation' + otherContractsCount).combobox('setValue','');
				$('#relation' + otherContractsCount).combobox('reload', '../dict/selectDictialDetail?appId=APPROVE&status=1&parentCode='+rec.itemCode);
			}
		});
		$("#relation" + otherContractsCount).combobox({
			valueField : 'itemCode',
			textField : 'itemNameZh',
			editable : false,
			url : "../dict/selectDictialDetail?appId=APPROVE&parentCode="+applyContacts.contactsType+"&status=1"
		});
	}
}
$('#isHasConSignContracts').each(function() {
	if($(this).val()=='y'){
		$(this).prop('checked', true);
	}else{
		$(this).prop('checked', false);
	}
});

$("#isHasConSignContracts").change(function(){
	if($("#isHasConSignContracts").prop('checked') == true){
		$('#isHasConSignContracts').val('y');
	}else{
		$('#isHasConSignContracts').val('n');
	}
});

$("#addContactsOper").click(
function() {
	var otherContractsCount = parseInt($("#applyContactsIndex").val()) + 1;
	var adddiv = '<tr>'
	+ '<td  width="2%"><input type="hidden" name="applyContactsId" id="applyContactsId'
	+ otherContractsCount
	+ '" value="'
	+ '"><div onclick="javascript:remov(this)" class = "easyui-linkbutton" id="remove'
	+ otherContractsCount
	+ '"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'
	+ '<td  width="4%"  style="font-size:12px; ">姓名<a style="color:red">*</a>：</td>'
	+ '<td  width="17%" align="left" >'
	+ '<input type="text"name="contactName" value="'
	+ '" id="contactName'
	+ otherContractsCount
	+ '"  class="easyui-validatebox textbox" style="width:80%;"/>'
	+ '</td>'
	+ '<td  width="6%"  style="font-size:12px; ">手机号码<a style="color:red">*</a>：</td>'
	+ '<td  width="17%" align="left" >'
	+ '<input type="text" name="mobileNo" maxlength="15" value="'
	+ '" id="mobileNo'
	+ otherContractsCount
	+ '" class="input input-boder-color easyui-validatebox textbox"  style="width:80%;"/>'
	+ '</td>'
	+ '<td  width="6%"  style="font-size:12px; ">关系<a style="color:red">*</a>：</td>'
	+ '<td  width="5%" align="left" >'
	+ '<input type="text" name="contactsType"   value="'
	+ '"  id="contactsType'
	+ otherContractsCount
	+ '" class="input input-boder-color" style="width:100px;"/>'
	+ '</td><td  width="10%" align="left" >'
	+ '<input type="text" name="relation"  value="'
	+ '"  id="relation'
	+ otherContractsCount
	+ '" class="input input-boder-color"style="width:100px;"/>'
	+ '</td>'
	+ '<td  width="6%"  style="font-size:12px; ">备注：</td>'
	+ '<td  width="17%" align="left">'
	+ '<input type="text" name="descrption"  value="'
	+ '" id="descrption'
	+ otherContractsCount
	+ '"class="input input-boder-color" style="width:80%;"/>'
	+ '</td>'
	+ '</tr> ';
	$("#customerContacts").append(adddiv);
	$("#applyContactsIndex").val(otherContractsCount)

	$("#contactsType" + otherContractsCount).combobox(
	{
		valueField : 'itemCode',
		textField : 'itemNameZh',
		editable : false,
		data: [{
			itemCode: 'familyRelation',
			itemNameZh: '直系联系人'
		},{
			itemCode: 'mateRelation',
			itemNameZh: '配偶'
		},{
			itemCode: 'jobRelation',
			itemNameZh: '工作证明人'
		},{
			itemCode: 'otherRelation',
			itemNameZh: '其它联系人'
		}],
		onSelect: function(rec){
			$('#relation' + otherContractsCount).combobox('setValue','');
			$('#relation' + otherContractsCount).combobox('reload', '../dict/selectDictialDetail?appId=APPROVE&status=1&parentCode='+rec.itemCode);
		}
	});
	$("#relation" + otherContractsCount).combobox({
		valueField : 'itemCode',
		textField : 'itemNameZh',
		editable : false
	});

});
function remov(node) {
	$.messager.confirm(
		"确认",
		"确定删除该联系人吗？",
		function(r) {
			if (r) {
				var applyContactsId = node.parentNode.firstChild.value;
				if (isIe()) {
//					node.parentNode.parentNode.nextElementSibling.removeNode(true);
					node.parentNode.parentNode.removeNode(true);
				} else if (isChrome()) {
//					node.parentNode.parentNode.nextElementSibling.remove();
					node.parentNode.parentNode.remove();
				} else if (isFF()) {
					var temp = node.parentNode.parentNode.parentNode;
//					temp.removeChild(node.parentNode.parentNode.nextElementSibling);
					temp.removeChild(node.parentNode.parentNode);
				}
				if (applyContactsId != '') {
					$.ajax({
						url : "../apply/updateApplyContacts",
						type : "POST",
						data : {
							applyContactsId : applyContactsId,
						},
						success : function(data, status) {
							if (data == 'success') {
								$.messager.alert('提示',
										"删除联系人信息成功!", "info");
							} else {
								$.messager.alert('警示',
										"删除联系人信息失败!", "error");
							}
						},
						error : function(status) {
							$.messager.alert('错误', "删除联系人信息失败!",
									"error");
						}
					});
				}

			}
		});
}
function isIe() {
	return ("ActiveXObject" in window);
}

function isFF() {
	return navigator.userAgent.indexOf("Firefox") != -1;
}

function isChrome() {
	return navigator.userAgent.indexOf("Chrome") > -1;
}