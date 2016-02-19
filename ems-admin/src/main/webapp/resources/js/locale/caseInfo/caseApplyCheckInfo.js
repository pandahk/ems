var otherContractsCount = 0;
/*
 * $('#sourceChannel').attr('readonly',true);
 * $('#sourceBusiness').attr('readonly',true);
 */
$('#managerName').attr('readonly', true);
$('#salesName').attr('readonly', true);
$('#name').attr('readonly', true);
$('#idCardNo').attr('readonly', true);
var applyContacts3 = eval($("#applyContacts3").val());
for (var i = 0; i < applyContacts3.length; i++) {
	otherContractsCount += 1;
	var applyContacts = applyContacts3[i];
	var applyDescrption= '';
	if(applyContacts.relation==157){
		var applyDescrption = '<td  width="6%"  style="font-size:12px; " valign="middle">请说明：</td>'
		+ '<td  width="17%" align="left" valign="middle">'
		+ '<input type="text" name="descrption" value="'
		+ applyContacts.descrption
		+ '" id="descrption'
		+ (otherContractsCount + 2)
		+ '"class="input input-boder-color" style="width:80%;" disabled/>'
		+ '</td>';
	}
	var adddiv = '<tr>'
			+ '<td  width="6%"  style="font-size:12px; " valign="middle">姓名<a style="color:red">*</a>：</td>'
			+ '<td  width="17%" align="left" valign="middle">'
			+ '<input type="text"name="contactName" value="'
			+ applyContacts.contactName
			+ '" id="contactName'
			+ (otherContractsCount + 2)
			+ '" data-options="required:true" disabled class="easyui-validatebox " style="width:80%;"/>'
			+ '</td>'
			+ '<td  width="6%"  style="font-size:12px; " valign="middle">关系：</td>'
			+ '<td  width="17%" align="left" valign="middle">'
			+ '<input type="text" name="relation"  value="'
			+ applyContacts.relation
			+ '"  id="relation'
			+ (otherContractsCount + 2)
			+ '" class="input input-boder-color"style="width:80%;"/>'
			+ '</td>'
			+ applyDescrption
			
			+ '<input type="hidden" name="contactsSource" value="'
			+ applyContacts.contactsSource
			+ '">'
			+ '<td  width="6%" style="font-size:12px; " valign="middle"><input type="checkbox"  name="isKnowThat'
			+ (otherContractsCount + 2)
			+ '"  id="isKnowThat'
			+ (otherContractsCount + 2)
			+ '"disabled="true"/>知情</td>'
			+ '</tr> '
			+ '<tr>'
			+ '<td  width="6%"  style="font-size:12px; " valign="middle">单位名称<a style="color:red">*</a>：</td>'
			+ '<td  width="17%" align="left" valign="middle">'
			+ '<input type="text" name="jobCompanyName" value="'
			+ applyContacts.jobCompanyName
			+ '" id="jobCompanyName'
			+ (otherContractsCount + 2)
			+ '"class="input input-boder-color" style="width:80%;" disabled/>'
			+ '</td>'
			+ '<td  width="6%"  style="font-size:12px; " valign="middle">手机号码<a style="color:red">*</a>：</td>'
			+ '<td  width="17%" align="left" valign="middle">'
			+ '<input type="text" name="mobileNoS" value="'
			+ applyContacts.mobileNo
			+ '" id="mobileNo'
			+ (otherContractsCount + 2)
			+ '" class="input input-boder-color" style="width:80%;" disabled/>'
			+ '</td>'
			
			+ '</tr>';
	$("#otherContacts").append(adddiv);
	$("#otherContacts tr").css("height","30px");
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
						editable : false,
						disabled:true,
						url : "../dict/selectDictialDetail?appId=APPROVE&parentCode=OTHERRELATION&status=1"
					});
	if (applyContacts.relation != null && applyContacts.relation != '')
		$("#relation" + (otherContractsCount + 2)).combobox('setValue',
				applyContacts.relation);
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

$(function() {
	getContactIdCardInfo($("#contact_idcard_info").attr("value"));
	$('#desiredProduct').combobox({
        url: basepath + '/firstAppr/findBaseProduct',
        valueField:'code',
        textField:'name',
        onLoadSuccess: function () {
            if($("#desiredProduct").attr("product_value") != "") {
                $("#desiredProduct").combobox("select",$("#desiredProduct").attr("product_value"));
            }
        }
    });
	initAssets();
	// 初始化姓名全拼
	var name = $('#name').val();
	if(name&&name!=''){
		var nameSpell = pinyin.getFullChars(name);
		
		$('#nameSpell').val(nameSpell);
	}


})

