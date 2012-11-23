

    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    var watchID = null;

    // PhoneGap is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase(
        		"Database", "1.0", "Coordinate Entrys", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }
    function onDeviceReady() {
        // Update every 3 seconds
        var options = { frequency: 3000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
         
   /*     var latitude=     position.coords.latitude              ;
        var longitude=    position.coords.longitude             ;
        var altitude=	  position.coords.altitude              ;
        var accuracy= 	  position.coords.accuracy              ;
        var altitudeAccuracy= position.coords.altitudeAccuracy      ;
        var heading= 	  position.coords.heading               ;
        var speed= 		  position.coords.speed                 ;
        var timestamp= 	  new Date(position.timestamp)          ;
    */
        // Populate the database 
        //STOPPED HERE!!!!
        function populateDB(tx) {
             tx.executeSql('DROP TABLE IF EXISTS DEMO');
             tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, head,lat,long,)');
             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
        /*
         * function populateDB(tx)
    {
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (sname ,saddress ,sphone)');
            var name=document.getElementById('n');
        var address=document.getElementById('a');
        var phone=document.getElementById('p');
        tx.executeSql('INSERT INTO DEMO (sname ,saddress ,sphone) 
        		VALUES ('"+name.value+"','"+address.value+"','"+phone.value+"')');
    }
         */
        }

        // Transaction error callback
        //
        function errorCB(tx, err) {
            alert("Error processing SQL: "+err);
        }

        // Transaction success callback
        //
        function successCB() {
            alert("success!");
        }

    }

    
    /*{"timestamp":1335700802000,
    "coords":{
    	"heading":null,
    	"altitude":null,
    	"longitude":170.33488333333335,
    	"accuracy":0,
    	"latitude":-45.87475166666666,
    	"speed":null,
    	"altitudeAccuracy":null}}
//
//
//    
*/    
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
