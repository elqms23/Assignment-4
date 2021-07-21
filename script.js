var questions = [
    {title: "Commonly used data types Do Not include:",
    choices: ["strings","booleans","alerts", "numbers"],
    answer: "alerts"
},
{
    title: "The condition in an if/ else staatement is enclosed within _______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer:"parentheses"
},
{
    title: "Arrays in JavaScript can be used to store _______.",
    choices: ["numbers and strings", 'other arrays', 'booleans','all of the above'],
    answer: "all of the above"
},
{
    title: "String values must be enclosed within _______ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},
{
    title:"A very useful tool used during development and debugging for printing content to the debugger is:",
    choices:["JavaScript", "terminal/ bash", "for loops","console.log"],
    answer:"console.log"
}]

var header = document.querySelector('header');
var timer = document.getElementById('timer');
var intro = document.getElementById('intro');
var quiz = document.getElementById('quiz');
var result = document.getElementById('result');
var resultWin = document.getElementById('result-window');
let question_box =[]
var scoreText = document.getElementById('score');
var scoreContainer = document.getElementById('highestScore');
var score = 0;
var record = document.getElementById('record');



//functions

function show(a){
    a.removeAttribute('class','hide');
}

function hide(b) {
    b.setAttribute("class", "hide");
}


var timeLeft =60;


function countdown() {
  
    timeInterval = setInterval(function() {
     
     timer.textContent =  "Time: " + timeLeft;
     timeLeft--;
 
     // ends at 0
     if (timeLeft < 0) {
       
       score = 0;
       showScore(resultWin);
       clearInterval(timeInterval);
 
     }
   }, 1000);
  
}

function showScore(a){
    show(resultWin);
    hide(quiz);
    hide(timer);
    scoreText.textContent = a;
}
function startQuiz(){
    hide(intro);
    show(quiz);
    
    question_box = questions;
    console.log(question_box)
    newQ();
}
var currentQ={}
var IndexQ = 0
var containerQ = document.getElementById('question')
var ansMark = document.getElementById('cards')

function newQ(){
    currentQ =question_box[IndexQ];
    containerQ.innerText = currentQ.title;
    
    for (i=0; i<currentQ.choices.length; i++){
        console.log(currentQ)
        const button = document.createElement('button');
        button.innerText = currentQ.choices[i];
        button.setAttribute('class','btn');
        button.addEventListener('click',function(event){
            resetQ();
            checkAns(event);}
        );
        ansMark.appendChild(button);

    } 

}

function resetQ() {
    IndexQ++;
    if (IndexQ < question_box.length) {
        
        while (ansMark.firstChild){
            ansMark.removeChild(ansMark.firstChild);
        }    

        newQ();  
    }
    else {
        getScore();
        showScore(score);
        clearInterval(timeInterval);
    }
}

function checkAns(event) {
    
    var selectedEl = event.target;
    var selected = selectedEl.innerText;

    
    if (result.firstChild !== null) {
        result.removeChild(result.firstChild);
    }

    if (selected === currentQ.answer) {
        const msg = document.createElement('h4');
        msg.innerText = "Correct!";
        result.appendChild(msg);
    }
    else {
        const msg = document.createElement('h4');
        msg.innerText = "Wrong!";
        result.appendChild(msg);
        timeLeft -= 10;
    }

}
var noScore = document.getElementById('noScore')
function resetQuiz() {

    timeLeft = 60;
    currentQ = 0;

    hide(scoreContainer);
    timer.textContent =  "Time: " + timeLeft;
    show(header);
    show(intro);
    hide(noScore);

    while (ansMark.firstChild){
        ansMark.removeChild(ansMark.firstChild);
    }
}

function getScore(){
    if(timeLeft<0){
        timeLeft = 0;

    }
    
    return score = timeLeft;
}

var initial = document.getElementById('initial');
var scoreList = document.getElementById('list');

function saveScore(a) {
    
    show(scoreContainer);
    hide(resultWin);

    var scoreLine = document.createElement('li');
    scoreLine.innerText = initial.value + " - " + a;
    scoreList.appendChild(scoreLine);
    initial.value = "";
}

function clearScore() {

    while (scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
    }
    console.log(scoreList.firstChild);
    show(noScore);
    
}




// 
var start = document.getElementById('startb');
var back = document.getElementById('btn-back');
var clear = document.getElementById('btn-clear');
var submit = document.getElementById('submitInitial');


start.onclick = countdown; 
start.addEventListener('click', startQuiz);
back.addEventListener('click', resetQuiz);
clear.addEventListener('click', clearScore);
submit.addEventListener('click', function(){
    saveScore(score)
});
record.addEventListener(click(),saveScore);
