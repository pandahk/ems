     function autoArea(pId,cId,dId,pValue,cValue,dValue){   
        var provinceURL= basepath+"/area/provinces";
		var cityURL= basepath+"/area/city?provinceCode=";
		var districtURL=basepath+"/area/district?cityCode=";
		$("#"+pId).combobox({
			valueField:'itemCode',  
		    textField:'itemNameZh',
		    editable:false,
			url:provinceURL,
			onSelect:function(){				
				selectCity($("#"+pId).combobox('getValue'));
				
			}
		});
		function selectCity(provinceCode){
			$("#"+dId).combobox('setValue','');
			$("#"+cId).combobox({
				valueField:'itemCode',  
			    textField:'itemNameZh',
			    editable:false,
				url:cityURL+provinceCode,
				onSelect:function(){
					selectDistinct($("#"+cId).combobox('getValue'));					
				}
			});
		}
		function selectDistinct(cityCode){			
			$("#"+dId).combobox({
				valueField:'itemCode',  
			    textField:'itemNameZh',
			    editable:false,
				url:districtURL+cityCode
			});	
		}
		$("#"+pId).combobox('setValue',pValue);
		if(pValue!=null&&pValue!="")
		selectCity(pValue);
		$("#"+cId).combobox('setValue',cValue);
		if(cValue!=null&&cValue!="")
		selectDistinct(cValue);
		$("#"+dId).combobox('setValue',dValue);
     }
     
     function autoOrgInfo(mCode,sCode,mName,sName,mValue,sValue,mNValue,sNValue){   
        var managerURL= "../orgInfo/findManagerByBranch";
 		var salesURL= "../orgInfo/findSalesByManager?salesCode=";
 		
 		$("#"+mCode).combobox({
 			valueField:'id',  
 		    textField:'userName',
 		    editable:false,
 			url:managerURL,
 			onSelect:function(){		
 				selectManager($("#"+mCode).combobox('getValue'));
 				$('#'+mName).val($('#'+mCode).combobox('getText'));
 			},
 			formatter : function(row) {
 				return row.userName + '(' + row.id + ')';
 			},
 			onLoadSuccess: function(){
 				 var item = $(this).combobox("getData");
 				  for (var  i=0; i<item.length; i++) {
 					if(item[i].userName==mNValue){
 						 $(this).combobox("select", item[i].userName);
 						selectManager(item[i].id);
 						$("input[name='"+mCode+"']").val(item[i].id);
 					}
 				  }
 			}
 		});
	 	function selectManager(mCodeId) {
	 		if(isNaN(mCodeId)){
	 			 var item = $("#"+mCode).combobox("getData");
	 				  for (var  i=0; i<item.length; i++) {
	 					if(item[i].userName==mCodeId){
	 						mCodeId = item[i].id;
	 						break;
	 					}
	 				  }
	 		}
	 		$("#" + sCode).combobox({
	 			valueField : 'id',
	 			textField : 'userName',
	 			editable : false,
	 			url : salesURL + mCodeId,
	 			onSelect : function() {
	 				$('#' + sName).val($('#' + sCode).combobox('getText'));
	 			},
	 			formatter : function(row) {
	 				return row.userName + '(' + row.id + ')';
	 			},
	 			onLoadSuccess: function(){
	 				 var item = $(this).combobox("getData");
	  				  for (var  i=0; i<item.length; i++) {
	  					if(item[i].userName==sNValue){
	  						 $(this).combobox("select", item[i].userName);
	  						$("input[name='"+sCode+"']").val(item[i].id);
	  					}
	  				  }
	  			}
	 		});
	 	}
 		$("#"+mCode).combobox('setValue',mValue);
 		if(mValue!=null||mValue!="")
 		selectManager(mValue);
 		$("#"+sCode).combobox('setValue',sValue);

      }
