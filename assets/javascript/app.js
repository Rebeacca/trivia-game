var timeleft = 30;
var downloadTimer = setInterval(function () {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Times Up!"
    }
}, 1000);

(function () {
    function buildQuiz() {
        var output = [];
        myQuestions.forEach((currentQuestion, questionNumber) => {
            var answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
            );
        });
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        var answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;
        myQuestions.forEach((currentQuestion, questionNumber) => {
        
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;

                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var myQuestions = [
        {
            question: "What year did The Simpsons start airing?",
            answers: {
                a: 1969,
                b: 1978,
                c: 1989,
                d: 1991
            },
            correctAnswer: "c"
        },
        {
            question: "What is the name of the Simpson's cat",
            answers: {
                a: "Santa's Little Helper",
                b: "Snowball",
                c: "Itchy",
                d: "Scratchy"
            },
            correctAnswer: "b"
        },
        {
            question: "Who founded the Simpson's town?",
            answers: {
                a: "Zachariah Springfield",
                b: "Louis Springfield",
                c: "Jebadiah Springfield",
                d: "William Springfield"
            },
            correctAnswer: "c"
        },
        {
            question: "Hold old is Bart?",
            answers: {
                a: 10,
                b: 12,
                c: 8,
                d: 9
            },
            correctAnswer: "a"
        },
        {
            question: "Who is Mr. Burns' assistant?",
            answers: {
                a: "Seymour Skinner",
                b: "Homer Simpson",
                c: "Waylon Skinner",
                d: "Slideshow Bob"
            },
            correctAnswer: "c"
        },
        {
            question: "As of 2019, how many seasons are there?",
            answers: {
                a: 23,
                b: 46,
                c: 50,
                d: 30
            },
            correctAnswer: "d"
        },
        {
            question: "Which of the following is NOT one of Homer's sayings?",
            answers: {
                a: "D'oh!",
                b: "Why you little...!!",
                c: "Mmmm donuts",
                d: "Okily Dokily"
            },
            correctAnswer: "d"
        }

    ];

    buildQuiz();

    submitButton.addEventListener("click", showResults);
})();




