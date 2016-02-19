var otherContractsCount = 0;
$(function() {

	$.extend($.fn.validatebox.defaults.rules,{
		mobile : {
			validator : function(value) {
				return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/i.test($.trim(value));
			},
			message : '手机号码格式错误'
		}
	});
	$('#name').attr('readonly', true);
	$('#idCardNo').attr('readonly', true);

	// 贷款用途事件
	var pose = $('#loanPurpose').val();
	if (pose == 148) {
		$('#loanPurpose').parent().parent().next().show();
	} else {
		$('#loanPurpose').parent().parent().next().hide();
	}
	$('#loanPurpose').combobox({
		onChange : function(n, o) {
			if (n == 148) {
				$(this).parent().parent().next().show();
			}
			if (o == 148 && n !== 148) {
				$("#otherPurpose").val(null);
				$(this).parent().parent().next().hide();
			}
		}
	});

	// 初始化性别
	var idCardval = $('#idCardNo').val();
	if (idCardval&&idCardval !== '') {
		var sex = (idCardval + '').charAt((idCardval + '').length - 2);
		var s;
		sex % 2 == 0 ? s = '215' : s = '214';
		$("#gender option[value=" + s + "]").attr('selected', 'selected');
	}
	$('#gender').attr('readonly', true);

	// 初始化姓名全拼
	var name = $('#name').val();
	if(name&&name!=''){
		var nameSpell = pinyin.getFullChars(name);
		$('#nameSpell').val(nameSpell);
	}
	$('#nameSpell').attr('readonly', true);
	
	// 直系联系人事件初始化
	var relation1 = $('#relation1').val();
	if ($.trim(relation1) == 'FROTHER') {
		$('div.descrption1').show();
		$("#descrption1").textbox({required:true});
	} else {
		$('div.descrption1').hide();
		$("#descrption1").textbox({required:false});
	}
	$('#relation1').combobox({
		onChange : function(n, o) {
			if ($.trim(n) == 'FROTHER') {
				$('div.descrption1').show();
				$("#descrption1").textbox({required:true});
			}
			if ($.trim(n) !== 'FROTHER' && $.trim(o) == 'FROTHER') {
				$('.descrption1').val(null);
				$('div.descrption1').hide();
				$("#descrption1").textbox({required:false});
			}
		}
	});

	// TODO 未知
	$('input[name="relation"]').change(function(event) {
		var val = $(this).val();
		if (val == 157) {
			$(this).parent().parent().parent().siblings('.relation').css('display', 'block');
		}
	});

	// 地址下拉框同步
	$('#isLiveLocal').change(function(event) {
		var val = $('#isLiveLocal').prop("checked");
		if (val == true) {
			var permanentAddrProvince = $('#permanentAddrProvince').combobox('getValue');
			var permanentAddrCity = $('#permanentAddrCity').combobox('getValue');
			var permanentAddrDistrict = $('#permanentAddrDistrict').combobox('getValue');
			var permanentAddress = $('#permanentAddress').textbox('getValue');
			if (permanentAddrProvince&& permanentAddrProvince != '')
				$('#residenceCity').combobox('reload', basepath + '/area/city?provinceCode=' + permanentAddrProvince);
			if (permanentAddrCity && permanentAddrCity != '')
				$('#residenceDistrict').combobox('reload', basepath + '/area/district?cityCode=' + permanentAddrCity);
			$("#residenceProvince").combobox('setValue', permanentAddrProvince);
			$("#residenceCity").combobox('setValue', permanentAddrCity);
			$("#residenceDistrict").combobox('setValue', permanentAddrDistrict);
			$('#residenceAddress').textbox('setValue', permanentAddress);
		}
	});

	var applyContacts3 = eval($("#applyContacts3").val());
	for (var i = 0; i < applyContacts3.length; i++) {
		otherContractsCount += 1;
		var applyContacts = applyContacts3[i];
		
		var adddiv = '<div class="row"><div class="col-w-4"><div class="col-w-4"><input type="hidden" name="applyContactsId" id="applyContactsId'
				+ (otherContractsCount + 2)
				+ '" value="'
				+ applyContacts.id
				+ '">'
				+ '<div onclick="javascript:remov(this)" title="删除" class="btn-remov" style="height: 23px;width:22px" id="remove'
				+ (otherContractsCount + 2)
				+ '" group=""><span class="l-btn-left" ><span class="l-btn-text">—</span></span></div>'
				+ '姓名<a style="color:red">*</a></div><div class="col-w-8">'
				+ '<input type="text" name="contactName" value="'
				+ applyContacts.contactName
				+ '" id="contactName'
				+ (otherContractsCount + 2)
				+ '" data-options="required:true" class="easyui-validatebox textbox" style="width:80%;" title="">'
				+ '</div></div>'
				+ '<div class="col-w-4"><div class="col-w-4">关系</div><div class="col-w-8">'
				+ '<input type="text" name="relation"  value="'
				+ applyContacts.relation
				+ '" id="relation'
				+ (otherContractsCount + 2)
				+ '" class="input input-boder-color" style="width:80%;" data-options="onChange:function(nval,oval){if(nval==157){$(this).parent().parent().next().show();}if(oval==157&&nval!==157){$(this).parent().parent().next().hide();}}">'
				+ '</div></div><div class="col-w-3 relation" style="display: none;">'
				+ '<input name="descrption" value="'
				+ applyContacts.descrption
				+ '" id="descrption'
				+ (otherContractsCount + 2)
				+ '" class="input input-boder-color" style="width:100%;" type="text" placeholder="请在此填写其他说明信息"></div>'
				+ '<div class="col-w-1 text-check"><input type="hidden" name="contactsSource" value="'
				+ applyContacts.contactsSource
				+ '">'
				+ '<input type="checkbox" name="isKnowThat'
				+ (otherContractsCount + 2)
				+ '" value="true" id="isKnowThat'
				+ (otherContractsCount + 2)
				+ '">知情'
				+ '</div></div>'
				+ '<div class="row"><div class="col-w-4"><div class="col-w-4">'
				+ '手机号码<a style="color:red">*</a></div><div class="col-w-8">'
				+ '<input type="text" name="mobileNoS" value="'
				+ applyContacts.mobileNo
				+ '" id="mobileNo'
				+ (otherContractsCount + 2)
				+ '" class="input input-boder-color easyui-validatebox textbox" style="width:80%;" data-options="required:true" validtype="mobile" title=""></div>'
				+ '</div><div class="col-w-8"><div class="col-w-2">'
				+ '单位名称<a style="color:red">*</a></div><div class="col-w-10">'
				+ '<input type="text" name="jobCompanyName" value="'
				+ applyContacts.jobCompanyName
				+ '" id="jobCompanyName'
				+ (otherContractsCount + 2)
				+ '" class="input input-boder-color easyui-validatebox textbox" data-options="required:true" style="width:86%;"></div></div></div>';

		$("#otherContacts").append(adddiv);
		if (applyContacts.isKnowThat == '1') {
			$("#isKnowThat" + (otherContractsCount + 2)).attr("checked", true);
		} else {
			$("#isKnowThat" + (otherContractsCount + 2)).attr("checked", false);
		}
		$("#relation" + (otherContractsCount + 2)).combobox({
			valueField : 'itemCode',
			textField : 'itemNameZh',
			editable : false
		});
		$("#relation" + (otherContractsCount + 2)).combobox('reload', "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1");
		if (applyContacts.relation != null && applyContacts.relation != ''){
			$("#relation" + (otherContractsCount + 2)).combobox('setValue', applyContacts.relation);
			if(applyContacts.relation==157){
				$("#relation" + (otherContractsCount + 2)).parent().parent().next().show();
			}
		}
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
						var adddiv = '<div class="row"><div class="col-w-4"><div class="col-w-4"><input type="hidden" name="applyContactsId" id="applyContactsId'+(otherContractsCount + 2)+'" value="">'
									+'<div onclick="javascript:remov(this)" title="删除" class="btn-remov" style="height: 23px;width:22px" id="remove'+(otherContractsCount + 2)+'" group=""><span class="l-btn-left" ><span class="l-btn-text">—</span></span></div>'
									+'姓名<a style="color:red">*</a></div><div class="col-w-8">'
									+'<input type="text" name="contactName" id="contactName'+(otherContractsCount + 2)+'" data-options="required:true" class="easyui-validatebox" style="width:80%;" title="">'
									+'</div></div>'
									+'<div class="col-w-4"><div class="col-w-4">关系</div><div class="col-w-8">'
									+'<input type="text" name="relation" id="relation'+(otherContractsCount + 2)+'" class="input input-boder-color" style="width:80%;" data-options="onChange:function(nval,oval){if(nval==157){$(this).parent().parent().next().show();}if(oval==157&&nval!==157){$(this).parent().parent().next().hide();}}">'
									+'</div></div><div class="col-w-3 relation" style="display: none;">'
									+'<input name="descrption" id="descrption'+(otherContractsCount + 2)+'" class="input input-boder-color" style="width:100%;" type="text" placeholder="请在此填写其他说明信息"></div>'
									+'<div class="col-w-1 text-check"><input type="hidden" name="contactsSource" value="CS1">'				
									+'<input type="checkbox" name="isKnowThat'+(otherContractsCount + 2)+'" value="true" id="isKnowThat'+(otherContractsCount + 2)+'">知情'
									+'</div></div>'
									+'<div class="row"><div class="col-w-4"><div class="col-w-4">'
									+'手机号码<a style="color:red">*</a></div><div class="col-w-8">'
									+'<input type="text" name="mobileNoS" id="mobileNo'+(otherContractsCount + 2)+'" class="input input-boder-color easyui-validatebox" style="width:80%;" data-options="required:true" validtype="mobile" title=""></div>'
									+'</div><div class="col-w-8"><div class="col-w-2">'
									+'单位名称<a style="color:red">*</a></div><div class="col-w-10">'
									+'<input type="text" name="jobCompanyName" id="jobCompanyName'+(otherContractsCount + 2)+'" class="input input-boder-color easyui-validatebox" data-options="required:true" style="width:86%;"></div></div></div>'


						$("#otherContacts").append(adddiv);

						$("#relation" + (otherContractsCount + 2)).combobox({
							valueField : 'itemCode',
							textField : 'itemNameZh',
							editable : false
						});
						$("#relation" + (otherContractsCount + 2)).combobox('reload', "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1");
					});
	getContactIdCardInfo($("#contact_idcard_info").attr("value"));
	$('#desiredProduct').combobox({
		url : basepath + '/firstAppr/findBaseProduct',
		valueField : 'code',
		textField : 'name',
		onLoadSuccess : function() {
			if ($("#desiredProduct").attr("product_value") != "") {
				$("#desiredProduct").combobox("select", $("#desiredProduct").attr("product_value"));
			}
		}
	});
	initAssets();
	$('#completeinputCheckTask').bind("click", function() {
		$.messager.confirm('', '请确定录入字段已经全部保存?', function(r) {
			if (r) {
				$('#updateApplyInfosForm').form('submit',{
					onSubmit : function() {
						if (!validVlaue()) {
							return false;
						}
						if ($(this).form('enableValidation').form('validate')){ // 当提交申请推进工作流时才进行空值校验
							var taskDefKey = $('#completeinputCheckTask').attr("period");
							$.ajax({
								url : basepath + "/apply/checkAndPushPeriod",
								type : "POST",
								data : {
									applyCode : $("input[name='viewapplycode']").val(),
									taskDefKey : taskDefKey,
									product : $('#desiredProduct').combobox("getValue")
								},
								success : function(data, status) {
									if (data != '' && typeof (data) != 'object') {
										data = $.parseJSON(data);
									}
									if (data.code == "0000") {
										$.messager.alert('提交成功', '提交成功', 'info', function() {
											colseCurTab();
										});
									} else {
										$.messager.alert('保存失败', data.msg);
									}
								}
							});
							return false;
						} else {
							return false;
						}
					}
				});
			}
		});
	});

	$('#completefirstVerifyTask').bind("click", function() {
		$.messager.confirm('', '请确定录入字段已经全部保存?', function(r) {
			if (r) {
				if (!validVlaue()) {
					return false;
				}
				if ($("#updateApplyInfosForm").form('validate')) { // 当提交申请推进工作流时才进行空值校验
					var taskDefKey = $('#completefirstVerifyTask').attr("period");
					$.ajax({
						url : basepath + "/apply/checkAndPushPeriod",
						type : "POST",
						data : {
							applyCode : $("input[name='viewapplycode']").val(),
							taskDefKey : taskDefKey,
							product : $('#desiredProduct').combobox("getValue")
						},
						success : function(data, status) {
							if (data.code == "0000") {
								$.messager.alert('提交成功', '提交成功', 'info', function() {
									colseCurTab();
								});
							} else {
								$.messager.alert('提示', "提交失败");
							}
						}
					});
				} else {
					return false;
				}
			}
		});
	});
	
	if($.trim($('#otherContacts').html())==''){
		var r=".relation";
		var mdiv='<div class="row"><div class="col-w-4"><div class="col-w-4"><input type="hidden" name="applyContactsId" id="applyContactsId3" value="">'
				+'<div onclick="javascript:remov(this)" title="删除" class="btn-remov" style="height: 23px;width:22px" id="remove3" group=""><span class="l-btn-left" ><span class="l-btn-text">—</span></span></div>'
				+'姓名<a style="color:red">*</a></div><div class="col-w-8">'
				+'<input type="text" name="contactName" id="contactName3" data-options="required:true" class="easyui-validatebox textbox " style="width:80%;" title="">'
				+'</div></div>'
				+'<div class="col-w-4"><div class="col-w-4">关系</div><div class="col-w-8">'
				+'<input type="text" name="relation" id="relation3" class="input input-boder-color" style="width:80%;" data-options="onChange:function(nval,oval){if(nval==157){$(this).parent().parent().next().show();}if(oval==157&&nval!==157){$(this).parent().parent().next().hide();}}">'
				+'</div></div><div class="col-w-3 relation" style="display: none;">'
				+'<input name="descrption" id="descrption3" class="input input-boder-color" style="width:100%;" type="text" placeholder="请在此填写其他说明信息"></div>'
				+'<div class="col-w-1 text-check"><input type="hidden" name="contactsSource" value="CS1">'				
				+'<input type="checkbox" name="isKnowThat3" value="true" id="isKnowThat3">知情'
				+'</div></div>'
				+'<div class="row"><div class="col-w-4"><div class="col-w-4">'
				+'手机号码<a style="color:red">*</a></div><div class="col-w-8">'
				+'<input type="text" name="mobileNoS" id="mobileNo3" class="input input-boder-color easyui-validatebox textbox " style="width:80%;" data-options="required:true" validtype="mobile" title=""></div>'
				+'</div><div class="col-w-8"><div class="col-w-2">'
				+'单位名称<a style="color:red">*</a></div><div class="col-w-10">'
				+'<input type="text" name="jobCompanyName" id="jobCompanyName3" class="input input-boder-color easyui-validatebox textbox " data-options="required:true" style="width:86%;"></div></div></div>'
				$('#otherContacts').prepend(mdiv);
				$("#relation3").combobox(
								{
									valueField : 'itemCode',
									textField : 'itemNameZh',
									editable : false,
									url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1"
								});
		otherContractsCount += 1;
	}
});

