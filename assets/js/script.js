// Required elements from tags
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
const restart_quiz = result_box.querySelector(".buttons .restart");
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

var timer = null;
var sec = 100;

// Show info box prompt 
function infoPrompt() {
    info_box.classList.add("activeInfo"); //show info box
    // highscore = localStorage.getItem('highscore');
    // console.log("*************highscore: " + highscore);
    // highscore = JSON.parse(localStorage.getItem("highscore")); 

    // Update high score from local storage
    updateHighScoreCache();
}

// Run infoPrompt on page load
window.onload = infoPrompt;

// High score quiz button 
highscore_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    restart_quiz.remove();
    quit_quiz.textContent = 'Close';
    result_title.textContent = 'High Scores';
    // score_text.innerHTML += "Here is some more data appended";

    // create ol element and set the attributes.
    var ol = document.createElement('ol');
    ol.setAttribute('style', 'padding: 0; margin: 0;');
    ol.setAttribute('id', 'theList');

    for (i = 0; i <= highscore.length - 1; i++) {
        var li = document.createElement('li');     // create li element.
        li.innerHTML = highscore[i];      // assigning text to li using array value.
        ol.appendChild(li);     // append li to ol.
    }
    score_text.appendChild(ol);       // add list to the container.

    
    result_box.classList.add("activeResult"); //show result box
    // const scoreText = result_box.querySelector(".score_text");

    // let scoreTag = '<span>Your score <p>'+ userScore +'</p></span>';
    // scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    // console.log("scoreText.innerHTML: " + scoreText.innerHTML);
    
    // // Add user score to local storage for high score

    // localStorage.setItem('highscore', str); 
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    result_box.classList.remove("activeResult"); //hide result box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    // showQuestions(0); //calling showQestions function
    // queCounter(1); //passing 1 parameter to queCounter
    // startTimer(15); //calling startTimer function
    // startTimerLine(0); //calling startTimerLine function
    que_count = 0;
    quiz_counter = 0;
    widthValue = 0;
    var cachedQuestions = shuffle(JSON.parse(localStorage.poolQuestionsData));
    showQuestions(quiz_counter, cachedQuestions); //calling showQestions function
    // clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    startTimer(); 
}


start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    quiz_counter = 0;
    widthValue = 0;

    // Read the object
    var cachedQuestions = shuffle(JSON.parse(localStorage.poolQuestionsData));

    showQuestions(quiz_counter, cachedQuestions); //calling showQestions function
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(); 
    timeText.textContent = "Score"; //change the text of timeText to Time Left
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    console.log("************restart was clicked!");
    

    // // Check if element exists.
    // try {
    //     let submit_form = document.querySelector(".submit");
    //     submit_btn.disabled = false;
    //     if (typeof(submit_form) != 'undefined'){
    //         submit_form.remove();
    //         console.log("********remove!");
    //     }
    // } catch (error) {
    //     console.log("Failed to Remove! " + error);
    // }
    

    info_box.classList.remove("activeInfo"); //hide info box
    result_box.classList.remove("activeResult"); //hide result box
    quiz_box.classList.add("activeQuiz"); //show quiz box

    que_count = 0;
    quiz_counter = 0;
    widthValue = 0;
    sec = 100;

    var cachedQuestions = shuffle(JSON.parse(localStorage.poolQuestionsData));
    showQuestions(quiz_counter, cachedQuestions); //calling showQestions function
    startTimer(); 
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
    // localStorage.clear();
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
}
// creating the new div tags which for icons
// let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
// let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
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
        sec -= 20;

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
        console.log("No more questions in array: " + tempArray);
        userScore = sec;
        clearInterval(timer);
        console.log("userScore: " + userScore);
        timeCount.textContent = 0;
        showResult();
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
    let submit_btn = document.querySelector("#submit_btn");
    submit_btn.disabled = true;
    let textData = document.querySelector("#initials_text").value;

    let addUserScore = `${textData} - ${userScore}`;

    console.log("***********userScore: " + userScore);
    console.log("***********addUserScore: " + addUserScore);

    highscore = updateHighScoreCache(addUserScore);

    console.log("***********highscore: " + highscore);
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
    console.log('timer suppose to go')
    timer = setInterval(function(){
        
        // document.getElementById('timerDisplay').innerHTML='00:'+sec;
        timeCount.textContent = sec; //changing the value of timeCount with time value
        sec--;
        // if (sec < 0) {
        //     clearInterval(timer);
        //     alert("Time is up!")
        // }
    }, 1000);
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