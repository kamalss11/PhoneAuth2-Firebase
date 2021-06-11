const firestore = firebase.firestore()
const db = firestore.collection("Trainers")
var form2 = document.querySelector("#form2")
var storageref,docId

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

// Welcome user 

var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

function mainpage(){
    location.replace("https://phoneauth-dojo.netlify.app/logged")
}

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
                    if(docId == doc.id){
                        location.replace("https://phoneauth-dojo.netlify.app/trainer_profile")          
                    }
                })
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
    var doclen,ndoc,id
    db.get().then((snapshot)=>{
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
            db.doc(docId).set({
                Name: namIn,
                Gender: genIn,
                Email: emIn,
                Phone: phIn,
                Price: prIn,
                Ratings: ratIn,
                Speciality: speIn,
                City: citIn,
                State: steIn,
                Experience: expIn,
                Tags: tagIn,
                Category: catIn,
                DisplayPicture: urls2,
                Timestamp: firebase.firestore.Timestamp.now(),
                ID: id,
                
            }).then(()=>{
                console.log("Data Saved.This is you id = > ",docId)
                console.log(namIn,genIn,emIn,phIn,prIn,ratIn,speIn,citIn,steIn,expIn,tagIn,catIn,urls2)
                form2.reset()
                location.replace("")
            })
            .catch(function(error){
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
