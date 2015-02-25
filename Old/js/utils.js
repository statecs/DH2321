function _getRandomColor() {
	return "#" + ((1 << 24) * Math.random() | 0).toString(16);
};

/**
 * Returns a random number between min and max
 */
function getRandomArbitary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max Using Math.round() will give you
 * a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw_tooltip(rph, object, show, text, x, y) {
	if (show == 0 && popup != null && popup_txt != null
			&& transparent_txt != null) {
		popup.remove();
		popup_txt.remove();
		transparent_txt.remove();
		return null;
	}
	// draw text somewhere to get its dimensions and make it transparent
	transparent_txt = rph.text(100, 100, text).attr({
		fill : "transparent"
	});

	// get text dimensions to obtain tooltip dimensions
	var txt_box = transparent_txt.getBBox();

	// draw text
	popup_txt = rph.text(x + 150, y - 55, text).attr({
		fill : "black",
		font : "14px sans-serif"
	});

	var bb = popup_txt.getBBox();

	bb.width = 280;
	bb.height = 180;
	// draw path for tooltip box
	popup = rph.path(
	// 'M'ove to the 'dent' in the bubble
	"M" + (x) + " " + (y) +
	// 'v'ertically draw a line 5 pixels more than the height of the text
	"v" + -(bb.height + 5) +
	// 'h'orizontally draw a line 10 more than the text's width
	"h" + (bb.width + 10) +
	// 'v'ertically draw a line to the bottom of the text
	"v" + bb.height +
	// 'h'orizontally draw a line so we're 5 pixels fro thge left side
	// "h" + -(bb.width + 5) +
	// 'Z' closes the figure
	"Z").attr({
		fill : "#CCCCCC",
		stroke : "#CCCCCC"
	});

	// finally put the text in front
	popup_txt.toFront();

	return {
		"popup" : popup,
		"popup_txt" : popup_txt,
		"transparent_txt" : transparent_txt
	};

}

function playVideo() {
	var video = document.getElementById('vid');
	if (video != null) {
		video.play();
	}
}
function pauseVideo() {
	var video = document.getElementById('vid');

	if (video != null) {
		video.pause();
	}
}

function setVideoCurrentTime(value) {

	var video = document.getElementById('vid');
	if (video != null) {
		video.currentTime = parseInt(value);
		// video.pause();
	}

}

function getVideoDuration() {

	var video = document.getElementById('vid');
	if (video != null) {
		return video.duration;
	}

}

function showSpinner() {

	var modal = $('#modal');
	var shade = $('#shade');

	modal.show();
	shade.show();

	modal.html('<img src="img/spinner.gif" width="50"/>');

}

function hideSpinner() {
	var modal = $('#modal');
	var shade = $('#shade');

	modal.hide();
	shade.hide();

}

function checkPendingRequest(pendingRequestNb) {

	if (pendingRequestNb == 0) {
		hideSpinner();
	} else {
		showSpinner();
	}

}

function disableWindow() {
	// alert("Disable window");
	$("body").prepend("<div class=\"overlay\"></div>");

	$(".overlay").css({
		"position" : "absolute",
		"width" : $(document).width() * 0.99,
		"height" : $(document).height() * 0.99,
		"background-color" : "#888888",
		"z-index" : 99999,
	}).fadeTo(0, 0.8);

}

function showModalKeywords() {

	var modalKeywords = $('#modal-keywords');
	var shade = $('#shade');

	modalKeywords.show();
	shade.show();
}

function hideModalKeywords() {

	var modalKeywords = $('#modal-keywords');
	var shade = $('#shade');

	modalKeywords.hide();
	shade.hide();
}

function filterByKeywords(hashtags) {

	var origin = window.location.origin;

	var eventId = window.location.search.split("&")[0].split("=")[1];

	var startDateTime = mysqlDateTimeFormatToDate(window.location.search
			.split("&")[1].split("=")[1]);

	var endDateTime = mysqlDateTimeFormatToDate(window.location.search
			.split("&")[2].split("=")[1]);

	interval = window.location.search.split("&")[4].split("=")[1];

	var url = origin + APP_ROOT + "emotionWatch.php?eventId=" + eventId
			+ "&start=" + startDateTime.toMysqlFormat() + "&end="
			+ endDateTime.toMysqlFormat() + "&hashtags=" + hashtags
			+ "&interval=" + interval + "&speed=" + speed;

	// alert(hashtags);
	window.location.href = url;

}


