$(document).ready(function(){

    var applyCode = $("#applyCode").val();
    var product = $("#product").val();
    var period = $("#period").val();

    if(!period||period==''){
    	period = 'finalVerifyTask';
    }
    
    $("#imageTypesTab a").each(function(){
        $(this).click(function(){
            //alert( $(this).attr("id"));
            var imageTypeCode = $(this).attr("id");
            $.ajax({
                url: basepath+"/image/showImagesByTypeCode",
                type: "POST",
                data: {
                    applyCode:applyCode,
                    product:product,
                    period:period,
                    imageTypeCode:imageTypeCode         
                },
                success: function(data, status) {
                	$("#clickCode").val(imageTypeCode);
              	     //加载评估页面
                	showImageValid(imageTypeCode);
                     if(data !=''){ 
                    	 
                    	 var form = document.createElement("form");
                    	 form.method = "post";
                    	 form.action = fastFileUrl+"/fileDispalyThumb.do";
                    	 form.target = "inputImageCheckIframe";
                    	 
                    	 var applyCodeInput = document.createElement("input");
                    	 applyCodeInput.type = "hidden";
                    	 applyCodeInput.name = "busiId";
                    	 applyCodeInput.value = applyCode;
                    	 form.appendChild(applyCodeInput);
                    	 
                    	 var keyInput = document.createElement("input");
                    	 keyInput.type = "hidden";
                    	 keyInput.name = "fileKey";
                    	 keyInput.value = data;
                    	 form.appendChild(keyInput);
                    	 
                    	 form.submit();
                     }else{
                    	 $('#inputImageCheck').attr("src","");
                    	 $.messager.alert('提示','该文件类型下没有影像文件！','info');
                    }
                }
            });
        });
    });

    //添加保存按钮功能
    $('#submitValidInfo').bind("click",function(){
        var id = $("input[name='id']").val();
        var imageTypeCode = $("input[name='clickCode']").val();
        var validType = $("input[name='validType']:checked").val();
        if(validType == null || validType == ''){
            $.messager.alert('','请评估影像文件');
            return;
        }
        var imageTypeName = $("input[name='"+imageTypeCode+"-name']").val();
        var materialRemark = $("input[name='materialRemark']").val();
        $.ajax({
            url: basepath+"/image/saveOrUpdateImageCheckRecord",
            type: "POST",
            data: {
                applyCode:applyCode,
                imageTypeCode:imageTypeCode,
                imageName:imageTypeName,
                validType:validType,
                materialRemark:materialRemark,
                dealPeriod:period,
                id:id
            },
            success: function(data, status) {
                var code=data.code;
                if(code == "9999"){
                    var msg=data.msg;
                    $.messager.alert('',msg);
                }
                if(code == "0000"){
                    //成功以后刷新当前评估信息，主要目的是为了新增时产生的ID
                    $.messager.alert('提示','保存成功','info',showImageValid(imageTypeCode));
                }
            }
        });

    });

    //加载影像评估信息
    function showImageValid(imageTypeCode){
        $.ajax({
            url: basepath+"/image/showImageValid",
            type: "POST",
            data: {
                imageTypeCode:imageTypeCode,
                applyCode:applyCode,
                dealPeriod:period
            },
            success: function(data, status) {
                $('#imageValidDiv').html("");
                $('#imageValidDiv').append(data);
                var validTypeValue = $("input[name='validTypeValue']").val();
                if(validTypeValue !== 'undefined' ||  validTypeValue!== ""){
                    $("input[name='validType'][value='"+validTypeValue+"']").attr('checked',true);
                }
                $('.new-img-tag[name = "'+imageTypeCode+'"]').hide();
            }
        });
    }

});



