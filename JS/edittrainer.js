// Welcome user 

var usr = document.querySelector("#usr")
var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")
var docId,u
var firestore  = firebase.firestore()
const db = firestore.collection("Trainers")

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId = user.uid
        console.log(docId)
        if(!user){
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
    })

    loader()    
}

function loader(){
    setTimeout(showPage, 3000);
}

function showPage(){
    document.getElementById("loads").style.display = "none"
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}

// Forms - form(studios)

const sbtn = document.querySelector(".sub")

var nam = document.querySelector("#nam")
var g = document.querySelector("#gender")
var em = document.querySelector("#email")
var phone = document.querySelector("#ph")
var price = document.querySelector("#pr")
var rate = document.querySelector("#rat")
var sp = document.querySelector("#sp")
var city = document.querySelector("#cit")
var state = document.querySelector("#ste")
var exp = document.querySelector("#exp")
var tag = document.querySelector("#tag")
var cat = document.querySelector("#cat")
var img = document.getElementById("pic")
var fields = document.querySelectorAll(".field-2")
var inputs = document.querySelectorAll(".inp")
const errors = document.querySelectorAll(".er")
const form = document.getElementById("form")
var img = document.getElementById("pic")
        
// From DB

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId == doc.id){
            console.log(doc.data())
            console.log(doc.data().DisplayPicture)
            nam.value = doc.data().Name
            g.value = doc.data().Gender
            em.value = doc.data().Email
            phone.value = doc.data().Phone
            price.value = doc.data().Price
            rate.value = doc.data().Ratings
            sp.value = doc.data().Speciality
            city.value = doc.data().City
            state.value = doc.data().State
            exp.value = doc.data().Experience
            tag.value = doc.data().Tags
            cat.value = doc.data().Category
            img.src = doc.data().DisplayPicture            
        }
    })
}).catch(function(error){
    console.log(error)
})

            
for(let i=0;i<fields.length-1;i++){   
    inputs[i].addEventListener("blur",function(e,n=i){
        blur(e,n)
    })
}

function blur(e,num){
    let ph = /\d[0-9]{9,}$/
    let rt = /\d[0-9]{0,}$/
    let mail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if(inputs[num].value == ''){
        errors[num].classList.add("active")
        ers("This field is required",num)
    }

    else if(num == 2){
        if(!inputs[num].value.match(mail)){
            errors[num].classList.add("active")
            ers("Enter valid mail",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else if(num == 3){
        if(!inputs[num].value.match(ph)){
            errors[num].classList.add("active")
            ers("Enter valid number",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else if(num == 5){
        if(inputs[num].value > 5){
            errors[num].classList.add("active")
            ers("Rate out of 5",num)
        }

        else if(!inputs[num].value.match(rt)){
            errors[num].classList.add("active")
            ers("Ratings not match",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else{
        errors[num].classList.remove("active")
    }

    submitbtn()
}

function submitbtn(){
    for(let i=0;i<fields.length;i++){
        if(errors[i].classList.contains("active")){
            sbtn.classList.add("hide")
            break
        }

        else{
            sbtn.classList.remove("hide")
        }
    }
}

function ers(err,nu){
    errors[nu].innerHTML = err
}

sbtn.addEventListener("click",function(e){
    e.preventDefault()
    for(let i=0;i<fields.length-1;i++){   
        blur(0,n=i)
    }
    
    let nameInput = nam.value
    let genderInput = g.value
    let emailInput = em.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let speInput = sp.value
    let cityInput = city.value
    let sateInput = state.value
    let expInput = ex.value
    let tagInput = tag.value
    let catInput = cat.value
    var image = document.getElementById("pic").files[0]
    var imgname = image.name
    storageref =  firebase.storage().ref()
        
    const metadata = {
        contentType:image.type
    }
    
    storageref = firebase.storage().ref()
    var urls 
    var uploadImg = storageref.child("images").child(imgname)
    uploadImg.put(image,metadata)
    .then(snapshot =>{
        return uploadImg.getDownloadURL()
        .then(url => {
            urls = url
            console.log(urls)
            db.doc(docId).set({
                Name: nameInput,
                Gender: genderInput,
                Email: emailInput,
                Phone: phoneInput,
                Price: priceInput,
                Ratings: rateInput,
                Speciality: speInput,
                City: cityInput,
                State: stateInput,
                Experience: expInput,
                Tags: tagInput,
                Category: catInput,
                DisplayPicture: urls
            }).then((docRef)=>{
                console.log("Data Saved.This is you id = > ",docId)
                console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                location.replace("https://phoneauth-dojo.netlify.app/trainer_profile")
            }).catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})

function mainpage(){
    location.replace("https://phoneauth-dojo.netlify.app/logged")
}

// Profile

function pro(){
    location.replace("https://phoneauth-dojo.netlify.app/studio_profile")
}
