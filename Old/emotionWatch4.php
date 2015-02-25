<html lang="en">
<head>
	
<meta charset="utf-8">
<title>Emotion Watch</title>
		
<!-- css -->
<link rel="stylesheet" href="css/default.css">
<link rel="stylesheet" href="css/jquery.simple-dtpicker.css">
<link rel="stylesheet" href="js-lib/jquery-ui/jquery-ui-1.10.4.custom.min.css">

<!--remote js lib -->
<!--<script src="//code.jquery.com/jquery-2.1.0.min.js"></script>-->
<!--<script src="//code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>-->
<!--<script src="//code.jquery.com/color/jquery.color-2.1.2.min.js"></script>-->
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>-->
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/graphael/0.5.1/g.raphael-min.js"></script>-->
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script>-->
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>-->


<!--local js lib -->
<script src="js-lib/jquery-2.1.0.min.js"></script>
<script src="js-lib/jquery-ui/jquery-ui-1.10.4.custom.min.js"></script>
<script src="js-lib/jquery.color-2.1.2.min.js"></script>
<script src="js-lib/raphael-min.js"></script>
<script src="js-lib/moment.min.js"></script>
<script src="js-lib/jquery.simple-dtpicker.js"></script>


<!--local js files --> 
<script src="js/config.js"></script>
<script src="js/script.js"></script>
<script src="js/dateUtils.js"></script>
<script src="js/emotionWatch.js"></script>
<script src="js/timelineBar.js"></script>
<script src="js/utils.js"></script>
<script src="js/requestUtils.js"></script>
<script src="js/model.js"></script>

</head>
<body id="bdy">

		<div id="bg" >
			
			<div id="topbar" style="width:100%; text-align: center;">
				
								
				
				<div id="shade"></div>
				<div id="modal"></div>
				
				<!--Popup window for filter by keywords -->
				<div id="modal-keywords">
					
					<span style="font-size:20px; ">Filter athlete or hashtag</span>

					<hr>
					
					<span style="font-size:14px; ">Select search terms that you want to visualize of this specific event</span>
					<br/>

					<!--<textarea id="hashtagsTA"  style="width:400px; height:250px;">gymnastics,bars,uneven,ArtisticGymnastics,barFinals,MUSTAFINA Aliya,TWEDDLE Elizabeth,KOMOVA Victoria,Kexin He,YAO Jinnan,DOUGLAS Gabrielle,SEITZ Elisabeth,TSURUMI Koko</textarea>	-->
					
					<div id="c_b">
						
												<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="gymnastics" checked >gymnastics							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="bars" checked >bars							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="uneven" checked >uneven							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="ArtisticGymnastics" checked >ArtisticGymnastics							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="barFinals" checked >barFinals							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="MUSTAFINA Aliya" checked >MUSTAFINA Aliya							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="TWEDDLE Elizabeth" checked >TWEDDLE Elizabeth							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="KOMOVA Victoria" checked >KOMOVA Victoria							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="Kexin He" checked >Kexin He							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="YAO Jinnan" checked >YAO Jinnan							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="DOUGLAS Gabrielle" checked >DOUGLAS Gabrielle							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="SEITZ Elisabeth" checked >SEITZ Elisabeth							</div>
							
														<div style="float:left; width: 220px; text-align:left; ">
								<input type="checkbox" value="TSURUMI Koko" checked >TSURUMI Koko							</div>
							
												</div>
					
					
					<div class="clear" style="height:20px;"></div>
					
					

					<button style="float:left;" onclick="javascript:selectAllKeywords()">Select all</button>
					<button style="float:left;" onclick="javascript:unselectAllKeywords()">Unselect all</button>

					<button style="float:right;" onclick="javascript:hideModalKeywords()">Close</button>
					
					<script>
						var allVals = [];
						function updateTextArea() {
							allVals = [];
							$('#c_b :checked').each(function() {
								allVals.push($(this).val());
							});
							$('#t').val(allVals)
							//alert(allVals); 
						}

						$(function() {
							$('#c_b :input').click(updateTextArea);
							updateTextArea();
						});
						
						function selectAllKeywords() {
							$('#c_b :input:checkbox').each(function() {
								$(this).prop('checked', true);
							});
							updateTextArea();
						}
						function unselectAllKeywords() {
							$('#c_b :input:checkbox').each(function() {
								$(this).prop('checked', false);
							});
							updateTextArea();
						}
						
						
					</script>

					<button style="float:right;" onclick="javascript:filterByKeywords(allVals);" >Filter</button>
					
				</div><!--End of Popup window for filter by keywords -->
        		
				
				<div style="width: 902px; margin:auto; " >
					<div style="float: left; width:150px;  ">
						<div style="padding: 20 0 0 0px; ">
							<a style="color:white;" href="index.php.html">Start Page</a>
						</div>
					</div>
					
					<div style="float: left; width:600px;  ">
						<hr/>
						<span style="text-align:center;color:white;font-family:league-gothic,Arial;  font-size: 30pt; font-weight: bold;  ">UNEVEN BARS: FINAL</span><br/>
						<span style="text-align:center;color:white; font-family:league-gothic, Arial; font-size: 14pt; font-weight: 100; " >Gymnastics - Women</span>
						<hr/>
					</div>
					
					<div style="float: left; width:150px;  ">
						<div style="padding: 20 0 0 0px; ">
							<a href="javascript:void(0)" onclick="javascript:showModalKeywords()">Filter by keywords</a>
						</div>
					</div>
				</div>
				
				<div class="clear" />
				
				<div style="width: 805px; margin:auto; font-size:10pt;  " >
					<div style="float: left; width:200px;  ">
						<span style="opacity: 0.5;" >Event starts at</span> <br/>
						<span>2012-08-06 13:49:35</span>
					</div>
					
					<div style="float: left; width:200px;  ">
						<span style="opacity: 0.5;" >Event ends at</span> <br/>
						<span>2012-08-06 14:22:35 </span>
					</div>
					
					<div style="float: left; width:200px;  ">
						<span style="opacity: 0.5;" >Interval</span> <br/>
						<span>10 seconds</span>
					</div>
					
					<div style="float: left; width:200px;  ">
						<span style="opacity: 0.5;" >Network</span> <br/>
						<span>Twitter</span>
					</div>
				</div>
				
				<div class="clear" />
				
			</div>

			<div>
				
				<!--<ul id="blinkingTweetsUl">
					
				</ul>-->
				
