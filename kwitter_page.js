//LINKS DO SEU APP FIREBASE
const firebaseConfig = {
      apiKey: "AIzaSyAX856OJqV8V-K6MJpNJ-dGg10CP0J537I",
      authDomain: "kwitter-fc2bd.firebaseapp.com",
      databaseURL: "https://kwitter-fc2bd-default-rtdb.firebaseio.com",
      projectId: "kwitter-fc2bd",
      storageBucket: "kwitter-fc2bd.appspot.com",
      messagingSenderId: "473884761919",
      appId: "1:473884761919:web:415e95f235490ac2733d8a",
      measurementId: "G-838RXL4VT4"
    };
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like:0
    });
    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Comece a programar aqui
nome = message_data['name'];
message = message_data['message'];
like =  message_data['like'];
name_with_tag = "<h4>" + nome + "</h4>";
message_with_tag = "<h4 class='message_h4'>" + message +"</h4>";
button = "<button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'>Curtidas:" +like+"</button>";
row = name_with_tag + message + button;
document.getElementById("output").innerHTML = row;
//Termine de programar aqui
      } });  }); }
getData();
function updateLike(messageId){
      button_id = messageId;
      likes = document.getElementById(button_id).value;
      update_like = Number(likes) + 1;
      firebase.database().ref(room_name).child(messageId).update({
            like : update_like
      })
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
          window.location = "kwitter_room.html";
      }
      