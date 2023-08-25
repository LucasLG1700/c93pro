var firebaseConfig = {
    apiKey: "AIzaSyB3X6SnQW5sp6wP7XVh4dk7xGmFK56jowE",
    authDomain: "kiwi-9eca1.firebaseapp.com",
    databaseURL: "https://kiwi-9eca1-default-rtdb.firebaseio.com",
    projectId: "kiwi-9eca1",
    storageBucket: "kiwi-9eca1.appspot.com",
    messagingSenderId: "323867731887",
    appId: "1:323867731887:web:106bd30d65e7debdbc715a",
    measurementId: "G-W7CGLRZ7ZC"
  };
  
  firebase.initializeApp(firebaseConfig)
  userName = localStorage.getItem("userName");
  roomName = localStorage.getItem("roomName");

   function sair() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
   }

   function Enviar()
   {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name:userName,
        message:msg,
        like:0
    });

    document.getElementById("msg").value = "";
   }

   function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot)
   {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot)
    { childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if(childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
            
            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            name_with_tag = "<h4> "+name+"<img class='user_tick' src='lido.jpeg'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn bt' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
    }}); 
   }); }

   getData();

   function updateLike(message_id)
   {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(roomName).child(message_id).update({
        like :updated_likes
    });
   }

