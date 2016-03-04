$(function() {
	// 抓取录入明细表单内全部按钮并设置为不可操作
	$(".easyui-tabs").tabs({
		onLoad : function() {
			$("#detailInfoTab .easyui-linkbutton").remove();
			$("#detailInfoTab .btn-remov").remove();
			$("#detailInfoTab .addOtherContactsOper").remove();
		}
	});
	$("#uploadFileTab iframe").attr("src", uploadFileSrc);
	$("#viewFileTab iframe").attr("src", viewFileSrc);
	$("#completeReturnCaseBtn").bind('click', function() {
		$.messager.confirm('提示', "是否确认提交回审批？", function(r) {
			if (!r)
				return;
			$.post(basepath + "/apply/returnCase/complete", {
				applyCode : applyCode
			}, function(data) {
				if (data != '' && typeof (data) != 'object') {
					data = $.parseJSON(data);
				}
				if (data.code == "0000") {
					$.messager.alert('提示', '提交成功', 'info', function() {
						colseCurTab();
					});
				} else {
					$.messager.alert('提示', data.msg);
				}
			}, "json");
		});

	});
});