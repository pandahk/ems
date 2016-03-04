var toolbar = [ {
	text : '新增',
	iconCls : 'icon-add',
	handler : function() {
		$("#addRegisterDialog").dialog({
			title : "申请登记",
			width : 800,
			height : 180,
			loadingMessage : "数据加载中...",
			closable : false,
			closed : true,
			modal : true,
			collapsible : false,
			minimizable : false,
			maximizable : false,
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
					submitForm();					
				}
			}, {
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function() {
					$('#addRegisterDialog').dialog('close');
				}
			} ],
			onClose : function() {
				$('#addRegisterDialog').form('clear');
				$('#salesCode').combobox("loadData",[]);
			}
		});
		$("#addRegisterDialog").dialog('open');
	}
} ];
$(function() {
	$('#applyInfoList').datagrid({
		rownumbers : true,
		singleSelect : true,
		autoRowHeight : false,
		columns : [[ {
			field : 'applyCode',
			title : '申请编号',
			width : 250
		}, {
			field : 'name',
			title : '客户姓名',
			width : 150
		}, {
			field : 'idCardNo',
			title : '身份证号',
			width : 250,
			align : 'right'
		}, {
			field : 'applyInfoStatusEnum',
			title : '状态',
			width : 100,
			align : 'right'
		}, {
			field : 'createdUserName',
			title : '客服',
			width : 100
		}, {
			field : 'salesName',
			title : '销售员',
			width : 150,
			align : 'center'
		}, {
			field : 'managerName',
			title : '团队经理',
			width : 150,
			align : 'center'
		}, {
			field : 'branchName',
			title : '门店',
			width : 250,
			align : 'center'
		}]],
		toolbar : toolbar
	});
	$('#applyInfoListPage').pagination({
		displayMsg : '当前显示从{from}到{to}共{total}记录',
		beforePageText : '第',
		afterPageText : '页，共{pages}页',
		loading : false,
		pageSize : 30,
		onSelectPage : function(pageNumber, pageSize) {
			loadData(pageNumber, pageSize);
		}
	});
	loadData($('#applyInfoListPage').pagination('options').pageNumber, $('#applyInfoListPage').pagination('options').pageSize);
	$('#queryApplyInfo').click(function() {
		loadData($('#applyInfoListPage').pagination('options').pageNumber, $('#applyInfoListPage').pagination('options').pageSize);
	});

	$('#reset').click(function() {
		$('#name').val('');
		$('#idCardNo').val('');
	});
});
function loadData(pageNo, pageSize) {
	var name = $("#name").val();
	var idCardNo = $("#idCardNo").val();
	$.ajax({
		url : "../apply/selectApplyInfoPage",
		type : "POST",
		data : {
			name : name,
			idCardNo : idCardNo,
			pageNo : pageNo,
			pageSize : pageSize
		},
		success : function(data, status) {
			if (data) {
				if(data.rows){
					for(var i = 0;i<data.rows.length;i++){
						var idCardNo = data.rows[i].idCardNo;
						
						if (idCardNo && idCardNo.length >= 14) {
							var s1 = idCardNo.substring(0, 6);
							var s2 = idCardNo.substring(6, 14);
							var s3 = idCardNo.substring(14);
							
							data.rows[i].idCardNo = s1 + '********' + s3;
						}
					}
				}
				$('#applyInfoList').datagrid('loadData', data.rows);
				$('#applyInfoListPage').pagination('refresh',{	// 改变选项，并刷新分页栏信息
					total: data.total,
					pageNumber: pageNo
				})
				$('#applyInfoList').datagrid('loaded');
			}
		}
	});
}
function submitForm() {
	$('#saveApplyInfosForm').form('submit', {
		onSubmit : function() {
			$.messager.progress({
				msg : '正在保存中,请稍后......'
			});
			if ($(this).form('enableValidation').form('validate')) {
				setTimeout(function() {
					loadData($('#applyInfoListPage').pagination('options').pageNumber, $('#applyInfoListPage').pagination('options').pageSize);
				}, 1500);				
				return true;
			} else {
				$.messager.progress('close');
				return false;
			}
		},
		success : function(data, status) {
			$('#addRegisterDialog').dialog('close');
			$.messager.progress('close');
			data = jQuery.parseJSON(data);
			if (data.status == 'success') {
				$.messager.alert('提示', data.msgInfo, "info");
			} else {
				$.messager.alert('错误', "登记失败，请联系相关人员", "error");
			}
		},
		error : function(status) {
			// alert(status.status);
			$.messager.progress('close');
			$.messager.alert('错误', "保存登记信息失败！", "error");
		}
	});
}