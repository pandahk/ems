<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page  isELIgnored="false"%>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
	<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/default.css" />
	<link rel="stylesheet" type="text/css" href="resources/js/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/js/themes/icon.css" />
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	
</head>
<body>

<c:out value="123"></c:out>
<c:set var="cc" value="56"></c:set> 
${cc}
${ctx}
<div id="p" class="easyui-panel" title="My Panel"
    style="width:500px;height:150px;padding:10px;background:#fafafa;"
    data-options="iconCls:'icon-save',closable:true,
    collapsible:true,minimizable:true,maximizable:true">
    <p>panel content.</p>
    <p>panel content.</p>
</div>

</body>
</html>