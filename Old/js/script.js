
//adjust elements' layout when windows is reized or zoomed. 
$(window).resize(function() {
	//resize just happened, pixels changed
	var currentWindowHeight = $(document).height();
	var currentWindowWidth = $(window).width();
	$('#graph1').css({
		"width" : currentWindowWidth * 0.5
	});

	//alert("redraw");
	try {
		emotionWatch.paper.remove();

		var paper = Raphael("graph1", currentWindowWidth * 0.5, currentWindowHeight / 1.7);

		emotionWatch = new EmotionWatch({
			paper : paper
		});

		emotionWatch.init();

		emotionWatch.setValues(currentEmotionValues);
	} catch (error) {
		// this catches the error and allows you to proceed along nicely
		console.log(error);
	}

	// resize timeline
	try {
		if (timelineBar != null) {
			
			var currentStatus = timelineBar.currentStatus;
			var currentDateTime = timelineBar.currentDateTime;
			clearInterval(timelineBar.timer);
			timelineBar.paper.remove();
			timelineBar = new TimelineBar({
				paper : Raphael("graph2", currentWindowWidth - 50, 200),
				values : frequencyCollection,
				interval : parseInt(interval),
				speed: parseInt(speed)
			});
			timelineBar.init();
			timelineBar.setEmotionValues();
			
			timelineBar.currentStatus = currentStatus;
			timelineBar.nextStatus = currentStatus;
			timelineBar.currentDateTime = currentDateTime;
				
		}

	} catch (error) {
		console.log(error);
	}

});


