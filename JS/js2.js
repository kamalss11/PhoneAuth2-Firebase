// While browser loads

var usr = document.querySelector("#usr")

// STUDIOS

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

var snam = document.querySelector("#ni")
var sph = document.querySelector("#ph1")
var spri = document.querySelector("#pr1")
var srat = document.querySelector("#r1")
        
var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")
const db2 = firestore.collection("Trainers")
const form = document.getElementById("form")
var form2 = document.querySelector("#form2")
var docId1,docId2
var storageref

// Trainers

const sbtn2 = document.querySelector(".sub")

var nm = document.querySelector("#nam")
var gender = document.querySelector("#gender")
var email = document.querySelector("#email")
var ph = document.querySelector("#ph")
var pr = document.querySelector("#pr")
var rat = document.querySelector("#rat")
var spe = document.querySelector("#spe")
var cit = document.querySelector("#cit")
var ste = document.querySelector("#ste")
var exp = document.querySelector("#exp")
var tag = document.querySelector("#tag")
var cat = document.querySelector("#cat")
var inputs2 = document.querySelectorAll(".inp")
var fields2 = document.querySelectorAll(".field-2")
var errors2 = document.querySelectorAll(".er")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId1 = user.uid
        console.log(docId1)
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 

        else if(user){
            db.doc(`${docId1}`).get().then((doc)=> {
                if(doc.exists){
                    location.replace("https://phoneauth-dojo.netlify.app/studio")
                }
                
                else{
                    console.log("No database found")
                }
            })
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

const formdiv = document.querySelectorAll(".forms")
const tabs = document.querySelector(".tabs").children

for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(){
        for(let j=0;j<tabs.length;j++){
            tabs[j].classList.remove("active")
            formdiv[j].classList.remove("active")
        }
        formdiv[i].classList.add("active")
        tabs[i].classList.add("active")
    })
}

// Forms - form(studios)
            
for(let i=0;i<fields1.length;i++){   
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
    for(let i=0;i<fields1.length;i++){   
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
            db.doc(docId1).set({
                Name: nameInput,
                Phone: phoneInput,
                Price: priceInput,
                Ratings: rateInput,
                Service: serviceInput,
                Status: statusInput,
                Address: addInput,
                DisplayPicture: urls
            }).then((docRef)=>{
                console.log("Data Saved.This is you id = > ",docId1)
                console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                form.reset()
            }).catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})

//Forms - form(trainer)

for(let i=0;i<fields2.length;i++){   
    inputs2[i].addEventListener("blur",function(e,n=i){
        blur2(e,n)
    })
}

function blur2(e,num){
    let ph = /\d[0-9]{9,}$/
    let rt = /\d[0-9]{0,}$/
    let email = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if(inputs2[num].value == ''){
        errors2[num].classList.add("active")
        ers2("This field is required",num)
    }

    else if(num == 2){
        if(!inputs2[num].value.match(email)){
            errors2[num].classList.add("active")
            ers2("Enter valid Email",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else if(num == 3){
        if(!inputs2[num].value.match(ph)){
            errors2[num].classList.add("active")
            ers2("Enter valid number",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else if(num == 5){
        if(inputs2[num].value > 5){
            errors2[num].classList.add("active")
            ers2("Rate out of 5",num)
        }

        else if(!inputs2[num].value.match(rt)){
            errors2[num].classList.add("active")
            ers2("Ratings not match",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else{
        errors2[num].classList.remove("active")
    }

    submitbtn2()
}

function submitbtn2(){
    for(let i=0;i<fields2.length;i++){
        if(errors2[i].classList.contains("active")){
            sbtn2.classList.add("hide")
            break
        }

        else{
            sbtn2.classList.remove("hide")
        }
    }
}

function ers2(err,nu){
    errors2[nu].innerHTML = err
}

sbtn2.addEventListener("click",function(e){
    e.preventDefault()
    for(let i=0;i<fields2.length;i++){   
        blur2(0,n=i)
    }

    let namIn = nm.value
    let genIn = gender.value
    let emIn = email.value
    let phIn = ph.value
    let prIn = pr.value
    let ratIn = rat.value
    let speIn = spe.value
    let citIn = cit.value
    let steIn = ste.value
    let expIn = exp.value
    let tagIn = tag.value
    let catIn = cat.value
    var pic = document.getElementById("pic").files[0]
    let picName = pic.name
    let date = new Date()
    let year = date.getFullYear()
    let doclen,ndoc,id
    db2.get().then((snapshot)=>{
        doclen = snapshot.docs.length
        console.log("No of documents" + doclen)
        ndoc = 100 + (doclen + 1)
        id = ("ON"+year+ndoc)
    }).catch(function(error){
        console.log(error)
    })

    const metadata2 = {
        contentType:pic.type
    }

    storageref = firebase.storage().ref()
    var urls2

    var uploadPic = storageref.child("images").child(picName)
    uploadPic.put(pic,metadata2)
    .then(snapshot =>{
        return uploadPic.getDownloadURL()
        .then(url => {
            urls2 = url
            console.log(urls2)
            db2.add({
                Name: namIn,
                Gender: genIn,
                Email: emIn,
                Phone: phIn,
                Price: prIn,
                Ratings: ratIn,
                Speaciality: speIn,
                City: citIn,
                State: steIn,
                Experience: expIn,
                Tags: tagIn,
                Category: catIn,
                DisplayPicture: urls2,
                Timestamp: firebase.firestore.Timestamp.now(),
                ID: id,
                
            }).then((docRef)=>{
                docId2 = docRef.id
                console.log("Data Saved.This is you id = > ",docId2)
                console.log(namIn,genIn,emIn,phIn,prIn,ratIn,speIn,citIn,steIn,expIn,tagIn,catIn,urls2)
                form2.reset()
            })
            .catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})
