
parsedTrack=[];

GPXPlayer = function(url, callback) {

	//this.updateLocation = updateLocation;
	this.callback = callback;
	
	this.loopId=0;	
	this.url = url;
	console.log("url: "+url);
	
	updateLocation = function() {  
		currentLocation = parsedTrack.shift();
		var lon = $(currentLocation).attr('lon');
		var lat = $(currentLocation).attr('lat');
		

		
		//remove timer if last point
		if (parsedTrack.length == 0) {
			console.log("End of track - finish");
			clearInterval(this.loopId);
		}
		
		//call callback
		//console.log(lon);
		callback(lon, lat);
	}  
	
	$.ajax({
	type: "GET",
	url: url,
	dataType: "xml",
	success: function(xml) {
		$(xml).find('trkpt').each(function(){
			//var lon = $(this).attr('lon');
			//var lat = $(this).attr('lat');
			//var time = $(this).find('time').text();
			
			//copy in list
			parsedTrack.push(this);

		});
		console.log("parsed xml with "+parsedTrack.length+" points");
		
		//update first position
		updateLocation();
		//set timer for subsequent updates
		this.loopId = setInterval(updateLocation, 2000);	
	}
	});
	

}
