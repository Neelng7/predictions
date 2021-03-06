var firebaseConfig = {
    apiKey: "AIzaSyDXKAkvjpRIw0QvoG3l-QfqdN10rIs0-_0",
    authDomain: "time-capsule-1.firebaseapp.com",
    databaseURL: "https://time-capsule-1-default-rtdb.firebaseio.com",
    projectId: "time-capsule-1",
    storageBucket: "time-capsule-1.appspot.com",
    messagingSenderId: "775954139303",
    appId: "1:775954139303:web:913fd1e3454d4e4e82b382"
    };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const problem = document.getElementById("reportProblem");
const email = document.getElementById("reportEmail");
var numberOfReports, numberOfReports2, reportCount;

function fnScroll(){
    window.scrollTo(0,document.body.scrollHeight);
    show();
    problem.focus();
}

function show(){
    document.getElementById("problemButton").classList.toggle("hide", true);
    document.getElementById("problemButton2").classList.toggle("hide",false);
    document.getElementById("problemButton3").classList.toggle("hide",false);
    email.classList.toggle("hide",false);
    problem.classList.toggle("hide",false);
}

function report(){
if(problem.value == "" || problem.value == null){
    alert("Report cannot be empty");;
}else{
    var numberOfReports_ref = database.ref('/Reports/' + "count");
    numberOfReports_ref.once("value",function(data){
    numberOfReports = data.val() + 1;

    database.ref('/Reports/').update({
        count: numberOfReports
    });
    database.ref('/Reports/' + "reports").update({
        ["report" + numberOfReports]: problem.value
    });
    database.ref('/Reports/' + "emails").update({
        ["email" + numberOfReports]: email.value
    });
    alert("Thank you. The Problem has been Reported.");
    cancel();
    problem.value="";
    email.value="";   
    });
}
}

function cancel(){
    document.getElementById("problemButton").classList.toggle("hide", false);
    document.getElementById("problemButton2").classList.toggle("hide",true);
    document.getElementById("problemButton3").classList.toggle("hide",true);
    email.classList.toggle("hide",true);
    problem.classList.toggle("hide",true);
}

function dropdown(){
    document.getElementById("main").classList.toggle("hide");
    document.getElementById("dropdown-menu").classList.toggle("hide");
    document.getElementsByTagName("body")[0].classList.toggle("back-blue");
}

document.addEventListener('keydown', keydown => {
    if(keydown.key == "1" && keydown["altKey"]) window.location.href = "/predictions/about";
    if(keydown.key == "2" && keydown["altKey"]) window.location.href = "/predictions/search";
    if(keydown.key == "3" && keydown["altKey"]) window.location.href = "/predictions/";
    if(keydown.key == "4" && keydown["altKey"]) window.location.href = "/predictions/new-prediction";
    if(keydown.key == "5" && keydown["altKey"]) window.location.href = "/predictions/modify-prediction";
    if(keydown.key == "6" && keydown["altKey"]) fnScroll();
})

function progressBarFn(currentWidth, increaseWidth){
    const computedStyle = getComputedStyle(progressBar);
    const barWidth = parseInt(computedStyle.getPropertyValue('--width'))||0;
    progressBar.style.setProperty('--width', Math.ceil(barWidth+(increaseWidth||0.27)));
    if(Math.ceil((100/barParts)*currentWidth) == Math.ceil(barWidth)) clearInterval(progressBarInterval);
    if(Math.ceil(barWidth) >= 95) progressBar.remove();
}