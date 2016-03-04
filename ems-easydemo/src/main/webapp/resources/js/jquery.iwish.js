/* 
* IWishQuery v1.0 - jQuery Plugin
* Copyright (c) 2011 Ludvig Lindblom
* Author: Ludvig Lindblom, http://internuts.se, http://code.internuts.se/jquery/iwish
* Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	$.fn.iWish = function (options) {
		var audioSource = options.audioSource, myAudio = document.createElement("audio"), fileExt, i = true;
		var path = iwishPath(audioSource);
		if (myAudio.canPlayType) {
			$(this).each(function () {
				if (typeof $(this).attr("src") === "undefined" && $(this).children("source").size() < 1) {
					$(this).append('<source src="' + path + '">');
					if (options.autoPlay && i) { 
						$(this).attr("autoplay", true); 
						i = false;
					}
				}
			});
		} else { 
			$(this).each(function () {
				$(this).after('<p class="no-support">Your browser does not support the audio-tag.</p>');
				$(this).hide();
			});
		}
	}
})(jQuery);

function iwishPath(audioSource){
	if(audioSource == null || audioSource == ''){
		return "";
	}
	var strs= new Array(); //定义一数组 
	strs=audioSource.split("-"); //字符分割 
	if(strs.length != 6){
		return "";
	}
	var dateStr = strs[3];
	var year = dateStr.substring(0,4);
	var month = dateStr.substring(4,6);
	var day = dateStr.substring(6,8);
	return "http://voice.winvoice.cn/mnt/s1/voice/zhy/" + year +"/" + month + "/" + day + "/" + audioSource;
}