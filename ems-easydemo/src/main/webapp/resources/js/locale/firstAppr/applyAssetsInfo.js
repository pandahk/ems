$(function() {
	initAssets();
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
		if($("input[name='hourseRent']").val() == '0.00'){
			$("input[name='hourseRent']").val('');
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
		
		if($("input[name='hourseRent']").val() == ''){
			$("input[name='hourseRent']").val('0.00');
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
