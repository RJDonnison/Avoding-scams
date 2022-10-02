var questionIndex = 0;
var correct = 0;
var submitted = false;
const questions = document.getElementsByClassName("quiz-question");
const submitButton = document.getElementsByClassName("submit");
const answerDisplay = document.getElementsByClassName("answerDisplay");

//*set up / load quiz
function loadQuiz() {
  for (const question of questions) {
    //*Hide questions
    question.style.display = "none";
    if (question.children[1] != null) {
      for (const child of question.children[1].children) {
        child.classList.add("hideAnswers");
        child.classList.remove("clicked");
      }
    }

    //*Reset submit button
    var questionSubmitButton = question.querySelector(".submit");
    if (questionSubmitButton != null) {
      if (questionSubmitButton.innerHTML == "Next") {
        questionSubmitButton.innerHTML = "Submit";
        questionSubmitButton.setAttribute("onClick", "javascript: submit()");
      }
    }
  }

  //*Reset answers display
  for (const display of answerDisplay) {
    display.innerHTML = null;
    display.classList.remove("correct", "wrong");
  }

  //*Displays first question
  questions[0].style.display = "block";
  correct = 0;
  questionIndex = 0;
}

//*Change question
function next() {
  if (questionIndex < questions.length - 1) {
    questions[questionIndex].style.display = "none";
    questions[questionIndex + 1].style.display = "block";
  }

  questionIndex++;
  submitted = false;

  //*Check if last question
  if (questionIndex >= questions.length - 1) {
    displayCorrect();
  }
}

//*Submit answer
function submit() {
  var children = questions[questionIndex].children[1].children;

  //*Changes submit to next and checks if answer has been clicked
  for (const child of children) {
    if (child.classList.contains("clicked")) {
      submitButton[questionIndex].innerHTML = "Next";
      submitButton[questionIndex].setAttribute("onClick", "javascript: next()");
      submitted = true;
      displayAnswers();
    }
  }
}

//*Shows answer
function displayAnswers() {
  var children = questions[questionIndex].children[1].children;

  for (const child of children) {
    if (
      child.classList.contains("clicked") &&
      child.classList.contains("correct")
    ) {
      correct++;
    }
    if (child.classList.contains("clicked")) {
      child.classList.remove("hideAnswers");
    }
    child.classList.remove("clicked");
  }
}

//*Check for click
function clicked(clickedElement) {
  //*Check if question not submitted
  if (!submitted) {
    var children =
      document.getElementsByClassName("question")[questionIndex].children;

    for (const child of children) {
      child.classList.remove("clicked");
    }
    clickedElement.classList.add("clicked");
  }
}

//*
function displayCorrect() {
  var text = correct + "/" + (questions.length - 1).toString();
  document.getElementById("score").innerHTML = text;
}
