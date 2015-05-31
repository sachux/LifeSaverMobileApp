/**
 * 
 */

var  home = {
		
		setUser : function(){
			   //sessionStorage.name = data.name;
	           //sessionStorage.gender = data.gender;
	           $('#firstName').html(sessionStorage.firstName);
	           document.getElementById('profilePic').src = sessionStorage.profilePicURL;
		},
		
		registerAsNewUser : function(){
			firstName = sessionStorage.firstName;
			lastName = sessionStorage.lastName;
			age = $('#age').val();
			gender = $('#gender').val();
			bloodGroup = $('#bloodGroup').val();
			locality = $('#locality').val();
			city = $('#city').val();
			state = $('#state').val();
			country = $('#country').val();
			mobile = $('#mobile').val();
			registerUser(sessionStorage.userId,firstName, lastName, age, gender, bloodGroup, locality, city, state, country, mobile, callBackRegister);
		}
}

function callBackRegister(response){
	//alert(response);
	sessionStorage.id = response.documents.keys[0];
	window.location = "HomePage.html"
}

$(function(){
	$.ajaxSetup({
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Basic cGF2YW4uYnVsbHNAZ21haWwuY29tOkphbkAyMDE1');
		}
	});
	
});

function registerUser(fbUserId, firstName, lastName, age, gender, bloodGroup, locality, city, state, country, mobile, callBack) {
	$.post("https://api-eu.clusterpoint.com/766/Hack/_retrieve.json", '{"id":"A"}', function(cntData) {
		var usrCnt = parseInt(cntData.documents.A.UserCount);
		var reqCnt = parseInt(cntData.documents.A.RequestCount);
		
		$.ajax({
			url       : 'https://api-eu.clusterpoint.com/766/Hack.json',
			type      : 'PUT',
			data      : JSON.stringify({
				"id":"A","UserCount": usrCnt + 1,"RequestCount": reqCnt
			}),
			success   : function (data) {
				$.ajax({
					url       : 'https://api-eu.clusterpoint.com/766/Hack.json',
					type      : 'POST',
					data      : JSON.stringify({
						id: usrCnt + reqCnt + 1,
						fbUserId: fbUserId,
						firstName: firstName, 
						lastName: lastName, 
						age: age, 
						gender: gender, 
						bloodGroup: bloodGroup, 
						locality: locality, 
						city: city, 
						state: state, 
						country: country, 
						mobile: mobile
					}),
					success   : function (data) {
						callBack("success");
					},
					fail      : function (data) {
						callBack("fail");
					}
				});
			},
			fail      : function (data) {
				callBack("fail");
			}
		});
	});
}
