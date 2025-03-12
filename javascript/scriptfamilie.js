let currentQuestion = 1;
const correctAnswers = {
    q1: 'a',
    q2: 'c',
    q3: 'a',
    q4: 'a',
    q5: 'a'
};
let score = 0;

function nextQuestion(questionNumber) {
    // Hide the current question
    document.getElementById(`question${questionNumber}`).style.display = 'none';

    // Show the next question
    currentQuestion++;
    if (currentQuestion <= 5) {
        document.getElementById(`question${currentQuestion}`).style.display = 'block';
    } else {
        // When all questions are answered, calculate the score and show it
        calculateScore();
    }
}

function calculateScore() {
    const userAnswers = new FormData(document.getElementById("quiz-form"));
    let feedback = document.getElementById("feedback");
    let scoreElement = document.getElementById("score");

    // Check answers and calculate score
    for (let [key, value] of userAnswers.entries()) {
        if (correctAnswers[key] === value) {
            score++;
        }
    }

    feedback.innerHTML = "Je hebt de quiz voltooid!";
    scoreElement.innerHTML = `Je score is: ${score} van de 5.`;
}

// Initially show the first question
document.getElementById('question1').style.display = 'block';
