function getDictNameById(id) {
	$.ajax({
		url : basepath + '/dict/findDictById?appId=APPROVE&status=1&id=' + id,
		dataType : 'json',
		type : 'get',
		success : function(data) {
			if (data != undefined && data != null) {
				return data.name;
			}
		}
	})
}
/**
 * 根据提供的数据集进行翻译
 * 
 * @param jsons
 *            数据集合
 * @param key
 *            需转换值
 * @param keyName
 *            code对应属性名
 * @param valueName
 *            需显示文本对应属性名
 * @returns 显示文本
 */
function translateByMap(jsons, key, keyName, valueName) {
	if (!key) {
		return null;
	}
	if (!jsons)
		return null;
	keyName = keyName ? keyName : 'key';
	valueName = valueName ? valueName : 'value';
	if ($.isArray(jsons)) {
		var eumnMap = {};
		$.each(jsons, function(i,json) {
			eumnMap[json[keyName]] = json[valueName];
		});
		return eumnMap[key];
	} else {
		throw new Error("字典枚举值必须放入数组中");
	}
}

function initDictToComponent(url, selector, onSuccess) {
	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		async : false,
		success : function(data) {
			data = data ? data : [];
			if ($.isArray(data)) {
				$(selector).data(url, data);
			} else {
				throw new Error("字典枚举值必须放入数组中");
			}
			if (onSuccess && $.isFunction(onSuccess)) {
				onSuccess(data);
			}
		}
	})
}
/**
 * 根据提供链接按需加载的数据集进行翻译
 * 
 * @param url
 *            字典加载链接
 * @param selector
 *            数据集绑定对应控件的选择器
 * @param key
 *            需转换值
 * @param keyName
 *            code对应属性名
 * @param valueName
 *            需显示文本对应属性名
 * @returns 显示的文本
 */
function getComponentDictValue(url, selector, key, keyName, valueName) {
	var dict = $(selector).data(url);
	var value;
	if (dict) {
		value = translateByMap(dict, key, keyName, valueName);
	} else {
		initDictToComponent(url, selector, function(datas) {
			value = translateByMap(datas, key, keyName, valueName);
		});
	}
	return value;
}

function getProductDesc(code) {
	if (code) {
		var url = basepath + "/firstAppr/findBaseProduct";
		return getComponentDictValue(url, window, code, "code", "name");
	} else
		return null;
}

function getSourceChannelDesc(code){
	if (code) {
		var url = basepath + '/dict/selectDictialDetail?appId=APPROVE&parentCode=sourceChannel&status=';
		return getComponentDictValue(url, window, code, "itemCode", "itemNameZh");
	} else
		return null;
}
function getSourceBusinessDesc(code){
	if (code) {
		var url = basepath + '/dict/selectDictialDetail?appId=APPROVE&parentCode=sourceBusiness&status=';
		return getComponentDictValue(url, window, code, "itemCode", "itemNameZh");
	} else
		return null;
}
function getDesiredLoanLifeDesc(code){
	if (code) {
		var url = basepath + '/dict/selectDictialDetail?appId=APPROVE&parentCode=desiredLoanLife&status=';
		return getComponentDictValue(url, window, code, "itemCode", "itemNameZh");
	} else
		return null;
}