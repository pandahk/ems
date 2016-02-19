$(document).ready(
		function() {

			var applyCode = $("#applyCode").val();
			var product = $("#product").val();
			var period = $("#period").val();

			$("#imageTypesTab a").each(function() {
				$(this).click(function() {
					// alert( $(this).attr("id"));
					var imageTypeCode = $(this).attr("id");
					var fileIds = $('#' + imageTypeCode + "-FileIds").val();
					if (fileIds != '') {

						var form = document.createElement("form");
						form.method = "post";
						form.action = fastFileUrl + "/fileDispalyThumb.do";
						form.target = "inputImageCheckIframe";

						var applyCodeInput = document.createElement("input");
						applyCodeInput.type = "hidden";
						applyCodeInput.name = "busiId";
						applyCodeInput.value = applyCode;
						form.appendChild(applyCodeInput);

						var keyInput = document.createElement("input");
						keyInput.type = "hidden";
						keyInput.name = "fileKey";
						keyInput.value = fileIds;
						form.appendChild(keyInput);

						form.submit();
					} else {
						$('#inputImageCheck').attr("src", "");
						$.messager.alert('提示', '该文件类型下没有影像文件！', 'info');
					}
				});
			});

			// 加载影像评估信息
			function showImageValid(imageTypeCode) {
				$.ajax({
					url : basepath + "/image/showImageValid",
					type : "POST",
					data : {
						imageTypeCode : imageTypeCode,
						applyCode : applyCode,
						dealPeriod : period
					},
					success : function(data, status) {
						var validTypeValue = $("input[name='validTypeValue']").val();
						if (validTypeValue !== 'undefined' || validTypeValue !== "") {
							$("input[name='validType'][value='" + validTypeValue + "']").attr('checked', true);
						}

					}
				});
			}

		});
