/**
 * 
 */

var common  = {
		logout : function(){
			sessionStorage.email = null;
			window.location = 'index.html';
		}
}