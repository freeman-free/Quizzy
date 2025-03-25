const questions = [
    { category: "liefde", question: "Wat vind jij het meest aantrekkelijk in een partner?", options: ["A) Uiterlijk", "B) Humor", "C) Intelligentie", "D) Ambitie"] },
    { category: "liefde", question: "Geloof jij in liefde op het eerste gezicht?", options: ["A) Ja, absoluut!", "B) Misschien", "C) Nee", "D) Ik weet het niet"] },
    { category: "vertrouwen", question: "Zou je het erg vinden als je partner veel geheimen voor je heeft?", options: ["A) Ja, dealbreaker", "B) Alleen bij belangrijke dingen", "C) Nee, privéleven is oké", "D) Hangt af van situatie"] },
    { category: "romantiek", question: "Wat is voor jou de meest romantische verrassing?", options: ["A) Een liefdesbrief", "B) Een verrassingsdate", "C) Een speciaal cadeautje", "D) Quality time samen"] },
    { category: "jaloezie", question: "Hoe reageer je als je partner veel met een ex omgaat?", options: ["A) Geen probleem", "B) Ongemakkelijk", "C) Niet prettig", "D) Stoppen ermee"] },
    { category: "socialmedia", question: "Vind jij het belangrijk dat je partner jullie relatie op social media deelt?", options: ["A) Ja, dat laat trots zien", "B) Niet echt", "C) Nee, privé blijft privé", "D) Weet ik niet"] },
    { category: "liefdestalen", question: "Hoe toon jij het liefst liefde in een relatie?", options: ["A) Woorden & complimenten", "B) Fysieke aanraking", "C) Cadeautjes & verrassingen", "D) Tijd en aandacht"] }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);
let scores = { liefde: 0, vertrouwen: 0, romantiek: 0, jaloezie: 0, socialmedia: 0, liefdestalen: 0 };

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        if (selectedAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add("selected");
        }
        optionElement.onclick = () => selectOption(index, optionElement, questionData.category);
        optionsDiv.appendChild(optionElement);
    });

    document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
    document.getElementById("nextBtn").disabled = currentQuestionIndex === questions.length - 1;
}

function selectOption(index, element, category) {
    selectedAnswers[currentQuestionIndex] = index;
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
    
    scores[category] += index;

    setTimeout(nextQuestion, 500);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");

    let highestCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    let resultText = "";

    switch (highestCategory) {
        case "liefde":
            resultText = "Je bent een romantische ziel! 💕 Je hecht veel waarde aan liefde en aantrekkingskracht.";
            break;
        case "vertrouwen":
            resultText = "Voor jou draait een relatie om vertrouwen. Zonder eerlijkheid werkt het niet.";
            break;
        case "romantiek":
            resultText = "Je bent een echte dromer en houdt van romantische verrassingen!";
            break;
        case "jaloezie":
            resultText = "Je kan soms jaloers zijn, maar dat betekent dat je diep om iemand geeft.";
            break;
        case "socialmedia":
            resultText = "Je vindt het belangrijk hoe relaties online worden weergegeven.";
            break;
        case "liefdestalen":
            resultText = "Je hebt een unieke manier om liefde te tonen en waarderen.";
            break;
        default:
            resultText = "Jouw liefdesstijl is een mix van alles!";
            break;
    }

    document.getElementById("result-text").textContent = resultText;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers.fill(null);
    scores = { liefde: 0, vertrouwen: 0, romantiek: 0, jaloezie: 0, socialmedia: 0, liefdestalen: 0 };

    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result-container").classList.add("hidden");

    loadQuestion();
}

function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

loadQuestion();