$(document).ready(function(){
    var applyCode = $("#applyCode").val();
    var product = $("#product").val();
    var period = $("#period").val();
    $('#approvalCheckDiv').layout();
    $('#approvalCheckDiv').layout('add',{
        region: 'east',
        width: 250,
        title: '影像文件类型',
        split: true,
        href:basepath+"/image/findCaseImageTypes?period="+period+"&applyCode="+applyCode+"&product="+product
    });



});



