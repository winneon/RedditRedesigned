var tabmenu = new TabMenu(".tabmenu");
var pagename = $(".pagename > a").html();

$(document).ready(function(){
	
	if (page() === RedditPage.SUBREDDIT || page() === RedditPage.COMMENTS){
		tabmenu.addItem("style", "subreddit_style", function(item, child){
			item.click(function(event){
				chrome.storage.sync.get("style", function(result){
					if (result.style === true){
						chrome.storage.sync.set({"style": false}, function(result){
							window.location.reload();
						});
					} else {
						chrome.storage.sync.set({"style": true}, function(result){
							window.location.reload();
						});
					}
				});
			});
		});
		chrome.storage.sync.get("style", function(result){
			if (result.style === "undefined"){
				chrome.storage.sync.set({"style": true}, function(result){});
			}
			if (result.style === "undefined" ||result.style){
				$("link[title='applied_subreddit_stylesheet']").remove();
				run();
			} else if ($("link[title='applied_subreddit_stylesheet']").length === 0){
				run();
			}
		});
	} else {
		run();
	}
	
});

function run(){
	$.ajaxSetup({
		async: false
	});
	
	var topbar = new TopBar(".width-clip");
	var reddit = new Reddit()
	
	changeHeader();
	
	addCSS("style.css", "rr_style");
	addCSS("flairs.css", "rr_flairs")
	addRemoteCSS("//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css", "font-awesome");		
	
	var user = $(".user > a");
		
	tabmenu.addItem("sidebar", "side_toggle", function(item, child){
		item.click(function(event){
			var sidebar = $(".side");
			var visible = sidebar.is(":visible")
			
			visible ? sidebar.hide() : sidebar.show();
			visible ? item.deselect() : item.select();
		});
		$(".side").hide();
	});
	topbar.addItem(user.html(), "top_user", function(item, child){
		if (child.html() === "login or register"){
			child.attr("href", "javascript:void(0);");
			child.click(function(event){
				$(".width-clip div").hide();
				$(".top_login_entry").show();
			});
		} else {
			child.attr("href", $(".user > a").attr("href"));
		}
	});
	topbar.addItem("<i class='fa fa-envelope-o'></i>", "mail", function(item, child){
		child.attr("href", "http://www.reddit.com/message/inbox/");
		if ($("#mail").attr("class") === "havemail"){
			child.css("color", "#FF3D00");
			child.attr("href", "http://www.reddit.com/message/unread/");
		}
	});
	topbar.addItem("Subreddits", "top_subreddits", function(item, child){
		var html = "<ul class='topbar_dropdown' id='subreddit'>";
		var list = reddit.getSubreddits();
		for (var i = 0; i < list.length; i++){
			var subreddit = list[i];
			html += "<li><a href='http://www.reddit.com/r/" + subreddit + "'>" + subreddit + "</a></li>";
		}
		html += "</ul>";
		child.after(html);
		child.click(function(event){
			$("#subreddit").show();
		});
	});
	topbar.addItem("Multireddits", "top_multireddits", function(item, child){
		var html = "<ul class='topbar_dropdown' id='multireddit'>";
		var list = reddit.getMultireddits();
		for (var i = 0; i < list.length; i++){
			var multireddit = list[i];
			html += "<li><a href='http://www.reddit.com/me/m/" + multireddit + "'>" + multireddit + "</a></li>";
		}
		html += "</ul>";
		child.after(html);
		child.click(function(event){
			$("#multireddit").show();
		});
	});
	if ($(".user > a").html() !== "login or register"){
		topbar.addItem("Logout", "top_logout", function(item, child){
			child.attr("href", "javascript:void(0);");
			child.click(function(event){
				$(".logout").submit();
			});
		});
	}
	topbar.addSearchBar("search reddit");
	topbar.addLogin();
	
	$(document).click(function(event){
		var target = event.target;
		if (!($(target).parent().is(".dropdown"))){
			$(".topbar_dropdown").hide();
		} else {
			$(".topbar_dropdown").hide();
			$(target.nextSibling).show();
		}
	});
	
	switch (page()){
		case RedditPage.SUBREDDIT:
			
			break;
		case RedditPage.COMMENTS:
			var item = tabmenu.getItem("comments");
			
			item.html($(".pagename > a").html());
			item.attr("href", $(".pagename > a").attr("href"));
			break;
		case RedditPage.USER:
			tabmenu.getItem("overview").html($(".pagename").html());
			tabmenu.getItem("sidebar").parent().select();
			$(".side").show();
			break;
	}
	
	thumbnails();
	height = $("#siteTable").height();
	
	adjustDropdowns();
	checkTable();
}