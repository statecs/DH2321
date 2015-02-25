function EmotionWatch(options) {

	/*
	 * this.paper ;
	 * 
	 * var startDateTime; var endDateTime; var emotionWatchCollection;
	 */

	this.paper = options.paper;
	
	this.values = {
		0 : 0,
		1 : 0,
		2 : 0,
		3 : 0,
		4 : 0,
		5 : 0,
		6 : 0,
		7 : 0,
		8 : 0,
		9 : 0,
		10 : 0,
		11 : 0,
		12 : 0,
		13 : 0,
		14 : 0,
		15 : 0,
		16 : 0,
		17 : 0,
		18 : 0,
		19 : 0
	};

	this.quantity = 0;

	this.x0 = this.paper.width/2;
	this.y0 = this.paper.height/2;
	

	//this.paper.canvas.style.backgroundColor = 'green'; // for testing layout
	// emotionWatch r
	
	this.radius1 = Math.min(this.paper.width,this.paper.height) /4 ; 
	this.radius2 = Math.min(this.paper.width,this.paper.height)/4 + Math.min(this.paper.width,this.paper.height)/33 ;

	this.radiusEmotionCircle = 8;

	this.maxValCoords = Array();
	
	this.pathOpacity = 0.9; 
	this.pathFillColor = "#a0a0a0"; 

	this.path = null;
	this.pathPreview = null; 
	this.quantityCircle = null;
	this.quantityCircleBuffer = []; 
	this.delay = 1500;
	
	this.circle3 ; 

	var self = this; 
	// function for initialization of the emotionWatch
	this.init = function() {

		var values = this.values;

		// draw the big emotion watch circle
		// origin x,y

		var paper = this.paper;

		var circle1 = paper.circle(this.x0, this.y0, this.radius1);
		var circle2 = paper.circle(this.x0, this.y0, this.radius2);
		circle1.attr({
			"stroke" : "white",
			"opacity": 0.3,
			"stroke-width" : "0"
		});

		circle2.attr({
			"stroke" : "white",
			"opacity": 0.3 ,
			"stroke-width" : "0"
		});
		
		var circle4 = paper.circle(this.x0, this.y0, (this.radius1 + this.radius2)/2);
		circle4.attr({
				"stroke" :"white" ,
				"opacity": 0.0 ,
				"stroke-width" : "20"
			}
		);
		
		this.circle3 = paper.circle(this.x0, this.y0, this.radiusEmotionCircle+2);
		

		
		
		this.circle3.attr({
			"stroke" : "black",
			"opacity": 1.0,
			"fill": "black",
			"z-index": "999"
		});
		
		

		// draw small emotion circles and lines
		var circles = Array();

		var pathStr = "";

		for (var i = 0; i < 20; i++) {
			
			var currentAngle =  Math.PI / 10 * i + Math.PI + Math.PI / 20; 
				
			var newCoord = this._calculateCoordinateAfterRotation(this.x0,
					this.y0 + this.radius2 + 20, this.x0, this.y0, currentAngle);
			
			// small circles
			circles[i] = paper.circle(newCoord[0], newCoord[1],
					this.radiusEmotionCircle);
			var color = this.getColorByIndex(i);
			circles[i].attr({
				"stroke" : "white",
				"stroke-width" : "0",
				"fill" : color
			});

			// emotion label
			
			var x = ( newCoord[0] -  this.x0) ; 
			var y = ( newCoord[1] -  this.y0 ) ; 
			
			var coef = 1.15 + ( (EMOTIONS_LABEL[i].length+5)/100); 
			
			x = x * coef + this.x0 ; 
			y = y * coef + this.y0 ; 
			
			var newCoord2 = this._calculateCoordinateAfterRotation(x, y, this.x0, this.y0, 0);
			
			var emotion_label = paper.text(newCoord2[0], newCoord2[1], EMOTIONS_LABEL[i] );
			
			emotion_label.attr({
				"fill" : "white",
				"font-size": 14, 
				"font-family": "ff-tisa-web-pro, Arial" 
			});
			
			if (i < 10 ) {
				emotion_label.rotate(currentAngle * 180 / Math.PI + 90, newCoord2[0], newCoord2[1] );
			}else {
				emotion_label.rotate(currentAngle * 180 / Math.PI + 90 + 180, newCoord2[0], newCoord2[1] );
			}
			
			// draw lines 
			var x1 = ((newCoord[0] - this.x0) * 0.75) + this.x0;
			var y1 = ((newCoord[1] - this.y0) * 0.75) + this.y0;
			
			var x1_copy = ((newCoord[0] - this.x0) * 0.90) + this.x0;
			var y1_copy = ((newCoord[1] - this.y0) * 0.90) + this.y0;
			
			
			var lines = Array();
			
			lines[i] = paper.path("M" + this.x0 + " " + this.y0 + "L" + x1_copy
					+ " " + y1_copy);

			lines[i].attr({
				"stroke" : "#FFFFFF",
				"stroke-dasharray" : "-",
				"opacity": 0.2
			});

			this.maxValCoords.push([ x1, y1 ]);
		}
	};

	this.setQuantity = function(quantity) {
		var _oldQuantity  =  self.quantity; 
		
		// draw circle width:
		var range = this.radius2 - this.radius1;
		
		var proportion1 = _oldQuantity / currentMaxTweetsQuantity * range;
		var proportion2 =  quantity / currentMaxTweetsQuantity * range;
		
		var rad1 = proportion1/2 + self.radius1;
		var rad2 = proportion2/2 + self.radius1;
		
		this.quantityCircle = this.paper.circle(this.x0, this.y0, rad1 );
		this.quantityCircleBuffer.push(this.quantityCircle); 

		this.quantityCircle.attr({
			stroke : this.pathFillColor,
			opacity : this.pathOpacity,
			"stroke-width": proportion1
		});
		
		
		this.quantityCircle = this.paper.circle(this.x0, this.y0, rad2 );
		this.quantityCircleBuffer.push(this.quantityCircle); 

		this.quantityCircle.attr({
			stroke : this.pathFillColor,
			opacity : this.pathOpacity
			
		});
		
		this.quantityCircle.animate({
			"stroke-width" : proportion2
		}, this.delay);
		
		this.quantity = quantity; 
		
		// remove all circles except one 
		for (var key in this.quantityCircleBuffer ){
			if (key < this.quantityCircleBuffer.length-2 ){
				this.quantityCircleBuffer[key].remove();
			}
		}
		
	};
		

	this.setValues = function(newValues) {

		if (this.path != null) {
			this.path.remove();
		}

		var oldValues = this.values;

		var oldpath = this._getEmotionPath(oldValues);
		var emotionPath = this.paper.path(oldpath).attr({
			stroke : this.pathFillColor,
			fill : this.pathFillColor,
			opacity : this.pathOpacity
		});

		var newPath = this._getEmotionPath(newValues);

		emotionPath = emotionPath.animate({
			path : newPath,
			stroke : this.pathFillColor,
			fill : this.pathFillColor,
			opacity : this.pathOpacity
		}, this.delay);

		this.values = newValues;

		this.path = emotionPath;
		
		if ( this.circle3 != null ) {
			this.circle3.toFront();
		}

	};
	
	this.setValuesPreview = function(newValues){
		
		if ( this.pathPreview != null)
			this.pathPreview.remove();
		
		var pathStr = this._getEmotionPath(newValues);
		var path = this.paper.path(pathStr);
		
		path.attr({
			stroke: "#eeeeee", 
			fill : "#eeeeee",
			opacity : 0.2
		}); 
		this.pathPreview = path;
		
	} ;

	this._getCoordinateByValue = function (x, y, x0, y0,
			value) {
		return [ ((x - x0) * value) + x0, ((y - y0) * value) + y0 ];
	};

	this._calculateCoordinateAfterRotation = function(x, y, x0, y0, angle) {

		// var angle = Math.PI/10;
		var cosAngle = Math.cos(angle);
		var sinAngle = Math.sin(angle);

		x = x - x0;
		y = y - y0;

		var x1, y1;

		x1 = x * cosAngle - y * sinAngle;
		y1 = x * sinAngle + y * cosAngle;

		x1 = x1 + x0;
		y1 = y1 + y0;

		res = Array();
		res.push(x1);
		res.push(y1);

		return res;

	};

	this._getEmotionPath = function(values) {

		var firstValue = Array();
		var pathStr = "";

		for (var i = 0; i < 20; i++) {

			// var value = Math.random();
			var value = values[i];

			var coordOfValue = this._getCoordinateByValue(
					this.maxValCoords[i][0], this.maxValCoords[i][1], this.x0,
					this.y0, value);

			if (i == 0) {
				firstValue = coordOfValue;
				pathStr += "M " + coordOfValue[0] + " " + coordOfValue[1]
						+ " L ";
			} else {
				pathStr += " L " + coordOfValue[0] + " " + coordOfValue[1];
			}

		}

		pathStr += " " + firstValue[0] + " " + firstValue[1];

		return pathStr;
	};

	this.getDominantValue = function() {
		var values = this.values;

		var max = 0.0;

		for ( var key in this.values) {
			max = Math.max(max, values[key]);
		}

		return max;
	};

	this.getDominantValueIndex = function() {

		var values = this.values;

		var max = 0.0;

		var maxKey = 0;
		for ( var key in this.values) {

			if (values[key] >= max) {
				maxKey = key;
				max = values[key];
			}
		}

		return maxKey;
	};

	this.getColorByIndex = function(index) {

		var color = "#f3913b";

		var emotionsColors = {
			0 : "f3913b",
			1 : "e4633a",
			2 : "ffb014",
			3 : "e5d44a",
			4 : "bac300",

			5 : "#bbeb77",
			6 : "#46dc00",
			7 : "#8ff28d",
			8 : "#01c889",
			9 : "#73efe8",

			10 : "#4da9f0",
			11 : "#053ba5",
			12 : "#395cda",
			13 : "#2a2972",
			14 : "#755edc",

			15 : "#712fbf",
			16 : "#d235ff",
			17 : "#6e006e",
			18 : "#af259d",
			19 : "#cc0100"
		};

		color = emotionsColors[index];

		return color;
	};

}
