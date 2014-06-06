function TopBar(selector){
	
	var item_sel = $(".dropdown.srdrop");
	var item_class = "dropdown srdrop";
	
	function update(){
		item_sel = $(".dropdown.srdrop");
		
		item_sel.css("border-left", "0");
		$(item_sel[0]).css("border-left", "1px solid #4D4D4D");
	}
	
	$("#srLeftContainer").addClass("width-clip").removeClass("sr-bar").attr("id", "");
	$("#srDropdown").addClass(item_class);
	$($(".dropdown.srdrop")[0]).remove();
	
	update();
	var topbar = $(selector);
	
	this.addLink = function(title, clazz, link){
		update();
		var item = createItem(title, clazz);
		$(item).children(0).attr("href", link);
		
		topbar.append(item);
	}
	
	this.addItem = function(title, clazz, func){
		update();
		var item = createItem(title, clazz);
		var jitem = $(item);
		var child = jitem.children(0);
		
		child.attr("href", "javascript:void(0);");
		func(jitem, child);
		
		topbar.append(item);
	}
	
	this.addSearchBar = function(placeholder){
		update();
		$(".search-top").remove();
		var search = document.createElement("form");
		
		search.className = "search-top";
		search.action = page() === RedditPage.SUBREDDIT || page() === RedditPage.COMMENTS ? "http://www.reddit.com/r/" + $(".pagename > a").html() + "/search" : "http://www.reddit.com/search";
		search.role = "search";
		search.innerHTML = "<input type='text' name='q' placeholder='" + placeholder + "' /><input type='checkbox' name='restrict_sr' />";
		
		topbar.append(search);
		$(".search-top > input[name='q']").css("background-image", "url('" + getImage("search.png") + "')");
		$("input[name='restrict_sr']").prop("checked", true);
	}
	
	this.addLogin = function(){
		update();
		var login = $("<form>");
		login.attr("method", "post");
		login.attr("action", "https://ssl.reddit.com/post/login");
		login.addClass("top_login_entry");
		login.html("<input value name='user' type='text' maxlength='20' autofocus placeholder='Username' /><input value name='passwd' type='password' placeholder='Password' /><input type='checkbox' name='rem' />");
		topbar.prepend(login);
		$("input[name='rem']").prop("checked", true);
		$(".top_login_entry > input").keypress(function(event){
			if (event.which === 13){
				$(".top_login_entry").submit();
				return false;
			}
		});
	}
	
	function createItem(title, clazz){
		var item = document.createElement("div");
		
		item.className = item_class;
		item.innerHTML = "<a class='" + clazz + "' href='#'>" + title + "</a>";
		
		return item;
	}
	
}