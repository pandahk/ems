/**
 * Created by panxing on 2016/1/19.
 */
function editRecordDescription(id,description) {
    $("#edit_phone_check_record_id").val('').val(id);
    $("#edit_phone_check_record_description").val('').val(description);
    $('#edit_phone_check_record_dialog').dialog('open');
    $("#edit_phone_check_record_dialog").panel("move",{top:$(document).scrollTop() + ($(window).height()-300) * 0.5});

}

function submitEditPhoneCheck() {
    if($.trim($("#edit_phone_check_record_description").val())=="") {
        $.messager.alert('Warning','请输入电核备注');
        return;
    }

    $("#edit_phone_check_record_form").ajaxSubmit({
        url : basepath + '/phoneCheck/updatePhoneCheckRemark',
        dataType : 'json',
        type : 'post',
        error : function(){
        },
        success : function(data) {
            if(data.code == "0000") {
                $("#"+$("#edit_phone_check_record_id").val()+"_descrition").html($.trim($("#edit_phone_check_record_description").val()));
                $("#"+$("#edit_phone_check_record_id").val()+"_btn").attr("onclick","editRecordDescription('"+$("#edit_phone_check_record_id").val()+"','"+$.trim($("#edit_phone_check_record_description").val())+"')");
                $('#edit_phone_check_record_dialog').dialog('close')
            } else {
                $.messager.alert('提示',data.msg);
            }
        }
    })
}