<!--
				<ul id="flyingTweetsUl">
					
				</ul>
-->				
				
			</div>
				
			
			<div id="graph1" style="margin:auto;  ">
				
			</div>
			
			<div id="videoDiv" draggable="true">
								

				<video id="vid">
					<source src="http://grpupc1.epfl.ch/~maoan/videos/gymnastics-unevenbars.ogv" type="video/ogg" />
					<source src="../../~maoan/videos/gymnastics-unevenbars.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>

								
			</div>
			
			
			<script>
				$('#videoDiv').draggable();
				$('#videoDiv').resizable();
			</script>
			
			
			
			<div style="clear: both; height:1px;"></div>
			
			<div id="graph2" style=" position:absolute;bottom:0;">

			</div>
			
			
			<!--<div id="infoDebug" >
				
			</div>-->
			
			
		</div>



		<script>
			var tweet_table;

			$(document).ready(function() {
				var currentWindowWidth = $(document).width()-50 ;
				var currentWindowHeight = $(document).height();

				// get the params from URL 
				var startDateTime = mysqlDateTimeFormatToDate('2012-08-06 13:49:35');  //mysqlDateTimeFormatToDate(window.location.search.split("&")[1].split("=")[1]);
				var endDateTime = mysqlDateTimeFormatToDate('2012-08-06 14:22:35');   // mysqlDateTimeFormatToDate(window.location.search.split("&")[2].split("=")[1]);

				hashtags = 'gymnastics,bars,uneven,ArtisticGymnastics,barFinals,MUSTAFINA Aliya,TWEDDLE Elizabeth,KOMOVA Victoria,Kexin He,YAO Jinnan,DOUGLAS Gabrielle,SEITZ Elisabeth,TSURUMI Koko';
				interval = '10';
				speed = '1';
				

				// load tweet_table name from event
               			tweet_table = 'merged_tweets_for_specEvents_london2012'; 


				// these variables are useful for adjusting layout of elements according to window size

				$('#graph1').css({
					"width" : currentWindowWidth * 0.5
				});

				// draw emotion watch 
				var paper = Raphael("graph1", currentWindowWidth * 0.5, currentWindowHeight / 1.7);
				emotionWatch = new EmotionWatch({
					paper : paper
				});
			
				emotionWatch.init();
				emotionWatch.setValues(currentEmotionValues);

				// get frequency for the timelineBar
				getFrequency(tweet_table, startDateTime, endDateTime, hashtags, interval, Raphael('graph2', currentWindowWidth, 200 ), emotionWatch, timelineBar  );
				// get selective tweets 
				//getSelectiveTweets(tweet_table, startDateTime, endDateTime, hashtags); 


				/*
				var delay = Math.max(interval * 800, 1500);
				var i = 0;
				emotionWatchInterval = setInterval(function() {
					emotionWatch.delay = delay;
					emotionWatch.setValues(currentEmotionValues);
					emotionWatch.setQuantity(currentTweetsQuantity);

					$('#bdy').animate({
						"background-color" : EMOTIONS_COLORS[currentDominantEmotion]
					}, delay);

					i++;
				}, delay);
				*/
				
				// end of emotionWatch
				


				// get  flying tweets
				
				tweetCollection = [];

				
								


			});

		</script>
	</body>
</html>
