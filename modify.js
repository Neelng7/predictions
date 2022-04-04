var database = firebase.database();

const firstName = document.getElementById("fname_modify");
const lastName = document.getElementById("lname_modify");
const username = document.getElementById("username_modify");
const passwordModify = document.getElementById("pass_modify");
var release_date, prediction, upload_date, passwordDB;
var today = new Date();
var Rtime, type, modifyTags, upload_time;

const modifyFileRequest = document.getElementById("modifyFileRequest");
const mainprediction = document.getElementById("mainprediction");
const progressBar = document.getElementsByClassName('progress-bar')[0];
var progressBarInterval, barParts=9;

function modifyData(){
    var upload_date_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'upload_date');
    upload_date_ref.on("value",function(data){
    upload_date = data.val();
    if(upload_date !== null){
        passwordVerify();
    }else{
        alert("No such prediction exists");
    }
})
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("LocalTimezone").value = timezone;
document.getElementById("LocalTimezone").innerHTML = timezone;
const timeZoneOptions = document.getElementsByTagName("option");
for(let i=0; i<timeZoneOptions.length; i++) timeZoneOptions[i].title=timeZoneOptions[i].value;

function passwordVerify(){
    var passwordDB_ref = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'pass_word');
    passwordDB_ref.on("value",function(data){
        passwordDB = data.val();
        if(passwordModify.value == passwordDB){
            progressBar.classList.toggle('hide', false);
            progressBarInterval = setInterval(progressBarFn, 50, 1);
            document.getElementById("title").innerHTML="Modify Prediction";
            document.getElementById("SignInTitle").innerText = "Modify Prediction";
            document.getElementById("mainForm").classList.toggle("hide", true);
            // document.getElementById("mainForm2").classList.toggle("hide", true);
            document.getElementById("modifyPara").classList.toggle("hide", true);
            document.getElementById("mainDiv").classList.toggle("hide", false);
            // document.getElementById("maindiv2").classList.toggle("hide", false);
            modifyMain();
        }else if(passwordDB){
            alert("Password is wrong");
        }
    }) 
}

function verifyData(){
    if(username.value==""){
        alert("Please enter a username");
        username.focus();
      }else if(username.value.includes(" ")){
        alert("Username cannot contain spaces");
        username.focus();
      }else if(passwordModify.value==""){
        alert("Please enter a password");
        passwordModify.focus();
      }else if(passwordModify.value.includes(" ")){
        alert("password cannot contain spaces");
        passwordModify.focus();
      }else if(firstName.value==""){
        alert("Please enter your first name");
        firstName.focus();
      }else if(lastName.value==""){
        alert("Please enter your last name");
        lastName.focus();
      }else{
        modifyData();
    }
}

