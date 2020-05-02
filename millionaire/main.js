// ANIMATION STEPS
// 0   = QUESTION ONLY
// 1   = ALL ANSWERS HIDDEN
// 2-5 = ANSWERS BEING SHOWN
//
// Go to the next step by calling `next()`
// DO NOT MANUALLY SET THIS VARIABLE (please)
var currentStep = 0;

// Elements
var container = $('.container');

function play() {
    container.removeClass("hidden");
}
function stop() {
    container.addClass("hidden");

    currentStep = 0;
    $('.answer').addClass("hidden").removeClass("correct").removeClass("incorrect").removeClass("selected");
    container.addClass("question-only");
}
function update(d){
    
}
function update(data) {
    try {
        data = JSON.parse(data);
    }
    catch(e){
        console.log("Invalid JSON.");
        return;
    }

    if (!data) { return; }

    // Question
    if (data.question && data.question.text !== undefined) {
        $('.question').text(data.question.text);
    }

    // Answers
    if(data.answerA){
        updateAnswer("a", data.answerA);
    }
    if(data.answerB){
        updateAnswer("b", data.answerB);
    }
    if(data.answerC){
        updateAnswer("c", data.answerC);
    }
    if(data.answerD){
        updateAnswer("d", data.answerD);
    }
}
function next() {
    if (currentStep <= 5) {
        currentStep++;

        switch (currentStep) {
            case 1:
                container.removeClass("question-only");
                break;
            case 2:
                $('.answer-a').removeClass("hidden");
                break;
            case 3:
                $('.answer-b').removeClass("hidden");
                break;
            case 4:
                $('.answer-c').removeClass("hidden");
                break;
            case 5:
                $('.answer-d').removeClass("hidden");
                break;
        }
    }
}

function updateAnswer(answerToUpdate, data){
    answerToUpdate = $(`.answer-${answerToUpdate}`);

    if(data.text !== undefined){
        answerToUpdate.text(data.text);
    }
    if(data.correct !== undefined){
        if(data.correct){
            answerToUpdate.addClass("correct");
        }
        else{
            answerToUpdate.removeClass("correct");
        }
    }
    if(data.incorrect !== undefined){
        if(data.incorrect){
            answerToUpdate.addClass("incorrect");
        }
        else{
            answerToUpdate.removeClass("incorrect");
        }
    }
    if(data.selected !== undefined){
        if(data.selected){
            answerToUpdate.addClass("selected");
        }
        else{
            answerToUpdate.removeClass("selected");
        }
    }
}