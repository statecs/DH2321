// Initialize lists of lines
var jsonFile;
var lineList = document.getElementById('lineList');
lineList.style.visibility = 'hidden';
var displayList = document.getElementById('displayList');
updateList();
var vid = document.getElementById("ourvideo");
var currentLine = 0;

// Code to jump to time-offset in video when selected
$("#displayList").on('change', function(){
	var lineIndex = $(this).index;
	stackedArea(FILEPATH, lineIndex);
	var timestamp = $(this).val().toString().split(":");
	var offset = parseInt((timestamp[0] * 3600)) + parseInt((timestamp[1] * 60)) + parseInt((timestamp[2]));
	vid.currentTime = offset;
	
});

// Code that automatically highlights option in searchbar based on timestamp
vid.addEventListener('timeupdate',function(event){
	var currentTime = vid.currentTime;
	var hour = Math.floor(currentTime/3600);
	currentTime = currentTime % 3600;
	var minute = Math.floor(currentTime / 60);
	currentTime = currentTime % 60;
	var second = Math.floor(currentTime);
	var value = padZero(hour) + ":" + padZero(minute) + ":" + padZero(second);
	var lineIndex = setOption(value);
	if (lineIndex != false) {
		if (currentLine != lineIndex) {
			stackedArea(FILEPATH, lineIndex);
			currentLine = lineIndex;
		}
	}
},false);

var currentTime = parseInt(this.currentTime, 10);
if(currentTime == 6) { 
    alert("Hej");
}


function barClicked(lineIndex) {
	var optionSelected = displayList[lineIndex];
	displayList.selectedIndex = lineIndex;
	var timestamp = optionSelected.value.toString().split(":");
	var offset = parseInt((timestamp[0] * 3600)) + parseInt((timestamp[1] * 60)) + parseInt((timestamp[2]));
	vid.currentTime = offset;
}

// Helper code to pad zeroes
function padZero(number) {
	if (number<=10) { number = ("0"+number).slice(-2); }
	return number;
}

// Helper code to select an option
function setOption(value) {
	var options = displayList.options;
	for (var i = 0, optionsLength = options.length; i < optionsLength; i++) {
		if (options[i].value == value) {
			displayList.selectedIndex = i;
			return i;
		}
	}
	return false;
}

// Code that updates list of lines when movie is changed.
function updateList(movieTitle) {
	// Defensive code, loads default values
	displayList.options.length = 0;
	lineList.options.length = 0;
	if (movieTitle == null || movieTitle.length < 0) {
		movieTitle = "json/Gravity.json";
	}
	
	else {
		movieTitle = movieTitle.split(".")[0];
		movieTitle = "json/" + movieTitle + ".json";

	}
	
	// Populates dummy/base with lines from JSON file (hidden to user)
	$.getJSON(movieTitle,{}, function(response) {
		jsonFile = response;
		selector = $("#lineList");
		for(var key in jsonFile){
			if(jsonFile.hasOwnProperty(key)){
					var line = jsonFile[key];
				var lineKeys = jsonFile[key].emotions;
			
				neg = lineKeys["-"];
				veryneg = lineKeys["--"];

				negative = parseInt((veryneg * 100) + (neg * 100));

				pos = lineKeys["+"];
				verypos = lineKeys["++"];

				positive = parseInt((verypos * 100) + (pos * 100));


				if ((negative) > (positive)){
					var timeVal = line["timestamp"].substring(0,line["timestamp"].indexOf(","));
				selector.append("<option class='red' value="+timeVal+">"+timeVal + " - " + line["sentence"] +"</option>");

				} else{
				var timeVal = line["timestamp"].substring(0,line["timestamp"].indexOf(","));
				selector.append("<option class='green' value="+timeVal+">"+timeVal + " - " + line["sentence"]+ "</option>");

				}
			
			}
		}
	});
	
	// Populates actual list that is displayed to user
	$.getJSON(movieTitle,{}, function(response) {
		jsonFile = response;
		selector = $("#displayList");
		for(var key in jsonFile){
			if(jsonFile.hasOwnProperty(key)){
				var line = jsonFile[key];
				var lineKeys = jsonFile[key].emotions;
			
				neg = lineKeys["-"];
				veryneg = lineKeys["--"];

				negative = parseInt((veryneg * 100) + (neg * 100));

				pos = lineKeys["+"];
				verypos = lineKeys["++"];

				positive = parseInt((verypos * 100) + (pos * 100));


				if ((negative) > (positive)){
					var timeVal = line["timestamp"].substring(0,line["timestamp"].indexOf(","));
				selector.append("<option class='red' value="+timeVal+">"+timeVal + " - " + line["sentence"]+"</option>");

				} else{
				var timeVal = line["timestamp"].substring(0,line["timestamp"].indexOf(","));
				selector.append("<option class='green' value="+timeVal+">"+timeVal + " - " + line["sentence"] +"</option>");

				}
			}
		}
	});
}


 
function searchWord(){
	// Searches for words in base list, and updates display list with hits.
	var searchvalue= document.getElementById('search').value;
	searchvalue = searchvalue.toLowerCase();
	var from_s = document.getElementById('lineList');
	var displayList = document.getElementById('displayList');
	displayList.options.length = 0;
	for (var i=0;i<from_s.options.length-1;i++) {
		var str=from_s.options[i].text;
		var st = str.toLowerCase();
		if(st.search(searchvalue)>-1) {
			var val = from_s.options[i].value;
			var newRow = new Option(str, val);
			displayList.add(newRow);
		}            
	}
	
	// Automatically highlight first line as default
	if (searchvalue.length > 0) {
		$("#displayList").val($("#displayList option:first").val());
	}
}