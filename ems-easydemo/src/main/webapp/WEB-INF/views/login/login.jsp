<%@ include file="../common/common.jsp"%> 
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>login</title>
	<link href="${ctx}/resources/login/css/login.css" rel="stylesheet">
</head>
<body>
	<div id="wrap">
		<div class="login">
			<h1></h1>
			<form id="loginForm" action="login" method="get">
			<ul>
				<li><input type="text" name="account" placeholder="account"></li>
				<li><input type="password" id="pwd_inp" name="password" placeholder="Password"></li>
				<li><input class="login_btn" type="button" onclick="validateUser()" value="Login"></li>
			</ul>
			</form>
		</div>
	</div>
	
	 <script>
  
			$().ready(function() {
				$("#loginForm").validate({
					rules : {
						account : {
							required : true
						},
						password : {
							required : true
						}
					},
					messages : {
						account : {
							required : "请输入用户"
						},
						password : {
							required : "请输入密码"
						}
					}
				});

				$("#pwd_inp").keydown(function(e) {
					var curKey = e.which;
					if (curKey == 13) {
						validateUser();
					}
				});
			})

			function validateUser() {
				var validResult = $('#loginForm').valid();
				if (!validResult) {
					return;
				}

				$.ajax({
					type : "GET",
					url : "${ctx}/login/validate",
					data : $('#loginForm').serialize(),
					success : function(data) {
						var data = eval("(" + data + ")");
						if (data.code == 1) {
							window.location = "${ctx}/home"
						} else {
							alert("用户名和密码不匹配");
						}
					}
				});
			}

			$(function() {
				//placeholder 兼容ie
				$(".login input[type=text],.login input[type=password]")
						.placeholder();
			})
		</script>
</body>
</html>