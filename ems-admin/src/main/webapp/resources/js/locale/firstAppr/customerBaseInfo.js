 var applyPhonesCount=0;
    	 var applyPhones= eval($("#applyPhones").val()); 
    	 if(applyPhones!=null){
         for(var i=0;i<applyPhones.length;i++){      	 
      	 var applyPhone=applyPhones[i];
           var adddiv='<tr>'+
  			    '<td><input type="hidden" name="applyPhoneList['+(applyPhonesCount)+'].id" id="applyPhoneId'+(applyPhonesCount)+'" value="'+applyPhone.id+'"><div onclick="javascript:removApplyPhone(this)" id="remove'+(applyPhonesCount)+'"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'+
  			    '<td  style="font-size:12px; ">来源：</td>'+
				'<td  align="left" >'+
				'<input type="text" name="applyPhoneList['+(applyPhonesCount)+'].phoneResource"  value="'+applyPhone.phoneResource+'"  id="phoneResource'+(applyPhonesCount)+'" class="input input-boder-color" '+
				'</td>'+
  			    '<td  style="font-size:12px; ">手机号码：</td>'+
  				'<td  align="left" >'+
  				'<input type="text"name="applyPhoneList['+(applyPhonesCount)+'].phoneNum" value="'+applyPhone.phoneNum+'" id="phoneNum'+(applyPhonesCount)+'" >'+
  				'<img id="img'+applyPhonesCount +'" src="'+basepath+'/resources/images/make_call.png" onclick="makeCall(\''+$("#applyCode").val()+'\',\''+applyPhone.phoneNum+'\',\''+$("#applyBasename1").val()+'\',\'本人\',\'\',\'\',\''+applyPhone.phoneResource+'\')"/>' +
  				'</td>'+
  			    '<td  style="font-size:12px; ">备注：</td>'+
  				'<td  align="left" >'+
  				'<input type="text" name="applyPhoneList['+(applyPhonesCount)+'].remark"  value="'+applyPhone.remark+'"  id="remark'+(applyPhonesCount)+'" >'+
  				'</td>'+	
  				'<input type="hidden"  name="applyPhoneList['+(applyPhonesCount)+'].phoneModel" value="'+applyPhone.phoneModel+'"/>'+
  			'</tr> ';
          $("#otherApplyPhones").append(adddiv);
          $("#phoneResource"+(applyPhonesCount)).combobox({
        	  	valueField:'itemCode',  
    		    textField:'itemNameZh',
    		    editable:true,
    			url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1",
    			onLoadSuccess:function(){
    				if(applyPhone.phoneResource!=null&&applyPhone.phoneResource!=''){
    	            	$("#phoneResource"+(applyPhonesCount)).combobox('setValue',applyPhone.phoneResource);
    	            }
    			}
    		});
            applyPhonesCount+=1;
         }
    	}
        $("#addApplyPhonesOper").click(function(){         
          var adddiv='<tr>'+
            '<td><input type="hidden" name="applyPhoneList['+(applyPhonesCount)+'].id" id="applyPhoneId'+(applyPhonesCount)+'"><div onclick="javascript:removApplyPhone(this)" id="remove'+(applyPhonesCount)+'"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'+
			'<td  style="font-size:12px; ">来源：</td>'+
			'<td  align="left" >'+
			'<input type="text" name="applyPhoneList['+(applyPhonesCount)+'].phoneResource"  id="phoneResource'+(applyPhonesCount)+'" class="input input-boder-color" />'+
			'</td>'+
			'<td  style="font-size:12px; ">手机号码：</td>'+
			'<td  align="left" >'+
			'<input type="text"name="applyPhoneList['+(applyPhonesCount)+'].phoneNum"  id="phoneNum'+(applyPhonesCount)+'"  />'+
			'</td>'+
			'<td  style="font-size:12px; ">备注：</td>'+
			'<td  align="left" >'+
			'<input type="text" name="applyPhoneList['+(applyPhonesCount)+'].remark"  id="remark'+(applyPhonesCount)+'" />'+
			'</td>'+
			'<input type="hidden" name="applyPhoneList['+(applyPhonesCount)+'].phoneModel" value="BASEPHONE"/>'+
  		   '</tr> ';
            
           $("#otherApplyPhones").append(adddiv);   
  	       $("#phoneResource"+(applyPhonesCount)).combobox({
  	    	  	valueField:'itemCode',  
  	    	  	textField:'itemNameZh',
			    editable:true,
				url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1"
			});
  	        applyPhonesCount+=1;
          }); 
          function removApplyPhone(node){
           $.messager.confirm("确认", "确定删除该联系方式吗？", function(r) {
  		  if (r) {	
  			   
  			  var applyPhoneId=node.parentNode.firstChild.value;			  
          	  if(isIe()){
          	  node.parentNode.parentNode.removeNode(true);  
          	  }else if(isChrome()){
          	  node.parentNode.parentNode.remove();
          	  }else if(isFF()){
          	  var temp=node.parentNode.parentNode.parentNode;
          	  temp.removeChild(node.parentNode.parentNode);
          	  }
          	  applyPhonesCount-=1;
          	  if(applyPhoneId!=''){
          	  $.ajax({
          	  		url: "../apply/updateApplyPhone",
          	  		type: "POST",
          	  		data: {    	 		        	  
          	  			  applyPhoneId: applyPhoneId,
          	  		      },
          	  		      success: function(data, status) {
          	  		      if(data=='success'){
          	  		    	$.messager.alert('提示',"删除联系方式信息成功!","info");	           	  		           	     
          	  		      }else{
          	  		    	$.messager.alert('警示',"删除联系方式信息失败111!","error");	  
          	  		      }
          	  		      },
  		     		        error: function(status) {
  		    		            $.messager.alert('错误',"删除联系方式信息失败222!", "error");
  		    		         }
          	   });
          	  }

  		  }
  		  });
          }
          function isIe(){
          	   return ("ActiveXObject" in window);
          	}
          
          function isFF(){
          	return navigator.userAgent.indexOf("Firefox")!=-1;
          }

          function isChrome(){
          	return navigator.userAgent.indexOf("Chrome") > -1;
          }

$(function(){
    getIdCardInfo();
})

function getIdCardInfo() {
    var idCard = $("#id_card_info").attr("value");
    if(idCard == "") {
        return "";
    }
    var sex = getSexByIdCard(idCard);
    var zodiac = new Zodiac(getYearByIdCard(idCard),getMonthByIdCard(idCard),getDayByIdCard(idCard)).getZodiac();
    var age = getAgeByIdCard(idCard);
    $("#id_card_info").html(sex+",属"+zodiac+",年龄"+age+"岁")
}