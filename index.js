function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "minh" && password === "123"){
        alert("success");
    } 
    else {
        alert("failed");
    }
}