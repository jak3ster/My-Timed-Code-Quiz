// Elements from tags
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const highscore_btn = info_box.querySelector(".buttons .highscore");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const score_text = document.querySelector(".score_text");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const result_title = document.querySelector(".result_title");
const restart_btn = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Variables
var timeValue =  100;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var highscore = [];
var counter;
var counterLine;
var widthValue = 0;
var quiz_counter;
var randomQuestions;
var quizItem;
var answer_result;

var timer;
var sec = 100;

// class ScoreBoard {
//     constructor(json) {
//     Object.assign(this, json);
//     }
// }

// const sb = new ScoreBoard({
//     initials: "KL",
//     score: 40
// });

// console.log("before" + sb)

// sb.initials = 'GF';
// sb.score = 21;

// console.log("after" + sb)

// storeData('scoreboard', sb);

// var sbData = readData('scoreboard');

// var sample = [{"initials":"KL", "score":30,},{"initials":"JK", "score":40,}];


// Start Quiz button
start_btn.onclick = ()=>{
    // Show info box prompt 

    info_box.classList.add("activeInfo"); //show info box

    // Update high score from local storage
    updateHighScoreCache();
}

// High score quiz button 
highscore_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    // restart_btn.remove(); //hide restart_btn
    quit_quiz.textContent = 'Close';
    restart_btn.textContent = 'Clear Scores';
    result_title.textContent = 'High Scores';

    // create ol element and set the attributes.
    var ol = document.createElement('ol');
    ol.setAttribute('style', 'padding: 0; margin: 0;');
    ol.setAttribute('id', 'scoreList');

    for (i = 0; i <= highscore.length - 1; i++) {
        var li = document.createElement('li');     // create li element.
        li.innerHTML = highscore[i];      // assigning text to li using array value.
        ol.appendChild(li);     // append li to ol.
    }
    score_text.appendChild(ol);       // add list to the container.
    result_box.classList.add("activeResult"); //show result box

    restart_btn.setAttribute("onclick", "clearHighScore()");


}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    result_box.classList.remove("activeResult"); //hide result box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    que_count = 0;
    quiz_counter = 0;
    widthValue = 0;
    var cachedQuestions = shuffle(JSON.parse(localStorage.poolQuestionsData));
    showQuestions(quiz_counter, cachedQuestions); //calling showQestions function
    startTimer(); 
}

