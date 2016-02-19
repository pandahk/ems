var timer1 ;
function makeCall(applyCode,phoneNumber,name,relation,source,relationCode,sourceCode) {
    $("#phone_check_form").form('clear');
    var csid = applyCode + "-" +new Date().format("yy-MM-dd-HH-mm-ss").replace(/-/g,"");
    var url = "http://127.0.0.1:10000/agent/call?dst="+phoneNumber+"&prefix=&csid="+csid+"&disp=&popup=";
    $.ajax({
        url : url,
        type : 'post',
        dataType : "jsonp",
        success : function(data) {
            if(data == undefined || data.header != '300') {
                alert("呼叫失败");
            } else {
                $("#phone_check_dialog").slideDown();
                $("#phone_check_apply_source").val(source);
                $("#phone_check_apply_name").val(name);
                $("#phone_check_apply_relation").val(relation);
                $("#phone_check_apply_code").val(applyCode);
                $("#phone_check_apply_phone_number").val(phoneNumber);
                $("#phone_check_apply_cs_id").val(csid);
                if(relation == "" && relationCode != "") {
                    getNameByDictCode(relationCode,"phone_check_apply_relation");
                }
                if(source == "" && sourceCode != "") {
                    getNameByDictCode(sourceCode,"phone_check_apply_source");
                }
                $("#phone_check_hangup").linkbutton("enable");
                $("#phone_check_submit").linkbutton("disable");
                phoneTimeRun();
                
            }
        }
    })
};

function publicMakeCall(applyCode){
	var publicNumber = $("#publicNumber").combobox("getText");
	if(publicNumber!=''){
		makeCall(applyCode,publicNumber,"公共号码","","申请单");
	}
	return ;
}

function phoneTimeRun(){
	$("#jsTime").html("通话时长：00:00:00");
	var hour = 0;
	var min = 0;
	var second = 0;
	var interval = 1;//间隔若干秒
	timer1 = setInterval(function myInterval(){
		second = parseInt(second) + parseInt(interval);
		if(second == 60){
			min = parseInt(min) + 1;
			second = 0;
		}
		if(min == 60){
			hour = parseInt(hour) + 1;
			min = 0;
		}
		var hourStr ='';
		var minStr  ='';
		var secondStr  ='';
		if(parseInt(second)<10){
			secondStr = '0' + second;
		}else{
			secondStr = second;
		}
		if(parseInt(min)<10){
			minStr  = '0' + min;
		}else{
			minStr  =  min;
		}
		if(parseInt(hour)<10){
			hourStr = '0' + hour;
		}else{
			hourStr = hour;
		}
		
		$("#jsTime").html("通话时长：" +hourStr + ":" + minStr + ":" + secondStr);
	},interval * 1000);
}

function getNameByDictCode(code,docId) {
    $.ajax({
        url : basepath + '/dict/findOptionitemByCode?code='+code,
        dataType : 'json',
        type : 'get',
        success : function(data) {
            if(data != undefined && data.itemNameZh != "") {
                $("#"+docId).val(data.itemNameZh);
            }
        }
    })
}

function hangup() {
	clearInterval(timer1);
	$("#phone_check_hangup").linkbutton("disable");
	$("#phone_check_submit").linkbutton('enable');
    $.ajax({
        url : 'http://127.0.0.1:10000/agent/hangup',
        dataType : 'jsonp'
    })
}

function savePhoneCheckRecord() {
	
    if(!$('#phone_check_form').form('validate')){
    	return false;
    }
    $("#phone_check_form").ajaxSubmit({
        url: basepath + '/phoneCheck/savePhoneCheckRecord',
        dataType : 'json',
        type : 'post',
        success : function(data) {
            if(data == undefined || data.code != '0000') {
                $.messager.alert("提示","提交错误");
            }else {
                $("#phone_check_dialog").slideUp();
                $("#phone_check_form").form('clear');
            }
        }
    })
}

function findPhoneCheckNameList() {
    var applyCode = $("#applyCode").val();
    $.ajax({
        url : basepath + '/phoneCheck/findPhoneCheckNameList?applyCode='+applyCode,
        dataType : 'json',
        type : 'get',
        success : function(data) {
            if(data == undefined || data == null || data.length == 0) {
                $("#phone_check_tab").html("当前没有电核历史");
                return;
            }
            $("#phone_check_tab").tabs();

            $.each(data,function(i,value){
                $("#phone_check_tab").tabs('add',{
                    title : function(){
                    	if(value.name == '' && value.relation!=''){
                    		return value.relation;
                    	}else if(value.relation=='' && value.name != ''){
                    		return value.name;
                    	}else{
                    		return value.relation + "-" + value.name;
                    	}
                    },
                    href : basepath + '/phoneCheck/findPhoneCheckListByParamWithEdit?applyCode='+applyCode+"&name="+value.name + "&relation=" + value.relation,
                });
            })
        }
    })
}

$(function(){
    findPhoneCheckNameList();
})