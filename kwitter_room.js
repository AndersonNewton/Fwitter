
//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
      apiKey: "AIzaSyBiTZWn4hsvtOl62gA0QrqiNvJAmDSj_eY",
      authDomain: "kwitter-f43d4.firebaseapp.com",
      databaseURL: "https://kwitter-f43d4-default-rtdb.firebaseio.com",
      projectId: "kwitter-f43d4",
      storageBucket: "kwitter-f43d4.appspot.com",
      messagingSenderId: "422552516759",
      appId: "1:422552516759:web:84e8083191e67056d251d2"
    };
    
    // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

      user_name = localStorage.getItem("Username");
      document.getElementById("name_display").innerHTML = "Welcome " + user_name;
 
function create_room(){

      room_name = document.getElementById("name_room").value;
      //console.log("Fetched the Room Name ", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding new Room"
      });
            //console.log("Firebase");

      localStorage.setItem("RoomName", room_name);
      window.location = "kwitter_page.html";

    }



function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("div_rooms").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
       
                  Room_names = childKey;

                  new_row = "<div class='room_name' id='"+Room_names+"'  onclick='reDirectRoom(this.id)' ># "+Room_names+" </div>";
                  document.getElementById("div_rooms").innerHTML = document.getElementById("div_rooms").innerHTML +new_row;

      });});}
getData();

function reDirectRoom(name_room){
      localStorage.setItem("RoomName", name_room);
      window.location = "kwitter_page.html";
}

function logout(){

      localStorage.removeItem("RoomName");
      localStorage.removeItem("Username");
      
      window.location = "index.html";
}