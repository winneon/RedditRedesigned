var tabmenu = new TabMenu(".tabmenu");

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
			if (result.style){
				$("link[title='applied_subreddit_stylesheet']").remove();
				run();
			}
		});
	} else {
		run();
	}
	
});

function run(){
	var topbar = new TopBar(".width-clip");
	var reddit = new Reddit();
	
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
	
	topbar.addLink(user.html(), "top_user", user.attr("href"));
	topbar.addItem("<i class='fa fa-envelope-o'></i>", "mail", function(item, child){
		child.attr("href", "http://www.reddit.com/message/inbox/");
		if ($("#mail").attr("class") === "havemail"){
			child.css("color", "#FF3D00");
			child.attr("href", "http://www.reddit.com/message/unread/");
		}
	});
	topbar.addLink("Subreddits", "top_subreddits", "http://www.reddit.com/subreddits/mine");
	topbar.addSearchBar("search reddit");
	
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
	checkTable();
}