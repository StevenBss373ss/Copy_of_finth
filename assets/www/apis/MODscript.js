/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// api-geolocation
var getCurrentPosition = function() {
    var success = function(pos) {                
        var text = "<div>Latitude: " + pos.coords.latitude + 
                    "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                    "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        $("#cur_position").html(text);
        console.log(text);
        
        var mapwidth = parseInt($('#map').css("width"), 10);  // remove 'px' from width value
        var mapheight = parseInt($('#map').css("height"), 10);
        $('#map').css('visibility','visible');
        $('#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
            pos.coords.latitude + "," + pos.coords.longitude + 
            "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
            pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");
    };
    var fail = function(error) {
        $("#cur_position").html("Error getting geolocation: " + error.code);
        console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };

    $('#map').css('visibility','hidden');
    $("#cur_position").html("Getting geolocation . . .");
    console.log("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(success, fail);
};

// api-geolocation Watch Position
var watchID = null;
var gpsCoords = [];
var gpsPOS = [];
function clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        $("#cur_position").empty();
        $('#map').css('visibility','hidden');
    }
}
var kount=0;
var wsuccess = function(pos) {                
    $("#cur_position").html("Watching geolocation . . .");
    $('#map').css('visibility','hidden');
    
    var text = "<div>Latitude: " + pos.coords.latitude + " (watching)<br/>" 
    			+ "Longitude: " + pos.coords.longitude + "<br/>" 
                + "Accuracy: " + pos.coords.accuracy + "m<br/>"
                + "Kount: " + kount + "<br/>" 
                + "</div>";
    $("#cur_position").html(text);
  
//BEGIN
//some of my code strings for improving inner workings of asyncro function
    // insertDB(pos);
 
    /* this short function works in saving gps coordinates into sqlite database, only issue is that it seems
     * to stop to watch position function: maybe due to it not having error handling  
     * db.transaction(
    	    function (transaction) {
    	        transaction.executeSql("INSERT INTO demo (id, lat, long, acc) VALUES(?,?,?,?)",[ kount, pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy ]); // array of values for the ? placeholders
    	    }
    	);
 */   

function myGPSarray(){
	gpsCoords[kount]
	=new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
    	
    	
}
    // send coords to db table here
//    var latitude=     position.coords.latitude              ;
//    var longitude=    position.coords.longitude             ;
//    var altitude=	  position.coords.altitude              ;
//    var accuracy= 	  position.coords.accuracy              ;
//    var altitudeAccuracy= position.coords.altitudeAccuracy      ;
//    var heading= 	  position.coords.heading               ;
//    var speed= 		  position.coords.speed                 ;
//    var timestamp= 	  new Date(position.timestamp)          ;
    
    kounter();

    
//END
    
    console.log(text);    
    var mapwidth = parseInt($('#map').css("width"), 10);  // remove 'px' from width value
    var mapheight = parseInt($('#map').css("height"), 10);
    $('#map').css('visibility','visible');
    $('#map').attr('src', 
    		"http://maps.googleapis.com/maps/api/staticmap?center=" + 
             pos.coords.latitude + "," + pos.coords.longitude + 
            "&zoom=13&size=" + mapwidth + "x" + mapheight + 
            "&maptype=roadmap&markers=color:green%7C" +
             pos.coords.latitude + "," + pos.coords.longitude + 
             "&sensor=false");
   
};
var wfail = function(error) {
    $("#cur_position").html("Error getting geolocation: " + error.code);
    console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
};
var toggleWatchPosition = function() {
    if (watchID) {
        console.log("Stopped watching position");
        clearWatch();  // sets watchID = null;
    } else {
        //$("#cur_position").empty();
        $('#map').css('visibility','hidden');
        $("#cur_position").html("Watching geolocation . . .");
        console.log("Watching geolocation . . .");
        var options = { frequency: 3000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
    }
};
function saveIn2DB(pos,tx){
//  var latitude=     pos.coords.latitude              ;
//  var longitude=    pos.coords.longitude             ;
//  var altitude=	  position.coords.altitude              ;
//  var accuracy= 	  pos.coords.accuracy              ;
//  var altitudeAccuracy= position.coords.altitudeAccuracy      ;
//  var heading= 	  position.coords.heading               ;
//  var speed= 		  position.coords.speed                 ;
//  var timestamp= 	  new Date(position.timestamp)          ;

	
  tx.executeSql('INSERT INTO DEMO (id, lat, long, acc, time) VALUES (?????)');
	
};



/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// api-storage  "Create DB"
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id, lat REAL, long REAL, acc REAL, time)');
}
function errorCB(err) {
   console.log("Error processing SQL: " + err.code);
   $('#sql-result').html("<strong>Error processing SQL: " + err.code + "</strong>");
}
function successCreateCB() {
   console.log("Success creating Database 1.0");
   $('#sql-result').html("<strong>Success creating Database 1.0</strong>");
}
var db = 0;
function createDB(){
    if (!db) {
        db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
    }
    db.transaction(populateDB, errorCB, successCreateCB);    
}
function insertDB(){
    if (!db) {
        db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
    }
    db.transaction(in2DB, errorCB, successCreateCB);    
}
function in2DB(tx,kount) {
	
	transaction.executeSql('INSERT INTO demo (id, lat) VALUES (?, -23.984',[kount]);
    //tx.executeSql('INSERT INTO DEMO (lat) VALUES (?)',[lati]);
}
function errorCB(err) {
   console.log("Error processing SQL: " + err.code);
   $('#sql-result').html("<strong>Error processing SQL: " + err.code + "</strong>");
}
function successCreateCB() {
   console.log("Success INSERT Database 1.0");
   $('#sql-result').html("<strong>Success INSERT Database 1.0</strong>");
}

// api-storage  "Get SQL Result Set"
function querySuccess(tx, results) {
	
     /*/ this will be empty since no rows were inserted.
    //console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Num. Rows Returned = " + results.rows.length+"conLOG");
    */
    

    var len = results.rows.length;
    var detail = "";
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        detail+=("Row = " + i + 
        		"; ID = " + results.rows.item(i).id + 
        		"; Lat =  " + results.rows.item(i).lat +
        		"; Long =  " + results.rows.item(i).long +
        		"; Accuracy =  " + results.rows.item(i).long +
        		"; Time =  " + results.rows.item(i).time +
        		"-<br>");
    }

	
    $('#sql-result').html(detail+"<strong>Number. Rows in database = " + results.rows.length + "</strong>");
    
    
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}
function getSqlResultSet() {
    if (!db) {
        db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    }
    db.transaction(queryDB, errorCB);    
}

// api-storage   Local Storage
function writeLocalStorage() {
    window.localStorage.setItem("myKey", "myValue");
    var keyname = window.localStorage.key(0); // 0 because first and only setItem!
    $('#local-storage-result').html("Wrote key: <strong>" + keyname + "</strong>");
}
function readLocalStorage() {
    var value = window.localStorage.getItem("myKey");
    if (!value) {
        $('#local-storage-result').html("<strong>Null</strong> - Try Write first");        
    } else {
        $('#local-storage-result').html("Got value: <strong>" + value + "</strong>");
    }
}
function removeItemLocalStorage() {
    window.localStorage.removeItem("myKey");
    $('#local-storage-result').html("Removed key/value: <strong>myKey/myValue</strong>");    
}



function kounter(){kount++;}
