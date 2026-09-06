const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a webpage?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },
    {
        question: "Which language is used to add interactivity to a webpage?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "variable",
            "declare",
            "value"
        ],
        answer: 0
    },
    {
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "queryId()"
        ],
        answer: 0
    },
    {
        question: "Which tag is used to define the largest heading in HTML?",
        options: [
            "<h1>",
            "<h6>",
            "<head>",
            "<header>"
        ],
        answer: 0
    },
    {
        question: "Which CSS property changes text color?",
        options: [
            "background-color",
            "font-size",
            "color",
            "margin"
        ],
        answer: 2
    },
    {
        question: "Which symbol is used to write a single-line comment in JavaScript?",
        options: [
            "<!-- -->",
            "#",
            "//",
            "/* */"
        ],
        answer: 2
    },
    {
        question: "Which one is a JavaScript data type?",
        options: [
            "String",
            "Table",
            "Image",
            "Link"
        ],
        answer: 0
    },
    {
        question: "Which HTML attribute is used to add alternative text to an image?",
        options: [
            "title",
            "alt",
            "src",
            "href"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let elapsedSeconds = 0;
let timerInterval = null;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progress");
const timerText = document.getElementById("timer");

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const finalScore = document.getElementById("final-score");
const finalTime = document.getElementById("final-time");
const percentage = document.getElementById("percentage");
const restartButton = document.getElementById("restart-btn");
const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

function updateCursor() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    cursorRing.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
}

window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});

window.addEventListener("pointerleave", () => {
    cursorRing.style.opacity = "0";
    cursorDot.style.opacity = "0";
});

window.addEventListener("pointerenter", () => {
    cursorRing.style.opacity = "1";
    cursorDot.style.opacity = "1";
});

updateCursor();

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    timerText.textContent = `Time: ${formatTime(elapsedSeconds)}`;

    timerInterval = setInterval(() => {
        elapsedSeconds++;
        timerText.textContent = `Time: ${formatTime(elapsedSeconds)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function loadQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent = current.question;
    scoreText.textContent = `Score: ${score}`;

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    optionsContainer.innerHTML = "";
    selectedAnswer = null;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.className = "w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-left text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-[0_12px_24px_rgba(251,113,133,0.1)] focus:outline-none focus:ring-4 focus:ring-rose-100";

        button.addEventListener("click", () => {
            const allOptions = optionsContainer.querySelectorAll("button");
            allOptions.forEach((btn) => {
                btn.classList.remove(
                    "border-transparent",
                    "bg-gradient-to-r",
                    "from-rose-500",
                    "to-violet-500",
                    "text-white",
                    "shadow-[0_12px_25px_rgba(168,85,247,0.2)]",
                    "scale-[1.01]",
                    "ring-2",
                    "ring-rose-200"
                );
                btn.classList.add("border-slate-200", "bg-white/90", "text-slate-700");
                btn.style.background = "#ffffff";
                btn.style.backgroundColor = "#ffffff";
                btn.style.color = "#334155";
                btn.style.borderColor = "rgba(226,232,240,1)";
                btn.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
            });

            button.classList.remove("border-slate-200", "bg-white/90", "text-slate-700");
            button.classList.add(
                "border-transparent",
                "bg-gradient-to-r",
                "from-rose-500",
                "to-violet-500",
                "text-white",
                "shadow-[0_12px_25px_rgba(168,85,247,0.2)]",
                "scale-[1.01]",
                "ring-2",
                "ring-rose-200"
            );
            button.style.background = "linear-gradient(135deg, #f59e0b 0%, #f43f5e 45%, #8b5cf6 100%)";
            button.style.backgroundColor = "#8b5cf6";
            button.style.color = "#ffffff";
            button.style.borderColor = "transparent";
            button.style.boxShadow = "0 14px 28px rgba(139, 92, 246, 0.28)";
            selectedAnswer = index;
        });

        optionsContainer.appendChild(button);
    });

    nextButton.textContent = currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question";
}

nextButton.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer first!");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const totalQuestions = questions.length;
    const percent = Math.round((score / totalQuestions) * 100);
    const message =
        percent >= 80 ? "Excellent work!" :
        percent >= 60 ? "Good job!" :
        "Keep practicing!";

    finalScore.textContent = `${score} / ${totalQuestions}`;
    finalTime.textContent = formatTime(elapsedSeconds);
    percentage.textContent = `${percent}% — ${message}`;
    percentage.className = percent >= 80 ? "mt-2 text-base font-semibold text-emerald-600" : percent >= 60 ? "mt-2 text-base font-semibold text-amber-600" : "mt-2 text-base font-semibold text-rose-500";
    stopTimer();
}

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    startTimer();
    loadQuestion();
});

startTimer();
loadQuestion();