 var applyPhonesEmpCount=0;
    	 var applyPhonesEmp= eval($("#applyPhonesEmp").val()); 
    	 if(applyPhonesEmp!=null){
         for(var i=0;i<applyPhonesEmp.length;i++){      	 
      	 var applyPhoneEmp=applyPhonesEmp[i];
           var adddiv='<tr>'+
  			    '<td><input type="hidden" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].id" id="applyPhoneEmpId'+(applyPhonesEmpCount)+'" value="'+applyPhoneEmp.id+'"><div onclick="javascript:removApplyPhoneEmp(this)" id="remove'+(applyPhonesEmpCount)+'"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'+
  			    '<td  style="font-size:12px; ">来源：</td>'+
				'<td  align="left" >'+
				'<input type="text" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneResource"  value="'+applyPhoneEmp.phoneResource+'"  id="phoneEmpResource'+(applyPhonesEmpCount)+'" class="input input-boder-color" '+
				'</td>'+
  			    '<td  style="font-size:12px; ">手机号码：</td>'+
  				'<td  align="left" >'+
  				'<input type="text"name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneNum" value="'+applyPhoneEmp.phoneNum+'" id="phoneNumEmp'+(applyPhonesEmpCount)+'" >'+
  				'<img id="img_'+applyPhonesEmpCount +'" src="'+basepath+'/resources/images/make_call.png"  onclick="makeCall(\''+$("#applyEmpapplyCode").val()+'\',\''+applyPhoneEmp.phoneNum+'\',\''+$("#applyBasename1").val()+'\',\'本人\',\'\',\'\',\''+applyPhoneEmp.phoneResource+'\')"/>' +
  				'</td>'+
  			    '<td  style="font-size:12px; ">备注：</td>'+
  				'<td  align="left" >'+
  				'<input type="text" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].remark"  value="'+applyPhoneEmp.remark+'"  id="remarkEmp'+(applyPhonesEmpCount)+'" >'+
  				'</td>'+	
  				'<input type="hidden" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneModel" value="'+applyPhoneEmp.phoneModel+'"/>'+
  			'</tr> ';
          $("#otherApplyPhonesEmp").append(adddiv);
          $("#phoneEmpResource"+(applyPhonesEmpCount)).combobox({
        	  	valueField:'itemCode',  
    		    textField:'itemNameZh',
    		    editable:true,
    			url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1",
				onLoadSuccess:function(){
					if(applyPhoneEmp.phoneResource!=null&&applyPhoneEmp.phoneResource!=''){
						$("#phoneEmpResource"+(applyPhonesEmpCount)).combobox('setValue',applyPhoneEmp.phoneResource);
					}		            
    			}
    		});
            applyPhonesEmpCount+=1;
         }
    	}
    	 
        $("#addApplyPhonesEmp").click(function(){         
          var adddiv='<tr>'+
            '<td><input type="hidden" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].id" id="applyPhoneEmpId'+(applyPhonesEmpCount)+'"><div onclick="javascript:removApplyPhoneEmp(this)" id="remove'+(applyPhonesEmpCount)+'"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></div></td>'+
			'<td  style="font-size:12px; ">来源：</td>'+
			'<td  align="left" >'+
			'<input type="text" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneResource"  id="phoneEmpResource'+(applyPhonesEmpCount)+'" class="input input-boder-color" />'+
			'</td>'+
			'<td  style="font-size:12px; ">手机号码：</td>'+
			'<td  align="left" >'+
			'<input type="text"name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneNum"  id="phoneNumEmp'+(applyPhonesEmpCount)+'"  />'+
			'</td>'+
			'<td  style="font-size:12px; ">备注：</td>'+
			'<td  align="left" >'+
			'<input type="text" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].remark"  id="remarkEmp'+(applyPhonesEmpCount)+'" />'+
			'</td>'+
			'<input type="hidden" name="applyPhoneEmpList['+(applyPhonesEmpCount)+'].phoneModel" value="EMPPHONE"/>'+
  		   '</tr> ';
            
           $("#otherApplyPhonesEmp").append(adddiv);   
  	       $("#phoneEmpResource"+(applyPhonesEmpCount)).combobox({
  	    	  	valueField:'itemCode',  
  	    	  	textField:'itemNameZh',
			    editable:true,
				url:"../dict/selectDictialDetail?appId=APPROVE&parentCode=CONTACTSSOURCE&status=1"
			});
  	       applyPhonesEmpCount+=1;
          }); 
          function removApplyPhoneEmp(node){
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
          	applyPhonesEmpCount-=1;
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
          	  		    	$.messager.alert('警示',"删除联系方式信息失败!","error");	  
          	  		      }
          	  		      },
  		     		        error: function(status) {
  		    		            $.messager.alert('错误',"删除联系方式信息失败!", "error");
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
          
          