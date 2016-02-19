$(function() {
	var p = $('#caseManageReview').datagrid('getPager');

	$(p).pagination({
		displayMsg : '当前显示从{from}到{to}共{total}记录',
		beforePageText : '第',
		afterPageText : '页，共{pages}页',
		loading : false,
		onSelectPage : function(pageNumber, pageSize) {
			loadData(pageNumber, pageSize);
		}
	});

	var pageSize = $('#caseManageReview').datagrid('getPager').data(
			"pagination").options.pageSize;
	loadData(1, pageSize);// 默认查询10条数据
	
	var p2 = $('#caseManageReview2').datagrid('getPager');

	$(p2).pagination({
		displayMsg : '当前显示从{from}到{to}共{total}记录',
		beforePageText : '第',
		afterPageText : '页，共{pages}页',
		loading : false,
		onSelectPage : function(pageNumber, pageSize) {
			loadData2(pageNumber, pageSize);
		}
	});

	var pageSize2 = $('#caseManageReview2').datagrid('getPager').data(
			"pagination").options.pageSize;
	loadData2(1, pageSize2);// 默认查询10条数据
});
function loadData(pageNo, pageSize) {
	$.ajax({
		url : "../caseManagement/queryRefusePage",
		type : "POST",
		data : {
			pageNumber : pageNo,
			pageSize : pageSize,
			name : $("#name").val(),
			applyCode : $("#applyCode").val()
		},
		success : function(data, status) {
			if (data) {
				$('#caseManageReview').datagrid('loadData', data);
			}
		}
	});
}
function loadData2(pageNo, pageSize) {
	$.ajax({
		url : "../reconsideration/querySignPage",
		type : "POST",
		data : {
			pageNumber : pageNo,
			pageSize : pageSize,
			name : $("#name2").val(),
			applyCode : $("#applyCode2").val()
		},
		success : function(data, status) {
			if (data) {
				$('#caseManageReview2').datagrid('loadData', data);
			}
		}
	});
}
function queryAll() {
	var pageSize = $('#caseManageReview').datagrid('getPager').data(
			"pagination").options.pageSize;
	$.ajax({
		url : "../caseManagement/queryRefusePage",
		type : "POST",
		data : {
			pageNumber : 1,
			pageSize : pageSize,
			name : $("#name").val(),
			applyCode : $("#applyCode").val()
		},
		success : function(data, status) {
			if (data) {
				$('#caseManageReview').datagrid('loadData', data);
				// 分页栏上跳转到第一页
				$('#caseManageReview').datagrid('getPager').pagination({
					pageNumber : 1
				});
			}
		}
	});
}

function queryAll2() {
	var pageSize = $('#caseManageReview2').datagrid('getPager').data(
			"pagination").options.pageSize;
	$.ajax({
		url : "../reconsideration/querySignPage",
		type : "POST",
		data : {
			pageNumber : 1,
			pageSize : pageSize,
			name : $("#name2").val(),
			applyCode : $("#applyCode2").val()
		},
		success : function(data, status) {
			if (data) {
				$('#caseManageReview2').datagrid('loadData', data);
				// 分页栏上跳转到第一页
				$('#caseManageReview2').datagrid('getPager').pagination({
					pageNumber : 1
				});
			}
		}
	});
}
function openRemarkDialog() {
	if ($('#caseManageReview').datagrid('getSelected'))
		$('#remarkDialog').dialog('open');
	else
		$.messager.alert('提示', "未选中待复议案件!", "info");
}
function openRemarkDialog2(){
	if ($('#caseManageReview2').datagrid('getSelected'))
		$('#remarkDialog2').dialog('open');
	else
		$.messager.alert('提示', "未选中待复议案件!", "info");
}
function dealSelectedReview() {
	var date = new Date();
	var row = $('#caseManageReview').datagrid('getSelected');
	if (row) {
		var refusedate = new Date(row.createdTime);

		if (getTodayDatestr(date) <= getTodayDatestr(refusedate)) {// getTodayDatestr(refusedate)
			$.messager.alert("提示", "当前案件还未到复议日期，不能进行复议操作！", "info");
		} else {
			$.ajax({
				url : "../reconsideration/applyRefuseReconsider",
				type : "POST",
				data : {
					applyCode : row.applyCode,
					remark : $("#remarkTextarea").val()
				},
				success : function(data, status) {
					if (data == false) {
						$.messager.alert('提示', "该客户不能复议!", "info");
					} else if (data == true) {

						$.messager.alert('提示', "案件复议成功!", "info");
						queryAll();
						$('#remarkDialog').dialog('close');
					} else {
						$.messager.alert('错误', "服务请求异常!", "error");
					}
				},
				error : function(status) {
					// alert(status.status);
					$.messager.alert('错误', "服务请求异常!", "error");
				}
			});
		}
	} else {
		$.messager.alert('提示', "未选中待复议案件!", "info");
	}
}

function dealSelectedReview2() {
	var date = new Date();
	var row = $('#caseManageReview2').datagrid('getSelected');
	if (row) {

		$.ajax({
			url : "../reconsideration/applyDetailReconsider",
			type : "POST",
			data : {
				applyCode : row.applyNo,
				remark : $("#remarkTextarea2").val()
			},
			success : function(data, status) {
				if (data == false) {
					$.messager.alert('提示', "该客户不能复议!", "info");
				} else if (data == true) {
					queryAll2();
					$.messager.alert('提示', "案件复议成功!", "info");
					$('#remarkDialog2').dialog('close');
				} else {
					$.messager.alert('错误', "服务请求异常!", "error");
				}
			},
			error : function(status) {
				// alert(status.status);
				$.messager.alert('错误', "服务请求异常!", "error");
			}
		});
	} else {
		$.messager.alert('提示', "未选中待复议案件!", "info");
	}
}

function getTodayDatestr(date) {
	var dateStr = date.getFullYear() + "-";
	if (date.getMonth() + 1 < 10) {
		dateStr += "0" + (date.getMonth() + 1) + "-";
		if (date.getDate() < 10) {
			dateStr += "0" + date.getDate();
		} else {
			dateStr += date.getDate();
		}
	} else {
		dateStr += (date.getMonth() + 1) + "-";
		if (date.getDate() < 10) {
			dateStr += "0" + date.getDate();
		} else {
			dateStr += date.getDate();
		}
	}
	return dateStr;
}
