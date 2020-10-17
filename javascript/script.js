//assign elements
let startBtn = document.querySelector("#start_quiz");
let timerEl = document.querySelector("#timer");
let welcomeMessage = document.querySelector("#welcome_message");
let quizContainer = document.querySelector("#quiz_container");
let questionLabel = document.querySelector("#question");
let choiceList = document.querySelector("#choice_list");
let quizCompleteContainer = document.querySelector("#quiz_complete_container");
let finalScoreLabel = document.querySelector("#final_score_label");
let saveScoreBtn = document.querySelector("#save_score");


let timeTotal = 75;
let questionIndex = 0;
let score = 0;
let myTimer;


function startQuiz() {
    quizContainer.classList.remove("hidden");
    welcomeMessage.classList.add("hidden");
    myTimer = startTimer();
    populateQuestion();
    choiceList.addEventListener("click",checkAnswer);
}

//returns a timer that counts down each second
function startTimer(){
    let myTimer = setInterval(
        function(){
            timeTotal--;
            timerEl.textContent=timeTotal;
            if (timeTotal<=0){
                endQuiz();
            }
        },
        1000
    );
    return myTimer;
}

//reads the question array to fill in the question elements
function populateQuestion(){
    //add question test
    questionLabel.textContent = questions[questionIndex].question;
    let choices = questions[questionIndex].choices;
    //empty out the choice list
    while (choiceList.firstChild){
        choiceList.removeChild(choiceList.firstChild);
    }
    //create an li element for each choice and add to the ordered list.
    for(let x =0; x < choices.length;x++){
        let listItem = document.createElement("li");
        listItem.textContent = choices[x];
        listItem.setAttribute("id",x);
        choiceList.appendChild(listItem);
    }
    questionIndex++;
}

//check if event clicked is a choice and compare to correct answer
function checkAnswer(event){
    let target = event.target;
    if(target.tagName==="LI"){
        //if correct answer is clicked
        if(target.textContent === questions[questionIndex-1].answer){
            score+=15;
        //if wrong answer is clicked
        } else {
            timeTotal-=10;
            timerEl.textContent=timeTotal;
        }
        if(questionIndex===questions.length){
            endQuiz();
        } else {
            populateQuestion();
        }
    };
}

//stop timer, display results
function endQuiz(){
    let finalScore = score+timeTotal;
    clearInterval(myTimer);
    quizContainer.classList.add("hidden");
    quizCompleteContainer.classList.remove("hidden");
    finalScoreLabel.textContent = "Your final score was " + finalScore;
}

//add score to scores list
function recordScore(){

}

timerEl.textContent=timeTotal;
startBtn.addEventListener("click",startQuiz);
saveScoreBtn.addEventListener("click",recordScore);