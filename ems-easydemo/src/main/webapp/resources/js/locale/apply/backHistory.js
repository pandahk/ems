$(function(){
	if(!applyCode){
		var applyCode = $("input[name='viewapplycode']").val();
	}
    $('#InputCheckResult').panel({
        href:basepath+"/apply/InputCheckResult?applyCode="+applyCode,
        onLoad:function(){
        }
    });
});