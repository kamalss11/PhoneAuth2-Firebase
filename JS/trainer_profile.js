var docId,u
var firestore  = firebase.firestore()
const db = firestore.collection("Trainers")

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
                    location.replace("https://phoneauth-dojo.netlify.app/trainer")
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
var id = document.querySelector("#id")
var ge = document.querySelector("#ge")
var phone = document.querySelector("#phone")
var email = document.querySelector("#email")
var price = document.querySelector("#price")
var exp = document.querySelector("#exp")
var ratings = document.querySelector("#ratings")
var cat = document.querySelector("#category")
var spe = document.querySelector("#spe")
var tag = document.querySelector("#tag")
var stat = document.querySelector("#stat")
var cit = document.querySelector("#city")
var img = document.querySelector("#img")
var cre = document.querySelector("#created")

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId == doc.id){
            console.log(doc.data())
            nam.innerHTML = doc.data().Name
            id.innerHTML = doc.data().ID
            ge.innerHTML = doc.data().Gender
            phone.innerHTML = doc.data().Phone
            email.innerHTML = doc.data().Email
            price.innerHTML = doc.data().Price
            exp.innerHTML = doc.data().Experience
            ratings.innerHTML = doc.data().Ratings
            cat.innerHTML = doc.data().Category
            spe.innerHTML = doc.data().Speciality
            tag.innerHTML = doc.data().Tags
            stat.innerHTML = doc.data().State
            cit.innerHTML = doc.data().City
            cre.innerHTML = doc.data().Timestamp.toDate()
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
    location.replace("https://phoneauth-dojo.netlify.app/trainer_editprofile")
}