function modifyMain(){

    var timezone_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'timezone');
    timezone_ref.on("value",function(data){
        globalThis.dbtimeZone = data.val(); 
    
    const dbTimezoneOption = document.getElementById("dbTimezone");
    dbTimezoneOption.value = dbtimeZone;
    dbTimezoneOption.title = dbtimeZone;
    dbTimezoneOption.innerHTML = dbtimeZone;

    var upload_time_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'upload_time');
    upload_time_ref.on("value",function(data){
        upload_time = data.val();
        changeTimezone(upload_date, upload_time);

    document.getElementById("modifyUsername").innerHTML = "Username: " + username.value;
    document.getElementById("modifypasword").innerHTML= "Password: " + passwordModify.value;
    document.getElementById("modifyFirstName").innerHTML= "First Name: " + firstName.value.toLowerCase();
    document.getElementById("modifyLastName").innerHTML = "Last Name: " + lastName.value.toLowerCase();
    document.getElementById("modifyInitialDate").innerHTML = "This prediction was uploaded on " + date_display;

    var type_ref  = database.ref('/users/' + "UserId: "+username.value+'/status/status');
    type_ref.on("value",function(data){
    type = data.val();
    document.getElementById("predictionType").innerHTML = "Type: " + type;

    var modifyTags_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'tags');
    modifyTags_ref.on("value",function(data){
        modifyTags = data.val();
        if(type == "Public"){
            if(modifyTags == "" || modifyTags==null){
            document.getElementById("modifyTags").setAttribute("placeholder","No Given tags\r\n Add tags such as: #football, #basketball, #tenis");
            document.getElementById("modifyTagsP").innerHTML = "Public tags:";
            document.getElementById("modifyTagsP").style.color = "black";
            }else{
            document.getElementById("modifyTags").innerHTML = modifyTags;
            document.getElementById("modifyTagsP").innerHTML = "Public tags:";
            document.getElementById("modifyTagsP").style.color = "black";
            }
        }else if(type == "Private"){
            document.getElementById("modifyTags").innerHTML = modifyTags;
            document.getElementById("modifyTagsP").innerHTML = "Prediction is Private. Tags are only displayed when prediction is public";
            document.getElementById("modifyTagsP").style.color = "red";
        }
progressBarInterval = setInterval(progressBarFn, 3, 6);});
progressBarInterval = setInterval(progressBarFn, 3, 5);});
progressBarInterval = setInterval(progressBarFn, 3, 4);});

    var release_date_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'release_date');
    release_date_ref.on("value",function(data){
    release_date = data.val(); 
    var rdateStr = release_date;

    var Rtime_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'release_time');
    Rtime_ref.on("value",function(data){
        Rtime = data.val(); 
        var rtimeStr = Rtime;

    changeTimezone(rdateStr, rtimeStr);

    var prediction_ref  = database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase() + '/' +'prediction');
    prediction_ref.on("value",function(data){
    prediction = data.val(); 
    
    if((parseInt(today.getFullYear())) > newYear){ 
        modifyFileRequest.innerHTML = "This prediction was released on " + date_display;
        mainprediction.innerHTML = prediction;
      }else if((today.getFullYear()) == newYear){
        if(parseInt(today.getMonth()+1) > newMonth){
          modifyFileRequest.innerHTML = "This prediction was released on " + date_display;
          mainprediction.innerHTML = prediction;
        }else if((parseInt(today.getMonth())+1) == newMonth){ 
          if(parseInt(today.getDate()) > newDate){
            modifyFileRequest.innerHTML = "This prediction was released on " + date_display;
            mainprediction.innerHTML = prediction;
          }else if(parseInt(today.getDate()) == newDate){
            if(parseInt(today.getHours()) > newTimeHours){
              modifyFileRequest.innerHTML = "This prediction was released on " + date_display;
              mainprediction.innerHTML = prediction;
            }else if(parseInt(today.getHours()) == newTimeHours && parseInt(today.getMinutes()) >= newTimeMinutes){
              modifyFileRequest.innerHTML = "This prediction was released on " + date_display;
              mainprediction.innerHTML = prediction;
            }else{
              modifyFileRequest.innerHTML = "This prediction will be released on " + date_display;
              mainprediction.innerHTML = prediction;   
            }
          }else{
            modifyFileRequest.innerHTML = "This prediction will be released on " + date_display;
            mainprediction.innerHTML = prediction; 
          }
        }else{
          modifyFileRequest.innerHTML = "This prediction will be released on " + date_display;
          mainprediction.innerHTML = prediction;  
        }
      }else{
        modifyFileRequest.innerHTML = "This prediction will be released on " + date_display;
        mainprediction.innerHTML = prediction;
      }
    progressBarInterval = setInterval(progressBarFn, 3, 9);
});
progressBarInterval = setInterval(progressBarFn, 3, 8);});
progressBarInterval = setInterval(progressBarFn, 3, 7);});
progressBarInterval = setInterval(progressBarFn, 3, 3);});
}

function saveModifyChanges(){
    const modifyReleaseDate = document.getElementById("modifyReleaseDate");
    const modifyReleaseTime = document.getElementById("modifyReleaseTime");
    const modifyTimezone = document.getElementById("selectTimezone2");
    modifyTags = document.getElementById("modifyTags").value;

    const RdateFormatArray = modifyReleaseDate.value.split("-");
    const RdateFormat = RdateFormatArray[1] +"/"+ RdateFormatArray[2] +"/"+ RdateFormatArray[0];

    if(modifyReleaseDate.value != "" && modifyReleaseDate.value != null){
        database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase()).update({
        release_date: RdateFormat
    })}
    if(modifyReleaseTime.value != "" && modifyReleaseTime.value != null){
        database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase()).update({
        release_time: modifyReleaseTime.value
    })}
        database.ref('/users/'+ "UserId: "+username.value+'/'+"first_name:"+firstName.value.toLowerCase()+'/'+'last_name:'+lastName.value.toLowerCase()).update({
            tags: modifyTags,
            timezone: modifyTimezone.value
    })

    var modifyType = document.getElementById("modifyType");
    if(modifyType.value != "Choose Type"){
    database.ref('/users/'+ "UserId: "+username.value+'/status').update({
        status: modifyType.value
    })}
    alert("Saved Changes");
}

