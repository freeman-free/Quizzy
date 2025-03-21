function selectOption(element, name) {

    let options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));


    element.classList.add('selected');

    alert(`Je hebt ${name} gekozen!`);
}
const questions = [
    { question: "Wat is een belangrijk kenmerk van een goede vriend?", options: ["Eerlijkheid", "Populariteit", "Rijkdom", "Uiterlijk"], correct: 0 },
    { question: "Wat betekent vriendschap?", options: ["Iemand gebruiken voor je eigen gewin", "Onvoorwaardelijke steun en vertrouwen", "Alleen contact hebben als het uitkomt", "Iemand alleen online kennen"], correct: 1 },
    { question: "Wat doe je als je vriend zich verdrietig voelt?", options: ["Negeer het", "Vraag hoe je kunt helpen", "Maak er een grap over", "Zeg dat ze zich niet zo moeten aanstellen"], correct: 1 },
    { question: "Hoe vaak moet je contact hebben om een echte vriend te zijn?", options: ["Elke dag", "Wekelijks", "Wanneer het uitkomt", "Er is geen vaste regel"], correct: 3 },
    { question: "Wat maakt een vriendschap sterker?", options: ["Eerlijkheid en vertrouwen", "Jaloezie en competitie", "Leugens en geheimen", "Altijd hetzelfde denken"], correct: 0 },
    { question: "Wat moet je doen als je ruzie hebt met een vriend?", options: ["Negeren en hopen dat het verdwijnt", "Erover praten en proberen het op te lossen", "Wraak nemen", "Nooit meer met ze praten"], correct: 1 },
    { question: "Welke eigenschap helpt om nieuwe vrienden te maken?", options: ["Open en vriendelijk zijn", "Arrogant zijn", "Altijd de beste willen zijn", "Altijd kritiek geven"], correct: 0 },
    { question: "Hoe kun je een vriend laten zien dat je om hen geeft?", options: ["Luisteren en tijd samen doorbrengen", "Alleen cadeaus geven", "Altijd hun mening volgen", "Ze negeren als je geen zin hebt"], correct: 0 },
    { question: "Wat is belangrijk in een langdurige vriendschap?", options: ["Respect en geduld", "Altijd alles samen doen", "Altijd winnen in discussies", "Nooit je gevoelens delen"], correct: 0 },
    { question: "Hoe kan vriendschap veranderen over de tijd?", options: ["Het kan groeien en verdiepen", "Vriendschap blijft altijd hetzelfde", "Je hebt altijd evenveel vrienden", "Oude vrienden blijven altijd belangrijker dan nieuwe"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result-screen").classList.add("hidden");  // Zorg ervoor dat het resultaat scherm verborgen is bij het starten
    currentQuestion = 0;
    score = 0;
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
    q.options.forEach((option, index) => {
        optionsHtml += `<button class='quiz-option' onclick='checkAnswer(${index})' id='option-${index}'>${option}</button>`;
    });
    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("feedback").innerText = "";
}

function checkAnswer(selectedIndex) {
    let q = questions[currentQuestion];
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
}

function restartQuiz() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}