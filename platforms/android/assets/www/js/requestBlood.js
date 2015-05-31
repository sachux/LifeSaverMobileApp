/**
 * 
 */

function postRequest(){
	units = $('#units').val();
	bloodGroup = $('#bloodGroup').val();
	patientName = $('#patientName').val();
	hospital = $('#hospital').val();
	city = $('#city').val();
	date = $('#date').val();
	bloodGroup = $('#bloodGroup').val();
	logBloodRequest(sessionStorage.id, units, bloodGroup, '', patientName, date,
			hospital, '', city, 'Telangana', 'India', '', 'No', callBackRequest);
	$.mobile.loading( "show");
}

function callBackRequest(response){
	$.mobile.loading( "hide" );
}

$(function(){
	$.ajaxSetup({
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Basic cGF2YW4uYnVsbHNAZ21haWwuY29tOkphbkAyMDE1');
		}
	});
	
});

function logBloodRequest(requestorID, units, bloodGroup, requirement,
		patientName,date, hospital, locality, city, state, country, donorList,
		completed, callBack) {

	$.post(
					"https://api-eu.clusterpoint.com/766/Hack/_search.json",
					'{"query": "<id>A</id>"}',
					function(cntData) {
						var usrCnt = parseInt(cntData.documents.A.UserCount);
						var reqCnt = parseInt(cntData.documents.A.RequestCount);

						$.ajax({
									url : 'https://api-eu.clusterpoint.com/766/Hack.json',
									type : 'PUT',
									data : JSON.stringify({
										"id" : "A",
										"UserCount" : usrCnt,
										"RequestCount" : reqCnt + 1
									}),
									success : function (data) {
										$.ajax({
													url : 'https://api-eu.clusterpoint.com/766/Hack.json',
													type : 'PUT',
													dataType : 'json',
													data : JSON
															.stringify({
																id : usrCnt
																		+ reqCnt
																		+ 1,
																requestDate : date,
																requestorID : requestorID,
																units : units,
																bloodGroup : bloodGroup,
																requirement : requirement,
																patientName : patientName,
																hospital : hospital,
																locality : locality,
																city : city,
																state : state,
																country : country,
																donorList : donorList,
																completed : completed
															}),
													beforeSend : function(xhr) {
														xhr
																.setRequestHeader(
																		'Authorization',
																		'Basic cGF2YW4uYnVsbHNAZ21haWwuY29tOkphbkAyMDE1');
													},
													success : function(data) {
														callBack("success");
													},
													fail : function(data) {
														callBack("fail");
													}
												});
									},
									fail : function(data) {
										callBack("fail");
									}
								});
					});
}

