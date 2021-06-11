var docId,u
var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId = user.uid
        console.log(docId)
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 

        else if(user){
            console.log(user.phoneNumber)
            usr.innerHTML = user.phoneNumber

            db.get().then((querySnapShot)=>{
                querySnapShot.forEach((doc)=>{
                    if(docId != doc.id){
                        console.log("No documents")
                    }

                    else{
                        u = docId
                    }
                })

                if(u == docId){
                    console.log("Document is there")
                }

                else{
                    location.replace("https://phoneauth-dojo.netlify.app/studio")
                }
            }).catch(function(error){
                console.log(error)
            }) 
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
var service = document.querySelector("#service")
var stat = document.querySelector("#stat")
var address = document.querySelector("#address")
var img = document.querySelector("#img")

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId == doc.id){
            console.log(doc.data())
            nam.innerHTML = doc.data().Name
            phone.innerHTML = doc.data().Phone
            price.innerHTML = doc.data().Price
            ratings.innerHTML = doc.data().Ratings
            service.innerHTML = doc.data().Service
            stat.innerHTML = doc.data().Status
            address.innerHTML = doc.data().Address
            img = document.querySelector("#img").src = doc.data().DisplayPicture
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

function mainpage(){
    location.replace("https://phoneauth-dojo.netlify.app/logged")
}

// Edit Profile

function editpro(){
    location.replace("https://phoneauth-dojo.netlify.app/studio_editprofile")
}