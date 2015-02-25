function TimelineBar(options) {

	this.paper = options.paper;
	this.values = options.values;

	this.height = this.paper.height;
	this.width = this.paper.width;

	this.interval = options.interval;
	this.speed = options.speed; 

	this.x0 = 0;
	this.y0 = 0 + this.height;

	this.strokeWidth = 0;

	this.selected = null;

	this.startDateTime = null;
	this.endDateTime = null;

	this.currentDateTime = null;

	this.currentIndex = 0;

	this.currentStatus = "stop";
	this.nextStatus = "stop";

	this.timeLabel = null;

	this.currentTimeLine = null;

	this.controlButton = null;
	this.controlButtonText = null;

	this.maxQuantity = 0;
	this.minQuantity = 0;

	this.mouseOverLine = null;
	this.mouseOverLineBuffer = [];
	this.mouseOverText = null;
	this.mouseOverLastEvent = ""; 

	this.paddingLeft = 30;

	this.timer = null;

	this.placemat = null;
	this.tweetInterval = null; 

	this.init = function() {

		this.height = this.paper.height;
		this.width = this.paper.width;

		// init currentDateTime
		this.startDateTime = this.values[0].dateTime;
		this.endDateTime = this.values[this.values.length - 1].dateTime;
		this.currentDateTime = this.values[0].dateTime;

		// background color
		this.placemat = this.paper.rect(0, 100, this.paper.width,
				this.paper.height - 100).attr({
			"fill" : "#ffffff",
			"stroke" : "#ffffff",
			"opacity" : 0.4
		});

		var values = this.values;
		var paper = this.paper;

		var numberOfCut = Math
				.round((this.endDateTime.getTime() - this.startDateTime
						.getTime())
						/ this.interval / 1000) + 1;

		var step = (this.width - 60) / numberOfCut;

		this.strokeWidth = (this.width - 60) / (numberOfCut);

		for ( var key in this.values) {
			if (values[key].quantity >= this.maxQuantity) {
				this.maxQuantity = values[key].quantity;
			}
		}

		currentMaxTweetsQuantity = this.maxQuantity;

		for ( var key in this.values) {

			var y = this.y0;

			var coord = self._getPositionByDateTime(values[key].dateTime);

			// bar for display quantity
			var pathStr = "M " + coord.x + " " + y;
			var mappedQuantityValue = values[key].quantity / this.maxQuantity
					* 100;

			pathStr += " L " + coord.x + " " + (y - mappedQuantityValue);
			var color = EMOTIONS_COLORS[values[key].dominantEmotion];
			var path = paper.path(pathStr);
			path.data = values[key];
			path.attr({
				"stroke" : color,
				"stroke-width" : this.strokeWidth
			});

			// bar for time selection
			var pathStr2 = "M " + coord.x + " " + y;
			pathStr2 += " L " + coord.x + " " + (y - this.height + 110);

			var path2 = paper.path(pathStr2);
			path2.attr({
				"stroke" : "green",
				"opacity" : 0.0,
				"stroke-width" : this.strokeWidth

			});

			path.node.data = values[key];
			path2.node.data = values[key];

			path2
					.mouseover(function(event) {
						var coord = self
								._getPositionByDateTime(event.currentTarget.data.dateTime);
						// console.log("hover:" +
						// event.currentTarget.data.dateTime);

						var pathStr = "M " + coord.x + " " + self.y0 + " L "
								+ coord.x + " " + (coord.y + 80);
						self.mouseOverLine = self.paper.path(pathStr);
						self.mouseOverLine.attr({
							"stroke" : "#dddddd",
							"stroke-width" : self.strokeWidth,
							"cursor" : "pointer"
						});

						self.mouseOverLineBuffer.push(self.mouseOverLine);

						self.mouseOverLine.node.data = event.currentTarget.data;

						self.mouseOverLine
								.hover(
										function(event) {

											//console.log("Line hover !");

											var _dateTime = moment(event.currentTarget.data.dateTime);

											var tooltip_txt = _dateTime
													.format("YYYY-MM-DD HH:mm:ss")
													+ "\n"
													+ EMOTIONS_LABEL[event.currentTarget.data.dominantEmotion]
													+ "\n"
													+ event.currentTarget.data.quantity
													+ " tweets";

											var middleTime = self.startDateTime
													.getTime()
													+ (self.endDateTime
															.getTime() - self.startDateTime
															.getTime()) * 0.75;

											if (event.currentTarget.data.dateTime
													.getTime() > middleTime) {
												self.mouseOverText = draw_tooltip(
														self.paper, this, 1,
														tooltip_txt,
														coord.x - 290,
														coord.y + 100);
											} else {
												self.mouseOverText = draw_tooltip(
														self.paper, this, 1,
														tooltip_txt, coord.x,
														coord.y + 100);
											}

											for ( var key in self.mouseOverLineBuffer) {
												if (self.mouseOverLineBuffer[key] != null
														&& key < (self.mouseOverLineBuffer.length - 1)) {
													self.mouseOverLineBuffer[key]
															.remove();
												}
											}
											
											// emotionWatch preview value 
											emotionWatch.setValuesPreview(self._convertEmotionValues(event.currentTarget.data.values));
											self.mouseOverLastEvent = "hover"; 

										},
										function(event) {
											// unhover event :
											//console.log("Line unhover !");

											if (self.mouseOverLine != null) {
												self.mouseOverLine.remove();
											}

											if (self.mouseOverText != null) {
												self.mouseOverText.popup
														.remove();
												self.mouseOverText.popup_txt
														.remove();
												self.mouseOverText.transparent_txt
														.remove();
											}
											
											
											for ( var key in self.mouseOverLineBuffer) {
												if (self.mouseOverLineBuffer[key] != null) {
													self.mouseOverLineBuffer[key]
															.remove();
												}
											}
											
											
											// remove emotionWatch preview values
											if ( emotionWatch.pathPreview != null)
												emotionWatch.pathPreview.remove();
											
											
											self.mouseOverLastEvent = "unhover"; 
											
											

										});

						self.mouseOverLine
								.click(function(event) {
									// console.log(
									// event.currentTarget.data.dateTime + "\n "
									// +
									// EMOTIONS_LABEL[event.currentTarget.data.dominantEmotion]
									// + "\n Nb. "+
									// event.currentTarget.data.quantity );
									self.currentDateTime = event.currentTarget.data.dateTime;

									// change video currentTime .
									var video_duration = getVideoDuration();
									var proportion = (self.currentDateTime
											.getTime() - self.startDateTime
											.getTime())
											/ (self.endDateTime.getTime() - self.startDateTime
													.getTime());

									setVideoCurrentTime(Math
											.round(video_duration * proportion));
									if (self.currentStatus == 'stop') {
										pauseVideo();
									} else {
										playVideo();
									}
									// end of set video time.

									
									// relaunch flying tweets when moving on timelinebar, added on 2014-05-15
									tweetCollection = []; 
									flyingTweets(); 
									self.draw();
									self.stopFlyingTweets(); 
									
									// change emotionWatch display and background with new values immediately after clicking on timelinebar
									self.stopAnimateEmotionWatch();
									
									emotionWatch.setValues(currentEmotionValues);
									emotionWatch.setQuantity(currentTweetsQuantity);
									
									$('#bdy').css({
											"background-color" : EMOTIONS_COLORS[currentDominantEmotion]
										    //"background-color" : "#1E5A6C"
										}, 0);
									
									switch (self.currentStatus) {
										case "stop":
											self.stopFlyingTweets(); 
											self.stopAnimateEmotionWatch();
											break; 
										case "start": 
											self.startFlyingTweets(); 
											self.startAnimateEmotionWatch();
											break; 
									}
									// end of modification on 2014-05-16 
									
									
								});

					});

			path2.mouseout(function(event) {
				// console.log("unhover !");

				for ( var key in self.mouseOverLineBuffer) {
					if (self.mouseOverLineBuffer[key] != null
							&& key < (self.mouseOverLineBuffer.length - 1)) {
						self.mouseOverLineBuffer[key].remove();
					}
				}

			});

		}

		this.startDrawTimeLabel();

		this.drawSelectiveTweets();
		
		this.keyPressEvent(); 

	};
	
	
	this.keyPressEvent = function () {
		
		$(document ).keypress(function( event ) {
			//alert("key pressed !"); 
			if ( event.which == 32 ) {
				if ( self != null ){
					if ( self.currentStatus == 'stop' ) {
						self.nextStatus = 'start';
						$(".tweet_class").each(function(){
							$(this).trigger("tweet_class_start_event");
						});  
						
					}else {
						self.nextStatus = 'stop';
						
						$(".tweet_class").each(function(){
							$(this).trigger("tweet_class_stop_event");
						});  

					}		
					self.draw();
				}
			}
		});
		
	};

	/*
	 * this.start = function() { this.nextStatus = "start"; };
	 * 
	 * this.pause = function() { this.nextStatus = "pause"; };
	 * 
	 * this.resume = function(){ this.nextStatus = "start"; };
	 * 
	 * this.stop = function() { this.nextStatus = "stop"; };
	 */

	this._getPositionByDateTime = function(dateTime) {

		var y = 20;
		var x = 30;

		var width = this.width;

		var d1 = self.endDateTime.getTime() - self.startDateTime.getTime();

		var d2 = dateTime.getTime() - self.startDateTime.getTime();

		x += d2 / d1 * (width - 50);

		return {
			"x" : x,
			"y" : y
		};
	};

	this.drawSelectiveTweets = function() {

		if (selectiveTweetsCollection.length == 0) {
			setTimeout(self.drawSelectiveTweets, 2000);
		}

		for ( var key in selectiveTweetsCollection) {
			var dateTime = selectiveTweetsCollection[key].dateTime;
			var text = selectiveTweetsCollection[key].text;
			var emotion = selectiveTweetsCollection[key].dominantEmotion;

			var coord = self
					._getPositionByDateTime(mysqlDateTimeFormatToDate(dateTime));

			function breaklines(str, size) {
				var arr = str.split(/\s+/);
				var res = [];
				var line = "";

				for (var i = 0; i < arr.length; i++) {
					if (i > 0 && (i % size == 0)) {
						res.push(line.trim());
						line = "";
					}
					line = line + arr[i] + " ";
				}
				if (line.trim().length > 0) {
					res.push(line.trim());
				}

				return res.join("\n");

			}

			var textWrapped = breaklines(text, 4);

			var textCoordX = 0.0, textCoordY = 0.0;

			if (coord.x > 30.0) {
				textCoordX = coord.x - 30.0;
				textCoordY = coord.y +  30;
			}
			if ( ($(document).width() - coord.x) <300.0  ){
				//alert(($(document).width() - coord.x));
				textCoordX = coord.x - 300  ;
				textCoordY = coord.y +  30;
			}

			var _text = self.paper.text(textCoordX, textCoordY, textWrapped);
			_text.attr({
				"fill" : "white",
				"font-size" : "12pt",
				"font-family" : "ff-tisa-web-pro, Arial",
				"text-anchor" : "start"
			});
			
			var box = _text.getBBox();
			var rect = self.paper.rect(box.x, box.y, box.width, box.height)
				.attr(
					{'fill':'#e6e6e6',
					 'opacity': 0.2,
					 'stroke-width' : 0 
					} );
			_text.toFront();
			
			
			/*
			 * var circle = this.paper.circle(coord.x, coord.y , 5);
			 * text.node.setAttribute('class','selective_tweet_class');
			 * circle.attr({ "fill": "#000000" });
			 */
			// draw arrow
			var pathStr = "M " + (textCoordX+30) + " " + (textCoordY + 40) + " L "
					+ coord.x + " " + (coord.y + 200);
			var path = self.paper.path(pathStr);
			path.attr({
				"stroke" : "#dddddd",
				"stroke-width" : 3,
				"opacity" : "0.8"
			});

			path.toBack();

		}

		self.placemat.toBack();
		// draw

	};
	
	this.startAnimateEmotionWatch = function() {
	
		var delay = Math.min(self.interval * 800, 5000);

		emotionWatch.delay = delay;
		
		emotionWatch.setValues(currentEmotionValues);
		emotionWatch.setQuantity(currentTweetsQuantity);
		
		emotionWatchInterval = setInterval(function() {
			emotionWatch.setValues(currentEmotionValues);
			emotionWatch.setQuantity(currentTweetsQuantity);

			$('#bdy').animate({
				"background-color" : EMOTIONS_COLORS[currentDominantEmotion]
				//"background-color" : "#1E5A6C"
			}, delay);

		}, delay);
		
	};
	
	this.stopAnimateEmotionWatch = function() {
		clearInterval(emotionWatchInterval);
		emotionWatchInterval= null; 
	};
	
	this.startFlyingTweets = function() {
		
		getTweets(tweet_table, self.currentDateTime, hashtags, interval);
		
		setTimeout(function() {
			// function defined in utils.js
			flyingTweets();  
			//showTweets();
		}, 1000);
		
		
		self.tweetInterval = setInterval(function() {
			if (self.currentStatus == 'start') {
				getTweets(tweet_table, self.currentDateTime, hashtags, interval);
				setTimeout(function() {
					// function defined in utils.js
					flyingTweets();  
					//showTweets();
				}, 1000);

			}
		}, 10000);
		
	};
	
	this.stopFlyingTweets = function() {
		clearInterval(self.tweetInterval);
		self.tweetInterval = null; 
	};
	
	this._convertEmotionValues = function(input_values) {
		
		var max = 0.0;
		var min = 1.0;
		
		var values = {
			0 : 0.1,
			1 : 0.1,
			2 : 0.1,
			3 : 0.1,
			4 : 0.1,

			5 : 0.1,
			6 : 0.1,
			7 : 0.1,
			8 : 0.1,
			9 : 0.1,

			10 : 0.1,
			11 : 0.1,
			12 : 0.1,
			13 : 0.1,
			14 : 0.1,

			15 : 0.1,
			16 : 0.1,
			17 : 0.1,
			18 : 0.1,
			19 : 0.1
		};
		
		for (var i = 0; i < 20; i++) {
			values[i] = input_values[i];

			if (values[i] >= max) {
				max = values[i];
			}

			if (values[i] <= min) {
				min = values[i];
			}

		}

		for (var i = 0; i < 20; i++) {
			if (max + min != 0) {
				values[i] = values[i] / (max + min) * (1 - 0.2) + 0.2;
			} else {
				values[i] = 0.2;
			}
		}	
		
		return values; 
	};
	

	var self = this;

	self.startDrawTimeLabel = function() {
		self.currentDateTime = self.startDateTime;
		self.timer = setInterval(function() {
			self.draw();
		}, 1000);
	};

	self.draw = function() {

		if (self.timeLabel != null) {
			self.timeLabel.remove();
		}

		// state machine:
		switch (self.currentStatus) {

		case "stop":

			if (self.nextStatus == "start") {
				self.currentDateTime = new Date(
						self.currentDateTime.getTime() + self.speed*1000);
				playVideo();
				self.startAnimateEmotionWatch(); 
				self.startFlyingTweets(); 
			} else if (self.nextStatus == "stop") {
				self.currentDateTime = self.currentDateTime;
			}

			break;

		case "start":
			if (self.nextStatus == "stop") {
				self.currentDateTime = self.currentDateTime;
				pauseVideo();
				self.stopAnimateEmotionWatch();
				self.stopFlyingTweets();
			} else if (self.nextStatus == "start") {
				self.currentDateTime = new Date(
						self.currentDateTime.getTime() + self.speed*1000);
			}
			break;

		}

		self.currentStatus = self.nextStatus;

		// draw dynamic content:
		var coord = self._getPositionByDateTime(self.currentDateTime);
		var middleTime = self.startDateTime.getTime()
				+ (self.endDateTime.getTime() - self.startDateTime.getTime())
				* 0.75;

		var _dateTime = moment(self.currentDateTime);
		if (self.currentDateTime.getTime() > middleTime) {
			self.timeLabel = self.paper.text(coord.x - 100, coord.y + 50,
					_dateTime.format("YYYY-MM-DD HH:mm:ss"));
		} else {
			self.timeLabel = self.paper.text(coord.x + 100, coord.y + 50,
					_dateTime.format("YYYY-MM-DD HH:mm:ss"));
		}

		pathString = "M " + (coord.x) + " " + (coord.y + 50) + " L "
				+ (coord.x) + " " + self.height;

		if (self.currentTimeLine != null) {
			self.currentTimeLine.remove();
		}
		self.currentTimeLine = self.paper.path(pathString);

		self.currentTimeLine.attr({
			"stroke" : "red",
			"stroke-width" : 1
		});

		self.timeLabel.attr({
			"fill" : "white",
			"font-size" : 14,
			"font-family" : "Arial"
		});

		// draw button

		self._drawControlButton();
		
		function controlButtonClicked (){
			
			if (self.currentStatus == "stop") {
				self.nextStatus = "start";

				// trigger event
				$(".tweet_class").each(function() {
					$(this).trigger("tweet_class_start_event");
				});

			} else if (self.currentStatus == "start") {
				self.nextStatus = "stop";

				$(".tweet_class").each(function() {
					$(this).trigger("tweet_class_stop_event");
				});
			}

			self.draw();
			// self._drawControlButton();
		}; 
		
		self.controlButton.click(function(event) {

			controlButtonClicked(); 

		});

		self.controlButtonText.click(function(event) {

			controlButtonClicked();

		});
		
		

		// set emotions
		self.setEmotionValues();
		
		// patch: remove unwanted mouse over line, I don't know why mouseOverLine remains when moving mouse out very fast. 
		if (self.mouseOverLastEvent == 'unhover') {
			for ( var key in self.mouseOverLineBuffer) {
				if (self.mouseOverLineBuffer[key] != null) {
					self.mouseOverLineBuffer[key]
							.remove();
				}
			}
		}
		

	};

	self._drawControlButton = function() {

		var coord = self._getPositionByDateTime(self.currentDateTime);

		if (self.controlButton != null) {
			self.controlButton.remove();
		}

		if (self.controlButtonText != null) {
			self.controlButtonText.remove();
		}

		self.controlButton = self.paper.circle((coord.x), coord.y + 50, 20);

		self.controlButton.attr({
			"stroke" : "white",
			"fill" : "#555555",
			"stroke-width" : 1,
			"cursor" : "pointer"
		});

		var text = "";
		if (self.currentStatus == "stop") {
			text = "Start";
		} else if (self.currentStatus == "start") {
			text = "Stop";

		}

		self.controlButtonText = self.paper.text((coord.x), coord.y + 50, text);
		self.controlButtonText.attr({
			"fill" : "white",
			"font-size" : 14,
			"cursor" : "pointer"
		});

	};

	self.setEmotionValues = function() {

		currentEmotionValues = self
				._getEmotionValuesByCurrentDateTime(self.values);

	};

	self._getEmotionValuesByCurrentDateTime = function(data) {

		res = data
				.filter(function(element) {
					var _dateTime = element.dateTime;

					if (self.currentDateTime.getTime() >= _dateTime.getTime()
							&& self.currentDateTime.getTime() < (_dateTime
									.getTime() + self.interval * 1000)) {
						return element;
					}
				});

		var values = {
			0 : 0.1,
			1 : 0.1,
			2 : 0.1,
			3 : 0.1,
			4 : 0.1,

			5 : 0.1,
			6 : 0.1,
			7 : 0.1,
			8 : 0.1,
			9 : 0.1,

			10 : 0.1,
			11 : 0.1,
			12 : 0.1,
			13 : 0.1,
			14 : 0.1,

			15 : 0.1,
			16 : 0.1,
			17 : 0.1,
			18 : 0.1,
			19 : 0.1
		};
		



		if (res.length == 1) {

			currentDominantEmotion = res[0].dominantEmotion;
			currentTweetsQuantity = res[0].quantity;
			
			
			// map value to 0.2-1
			return self._convertEmotionValues(res[0].values);

		} else if (res.length > 1) {
			alert("Several emotion_values found ! ");
			return values;
		} else {
			return values;
		}

	};

};