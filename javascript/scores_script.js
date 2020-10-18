let highScoreEl = document.querySelector("#high_score_list");
let clearScoreBtn = document.querySelector("#clear_scores");

let userScore = JSON.parse(localStorage.getItem("userScore"));
if(userScore === null){
    userScore = [];
}

function populateScores(){
    userScore.sort(sortScores);
    //empty out the highscore list
    while (highScoreEl.firstChild){
        highScoreEl.removeChild(highScoreEl.firstChild);
    }
    //create an li element for each score and add to the ordered list.
    for(let x =0; x < userScore.length;x++){
        let listItem = document.createElement("li");
        listItem.textContent = userScore[x].initials + " ---- " + userScore[x].score;
        listItem.setAttribute("id",x);
        highScoreEl.appendChild(listItem);
    }
}

//sort the scores high to low
function sortScores(score1, score2){
    let scoreA = score1.score;
    let scoreB = score2.score;

    if (scoreA > scoreB){
        return -1;
    } else {
        return 1;
    }
}

//clear scores
function clearScores(){
    localStorage.removeItem("userScore");
    userScore = [];
    populateScores();
}

populateScores();

clearScoreBtn.addEventListener("click",clearScores);