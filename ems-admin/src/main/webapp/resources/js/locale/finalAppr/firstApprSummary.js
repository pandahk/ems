$(function(){	
	loadData(GetQueryString('applyCode'));
	$('#approvedProduct > a').text(getProductDesc($('#approvedProduct').attr('productValue')));
});  
function loadData(applyCode){		 
	      $.ajax({
	           url: "../finalAppr/findImageCheckRecord",
	           type: "POST",
	           data: {            	   
	        	   applyCode:applyCode
	           },
	           success: function(data, status) {
	           	 if(data){		           	   
	           	   $('#imageCheckRecordList').datagrid('loadData',data); 
	           	   $('#imageCheckRecordList').datagrid('loaded');
	           	 }
	           	 }
          });
}
function formatValue(val,row){
    if(val=='INVALID'){
  	  return '无效';
    }else if(val=='VALID'){
  	  return '有效';
    }else if(val=='NO_PROVIDE'){
  	  return '未提供';
    }else if(val=='FORGE'){
  	  return '伪造';
    }
}
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
    	return unescape(r[2]); return null;
}