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

room_name = localStorage.getItem("RoomName");

function logout(){

    localStorage.removeItem("RoomName");
    localStorage.removeItem("Username");
    
    window.location = "index.html";
}

function Send(){

    message = document.getElementById("msg").value;
    
    firebase.database().ref(room_name).push({
        name: user_name,
        msg: message,
        like:0
        
    });
    document.getElementById("msg").value = "";
    
}

function get_data(){

firebase.database().ref(room_name).on("value", function(snapshot){
    
    document.getElementById("Messages").innerHTML = "";
    snapshot.forEach(function(child_Snapshot){
        
        child_key = child_Snapshot.key;
        child_data = child_Snapshot.val();

        if(child_key != "purpose"){
            message_id = child_key;
            message_data = child_data;

            msg_name = message_data['name'];

            msg_text = message_data['msg'];

            msg_like = message_data['like'];

            name_tag = "<label id ='name_label'> " +msg_name+" </label> <br>";

            msg_tag = "<label id ='text_label'>"+msg_text+"</label> <br>";
            
            like_button = "<button id=" + message_id+" class='btn btn-primary' onclick='UpdateLikes(this.id)'  value = " + msg_like + ">Likes : " + msg_like + "</button> <hr>"
            

            output = name_tag + msg_tag + like_button;

            document.getElementById("Messages").innerHTML += output;
            
        }


        
    });
    
});

}


get_data();

function UpdateLikes(button_id){

    likes = document.getElementById(button_id).value;
    new_likes = Number(likes)+ 1;

    firebase.database().ref(room_name).child(button_id).update({
        like : new_likes
  });


}
