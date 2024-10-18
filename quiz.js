let userName = '';
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function startQuiz() {
    userName = document.getElementById('name').value;
    if (userName) {
        document.getElementById('nameSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'block';
    } else {
        alert('Please enter your name!');
    }
}

function submitQuiz() {
    let score = 0;

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    const q6 = document.querySelector('input[name="q6"]:checked');
    const q7 = document.querySelector('input[name="q7"]:checked');
    const q8 = document.querySelector('input[name="q8"]:checked');
    const q9 = document.querySelector('input[name="q9"]:checked');
    const q10 = document.querySelector('input[name="q10"]:checked');

    if (q1 && q2 && q3 && q4 && q5 && q6 && q7 && q8 && q9 && q10) {
        score += parseInt(q1.value);
        score += parseInt(q2.value);
        score += parseInt(q3.value);
        score += parseInt(q4.value);
        score += parseInt(q5.value);
        score += parseInt(q6.value);
        score += parseInt(q7.value);
        score += parseInt(q8.value);
        score += parseInt(q9.value);
        score += parseInt(q10.value);

        addScore(userName, score);

        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('scoreSection').style.display = 'block';
    } else {
        alert('Please answer all the questions before submitting!');
    }
}
function addScore(name, score) {
    highScores.push({ name, score });

    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    updateScoreTable();
}

function updateScoreTable() {
    const tableBody = document.getElementById('scoreTableBody');
    tableBody.innerHTML = '';

    highScores.forEach(({ name, score }) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        nameCell.textContent = name;
        scoreCell.textContent = score;

        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        tableBody.appendChild(row);
    });
}

window.onload = updateScoreTable;