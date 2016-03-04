var currentTaskPeriod = $("input[name='viewperiod']").val();
$(function() {

	var applyCode = $("input[name='viewapplycode']").val();
	var product = $("input[name='viewproduct']").val();
	var period = $("input[name='viewperiod']").val();
	var periodName = $("input[name='viewperiodName']").val();
	var applyName = $("input[name='viewName']").val();

	setIframeSrc(applyCode, product, period);
	$('#tabsdiv').tabs(
			{
				onSelect : function(title, index) {
					// 进入影像材料评估tab
					if (index != 0) {
						if (!$("input[name='viewproduct']").val()
								|| $("input[name='viewproduct']").val() == '') {
							$.messager.alert('提示',
									"未选择申请产品，请先在客户信息核查页面保存'申请产品'！", 'error');
							return false;
						}
					}
					return true;
				}
			});
});

function setIframeSrc(applyCode, product, period) {
	$("#uploadFileIframe").attr("src", basepath + "/image/uploadview?applyCode=" + applyCode + "&product=" + product + "&period=" + period);
	if ($("#viewFileIframe"))
		$("#viewFileIframe").attr("src", basepath + "/image/caseImageCheck?applyCode=" + applyCode + "&product=" + product + "&period=" + period);
}