function flyingTweets() {
	
	// clean the tweets
	$('#flyingTweetsUl').html("");

	var listTweets = $('#flyingTweetsUl');
	
	var windowWidth =  $(document).width() ; 
	var windowHeight =   $(document).height() ; 
	var startPoints = {

		    0: { "x": 0.17, "y":0.24 },
		    1: { "x": 0.16, "y":0.35 },
		    2: { "x": 0.15, "y":0.46 },
		    3: { "x": 0.16, "y":0.55 },
		    4: { "x": 0.17, "y":0.67 },
		    5: { "x": 0.70, "y":0.55 },
		    6: { "x": 0.67, "y":0.64 }
	};

	var endPoints = {

			 0: { "x": 0.07, "y":0.23 },
			 1: { "x": 0.06, "y":0.33 },
			 2: { "x": 0.05, "y":0.45 },
			 3: { "x": 0.06, "y":0.6 },
			 4: { "x": 0.07, "y":0.7 },
			 5: { "x": 0.85, "y":0.58 },
			 6: { "x": 0.83, "y":0.68 }
	};

	var numberOfTweets = 7;

		
	key = 0 ; 
	
	if ( tweetCollection.length > 0 ) flyingTweets_timeout(); 
	
	
	function flyingTweets_timeout() {
		
		
		var dateTime = mysqlDateTimeFormatToDate(tweetCollection[key].dateTime);
		var tweetMoment = moment(dateTime);
		var tweetDetail = "<div class=\"tweet_time\">" + tweetMoment.format('HH:mm') + "</div>";
		tweetDetail += "<div class=\"tweet_text\">" + tweetCollection[key].text + "(RT:" + tweetCollection[key].retweetCount + ")" + "</div>";
		tweetDetail += "<div class=\"tweet_emotion\">" + tweetCollection[key].dominantEmotion + "</div><div class=\"clear\"></div>";

		listTweets.append('<li class="tweet_class" id=tweet_' + key + '>' + tweetDetail + '</li>');

		var emotionColor = EMOTIONS_COLORS[EMOTIONS_INDEX[tweetCollection[key].dominantEmotion]];
		$('#tweet_' + key + " .tweet_emotion").css({
			"background" : emotionColor
		});
		$('#tweet_' + key + " .tweet_time").css({
			"background" : emotionColor
		});
		
		var tweet = $('#tweet_'+key);
				
		var indexPoint = key % numberOfTweets; 

		var left = startPoints[indexPoint].x * windowWidth; 
		var top = startPoints[indexPoint].y * windowHeight; 
		
		var left_end = endPoints[indexPoint].x * windowWidth; 
		var top_end = endPoints[indexPoint].y * windowHeight; 

		tweet.css({"position": "absolute", "left": left, "top": top } );
		
		
		tweet.animate({"left": left_end, "top": top_end } , {"queue": false, "duration": 8000,  "easing": 'linear' })
		.animate({"opacity": 1.0}, 2000, 'linear', function(){
			$(this).animate({"opacity": 1.0}, 3000, 'linear', function()
			{
				$(this).animate({"opacity": 0.0}, 3000, 'linear'); 
			});
		}) ;
		
		
		/*
		var tween = new TweenLite(tweet, 5, {'left':left_end,  "top": top_end, 'ease': 'Linear.easeNone', 'opacity': 1, 'onComplete':hideElement } );
		function hideElement(){
			TweenLite.to(tweet, 2, {'left':left_end,  "top": top_end, 'ease': 'Linear.easeNone', 'opacity': 0} );  
		}; */
		

		tweet.bind("tweet_class_stop_event", function(e){
			$(this).stop() ;
		});
		
		tweet.bind("tweet_class_start_event", function(e){
			$(this).animate({"left": left_end, "top": top_end } , {"queue": false, "duration": 4000, "easing": 'linear' })
			.animate({"opacity": 0.8}, 2000,'linear', function(){
				$(this).animate({"opacity": 0.0}, 2000, 'linear' ); 
			}) ;
		});
		
		
		
		key ++; 
		
		if (key < tweetCollection.length && key < numberOfTweets  ) {
			setTimeout(flyingTweets_timeout, 1);
		} 
		
		
		
	}; 

	
}



function showTweets() {
	$('#blinkingTweetsUl').html("");

	var listTweets = $('#blinkingTweetsUl');

	for (var key in tweetCollection ) {
		if (key < 6) {

			var dateTime = mysqlDateTimeFormatToDate(tweetCollection[key].dateTime);
			var tweetMoment = moment(dateTime);
			var tweetDetail = "<div class=\"tweet_time\">" + tweetMoment.format('HH:mm') + "</div>";
			tweetDetail += "<div class=\"tweet_text\">" + tweetCollection[key].text + "(RT:" + tweetCollection[key].retweetCount + ")" + "</div>";
			tweetDetail += "<div class=\"tweet_emotion\">" + tweetCollection[key].dominantEmotion + "</div><div class=\"clear\"></div>";

			listTweets.append('<li class="rep_tweet" id=tweet_' + key + '>' + tweetDetail + '</li>');

			var emotionColor = EMOTIONS_COLORS[EMOTIONS_INDEX[tweetCollection[key].dominantEmotion]];
			$('#tweet_' + key + " .tweet_emotion").css({
				"background" : emotionColor
			});
			$('#tweet_' + key + " .tweet_time").css({
				"background" : emotionColor
			});

		}
	}

	$('#blinkingTweetsUl').animate({
		"opacity" : 1.0
	}, 2000).animate({
		"opacity" : 1.0
	}, 5000).animate({
		"opacity" : 0.0
	}, 3000);

}



