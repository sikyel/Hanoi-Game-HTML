let timerInterval;
let timeElapsed = 0;
let selectedDisk = null;
let selectedTower = null; // To track the selected tower
const highscores = [];

// Initialize the game with all disks on the leftmost tower
function initGame() {
    const towers = [document.getElementById("tower1"), document.getElementById("tower2"), document.getElementById("tower3")];
    towers.forEach(tower => (tower.innerHTML = "")); // Clear all towers

    // Add disks to the first tower
    const tower1 = document.getElementById("tower1");
    for (let i = 7; i >= 1; i--) {
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.setAttribute("data-size", i);
        tower1.appendChild(disk);
    }

    // Reset timer
    timeElapsed = 0;
    document.getElementById("timer").textContent = `Time: ${timeElapsed} seconds`;

    // Start timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `Time: ${timeElapsed} seconds`;
    }, 1000);

    // Reset selected disk and tower
    selectedDisk = null;
    selectedTower = null;
}

// Handle disk movement
function moveDisk(towerId) {
    const tower = document.getElementById(`tower${towerId}`);
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
        if (selectedTower === tower) {
            // If the same tower is clicked, deselect the disk
            selectedDisk.style.transform = "";
            selectedDisk = null;
            selectedTower = null;
        } else if (!topDisk || selectedDisk.dataset.size < topDisk.dataset.size) {
            // Place the selected disk on a new tower
            tower.appendChild(selectedDisk);
            selectedDisk.style.transform = "";
            selectedDisk = null;
            selectedTower = null;

            // Check for win condition
            checkWin();
        } else {
            // Invalid move: shake the tower
            tower.classList.add("shake");
            setTimeout(() => tower.classList.remove("shake"), 300);
        }
    } else if (topDisk) {
        // Pick up the top disk
        selectedDisk = topDisk;
        selectedTower = tower;
        selectedDisk.style.transform = "translateY(-30px)";
    }
}

// Check if the puzzle is solved
function checkWin() {
    const tower3 = document.getElementById("tower3");
    if (tower3.childElementCount === 7) {
        clearInterval(timerInterval);
        addHighScore(timeElapsed);
        alert(`Congratulations! You solved the puzzle in ${timeElapsed} seconds.`);
    }
}

// Add a new high score
function addHighScore(time) {
    highscores.push(time);
    highscores.sort((a, b) => a - b); // Sort by ascending time
    updateHighScoreTable();
}

// Update high score table
function updateHighScoreTable() {
    const tbody = document.querySelector("#highscore-table tbody");
    tbody.innerHTML = "";
    highscores.forEach((score, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${score}</td>`;
        tbody.appendChild(row);
    });
}

// Automated Tower of Hanoi solver
function automateGame() {
    const source = document.getElementById("tower1");
    const auxiliary = document.getElementById("tower2");
    const target = document.getElementById("tower3");

    const steps = [];
    const solveRecursively = (n, src, aux, tgt) => {
        if (n === 0) return;
        solveRecursively(n - 1, src, tgt, aux);
        steps.push({ from: src, to: tgt });
        solveRecursively(n - 1, aux, src, tgt);
    };

    solveRecursively(source.childElementCount, source, auxiliary, target);

    let stepIndex = 0;
    const interval = setInterval(() => {
        if (stepIndex >= steps.length) {
            clearInterval(interval);
            checkWin();
            return;
        }

        const { from, to } = steps[stepIndex];
        const disk = from.lastElementChild;
        to.appendChild(disk);
        stepIndex++;
    }, 500); // Adjust speed as necessary
}

// Reset the game
function resetGame() {
    clearInterval(timerInterval);
    initGame();
}

// Initialize the game on page load
window.onload = initGame;
