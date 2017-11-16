function incializar_firebase()	{	
  var config = {
		    apiKey: "AIzaSyBY7AsBHNzF3Q4FxqU_-CGoLtOR61Eh0ts",
		    authDomain: "hwbasedados.firebaseapp.com",
		    databaseURL: "https://hwbasedados.firebaseio.com",
		    projectId: "hwbasedados",
		    storageBucket: "hwbasedados.appspot.com",
		    messagingSenderId: "890854841939"
		  };
		  firebase.initializeApp(config);
	}

function writeUserData() {

var database= firebase.database().ref('users/');

var uid = firebase.database().ref().child('users').push().key;
var 
name=document.getElementById("cap1").value
email=document.getElementById("cap2").value





var atulizar_id={};
atulizar_id['/users/' + name]=banco;







  firebase.database().ref().update(atulizar_id);




}
