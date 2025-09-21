const questions = [
    {
        question: "Qual é o estado físico mais comum da água à temperatura ambiente?",
        opcao: ["Sólido", "Líquido", "Gasoso", "Plasma"],
        resposta: "Líquido",
        htk: "A água é geralmente encontrada no estado líquido à temperatura ambiente (25°C)."
    },
    {
        question: "Qual é a fórmula química do sal de cozinha?",
        opcao: ["NaCl", "KCl", "H2O", "CO2"],
        resposta: "NaCl",
        htk: "O sal de cozinha é o cloreto de sódio, representado por NaCl."
    }
];

// elementos
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

let currentQuestion = 0;

// carregar questão
function loadQuestion() {
    let q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    nextBtn.classList.add("hidden");

    q.opcao.forEach(op => {
        let btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => checkAnswer(op, q);
        optionsContainer.appendChild(btn);
    });
}

// checar resposta
function checkAnswer(selected, q) {
    if (selected === q.resposta) {
        feedback.textContent = "✅ Correto! " + q.htk;
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Errado. " + q.htk;
        feedback.style.color = "red";
    }
    nextBtn.classList.remove("hidden");
}

// próximo
nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionText.textContent = "🎉 Você concluiu o questionário!";
        optionsContainer.innerHTML = "";
        nextBtn.classList.add("hidden");
        feedback.textContent = "";
    }
};

// iniciar quiz
startBtn.onclick = () => {
    startBtn.classList.add("hidden"); 
    quizContainer.classList.remove("hidden");
    loadQuestion();
};
