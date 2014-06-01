var height;

function addCSS(name, clazz){
	var css = createCSS(getCSS(name), clazz);
	$("head").append(css);
}

function addRemoteCSS(link, clazz){
	var css = createCSS(link, clazz);
	$("head").append(css);
}

function changeHeader(){
	$("#header-img.default-header").attr("style", "background-image: url('" + getImage("header.png") + "'); background-position: 0px 0px; width: 145px; height: 50px;");
}

function createCSS(link, clazz){
	var css = document.createElement("link");
	
	css.rel = "stylesheet";
	css.className = clazz;
	css.href = link;
	css.media = "all";
	
	return css;
}

function getCSS(name){
	return getURL("css/" + name)
}

function getImage(name){
	return getURL("images/" + name);
}

function getJS(name){
	return getURL("js/" + name);
}

function getURL(name){
	return chrome.extension.getURL(name);
}

// Quick Fixes

function thumbnails(){
	for (var i = 0; i < $(".thumbnail").length; i++){
		var thumb = $($(".thumbnail")[i]);
		var child = thumb.children(0);
		var src = child.attr("src");
		
		if (thumb.attr("id") !== "thumbnail-rr"){
			child.remove();
			
			if (!src){
				thumb.remove();
			} else {
				thumb.attr("style", "background-image: url('" + src + "')");
			}
		}
	}
	for (var i = 0; i < $(".link").length; i++){
		var link = $($(".link")[i]);
		var voting = link.find(".midcol");
		var thumb = link.find(".thumbnail");
		
		if (thumb.attr("id") !== "thumbnail-rr"){
			if (voting.next().attr("class").indexOf("thumbnail") > -1){
				thumb.after(voting);
			} else {
				var thumbnail = document.createElement("a");
				
				thumbnail.href = link.find("a.title").attr("href");
				thumbnail.className = "thumbnail";
				thumbnail.style.cssText = "background-image: url('" + getImage("self_post.png") + "')";
				
				voting.before(thumbnail);
			}
		}
	}
	$(".thumbnail").attr("id", "thumbnail-rr");
	checkLinks();
	
	$("a.title").click(function(event){
		$(event.target).css("font-weight", "400");
	});
}

function checkLinks(){
	for (var i = 0; i < $("a.title").length; i++){
		var link = $($("a.title")[i]);
		if (link.width() > ($(document).width() * 60 / 100)){
			link.addClass("shortened");
		}
		link.attr("target", "_blank");
	}
}

function checkTable(){
	if ($("#siteTable").height() !== height){
		for (var i = 0; i < $(".thumbnail").length; i++){
			var thumb = $($(".thumbnail")[i]);
			if (thumb.attr("id") !== "thumbnail-rr"){
				thumb.remove();
			}
		}
		thumbnails();
		height = $("#siteTable").height();
	}
	setTimeout(checkTable, 500);
}

// Reddit Page

RedditPage = {
	COMMENTS: "/comments/",
	SUBREDDIT: "/r/",
	USER: "/user/"
}

function page(){
	for (var page in RedditPage){
		var reddit_page = RedditPage[page];
		if (document.URL.indexOf(reddit_page) > -1){
			return reddit_page;
		}
	}
	return null;
}