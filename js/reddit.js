function Reddit(){
	
	this.getSubreddits = function(){
		
	}
	
	this.sendJSON = function(link, data, func){
		$.getJSON(link, JSON.stringify(data)).always(function(response){
			func(response);
		});
	}
	
}