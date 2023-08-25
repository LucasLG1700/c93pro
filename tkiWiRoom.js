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

  document.getElementById("userName").innerHTML = "Welcome " + userName + "!";

  function addRoom()
  {
    roomName = document.getElementById("roomName").value;

    firebase.database().ref("/").child(roomName).update({
      purpose : "adding room name"
    })

    localStorage.setItem("roomName", roomName);

    window.location = "tkiWiPage.html";
  }

  function getData() {  firebase.database().ref("/").on('value', function (snapshot){
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Room name - "+ roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML +=row;
    });
      
    });

  }
   getData();
   
   function redirectToRoomName(name)
   {
     console.log(name);
     localStorage.setItem("roomName", name);
     window.location = "tkiWiPage.html";
   }

   function sair() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
   }
  