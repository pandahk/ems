//打开portal项目的tab
function addTab(title,url) {
    parent.postMessage({type:"addTab", title: title, url:url}, domainPath);
}

//关闭portal项目的tab,通过title来找到对应的tab并关闭
function colseCurTab() {
    var frame = window.frameElement;
    var title = $(frame).attr("title");
    parent.postMessage({type:"colseTab", title: title}, domainPath);
}