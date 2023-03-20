document.getElementById('startBtn').addEventListener('click', start);

let problems = [];
let currentProblemIndex = 0;

function start() {
    // Get configuration options from the user
    const numProblems = parseInt(document.getElementById('numProblems').value);
    const hardness = document.getElementById('hardness').value;
    const addition = document.getElementById('addition').checked;
    const subtraction = document.getElementById('subtraction').checked;
    const multiplication = document.getElementById('multiplication').checked;
    const division = document.getElementById('division').checked;

    // Generate problems based on the configuration
    problems = generateProblems(numProblems, hardness, addition, subtraction, multiplication, division);

    // Reset current problem index
    currentProblemIndex = 0;

    // Display the first problem
    displayProblem(problems[currentProblemIndex]);
}

function generateProblems(numProblems, hardness, addition, subtraction, multiplication, division) {
    const generatedProblems = [];
    const operations = [
        addition ? '+' : null,
        subtraction ? '-' : null,
        multiplication ? '*' : null,
        division ? '/' : null
    ].filter(Boolean);

    for (let i = 0; i < numProblems; i++) {
        const operation = operations[Math.floor(Math.random() * operations.length)];
        const [operand1, operand2] = generateOperands(hardness, operation);
        generatedProblems.push({
            operation,
            operand1,
            operand2,
            correctAnswer: eval(`${operand1}
            ${operation}
            ${operand2}`)
        });
    }

    return generatedProblems;
}

function generateOperands(hardness, operation) {
    let min, max;

    switch (hardness) {
        case 'easy':
            min = 1;
            max = 10;
            break;
        case 'medium':
            min = 10;
            max = 50;
            break;
        case 'hard':
            min = 50;
            max = 100;
            break;
        default:
            min = 1;
            max = 10;
    }

    if (operation === '/') {
        const operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const operand2 = Math.floor(Math.random() * (max - min + 1)) + min;
        return [operand1 * operand2, operand2];
    }

    const operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const operand2 = Math.floor(Math.random() * (max - min + 1)) + min;
    return [operand1, operand2];
}

function displayProblem(problem) {
    const problemDiv = document.querySelector('.problem');
    problemDiv.innerHTML = `
    <p>${problem.operand1} ${problem.operation} ${problem.operand2}</p>
    <input type="number" id="userAnswer" />
    <button id="submitAnswer">Submit</button>
  `;

    document.getElementById('submitAnswer').addEventListener('click', () => {
        const userAnswer = parseFloat(document.getElementById('userAnswer').value);
        const isCorrect = userAnswer === problem.correctAnswer;

        if (isCorrect) {
            // Update problem index and move to the next problem or show results
            currentProblemIndex++;

            if (currentProblemIndex < problems.length) {
                displayProblem(problems[currentProblemIndex]);
            } else {
                // Calculate the score and display the results
                showResults();
            }
        } else {
            // Show an error message for incorrect answers
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Incorrect, please try again.';
            errorMessage.style.color = 'red';
            problemDiv.appendChild(errorMessage);
        }
    });
}

function showResults() {
    const problemDiv = document.querySelector('.problem');
    const score = currentProblemIndex;
    const total = problems.length;

    problemDiv.innerHTML = `
    <h2>Results</h2>
    <p>You got ${score} out of ${total} problems correct.</p>
  `;
}