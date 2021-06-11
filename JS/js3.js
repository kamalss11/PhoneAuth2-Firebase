var docId
var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")
const db2 = firestore.collection("Trainers")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId = user.uid
        console.log(docId)
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

var nam = document.querySelector("#name")
var phone = document.querySelector("#phone")
var price = document.querySelector("#price")
var ratings = document.querySelector("#ratings")

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId == doc.id){
            console.log(doc.data())
            nam.innerHTML = doc.data().Name
            phone.innerHTML = doc.data().Phone
            price.innerHTML = doc.data().Price
            ratings.innerHTML = doc.data().Ratings
        }
    })
}).catch(function(error){
    console.log(error)
})

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

// Edit Profile

function editpro(){
    location.replace("https://phoneauth-dojo.netlify.app/logged")
}