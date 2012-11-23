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

// api-storage  "Create DB"
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id, data, data)');
    tx.executeSql('INSERT INTO DEMO (id, data, data) VALUES (1, pos.coords.latitude,pos.coords.longitude)');
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

// api-storage  "Get SQL Result Set"
function querySuccess(tx, results) {
    // this will be empty since no rows were inserted.
    //console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Num. Rows Returned = " + results.rows.length);
    $('#sql-result').html("<strong>Num. Rows Returned = " + results.rows.length + "</strong>");
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







var getCurrentPosition = function() {
    var success = function(pos) {                
        var text =  "<div>Latitude: "          + pos.coords.latitude     + "<br/>" +
                    "Longitude: "         + pos.coords.longitude         + "<br/>" +
                    "Altitude: "          + pos.coords.altitude          + "<br/>" +
                    "Accuracy: "          + pos.coords.accuracy          + "<br/>" +
                    "Altitude Accuracy: " + pos.coords.altitudeAccuracy  + "<br/>" +
                    "Heading: "           + pos.coords.heading           + "<br/>" +
                    "Speed: "             + pos.coords.speed             + "<br/>" +
                    "Timestamp: "         + pos.timestamp                + "m<br/>" +"</div>";
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
function clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        $("#cur_position").empty();
        $('#map').css('visibility','hidden');
    }
}
var wsuccess = function(pos) {                
    $("#cur_position").html("Watching geolocation . . .");
    $('#map').css('visibility','hidden');
    var text = "<div>Latitude: " + pos.coords.latitude + 
                " (watching)<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
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
        var options = { frequency: 300, maximumAge: 500, timeout: 510, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
    }
};
