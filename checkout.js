var database = firebase.database();

var upload_date, upload_time, dbUploadTimezone;
var Rtime, release_date, dbtimeZone, prediction, dataValues;
const firstName_check = document.getElementById("fname_check");
const lastName_check = document.getElementById("lname_check");
const username_check = document.getElementById("username_check");

const viewFileRequest= document.getElementById("viewFileRequest");
const mainPrediction = document.getElementById("mainprediction");
const predictionLock = document.getElementById("predictionLock");
const predictionNotReleased = document.getElementById("notReleased");

const progressBar = document.getElementsByClassName('progress-bar')[0];
var progressBarInterval, barParts=6;

var today = new Date();

function processData(){
    var upload_date_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'upload_date');
    upload_date_ref.on("value",function(data){
    upload_date = data.val();
    if(upload_date !== null){
        viewing();
    }else if(username_check.value==null || firstName_check.value==null || lastName_check.value==null){
            alert("Please Enter all the given details");
    }else{
        alert("No Such prediction Exists");
        location.reload();
    }
    })
}

function viewing(){
    progressBar.classList.toggle('hide', false);
    
    var element = document.getElementById("maindiv");
    element.classList.toggle("hide", true);
    var element2 = document.getElementById("secondaryDiv");
    element2.classList.toggle("hide", false);

    var databaseRef  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+
    firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase());
    databaseRef.on("value",(data) => {
        dataValues = data.val();

        prediction = dataValues.prediction;
        rdateStr = dataValues.release_date;
        rtimeStr = dataValues.release_time;
        dbtimeZone = dataValues.timezone;
        dbUploadTimezone = dataValues.uploadTimezone;
        upload_date = dataValues.upload_date;
        upload_time = dataValues.upload_time;

    changeTimezone(upload_date, upload_time, dbUploadTimezone);

    document.getElementById("viewUsername").innerHTML = "Username: " + username_check.value;
    document.getElementById("viewFirstName").innerHTML= "First Name: " + firstName_check.value.toLowerCase();
    document.getElementById("viewLastName").innerHTML = "Last Name: " + lastName_check.value.toLowerCase();
    document.getElementById("viewInitialDate").innerHTML = "This prediction was uploaded on " + date_display;

    changeTimezone(rdateStr, rtimeStr, dbtimeZone);   

    if((parseInt(today.getFullYear())) > newYear){
        viewFileRequest.innerHTML = "This prediction was released on " + date_display;
        mainPrediction.innerHTML= prediction;
        mainPrediction.classList.toggle("hide", false);
        }else if((today.getFullYear()) == newYear){
        if(parseInt(today.getMonth()+1) > newMonth){
            viewFileRequest.innerHTML = "This prediction was released on " + date_display;
            mainPrediction.innerHTML= prediction;
            mainPrediction.classList.toggle("hide", false);
        }else if((parseInt(today.getMonth())+1) == newMonth){
            if(parseInt(today.getDate()) > newDate){
            viewFileRequest.innerHTML = "This prediction was released on " + date_display;
            mainPrediction.innerHTML= prediction;
            mainPrediction.classList.toggle("hide", false);
            }else if(parseInt(today.getDate()) == newDate){
            if(parseInt(today.getHours()) > newTimeHours){
                viewFileRequest.innerHTML = "This prediction was released on " + date_display;
                mainPrediction.innerHTML= prediction;
                mainPrediction.classList.toggle("hide", false);
            }else if(parseInt(today.getHours()) == newTimeHours && parseInt(today.getMinutes()) >= newTimeMinutes){
                viewFileRequest.innerHTML = "This prediction was released on " + date_display;
                mainPrediction.innerHTML= prediction;
                mainPrediction.classList.toggle("hide", false);
            }else{
                viewFileRequest.innerHTML = "This prediction will be released on " + date_display;
                viewFileRequest.style.color = "red";
                predictionNotReleased.classList.toggle("hide", false);
            }
            }else{
            viewFileRequest.innerHTML = "This prediction will be released on " + date_display;
            viewFileRequest.style.color = "red";
            predictionNotReleased.classList.toggle("hide", false);
            }
        }else{
            viewFileRequest.innerHTML = "This prediction will be released on " + date_display;
            viewFileRequest.style.color = "red";
            predictionNotReleased.classList.toggle("hide", false);  
        }
    }else{
    viewFileRequest.innerHTML = "This prediction will be released on " + date_display;
    viewFileRequest.style.color = "red";
    predictionNotReleased.classList.toggle("hide", false);
    } 
    progressBarInterval = setInterval(progressBarFn, 2, 6);
});
// progressBarInterval = setInterval(progressBarFn, 3, 5)});
// progressBarInterval = setInterval(progressBarFn, 4, 4)});
// progressBarInterval = setInterval(progressBarFn, 4, 3)});
// progressBarInterval = setInterval(progressBarFn, 4, 2)});
// progressBarInterval = setInterval(progressBarFn, 4, 1)});
}

document.addEventListener('keydown', (keydown) => {
    if(keydown.key == "Enter") verify();
});

function verify(){
    if(username_check.value==""){
        alert("Please enter a username");
        username_check.focus();
    }else if(username_check.value.includes(" ")){
        alert("Username cannot contain spaces");
        username_check.focus();
    }else if(firstName_check.value==""){
        alert("Please enter the first name");
        firstName_check.focus();
    }else if(lastName_check.value==""){
        alert("Please enter the last name");
        lastName_check.focus();
    }else{
        processData();
    }
}

function signInUser(){
    window.location.href = `/modify-prediction?user=${username_check.value}&name=${firstName_check.value} ${lastName_check.value}`;
}

const URLparameters = new URLSearchParams(window.location.search);
if(URLparameters.has('user')){
    username_check.value = URLparameters.get('user');
    const nameParam = URLparameters.get('name').split(" ")
    firstName_check.value = nameParam[0];
    lastName_check.value = nameParam.slice(1,).join(" ");
    viewing();
}

function changeTimezone(dbdate, dbTime, zone){

    const matches = dbdate.split("/");
    const matches_rtime = dbTime.split(":");
    globalThis.Rhour = parseInt(matches_rtime[0]);
    globalThis.Rminute = parseInt(matches_rtime[1]);
    matches[0] = parseInt(matches[0]);
    matches[1] = parseInt(matches[1]);
    matches[2] = parseInt(matches[2]);

    const timeconversion = today.toLocaleString('en-US', { timeZone: zone }); //dbtimeZone=timezone from db
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
    
    globalThis.newDate = parseInt(matches[1]);
    globalThis.newMonth = parseInt(matches[0]);
    globalThis.newYear = parseInt(matches[2]);
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
    globalThis.date_display = parseInt(newDate) + dd + ` ${monthNames[mm-1]} ${newYear}, at ${newTime}`;
}
