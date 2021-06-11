// Welcome user 

var usr = document.querySelector("#usr")
var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")
var docId,u

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
                    location.replace("https://phoneauth-dojo.netlify.app/studio")
                }
            }).catch(function(error){
                console.log(error)
            }) 
        }

        console.log(user.phoneNumber)
        usr.innerHTML = user.phoneNumber
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

const sbtn = document.querySelector(".submit")

var nam = document.querySelector("#name")
var phone = document.querySelector("#phone")
var price = document.querySelector("#price")
var rate = document.querySelector("#rate")
var service = document.querySelector("#service")
var sts = document.querySelector("#sts")
var add = document.querySelector("#add")
var fields1 = document.querySelectorAll(".field-1")
var inputs = document.querySelectorAll(".inputs")
const errors = document.querySelectorAll(".error")
const form = document.getElementById("form")
var img = document.getElementById("img")
        
var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")

// From DB

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId == doc.id){
            console.log(doc.data())
            console.log(doc.data().DisplayPicture)
            nam.value = doc.data().Name
            phone.value = doc.data().Phone
            price.value = doc.data().Price
            rate.value = doc.data().Ratings
            service.value = doc.data().Service
            sts.value = doc.data().Status
            add.value = doc.data().Address
            img.src = doc.data().DisplayPicture            
        }
    })
}).catch(function(error){
    console.log(error)
})

            
for(let i=0;i<fields1.length-1;i++){   
    inputs[i].addEventListener("blur",function(e,n=i){
        blur(e,n)
    })
}

function blur(e,num){
    let ph = /\d[0-9]{9,}$/
    let rt = /\d[0-9]{0,}$/

    if(inputs[num].value == ''){
        errors[num].classList.add("active")
        ers("This field is required",num)
    }

    else if(num == 1){
        if(!inputs[num].value.match(ph)){
            errors[num].classList.add("active")
            ers("Enter valid number",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else if(num == 3){
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
    for(let i=0;i<fields1.length;i++){
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
    for(let i=0;i<fields1.length-1;i++){   
        blur(0,n=i)
    }
    
    let nameInput = nam.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    var image = document.getElementById("img").files[0]
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
                Phone: phoneInput,
                Price: priceInput,
                Ratings: rateInput,
                Service: serviceInput,
                Status: statusInput,
                Address: addInput,
                DisplayPicture: urls
            }).then((docRef)=>{
                console.log("Data Saved.This is you id = > ",docId)
                console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                location.replace("https://phoneauth-dojo.netlify.app/studio_profile")
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
