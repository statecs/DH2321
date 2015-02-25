function getFrequency(tweet_table, startDateTime, endDateTime, hashtags, interval, paper, emotionWatch, timelineBar) {
	pendingRequestNb ++; 
	checkPendingRequest(pendingRequestNb);
	
	console.log("request tweets from: " + startDateTime.toMysqlFormat()
			+ " to: " + endDateTime.toMysqlFormat());
	
	var origin = window.location.origin;
	
	var tweet_table_req = '';
	
	if (tweet_table != null && tweet_table != '' ){
		tweet_table_req = 'tweet_table=' + tweet_table + "&";
	}

	var url = "js/getFrequency.json"; 
	
	var timeout = 30000;
	
	console.log("Request url: " + url);
	
	console.log("Timeout value: " + timeout);
	
	var call = $
	.ajax({
		url : url,
		timeout : timeout,
		dataType : "jsonp",
		success : function(data) {
			//alert("data recieved!");
			getFrequencyResponse(data, interval, paper, emotionWatch, timelineBar);
			pendingRequestNb --;
			checkPendingRequest(pendingRequestNb);
		},
		
		fail : function(data) {
			alert("fail");
			pendingRequestNb --;
			checkPendingRequest(pendingRequestNb);
		},

		error : function(xhr, status, err) {
			console.log(status, err);
			alert(status + " " + err);
			pendingRequestNb --; 
			checkPendingRequest(pendingRequestNb);
		}
	});
	
}

function getFrequencyResponse(res, interval, paper, emotionWatch, timelineBar) {
	
	frequencyCollection = []; 
	for ( key in res ){
		
		var dominantEmotion = 0; 

		var emotion_values = {0: 0.0, 
				1: 0.0, 
				2: 0.0, 
				3: 0.0, 
				4: 0.0,
				
				5: 0.0, 
				6: 0.0,
				7: 0.0,
				8: 0.0,
				9: 0.0,
				
				10: 0.0,
				11: 0.0,
				12: 0.0,
				13: 0.0,
				14: 0.0,
				
				15: 0.0,
				16: 0.0,
				17: 0.0,
				18: 0.0,
				19: 0.0}; 
		
		var max = 0.0;
		var maxIndex = 0 ; 
		for (var i = 0 ; i < 20 ; i++) {
			emotion_values[i] =  ( res[key][EMOTIONS_LABEL[i]] != null ?  parseFloat(res[key][EMOTIONS_LABEL[i]]) : 0.0 ) ; 
			if (emotion_values[i] > max )  {
				max = emotion_values[i]; 
				maxIndex = i; 
			}
		}
		
		var dateTime = mysqlDateTimeFormatToDate(res[key].timekey); 
		
		frequencyCollection.push({dateTime: dateTime, quantity: parseInt(res[key].quantity), dominantEmotion: maxIndex, values: emotion_values  });  
	}	
	

	
	var currentWindowWidth = $(window).width()-20; 
	
	if (frequencyCollection.length > 0 ) {
		
		timelineBar = new TimelineBar({paper: paper , values : frequencyCollection , interval : parseInt(interval) , speed: parseInt(speed)}); 
		timelineBar.init();
		timelineBar.setEmotionValues();
		
		emotionWatch.delay = 500; 
		emotionWatch.setValues(currentEmotionValues);
		emotionWatch.setQuantity(currentTweetsQuantity);
		
		window.timelineBar = timelineBar; 

	}
	
	
}


function getTweets(tweet_table, startDateTime, hashtags , interval ) {
	if ( pendingRequestGetTweetsNb == 0 ) {
	
		pendingRequestGetTweetsNb++;

		console.log("request tweets from: " + startDateTime.toMysqlFormat()
				+ " hashtags: " + hashtags
				+ " interval: " + interval ) ; 
	
		var tweet_table_req = '';
		
		if (tweet_table != null && tweet_table != '' ){
			tweet_table_req = 'tweet_table=' + tweet_table + "&";
		}
		
		
		var origin = window.location.origin;
		
		
	
		var url = "js/getTweets.json";
	
	
		var timeout = 30000;
		console.log("Timeout value: " + timeout);
	
		
		
		var call = $
		.ajax({
			url : url,
			timeout : timeout,
			dataType : "jsonp",
			success : function(data) {
				// receive data: 
				//console.log("Data received");
				
				// parse result 
				pendingRequestGetTweetsNb--; 
				getTweetsResponse(data);
			},
			
			fail : function(data) {
				pendingRequestGetTweetsNb--; 
				alert("fail");
			},
			
			error : function(xhr, status, err) {
				pendingRequestGetTweetsNb--; 
				console.log(status, err);
				//alert(status + " " + err);
			}
		});
		
	}
	

}

function getTweetsResponse(data) {
	tweetCollection = []; 
	tweetCollection = data; 
	//alert(JSON.stringify(data) );
}


function getSelectiveTweets(tweet_table, startDateTime, endDateTime, hashtags){
	
	
	console.log("request selective tweets from: " + startDateTime.toMysqlFormat()
			+ " to: " + endDateTime.toMysqlFormat());
	
	var origin = window.location.origin;
	
	var tweet_table_req = '';
	
	if (tweet_table != null && tweet_table != '' ){
		tweet_table_req = 'tweet_table=' + tweet_table + "&";
	}

	var url = origin + APP_ROOT
			+ "/webservice/getSelectiveTweets.php?"+ tweet_table_req +"start="
			+ startDateTime.toMysqlFormat() + "&end="
			+ endDateTime.toMysqlFormat() + "&hashtags=" + hashtags; 
	
	var timeout = 30000;
	
	console.log("Request url: " + url);
	console.log("Timeout value: " + timeout);
	
	var call = $
	.ajax({
		url : url,
		timeout : timeout,
		dataType : "json",
		success : function(data) {
			//alert("data recieved!");
			getSelectiveTweetsResponse(data);

		},
		
		fail : function(data) {
			alert("fail");
		},

		error : function(xhr, status, err) {
			console.log(status, err);
			alert(status + " " + err);
		}
	});
	
}



function getSelectiveTweetsResponse(data){
	selectiveTweetsCollection = []; 
	selectiveTweetsCollection = data; 
}
