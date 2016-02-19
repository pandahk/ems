var otherContractsCount = 0;
var applyContacts3 = eval($("#applyContacts3").val());
for (var i = 0; i < applyContacts3.length; i++) {
	otherContractsCount += 1;
	var applyContacts = applyContacts3[i];
	var adddiv = '<tr>'
		+ '<td  width="2%"><input type="hidden" name="applyContactsId" id="applyContactsId'
		+ (otherContractsCount + 2)
		+ '" value="'
		+ applyContacts.id
		+ '"><div onclick="javascript:remov(this)" id="remove'
		+ (otherContractsCount + 2)
		+ '"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'
		+ '<td  width="4%"  style="font-size:12px; ">姓名<a style="color:red">*</a>：</td>'
		+ '<td  width="17%" align="left" >'
		+ '<input type="text"name="contactName" value="'
		+ applyContacts.contactName
		+ '" id="contactName'
		+ (otherContractsCount + 2)
		+ '" data-options="required:true" class="easyui-validatebox textbox" style="width:80%;"/>'
		+ '</td>'
		+ '<td  width="6%"  style="font-size:12px; ">关系：</td>'
		+ '<td  width="17%" align="left" >'
		+ '<input type="text" name="relation"  value="'
		+ applyContacts.relation
		+ '"  id="relation'
		+ (otherContractsCount + 2)
		+ '" class="input input-boder-color"style="width:80%;"/>'
		+ '</td>'
		+ '<td  width="6%"  style="font-size:12px; ">请说明：</td>'
		+ '<td  width="17%" align="left">'
		+ '<input type="text" name="descrption" value="'
		+ applyContacts.descrption
		+ '" id="descrption'
		+ (otherContractsCount + 2)
		+ '"class="input input-boder-color" style="width:80%;"/>'
		+ '</td>'
		+ '<td  width="6%"  style="font-size:12px; ">手机号码<a style="color:red">*</a>：</td>'
		+ '<td  width="17%" align="left" >'
		+ '<input type="text" name="mobileNoS" value="'
		+ applyContacts.mobileNo
		+ '" id="mobileNo'
		+ (otherContractsCount + 2)
		+ '" class="input input-boder-color" style="width:80%;"/>'
		+ '<img src="'+basepath+'/resources/images/make_call.png" onclick="makeCall(\''+$("#applyCode").val()+'\',\''+applyContacts.mobileNo+'\',\''+applyContacts.contactName+'\',\'\',\'\',\''+applyContacts.relation+'\',\''+applyContacts.contactsSource+'\')"/>'
		+ '</td>'		
		+ '<td  width="6%" style="font-size:12px; "><input type="checkbox"  name="isKnowThat'
		+ (otherContractsCount + 2)
		+ '"  id="isKnowThat'
		+ (otherContractsCount + 2)
		+ '"/>知情</td>'
		+ '</tr> '
		+ '<tr>'
		+ '<td  width="2%"><input type="hidden"></td>'
		+ '<td  width="6%"  style="font-size:12px; ">单位名称<a style="color:red">*</a>：</td>'
		+ '<td  width="17%" align="left">'
		+ '<input type="text" name="jobCompanyName" value="'
		+ applyContacts.jobCompanyName
		+ '" id="jobCompanyName'
		+ (otherContractsCount + 2)
		+ '"class="input input-boder-color" style="width:80%;"/>'
		+ '</td>'
		+'<td  width="6%"  style="font-size:12px; ">来源：</td>'
		+'<td  width="17%" align="left" >'
		+'<input type="text" name="contactsSource"  id="contactsSource'+(otherContractsCount+2)+'" class="input input-boder-color"style="width:80%;"/>'
		+'</td>'
		+ '</tr>';
	$("#otherContacts").append(adddiv);
	if (applyContacts.isKnowThat == '1') {
		$("#isKnowThat" + (otherContractsCount + 2)).attr("checked", true);
	} else {
		$("#isKnowThat" + (otherContractsCount + 2)).attr("checked", false);
	}
	$("#relation" + (otherContractsCount + 2))
			.combobox(
					{
						valueField : 'itemCode',
						textField : 'itemNameZh',
						editable : true,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1"
					});
	if (applyContacts.relation != null && applyContacts.relation != '')
		$("#relation" + (otherContractsCount + 2)).combobox('setValue',
				applyContacts.relation);
	$("#contactsSource" + (otherContractsCount + 2))
			.combobox(
					{
						valueField : 'itemCode',
						textField : 'itemNameZh',
						editable : true,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1"
					});
	if (applyContacts.contactsSource != null
			&& applyContacts.contactsSource != '')// todo..........
		$("#contactsSource" + (otherContractsCount + 2)).combobox('setValue',
			applyContacts.contactsSource);// todo..........
}
if ($("#isLiveLocalId").val() == '1') {
	$("#isLiveLocal").attr("checked", true);
} else {
	$("#isLiveLocal").attr("checked", false);
}
if ($("#isKnowThat1Id").val() == '1') {
	$("#isKnowThat1").attr("checked", true);
} else {
	$("#isKnowThat1").attr("checked", false);
}
if ($("#isKnowThat2Id").val() == '1') {
	$("#isKnowThat2").attr("checked", true);
} else {
	$("#isKnowThat2").attr("checked", false);
}
if ($("#isKnowThat0Id").val() == '1') {
	$("#isKnowThat0").attr("checked", true);
} else {
	$("#isKnowThat0").attr("checked", false);
}
if ($("#isEmployedId").val() == '1') {
	$("#isEmployed0").attr("checked", true);
} else {
	$("#isEmployed0").attr("checked", false);
}
$("#addOtherContactsOper")
		.click(
				function() {
					otherContractsCount += 1;
					var adddiv = '<tr>'
						+ '<td  width="2%"><input type="hidden" name="applyContactsId" id="applyContactsId'
						+ (otherContractsCount + 2)
						+ '" value=""><div onclick="javascript:remov(this)" id="remove'
						+ (otherContractsCount + 2)
						+ '"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'
						+ '<td  width="4%"  style="font-size:12px; ">姓名<a style="color:red">*</a>：</td>'
						+ '<td  width="17%" align="left" >'
						+ '<input type="text"name="contactName" id="contactName'
						+ (otherContractsCount + 2)
						+ '"data-options="required:true" class="easyui-validatebox textbox" style="width:80%;" title>'
						+ '</td>'
						+ '<td  width="6%"  style="font-size:12px; ">关系：</td>'
						+ '<td  width="17%" align="left" >'
						+ '<input type="text" name="relation"  id="relation'
						+ (otherContractsCount + 2)
						+ '" class="input input-boder-color"style="width:80%;"/>'
						+ '</td>'
						+ '<td  width="6%"  style="font-size:12px; ">请说明：</td>'
						+ '<td  width="17%" align="left">'
						+ '<input type="text" name="descrption" id="descrption'
						+ (otherContractsCount + 2)
						+ '"class="input input-boder-color" style="width:80%;"/>'
						+ '</td>'
						+ '<td  width="6%"  style="font-size:12px; ">手机号码<a style="color:red">*</a>：</td>'
						+ '<td  width="17%" align="left" >'
						+ '<input type="text" name="mobileNoS" id="mobileNo'
						+ (otherContractsCount + 2)
						+ '" class="input input-boder-color" style="width:80%;"/>'
						+ '</td>'
						+ '<td  width="6%" style="font-size:12px; "><input type="checkbox"  name="isKnowThat'
						+ (otherContractsCount + 2)
						+ '" value="true" id="isKnowThat'
						+ (otherContractsCount + 2)
						+ '"/>知情</td>'
						+ '</tr> '
						+ '<tr>'
						+ '<td  width="2%"><input type="hidden"></td>'
						+ '<td  width="6%"  style="font-size:12px; ">单位名称<a style="color:red">*</a>：</td>'
						+ '<td  width="17%" align="left">'
						+ '<input type="text" name="jobCompanyName" id="jobCompanyName'
						+ (otherContractsCount + 2)
						+ '"class="input input-boder-color" style="width:80%;"/>'
						+ '</td>' 
						+'<td  width="6%"  style="font-size:12px; ">来源：</td>'
		  				+'<td  width="17%" align="left" >'
		  				+'<input type="text" name="contactsSource"  id="contactsSource'+(otherContractsCount+2)+'" class="input input-boder-color"style="width:80%;"/>'
		  				+'</td>'+
						+ '</tr>';

					$("#otherContacts").append(adddiv);

					$("#relation" + (otherContractsCount + 2))
							.combobox(
									{
										valueField : 'itemCode',
										textField : 'itemNameZh',
										editable : true,
										url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1"
									});
					$("#contactsSource" + (otherContractsCount + 2))
							.combobox(
									{
										valueField : 'itemCode',
										textField : 'itemNameZh',
										editable : true,
										url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1"
									});

				});
function remov(node) {
	$.messager.confirm("确认", "确定删除该联系人吗？", function(r) {
		if (r) {
			var applyContactsId = node.parentNode.firstChild.value;
			if (isIe()) {
				node.parentNode.parentNode.nextElementSibling.removeNode(true);
				node.parentNode.parentNode.removeNode(true);
			} else if (isChrome()) {
				node.parentNode.parentNode.nextElementSibling.remove();
				node.parentNode.parentNode.remove();
			} else if (isFF()) {
				var temp = node.parentNode.parentNode.parentNode;
				temp.removeChild(node.parentNode.parentNode.nextElementSibling);
				temp.removeChild(node.parentNode.parentNode);
			}
			otherContractsCount -= 1;
			if (applyContactsId != '') {
				$.ajax({
					url : "../apply/updateApplyContacts",
					type : "POST",
					data : {
						applyContactsId : applyContactsId,
					},
					success : function(data, status) {
						if (data == 'success') {
							$.messager.alert('提示', "删除联系人信息成功!", "info");
						} else {
							$.messager.alert('警示', "删除联系人信息失败!", "error");
						}
					},
					error : function(status) {
						$.messager.alert('错误', "删除联系人信息失败!", "error");
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