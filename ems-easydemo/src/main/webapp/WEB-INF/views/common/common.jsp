
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page  isELIgnored="false"%>  

<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/default.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/resources/js/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/resources/js/themes/icon.css" />
<script type="text/javascript" src="${ctx}/resources/js/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/resources/js/jquery.enplaceholder.js"></script>
<script src='${ctx}/resources/js/jquery.validate.min.js'></script>
<script src="${ctx}/resources/login/js/prefixfree.min.js"></script>