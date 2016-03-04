var applyCode = $('#applyCode').val();
var product = $('#product').val();
var period = $('#period').val();
var basepath = $('#basepath').val();

$(function() {
	$("form[name='removeForm']").form(
			{
				success : function(data) {
					if(data.indexOf("ok")<0){
                    	$.messager.alert('提示','删除失败！');
                    	return false;
            	 	}else{
            	 		$.messager.alert('提示','删除成功！');
            	 	}
					 iframeOnload();
				}
			});
	$("form[name='removeForm']>:button[name='removeButton']").click(function() {
		var form = this.form;
		$.messager.confirm('提示', '是否确认删除该影像', function(r) {
			if (r) {
				$(form).form('submit');
			}
		});
	});
	
	$("input[name='removeSelectButton']").click(function() {
		var arrayCheck = new Array();
		var fileUnable = $("input[name='imgId']:checked.file-removeunable");
		var fileAble = $("input[name='imgId']:checked.file-removeable");
		var unablesize = fileUnable.size();
		var ablesize = fileAble.size();
		var size = unablesize + ablesize;
		if (size == 0) {
			$.messager.alert('提示', '请勾选你删除的数据！');
			return false;
		}
		if (unablesize > 0) {
			$.messager.alert('提示', '只可删除本节点上传的影像！');
			return false;
		}
		fileAble.each(function(){
            var inputstr = $(this).val();
            arrayCheck.push(Number(inputstr));
        });
        
        $.messager.confirm('提示', '是否确认删除该影像', function(r) {
		if (r) {
		     $.ajax({
	             type: "POST",
	             url: basepath+'/image/removeSelectImage',
	             data: {imgId:arrayCheck},
	             dataType: "json",
	             success: function(data){
	            	 	if(data.status!="ok"){
	                    	$.messager.alert('提示','删除失败！');
	                    	return false;
	            	 	}else{
	            	 		$.messager.alert('提示','删除成功！');
	            	 	}
	            	 	iframeOnload();
	              },error:function(a){
	                	 iframeOnload();
	             }
	         });
				$(form).form('submit');
			}
		});
	});
	
});


function iframeOnload(){
	$('#cc').layout('remove', 'center');
	$('#cc').layout(
			'add',
			{
				region : 'center',
				title : '影像文件材料面板',
				href : basepath + '/image/applyImages?applyCode=' + applyCode + '&product=' + product + '&period=' + period
			});
}
function opennewwindow(url) {
	window.open(url);
}
function showImageWindow(url,title){
	$('#imgIframe').attr("src", url);
	$('#winopen-img').window({title:title});
	$('#winopen-img').window('open');
}