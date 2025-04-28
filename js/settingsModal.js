// Получаем элементы формы
const modeSelect = document.getElementById("mode");
const levelSelect = document.getElementById("level");
const timerInput = document.getElementById("timer");
const eliminationCheckbox = document.getElementById("elimination");
const backgroundMusicToggle = document.getElementById("background-music-toggle");

// disable if random mode on
const toggleOptions = () => {
    const isRandomMode = modeSelect.value === "random";

    levelSelect.disabled = isRandomMode;
    timerInput.disabled = isRandomMode;
    eliminationCheckbox.disabled = isRandomMode;
};

const timerConstraint = () => {
    if (timerInput.value > 100)
        timerInput.value = 100
}

// state storage
const saveSettingsState = () => {
    localStorage.setItem('mode', modeSelect.value);
    localStorage.setItem('level', levelSelect.value);
    localStorage.setItem('timer', timerInput.value);
    localStorage.setItem('elimination', eliminationCheckbox.checked);
};

const loadSettingsState = () => {
    if (localStorage.getItem('mode')) {
        modeSelect.value = localStorage.getItem('mode');
        levelSelect.value = localStorage.getItem('level');
        timerInput.value = localStorage.getItem('timer');
        eliminationCheckbox.checked = JSON.parse(localStorage.getItem('elimination'));
        backgroundMusicToggle.checked = JSON.parse(localStorage.getItem('backgroundMusic'));
    }
    toggleOptions();
};


levelSelect.addEventListener("change", saveSettingsState);
modeSelect.addEventListener("change",() => {
        toggleOptions();
        saveSettingsState();
});
eliminationCheckbox.addEventListener("change", saveSettingsState);

window.addEventListener("load", loadSettingsState);

timerInput.addEventListener('input', () => {
    timerConstraint()
    saveSettingsState()
});