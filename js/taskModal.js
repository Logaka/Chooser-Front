let taskModal, taskText, taskTimer;

let countdownInterval = null;

function initTaskModal() {
    const taskModalElement = document.getElementById('taskModal');

    taskModal = new bootstrap.Modal(taskModalElement);
    taskText = document.getElementById('taskText');
    taskTimer = document.getElementById('taskTimer');
    
    taskModalElement.addEventListener('hidden.bs.modal', stopTimer);
}



function startTask(taskData) {
    if (!taskData || !taskData.text) return;
    
    const playerColor = taskData.playerColor || "selected player";
    showTask(taskData.text, playerColor);
}


function showTask(task, playerColor) {
    const timerValue = parseInt(document.getElementById('timer').value, 10);

    taskText.textContent = task;
    document.getElementById('taskModalLabel').textContent = `Task for player: ${playerColor}`;

    startTimer(timerValue);
    taskModal.show();
}

function startTimer(duration) {
    let timeRemaining = duration;
    updateTimerText(timeRemaining);

    stopTimer();
    countdownInterval = setInterval(() => {
        timeRemaining -= 1;
        updateTimerText(timeRemaining);

        if (timeRemaining <= 0) {
            stopTimer();
            taskModal.hide();
        }
    }, 1000);
}

function stopTimer() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function updateTimerText(time) {
    taskTimer.textContent = `Timer: ${time} sec`;
}

document.addEventListener('DOMContentLoaded', () => {
    initTaskModal();
    window.startTask = startTask;
});
