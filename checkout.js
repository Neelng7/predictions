var database = firebase.database();

var upload_date, release_date, prediction, Rtime, upload_time;
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

    var upload_date_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'upload_date');
    upload_date_ref.on("value",function(data){
        upload_date = data.val(); 

    var upload_time_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'upload_time');
    upload_time_ref.on("value",function(data){
        upload_time = data.val(); 
    
    var timezone_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'timezone');
    timezone_ref.on("value",function(data){
        globalThis.dbtimeZone = data.val(); 

    changeTimezone(upload_date, upload_time);

    document.getElementById("viewUsername").innerHTML = "Username: " + username_check.value;
    document.getElementById("viewFirstName").innerHTML= "First Name: " + firstName_check.value.toLowerCase();
    document.getElementById("viewLastName").innerHTML = "Last Name: " + lastName_check.value.toLowerCase();
    document.getElementById("viewInitialDate").innerHTML = "This prediction was uploaded on " + date_display;

    var release_date_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'release_date');
    release_date_ref.on("value",function(data){
    release_date = data.val(); 
    var rdateStr = release_date;

    var Rtime_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'release_time');
    Rtime_ref.on("value",function(data){
        Rtime = data.val(); 
        var rtimeStr = Rtime;

    changeTimezone(rdateStr, rtimeStr);   

    var prediction_ref  = database.ref('/users/'+ "UserId: "+username_check.value+'/'+"first_name:"+firstName_check.value.toLowerCase()+'/'+'last_name:'+lastName_check.value.toLowerCase() + '/' +'prediction');
    prediction_ref.on("value",function(data){
        globalThis.prediction = data.val(); 
    
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
    // document.getElementById("search-load").classList.toggle("hide", true);
    progressBarInterval = setInterval(progressBarFn, 2, 6);
});
progressBarInterval = setInterval(progressBarFn, 3, 5)});
progressBarInterval = setInterval(progressBarFn, 4, 4)});
progressBarInterval = setInterval(progressBarFn, 4, 3)});
progressBarInterval = setInterval(progressBarFn, 4, 2)});
progressBarInterval = setInterval(progressBarFn, 4, 1)});
}

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
    window.location.href = "/modify-prediction.html?" + username_check.value +"+"+ firstName_check.value +"+"+ lastName_check.value;
}

if(window.location.href.includes("+")){
    const urlInfo = (((window.location.href.split("?"))[1]).split("+"));
    username_check.value = urlInfo[0];
    firstName_check.value = urlInfo[1];
    lastName_check.value = urlInfo[2];
    viewing();
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
