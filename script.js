const questions = {
    math: {
        beginner: [
            { type: "mcq", question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
            { type: "trueFalse", question: "Is 10 divisible by 2?", answer: "true" },
            { type: "fillBlank", question: "The area of a square is ___ square meters with a side length of 4 meters.", answer: "16" }
        ],
        intermediate: [
            { type: "mcq", question: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.16", "3.18"], answer: "3.14" },
            { type: "trueFalse", question: "Is the square root of 25 equal to 5?", answer: "true" },
            { type: "fillBlank", question: "The circumference of a circle is ___ meters with a radius of 5 meters.", answer: "31.42" }
        ],
        advanced: [
            { type: "mcq", question: "What is the derivative of x^2 with respect to x?", options: ["2x", "x", "2"], answer: "2x" },
            { type: "trueFalse", question: "Is the number 0 considered a prime number?", answer: "false" },
            { type: "fillBlank", question: "The sum of the interior angles of a triangle is ___ degrees.", answer: "180" }
        ]
    },
    science: {
        beginner: [
            { type: "mcq", question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2"], answer: "H2O" },
            { type: "trueFalse", question: "Is the Earth the third planet from the Sun?", answer: "true" },
            { type: "fillBlank", question: "The atomic number of oxygen is ___.", answer: "8" }
        ],
        intermediate: [
            { type: "mcq", question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Fermentation"], answer: "Photosynthesis" },
            { type: "trueFalse", question: "Is the moon larger than Earth?", answer: "false" },
            { type: "fillBlank", question: "The process of water turning into vapor is called ___.", answer: "evaporation" }
        ],
        advanced: [
            { type: "mcq", question: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl2"], answer: "NaCl" },
            { type: "trueFalse", question: "Does sound travel faster in water than in air?", answer: "true" },
            { type: "fillBlank", question: "The SI unit of electric charge is ___.", answer: "coulomb" }
        ]
    },
    history: {
        beginner: [
            { type: "mcq", question: "Who was the first president of the United States?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington"], answer: "George Washington" },
            { type: "trueFalse", question: "Did World War I end in 1918?", answer: "true" },
            { type: "fillBlank", question: "The Magna Carta was signed in the year ___.", answer: "1215" }
        ],
        intermediate: [
            { type: "mcq", question: "Who discovered America?", options: ["Christopher Columbus", "Marco Polo", "Vasco da Gama"], answer: "Christopher Columbus" },
            { type: "trueFalse", question: "Was the Battle of Waterloo fought in 1815?", answer: "true" },
            { type: "fillBlank", question: "The Renaissance began in the city of ___.", answer: "florence" }
        ],
        advanced: [
            { type: "mcq", question: "Who was the first emperor of Rome?", options: ["Julius Caesar", "Augustus Caesar", "Nero"], answer: "Augustus Caesar" },
            { type: "trueFalse", question: "Did the Industrial Revolution begin in the 18th century?", answer: "true" },
            { type: "fillBlank", question: "The Russian Revolution took place in the year ___.", answer: "1917" }
        ]
    }
};

function generateQuiz() {
    const selectedTopics = Array.from(document.getElementById("topics").selectedOptions).map(option => option.value);
    const selectedDifficulty = document.getElementById("difficulty").value;
    const quizContainer = document.getElementById("quizContainer");
    const quizQuestions = document.getElementById("quizQuestions");
    quizQuestions.innerHTML = "";

    selectedTopics.forEach(topic => {
        const topicQuestions = questions[topic][selectedDifficulty];
        topicQuestions.forEach(q => {
            const questionElement = document.createElement("div");
            let inputElement;
            switch (q.type) {
                case "mcq":
                    inputElement = `<p>${q.question}</p><select id="answer-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}">`;
                    q.options.forEach(option => {
                        inputElement += `<option value="${option}">${option}</option>`;
                    });
                    inputElement += `</select>`;
                    break;
                case "trueFalse":
                    inputElement = `<p>${q.question}</p><input type="radio" id="true-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}" name="answer-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}" value="true"><label for="true-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}">True</label>
                                    <input type="radio" id="false-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}" name="answer-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}" value="false"><label for="false-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}">False</label>`;
                    break;
                case "fillBlank":
                    inputElement = `<p>${q.question}</p><input type="text" id="answer-${topic}-${selectedDifficulty}-${topicQuestions.indexOf(q)}" placeholder="Your Answer">`;
                    break;
            }
            questionElement.innerHTML = inputElement;
            quizQuestions.appendChild(questionElement);
        });
    });

    quizContainer.classList.remove("hidden");
}

function submitQuiz() {
    const quizQuestions = document.getElementById("quizQuestions").querySelectorAll("select, input[type='radio'], input[type='text']");
    const resultsContainer = document.getElementById("resultsContainer");
    const quizResults = document.getElementById("quizResults");
    quizResults.innerHTML = "";
    let score = 0;

    quizQuestions.forEach(input => {
        const [topic, difficulty, index] = input.id.split("-").slice(1);
        const userAnswer = input.value.trim().toLowerCase();
        const questionType = questions[topic][difficulty][index].type;
        let correctAnswer;
        if (questionType === "mcq") {
            correctAnswer = questions[topic][difficulty][index].answer.toLowerCase();
        } else if (questionType === "trueFalse") {
            correctAnswer = questions[topic][difficulty][index].answer;
        } else if (questionType === "fillBlank") {
            correctAnswer = questions[topic][difficulty][index].answer.toLowerCase();
        }

        let isCorrect = false;
        if (questionType === "trueFalse") {
            const selectedOption = input.value;
            if (selectedOption === correctAnswer) {
                isCorrect = true;
            }
        } else {
            if (userAnswer === correctAnswer) {
                isCorrect = true;
            }
        }

        const questionResult = document.createElement("p");
        if (isCorrect) {
            questionResult.textContent = `Question ${index + 1}: Correct!`;
            score++;
        } else {
            if (questionType === "mcq") {
                questionResult.textContent = `Question ${index + 1}: Incorrect. Correct Answer: ${correctAnswer}`;
            } else {
                questionResult.textContent = `Question ${index + 1}: Incorrect.`;
            }
        }
        quizResults.appendChild(questionResult);
    });

    const scorePercentage = (score / quizQuestions.length) * 100;
    const finalResult = document.createElement("p");
    finalResult.textContent = `You scored ${score} out of ${quizQuestions.length} (${scorePercentage.toFixed(2)}%)`;
    quizResults.appendChild(finalResult);

    resultsContainer.classList.remove("hidden");
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for the dark mode button
const darkModeButton = document.getElementById('darkModeButton');
darkModeButton.addEventListener('click', toggleDarkMode);


