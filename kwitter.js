function login_btn(){
    
    var Name = document.getElementById("name_input").value; 

    localStorage.setItem("Username",Name);

    window.location = "kwitter_room.html";             
}





