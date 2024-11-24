let timerInterval;
let timeElapsed = 0;
let selectedDisk = null;
let selectedTower = null;
const highscores = [];

function initGame() {
    const towers = [document.getElementById("tower1"), document.getElementById("tower2"), document.getElementById("tower3")];
    towers.forEach(tower => (tower.innerHTML = ""));

    const tower1 = document.getElementById("tower1");
    for (let i = 7; i >= 1; i--) {
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.setAttribute("data-size", i);
        tower1.appendChild(disk);
    }

    timeElapsed = 0;
    document.getElementById("timer").textContent = `Time: ${timeElapsed} seconds`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `Time: ${timeElapsed} seconds`;
    }, 1000);

    selectedDisk = null;
    selectedTower = null;
}

function moveDisk(towerId) {
    const tower = document.getElementById(`tower${towerId}`);
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
        if (selectedTower === tower) {
            selectedDisk.style.transform = "";
            selectedDisk = null;
            selectedTower = null;
        } else if (!topDisk || selectedDisk.dataset.size < topDisk.dataset.size) {
            tower.appendChild(selectedDisk);
            selectedDisk.style.transform = "";
            selectedDisk = null;
            selectedTower = null;

            checkWin();
        } else {
            tower.classList.add("shake");
            setTimeout(() => tower.classList.remove("shake"), 300);
        }
    } else if (topDisk) {
        selectedDisk = topDisk;
        selectedTower = tower;
        selectedDisk.style.transform = "translateY(-30px)";
    }
}

function checkWin() {
    const tower3 = document.getElementById("tower3");
    if (tower3.childElementCount === 7) {
        clearInterval(timerInterval);
        addHighScore(timeElapsed);
        alert(`Congratulations! You solved the puzzle in ${timeElapsed} seconds.`);
    }
}

function addHighScore(time) {
    highscores.push(time);
    highscores.sort((a, b) => a - b);
    updateHighScoreTable();
}

function updateHighScoreTable() {
    const tbody = document.querySelector("#highscore-table tbody");
    tbody.innerHTML = "";
    highscores.forEach((score, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${score}</td>`;
        tbody.appendChild(row);
    });
}

function resetGame() {
    clearInterval(timerInterval);
    initGame();
}

window.onload = initGame;
