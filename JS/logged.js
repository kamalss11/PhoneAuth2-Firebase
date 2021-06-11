// While browser loads

var usr = document.querySelector("#usr")
var firestore = firebase.firestore()
var db = firestore.collection("STUDIOS")
// STUDIOS

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId1 = user.uid
        console.log(docId1)
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 

        else{
            console.log(user.phoneNumber)
            usr.innerHTML = user.phoneNumber
        }
    });
    
    loader()
}

function loader(){
    setTimeout(showPage, 3000);
}

function showPage(){
    document.getElementById("loads").style.display = "none"
}

// Welcome user 

var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}

// Form tabs

function studio(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.uid)
            location.replace("https://phoneauth-dojo.netlify.app/studio")
        }
    })
}

function trainer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.uid)
            location.replace("https://phoneauth-dojo.netlify.app/trainer")
        }
    })
}