function remov(node) {
	$.messager.confirm("确认", "确定删除该联系人吗？", function(r) {
		if (r) {
			var applyContactsId = node.parentNode.firstChild.value;
			if (isIe()) {
				node.parentNode.parentNode.parentNode.nextElementSibling.removeNode(true);
				node.parentNode.parentNode.parentNode.removeNode(true);
			} else if (isChrome()) {
				node.parentNode.parentNode.parentNode.nextElementSibling.remove();
				node.parentNode.parentNode.parentNode.remove();
			} else if (isFF()) {
				var temp = node.parentNode.parentNode.parentNode.parentNode;
				temp.removeChild(node.parentNode.parentNode.parentNode.nextElementSibling);
				temp.removeChild(node.parentNode.parentNode.parentNode);
			}
//			otherContractsCount -= 1;
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
function submitForm() {
	$("input[name='yearlyIncome']").val(
			$("input[name='yearlyIncome']").val().replace(",", ""));
	$("input[name='mateIncome']").val(
			$("input[name='mateIncome']").val().replace(",", ""));
	$("input[name='monthlySalary']").val(
			$("input[name='monthlySalary']").val().replace(",", ""));
	$("input[name='monthlyOtherIncome']").val(
			$("input[name='monthlyOtherIncome']").val().replace(",", ""));
	$("input[name='hourseRent']").val(
			$("input[name='hourseRent']").val().replace(",", ""));
	$("input[name='desiredLoanAmount']").val(
			(Number($("input[name='desiredLoanAmount']").val()) * 10000)
					.toFixed(0));
	$.messager.confirm("确认", "确定保存吗？", function(r) {
		if (r) {
			$('#updateApplyInfosForm').form('submit', {
				onSubmit : function() {
					$.messager.progress({
						msg : '正在保存中,请稍后......'
					});
				},
				success : function(data, status) {
					$.messager.progress('close');
					if (data == 'success') {
						window.location.reload();
					} else {
						$.messager.alert('错误', "保存申请录入信息失败!", "error");
						var temp = otherContractsCount;
						for (var j = 1; j < otherContractsCount + 1; j++) {
							if ($("#contactName" + (j + 2)).val() == '') {
								temp--;
								$("#contactName" + (j + 2)).parent().parent().remove();
							}
						}
						otherContractsCount = temp;
					}
				},
				error : function(status) {
					$.messager.progress('close');
					$.messager.alert('错误', "保存申请录入信息失败！", "error");
					var temp = otherContractsCount;
					for (var j = 1; j < otherContractsCount + 1; j++) {
						if ($("#contactName" + (j + 2)).val() == '') {
							temp--;
							$("#contactName" + (j + 2)).parent().parent().remove();
						}
					}
					otherContractsCount = temp;
				}
			});
		}
	});
}
function initAssets() {
	$('#isHasHourse').each(function() {
		if ($(this).val() == 'y') {
			$(this).prop('checked', true);
		} else {
			$(this).prop('checked', false);
		}
	});
	$('#isLiveWithParents').each(function() {
		if ($(this).val() == 'y') {
			$(this).prop('checked', true);
		} else {
			$(this).prop('checked', false);
		}
	});
	$('#isHasCar').each(function() {
		if ($(this).val() == 'y') {
			$(this).prop('checked', true);
			if ($("#carBrand").val() == '0') {
				$("#carBrand").val('');
			}
			if ($("#carCardNo").val() == '0') {
				$("#carCardNo").val('');
			}
			if ($("#carCount").val() == '0') {
				$("#carCount").val('');
			}
			if ($("#purchaseCarPrice").val() == '0.00') {
				$("#purchaseCarPrice").val('');
			}
			if ($("#purchaseCarYears").val() == '0') {
				$("#purchaseCarYears").val('');
			}
			if ($("#carMonthlyPayment").val() == '0.00') {
				$("#carMonthlyPayment").val('');
			}
			$('#carinfo1,#carinfo2').show();
			$('#isHasCar').val('y');
		} else {
			if ($("#carBrand").val() == '') {
				$("#carBrand").val('0');
			}
			if ($("#carCardNo").val() == '') {
				$("#carCardNo").val('0');
			}
			if ($("#carCount").val() == '') {
				$("#carCount").val('0');
			}
			if ($("#purchaseCarPrice").val() == '') {
				$("#purchaseCarPrice").val('0.00');
			}
			if ($("#purchaseCarYears").val() == '') {
				$("#purchaseCarYears").val('0');
			}
			if ($("#carMonthlyPayment").val() == '') {
				$("#carMonthlyPayment").val('0.00');
			}

			$(this).prop('checked', false);
			$('#carinfo1,#carinfo2').hide();
			$('#isHasCar').val('n');
		}
	});
	var housingProperty = $('#housingPropertyNm').val();
	changeHousingProperty(housingProperty);
	$("#housingProperty")
			.combobox(
					{
						valueField : 'itemCode',
						textField : 'itemNameZh',
						editable : false,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=PROPERTYTYPE&status=1",
						onLoadSuccess : function() {
							$('#housingProperty').combobox('setValue',
									housingProperty);
						},
						onSelect : function(rec) {
							changeHousingProperty(rec.itemCode);
						}
					});

	$("#purchaseCarMode")
			.combobox(
					{
						valueField : 'itemCode',
						textField : 'itemNameZh',
						editable : false,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=CARSPAYWAY&status=1",
						onLoadSuccess : function() {
							if ($('#purchaseCarModeNm').val() == null
									|| $('#purchaseCarModeNm').val() == '') {
								$('#purchaseCarMode').combobox('setValue', 340);
							} else {
								$('#purchaseCarMode').combobox('setValue',
										$('#purchaseCarModeNm').val());
							}
						}
					});
	var acquireChannel = $('#acquireChannelNm').val();
	$("#acquireChannel")
			.combobox(
					{
						valueField : 'itemCode',
						textField : 'itemNameZh',
						editable : false,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=GETWAT&status=1",
						onLoadSuccess : function() {
							$('#acquireChannel').combobox('setValue',
									acquireChannel);
							changeAcquireChannel(acquireChannel);
						},
						onSelect : function(rec) {
							changeAcquireChannel(rec.itemCode);
						}
					});
	$("#isHasCar")
			.change(
					function() {
						requiredClass = "easyui-validatebox validatebox-text validatebox-invalid";
						if ($("#isHasCar").prop('checked') == true) {
							$('#carinfo1,#carinfo2').show();
							$('#isHasCar').val('y');
						} else {
							if ($("#carBrand").val() == '') {
								$("#carBrand").val('0');
							}
							if ($("#carCardNo").val() == '') {
								$("#carCardNo").val('0');
							}
							if ($("#carCount").val() == '') {
								$("#carCount").val('0');
							}
							if ($("#purchaseCarPrice").val() == '') {
								$("#purchaseCarPrice").val('0.00');
							}
							if ($("#purchaseCarYears").val() == '') {
								$("#purchaseCarYears").val('0');
							}
							if ($("#carMonthlyPayment").val() == '') {
								$("#carMonthlyPayment").val('0.00');
							}
							$('#carinfo1,#carinfo2').hide();
							$('#isHasCar').val('n');
						}
					});

	$("#isLiveWithParents").change(function() {
		if ($("#isLiveWithParents").prop('checked') == true) {
			$('#isLiveWithParents').val('y');
		} else {
			$('#isLiveWithParents').val('n');
		}
	});
}
function changeAcquireChannel(value) {
	if (value == 'gt007') {
		if ($('#acquireChannelRemark').val() == '@无') {
			$('#acquireChannelRemark').val('');
		}
		$('#acquireChannelRemark').show();
	} else {
		if ($('#acquireChannelRemark').val() == '') {
			$('#acquireChannelRemark').val('@无');
		}
		$('#acquireChannelRemark').hide();
	}
}
function changeHousingProperty(housingProperty) {
	requiredClass = "easyui-validatebox validatebox-text validatebox-invalid";
	if (housingProperty == '222' || housingProperty == '223' || housingProperty == '224' || housingProperty == '226') {
		$("#isHasHourse").prop('checked', false);
		$("#isHasHourse").val('n');

		if ($("#purchaseHoursePrice").val() == '') {
			$("#purchaseHoursePrice").val('0.00');
		}
		if ($("#purchaseHourseYears").val() == '') {
			$("#purchaseHourseYears").val('0');
		}
		if ($("#hourseCount").val() == '') {
			$("#hourseCount").val('0');
		}
		if ($("#hourseMonthlyPayment").val() == '') {
			$("#hourseMonthlyPayment").val('0.00');
		}
		$(".hourseinfo1").hide();
		$('#hourseinfo2').show();
	} else {
		$("#isHasHourse").prop('checked', true);

		if ($("#hourseRent").val() == '') {
			$("#hourseRent").val('0.00');
		}
		$(".hourseinfo1").show();
		$('#hourseinfo2').hide();
		$("#isHasHourse").val('y');
	}
	if (housingProperty == '226') {
		$("#housingRemark").prop('required', true);
		$("#housingRemark").addClass(requiredClass);
		$("#housingRemark").show();
		$(".housingRemark").show();
	} else {
		$("#housingRemark").prop('required', false);
		$("#housingRemark").removeClass(requiredClass);
		$("#housingRemark").hide();
		$(".housingRemark").hide();
	}
}

function getContactIdCardInfo(idCard) {
	if (idCard == "") {
		return "";
	}
	var sex = getSexByIdCard(idCard);
	var zodiac = new Zodiac(getYearByIdCard(idCard), getMonthByIdCard(idCard),
			getDayByIdCard(idCard)).getZodiac();
	var age = getAgeByIdCard(idCard);
	$("#contact_idcard_info").html(sex + ",属" + zodiac + ",年龄" + age + "岁")
}
function validVlaue() {
	var con = 0;
	var jobCompanyName0 = $('#jobCompanyName0').val();
	var jobCompanyPhone0 = $('#jobCompanyPhone0').val();
	var jobCertifyTitle0 = $('#jobCertifyTitle0').val();
	var province0 = $('#province0').combobox('getValue');
	var city0 = $('#city0').combobox('getValue');
	var detailAdress0 = $('#detailAdress0').val();
	var temp0 = jobCompanyName0 == '' || jobCompanyPhone0 == ''
			|| jobCertifyTitle0 == '' || province0 == '' || city0 == ''
			|| detailAdress0 == '';
	var province1 = $('#province1').combobox('getValue');
	var city1 = $('#city1').combobox('getValue');
	var detailAdress1 = $('#detailAdress1').val();
	var temp1 = province1 == '' || city1 == '' || detailAdress1 == '';
	var tempOther = 0;

	for (var i = 0; i < otherContractsCount; i++) {
		if ($('#contactName' + (i + 3)).val() != '') {
			con++;
		}
		if ($('#jobCompanyName' + (i + 3)).val() == ''
				|| $('#contactName' + (i + 3)).val() == ''
				|| $('#mobileNo' + (i + 3)).val() == '') {
			tempOther++;
		}
	}

	if ($('#contactName1').val() == '') {
		$.messager.alert('提示', '直系亲属联系人必须填写', 'info');
		return false;
	} else if ($('#contactName2').val() == '') {
		$.messager.alert('提示', '工作证明人必须填写', 'info');
		return false;
	} else if ($('#mobileNo1').val() == '') {
		$.messager.alert('提示', '直系亲属联系人手机号码必须填写', 'info');
		return false;
	} else if ($('#mobileNo2').val() == '') {
		$.messager.alert('提示', '工作证明人手机号码必须填写', 'info');
		return false;
	} else if ($('#jobCertifyTitle2').val() == '') {
		$.messager.alert('提示', '工作证明人的部门职务必须填写', 'info');
		return false;
	} else if (temp1) {
		$.messager.alert('提示', '直系亲属的住址信息必须填写', 'info');
		return false;
	} else if (con >= 1 && tempOther >= 1) {
		$.messager.alert('提示', '其他联系人的姓名,单位名称及手机号码信息必须填写', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') != '已婚'
			&& $('#contactName0').val() != '') {
		$.messager.alert('提示', '该客户不是已婚客户', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') == '已婚'
			&& $('#contactName0').val() == '') {
		$.messager.alert('提示', '配偶联系人必须填写', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') == '已婚'
			&& $('#mateIdCardNo').val() == '') {
		$.messager.alert('提示', '配偶身份证信息必须填写', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') == '已婚'
			&& $('#mobileNo0').val() == '') {
		$.messager.alert('提示', '配偶手机号信息必须填写', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') == '已婚'
			&& $("#isEmployed0").is(":checked") && temp0) {
		$.messager.alert('提示', '配偶单位名称，单位电话，地址，职务必须填写', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') == '已婚' && con < 1) {
		$.messager.alert('提示', '联系人至少填写四个', 'info');
		return false;
	} else if ($('#marriage').combobox('getText') != '已婚' && con < 2) {
		$.messager.alert('提示', '联系人至少填写四个', 'info');
		return false;
	} else {
		return true;
	}
}