function initAssets(){
	$('#isHasHourse').each(function() {
		if($(this).val()=='y'){
			$(this).prop('checked', true);
		}else{
			$(this).prop('checked', false);
		}
	});
	$('#isLiveWithParents').each(function() {
		if($(this).val()=='y'){
			$(this).prop('checked', true);
		}else{
			$(this).prop('checked', false);
		}
	});
	$('#isHasCar').each(function() {
		if($(this).val()=='y'){
			$(this).prop('checked', true);
    		if($("#carBrand").val() == '0'){
				$("#carBrand").val('');
			}
			if($("#carCardNo").val() == '0'){
				$("#carCardNo").val('');
			}
			if($("#carCount").val() == '0'){
				$("#carCount").val('');
			}
			if($("#purchaseCarPrice").val() == '0.00'){
				$("#purchaseCarPrice").val('');
			}
			if($("#purchaseCarYears").val() == '0'){
				$("#purchaseCarYears").val('');
			}
			if($("#carMonthlyPayment").val() == '0.00'){
				$("#carMonthlyPayment").val('');
			}
			$('#carinfo1,#carinfo2').show();
			$('#isHasCar').val('y');
		}else{
			if($("#carBrand").val() == ''){
				$("#carBrand").val('0');
			}
			if($("#carCardNo").val() == ''){
				$("#carCardNo").val('0');
			}
			if($("#carCount").val() == ''){
				$("#carCount").val('0');
			}
			if($("#purchaseCarPrice").val() == ''){
				$("#purchaseCarPrice").val('0.00');
			}
			if($("#purchaseCarYears").val() == ''){
				$("#purchaseCarYears").val('0');
			}
			if($("#carMonthlyPayment").val() == ''){
				$("#carMonthlyPayment").val('0.00');
			}
			
			$(this).prop('checked', false);
			$('#carinfo1,#carinfo2').hide();
			$('#isHasCar').val('n');
		}
	});
	var housingProperty = $('#housingPropertyNm').val();
	changeHousingProperty(housingProperty);
    $("#housingProperty").combobox({
		valueField:'itemCode',  
	    textField:'itemNameZh',
	    editable:false,
		url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=PROPERTYTYPE&status=1",
		onLoadSuccess: function(){
			$('#housingProperty').combobox('setValue',housingProperty);
		},
        onSelect: function(rec){
        	changeHousingProperty(rec.itemCode);
		}
	});
    
    $("#purchaseCarMode").combobox({
		valueField:'itemCode',  
	    textField:'itemNameZh',
	    editable:false,
		url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=CARSPAYWAY&status=1",
		onLoadSuccess: function(){
			if($('#purchaseCarModeNm').val() == null || $('#purchaseCarModeNm').val()==''){
				$('#purchaseCarMode').combobox('setValue',340);
			}else{
				$('#purchaseCarMode').combobox('setValue',$('#purchaseCarModeNm').val());
			}
		}
	});
    var acquireChannel = $('#acquireChannelNm').val();
    $("#acquireChannel").combobox({
		valueField:'itemCode',  
	    textField:'itemNameZh',
	    editable:false,
		url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=GETWAT&status=1",
		onLoadSuccess: function(){
			$('#acquireChannel').combobox('setValue',acquireChannel);
			changeAcquireChannel(acquireChannel);
		},
        onSelect: function(rec){
        	changeAcquireChannel(rec.itemCode);
		}
	});
    $("#isHasCar").change(function(){
    	requiredClass = "easyui-validatebox validatebox-text validatebox-invalid";
    	if($("#isHasCar").prop('checked') == true){
    		if($("#carBrand").val() == '0'){
				$("#carBrand").val('');
			}
			if($("#carCardNo").val() == '0'){
				$("#carCardNo").val('');
			}
			if($("#carCount").textbox("getValue") == '0'){
				$("#carCount").textbox('setValue','');
			}
			if($("#purchaseCarPrice").textbox("getValue") == '0.00'){
				$("#purchaseCarPrice").textbox('setValue','');
			}
			if($("#purchaseCarYears").textbox("getValue") == '0'){
				$("#purchaseCarYears").textbox('setValue','');
			}
			if($("#carMonthlyPayment").textbox("getValue") == '0.00'){
				$("#carMonthlyPayment").textbox('setValue','');
			}
    		$('#carinfo1,#carinfo2').show();
    		$('#isHasCar').val('y');
    	}else{
    		if($("#carBrand").val() == ''){
				$("#carBrand").val('0');
			}
			if($("#carCardNo").val() == ''){
				$("#carCardNo").val('0');
			}
			if($("#carCount").val() == ''){
				$("#carCount").val('0');
			}
			if($("#purchaseCarPrice").val() == ''){
				$("#purchaseCarPrice").val('0.00');
			}
			if($("#purchaseCarYears").val() == ''){
				$("#purchaseCarYears").val('0');
			}
			if($("#carMonthlyPayment").val() == ''){
				$("#carMonthlyPayment").val('0.00');
			}
    		$('#carinfo1,#carinfo2').hide();
    		$('#isHasCar').val('n');
    	}
    });
    
    $("#isLiveWithParents").change(function(){
    	if($("#isLiveWithParents").prop('checked') == true){
    		$('#isLiveWithParents').val('y');
    	}else{
    		$('#isLiveWithParents').val('n');
    	}
    });
}
function changeAcquireChannel(value){
	if(value == 'gt007'){
		if($('#acquireChannelRemark').val() == '@无'){
			$('#acquireChannelRemark').val('');
		}
		$('#acquireChannelRemark').show();
	}else{
		if($('#acquireChannelRemark').val() == ''){
			$('#acquireChannelRemark').val('@无');
		}
		$('#acquireChannelRemark').hide();
	}
}
function changeHousingProperty(housingProperty){
	requiredClass = "easyui-validatebox validatebox-text validatebox-invalid";
	if(housingProperty == '222' || housingProperty == '223' 
		|| housingProperty == '224'|| housingProperty == '226'){
		$("#isHasHourse").prop('checked',false);
		$("#isHasHourse").val('n');
		
		if($("#purchaseHoursePrice").val() == ''){
			$("#purchaseHoursePrice").val('0.00');
		}
		if($("#purchaseHourseYears").val() == ''){
			$("#purchaseHourseYears").val('0');
		}
		if($("#hourseCount").val() == ''){
			$("#hourseCount").val('0');
		}
		if($("#hourseMonthlyPayment").val() == ''){
			$("#hourseMonthlyPayment").val('0.00');
		}
		$('#hourseinfo1').hide();
		if($("#hourseRent").val() == '0.00'){
			$("#hourseRent").textbox('setValue','');
		}
		$('#hourseinfo2').show();
	}else{
		$("#isHasHourse").prop('checked',true);
		if($("#purchaseHoursePrice").val() == '0.00'){
			$("#purchaseHoursePrice").val('');
		}
		if($("#purchaseHourseYears").val() == '0'){
			$("#purchaseHourseYears").val('');
		}
		if($("#hourseCount").val() == '0'){
			$("#hourseCount").val('');
		}
		if($("#hourseMonthlyPayment").val() == '0.00'){
			$("#hourseMonthlyPayment").val('');
		}
		$('#hourseinfo1').show();
		
		if($("#hourseRent").val() == ''){
			$("#hourseRent").val('0.00');
		}
		$('#hourseinfo2').hide();
		$("#isHasHourse").val('y');
	}
	if(housingProperty == '226'){
		$("#housingRemark").prop('required',true);
		$("#housingRemark").addClass(requiredClass);
		$("#housingRemark").show();
	}else{
		$("#housingRemark").prop('required',false);
		$("#housingRemark").removeClass(requiredClass);
		$("#housingRemark").hide();
	}
}

 function getContactIdCardInfo(idCard) {
	 if(idCard == "") {
		 return "";
	 }
	 var sex = getSexByIdCard(idCard);
	 var zodiac = new Zodiac(getYearByIdCard(idCard),getMonthByIdCard(idCard),getDayByIdCard(idCard)).getZodiac();
	 var age = getAgeByIdCard(idCard);
	 $("#contact_idcard_info").html(sex+",属"+zodiac+",年龄"+age+"岁")
 }
	// 初始化姓名全拼
	var name = $('#name').val();
	if(name&&name!=''){
		var nameSpell = pinyin.getFullChars(name);
		$('#nameSpell').val(nameSpell);
	}