// if restartQuiz button clicked
restart_btn.onclick = ()=>{
    console.log("************restart was clicked!");

    info_box.classList.remove("activeInfo"); //hide info box
    result_box.classList.remove("activeResult"); //hide result box
    quiz_box.classList.add("activeQuiz"); //show quiz box

    que_count = 0;
    quiz_counter = 0;
    widthValue = 0;
    sec = 100;

    var cachedQuestions = shuffle(JSON.parse(localStorage.poolQuestionsData));
    showQuestions(quiz_counter, cachedQuestions); //calling showQestions function
    let initials_field = document.querySelector("#initials_text");
    let submit_btn = document.querySelector("#submit_btn");
    initials_field.disabled = false;
    submit_btn.disabled = false;
    startTimer(); 
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_result = document.querySelector("footer .result_que");

var tempArray;
// getting questions and options from array
function showQuestions(quiz_counter, listQuestions){
    const que_text = document.querySelector(".que_text");

    tempArray = JSON.parse(JSON.stringify(listQuestions));
    quizItem = listQuestions[quiz_counter];

    question_number = quiz_counter + 1;
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ quizItem.question +'</span>';
    let option_tag = '<div class="option"><span>'+ quizItem.options[0] +'</span></div>'
    + '<div class="option"><span>'+ quizItem.options[1] +'</span></div>'
    + '<div class="option"><span>'+ quizItem.options[2] +'</span></div>'
    + '<div class="option"><span>'+ quizItem.options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    quiz_counter++;
    
    // end quiz if timer runs out
    if (sec < 0) {
        stopTimer(sec) // stop timer, change user score and text to zero, show results
        return;
    }
}

//if user clicked on option
function optionSelected(answer){
    // clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    // let correcAns = randomQuestions[quiz_counter].answer; //getting correct answer from array
    let correcAns = quizItem.answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        // userScore += 1; //upgrading score value with 1
        // answer.classList.add("correct"); //adding green color to correct selected option
        // answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
        bottom_ques_result.innerHTML = "Correct Answer";  //adding new span tag inside bottom_ques_result
        bottom_ques_result.classList.add("correct"); //adding green color to correct selected option


        
    } else {
        console.log("Wrong Answer");
        sec -= 10;

        bottom_ques_result.innerHTML = "Wrong Answer";  //adding new span tag inside bottom_ques_result
        bottom_ques_result.classList.add("incorrect"); //adding red color to correct selected option
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    tempArray.splice(quiz_counter, 1);

    if (tempArray.length != 0){
        showQuestions(quiz_counter, tempArray);
    }
    else {
        stopTimer(sec) // stop timer, change user score and text to zero, show results
    }

    // end quiz if timer runs out
    if (sec < 0) {
        stopTimer(sec) // stop timer, change user score and text to zero, show results
        return;
    }
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    let scoreTag = '<span>Your score <p>'+ userScore +'</p></span>';
    scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    console.log("scoreText.innerHTML: " + scoreText.innerHTML);
    
    let submit_form = document.querySelector("#form") || null;
    console.log("***********elementExist: " + submit_form);

    // Check if element exists.
    if (typeof(submit_form) == 'undefined' || submit_form == null){
        // create a div element
        var form = document.createElement('form')
        form.setAttribute("method", "post");
        form.setAttribute("name", "form");
        form.setAttribute("id", "form");

        let input_tag = `<div class="form"><label id="initials_lbl" for="initials">Enter initials:</label>`
        + `<input type="text" id="initials_text" name="initials" maxlength="3">`
        + `<input type="submit" id="submit_btn" value="Submit" onclick="submitInitials();"></div>`;
        form.innerHTML = input_tag;

        // get .div2 element
        var results_btn = document.querySelector('#results_btn');

        // insert before the .div2 element by getting
        // its parent node
        results_btn.parentNode.insertBefore(form, results_btn);
    } else {
        let submit_btn = document.querySelector("#submit_btn");
        document.querySelector("#initials_text").value = null;
        submit_btn.disabled = false;
    }
}



function submitInitials(){
    let initials_field = document.querySelector("#initials_text");
    let submit_btn = document.querySelector("#submit_btn");
    let textData = initials_field.value || null;
    initials_field.disabled = true;
    submit_btn.disabled = true;
    console.log("+++++++***********textData: " + textData);
    if (textData == null || typeof textData === 'undefined'){
        textData = 'NaN';
        console.log("+++++++*********** not defined: " + textData);
    }

    let addUserScore = `${textData} - ${userScore}`;
    highscore = updateHighScoreCache(addUserScore);

    
}

function clearHighScore(){
    let scoreList = document.querySelector("#scoreList");
    scoreList.innerHTML = '';
    scoreList.textContent = 'High Score Data Cleared!';
    highscore.length = 0;
    localStorage.clear();
    // quiz_box.classList.remove("activeQuiz"); //hide quiz box
}

function updateHighScoreCache(AddHighScore){
    let keyInput = 'highscore';
    
    // If high score is not in local storage
    if (localStorage.getItem(keyInput) != null) {
        
        // Get high score out of local storage, then add to cache
        highscore = readData(keyInput);
        
    }

    // Check if AddHighScore is not null
    if (AddHighScore != null){
        
        // Add user score in cacheData array
        highscore.push(AddHighScore);
    }

    // Store data into local storage
    storeData(keyInput, highscore);



    console.log("**************highscore: " + highscore);
}

function storeData(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function readData(key){
    return JSON.parse(localStorage.getItem(key)); 
}

function startTimer(){
    timer = setInterval(function(){
        
        timeCount.textContent = sec; //changing the value of timeCount with time value
        sec--;

        // end quiz if timer runs out
        if (sec < 0) {
            stopTimer(sec) // stop timer, change user score and text to zero, show results
            return;
        }
    }, 1000);
}

// stop timer, change user score and text to zero, show results
function stopTimer(currTime){
    userScore = currTime
    clearInterval(timer);
    timeCount.textContent = userScore;
    showResult();
}



/***************************************************************************************
*    Title: shuffle source code
*    Availability: http://sedition.com/perl/javascript-fy.html
****************************************************************************************/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
      // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}