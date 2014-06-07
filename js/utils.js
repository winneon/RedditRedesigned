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
	$(".link").each(function(){
		if ($(this).hasClass("rr")){
			return;
		}
		if ($(this).hasClass("self")){
			$(this).find(".thumbnail").remove();
		}
		var thumb = $(this).find(".thumbnail");
		var voting = $(this).find(".midcol");
		if (thumb.length === 0){
			voting.before($("<a>").addClass("thumbnail meta").attr("href", $(this).find("a.title").attr("href")));
		} else {
			if (thumb.children().length > 0){
				var src = thumb.children(0).attr("src");
				thumb.children(0).remove();
				thumb.css("background-image", "url('" + src + "')");
			} else {
				thumb.addClass("meta").attr("href", $(this).find("a.title").attr("href"));
			}
			voting.before(thumb);
		}
		if ($(this).find(".author").html() === $(".user > a").html()){
			$(this).addClass("own");
		}
		$(this).addClass("rr");
	});
	$(".thumbnail").removeClass("default");
	$(".midcol.likes").parent().addClass("upvoted");
	$(".midcol.dislikes").parent().addClass("downvoted");
	$(".midcol .arrow").click(function(event){
		if ($(this).parent().hasClass("likes")){
			$(this).parent().parent().addClass("upvoted");
			$(this).parent().parent().removeClass("downvoted");
		}
		if ($(this).parent().hasClass("dislikes")){
			$(this).parent().parent().removeClass("upvoted");
			$(this).parent().parent().addClass("downvoted");
		}
		if ($(this).parent().hasClass("unvoted")){
			$(this).parent().parent().removeClass("upvoted");
			$(this).parent().parent().removeClass("downvoted");
		}
	});
	checkLinks();
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
		if (document.URL.contains(reddit_page)){
			return reddit_page;
		}
	}
	return null;
}

String.prototype.contains = function(str){
	return this.indexOf(str) > -1;
}