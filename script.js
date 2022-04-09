var database = firebase.database();

const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const date = document.getElementById("date");
const prediction = document.getElementById("prediction");
const publicTags = document.getElementById("publicTag");
const checkBox = document.getElementById("unhideTag");
var confirmUsername = null;

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("LocalTimezone").value = timezone;
document.getElementById("LocalTimezone").innerText = timezone;
const timeZoneOptions = document.getElementsByTagName("option");
for(let i=0; i<timeZoneOptions.length; i++) timeZoneOptions[i].title=timeZoneOptions[i].value;

var dateLimit = new Date().toISOString().split('T')[0];
date.setAttribute('min', dateLimit);


function uploadFileToDatabase(){

const selectedTimezone = document.getElementById("selectTimezone").value;
var today = new Date(); 

const RdateFormatArray = date.value.split("-");
const RdateFormat = RdateFormatArray[1] +"/"+ RdateFormatArray[2] +"/"+ RdateFormatArray[0];
const UdateFormat = today.getMonth()+1 +"/"+ today.getDate() +"/"+ today.getFullYear();
const UTimeFormat = today.getHours() +":"+ today.getMinutes();

const Rtime = document.getElementById("Rtime");
var confirmUsernameRef = database.ref('/users/'+ "UserId: "+username.value+'/status/status');
confirmUsernameRef.once("value",function(data){
  confirmUsername = data.val();
  if(confirmUsername == "Public" || confirmUsername=="Private"){
    alert("Username is already taken.");
}else{
  if(password.value === confirmPassword.value){
    database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase()).update({
      pass_word: password.value,
      release_date: RdateFormat,
      release_time: Rtime.value,
      upload_date: UdateFormat,
      upload_time: UTimeFormat,
      timezone: selectedTimezone,
      uploadTimezone: timezone,
      prediction: prediction.value,
      tags: publicTags.value
    });
    database.ref('/users/'+ "UserId: "+username.value+'/status').update({
      Scan: false
    });
    if(checkBox.checked){
      database.ref('/users/'+ "UserId: "+username.value+'/status').update({
      status: "Public"
    });   
    }else{
      database.ref('/users/'+ "UserId: "+username.value+'/status').update({
        status: "Private"
      });  
    }
    alert("Prediction Uploaded!");
    location.reload();
  }else{
    alert("Passwords Do Not Match");
  }
}
});
}

document.addEventListener('keydown', (keydown) => {
  if(keydown.key == "Enter") verifyInfo();
});

function verifyInfo(){
  if(username.value==""){
    alert("Please enter a username");
    username.focus();
  }else if(username.value.includes(" ")){
    alert("Username cannot contain spaces");
    username.focus();
  }else if(password.value==""){
    alert("Please enter a password");
    password.focus();
  }else if(password.value.includes(" ")){
    alert("password cannot contain spaces");
    password.focus();
  }else if(firstName.value=="" || firstName.value==null){
    alert("Please enter your first name");
    firstName.focus();
  }else if(lastName.value=="" || lastName.value==null){
    alert("Please enter your last name");
    lastName.focus();
  }else if(prediction.value=="" || prediction.value==null){
    alert("Prediction is invalid");
    prediction.focus();
  }else if(date.value=="" || date.value==null){
    alert("Please select a release date");
  }else{
    uploadFileToDatabase();
  }
}

function checkBoxChange(){
  document.getElementById("publicTag").classList.toggle("hide");
  document.getElementById("publicTagLabel").classList.toggle("hide");
    document.getElementById("publicTagDiv").classList.toggle("publicTagDiv");
    document.getElementById("publicTagDiv").classList.toggle("publicTagDiv2");
}

function showPassword(eyeID, inputID){
  document.getElementById(eyeID).classList.toggle("fa-eye");
  document.getElementById(eyeID).classList.toggle("fa-eye-slash");
  const passModify = document.getElementById(inputID);
  if (passModify.type === "password") passModify.type = "text";
  else passModify.type = "password";    
}

resizePage();
function resizePage(){
requestAnimationFrame(resizePage);
    const TAG_X =  document.getElementById('date').getBoundingClientRect().x
    document.getElementById("publicTagDiv").style.setProperty("--tag-x",`${TAG_X-158}px`);
}

