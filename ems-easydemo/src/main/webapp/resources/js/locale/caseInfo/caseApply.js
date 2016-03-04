var insidelastTabs = new Array();
$(function(){
    var applyCode = $("input[name='Applyapplycode']").val();
    var period="firstVerifyTask";
    var tab0 = $('#insidetabsdiv').tabs('getTab',0);  // get selected panel
    $('#insidetabsdiv').tabs('update', {
        tab: tab0,
        options: {
            href: basepath+"/caseInfo/caseApplyCheckInfo?applyCode="+applyCode+"&period="+period,  // the new content URL
        }
    });
    tab0.panel('refresh', basepath+"/caseInfo/caseApplyCheckInfo?applyCode="+applyCode+"&period="+period);
    insidelastTabs.push(0);

    $('#insidetabsdiv').tabs({	
        onSelect: function(title,index){
        	   //移除 tt 
        	insidelastTabs = $.grep(insidelastTabs, function(n, i) { return n != index; }); 
                     
/*            if(index == 1){
            	$.messager.alert("提示","影响系统评估","info");
            	$('#insidetabsdiv').tabs('select', insidelastTabs.pop());
                return false;
            }   */  
            insidelastTabs.push(index); //重新压入，保证 最新的在最上面
            return true;
        }
    });
});