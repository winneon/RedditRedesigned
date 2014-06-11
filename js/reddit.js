function Reddit(){
	
	this.getSubreddits = function(){
		var data = this.sendJSON("/subreddits/mine/subscriber.json", {
			"limit": 100
		});
		var list = [];
		for (var i = 0; i < data.data.children.length; i++){
			list[i] = data.data.children[i].data.display_name;
		}
		return list.sort();
	}
	
	this.getMultireddits = function(){
		var data =  this.sendJSON("/api/multi/mine.json");
		var list = [];
		for (var i = 0; i < data.length; i++){
			list[i] = data[i].data.name;
		}
		return list.sort();
	}
	
	this.sendJSON = function(link, data){
		var response = null;
		$.getJSON(link, data).always(function(resp){
			response = resp;
		});
		return response;
	}
	
}