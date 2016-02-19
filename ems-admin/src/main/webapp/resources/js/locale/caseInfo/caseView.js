var lastTabs = new Array();
$(function(){
    var applyCode = $("input[name='viewapplycode']").val();
    var period="firstVerifyTask";
    /*var tab0 = $('#tabsdiv').tabs('getTab',0);  // get selected panel
    $('#tabsdiv').tabs('update', {
        tab: tab0,
        options: {
            href: basepath+"/caseInfo/caseApply?applyCode="+applyCode+"&period="+period,  // the new content URL
        }
    });
    tab0.panel('refresh', basepath+"/caseInfo/caseApply?applyCode="+applyCode+"&period="+period);*/
    lastTabs.push(0);
//    var tab1 = $('#tabsdiv').tabs('getTab',1);  // get selected panel
//    $('#tabsdiv').tabs('update', {
//        tab: tab1,
//        options: {
//            href: basepath + "/caseInfo/contractInfo?applyCode=" +applyCode,  // the new content URL
//        }
//    });
//    tab1.panel('refresh',  basepath + "/caseInfo/contractInfo?applyCode=" +applyCode);
    
    var tab3 = $('#tabsdiv').tabs('getTab',3);  // get selected panel
    
    $('#tabsdiv').tabs({	
        onSelect: function(title,index){
        	   //移除 tt 
            lastTabs = $.grep(lastTabs, function(n, i) { return n != index; }); 
            lastTabs.push(index); //重新压入，保证 最新的在最上面
            return true;
        }
    });
});