function predictionDelete(){
    var promptPassword = prompt("Enter password to delete prediction");
    if(promptPassword !== null){
        if(promptPassword == passwordModify.value){
        var userRef = database.ref('/users/'+ "UserId: "+username.value);
        alert("Prediction deleted!");
        window.location.href = "/";
        userRef.remove(); 
        }else{
            alert("Password is wrong. Prediction not deleted.")
        }
    }
}

function showPassword(){
    document.getElementById("showPassword").classList.toggle("fa-eye");
    document.getElementById("showPassword").classList.toggle("fa-eye-slash");

    const passModify = document.getElementById("pass_modify");
    if (passModify.type === "password") passModify.type = "text";
    else passModify.type = "password";    
}

if(window.location.href.includes("+")){
    const urlInfo = ((window.location.href.split("?"))[1]).split("+");
    username.value = urlInfo[0];
    firstName.value = urlInfo[1];
    lastName.value = urlInfo[2];
    if(urlInfo.length == 4){
        passwordModify.value = urlInfo[3];
        modifyData();
    }else passwordModify.focus();
}

function changeTimezone(dbdate, dbTime){
    
    const matches = dbdate.split("/");
    const matches_rtime = dbTime.split(":");
    globalThis.Rhour = parseInt(matches_rtime[0]);
    globalThis.Rminute = parseInt(matches_rtime[1]);
    matches[0] = parseInt(matches[0]);
    matches[1] = parseInt(matches[1]);
    matches[2] = parseInt(matches[2]);

    const timeconversion = today.toLocaleString('en-US', { timeZone: dbtimeZone }); //dbtimeZone=timezone from db
    const timeDifference_1 = (timeconversion.split(" ")[1]).split(":"); 

    if(timeconversion.split(" ")[2] == "PM" && timeDifference_1[0] == 12){
        timeDifference_1[0] = 12;
    }else if(timeconversion.split(" ")[2] == "AM" && timeDifference_1[0] == 12){
        timeDifference_1[0] = 00;
    }else if(timeconversion.split(" ")[2] == "PM"){
        timeDifference_1[0] = parseInt(timeDifference_1[0]) + 12;
    }else{
        timeDifference_1[0] = parseInt(timeDifference_1[0]);
    }
        timeDifference_1[1] = parseInt(timeDifference_1[1]); timeDifference_1.pop();

    const timeDifference = [timeDifference_1[0]-today.getHours(), timeDifference_1[1]-today.getMinutes()];

    globalThis.newTimeHours = Rhour-timeDifference[0];
    globalThis.newTimeMinutes = Rminute-timeDifference[1];

    if(newTimeMinutes<0){
        newTimeHours -= 1;
        newTimeMinutes += 60;
    }else if(newTimeMinutes>59){
        newTimeHours += 1;
        newTimeMinutes -= 60; 
    }
    
    newDate = parseInt(matches[1]);
    newMonth = parseInt(matches[0]);
    newYear = parseInt(matches[2]);
    const monthLenghts = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(newTimeHours<0){
        newTimeHours += 24;
        newDate -= 1;
    }else if(newTimeHours>23){
        newTimeHours -= 24;
        newDate += 1;
    }

    if(newDate<1){
        newDate += monthLenghts[newMonth-2];
        newMonth -= 1;
    }else if(newDate>monthLenghts[newMonth-1]){
        newDate -= monthLenghts[newMonth-1];
        newMonth += 1;
    }

    if(newMonth<1){
        newMonth += 12;
        newYear -= 1;
    }else if(newMonth>12){
        newMonth -= 12;
        newYear += 1;
    }

    var timeEnding;
    if(newTimeMinutes<10) newTimeMinutes = "0"+newTimeMinutes;
    if(newTimeHours<12) timeEnding = ' AM';
    else if(newTimeHours>12){ 
        timeEnding = ' PM'; 
        newTimeHours -= 12;
    }else timeEnding = ' PM'; 
    const newTime = (newTimeHours+":"+newTimeMinutes + timeEnding);

    //format release date
    var dd;
    const ordinalEndings = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th","th"];
    if(newDate == 11||newDate==12||newDate==13){ dd = "th";
    }else{dd = ordinalEndings[(newDate%10)]}
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const mm = newMonth;
    globalThis.date_display = parseInt(newDate) + dd + ` ${monthNames[mm-1]} ${newYear}, at ${newTime} (${timezone})`;
}

const copyLink = document.getElementById("copyLink");
copyLink.addEventListener('click', () => {
  const shareableLink = `https://neelng7.github.io/predictions/?${username.value}+${firstName.value}+${lastName.value}`
  window.navigator.clipboard.writeText(shareableLink);
  alert("Coppied to Clipboard.");
});