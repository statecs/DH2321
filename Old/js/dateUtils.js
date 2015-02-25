
function mysqlTimeStampToDate(timestamp) {
  //function parses mysql datetime string and returns javascript Date object
  //input has to be in this format: 2007-06-05 15:26:02
  var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
  var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
  return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
}


function mysqlDateTimeFormatToDate(string) {
	var date = new Date(2010,0,15);
	
	string = string.replace("%20", " ");
	
    var parts = String(string).split(/[- :]/);  
      
    date.setFullYear(parseInt(parts[0]));  
    date.setMonth(parseInt(parts[1]) - 1);  
    date.setDate(parseInt(parts[2]));  

    date.setHours(parseInt(parts[3]));  
    date.setMinutes(parseInt(parts[4]));  
    
    if (parts[5] == null ){
    	date.setSeconds(0);  
    }else  {
    	date.setSeconds(parseInt(parts[5]));  
    }
    date.setMilliseconds(0);  
      
    return date;  
	
	
}

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
};

