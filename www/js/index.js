/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



var fbLoginSuccess = function (data) 
{
    //alert("UserInfo: " + JSON.stringify(data));
    sessionStorage.userId = data.userId;
    getInfo();
    
}
 
function initApp()
{
    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("" + error) }
    );
}

var lifeSaverLogin = {
		login : function(){
			login();
		}
}




// Defaults to sessionStorage for storing the Facebook token

//  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
//  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

/*function login() {
   openFB.login(
           function(response) {
               if(response.status === 'connected') {
                   alert('Facebook login succeeded');
                   getInfo();
               } else {
                   alert('Facebook login failed: ' + response.error);
               }
           }, {scope: 'email,read_stream,publish_actions'});
}
*/
function getInfo() {
	facebookConnectPlugin.api(
       "/me",
       ["public_profile"],
       function(data) {
    	   sessionStorage = null;
           sessionStorage.name = data.name;
           sessionStorage.gender = data.gender;
           sessionStorage.email = data.email;
           sessionStorage.firstName = data.first_name;
           sessionStorage.profilePicURL = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
           login(sessionStorage.email,loginCallback);
          // window.location = "HomePage.html";
       },
       errorHandler);
}

function share() {
	facebookConnectPlugin.api({
       method: 'POST',
       path: '/me/feed',
       params: {
           message: ''
       },
       success: function() {
           alert('the item was posted on Facebook');
       },
       error: errorHandler});
}

function readPermissions() {
	facebookConnectPlugin.api({
       method: 'GET',
       path: '/me/permissions',
       success: function(result) {
           alert(JSON.stringify(result.data));
       },
       error: errorHandler
   });
}

function revoke() {
	facebookConnectPlugin.revokePermissions(
           function() {
               alert('Permissions revoked');
           },
           errorHandler);
}

function logout() {
	facebookConnectPlugin.logout(
           function() {
               alert('Logout successful');
           },
           errorHandler);
}

function errorHandler(error) {
   alert(error.message);
}

function loginMock(){
	sessionStorage.name = 'Sachin Srambickal';
    sessionStorage.gender = 'male';
    sessionStorage.email = 'sachinkalpetta@gmail.com';
    sessionStorage.firstName = 'Sachin';
    sessionStorage.firstName = 'Suresh';
    sessionStorage.profilePicURL = 'http://graph.facebook.com/885087288196295/picture?type=small';
    
   
}


function loginCallback(success,registered){
	if(JSON.stringify(registered) == 'true'){
		window.location = 'HomePage.html';
	}else{
		window.location = 'getStarted.html';
	}
	
}

function login(fbUserId, callBack) {
	$.ajax({
		url:"https://api-eu.clusterpoint.com/766/Hack/_search.json", 
		method: "POST",
		data: '{"query": "<fbUserId>'+fbUserId+'</fbUserId>"}', 
		dataType  : 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Basic cGF2YW4uYnVsbHNAZ21haWwuY29tOkphbkAyMDE1');
		},
		success: function(d) {
			var registred = d.found >= 1;
			//alert(registred);
			if(d.documents){
				sessionStorage.id = Object.keys(d.documents)[0];
			}
			//alert(d.documents["1"].id);
			
			callBack("success", registred);
			
		}
	});

}

var common  = {
		logout : function(){
			sessionStorage = null;
			window.location = 'index.html';
		}
}
