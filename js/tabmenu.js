function TabMenu(selector){
	
	var tabmenu = $(selector);
	
	function update(){
		tabmenu = $(selector);
	}
	
	this.addLink = function(title, clazz, link){
		var item = createItem(title, clazz);
		$(item).children(0).attr("href", link);
		
		tabmenu.append(item);
		update();
	}
	
	this.addItem = function(title, clazz, func){
		var item = createItem(title, clazz);
		var jitem = $(item);
		var child = jitem.children(0);
		
		child.attr("href", "javascript:void(0);");
		func(jitem, child);
		
		tabmenu.append(item);
		update();
	}
	
	this.getItem = function(text){
		update();
		var tabs = tabmenu.children();
		for (var i = 0; i < tabs.length; i++){
			var item = $(tabs[i]).children(0);
			if (item.html() === text){
				return item;
			}
		}
		return null;
	}
	
	function createItem(title, clazz){
		var item = document.createElement("li");
		item.innerHTML = "<a class='" + clazz + "'>" + title + "</a>";
		
		return item;
	}
	
	(function($){
		$.fn.select = function(){
			this.addClass("selected");
		}
		
		$.fn.deselect = function(){
			this.removeClass("selected");
		}
	})($);
	
}