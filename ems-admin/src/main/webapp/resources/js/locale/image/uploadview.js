
var applyCode = $('#applyCode').val();
var product = $('#product').val();
var period = $('#period').val();
var basepath = $('#basepath').val();

$(function(){

    $('#file_upload').uploadify({
        'formData'      : {'applyCode' : applyCode, 'period' : period},
        'swf'      : basepath+'/resources/swf/uploadify.swf',
        'uploader' : basepath+'/image/upload',
        'height': 25,
        'whith' :120,
        'fileSizeLimit' : '4000KB',
        'auto'  : false,
        'fileDataName':'file',
        'buttonText' : '选择文件...',
        'fileTypeExts' : '*.jpg;*.doc;.docx;*.html;*.pdf;*.png;*.bmp;*.jpeg;*.xls;*.xlsx',
        'multi'    : true,
        'method'   :'post',
        'debug':false,
        'onUploadStart' : function(file) {
            //var param = {};
            //param.picHref = $('#file_upload_href').val();
            //$("#file_upload").uploadify("settings", "formData", param);
        },
        'onUploadSuccess' : function(file, data, response) {
            data = $.parseJSON(data);
            if(data.code === '0001'){
                $.messager.alert('提示',data.msg,"warn");
                $.messager.progress('close');
                return
            }
            //$.messager.progress('close');
            $('#cc').layout('remove','center');
            $('#cc').layout('add',{
                region: 'center',
                title: '影像文件材料面板',
                href: basepath+'/image/applyImages?applyCode='+applyCode+'&product='+product+'&period='+period+''
            });
        },
        'onUploadError' : function(file, errorCode, errorMsg, errorString) {
            //alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
        }

    });

    $('#updateImageCode').form({
        success:function(data){
            $('#cc').layout('remove','center');
            $('#cc').layout('add',{
                region: 'center',
                title: '影像文件材料面板',
                href: basepath+'/image/applyImages?applyCode='+applyCode+'&product='+product+'&period='+period+''
            });
        }
    });

    $( "#updateButton" ).on( "click", function( event ) {
        var str="";
        $("input[name='imgId']:checked").each(function(){
            var inputstr = "<input type='hidden' name='imgId' value='"+$(this).val()+"' />";
            str+=inputstr;
        })
        if (str == "") {
           $.messager.alert('出现错误','请选择归类影像材料   ','error');
           return false;
        }
        var radioval = $("input[name='imageTypeCode']:checked").val();
        if (typeof(radioval) == "undefined") {
           $.messager.alert('出现错误','请选择归类选项','error');
           return false;
        }
        radioval = radioval.split("|");
        var radiostr = "<input type='hidden' name='imageTypeCode' value='"+radioval[0]+"' />" +  "<input type='hidden' name='imageTypeName' value='"+radioval[1]+"' />";
        str+= radiostr;
        $('#updateImageCode').html(str);
        $('#updateImageCode').form('submit');

    });

    $( "a[name='showTypeImgs']" ).on( "click", function( event ) {

        var imageTypeCode = $(this).attr("value");
        $('#cc').layout('remove','center');
        $('#cc').layout('add',{
            region: 'center',
            title: '影像文件材料面板',
            href: basepath+'/image/applyImages?applyCode='+applyCode+'&product='+product+'&period='+period+'&imageTypeCode='+imageTypeCode
        });
    });

    $( "#showALLImgs" ).on( "click", function( event ) {

        $('#cc').layout('remove','center');
        $('#cc').layout('add',{
            region: 'center',
            title: '影像文件材料面板',
            href: basepath+'/image/applyImages?applyCode='+applyCode+'&product='+product+'&period='+period+''
        });
    });



});