function selectOption(element, name) {

    let options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));


    element.classList.add('selected');

    alert(`Je hebt ${name} gekozen!`);
}
const questions = [
    { question: "Wat betekent familie voor jou?", options: [], correct: null },
    { question: "Wie is de zus van je vader voor jou?", options: ["Tante", "Nicht", "Oma", "Zus"], correct: 0 },
    { question: "Hoe noem je de vader van je moeder?", options: ["Vader", "Oom", "Opa", "Broer"], correct: 2 },
    { question: "Wie is de zoon van je oom voor jou?", options: ["Broer", "Neef", "Vader", "Opa"], correct: 1 },
    { question: "Wie is voor jouw het belangerijkste familie lid?", options: [], correct: null },
    { question: "Wie is de moeder van je moeder?", options: ["Oma", "Tante", "Zus", "Nicht"], correct: 0 },
    { question: "Wat is de relatie tussen jou en de dochter van je broer?", options: ["Oma", "Zus", "Tante", "Nicht"], correct: 3 },
    { question: "Wie is de broer van je vader voor jou?", options: ["Neef", "Oom", "Opa", "Vader"], correct: 1 },
    { question: "Hoe zou je een familie lid voor het eerst ontmoeten?", options: [], correct: null },
    { question: "Hoe heet de dochter van je oom voor jou?", options: ["Tante", "Zus", "Nicht", "Oma"], correct: 2 },
    { question: "Wie is je schoonvader?", options: ["De vader van je partner", "De vader van je broer", "Je stiefvader", "Je opa"], correct: 0 },
    { question: "Hoe noem je de zus van jou partner?", options: ["Tante", "Zus", "Schoonzus", "Nicht"], correct: 3 },
    { question: "Wat is de relatie tussen jou en de zoon van je zus?", options: ["Neef", "Broer", "Vader", "Oom"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let openAnswers = []; 

function startQuiz() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result-screen").classList.add("hidden");  // Zorg ervoor dat het resultaat scherm verborgen is bij het starten
    currentQuestion = 0;
    score = 0;
    openAnswers = []; 
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    let optionsHtml = "";

    if (q.options.length > 0) {
        q.options.forEach((option, index) => {
            optionsHtml += `<button class='quiz-option' onclick='checkAnswer(${index})' id='option-${index}'>${option}</button>`;
        });
    } else {
        optionsHtml += `<textarea id="open-answer" placeholder="Schrijf je antwoord hier..."></textarea>`;
        optionsHtml += `<button onclick="submitOpenAnswer()">Bevestigen</button>`; // Knop om open antwoord in te dienen
    }

    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("feedback").innerText = "";
}

function submitOpenAnswer() {
    let openAnswer = document.getElementById("open-answer").value;
    if (openAnswer.trim() !== "") {
        openAnswers.push(openAnswer); 
        currentQuestion++;
        showQuestion();
    } else {
        document.getElementById("feedback").innerText = "Gelieve een antwoord in te voeren!";
    }
}

function checkAnswer(selectedIndex) {
    let q = questions[currentQuestion];
    
    if (q.options.length > 0) {
        let selectedButton = document.getElementById(`option-${selectedIndex}`);
        let correctButton = document.getElementById(`option-${q.correct}`);

        if (selectedIndex === q.correct) {
            selectedButton.classList.add("correct");
            document.getElementById("feedback").innerText = "Goed!";
            score++;
        } else {
            selectedButton.classList.add("incorrect");
            correctButton.classList.add("correct");
            document.getElementById("feedback").innerText = "Fout! Het juiste antwoord is " + q.options[q.correct] + ".";
        }

        disableButtons();
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function disableButtons() {
    let buttons = document.querySelectorAll(".quiz-option");
    buttons.forEach(button => button.disabled = true);
}

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden"); // Toon het resultaat scherm
    document.getElementById("score").innerText = `Je hebt ${score} van de ${questions.length} vragen goed!`;

    let openAnswersHtml = "<h3>Jouw open antwoorden:</h3><ul>";
    openAnswers.forEach(answer => {
        openAnswersHtml += `<li>${answer}</li>`;
    });
    openAnswersHtml += "</ul>";

    document.getElementById("open-answers").innerHTML = openAnswersHtml; // Toon open antwoorden in het result scherm
}

function restartQuiz() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}