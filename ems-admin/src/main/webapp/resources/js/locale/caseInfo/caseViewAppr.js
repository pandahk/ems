var lastTabs = new Array();
$(function(){
    var applyCode = $("input[name='viewapplycode']").val();
    var period="firstVerifyTask";

    lastTabs.push(0);

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