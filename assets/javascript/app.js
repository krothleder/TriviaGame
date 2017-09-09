$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 2, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSF").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }


    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Approximately how many people visit San Francisco each year?",
            "c": ["8 million", "16 million", "24 million"],
            "answer": 1
        },
        // question 2
        {
            "q": "How large is San Francisco??",
            "c": ["14 square miles", "25 square miles", "47 square miles"],
            "answer": 2
        },
        // question 3
        {
            "q": "How many hills make up the San Francisco landscape?",
            "c": ["31", "43", "61"],
            "answer": 1
        },
        // question 4
        {
            "q": "One end of which of these famous bridges is located in San Francisco?",
            "c": ["Golden Gate Bridge", "Brooklyn Bridge", "London Bridge"],
            "answer": 0
        },
        // question 5
        {
            "q": "How high are San Francisco's Twin Peaks?",
            "c": ["300 ft above sea level", "600 ft above sea level", "900 ft above sea level"],
            "answer": 2
        },
        // question 6
        {
            "q": "When does summer occur in San Francisco?",
            "c": ["December to February", "Early July to mid-September", "Late August to late October"],
            "answer": 2
        },
        // question 7
        {
            "q": "Which of these is the main airport for the San Francisco area?",
            "c": ["Mineta San Jose International Airport", "Oakland International Airport", "San Francisco International Airport"],
            "answer": 2
        },
        // question 8
        {
            "q": "About how much will a cab from San Francisco International to the heart of the city cost you?",
            "c": ["$15-$20", "$40-$50", "$85-$100"],
            "answer": 1
        },
        // question 9
        {
            "q": "The subway system in the San Francisco area is known as what?",
            "c": ["BART", "CaRT", "DART"],
            "answer": 0
        },
        // question 10
        {
            "q": "How much does a BART ride cost?",
            "c": ["$1.40-$7", "$4-$12", "$8-$15"],
            "answer": 0
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSF").show();

        startTrivia();
    })


});