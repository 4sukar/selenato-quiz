const questions = [
    {
        question: "Qual é a fórmula química do selenato de zinco?",
        opcao: ["ZnSe", "ZnSeO4", "ZnSO4", "Zn(SeO3)2"],
        resposta: "ZnSeO4",
        htk: "O selenato de zinco é formado pelo cátion Zn²⁺ e o ânion SeO₄²⁻ → fórmula ZnSeO₄."
    },
    {
        question: "Quais íons compõem o selenato de zinco?",
        opcao: ["Zn²⁺ e SO₄²⁻","Zn²⁺ e SeO₄²⁻","Zn⁺ e Se²⁻","Zn²⁺ e O²⁻"],
        resposta: "Zn²⁺ e SeO₄²⁻",
        htk: "Ele é formado por íons zinco (Zn²⁺) e íons selenato (SeO₄²⁻)."
    },
    {
        question: "O selenato de zinco é geralmente encontrado em qual estado físico à temperatura ambiente?",
        opcao: ["Gasoso", "Líquido", "Sólido iônico", "Plasma"],
        resposta: "Sólido iônico",
        htk: "Sais iônicos como o ZnSeO₄ são sólidos cristalinos à temperatura ambiente."
    },
    {
        question: "Sobre a solubilidade do selenato de zinco em água, podemos dizer que:",
        opcao: ["É insolúvel em água","É pouco solúvel apenas em solventes orgânicos","É solúvel em água","Não se dissolve em nenhum solvente"],
        resposta: "É solúvel em água",
        htk: "O ZnSeO₄ é solúvel em água, como a maioria dos sais com ânions poliatômicos."
    },
    {
        question: "Qual cuidado de segurança é importante ao lidar com compostos de selenato de zinco?",
        opcao: ["São totalmente inofensivos","Devem ser manuseados com EPI, pois podem ser tóxicos","Podem ser ingeridos sem risco","Não precisam de descarte adequado"],
        resposta: "Devem ser manuseados com EPI, pois podem ser tóxicos",
        htk: "Compostos de selênio podem ser tóxicos; é necessário usar luvas, óculos de proteção e realizar descarte correto."
    }
];

// elementos fixos
const startBtn = document.getElementById("start-btn");
const quizSection = document.getElementById("quiz-section");
const infoSection = document.getElementById("info");

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", () => {
    // esconde info e mostra quiz
    infoSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    // pega os elementos do quiz agora que ele está visível
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const feedback = document.getElementById("feedback");

    function loadQuestion() {
        const q = questions[currentQuestion];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = "";
        feedback.textContent = "";
        nextBtn.classList.add("hidden");

        q.opcao.forEach(op => {
            const btn = document.createElement("button");
            btn.textContent = op;
            btn.classList.add("option-btn");
            btn.onclick = () => checkAnswer(op, q, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selected, q, btn) {
        const buttons = document.querySelectorAll(".option-btn");
        buttons.forEach(b => b.disabled = true);

        if (selected === q.resposta) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
            feedback.textContent = "✅ Correto! " + q.htk;
            feedback.style.color = "green";
            score++;
        } else {
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
            feedback.textContent = "❌ Errado. " + q.htk;
            feedback.style.color = "red";

            buttons.forEach(b => {
                if (b.textContent === q.resposta) {
                    b.style.backgroundColor = "green";
                    b.style.color = "white";
                }
            });
        }
        nextBtn.classList.remove("hidden");
    }

    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) loadQuestion();
        else showResults();
    });

    function showResults() {
        quizSection.innerHTML = `
            <h2>🎉 Fim do Questionário!</h2>
            <p>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong>.</p>
            <p>${score === questions.length ? "🏆 Excelente! Passou na prova com nota máxima!" :
                score > questions.length/2 ? "✅ Muito bem! Você está mandando bem!" :
                "⚡ Está no caminho, mas precisa revisar mais!"}
            </p>
            <button id="restart-btn">🔄 Reiniciar Quiz</button>
        `;

        document.getElementById("restart-btn").addEventListener("click", () => {
            currentQuestion = 0;
            score = 0;
            quizSection.classList.add("hidden");
            infoSection.classList.remove("hidden");
        });
    }

    loadQuestion();
});
