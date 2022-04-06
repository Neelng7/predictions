var database = firebase.database();

const seachInput = document.querySelector("[data-seach]");
const progressBar = document.getElementsByClassName('progress-bar')[0];
const searchFilter = document.getElementById("searchFilter");
var progressBarInterval, barParts=10;

var dbusers, conUser, searched = false;
const userCardTemplate= document.querySelector("[data-user-template]");
const predictionCardContainer= document.querySelector("[data-prediction-cards-container]");
var release_date, Rtime, rdateStr, rtimeStr;
var today = new Date();
var lockArray = [], i=0;

progressBarInterval = setInterval(progressBarFn, 20, 8, 0.35);

var dbusers_ref  = database.ref('/users/');
dbusers_ref.once("value",(data) => {
dbusers = data.val();

progressBarInterval = setInterval(progressBarFn, 1, 10, 0.6);

for (const [idx, value] of Object.entries(dbusers)){
    globalThis.dbUsername = idx;

for (const [index, val] of Object.entries(value)) {
    if(index.includes("first")){
        globalThis.dbFirstName = index;

        for (const [index2, val2] of Object.entries(val)) {
            if(index2.includes("last")){
            globalThis.dbLastName = index2;

            for (const [index3, val3] of Object.entries(val2)) {
                if(index3.includes("tag")){
                globalThis.dbTags = val3;
                }
                if(index3.includes("release_d")){
                    globalThis.rdateStr = val3; 
                }
                if(index3.includes("release_t")){
                    globalThis.rtimeStr = val3;
                }
                if(index3.includes("zone")){
                    globalThis.dbtimeZone = val3;
                }
            }}
        }
    }else if(index.includes("status")){
        for (const [idx2, value2] of Object.entries(val)) {
            if(value2 == "Public"){
            
            const card = userCardTemplate.content.cloneNode(true).children[0];

            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            const body2 = card.querySelector("[data-body2]");
            const search_tags = card.querySelector("[data-tags]");
            header.textContent = "Username: " + dbUsername.slice(8,);
            body.textContent = "Name: "+ dbFirstName.slice(11,) + " " + dbLastName.slice(10,);
            if(dbTags==""){search_tags.textContent = "No given tags"}
            else{search_tags.textContent = "Tags: "+ dbTags;}

            releaseDate();
            body2.textContent = "Release Date: " + release_date_display;

            predictionCardContainer.append(card);     
            document.getElementById("checked").id = "checked" + i++
        
        if((parseInt(today.getFullYear())) > newYear){
            lockArray.push(true);
        }else if((today.getFullYear()) == newYear){
            if(parseInt(today.getMonth()+1) > newMonth){
                lockArray.push(true);
            }else if((parseInt(today.getMonth())+1) == newMonth){
                if(parseInt(today.getDate()) > newDate){
                 lockArray.push(true);
                }else if(parseInt(today.getDate()) == newDate){
                    if(parseInt(today.getHours()) > newTimeHours){
                        lockArray.push(true);
                    }else if(parseInt(today.getHours()) == newTimeHours && parseInt(today.getMinutes()) >= newTimeMinutes){
                        lockArray.push(true);
                    }else lockArray.push(false);
                }else lockArray.push(false);
            }else lockArray.push(false);
        }else lockArray.push(false);
        
        releaseDateLock();
        }}
    }
}
}
document.getElementById("search-load").classList.toggle("hide", true);
createOnclickEvent();
});

seachInput.addEventListener("input",(element) => {
    const searchValue = element.target.value.toLowerCase();
    globalThis.noSearchResultsArray = [];
    globalThis.searched = true;

    const cardEls = document.querySelectorAll(".card");
    cardEls.forEach((e) => {
    
    const dbUsername2 = e.children[3].textContent.toLowerCase();
    const dbName2 = e.children[4].textContent.toLowerCase();
    const dbTags2 = e.children[6].textContent.toLowerCase();
    
    const searchValueSplit = searchValue.split(" ");
    
    for(let n=0; n<searchValueSplit.length; n++){
        if(dbUsername2.includes(searchValueSplit[n]) || dbName2.includes(searchValueSplit[n]) ||
            dbTags2.includes(searchValueSplit[n])){
            e.style.display = "grid";
        }else{
            e.style.display = "none";
            break;
        } 
    }
    if(e.style.display=="none") noSearchResultsArray.push(1);
})
    if(noSearchResultsArray.length==cardEls.length){
        document.getElementById("noSearchResults").classList.toggle("hide", false);
    }else{
        document.getElementById("noSearchResults").classList.toggle("hide", true);        
    }
    const searchResults = document.getElementById("searchResults");
    searchResults.innerText = cardEls.length-noSearchResultsArray.length+ " search results found";
})

function createOnclickEvent(){
    const searchCards = document.querySelectorAll(".card");
    searchCards.forEach((e) => {
        e.addEventListener('click', () => {
            checkoutSearchedPrediction(e.id);  
        })
    });
    }

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function checkoutSearchedPrediction(referenceIndex){
if(confirm("Open Prediction?")){
    
    const predictIndex = parseInt(referenceIndex.slice(7,));

    const cardEls = document.querySelectorAll(".card");
    cardEls.forEach((value, index) => {
    
    if(index == predictIndex){
    var updatedbusername = value.children[3].textContent.slice(10,);
    var updatedbName = value.children[4].textContent.slice(6,).split(" ");
    
    window.location.href = "?" + updatedbusername +"+"+ updatedbName[0] +"+"+ updatedbName[1];
    }
})
}}


function releaseDate(){
    const matches = rdateStr.split("/");
    const matches_rtime = rtimeStr.split(":");
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

    const todayTime = today.getHours() +":"+ today.getMinutes();
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

    if(newTimeMinutes<10) newTimeMinutes = "0"+newTimeMinutes;
    const newTime = (newTimeHours+":"+newTimeMinutes);

    //format release date
    var dd;
    const ordinalEndings = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th","th"];
    if(newDate == 11||newDate==12||newDate==13){ dd = "th";
    }else{dd = ordinalEndings[(newDate%10)]}
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const mm = newMonth;
    globalThis.release_date_display = parseInt(newDate) + dd + " " + monthNames[mm-1] + " " +newYear + ", at " + newTime;
}

function releaseDateLock(){
    const cardEls = document.querySelectorAll(".card");
    cardEls.forEach((val, index) => { 
        const predictionLock = val.children[0];

        if(lockArray[index]){
            predictionLock.innerHTML = "&#xf09c;";
            predictionLock.title = "Prediction Released"
        }else if(lockArray[index] == false){
            predictionLock.innerHTML = "&#xf023;";
            predictionLock.title = "Prediction Not Released"
        }
    });
}

function filterSearchPredictions(){
    const cardEls = document.querySelectorAll(".card");
    cardEls.forEach((e) => { 
        if(e.children[0].title == "Prediction Not Released"){
            if(searched){
                if(searchFilter.checked) e.style.display = "none";
                else if(noSearchResultsArray.includes(e.id)){
                    e.style.display = "none";
                }else e.style.display = "grid";
            }else e.classList.toggle("hide");
        }
    })
}

